'use client';

import Link from 'next/link';
import { readingPaths } from '@/lib/paths';
import { chapterStats, useTextbookProgress, TITLES } from '@/lib/textbook-progress';

// /textbook の本体（読み進みを端末内で記録する）
export default function TextbookClient() {
    const { progress, completed, totalSteps, totalRead, streak, title, reset, unmark } = useTextbookProgress();
    const pct = totalSteps ? Math.round((totalRead / totalSteps) * 100) : 0;
    const nextUnread = (() => { for (const p of readingPaths) { const s = chapterStats(p, progress.read); if (s.next) return { p, s: s.next }; } return null; })();

    return (
        <>
            {/* 進み・称号・連続日数 */}
            <section className="mb-10 rounded-2xl border border-[#1A1A1A] bg-white/70 p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 shrink-0" aria-label={`${pct}%`}>
                            <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(26,26,26,0.12)" strokeWidth="3" />
                                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#41C9B4" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${pct * 0.974} 100`} style={{ transition: 'stroke-dasharray .6s ease' }} />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{pct}%</div>
                        </div>
                        <div>
                            <p className="text-[10px] tracking-widest font-bold text-[#1A1A1A]/50" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>YOUR PROGRESS</p>
                            <p className="text-xl font-bold text-[#1A1A1A] leading-tight">{totalRead} / {totalSteps} 枚</p>
                            <p className="text-xs text-[#4A4A4A] mt-0.5">称号：<strong className="text-[#1A1A1A]">{title}</strong>{completed < 4 && <span>（次は「{TITLES[completed + 1]}」、あと {4 - completed} 章）</span>}</p>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-wrap items-center gap-2 md:justify-end">
                        {readingPaths.map((p) => {
                            const s = chapterStats(p, progress.read);
                            return (
                                <a key={p.slug} href={`#${p.slug}`} title={`${p.title} ${s.done}/${s.total}`}
                                    className="w-11 h-11 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif", background: s.complete ? p.accent : 'rgba(255,255,255,0.7)', color: s.complete ? '#fff' : 'rgba(26,26,26,0.35)', borderColor: s.complete ? '#1A1A1A' : 'rgba(26,26,26,0.2)', boxShadow: s.complete ? '0 4px 12px rgba(0,0,0,0.15)' : 'none' }}>
                                    {String(p.n).padStart(2, '0')}
                                </a>
                            );
                        })}
                        <span className="ml-1 text-xs font-bold px-3 py-1.5 rounded-full border border-[#1A1A1A]/20 bg-white/70 text-[#1A1A1A]" title="連続で読んだ日数">🔥 {streak} 日連続</span>
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    {nextUnread ? (
                        <Link href={nextUnread.s.href} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1A1A1A] text-sm font-bold" style={{ background: '#1A1A1A', color: '#fff' }}>
                            {totalRead === 0 ? '読みはじめる' : '続きから読む'}：{nextUnread.s.title} →
                        </Link>
                    ) : (
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1A1A1A] text-sm font-bold bg-[#41C9B4] text-[#1A1A1A]">全 4 章 修了。辞書へ戻って、自分の 1 枚を開く番です。</span>
                    )}
                    <span className="text-[11px] text-[#1A1A1A]/50">読み進みはこの端末の中にだけ保存され、送信されません。</span>
                    {totalRead > 0 && <button type="button" onClick={() => { if (confirm('読み進みの記録を消しますか？')) reset(); }} className="text-[11px] underline text-[#1A1A1A]/50 hover:text-[#1A1A1A]">記録を消す</button>}
                </div>
            </section>

            {/* 章の一覧 */}
            <nav aria-label="章" className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {readingPaths.map((p) => {
                    const s = chapterStats(p, progress.read);
                    return (
                        <a key={p.slug} href={`#${p.slug}`} className="flex items-center gap-3 rounded-2xl border border-[#1A1A1A] p-4 hover:-translate-y-0.5 hover:shadow transition-all" style={{ background: p.color }}>
                            <span className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: p.accent }}>{String(p.n).padStart(2, '0')}</span>
                            <span className="min-w-0 flex-1">
                                <span className="block font-bold text-[#1A1A1A] leading-tight">{p.title}</span>
                                <span className="block text-[10px] tracking-widest font-bold mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: p.accent }}>{p.en} ／ {s.done}/{s.total}</span>
                                <span className="block mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(26,26,26,0.12)' }}><span className="block h-full rounded-full" style={{ width: `${(s.done / s.total) * 100}%`, background: p.accent, transition: 'width .5s ease' }} /></span>
                            </span>
                            {s.complete && <span className="shrink-0 text-lg" aria-label="修了">🏅</span>}
                        </a>
                    );
                })}
            </nav>

            {/* 各章 */}
            {readingPaths.map((p) => {
                const s = chapterStats(p, progress.read);
                return (
                    <section key={p.slug} id={p.slug} className="mb-16 scroll-mt-24">
                        <div className="mb-4 flex items-stretch gap-3">
                            <span className="w-1.5 rounded-full" style={{ background: p.accent }} />
                            <div className="py-0.5 flex-1">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                                        <span className="text-base md:text-lg font-bold mr-3 align-middle" style={{ fontFamily: "'Space Grotesk', sans-serif", color: p.accent }}>{String(p.n).padStart(2, '0')}</span>{p.title}
                                    </h2>
                                    {s.complete ? (
                                        <span className="text-xs font-bold px-3 py-1 rounded-full border border-[#1A1A1A]" style={{ background: p.accent, color: '#fff' }}>🏅 修了</span>
                                    ) : s.done > 0 ? (
                                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/70 border border-[#1A1A1A]/20 text-[#1A1A1A]">{s.done}/{s.total} 読了</span>
                                    ) : null}
                                </div>
                                <p className="text-[10px] tracking-[0.2em] font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: p.accent, opacity: 0.7 }}>{p.en}</p>
                            </div>
                        </div>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">{p.lead}</p>

                        <ol className="rounded-2xl border border-[#1A1A1A] overflow-hidden bg-white/70">
                            {p.steps.map((st, i) => {
                                const done = !!progress.read[st.href];
                                const isNext = !done && s.next?.href === st.href;
                                return (
                                    <li key={st.href} className={i !== 0 ? 'border-t border-[#1A1A1A]/10' : ''}>
                                        <div className="group flex items-start gap-4 px-4 py-3.5 md:px-5 hover:bg-white transition-colors" style={isNext ? { background: 'rgba(255,255,255,0.9)' } : undefined}>
                                            <button type="button" onClick={() => done && unmark(st.href)} title={done ? '読了を取り消す' : '読むと自動で記録されます'}
                                                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all"
                                                style={{ fontFamily: "'Space Grotesk', sans-serif", background: done ? p.accent : 'transparent', color: done ? '#fff' : p.accent, borderColor: p.accent }}>
                                                {done ? '✓' : i + 1}
                                            </button>
                                            <Link href={st.href} className="min-w-0 flex-1">
                                                <span className="block font-bold text-[#1A1A1A] leading-snug">
                                                    {st.title}
                                                    <span className="inline-block ml-1 text-[#1A1A1A]/50 group-hover:translate-x-0.5 transition-transform">→</span>
                                                    {isNext && <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: p.accent, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>NEXT</span>}
                                                </span>
                                                <span className="block text-xs md:text-sm text-[#4A4A4A] leading-snug mt-0.5">{st.why}</span>
                                            </Link>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>

                    </section>
                );
            })}
        </>
    );
}
