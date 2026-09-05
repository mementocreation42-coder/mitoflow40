import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { listAllOrders, ORDER_STATUS_LABEL, type OrderStatus } from '@/lib/orders';
import { formatJpy, PLANS } from '@/lib/products';
import { formatDateTime, isBlobConfigured } from '@/lib/intake';
import { isStripeConfigured, isStripeTestMode, isWebhookConfigured, SITE_URL } from '@/lib/stripe';
import { checkStripeProducts } from '@/lib/stripe-sync';
import { syncProductsAction } from './actions';
import styles from '../admin.module.css';

export const metadata = { title: { absolute: '注文・契約 | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const STATUS_COLOR: Record<OrderStatus, { bg: string; fg: string; bd: string }> = {
    paid: { bg: '#e9f7ef', fg: '#1e7d4f', bd: '#a3ddbf' },
    active: { bg: '#e9f7ef', fg: '#1e7d4f', bd: '#a3ddbf' },
    pending: { bg: '#fff4e0', fg: '#8a5a00', bd: '#e5c37a' },
    past_due: { bg: '#fdeaea', fg: '#c0392b', bd: '#e6b0aa' },
    failed: { bg: '#fdeaea', fg: '#c0392b', bd: '#e6b0aa' },
    refunded: { bg: '#f0f0f0', fg: '#666', bd: '#d5d5d5' },
    canceled: { bg: '#f0f0f0', fg: '#666', bd: '#d5d5d5' },
};

export default async function AdminOrdersPage() {
    const blobOk = isBlobConfigured();
    const stripeOk = isStripeConfigured();
    const webhookOk = isWebhookConfigured();
    const testMode = isStripeTestMode();
    const orders = blobOk ? await listAllOrders().catch(() => []) : [];
    const products = stripeOk ? await checkStripeProducts().catch(() => []) : [];
    const needsSync = products.some((p) => p.state === 'missing');
    const dashboardBase = testMode ? 'https://dashboard.stripe.com/test' : 'https://dashboard.stripe.com';

    const revenue = orders.filter((o) => o.status === 'paid' || o.status === 'active').reduce((n, o) => n + o.amountJpy, 0);
    const activeSubs = orders.filter((o) => o.kind === 'subscription' && (o.status === 'active' || o.status === 'past_due')).length;

    return (
        <div className={styles.shell}>
            <AdminHeader active="orders" />

            <main className={styles.main} style={{ maxWidth: 820 }}>
                <p className={styles.eyebrow}>Orders & Billing</p>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>注文・契約</h1>
                    <span className={styles.resultMeta}>
                        {orders.length} 件 ・ 契約中 {activeSubs} ・ 入金合計 {formatJpy(revenue)}
                        {stripeOk && <span style={{ ...badge, marginLeft: 8, ...(testMode ? { background: '#fff4e0', color: '#8a5a00', borderColor: '#e5c37a' } : { background: '#e9f7ef', color: '#1e7d4f', borderColor: '#a3ddbf' }) }}>{testMode ? 'TEST MODE' : 'LIVE'}</span>}
                    </span>
                </div>
                <p className={styles.description}>
                    Stripe Checkout 経由のお申し込み。決済の正はStripe、ここはマイページ・クライアント管理用の要約です。
                    <a href={`${dashboardBase}/payments`} target="_blank" rel="noopener noreferrer" style={link}> Stripe ダッシュボード ↗</a>
                </p>

                {/* セットアップ状態 */}
                <section style={{ ...panel, marginTop: 20 }}>
                    <h2 style={h2}>セットアップ状態</h2>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8, fontSize: 13 }}>
                        <Check ok={stripeOk} label="STRIPE_SECRET_KEY" hint="Stripe ダッシュボード → 開発者 → APIキー。Vercel の環境変数に設定" />
                        <Check ok={webhookOk} label="STRIPE_WEBHOOK_SECRET" hint={`Webhook エンドポイント ${SITE_URL}/api/webhooks/stripe を登録し、署名シークレットを設定`} />
                        <Check ok={blobOk} label="BLOB_READ_WRITE_TOKEN" hint="注文記録の保存先（カウンセリング票と共通）" />
                    </ul>
                    {!webhookOk && (
                        <p style={{ margin: '12px 0 0', fontSize: 12, color: '#8C3E25', lineHeight: 1.7 }}>
                            Webhook が未設定だと、決済が成立しても注文が記録されず、確認メールも送られません。
                            購読イベント：<code>checkout.session.completed</code>, <code>checkout.session.async_payment_succeeded</code>, <code>checkout.session.async_payment_failed</code>, <code>customer.subscription.updated</code>, <code>customer.subscription.deleted</code>, <code>charge.refunded</code>
                        </p>
                    )}
                </section>

                {/* 商品同期 */}
                <section style={{ ...panel, marginTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                        <h2 style={{ ...h2, margin: 0 }}>プラン（lib/products.ts ⇄ Stripe）</h2>
                        {stripeOk && (
                            <form action={syncProductsAction}>
                                <button type="submit" className={styles.newButton} style={{ border: '1px solid #1a1a1a', ...(needsSync ? {} : { background: '#fff' }) }}>
                                    {needsSync ? 'Stripe に商品を作成する' : '再チェック'}
                                </button>
                            </form>
                        )}
                    </div>
                    <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
                        {(products.length ? products : PLANS.map((p) => ({ planId: p.id, name: p.name, lookupKey: p.stripeLookupKey, state: 'skipped' as const, detail: stripeOk ? '' : 'STRIPE_SECRET_KEY 未設定', priceId: undefined as string | undefined }))).map((p) => {
                            const col = p.state === 'ok' || p.state === 'created' ? STATUS_COLOR.paid : p.state === 'missing' ? STATUS_COLOR.pending : p.state === 'mismatch' ? STATUS_COLOR.failed : STATUS_COLOR.canceled;
                            const label = { ok: '登録済み', created: '作成済み', missing: '未登録', mismatch: '不一致', skipped: '—' }[p.state];
                            return (
                                <div key={p.planId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 12, background: '#fff' }}>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name} <code style={{ fontSize: 11, color: '#777', fontWeight: 400 }}>{p.lookupKey}</code></div>
                                        <div style={{ fontSize: 12, color: '#666' }}>
                                            {p.detail}
                                            {p.priceId && <a href={`${dashboardBase}/prices/${p.priceId}`} target="_blank" rel="noopener noreferrer" style={{ ...link, marginLeft: 8 }}>Stripe で見る ↗</a>}
                                        </div>
                                    </div>
                                    <span style={{ ...badge, background: col.bg, color: col.fg, borderColor: col.bd, fontWeight: 700 }}>{label}</span>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 注文一覧 */}
                <section style={{ marginTop: 28 }}>
                    <h2 style={h2}>注文一覧</h2>
                    {!blobOk ? (
                        <div style={panel}><p style={{ margin: 0, color: '#8C3E25' }}>Blob ストレージが未設定です（<code>BLOB_READ_WRITE_TOKEN</code>）。</p></div>
                    ) : orders.length === 0 ? (
                        <div style={panel}><p style={{ margin: 0, color: '#666' }}>まだ注文はありません。<Link href="/plans" target="_blank" style={link}>料金ページ ↗</Link> から申し込みが入るとここに表示されます。</p></div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {orders.map((o) => {
                                const col = STATUS_COLOR[o.status];
                                const stripeUrl = o.stripeSubscriptionId
                                    ? `${dashboardBase}/subscriptions/${o.stripeSubscriptionId}`
                                    : o.stripePaymentIntentId ? `${dashboardBase}/payments/${o.stripePaymentIntentId}` : `${dashboardBase}/payments`;
                                return (
                                    <div key={o.orderId} style={rowStyle}>
                                        <div style={{ minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                                                <span style={{ ...badge, background: col.bg, color: col.fg, borderColor: col.bd, fontWeight: 700 }}>{ORDER_STATUS_LABEL[o.status]}</span>
                                                <span style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a' }}>{o.planName}</span>
                                                <span style={badge}>{o.kind === 'subscription' ? '月額' : '単発'}</span>
                                                {!o.livemode && <span style={{ ...badge, background: '#fff4e0', color: '#8a5a00', borderColor: '#e5c37a' }}>TEST</span>}
                                                {o.relinkedFrom && <span style={{ ...badge, background: '#eaf2fd', color: '#2c5aa0', borderColor: '#a9c3e8' }} title={`元の顧客ID ${o.relinkedFrom}`}>付け替え済</span>}
                                            </div>
                                            <div style={{ fontSize: 12, color: '#69716e' }}>
                                                <Link href={`/admin/clients/client/${o.clientId}`} style={link}>{o.name || '（無名）'}</Link>
                                                {' ・ '}{o.email}
                                                {o.kind === 'subscription' && o.currentPeriodEnd && <> ・ {o.cancelAtPeriodEnd ? '終了予定' : '次回更新'} {formatDateTime(o.currentPeriodEnd).slice(0, 10)}</>}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                            <div style={{ fontWeight: 800, fontSize: 15, fontVariantNumeric: 'tabular-nums' }}>{formatJpy(o.amountJpy)}</div>
                                            <div style={{ fontSize: 11, color: '#777' }}>{formatDateTime(o.createdAt)} ・ <a href={stripeUrl} target="_blank" rel="noopener noreferrer" style={link}>Stripe ↗</a></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

function Check({ ok, label, hint }: { ok: boolean; label: string; hint: string }) {
    return (
        <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ ...badge, fontWeight: 700, ...(ok ? { background: '#e9f7ef', color: '#1e7d4f', borderColor: '#a3ddbf' } : { background: '#fdeaea', color: '#c0392b', borderColor: '#e6b0aa' }) }}>{ok ? 'OK' : '未設定'}</span>
            <span><code>{label}</code><span style={{ color: '#777', marginLeft: 8, fontSize: 12 }}>{hint}</span></span>
        </li>
    );
}

const link: React.CSSProperties = { color: '#246E58', fontWeight: 700, textDecoration: 'none' };
const panel: React.CSSProperties = { padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const h2: React.CSSProperties = { margin: '0 0 12px', fontSize: 15, fontWeight: 800 };
const rowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '14px 18px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const badge: React.CSSProperties = { padding: '2px 7px', borderRadius: 999, color: '#59625f', background: '#f1f4f3', border: '1px solid #dde3e0', fontSize: 10 };
