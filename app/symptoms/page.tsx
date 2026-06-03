import Link from 'next/link';
import { symptoms } from '@/lib/symptoms';
import JsonLd, { breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'SYMPTOMS | 症状から引く | Mitoflow40',
    description: '疲れやすい・ブレインフォグ・冷え・むくみ・気分の落ち込みなど、気になる症状から、考えられる背景・確認したい血液検査・関わる栄養素・関連する体のしくみを引けるリバース索引。',
    alternates: { canonical: 'https://mitoflow40.com/symptoms' },
    openGraph: {
        title: 'SYMPTOMS | 症状から引く | Mitoflow40',
        description: '気になる症状から、背景・血液検査・栄養素・体のしくみを引けるリバース索引。',
        url: 'https://mitoflow40.com/symptoms',
        type: 'website',
    },
};

export default function SymptomsIndex() {
    return (
        <div className="relative overflow-hidden pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen" style={{ background: '#F0E7E0' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '症状から引く', path: '/symptoms' }])} />
            <div className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '症状から引く' }]} />
                <div className="text-center mb-12">
                    <h1 className="inline-block text-left font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        <span className="block text-4xl md:text-5xl leading-none text-[#1A1A1A]">SYMPTOMS</span>
                        <span className="block text-center text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>症状から引く</span>
                    </h1>
                    <p className="text-[#4A4A4A] mt-4 max-w-[620px] mx-auto leading-relaxed">
                        気になる不調から逆引き。考えられる背景・確認したい血液検査・関わる栄養素・関連する体のしくみへ案内します。原因の「あたり」をつける地図として。
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {symptoms.map((s) => (
                        <Link
                            key={s.slug}
                            href={`/symptoms/${s.slug}`}
                            className="group block p-5 rounded-2xl border border-[#1A1A1A] hover:shadow-md hover:-translate-y-0.5 transition-all"
                            style={{ background: s.color }}
                        >
                            <div className="flex items-baseline gap-2 mb-1">
                                <h2 className="text-lg font-bold text-[#1A1A1A]">{s.name}</h2>
                                <span className="text-xs text-[#1A1A1A]/50 font-mono">{s.en}</span>
                            </div>
                            <p className="text-sm text-[#1A1A1A]/70 leading-snug">{s.tagline}</p>
                        </Link>
                    ))}
                </div>

                <p className="text-xs text-[#4A4A4A]/60 text-center mt-12 leading-relaxed">
                    ※ 本ページは一般的な情報提供であり、診断・治療を目的とするものではありません。症状が続く・強い場合は、自己判断せず医療機関にご相談ください。
                </p>

                <div className="mt-10 text-center flex flex-wrap justify-center gap-3">
                    <Link href="/check" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        セルフチェックを試す →
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
