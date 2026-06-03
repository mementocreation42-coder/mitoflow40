import Link from 'next/link';
import { genes } from '@/lib/genes';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'GENES | Mitoflow40',
    description: 'Dirty Genesに基づく7つの主要遺伝子と、それぞれを"クリーン"に保つための栄養・生活習慣。MTHFR・COMT・MAOAなど40代の健康最適化に直結する遺伝子情報。',
    alternates: { canonical: 'https://mitoflow40.com/genes' },
    openGraph: {
        title: 'GENES | Mitoflow40',
        description: 'Dirty Genesに基づく7つの主要遺伝子と、それぞれを"クリーン"に保つための栄養・生活習慣。',
        url: 'https://mitoflow40.com/genes',
        type: 'website',
    },
};

export default function GenesIndex() {
    return (
        <div className="relative overflow-hidden pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen" style={{ background: '#D7F0EC' }}>
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <div className="max-w-[1000px] mx-auto relative" style={{ zIndex: 1 }}>
            <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の地図', href: '/library#map' }, { name: '遺伝子' }]} />
            <div className="text-center mb-12">
                <h1 className="inline-block text-left font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <span className="block text-4xl md:text-5xl leading-none text-[#1A1A1A]">GENES</span>
                    <span className="block text-center text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>遺伝子</span>
                </h1>
                <p className="text-[#4A4A4A] mt-4 max-w-[600px] mx-auto">
                    7つの主要遺伝子と、それぞれの働きをクリーンに保つための栄養・生活習慣
                </p>
                <p className="text-xs text-[#4A4A4A]/80 mt-4 max-w-[560px] mx-auto leading-relaxed bg-white/60 border border-[#1A1A1A]/15 rounded-xl px-4 py-3">
                    ※ ご自身の遺伝子タイプを正確に知るには、遺伝子検査が必要です。本ページは各遺伝子の働きと、整えるための一般的な栄養・生活習慣を学ぶためのものです。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {genes.map((gene) => (
                    <Link
                        key={gene.slug}
                        href={`/genes/${gene.slug}`}
                        className="group block p-6 rounded-2xl border border-[#1A1A1A] hover:shadow-md hover:-translate-y-0.5 transition-all"
                        style={{ background: gene.color }}
                    >
                        <div className="text-xs tracking-widest text-[#1A1A1A]/60 font-mono mb-2">
                            {gene.category}
                        </div>
                        <div className="flex items-baseline gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                {gene.symbol}
                            </h2>
                            <span className="text-xs text-[#1A1A1A]/60">{gene.name}</span>
                        </div>
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">
                            {gene.tagline}
                        </p>
                    </Link>
                ))}
            </div>

            <p className="text-xs text-[#4A4A4A]/60 text-center mt-12 leading-relaxed">
                ※ 本ページは Dr. Ben Lynch 著『Dirty Genes』を参考にした一般情報です。診断・治療目的ではありません。
            </p>

            <div className="mt-10 text-center">
                <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                    ← Library に戻る
                </Link>
            </div>
            </div>
        </div>
    );
}
