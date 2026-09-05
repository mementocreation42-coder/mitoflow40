import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { listCustomers, isCustomer, statusOf, type Customer } from '@/lib/customers';
import { formatDateTime, isBlobConfigured, isLinkSecretConfigured } from '@/lib/intake';
import styles from '../admin.module.css';

export const metadata = { title: { absolute: 'クライアント | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const STATUS_COLOR: Record<string, { bg: string; fg: string; bd: string }> = {
    '未対応': { bg: '#fdeaea', fg: '#c0392b', bd: '#e6b0aa' },
    '対応中': { bg: '#fff4e0', fg: '#8a5a00', bd: '#e5c37a' },
    '解析中': { bg: '#eaf2fd', fg: '#2c5aa0', bd: '#a9c3e8' },
    '完了': { bg: '#e9f7ef', fg: '#1e7d4f', bd: '#a3ddbf' },
    '保留': { bg: '#f0f0f0', fg: '#666', bd: '#d5d5d5' },
};

type Filter = 'all' | 'waiting' | 'paid' | 'unsubmitted' | 'subscribed';
const FILTERS: { key: Filter; label: string }[] = [
    { key: 'all', label: 'すべて' },
    { key: 'waiting', label: '対応待ち' },
    { key: 'paid', label: '決済・契約あり' },
    { key: 'unsubmitted', label: '票 未提出' },
    { key: 'subscribed', label: 'レター購読中' },
];

function matches(c: Customer, f: Filter): boolean {
    switch (f) {
        case 'waiting': return statusOf(c) === '未対応' || statusOf(c) === '対応中';
        case 'paid': return Boolean(c.paidPlan);
        case 'unsubmitted': return !c.intake;
        case 'subscribed': return c.newsletter?.status === 'active';
        default: return true;
    }
}

export default async function AdminClientsPage({ searchParams }: { searchParams: Promise<{ f?: string }> }) {
    const { f } = await searchParams;
    const filter: Filter = (FILTERS.some((x) => x.key === f) ? f : 'all') as Filter;
    const configured = isBlobConfigured();
    const linkSecretOk = isLinkSecretConfigured();
    const all = configured ? await listCustomers().catch(() => []) : [];
    const customers = all.filter(isCustomer);
    const prospects = all.filter((c) => !isCustomer(c));
    const shown = customers.filter((c) => matches(c, filter));

    return (
        <div className={styles.shell}>
            <AdminHeader active="clients" />

            <main className={styles.main} style={{ maxWidth: 820 }}>
                <p className={styles.eyebrow}>Clients</p>
                <div className={styles.titleRow}>
                    <div>
                        <h1 className={styles.title}>クライアント</h1>
                    </div>
                    <Link href="/counseling-sheet" target="_blank" className={styles.newButton}>カウンセリング票フォーム ↗</Link>
                </div>
                <p className={styles.description}>
                    カウンセリング票の提出・決済・ニュースレター・セルフチェックを、同じメールアドレスで1人の顧客にまとめています。
                    顧客 {customers.length} 名（決済のみで票未提出 {customers.filter((c) => !c.intake).length}）・見込み {prospects.length}。
                </p>

                {!linkSecretOk && (
                    <div style={{ ...cardStyle, background: '#fdeaea', borderColor: '#e6b0aa', marginTop: 16 }}>
                        <p style={{ margin: 0, color: '#8C3E25', fontWeight: 700 }}>
                            要対応：<code>INTAKE_LINK_SECRET</code> が未設定です
                        </p>
                        <p style={{ margin: '6px 0 0', color: '#8C3E25', fontSize: 13, lineHeight: 1.7 }}>
                            マイページURLが開発用の既定シークレットから算出されています。この既定値はソースコード上に書かれているため、
                            <strong>メールアドレスを知っている第三者が、そのクライアントのマイページURLを再現できます</strong>（血液検査・問診内容が閲覧されうる状態）。
                            Vercel の環境変数にランダムな文字列を設定してください。
                        </p>
                        <p style={{ margin: '6px 0 0', color: '#8C3E25', fontSize: 12 }}>
                            ※ 設定するとURLの算出結果が変わるため、<strong>すでに配布済みのマイページURLは無効になります</strong>（データは消えません）。
                        </p>
                    </div>
                )}

                {/* フィルタ＋ツール */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginTop: 20 }}>
                    {FILTERS.map((x) => {
                        const n = customers.filter((c) => matches(c, x.key)).length;
                        const active = x.key === filter;
                        return (
                            <Link key={x.key} href={x.key === 'all' ? '/admin/clients' : `/admin/clients?f=${x.key}`}
                                style={{ ...toolBtn, ...(active ? { background: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' } : {}) }}>
                                {x.label} <span style={{ opacity: .7 }}>{n}</span>
                            </Link>
                        );
                    })}
                    <span style={{ flex: 1 }} />
                    <a href="/api/admin/intake/export/csv" download style={toolBtn}>CSV</a>
                    <a href="/api/admin/intake/export" download style={toolBtn}>JSON</a>
                    <a href="/api/admin/intake/backup" target="_blank" rel="noopener noreferrer" style={toolBtn}>バックアップ</a>
                    <Link href="/admin/orders" style={{ ...toolBtn, background: '#FFF1E6', borderColor: '#F5C9A6', color: '#8C3E25', fontWeight: 700 }}>注文・契約 →</Link>
                </div>

                {!configured ? (
                    <div style={cardStyle}>
                        <p style={{ margin: 0, color: '#8C3E25' }}>
                            Blob ストレージが未設定です（<code>BLOB_READ_WRITE_TOKEN</code>）。環境変数を設定するとクライアントが表示されます。
                        </p>
                    </div>
                ) : shown.length === 0 ? (
                    <div style={cardStyle}>
                        <p style={{ margin: 0, color: '#666' }}>
                            {customers.length === 0
                                ? <>まだクライアントはいません。<Link href="/counseling-sheet" target="_blank" style={{ color: '#246E58', fontWeight: 700 }}>カウンセリング票フォーム</Link>のURLを共有してください。</>
                                : 'この条件に当てはまるクライアントはいません。'}
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 }}>
                        {shown.map((c) => <CustomerRow key={c.clientId} c={c} />)}
                    </div>
                )}

                {/* 見込み：ニュースレター／セルフチェックだけの人 */}
                {prospects.length > 0 && (
                    <details style={{ marginTop: 28 }}>
                        <summary style={{ cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>
                            見込み（レター登録・セルフチェックのみ）{prospects.length} 名
                        </summary>
                        <p style={{ margin: '6px 0 12px', fontSize: 12, color: '#666' }}>票の提出も決済もまだない人。セルフチェックの結果やレター登録の経路が見られます。</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {prospects.map((c) => <CustomerRow key={c.clientId} c={c} />)}
                        </div>
                    </details>
                )}
            </main>
        </div>
    );
}

function CustomerRow({ c }: { c: Customer }) {
    const st = statusOf(c);
    const col = STATUS_COLOR[st];
    const customer = isCustomer(c);
    return (
        <Link href={`/admin/clients/client/${c.clientId}`} style={rowStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                <span style={avatar}>{(c.name || c.email || '?').slice(0, 1)}</span>
                <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
                        {customer && <span style={{ ...badge, background: col.bg, color: col.fg, borderColor: col.bd, fontWeight: 700 }}>{st}</span>}
                        <span style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a' }}>{c.name}</span>
                        {c.paidPlan && <span style={{ ...badge, background: '#FFF1E6', borderColor: '#F5C9A6', color: '#8C3E25', fontWeight: 700 }}>¥ {c.paidPlan}{c.activeSubscription ? '（契約中）' : ''}</span>}
                        {c.intake
                            ? <span style={badge}>票 {c.intake.submissionCount} ・ 添付 {c.intake.fileCount}</span>
                            : customer && <span style={{ ...badge, background: '#fdeaea', borderColor: '#e6b0aa', color: '#c0392b' }}>票 未提出</span>}
                        {c.report && <span style={{ ...badge, background: '#e9f7ef', borderColor: '#a3ddbf', color: '#1e7d4f' }}>レポート済</span>}
                        {c.newsletter?.status === 'active' && <span style={{ ...badge, background: '#DEEDF7', borderColor: '#a9c3e8', color: '#2c5aa0' }}>レター</span>}
                        {c.checks.length > 0 && <span style={badge}>セルフチェック {c.checks.length}</span>}
                    </div>
                    <div style={{ fontSize: 12, color: '#69716e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.email}{c.gender || c.age ? ` ・ ${[c.gender, c.age && `${c.age}歳`].filter(Boolean).join(' ')}` : ''}
                    </div>
                </div>
            </div>
            <span style={{ fontSize: 11, color: '#777', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>最終 {formatDateTime(c.lastActivityAt)}</span>
        </Link>
    );
}

const toolBtn: React.CSSProperties = { padding: '6px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 999, fontSize: 12, color: '#555', textDecoration: 'none' };
const cardStyle: React.CSSProperties = { marginTop: 28, padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const rowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '14px 18px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, textDecoration: 'none' };
const badge: React.CSSProperties = { padding: '2px 7px', borderRadius: 999, color: '#59625f', background: '#f1f4f3', border: '1px solid #dde3e0', fontSize: 10 };
const avatar: React.CSSProperties = { width: 40, height: 40, flexShrink: 0, borderRadius: 999, display: 'grid', placeItems: 'center', background: '#D7F7ED', border: '1px solid #94DFC9', color: '#246E58', fontWeight: 800, fontSize: 16 };
