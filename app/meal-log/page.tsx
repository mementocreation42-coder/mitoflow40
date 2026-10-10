'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MEAL_TYPES, downloadCsv, foodLines, previousMeal, toSubmissionCsv, todayStr, useMealLog, useMemory, useMounted, useNow, useReminders, missingMeals, buildReminderIcs, downloadIcs, DEFAULT_REMINDERS, MAIN_MEAL_TYPES, type MainMealType, type ReminderTimes, type Meal, type MealType, type Remembered } from '@/lib/meal-log';
import { pillCls } from '@/components/meal-log/styles';

// かんたん記入：提出フォーマット（日付・食事タイプ・食事内容）を毎日書きやすくする画面。
// この端末の中だけに保存し、どこにも送信しない。

const TYPE_COLOR: Record<MealType, string> = { 朝食: '#FFB37B', 昼食: '#4AF6C3', 夕食: '#6CCFF6', 間食: '#E5D0E3' };
const MAIN_TYPES: MealType[] = ['朝食', '昼食', '夕食']; // 提出の必須区分
const AMOUNTS = ['1個', '2個', '1杯', '1皿', '1袋', '100g', '200g', '半分', '少々'];

// iPhone の Safari は 16px 未満の入力欄をタップすると画面を拡大してしまうので、入力欄は 16px にする
const fieldCls = 'flex-1 min-w-0 rounded-xl border-2 border-[#1A1A1A] bg-white px-3 py-2.5 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#FF9855]';
const chipCls = 'min-h-[36px] rounded-full border border-[#1A1A1A] px-3 text-[13px]';

function ymd(y: number, m: number, d: number): string {
    return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}
function shiftDate(date: string, days: number): string {
    const [y, m, d] = date.split('-').map(Number);
    const x = new Date(y, m - 1, d + days);
    return ymd(x.getFullYear(), x.getMonth() + 1, x.getDate());
}
function weekday(date: string): string {
    const [y, m, d] = date.split('-').map(Number);
    return '日月火水木金土'[new Date(y, m - 1, d).getDay()];
}
function md(date: string): string {
    return `${Number(date.slice(5, 7))}/${Number(date.slice(8))}`;
}

export default function MealLogEasyPage() {
    const { meals, setLines } = useMealLog();
    const mounted = useMounted();
    const [date, setDate] = useState(todayStr);
    const month = date.slice(0, 7);
    const { memory, remember, forget, suggest } = useMemory(meals);
    const { times, setTimes } = useReminders();
    const now = useNow();

    const byKey = useMemo(() => {
        const map = new Map<string, Meal[]>();
        for (const m of meals) map.set(`${m.date}|${m.type}`, [...(map.get(`${m.date}|${m.type}`) ?? []), m]);
        return map;
    }, [meals]);
    const recordsOf = (d: string, t: MealType) => byKey.get(`${d}|${t}`) ?? [];
    const filled = (d: string, t: MealType) => recordsOf(d, t).some((m) => m.food.trim());

    const monthMeals = useMemo(() => meals.filter((m) => m.date.startsWith(month)), [meals, month]);

    if (!mounted) {
        return <div className="pt-16 pb-24 px-4 text-center text-sm text-[#666]" role="status">読み込み中…</div>;
    }

    const today = todayStr();
    const isToday = date === today;
    const missing = missingMeals(meals, times, now);
    const dayCount = MAIN_TYPES.filter((t) => filled(date, t)).length;

    return (
        <div className="pb-16 md:pb-24">
            {/* 日付（画面の上に固定。どの日を書いているか常に見える） */}
            <div className="sticky top-0 z-30 bg-[#FAFAF7]/95 backdrop-blur-sm border-b-2 border-[#1A1A1A]">
                <div className="max-w-[640px] mx-auto px-4 py-2 flex items-center gap-2">
                    <button type="button" onClick={() => setDate(shiftDate(date, -1))} aria-label="前の日"
                        className="w-11 h-11 shrink-0 rounded-full border-2 border-[#1A1A1A] bg-white text-lg font-bold">‹</button>
                    <div className="flex-1 text-center leading-tight">
                        <p className="text-[17px] font-bold text-[#1A1A1A]">
                            {Number(date.slice(5, 7))}月{Number(date.slice(8))}日（{weekday(date)}）
                        </p>
                        <p className="text-[11px] text-[#4A4A4A]">
                            {isToday ? '今日' : <button type="button" onClick={() => setDate(today)} className="font-bold underline">今日に戻る</button>}
                            <span className="mx-1.5">·</span>朝昼夕 {dayCount}/3
                        </p>
                    </div>
                    <button type="button" onClick={() => setDate(shiftDate(date, 1))} aria-label="次の日"
                        className="w-11 h-11 shrink-0 rounded-full border-2 border-[#1A1A1A] bg-white text-lg font-bold">›</button>
                </div>
            </div>

            <div className="max-w-[640px] mx-auto px-4 md:px-6">
                <div className="pt-5">
                    <h1 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">食事記録</h1>
                    <p className="text-[13px] text-[#666] mt-1">
                        食べたものを 1 品ずつ書くだけ。書いた内容はその場で保存されます（この端末の中だけ）。月末に下の「提出用 CSV」で書き出してください。
                    </p>
                </div>

                <ReminderBanner missing={missing} todayAllDone={MAIN_TYPES.every((t) => filled(today, t))}
                    onWrite={(d, type) => {
                        setDate(d);
                        // 日付を切り替えて描き直したあとに、その食事の入力欄へ移動する
                        setTimeout(() => {
                            const sec = document.querySelector<HTMLElement>(`section[aria-label="${type}"]`);
                            sec?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            sec?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true });
                        }, 60);
                    }} />

                {meals.length === 0 && <HowTo />}

                <div className="mt-4 space-y-3">
                    {MEAL_TYPES.map((type) => {
                        const recs = recordsOf(date, type);
                        return (
                            <MealCard key={`${date}|${type}`} type={type}
                                lines={recs.flatMap((m) => foodLines(m.food))}
                                previous={previousMeal(meals, date, type)}
                                suggest={(q, exclude) => suggest(type, q, exclude)}
                                onChange={(lines, added) => { setLines(date, type, lines); if (added.length) remember(added, type, date); }} />
                        );
                    })}
                </div>

                {/* 月末の提出 */}
                <h2 className="mt-10 text-lg font-bold text-[#1A1A1A]">月末の提出</h2>
                <MonthCalendar date={date} onSelect={setDate} filled={filled} />
                <ExportBox month={month} meals={monthMeals} filled={filled} onPick={setDate} />

                <ReminderSettings times={times} onSave={setTimes} />

                <MemoryList memory={memory} onForget={forget} />

            </div>
        </div>
    );
}

// はじめて開いたときだけ出す使い方
function HowTo() {
    return (
        <ol className="mt-4 rounded-2xl border-2 border-dashed border-[#1A1A1A] bg-white p-4 space-y-1.5 text-[13px] text-[#1A1A1A]">
            <li><b>1.</b> 朝食・昼食・夕食の欄に、食べたものを 1 品ずつ書いて「追加」</li>
            <li><b>2.</b> 量は「+1個」「+100g」などのボタンで付けられます</li>
            <li><b>3.</b> 一度書いた品目は覚えるので、次からはタップで入ります</li>
            <li><b>4.</b> 月末に「提出用 CSV を書き出す」→ そのファイルを提出</li>
        </ol>
    );
}

// 1 食分の入力（1 品ずつ足していく）
function MealCard({ type, lines, previous, suggest, onChange }: {
    type: MealType;
    lines: string[];      // 書き換えられる行
    previous: { date: string; lines: string[] } | null; // 前回この食事タイプに書いた内容
    suggest: (query: string, exclude: string[]) => string[];
    onChange: (lines: string[], added: string[]) => void; // added は覚える行
}) {
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<number | null>(null); // 直している行（その場で置き換える）
    const [undo, setUndo] = useState<{ lines: string[]; label: string } | null>(null); // 直前の削除を元に戻す
    const inputRef = useRef<HTMLInputElement>(null);
    const count = lines.length;

    // 「元に戻す」は 6 秒で消す
    useEffect(() => {
        if (!undo) return;
        const t = setTimeout(() => setUndo(null), 6000);
        return () => clearTimeout(t);
    }, [undo]);

    const add = (value = text) => {
        const v = value.replace(/^[・\s]+/, '').trim();
        if (!v) return;
        onChange(editing == null ? [...lines, v] : lines.map((l, j) => (j === editing ? v : l)), [v]);
        setEditing(null);
        setUndo(null);
        setText('');
        inputRef.current?.focus();
    };
    const remove = (i: number) => {
        setUndo({ lines, label: lines[i] });
        onChange(lines.filter((_, j) => j !== i), []);
        setEditing(null);
        setText('');
    };
    const edit = (i: number) => { setText(lines[i]); setEditing(i); setOpen(true); setTimeout(() => inputRef.current?.focus(), 0); };
    const cancelEdit = () => { setEditing(null); setText(''); };
    const appendAmount = (a: string) => { setText((t) => (t.trim() ? `${t.trim()} ${a}` : t)); inputRef.current?.focus(); };

    const q = text.trim();
    const suggestions = editing != null ? [] : suggest(q, lines);

    return (
        <section className="rounded-2xl border-2 border-[#1A1A1A] bg-white" aria-label={type}>
            <div className="flex items-center justify-between gap-2 px-4 pt-3">
                <h2 className="flex items-center gap-2">
                    <span className="inline-block rounded-md px-2.5 py-0.5 text-[15px] font-bold border border-[#1A1A1A]" style={{ background: TYPE_COLOR[type] }}>{type}</span>
                    <span className="text-[12px] text-[#666]">{count ? `${count} 品` : MAIN_TYPES.includes(type) ? '未記入' : ''}</span>
                </h2>
                {!count && previous && (
                    <button type="button" onClick={() => onChange(previous.lines, previous.lines)}
                        className="min-h-[36px] rounded-full border border-[#1A1A1A] bg-[#FAFAF7] px-3 text-[12px] font-bold">
                        前回（{md(previous.date)}）と同じ
                    </button>
                )}
            </div>

            {count > 0 && (
                <ul className="px-4 pt-2">
                    {lines.map((l, i) => (
                        <li key={`${i}-${l}`} className={`flex items-center gap-2 py-0.5 ${editing === i ? 'bg-[#FBEBD5] -mx-2 px-2 rounded-lg' : ''}`}>
                            <button type="button" onClick={() => edit(i)} className="flex-1 min-h-[40px] text-left text-[16px] text-[#1A1A1A] break-words" title="タップで直す">・{l}</button>
                            <button type="button" onClick={() => remove(i)} aria-label={`「${l}」を消す`}
                                className="shrink-0 w-9 h-9 rounded-full border border-[#1A1A1A] text-sm font-bold text-[#4A4A4A] hover:bg-[#FBEBD5]">×</button>
                        </li>
                    ))}
                </ul>
            )}

            {undo && (
                <p className="mx-4 mt-1 flex items-center justify-between gap-2 rounded-lg bg-[#1A1A1A] px-3 py-2 text-[12px] text-white" role="status">
                    <span className="min-w-0 truncate">「{undo.label}」を消しました</span>
                    <button type="button" onClick={() => { onChange(undo.lines, []); setUndo(null); }} className="shrink-0 font-bold underline">元に戻す</button>
                </p>
            )}

            <form className="px-4 pt-2 pb-3" onSubmit={(e) => { e.preventDefault(); add(); }}>
                <div className="flex gap-2">
                    <input ref={inputRef} type="text" value={text} onChange={(e) => setText(e.target.value)} onFocus={() => setOpen(true)}
                        onKeyDown={(e) => {
                            // 日本語の変換を確定する Enter では追加しない（Safari は確定の Enter を isComposing=false・keyCode 229 で送るため両方見る）
                            if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault();
                        }}
                        placeholder={count ? 'もう 1 品' : '例：おにぎり（鮭） 2個'} enterKeyHint="enter" aria-label={`${type}に食べたもの`}
                        autoComplete="off" className={fieldCls} />
                    <button type="submit" disabled={!q} className={`${pillCls} bg-[#FF9855] shrink-0 min-w-[64px]`}>{editing == null ? '追加' : '直す'}</button>
                </div>
                {editing != null && (
                    <button type="button" onClick={cancelEdit} className="mt-1.5 text-xs font-bold underline text-[#4A4A4A]">直すのをやめる</button>
                )}

                {open && (q || suggestions.length > 0) && (
                    <div className="mt-2.5 space-y-2.5">
                        {q && (
                            <div aria-label="量を付ける">
                                <p className="text-[11px] font-bold text-[#4A4A4A] mb-1">量を付ける</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {AMOUNTS.map((a) => (
                                        <button key={a} type="button" onClick={() => appendAmount(a)} className={`${chipCls} bg-[#FAFAF7] font-bold`}>+{a}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {suggestions.length > 0 && (
                            <div aria-label="覚えている品目">
                                <p className="text-[11px] font-bold text-[#4A4A4A] mb-1">{q ? '前に書いたもの' : `よく書く${type === '間食' ? '間食' : `${type}の品目`}`}（タップで追加）</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {suggestions.map((s) => (
                                        <button key={s} type="button" onClick={() => add(s)} className={`${chipCls} bg-white hover:bg-[#FBEBD5]`}>{s}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </section>
    );
}

// 月のカレンダー。朝・昼・夕のどれを書いたかが日ごとに見える
function MonthCalendar({ date, onSelect, filled }: { date: string; onSelect: (d: string) => void; filled: (d: string, t: MealType) => boolean }) {
    const [y, m] = date.split('-').map(Number);
    const first = new Date(y, m - 1, 1).getDay();
    const days = new Date(y, m, 0).getDate();
    const today = todayStr();
    const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
    const done = Array.from({ length: days }, (_, i) => ymd(y, m, i + 1)).filter((d) => MAIN_TYPES.every((t) => filled(d, t))).length;

    const go = (delta: number) => {
        const x = new Date(y, m - 1 + delta, 1);
        const last = new Date(x.getFullYear(), x.getMonth() + 1, 0).getDate();
        onSelect(ymd(x.getFullYear(), x.getMonth() + 1, Math.min(Number(date.slice(8)), last)));
    };

    return (
        <section aria-label="カレンダー" className="mt-3 rounded-2xl border-2 border-[#1A1A1A] bg-white p-3">
            <div className="flex items-center justify-between">
                <button type="button" onClick={() => go(-1)} aria-label="前の月" className="w-10 h-10 rounded-full font-bold text-lg hover:bg-[#FBEBD5]">‹</button>
                <p className="text-[15px] font-bold text-[#1A1A1A] text-center leading-tight">
                    {y}年{m}月
                    <span className="block text-[11px] font-normal text-[#4A4A4A]">朝昼夕そろった日 {done} / {days}</span>
                </p>
                <button type="button" onClick={() => go(1)} aria-label="次の月" className="w-10 h-10 rounded-full font-bold text-lg hover:bg-[#FBEBD5]">›</button>
            </div>
            <div className="grid grid-cols-7 gap-1 mt-1 text-center">
                {'日月火水木金土'.split('').map((w, i) => (
                    <span key={w} className={`text-[11px] ${i === 0 ? 'text-[#C0392B]' : i === 6 ? 'text-[#2a78d6]' : 'text-[#666]'}`}>{w}</span>
                ))}
                {cells.map((d, i) => {
                    if (d == null) return <span key={`e${i}`} />;
                    const ds = ymd(y, m, d);
                    const marks = MAIN_TYPES.map((t) => filled(ds, t));
                    const all = marks.every(Boolean);
                    const selected = ds === date;
                    const future = ds > today;
                    return (
                        <button key={ds} type="button" onClick={() => onSelect(ds)} aria-pressed={selected} disabled={future}
                            aria-label={`${m}月${d}日 ${MAIN_TYPES.map((t, j) => `${t}${marks[j] ? 'あり' : 'なし'}`).join('・')}`}
                            className={`min-h-[44px] rounded-lg py-1 border-2 ${selected ? 'border-[#1A1A1A]' : 'border-transparent'} ${future ? 'opacity-30' : ''}`}
                            style={{ background: all ? '#DFFBEF' : undefined }}>
                            <span className={`block text-[13px] ${ds === today ? 'font-bold underline' : ''}`}>{d}</span>
                            {!future && (
                                <span className="block text-[10px] leading-none tracking-tighter mt-0.5">
                                    {MAIN_TYPES.map((t, j) => (
                                        <span key={t} className={marks[j] ? 'text-[#1A1A1A] font-bold' : 'text-[#C8C7C2]'}>{t[0]}</span>
                                    ))}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
            <p className="text-[11px] text-[#666] mt-1.5">日付をタップするとその日を書けます。濃い字＝書いた食事、緑の日＝3 食そろった日。</p>
        </section>
    );
}

function ExportBox({ month, meals, filled, onPick }: { month: string; meals: Meal[]; filled: (d: string, t: MealType) => boolean; onPick: (d: string) => void }) {
    const [preview, setPreview] = useState(false);
    const [y, m] = month.split('-').map(Number);
    const days = new Date(y, m, 0).getDate();
    const today = todayStr();
    const missing = Array.from({ length: days }, (_, i) => ymd(y, m, i + 1))
        .filter((d) => d <= today && MAIN_TYPES.some((t) => !filled(d, t)));
    const csv = useMemo(() => toSubmissionCsv(meals), [meals]);
    const rows = useMemo(() => parseRows(csv), [csv]);

    return (
        <section className="mt-3 rounded-2xl border-2 border-[#1A1A1A] bg-white p-4 shadow-[4px_4px_0_#1A1A1A]">
            <h3 className="text-base font-bold text-[#1A1A1A]">{m}月分を提出用 CSV で書き出す</h3>
            <p className="text-xs text-[#4A4A4A] mt-1">列は「日付・食事タイプ・食事内容」（参考テンプレートと同じ形）。食事内容は「・」の箇条書きになります。</p>

            {missing.length > 0 && (
                <div className="mt-3">
                    <p className="text-xs font-bold text-[#1A1A1A]">朝・昼・夕のどれかが未記入の日（タップで開く）</p>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {missing.slice(0, 31).map((d) => (
                            <button key={d} type="button" onClick={() => { onPick(d); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="min-w-[44px] min-h-[36px] rounded-lg border border-[#1A1A1A] bg-[#FAFAF7] px-2 text-[13px]">{md(d)}</button>
                        ))}
                    </div>
                </div>
            )}

            <button type="button" disabled={!meals.length} onClick={() => downloadCsv(csv, `meal-log_${month}`)}
                className={`${pillCls} bg-[#FF9855] w-full mt-4 py-3 text-[15px]`}>
                {meals.length ? `${m}月分の CSV を書き出す` : 'この月の記録はまだありません'}
            </button>

            {rows.length > 0 && (
                <>
                    <button type="button" onClick={() => setPreview(!preview)} aria-expanded={preview} className="mt-3 text-xs font-bold underline text-[#4A4A4A]">
                        {preview ? '中身を閉じる' : `書き出す中身を確認する（${rows.length} 行）`}
                    </button>
                    {preview && (
                        <div className="mt-2 max-h-[420px] overflow-auto rounded-lg border border-[#1A1A1A]">
                            <table className="w-full text-[12px] text-left">
                                <thead className="sticky top-0 bg-[#FBEBD5]">
                                    <tr><th className="px-2 py-1.5 whitespace-nowrap">日付</th><th className="px-2 py-1.5 whitespace-nowrap">食事タイプ</th><th className="px-2 py-1.5">食事内容</th></tr>
                                </thead>
                                <tbody>
                                    {rows.map((r, i) => (
                                        <tr key={i} className="border-t border-[#ECEBE6] align-top">
                                            <td className="px-2 py-1.5 whitespace-nowrap tabular-nums">{r[0]}</td>
                                            <td className="px-2 py-1.5 whitespace-nowrap">{r[1]}</td>
                                            <td className="px-2 py-1.5 whitespace-pre-line">{r[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

// 書き出す CSV を読み戻して、確認用の表にする（見出し行は除く）
function parseRows(csv: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let cell = '';
    let quoted = false;
    const s = csv.replace(/^﻿/, '');
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (quoted) {
            if (c === '"' && s[i + 1] === '"') { cell += '"'; i++; }
            else if (c === '"') quoted = false;
            else cell += c;
        } else if (c === '"') quoted = true;
        else if (c === ',') { row.push(cell); cell = ''; }
        else if (c === '\r') continue;
        else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
        else cell += c;
    }
    return rows.slice(1);
}

// 覚えている品目の一覧。候補に出したくないものはここで忘れさせる
function MemoryList({ memory, onForget }: { memory: Record<string, Remembered>; onForget: (line: string) => void }) {
    const [open, setOpen] = useState(false);
    const entries = Object.entries(memory).sort((a, b) => b[1].count - a[1].count);
    if (!entries.length) return null;
    return (
        <section className="mt-4 rounded-2xl border-2 border-[#1A1A1A] bg-white p-4">
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="w-full min-h-[36px] flex items-center justify-between text-left">
                <span className="text-sm font-bold text-[#1A1A1A]">覚えている品目（{entries.length}）</span>
                <span className="text-xs font-bold underline text-[#4A4A4A]">{open ? '閉じる' : '見る・整理する'}</span>
            </button>
            {open && (
                <>
                    <p className="text-[11px] text-[#666] mt-1">一度書いた品目は、記録を消しても覚えていて、入力の候補に出ます。候補に出したくないものは × で忘れさせられます（記録は消えません）。</p>
                    <ul className="mt-2 divide-y divide-[#ECEBE6]">
                        {entries.map(([line, r]) => (
                            <li key={line} className="flex items-center gap-2 py-1.5">
                                <span className="flex-1 min-w-0 text-[15px] text-[#1A1A1A] break-words">{line}</span>
                                <span className="shrink-0 text-[11px] text-[#666] tabular-nums">{r.count} 回</span>
                                <button type="button" onClick={() => onForget(line)} aria-label={`「${line}」を忘れる`}
                                    className="shrink-0 w-9 h-9 rounded-full border border-[#1A1A1A] text-sm font-bold text-[#4A4A4A] hover:bg-[#FBEBD5]">×</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </section>
    );
}

// 時間が過ぎたのに書いていない食事と、昨日の書き忘れ
function ReminderBanner({ missing, todayAllDone, onWrite }: {
    missing: { today: MainMealType[]; yesterday: MainMealType[]; yesterdayDate: string };
    todayAllDone: boolean;
    onWrite: (date: string, type: MainMealType) => void;
}) {
    const today = todayStr();
    if (!missing.today.length && !missing.yesterday.length) {
        return todayAllDone ? (
            <p className="mt-4 rounded-xl bg-[#DFFBEF] border border-[#1A1A1A] px-3 py-2 text-[13px] font-bold text-[#1A1A1A]" role="status">✓ 今日の朝・昼・夕がそろいました</p>
        ) : null;
    }
    return (
        <section aria-label="記録のリマインド" className="mt-4 rounded-2xl border-2 border-[#1A1A1A] bg-[#FFF3D6] p-3">
            {missing.today.length > 0 && (
                <div>
                    <p className="text-[13px] font-bold text-[#1A1A1A]">🔔 今日の{missing.today.join('・')}が、まだ書かれていません</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {missing.today.map((t) => (
                            <button key={t} type="button" onClick={() => onWrite(today, t)}
                                className="min-h-[40px] rounded-full border-2 border-[#1A1A1A] bg-[#FF9855] px-4 text-[14px] font-bold">{t}を書く</button>
                        ))}
                    </div>
                </div>
            )}
            {missing.yesterday.length > 0 && (
                <div className={missing.today.length ? 'mt-3 pt-3 border-t border-[#1A1A1A]/30' : ''}>
                    <p className="text-[13px] font-bold text-[#1A1A1A]">昨日（{md(missing.yesterdayDate)}）の{missing.yesterday.join('・')}が未記入です</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {missing.yesterday.map((t) => (
                            <button key={t} type="button" onClick={() => onWrite(missing.yesterdayDate, t)}
                                className="min-h-[40px] rounded-full border-2 border-[#1A1A1A] bg-white px-4 text-[14px] font-bold">昨日の{t}を書く</button>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

// リマインドの時刻と、カレンダーへの登録
function ReminderSettings({ times, onSave }: { times: ReminderTimes; onSave: (t: ReminderTimes) => void }) {
    const [open, setOpen] = useState(false);
    const [added, setAdded] = useState(false);
    const changed = (t: MainMealType, v: string) => { if (/^\d{2}:\d{2}$/.test(v)) { onSave({ ...times, [t]: v }); setAdded(false); } };
    return (
        <section className="mt-4 rounded-2xl border-2 border-[#1A1A1A] bg-white p-4">
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="w-full min-h-[36px] flex items-center justify-between text-left">
                <span className="text-sm font-bold text-[#1A1A1A]">🔔 リマインドの設定</span>
                <span className="text-xs font-bold underline text-[#4A4A4A]">{open ? '閉じる' : '時刻・通知を設定する'}</span>
            </button>
            {open && (
                <div className="mt-2">
                    <p className="text-[12px] text-[#4A4A4A]">この時刻を過ぎても書いていない食事を、このページを開いたときに画面の上でお知らせします。</p>
                    <div className="mt-3 space-y-2">
                        {MAIN_MEAL_TYPES.map((t) => (
                            <label key={t} className="flex items-center justify-between gap-3">
                                <span className="text-[15px] font-bold text-[#1A1A1A]">{t}</span>
                                <input type="time" value={times[t]} onChange={(e) => changed(t, e.target.value)}
                                    className="w-[150px] rounded-xl border-2 border-[#1A1A1A] bg-white px-3 py-2 text-[16px]" />
                            </label>
                        ))}
                    </div>
                    <button type="button" onClick={() => { downloadIcs(buildReminderIcs(times, `${location.origin}/meal-log`), 'meal-log-reminder'); setAdded(true); }}
                        className={`${pillCls} bg-[#6CCFF6] w-full mt-4 py-3`}>
                        カレンダーに毎日のリマインドを追加
                    </button>
                    {added && <p className="text-[12px] font-bold text-[#1A1A1A] mt-2" role="status">ファイルをダウンロードしました。開いて「カレンダーに追加」を押すと登録されます。</p>}
                    <p className="text-[11px] text-[#666] mt-2 leading-relaxed">
                        登録すると、毎日この時刻にカレンダーの通知が鳴ります（アプリを開いていなくても届きます）。
                        iPhone は「ファイル」や Safari のダウンロードから開いて「すべてを追加」を押してください。時刻を変えたときは、カレンダーの古いリマインドを消して、もう一度追加してください。
                    </p>
                    {(times.朝食 !== DEFAULT_REMINDERS.朝食 || times.昼食 !== DEFAULT_REMINDERS.昼食 || times.夕食 !== DEFAULT_REMINDERS.夕食) && (
                        <button type="button" onClick={() => { onSave(DEFAULT_REMINDERS); setAdded(false); }} className="mt-2 text-xs font-bold underline text-[#4A4A4A]">初期の時刻に戻す</button>
                    )}
                </div>
            )}
        </section>
    );
}
