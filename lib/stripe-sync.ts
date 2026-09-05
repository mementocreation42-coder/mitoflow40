import type Stripe from 'stripe';
import { getStripe } from './stripe';
import { PLANS, type Plan } from './products';
import { memo, invalidate } from './req-cache';

// lib/products.ts の定義を Stripe の Product / Price に同期する（管理画面のボタンから実行）。
// - Price は lookup_key で一意に引く。無ければ作る。
// - 既にある Price の金額が定義と食い違う場合は「不一致」として報告だけする
//   （Stripe の Price は金額変更不可。lookup_key の版を上げて新しい Price を作る運用）。

export interface PlanSyncStatus {
    planId: string;
    name: string;
    lookupKey: string;
    state: 'ok' | 'missing' | 'mismatch' | 'skipped' | 'created';
    detail: string;
    priceId?: string;
    productId?: string;
}

function describe(plan: Plan): string {
    return `¥${plan.priceJpy.toLocaleString('ja-JP')}${plan.kind === 'subscription' ? `／${plan.interval === 'year' ? '年' : '月'}` : ''}`;
}

function matches(price: Stripe.Price, plan: Plan): boolean {
    if (price.currency !== 'jpy' || price.unit_amount !== plan.priceJpy) return false;
    if (plan.kind === 'subscription') return price.recurring?.interval === (plan.interval ?? 'month');
    return !price.recurring;
}

async function findPrice(stripe: Stripe, key: string): Promise<Stripe.Price | null> {
    const res = await stripe.prices.list({ lookup_keys: [key], active: true, limit: 1, expand: ['data.product'] });
    return res.data[0] ?? null;
}

async function findOrCreateProduct(stripe: Stripe, plan: Plan): Promise<Stripe.Product> {
    const found = await stripe.products.search({ query: `active:'true' AND metadata['planId']:'${plan.id}'`, limit: 1 });
    if (found.data[0]) return found.data[0];
    return stripe.products.create({
        name: plan.name,
        description: plan.tagline,
        metadata: { planId: plan.id, site: 'mitoflow40' },
    });
}

// 管理画面の表示用。結果を 5 分だけ使い回す（同期ボタンを押したときは invalidate で捨てる）。
// 以前は /admin/orders を開くたびに Stripe へプラン数ぶん直列で問い合わせていた。
export function checkStripeProducts(): Promise<PlanSyncStatus[]> {
    return memo('stripe:products', 5 * 60_000, checkStripeProductsUncached);
}

async function checkStripeProductsUncached(): Promise<PlanSyncStatus[]> {
    const stripe = getStripe();
    if (!stripe) return PLANS.map((p) => ({ planId: p.id, name: p.name, lookupKey: p.stripeLookupKey, state: 'skipped', detail: 'STRIPE_SECRET_KEY 未設定' }));
    // プランごとの照会は互いに独立なので同時に投げる
    return Promise.all(PLANS.map(async (plan): Promise<PlanSyncStatus> => {
        if (plan.priceJpy <= 0) {
            return { planId: plan.id, name: plan.name, lookupKey: plan.stripeLookupKey, state: 'skipped', detail: '価格未設定（準備中）' };
        }
        const price = await findPrice(stripe, plan.stripeLookupKey);
        const productId = price ? (typeof price.product === 'string' ? price.product : price.product.id) : undefined;
        if (!price) {
            return { planId: plan.id, name: plan.name, lookupKey: plan.stripeLookupKey, state: 'missing', detail: `Stripe に未登録（同期で作成：${describe(plan)}）` };
        }
        if (!matches(price, plan)) {
            return {
                planId: plan.id, name: plan.name, lookupKey: plan.stripeLookupKey, state: 'mismatch', priceId: price.id, productId,
                detail: `Stripe 側 ¥${(price.unit_amount ?? 0).toLocaleString('ja-JP')}${price.recurring ? `／${price.recurring.interval}` : ''} ≠ 定義 ${describe(plan)}。lookup_key の版を上げて再同期してください`,
            };
        }
        return { planId: plan.id, name: plan.name, lookupKey: plan.stripeLookupKey, state: 'ok', priceId: price.id, productId, detail: describe(plan) };
    }));
}

export async function syncStripeProducts(): Promise<PlanSyncStatus[]> {
    const stripe = getStripe();
    if (!stripe) throw new Error('STRIPE_SECRET_KEY が未設定です');
    const statuses = await checkStripeProductsUncached();
    const out: PlanSyncStatus[] = [];
    for (const st of statuses) {
        if (st.state !== 'missing') { out.push(st); continue; }
        const plan = PLANS.find((p) => p.id === st.planId)!;
        const product = await findOrCreateProduct(stripe, plan);
        const price = await stripe.prices.create({
            product: product.id,
            currency: 'jpy',
            unit_amount: plan.priceJpy,
            lookup_key: plan.stripeLookupKey,
            transfer_lookup_key: true,
            tax_behavior: 'inclusive',
            ...(plan.kind === 'subscription' ? { recurring: { interval: plan.interval ?? 'month' } } : {}),
            metadata: { planId: plan.id },
        });
        out.push({ ...st, state: 'created', priceId: price.id, productId: product.id, detail: `作成しました：${describe(plan)}` });
    }
    invalidate('stripe'); // 作成した Price を次の表示にすぐ反映する
    return out;
}
