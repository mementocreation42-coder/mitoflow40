import Link from 'next/link';
import { getOrgansByCategory } from '@/lib/organs';
import JsonLd, { breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'ORGANS | 内臓・臓器 | Mitoflow40',
    description: '肝臓・腎臓・腸・心臓・脳・膵臓・甲状腺・副腎など、主要な内臓の役割を40代の視点で解説。各臓器の働き・加齢による変化・関わる血液検査と栄養素をわかりやすくまとめました。',
    alternates: { canonical: 'https://mitoflow40.com/organs' },
    openGraph: {
        title: 'ORGANS | 内臓・臓器 | Mitoflow40',
        description: '主要な内臓の役割を40代の視点で解説。働き・加齢による変化・関わる血液検査と栄養素から読み解く。',
        url: 'https://mitoflow40.com/organs',
        type: 'website',
    },
};

export default function OrgansIndex() {
    return (
        <div className="relative overflow-hidden pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen" style={{ background: '#F4E7DC' }}>
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '内臓・臓器', path: '/organs' }])} />
            <div className="max-w-[1000px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '内臓・臓器' }]} />
                <div className="text-center mb-12">
                    <h1 className="inline-block text-left font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        <span className="block text-4xl md:text-5xl leading-none text-[#1A1A1A]">ORGANS</span>
                        <span className="block text-center text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>内臓・臓器</span>
                    </h1>
                    <p className="text-[#4A4A4A] mt-4 max-w-[620px] mx-auto leading-relaxed">
                        肝臓・腎臓・腸・心臓・脳…。主要な内臓がそれぞれ何をしているのか、40代でどう変化するのか、関わる血液検査・栄養素とあわせて読み解きます。
                    </p>
                </div>

                {getOrgansByCategory().map(({ category, items }) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-sm font-bold tracking-widest mb-4 px-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                            {category}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {items.map((o) => (
                                <Link
                                    key={o.slug}
                                    href={`/organs/${o.slug}`}
                                    className="group block p-5 rounded-2xl border border-[#1A1A1A] hover:shadow-md hover:-translate-y-0.5 transition-all"
                                    style={{ background: o.color }}
                                >
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-[#1A1A1A]">
                                            {o.name}
                                        </h3>
                                        <span className="text-xs text-[#1A1A1A]/50 font-mono">{o.en}</span>
                                    </div>
                                    <p className="text-sm text-[#1A1A1A]/70 leading-snug">{o.tagline}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                <p className="text-xs text-[#4A4A4A]/60 text-center mt-12 leading-relaxed">
                    ※ 本ページは一般的な解剖・生理の情報であり、診断・治療を目的とするものではありません。気になる症状や検査値は医療専門家にご相談ください。
                </p>

                <div className="mt-10 text-center flex flex-wrap justify-center gap-3">
                    <Link href="/biomarkers" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        血液検査を見る →
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
