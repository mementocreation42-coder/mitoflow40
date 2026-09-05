import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { listSubscribers, isNewsletterConfigured } from '@/lib/newsletter';
import { formatDateTime } from '@/lib/intake';
import { syncSubscribersAction, unsubscribeAdminAction, resendConfirmationAction, pushToResendAction } from '../actions';
import styles from '../../admin.module.css';

export const metadata = { title: { absolute: '購読者 | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const SOURCE_LABEL: Record<string, string> = {
    'newsletter-page': '登録ページ', journal: 'ジャーナル', check: 'セルフチェック', footer: 'フッター', library: 'ライブラリ', resend: 'Resend', other: 'その他', unknown: '不明',
};

export default async function AdminSubscribersPage({ searchParams }: { searchParams: Promise<{ pushed?: string; failed?: string; error?: string }> }) {
    const { pushed, failed, error } = await searchParams;
    const cfg = isNewsletterConfigured();
    const subs = cfg.blob ? await listSubscribers().catch(() => []) : [];
    const active = subs.filter((s) => s.status === 'active');
    const pending = subs.filter((s) => s.status === 'pending');
    const unsynced = active.filter((s) => !s.resendContactId).length;
    const bySource = new Map<string, number>();
    for (const s of active) bySource.set(s.source, (bySource.get(s.source) ?? 0) + 1);

    return (
        <div className={styles.shell}>
            <AdminHeader active="newsletter" back={{ href: '/admin/newsletter', label: 'ニュースレター' }} />

            <main className={styles.main} style={{ maxWidth: 820 }}>
                <p className={styles.eyebrow}>Subscribers</p>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>購読者</h1>
                    <span className={styles.resultMeta}>有効 {active.length} ・ 確認待ち {pending.length} ・ 解除 {subs.filter((s) => s.status === 'unsubscribed').length}</span>
                </div>
                <p className={styles.description}>
                    経路：{Array.from(bySource.entries()).map(([k, n]) => `${SOURCE_LABEL[k] ?? k} ${n}`).join(' ・ ') || '—'}
                </p>

                {(pushed !== undefined || error) && (
                    <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 12, border: '1px solid', fontSize: 13, fontWeight: 700, ...(error ? { background: '#fdeaea', borderColor: '#e6b0aa', color: '#8C3E25' } : { background: '#e9f7ef', borderColor: '#a3ddbf', color: '#1e7d4f' }) }}>
                        {error ? `同期できませんでした：${error}` : `Resend に同期しました：${pushed} 件（失敗 ${failed ?? 0}）`}
                    </div>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginTop: 16 }}>
                    <a href="/api/admin/newsletter/export" download style={toolBtn}>CSV エクスポート</a>
                    {cfg.resend && (
                        <>
                            <form action={pushToResendAction}><button type="submit" style={{ ...toolBtn, cursor: 'pointer', ...(unsynced > 0 ? { background: '#DEEDF7', color: '#1a1a1a', borderColor: '#1a1a1a' } : {}) }}>Resend に一括同期{unsynced > 0 ? `（未同期 ${unsynced}）` : ''}</button></form>
                            <form action={syncSubscribersAction}><button type="submit" style={{ ...toolBtn, cursor: 'pointer' }}>Resend から取り込み（解除を反映）</button></form>
                        </>
                    )}
                    <span style={{ fontSize: 11, color: '#999' }}>
                        {cfg.resend ? '「一括同期」＝集めたリストを配信対象に登録。「取り込み」＝メール内リンクでの解除を台帳へ反映' : 'RESEND_API_KEY を設定すると、集めたリストを配信対象に同期できます。CSV はいつでも取り出せます'}
                    </span>
                </div>

                {subs.length === 0 ? (
                    <div style={{ ...panel, marginTop: 28 }}><p style={{ margin: 0, color: '#666' }}>まだ購読者はいません。<Link href="/newsletter" target="_blank" style={link}>登録ページ ↗</Link> のURLを共有してください。</p></div>
                ) : (
                    <div style={{ marginTop: 28, overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead>
                                <tr style={{ textAlign: 'left', color: '#777', fontSize: 11 }}>
                                    <th style={th}>メール</th><th style={th}>状態</th><th style={th}>経路</th><th style={th}>登録日</th><th style={th}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {subs.map((s) => (
                                    <tr key={s.email} style={{ borderTop: '1px solid var(--border)' }}>
                                        <td style={td}>{s.email}</td>
                                        <td style={td}>
                                            <span style={{ ...badge, fontWeight: 700, ...(s.status === 'active' ? { background: '#e9f7ef', color: '#1e7d4f', borderColor: '#a3ddbf' } : s.status === 'pending' ? { background: '#fff4e0', color: '#8a5a00', borderColor: '#e5c37a' } : { background: '#f0f0f0', color: '#666', borderColor: '#d5d5d5' }) }}>{s.status === 'active' ? '有効' : s.status === 'pending' ? '確認待ち' : '解除'}</span>
                                            {s.status === 'active' && s.resendContactId && <span style={{ ...badge, marginLeft: 4 }}>同期済</span>}
                                        </td>
                                        <td style={td}>{SOURCE_LABEL[s.source] ?? s.source}</td>
                                        <td style={{ ...td, whiteSpace: 'nowrap' }}>{formatDateTime(s.subscribedAt)}</td>
                                        <td style={{ ...td, textAlign: 'right', whiteSpace: 'nowrap' }}>
                                            {s.status === 'pending' && cfg.resend && (
                                                <form action={resendConfirmationAction} style={{ display: 'inline-block', marginRight: 6 }}>
                                                    <input type="hidden" name="email" value={s.email} />
                                                    <button type="submit" style={{ ...toolBtn, cursor: 'pointer', padding: '4px 10px', fontSize: 11 }}>確認メール再送</button>
                                                </form>
                                            )}
                                            {s.status !== 'unsubscribed' && (
                                                <form action={unsubscribeAdminAction}>
                                                    <input type="hidden" name="email" value={s.email} />
                                                    <button type="submit" style={{ ...toolBtn, cursor: 'pointer', padding: '4px 10px', fontSize: 11 }}>解除</button>
                                                </form>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}

const link: React.CSSProperties = { color: '#246E58', fontWeight: 700, textDecoration: 'none' };
const panel: React.CSSProperties = { padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const toolBtn: React.CSSProperties = { padding: '6px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 999, fontSize: 12, color: '#555', textDecoration: 'none' };
const badge: React.CSSProperties = { padding: '2px 7px', borderRadius: 999, color: '#59625f', background: '#f1f4f3', border: '1px solid #dde3e0', fontSize: 10 };
const th: React.CSSProperties = { padding: '8px 10px', fontWeight: 700 };
const td: React.CSSProperties = { padding: '10px 10px', verticalAlign: 'middle' };
