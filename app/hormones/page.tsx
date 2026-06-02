import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'ホルモンの種類 | Mitoflow40',
    description: '体を調整する化学メッセンジャー「ホルモン」の主な種類を、役割・加齢との関係・対応する血液検査項目とともにわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/hormones' },
    openGraph: {
        title: 'ホルモンの種類 | Mitoflow40',
        description: '主なホルモンの種類を、役割・加齢との関係・対応する血液検査から解説。',
        url: 'https://mitoflow40.com/hormones',
        type: 'article',
    },
};

type H = { name: string; en: string; role: string; biomarker?: string };
const groups: { category: string; color: string; items: H[] }[] = [
    {
        category: '性ホルモン', color: '#FCE3D4',
        items: [
            { name: 'テストステロン', en: 'TESTOSTERONE', role: '筋肉・意欲・性欲・骨を支える。男女ともに重要で、加齢で低下', biomarker: 'total-testosterone' },
            { name: '遊離テストステロン', en: 'FREE T', role: '実際に細胞で使える有効分。SHBGとのバランスで効きが変わる', biomarker: 'free-testosterone' },
            { name: 'エストラジオール', en: 'ESTRADIOL', role: '最も強力なエストロゲン。骨・血管・脳・気分を守る', biomarker: 'estradiol' },
            { name: 'DHEA-S', en: 'DHEA-S', role: '副腎が作る性ホルモンの前駆体。活力の土台、加齢で急減', biomarker: 'dhea-s' },
        ],
    },
    {
        category: 'ストレス・副腎', color: '#F6DCD0',
        items: [
            { name: 'コルチゾール', en: 'CORTISOL', role: 'ストレス時に血糖を上げる。朝高く夜低い日内リズムが大切', biomarker: 'cortisol' },
        ],
    },
    {
        category: '代謝・成長', color: '#FBF0CE',
        items: [
            { name: '成長ホルモン / IGF-1', en: 'GH / IGF-1', role: '筋肉・骨の成長と修復、脂肪分解。睡眠と運動で分泌', biomarker: 'igf1' },
            { name: 'インスリン', en: 'INSULIN', role: '血糖を下げる。過剰が続くとインスリン抵抗性・代謝の乱れに', biomarker: 'fasting-insulin' },
        ],
    },
    {
        category: '甲状腺', color: '#DCF1EA',
        items: [
            { name: 'TSH（甲状腺刺激ホルモン）', en: 'TSH', role: '甲状腺に指示を出す司令ホルモン。代謝の調整役', biomarker: 'tsh' },
            { name: 'FT3 / FT4（甲状腺ホルモン）', en: 'FT3 / FT4', role: '代謝・体温・エネルギーを駆動する活性ホルモン', biomarker: 'ft3' },
        ],
    },
    {
        category: '睡眠・気分', color: '#E6E0F2',
        items: [
            { name: 'メラトニン', en: 'MELATONIN', role: '睡眠を促すホルモン。夜に分泌され、体内時計を整える' },
            { name: 'セロトニン', en: 'SEROTONIN', role: '気分の安定に関わる。約9割が腸で作られる' },
        ],
    },
];

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
            <img loading="lazy" decoding="async" src="/images/for-you-wellness.png" alt="" className="absolute pointer-events-none opacity-80 hidden md:block"
                style={{ top: '60px', right: '-50px', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/experience_vitality_new.png" alt="" className="absolute pointer-events-none opacity-40"
                style={{ bottom: '-60px', left: '-70px', width: '320px', transform: 'scaleX(-1)' }} />

            <JsonLd data={medicalWebPage({ name: 'ホルモンの種類', description: '主なホルモンの種類を、役割・加齢との関係・対応する血液検査から解説。', path: '/hormones' })} />
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
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">ホルモンとは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ホルモンは、体のさまざまな器官で作られ、血液に乗って全身へ「指令」を届ける化学物質です。ごく微量で強力に働き、代謝・成長・生殖・ストレス応答・睡眠・気分など、生命活動のほぼすべてを調整しています。
                        {'\n\n'}
                        多くのホルモンは加齢とともに分泌が変化します。とくに40代以降は、性ホルモンや成長ホルモン、DHEAなどが低下しやすく、疲れ・意欲の低下・体型の変化・睡眠の乱れとして現れます。だからこそ、自分のホルモンの状態を血液検査で知り、生活習慣で支えることが大切になります。
                    </p>
                </section>

                {/* 種類 */}
                {groups.map((g) => (
                    <div key={g.category} className="mb-8">
                        <h2 className="text-sm font-bold tracking-widest mb-3 px-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                            {g.category}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {g.items.map((h) => {
                                const inner = (
                                    <>
                                        <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                                            <span className="font-bold text-[#1A1A1A]">{h.name}</span>
                                            <span className="text-[10px] text-[#1A1A1A]/40 font-mono">{h.en}</span>
                                        </div>
                                        <p className="text-xs text-[#4A4A4A] leading-snug">{h.role}</p>
                                        {h.biomarker && (
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1A1A1A] mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                                血液検査を見る →
                                            </span>
                                        )}
                                    </>
                                );
                                return h.biomarker ? (
                                    <Link key={h.en} href={`/biomarkers/${h.biomarker}`}
                                        className="block rounded-xl p-5 border border-black hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ background: g.color }}>
                                        {inner}
                                    </Link>
                                ) : (
                                    <div key={h.en} className="rounded-xl p-5 border border-black" style={{ background: g.color }}>
                                        {inner}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* 整える */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">ホルモンを整える土台</h2>
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
                    <Link href="/biomarkers" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        血液検査を見る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
