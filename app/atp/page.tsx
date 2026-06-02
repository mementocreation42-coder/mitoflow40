import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage } from '@/components/JsonLd';

export const metadata = {
    title: 'ATP（エネルギー通貨） | Mitoflow40',
    description: '体のすべての活動を支えるエネルギー通貨「ATP（アデノシン三リン酸）」を、作られ方（解糖系→TCA回路→電子伝達系）・使われ方・支える栄養素からわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/atp' },
    openGraph: {
        title: 'ATP（エネルギー通貨） | Mitoflow40',
        description: '体のエネルギー通貨「ATP」を、作られ方・使われ方・支える栄養素から解説。',
        url: 'https://mitoflow40.com/atp',
        type: 'article',
    },
};

// 産生ライン
const productionLine = [
    { stage: '食事', sub: '糖・脂質・タンパク質', place: '', note: 'エネルギーの原料を取り込む' },
    { stage: '解糖系', sub: 'GLYCOLYSIS', place: '細胞質', note: 'ブドウ糖を分解。少量のATPを素早く産生' },
    { stage: 'TCA回路', sub: 'TCA CYCLE', place: 'ミトコンドリア', note: '燃料を分解しNADH・FADH2を生成', href: '/tca-cycle' },
    { stage: '電子伝達系', sub: 'ETC', place: 'ミトコンドリア内膜', note: '酸素を使い大量のATPを産生' },
];

// ATPを支える栄養素
const cofactors = [
    { slug: 'coq10', why: '電子伝達系で電子を運び、ATP産生を回す必須パーツ' },
    { slug: 'magnesium', why: 'ATPはマグネシウムと結合して初めて使える（ATP-Mg）' },
    { slug: 'creatine', why: '使ったATPを筋肉・脳で即座に再生するバッファー' },
    { slug: 'niacin', why: 'NAD+として電子を運ぶ、産生ラインの主役' },
    { slug: 'b2', why: 'FADとして電子を受け渡す' },
    { slug: 'thiamine', why: '糖→アセチルCoA、TCA回路の要所で必須' },
    { slug: 'iron', why: '電子伝達系で酸素を使う最終工程に不可欠' },
    { slug: 'alpha-lipoic-acid', why: 'エネルギー代謝を助けつつ酸化を抑える' },
];

export default function AtpPage() {
    const nutrients = cofactors
        .map((c) => ({ ...c, n: getNutrientBySlug(c.slug) }))
        .filter((c) => c.n);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#D7F0E8' }}>
            {/* Decorative illustrations */}
            <img src="/images/experience_vitality_new.png" alt="" className="absolute pointer-events-none opacity-80 hidden md:block"
                style={{ top: '60px', right: '-50px', width: '260px' }} />
            <img src="/images/for-you-science.png" alt="" className="absolute pointer-events-none opacity-40"
                style={{ bottom: '-60px', left: '-70px', width: '320px', transform: 'scaleX(-1)' }} />

            <JsonLd data={medicalWebPage({ name: 'ATP（アデノシン三リン酸）とは', description: '体のエネルギー通貨「ATP」を、作られ方・使われ方・支える栄養素から解説。', path: '/atp' })} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                {/* Hero */}
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        ENERGY CURRENCY
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        ATP
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>アデノシン三リン酸（エネルギー通貨）</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        体のあらゆる活動を動かす「エネルギー通貨」。考える・動く・修復する——すべてATPで支払われています。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">ATPとは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ATP（アデノシン三リン酸）は、体が使えるエネルギーを蓄えた分子で、しばしば「エネルギー通貨」と呼ばれます。3つ連なったリン酸のうち、末端の結合が切れて ADP（二リン酸）になるとき、エネルギーが放出されます。
                        {'\n\n'}
                        筋肉を動かす、神経で情報を伝える、体温を保つ、タンパク質を合成する、細胞を修復する——こうした活動はすべてATPの「支払い」で成り立っています。脳や心臓のように働き続ける臓器は、特に大量のATPを必要とします。
                        {'\n\n'}
                        ATPは体内にほとんど貯められないため、使うそばから作り直されています。1日に作られて使われるATPの量は、なんと体重に匹敵するとも言われます。だからこそ「ATPを作り続ける力」＝ミトコンドリアの働きが、活力の土台になります。
                    </p>
                </section>

                {/* 産生ライン */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">ATPはどう作られるか</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        食べたものは3つの工程を経てATPになります。大半のATPは、ミトコンドリアの電子伝達系で作られます。
                    </p>
                    <div className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                        <div className="space-y-2">
                            {productionLine.map((step, i) => (
                                <div key={step.stage}>
                                    <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: i === productionLine.length - 1 ? '#FFE9D2' : '#F4FAF8' }}>
                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                            {i + 1}
                                        </span>
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-2 flex-wrap">
                                                <span className="font-bold text-[#1A1A1A]">
                                                    {step.href ? (
                                                        <Link href={step.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                                            {step.stage}
                                                        </Link>
                                                    ) : step.stage}
                                                </span>
                                                <span className="text-[10px] text-[#1A1A1A]/40 font-mono">{step.sub}</span>
                                                {step.place && (
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#1A1A1A]/60 font-bold">{step.place}</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-[#4A4A4A] mt-0.5">{step.note}</p>
                                        </div>
                                    </div>
                                    {i < productionLine.length - 1 && (
                                        <div className="text-center text-[#FF9855] text-xl leading-none py-1">↓</div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <span className="inline-block px-6 py-3 rounded-full bg-[#FF9855] text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                ⚡ ATP
                            </span>
                        </div>
                    </div>
                </section>

                {/* ATP⇄ADP */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">使う ⇄ 作り直す のサイクル</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        ATPはエネルギーを放出すると <strong>ADP（アデノシン二リン酸）</strong> に変わります。ADPは再びミトコンドリアでエネルギーを受け取り、ATPに戻ります。
                        この「ATP ⇄ ADP」の循環が、休みなく回り続けることで、私たちは常に動けるのです。クレアチンは、この再生を筋肉や脳で素早く助ける役割を担います。
                    </p>
                </section>

                {/* 支える栄養素 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">ATP産生を支える栄養素</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        ATPを作り続けるには、これらの栄養素が欠かせません。各栄養素のページで詳しく読めます。
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

                {/* Disclaimer */}
                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは生化学の一般的な解説であり、診断・治療を目的とするものではありません。
                </p>

                {/* Back links */}
                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/tca-cycle" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        TCA回路を見る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
