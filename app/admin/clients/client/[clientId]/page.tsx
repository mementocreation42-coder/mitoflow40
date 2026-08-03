import Link from 'next/link';
import { notFound } from 'next/navigation';
import { logout } from '@/app/login/actions';
import { getClient, getClientReport, getClientMeta, formatDateTime, questionnaireEntries, CLIENT_STATUSES } from '@/lib/intake';
import { saveClientReport, saveClientMeta, deleteClientAction, deleteSubmissionAction } from '../../actions';
import styles from '../../../admin.module.css';

export const metadata = { title: { absolute: 'クライアント詳細 | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

function isImage(type: string): boolean {
    return type.startsWith('image/');
}

export default async function AdminClientDetailPage({ params }: { params: Promise<{ clientId: string }> }) {
    const { clientId } = await params;
    const client = await getClient(clientId);
    if (!client) notFound();
    const report = await getClientReport(clientId);
    const meta = await getClientMeta(clientId);

    return (
        <div className={styles.shell}>
            <header className={styles.header}>
                <Link href="/admin/clients" className={styles.brand} aria-label="クライアント一覧へ">
                    <span className={styles.brandMark}>M</span>
                    <span>
                        <span className={styles.brandName}>Mitoflow40 Admin</span>
                        <span className={styles.brandMeta}>Clients</span>
                    </span>
                </Link>
                <div className={styles.headerActions}>
                    <Link href="/admin/clients" className={styles.logout}>← クライアント一覧</Link>
                    <form action={logout}><button type="submit" className={styles.logout}>ログアウト</button></form>
                </div>
            </header>

            <main className={styles.main} style={{ maxWidth: 820 }}>
                <p className={styles.eyebrow}>Client</p>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>{client.name || '（無名）'}</h1>
                    <span className={styles.resultMeta}>カウンセリング票 {client.submissionCount} 件</span>
                </div>
                <p className={styles.description}>
                    <a href={`mailto:${client.email}`} style={link}>{client.email}</a>
                    {' ・ '}最終更新 {formatDateTime(client.latestAt)}
                </p>
                <div style={{ marginTop: 12, padding: '10px 14px', background: '#F5FCFA', border: '1px solid #B8E4D7', borderRadius: 12, fontSize: 12, color: '#246E58' }}>
                    本人用マイページ：<a href={`/counseling-sheet/my/${client.clientId}`} target="_blank" rel="noopener noreferrer" style={{ ...link, wordBreak: 'break-all' }}>/counseling-sheet/my/{client.clientId}</a>
                    <span style={{ color: '#69716e' }}>（このURLをクライアントに送ると、本人が登録内容の確認・追記をできます）</span>
                </div>

                {/* 解析レポートの紐付け */}
                <section style={{ ...panel, marginTop: 16 }}>
                    <h2 style={h2}>解析レポート</h2>
                    {report ? (
                        <p style={{ margin: '0 0 12px', fontSize: 13, color: '#333' }}>
                            現在の紐付け：<a href={`/r/${report.token}`} target="_blank" rel="noopener noreferrer" style={link}>/r/{report.token}</a>
                            <span style={{ color: '#777' }}>（{formatDateTime(report.updatedAt)} 更新・マイページに表示中）</span>
                        </p>
                    ) : (
                        <p style={{ margin: '0 0 12px', fontSize: 13, color: '#777' }}>まだ紐付けられていません。レポートのトークンかURL（/r/… や解析サンプルのURL）を貼り付けてください。</p>
                    )}
                    <form action={saveClientReport} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <input type="hidden" name="clientId" value={client.clientId} />
                        <input name="token" defaultValue={report?.token ?? ''} placeholder="例: SbCtC5JII0uqihoUR4Bf44l または /r/SbCtC5JII0uqihoUR4Bf44l"
                            style={{ flex: 1, minWidth: 260, height: 40, padding: '0 14px', border: '1px solid var(--border)', borderRadius: 999, fontSize: 13 }} />
                        <button type="submit" className={styles.newButton} style={{ border: '1px solid #1a1a1a' }}>紐付ける</button>
                    </form>
                </section>

                {/* 対応ステータス＋担当メモ */}
                <section style={{ ...panel, marginTop: 16 }}>
                    <h2 style={h2}>対応ステータス・メモ</h2>
                    <form action={saveClientMeta}>
                        <input type="hidden" name="clientId" value={client.clientId} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                            {CLIENT_STATUSES.map((st) => {
                                const active = (meta?.status ?? '未対応') === st;
                                return (
                                    <label key={st} style={{ cursor: 'pointer' }}>
                                        <input type="radio" name="status" value={st} defaultChecked={active} style={{ display: 'none' }} />
                                        <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, border: '1px solid', ...(active ? { background: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' } : { background: '#fff', color: '#555', borderColor: 'var(--border)' }) }}>{st}</span>
                                    </label>
                                );
                            })}
                        </div>
                        <textarea name="memo" defaultValue={meta?.memo ?? ''} rows={3} placeholder="施術者用メモ（クライアントには表示されません）"
                            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13, boxSizing: 'border-box', resize: 'vertical' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                            <button type="submit" className={styles.newButton} style={{ border: '1px solid #1a1a1a' }}>保存</button>
                            {meta && <span style={{ fontSize: 11, color: '#999' }}>{formatDateTime(meta.updatedAt)} 更新</span>}
                        </div>
                    </form>
                </section>

                {/* 登録履歴（新しい順） */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 28 }}>
                    {client.submissions.map((s, idx) => (
                        <section key={s.submissionId} style={panel}>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                                <h2 style={h2}>
                                    {idx === 0 ? '最新のカウンセリング票' : `カウンセリング票 ${client.submissionCount - idx}`}
                                    {(s.age || s.gender) && <span style={{ fontWeight: 400, color: '#777', fontSize: 13, marginLeft: 8 }}>{[s.age && `${s.age}歳`, s.gender].filter(Boolean).join(' ・ ')}</span>}
                                </h2>
                                <span style={{ fontSize: 12, color: '#777', whiteSpace: 'nowrap' }}>{formatDateTime(s.submittedAt)}</span>
                            </div>

                            <div style={block}>
                                <span style={blockLabel}>気になっていること・目的</span>
                                <p style={pre}>{s.complaint || '（記載なし）'}</p>
                            </div>
                            {s.notes && (
                                <div style={block}>
                                    <span style={blockLabel}>その他</span>
                                    <p style={pre}>{s.notes}</p>
                                </div>
                            )}

                            {questionnaireEntries(s.questionnaire).length > 0 && (
                                <div style={block}>
                                    <span style={blockLabel}>問診</span>
                                    <dl style={{ margin: '4px 0 0', fontSize: 13 }}>
                                        {questionnaireEntries(s.questionnaire).map((e, i) => (
                                            <div key={e.label} style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: 16, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                                                <dt style={{ color: '#777', wordBreak: 'break-word' }}>{e.label}</dt>
                                                <dd style={{ margin: 0, color: '#1a1a1a' }}>{e.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            )}

                            <div style={block}>
                                <span style={blockLabel}>添付ファイル（{s.files?.length ?? 0}）</span>
                                {(!s.files || s.files.length === 0) ? (
                                    <p style={{ margin: '4px 0 0', color: '#777', fontSize: 13 }}>ファイルはありません。</p>
                                ) : (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginTop: 6 }}>
                                        {s.files.map((f, i) => (
                                            <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" style={fileCard}>
                                                {isImage(f.type) ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={f.url} alt={f.name} style={{ width: '100%', height: 104, objectFit: 'cover', borderRadius: 8, background: '#eff5f2' }} />
                                                ) : (
                                                    <div style={{ height: 104, display: 'grid', placeItems: 'center', borderRadius: 8, background: '#eff5f2', color: '#8a9691', fontWeight: 700, fontSize: 13 }}>
                                                        {(f.name.split('.').pop() || 'FILE').toUpperCase()}
                                                    </div>
                                                )}
                                                <div style={{ marginTop: 7, fontSize: 12, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                                                <div style={{ fontSize: 11, color: '#777' }}>{(f.size / 1024 / 1024).toFixed(1)}MB</div>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                                <Link href={`/admin/clients/${s.submissionId}`} style={{ ...link, fontSize: 12 }}>この票の詳細 →</Link>
                                {client.submissions.length > 1 && (
                                    <form action={deleteSubmissionAction}>
                                        <input type="hidden" name="clientId" value={client.clientId} />
                                        <input type="hidden" name="submissionId" value={s.submissionId} />
                                        <button type="submit" style={{ background: 'none', border: 'none', color: '#c0392b', fontSize: 12, cursor: 'pointer' }}>この票を削除</button>
                                    </form>
                                )}
                            </div>
                        </section>
                    ))}
                </div>

                {/* 危険操作：クライアント削除（本人の削除要求など） */}
                <section style={{ ...panel, marginTop: 28, borderColor: '#e6b0aa', background: '#fdf3f2' }}>
                    <h2 style={{ ...h2, color: '#c0392b' }}>クライアントを削除</h2>
                    <p style={{ margin: '6px 0 12px', fontSize: 13, color: '#7b4a45' }}>
                        このクライアントの<strong>全カウンセリング票・添付ファイル・メモ・解析レポート紐付け</strong>を完全に削除します（本人の削除要求への対応用）。<strong>元に戻せません。</strong>
                    </p>
                    <form action={deleteClientAction}>
                        <input type="hidden" name="clientId" value={client.clientId} />
                        <button type="submit" style={{ padding: '9px 16px', background: '#c0392b', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                            {client.name || 'このクライアント'} を完全に削除する
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}

const panel: React.CSSProperties = { padding: '18px 22px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const block: React.CSSProperties = { padding: '10px 0', borderTop: '1px solid var(--border)' };
const blockLabel: React.CSSProperties = { display: 'block', color: '#777', fontSize: 12, marginBottom: 4 };
const h2: React.CSSProperties = { margin: 0, fontSize: 15, fontWeight: 700, color: '#1a1a1a' };
const pre: React.CSSProperties = { margin: 0, fontSize: 14, color: '#333', lineHeight: 1.8, whiteSpace: 'pre-wrap' };
const link: React.CSSProperties = { color: '#246E58', fontWeight: 700 };
const fileCard: React.CSSProperties = { display: 'block', padding: 10, background: '#fff', border: '1px solid var(--border)', borderRadius: 12 };
