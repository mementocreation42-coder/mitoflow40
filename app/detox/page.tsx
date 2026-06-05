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
                    <div className="mt-5 bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                        <p className="text-sm text-[#4A4A4A] leading-loose whitespace-pre-line">
                            出口の中で、もっとも大きいのは<strong>便</strong>です。分子栄養学などでよく言われる目安では、体外に出る不要物のうち、<strong>およそ便で7〜8割、尿で約2割、汗・髪・爪などはごくわずか</strong>とされます。
                            {'\n\n'}
                            つまり、「汗をかけばデトックス」というイメージほど、汗の役割は大きくありません。<strong>排出の主役は、便と尿</strong>。だからこそ、便通を整えることと、しっかり水分をとって尿を出すことが、解毒の土台になります（運動やサウナは、巡りを良くする補助として役立ちます）。
                        </p>
                        <p className="text-[11px] text-[#4A4A4A]/60 mt-3 leading-relaxed">
                            ※ 割合は物質や個人によって変わり、研究で厳密に確定した数値ではありません。あくまで「便が大半・汗はわずか」という傾向の目安としてご覧ください。
                        </p>
                    </div>
                </section>

                {/* 便は健康のサイン */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">お通じは、毎日読める健康のサイン</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        便は、最大の排出経路であると同時に、<strong>その日の体調を映す「バロメーター」</strong>でもあります。消化・吸収の具合、腸内環境、水分や食物繊維の足り方、ストレスの状態まで——お通じは、検査をしなくても毎日チェックできる、もっとも身近な健康指標です。
                        {'\n\n'}
                        見るポイントは、<strong>かたさ・色・回数</strong>の3つ。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                        <div className="rounded-xl p-5 border border-[#1A1A1A]/15 bg-[#E3F2EE]">
                            <div className="font-bold text-[#1A1A1A] mb-1">かたさ</div>
                            <p className="text-xs text-[#4A4A4A] leading-relaxed">理想は、なめらかなバナナ状（医療で使う「ブリストルスケール」のタイプ3〜4）。コロコロは水分・繊維不足や便秘、泥状・水様は下痢のサイン。</p>
                        </div>
                        <div className="rounded-xl p-5 border border-[#1A1A1A]/15 bg-[#E3F2EE]">
                            <div className="font-bold text-[#1A1A1A] mb-1">色</div>
                            <p className="text-xs text-[#4A4A4A] leading-relaxed">黄〜茶色が通常。極端に黒い・赤い（血）・白っぽいといった色は、体からの注意信号のことがある。</p>
                        </div>
                        <div className="rounded-xl p-5 border border-[#1A1A1A]/15 bg-[#E3F2EE]">
                            <div className="font-bold text-[#1A1A1A] mb-1">回数</div>
                            <p className="text-xs text-[#4A4A4A] leading-relaxed">1日3回〜週3回くらいまでが目安の幅。大切なのは回数そのものより、自分にとっての「いつものリズム」が保てているか。</p>
                        </div>
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        毎日すっきり出ることは、解毒の面でも重要です。便がとどまると、いったん処理して捨てたはずの毒素が、腸から<strong>再吸収</strong>されてしまうことがあります。だから「出す」を整えることは、入れない工夫と同じくらい大切。<strong>食物繊維・水分・発酵食品・適度な運動</strong>が、その土台になります。
                    </p>
                    <p className="text-[11px] text-[#4A4A4A]/60 mt-3 leading-relaxed">
                        ※ 血が混じる・黒い便が続く・急に便通が大きく変わった・強い痛みや体重減少を伴う——そうした場合は、自己判断せず必ず医療機関を受診してください。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/gut-brain', label: '腸脳相関' }, { href: '/digestion', label: '消化・吸収' }, { href: '/nutrients/fiber', label: '食物繊維' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 痩せにくさと解毒 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「がんばっても痩せない」と解毒</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        食事や運動を見直しても、なかなか体重が落ちない——そんなとき、背景のひとつとして<strong>有害物質の蓄積</strong>を挙げる見方があります。水銀などの重金属や、カビ毒、化学物質が体にたまると、<strong>慢性的な炎症</strong>や、エネルギーを作る<strong>ミトコンドリアの働きの低下</strong>、ホルモン・代謝の乱れを通じて、<strong>痩せにくい状態</strong>につながる可能性が指摘されています。
                        {'\n\n'}
                        ただし、これは<strong>科学的に確立した結論ではありません</strong>。痩せにくさの原因は、睡眠不足・血糖の乱れ・ストレス・筋肉量・甲状腺など多岐にわたり、有害物質はそのひとつの可能性にすぎません。「痩せないのは毒のせい」と決めつけるのは早計です。
                        {'\n\n'}
                        現実的なのは、まず<strong>食事・運動・睡眠・血糖</strong>という土台を整えること。そのうえで、解毒の力（便通・水分・肝臓・腸）を保ち、入ってくる有害物質を減らす。それでも長く停滞が続く・気になる症状がある場合は、自己判断せず<strong>医療機関に相談</strong>するのが安心です。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/reduce-toxins', label: '有害物質を減らす暮らし' }, { href: '/mycotoxins', label: 'カビ毒' }, { href: '/inflammation', label: '炎症' }, { href: '/mitochondria', label: 'ミトコンドリア' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
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
