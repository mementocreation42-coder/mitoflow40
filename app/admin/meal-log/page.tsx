import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { listBackups } from '@/lib/meal-log-store';
import styles from '../admin.module.css';

export const metadata = { title: { absolute: '食事記録の控え | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

function fmt(iso: string): string {
    const d = new Date(new Date(iso).getTime() + 9 * 3600_000);
    return `${d.getUTCFullYear()}/${d.getUTCMonth() + 1}/${d.getUTCDate()} ${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
}
function md(date: string | null): string { return date ? `${Number(date.slice(5, 7))}/${Number(date.slice(8))}` : '—'; }

export default async function AdminMealLogPage() {
    const configured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
    const rows = configured ? await listBackups().catch(() => []) : [];
    return (
        <div className={styles.shell}>
            <AdminHeader active="meallog" />
            <main className={styles.main} style={{ maxWidth: 820 }}>
                <p className={styles.eyebrow}>Meal log backups</p>
                <div className={styles.titleRow}><div><h1 className={styles.title}>食事記録の控え</h1></div>
                    <Link href="/meal-log" target="_blank" className={styles.newButton}>食事記録アプリ ↗</Link></div>
                <p className={styles.description}>
                    食事記録アプリ（/meal-log）が自動で送ってくる控えです。端末ごとの復元コード 1 つにつき 1 行。コードそのものは保存していないので、誰の端末かはここでは分かりません。控え {rows.length} 件。
                </p>
                {!configured ? (
                    <div style={card}><p style={{ margin: 0, color: '#8C3E25' }}>Blob ストレージが未設定です（<code>BLOB_READ_WRITE_TOKEN</code>）。</p></div>
                ) : rows.length === 0 ? (
                    <div style={card}><p style={{ margin: 0, color: '#666' }}>まだ控えはありません。アプリで記録を書くと、数秒後にここに出ます。</p></div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 }}>
                        {rows.map((r) => (
                            <Link key={r.id} href={`/admin/meal-log/${r.id}`} style={row}>
                                <div style={{ minWidth: 0 }}>
                                    <p style={{ margin: 0, fontWeight: 700, color: '#1a1a1a', fontSize: 14 }}>
                                        控え <code style={{ fontSize: 12, color: '#59625f' }}>{r.id.slice(0, 8)}</code>
                                    </p>
                                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#666' }}>
                                        {md(r.firstDate)} 〜 {md(r.lastDate)} ・ {r.days} 日分 ・ {r.count} 件 ・ 日別の控え {r.snapshots.length}
                                    </p>
                                </div>
                                <span style={{ fontSize: 12, color: '#555', whiteSpace: 'nowrap' }}>最終 {fmt(r.savedAt)} →</span>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

const card: React.CSSProperties = { marginTop: 28, padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 };
const row: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '14px 18px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, textDecoration: 'none' };
