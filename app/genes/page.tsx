import Link from 'next/link';
import { genes } from '@/lib/genes';

export const metadata = {
    title: 'GENES - Mitoflow40',
    description: 'Dirty Genesに基づく7つの主要遺伝子と、それぞれを"クリーン"に保つための栄養・生活習慣',
};

export default function GenesIndex() {
    return (
        <div className="max-w-[1000px] mx-auto px-6 md:px-4 py-12 md:py-24">
            <div className="text-center mb-12">
                <h1 className="inline-block text-left font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <span className="block text-4xl md:text-5xl leading-none text-[#1A1A1A]">GENES</span>
                </h1>
                <p className="text-[#4A4A4A] mt-4 max-w-[600px] mx-auto">
                    7つの主要遺伝子と、それぞれの働きをクリーンに保つための栄養・生活習慣
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {genes.map((gene) => (
                    <Link
                        key={gene.slug}
                        href={`/genes/${gene.slug}`}
                        className="group block p-6 rounded-2xl border border-[#1A1A1A]/30 hover:border-[#41C9B4] hover:shadow-md transition-all bg-white"
                    >
                        <div className="text-xs tracking-widest text-[#41C9B4] font-mono mb-2">
                            {gene.category}
                        </div>
                        <div className="flex items-baseline gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-[#1A1A1A] group-hover:text-[#41C9B4] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                {gene.symbol}
                            </h2>
                            <span className="text-xs text-[#4A4A4A]/70">{gene.name}</span>
                        </div>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            {gene.tagline}
                        </p>
                    </Link>
                ))}
            </div>

            <p className="text-xs text-[#4A4A4A]/60 text-center mt-12 leading-relaxed">
                ※ 本ページは Dr. Ben Lynch 著『Dirty Genes』を参考にした一般情報です。診断・治療目的ではありません。
            </p>
        </div>
    );
}
