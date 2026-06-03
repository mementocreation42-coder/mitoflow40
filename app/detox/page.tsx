import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import { getGeneBySlug } from '@/lib/genes';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '解毒（デトックス） | Mitoflow40',
    description: '体に備わった解毒システム（肝臓のPhase I/II・腸・腎臓・汗）を、仕組み・グルタチオンや遺伝子GST/GPXとの関係・解毒力を支える習慣からわかりやすく解説。"毒出し神話"ではない本当の解毒。',
    alternates: { canonical: 'https://mitoflow40.com/detox' },
    openGraph: {
        title: '解毒（デトックス） | Mitoflow40',
        description: '体に備わった解毒システムを、肝臓・腸・腎臓の仕組みと、支える栄養素・遺伝子から解説。',
        url: 'https://mitoflow40.com/detox',
        type: 'article',
    },
};

// 解毒の経路
const routes = [
    { title: '肝臓', en: 'LIVER', note: '解毒の主役。Phase I で毒素を変化させ、Phase II で包んで排出可能にする' },
    { title: '腸', en: 'GUT', note: '便として体外へ。便秘だと処理した毒素が再吸収されてしまう' },
    { title: '腎臓', en: 'KIDNEY', note: '水溶性の老廃物を尿として排出。十分な水分が大切' },
    { title: '汗・呼気', en: 'SKIN / LUNGS', note: '一部は汗や呼気からも。運動・サウナが補助的に働く' },
];

// 肝臓の2段階
const phases = [
    { title: 'Phase I（変換）', note: '酵素（CYP450）が毒素を化学変化させる。この途中は一時的に反応性が高まる' },
    { title: 'Phase II（抱合）', note: 'グルタチオンや硫黄・アミノ酸で包み、水に溶けて排出できる形にする', href: '/nutrients/glutathione' },
];

const relNutrients = [
    { slug: 'glutathione', why: 'Phase II と抗酸化の中心。解毒の主役' },
    { slug: 'nac', why: 'グルタチオンの材料を供給' },
    { slug: 'selenium', why: '抗酸化酵素GPXの必須成分' },
    { slug: 'fiber', why: '腸から毒素を排出し、再吸収を防ぐ' },
    { slug: 'b6', why: 'Phase II の抱合反応を支える' },
    { slug: 'magnesium', why: '多くの解毒酵素の補因子' },
];
const relGenes = [
    { slug: 'gst-gpx', why: 'グルタチオンを使って毒素・酸化を処理する酵素群' },
    { slug: 'mthfr', why: 'メチレーションを介して解毒（Phase II）を支える' },
];

export default function DetoxPage() {
    const nutrients = relNutrients.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);
    const genes = relGenes.map((c) => ({ ...c, g: getGeneBySlug(c.slug) })).filter((c) => c.g);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E7EFD8' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '解毒（デトックス）とは', description: '体に備わった解毒システムを、肝臓・腸・腎臓の仕組みと、支える栄養素・遺伝子から解説。', path: '/detox' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '生活習慣', path: '/library#lifestyle' }, { name: '解毒', path: '/detox' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '生活習慣', href: '/library#lifestyle' }, { name: '解毒' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        DETOXIFICATION
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        DETOX
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>解毒（デトックス）とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        "毒出し"の特別な何かは要りません。体にはもともと精巧な解毒システムが備わっています。
                    </p>
                </header>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">解毒とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「デトックス」と聞くと、特別なお茶やクレンズを思い浮かべるかもしれません。でも実際の解毒は、<strong>肝臓・腸・腎臓・汗</strong>という、体に備わった精巧なシステムが24時間休みなく行っています。私たちにできるのは、新しい毒を"出す"ことより、<strong>この本来の解毒システムを邪魔せず、しっかり働ける状態に保つ</strong>ことです。
                        {'\n\n'}
                        毒素には、外から入るもの（食品添加物・農薬・大気汚染・アルコール・薬）と、体内で生まれるもの（代謝の老廃物・ホルモンの使用済み分）があります。これらを処理する中心が肝臓で、2段階の工程で「水に溶けて排出できる形」に変えていきます。
                        {'\n\n'}
                        解毒力には<strong>遺伝的な個人差</strong>もあります。日本人に多いとされる<Link href="/genes/gst-gpx" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">GST/GPX</Link>の欠損があると、化学物質に敏感だったり二日酔いがひどかったりします。だからこそ、毒の負担を減らし、解毒の材料を満たすことが大切になります。
                    </p>
                </section>

                {/* 4つの経路 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">解毒の4つの出口</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                        {routes.map((r) => (
                            <div key={r.en} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/40 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{r.en}</div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{r.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{r.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 肝臓の2段階 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">肝臓の2段階システム</h2>
                    <div className="space-y-3">
                        {phases.map((p, i) => (
                            <div key={p.title} className="flex items-start gap-4 bg-[#F4F8EC] rounded-xl p-4">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{i + 1}</span>
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">
                                        {p.href ? (
                                            <Link href={p.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{p.title}</Link>
                                        ) : p.title}
                                    </div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{p.note}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mt-4">
                        Phase I だけが進んで Phase II が追いつかないと、反応性の高い中間物質が溜まって不調の原因に。<strong>2段階をバランスよく回すこと</strong>が、安全な解毒の鍵です。
                    </p>
                </section>

                {/* 支える習慣 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">解毒力を支える習慣</h2>
                    <ul className="space-y-2 text-[#4A4A4A]">
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span><strong>毒の入口を減らす</strong>：加工食品・過度な飲酒・香料や農薬を控える</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span><strong>アブラナ科野菜・硫黄食材</strong>（ブロッコリー・にんにく）でPhase IIを後押し</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span><strong>食物繊維と水分</strong>で腸と腎臓からの排出をスムーズに</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span><strong>運動・サウナ</strong>で巡りを良くし、汗からの排出も補助</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span><strong>睡眠</strong>：肝臓も腸も、休息時にメンテナンスが進む</span></li>
                    </ul>
                </section>

                {/* 栄養素・遺伝子 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">解毒に関わる栄養素・遺伝子</h2>
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
                    ※ 本ページは一般的な解説であり、診断・治療や特定のデトックス商品を推奨するものではありません。
                </p>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/library#lifestyle" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        生活習慣 に戻る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
