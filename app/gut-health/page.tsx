import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '腸内環境とは ｜ 腸活の基本 | Mitoflow40',
    description: '腸は消化だけでなく、免疫・気分・解毒の交差点。腸内細菌叢（マイクロバイオーム）の多様性、腸が担う仕事、リーキーガット、食物繊維と発酵食品による腸活までを、精密栄養学の視点でやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/gut-health' },
    openGraph: {
        title: '腸内環境とは ｜ 腸活の基本 | Mitoflow40',
        description: '免疫・気分・解毒の交差点である腸。腸内細菌の多様性と、腸活の基本をやさしく解説。',
        url: 'https://mitoflow40.com/gut-health',
        type: 'article',
    },
};

const jobs = [
    { en: 'DIGESTION', title: '消化・吸収', note: '食べ物を最終的に分解し、栄養を体に取り込む最前線。', href: '/digestion' },
    { en: 'IMMUNITY', title: '免疫の最前線', note: '体の免疫細胞の多くが腸に集まり、外敵から体を守る。', href: '/inflammation' },
    { en: 'MOOD', title: '気分・メンタル', note: '「幸せホルモン」セロトニンの大半は腸で作られる。', href: '/gut-brain' },
    { en: 'DETOX', title: '排出・解毒', note: '便は最大の排出経路。腸が滞ると毒素が再吸収される。', href: '/detox' },
    { en: 'VITAMINS', title: 'ビタミン合成', note: '腸内細菌が、一部のビタミンB群やビタミンKを作り出す。', href: '/nutrients' },
];

export default function GutHealthPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '腸内環境とは', description: '免疫・気分・解毒の交差点である腸。腸内細菌の多様性と、腸活の基本をやさしく解説。', path: '/gut-health' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '腸内環境', path: '/gut-health' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '腸内環境' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>GUT HEALTH</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        GUT
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>腸内環境とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        腸は、ただの「消化器官」ではありません。<strong>免疫・気分・解毒</strong>までを左右する、体の<strong>司令塔のひとつ</strong>です。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">腸には、もう一つの「臓器」がいる</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        私たちの腸には、<strong>約100兆個ともいわれる腸内細菌</strong>がすみ着いています。その全体を<strong>腸内細菌叢（マイクロバイオーム）</strong>と呼び、その働きの大きさから「もう一つの臓器」とも言われます。
                        {'\n\n'}
                        腸内細菌には、体に良い働きをする「善玉菌」、増えると不調のもとになる「悪玉菌」、どちらにもなびく「日和見菌」がいます。大切なのは、特定の菌を増やすこと以上に、<strong>多様な菌がバランスよく共存していること（多様性）</strong>。畑の土と同じで、豊かで多様な腸内環境ほど、揺らぎに強くなります。
                    </p>
                </section>

                {/* 腸の仕事 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">腸が担う、5つの仕事</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">腸を整えることが、なぜ全身に効くのか。それは、腸がこれだけの役割を担っているからです。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {jobs.map((j) => (
                            <Link key={j.en} href={j.href} className="group bg-white/70 rounded-2xl p-5 border border-black hover:shadow-lg hover:-translate-y-0.5 transition-all">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-bold tracking-widest text-[#41C9B4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{j.en}</span>
                                    <span className="text-[#41C9B4] group-hover:translate-x-0.5 transition-transform" aria-hidden>→</span>
                                </div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{j.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{j.note}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* リーキーガット */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">腸は「壁」でもある</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        腸のもう一つの大事な役割が、<strong>バリア（壁）</strong>です。腸の内側は、栄養だけを通し、未消化のものや有害物質は通さない——という、繊細な関所になっています。
                        {'\n\n'}
                        この壁の機能が乱れ、すき間から不要なものが漏れ出てしまう状態は「<strong>リーキーガット（腸もれ）</strong>」と呼ばれ、慢性的な炎症や不調との関連が研究で注目されています。ただし、その全体像はまだ解明の途上で、断定はできません。確かなのは、<strong>腸の壁を支えるのも、日々の食事と生活</strong>だということです。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/inflammation', label: '炎症' }, { href: '/gut-brain', label: '腸脳相関' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 腸活 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">腸を整える「腸活」の基本</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">特別なことより、毎日の積み重ね。善玉菌に「エサ」と「仲間」を届け、邪魔を減らすのが基本です。</p>
                    <div className="space-y-3">
                        {[
                            { head: '食物繊維（菌のエサ）', body: '善玉菌のエサになり、短鎖脂肪酸という有用な物質を生む。野菜・海藻・きのこ・豆・全粒穀物から。', href: '/nutrients/fiber' },
                            { head: '発酵食品（菌そのもの）', body: '納豆・ヨーグルト・味噌・キムチなどで、善玉菌そのものを取り入れる。', href: '/foods' },
                            { head: '多様な食材を食べる', body: '同じものに偏らず、いろいろな植物性食品を食べることが、菌の多様性につながる。', href: '/foods' },
                            { head: '控えたいもの・整えたい生活', body: '超加工食品・過剰な糖やアルコールは腸内環境を乱しやすい。睡眠・ストレス・運動も腸に直結する。', href: '/caution-foods' },
                        ].map((s) => (
                            <Link key={s.head} href={s.href} className="group flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#FF9855] transition-colors">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">
                        ※ どんな菌や食品が合うかには個人差があります。お通じや体調の変化を見ながら、自分に合うものを見つけていくのが、精密栄養学的な腸活です。便の状態は、腸の調子を映す手軽なサインになります（<Link href="/detox" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">デトックス</Link>のページもどうぞ）。
                    </p>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/microbiome', label: '腸内フローラ・プレ/プロ' },
                            { href: '/gut-troubles', label: 'グルテン・SIBO等' },
                            { href: '/gut-brain', label: '腸脳相関' },
                            { href: '/digestion', label: '消化・吸収' },
                            { href: '/mood-nutrition', label: '気分と栄養' },
                            { href: '/foods', label: '食べ物' },
                            { href: '/organs/gut', label: '臓器としての腸' },
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
