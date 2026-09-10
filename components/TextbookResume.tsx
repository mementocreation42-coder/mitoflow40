'use client';

import Link from 'next/link';
import { readingPaths } from '@/lib/paths';
import { chapterStats, useTextbookProgress } from '@/lib/textbook-progress';

// ライブラリのトップに置く「続き」の帯。ポップアップではなくページの一部。
// 読み進みが無い人には何も出さない。教科書の外（各項目ページ）には出さない。
export default function TextbookResume() {
    const { progress, totalRead, totalSteps, completed } = useTextbookProgress();
    if (totalRead === 0) return null;

    // いま読みかけの章（読了があり、未読が残る章）→ 無ければ次の未着手の章
    const current = readingPaths.map((p) => ({ p, s: chapterStats(p, progress.read) })).find((x) => x.s.done > 0 && !x.s.complete)
        ?? readingPaths.map((p) => ({ p, s: chapterStats(p, progress.read) })).find((x) => x.s.next);

    if (!current) {
        return (
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#1A1A1A] px-4 py-3 bg-white/70">
                <p className="text-sm font-bold text-[#1A1A1A]">📖 教科書 全 4 章 修了。ここからは辞書として、自分の 1 枚を開く番です。</p>
                <Link href="/textbook" className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">バッジを見る →</Link>
            </div>
        );
    }

    const { p, s } = current;
    const next = s.next!;
    return (
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-[#1A1A1A] px-4 py-3" style={{ background: p.color }}>
            <span className="shrink-0 text-[10px] font-bold tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif", color: p.accent }}>TEXTBOOK {String(p.n).padStart(2, '0')}</span>
            <p className="flex-1 min-w-[12rem] text-sm text-[#1A1A1A]">
                「{p.title}」を <strong>{s.done}/{s.total}</strong> まで読んでいます
                <span className="text-[#1A1A1A]/60">（全体 {totalRead}/{totalSteps} 枚・修了 {completed} 章）</span>
            </p>
            <div className="flex items-center gap-2">
                <Link href={next.href} className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full border text-sm font-bold hover:opacity-90 transition-opacity" style={{ background: p.accent, borderColor: p.accent, color: '#fff' }}>
                    続き：{next.title} →
                </Link>
                <Link href="/textbook" className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/80 border border-[#1A1A1A]/30 text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">教科書</Link>
            </div>
        </div>
    );
}
