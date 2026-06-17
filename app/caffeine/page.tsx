import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'カフェインとの付き合い方 ｜ 量・タイミング・代謝の個人差 | Mitoflow40',
    description: 'コーヒー・緑茶のカフェインは敵か味方か。眠気が飛ぶ仕組み（アデノシン受容体）、半減期とタイミング、代謝の個人差（CYP1A2遺伝子）、適量の目安、L-テアニンとの相性、上手な減らし方までを精密栄養学の視点でやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/caffeine' },
    openGraph: {
        title: 'カフェインとの付き合い方 | Mitoflow40',
        description: '眠気が飛ぶ仕組み・半減期・代謝の個人差から、自分に合うコーヒーの飲み方を考える。',
        url: 'https://mitoflow40.com/caffeine',
        type: 'article',
    },
};

const benefits = [
    { title: '集中力・覚醒', note: '眠気をブロックし、注意力や反応速度を一時的に高める。' },
    { title: '気分の後押し', note: 'ドーパミンの働きを後押しし、軽い高揚感ややる気につながる。' },
    { title: '運動パフォーマンス', note: '運動前のカフェインは持久力や出力を高めることが知られる。' },
    { title: '抗酸化成分', note: 'コーヒー・緑茶にはポリフェノールなど抗酸化成分も含まれる。' },
];

const cautions = [
    { title: '不安・動悸', note: '過剰だと交感神経が高ぶり、不安・そわそわ・動悸を招く。' },
    { title: '睡眠の質の低下', note: '半減期が長く、午後遅くの摂取は自覚なく夜の眠りを浅くする。' },
    { title: '依存と離脱', note: '毎日とると耐性ができ、切らすと頭痛・だるさ・集中低下が出る。' },
    { title: '胃・逆流の刺激', note: '空腹時は胃を刺激し、胃もたれや逆流の引き金になることも。' },
];

const amounts = [
    { item: 'ドリップコーヒー（1杯/150ml）', mg: '約80〜100mg' },
    { item: 'エスプレッソ（1ショット）', mg: '約60〜80mg' },
    { item: '緑茶・紅茶（1杯/150ml）', mg: '約20〜30mg' },
    { item: 'エナジードリンク（1本）', mg: '約80〜150mg' },
];

export default function CaffeinePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#EFE7D6' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'カフェインとの付き合い方', description: '眠気が飛ぶ仕組み・半減期・代謝の個人差から、自分に合うコーヒーの飲み方を考える。', path: '/caffeine' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '生活習慣', path: '/library#lifestyle' }, { name: 'カフェイン', path: '/caffeine' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '生活習慣', href: '/library#lifestyle' }, { name: 'カフェイン' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>CAFFEINE</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        CAFFEINE
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>カフェインとの付き合い方</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        コーヒーは敵でも万能薬でもありません。鍵は<strong>量・タイミング・自分の代謝</strong>。仕組みを知れば、自分に合う飲み方が見えてきます。
                    </p>
                </header>

                {/* 仕組み */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">なぜ眠気が飛ぶのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        起きている間、脳には<strong>アデノシン</strong>という「眠気の物質」が少しずつ溜まっていきます。これが受容体にくっつくと、私たちは眠気を感じます。
                        {'\n\n'}
                        カフェインは、このアデノシンに形がよく似ていて、<strong>受容体に先回りしてフタをする</strong>ことで眠気をブロックします。つまりカフェインは眠気を消しているのではなく、<strong>「眠気のサインを一時的に隠している」だけ</strong>。隠れていた眠気は、効果が切れたときにまとめて戻ってきます。これが「カフェインが切れたあとのどっと来る疲れ」の正体です。
                    </p>
                </section>

                {/* メリット・注意 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">いい面と、気をつけたい面</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">カフェインは「悪者」ではなく、量とタイミング次第で表情が変わる物質です。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-white/70 rounded-2xl p-5 border border-black">
                            <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>GOOD ／ いい面</div>
                            <div className="space-y-3">
                                {benefits.map((b) => (
                                    <div key={b.title}>
                                        <div className="font-bold text-[#1A1A1A] text-sm mb-0.5">{b.title}</div>
                                        <p className="text-xs text-[#4A4A4A] leading-relaxed">{b.note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/70 rounded-2xl p-5 border border-black">
                            <div className="text-[10px] font-bold tracking-widest text-[#E8896B] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CARE ／ 気をつけたい面</div>
                            <div className="space-y-3">
                                {cautions.map((b) => (
                                    <div key={b.title}>
                                        <div className="font-bold text-[#1A1A1A] text-sm mb-0.5">{b.title}</div>
                                        <p className="text-xs text-[#4A4A4A] leading-relaxed">{b.note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 半減期・タイミング */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">半減期は約5時間。だから午後が分かれ目</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        カフェインの<strong>半減期（体内で量が半分になるまでの時間）は、おおよそ5時間前後</strong>とされます。たとえば15時に飲んだコーヒーは、20時になってもまだ半分が体に残っている計算です。
                        {'\n\n'}
                        「夜は普通に眠れている」と感じていても、深い睡眠が削られていることは少なくありません。<strong>就寝の6〜8時間前まで</strong>に切り上げるのが、睡眠の質を守る目安です。「夕方のコーヒー」が、翌朝のだるさをつくっていることもあります。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/sleep', label: '睡眠' }, { href: '/circadian-rhythm', label: '体内時計' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 代謝の個人差 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">「合う・合わない」は遺伝子の話でもある</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        同じ一杯でも、平気な人とドキドキして眠れなくなる人がいます。その差の一因が、カフェインを肝臓で分解する酵素の<strong>遺伝子（CYP1A2）の個人差</strong>です。
                        {'\n\n'}
                        分解が速いタイプは比較的カフェインに強く、遅いタイプは少量でも影響が長引きます。これは「気合い」ではなく体質の問題。<strong>自分は遅いタイプかも</strong>と思ったら、量を控えめにしたり、午後は避けたりするのが理にかなった選択です。まさに「みんなの平均より、あなたの最適」を探す精密栄養学の考え方そのものです。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/genes', label: '遺伝子' }, { href: '/precision-nutrition', label: '精密栄養学とは' }, { href: '/detox', label: '肝臓の解毒' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 量の目安 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">どのくらいが「適量」？</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">健康な成人で、目安は<strong>1日およそ400mgまで</strong>（コーヒー約3〜4杯）。妊娠中・授乳中の方や、不安・不眠が気になる方は、より控えめが安心です。</p>
                    <div className="bg-white/70 rounded-2xl border border-black overflow-hidden">
                        {amounts.map((a, i) => (
                            <div key={a.item} className={`flex items-center justify-between px-5 py-3 ${i !== 0 ? 'border-t border-[#1A1A1A]/10' : ''}`}>
                                <span className="text-sm text-[#1A1A1A]">{a.item}</span>
                                <span className="text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{a.mg}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-3 leading-relaxed">※ 量は淹れ方・豆・製品で大きく変わる、あくまで目安です。</p>
                </section>

                {/* 上手な付き合い方 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">上手な付き合い方</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">やめる必要はありません。少しの工夫で、いい面を活かしながら負担を減らせます。</p>
                    <div className="space-y-3">
                        {[
                            { head: '午後（おおむね14時以降）は控えめに', body: '半減期を考えると、午後遅くの一杯が夜の睡眠に響く。眠りが浅い人はまずここから。' },
                            { head: '朝イチより、起きて少し経ってから', body: '起床直後はコルチゾールで自然に覚醒している時間。少しずらすと効きが活きやすい。' },
                            { head: 'L-テアニンと組み合わせる', body: '緑茶に含まれるL-テアニンは、カフェインの覚醒は活かしつつ、そわそわ感をやわらげるとされる。' },
                            { head: '空腹時を避け、水も一緒に', body: '空腹のコーヒーは胃を刺激しやすい。利尿作用があるので水分も忘れずに。' },
                            { head: 'エナジードリンクの常用を避ける', body: '糖分も多く、量も読みにくい。常用は避け、必要なときだけに。' },
                            { head: '不安・不眠が気になるなら、まず見直す', body: '原因がカフェインのことは多い。数日減らして、体の変化を観察してみる。' },
                        ].map((s) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/stimulants', label: '嗜好品と体（お酒・タバコ）' },
                            { href: '/sleep', label: '睡眠' },
                            { href: '/anxiety', label: '不安と体' },
                            { href: '/circadian-rhythm', label: '体内時計' },
                            { href: '/genes', label: '遺伝子' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">{l.label} →</Link>
                        ))}
                    </div>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
