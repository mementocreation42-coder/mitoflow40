'use client';

// 食事記録の控えをサイト（/api/meal-log/backup）に預ける。
// 端末ごとに復元コードを 1 つ作り、記録が変わるたびに少し待ってから自動で送る。
// 記録が 0 件のときは送らない（新しい端末の空の記録で、控えを上書きしないため）。
import { useCallback, useEffect, useRef, useState } from 'react';
import { getMemoryForBackup, getStoolsForBackup, mergeMeals, mergeMemory, mergeStools, type Meal, type Stool } from './meal-log';

const KEY = 'mf:meal-log:backup:v1';
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // I・O・0・1 を除く

export interface BackupState { code: string; lastAt: string | null; lastCount: number; error: string | null }

function newCode(): string {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
}

function load(): BackupState {
    try {
        const v = JSON.parse(localStorage.getItem(KEY) || 'null');
        if (v && typeof v.code === 'string' && v.code.length === 16) return { code: v.code, lastAt: v.lastAt ?? null, lastCount: v.lastCount ?? 0, error: null };
    } catch { /* ignore */ }
    const s: BackupState = { code: newCode(), lastAt: null, lastCount: 0, error: null };
    save(s);
    return s;
}
function save(s: BackupState) {
    try { localStorage.setItem(KEY, JSON.stringify({ code: s.code, lastAt: s.lastAt, lastCount: s.lastCount })); } catch { /* ignore */ }
}

export function formatCode(code: string): string {
    return code.replace(/(.{4})(?=.)/g, '$1-');
}

async function call(body: object, keepalive = false) {
    const res = await fetch('/api/meal-log/backup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive });
    const data = await res.json().catch(() => ({ ok: false, error: '通信に失敗しました' }));
    if (!res.ok || !data.ok) throw new Error(data.error || '通信に失敗しました');
    return data;
}

export function useBackup(meals: Meal[], stools: Stool[] = []) {
    const [state, setState] = useState<BackupState | null>(null);
    const [busy, setBusy] = useState(false);
    const mealsRef = useRef(meals);
    mealsRef.current = meals;
    const stoolsRef = useRef(stools);
    stoolsRef.current = stools;
    const sentRef = useRef<string>('');

    useEffect(() => { setState(load()); }, []);

    const backupNow = useCallback(async (keepalive = false) => {
        const s = load();
        const list = mealsRef.current;
        const st = stoolsRef.current;
        if (!list.length && !st.length) return;
        const sig = JSON.stringify([list, st]);
        if (keepalive && sig === sentRef.current) return;
        try {
            const r = await call({ action: 'save', code: s.code, meals: list, stools: getStoolsForBackup(), memory: getMemoryForBackup() }, keepalive);
            sentRef.current = sig;
            const next = { ...s, lastAt: r.savedAt, lastCount: r.count, error: null };
            save(next); setState(next);
        } catch (e) {
            setState({ ...s, error: e instanceof Error ? e.message : '保存できませんでした' });
        }
    }, []);

    // 記録が変わったら 4 秒待って送る
    useEffect(() => {
        if (!meals.length && !stools.length) return;
        const sig = JSON.stringify([meals, stools]);
        if (sig === sentRef.current) return;
        const t = setTimeout(() => { backupNow(); }, 4000);
        return () => clearTimeout(t);
    }, [meals, stools, backupNow]);

    // アプリを閉じる・切り替えるときにも送る
    useEffect(() => {
        const onHide = () => { if (document.visibilityState === 'hidden') backupNow(true); };
        document.addEventListener('visibilitychange', onHide);
        return () => document.removeEventListener('visibilitychange', onHide);
    }, [backupNow]);

    // 別の端末のコードで戻す。いまの記録は消さずに合わせ、以後はそのコードに保存する。
    const restore = useCallback(async (input: string): Promise<string> => {
        const code = input.replace(/[-\s]/g, '').toUpperCase();
        setBusy(true);
        try {
            const r = await call({ action: 'restore', code });
            const added = mergeMeals(r.meals ?? []);
            const addedStools = mergeStools(r.stools ?? []);
            mergeMemory(r.memory ?? {});
            const next: BackupState = { code, lastAt: r.savedAt ?? null, lastCount: r.count ?? 0, error: null };
            save(next); setState(next); sentRef.current = '';
            return `食事 ${added} 件、便 ${addedStools} 件の記録を戻しました。`;
        } finally { setBusy(false); }
    }, []);

    return { state, busy, backupNow: () => backupNow(false), restore };
}
