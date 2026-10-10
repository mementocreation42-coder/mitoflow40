'use client';

import { useEffect, useMemo, useState } from 'react';
import { MEAL_TYPES, downloadCsv, downloadZip, recentFoods, sortMeals, toDailyCsv, toServingsCsv, todayStr, useMealLog, useProfile, type Meal, type MealItem, type MealType } from '@/lib/meal-log';
import { displayName, fmt, loadFoodDb, targetsFor, totalsOf, type FoodDb } from '@/lib/nutrition';
import FoodSearch from '@/components/meal-log/FoodSearch';
import MealEditor, { type Draft } from '@/components/meal-log/MealEditor';
import ProfileSheet from '@/components/meal-log/ProfileSheet';
import Photo from '@/components/meal-log/Photo';
import Sheet from '@/components/meal-log/Sheet';
import { EnergySummary, NutrientTargets } from '@/components/meal-log/NutrientPanel';
import { inputCls, labelCls, pillCls } from '@/components/meal-log/styles';

const TYPE_COLOR: Record<MealType, string> = { 朝食: '#FFB37B', 昼食: '#4AF6C3', 夕食: '#6CCFF6', 間食: '#E5D0E3' };

function shiftDate(date: string, days: number): string {
    const [y, m, d] = date.split('-').map(Number);
    const x = new Date(y, m - 1, d + days);
    return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
}

function weekday(date: string): string {
    const [y, m, d] = date.split('-').map(Number);
    return '日月火水木金土'[new Date(y, m - 1, d).getDay()];
}

type Panel =
    | { kind: 'search'; type: MealType }
    | { kind: 'editor'; draft: Draft }
    | { kind: 'profile' }
    | { kind: 'item'; meal: Meal; item: MealItem }
    | null;

export default function MealLogPage() {
    const { meals, save, remove, addItem, updateItem } = useMealLog();
    const { profile, configured, setProfile } = useProfile();
    const [date, setDate] = useState(todayStr);
    const [db, setDb] = useState<FoodDb | null>(null);
    const [dbError, setDbError] = useState(false);
    const [panel, setPanel] = useState<Panel>(null);
    const [viewer, setViewer] = useState<string | null>(null);
    const [busy, setBusy] = useState<string | null>(null);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    useEffect(() => { loadFoodDb().then(setDb).catch(() => setDbError(true)); }, []);

    const dayMeals = useMemo(() => sortMeals(meals.filter((m) => m.date === date)), [meals, date]);
    const dayItems = dayMeals.flatMap((m) => m.items);
    const totals = useMemo(() => totalsOf(db, dayItems), [db, dayItems]);
    const targets = useMemo(() => targetsFor(profile), [profile]);
    const recent = useMemo(() => recentFoods(meals), [meals]);

    const ranged = useMemo(() => meals.filter((m) => (!from || m.date >= from) && (!to || m.date <= to)), [meals, from, to]);
    const photoCount = ranged.reduce((n, m) => n + m.photos.length, 0);
    const fileBase = `meal-log${from || to ? `_${from || 'start'}_${to || todayStr()}` : `_${todayStr()}`}`;

    const newDraft = (type: MealType): Draft => {
        const d = new Date();
        const time = date === todayStr() ? `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}` : '';
        return { date, time, type, food: '', memo: '', photos: [], items: [] };
    };

    const deleteMeal = (m: Meal) => {
        if (confirm(`${m.date} ${m.type}の記録を削除しますか？（食品 ${m.items.length} 件・写真 ${m.photos.length} 枚も消えます）`)) {
            remove(m.id);
            setPanel(null);
        }
    };

    const exportZip = async () => {
        setBusy('ZIP を作成中…');
        try { await downloadZip(ranged, db, fileBase); } finally { setBusy(null); }
    };

    const isToday = date === todayStr();

    return (
        <div className="pt-[calc(60px+2rem)] md:pt-[calc(60px+4rem)] pb-16 md:pb-24 px-4 md:px-6">
            <div className="max-w-[720px] mx-auto">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-bold tracking-widest text-[#4A4A4A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MEAL LOG</p>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-1">食事記録</h1>
                    </div>
                    <button type="button" onClick={() => setPanel({ kind: 'profile' })} className={`${pillCls} bg-white mt-1 shrink-0`}>目標の設定</button>
                </div>
                <p className="text-sm text-[#666] mt-2">食べたものを選ぶと、エネルギー・PFC・ビタミン・ミネラルを自動で集計します。記録はこの端末のブラウザの中だけに保存され、どこにも送信されません。</p>
                {!configured && (
                    <p className="mt-3 rounded-xl border-2 border-dashed border-[#1A1A1A] bg-white px-3 py-2 text-xs text-[#4A4A4A]">
                        いまの目標は「女性・30〜49歳・活動量ふつう」の値です。<button type="button" onClick={() => setPanel({ kind: 'profile' })} className="font-bold underline">目標の設定</button>で自分に合わせてください。
                    </p>
                )}

                {/* 日付の切り替え */}
                <div className="mt-6 flex items-center justify-between gap-2 rounded-2xl border-2 border-[#1A1A1A] bg-white px-2 py-2">
                    <button type="button" onClick={() => setDate(shiftDate(date, -1))} aria-label="前の日" className="w-10 h-10 rounded-full font-bold text-lg hover:bg-[#FBEBD5]">‹</button>
                    <label className="relative flex flex-col items-center cursor-pointer">
                        <span className="text-base font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {date.replace(/-/g, '.')}（{weekday(date)}）
                        </span>
                        <span className="text-[11px] text-[#4A4A4A]">{isToday ? '今日' : 'タップで日付を選ぶ'}</span>
                        <input type="date" value={date} onChange={(e) => e.target.value && setDate(e.target.value)} aria-label="日付を選ぶ"
                            className="absolute inset-0 opacity-0 cursor-pointer" />
                    </label>
                    <div className="flex items-center">
                        {!isToday && <button type="button" onClick={() => setDate(todayStr())} className="text-xs font-bold underline px-1">今日</button>}
                        <button type="button" onClick={() => setDate(shiftDate(date, 1))} aria-label="次の日" className="w-10 h-10 rounded-full font-bold text-lg hover:bg-[#FBEBD5]">›</button>
                    </div>
                </div>

                <div className="mt-4"><EnergySummary totals={totals} targets={targets} /></div>

                {/* 日記（区分ごと） */}
                <div className="mt-4 space-y-3">
                    {MEAL_TYPES.map((type) => {
                        const list = dayMeals.filter((m) => m.type === type);
                        const kcal = totalsOf(db, list.flatMap((m) => m.items)).values.kcal;
                        return (
                            <section key={type} className="rounded-2xl border-2 border-[#1A1A1A] bg-white">
                                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#ECEBE6]">
                                    <h2 className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A]">
                                        <span className="inline-block rounded-md px-2 py-0.5 text-xs border border-[#1A1A1A]" style={{ background: TYPE_COLOR[type] }}>{type}</span>
                                        {list.some((m) => m.time) && <span className="text-xs font-normal text-[#4A4A4A]">{list.map((m) => m.time).filter(Boolean).join('・')}</span>}
                                    </h2>
                                    <span className="text-sm font-bold tabular-nums text-[#1A1A1A]">{fmt(kcal, 0)} <span className="text-[11px] font-normal">kcal</span></span>
                                </div>

                                {list.map((m) => (
                                    <div key={m.id} className="px-4 py-2 border-b border-[#ECEBE6] last:border-b-0">
                                        {m.items.length > 0 && (
                                            <ul>
                                                {m.items.map((it) => {
                                                    const k = totalsOf(db, [it]).values.kcal;
                                                    return (
                                                        <li key={it.id}>
                                                            <button type="button" onClick={() => setPanel({ kind: 'item', meal: m, item: it })}
                                                                className="w-full text-left flex items-center gap-3 py-1.5 hover:bg-[#FAFAF7]">
                                                                <span className="flex-1 min-w-0 text-[14px] text-[#1A1A1A] break-words">{displayName(it.name)}</span>
                                                                <span className="shrink-0 text-xs text-[#4A4A4A] tabular-nums">{it.grams}g</span>
                                                                <span className="shrink-0 w-16 text-right text-xs tabular-nums text-[#1A1A1A]">{db ? `${fmt(k, 0)} kcal` : '…'}</span>
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                        {(m.food || m.memo || m.photos.length > 0) && (
                                            <div className="py-1.5">
                                                {m.food && <p className="text-[14px] text-[#1A1A1A] whitespace-pre-wrap break-words">{m.food}</p>}
                                                {m.memo && <p className="text-xs text-[#666] mt-0.5 break-words">{m.memo}</p>}
                                                {m.photos.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {m.photos.map((id) => <Photo key={id} id={id} className="w-20 h-20 rounded-lg border border-[#1A1A1A]" onOpen={setViewer} />)}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <button type="button" onClick={() => setPanel({ kind: 'editor', draft: { ...m } })} className="text-xs font-bold underline text-[#4A4A4A] mt-1">
                                            写真・メモ・時刻を編集
                                        </button>
                                    </div>
                                ))}

                                <div className="flex gap-2 px-4 py-2.5">
                                    <button type="button" onClick={() => setPanel({ kind: 'search', type })} className={`${pillCls} bg-[#FF9855] flex-1`}>＋ 食品</button>
                                    {list.length === 0 && (
                                        <button type="button" onClick={() => setPanel({ kind: 'editor', draft: newDraft(type) })} className={`${pillCls} bg-white`}>写真・メモ</button>
                                    )}
                                </div>
                            </section>
                        );
                    })}
                </div>

                <div className="mt-4"><NutrientTargets totals={totals} targets={targets} hasItems={dayItems.length > 0} /></div>

                {/* 書き出し */}
                <section className="mt-4 rounded-2xl border-2 border-[#1A1A1A] bg-white p-4 md:p-5">
                    <h2 className="text-base font-bold text-[#1A1A1A]">CSV で書き出す</h2>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                            <label className={labelCls} htmlFor="ml-from">開始日（空欄ならすべて）</label>
                            <input id="ml-from" type="date" className={inputCls} value={from} onChange={(e) => setFrom(e.target.value)} />
                        </div>
                        <div>
                            <label className={labelCls} htmlFor="ml-to">終了日</label>
                            <input id="ml-to" type="date" className={inputCls} value={to} onChange={(e) => setTo(e.target.value)} />
                        </div>
                    </div>
                    <p className="text-xs text-[#4A4A4A] mt-2">対象：{ranged.length} 件の記録（{new Set(ranged.map((m) => m.date)).size} 日分）</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" disabled={!ranged.length || !db} onClick={() => downloadCsv(toServingsCsv(ranged, db), `${fileBase}_foods`)} className={`${pillCls} bg-[#4AF6C3]`}>
                            食品ごとの記録
                        </button>
                        <button type="button" disabled={!ranged.length || !db} onClick={() => downloadCsv(toDailyCsv(ranged, db), `${fileBase}_daily`)} className={`${pillCls} bg-[#4AF6C3]`}>
                            1 日ごとの栄養合計
                        </button>
                        <button type="button" disabled={!ranged.length || !db || !!busy} onClick={exportZip} className={`${pillCls} bg-[#6CCFF6]`}>
                            両方＋写真（ZIP{photoCount ? `・${photoCount} 枚` : ''}）
                        </button>
                    </div>
                    <p className="text-[11px] text-[#666] mt-2 leading-relaxed">
                        「食品ごと」は 1 食品 1 行（日付・区分・食品番号・量・34 栄養素・自由記述・メモ・写真）、「1 日ごと」は 1 日 1 行の合計です。UTF-8 で、Excel でもそのまま開けます。
                        写真列のファイル名は ZIP の photos フォルダ内の写真に対応します。
                    </p>
                    {busy && <p className="text-xs font-bold text-[#4A4A4A] mt-2" role="status">{busy}</p>}
                </section>

                <p className="text-[11px] text-[#666] mt-6 leading-relaxed">
                    食品の成分値：文部科学省「日本食品標準成分表（八訂）増補2023年」{db ? `（${db.updated} 更新版）` : ''}。目標値：厚生労働省「日本人の食事摂取基準（2025年版）」。
                    病気の治療中の方は、医師・管理栄養士の指示を優先してください。
                </p>
            </div>

            {panel?.kind === 'search' && (
                <FoodSearch db={db} dbError={dbError} type={panel.type} recent={recent} onClose={() => setPanel(null)}
                    onAdd={(food, grams) => { addItem(date, panel.type, food.code, food.name, grams); setPanel(null); }} />
            )}
            {panel?.kind === 'editor' && (
                <MealEditor initial={panel.draft} savedPhotos={meals.find((m) => m.id === panel.draft.id)?.photos ?? []}
                    onClose={() => setPanel(null)} onOpenPhoto={setViewer}
                    onSave={(d) => { save(d); if (d.date !== date) setDate(d.date); setPanel(null); }}
                    onDelete={panel.draft.id ? () => deleteMeal(meals.find((m) => m.id === panel.draft.id)!) : undefined} />
            )}
            {panel?.kind === 'profile' && <ProfileSheet profile={profile} onSave={setProfile} onClose={() => setPanel(null)} />}
            {panel?.kind === 'item' && (
                <ItemEditor db={db} item={panel.item} onClose={() => setPanel(null)}
                    onSave={(g) => { updateItem(panel.meal.id, panel.item.id, g); setPanel(null); }} />
            )}

            {viewer && (
                <div className="fixed inset-0 z-[100] bg-[#1A1A1A]/80 flex items-center justify-center p-4" onClick={() => setViewer(null)}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- 端末内の写真（blob URL） */}
                    <img src={viewer} alt="" className="max-w-full max-h-full rounded-xl" />
                    <button type="button" aria-label="閉じる" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white border-2 border-[#1A1A1A] font-bold">×</button>
                </div>
            )}
        </div>
    );
}

// 追加済みの食品の量を変える・外す
function ItemEditor({ db, item, onSave, onClose }: { db: FoodDb | null; item: MealItem; onSave: (grams: number | null) => void; onClose: () => void }) {
    const [grams, setGrams] = useState(String(item.grams));
    const g = Number(grams);
    const valid = Number.isFinite(g) && g > 0 && g <= 5000;
    const v = valid ? totalsOf(db, [{ code: item.code, grams: g }]).values : null;
    return (
        <Sheet title="量を変える" onClose={onClose}>
            <p className="text-[15px] font-bold text-[#1A1A1A]">{displayName(item.name)}</p>
            <label className={`${labelCls} mt-4`} htmlFor="ie-g">量（g）</label>
            <input id="ie-g" type="number" inputMode="decimal" min={1} max={5000} step="any" autoFocus className={`${inputCls} max-w-[120px]`}
                value={grams} onChange={(e) => setGrams(e.target.value)} />
            {v && <p className="text-sm text-[#4A4A4A] mt-2 tabular-nums">{fmt(v.kcal, 0)} kcal・たんぱく質 {fmt(v.prot, 1)}g・脂質 {fmt(v.fat, 1)}g・炭水化物 {fmt(v.carb, 1)}g</p>}
            <button type="button" disabled={!valid} onClick={() => onSave(Math.round(g * 10) / 10)} className={`${pillCls} w-full mt-5 py-3 bg-[#FF9855]`}>保存する</button>
            <button type="button" onClick={() => onSave(null)} className="w-full mt-3 text-sm font-bold underline text-[#d03b3b]">この食品を外す</button>
        </Sheet>
    );
}

