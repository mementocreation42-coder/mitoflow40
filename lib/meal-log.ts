'use client';

// 食事記録（端末内・localStorage）。アカウント不要、送信しない。
// 写真だけは容量の都合で IndexedDB（lib/meal-photos.ts）に置き、ここには写真の ID だけを持つ。
import { useSyncExternalStore, useCallback } from 'react';
import { deletePhotos, getPhoto } from './meal-photos';
import { makeZip } from './zip';

const KEY = 'mf:meal-log:v1';
const EMPTY = '[]';

export const MEAL_TYPES = ['朝食', '昼食', '夕食', '間食'] as const;
export type MealType = (typeof MEAL_TYPES)[number];

export interface Meal {
    id: string;
    date: string;   // YYYY-MM-DD
    time: string;   // HH:MM（空でもよい）
    type: MealType;
    food: string;   // 食べたもの
    memo: string;   // 体調・気づきなど
    photos: string[]; // 写真の ID（IndexedDB のキー）
}

const TYPE_EN: Record<MealType, string> = { 朝食: 'breakfast', 昼食: 'lunch', 夕食: 'dinner', 間食: 'snack' };

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
function parse(raw: string): Meal[] {
    try {
        const v = JSON.parse(raw);
        return Array.isArray(v) ? v.map((m) => ({ ...m, photos: Array.isArray(m.photos) ? m.photos : [] })) : [];
    } catch { return []; }
}
function write(meals: Meal[]) { try { localStorage.setItem(KEY, JSON.stringify(meals)); } catch { /* ignore */ } emit(); }

// 日付の新しい順、同じ日は時刻→区分の順
export function sortMeals(meals: Meal[]): Meal[] {
    return [...meals].sort((a, b) =>
        b.date.localeCompare(a.date)
        || (a.time || '99:99').localeCompare(b.time || '99:99')
        || MEAL_TYPES.indexOf(a.type) - MEAL_TYPES.indexOf(b.type));
}

export function todayStr(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function csvCell(v: string): string {
    return /[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

// 古い日付から（同じ日は時刻順）
function ascending(meals: Meal[]): Meal[] {
    return sortMeals(meals).sort((a, b) => a.date.localeCompare(b.date)); // 日付だけ昇順に（同日内の順は保つ）
}

// 写真 ID → 書き出し時のファイル名（例：photos/2026-10-10_0743_breakfast_1.jpg）
function photoNames(meals: Meal[]): Map<string, string> {
    const names = new Map<string, string>();
    const used = new Set<string>();
    for (const m of ascending(meals)) {
        const base = `${m.date}_${m.time.replace(':', '') || '0000'}_${TYPE_EN[m.type]}`;
        let n = 1;
        for (const id of m.photos) {
            while (used.has(`${base}_${n}`)) n++;
            used.add(`${base}_${n}`);
            names.set(id, `photos/${base}_${n}.jpg`);
        }
    }
    return names;
}

// Excel で文字化けしないよう BOM 付き UTF-8、改行は CRLF。
export function toCsv(meals: Meal[]): string {
    const names = photoNames(meals);
    const rows = [['日付', '時刻', '区分', '食べたもの', 'メモ', '写真']];
    for (const m of ascending(meals)) {
        rows.push([m.date, m.time, m.type, m.food, m.memo, m.photos.map((id) => names.get(id)!).join(' ')]);
    }
    return '\uFEFF' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n') + '\r\n';
}

function download(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadCsv(meals: Meal[], filename: string) {
    download(new Blob([toCsv(meals)], { type: 'text/csv;charset=utf-8' }), `${filename}.csv`);
}

// CSV と写真フォルダをひとつの ZIP に。CSV の「写真」列のファイル名が ZIP 内の写真と対応する。
export async function downloadZip(meals: Meal[], filename: string) {
    const files: { name: string; data: Blob | string }[] = [{ name: `${filename}.csv`, data: toCsv(meals) }];
    for (const [id, name] of photoNames(meals)) {
        const blob = await getPhoto(id);
        if (blob) files.push({ name, data: blob });
    }
    download(await makeZip(files), `${filename}.zip`);
}

export function useMealLog() {
    const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const meals = parse(raw);

    const save = useCallback((meal: Omit<Meal, 'id'> & { id?: string }) => {
        const list = parse(getSnapshot());
        if (meal.id) {
            const prev = list.find((m) => m.id === meal.id);
            if (prev) void deletePhotos(prev.photos.filter((p) => !meal.photos.includes(p))); // 外した写真を消す
            write(list.map((m) => (m.id === meal.id ? { ...m, ...meal, id: m.id } : m)));
        } else {
            const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
            write([...list, { ...meal, id }]);
        }
    }, []);

    const remove = useCallback((id: string) => {
        const list = parse(getSnapshot());
        const target = list.find((m) => m.id === id);
        if (target) void deletePhotos(target.photos);
        write(list.filter((m) => m.id !== id));
    }, []);

    return { meals, save, remove };
}
