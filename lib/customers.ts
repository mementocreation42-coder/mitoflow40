import {
    listClients, listAllClientReports, listAllClientMetas, clientIdFromEmail, formatDateTime,
    type IntakeClient, type ClientReport, type ClientReportEntry, type ClientMeta, type ClientStatus,
} from './intake';
import { listAllOrders, type Order } from './orders';
import { listSubscribers, type Subscriber } from './newsletter';
import { listAllSelfChecks, type SelfCheckResult } from './selfcheck';
import { formatJpy } from './products';

// ── 顧客レコード（すべての接点を clientId で束ねる）──────────────────────────
// clientId = メールアドレスの HMAC（lib/intake.ts）。カウンセリング票・決済・ニュースレター・セルフチェックは
// それぞれ別の場所に保存されているが、同じメール＝同じ clientId なので、ここで1つの顧客に合流させる。
//
//   intake     … /counseling-sheet の提出（問診・添付）           intake/<submissionId>/
//   orders     … Stripe の注文・契約                              orders/<clientId>/
//   newsletter … Mitoflow40 レターの購読                           newsletter/subscribers/
//   checks     … /check セルフチェックの結果（メール入力時）      check/<clientId>/
//   report     … 解析レポートの紐付け                             intake/_reports/<clientId>.json
//   meta       … 対応ステータス・担当メモ                         intake/_meta/<clientId>.json

export type CustomerSource = 'intake' | 'order' | 'newsletter' | 'check';

export interface Customer {
    clientId: string;
    email: string;
    name: string;
    gender?: string;
    age?: string;
    intake: IntakeClient | null;
    orders: Order[];
    newsletter: Subscriber | null;
    checks: SelfCheckResult[];
    report: ClientReport | null;      // 最新のレポート
    reports: ClientReportEntry[];     // 全レポート（新しい順）
    meta: ClientMeta | null;
    sources: CustomerSource[];
    firstSeenAt: string;
    lastActivityAt: string;
    paidPlan: string | null;        // 入金済み／契約中のプラン名（最新）
    activeSubscription: boolean;
}

export interface TimelineEvent {
    at: string;
    kind: 'order' | 'intake' | 'report' | 'newsletter' | 'check' | 'status';
    title: string;
    detail?: string;
    href?: string;
}

// 顧客と呼ぶのは「票を出した」か「決済した」人。ニュースレター／セルフチェックだけの人は見込み（prospect）
export function isCustomer(c: Customer): boolean {
    return Boolean(c.intake) || c.orders.length > 0;
}

export function statusOf(c: Customer): ClientStatus {
    return c.meta?.status ?? '未対応';
}

function maxIso(...xs: (string | undefined | null)[]): string {
    return xs.filter((x): x is string => Boolean(x)).sort().pop() ?? '';
}
function minIso(...xs: (string | undefined | null)[]): string {
    return xs.filter((x): x is string => Boolean(x)).sort()[0] ?? '';
}

function assemble(
    clientId: string,
    parts: { intake: IntakeClient | null; orders: Order[]; newsletter: Subscriber | null; checks: SelfCheckResult[]; reports: ClientReportEntry[]; meta: ClientMeta | null },
): Customer {
    const { intake, orders, newsletter, checks, reports, meta } = parts;
    const report: ClientReport | null = reports[0] ? { token: reports[0].token, updatedAt: reports[0].addedAt } : null;
    const latest = intake?.submissions[0];
    const email = intake?.email || orders[0]?.email || newsletter?.email || checks[0]?.email || '';
    const name = intake?.name || orders.find((o) => o.name)?.name || (email ? email.split('@')[0] : '（無名）');
    const sources: CustomerSource[] = [];
    if (intake) sources.push('intake');
    if (orders.length) sources.push('order');
    if (newsletter) sources.push('newsletter');
    if (checks.length) sources.push('check');
    const settled = orders.filter((o) => o.status === 'paid' || o.status === 'active' || o.status === 'past_due');
    return {
        clientId, email, name,
        gender: latest?.gender || undefined,
        age: latest?.age || undefined,
        intake, orders, newsletter, checks, report, reports, meta, sources,
        firstSeenAt: minIso(intake?.submissions[intake.submissions.length - 1]?.submittedAt, orders[orders.length - 1]?.createdAt, newsletter?.subscribedAt, checks[checks.length - 1]?.createdAt),
        lastActivityAt: maxIso(intake?.latestAt, orders[0]?.updatedAt, newsletter?.unsubscribedAt, newsletter?.subscribedAt, checks[0]?.createdAt, report?.updatedAt),
        paidPlan: settled[0]?.planName ?? null,
        activeSubscription: orders.some((o) => o.kind === 'subscription' && (o.status === 'active' || o.status === 'past_due')),
    };
}

// 一覧：全接点を合流。meta（対応ステータス）は顧客ぶんだけ読む
export async function listCustomers(): Promise<Customer[]> {
    const [clients, orders, subs, checks] = await Promise.all([
        listClients().catch(() => [] as IntakeClient[]),
        listAllOrders().catch(() => [] as Order[]),
        listSubscribers().catch(() => [] as Subscriber[]),
        listAllSelfChecks().catch(() => [] as SelfCheckResult[]),
    ]);
    const ids = new Set<string>();
    const intakeBy = new Map(clients.map((c) => [c.clientId, c]));
    const ordersBy = new Map<string, Order[]>();
    for (const o of orders) { ordersBy.set(o.clientId, [...(ordersBy.get(o.clientId) ?? []), o]); ids.add(o.clientId); }
    const subBy = new Map<string, Subscriber>();
    for (const s of subs) { const id = clientIdFromEmail(s.email); subBy.set(id, s); ids.add(id); }
    const checksBy = new Map<string, SelfCheckResult[]>();
    for (const c of checks) { checksBy.set(c.clientId, [...(checksBy.get(c.clientId) ?? []), c]); ids.add(c.clientId); }
    for (const c of clients) ids.add(c.clientId);

    const list = Array.from(ids);
    const metaMap = await listAllClientMetas().catch(() => new Map());
    const customers = list.map((id) => assemble(id, {
        intake: intakeBy.get(id) ?? null,
        orders: (ordersBy.get(id) ?? []).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
        newsletter: subBy.get(id) ?? null,
        checks: (checksBy.get(id) ?? []).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
        reports: [],
        meta: metaMap.get(id) ?? null,
    }));
    return customers.sort((a, b) => b.lastActivityAt.localeCompare(a.lastActivityAt));
}

// 詳細：1人ぶん。個別に Blob を叩かず、短期キャッシュ済みの全体一覧（一覧ページと共有）から取り出す
export async function getCustomer(clientId: string): Promise<Customer | null> {
    if (!/^[a-f0-9]{24}$/.test(clientId)) return null;
    const [clients, orders, subs, checks, reports, metas] = await Promise.all([
        listClients().catch(() => [] as IntakeClient[]),
        listAllOrders().catch(() => [] as Order[]),
        listSubscribers().catch(() => [] as Subscriber[]),
        listAllSelfChecks().catch(() => [] as SelfCheckResult[]),
        listAllClientReports().catch(() => new Map<string, { history: ClientReportEntry[] }>()),
        listAllClientMetas().catch(() => new Map<string, ClientMeta>()),
    ]);
    const intake = clients.find((c) => c.clientId === clientId) ?? null;
    const myOrders = orders.filter((o) => o.clientId === clientId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const myChecks = checks.filter((k) => k.clientId === clientId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const knownEmail = (intake?.email || myOrders[0]?.email || myChecks[0]?.email || '').toLowerCase();
    const newsletter = subs.find((s) => (knownEmail ? s.email === knownEmail : clientIdFromEmail(s.email) === clientId)) ?? null;
    if (!intake && myOrders.length === 0 && !newsletter && myChecks.length === 0) return null;
    return assemble(clientId, { intake, orders: myOrders, newsletter, checks: myChecks, reports: reports.get(clientId)?.history ?? [], meta: metas.get(clientId) ?? null });
}

// 時系列（新しい順）
export function buildTimeline(c: Customer): TimelineEvent[] {
    const ev: TimelineEvent[] = [];
    for (const o of c.orders) {
        ev.push({ at: o.createdAt, kind: 'order', title: `${o.kind === 'subscription' ? '契約' : '決済'}：${o.planName}`, detail: `${formatJpy(o.amountJpy)}${o.kind === 'subscription' ? '／月' : ''} ・ ${o.status}${!o.livemode ? ' ・ TEST' : ''}` });
        if (o.status === 'canceled' && o.updatedAt !== o.createdAt) ev.push({ at: o.updatedAt, kind: 'order', title: `解約：${o.planName}` });
        if (o.status === 'refunded' && o.updatedAt !== o.createdAt) ev.push({ at: o.updatedAt, kind: 'order', title: `返金：${o.planName}` });
        if (o.relinkedAt) ev.push({ at: o.relinkedAt, kind: 'order', title: `注文をこの顧客に付け替え：${o.planName}`, detail: `決済時のメール ${o.email}` });
    }
    if (c.intake) {
        for (const s of c.intake.submissions) {
            const blood = (s.files ?? []).filter((f) => f.kind === 'blood').length;
            const device = (s.files ?? []).filter((f) => f.kind === 'device').length;
            ev.push({ at: s.submittedAt, kind: 'intake', title: 'カウンセリング票を提出', detail: `添付 ${s.files?.length ?? 0}（血液 ${blood}・ウェアラブル ${device}）${s.complaint ? ` ・ ${s.complaint.slice(0, 40)}` : ''}`, href: `/admin/clients/${s.submissionId}` });
        }
    }
    for (const r of c.reports) ev.push({ at: r.addedAt, kind: 'report', title: `解析レポートを公開${r.label ? `：${r.label}` : ''}`, detail: `/r/${r.token}`, href: `/r/${r.token}` });
    if (c.newsletter) {
        ev.push({ at: c.newsletter.subscribedAt, kind: 'newsletter', title: c.newsletter.status === 'pending' ? 'ニュースレター登録リクエスト（確認待ち）' : 'ニュースレター登録', detail: `経路: ${c.newsletter.source}` });
        if (c.newsletter.unsubscribedAt) ev.push({ at: c.newsletter.unsubscribedAt, kind: 'newsletter', title: 'ニュースレター解除' });
    }
    for (const k of c.checks) ev.push({ at: k.createdAt, kind: 'check', title: `セルフチェック：${k.archetypeName}`, detail: `総合 ${k.total}／100 ・ E${k.axisScores.energy} M${k.axisScores.mental} R${k.axisScores.recovery} F${k.axisScores.flex}` });
    if (c.meta) ev.push({ at: c.meta.updatedAt, kind: 'status', title: `対応ステータス：${c.meta.status}`, detail: c.meta.memo ? c.meta.memo.slice(0, 60) : undefined });
    return ev.sort((a, b) => b.at.localeCompare(a.at));
}

export { formatDateTime };
