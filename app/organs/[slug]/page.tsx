import Link from 'next/link';
import { notFound } from 'next/navigation';
import { organs, getOrganBySlug } from '@/lib/organs';
import { getBiomarkerBySlug } from '@/lib/biomarkers';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
    return organs.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const o = getOrganBySlug(slug);
    if (!o) return {};
    const description = `${o.name}（${o.en}）とは？${o.tagline}。役割・40代での変化・関わる血液検査・栄養素を、精密栄養学の視点でわかりやすく解説します。`;
    return {
        title: `${o.name} (${o.en}) | 内臓・臓器 | Mitoflow40`,
        description,
        alternates: { canonical: `https://mitoflow40.com/organs/${slug}` },
        robots: { index: true, follow: true },
        openGraph: {
            title: `${o.name} (${o.en}) | Mitoflow40`,
            description,
            url: `https://mitoflow40.com/organs/${slug}`,
            type: 'article',
        },
    };
}

export default async function OrganPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const o = getOrganBySlug(slug);

    if (!o) notFound();

    const biomarkers = o.relatedBiomarkers
        .map((s) => getBiomarkerBySlug(s))
        .filter((b): b is NonNullable<typeof b> => Boolean(b));

    const nutrients = o.relatedNutrients
        .map((s) => getNutrientBySlug(s))
        .filter((n): n is NonNullable<typeof n> => Boolean(n));

    const sameCategory = organs.filter((x) => x.category === o.category && x.slug !== o.slug);

    return (
        <div className="pt-[60px] min-h-screen relative overflow-hidden" style={{ background: o.color }}>
            <JsonLd data={medicalWebPage({ name: `${o.name}（${o.en}）`, description: o.tagline, path: `/organs/${slug}` })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '内臓・臓器', path: '/organs' }, { name: o.name, path: `/organs/${slug}` }])} />
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <article className="max-w-[800px] mx-auto px-6 md:px-4 py-12 md:py-24 relative" style={{ zIndex: 1 }}>
                <header className="mb-12">
                    <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '内臓・臓器', href: '/organs' }, { name: o.name }]} />
                    <div className="text-xs tracking-widest text-[#1A1A1A]/50 font-mono mb-4">
                        {o.category}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-2">
                        {o.name}
                    </h1>
                    {o.reading && (
                        <p className="text-sm text-[#1A1A1A]/60 mb-1">（{o.reading}）</p>
                    )}
                    <p className="text-sm text-[#1A1A1A]/60 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{o.en}</p>
                    <p className="text-lg md:text-xl text-[#1A1A1A] font-medium leading-relaxed">
                        {o.tagline}
                    </p>
                </header>

                {/* 役割 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                        {o.name} の役割
                    </h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">{o.role}</p>
                </section>

                {/* 主な働き */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                        {o.name} の主な働き
                    </h2>
                    <ul className="space-y-2">
                        {o.functions.map((f, i) => (
                            <li key={i} className="flex gap-3 text-[#4A4A4A]">
                                <span className="text-[#41C9B4] flex-shrink-0">●</span>
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 40代での変化 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                        40代での変化と注意点
                    </h2>
                    <div className="bg-white/70 rounded-2xl p-6 border border-black">
                        <p className="text-[#4A4A4A] leading-relaxed">{o.agingNote}</p>
                    </div>
                </section>

                {/* 関わる血液検査 */}
                {biomarkers.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                            {o.name} と関わる血液検査
                        </h2>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                            これらの指標で、{o.name}の状態や負担を読み解けます。各項目ページで基準値・理想値まで確認できます。
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {biomarkers.map((b) => (
                                <Link
                                    key={b.slug}
                                    href={`/biomarkers/${b.slug}`}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70"
                                >
                                    <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: b.color }}>
                                        {b.name}
                                    </span>
                                    <span className="text-xs text-[#4A4A4A] leading-snug">{b.tagline}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* 関わる栄養素 */}
                {nutrients.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                            {o.name} を支える栄養素
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {nutrients.map((n) => (
                                <Link
                                    key={n.slug}
                                    href={`/nutrients/${n.slug}`}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70"
                                >
                                    <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: n.color }}>
                                        {n.name}
                                    </span>
                                    <span className="text-xs text-[#4A4A4A] leading-snug">{n.tagline}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* もっと学ぶ（しくみ） */}
                {o.relatedMechanisms.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">もっと学ぶ</h2>
                        <p className="text-sm text-[#4A4A4A] mb-4 leading-relaxed">{o.name}に関わる体のしくみもあわせてどうぞ。</p>
                        <div className="flex flex-wrap gap-2">
                            {o.relatedMechanisms.map((m) => (
                                <Link key={m.href} href={m.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                    {m.label} →
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Disclaimer */}
                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本記事は一般的な解剖・生理の情報提供を目的としており、診断・治療・医療行為を構成するものではありません。気になる症状や検査値は必ず医療専門家にご相談ください。
                </p>

                {/* 同カテゴリの他の臓器 */}
                {sameCategory.length > 0 && (
                    <div className="mt-12 pt-12 border-t border-[#1A1A1A]/15">
                        <h2 className="text-xl font-bold text-center mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {o.category}の他の臓器
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {sameCategory.map((x) => (
                                <Link
                                    key={x.slug}
                                    href={`/organs/${x.slug}`}
                                    className="px-4 py-3 text-center rounded-lg border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all text-sm font-bold text-[#1A1A1A]"
                                    style={{ background: x.color }}
                                >
                                    {x.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-12 text-center flex flex-wrap justify-center gap-3">
                    <Link
                        href="/organs"
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
