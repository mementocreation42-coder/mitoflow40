import Link from 'next/link';
import { getHealthEpisodes, formatDate, SHOW_URL } from '@/lib/podcast';

// ジャーナル一覧の中に置く、ポッドキャスト（ヘルスケア回）の最新 3 本。
// ヘッダーから PODCAST を外し、「読む」と「聴く」を JOURNAL にまとめるための入口。
export default async function JournalPodcast() {
    const { episodes, available } = await getHealthEpisodes();
    if (!available || episodes.length === 0) return null;
    const latest = episodes.slice(0, 3);

    return (
        <section className="mb-12 rounded-2xl border border-[#1A1A1A] p-5 md:p-6" style={{ background: '#DEEAF2' }} aria-label="ポッドキャスト">
            <div className="flex items-baseline justify-between gap-3 mb-3">
                <div>
                    <p className="text-[10px] tracking-widest font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>PODCAST</p>
                    <h2 className="text-lg md:text-xl font-bold text-[#1A1A1A] leading-tight">🎧 耳で聴く、ヘルスケア回</h2>
                    <p className="text-xs text-[#4A4A4A] mt-1">
                        雑談ラジオ <a href={SHOW_URL} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-[#41C9B4] transition-colors">SAL Radio</a> から、健康・栄養・からだの回だけを集めています。
                    </p>
                </div>
                <Link href="/podcast" className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">
                    全 {episodes.length} 本を聴く →
                </Link>
            </div>
            <ul className="divide-y divide-[#1A1A1A]/10 rounded-xl bg-white/70 border border-[#1A1A1A]/15">
                {latest.map((ep) => (
                    <li key={ep.id} className="px-4 py-3">
                        <a href={ep.spotifyUrl} target="_blank" rel="noopener noreferrer" className="group block">
                            <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                <span className="text-[#41C9B4]">{formatDate(ep.releaseDate)}</span>
                                <span className="text-[#1A1A1A]/40">{ep.durationMin} MIN</span>
                            </div>
                            <p className="text-sm font-bold text-[#1A1A1A] leading-snug group-hover:text-[#41C9B4] transition-colors">{ep.name} ↗</p>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
