import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '解糖系（グリコリシス）とは | Mitoflow40',
    description: 'エネルギー産生の最初のステップ「解糖系（グリコリシス）」とは。ブドウ糖がピルビン酸になるまでの流れ、酸素がいらない理由、乳酸との関係、TCA回路への橋渡し、必要な栄養素を40代の視点でわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/glycolysis' },
    openGraph: {
        title: '解糖系（グリコリシス）とは | Mitoflow40',
        description: 'エネルギー産生の最初のステップ「解糖系」を、流れ・酸素との関係・TCA回路への橋渡し・必要な栄養素から解説。',
        url: 'https://mitoflow40.com/glycolysis',
        type: 'article',
    },
};

// 解糖系の流れ（要点を6段階に集約）
const flow = [
    { stage: 'グルコース', en: 'Glucose', phase: '投資期', note: '血中から細胞に取り込まれる燃料。ここが出発点' },
    { stage: 'グルコース6-リン酸', en: 'Glucose-6-P', phase: '投資期', note: 'ATPを1つ使ってリン酸化（Mgが必要）。逃げないよう"封"をする' },
    { stage: 'フルクトース1,6-二リン酸', en: 'Fructose-1,6-BP', phase: '投資期', note: 'もう1つATPを投資。ここまでで2ATPを"先行投資"' },
    { stage: 'グリセルアルデヒド3-リン酸 ×2', en: 'G3P ×2', phase: '回収期', note: '糖が2つに割れ、以降は2分子で進む' },
    { stage: '1,3-二リン酸グリセリン酸 ×2', en: '1,3-BPG ×2', phase: '回収期', note: 'NAD+ が電子を受け取り NADH に（ナイアシンが必要）' },
    { stage: 'ピルビン酸 ×2', en: 'Pyruvate ×2', phase: '回収期', note: 'ゴール。差し引き 2ATP・2NADH・2ピルビン酸 が残る' },
];

// 解糖系を支える栄養素
const cofactors = [
    { slug: 'magnesium', why: 'ヘキソキナーゼなどリン酸化酵素は Mg-ATP を必要とする' },
    { slug: 'niacin', why: 'NAD+ の材料。電子を受け取り NADH を生む回収期の主役' },
    { slug: 'thiamine', why: 'ピルビン酸→アセチルCoA（PDH）の補酵素。解糖系とTCAの橋渡し' },
    { slug: 'alpha-lipoic-acid', why: 'PDH の補酵素。ピルビン酸を次の段階へ渡す要所を支える' },
];

export default function GlycolysisPage() {
    const nutrients = cofactors
        .map((c) => ({ ...c, n: getNutrientBySlug(c.slug) }))
        .filter((c) => c.n);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F4EFCE' }}>
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '解糖系（グリコリシス）とは', description: 'エネルギー産生の最初のステップ「解糖系」を、流れ・酸素との関係・TCA回路への橋渡し・必要な栄養素から解説。', path: '/glycolysis' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '解糖系', path: '/glycolysis' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '解糖系' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        THE FIRST STEP
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        GLYCOLYSIS
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>解糖系（グリコリシス）とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        ブドウ糖からエネルギーを取り出す、いちばん最初のステップ。酸素がなくても動く「速攻の発電」です。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">解糖系とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        解糖系（グリコリシス）は、ブドウ糖（グルコース）を分解してエネルギーを取り出す、代謝のいちばん最初のステップです。ミトコンドリアの中ではなく、<strong>細胞質</strong>で行われます。
                        {'\n\n'}
                        特徴は、<strong>酸素を必要としない</strong>こと。そのぶん作れるエネルギー（ATP）はわずか2個と少なめですが、すばやく動けるのが強みです。短距離ダッシュのような「速攻の発電」が解糖系、と考えるとイメージしやすいでしょう。
                        {'\n\n'}
                        解糖系のゴールでできる<strong>ピルビン酸</strong>は、酸素が十分にあればミトコンドリアへ運ばれ、<strong>TCA回路</strong>・<strong>電子伝達系</strong>へと進んで、大量のATPを生み出します。つまり解糖系は、本格的なエネルギー産生ラインの「入口」にあたる工程です。
                    </p>
                </section>

                {/* なぜ重要か */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ40代の体に重要か</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        解糖系は、血糖（血液中のブドウ糖）を直接の燃料にします。だからこそ、食後の血糖の乱高下や、慢性的な高血糖は、このエネルギーの入口に大きく影響します。甘いものや精製された糖質に頼りがちな食生活は、解糖系ばかりを酷使し、ミトコンドリアでの本格的な発電（脂質やケトンも使う柔軟な代謝）を鈍らせることにつながります。
                        {'\n\n'}
                        また、激しい運動や酸素が足りない状況では、ピルビン酸が<strong>乳酸</strong>に変わります。乳酸そのものは悪者ではなく再利用される燃料ですが、たまりすぎると一時的な疲労感の一因になります。40代以降は、<strong>血糖を安定させ、糖だけに偏らない代謝</strong>を意識することが、安定した活力につながります。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[
                            { href: '/blood-sugar', label: '血糖コントロール' },
                            { href: '/ketones', label: 'ケトン体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 流れ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">解糖系の流れ</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        前半はATPを使う「投資期」、後半はそれ以上のATPを取り戻す「回収期」。差し引きで2ATPと2NADH、そして2つのピルビン酸が残ります。
                    </p>
                    <div className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                        <div className="space-y-2">
                            {flow.map((step, i) => (
                                <div key={step.en}>
                                    <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: step.phase === '投資期' ? '#FBF6E0' : '#EAF6F6' }}>
                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF9855] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                            {i + 1}
                                        </span>
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-2 flex-wrap">
                                                <span className="font-bold text-sm text-[#1A1A1A]">{step.stage}</span>
                                                <span className="text-xs text-[#1A1A1A]/40 font-mono">{step.en}</span>
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#1A1A1A]/60 font-bold">{step.phase}</span>
                                            </div>
                                            <p className="text-xs text-[#4A4A4A] mt-0.5">{step.note}</p>
                                        </div>
                                    </div>
                                    {i < flow.length - 1 && (
                                        <div className="text-center text-[#FF9855] text-xl leading-none py-1">↓</div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 pt-5 border-t border-[#1A1A1A]/10 grid grid-cols-3 gap-3 text-center">
                            <div>
                                <div className="text-2xl font-bold text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2</div>
                                <div className="text-xs text-[#4A4A4A]">ATP（正味）</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2</div>
                                <div className="text-xs text-[#4A4A4A]">NADH</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2</div>
                                <div className="text-xs text-[#4A4A4A]">ピルビン酸</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2つの分かれ道 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">ピルビン酸の2つの分かれ道</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        解糖系でできたピルビン酸は、酸素があるかどうかで進む道が変わります。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-white/70 rounded-2xl p-5 border border-black">
                            <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WITH OXYGEN · 酸素あり</div>
                            <div className="font-bold text-[#1A1A1A] mb-1">ミトコンドリアへ</div>
                            <p className="text-xs text-[#4A4A4A] leading-relaxed">ピルビン酸はアセチルCoAになり、<Link href="/tca-cycle" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">TCA回路</Link>へ。大量のATPを作る本格発電に進む。</p>
                        </div>
                        <div className="bg-white/70 rounded-2xl p-5 border border-black">
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WITHOUT OXYGEN · 酸素不足</div>
                            <div className="font-bold text-[#1A1A1A] mb-1">乳酸へ</div>
                            <p className="text-xs text-[#4A4A4A] leading-relaxed">激しい運動などで酸素が足りないと、ピルビン酸は乳酸に。再利用される燃料だが、たまると一時的な疲労感の一因に。</p>
                        </div>
                    </div>
                </section>

                {/* 支える栄養素 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">解糖系を支える栄養素</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        解糖系と、その先のTCA回路への橋渡しには、これらの栄養素が欠かせません。各栄養素のページで詳しく読めます。
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
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">この先：TCA回路へ</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-5">
                        解糖系が生んだ<strong>ピルビン酸</strong>は、酸素があればミトコンドリアに入り、<strong>アセチルCoA</strong>へと変わって「<Link href="/tca-cycle" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">TCA回路</Link>」に投入されます。ここからが、大量のATPを生む本格的なエネルギー産生ラインです。解糖系（入口）→ TCA回路（燃料を整える）→ 電子伝達系（ATPを作る）と、ひと続きでつながっています。
                    </p>
                    <Link href="/tca-cycle" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition" style={{ fontFamily: "'Space Grotesk', sans-serif", background: '#1A1A1A', color: '#FFFFFF' }}>
                        TCA回路を見る <span>→</span>
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
