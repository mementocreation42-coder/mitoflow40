import { list, put, del } from '@vercel/blob';
import { clientIdFromEmail } from './intake';
import { memo, invalidate, TTL } from './req-cache';
import type { PlanKind } from './products';

// ── 注文・契約の記録 ──────────────────────────────────────────────
// 決済の「正」は Stripe。ここには、マイページ・管理画面で素早く参照するための
// 要約だけを Vercel Blob に置く（intake と同じ clientId = メールの HMAC で紐付け）。
//
//   orders/<clientId>/<orderId>.json      … 注文本体
//   orders/_index/<stripeObjectId>.json   … Stripe の subscription / payment_intent ID → 注文の逆引き
//
// orderId は 単発 = Checkout Session ID（cs_…）、サブスク = Subscription ID（sub_…）。
// Webhook は再送されうるため、書き込みはすべて上書き可（冪等）にしている。

export type OrderStatus =
    | 'pending'    // 決済開始・入金待ち（コンビニ払いなど）
    | 'paid'       // 単発：入金済み
    | 'failed'     // 入金失敗・期限切れ
    | 'refunded'   // 返金済み
    | 'active'     // サブスク：有効
    | 'past_due'   // サブスク：支払い遅延
    | 'canceled';  // サブスク：解約済み

export interface Order {
    orderId: string;
    clientId: string;
    email: string;
    name?: string;
    planId: string;
    planName: string;
    kind: PlanKind;
    amountJpy: number;
    status: OrderStatus;
    stripeCustomerId?: string;
    stripeSessionId?: string;
    stripeSubscriptionId?: string;
    stripePaymentIntentId?: string;
    currentPeriodEnd?: string;  // サブスクの次回更新日
    cancelAtPeriodEnd?: boolean;
    relinkedFrom?: string;      // 別の顧客から付け替えた場合、元の clientId（決済メールとシートのメールが違ったとき）
    relinkedAt?: string;
    livemode: boolean;
    createdAt: string;
    updatedAt: string;
}

const PREFIX = 'orders/';
const INDEX_PREFIX = 'orders/_index/';

function token(): string | undefined {
    return process.env.BLOB_READ_WRITE_TOKEN;
}

function safeId(s: string): boolean {
    return /^[A-Za-z0-9_-]{4,120}$/.test(s);
}

async function readJson<T>(url: string): Promise<T | null> {
    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return null;
        return (await res.json()) as T;
    } catch {
        return null;
    }
}

async function writeJson(path: string, data: unknown): Promise<void> {
    const t = token();
    if (!t) throw new Error('storage not configured');
    await put(path, JSON.stringify(data, null, 2), {
        access: 'public',
        token: t,
        addRandomSuffix: false,
        contentType: 'application/json',
        allowOverwrite: true,
    });
}

export async function saveOrder(order: Order): Promise<void> {
    if (!safeId(order.orderId) || !/^[a-f0-9]{24}$/.test(order.clientId)) throw new Error('invalid order');
    invalidate('orders');
    await writeJson(`${PREFIX}${order.clientId}/${order.orderId}.json`, order);
    // 逆引きインデックス（Webhook で subscription / payment_intent から注文を探すため）
    const ref = { clientId: order.clientId, orderId: order.orderId };
    const keys = [order.stripeSubscriptionId, order.stripePaymentIntentId].filter((k): k is string => Boolean(k));
    for (const k of keys) await writeJson(`${INDEX_PREFIX}${k}.json`, ref);
}

export async function getOrder(clientId: string, orderId: string): Promise<Order | null> {
    const t = token();
    if (!t || !safeId(orderId) || !/^[a-f0-9]{24}$/.test(clientId)) return null;
    const { blobs } = await list({ prefix: `${PREFIX}${clientId}/${orderId}`, token: t });
    const b = blobs.find((x) => x.pathname.endsWith(`${orderId}.json`));
    return b ? readJson<Order>(b.url) : null;
}

export async function findOrderByStripeId(stripeObjectId: string): Promise<Order | null> {
    const t = token();
    if (!t || !safeId(stripeObjectId)) return null;
    const { blobs } = await list({ prefix: `${INDEX_PREFIX}${stripeObjectId}`, token: t });
    const b = blobs.find((x) => x.pathname.endsWith(`${stripeObjectId}.json`));
    if (!b) return null;
    const ref = await readJson<{ clientId: string; orderId: string }>(b.url);
    return ref ? getOrder(ref.clientId, ref.orderId) : null;
}

export async function listOrdersForClient(clientId: string): Promise<Order[]> {
    const t = token();
    if (!t || !/^[a-f0-9]{24}$/.test(clientId)) return [];
    const { blobs } = await list({ prefix: `${PREFIX}${clientId}/`, token: t });
    const orders = (await Promise.all(blobs.filter((b) => b.pathname.endsWith('.json')).map((b) => readJson<Order>(b.url))))
        .filter((o): o is Order => Boolean(o));
    return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function listAllOrders(): Promise<Order[]> {
    return memo('orders:all', TTL.list, listAllOrdersUncached);
}
async function listAllOrdersUncached(): Promise<Order[]> {
    const t = token();
    if (!t) return [];
    const out: Order[] = [];
    let cursor: string | undefined;
    do {
        const page = await list({ prefix: PREFIX, token: t, cursor, limit: 1000 });
        const targets = page.blobs.filter((b) => b.pathname.endsWith('.json') && !b.pathname.startsWith(INDEX_PREFIX));
        const loaded = await Promise.all(targets.map((b) => readJson<Order>(b.url)));
        for (const o of loaded) if (o) out.push(o);
        cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateOrderStatus(
    order: Order,
    patch: Partial<Pick<Order, 'status' | 'currentPeriodEnd' | 'cancelAtPeriodEnd' | 'stripePaymentIntentId' | 'stripeCustomerId'>>,
): Promise<Order> {
    const next: Order = { ...order, ...patch, updatedAt: new Date().toISOString() };
    await saveOrder(next);
    return next;
}

// 注文を別の顧客へ付け替える（決済で使ったメールとカウンセリング票のメールが違い、別人として並んでしまったとき）。
// レコードを新しい clientId 配下へ移し、Stripe ID → 注文 の逆引きも張り替える（以後の解約・返金 Webhook は新しい顧客に届く）。
export async function relinkOrder(fromClientId: string, orderId: string, toClientId: string): Promise<Order> {
    const t = token();
    if (!t) throw new Error('storage not configured');
    if (!/^[a-f0-9]{24}$/.test(fromClientId) || !/^[a-f0-9]{24}$/.test(toClientId) || !safeId(orderId)) throw new Error('invalid ids');
    if (fromClientId === toClientId) throw new Error('same client');
    const order = await getOrder(fromClientId, orderId);
    if (!order) throw new Error('order not found');
    const now = new Date().toISOString();
    const moved: Order = { ...order, clientId: toClientId, relinkedFrom: order.relinkedFrom ?? fromClientId, relinkedAt: now, updatedAt: now };
    await saveOrder(moved); // 新しい場所へ書き、逆引きインデックスも新 clientId に更新
    const { blobs } = await list({ prefix: `${PREFIX}${fromClientId}/${orderId}`, token: t });
    for (const b of blobs) if (b.pathname.endsWith(`${orderId}.json`)) await del(b.url, { token: t });
    return moved;
}

// メールアドレス → clientId（intake と同じ鍵・同じ算出。ここを経由して一元化）
export function clientIdForEmail(email: string): string {
    return clientIdFromEmail(email);
}

// 契約中のサブスクがあるか（マイページ・会員ゲート用）
export function hasActiveSubscription(orders: Order[]): boolean {
    return orders.some((o) => o.kind === 'subscription' && (o.status === 'active' || o.status === 'past_due'));
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
    pending: '入金待ち',
    paid: '入金済み',
    failed: '失敗',
    refunded: '返金済み',
    active: '契約中',
    past_due: '支払い遅延',
    canceled: '解約済み',
};
