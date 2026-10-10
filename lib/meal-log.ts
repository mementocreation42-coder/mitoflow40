'use client';

// 食事記録（端末内・localStorage）。アカウント不要、送信しない。
import { useSyncExternalStore, useCallback } from 'react';

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
function parse(raw: string): Meal[] {
    try { const v = JSON.parse(raw); return Array.isArray(v) ? v : []; } catch { return []; }
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

// Excel で文字化けしないよう BOM 付き UTF-8、改行は CRLF。古い日付から並べる。
export function toCsv(meals: Meal[]): string {
    const rows = [['日付', '時刻', '区分', '食べたもの', 'メモ']];
    const asc = sortMeals(meals).sort((a, b) => a.date.localeCompare(b.date)); // 日付だけ昇順に（同日内の順は保つ）
    for (const m of asc) {
        rows.push([m.date, m.time, m.type, m.food, m.memo]);
    }
    return '﻿' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n') + '\r\n';
}

export function downloadCsv(meals: Meal[], filename: string) {
    const blob = new Blob([toCsv(meals)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function useMealLog() {
    const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const meals = parse(raw);

    const save = useCallback((meal: Omit<Meal, 'id'> & { id?: string }) => {
        const list = parse(getSnapshot());
        if (meal.id) {
            write(list.map((m) => (m.id === meal.id ? { ...m, ...meal, id: m.id } : m)));
        } else {
            const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
            write([...list, { ...meal, id }]);
        }
    }, []);

    const remove = useCallback((id: string) => {
        write(parse(getSnapshot()).filter((m) => m.id !== id));
    }, []);

    return { meals, save, remove };
}
