import Link from 'next/link';
import { notFound } from 'next/navigation';
import { foods, getFoodBySlug } from '@/lib/foods';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
    return foods.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const f = getFoodBySlug(slug);
    if (!f) return {};
    const description = `${f.name}（${f.en}）に多く含まれる栄養素は？${f.tagline}。40代向けの食べ方・組み合わせ・摂れる栄養素を、精密栄養学の視点でわかりやすく解説します。`;
    return {
        title: `${f.name} (${f.en}) | 栄養豊富な食べ物 | Mitoflow40`,
        description,
        alternates: { canonical: `https://mitoflow40.com/foods/${slug}` },
        robots: { index: true, follow: true },
        openGraph: {
            title: `${f.name} (${f.en}) | Mitoflow40`,
            description,
            url: `https://mitoflow40.com/foods/${slug}`,
            type: 'article',
        },
    };
}

export default async function FoodPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const f = getFoodBySlug(slug);

    if (!f) notFound();

    const nutrients = f.nutrients
        .map((s) => getNutrientBySlug(s))
        .filter((n): n is NonNullable<typeof n> => Boolean(n));

    const sameCategory = foods.filter((x) => x.category === f.category && x.slug !== f.slug);

    return (
        <div className="pt-[60px] min-h-screen relative overflow-hidden" style={{ background: f.color }}>
            <JsonLd data={medicalWebPage({ name: `${f.name}（${f.en}）`, description: f.tagline, path: `/foods/${slug}` })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '食べ物', path: '/foods' }, { name: f.name, path: `/foods/${slug}` }])} />
            {/* Decorative illustrations */}
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <article className="max-w-[800px] mx-auto px-6 md:px-4 py-12 md:py-24 relative" style={{ zIndex: 1 }}>
                <header className="mb-12">
                    <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '食べ物', href: '/foods' }, { name: f.name }]} />
                    <div className="text-xs tracking-widest text-[#1A1A1A]/50 font-mono mb-4">
                        {f.category}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-2">
                        <span className="mr-2" aria-hidden>{f.emoji}</span>{f.name}
                    </h1>
                    <p className="text-sm text-[#1A1A1A]/60 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{f.en}</p>
                    <p className="text-lg md:text-xl text-[#1A1A1A] font-medium leading-relaxed">
                        {f.tagline}
                    </p>
                </header>

                {/* どんな食材か */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                        {f.name} はどんな食べ物？
                    </h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">{f.description}</p>
                </section>

                {/* 摂れる栄養素（栄養素ページへ相互リンク） */}
                {nutrients.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                            {f.name} で摂れる栄養素
                        </h2>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                            それぞれの栄養素ページで、働き・不足のサイン・関わる遺伝子や血液検査まで深く読み解けます。
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {nutrients.map((n) => (
                                <Link
                                    key={n.slug}
                                    href={`/nutrients/${n.slug}`}
                                    className="flex items-center gap-3 p-4 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70"
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

                {/* 食べ方のヒント */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 border-l-4 border-[#41C9B4] pl-3 leading-tight">
                        {f.name} の食べ方・組み合わせのヒント
                    </h2>
                    <ul className="space-y-3">
                        {f.tips.map((tip, i) => (
                            <li key={i} className="flex gap-3 p-4 bg-white/70 rounded-xl text-[#1A1A1A]">
                                <span className="font-bold text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0{i + 1}</span>
                                <span className="text-sm leading-relaxed">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">もっと学ぶ</h2>
                    <p className="text-sm text-[#4A4A4A] mb-4 leading-relaxed">栄養がどう働くのか、その「しくみ」や血液検査ともつなげてどうぞ。</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/nutrients', label: '栄養素' },
                            { href: '/mitochondria', label: 'ミトコンドリア' },
                            { href: '/biomarkers', label: '血液検査' },
                            { href: '/blood-sugar', label: '血糖コントロール' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Disclaimer */}
                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本記事は一般的な栄養情報であり、診断や治療、特定の食事法の推奨を目的とするものではありません。持病・アレルギー・服薬中の方は、食事の大きな変更前に医療専門家にご相談ください。
                </p>

                {/* 同カテゴリの他の食材 */}
                {sameCategory.length > 0 && (
                    <div className="mt-12 pt-12 border-t border-[#1A1A1A]/15">
                        <h2 className="text-xl font-bold text-center mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {f.category}の他の食べ物
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {sameCategory.map((x) => (
                                <Link
                                    key={x.slug}
                                    href={`/foods/${x.slug}`}
                                    className="px-4 py-3 text-center rounded-lg border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all text-sm font-bold text-[#1A1A1A]"
                                    style={{ background: x.color }}
                                >
                                    <span className="mr-1" aria-hidden>{x.emoji}</span>{x.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-12 text-center flex flex-wrap justify-center gap-3">
                    <Link
                        href="/foods"
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
