'use client';

import { useMemo, useState } from 'react';
import { MEAL_TYPES, downloadCsv, sortMeals, todayStr, useMealLog, type Meal, type MealType } from '@/lib/meal-log';

const TYPE_COLOR: Record<MealType, string> = {
    朝食: '#FFB37B',
    昼食: '#4AF6C3',
    夕食: '#6CCFF6',
    間食: '#E5D0E3',
};

function nowTime(): string {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// 時刻から区分を推定（あとで変えられる）
function guessType(time: string): MealType {
    const h = Number(time.slice(0, 2));
    if (h >= 4 && h < 11) return '朝食';
    if (h >= 11 && h < 15) return '昼食';
    if (h >= 17 && h < 23) return '夕食';
    return '間食';
}

function weekday(date: string): string {
    const [y, m, d] = date.split('-').map(Number);
    return '日月火水木金土'[new Date(y, m - 1, d).getDay()];
}

type Draft = Omit<Meal, 'id'> & { id?: string };

function freshDraft(): Draft {
    const time = nowTime();
    return { date: todayStr(), time, type: guessType(time), food: '', memo: '' };
}

const inputCls = 'w-full rounded-lg border-2 border-[#1A1A1A] bg-white px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF9855]';
const labelCls = 'block text-xs font-bold text-[#4A4A4A] mb-1';

export default function MealLogPage() {
    const { meals, save, remove } = useMealLog();
    const [draft, setDraft] = useState<Draft>(freshDraft);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const filtered = useMemo(
        () => sortMeals(meals.filter((m) => (!from || m.date >= from) && (!to || m.date <= to))),
        [meals, from, to],
    );
    const byDate = useMemo(() => {
        const g = new Map<string, Meal[]>();
        for (const m of filtered) g.set(m.date, [...(g.get(m.date) ?? []), m]);
        return [...g.entries()];
    }, [filtered]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!draft.food.trim()) return;
        save({ ...draft, food: draft.food.trim(), memo: draft.memo.trim() });
        setDraft(freshDraft());
    };

    const edit = (m: Meal) => {
        setDraft({ ...m });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const del = (m: Meal) => {
        if (confirm(`${m.date} ${m.type}「${m.food}」を削除しますか？`)) {
            remove(m.id);
            if (draft.id === m.id) setDraft(freshDraft());
        }
    };

    const exportCsv = () => {
        const range = from || to ? `_${from || 'start'}_${to || todayStr()}` : `_${todayStr()}`;
        downloadCsv(filtered, `meal-log${range}.csv`);
    };

    return (
        <div className="pt-[calc(60px+2rem)] md:pt-[calc(60px+4rem)] pb-16 md:pb-24 px-4 md:px-6">
            <div className="max-w-[720px] mx-auto">
                <p className="text-[11px] font-bold tracking-widest text-[#4A4A4A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MEAL LOG</p>
                <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-1">食事記録</h1>
                <p className="text-sm text-[#666] mt-2">毎日の食事を記録して、CSV で書き出せます。記録はこの端末のブラウザの中だけに保存され、どこにも送信されません。</p>

                {/* 入力フォーム */}
                <form onSubmit={submit} className="mt-6 rounded-2xl border-2 border-[#1A1A1A] bg-white p-4 md:p-6 shadow-[4px_4px_0_#1A1A1A]">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelCls} htmlFor="ml-date">日付</label>
                            <input id="ml-date" type="date" required className={inputCls} value={draft.date}
                                onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelCls} htmlFor="ml-time">時刻</label>
                            <input id="ml-time" type="time" className={inputCls} value={draft.time}
                                onChange={(e) => setDraft({ ...draft, time: e.target.value })} />
                        </div>
                    </div>

                    <div className="mt-4">
                        <span className={labelCls}>区分</span>
                        <div className="grid grid-cols-4 gap-2">
                            {MEAL_TYPES.map((t) => (
                                <button key={t} type="button" onClick={() => setDraft({ ...draft, type: t })}
                                    className="rounded-lg border-2 border-[#1A1A1A] py-2 text-sm font-bold transition-colors"
                                    style={{ background: draft.type === t ? TYPE_COLOR[t] : '#fff' }}
                                    aria-pressed={draft.type === t}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className={labelCls} htmlFor="ml-food">食べたもの</label>
                        <textarea id="ml-food" required rows={3} className={inputCls} value={draft.food}
                            placeholder="例：玄米ごはん、納豆、味噌汁（わかめ・豆腐）、焼き鮭"
                            onChange={(e) => setDraft({ ...draft, food: e.target.value })} />
                    </div>

                    <div className="mt-4">
                        <label className={labelCls} htmlFor="ml-memo">メモ（任意）</label>
                        <input id="ml-memo" type="text" className={inputCls} value={draft.memo}
                            placeholder="例：腹八分目。食後に眠気なし"
                            onChange={(e) => setDraft({ ...draft, memo: e.target.value })} />
                    </div>

                    <div className="mt-5 flex gap-2">
                        <button type="submit" className="flex-1 rounded-full border-2 border-[#1A1A1A] bg-[#FF9855] py-3 font-bold text-[#1A1A1A] hover:brightness-105">
                            {draft.id ? '更新する' : '記録する'}
                        </button>
                        {draft.id && (
                            <button type="button" onClick={() => setDraft(freshDraft())}
                                className="rounded-full border-2 border-[#1A1A1A] bg-white px-5 py-3 font-bold">
                                やめる
                            </button>
                        )}
                    </div>
                </form>

                {/* 期間と書き出し */}
                <div className="mt-8 rounded-2xl border-2 border-[#1A1A1A] bg-white p-4 md:p-5">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelCls} htmlFor="ml-from">表示・書き出しの開始日</label>
                            <input id="ml-from" type="date" className={inputCls} value={from} onChange={(e) => setFrom(e.target.value)} />
                        </div>
                        <div>
                            <label className={labelCls} htmlFor="ml-to">終了日</label>
                            <input id="ml-to" type="date" className={inputCls} value={to} onChange={(e) => setTo(e.target.value)} />
                        </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                        <button type="button" onClick={exportCsv} disabled={!filtered.length}
                            className="rounded-full border-2 border-[#1A1A1A] bg-[#4AF6C3] px-5 py-2 font-bold disabled:opacity-40">
                            CSV で書き出す（{filtered.length} 件）
                        </button>
                        {(from || to) && (
                            <button type="button" onClick={() => { setFrom(''); setTo(''); }} className="text-sm underline text-[#4A4A4A]">
                                期間をクリア
                            </button>
                        )}
                    </div>
                    <p className="text-[11px] text-[#666] mt-2">列：日付・時刻・区分・食べたもの・メモ（UTF-8 / Excel でそのまま開けます）</p>
                </div>

                {/* 一覧 */}
                <div className="mt-8 space-y-6">
                    {byDate.length === 0 && (
                        <p className="text-center text-sm text-[#666] py-10">
                            {meals.length ? 'この期間の記録はありません。' : 'まだ記録がありません。最初の一食を記録してみましょう。'}
                        </p>
                    )}
                    {byDate.map(([date, list]) => (
                        <section key={date}>
                            <h2 className="text-sm font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                {date.replace(/-/g, '.')}（{weekday(date)}）
                                <span className="ml-2 text-xs font-normal text-[#666]">{list.length} 件</span>
                            </h2>
                            <ul className="space-y-2">
                                {list.map((m) => (
                                    <li key={m.id} className="rounded-xl border-2 border-[#1A1A1A] bg-white p-3 flex gap-3">
                                        <div className="shrink-0 w-14 text-center">
                                            <span className="inline-block rounded-md px-2 py-0.5 text-xs font-bold border border-[#1A1A1A]" style={{ background: TYPE_COLOR[m.type] }}>{m.type}</span>
                                            <div className="text-xs text-[#4A4A4A] mt-1">{m.time || '—'}</div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[15px] text-[#1A1A1A] whitespace-pre-wrap break-words">{m.food}</p>
                                            {m.memo && <p className="text-xs text-[#666] mt-1 break-words">{m.memo}</p>}
                                        </div>
                                        <div className="shrink-0 flex flex-col gap-1">
                                            <button type="button" onClick={() => edit(m)} className="text-xs font-bold underline">編集</button>
                                            <button type="button" onClick={() => del(m)} className="text-xs font-bold underline text-[#C0392B]">削除</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
