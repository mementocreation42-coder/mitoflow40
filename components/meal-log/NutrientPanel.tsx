'use client';

import { NUTRIENTS, NUTRIENT_BY_KEY, PFC_RANGE, fmt, type NutrientGroup, type NutrientKey, type Target, type Totals } from '@/lib/nutrition';
import { PFC_COLOR, STATUS } from './styles';

type Targets = Partial<Record<NutrientKey, Target>>;

// エネルギーと PFC（Cronometer の Energy Summary に相当）
export function EnergySummary({ totals, targets }: { totals: Totals; targets: Targets }) {
    const v = totals.values;
    const kcalTarget = targets.kcal!.value;
    const pfcKcal = { prot: v.prot * 4, fat: v.fat * 9, carb: v.carb * 4 };
    const sum = pfcKcal.prot + pfcKcal.fat + pfcKcal.carb;
    const pct = (k: keyof typeof pfcKcal) => (sum ? Math.round((pfcKcal[k] / sum) * 100) : 0);
    const remaining = kcalTarget - v.kcal;

    return (
        <section aria-label="エネルギーと PFC" className="rounded-2xl border-2 border-[#1A1A1A] bg-white p-4 md:p-5">
            <div className="flex items-end justify-between gap-3">
                <div>
                    <p className="text-[11px] font-bold tracking-widest text-[#4A4A4A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ENERGY</p>
                    <p className="text-3xl font-bold text-[#1A1A1A] tabular-nums leading-tight">
                        {fmt(v.kcal, 0)}<span className="text-sm font-normal text-[#4A4A4A]"> / {fmt(kcalTarget, 0)} kcal</span>
                    </p>
                </div>
                <p className="text-xs text-[#4A4A4A] text-right">
                    {remaining >= 0 ? <>あと <b className="text-[#1A1A1A] tabular-nums">{fmt(remaining, 0)}</b> kcal</> : <><b className="text-[#1A1A1A] tabular-nums">{fmt(-remaining, 0)}</b> kcal 多い</>}
                </p>
            </div>
            <Meter value={v.kcal} target={kcalTarget} kind="min" />

            <div className="grid grid-cols-3 gap-2 mt-4">
                {(['prot', 'fat', 'carb'] as const).map((k) => {
                    const t = targets[k]!;
                    return (
                        <div key={k} className="rounded-xl border border-[#1A1A1A] p-2.5">
                            <p className="text-[11px] font-bold text-[#4A4A4A] flex items-center gap-1">
                                <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: PFC_COLOR[k] }} />{NUTRIENT_BY_KEY[k].label}
                            </p>
                            <p className="text-base font-bold text-[#1A1A1A] tabular-nums leading-tight mt-0.5">{fmt(v[k], 1)}<span className="text-[11px] font-normal">g</span></p>
                            <p className="text-[10px] text-[#4A4A4A] tabular-nums mb-1">目標 {t.value}g</p>
                            <Meter value={v[k]} target={t.value} kind="min" thin />
                        </div>
                    );
                })}
            </div>

            <div className="mt-4">
                <p className="text-[11px] font-bold text-[#4A4A4A] mb-1.5">エネルギーの内訳（PFC バランス）</p>
                <div className="flex h-3 w-full gap-[2px] rounded-[4px] overflow-hidden" style={{ background: STATUS.track }}
                    role="img" aria-label={`たんぱく質 ${pct('prot')}%、脂質 ${pct('fat')}%、炭水化物 ${pct('carb')}%`}>
                    {sum > 0 && (['prot', 'fat', 'carb'] as const).map((k) => (
                        <div key={k} title={`${NUTRIENT_BY_KEY[k].label} ${pct(k)}%（${fmt(pfcKcal[k], 0)} kcal）`}
                            style={{ width: `${(pfcKcal[k] / sum) * 100}%`, background: PFC_COLOR[k] }} />
                    ))}
                </div>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#1A1A1A]">
                    {(['prot', 'fat', 'carb'] as const).map((k) => (
                        <li key={k} className="flex items-center gap-1">
                            <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: PFC_COLOR[k] }} />
                            {NUTRIENT_BY_KEY[k].label} <b className="tabular-nums">{pct(k)}%</b>
                            <span className="text-[#666]">（目標 {PFC_RANGE[k][0]}〜{PFC_RANGE[k][1]}%）</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

// 栄養素ごとの目標達成バー（Cronometer の Nutrient Targets に相当）
export function NutrientTargets({ totals, targets, hasItems }: { totals: Totals; targets: Targets; hasItems: boolean }) {
    const groups: NutrientGroup[] = ['基本', 'ビタミン', 'ミネラル'];
    const anyMissing = Object.keys(totals.missing).length > 0;
    return (
        <section aria-label="栄養素" className="rounded-2xl border-2 border-[#1A1A1A] bg-white p-4 md:p-5">
            <h2 className="text-base font-bold text-[#1A1A1A]">栄養素の目標</h2>
            {!hasItems && <p className="text-xs text-[#666] mt-1">食品を追加すると、ここに 1 日の合計が出ます。</p>}
            {groups.map((g) => (
                <div key={g} className="mt-4">
                    <h3 className="text-xs font-bold tracking-wider text-[#4A4A4A] mb-1">{g}</h3>
                    <ul className="divide-y divide-[#ECEBE6]">
                        {NUTRIENTS.filter((n) => n.group === g && n.key !== 'kcal').map((n) => (
                            <NutrientRow key={n.key} k={n.key} value={totals.values[n.key]} target={targets[n.key]} missing={totals.missing[n.key]} />
                        ))}
                    </ul>
                </div>
            ))}
            <p className="text-[11px] text-[#666] mt-4 leading-relaxed">
                目標は「日本人の食事摂取基準（2025年版）」の推奨量・目安量・目標量。脂質と炭水化物はエネルギー比の目標量（脂質 20〜30%・炭水化物 50〜65%）の中央をグラムに換算、たんぱく質は推奨量とエネルギー比の下限の大きいほうです。
                上限は、通常の食品からとる量に耐容上限量が決まっている栄養素だけに表示します。
                {anyMissing && ' ＊ は成分表で未測定の食品を 0 として計算した栄養素です（実際はもう少し多い可能性があります）。'}
            </p>
        </section>
    );
}

function NutrientRow({ k, value, target, missing }: { k: NutrientKey; value: number; target?: Target; missing?: number }) {
    const n = NUTRIENT_BY_KEY[k];
    const status = target ? statusOf(value, target) : null;
    return (
        <li className="py-2">
            <div className="flex items-baseline justify-between gap-2 text-[13px]">
                <span className="text-[#1A1A1A]">
                    {n.label}{missing ? <span className="text-[#666]" title={`未測定の食品 ${missing} 件を 0 として計算`}>＊</span> : null}
                </span>
                <span className="text-right text-[#1A1A1A] tabular-nums">
                    <b>{fmt(value, n.digits)}</b>
                    {target && <span className="text-[#4A4A4A]"> / {fmt(target.value, n.digits === 0 ? 0 : Math.min(n.digits, 1))}{target.kind === 'max' ? ' 未満' : ''}</span>}
                    <span className="text-[11px] text-[#4A4A4A]"> {n.unit}</span>
                </span>
            </div>
            {target && (
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1"><Meter value={value} target={target.value} kind={target.kind} ul={target.ul} thin title={`${target.basis}${target.ul ? `・耐容上限量 ${target.ul}${n.unit}` : ''}`} /></div>
                    <span className="w-[76px] shrink-0 text-right text-[11px] tabular-nums text-[#1A1A1A]">
                        {status === 'over' ? <b style={{ color: STATUS.critical }}>⚠ {target.kind === 'max' ? '目標超え' : '上限超え'}</b>
                            : status === 'met' ? <span><span style={{ color: STATUS.good }}>✓</span> {target.kind === 'max' ? '目標内' : `${Math.round((value / target.value) * 100)}%`}</span>
                            : `${Math.round((value / target.value) * 100)}%`}
                    </span>
                </div>
            )}
        </li>
    );
}

function statusOf(value: number, t: Target): 'under' | 'met' | 'over' {
    if (t.kind === 'max') return value < t.value ? 'met' : 'over';
    if (t.ul != null && value > t.ul) return 'over';
    return value >= t.value ? 'met' : 'under';
}

function Meter({ value, target, kind, ul, thin, title }: { value: number; target: number; kind: 'min' | 'max'; ul?: number; thin?: boolean; title?: string }) {
    const status = statusOf(value, { value: target, kind, basis: '目標量', ul });
    const ratio = target > 0 ? value / target : 0;
    const color = status === 'over' ? STATUS.critical : status === 'met' && kind === 'min' ? STATUS.good : STATUS.neutral;
    return (
        <div className={`relative w-full ${thin ? 'h-2' : 'h-3 mt-2'} rounded-[4px] overflow-hidden`} style={{ background: STATUS.track }} title={title}>
            <div className="h-full rounded-[4px]" style={{ width: `${Math.min(ratio, 1) * 100}%`, background: color }} />
        </div>
    );
}
