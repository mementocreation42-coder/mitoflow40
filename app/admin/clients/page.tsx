import Link from 'next/link';
import { logout } from '@/app/login/actions';
import { listClients, getClientMeta, formatDateTime, isBlobConfigured, isLinkSecretConfigured } from '@/lib/intake';
import styles from '../admin.module.css';

export const metadata = { title: { absolute: 'クライアント一覧 | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const STATUS_COLOR: Record<string, { bg: string; fg: string; bd: string }> = {
    '未対応': { bg: '#fdeaea', fg: '#c0392b', bd: '#e6b0aa' },
    '対応中': { bg: '#fff4e0', fg: '#8a5a00', bd: '#e5c37a' },
    '解析中': { bg: '#eaf2fd', fg: '#2c5aa0', bd: '#a9c3e8' },
    '完了': { bg: '#e9f7ef', fg: '#1e7d4f', bd: '#a3ddbf' },
    '保留': { bg: '#f0f0f0', fg: '#666', bd: '#d5d5d5' },
};

export default async function AdminClientsPage() {
    const configured = isBlobConfigured();
    const linkSecretOk = isLinkSecretConfigured();
    const clients = configured ? await listClients() : [];
    const metas = configured ? await Promise.all(clients.map((c) => getClientMeta(c.clientId))) : [];
    const statusOf = new Map(clients.map((c, i) => [c.clientId, metas[i]?.status]));

    return (
        <div className={styles.shell}>
            <header className={styles.header}>
                <Link href="/admin/journal" className={styles.brand} aria-label="管理ダッシュボードへ">
                    <span className={styles.brandMark}>M</span>
                    <span>
                        <span className={styles.brandName}>Mitoflow40 Admin</span>
                        <span className={styles.brandMeta}>Clients</span>
                    </span>
                </Link>
                <div className={styles.headerActions}>
                    <Link href="/admin/journal" className={styles.newButton}>← 記事管理</Link>
                    <form action={logout}><button type="submit" className={styles.logout}>ログアウト</button></form>
                </div>
            </header>

            <main className={styles.main} style={{ maxWidth: 680 }}>
                <p className={styles.eyebrow}>Client Intake</p>
                <div className={styles.titleRow}>
                    <div>
                        <h1 className={styles.title}>クライアント一覧</h1>
                    </div>
                    <Link href="/counseling-sheet" target="_blank" className={styles.newButton}>カウンセリング票フォーム ↗</Link>
                </div>
                <span className={styles.resultMeta}>{clients.length} 名</span>
                <p className={styles.description}>/counseling-sheet からカウンセリング票を提出したクライアントの一覧。同じメールアドレスの提出はまとめています。最近提出した順。</p>

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

                {/* データ操作ツールバー（控えめに揃える） */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginTop: 16 }}>
                    <span style={{ fontSize: 11, color: '#999', marginRight: 2 }}>エクスポート</span>
                    <a href="/api/admin/intake/export/csv" download style={toolBtn}>CSV</a>
                    <a href="/api/admin/intake/export" download style={toolBtn}>JSON</a>
                    <a href="/api/admin/intake/backup" target="_blank" rel="noopener noreferrer" style={toolBtn}>バックアップ実行</a>
                </div>

                {!configured ? (
                    <div style={cardStyle}>
                        <p style={{ margin: 0, color: '#8C3E25' }}>
                            Blob ストレージが未設定です（<code>BLOB_READ_WRITE_TOKEN</code>）。環境変数を設定するとクライアントが表示されます。
                        </p>
                    </div>
                ) : clients.length === 0 ? (
                    <div style={cardStyle}>
                        <p style={{ margin: 0, color: '#666' }}>まだクライアントはいません。<Link href="/counseling-sheet" target="_blank" style={{ color: '#246E58', fontWeight: 700 }}>カウンセリング票フォーム</Link>のURLを共有してください。</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
                        {clients.map((c) => (
                            <Link key={c.clientId} href={`/admin/clients/client/${c.clientId}`} style={rowStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                                    <span style={avatar}>{(c.name || c.email || '?').slice(0, 1)}</span>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                                            {(() => { const st = statusOf.get(c.clientId); const col = st ? STATUS_COLOR[st] : STATUS_COLOR['未対応']; return <span style={{ ...badge, background: col.bg, color: col.fg, borderColor: col.bd, fontWeight: 700 }}>{st ?? '未対応'}</span>; })()}
                                            <span style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a' }}>{c.name || '（無名）'}</span>
                                            <span style={badge}>票 {c.submissionCount} 件</span>
                                            <span style={{ ...badge, background: '#EAF6F1', borderColor: '#B8E4D7', color: '#246E58' }}>{c.fileCount} ファイル</span>
                                        </div>
                                        <div style={{ fontSize: 12, color: '#69716e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.email}</div>
                                    </div>
                                </div>
                                <span style={{ fontSize: 11, color: '#777', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>最終 {formatDateTime(c.latestAt)}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

const toolBtn: React.CSSProperties = { padding: '6px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 999, fontSize: 12, color: '#555', textDecoration: 'none' };
const cardStyle: React.CSSProperties = { marginTop: 28, padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const rowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '16px 18px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const badge: React.CSSProperties = { padding: '2px 7px', borderRadius: 999, color: '#59625f', background: '#f1f4f3', border: '1px solid #dde3e0', fontSize: 10 };
const avatar: React.CSSProperties = { width: 40, height: 40, flexShrink: 0, borderRadius: 999, display: 'grid', placeItems: 'center', background: '#D7F7ED', border: '1px solid #94DFC9', color: '#246E58', fontWeight: 800, fontSize: 16 };
