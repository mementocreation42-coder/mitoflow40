import Link from 'next/link';
import { notFound } from 'next/navigation';
import { biomarkers, getBiomarkerBySlug } from '@/lib/biomarkers';
import { getNutrientBySlug } from '@/lib/nutrients';
import { getGeneBySlug } from '@/lib/genes';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import MemberGate from '@/components/MemberGate';
import { isMember, isBiomarkerGated } from '@/lib/auth';

export function generateStaticParams() {
    return biomarkers.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const b = getBiomarkerBySlug(slug);
    if (!b) return {};
    const description = `${b.name}（${b.en}）とは？${b.tagline}。基準値・精密栄養学視点の理想値・高い/低いときの意味を、40代の健康最適化の視点でわかりやすく解説します。`;
    return {
        title: `${b.name} (${b.en}) | Mitoflow40`,
        description,
        alternates: { canonical: `https://mitoflow40.com/biomarkers/${slug}` },
        robots: { index: true, follow: true },
        openGraph: {
            title: `${b.name} (${b.en}) | Mitoflow40`,
            description,
            url: `https://mitoflow40.com/biomarkers/${slug}`,
            type: 'article',
        },
    };
}

export default async function BiomarkerPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const b = getBiomarkerBySlug(slug);
    if (!b) notFound();

    const relatedNutrients = b.relatedNutrients
        .map((s) => getNutrientBySlug(s))
        .filter((n): n is NonNullable<typeof n> => Boolean(n));

    const relatedGenes = b.relatedGenes
        .map((s) => getGeneBySlug(s))
        .filter((g): g is NonNullable<typeof g> => Boolean(g));

    const sameCategory = biomarkers.filter((x) => x.category === b.category && x.slug !== b.slug);

    // 会員限定（深さで線引き）：対象項目 かつ 未ログインのとき、後半をゲートする
    const gate = isBiomarkerGated(slug) && !(await isMember());

    return (
        <div className="pt-[60px] min-h-screen relative overflow-hidden" style={{ background: b.color }}>
            <JsonLd data={medicalWebPage({ name: `${b.name}（${b.en}）`, description: b.tagline, path: `/biomarkers/${slug}` })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の地図', path: '/library#map' }, { name: '血液検査', path: '/biomarkers' }, { name: b.name, path: `/biomarkers/${slug}` }])} />
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <article className="max-w-[800px] mx-auto px-6 md:px-4 py-12 md:py-24 relative" style={{ zIndex: 1 }}>
                <header className="mb-12">
                    <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の地図', href: '/library#map' }, { name: '血液検査', href: '/biomarkers' }, { name: b.name }]} />
                    <div className="text-xs tracking-widest text-[#1A1A1A]/50 font-mono mb-4">
                        {b.category}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-2">
                        {b.name}
                    </h1>
                    <p className="text-sm text-[#1A1A1A]/60 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {b.en}
                    </p>
                    <p className="text-lg md:text-xl text-[#1A1A1A] font-medium leading-relaxed">
                        {b.tagline}
                    </p>
                </header>

                {/* 何を測っているか・なぜ重要か */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                        {b.name} とは
                    </h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">{b.role}</p>
                </section>

                {/* 検査値の読み方 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                        {b.name} の検査値の読み方
                    </h2>
                    <div className="space-y-3">
                        <div className="p-4 bg-white/70 rounded-xl">
                            <div className="text-xs font-bold tracking-wider mb-1 text-[#1A1A1A]/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                一般的な基準値
                            </div>
                            <p className="text-sm font-bold text-[#1A1A1A]">{b.standardRange}</p>
                        </div>
                    </div>
                </section>

                {/* ── ここから会員限定（深さで線引き）─────────────── */}
                <MemberGate active={gate}>
                {b.optimalRange && (
                    <section className="mb-10">
                        <div className="p-4 bg-white/70 rounded-xl border border-[#41C9B4]/40">
                            <div className="text-xs font-bold tracking-wider mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#41C9B4' }}>
                                精密栄養学視点の理想値
                            </div>
                            <p className="text-sm font-bold text-[#1A1A1A]">{b.optimalRange}</p>
                        </div>
                        <p className="text-xs text-[#4A4A4A]/60 mt-2 leading-relaxed">
                            ※ 精密栄養学視点の理想値は参考情報です。判断は必ず医療専門家にご相談ください。
                        </p>
                    </section>
                )}

                {/* 高い・低いとき */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                        値が変化しているとき
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 bg-white/70 rounded-xl">
                            <div className="text-xs font-bold tracking-wider mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E54848' }}>
                                HIGH · 高いとき
                            </div>
                            <p className="text-sm text-[#4A4A4A] leading-relaxed">{b.highSigns}</p>
                        </div>
                        <div className="p-4 bg-white/70 rounded-xl">
                            <div className="text-xs font-bold tracking-wider mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#2196F3' }}>
                                LOW · 低いとき
                            </div>
                            <p className="text-sm text-[#4A4A4A] leading-relaxed">{b.lowSigns}</p>
                        </div>
                    </div>
                </section>

                {/* 関連する栄養素 */}
                {relatedNutrients.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                            {b.name} と関わる栄養素
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {relatedNutrients.map((n) => (
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

                {/* 関連する遺伝子 */}
                {relatedGenes.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                            {b.name} と関わる遺伝子
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {relatedGenes.map((g) => (
                                <Link
                                    key={g.slug}
                                    href={`/genes/${g.slug}`}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70"
                                >
                                    <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif", background: g.color }}>
                                        {g.symbol}
                                    </span>
                                    <span className="text-xs text-[#4A4A4A] leading-snug">{g.tagline}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* 観察・改善のヒント */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                        {b.name} の観察・改善ヒント
                    </h2>
                    <ul className="space-y-3">
                        {b.tips.map((tip, i) => (
                            <li key={i} className="flex gap-3 p-4 bg-white/70 rounded-xl text-[#1A1A1A]">
                                <span className="font-bold text-[#41C9B4] flex-shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    0{i + 1}
                                </span>
                                <span className="text-sm leading-relaxed">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </section>
                </MemberGate>
                {/* ── 会員限定ここまで ───────────────────────── */}

                {/* Disclaimer */}
                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本記事は一般的な情報提供を目的としており、診断・治療・医療行為を構成するものではありません。検査値の解釈は必ず医療専門家にご相談ください。
                </p>

                {/* 同カテゴリの他の指標 */}
                {sameCategory.length > 0 && (
                    <div className="mt-12 pt-12 border-t border-[#1A1A1A]/15">
                        <h2 className="text-xl font-bold text-center mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {b.category}の他の指標
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {sameCategory.map((x) => (
                                <Link
                                    key={x.slug}
                                    href={`/biomarkers/${x.slug}`}
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
                    <Link href="/biomarkers"
                        className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-[#1A1A1A] rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        一覧に戻る
                    </Link>
                    <Link href="/library"
                        className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-[#1A1A1A] rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
