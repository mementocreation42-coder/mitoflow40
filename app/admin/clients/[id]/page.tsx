import Link from 'next/link';
import { notFound } from 'next/navigation';
import { logout } from '@/app/login/actions';
import { getSubmission, formatDateTime, questionnaireEntries } from '@/lib/intake';
import styles from '../../admin.module.css';

export const metadata = { title: { absolute: 'カウンセリング票詳細 | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

function isImage(type: string): boolean {
    return type.startsWith('image/');
}

export default async function AdminIntakeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const s = await getSubmission(id);
    if (!s) notFound();

    return (
        <div className={styles.shell}>
            <header className={styles.header}>
                <Link href="/admin/clients" className={styles.brand} aria-label="クライアント一覧へ">
                    <span className={styles.brandMark}>M</span>
                    <span>
                        <span className={styles.brandName}>Mitoflow40 Admin</span>
                        <span className={styles.brandMeta}>Intake</span>
                    </span>
                </Link>
                <div className={styles.headerActions}>
                    <Link href="/admin/clients" className={styles.logout}>← クライアント一覧</Link>
                    <form action={logout}><button type="submit" className={styles.logout}>ログアウト</button></form>
                </div>
            </header>

            <main className={styles.main} style={{ maxWidth: 820 }}>
                <p className={styles.eyebrow}>Client Intake</p>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>{s.name || '（無名）'}</h1>
                    <span className={styles.resultMeta}>{formatDateTime(s.submittedAt)}</span>
                </div>

                {/* 基本情報 */}
                <section style={panel}>
                    <Row label="お名前" value={s.name} />
                    <Row label="メール" value={<a href={`mailto:${s.email}`} style={link}>{s.email}</a>} />
                    <Row label="年齢" value={s.age || '—'} />
                    <Row label="性別" value={s.gender || '—'} />
                    <Row label="票ID" value={<code style={{ fontSize: 12 }}>{s.submissionId}</code>} />
                </section>

                {/* 主訴・自由記述 */}
                <section style={panel}>
                    <h2 style={h2}>いま気になっていること・目的</h2>
                    <p style={pre}>{s.complaint || '（記載なし）'}</p>
                    {s.notes && (
                        <>
                            <h2 style={{ ...h2, marginTop: 20 }}>その他</h2>
                            <p style={pre}>{s.notes}</p>
                        </>
                    )}
                </section>

                {/* 問診 */}
                {questionnaireEntries(s.questionnaire).length > 0 && (
                    <section style={panel}>
                        <h2 style={h2}>問診</h2>
                        <dl style={{ margin: 0, fontSize: 14 }}>
                            {questionnaireEntries(s.questionnaire).map((e, i) => (
                                <div key={e.label} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16, padding: '9px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                                    <dt style={{ color: '#777', wordBreak: 'break-word' }}>{e.label}</dt>
                                    <dd style={{ margin: 0, color: '#1a1a1a' }}>{e.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {/* ファイル */}
                <section style={panel}>
                    <h2 style={h2}>添付ファイル（{s.files?.length ?? 0}）</h2>
                    {(!s.files || s.files.length === 0) ? (
                        <p style={{ margin: 0, color: '#777', fontSize: 13 }}>ファイルはありません。</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
                            {s.files.map((f, i) => (
                                <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" style={fileCard}>
                                    {isImage(f.type) ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={f.url} alt={f.name} style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 8, background: '#eff5f2' }} />
                                    ) : (
                                        <div style={{ height: 110, display: 'grid', placeItems: 'center', borderRadius: 8, background: '#eff5f2', color: '#8a9691', fontWeight: 700, fontSize: 13 }}>
                                            {(f.name.split('.').pop() || 'FILE').toUpperCase()}
                                        </div>
                                    )}
                                    <div style={{ marginTop: 8, fontSize: 12, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                                    <div style={{ fontSize: 11, color: '#777' }}>{(f.size / 1024 / 1024).toFixed(1)}MB</div>
                                </a>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ width: 96, flexShrink: 0, color: '#777', fontSize: 13 }}>{label}</span>
            <span style={{ fontSize: 14, color: '#1a1a1a', minWidth: 0, wordBreak: 'break-word' }}>{value}</span>
        </div>
    );
}

const panel: React.CSSProperties = { marginTop: 20, padding: '18px 22px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const h2: React.CSSProperties = { margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: '#1a1a1a' };
const pre: React.CSSProperties = { margin: 0, fontSize: 14, color: '#333', lineHeight: 1.8, whiteSpace: 'pre-wrap' };
const link: React.CSSProperties = { color: '#246E58', fontWeight: 700 };
const fileCard: React.CSSProperties = { display: 'block', padding: 10, background: '#fff', border: '1px solid var(--border)', borderRadius: 12 };
