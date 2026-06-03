import Link from 'next/link';
import { notFound } from 'next/navigation';
import { nutrients, getNutrientBySlug } from '@/lib/nutrients';
import { getGeneBySlug } from '@/lib/genes';
import { getFoodsByNutrient } from '@/lib/foods';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
    return nutrients.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const n = getNutrientBySlug(slug);
    if (!n) return {};
    const description = `${n.name}（${n.en}）とは？${n.tagline}。働き・不足のサイン・多く含む食品・関わる遺伝子を、精密栄養学の視点でわかりやすく解説します。`;
    return {
        title: `${n.name} (${n.en}) | Mitoflow40`,
        description,
        alternates: { canonical: `https://mitoflow40.com/nutrients/${slug}` },
        robots: { index: true, follow: true },
        openGraph: {
            title: `${n.name} (${n.en}) | Mitoflow40`,
            description,
            url: `https://mitoflow40.com/nutrients/${slug}`,
            type: 'article',
        },
    };
}

export default async function NutrientPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const n = getNutrientBySlug(slug);

    if (!n) notFound();

    const relatedGenes = n.relatedGenes
        .map((g) => getGeneBySlug(g))
        .filter((g): g is NonNullable<typeof g> => Boolean(g));

    const relatedNutrients = (n.relatedNutrients ?? [])
        .map((s) => getNutrientBySlug(s))
        .filter((x): x is NonNullable<typeof x> => Boolean(x));

    const relatedFoods = getFoodsByNutrient(n.slug);

    return (
        <div className="pt-[60px] min-h-screen relative overflow-hidden" style={{ background: n.color }}>
            <JsonLd data={medicalWebPage({ name: `${n.name}（${n.en}）`, description: n.tagline, path: `/nutrients/${slug}` })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の地図', path: '/library#map' }, { name: '栄養素', path: '/nutrients' }, { name: n.name, path: `/nutrients/${slug}` }])} />
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />
            
            <article className="max-w-[800px] mx-auto px-6 md:px-4 py-12 md:py-24 relative" style={{ zIndex: 1 }}>
                <header className="mb-12">
                    <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の地図', href: '/library#map' }, { name: '栄養素', href: '/nutrients' }, { name: n.name }]} />
                    <div className="text-xs tracking-widest text-[#1A1A1A]/50 font-mono mb-4">
                        {n.category}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-2">
                        {n.name}
                    </h1>
                    <p className="text-sm text-[#1A1A1A]/60 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{n.en}</p>
                    <p className="text-lg md:text-xl text-[#1A1A1A] font-medium leading-relaxed">
                        {n.tagline}
                    </p>
                </header>

                {/* 主な働き */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                        {n.name} の主な働き
                    </h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">{n.role}</p>
                </section>

                {/* 不足のサイン */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                        {n.name} が不足すると出やすいサイン
                    </h2>
                    <ul className="space-y-2">
                        {n.deficiencySigns.map((sign, i) => (
                            <li key={i} className="flex gap-3 text-[#4A4A4A]">
                                <span className="text-[#41C9B4] flex-shrink-0">●</span>
                                <span>{sign}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 多く含む食品 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                        {n.name} を多く含む食品
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {n.foods.map((f) => (
                            <span key={f} className="px-3 py-1.5 bg-white border border-[#1A1A1A]/15 rounded-full text-sm text-[#1A1A1A]">
                                {f}
                            </span>
                        ))}
                    </div>
                </section>

                {/* この栄養素を多く含む食べ物（相互リンク） */}
                {relatedFoods.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                            {n.name} を多く含む食べ物
                        </h2>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                            各食材ページで、40代向けの食べ方や組み合わせのヒントまで読めます。
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {relatedFoods.map((food) => (
                                <Link
                                    key={food.slug}
                                    href={`/foods/${food.slug}`}
                                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70"
                                    style={{ background: food.color }}
                                >
                                    <span className="text-lg" aria-hidden>{food.emoji}</span>
                                    <span className="text-sm font-bold text-[#1A1A1A] leading-snug">{food.name}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* 関わる遺伝子（相互リンク） */}
                {relatedGenes.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                            {n.name} と関わる遺伝子
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {relatedGenes.map((g) => (
                                <Link
                                    key={g.slug}
                                    href={`/genes/${g.slug}`}
                                    className="flex items-center gap-3 p-4 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70"
                                >
                                    <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif", background: g.color }}>
                                        {g.symbol}
                                    </span>
                                    <span className="text-sm text-[#4A4A4A] leading-snug">{g.tagline}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* 関連する栄養素・アミノ酸（相互リンク） */}
                {relatedNutrients.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                            {n.name} を構成するアミノ酸
                        </h2>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                            タンパク質は、これらのアミノ酸に分解されて体内で働きます。それぞれが神経伝達物質・抗酸化・筋肉づくりなど別々の役割を担います。
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {relatedNutrients.map((x) => (
                                <Link
                                    key={x.slug}
                                    href={`/nutrients/${x.slug}`}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70"
                                >
                                    <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: x.color }}>
                                        {x.name}
                                    </span>
                                    <span className="text-xs text-[#4A4A4A] leading-snug">{x.tagline}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* 摂り方のヒント */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                        {n.name} の摂り方のヒント
                    </h2>
                    <ul className="space-y-3">
                        {n.tips.map((tip, i) => (
                            <li key={i} className="flex gap-3 p-4 bg-white/70 rounded-xl text-[#1A1A1A]">
                                <span className="font-bold text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0{i + 1}</span>
                                <span className="text-sm leading-relaxed">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* もっと学ぶ（しくみ・生活習慣への導線） */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">もっと学ぶ</h2>
                    <p className="text-sm text-[#4A4A4A] mb-4 leading-relaxed">栄養素が働く「しくみ」と、それを活かす「習慣」もあわせてどうぞ。</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/mitochondria', label: 'ミトコンドリア' },
                            { href: '/tca-cycle', label: 'TCA回路' },
                            { href: '/exercise', label: '運動' },
                            { href: '/sleep', label: '睡眠' },
                            { href: '/biomarkers', label: '血液検査' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Disclaimer */}
                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本記事は一般的な栄養情報であり、診断や治療、特定のサプリメントの推奨を目的とするものではありません。持病のある方や服薬中の方は、サプリメントの利用前に医療専門家にご相談ください。
                </p>

                <div className="mt-12 text-center flex flex-wrap justify-center gap-3">
                    <Link
                        href="/nutrients"
                        className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-[#1A1A1A] rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors"
                    >
                        一覧に戻る
                    </Link>
                    <Link
                        href="/library"
                        className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-[#1A1A1A] rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors"
                    >
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
