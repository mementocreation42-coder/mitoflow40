'use client';

// 食事記録（端末内・localStorage）。アカウント不要、送信しない。
// 写真だけは容量の都合で IndexedDB（lib/meal-photos.ts）に置き、ここには写真の ID だけを持つ。
import { useSyncExternalStore, useCallback } from 'react';
import { deletePhotos, getPhoto } from './meal-photos';
import { makeZip } from './zip';
import { DEFAULT_PROFILE, NUTRIENTS, displayName, fmt, totalsOf, type FoodDb, type Profile } from './nutrition';

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
    items: MealItem[]; // 成分表の食品と量
}

export interface MealItem {
    id: string;
    code: string;  // 食品番号（日本食品標準成分表）
    name: string;  // 記録した時点の食品名
    grams: number;
}

function newId(prefix = ''): string {
    return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
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
        return Array.isArray(v) ? v.map((m) => ({ ...m, photos: Array.isArray(m.photos) ? m.photos : [], items: Array.isArray(m.items) ? m.items : [] })) : [];
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
function csv(rows: string[][]): string {
    return '\uFEFF' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n') + '\r\n';
}

const NUTRIENT_HEADERS = NUTRIENTS.map((n) => `${n.label}(${n.unit})`);

// 提出用：1 食 1 行。必須項目（日付・食事のタイプ・食事内容）を先頭に、任意の食事量・特記事項を続ける。
// 同じ日・同じ区分の記録は 1 行にまとめる。写真は提出の対象外なので入れない。
export function toSubmissionCsv(meals: Meal[], db: FoodDb | null): string {
    const rows = [['日付', '食事のタイプ', '食事内容', '時刻', '食事量', '特記事項']];
    const groups = new Map<string, Meal[]>();
    for (const m of ascending(meals)) {
        const key = `${m.date}|${m.type}`;
        groups.set(key, [...(groups.get(key) ?? []), m]);
    }
    const sorted = [...groups.values()].sort((a, b) =>
        a[0].date.localeCompare(b[0].date) || MEAL_TYPES.indexOf(a[0].type) - MEAL_TYPES.indexOf(b[0].type));
    for (const list of sorted) {
        const items = list.flatMap((m) => m.items);
        const content = [
            ...items.map((it) => `${displayName(it.name)}（${it.grams}g）`),
            ...list.map((m) => m.food).filter(Boolean),
        ].join('、');
        const grams = items.reduce((n, it) => n + it.grams, 0);
        const kcal = totalsOf(db, items).values.kcal;
        const amount = items.length ? `${Math.round(grams)}g${db ? `・${Math.round(kcal)}kcal` : ''}` : '';
        rows.push([
            list[0].date, list[0].type, content,
            list.map((m) => m.time).filter(Boolean).join('・'),
            amount,
            list.map((m) => m.memo).filter(Boolean).join('／'),
        ]);
    }
    return csv(rows);
}

// 食べた食品ごとに 1 行（Cronometer の servings に相当）。
// 成分表の食品がない記録は 1 行にまとめ、自由記述・メモ・写真は各記録の最初の行に入れる。
export function toServingsCsv(meals: Meal[], db: FoodDb | null): string {
    const names = photoNames(meals);
    const rows = [['日付', '時刻', '区分', '食品番号', '食品名', '量(g)', ...NUTRIENT_HEADERS, '内容(自由記述)', 'メモ', '写真']];
    for (const m of ascending(meals)) {
        const extra = [m.food, m.memo, m.photos.map((id) => names.get(id)!).join(' ')];
        if (!m.items.length) {
            rows.push([m.date, m.time, m.type, '', '', '', ...NUTRIENTS.map(() => ''), ...extra]);
            continue;
        }
        m.items.forEach((it, i) => {
            const t = totalsOf(db, [it]);
            const f = db?.byCode.get(it.code);
            rows.push([m.date, m.time, m.type, it.code, displayName(it.name), String(it.grams),
                ...NUTRIENTS.map((n) => (f && f.values[n.key] == null ? '' : fmt(t.values[n.key], n.digits).replace(/,/g, ''))),
                ...(i === 0 ? extra : ['', '', ''])]);
        });
    }
    return csv(rows);
}

// 1 日 1 行の栄養合計（Cronometer の daily summary に相当）
export function toDailyCsv(meals: Meal[], db: FoodDb | null): string {
    const rows = [['日付', '記録数', ...NUTRIENT_HEADERS]];
    const byDate = new Map<string, Meal[]>();
    for (const m of ascending(meals)) byDate.set(m.date, [...(byDate.get(m.date) ?? []), m]);
    for (const [date, list] of byDate) {
        const t = totalsOf(db, list.flatMap((m) => m.items));
        rows.push([date, String(list.length), ...NUTRIENTS.map((n) => fmt(t.values[n.key], n.digits).replace(/,/g, ''))]);
    }
    return csv(rows);
}

function download(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadCsv(content: string, filename: string) {
    download(new Blob([content], { type: 'text/csv;charset=utf-8' }), `${filename}.csv`);
}

// 2 つの CSV と写真フォルダをひとつの ZIP に。CSV の「写真」列のファイル名が ZIP 内の写真と対応する。
export async function downloadZip(meals: Meal[], db: FoodDb | null, filename: string) {
    const files: { name: string; data: Blob | string }[] = [
        { name: `${filename}_foods.csv`, data: toServingsCsv(meals, db) },
        { name: `${filename}_daily.csv`, data: toDailyCsv(meals, db) },
    ];
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
            write([...list, { ...meal, id: newId() }]);
        }
    }, []);

    // その日のその区分の記録（なければ作る）に食品を足す
    const addItem = useCallback((date: string, type: MealType, code: string, name: string, grams: number) => {
        const list = parse(getSnapshot());
        const item: MealItem = { id: newId('i'), code, name, grams };
        const target = [...list].reverse().find((m) => m.date === date && m.type === type);
        if (target) {
            write(list.map((m) => (m === target ? { ...m, items: [...m.items, item] } : m)));
        } else {
            const d = new Date();
            const time = date === todayStr() ? `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}` : '';
            write([...list, { id: newId(), date, time, type, food: '', memo: '', photos: [], items: [item] }]);
        }
    }, []);

    // 量を変える（grams が null なら外す）。中身が空になった記録は消す
    const updateItem = useCallback((mealId: string, itemId: string, grams: number | null) => {
        const list = parse(getSnapshot());
        write(list.flatMap((m) => {
            if (m.id !== mealId) return [m];
            const items = grams == null ? m.items.filter((i) => i.id !== itemId) : m.items.map((i) => (i.id === itemId ? { ...i, grams } : i));
            const empty = !items.length && !m.food && !m.memo && !m.photos.length;
            return empty ? [] : [{ ...m, items }];
        }));
    }, []);

    const remove = useCallback((id: string) => {
        const list = parse(getSnapshot());
        const target = list.find((m) => m.id === id);
        if (target) void deletePhotos(target.photos);
        write(list.filter((m) => m.id !== id));
    }, []);

    return { meals, save, remove, addItem, updateItem };
}

// ===== プロフィール（目標値の計算に使う） =====

const PROFILE_KEY = 'mf:meal-log:profile:v1';
const profileListeners = new Set<() => void>();
function subscribeProfile(l: () => void) {
    profileListeners.add(l);
    const onStorage = (e: StorageEvent) => { if (e.key === PROFILE_KEY) l(); };
    window.addEventListener('storage', onStorage);
    return () => { profileListeners.delete(l); window.removeEventListener('storage', onStorage); };
}
function getProfileSnapshot(): string { try { return localStorage.getItem(PROFILE_KEY) ?? ''; } catch { return ''; } }

export function useProfile() {
    const raw = useSyncExternalStore(subscribeProfile, getProfileSnapshot, () => '');
    let profile: Profile = DEFAULT_PROFILE;
    try { if (raw) profile = { ...DEFAULT_PROFILE, ...JSON.parse(raw) }; } catch { /* ignore */ }
    const setProfile = useCallback((p: Profile) => {
        try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch { /* ignore */ }
        profileListeners.forEach((l) => l());
    }, []);
    return { profile, configured: !!raw, setProfile };
}

// 最近使った食品（新しい順・重複なし）
export function recentFoods(meals: Meal[], limit = 12): MealItem[] {
    const seen = new Set<string>();
    const out: MealItem[] = [];
    for (const m of sortMeals(meals)) {
        for (const it of [...m.items].reverse()) {
            if (seen.has(it.code)) continue;
            seen.add(it.code); out.push(it);
            if (out.length >= limit) return out;
        }
    }
    return out;
}
