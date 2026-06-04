import Link from 'next/link';
import { notFound } from 'next/navigation';
import { essays, getEssayBySlug } from '@/lib/essays';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
    return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const e = getEssayBySlug(slug);
    if (!e) return {};
    return {
        title: `${e.title} ｜ 思索 | Mitoflow40`,
        description: e.tagline,
        alternates: { canonical: `https://mitoflow40.com/thoughts/${slug}` },
        openGraph: {
            title: `${e.title} ｜ 思索 | Mitoflow40`,
            description: e.tagline,
            url: `https://mitoflow40.com/thoughts/${slug}`,
            type: 'article',
        },
    };
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const e = getEssayBySlug(slug);
    if (!e) notFound();

    const others = essays.filter((x) => x.slug !== e.slug);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: e.color }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: e.title, description: e.tagline, path: `/thoughts/${slug}` })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '思索', path: '/thoughts' }, { name: e.title, path: `/thoughts/${slug}` }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '思索', href: '/thoughts' }, { name: e.title }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        THOUGHTS · {e.en}
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {e.title}
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[640px] mx-auto text-left">
                        {e.lead}
                    </p>
                </header>

                {e.sections.map((s) => (
                    <section key={s.heading} className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">{s.heading}</h2>
                        <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">{s.body}</p>
                    </section>
                ))}

                {/* 締め */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#1A1A1A' }}>
                    <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Mitoflow40の視点</h2>
                    <p className="text-white/90 leading-loose whitespace-pre-line">{e.closing}</p>
                </section>

                {/* 体・健康への導線 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">体の側から読み進める</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                        この問いは、体のしくみとつながっています。あわせてどうぞ。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {e.related.map((l) => (
                            <Link key={l.href} href={l.href}
                                className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 他の思索 */}
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-4 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>他の思索</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {others.map((o) => (
                            <Link key={o.slug} href={`/thoughts/${o.slug}`}
                                className="group rounded-2xl border border-black p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: o.color }}>
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{o.en}</div>
                                <div className="font-bold text-[#1A1A1A]">{o.title}</div>
                            </Link>
                        ))}
                    </div>
                </section>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/thoughts" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← 思索 一覧へ
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
