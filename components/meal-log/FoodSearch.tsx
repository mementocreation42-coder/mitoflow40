'use client';

import { useMemo, useState } from 'react';
import Sheet from './Sheet';
import { inputCls, labelCls, pillCls, PFC_COLOR } from './styles';
import { displayName, fmt, searchFoods, totalsOf, type Food, type FoodDb } from '@/lib/nutrition';
import type { MealItem, MealType } from '@/lib/meal-log';

const QUICK_GRAMS = [50, 100, 150, 200];

// 食品を探して量を入れる（Cronometer の「Add Food」に相当）
export default function FoodSearch({ db, dbError, type, recent, onAdd, onClose }: {
    db: FoodDb | null;
    dbError: boolean;
    type: MealType;
    recent: MealItem[];
    onAdd: (food: Food, grams: number) => void;
    onClose: () => void;
}) {
    const [query, setQuery] = useState('');
    const [picked, setPicked] = useState<Food | null>(null);
    const [grams, setGrams] = useState('100');

    const results = useMemo(() => (db ? searchFoods(db, query) : []), [db, query]);
    const recentFoods = useMemo(
        () => (db ? recent.map((r) => ({ food: db.byCode.get(r.code), grams: r.grams })).filter((r): r is { food: Food; grams: number } => !!r.food) : []),
        [db, recent],
    );

    const g = Number(grams);
    const valid = Number.isFinite(g) && g > 0 && g <= 5000;
    const preview = picked && valid ? totalsOf(db, [{ code: picked.code, grams: g }]).values : null;

    const pick = (f: Food, defaultGrams = 100) => { setPicked(f); setGrams(String(defaultGrams)); };

    return (
        <Sheet title={`${type}に食品を追加`} onClose={onClose}>
            {!picked ? (
                <>
                    <label className={labelCls} htmlFor="fs-q">食品名で検索（例：鮭 焼き、納豆、ご飯、ブロッコリー ゆで）</label>
                    <input id="fs-q" type="search" autoFocus className={inputCls} value={query} onChange={(e) => setQuery(e.target.value)}
                        placeholder="食品名を入力" enterKeyHint="search" />

                    {dbError && <p className="text-sm text-[#d03b3b] mt-3">食品データを読み込めませんでした。通信状態を確かめて開き直してください。</p>}
                    {!db && !dbError && <p className="text-sm text-[#666] mt-3" role="status">食品データを読み込み中…</p>}

                    {db && !query.trim() && recentFoods.length > 0 && (
                        <>
                            <p className="text-xs font-bold text-[#4A4A4A] mt-4 mb-1">最近使った食品</p>
                            <FoodList items={recentFoods.map((r) => ({ food: r.food, note: `前回 ${r.grams}g` }))} onPick={(f, i) => pick(f, recentFoods[i].grams)} />
                        </>
                    )}
                    {db && query.trim() && (
                        results.length
                            ? <FoodList items={results.map((f) => ({ food: f }))} onPick={(f) => pick(f)} />
                            : (
                                <div className="text-sm text-[#666] mt-4 space-y-2">
                                    <p>見つかりませんでした。ひらがなや別の言い方（例：「豚」→「ぶた」）でも試してください。</p>
                                    <p>成分表は食材が中心です。料理は材料ごとに追加してください（例：みそ汁 ＝ 米みそ 12g ＋ 豆腐 30g ＋ わかめ 5g）。外食などは「写真・メモ」に書いておくこともできます。</p>
                                </div>
                            )
                    )}
                    {db && <p className="text-[11px] text-[#666] mt-4">{db.source}（{db.updated} 更新）の {db.foods.length.toLocaleString()} 食品から探せます。値は可食部 100g 当たり。</p>}
                </>
            ) : (
                <>
                    <button type="button" onClick={() => setPicked(null)} className="text-sm font-bold underline text-[#4A4A4A]">← 検索に戻る</button>
                    <p className="mt-3 text-[15px] font-bold text-[#1A1A1A]">{displayName(picked.name)}</p>
                    <p className="text-xs text-[#666]">{picked.group}・食品番号 {picked.code}</p>

                    <div className="mt-4">
                        <label className={labelCls} htmlFor="fs-g">量（g）</label>
                        <div className="flex gap-2 items-center">
                            <input id="fs-g" type="number" inputMode="decimal" min={1} max={5000} step="any" className={`${inputCls} max-w-[120px]`}
                                value={grams} onChange={(e) => setGrams(e.target.value)} />
                            <span className="text-sm text-[#4A4A4A]">g</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {QUICK_GRAMS.map((q) => (
                                <button key={q} type="button" onClick={() => setGrams(String(q))}
                                    className="rounded-full border-2 border-[#1A1A1A] px-3 py-1 text-xs font-bold"
                                    style={{ background: Number(grams) === q ? '#FFB37B' : '#fff' }}>{q}g</button>
                            ))}
                        </div>
                        <p className="text-[11px] text-[#666] mt-2">皮・骨などを除いた、食べる部分の重さで入れてください。</p>
                    </div>

                    {preview && (
                        <dl className="mt-4 grid grid-cols-4 gap-2 text-center">
                            {([['エネルギー', preview.kcal, 'kcal', 0, null], ['たんぱく質', preview.prot, 'g', 1, PFC_COLOR.prot], ['脂質', preview.fat, 'g', 1, PFC_COLOR.fat], ['炭水化物', preview.carb, 'g', 1, PFC_COLOR.carb]] as const).map(([label, v, unit, d, color]) => (
                                <div key={label} className="rounded-lg border-2 border-[#1A1A1A] p-2">
                                    <dt className="text-[10px] font-bold text-[#4A4A4A] flex items-center justify-center gap-1">
                                        {color && <span className="inline-block w-2 h-2 rounded-full" style={{ background: color }} />}{label}
                                    </dt>
                                    <dd className="text-sm font-bold text-[#1A1A1A]">{fmt(v, d)}<span className="text-[10px] font-normal ml-0.5">{unit}</span></dd>
                                </div>
                            ))}
                        </dl>
                    )}

                    <button type="button" disabled={!valid} onClick={() => onAdd(picked, Math.round(g * 10) / 10)}
                        className={`${pillCls} w-full mt-5 py-3 bg-[#FF9855]`}>
                        {type}に追加する
                    </button>
                </>
            )}
        </Sheet>
    );
}

function FoodList({ items, onPick }: { items: { food: Food; note?: string }[]; onPick: (f: Food, i: number) => void }) {
    return (
        <ul className="mt-3 divide-y divide-[#ECEBE6] border-y border-[#ECEBE6]">
            {items.map(({ food, note }, i) => (
                <li key={food.code}>
                    <button type="button" onClick={() => onPick(food, i)} className="w-full text-left py-2.5 px-1 flex items-center gap-3 hover:bg-[#FAFAF7]">
                        <span className="flex-1 min-w-0">
                            <span className="block text-[14px] text-[#1A1A1A] break-words">{displayName(food.name)}</span>
                            <span className="block text-[11px] text-[#666]">{food.group}{note ? `・${note}` : ''}</span>
                        </span>
                        <span className="shrink-0 text-xs text-[#4A4A4A] tabular-nums">{food.values.kcal ?? '—'} kcal<span className="text-[10px]">/100g</span></span>
                    </button>
                </li>
            ))}
        </ul>
    );
}
