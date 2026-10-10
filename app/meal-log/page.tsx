'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { MEAL_TYPES, downloadCsv, foodLines, frequentLines, toSubmissionCsv, todayStr, useMealLog, type Meal, type MealType } from '@/lib/meal-log';
import { displayName } from '@/lib/nutrition';
import { pillCls } from '@/components/meal-log/styles';

// かんたん記入：提出フォーマット（日付・食事タイプ・食事内容）を毎日書きやすくする画面。
// 栄養の計算は /meal-log/nutrition。記録は共通。

const TYPE_COLOR: Record<MealType, string> = { 朝食: '#FFB37B', 昼食: '#4AF6C3', 夕食: '#6CCFF6', 間食: '#E5D0E3' };
const MAIN_TYPES: MealType[] = ['朝食', '昼食', '夕食']; // 提出の必須区分
const AMOUNTS = ['1個', '2個', '1杯', '1皿', '1袋', '100g', '200g', '半分', '少々'];

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

export default function MealLogEasyPage() {
    const { meals, setLines } = useMealLog();
    const [date, setDate] = useState(todayStr);
    const month = date.slice(0, 7);
    const frequent = useMemo(() => frequentLines(meals), [meals]);

    const byKey = useMemo(() => {
        const map = new Map<string, Meal[]>();
        for (const m of meals) map.set(`${m.date}|${m.type}`, [...(map.get(`${m.date}|${m.type}`) ?? []), m]);
        return map;
    }, [meals]);
    const recordsOf = (d: string, t: MealType) => byKey.get(`${d}|${t}`) ?? [];
    const filled = (d: string, t: MealType) => recordsOf(d, t).some((m) => m.food.trim() || m.items.length);

    const monthMeals = useMemo(() => meals.filter((m) => m.date.startsWith(month)), [meals, month]);
    const isToday = date === todayStr();

    return (
        <div className="pt-[calc(60px+2rem)] md:pt-[calc(60px+4rem)] pb-16 md:pb-24 px-4 md:px-6">
            <div className="max-w-[640px] mx-auto">
                <p className="text-[11px] font-bold tracking-widest text-[#4A4A4A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MEAL LOG</p>
                <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-1">食事記録</h1>
                <p className="text-sm text-[#666] mt-2">
                    食べたものを 1 品ずつ書くだけ。月末に「提出用 CSV」で、日付・食事タイプ・食事内容の形にまとめて書き出せます。記録はこの端末の中だけに保存されます。
                </p>

                <MonthCalendar date={date} onSelect={setDate} filled={filled} />

                {/* 日付 */}
                <div className="mt-4 flex items-center justify-between gap-2">
                    <button type="button" onClick={() => setDate(shiftDate(date, -1))} className={`${pillCls} bg-white px-3`} aria-label="前の日">‹ 前の日</button>
                    <div className="text-center">
                        <p className="text-lg font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {Number(date.slice(5, 7))}月{Number(date.slice(8))}日（{weekday(date)}）
                        </p>
                        {isToday ? <p className="text-[11px] text-[#4A4A4A]">今日</p>
                            : <button type="button" onClick={() => setDate(todayStr())} className="text-[11px] font-bold underline">今日に戻る</button>}
                    </div>
                    <button type="button" onClick={() => setDate(shiftDate(date, 1))} className={`${pillCls} bg-white px-3`} aria-label="次の日">次の日 ›</button>
                </div>

                <div className="mt-3 space-y-3">
                    {MEAL_TYPES.map((type) => {
                        const recs = recordsOf(date, type);
                        return (
                            <MealCard key={`${date}|${type}`} type={type}
                                lines={recs.flatMap((m) => foodLines(m.food))}
                                fixed={recs.flatMap((m) => m.items.map((it) => `${displayName(it.name)} ${it.grams}g`))}
                                yesterday={recordsOf(shiftDate(date, -1), type).flatMap((m) => foodLines(m.food))}
                                frequent={frequent}
                                onChange={(lines) => setLines(date, type, lines)} />
                        );
                    })}
                </div>

                <ExportBox month={month} meals={monthMeals} filled={filled} />

                <p className="text-xs text-[#4A4A4A] mt-6">
                    栄養（カロリー・PFC・ビタミン・ミネラル）も計算したいときは
                    <Link href="/meal-log/nutrition" className="font-bold underline ml-1">栄養計算モード</Link>へ。記録は共通です。
                </p>
            </div>
        </div>
    );
}

// 1 食分の入力（1 品ずつ足していく）
function MealCard({ type, lines, fixed, yesterday, frequent, onChange }: {
    type: MealType;
    lines: string[];      // 書き換えられる行
    fixed: string[];      // 栄養計算モードで入れた食品（ここでは表示だけ）
    yesterday: string[];
    frequent: string[];
    onChange: (lines: string[]) => void;
}) {
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<number | null>(null); // 直している行（その場で置き換える）
    const inputRef = useRef<HTMLInputElement>(null);
    const hasAny = lines.length + fixed.length > 0;

    const add = (value = text) => {
        const v = value.replace(/^[・\s]+/, '').trim();
        if (!v) return;
        onChange(editing == null ? [...lines, v] : lines.map((l, j) => (j === editing ? v : l)));
        setEditing(null);
        setText('');
        inputRef.current?.focus();
    };
    const remove = (i: number) => { onChange(lines.filter((_, j) => j !== i)); setEditing(null); };
    const edit = (i: number) => { setText(lines[i]); setEditing(i); setOpen(true); setTimeout(() => inputRef.current?.focus(), 0); };
    const cancelEdit = () => { setEditing(null); setText(''); };
    const appendAmount = (a: string) => { setText((t) => (t.trim() ? `${t.trim()} ${a}` : t)); inputRef.current?.focus(); };

    const q = text.trim();
    const suggestions = editing != null ? [] : frequent.filter((l) => !lines.includes(l) && (!q || (l.includes(q) && l !== q))).slice(0, 8);

    return (
        <section className="rounded-2xl border-2 border-[#1A1A1A] bg-white">
            <div className="flex items-center justify-between px-4 pt-3">
                <h2 className="flex items-center gap-2">
                    <span className="inline-block rounded-md px-2 py-0.5 text-sm font-bold border border-[#1A1A1A]" style={{ background: TYPE_COLOR[type] }}>{type}</span>
                    {MAIN_TYPES.includes(type) && !hasAny && <span className="text-[11px] text-[#666]">未記入</span>}
                </h2>
                {!hasAny && yesterday.length > 0 && (
                    <button type="button" onClick={() => onChange(yesterday)} className="text-xs font-bold underline text-[#4A4A4A]">前日と同じにする</button>
                )}
            </div>

            {hasAny && (
                <ul className="px-4 pt-2">
                    {fixed.map((l, i) => (
                        <li key={`f${i}`} className="py-1 text-[15px] text-[#1A1A1A]">・{l}</li>
                    ))}
                    {lines.map((l, i) => (
                        <li key={`${i}-${l}`} className={`flex items-center gap-2 py-1 ${editing === i ? 'bg-[#FBEBD5] -mx-2 px-2 rounded-lg' : ''}`}>
                            <button type="button" onClick={() => edit(i)} className="flex-1 text-left text-[15px] text-[#1A1A1A] break-words" title="タップで直す">・{l}</button>
                            <button type="button" onClick={() => remove(i)} aria-label={`「${l}」を消す`}
                                className="shrink-0 w-7 h-7 rounded-full border border-[#1A1A1A] text-xs font-bold hover:bg-[#FBEBD5]">×</button>
                        </li>
                    ))}
                </ul>
            )}

            <form className="px-4 pt-2 pb-3" onSubmit={(e) => { e.preventDefault(); add(); }}>
                <div className="flex gap-2">
                    <input ref={inputRef} type="text" value={text} onChange={(e) => setText(e.target.value)} onFocus={() => setOpen(true)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && e.nativeEvent.isComposing) e.preventDefault(); }}
                        placeholder={hasAny ? 'もう 1 品' : '例：おにぎり（鮭） 2個'} enterKeyHint="enter" aria-label={`${type}に食べたもの`}
                        className="flex-1 min-w-0 rounded-lg border-2 border-[#1A1A1A] bg-white px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF9855]" />
                    <button type="submit" disabled={!q} className={`${pillCls} bg-[#FF9855] shrink-0`}>{editing == null ? '追加' : '直す'}</button>
                </div>
                {editing != null && (
                    <button type="button" onClick={cancelEdit} className="mt-1 text-xs font-bold underline text-[#4A4A4A]">直すのをやめる</button>
                )}

                {open && (
                    <div className="mt-2 space-y-2">
                        {q && (
                            <div className="flex flex-wrap gap-1.5" aria-label="量を付ける">
                                {AMOUNTS.map((a) => (
                                    <button key={a} type="button" onClick={() => appendAmount(a)}
                                        className="rounded-full border border-[#1A1A1A] bg-[#FAFAF7] px-2.5 py-1 text-xs font-bold">+{a}</button>
                                ))}
                            </div>
                        )}
                        {suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5" aria-label="前に書いたもの">
                                {suggestions.map((s) => (
                                    <button key={s} type="button" onClick={() => add(s)}
                                        className="rounded-full border border-[#1A1A1A] bg-white px-2.5 py-1 text-xs hover:bg-[#FBEBD5]">{s}</button>
                                ))}
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
        <section aria-label="カレンダー" className="mt-5 rounded-2xl border-2 border-[#1A1A1A] bg-white p-3">
            <div className="flex items-center justify-between">
                <button type="button" onClick={() => go(-1)} aria-label="前の月" className="w-9 h-9 rounded-full font-bold hover:bg-[#FBEBD5]">‹</button>
                <p className="text-sm font-bold text-[#1A1A1A]">
                    {y}年{m}月 <span className="font-normal text-[#4A4A4A]">朝昼夕そろった日 {done} / {days}</span>
                </p>
                <button type="button" onClick={() => go(1)} aria-label="次の月" className="w-9 h-9 rounded-full font-bold hover:bg-[#FBEBD5]">›</button>
            </div>
            <div className="grid grid-cols-7 gap-1 mt-1 text-center">
                {'日月火水木金土'.split('').map((w) => <span key={w} className="text-[10px] text-[#666]">{w}</span>)}
                {cells.map((d, i) => {
                    if (d == null) return <span key={`e${i}`} />;
                    const ds = ymd(y, m, d);
                    const marks = MAIN_TYPES.map((t) => filled(ds, t));
                    const all = marks.every(Boolean);
                    const selected = ds === date;
                    return (
                        <button key={ds} type="button" onClick={() => onSelect(ds)} aria-pressed={selected}
                            aria-label={`${m}月${d}日 ${MAIN_TYPES.map((t, j) => `${t}${marks[j] ? 'あり' : 'なし'}`).join('・')}`}
                            className={`rounded-lg py-1 border-2 ${selected ? 'border-[#1A1A1A]' : 'border-transparent'} ${ds > today ? 'opacity-40' : ''}`}
                            style={{ background: all ? '#DFFBEF' : undefined }}>
                            <span className={`block text-xs ${ds === today ? 'font-bold underline' : ''}`}>{d}</span>
                            <span className="block text-[10px] leading-none tracking-tighter mt-0.5">
                                {MAIN_TYPES.map((t, j) => (
                                    <span key={t} className={marks[j] ? 'text-[#1A1A1A] font-bold' : 'text-[#C8C7C2]'}>{t[0]}</span>
                                ))}
                            </span>
                        </button>
                    );
                })}
            </div>
            <p className="text-[10px] text-[#666] mt-1.5">濃い字＝書いた食事（朝・昼・夕）。緑の日は 3 食そろっています。</p>
        </section>
    );
}

function ExportBox({ month, meals, filled }: { month: string; meals: Meal[]; filled: (d: string, t: MealType) => boolean }) {
    const [y, m] = month.split('-').map(Number);
    const days = new Date(y, m, 0).getDate();
    const today = todayStr();
    const missing = Array.from({ length: days }, (_, i) => ymd(y, m, i + 1))
        .filter((d) => d <= today && MAIN_TYPES.some((t) => !filled(d, t)));
    return (
        <section className="mt-6 rounded-2xl border-2 border-[#1A1A1A] bg-white p-4 shadow-[4px_4px_0_#1A1A1A]">
            <h2 className="text-base font-bold text-[#1A1A1A]">{m}月分を提出用 CSV で書き出す</h2>
            <p className="text-xs text-[#4A4A4A] mt-1">列は「日付・食事タイプ・食事内容」（参考テンプレートと同じ形）。食事内容は「・」の箇条書きになります。</p>
            {missing.length > 0 && (
                <p className="text-xs text-[#1A1A1A] mt-2">
                    <b>まだ書いていない食事がある日：</b>{missing.slice(0, 10).map((d) => Number(d.slice(8))).join('・')}日{missing.length > 10 ? ` ほか ${missing.length - 10} 日` : ''}
                </p>
            )}
            <button type="button" disabled={!meals.length} onClick={() => downloadCsv(toSubmissionCsv(meals, null), `meal-log_${month}`)}
                className={`${pillCls} bg-[#FF9855] w-full mt-3 py-3`}>
                {meals.length ? `${m}月分の CSV を書き出す` : 'この月の記録はまだありません'}
            </button>
        </section>
    );
}
