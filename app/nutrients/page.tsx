import Link from 'next/link';
import { getNutrientsByCategory } from '@/lib/nutrients';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'NUTRIENTS | Mitoflow40',
    description: '40代の健康最適化に効く15のビタミン・ミネラル・栄養素。それぞれの働き、不足のサイン、多く含む食品、関わる遺伝子をわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/nutrients' },
    openGraph: {
        title: 'NUTRIENTS | Mitoflow40',
        description: '40代の健康最適化に効く15のビタミン・ミネラル・栄養素を、働き・不足サイン・食品・関わる遺伝子から解説。',
        url: 'https://mitoflow40.com/nutrients',
        type: 'website',
    },
};

export default function NutrientsIndex() {
    return (
        <div className="relative overflow-hidden pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen" style={{ background: '#FFF1DF' }}>
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-wellness.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '70px', right: '-50px', width: '300px' }} />
            <img loading="lazy" decoding="async" src="/images/experience_vitality_new.png" alt="" className="absolute pointer-events-none opacity-80"
                style={{ bottom: '-70px', left: '-80px', width: '380px' }} />
            <div className="max-w-[1000px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '栄養素' }]} />
                <div className="text-center mb-12">
                    <h1 className="inline-block text-left font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        <span className="block text-4xl md:text-5xl leading-none text-[#1A1A1A]">NUTRIENTS</span>
                        <span className="block text-center text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>栄養素</span>
                    </h1>
                    <p className="text-[#4A4A4A] mt-4 max-w-[600px] mx-auto">
                        40代の健康最適化に効く栄養素を、それぞれの働き・不足のサイン・多く含む食品・関わる遺伝子から解説。
                    </p>
                </div>

                {getNutrientsByCategory().map(({ category, items }) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-sm font-bold tracking-widest mb-4 px-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                            {category}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {items.map((n) => (
                                <Link
                                    key={n.slug}
                                    href={`/nutrients/${n.slug}`}
                                    className="group block p-5 rounded-2xl border border-[#1A1A1A] hover:shadow-md hover:-translate-y-0.5 transition-all"
                                    style={{ background: n.color }}
                                >
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-[#1A1A1A]">
                                            {n.name}
                                        </h3>
                                        <span className="text-xs text-[#1A1A1A]/50 font-mono">{n.en}</span>
                                    </div>
                                    <p className="text-sm text-[#1A1A1A]/70 leading-snug">
                                        {n.tagline}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                <p className="text-xs text-[#4A4A4A]/60 text-center mt-12 leading-relaxed">
                    ※ 本ページは一般的な栄養情報であり、診断・治療やサプリの推奨を目的とするものではありません。
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
