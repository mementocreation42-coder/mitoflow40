import Link from 'next/link';
import { notFound } from 'next/navigation';
import { genes, getGeneBySlug } from '@/lib/genes';

export function generateStaticParams() {
    return genes.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const gene = getGeneBySlug(slug);
    if (!gene) return {};
    return {
        title: `${gene.symbol} - ${gene.name} | Mitoflow40`,
        description: gene.tagline,
        alternates: { canonical: `https://mitoflow40.com/genes/${slug}` },
        robots: { index: true, follow: true },
        openGraph: {
            title: `${gene.symbol} - ${gene.name} | Mitoflow40`,
            description: gene.tagline,
            url: `https://mitoflow40.com/genes/${slug}`,
            type: 'article',
        },
    };
}

export default async function GenePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const gene = getGeneBySlug(slug);

    if (!gene) notFound();

    return (
        <article className="max-w-[800px] mx-auto px-6 md:px-4 py-12 md:py-24">
            <header className="mb-12">
                <div className="text-xs tracking-widest text-[#41C9B4] font-mono mb-4">
                    {gene.category}
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] leading-none mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {gene.symbol}
                </h1>
                <p className="text-sm text-[#4A4A4A]/70 mb-6">{gene.name}</p>
                <p className="text-lg md:text-xl text-[#1A1A1A] font-medium leading-relaxed">
                    {gene.tagline}
                </p>
            </header>

            {/* 役割 */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 pb-2 border-b border-[#1A1A1A]/10">
                    役割
                </h2>
                <p className="text-[#4A4A4A] leading-relaxed">{gene.role}</p>
            </section>

            {/* Dirtyだと出やすい症状 */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 pb-2 border-b border-[#1A1A1A]/10">
                    Dirty だと出やすい症状
                </h2>
                <ul className="space-y-2">
                    {gene.dirtyEffects.map((effect, i) => (
                        <li key={i} className="flex gap-3 text-[#4A4A4A]">
                            <span className="text-[#41C9B4] flex-shrink-0">●</span>
                            <span>{effect}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* クリーンに保つ戦略 */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 pb-2 border-b border-[#1A1A1A]/10">
                    クリーンに保つ戦略
                </h2>
                <div className="space-y-6">
                    {gene.cleanStrategies.map((s, i) => (
                        <div key={i} className="p-5 bg-[#F5F5F5] rounded-xl">
                            <h3 className="font-bold text-[#1A1A1A] mb-2">{s.title}</h3>
                            <p className="text-sm text-[#4A4A4A] leading-relaxed">{s.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 関連する栄養素 */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 pb-2 border-b border-[#1A1A1A]/10">
                    関連する栄養素
                </h2>
                <div className="flex flex-wrap gap-2">
                    {gene.nutrients.map((n) => (
                        <span key={n} className="px-3 py-1.5 bg-white border border-[#1A1A1A]/15 rounded-full text-sm text-[#1A1A1A]">
                            {n}
                        </span>
                    ))}
                </div>
            </section>

            {/* 関連する症状 */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 pb-2 border-b border-[#1A1A1A]/10">
                    関連する症状
                </h2>
                <div className="flex flex-wrap gap-2">
                    {gene.relatedSymptoms.map((s) => (
                        <span key={s} className="px-3 py-1.5 bg-white border border-[#1A1A1A]/15 rounded-full text-sm text-[#4A4A4A]">
                            {s}
                        </span>
                    ))}
                </div>
            </section>

            {/* Disclaimer */}
            <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-[#F5F5F5] rounded-lg">
                ※ 本記事は Dr. Ben Lynch 著『Dirty Genes』を参考にした一般情報であり、診断や治療を目的とするものではありません。遺伝子検査結果や具体的な症状については医療専門家にご相談ください。
            </p>

            {/* Other genes */}
            <div className="mt-12 pt-12 border-t border-gray-200">
                <h2 className="text-xl font-bold text-center mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    OTHER GENES
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {genes.filter((g) => g.slug !== gene.slug).map((g) => (
                        <Link
                            key={g.slug}
                            href={`/genes/${g.slug}`}
                            className="px-4 py-3 text-center rounded-lg border border-[#1A1A1A]/10 hover:border-[#41C9B4] hover:text-[#41C9B4] transition-colors text-sm font-bold"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            {g.symbol}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-12 text-center">
                <Link
                    href="/genes"
                    className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-[#1A1A1A] rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors"
                >
                    一覧に戻る
                </Link>
            </div>
        </article>
    );
}
