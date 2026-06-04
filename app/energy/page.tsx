import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'エネルギーとは ｜ 疲れにくさの正体 | Mitoflow40',
    description: '疲れにくさの正体は「エネルギー（ATP）を作り続けられること」。エネルギーを作るしくみと、その材料になる栄養（ビタミンB群・鉄・マグネシウム・CoQ10など）、作る力が落ちる原因を、精密栄養学の視点でやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/energy' },
    openGraph: {
        title: 'エネルギーとは ｜ 疲れにくさの正体 | Mitoflow40',
        description: '疲れにくさ＝エネルギーを作り続けられること。作るしくみと材料になる栄養、作る力が落ちる原因をやさしく解説。',
        url: 'https://mitoflow40.com/energy',
        type: 'article',
    },
};

// エネルギーをつくる「材料・補酵素」
const cofactors = [
    { name: 'ビタミンB群', href: '/nutrients/thiamine', role: '糖や脂質をエネルギーに変える反応の補酵素。不足すると“燃やせない”。' },
    { name: '鉄', href: '/nutrients/iron', role: '酸素を運び、電子伝達系で働く。不足するとエネルギー産生が滞る。' },
    { name: 'マグネシウム', href: '/nutrients/magnesium', role: 'ATPはマグネシウムと結びついて初めて使える。300超の酵素も支える。' },
    { name: 'コエンザイムQ10', href: '/nutrients/coq10', role: '電子伝達系のリレー役。加齢で減りやすい。' },
    { name: 'αリポ酸', href: '/nutrients/alpha-lipoic-acid', role: '糖を本格発電へ橋渡しする反応を助ける補酵素。' },
];

// 作る力が落ちる原因
const drains = [
    { head: '材料（栄養）が足りない', body: '糖や脂質はあっても、それを燃やす補酵素（ビタミンB群・鉄・マグネシウムなど）が不足すると、エネルギーを作りきれない。', href: '/nutrients', label: '栄養素' },
    { head: 'ミトコンドリアの質が落ちる', body: '工場そのものが傷むと発電効率が下がり、活性酸素の漏れも増える。質を保つことが鍵。', href: '/oxidative-stress', label: '酸化ストレス' },
    { head: '血糖の乱高下', body: '急上昇・急降下を繰り返すと、エネルギーが安定供給されず、強い眠気やだるさを招く。', href: '/blood-sugar', label: '血糖' },
    { head: '睡眠・運動の不足', body: '睡眠は修復の時間、運動はミトコンドリアを増やす刺激。どちらも“作る力”の土台。', href: '/sleep', label: '睡眠' },
];

export default function EnergyPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'エネルギーとは', description: '疲れにくさ＝エネルギーを作り続けられること。作るしくみと材料になる栄養、作る力が落ちる原因をやさしく解説。', path: '/energy' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: 'エネルギー', path: '/energy' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: 'エネルギー' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        ENERGY &amp; METABOLISM
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        ENERGY
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>エネルギーとは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        「疲れにくさ」の正体は、エネルギーを<strong>作り続けられること</strong>。その作り方と材料を知ると、不調の見え方が変わります。
                    </p>
                </header>

                {/* 疲れ＝エネルギー不足 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">疲れの正体は「エネルギー不足」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        私たちが「動く」「考える」「回復する」——そのすべてに、エネルギーが使われています。体のエネルギーの通貨が<strong>ATP</strong>。心臓を動かすのも、頭を働かせるのも、傷ついた細胞を直すのも、ATPを使って行われています。
                        {'\n\n'}
                        だから「疲れやすい」「だるい」「頭が回らない」という状態は、多くの場合、<strong>必要な量のエネルギー（ATP）を作りきれていない</strong>サインです。気合いや根性の問題ではなく、<strong>体の発電が追いついていない</strong>——そう捉え直すと、打ち手が見えてきます。
                    </p>
                </section>

                {/* どこで作る */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">エネルギーは、どこで作られる？</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        エネルギー（ATP）を作る発電所が、細胞の中にある<strong>ミトコンドリア</strong>です。食べた糖や脂質を、酸素を使って燃やし、ATPを取り出します。この発電所がたくさんあって元気なほど、疲れにくく、活力のある体になります。
                        {'\n\n'}
                        その発電は、「解糖系 → TCA回路 → 電子伝達系」という工程を経て進みます。ここでは詳しく踏み込みませんが、興味があれば、各しくみのページで“工場見学”ができます。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[
                            { href: '/mitochondria', label: 'ミトコンドリア' },
                            { href: '/atp', label: 'ATP' },
                            { href: '/glycolysis', label: '解糖系' },
                            { href: '/tca-cycle', label: 'TCA回路' },
                            { href: '/electron-transport-chain', label: '電子伝達系' },
                            { href: '/ketones', label: 'ケトン体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 材料＝栄養 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">エネルギーの「材料」は、栄養</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        ここが精密栄養学のいちばん大事なところ。エネルギーを作るには、燃料（糖・脂質）だけでなく、<strong>燃やすための補酵素</strong>が必要です。これらが足りないと、食べていても“燃やせず”、エネルギーが作れません。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {cofactors.map((c) => (
                            <Link key={c.href} href={c.href}
                                className="group bg-white/70 rounded-2xl p-5 border border-black hover:shadow-lg hover:-translate-y-0.5 transition-all">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-[#1A1A1A]">{c.name}</span>
                                    <span className="text-[#41C9B4] group-hover:translate-x-0.5 transition-transform" aria-hidden>→</span>
                                </div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{c.role}</p>
                            </Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/70 mt-3 leading-relaxed">
                        ※ 「よく寝て、食べているのに疲れる」の裏に、こうした材料の不足が隠れていることがあります。必要な量は人それぞれ——だから“自分の最適”を探します。
                    </p>
                </section>

                {/* 作る力が落ちる原因 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">「作る力」が落ちる4つの原因</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        エネルギー不足は、いくつかの要因が重なって起こります。自分はどれに当てはまるかを考える入口に。
                    </p>
                    <div className="space-y-3">
                        {drains.map((d) => (
                            <div key={d.head} className="bg-white/70 rounded-xl p-5 border border-[#1A1A1A]/15">
                                <div className="flex items-center justify-between gap-3 mb-1">
                                    <span className="font-bold text-[#1A1A1A]">{d.head}</span>
                                    <Link href={d.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors whitespace-nowrap">{d.label} →</Link>
                                </div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{d.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 精密栄養学の視点 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">エネルギーを、自分の手に取り戻す</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        エネルギーを作る力は、生まれつきで固定されたものではありません。<strong>材料（栄養）を満たし、発電所（ミトコンドリア）を整え、燃料（血糖）を安定させ、休息と運動でメンテナンスする</strong>——この積み重ねで、作る力は底上げできます。
                        {'\n\n'}
                        どこがボトルネックかは、人によって違います。だからこそ、自分の体を読み解き、足りない材料を見つける「精密栄養学」の視点が効いてきます。疲れにくい体は、気合いではなく、<strong>設計と材料</strong>でつくれます。
                    </p>
                    <div className="mt-5">
                        <Link href="/precision-nutrition"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                            style={{ background: '#FF9855', color: '#1A1A1A' }}>
                            精密栄養学とは を読む
                            <span>→</span>
                        </Link>
                    </div>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">もっと深く知る</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/mitochondria', label: 'ミトコンドリア' },
                            { href: '/nutrients', label: '栄養素' },
                            { href: '/foods', label: '食べ物' },
                            { href: '/blood-sugar', label: '血糖' },
                            { href: '/exercise', label: '運動' },
                            { href: '/sleep', label: '睡眠' },
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
