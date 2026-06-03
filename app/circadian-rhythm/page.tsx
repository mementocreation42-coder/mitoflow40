import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'サーカディアンリズム（体内時計） | Mitoflow40',
    description: '約24時間で全身を調整する「体内時計（サーカディアンリズム）」を、仕組み・乱れの影響・ホルモンや血糖との関係・整える1日の過ごし方からわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/circadian-rhythm' },
    openGraph: {
        title: 'サーカディアンリズム（体内時計） | Mitoflow40',
        description: '体内時計を、仕組み・乱れの影響・ホルモンや血糖との関係・整える1日の過ごし方から解説。',
        url: 'https://mitoflow40.com/circadian-rhythm',
        type: 'article',
    },
};

// 1日のリズム
const timeline = [
    { time: '朝', title: '光を浴びて時計をリセット', note: 'コルチゾールが上がり覚醒。メラトニンが止まり、1日が始まる', href: '/hormones' },
    { time: '日中', title: '活動・集中・代謝のピーク', note: '体温・パフォーマンスが高まる。血糖を使いやすい時間帯', href: '/blood-sugar' },
    { time: '夕方', title: 'クールダウンへ移行', note: '体温がゆるやかに下がり始め、回復モードの準備に入る' },
    { time: '夜', title: 'メラトニンが出て眠りへ', note: '暗さでメラトニンが分泌。睡眠中に修復とオートファジーが進む', href: '/autophagy' },
];

// 乱れの影響
const disruptions = [
    '寝つきが悪い・眠りが浅い・朝だるい',
    '日中の眠気・集中力の低下',
    '食欲の乱れ・夜の食べすぎ・血糖の乱れ',
    '気分の落ち込み・ストレス耐性の低下',
    '長期的には代謝・免疫・老化への影響',
];

// 整える
const habits = [
    { head: '朝、太陽光を浴びる', body: '起床後すぐの光が体内時計を強力にリセット。15分ほど屋外で。' },
    { head: '夜は強い光を避ける', body: 'スマホ・強い照明のブルーライトはメラトニンを抑え、時計を後ろへずらす。' },
    { head: '食事の時間を一定に', body: '内臓にも時計がある。毎日ほぼ同じ時間に食べ、夜遅い食事を避ける。' },
    { head: '就寝・起床を一定に', body: '休日もずらしすぎない。リズムの安定が眠りの質を上げる。' },
    { head: 'カフェインは午後早めまで', body: '夕方以降のカフェインは寝つきと深い睡眠を妨げる。' },
];

const relNutrients = [
    { slug: 'magnesium', why: '神経の鎮静と睡眠の質を支える' },
    { slug: 'tryptophan', why: 'セロトニン→メラトニンの材料' },
    { slug: 'vitamin-d', why: '日光と連動し、リズムや気分に関わる' },
];

export default function CircadianPage() {
    const nutrients = relNutrients.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E2E0F0' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'サーカディアンリズム（体内時計）とは', description: '体内時計を、仕組み・乱れの影響・ホルモンや血糖との関係・整える1日の過ごし方から解説。', path: '/circadian-rhythm' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: 'サーカディアンリズム', path: '/circadian-rhythm' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: 'サーカディアンリズム' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        CIRCADIAN RHYTHM
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        CIRCADIAN
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>サーカディアンリズム（体内時計）とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        約24時間で全身を調整する「体内時計」。睡眠・ホルモン・代謝のすべてが、このリズムに乗って動いています。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">体内時計とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        サーカディアンリズムとは、体に備わった約24時間周期の「体内時計」のことです。脳の奥にある中枢時計（視交叉上核）が司令塔となり、ホルモン分泌・体温・血圧・睡眠・消化・代謝までを、時間帯に合わせて自動で切り替えています。朝に向けてコルチゾールを上げて体を起こし、夜にメラトニンを出して眠りへ導く——この一日の波そのものが体内時計の働きです。
                        {'\n\n'}
                        重要なのは、この時計が脳だけでなく全身の細胞にも存在することです。肝臓・腸・筋肉、さらには<Link href="/mitochondria" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">ミトコンドリア</Link>までが、それぞれ独自の時計を持っています。脳の中枢時計と全身の末梢時計が揃って同じテンポを刻むとき、消化・代謝・修復は最も効率よく進み、体は本来のパフォーマンスを発揮できます。逆に時計どうしがバラバラにずれると、エネルギーがうまく回らなくなります。
                        {'\n\n'}
                        時計を合わせる最大の「合図」が<strong>朝の光</strong>です。網膜が朝日を受け取ると中枢時計がリセットされ、一日のリズムが始まります。一方で、夜の強い光（スマホ・照明）、不規則な食事、夜更かしや時差は時計を後ろへずらし、リズムを乱します。便利で24時間動く現代社会は体内時計が狂いやすく、その乱れが睡眠の質の低下・日中の眠気・気分の波・血糖や代謝の不調として表面化します。だからこそ、光と食事と睡眠の「タイミング」を整えることが、健康の土台になるのです。
                    </p>
                </section>

                {/* 1日のリズム */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">1日のリズム</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        体内時計に沿って、ホルモンや代謝が時間帯ごとに切り替わります。
                    </p>
                    <div className="space-y-3">
                        {timeline.map((t) => (
                            <div key={t.time} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-black">
                                <span className="flex-shrink-0 w-14 text-center px-2 py-1 rounded-lg bg-[#9B7FD4] text-white text-sm font-bold" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{t.time}</span>
                                <div className="flex-1">
                                    <div className="font-bold text-[#1A1A1A]">
                                        {t.href ? (
                                            <Link href={t.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{t.title}</Link>
                                        ) : t.title}
                                    </div>
                                    <p className="text-xs text-[#4A4A4A] mt-0.5">{t.note}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 乱れの影響 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">リズムが乱れると</h2>
                    <div className="bg-white/70 rounded-2xl p-6 border border-black mt-5">
                        <ul className="space-y-2">
                            {disruptions.map((d, i) => (
                                <li key={i} className="flex gap-3 text-[#4A4A4A]">
                                    <span className="text-[#FF9855] flex-shrink-0">●</span>
                                    <span>{d}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 整える */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">体内時計を整える1日</h2>
                    <div className="space-y-3 mt-5">
                        {habits.map((h, i) => (
                            <div key={h.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{i + 1}</span>
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{h.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{h.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 栄養素 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">睡眠・リズムを支える栄養素</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {nutrients.map(({ slug, why, n }) => (
                            <Link key={slug} href={`/nutrients/${slug}`}
                                className="flex items-start gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: n!.color }}>{n!.name}</span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは一般的な解説であり、診断・治療を目的とするものではありません。
                </p>

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
