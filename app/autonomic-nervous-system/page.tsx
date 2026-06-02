import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import { getGeneBySlug } from '@/lib/genes';
import JsonLd, { medicalWebPage } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '自律神経とHRV | Mitoflow40',
    description: '体を自動で調整する「自律神経」と、その状態を映す指標「HRV（心拍変動）」を、仕組み・ストレスとの関係・整える方法から解説。Apple Watchで測れるHRVの読み方も。',
    alternates: { canonical: 'https://mitoflow40.com/autonomic-nervous-system' },
    openGraph: {
        title: '自律神経とHRV | Mitoflow40',
        description: '「自律神経」と「HRV（心拍変動）」を、仕組み・ストレス・整える方法から解説。',
        url: 'https://mitoflow40.com/autonomic-nervous-system',
        type: 'article',
    },
};

// 交感 vs 副交感
const balance = [
    { title: '交感神経', en: 'SYMPATHETIC', note: '「アクセル」。活動・集中・ストレス時に優位。心拍・血圧を上げる' },
    { title: '副交感神経', en: 'PARASYMPATHETIC', note: '「ブレーキ」。休息・消化・回復時に優位。心拍を下げ、体を修復へ' },
];

// 整える方法
const habits = [
    { head: 'ゆっくりした呼吸', body: '1分6回ほどの深い呼吸は、副交感神経を直接スイッチオンする最速の方法。' },
    { head: '睡眠リズムを整える', body: '夜の回復で副交感が働く。就寝・起床時刻を一定に。' },
    { head: '朝の光と運動', body: '体内時計をリセットし、自律神経のメリハリを取り戻す。' },
    { head: 'マグネシウム', body: '神経の興奮を鎮め、リラックス側を支える。', href: '/nutrients/magnesium' },
    { head: 'デジタル・サウナ・自然', body: 'スクリーンを切る、温冷浴、自然の中で過ごすことが回復を促す。' },
];

const relNutrients = [
    { slug: 'magnesium', why: '神経の興奮を鎮め、副交感側を支える' },
    { slug: 'b6', why: 'GABA・セロトニンなど落ち着きの神経伝達物質に必要' },
    { slug: 'omega3', why: '自律神経のバランス・HRVに好影響' },
];
const relGenes = [
    { slug: 'comt', why: 'アドレナリン等の分解スピードを決め、ストレス反応に影響' },
    { slug: 'maoa', why: '神経伝達物質の分解を介して気分・覚醒に関わる' },
];

export default function AutonomicPage() {
    const nutrients = relNutrients.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);
    const genes = relGenes.map((c) => ({ ...c, g: getGeneBySlug(c.slug) })).filter((c) => c.g);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#DCE7F0' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-recovery.png" alt="" className="absolute pointer-events-none opacity-80 hidden md:block"
                style={{ top: '60px', right: '-50px', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/experience_vitality_new.png" alt="" className="absolute pointer-events-none opacity-40"
                style={{ bottom: '-60px', left: '-70px', width: '320px', transform: 'scaleX(-1)' }} />

            <JsonLd data={medicalWebPage({ name: '自律神経とHRVとは', description: '「自律神経」と「HRV（心拍変動）」を、仕組み・ストレス・整える方法から解説。', path: '/autonomic-nervous-system' })} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '自律神経とHRV' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        AUTONOMIC NERVOUS SYSTEM
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        ANS &amp; HRV
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>自律神経とHRV（心拍変動）とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        意識しなくても心臓・呼吸・消化を動かす「自律神経」。その調子は、HRVという数値で見える化できます。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">自律神経とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        自律神経は、私たちが意識しなくても、心拍・呼吸・血圧・消化・体温などを自動で調整してくれる神経です。「アクセル」の交感神経と、「ブレーキ」の副交感神経が、シーソーのようにバランスを取りながら働いています。
                        {'\n\n'}
                        現代はストレス・スマホ・睡眠不足で<strong>交感神経（アクセル）が踏みっぱなし</strong>になりがち。すると休んでも回復しきれず、眠りが浅い・常に気が張る・疲れが抜けないといった状態に陥ります。40代以降の「なんとなく不調」の背景に、この自律神経の乱れがよくあります。
                        {'\n\n'}
                        大切なのは、しっかり活動し、しっかり休む<strong>メリハリ</strong>。意識的に副交感神経（ブレーキ）を働かせる時間を作ることが、回復力とエネルギーの土台になります。
                    </p>
                </section>

                {/* 交感 vs 副交感 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">アクセルとブレーキ</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                        {balance.map((b) => (
                            <div key={b.en} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/40 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.en}</div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{b.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{b.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* HRV */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">HRV（心拍変動）で見える化する</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        HRV（Heart Rate Variability＝心拍変動）は、心拍の「ゆらぎ」の大きさを表す指標です。心臓は一定のリズムで打っているように見えて、実は一拍ごとにわずかに間隔が変化しています。
                        {'\n\n'}
                        この<strong>ゆらぎが大きいほど、副交感神経がよく働き、回復力が高い</strong>サインとされます。逆にHRVが低いときは、交感神経に偏り、ストレスや疲労がたまっている可能性があります。
                        {'\n\n'}
                        嬉しいことに、HRVは<strong>Apple Watch などのウェアラブルで手軽に測れます</strong>。毎朝の数値を眺めると、睡眠・飲酒・ストレス・運動が自律神経にどう響いたかが見えてきます。Mitoflow40では、こうした生活ログも解析に活かします。
                    </p>
                </section>

                {/* 整える */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">自律神経を整える方法</h2>
                    <div className="space-y-3 mt-5">
                        {habits.map((h, i) => (
                            <div key={h.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{i + 1}</span>
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">
                                        {h.href ? (
                                            <Link href={h.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{h.head}</Link>
                                        ) : h.head}
                                    </div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{h.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 関わる栄養素・遺伝子 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">自律神経に関わる栄養素・遺伝子</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {nutrients.map(({ slug, why, n }) => (
                            <Link key={slug} href={`/nutrients/${slug}`}
                                className="flex items-start gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: n!.color }}>{n!.name}</span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                        {genes.map(({ slug, why, g }) => (
                            <Link key={slug} href={`/genes/${slug}`}
                                className="flex items-start gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif", background: g!.color }}>{g!.symbol}</span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは一般的な解説であり、診断・治療を目的とするものではありません。HRVは健康管理の目安であり、医療機器の測定値とは異なります。
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
