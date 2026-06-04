import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '消化・吸収とは ｜ 食べた栄養を活かすしくみ | Mitoflow40',
    description: '「食べた＝吸収された」ではありません。口・胃・小腸の消化のリレーと消化酵素（アミラーゼ・プロテアーゼ・リパーゼ）、40代で落ちる消化力と吸収を高める習慣を、精密栄養学の視点でやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/digestion' },
    openGraph: {
        title: '消化・吸収とは ｜ 食べた栄養を活かすしくみ | Mitoflow40',
        description: '「食べた＝吸収された」ではない。消化のリレーと消化酵素、40代で落ちる消化力と吸収を高める習慣を解説。',
        url: 'https://mitoflow40.com/digestion',
        type: 'article',
    },
};

// 消化のリレー
const relay = [
    { stage: '① 口', en: 'MOUTH', note: 'よく噛むことで食べ物を砕き、唾液のアミラーゼがデンプンの分解を始める。消化の第一歩であり、ここを飛ばすと後工程の負担が増す。' },
    { stage: '② 胃', en: 'STOMACH', note: '胃酸とペプシンがタンパク質をほどき、殺菌も担う。胃酸はミネラルやビタミンB12の吸収にも不可欠。' },
    { stage: '③ 小腸', en: 'SMALL INTESTINE', note: '膵臓の消化酵素と胆汁が、糖・タンパク質・脂質を吸収できる最小単位まで分解。栄養の大半はここで吸収される。' },
    { stage: '④ 大腸', en: 'LARGE INTESTINE', note: '残りの水分と、腸内細菌が食物繊維を発酵して作る成分を吸収。腸内環境がここで効いてくる。' },
];

// 3つの消化酵素
const enzymes = [
    { name: 'アミラーゼ', target: '糖質（デンプン）', note: '唾液・膵液に含まれ、デンプンを糖へ分解する。' },
    { name: 'プロテアーゼ', target: 'タンパク質', note: '胃のペプシンや膵液の酵素が、タンパク質をアミノ酸へ分解する。' },
    { name: 'リパーゼ', target: '脂質', note: '胆汁で乳化された脂を、膵リパーゼが吸収できる形へ分解する。' },
];

export default function DigestionPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '消化・吸収とは', description: '「食べた＝吸収された」ではない。消化のリレーと消化酵素、40代で落ちる消化力と吸収を高める習慣を解説。', path: '/digestion' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '消化・吸収', path: '/digestion' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '消化・吸収' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        DIGESTION &amp; ABSORPTION
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        DIGESTION
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>消化・吸収とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        どんなに良い食材も、消化・吸収されてはじめて「自分の体」になります。「食べた」と「吸収できた」は、別の話です。
                    </p>
                </header>

                {/* 食べた＝吸収ではない */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「食べた」＝「吸収できた」ではない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        栄養の話は、つい「何を食べるか」に集中しがちです。けれど本当に大切なのは、食べたものが<strong>分解され、吸収され、体の中で使われるところまで届くか</strong>。どんなに栄養価の高い食材も、消化・吸収の段階でつまずけば、その力は十分に発揮されません。
                        {'\n\n'}
                        「ちゃんと食べているのに調子が出ない」——その背景に、消化・吸収の問題が隠れていることは少なくありません。精密栄養学では、「<strong>入れる</strong>」だけでなく「<strong>消化して取り込む</strong>」までを一続きで考えます。
                    </p>
                </section>

                {/* 消化のリレー */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">消化は「リレー」で進む</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        消化は、口から大腸まで、それぞれの臓器が役割を引き継ぐバトンリレーです。どこか一区間が滞ると、全体に響きます。
                    </p>
                    <div className="space-y-3">
                        {relay.map((r) => (
                            <div key={r.en} className="bg-white/70 rounded-2xl p-5 border border-black">
                                <div className="flex items-baseline gap-3 mb-1">
                                    <span className="text-lg font-bold text-[#1A1A1A]">{r.stage}</span>
                                    <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{r.en}</span>
                                </div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{r.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 消化酵素 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">分解の主役「消化酵素」</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-5">
                        食べ物を「吸収できる小さな単位」まで切り分けるのが、消化酵素です。栄養素の種類ごとに、担当する酵素が決まっています。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {enzymes.map((e) => (
                            <div key={e.name} className="rounded-xl p-5 border border-[#1A1A1A]/15 bg-[#E3F2EE]">
                                <div className="font-bold text-[#1A1A1A] mb-1">{e.name}</div>
                                <div className="text-[11px] font-bold text-[#41C9B4] mb-2">{e.target}</div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{e.note}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/70 mt-4 leading-relaxed">
                        ※ 消化酵素は体内で作られますが、その材料となるのもタンパク質やビタミン・ミネラル。栄養が足りないと、消化する力そのものが弱くなる——という循環があります。
                    </p>
                </section>

                {/* 40代で落ちる消化力 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">40代で落ちやすい「消化力」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        消化・吸収の力は、年齢とともに少しずつ変化します。加齢で<strong>胃酸や消化酵素の分泌が減る</strong>と、タンパク質やミネラル、ビタミンB12などが取り込みにくくなります。「若い頃と同じ量の肉が重く感じる」「胃もたれしやすくなった」と感じるのは、その表れのひとつです。
                        {'\n\n'}
                        さらに、早食い・ストレス・睡眠不足も消化力を下げます。緊張状態（交感神経が優位）では消化は後回しにされ、胃腸の働きが鈍るからです。「食べているのに栄養が足りない」状態は、こうして生まれます。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/autonomic-nervous-system"
                            className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">自律神経</Link>
                        <Link href="/biomarkers"
                            className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">血液検査</Link>
                    </div>
                </section>

                {/* 吸収を高める習慣 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">吸収を高める、毎日の工夫</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        「何を食べるか」と同じくらい、「どう食べるか」が効いてきます。
                    </p>
                    <div className="space-y-3">
                        {[
                            { head: 'よく噛む', body: '噛むこと自体が消化の第一歩。唾液が出て、胃腸の負担が減り、満腹感も得やすくなる。ひと口30回が目安。' },
                            { head: 'リラックスして食べる', body: '「休息モード（副交感神経）」で胃腸はよく働く。ながら食い・早食いを避け、ひと息ついてから食べ始める。' },
                            { head: '食べ合わせを意識する', body: 'ビタミンCで鉄の吸収を高める、脂質と一緒に脂溶性ビタミンを摂るなど、組み合わせで吸収率は変わる。' },
                            { head: '腸内環境を整える', body: '発酵食品や食物繊維で腸内細菌を育てると、吸収と代謝の土台が整う。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">もっと学ぶ</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                        「消化・吸収」は、腸内環境や栄養素、食べ物の話と地続きです。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/gut-brain', label: '腸脳相関' },
                            { href: '/nutrients', label: '栄養素' },
                            { href: '/foods', label: '食べ物' },
                            { href: '/organs', label: '内臓・臓器' },
                            { href: '/blood-sugar', label: '血糖' },
                            { href: '/precision-nutrition', label: '精密栄養学とは' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
