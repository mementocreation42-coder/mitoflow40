'use client';

// 食事記録（この端末のブラウザの中だけに保存・どこにも送信しない）。
import { useSyncExternalStore, useCallback, useEffect } from 'react';

const KEY = 'mf:meal-log:v1';
const EMPTY = '[]';

export const MEAL_TYPES = ['朝食', '昼食', '夕食', '間食'] as const;
export type MealType = (typeof MEAL_TYPES)[number];

export interface Meal {
    id: string;
    date: string;   // YYYY-MM-DD
    time: string;   // HH:MM（書いた時刻。同じ日の並び順に使う）
    type: MealType;
    food: string;   // 食べたもの（1 行 1 品）
}

function newId(): string {
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
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
    try {
        const v = JSON.parse(raw);
        if (!Array.isArray(v)) return [];
        return v
            .filter((m) => m && typeof m.date === 'string' && MEAL_TYPES.includes(m.type))
            .map((m) => ({ id: String(m.id ?? newId()), date: m.date, time: typeof m.time === 'string' ? m.time : '', type: m.type, food: typeof m.food === 'string' ? m.food : '' }));
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

// ブラウザで動き始めたら true。サーバーで先に作るページには「今日の日付」を入れられない（作った日と開いた日がずれる）ため、
// 日付を使う部分はこれが true になってから描く。
const noopSubscribe = () => () => {};
export function useMounted(): boolean {
    return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function nowTime(): string {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// 「・」や空白を外した 1 行ずつの「食べたもの」
export function foodLines(food: string): string[] {
    return food.split(/\r?\n/).map((l) => l.replace(/^[・\s]+/, '').trim()).filter(Boolean);
}

export function todayStr(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function csvCell(v: string): string {
    return /[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

// 提出用：8weeks.ai の参考テンプレートと同じ「日付・食事タイプ・食事内容」の 3 列。
// 日付は 2025/9/1、食事内容は「・」の箇条書きをセル内で改行。1 食 1 行で、同じ日の行は食べた時刻の順。
// Excel で文字化けしないよう BOM 付き UTF-8、改行は CRLF。
export function toSubmissionCsv(meals: Meal[]): string {
    const asc = sortMeals(meals).sort((a, b) => a.date.localeCompare(b.date)); // 日付だけ昇順に（同日内の順は保つ）
    const groups = new Map<string, Meal[]>();
    for (const m of asc) groups.set(`${m.date}|${m.type}`, [...(groups.get(`${m.date}|${m.type}`) ?? []), m]);
    const firstTime = (list: Meal[]) => list.map((m) => m.time).filter(Boolean).sort()[0] ?? '';
    const sorted = [...groups.values()].sort((a, b) =>
        a[0].date.localeCompare(b[0].date)
        || ((firstTime(a) && firstTime(b)) ? firstTime(a).localeCompare(firstTime(b)) : 0)
        || MEAL_TYPES.indexOf(a[0].type) - MEAL_TYPES.indexOf(b[0].type));
    const rows = [['日付', '食事タイプ', '食事内容']];
    for (const list of sorted) {
        const content = list.flatMap((m) => foodLines(m.food)).map((l) => `・${l}`).join('\n');
        if (!content) continue;
        const [y, mo, d] = list[0].date.split('-').map(Number);
        rows.push([`${y}/${mo}/${d}`, list[0].type, content]);
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

export function downloadCsv(content: string, filename: string) {
    download(new Blob([content], { type: 'text/csv;charset=utf-8' }), `${filename}.csv`);
}

export function useMealLog() {
    const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const meals = parse(raw);

    // その日のその食事タイプの「食べたもの」を行ごとに書き換える（記録がなければ作る、空になれば消す）。
    // 同じ日・同じ食事タイプの記録が複数あるときは、行をすべて最初の記録にまとめる。
    const setLines = useCallback((date: string, type: MealType, lines: string[]) => {
        const list = parse(getSnapshot());
        const food = lines.map((l) => l.trim()).filter(Boolean).join('\n');
        const target = list.find((m) => m.date === date && m.type === type);
        if (!target) {
            if (!food) return;
            write([...list, { id: newId(), date, time: date === todayStr() ? nowTime() : '', type, food }]);
            return;
        }
        write(list.flatMap((m) => {
            if (m.date !== date || m.type !== type) return [m];
            const food2 = m === target ? food : '';
            return food2 ? [{ ...m, food: food2 }] : [];
        }));
    }, []);

    return { meals, setLines };
}

// ===== 覚えた品目（かんたん記入の候補） =====
// 一度書いた品目は、記録を消しても覚えておく。食事タイプごとの回数と最後に使った日も持ち、候補の順番に使う。

export interface Remembered {
    count: number;
    last: string; // 最後に使った日（YYYY-MM-DD）
    types: Partial<Record<MealType, number>>;
}
type Memory = Record<string, Remembered>;

const MEMORY_KEY = 'mf:meal-log:memory:v1';
const memoryListeners = new Set<() => void>();
function subscribeMemory(l: () => void) {
    memoryListeners.add(l);
    const onStorage = (e: StorageEvent) => { if (e.key === MEMORY_KEY) l(); };
    window.addEventListener('storage', onStorage);
    return () => { memoryListeners.delete(l); window.removeEventListener('storage', onStorage); };
}
function getMemorySnapshot(): string { try { return localStorage.getItem(MEMORY_KEY) ?? ''; } catch { return ''; } }
function parseMemory(raw: string): Memory { try { return raw ? JSON.parse(raw) : {}; } catch { return {}; } }
function writeMemory(m: Memory) {
    try { localStorage.setItem(MEMORY_KEY, JSON.stringify(m)); } catch { /* ignore */ }
    memoryListeners.forEach((l) => l());
}

function addTo(mem: Memory, line: string, type: MealType, date: string) {
    const r = mem[line] ?? { count: 0, last: date, types: {} };
    r.count += 1;
    if (date > r.last) r.last = date;
    r.types[type] = (r.types[type] ?? 0) + 1;
    mem[line] = r;
}

// ひらがな・カタカナ・全角半角・空白の違いを無視して比べる
function fold(s: string): string {
    return s.normalize('NFKC').toLowerCase()
        .replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
        .replace(/\s+/g, '');
}

export function useMemory(meals: Meal[]) {
    const raw = useSyncExternalStore(subscribeMemory, getMemorySnapshot, () => '');
    const memory = parseMemory(raw);

    // はじめて使うとき、これまでの記録から覚える
    useEffect(() => {
        if (getMemorySnapshot() || !meals.length) return;
        const mem: Memory = {};
        for (const m of meals) for (const l of foodLines(m.food)) addTo(mem, l, m.type, m.date);
        writeMemory(mem);
    }, [meals]);

    const remember = useCallback((lines: string[], type: MealType, date: string) => {
        const mem = parseMemory(getMemorySnapshot());
        for (const l of lines) addTo(mem, l, type, date);
        writeMemory(mem);
    }, []);

    const forget = useCallback((line: string) => {
        const mem = parseMemory(getMemorySnapshot());
        delete mem[line];
        writeMemory(mem);
    }, []);

    // 候補：入力が空なら、その食事タイプでよく書くもの順。入力があれば、頭が一致するもの→途中に含むもの
    const suggest = useCallback((type: MealType, query: string, exclude: string[], limit = 12): string[] => {
        const q = fold(query);
        const score = (r: Remembered) => (r.types[type] ?? 0) * 3 + r.count + (r.last >= recentDate() ? 2 : 0);
        return Object.entries(memory)
            .filter(([l]) => !exclude.includes(l) && (!q || (fold(l).includes(q) && fold(l) !== q)))
            .sort((a, b) => {
                if (q) {
                    const pa = fold(a[0]).startsWith(q) ? 0 : 1;
                    const pb = fold(b[0]).startsWith(q) ? 0 : 1;
                    if (pa !== pb) return pa - pb;
                }
                return score(b[1]) - score(a[1]);
            })
            .slice(0, limit)
            .map(([l]) => l);
    }, [memory]);

    return { memory, remember, forget, suggest };
}

function recentDate(): string {
    const d = new Date(); d.setDate(d.getDate() - 14);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// 指定の日より前で、同じ食事タイプを最後に書いた日の内容（「前回と同じ」に使う）
export function previousMeal(meals: Meal[], date: string, type: MealType): { date: string; lines: string[] } | null {
    let best: { date: string; lines: string[] } | null = null;
    for (const m of meals) {
        if (m.type !== type || m.date >= date) continue;
        const lines = foodLines(m.food);
        if (!lines.length) continue;
        if (!best || m.date > best.date) best = { date: m.date, lines };
        else if (m.date === best.date) best.lines.push(...lines);
    }
    return best;
}

// ===== リマインド =====
// ページを閉じているとき、ブラウザだけでは通知を確実に出せない（iPhone はホーム画面に追加したアプリでないと通知不可）。
// そのため、①開いたときに「書いていない食事」を画面の上に出す ②カレンダーに毎日のリマインドを登録する ── の 2 つで支える。

export type MainMealType = '朝食' | '昼食' | '夕食';
export const MAIN_MEAL_TYPES: MainMealType[] = ['朝食', '昼食', '夕食'];
export type ReminderTimes = Record<MainMealType, string>; // HH:MM
export const DEFAULT_REMINDERS: ReminderTimes = { 朝食: '09:00', 昼食: '13:30', 夕食: '20:30' };

const REMINDER_KEY = 'mf:meal-log:reminder:v1';
const reminderListeners = new Set<() => void>();
function subscribeReminder(l: () => void) {
    reminderListeners.add(l);
    const onStorage = (e: StorageEvent) => { if (e.key === REMINDER_KEY) l(); };
    window.addEventListener('storage', onStorage);
    return () => { reminderListeners.delete(l); window.removeEventListener('storage', onStorage); };
}
function getReminderSnapshot(): string { try { return localStorage.getItem(REMINDER_KEY) ?? ''; } catch { return ''; } }

export function useReminders() {
    const raw = useSyncExternalStore(subscribeReminder, getReminderSnapshot, () => '');
    let times: ReminderTimes = DEFAULT_REMINDERS;
    try {
        if (raw) {
            const p = JSON.parse(raw);
            times = { ...DEFAULT_REMINDERS };
            for (const t of MAIN_MEAL_TYPES) if (typeof p[t] === 'string' && /^\d{2}:\d{2}$/.test(p[t])) times[t] = p[t];
        }
    } catch { /* 初期値のまま */ }
    const setTimes = useCallback((t: ReminderTimes) => {
        try { localStorage.setItem(REMINDER_KEY, JSON.stringify(t)); } catch { /* ignore */ }
        reminderListeners.forEach((l) => l());
    }, []);
    return { times, setTimes };
}

// 今の時刻を 1 分ごと・画面に戻ったときに更新する（開きっぱなしでも時間が来たら出るように）
export function useNow(): Date {
    const snap = useSyncExternalStore(
        (cb) => {
            const id = setInterval(cb, 30_000);
            const onVis = () => { if (document.visibilityState === 'visible') cb(); };
            document.addEventListener('visibilitychange', onVis);
            window.addEventListener('focus', cb);
            return () => { clearInterval(id); document.removeEventListener('visibilitychange', onVis); window.removeEventListener('focus', cb); };
        },
        () => Math.floor(Date.now() / 30_000),
        () => 0,
    );
    return new Date(snap * 30_000);
}

// 書いていない食事。today：リマインドの時刻を過ぎたのに未記入のもの。yesterday：昨日の未記入。
export function missingMeals(meals: Meal[], times: ReminderTimes, now: Date): { today: MainMealType[]; yesterday: MainMealType[]; yesterdayDate: string } {
    const todayDate = todayStr();
    const hm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const has = (date: string, type: MealType) => meals.some((m) => m.date === date && m.type === type && m.food.trim());
    const y = new Date(now); y.setDate(y.getDate() - 1);
    const yesterdayDate = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}`;
    // 昨日のリマインドは、使い始めて以降だけ（はじめて開いた日に「昨日が未記入」と出さない）
    const started = meals.some((m) => m.date <= yesterdayDate);
    return {
        today: MAIN_MEAL_TYPES.filter((t) => times[t] <= hm && !has(todayDate, t)),
        yesterday: started ? MAIN_MEAL_TYPES.filter((t) => !has(yesterdayDate, t)) : [],
        yesterdayDate,
    };
}

// カレンダー（iPhone の標準カレンダーなど）に取り込む、毎日くり返しのリマインド。
// 時刻は「フローティング」（端末の今いる時間帯のまま）にして、時間帯の設定に左右されないようにする。
export function buildReminderIcs(times: ReminderTimes, url: string): string {
    const d = new Date();
    const day = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    const stamp = d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z'); // DTSTAMP は UTC
    const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
    const fold = (line: string) => { // 75 バイトを超える行は折り返す（RFC 5545）
        const enc = new TextEncoder(); const out: string[] = []; let cur = '';
        for (const ch of line) {
            if (enc.encode(cur + ch).length > (out.length ? 74 : 75)) { out.push(cur); cur = ch; } else cur += ch;
        }
        out.push(cur);
        return out.join('\r\n ');
    };
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Mitoflow40//Meal Log//JA', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:食事記録のリマインド'];
    for (const t of MAIN_MEAL_TYPES) {
        const [h, m] = times[t].split(':');
        lines.push(
            'BEGIN:VEVENT',
            `UID:meal-log-reminder-${t === '朝食' ? 'breakfast' : t === '昼食' ? 'lunch' : 'dinner'}@mitoflow40.com`,
            `DTSTAMP:${stamp}`,
            `DTSTART:${day}T${h}${m}00`,
            'DURATION:PT10M',
            'RRULE:FREQ=DAILY',
            `SUMMARY:${esc(`${t}を記録する`)}`,
            `DESCRIPTION:${esc(`${t}に食べたものを食事記録に書きましょう。\n${url}`)}`,
            `URL:${url}`,
            'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${esc(`${t}を記録する`)}`, 'TRIGGER:PT0M', 'END:VALARM',
            'END:VEVENT',
        );
    }
    lines.push('END:VCALENDAR');
    return lines.map(fold).join('\r\n') + '\r\n';
}

export function downloadIcs(content: string, filename: string) {
    download(new Blob([content], { type: 'text/calendar;charset=utf-8' }), `${filename}.ics`);
}

// ===== サイトの控え（バックアップ）用 =====
// 控えから戻すときは、いまの記録を消さずに合わせる（同じ id は控えの側を残さず、いまの端末を優先）。
export function mergeMeals(incoming: Meal[]): number {
    const list = parse(getSnapshot());
    const ids = new Set(list.map((m) => m.id));
    const add = incoming.filter((m) => m && typeof m.id === 'string' && !ids.has(m.id));
    if (add.length) write([...list, ...add]);
    return add.length;
}

export function getMemoryForBackup(): Record<string, Remembered> {
    return parseMemory(getMemorySnapshot());
}

export function mergeMemory(incoming: Record<string, Remembered>) {
    const mem = parseMemory(getMemorySnapshot());
    for (const [line, r] of Object.entries(incoming ?? {})) {
        if (!r || typeof r !== 'object') continue;
        const cur = mem[line];
        if (!cur) { mem[line] = r; continue; }
        cur.count = Math.max(cur.count, r.count ?? 0);
        if ((r.last ?? '') > cur.last) cur.last = r.last;
        for (const [t, n] of Object.entries(r.types ?? {})) {
            const k = t as MealType;
            cur.types[k] = Math.max(cur.types[k] ?? 0, n ?? 0);
        }
    }
    writeMemory(mem);
}
