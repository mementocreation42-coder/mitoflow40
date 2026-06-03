import Link from 'next/link';
import { notFound } from 'next/navigation';
import { symptoms, getSymptomBySlug } from '@/lib/symptoms';
import { getBiomarkerBySlug } from '@/lib/biomarkers';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
    return symptoms.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const s = getSymptomBySlug(slug);
    if (!s) return {};
    const description = `${s.name}（${s.en}）の背景には何があるのか。考えられる原因・確認したい血液検査・関わる栄養素・関連する体のしくみと、まず試したい生活の打ち手を精密栄養学の視点で解説します。`;
    return {
        title: `${s.name} | 症状から引く | Mitoflow40`,
        description,
        alternates: { canonical: `https://mitoflow40.com/symptoms/${slug}` },
        robots: { index: true, follow: true },
        openGraph: {
            title: `${s.name} | 症状から引く | Mitoflow40`,
            description,
            url: `https://mitoflow40.com/symptoms/${slug}`,
            type: 'article',
        },
    };
}

export default async function SymptomPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const s = getSymptomBySlug(slug);

    if (!s) notFound();

    const biomarkers = s.relatedBiomarkers
        .map((x) => getBiomarkerBySlug(x))
        .filter((b): b is NonNullable<typeof b> => Boolean(b));

    const nutrients = s.relatedNutrients
        .map((x) => getNutrientBySlug(x))
        .filter((n): n is NonNullable<typeof n> => Boolean(n));

    const others = symptoms.filter((x) => x.slug !== s.slug);

    return (
        <div className="pt-[60px] min-h-screen relative overflow-hidden" style={{ background: s.color }}>
            <JsonLd data={medicalWebPage({ name: `${s.name}の背景`, description: s.tagline, path: `/symptoms/${slug}` })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '症状から引く', path: '/symptoms' }, { name: s.name, path: `/symptoms/${slug}` }])} />
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <article className="max-w-[800px] mx-auto px-6 md:px-4 py-12 md:py-24 relative" style={{ zIndex: 1 }}>
                <header className="mb-12">
                    <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '症状から引く', href: '/symptoms' }, { name: s.name }]} />
                    <div className="text-xs tracking-widest text-[#1A1A1A]/50 font-mono mb-4">FROM SYMPTOMS</div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-2">{s.name}</h1>
                    <p className="text-sm text-[#1A1A1A]/60 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.en}</p>
                    <p className="text-lg md:text-xl text-[#1A1A1A] font-medium leading-relaxed">{s.tagline}</p>
                </header>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ起こるのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">{s.intro}</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">考えられる背景</h2>
                    <ul className="space-y-2">
                        {s.causes.map((c, i) => (
                            <li key={i} className="flex gap-3 text-[#4A4A4A]">
                                <span className="text-[#41C9B4] flex-shrink-0">●</span>
                                <span>{c}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {biomarkers.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">確認したい血液検査</h2>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">背景の「あたり」をつけるのに役立つ指標です。各項目で基準値・理想値を確認できます。</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {biomarkers.map((b) => (
                                <Link key={b.slug} href={`/biomarkers/${b.slug}`}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                    <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: b.color }}>{b.name}</span>
                                    <span className="text-xs text-[#4A4A4A] leading-snug">{b.tagline}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {nutrients.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">関わりやすい栄養素</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {nutrients.map((n) => (
                                <Link key={n.slug} href={`/nutrients/${n.slug}`}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                    <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: n.color }}>{n.name}</span>
                                    <span className="text-xs text-[#4A4A4A] leading-snug">{n.tagline}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {s.relatedLinks.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">関連する体のしくみ・臓器</h2>
                        <div className="flex flex-wrap gap-2">
                            {s.relatedLinks.map((l) => (
                                <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                    {l.label} →
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 border-l-4 border-[#41C9B4] pl-3 leading-tight">まず試したい生活の打ち手</h2>
                    <ul className="space-y-3">
                        {s.selfCare.map((tip, i) => (
                            <li key={i} className="flex gap-3 p-4 bg-white/70 rounded-xl text-[#1A1A1A]">
                                <span className="font-bold text-[#41C9B4] flex-shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0{i + 1}</span>
                                <span className="text-sm leading-relaxed">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本記事は一般的な情報提供を目的としており、診断・治療・医療行為を構成するものではありません。症状が続く・強い・急に現れた場合は、自己判断せず医療機関を受診してください。
                </p>

                <div className="mt-12 pt-12 border-t border-[#1A1A1A]/15">
                    <h2 className="text-xl font-bold text-center mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>OTHER SYMPTOMS</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {others.map((x) => (
                            <Link key={x.slug} href={`/symptoms/${x.slug}`}
                                className="px-4 py-3 text-center rounded-lg border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all text-sm font-bold text-[#1A1A1A]"
                                style={{ background: x.color }}>
                                {x.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center flex flex-wrap justify-center gap-3">
                    <Link href="/symptoms" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-[#1A1A1A] rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        一覧に戻る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-[#1A1A1A] rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
