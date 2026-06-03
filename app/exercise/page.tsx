import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '運動 | Mitoflow40',
    description: 'ミトコンドリアを増やす唯一の確実な方法「運動」を、有酸素・HIIT・筋トレの役割と、40代からの組み立て方からわかりやすく解説。血糖・自律神経・サルコペニアとの関係も。',
    alternates: { canonical: 'https://mitoflow40.com/exercise' },
    openGraph: {
        title: '運動 | Mitoflow40',
        description: 'ミトコンドリアを増やす「運動」を、有酸素・HIIT・筋トレの役割と40代の組み立て方から解説。',
        url: 'https://mitoflow40.com/exercise',
        type: 'article',
    },
};

const types = [
    { name: '有酸素運動', en: 'AEROBIC', note: 'ウォーキング・ジョグ・自転車など。ミトコンドリアを増やす「新生」を促す王道', color: '#DCF1EA' },
    { name: 'HIIT（高強度インターバル）', en: 'HIIT', note: '短時間で心肺とミトコンドリアに強い刺激。新生を効率よく促す', color: '#FBE2E2' },
    { name: '筋トレ', en: 'STRENGTH', note: '筋肉量を維持・増加。40代以降のサルコペニア対策と代謝の土台', color: '#FBF0CE' },
];

const benefits = [
    { title: 'ミトコンドリアを増やす', note: '運動は「ミトコンドリア新生」を促す最も確実な手段。エネルギー工場が増える', href: '/mitochondria' },
    { title: '血糖を安定させる', note: '筋肉が糖を取り込み、インスリンの効きが改善する', href: '/blood-sugar' },
    { title: '自律神経・HRVを整える', note: '適度な運動は回復力（副交感神経）を高める', href: '/autonomic-nervous-system' },
    { title: '気分・睡眠を改善', note: '神経伝達物質と体内時計に働きかけ、メンタルと眠りを底上げ', href: '/sleep' },
];

const howto = [
    { head: '週に有酸素を150分が目安', body: '早歩きでもOK。「ややきつい」と感じる強度を、合計で週150分ほど。' },
    { head: '週2回の筋トレを足す', body: '大きな筋肉（脚・背中・胸）を中心に。サルコペニア予防の核。' },
    { head: '時々HIITで刺激を', body: '20秒全力＋休憩を数本。短時間でミトコンドリアに強い刺激を与える。' },
    { head: '座りっぱなしを断つ', body: '1時間に1回立つ・歩く。運動以前に「動かない時間」を減らす。' },
    { head: '食後に動く', body: '食後10分の散歩で血糖の波を抑える。続けやすい習慣から。' },
];

const relNutrients = [
    { slug: 'protein', why: '筋肉の材料。運動効果を活かす土台' },
    { slug: 'creatine', why: '筋力・パワー・回復をサポート' },
    { slug: 'coq10', why: 'ミトコンドリアのエネルギー産生を支える' },
    { slug: 'magnesium', why: '筋肉の収縮・弛緩とエネルギー代謝に必須' },
];

export default function ExercisePage() {
    const nutrients = relNutrients.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E1EFDD' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '運動とは', description: 'ミトコンドリアを増やす「運動」を、有酸素・HIIT・筋トレの役割と40代の組み立て方から解説。', path: '/exercise' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '生活習慣', path: '/library#lifestyle' }, { name: '運動', path: '/exercise' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '生活習慣', href: '/library#lifestyle' }, { name: '運動' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        EXERCISE
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        EXERCISE
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>運動とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        ミトコンドリアを「増やす」唯一の確実な方法。サプリでもできない、運動だけの特権です。
                    </p>
                </header>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ運動が効くのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        運動の最大の価値は、<strong>ミトコンドリアを新しく増やせる</strong>こと。これは「ミトコンドリア新生」と呼ばれ、栄養やサプリでは代わりがきかない、運動だけが確実に起こせる変化です。エネルギー工場の数そのものが増えるので、疲れにくく、回復の早い体に変わっていきます。
                        {'\n\n'}
                        運動は「ちょうど良いストレス（ホルミシス）」として働きます。運動中は一時的に活性酸素が増えますが、それが刺激となって、体は抗酸化力やミトコンドリアを強化する方向に適応します。つまり、適度な負荷が体を鍛え直すのです。
                        {'\n\n'}
                        さらに運動は、血糖の安定・自律神経の調整・気分や睡眠の改善・筋肉量の維持まで、全身に波及します。40代以降、何か一つだけ習慣を変えるなら、運動はもっとも費用対効果の高い選択肢です。
                    </p>
                </section>

                {/* 3つのタイプ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">運動の3つのタイプ</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        役割が違うので、組み合わせると相乗効果が出ます。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {types.map((t) => (
                            <div key={t.en} className="rounded-xl p-5 border border-black" style={{ background: t.color }}>
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/40 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.en}</div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{t.name}</div>
                                <p className="text-xs text-[#1A1A1A]/70 leading-snug">{t.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 効果 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">運動がもたらすこと</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                        {benefits.map((b) => (
                            <div key={b.title} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">
                                    {b.href ? (
                                        <Link href={b.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{b.title}</Link>
                                    ) : b.title}
                                </div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{b.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 組み立て方 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">40代からの組み立て方</h2>
                    <div className="space-y-3 mt-5">
                        {howto.map((h, i) => (
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
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">運動を支える栄養素</h2>
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
                    ※ 本ページは一般的な解説であり、診断・治療を目的とするものではありません。持病のある方は運動を始める前に医療専門家にご相談ください。
                </p>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/library#lifestyle" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        生活習慣 に戻る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
