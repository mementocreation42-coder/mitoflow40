import Link from 'next/link';
import JsonLd, { breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getHealthEpisodes, formatDate, SHOW_ID, SHOW_NAME, SHOW_URL } from '@/lib/podcast';

export const revalidate = 3600;

export const metadata = {
    title: 'ポッドキャスト ｜ SAL Radio のヘルスケア回だけを聴く | Mitoflow40',
    description: 'SAL Radio（Spotify）で配信しているエピソードのうち、健康・栄養・からだをテーマにした回だけを自動でまとめています。移動中や家事のあいだに、細胞から健康を考える時間を。',
    alternates: { canonical: 'https://mitoflow40.com/podcast' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: 'ポッドキャスト | Mitoflow40',
        description: 'SAL Radio のエピソードから、健康・栄養・からだの回だけを自動でキュレーション。',
        url: 'https://mitoflow40.com/podcast',
        type: 'website',
    },
};

export default async function PodcastPage() {
    const { episodes, totalEpisodes, available } = await getHealthEpisodes();

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#DEEAF2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'PodcastSeries',
                name: SHOW_NAME,
                description: 'SAL Radio のエピソードから、健康・栄養・からだの回だけを自動でキュレーション。',
                url: 'https://mitoflow40.com/podcast',
                inLanguage: 'ja',
                sameAs: [SHOW_URL],
                author: { '@type': 'Person', name: '小林大介', url: 'https://mitoflow40.com/author' },
                publisher: { '@type': 'Organization', name: 'Mitoflow40', url: 'https://mitoflow40.com' },
            }} />
            <JsonLd data={breadcrumb([{ name: 'Mitoflow40', path: '/' }, { name: 'ジャーナル', path: '/journal' }, { name: 'ポッドキャスト', path: '/podcast' }])} />

            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'HOME', href: '/' }, { name: 'JOURNAL', href: '/journal' }, { name: 'PODCAST' }]} />

                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>PODCAST</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        PODCAST
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>耳で聴く、細胞からの健康</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        雑談ラジオ<strong>「SAL Radio」</strong>のエピソードから、<strong>健康・栄養・からだ</strong>をテーマにした回だけを自動で拾い集めています。読むより、聴くほうが入ってくる日のために。
                    </p>
                </header>

                {/* エピソード一覧 */}
                {episodes.length > 0 ? (
                    <section className="mb-10">
                        <div className="flex items-baseline justify-between mb-4 px-1">
                            <h2 className="text-2xl font-bold text-[#1A1A1A] border-l-4 border-[#FF9855] pl-3 leading-tight">ヘルスケア回</h2>
                            <span className="text-xs font-bold text-[#1A1A1A]/50" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                {episodes.length} EPISODE{episodes.length > 1 ? 'S' : ''}
                            </span>
                        </div>

                        <div className="space-y-5">
                            {episodes.map((ep) => (
                                <article key={ep.id} className="bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                                    <div className="flex items-center gap-3 mb-2 text-[10px] font-bold tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        <span className="text-[#41C9B4]">{formatDate(ep.releaseDate)}</span>
                                        <span className="text-[#1A1A1A]/40">{ep.durationMin} MIN</span>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-2 leading-snug">
                                        <a href={ep.spotifyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#41C9B4] transition-colors">
                                            {ep.name}
                                        </a>
                                    </h3>
                                    {ep.description && (
                                        <p className="text-sm text-[#4A4A4A] leading-loose mb-4">{ep.description}</p>
                                    )}
                                    <audio controls preload="none" src={ep.audioUrl} className="w-full" />
                                    <div className="mt-3">
                                        <a href={ep.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#41C9B4] hover:underline">
                                            Spotifyで聴く ↗
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                ) : (
                    <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black text-center">
                        <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>COMING SOON</div>
                        <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-3 leading-snug">ヘルスケア回は、これから配信されます</h2>
                        <p className="text-sm text-[#4A4A4A] leading-loose whitespace-pre-line">
                            いまのところ、健康・栄養・からだをテーマにした回はまだ配信されていません。
                            {available && totalEpisodes !== null && (
                                <>{'\n'}番組全体では<strong>{totalEpisodes}本</strong>が配信中です。</>
                            )}
                            {'\n'}
                            <strong>新しい回が公開されると、このページに自動で並びます</strong>——登録や更新作業はいりません。それまでは、番組そのものを聴いてみてください。
                        </p>
                    </section>
                )}

                {/* 番組そのもの */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#FF9855] pl-3 leading-tight">番組について</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-5">
                        <strong>{SHOW_NAME}</strong>——徳島の限界集落から、映像・写真・Web・AI・健康・釣りを行き来しながら雑談するラジオです。Mitoflow40では、そのうち<strong>健康にまつわる回だけ</strong>をここに集めています。
                    </p>
                    <iframe
                        src={`https://open.spotify.com/embed/show/${SHOW_ID}?utm_source=generator&theme=0`}
                        title={SHOW_NAME}
                        width="100%"
                        height="232"
                        frameBorder="0"
                        loading="lazy"
                        allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        className="rounded-xl"
                    />
                    <div className="mt-5 flex flex-wrap gap-2">
                        <a href={SHOW_URL} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">
                            Spotifyで番組を開く
                        </a>
                        {[{ href: '/journal', label: 'ジャーナル' }, { href: '/author', label: '話し手について' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
