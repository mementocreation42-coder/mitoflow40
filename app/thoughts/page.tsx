import Link from 'next/link';
import { essays } from '@/lib/essays';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '思索 ｜ 〇〇とは？を体から考える | Mitoflow40',
    description: '運命とは？自由とは？老いるとは？幸せとは？——答えのない問いを、遺伝子・体・健康の視点からやさしく考えるMitoflow40の思想コラム。',
    alternates: { canonical: 'https://mitoflow40.com/thoughts' },
    openGraph: {
        title: '思索 ｜ 〇〇とは？を体から考える | Mitoflow40',
        description: '運命・自由・老い・幸せ——答えのない問いを、体と健康の視点から考えるコラム。',
        url: 'https://mitoflow40.com/thoughts',
        type: 'website',
    },
};

export default function ThoughtsPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '思索', description: '運命・自由・老い・幸せ——答えのない問いを、体と健康の視点から考えるコラム。', path: '/thoughts' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '思索', path: '/thoughts' }])} />

            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '思索' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        THOUGHTS
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        思索
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>「〇〇とは？」を、体から考える</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        運命、自由、老い、幸せ——答えの出ない問いを、Mitoflow40は「体・健康・生き方」の側から見つめます。哲学のようでいて、結局は今日の暮らし方の話。
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {essays.map((e) => (
                        <Link key={e.slug} href={`/thoughts/${e.slug}`}
                            className="group flex flex-col rounded-2xl border border-black p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            style={{ background: e.color }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{e.en}</div>
                            <div className="text-2xl font-bold text-[#1A1A1A] mb-2">{e.title}</div>
                            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed mb-4 flex-1">{e.tagline}</p>
                            <span className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-[#1A1A1A] bg-[#FF9855]">
                                読む <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
