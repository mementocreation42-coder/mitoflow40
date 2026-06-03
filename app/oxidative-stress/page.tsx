import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import { getGeneBySlug } from '@/lib/genes';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '活性酸素・酸化ストレス（さびる） | Mitoflow40',
    description: '体が"さびる"原因「活性酸素」と「酸化ストレス」を、発生する仕組み・体への影響・抗酸化のしくみ・支える栄養素と遺伝子からわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/oxidative-stress' },
    openGraph: {
        title: '活性酸素・酸化ストレス（さびる） | Mitoflow40',
        description: '体が"さびる"原因「活性酸素」と抗酸化のしくみを、仕組み・影響・栄養素・遺伝子から解説。',
        url: 'https://mitoflow40.com/oxidative-stress',
        type: 'article',
    },
};

// 発生源
const sources = [
    { title: 'エネルギー産生', note: 'ミトコンドリアがATPを作る過程で、副産物として必然的に発生する' },
    { title: '紫外線・大気汚染', note: '日光や排ガス、PM2.5などの外的刺激が活性酸素を増やす' },
    { title: '喫煙・飲酒', note: '解毒や代謝の負荷が大きく、酸化ストレスを高める' },
    { title: 'ストレス・睡眠不足', note: '心身のストレスや回復不足も、酸化のバランスを崩す' },
    { title: '激しい運動・炎症', note: '過度な運動や慢性炎症は活性酸素を一時的に増やす' },
];

// 抗酸化の2段構え
const defenses = [
    { title: '体内で作る抗酸化システム', note: 'グルタチオンやSOD（スーパーオキシドジスムターゼ）など、自前の酵素が中和する', },
    { title: '食べて補う抗酸化物質', note: 'ビタミンC・E、ポリフェノールなど、食事から摂って助ける', },
];

const relNutrients = [
    { slug: 'glutathione', why: '体内最強の抗酸化物質。中和の中心' },
    { slug: 'nac', why: 'グルタチオンの材料を補う' },
    { slug: 'vitamin-c', why: '水溶性の抗酸化。E・グルタチオンを再生' },
    { slug: 'vitamin-e', why: '脂溶性の抗酸化。細胞膜を守る' },
    { slug: 'selenium', why: '抗酸化酵素GPXの必須成分' },
    { slug: 'alpha-lipoic-acid', why: '水にも脂にも効く万能抗酸化物質' },
    { slug: 'coq10', why: 'ミトコンドリア膜を酸化から守る' },
    { slug: 'copper', why: '抗酸化酵素SODの構成成分' },
];
const relGenes = [
    { slug: 'gst-gpx', why: 'グルタチオンを使って酸化・毒素を処理する酵素群' },
];

export default function OxidativeStressPage() {
    const nutrients = relNutrients.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);
    const genes = relGenes.map((c) => ({ ...c, g: getGeneBySlug(c.slug) })).filter((c) => c.g);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F3DEDE' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '活性酸素・酸化ストレス（さびる）とは', description: '体がさびる原因「活性酸素」と抗酸化のしくみを、仕組み・影響・栄養素・遺伝子から解説。', path: '/oxidative-stress' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '老化', path: '/library#aging' }, { name: '活性酸素', path: '/oxidative-stress' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '老化', href: '/library#aging' }, { name: '活性酸素' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        OXIDATIVE STRESS ／ さびる
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        ROS
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>活性酸素・酸化ストレスとは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        体が"さびる"原因。エネルギーを作る代償として生まれる活性酸素と、それを抑える抗酸化のバランスの話です。
                    </p>
                </header>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">活性酸素とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        活性酸素（ROS）は、ふつうの酸素より反応性が高くなった酸素の仲間です。私たちがエネルギー(ATP)を作るとき、ミトコンドリアで酸素を使う過程で、副産物として必ず発生します。つまり、生きてエネルギーを作る限り、避けられないものです。
                        {'\n\n'}
                        活性酸素は悪者扱いされがちですが、適量なら<strong>免疫で細菌を攻撃したり、細胞のシグナル</strong>として役立ちます。問題は「出すぎ」たとき。鉄が酸素でさびるように、活性酸素が細胞・脂質・DNA・ミトコンドリアを傷つけることを<strong>「酸化」</strong>と呼びます。
                        {'\n\n'}
                        活性酸素の発生量が、抗酸化の処理能力を上回った状態が<strong>「酸化ストレス」</strong>です。これが続くと、老化の加速、慢性炎症、生活習慣病、肌のシミ・しわなどにつながると考えられています。鍵は「ゼロにする」ことではなく、<strong>バランスを保つ</strong>ことです。
                    </p>
                </section>

                {/* 発生源 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">活性酸素が増える原因</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        体の内側でも外側でも、さまざまな要因で活性酸素は増えます。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {sources.map((s) => (
                            <div key={s.title} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">{s.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{s.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ミトコンドリアとの悪循環 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">ミトコンドリアとの深い関係</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        活性酸素の最大の発生源は<Link href="/mitochondria" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">ミトコンドリア</Link>そのものです。そして厄介なことに、傷ついたミトコンドリアはさらに多くの活性酸素を漏らすという<strong>悪循環</strong>に陥りやすい。
                        この循環を断つのが、傷んだミトコンドリアを片付ける<Link href="/autophagy" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">オートファジー（ミトファジー）</Link>であり、新しく増やす運動です。「質の良いミトコンドリアを保つ」ことが、酸化ストレス対策の本丸でもあります。
                    </p>
                </section>

                {/* 抗酸化 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">抗酸化の2段構え</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        体は、活性酸素に対して2つの防御を持っています。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {defenses.map((d, i) => (
                            <div key={d.title} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    {i + 1}
                                </div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{d.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{d.note}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mt-4">
                        抗酸化物質はチームで働き、お互いを再生し合います。1つを大量に摂るより、<strong>多様にバランスよく</strong>が基本です。
                    </p>
                </section>

                {/* 関連 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">抗酸化を支える栄養素・遺伝子</h2>
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
                    ※ 本ページは一般的な解説であり、診断・治療を目的とするものではありません。
                </p>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/library#aging" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        老化 に戻る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
