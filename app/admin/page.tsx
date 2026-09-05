import Link from 'next/link';
import AdminHeader, { inboxUrl } from '@/components/admin/AdminHeader';
import DaVinciLink from '@/components/admin/DaVinciLink';
import { formatDateTime, isBlobConfigured, isLinkSecretConfigured, type ClientStatus } from '@/lib/intake';
import { listCustomers, isCustomer, statusOf } from '@/lib/customers';
import { listAllOrders } from '@/lib/orders';
import { formatJpy } from '@/lib/products';
import { isStripeConfigured } from '@/lib/stripe';
import { listSubscribers, listIssues, isNewsletterConfigured } from '@/lib/newsletter';
import { getLatestPosts } from '@/lib/wp';
import { memo } from '@/lib/req-cache';
import styles from './admin.module.css';

// 管理画面の入口＝ダッシュボード。
// 「決済 → 案内 → シート提出 → 取り込み → 解析 → 公開」の流れの中で、いま何が待っているかを一望する。
export const metadata = { title: { absolute: 'ダッシュボード | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const STATUS_COLOR: Record<string, { bg: string; fg: string; bd: string }> = {
    '未対応': { bg: '#fdeaea', fg: '#c0392b', bd: '#e6b0aa' },
    '対応中': { bg: '#fff4e0', fg: '#8a5a00', bd: '#e5c37a' },
    '解析中': { bg: '#eaf2fd', fg: '#2c5aa0', bd: '#a9c3e8' },
    '完了': { bg: '#e9f7ef', fg: '#1e7d4f', bd: '#a3ddbf' },
    '保留': { bg: '#f0f0f0', fg: '#666', bd: '#d5d5d5' },
};

export default async function AdminDashboardPage() {
    const blobOk = isBlobConfigured();
    const [customersAll, orders, subs, issues, posts] = await Promise.all([
        blobOk ? listCustomers().catch(() => []) : Promise.resolve([]),
        blobOk ? listAllOrders().catch(() => []) : Promise.resolve([]),
        blobOk ? listSubscribers().catch(() => []) : Promise.resolve([]),
        blobOk ? listIssues().catch(() => []) : Promise.resolve([]),
        memo('wp:latest3', 5 * 60_000, () => getLatestPosts(3)).catch(() => []),
    ]);
    const inbox = await inboxUrl();
    const clients = customersAll.filter(isCustomer); // 票を出した人＋決済した人

    const counts = { 未対応: 0, 対応中: 0, 解析中: 0, 完了: 0, 保留: 0 } as Record<ClientStatus, number>;
    for (const c of clients) counts[statusOf(c)]++;
    const waiting = clients.filter((c) => statusOf(c) === '未対応' || statusOf(c) === '対応中').slice(0, 6);

    const activeSubs = orders.filter((o) => o.kind === 'subscription' && (o.status === 'active' || o.status === 'past_due')).length;
    const paidOnce = orders.filter((o) => o.kind === 'one_time' && o.status === 'paid').length;
    const revenue = orders.filter((o) => o.status === 'paid' || o.status === 'active').reduce((n, o) => n + o.amountJpy, 0);
    const recentOrders = orders.slice(0, 4);

    const nl = { active: subs.filter((s) => s.status === 'active').length, pending: subs.filter((s) => s.status === 'pending').length, drafts: issues.filter((i) => i.status === 'draft').length, sent: issues.filter((i) => i.status === 'sent').length };
    const nlCfg = isNewsletterConfigured();

    const warnings: string[] = [];
    if (!blobOk) warnings.push('BLOB_READ_WRITE_TOKEN が未設定：クライアント・注文・購読者を保存できません');
    if (!isLinkSecretConfigured()) warnings.push('INTAKE_LINK_SECRET が未設定：マイページURLが推測されうる状態です');
    if (!isStripeConfigured()) warnings.push('Stripe 未接続：料金ページのボタンは「準備中」表示です');
    if (!nlCfg.resend) warnings.push('RESEND_API_KEY 未設定：メール送信・ニュースレター配信ができません');

    return (
        <div className={styles.shell}>
            <AdminHeader active="dashboard" />
            <main className={styles.main} style={{ maxWidth: 1000 }}>
                <p className={styles.eyebrow}>Dashboard</p>
                <div className={styles.titleRow}>
                    <div>
                        <h1 className={styles.title}>いま、何が待っているか</h1>
                        <p className={styles.description}>決済 → 案内メール → シート提出 → DaVinci24 で取り込み → 解析 → 公開して顧客に紐付け。</p>
                    </div>
                    <span className={styles.resultMeta}>{formatDateTime(new Date().toISOString())}</span>
                </div>

                {warnings.length > 0 && (
                    <div style={{ ...panel, marginTop: 20, background: '#fdeaea', borderColor: '#e6b0aa' }}>
                        <p style={{ margin: 0, fontWeight: 700, color: '#8C3E25', fontSize: 13 }}>要対応の設定</p>
                        <ul style={{ margin: '6px 0 0', paddingLeft: 18, fontSize: 12, color: '#8C3E25', lineHeight: 1.8 }}>{warnings.map((w) => <li key={w}>{w}</li>)}</ul>
                    </div>
                )}

                {/* 数字のタイル */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginTop: 24 }}>
                    <Tile label="未対応のクライアント" value={String(counts['未対応'])} sub={`対応中 ${counts['対応中']} ・ 解析中 ${counts['解析中']}`} href="/admin/clients" accent="#fdeaea" />
                    <Tile label="契約中（月額）" value={String(activeSubs)} sub={`単発 入金 ${paidOnce} 件`} href="/admin/orders" accent="#FFF1E6" />
                    <Tile label="入金合計" value={formatJpy(revenue)} sub={`注文 ${orders.length} 件`} href="/admin/orders" accent="#EAF6F1" />
                    <Tile label="購読者" value={String(nl.active)} sub={`確認待ち ${nl.pending} ・ 下書き ${nl.drafts} ・ 配信済 ${nl.sent}`} href="/admin/newsletter" accent="#DEEDF7" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)', gap: 16, marginTop: 20 }}>
                    {/* 待っているクライアント */}
                    <section style={panel}>
                        <div style={rowHead}>
                            <h2 style={h2}>対応待ちのクライアント</h2>
                            <Link href="/admin/clients" style={link}>すべて →</Link>
                        </div>
                        {!blobOk ? (
                            <p style={muted}>Blob 未設定のため表示できません。</p>
                        ) : waiting.length === 0 ? (
                            <p style={muted}>対応待ちはありません。</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {waiting.map((c) => {
                                    const st = statusOf(c);
                                    const col = STATUS_COLOR[st];
                                    return (
                                        <Link key={c.clientId} href={`/admin/clients/client/${c.clientId}`} style={row}>
                                            <div style={{ minWidth: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                                    <span style={{ ...badge, background: col.bg, color: col.fg, borderColor: col.bd, fontWeight: 700 }}>{st}</span>
                                                    <span style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</span>
                                                    {c.paidPlan && <span style={{ ...badge, background: '#FFF1E6', borderColor: '#F5C9A6', color: '#8C3E25' }}>¥ {c.paidPlan}</span>}
                                                    {c.intake ? <span style={badge}>票 {c.intake.submissionCount} ・ 添付 {c.intake.fileCount}</span> : <span style={{ ...badge, background: '#fdeaea', borderColor: '#e6b0aa', color: '#c0392b' }}>票 未提出</span>}
                                                </div>
                                                <div style={{ fontSize: 11, color: '#69716e', marginTop: 3 }}>{c.email}{c.intake?.submissions[0]?.complaint ? ` ・ ${c.intake.submissions[0].complaint.slice(0, 40)}` : ''}</div>
                                            </div>
                                            <span style={{ fontSize: 11, color: '#777', whiteSpace: 'nowrap' }}>{formatDateTime(c.lastActivityAt)}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                        <p style={{ ...muted, marginTop: 12 }}>
                            提出が届いたら → <DaVinciLink href={inbox} className="" title="DaVinci24 受付を開く">
                                <span style={link}>DaVinci24 受付 ↗</span>
                            </DaVinciLink> の「サイトの提出から取り込む」→ 感覚メモ →「DaVinci24 で ◯◯ を読んで」。
                        </p>
                    </section>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* 最近の注文 */}
                        <section style={panel}>
                            <div style={rowHead}>
                                <h2 style={h2}>最近の注文</h2>
                                <Link href="/admin/orders" style={link}>注文・契約 →</Link>
                            </div>
                            {recentOrders.length === 0 ? <p style={muted}>まだ注文はありません。</p> : (
                                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6, fontSize: 12 }}>
                                    {recentOrders.map((o) => (
                                        <li key={o.orderId} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                                            <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                <Link href={`/admin/clients/client/${o.clientId}`} style={{ ...link, fontWeight: 600 }}>{o.name || o.email}</Link>
                                                <span style={{ color: '#777' }}> ・ {o.planName}{!o.livemode ? ' ・ TEST' : ''}</span>
                                            </span>
                                            <span style={{ whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{formatJpy(o.amountJpy)}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>

                        {/* 記事 */}
                        <section style={panel}>
                            <div style={rowHead}>
                                <h2 style={h2}>記事</h2>
                                <Link href="/admin/posts" style={link}>記事管理 →</Link>
                            </div>
                            {posts.length === 0 ? <p style={muted}>記事を取得できませんでした。</p> : (
                                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6, fontSize: 12 }}>
                                    {posts.map((p) => (
                                        <li key={p.id} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            <span style={{ color: '#777', marginRight: 6 }}>{String(p.date).slice(0, 10)}</span>
                                            <Link href={`/admin/posts/${p.id}/edit`} style={{ color: '#1a1a1a', textDecoration: 'none' }} dangerouslySetInnerHTML={{ __html: p.title?.rendered ?? '' }} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div style={{ marginTop: 10 }}><Link href="/admin/post" className={styles.newButton} style={{ border: '1px solid #1a1a1a', fontSize: 11, padding: '6px 12px' }}>＋ 新規記事</Link></div>
                        </section>

                        {/* DaVinci24 */}
                        <section style={{ ...panel, background: '#D7F7ED', borderColor: '#94DFC9' }}>
                            <h2 style={{ ...h2, marginBottom: 6 }}>DaVinci24（受付・読み取り）</h2>
                            <p style={{ ...muted, color: '#246E58', margin: 0 }}>
                                解析者の Mac で動くローカルの受付です。起動していれば <DaVinciLink href={inbox} title="DaVinci24 受付を開く"><span style={link}>localhost:2424 ↗</span></DaVinciLink>。
                                止まっているときは Claude Code に「受付を開いて」。
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

function Tile({ label, value, sub, href, accent }: { label: string; value: string; sub: string; href: string; accent: string }) {
    return (
        <Link href={href} style={{ ...panel, background: accent, textDecoration: 'none', color: '#1a1a1a', display: 'block' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#555' }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
            <div style={{ fontSize: 11, color: '#69716e', marginTop: 4 }}>{sub}</div>
        </Link>
    );
}

const panel: React.CSSProperties = { padding: 18, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const rowHead: React.CSSProperties = { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 10 };
const h2: React.CSSProperties = { margin: 0, fontSize: 14, fontWeight: 800 };
const link: React.CSSProperties = { color: '#246E58', fontWeight: 700, textDecoration: 'none', fontSize: 12 };
const muted: React.CSSProperties = { margin: 0, color: '#777', fontSize: 12, lineHeight: 1.7 };
const row: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 12, background: '#fff', textDecoration: 'none', color: '#1a1a1a' };
const badge: React.CSSProperties = { padding: '2px 7px', borderRadius: 999, color: '#59625f', background: '#f1f4f3', border: '1px solid #dde3e0', fontSize: 10 };
