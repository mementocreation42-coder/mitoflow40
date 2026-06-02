import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '慢性炎症（くすぶる） | Mitoflow40',
    description: '自覚なく体をむしばむ「慢性炎症（くすぶる）」を、急性炎症との違い・原因・体への影響・測り方（hs-CRP）・抑える習慣からわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/inflammation' },
    openGraph: {
        title: '慢性炎症（くすぶる） | Mitoflow40',
        description: '老化を加速させる「慢性炎症」を、原因・影響・測り方・抑える習慣から解説。',
        url: 'https://mitoflow40.com/inflammation',
        type: 'article',
    },
};

const causes = [
    { title: '内臓脂肪', note: '脂肪細胞が炎症性物質を放出する。お腹まわりの脂肪は炎症の発信源' },
    { title: '腸内環境の乱れ', note: '腸のバリアが弱る（リーキーガット）と、炎症の引き金が血中へ漏れる' },
    { title: '高血糖・糖化', note: '血糖の乱高下やAGEsが炎症を促す' },
    { title: '酸化ストレス', note: '活性酸素の過剰が炎症と互いに加速し合う' },
    { title: '歯周病', note: '口の中の慢性炎症が全身へ波及する見落とされがちな原因' },
    { title: '睡眠不足・ストレス・喫煙', note: '生活習慣のひずみが慢性的な炎症レベルを底上げする' },
];

const effects = [
    '動脈硬化・心血管リスクの上昇',
    'インスリン抵抗性・糖尿病リスク',
    '気分の落ち込み・脳機能の低下',
    '関節や全身のこわばり・痛み',
    'がん・認知症を含む幅広い疾患との関連',
];

const supports = [
    { head: 'オメガ3を増やす', body: '青魚・えごま油など。炎症をしずめる方向に働く脂質。', },
    { head: '腸を整える', body: '食物繊維・発酵食品で腸内環境を整え、炎症の引き金を減らす。', href: '/gut-brain' },
    { head: '内臓脂肪を減らす', body: '運動と食事で内臓脂肪を落とすことが、炎症発信源を断つ近道。' },
    { head: '抗酸化・血糖ケア', body: 'さびる・こげるを抑えることが、くすぶりも鎮める。', },
    { head: '睡眠・口腔ケア', body: '質の良い睡眠と歯のケアは、見落とされがちな炎症対策。' },
];

const relNutrients = [
    { slug: 'omega3', why: '炎症をしずめる代表的な脂質' },
    { slug: 'fiber', why: '腸内環境を整え、炎症の引き金を減らす' },
    { slug: 'vitamin-d', why: '免疫を調整し、炎症の暴走を抑える' },
    { slug: 'magnesium', why: '不足すると炎症マーカーが上がりやすい' },
];

export default function InflammationPage() {
    const nutrients = relNutrients.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F6DCD0' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-recovery.png" alt="" className="absolute pointer-events-none opacity-80 hidden md:block"
                style={{ top: '60px', right: '-50px', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/about-illustration-bg.png" alt="" className="absolute pointer-events-none opacity-40"
                style={{ bottom: '-70px', left: '-80px', width: '340px' }} />

            <JsonLd data={medicalWebPage({ name: '慢性炎症（くすぶる）とは', description: '老化を加速させる「慢性炎症」を、原因・影響・測り方・抑える習慣から解説。', path: '/inflammation' })} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '慢性炎症' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        CHRONIC INFLAMMATION ／ くすぶる
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        INFLAMMATION
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>慢性炎症とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        自覚のないまま、体の奥で"くすぶり"続ける弱い炎症。老化と万病の隠れた土台です。
                    </p>
                </header>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">慢性炎症とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        炎症は本来、ケガや感染から体を守る大切な防御反応です。傷が赤く腫れて治っていくような「急性炎症」は、役目を終えると自然に収まります。
                        {'\n\n'}
                        問題は、はっきりした症状もないまま、弱い炎症が長く続く<strong>「慢性炎症」</strong>です。火事のような急性炎症に対し、こちらは静かに"くすぶる"線香花火のようなもの。痛みや熱として感じにくいぶん見逃されますが、その間にも血管・脳・臓器をじわじわ傷つけていきます。
                        {'\n\n'}
                        加齢とともに体の炎症レベルが上がる現象は<strong>「インフラメイジング（炎症性老化）」</strong>と呼ばれ、老化の中心的なメカニズムのひとつと考えられています。さびる（酸化）・こげる（糖化）と並ぶ、老化の第3のルート＝<strong>「くすぶる」</strong>です。
                    </p>
                </section>

                {/* 原因 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">慢性炎症の原因</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        生活習慣のあちこちに、くすぶりの火種があります。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {causes.map((c) => (
                            <div key={c.title} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">{c.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{c.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 影響 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">慢性炎症が引き起こすこと</h2>
                    <div className="bg-white/70 rounded-2xl p-6 border border-black mt-5">
                        <ul className="space-y-2">
                            {effects.map((e, i) => (
                                <li key={i} className="flex gap-3 text-[#4A4A4A]">
                                    <span className="text-[#FF9855] flex-shrink-0">●</span>
                                    <span>{e}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 測る */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">炎症は「測れる」</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-4">
                        慢性炎症のレベルは、血液検査で客観的に把握できます。代表的な指標がこちらです。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <Link href="/biomarkers/hscrp" className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                            高感度CRP →
                        </Link>
                        <Link href="/biomarkers/fibrinogen" className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                            フィブリノーゲン →
                        </Link>
                    </div>
                </section>

                {/* 抑える */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">くすぶりを鎮める習慣</h2>
                    <div className="space-y-3 mt-5">
                        {supports.map((s, i) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    {i + 1}
                                </span>
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">
                                        {s.href ? (
                                            <Link href={s.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{s.head}</Link>
                                        ) : s.head}
                                    </div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 関連 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">炎症を抑える栄養素</h2>
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
                    <Link href="/glycation" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        こげる（糖化）
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
