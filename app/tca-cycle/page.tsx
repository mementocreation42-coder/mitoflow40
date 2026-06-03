import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'TCA回路（クエン酸回路） | Mitoflow40',
    description: 'ミトコンドリアでエネルギー(ATP)を生み出す中心エンジン「TCA回路（クエン酸回路・クレブス回路）」を、流れ・役割・回すために必要な栄養素からわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/tca-cycle' },
    openGraph: {
        title: 'TCA回路（クエン酸回路） | Mitoflow40',
        description: 'ミトコンドリアのエネルギー産生エンジン「TCA回路」を、流れ・役割・必要な栄養素から解説。',
        url: 'https://mitoflow40.com/tca-cycle',
        type: 'article',
    },
};

// 回路の中間体（8ステップ）
const steps = [
    { name: 'クエン酸', en: 'Citrate', note: 'アセチルCoA + オキサロ酢酸 から生成' },
    { name: 'イソクエン酸', en: 'Isocitrate', note: '異性化' },
    { name: 'α-ケトグルタル酸', en: 'α-Ketoglutarate', note: 'NADH を産生（B1・リポ酸が必要）' },
    { name: 'スクシニルCoA', en: 'Succinyl-CoA', note: 'NADH を産生' },
    { name: 'コハク酸', en: 'Succinate', note: 'GTP（≒ATP）を産生' },
    { name: 'フマル酸', en: 'Fumarate', note: 'FADH2 を産生' },
    { name: 'リンゴ酸', en: 'Malate', note: 'NADH を産生' },
    { name: 'オキサロ酢酸', en: 'Oxaloacetate', note: '再びクエン酸へ（回路が一周）' },
];

// 回路を回す栄養素（nutrients.ts の slug）
const cofactors = [
    { slug: 'thiamine', why: 'PDH・α-KGDH の補酵素。糖→アセチルCoA、回路の要所で必須' },
    { slug: 'b2', why: 'FAD の材料。コハク酸→フマル酸などで電子を受け取る' },
    { slug: 'niacin', why: 'NAD+ の材料。回路で繰り返し電子を運ぶ主役' },
    { slug: 'alpha-lipoic-acid', why: 'PDH・α-KGDH の補酵素。回路の入口と要所を支える' },
    { slug: 'magnesium', why: 'ATP の利用や複数の酵素反応に必要' },
    { slug: 'iron', why: 'アコニターゼなど鉄を含む酵素、電子伝達系で酸素利用に必須' },
    { slug: 'coq10', why: '回路が生んだ電子を電子伝達系へ運ぶ次の担い手' },
];

export default function TcaCyclePage() {
    const nutrients = cofactors
        .map((c) => ({ ...c, n: getNutrientBySlug(c.slug) }))
        .filter((c) => c.n);

    // 円環図のジオメトリ
    const cx = 180, cy = 180, R = 120, labelR = 150, arrowR = 86;
    const toXY = (deg: number, r: number): [number, number] => [
        cx + r * Math.cos((deg * Math.PI) / 180),
        cy + r * Math.sin((deg * Math.PI) / 180),
    ];
    const ringNodes = steps.map((s, i) => {
        const a = -90 + 45 * i; // 上から時計回り
        const [nx, ny] = toXY(a, R);
        const [lx, ly] = toXY(a, labelR);
        const cos = Math.cos((a * Math.PI) / 180);
        const anchor: 'start' | 'middle' | 'end' = cos > 0.25 ? 'start' : cos < -0.25 ? 'end' : 'middle';
        return { ...s, i, nx, ny, lx, ly, anchor };
    });
    const [ax0, ay0] = toXY(200, arrowR);
    const [ax1, ay1] = toXY(160, arrowR);
    const arrowPath = `M ${ax0.toFixed(1)} ${ay0.toFixed(1)} A ${arrowR} ${arrowR} 0 1 1 ${ax1.toFixed(1)} ${ay1.toFixed(1)}`;

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#FFE9D2' }}>
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'TCA回路（クエン酸回路）とは', description: 'ミトコンドリアのエネルギー産生エンジン「TCA回路」を、流れ・役割・必要な栄養素から解説。', path: '/tca-cycle' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: 'TCA回路', path: '/tca-cycle' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                {/* Hero */}
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: 'TCA回路' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        ENERGY ENGINE
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        TCA CYCLE
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>クエン酸回路（TCAサイクル）とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        ミトコンドリアの中で、食べたものをエネルギーに変える「中心エンジン」。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">TCA回路とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        TCA回路（クエン酸回路、クレブス回路とも）は、ミトコンドリアの中（マトリックス）で行われる、エネルギー産生の中心的な代謝経路です。
                        糖・脂質・タンパク質はいずれも分解されて「アセチルCoA」という共通の燃料になり、この回路に投入されます。
                        {'\n\n'}
                        回路が一周するあいだに、燃料は段階的に分解され、<strong>NADH・FADH2</strong> という「電子を積んだ運び屋」が生み出されます。
                        これらが次の<strong>電子伝達系</strong>へ電子を渡すことで、ようやく大量のエネルギー通貨 <strong>ATP</strong> が作られます。
                        つまりTCA回路は、ATPを作る最終工程の「燃料を整える前段階」であり、エネルギー代謝の心臓部です。
                    </p>
                </section>

                {/* なぜ重要か */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ40代の体に重要か</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        疲れやすい・スタミナが落ちた・回復が遅い——こうした「エネルギー不足」の感覚は、TCA回路がうまく回っていないサインかもしれません。
                        この回路は単独では動かず、<strong>ビタミンB群・マグネシウム・鉄・アルファリポ酸</strong>といった補酵素（潤滑油）を必要とします。
                        どれかが不足すると、燃料があっても回路が滞り、エネルギーを作り切れません。
                        {'\n\n'}
                        加齢でミトコンドリアの量・質が低下しやすい40代以降は、この「潤滑油」を満たすことが、エネルギーを取り戻す現実的なアプローチになります。
                    </p>
                </section>

                {/* 回路の流れ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">回路の流れ（8ステップ）</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        アセチルCoAがオキサロ酢酸と結びついて始まり、8つの中間体を経て一周します。各ステップで電子の運び屋(NADH・FADH2)やGTPが生まれます。
                    </p>
                    <div className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                        {/* 円環ダイアグラム */}
                        <svg viewBox="-80 0 520 360" className="w-full max-w-[460px] mx-auto block">
                            <defs>
                                <marker id="tcaArrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
                                    <path d="M0,0 L6,3 L0,6 Z" fill="#FF9855" />
                                </marker>
                            </defs>
                            {/* 回転を示す矢印（時計回り） */}
                            <path d={arrowPath} fill="none" stroke="#FF9855" strokeWidth="2.5" strokeLinecap="round"
                                markerEnd="url(#tcaArrow)" opacity="0.9" />
                            {/* ノードをつなぐ薄いリング */}
                            <circle cx={cx} cy={cy} r={R} fill="none" stroke="#1A1A1A" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 4" />
                            {/* 中心ラベル */}
                            <text x={cx} y={cy - 9} textAnchor="middle" fontSize="13" fill="#1A1A1A" fontWeight="700" fontFamily="'Noto Sans JP', sans-serif">アセチルCoA</text>
                            <text x={cx} y={cy + 11} textAnchor="middle" fontSize="15" fill="#FF9855" fontWeight="700" fontFamily="'Space Grotesk', sans-serif">TCA</text>
                            <text x={cx} y={cy + 28} textAnchor="middle" fontSize="10" fill="#1A1A1A" fillOpacity="0.5" fontFamily="'Noto Sans JP', sans-serif">糖・脂質・タンパク質から</text>
                            {/* ノード */}
                            {ringNodes.map((node) => (
                                <g key={node.en}>
                                    <text x={node.lx} y={node.ly} textAnchor={node.anchor} dominantBaseline="middle"
                                        fontSize="12.5" fontWeight="700" fill="#1A1A1A" fontFamily="'Noto Sans JP', sans-serif">
                                        {node.name}
                                    </text>
                                    <circle cx={node.nx} cy={node.ny} r="16" fill="#FF9855" stroke="#fff" strokeWidth="2" />
                                    <text x={node.nx} y={node.ny} textAnchor="middle" dominantBaseline="central"
                                        fontSize="14" fontWeight="700" fill="#fff" fontFamily="'Space Grotesk', sans-serif">
                                        {node.i + 1}
                                    </text>
                                </g>
                            ))}
                        </svg>

                        {/* 詳細リスト */}
                        <ol className="space-y-2 mt-5 pt-5 border-t border-[#1A1A1A]/10">
                            {steps.map((s, i) => (
                                <li key={s.en} className="flex items-center gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF9855] text-white text-[11px] font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {i + 1}
                                    </span>
                                    <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                                        <span className="font-bold text-sm text-[#1A1A1A]">{s.name}</span>
                                        <span className="text-xs text-[#1A1A1A]/40 font-mono">{s.en}</span>
                                        <span className="text-xs text-[#4A4A4A] sm:ml-auto">{s.note}</span>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* 回路を回す栄養素 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">回路を回す栄養素</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        TCA回路は、これらの栄養素を「潤滑油」として必要とします。各栄養素のページで詳しく読めます。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {nutrients.map(({ slug, why, n }) => (
                            <Link
                                key={slug}
                                href={`/nutrients/${slug}`}
                                className="flex items-start gap-3 p-4 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70"
                            >
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: n!.color }}>
                                    {n!.name}
                                </span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 次のステップ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">この先：電子伝達系へ</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-5">
                        TCA回路が生んだ NADH・FADH2 は、ミトコンドリア内膜の「<Link href="/electron-transport-chain" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">電子伝達系</Link>」へ運ばれます。
                        そこで電子が受け渡される中で、<strong>CoQ10</strong> が電子の運搬役として働き、最終的に酸素と結びついて水になり、その過程で大量の <strong>ATP</strong> が作られます。
                        TCA回路（燃料を整える）と電子伝達系（ATPを作る）は、ひと続きのエネルギー生産ラインです。
                    </p>
                    <Link href="/electron-transport-chain" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition" style={{ fontFamily: "'Space Grotesk', sans-serif", background: '#1A1A1A', color: '#FFFFFF' }}>
                        電子伝達系を見る <span>→</span>
                    </Link>
                </section>

                {/* Disclaimer */}
                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは生化学の一般的な解説であり、診断・治療を目的とするものではありません。
                </p>

                {/* Back links */}
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
