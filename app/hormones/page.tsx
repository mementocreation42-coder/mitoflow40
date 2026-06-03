import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import { getHormonesByCategory } from '@/lib/hormones';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'ホルモンの種類 | Mitoflow40',
    description: 'テストステロン・エストロゲン・コルチゾール・インスリン・甲状腺ホルモンなど、体を調整する化学メッセンジャー「ホルモン」を、役割・加齢との関係・対応する血液検査とともに個別ページでわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/hormones' },
    openGraph: {
        title: 'ホルモンの種類 | Mitoflow40',
        description: '主なホルモンを、役割・加齢との関係・対応する血液検査から個別に解説。',
        url: 'https://mitoflow40.com/hormones',
        type: 'article',
    },
};

const grouped = getHormonesByCategory();

const relNutrients = [
    { slug: 'zinc', why: 'テストステロンなどホルモン産生に必須' },
    { slug: 'vitamin-d', why: 'ホルモンのように全身に作用し、性ホルモンも支える' },
    { slug: 'magnesium', why: 'ストレス応答とホルモンバランスを支える' },
    { slug: 'protein', why: 'ペプチドホルモンの材料。土台となる栄養' },
];

export default function HormonesPage() {
    const nutrients = relNutrients.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#ECDCE6' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'ホルモンの種類', description: '主なホルモンの種類を、役割・加齢との関係・対応する血液検査から解説。', path: '/hormones' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: 'ホルモン', path: '/hormones' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: 'ホルモン' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        HORMONES
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        HORMONES
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>ホルモンの種類</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        体じゅうに指令を届ける「化学メッセンジャー」。気分・代謝・筋肉・睡眠まで、あらゆる調整を担います。
                    </p>
                </header>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">ホルモンとは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ホルモンは、体のさまざまな器官で作られ、血液に乗って全身へ「指令」を届ける化学物質です。ごく微量で強力に働き、代謝・成長・生殖・ストレス応答・睡眠・気分など、生命活動のほぼすべてを調整しています。
                        {'\n\n'}
                        多くのホルモンは加齢とともに分泌が変化します。とくに40代以降は、性ホルモンや成長ホルモン、DHEAなどが低下しやすく、疲れ・意欲の低下・体型の変化・睡眠の乱れとして現れます。だからこそ、自分のホルモンの状態を血液検査で知り、生活習慣で支えることが大切になります。
                    </p>
                </section>

                {/* 種類（個別ページへ） */}
                {grouped.map((g) => (
                    <div key={g.category} className="mb-8">
                        <h2 className="text-sm font-bold tracking-widest mb-3 px-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                            {g.category}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {g.items.map((h) => (
                                <Link key={h.slug} href={`/hormones/${h.slug}`}
                                    className="group block rounded-xl p-5 border border-black hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ background: h.color }}>
                                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                                        <span className="font-bold text-[#1A1A1A]">{h.name}</span>
                                        <span className="text-[10px] text-[#1A1A1A]/40 font-mono">{h.en}</span>
                                    </div>
                                    <p className="text-xs text-[#4A4A4A] leading-snug">{h.tagline}</p>
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1A1A1A] mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                {/* 整える */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">ホルモンを整える土台</h2>
                    <ul className="space-y-2 text-[#4A4A4A]">
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span><strong>睡眠</strong>：成長ホルモン・テストステロン・メラトニンの分泌に直結</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span><strong>運動（特に筋トレ）</strong>：テストステロン・成長ホルモンを刺激</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span><strong>栄養</strong>：タンパク質・亜鉛・ビタミンD・マグネシウムが材料と調整役</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span><strong>ストレス・血糖管理</strong>：コルチゾールとインスリンのバランスを保つ</span></li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-5">
                        {nutrients.map(({ slug, n }) => (
                            <Link key={slug} href={`/nutrients/${slug}`}
                                className="px-3 py-1.5 rounded-lg text-sm font-bold text-[#1A1A1A] border border-[#1A1A1A]/20 hover:border-[#1A1A1A] transition-colors" style={{ background: n!.color }}>
                                {n!.name}
                            </Link>
                        ))}
                    </div>
                </section>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは一般的な解説であり、診断・治療を目的とするものではありません。ホルモンの検査・治療は医療機関にご相談ください。
                </p>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/library#hormones" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ホルモン に戻る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
