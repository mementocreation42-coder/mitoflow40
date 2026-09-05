import Link from 'next/link';
import { notFound } from 'next/navigation';
import { conditions, getConditionBySlug, type SectionKind } from '@/lib/conditions';
import { resolveCondition } from '@/lib/related';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnalysisCta from '@/components/AnalysisCta';

export function generateStaticParams() {
    return conditions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const c = getConditionBySlug(slug);
    if (!c) return {};
    const description = `${c.name}（${c.en}）とは何か。${c.tagline}。定義・歴史・細胞レベルのしくみ・確認したい血液検査・関わる栄養素・暮らしの打ち手・受診の目安を、精密栄養学の視点で解説します。`;
    const title = `${c.name}とは | 不調・現代病 | Mitoflow40`;
    return {
        title,
        description,
        alternates: { canonical: `https://mitoflow40.com/conditions/${slug}` },
        robots: { index: true, follow: true },
        openGraph: { siteName: 'Mitoflow40', locale: 'ja_JP', title, description, url: `https://mitoflow40.com/conditions/${slug}`, type: 'article' },
    };
}

const KIND_BADGE: Record<SectionKind, { label: string; bg: string; fg: string } | null> = {
    evidence: { label: 'EVIDENCE · 比較的確かなこと', bg: '#D5F5EC', fg: '#1E7D4F' },
    neutral: { label: 'NEUTRAL · 根拠は未確立', bg: '#FFF4E0', fg: '#8A5A00' },
    history: { label: 'HISTORY · 歴史から問い直す', bg: '#E7E0F2', fg: '#5B3F8A' },
    core: { label: 'CORE · 細胞とATPの側から', bg: '#FFE9D6', fg: '#9A4A12' },
    plain: null,
};

const h2 = 'text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight';
const card = 'flex items-center gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70';
const chip = 'flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]';

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const c = getConditionBySlug(slug);
    if (!c) notFound();
    const rel = resolveCondition(c);

    return (
        <div className="pt-[60px] min-h-screen relative overflow-hidden" style={{ background: c.color }}>
            <JsonLd data={medicalWebPage({ name: `${c.name}とは`, description: c.tagline, path: `/conditions/${slug}` })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '不調・現代病', path: '/conditions' }, { name: c.name, path: `/conditions/${slug}` }])} />
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <article className="max-w-[800px] mx-auto px-6 md:px-4 py-12 md:py-24 relative" style={{ zIndex: 1 }}>
                <header className="mb-12">
                    <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '不調・現代病', href: '/conditions' }, { name: c.name }]} />
                    <div className="text-xs tracking-widest text-[#1A1A1A]/50 font-mono mb-4">CONDITIONS ／ {c.category}</div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-2">{c.name}</h1>
                    <p className="text-sm text-[#1A1A1A]/60 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c.en}{c.reading ? ` ／ ${c.reading}` : ''}</p>
                    <p className="text-lg md:text-xl text-[#1A1A1A] font-medium leading-relaxed mb-6">{c.tagline}</p>
                    <div className="rounded-2xl border border-[#1A1A1A] bg-white/70 p-5">
                        <p className="text-[10px] tracking-widest font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>THIS PAGE&apos;S ANGLE · このページの切り口</p>
                        <p className="text-sm text-[#1A1A1A] leading-relaxed">{c.uniqueAngle}</p>
                    </div>
                </header>

                <section className="mb-12">
                    <h2 className={h2}>{c.name}とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">{c.summary}</p>
                </section>

                <section className="mb-12">
                    <h2 className={h2}>こんなサインがあれば</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {c.signs.map((s, i) => (
                            <li key={i} className="flex gap-3 text-[#4A4A4A] p-3 bg-white/60 rounded-xl text-sm">
                                <span className="text-[#41C9B4] flex-shrink-0">●</span>
                                <span>{s}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {c.sections.map((s, i) => {
                    const badge = KIND_BADGE[s.kind ?? 'plain'];
                    return (
                        <section key={i} className="mb-12">
                            {badge && (
                                <span className="inline-block mb-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider" style={{ background: badge.bg, color: badge.fg, fontFamily: "'Space Grotesk', sans-serif" }}>{badge.label}</span>
                            )}
                            <h2 className={h2}>{s.heading}</h2>
                            <div className="text-[#4A4A4A] leading-loose space-y-4">
                                {s.body.split('\n\n').map((p, j) => <p key={j}>{p}</p>)}
                            </div>
                        </section>
                    );
                })}

                {rel.biomarkers.length > 0 && (
                    <section className="mb-12">
                        <h2 className={h2}>確認したい血液検査</h2>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">この状態を「あたり」から「確かめる」に進めるための指標です。各項目で基準値・理想値を確認できます。</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {rel.biomarkers.map((b) => (
                                <Link key={b.slug} href={`/biomarkers/${b.slug}`} className={card}>
                                    <span className={chip} style={{ background: b.color }}>{b.name}</span>
                                    <span className="text-xs text-[#4A4A4A] leading-snug">{b.tagline}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {(rel.nutrients.length > 0 || rel.foods.length > 0) && (
                    <section className="mb-12">
                        <h2 className={h2}>関わる栄養素と食材</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {rel.nutrients.map((n) => (
                                <Link key={n.slug} href={`/nutrients/${n.slug}`} className={card}>
                                    <span className={chip} style={{ background: n.color }}>{n.name}</span>
                                    <span className="text-xs text-[#4A4A4A] leading-snug">{n.tagline}</span>
                                </Link>
                            ))}
                        </div>
                        {rel.foods.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {rel.foods.map((f) => (
                                    <Link key={f.slug} href={`/foods/${f.slug}`} className="px-4 py-2 rounded-full border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors" style={{ background: f.color }}>
                                        {f.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {rel.symptoms.length > 0 && (
                    <section className="mb-12">
                        <h2 className={h2}>出やすい症状（逆引き）</h2>
                        <div className="flex flex-wrap gap-2">
                            {rel.symptoms.map((s) => (
                                <Link key={s.slug} href={`/symptoms/${s.slug}`} className="px-4 py-2 rounded-full border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors" style={{ background: s.color }}>
                                    {s.name} →
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 border-l-4 border-[#41C9B4] pl-3 leading-tight">暮らしの打ち手</h2>
                    <ul className="space-y-3">
                        {c.selfCare.map((tip, i) => (
                            <li key={i} className="flex gap-3 p-4 bg-white/70 rounded-xl text-[#1A1A1A]">
                                <span className="font-bold text-[#41C9B4] flex-shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0{i + 1}</span>
                                <span className="text-sm leading-relaxed">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-12 rounded-2xl border border-[#1A1A1A] bg-white/80 p-6">
                    <p className="text-[10px] tracking-widest font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#C0392B' }}>WHEN TO SEE A DOCTOR · 受診の目安</p>
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">こんなときは医療機関へ</h2>
                    <ul className="space-y-2">
                        {c.whenToSeeDoctor.map((w, i) => (
                            <li key={i} className="flex gap-3 text-sm text-[#4A4A4A]">
                                <span className="text-[#C0392B] flex-shrink-0">●</span>
                                <span>{w}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/70 mt-4 leading-relaxed">必要な医療を遠ざけないこと。このページは一般的な情報提供であり、診断・治療を代替しません。判断の主役はあなた自身ですが、迷ったら受診を選んでください。</p>
                </section>

                <AnalysisCta variant="condition" />

                {c.relatedLinks.length > 0 && (
                    <section className="mb-12">
                        <h2 className={h2}>関連する体のしくみ</h2>
                        <div className="flex flex-wrap gap-2">
                            {c.relatedLinks.map((l) => (
                                <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                    {l.label} →
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <section className="mb-12">
                    <h2 className="text-base font-bold text-[#1A1A1A] mb-3">参考文献・出典</h2>
                    <ol className="list-decimal pl-5 space-y-1.5 text-xs text-[#4A4A4A] leading-relaxed">
                        {c.references.map((r, i) => (
                            <li key={i}>
                                {r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1A1A1A]">{r.title}</a> : r.title}
                                {r.note && <span className="text-[#4A4A4A]/70">（{r.note}）</span>}
                            </li>
                        ))}
                    </ol>
                    <p className="text-[11px] text-[#4A4A4A]/60 mt-3">最終更新 {c.updatedAt}</p>
                </section>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本記事は一般的な情報提供を目的としており、診断・治療・医療行為を構成するものではありません。症状が続く・強い・急に現れた場合は、自己判断せず医療機関を受診してください。
                </p>

                {rel.others.length > 0 && (
                    <div className="mt-12 pt-12 border-t border-[#1A1A1A]/15">
                        <h2 className="text-xl font-bold text-center mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>OTHER CONDITIONS</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {rel.others.map((x) => (
                                <Link key={x.slug} href={`/conditions/${x.slug}`}
                                    className="px-4 py-3 text-center rounded-lg border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all text-sm font-bold text-[#1A1A1A]"
                                    style={{ background: x.color }}>
                                    {x.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-12 text-center flex flex-wrap justify-center gap-3">
                    <Link href="/conditions" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-[#1A1A1A] rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
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
