import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import { getBackup, type StoredMeal } from '@/lib/meal-log-store';
import styles from '../../admin.module.css';

export const metadata = { title: { absolute: '食事記録の控え | Mitoflow40 Admin' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const TYPES = ['朝食', '昼食', '夕食', '間食'] as const;
const WD = '日月火水木金土';

function fmt(iso: string): string {
    const d = new Date(new Date(iso).getTime() + 9 * 3600_000);
    return `${d.getUTCFullYear()}/${d.getUTCMonth() + 1}/${d.getUTCDate()} ${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
}
function dayLabel(date: string): string {
    const [y, m, d] = date.split('-').map(Number);
    return `${m}/${d}（${WD[new Date(y, m - 1, d).getDay()]}）`;
}

export default async function AdminMealLogDetail({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ s?: string }> }) {
    const { id } = await params;
    const { s } = await searchParams;
    const got = await getBackup(id, s).catch(() => null);
    if (!got) notFound();
    const { summary, data } = got;

    const byDate = new Map<string, StoredMeal[]>();
    for (const m of data.meals) byDate.set(m.date, [...(byDate.get(m.date) ?? []), m]);
    const dates = [...byDate.keys()].sort().reverse();

    return (
        <div className={styles.shell}>
            <AdminHeader active="meallog" back={{ href: '/admin/meal-log', label: '控えの一覧' }} />
            <main className={styles.main} style={{ maxWidth: 820 }}>
                <p className={styles.eyebrow}>Meal log backup</p>
                <h1 className={styles.title}>控え <code style={{ fontSize: 18 }}>{id.slice(0, 8)}</code></h1>
                <p className={styles.description}>
                    {s ? <>{s} の日別の控えを表示しています（{data.count} 件）。<Link href={`/admin/meal-log/${id}`} style={{ color: '#246E58', fontWeight: 700 }}>最新に戻る</Link></>
                        : <>最新の控え：{fmt(summary.savedAt)}・{summary.count} 件・{summary.days} 日分。</>}
                </p>

                {summary.snapshots.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                        <span style={{ fontSize: 12, color: '#666', alignSelf: 'center', marginRight: 4 }}>日別の控え</span>
                        {summary.snapshots.map((d) => (
                            <Link key={d} href={`/admin/meal-log/${id}?s=${d}`}
                                style={{ ...chip, ...(s === d ? { background: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' } : {}) }}>{d.slice(5)}</Link>
                        ))}
                    </div>
                )}

                <div style={{ marginTop: 20, overflowX: 'auto', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                            <tr>
                                <th style={th}>日付</th>
                                {TYPES.map((t) => <th key={t} style={th}>{t}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {dates.map((d) => (
                                <tr key={d}>
                                    <td style={{ ...td, fontWeight: 700, whiteSpace: 'nowrap' }}>{dayLabel(d)}</td>
                                    {TYPES.map((t) => {
                                        const items = (byDate.get(d) ?? []).filter((m) => m.type === t).flatMap((m) => m.food.split('\n')).filter(Boolean);
                                        return <td key={t} style={td}>{items.length ? items.map((x, i) => <div key={i}>{x}</div>) : <span style={{ color: '#bbb' }}>—</span>}</td>;
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

const chip: React.CSSProperties = { padding: '4px 10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 999, fontSize: 12, color: '#555', textDecoration: 'none' };
const th: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid var(--border)', fontSize: 12, color: '#666', fontWeight: 700, whiteSpace: 'nowrap' };
const td: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border)', verticalAlign: 'top', lineHeight: 1.6 };
