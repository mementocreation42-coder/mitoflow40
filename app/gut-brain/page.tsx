import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import { getGeneBySlug } from '@/lib/genes';
import JsonLd, { medicalWebPage } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '脳腸相関（gut-brain axis） | Mitoflow40',
    description: '腸と脳が双方向に影響し合う「脳腸相関」を、3つの伝達経路・セロトニンと腸・整えるための栄養と習慣からわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/gut-brain' },
    openGraph: {
        title: '脳腸相関（gut-brain axis） | Mitoflow40',
        description: '腸と脳が会話する「脳腸相関」を、3つの経路・セロトニン・腸内環境から解説。',
        url: 'https://mitoflow40.com/gut-brain',
        type: 'article',
    },
};

const routes = [
    { title: '迷走神経', en: 'VAGUS NERVE', note: '腸と脳を直接つなぐ"高速回線"。腸の状態が神経を通じて脳へ伝わる' },
    { title: '短鎖脂肪酸', en: 'SCFA', note: '腸内細菌が食物繊維を発酵して作る物質。炎症を抑え、脳機能にも影響' },
    { title: '神経伝達物質', en: 'NEUROTRANSMITTERS', note: 'セロトニンの約9割は腸で作られる。腸内環境が気分の土台になる' },
];

const relNutrients = [
    { slug: 'fiber', why: '腸内細菌のエサ。短鎖脂肪酸を生み、腸内環境の多様性を支える' },
    { slug: 'tryptophan', why: 'セロトニンの材料。腸での合成にも関わる' },
];
const relGenes = [
    { slug: 'dao', why: '腸でヒスタミンを分解。腸のバリアと深く関わる' },
    { slug: 'maoa', why: 'セロトニン・ドーパミンの分解スピードを決める' },
];

export default function GutBrainPage() {
    const nutrients = relNutrients.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);
    const genes = relGenes.map((c) => ({ ...c, g: getGeneBySlug(c.slug) })).filter((c) => c.g);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#DCEFE4' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-wellness.png" alt="" className="absolute pointer-events-none opacity-80 hidden md:block"
                style={{ top: '60px', right: '-50px', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/about-illustration-bg.png" alt="" className="absolute pointer-events-none opacity-40"
                style={{ bottom: '-70px', left: '-80px', width: '340px' }} />

            <JsonLd data={medicalWebPage({ name: '脳腸相関とは', description: '腸と脳が双方向に影響し合う「脳腸相関」を、3つの経路・セロトニン・腸内環境から解説。', path: '/gut-brain' })} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '脳腸相関' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        GUT-BRAIN AXIS
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        GUT &amp; BRAIN
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>脳腸相関とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        腸と脳は、たえず会話している。お腹の調子と気分・集中・睡眠は、思っている以上につながっています。
                    </p>
                </header>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">脳腸相関とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        脳腸相関とは、腸と脳が双方向に影響を与え合う仕組みのことです。緊張するとお腹が痛くなる、腸の調子が悪いと気分が晴れない——こうした経験は、腸と脳が密につながっている証拠です。
                        {'\n\n'}
                        その主役のひとつが、腸に住む<strong>腸内細菌</strong>です。腸内細菌は食べたものを分解して有用な物質を作り、神経・ホルモン・免疫を通じて脳へ働きかけます。腸は「第二の脳」とも呼ばれ、独自の神経ネットワークを持っています。
                        {'\n\n'}
                        つまり、腸内環境を整えることは、消化の改善だけでなく、気分・集中力・睡眠・ストレス耐性にまで波及します。40代以降の「なんとなくの不調」の背景に、腸の状態が隠れていることは少なくありません。
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">腸と脳をつなぐ3つの経路</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        腸の情報は、おもに次の3つのルートで脳とやり取りされます。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {routes.map((r, i) => (
                            <div key={r.en} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    {i + 1}
                                </div>
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/40 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{r.en}</div>
                                <div className="font-bold text-[#1A1A1A] mb-2">{r.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{r.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">セロトニンと腸</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        「幸せホルモン」として知られる<strong>セロトニン</strong>は、実はその約9割が腸で作られています。材料は必須アミノ酸の<Link href="/nutrients/tryptophan" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">トリプトファン</Link>で、腸内細菌の状態がその合成や前駆体の供給に影響します。
                        腸内環境が乱れると、気分の安定に関わるセロトニン系のバランスも崩れやすくなります。腸を整えることが、メンタルケアの土台になるのはこのためです。
                    </p>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">腸内環境を整えるには</h2>
                    <ul className="space-y-2 text-[#4A4A4A]">
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span><strong>食物繊維</strong>を多様に摂る（野菜・豆・海藻・全粒穀物）— 腸内細菌のエサになる</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span><strong>発酵食品</strong>を取り入れる（納豆・味噌・ヨーグルト・キムチ）</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span>多様な食材で<strong>腸内細菌の多様性</strong>を育てる</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span>睡眠・運動・ストレス管理も腸内環境に直結する</span></li>
                    </ul>
                </section>

                {/* 関連 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">関わる栄養素・遺伝子</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {nutrients.map(({ slug, why, n }) => (
                            <Link key={slug} href={`/nutrients/${slug}`}
                                className="flex items-start gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: n!.color }}>{n!.name}</span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                        {genes.map(({ slug, why, g }) => (
                            <Link key={slug} href={`/genes/${slug}`}
                                className="flex items-start gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif", background: g!.color }}>{g!.symbol}</span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは一般的な解説であり、診断・治療を目的とするものではありません。
                </p>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
