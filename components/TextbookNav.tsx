'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { findStep } from '@/lib/paths';
import { chapterStats, useTextbookProgress } from '@/lib/textbook-progress';

// 教科書（読む順）に含まれるページの下部に出す「前へ／次へ」＋読み進みの記録。
// ページ本体は書き換えず、layout から 1 か所で差し込む。
export default function TextbookNav() {
    const pathname = usePathname();
    const hit = pathname ? findStep(pathname) : null;
    const { progress, markRead, unmark } = useTextbookProgress();
    const [justRead, setJustRead] = useState(false);
    const [celebrate, setCelebrate] = useState<null | 'chapter'>(null);
    const armed = useRef(false);

    const href = hit?.path.steps[hit.index]?.href ?? '';
    const isRead = !!progress.read[href];

    // 読了：記録して、章が読み切れていたら演出を出す（判定は保存直後の実データで）
    const completeRef = useRef<() => void>(() => {});
    const complete = () => {
        if (!hit) return;
        const { added, progress: fresh } = markRead(href);
        if (!added) return;
        setJustRead(true); setTimeout(() => setJustRead(false), 1600);
        if (chapterStats(hit.path, fresh.read).complete) setCelebrate('chapter');
    };
    useEffect(() => { completeRef.current = complete; });

    // 読了の判定：6 割までスクロールし、かつ少し読み進めた（150px 以上）か、20 秒とどまった
    useEffect(() => {
        if (!hit || isRead) return;
        armed.current = true;
        const ratio = () => (window.scrollY + window.innerHeight) / Math.max(document.documentElement.scrollHeight, 1);
        const onScroll = () => {
            if (!armed.current) return;
            if (ratio() >= 0.6 && window.scrollY > 150) { armed.current = false; completeRef.current(); }
        };
        const timer = window.setTimeout(() => { if (armed.current && ratio() >= 0.6) { armed.current = false; completeRef.current(); } }, 20000);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { armed.current = false; window.clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
    }, [href, isRead, hit]);

    if (!hit) return null;
    const { path, index } = hit;
    const prev = index > 0 ? path.steps[index - 1] : null;
    const next = index < path.steps.length - 1 ? path.steps[index + 1] : null;
    const stats = chapterStats(path, progress.read);


    return (
        <>
            {celebrate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(26,26,26,0.35)', backdropFilter: 'blur(6px)' }} onClick={() => setCelebrate(null)}>
                    <div className="relative w-full max-w-[420px] rounded-3xl border-2 border-[#1A1A1A] p-7 text-center shadow-2xl" style={{ background: path.color, animation: 'mf-tb-pop .35s cubic-bezier(.2,.9,.3,1.2)' }} onClick={(e) => e.stopPropagation()}>
                        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none" aria-hidden>
                            {['🎉', '✨', '⚡', '🧬', '✨', '🎉', '⚡', '✨'].map((e, i) => (
                                <span key={i} className="absolute text-2xl" style={{ left: `${8 + i * 12}%`, top: '60%', animation: `mf-burst 1.4s ${i * 0.08}s ease-out forwards` }}>{e}</span>
                            ))}
                        </div>
                        <p className="text-[10px] tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: path.accent }}>CHAPTER {String(path.n).padStart(2, '0')} COMPLETE</p>
                        <div className="mx-auto mb-3 w-16 h-16 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center text-2xl font-bold" style={{ background: path.accent, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>{String(path.n).padStart(2, '0')}</div>
                        <h2 className="text-xl font-bold text-[#1A1A1A] mb-1">「{path.title}」修了</h2>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">{path.steps.length} 枚を通しで読みました。教科書にバッジが灯ります。</p>
                        <div className="flex justify-center gap-2">
                            <Link href={`/textbook#${path.slug}`} className="px-4 py-2 rounded-full border border-[#1A1A1A] text-sm font-bold" style={{ background: '#1A1A1A', color: '#fff' }}>教科書でバッジを見る →</Link>
                            <button type="button" onClick={() => setCelebrate(null)} className="px-4 py-2 rounded-full border border-[#1A1A1A] bg-white text-sm font-bold text-[#1A1A1A]">閉じる</button>
                        </div>
                    </div>
                </div>
            )}

            <nav aria-label="教科書の読む順" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-5.5rem)] max-w-[760px] print:hidden">
                <div className="rounded-2xl border border-[#1A1A1A] shadow-lg px-3 py-2 md:px-4" style={{ background: path.color }}>
                    <div className="flex items-center gap-2">
                        <Link href={`/textbook#${path.slug}`} className="hidden sm:flex flex-col shrink-0 leading-tight hover:underline">
                            <span className="text-[10px] font-bold tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif", color: path.accent }}>TEXTBOOK {String(path.n).padStart(2, '0')}</span>
                            <span className="text-xs font-bold text-[#1A1A1A]">{path.title}</span>
                        </Link>
                        {/* 進みのドット */}
                        <div className="flex items-center gap-1 shrink-0" aria-label={`${stats.done} / ${stats.total} 読了`}>
                            {path.steps.map((s, i) => {
                                const done = !!progress.read[s.href];
                                const cur = i === index;
                                return <span key={s.href} className="rounded-full" style={{ width: cur ? 10 : 7, height: cur ? 10 : 7, background: done ? path.accent : 'rgba(26,26,26,0.15)', outline: cur ? `2px solid ${path.accent}` : 'none', outlineOffset: 2, transition: 'background .3s', animation: cur && justRead ? 'mf-tb-pop .5s' : undefined }} />;
                            })}
                        </div>
                        <button type="button" onClick={() => (isRead ? unmark(href) : complete())}
                            className="shrink-0 inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border transition-colors"
                            style={isRead ? { background: path.accent, color: '#fff', borderColor: path.accent } : { background: 'rgba(255,255,255,0.7)', color: '#1A1A1A', borderColor: 'rgba(26,26,26,0.3)' }}
                            aria-pressed={isRead}>
                            {isRead ? '✓ 読んだ' : '読んだ'}
                            <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stats.done}/{stats.total}</span>
                        </button>
                        <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
                            {prev ? (
                                <Link href={prev.href} className="min-w-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#1A1A1A]/30 text-xs font-bold text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors">
                                    <span>←</span><span className="truncate max-w-[8rem]">{prev.title}</span>
                                </Link>
                            ) : (
                                <Link href="/textbook" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#1A1A1A]/30 text-xs font-bold text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors">教科書へ</Link>
                            )}
                            {next ? (
                                <Link href={next.href} className="min-w-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#1A1A1A] text-xs font-bold hover:opacity-90 transition-opacity" style={{ background: path.accent, color: '#fff' }}>
                                    <span className="truncate max-w-[8rem]">{next.title}</span><span>→</span>
                                </Link>
                            ) : (
                                <Link href={`/textbook#${path.slug}`} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#1A1A1A] text-xs font-bold" style={{ background: path.accent, color: '#fff' }}>読了。教科書へ →</Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
