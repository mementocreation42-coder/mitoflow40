import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '栄養学の歴史 ｜ カロリーからビタミン、そして細胞へ・日本の戦後食卓史 | Mitoflow40',
    description: '栄養学はまだ150年ほどの若い学問です。食を「エネルギー（カロリー）」として測り始めたアトウォーターから、ビタミンの発見（鈴木梅太郎・高木兼寛）、栄養所要量、そして分子・細胞・個別化へ——世界の流れと、GHQ・学校給食・キッチンカー・粉食奨励・日本型食生活という日本の戦後の食卓史を、事実ベースで中立にたどります。',
    alternates: { canonical: 'https://mitoflow40.com/nutrition-history' },
    openGraph: {
        title: '栄養学の歴史 | Mitoflow40',
        description: 'カロリー→ビタミン→細胞へ。そして日本の戦後、食卓が変わった物語を中立にたどる。',
        url: 'https://mitoflow40.com/nutrition-history',
        type: 'article',
    },
};

const worldEras = [
    { era: '〜19世紀', title: '経験と伝統の時代', note: '何を食べると元気になり、何で病むか——食の知恵は、経験と伝統として受け継がれた。「栄養素」という概念は、まだ存在しない。' },
    { era: '19世紀後半', title: 'エネルギーの時代', note: 'アトウォーターがカロリーを栄養に持ち込み、食べ物を「燃料」として数値化。栄養学が“測れる科学”になった、最初の章。' },
    { era: '20世紀前半', title: 'ビタミンの発見', note: '脚気や壊血病の研究から、微量栄養素が次々と発見される。「足りないと病気になる成分」という新しい視点が生まれた。' },
    { era: '20世紀後半', title: '栄養素の細分化と所要量', note: '三大栄養素のバランス、栄養所要量、食事指針。豊かさとともに、課題は「足りない」から「摂りすぎ」へと移っていく。' },
    { era: '21世紀', title: '分子・細胞・個別化', note: '分子栄養学・腸内細菌・遺伝子・時間栄養学・ミトコンドリア。「みんなの平均」から「あなたの最適」へ、そして細胞の中（ATP）へと視点が深まる。' },
];

const japanEras = [
    { year: '1945〜', head: '敗戦と食糧難', note: 'GHQ占領下、ララ物資などの食料援助が命をつないだ。「栄養失調をどう防ぐか」が最優先の時代。' },
    { year: '1947', head: '栄養士法・学校給食', note: '栄養士制度が法制化。学校給食が本格化し、アメリカの援助による小麦粉と脱脂粉乳の「パン給食」が広がっていく。' },
    { year: '1950s', head: 'キッチンカーと粉食奨励', note: '全国を回る栄養指導車（キッチンカー）が、パン・油・フライパン調理を広めた。背景には米国の余剰小麦（MSA小麦協定）があり、「米より粉食」という言説も生まれた。' },
    { year: '1950s〜', head: '「計算する栄養」の制度化', note: '栄養所要量（カロリー・栄養素の基準）と管理栄養士制度が整い、カロリー計算をベースにした栄養観が社会に根づいた。' },
    { year: '高度成長期', head: '食の欧米化', note: 'パン・肉・乳製品・油が増え、米は減っていく。体格は大きく向上した一方で、肥満や生活習慣病（当時の成人病）が増えはじめた。' },
    { year: '1980s', head: '「日本型食生活」への揺り戻し', note: 'ごはんを中心に、多様なおかずを組み合わせる「日本型食生活」が見直され、推奨されるように。行き過ぎた欧米化への調整が始まった。' },
];

export default function NutritionHistoryPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#ECE5D6' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '栄養学の歴史', description: 'カロリー→ビタミン→細胞へ。そして日本の戦後、食卓が変わった物語を中立にたどる。', path: '/nutrition-history' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '考え方と立ち位置', path: '/library' }, { name: '栄養学の歴史', path: '/nutrition-history' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '考え方と立ち位置', href: '/library' }, { name: '栄養学の歴史' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>NUTRITION HISTORY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        NUTRITION HISTORY
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>栄養学の歴史</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        栄養学は、まだ<strong>150年ほどの若い学問</strong>です。「エネルギー→ビタミン→分子・細胞」と移り変わってきた流れと、<strong>日本の戦後に食卓が大きく変わった歴史</strong>を知ると、今の健康情報に振り回されにくくなります。
                    </p>
                </header>

                {/* 世界の流れ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">世界の流れ：栄養学は、まだ若い</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">栄養学が問うてきたことは、時代とともに移ってきました。<strong>「エネルギー」→「微量栄養素」→「分子・細胞・個別化」</strong>という、大きな流れで見てみます。</p>
                    <div className="bg-white/70 rounded-2xl border border-black overflow-hidden">
                        {worldEras.map((e, i) => (
                            <div key={e.era} className={`px-5 py-4 md:px-6 md:py-5 ${i !== 0 ? 'border-t border-[#1A1A1A]/10' : ''}`}>
                                <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                                    <span className="text-xs font-bold text-white bg-[#41C9B4] rounded-full px-3 py-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{e.era}</span>
                                    <span className="font-bold text-[#1A1A1A]">{e.title}</span>
                                </div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{e.note}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/calories', label: 'カロリーの誤解' }, { href: '/molecular-nutrition', label: '分子栄養学' }, { href: '/atp', label: 'ATP' }, { href: '/chrono-nutrition', label: '時間栄養学' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* ビタミン発見と日本 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <div className="inline-block text-[10px] font-bold tracking-widest text-[#1A1A1A]/45 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>JAPAN ／ 実は世界に先んじた</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">ビタミン発見と、日本の貢献</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        微量栄養素の発見では、日本も大きな役割を果たしました。海軍軍医の<strong>高木兼寛</strong>は、ビタミンがまだ知られていない1880年代に、<strong>食事を変えることで脚気を激減</strong>させ、「病気は栄養と関係する」ことを実証しました。
                        {'\n\n'}
                        さらに1910年、<strong>鈴木梅太郎</strong>が米ぬかから抗脚気成分<strong>「オリザニン」（のちのビタミンB1）</strong>を取り出します。これは世界に先がけた発見でしたが、論文が日本語だったこともあり、翌1912年に「ビタミン（vitamine）」と名づけたフンクの名が世界に広まりました。<strong>栄養学の歴史に、日本は早くから関わっていた</strong>のです。
                    </p>
                </section>

                {/* 日本の戦後 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">日本の戦後：食卓は、こうして変わった</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">日本人の食と栄養観は、戦後の数十年で大きく塗り替えられました。善悪ではなく、ひとつの<strong>“流れ”</strong>として見てみます。</p>
                    <div className="space-y-3">
                        {japanEras.map((e) => (
                            <div key={e.year} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 md:p-5 border border-[#1A1A1A]/15">
                                <span className="flex-shrink-0 inline-flex items-center justify-center text-xs font-bold text-[#1A1A1A] bg-[#FBE9D0] border border-[#1A1A1A]/15 rounded-full px-3 py-1 min-w-[88px] text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{e.year}</span>
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{e.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{e.note}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/wheat', label: '小麦と健康' }, { href: '/rice', label: '白米・玄米の真実' }, { href: '/calories', label: 'カロリーの誤解' }, { href: '/modern-diseases', label: '現代病' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* これから */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#F3EFD6' }}>
                    <div className="inline-block text-[10px] font-bold tracking-widest text-[#1A1A1A] bg-[#FFD37A] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WHAT IT MEANS ／ 歴史から見える、これから</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">「いまの常識」も、ひとつの通過点</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        栄養学は、<strong>エネルギー（カロリー）→微量栄養素→分子・細胞・個別化</strong>と、少しずつ深まってきました。カロリー一辺倒の見方は、いわば<strong>“ひとつ前の章”</strong>。いまは細胞の中（ATP・ミトコンドリア）、腸内環境、遺伝子、食べる時間——という<strong>多層</strong>で食をとらえる時代に入っています。
                        {'\n\n'}
                        そして日本の戦後が教えてくれるのは、<strong>「その時代の最善」も、社会・政策・経済の事情で動く</strong>ということ。だから今の常識も、絶対ではなく、<strong>更新されていく前提</strong>で受け取るのが健やかです。
                    </p>
                    <div className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-white/60 mt-4">
                        <p className="text-sm text-[#1A1A1A]/85 leading-relaxed"><strong>Mitoflow40の立場：</strong>歴史を知ると、流行や“断定”に振り回されにくくなります。どの説も「その時点での最善」。常に更新される前提で、最後は自分の頭と体で確かめる——それが、長く続く学び方です。</p>
                    </div>
                </section>

                {/* あわせて読む */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/calories', label: 'カロリーの誤解' },
                            { href: '/wheat', label: '小麦と健康' },
                            { href: '/rice', label: '白米・玄米の真実' },
                            { href: '/molecular-nutrition', label: '分子栄養学' },
                            { href: '/chrono-nutrition', label: '時間栄養学' },
                            { href: '/modern-diseases', label: '現代病' },
                            { href: '/counterculture', label: 'カウンターカルチャー史' },
                            { href: '/nutrition-literacy', label: '栄養を学ぶ価値' },
                            { href: '/precision-nutrition', label: '精密栄養学とは' },
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
