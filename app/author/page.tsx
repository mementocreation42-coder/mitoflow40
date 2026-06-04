import Image from 'next/image';
import Link from 'next/link';
import { AUTHOR, authorPerson } from '@/lib/author';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '著者・監修：小林大介 | Mitoflow40',
    description: 'Mitoflow40 の著者・小林大介のプロフィール。精密栄養学を軸に、血液検査と生活ログをもとに自身の体で検証を重ねる実践者。40代からの健康戦略を発信。',
    alternates: { canonical: 'https://mitoflow40.com/author' },
    openGraph: {
        title: '著者・監修：小林大介 | Mitoflow40',
        description: 'Mitoflow40 の著者・小林大介のプロフィール。精密栄養学の実践者。',
        url: 'https://mitoflow40.com/author',
        type: 'profile',
    },
};

const credentials = [
    { title: '精密栄養学を学んだ場', note: '神宮前統合医療クリニックにて、臨床・カウンセリングを通じて精密栄養学の考え方を学ぶ。2025年2月より自身でも実践を継続' },
    { title: '自身の体での検証', note: '血液検査と生活ログ（Apple Watch等）をもとに、変化を客観的に記録・検証' },
    { title: 'クリエイターの視点', note: 'ビデオグラファー／フォトグラファー／ライター／作家として情報発信' },
];

export default function AuthorPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#EAE2F0' }}>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'ProfilePage',
                mainEntity: authorPerson,
            }} />
            <article className="max-w-[760px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '著者' }]} />
                <header className="mb-10">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        AUTHOR ／ 著者・監修
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">小林大介</h1>
                    <p className="text-sm text-[#1A1A1A]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{AUTHOR.nameEn}</p>
                </header>

                <div className="grid md:grid-cols-[260px_1fr] gap-8 items-start mb-10">
                    <div className="rounded-2xl overflow-hidden border border-black">
                        <Image src="/images/profile.jpg" alt="小林大介" width={300} height={300} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="bg-white/70 rounded-2xl p-6 border border-black">
                        <p className="text-sm text-[#1A1A1A]/70 mb-3">{AUTHOR.jobTitle}</p>
                        <p className="text-[#1A1A1A] leading-loose">{AUTHOR.description}</p>
                    </div>
                </div>

                {/* この情報を書いている根拠 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ Mitoflow40 を発信するのか</h2>
                    <div className="space-y-3">
                        {credentials.map((c) => (
                            <div key={c.title} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">{c.title}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{c.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* スタンス */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">情報発信のスタンス</h2>
                    <ul className="space-y-2 text-[#4A4A4A]">
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span>Mitoflow40は、病気になってから治すのではなく、その手前で整える「未病予防」への取り組みです。</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span>本サイトは医療行為・診断ではなく、一般的な健康情報と実践の共有です。</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span>断定を避け、「可能性・仮説」として慎重に記述しています。</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span>検査・治療・サプリの判断は、必ず医療専門家にご相談ください。</span></li>
                    </ul>
                </section>

                <div className="flex flex-wrap gap-3">
                    <Link href={AUTHOR.sameAs[0]} target="_blank" rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        SAL で活動を見る ↗
                    </Link>
                    <Link href="/library"
                        className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
