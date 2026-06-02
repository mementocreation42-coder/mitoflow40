import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage } from '@/components/JsonLd';

export const metadata = {
    title: '糖化・AGEs（こげる） | Mitoflow40',
    description: '体が"こげる"原因「糖化」とAGEs（終末糖化産物）を、起こる仕組み・体への影響・血糖との関係・防ぐ習慣からわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/glycation' },
    openGraph: {
        title: '糖化・AGEs（こげる） | Mitoflow40',
        description: '体が"こげる"原因「糖化」とAGEsを、仕組み・血糖との関係・防ぐ習慣から解説。',
        url: 'https://mitoflow40.com/glycation',
        type: 'article',
    },
};

// 影響
const effects = [
    { title: '肌のたるみ・くすみ', note: 'コラーゲンが糖化して硬く・もろくなり、ハリと弾力が失われる' },
    { title: '血管の老化', note: '血管壁のタンパク質が糖化し、しなやかさを失う。動脈硬化と関連' },
    { title: '骨や関節の劣化', note: 'コラーゲンの糖化が骨の質や関節の柔軟性に影響' },
    { title: '慢性炎症・酸化の促進', note: 'AGEsは炎症や活性酸素を引き起こし、老化を加速させる' },
];

// 防ぐ習慣
const prevention = [
    { head: '血糖の急上昇を避ける', body: '糖化は高血糖で進む。甘い飲み物・精製炭水化物を控え、食物繊維やタンパク質を先に食べる（ベジファースト）。' },
    { head: '食べる順番と速さ', body: 'ゆっくりよく噛んで食べると血糖の波がゆるやかに。食後の軽い運動も効果的。' },
    { head: '高温調理を減らす', body: '揚げる・焼き焦がす調理はAGEsを増やす。蒸す・茹でる・煮るを増やす。' },
    { head: '抗酸化と組み合わせる', body: '糖化と酸化は連動する。抗酸化の栄養・習慣もあわせてケアする。', href: '/oxidative-stress' },
];

const relNutrients = [
    { slug: 'fiber', why: '糖の吸収をゆるやかにし、血糖の急上昇を抑える' },
    { slug: 'magnesium', why: '血糖の安定・インスリンの働きを支える' },
    { slug: 'alpha-lipoic-acid', why: '抗酸化と血糖サポートで糖化対策を後押し' },
];

export default function GlycationPage() {
    const nutrients = relNutrients.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F6E6CF' }}>
            <img src="/images/for-you-wellness.png" alt="" className="absolute pointer-events-none opacity-80 hidden md:block"
                style={{ top: '60px', right: '-50px', width: '260px' }} />
            <img src="/images/experience_vitality_new.png" alt="" className="absolute pointer-events-none opacity-40"
                style={{ bottom: '-60px', left: '-70px', width: '320px', transform: 'scaleX(-1)' }} />

            <JsonLd data={medicalWebPage({ name: '糖化・AGEs（こげる）とは', description: '体がこげる原因「糖化」とAGEsを、仕組み・血糖との関係・防ぐ習慣から解説。', path: '/glycation' })} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        GLYCATION ／ こげる
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        AGEs
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>糖化・終末糖化産物とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        体が"こげる"老化。余った糖がタンパク質と結びつき、組織を硬く劣化させる仕組みです。
                    </p>
                </header>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">糖化とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        糖化とは、血液中の余った<strong>糖がタンパク質や脂質と結びついて</strong>、本来の働きを損なわせる反応です。ホットケーキがこんがり焼けて茶色く硬くなるのと同じ反応（メイラード反応）が、体の中でもゆっくり起きていると考えるとイメージしやすいでしょう。
                        {'\n\n'}
                        糖化が進むと、最終的に<strong>AGEs（終末糖化産物）</strong>という物質ができます。AGEsは一度できると分解されにくく、組織に溜まって、硬く・もろく・茶色く劣化させます。酸化（さびる）と並ぶ、老化の二大ルートのひとつ＝<strong>「こげる」</strong>と表現されます。
                        {'\n\n'}
                        糖化の進み具合は、実は血液検査でおなじみの<Link href="/biomarkers/hba1c" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">HbA1c</Link>に表れます。HbA1cは「赤血球のヘモグロビンが糖化した割合」そのもの。つまり血糖コントロールは、糖化対策とほぼ同義なのです。
                    </p>
                </section>

                {/* 影響 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">糖化が引き起こすこと</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        AGEsは、タンパク質でできた組織のあちこちに影響します。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {effects.map((e) => (
                            <div key={e.title} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">{e.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{e.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 酸化との関係 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">「さびる」と「こげる」は連動する</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        糖化（こげる）と<Link href="/oxidative-stress" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">酸化（さびる）</Link>は、別々の現象ではなく、お互いを加速させる関係にあります。糖化でできたAGEsは活性酸素を増やし、酸化ストレスはさらに糖化を進める——この悪循環が、老化の大きなエンジンになります。
                        だからこそ、血糖を整える「糖化対策」と、抗酸化を高める「酸化対策」は、セットで取り組むのが効果的です。
                    </p>
                </section>

                {/* 防ぐ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">糖化を防ぐ習慣</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        ポイントは「血糖を急上昇させない」ことと「高温調理を減らす」ことです。
                    </p>
                    <div className="space-y-3">
                        {prevention.map((p, i) => (
                            <div key={p.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    {i + 1}
                                </span>
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">
                                        {p.href ? (
                                            <Link href={p.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{p.head}</Link>
                                        ) : p.head}
                                    </div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{p.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 関連 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">糖化対策に関わる栄養素</h2>
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
                    <Link href="/oxidative-stress" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        さびる（酸化）
                    </Link>
                    <Link href="/inflammation" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        くすぶる（慢性炎症）
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
