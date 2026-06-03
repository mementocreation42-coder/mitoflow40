import Link from 'next/link';
import { getBiomarkersByCategory } from '@/lib/biomarkers';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'BIOMARKERS | Mitoflow40',
    description: '血液検査50項目を40代・ミトコンドリアの視点で解説。各指標の意味・基準値・最適域・関わる栄養素・遺伝子をわかりやすくまとめました。',
    alternates: { canonical: 'https://mitoflow40.com/biomarkers' },
    openGraph: {
        title: 'BIOMARKERS | Mitoflow40',
        description: '血液検査50項目を40代・ミトコンドリアの視点で解説。',
        url: 'https://mitoflow40.com/biomarkers',
        type: 'website',
    },
};

export default function BiomarkersIndex() {
    const grouped = getBiomarkersByCategory();

    return (
        <div className="relative overflow-hidden pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen" style={{ background: '#D9EBF7' }}>
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <div className="max-w-[1000px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の地図', href: '/library#map' }, { name: '血液検査' }]} />
                <div className="text-center mb-12">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#41C9B4' }}>
                        BLOOD TEST GUIDE
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        BIOMARKERS
                    </h1>
                    <p className="text-base md:text-lg font-bold mb-4 text-[#1A1A1A]/70">血液検査</p>
                    <p className="text-[#4A4A4A] max-w-[600px] mx-auto leading-relaxed">
                        血液検査50項目を40代・ミトコンドリアの視点で解説。<br className="hidden md:block" />
                        各指標の意味・基準値・最適域・関わる栄養素と遺伝子。
                    </p>
                </div>

                {/* カテゴリ別グループ表示 */}
                {Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-sm font-bold tracking-widest mb-4 px-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#41C9B4' }}>
                            {category.toUpperCase()}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {items.map((b) => (
                                <Link
                                    key={b.slug}
                                    href={`/biomarkers/${b.slug}`}
                                    className="group block p-5 rounded-2xl border border-[#1A1A1A] hover:shadow-md hover:-translate-y-0.5 transition-all"
                                    style={{ background: b.color }}
                                >
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-[#1A1A1A]">
                                            {b.name}
                                        </h3>
                                        <span className="text-xs text-[#1A1A1A]/50 font-mono">{b.en}</span>
                                    </div>
                                    <p className="text-sm text-[#1A1A1A]/70 leading-snug">{b.tagline}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                <p className="text-xs text-[#4A4A4A]/60 text-center mt-12 leading-relaxed">
                    ※ 本ページの基準値・理想値は参考情報であり、診断・治療を目的とするものではありません。結果の解釈は医療専門家にご相談ください。
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
