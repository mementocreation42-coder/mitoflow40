'use client';

// 教科書の読み進み（端末内・localStorage）。アカウント不要、送信しない。
import { useSyncExternalStore, useCallback } from 'react';
import { readingPaths, type ReadingPath } from './paths';

const KEY = 'mf:textbook:v1';
const EMPTY = '{"read":{},"days":[]}';

export interface Progress {
    read: Record<string, string>; // href → ISO 日時
    days: string[];               // 読んだ日（YYYY-MM-DD）
}

const listeners = new Set<() => void>();
function emit() { listeners.forEach((l) => l()); }
function subscribe(l: () => void) {
    listeners.add(l);
    const onStorage = (e: StorageEvent) => { if (e.key === KEY) l(); };
    window.addEventListener('storage', onStorage);
    return () => { listeners.delete(l); window.removeEventListener('storage', onStorage); };
}
function getSnapshot(): string { try { return localStorage.getItem(KEY) ?? EMPTY; } catch { return EMPTY; } }
function getServerSnapshot(): string { return EMPTY; }
function parse(raw: string): Progress {
    try { const p = JSON.parse(raw); return { read: p.read ?? {}, days: Array.isArray(p.days) ? p.days : [] }; } catch { return { read: {}, days: [] }; }
}
function write(p: Progress) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ } emit(); }
function today(): string { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

export function chapterStats(path: ReadingPath, read: Record<string, string>) {
    const done = path.steps.filter((s) => read[s.href]).length;
    return { done, total: path.steps.length, complete: done === path.steps.length, next: path.steps.find((s) => !read[s.href]) ?? null };
}

export function streakOf(days: string[]): number {
    if (!days.length) return 0;
    const set = new Set(days);
    const d = new Date(); d.setHours(0, 0, 0, 0);
    const fmt = (x: Date) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
    if (!set.has(fmt(d))) d.setDate(d.getDate() - 1); // 今日まだ読んでいなくても、昨日までの連続は保つ
    let n = 0;
    while (set.has(fmt(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
}

// 称号：修了した章の数で決まる
export const TITLES = ['読者', '見習い', '読み手', '読み解き手', '整える人'] as const;
export function titleFor(completedChapters: number): string { return TITLES[Math.min(completedChapters, TITLES.length - 1)]; }

export function useTextbookProgress() {
    const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const progress = parse(raw);

    const markRead = useCallback((href: string): { added: boolean; progress: Progress } => {
        const p = parse(getSnapshot());
        if (p.read[href]) return { added: false, progress: p };
        p.read[href] = new Date().toISOString();
        const t = today(); if (!p.days.includes(t)) p.days.push(t);
        write(p); return { added: true, progress: p };
    }, []);
    const unmark = useCallback((href: string) => { const p = parse(getSnapshot()); delete p.read[href]; write(p); }, []);
    const reset = useCallback(() => { write({ read: {}, days: [] }); }, []);

    const completed = readingPaths.filter((c) => chapterStats(c, progress.read).complete).length;
    const totalSteps = readingPaths.reduce((a, c) => a + c.steps.length, 0);
    const totalRead = readingPaths.reduce((a, c) => a + chapterStats(c, progress.read).done, 0);

    return { progress, markRead, unmark, reset, completed, totalSteps, totalRead, streak: streakOf(progress.days), title: titleFor(completed) };
}
