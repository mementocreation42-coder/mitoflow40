import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '心の現代病とは｜うつ・不安・燃え尽きを「体から」とらえる | Mitoflow40',
    description: 'うつ・不安・燃え尽きといった「心の現代病」は、気合いや性格の問題ではありません。慢性ストレス・睡眠不足・腸内環境・栄養・炎症など、心は「体から」も大きく影響を受けています。その仕組みを生化学ベースで整理し、医療や専門家につなぐための視点を、出典つきにやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/mental-health' },
    openGraph: {
        title: '心の現代病とは｜うつ・不安・燃え尽きを「体から」とらえる | Mitoflow40',
        description: '心の不調は気合いの問題ではない。ストレス・睡眠・腸・栄養・炎症から心をとらえ、医療につなぐ視点を解説。',
        url: 'https://mitoflow40.com/mental-health',
        type: 'article',
    },
};

const bodyFactors = [
    { head: '慢性ストレス', body: '長く続く緊張は、コルチゾールなどのストレス反応を乱し、気分・睡眠・意欲に影響する。', href: '/stress', label: 'ストレス' },
    { head: '睡眠の乱れ', body: '睡眠不足は感情の調整力を下げ、不安や落ち込みを強める。心の不調と睡眠は双方向に悪化し合う。', href: '/sleep', label: '睡眠' },
    { head: '腸内環境（脳腸相関）', body: '腸と脳は神経・物質で会話している。腸内環境の乱れが気分やストレス耐性に関わると研究されている。', href: '/gut-brain', label: '脳腸相関' },
    { head: '栄養の偏り', body: '鉄・ビタミンB群・オメガ3・たんぱく質などの不足は、気分や集中に関わる。血糖の乱高下も感情を揺らす。', href: '/mood-nutrition', label: '気分と栄養' },
    { head: 'くすぶる炎症', body: '慢性的な炎症が、うつ症状と関連するという研究が増えている。体の炎症と心は無関係ではない。', href: '/inflammation', label: '慢性炎症' },
    { head: '自律神経の乱れ', body: 'アクセル（交感）とブレーキ（副交感）のバランスの崩れは、不安・動悸・不眠としてあらわれる。', href: '/autonomic-nervous-system', label: '自律神経' },
];

export default function MentalHealthPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E6E0F2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '心の現代病とは｜うつ・不安・燃え尽きを「体から」とらえる', description: '心の不調は気合いの問題ではない。ストレス・睡眠・腸・栄養・炎症から心をとらえ、医療につなぐ視点を解説。', path: '/mental-health' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '老化と不調の土台', path: '/library#aging' }, { name: '心の現代病', path: '/mental-health' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '老化と不調の土台', href: '/library#aging' }, { name: '心の現代病' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MENTAL HEALTH</p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        心の現代病
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[640px] mx-auto text-left">
                        うつ・不安・燃え尽き——「心の不調」は、<strong>気合いや性格の問題ではありません</strong>。心は、慢性ストレス・睡眠・腸・栄養・炎症といった<strong>「体」からも大きく影響を受けています</strong>。仕組みを知ることは、自分や大切な人を責めずに、適切な助けにつなぐための第一歩です。
                    </p>
                </header>

                {/* いちばん大事な前提 */}
                <div className="mb-10 rounded-2xl p-6 md:p-7 border-2 border-[#FF9855] bg-white/80">
                    <p className="text-sm md:text-base text-[#1A1A1A] leading-loose">
                        <strong>はじめに、いちばん大切なこと。</strong>つらい気持ちが2週間以上続く、眠れない・食べられない、何も楽しめない、消えてしまいたいと感じる——こうしたときは、<strong>がんばって乗り越えるものではなく、専門家に相談すべきサイン</strong>です。心療内科・精神科・かかりつけ医、各自治体の相談窓口などへ、早めにつながってください。この記事は、その理解を助けるための一般情報です。
                    </p>
                </div>

                {/* 体から */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">心は「脳だけ」の問題ではない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        かつて心の不調は「気持ちの持ちよう」とされがちでした。けれど今は、<strong>気分や意欲は、脳内の物質・ホルモン・神経・そして体じゅうの状態によって支えられている</strong>ことがわかっています。だから、心の調子は<strong>体の状態と切り離せません</strong>。
                        {'\n\n'}
                        これは「心の病は栄養や生活で治せる」という意味ではありません。そうではなく、<strong>体を整えることが、回復や予防の"土台"を支える</strong>ということ。治療や専門家のサポートと、生活の土台づくりは、対立せず両輪で働きます。
                    </p>
                </section>

                {/* 体からの6要因 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">心に影響する、体からの要因</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">どれか一つが原因というより、これらが重なって心の調子を左右します。整えられる土台でもあります。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {bodyFactors.map((f) => (
                            <div key={f.head} className="bg-white/70 rounded-2xl p-5 border border-black flex flex-col">
                                <h3 className="text-base font-bold text-[#1A1A1A] mb-1">{f.head}</h3>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed flex-1">{f.body}</p>
                                <Link href={f.href} className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors self-start">
                                    {f.label} →
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 燃え尽き */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「燃え尽き（バーンアウト）」という現代の形</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        働きすぎ・常時オンライン・休めない——現代特有の心の消耗が<strong>燃え尽き（バーンアウト）</strong>です。やる気の枯れ、心の距離を置きたくなる感覚、達成感の低下が特徴とされます。怠けではなく、<strong>回復が追いつかないほど消耗した状態</strong>です。
                        {'\n\n'}
                        40代は、仕事の責任・家庭・親の介護などが重なりやすい時期。<strong>意識的に休む時間と、人とのつながり</strong>を確保することが、心の現代病の有効な予防になります。
                    </p>
                </section>

                {/* 土台を整える */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">土台を整える、小さな習慣</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">治療の代わりではなく、回復と予防を支える土台として。無理のない範囲で。</p>
                    <div className="space-y-3">
                        {[
                            { head: '睡眠を最優先に', body: '眠りは感情の整理と回復の時間。寝る時間を守り、夜の光・カフェイン・アルコールを見直す。' },
                            { head: '朝の光と、軽い運動', body: '朝に光を浴び、少し歩く。体内時計と気分の安定につながり、運動は抗うつ的に働くと報告されている。' },
                            { head: '血糖と栄養を整える', body: '血糖の乱高下は気分を揺らす。たんぱく質・鉄・オメガ3を意識し、超加工食品に偏らない。' },
                            { head: '一人で抱えない', body: '人に話す・つながることは、それ自体が回復の力。早めに専門家や相談窓口を頼ることをためらわない。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は一般的な健康情報であり、診断・治療やカウンセリングの代わりではありません。心の不調は適切な治療で回復が期待できます。つらい状態が続く・悪化する場合や、自分や誰かの安全が心配なときは、ためらわず医療機関や公的な相談窓口（いのちの電話・こころの健康相談統一ダイヤル等）にご連絡ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">このページの参照</h2>
                    <ul className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-3 text-sm">
                        <li>
                            <a href="https://www.who.int/news-room/fact-sheets/detail/depression" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Depressive disorder (depression)（うつ病の基礎と対応）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — WHO（世界保健機関）</span>
                        </li>
                        <li>
                            <a href="https://www.nimh.nih.gov/health/topics/depression" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Depression（症状・治療・受診の目安）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — NIMH（米国国立精神衛生研究所）</span>
                        </li>
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/70 mt-2">
                        全テーマの出典は{' '}
                        <Link href="/references" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">参照文献・出典ページ</Link>
                        {' '}にまとめています。
                    </p>
                </section>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/anxiety" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">不安と栄養へ</Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
