import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '血糖コントロール（血糖の波） | Mitoflow40',
    description: '食後の眠気・甘いもの渇望・夕方のだるさの正体「血糖の波」を、仕組み・インスリン抵抗性・糖化との関係・整える食べ方からわかりやすく解説。HbA1cやインスリンとのつながりも。',
    alternates: { canonical: 'https://mitoflow40.com/blood-sugar' },
    openGraph: {
        title: '血糖コントロール（血糖の波） | Mitoflow40',
        description: '「血糖の波」を、仕組み・インスリン抵抗性・糖化との関係・整える食べ方から解説。',
        url: 'https://mitoflow40.com/blood-sugar',
        type: 'article',
    },
};

// 血糖の波が招くサイン
const signs = [
    '食後の強い眠気・だるさ',
    '甘いもの・炭水化物への渇望',
    '空腹で集中できない・イライラ（血糖の急降下）',
    '夕方のエネルギー切れ',
    '食後すぐにまたお腹が空く',
];

// 整える食べ方
const habits = [
    { head: 'ベジ・プロテインファースト', body: '野菜・タンパク質・脂質を先に食べ、糖質を後に。血糖の立ち上がりがゆるやかに。' },
    { head: '精製糖質を減らす', body: '砂糖入り飲料・白パン・菓子を控える。最も大きな波の原因。' },
    { head: '食物繊維を組み合わせる', body: '糖の吸収をゆるやかにする。野菜・豆・海藻を毎食に。', href: '/nutrients/fiber' },
    { head: '食後に動く', body: '食後10分の散歩で、上がった血糖を筋肉が使ってくれる。' },
    { head: 'よく噛む・ゆっくり', body: '早食いは血糖を急上昇させる。よく噛むだけでも波が小さくなる。' },
];

// 関わる栄養素
const relNutrients = [
    { slug: 'fiber', why: '糖の吸収をゆるやかにし、波を小さくする' },
    { slug: 'magnesium', why: 'インスリンの効きを支える。不足で血糖が乱れやすい' },
    { slug: 'alpha-lipoic-acid', why: '糖の取り込みと抗酸化をサポート' },
    { slug: 'protein', why: '血糖の安定と満腹感。渇望を抑える土台' },
];

// 関わる血液検査
const relBiomarkers = [
    { slug: 'hba1c', name: 'HbA1c', why: '過去1〜2ヶ月の血糖の平均。糖化の指標でもある' },
    { slug: 'fasting-insulin', name: '空腹時インスリン', why: 'インスリンの出すぎ＝抵抗性の早期サイン' },
    { slug: 'homa-ir', name: 'HOMA-IR', why: 'インスリン抵抗性の指標' },
];

export default function BloodSugarPage() {
    const nutrients = relNutrients.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#FBEFD2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '血糖コントロール（血糖の波）とは', description: '「血糖の波」を、仕組み・インスリン抵抗性・糖化との関係・整える食べ方から解説。', path: '/blood-sugar' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '血糖コントロール', path: '/blood-sugar' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '血糖コントロール' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        BLOOD SUGAR
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        BLOOD SUGAR
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>血糖コントロール（血糖の波）とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        食後の眠気、甘いもの渇望、夕方のだるさ——その多くは「血糖の波」が招いています。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">血糖の波とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        食事で糖質をとると血糖（血液中のブドウ糖）が上がり、それを下げるためにインスリンが分泌されます。問題は、糖質を一気にとったときに起こる<strong>血糖の急上昇（スパイク）と、その反動の急降下</strong>です。このジェットコースターのような波が、体に負担をかけます。
                        {'\n\n'}
                        血糖が急に上がると、インスリンが大量に出て今度は下がりすぎる。すると脳がエネルギー不足を感じ、<strong>強い眠気・集中力低下・甘いものへの渇望</strong>が起こります。これがまた糖質に手を伸ばさせ、波がくり返される悪循環になります。
                        {'\n\n'}
                        さらに、この状態が続くとインスリンが効きにくくなる<strong>「インスリン抵抗性」</strong>に進み、<Link href="/glycation" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">糖化（こげる）</Link>や内臓脂肪、生活習慣病のリスクが高まります。逆に、波を小さく保つことが、エネルギーの安定と老化予防の両方に効きます。
                    </p>
                </section>

                {/* 現代食と糖質過多 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">現代食は「糖質過多」になりやすい</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        そもそも、なぜ現代人はこれほど血糖を乱しやすいのでしょうか。背景には、<strong>食生活の急激な変化</strong>があります。
                        {'\n\n'}
                        人類の歴史の大半で、糖質は<strong>貴重なエネルギー源</strong>でした。簡単には手に入らず、だからこそ私たちの体は「糖は手に入るうちに、しっかり取り込んで蓄える」よう設計されています。ところが現代は、<strong>白い砂糖・精製された小麦や米・甘い飲み物・お菓子・加工食品</strong>が、いつでも安く手に入ります。朝から夜まで、間食も含めて、ほぼ一日中、精製された糖質を口にできる環境です。
                        {'\n\n'}
                        つまり、<strong>飢餓を前提に作られた体</strong>と、<strong>糖質があふれる現代の環境</strong>とのあいだに、大きなミスマッチが生まれています。これが、血糖の乱高下、インスリンの酷使、内臓脂肪の蓄積、<Link href="/glycation" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">糖化</Link>、そして生活習慣病へとつながりやすい、現代特有の事情です。
                        {'\n\n'}
                        ただし、ここでも「糖質＝悪」ではありません。問題は<strong>「量・頻度・質（精製度）」</strong>。極端に糖質を断つ必要はなく、精製度の低い糖質を選び、食べ方を整えて波を小さくする——それで十分に変わります。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/caution-foods', label: '気をつけたい食品' }, { href: '/glycation', label: '糖化' }, { href: '/foods/brown-rice', label: '玄米' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* サイン */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">血糖の波が招くサイン</h2>
                    <div className="bg-white/70 rounded-2xl p-6 border border-black mt-5">
                        <ul className="space-y-2">
                            {signs.map((s, i) => (
                                <li key={i} className="flex gap-3 text-[#4A4A4A]">
                                    <span className="text-[#FF9855] flex-shrink-0">●</span>
                                    <span>{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 整える食べ方 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">血糖の波を小さくする食べ方</h2>
                    <div className="space-y-3 mt-5">
                        {habits.map((h, i) => (
                            <div key={h.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{i + 1}</span>
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">
                                        {h.href ? (
                                            <Link href={h.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{h.head}</Link>
                                        ) : h.head}
                                    </div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{h.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 測る */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">血糖の状態は「測れる」</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-4">
                        血糖コントロールの状態は、血液検査で客観的に把握できます。代表的な指標がこちらです。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {relBiomarkers.map((b) => (
                            <Link key={b.slug} href={`/biomarkers/${b.slug}`} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {b.name} →
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 栄養素 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">血糖の安定に関わる栄養素</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {nutrients.map(({ slug, why, n }) => (
                            <Link key={slug} href={`/nutrients/${slug}`}
                                className="flex items-start gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: n!.color }}>{n!.name}</span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは一般的な解説であり、診断・治療を目的とするものではありません。糖尿病の診断・治療は医療機関にご相談ください。
                </p>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/library#mechanism" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        身体の仕組み に戻る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
