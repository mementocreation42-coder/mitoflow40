import Link from 'next/link';
import { getFoodsByCategory } from '@/lib/foods';
import JsonLd, { breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'FOODS | 栄養が豊富な食べ物 | Mitoflow40',
    description: '卵・鮭・牡蠣・納豆など、40代の健康最適化に効く栄養豊富な食べ物を厳選。各食材で摂れる栄養素・40代向けの食べ方・組み合わせをわかりやすく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/foods' },
    openGraph: {
        title: 'FOODS | 栄養が豊富な食べ物 | Mitoflow40',
        description: '40代の健康最適化に効く栄養豊富な食べ物を、摂れる栄養素・食べ方・組み合わせから解説。',
        url: 'https://mitoflow40.com/foods',
        type: 'website',
    },
};

export default function FoodsIndex() {
    return (
        <div className="relative overflow-hidden pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen" style={{ background: '#FFF4E2' }}>
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '食べ物', path: '/foods' }])} />
            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '食べ物' }]} />
                <div className="text-center mb-12">
                    <h1 className="inline-block text-left font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        <span className="block text-4xl md:text-5xl leading-none text-[#1A1A1A]">FOODS</span>
                        <span className="block text-center text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>栄養が豊富な食べ物</span>
                    </h1>
                    <p className="text-[#4A4A4A] mt-4 max-w-[620px] mx-auto leading-relaxed">
                        身近な食材ひとつひとつで、どんな栄養が摂れるのか。40代の体を支える食べ物を、摂れる栄養素・食べ方・組み合わせから解説します。
                    </p>
                </div>

                {getFoodsByCategory().map(({ category, items }) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-sm font-bold tracking-widest mb-4 px-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                            {category}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {items.map((f) => (
                                <Link
                                    key={f.slug}
                                    href={`/foods/${f.slug}`}
                                    className="group block p-5 rounded-2xl border border-[#1A1A1A] hover:shadow-md hover:-translate-y-0.5 transition-all"
                                    style={{ background: f.color }}
                                >
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-xl" aria-hidden>{f.emoji}</span>
                                        <h3 className="text-lg font-bold text-[#1A1A1A]">
                                            {f.name}
                                        </h3>
                                        <span className="text-xs text-[#1A1A1A]/50 font-mono">{f.en}</span>
                                    </div>
                                    <p className="text-sm text-[#1A1A1A]/70 leading-snug">
                                        {f.tagline}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                <p className="text-xs text-[#4A4A4A]/60 text-center mt-12 leading-relaxed">
                    ※ 本ページは一般的な栄養情報であり、診断・治療や特定の食事法の推奨を目的とするものではありません。持病・アレルギーのある方は医療専門家にご相談ください。
                </p>

                <div className="mt-10 text-center flex flex-wrap justify-center gap-3">
                    <Link href="/nutrients" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        栄養素を見る →
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
