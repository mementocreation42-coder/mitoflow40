'use client';

import Link from 'next/link';
import { useMemo, useState, useSyncExternalStore } from 'react';
import { parseRange, judge, formatRange, type Sex, type Verdict } from '@/lib/biomarker-ranges';

export interface ReaderItem {
    slug: string; name: string; en: string; category: string; color: string; tagline: string;
    standardRange: string; optimalRange?: string; highSigns: string; lowSigns: string; tip?: string;
}

interface Entry { slug: string; value: number; addedAt: number }

const STORAGE_KEY = 'mf40:reader:v1';
const font = { fontFamily: "'Space Grotesk', sans-serif" } as const;

// ── 端末内ストア（localStorage）──
// サーバーには送らない。useSyncExternalStore で SSR（空）→ クライアント（保存値）を安全に同期する。
interface Saved { sex: Sex; entries: Entry[] }
const EMPTY = '';
const listeners = new Set<() => void>();
function readRaw(): string {
    try { return localStorage.getItem(STORAGE_KEY) ?? EMPTY; } catch { return EMPTY; }
}
function subscribe(cb: () => void) {
    listeners.add(cb);
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) cb(); };
    window.addEventListener('storage', onStorage);
    return () => { listeners.delete(cb); window.removeEventListener('storage', onStorage); };
}
function writeSaved(next: Saved) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    listeners.forEach((cb) => cb());
}
function parseSaved(raw: string, valid: (slug: string) => boolean): Saved {
    const fallback: Saved = { sex: 'female', entries: [] };
    if (!raw) return fallback;
    try {
        const j = JSON.parse(raw) as Partial<Saved>;
        return {
            sex: j.sex === 'male' || j.sex === 'female' ? j.sex : 'female',
            entries: Array.isArray(j.entries) ? j.entries.filter((e) => e && valid(e.slug) && Number.isFinite(e.value)) : [],
        };
    } catch { return fallback; }
}

// 「HbA1c（HbA1c）」のような重複表示を避ける
function optionLabel(i: ReaderItem): string {
    const strip = (x: string) => x.toLowerCase().replace(/[\s（）()\-/]/g, '');
    return strip(i.name).includes(strip(i.en)) ? i.name : `${i.name}（${i.en}）`;
}

const VERDICT_LABEL: Record<Verdict, string> = { below: '低い', within: '範囲内', above: '高い' };
const OPTIMAL_LABEL: Record<Verdict, string> = { below: '低め', within: '範囲内', above: '高め' };
const VERDICT_STYLE: Record<Verdict, React.CSSProperties> = {
    within: { background: '#D5F5EC', color: '#1E7D4F', borderColor: '#94DFC9' },
    below: { background: '#DDEBFA', color: '#2C5AA0', borderColor: '#A9C3E8' },
    above: { background: '#FFE2D6', color: '#9A3E12', borderColor: '#F5B89A' },
};

export default function ReaderClient({ items }: { items: ReaderItem[] }) {
    const [slug, setSlug] = useState(items[0]?.slug ?? '');
    const [value, setValue] = useState('');

    const bySlug = useMemo(() => new Map(items.map((i) => [i.slug, i])), [items]);
    const raw = useSyncExternalStore(subscribe, readRaw, () => EMPTY);
    const saved = useMemo(() => parseSaved(raw, (s) => bySlug.has(s)), [raw, bySlug]);
    const { sex, entries } = saved;
    const setSex = (next: Sex) => writeSaved({ ...saved, sex: next });
    const setEntries = (fn: (prev: Entry[]) => Entry[]) => writeSaved({ ...saved, entries: fn(saved.entries) });
    const categories = useMemo(() => {
        const cats: string[] = [];
        for (const i of items) if (!cats.includes(i.category)) cats.push(i.category);
        return cats;
    }, [items]);
    const selected = bySlug.get(slug);
    const selectedStd = selected ? parseRange(selected.standardRange, sex) : null;

    function add() {
        const v = parseFloat(value.replace(/,/g, ''));
        if (!selected || !Number.isFinite(v)) return;
        setEntries((prev) => [{ slug: selected.slug, value: v, addedAt: Date.now() }, ...prev.filter((e) => e.slug !== selected.slug)]);
        setValue('');
    }
    function remove(s: string) { setEntries((prev) => prev.filter((e) => e.slug !== s)); }
    function clearAll() { if (confirm('入力した数値をすべて消しますか？')) setEntries(() => []); }

    const results = entries.map((e) => {
        const item = bySlug.get(e.slug)!;
        const std = parseRange(item.standardRange, sex);
        const opt = parseRange(item.optimalRange, sex);
        return { e, item, std, opt, stdV: std ? judge(e.value, std) : null, optV: opt ? judge(e.value, opt) : null };
    });
    const outsideStd = results.filter((r) => r.stdV && r.stdV !== 'within').length;
    const outsideOpt = results.filter((r) => r.optV && r.optV !== 'within').length;

    return (
        <div>
            {/* 入力 */}
            <div className="rounded-2xl border border-[#1A1A1A] bg-white/80 p-5 md:p-6 mb-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-[#4A4A4A]">性別（基準値が異なる項目があります）</span>
                    <div className="flex gap-2">
                        {([['female', '女性'], ['male', '男性']] as const).map(([k, label]) => (
                            <button key={k} type="button" onClick={() => setSex(k)}
                                className="px-4 py-1.5 rounded-full text-xs font-bold border transition-colors"
                                style={sex === k ? { background: '#1A1A1A', color: '#fff', borderColor: '#1A1A1A' } : { background: '#fff', color: '#4A4A4A', borderColor: '#1A1A1A55' }}>
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_160px_auto] gap-3 items-end">
                    <label className="block">
                        <span className="block text-[11px] font-bold text-[#4A4A4A] mb-1">検査項目</span>
                        <select value={slug} onChange={(e) => setSlug(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl border border-[#1A1A1A]/30 bg-white text-sm text-[#1A1A1A]">
                            {categories.map((cat) => (
                                <optgroup key={cat} label={cat}>
                                    {items.filter((i) => i.category === cat).map((i) => (
                                        <option key={i.slug} value={i.slug}>{optionLabel(i)}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </label>
                    <label className="block">
                        <span className="block text-[11px] font-bold text-[#4A4A4A] mb-1">数値{selectedStd?.unit ? `（${selectedStd.unit}）` : ''}</span>
                        <input type="number" inputMode="decimal" step="any" value={value} onChange={(e) => setValue(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') add(); }}
                            placeholder={selectedStd ? formatRange(selectedStd).split(/[〜 ]/)[0] : '0'}
                            className="w-full h-11 px-3 rounded-xl border border-[#1A1A1A]/30 bg-white text-sm text-[#1A1A1A]" />
                    </label>
                    <button type="button" onClick={add} disabled={!value}
                        className="h-11 px-6 rounded-full text-sm font-bold bg-[#1A1A1A] text-white disabled:opacity-40" style={font}>
                        照らす
                    </button>
                </div>
                {selected && (
                    <p className="text-[11px] text-[#4A4A4A] mt-3 leading-relaxed">
                        {selected.name}：基準値 {selected.standardRange}{selected.optimalRange ? ` ／ 理想値 ${selected.optimalRange}` : ''}
                    </p>
                )}
            </div>

            {/* 結果 */}
            {results.length > 0 && (
                <div className="mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <p className="text-sm font-bold text-[#1A1A1A]">
                            {results.length} 項目 ・ 基準値外 <span style={{ color: outsideStd ? '#9A3E12' : '#1E7D4F' }}>{outsideStd}</span> ・ 理想値外 <span style={{ color: outsideOpt ? '#8A5A00' : '#1E7D4F' }}>{outsideOpt}</span>
                        </p>
                        <button type="button" onClick={clearAll} className="text-[11px] text-[#4A4A4A] underline">すべて消す</button>
                    </div>
                    <div className="space-y-3">
                        {results.map(({ e, item, std, opt, stdV, optV }) => {
                            const focusV = optV ?? stdV;
                            const signs = focusV === 'above' ? item.highSigns : focusV === 'below' ? item.lowSigns : null;
                            return (
                                <div key={e.slug} className="rounded-2xl border border-[#1A1A1A]/25 bg-white/85 p-4 md:p-5">
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: item.color }}>{item.name}</span>
                                                <span className="text-lg font-bold text-[#1A1A1A]" style={font}>{e.value.toLocaleString('ja-JP')}<span className="text-xs font-normal text-[#4A4A4A] ml-1.5">{std?.unit}</span></span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {std && stdV && <span className="px-2.5 py-1 rounded-full text-[11px] font-bold border" style={VERDICT_STYLE[stdV]}>基準値 {formatRange(std)} → {VERDICT_LABEL[stdV]}</span>}
                                                {opt && optV && <span className="px-2.5 py-1 rounded-full text-[11px] font-bold border" style={VERDICT_STYLE[optV]}>理想値 {formatRange(opt)} → {OPTIMAL_LABEL[optV]}</span>}
                                                {!std && <span className="px-2.5 py-1 rounded-full text-[11px] border" style={{ background: '#F2F2F2', color: '#666', borderColor: '#ddd' }}>基準値：{item.standardRange}</span>}
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => remove(e.slug)} aria-label="削除" className="text-xs text-[#4A4A4A] hover:text-[#1A1A1A]">×</button>
                                    </div>
                                    {signs && (
                                        <p className="text-xs text-[#4A4A4A] mt-3 leading-relaxed">
                                            <span className="font-bold">{focusV === 'above' ? '高いときに考えること：' : '低いときに考えること：'}</span>{signs}
                                        </p>
                                    )}
                                    {item.tip && <p className="text-xs text-[#4A4A4A] mt-1 leading-relaxed"><span className="font-bold">ヒント：</span>{item.tip}</p>}
                                    <Link href={`/biomarkers/${item.slug}`} className="inline-block mt-3 text-xs font-bold text-[#1A1A1A] underline hover:no-underline">{item.name}の解説を読む →</Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {results.length === 0 && (
                <div className="rounded-2xl border border-dashed border-[#1A1A1A]/30 bg-white/50 p-6 text-center text-sm text-[#4A4A4A] mb-6">
                    まだ数値がありません。結果票から気になる項目を1つ入れてみてください。<br />
                    <span className="text-xs">よく見られる項目：フェリチン・HbA1c・LDL・ALT・γ-GTP・TSH・ビタミンD</span>
                </div>
            )}

            {/* まとめて読む導線 */}
            <div className="rounded-2xl border-2 border-[#1A1A1A] p-6 md:p-8 mb-6" style={{ background: '#D5F5EC' }}>
                <p className="text-[10px] tracking-widest font-bold mb-2" style={{ ...font, color: '#FF9855' }}>READ TOGETHER</p>
                <h2 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-2">数値は「1つずつ」より「組み合わせ」で意味が変わる</h2>
                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                    たとえばフェリチンが低くても CRP が高ければ読み方が変わり、HbA1c が基準内でも空腹時インスリンが高ければ話は別です。
                    このツールは位置を確かめるところまで。項目同士のつながりと、問診・生活ログを合わせて読み解くのが解析プランです。
                </p>
                <div className="flex flex-wrap gap-3">
                    <Link href="/plans" className="inline-block px-5 py-2.5 rounded-full text-sm font-bold bg-[#1A1A1A] text-white" style={font}>解析プランを見る →</Link>
                    <Link href="/health-check-guide" className="inline-block px-5 py-2.5 rounded-full text-sm font-bold border border-[#1A1A1A] bg-white text-[#1A1A1A]" style={font}>健康診断の読み方</Link>
                </div>
            </div>

            <p className="text-xs text-[#4A4A4A]/70 leading-relaxed p-4 bg-white/60 rounded-lg">
                ※ 基準値は検査機関・測定法によって異なります。ここでの基準値は一般的な目安、理想値は Mitoflow40 の考える目安であり、診断ではありません。
                基準値を外れている項目、または気になる症状がある場合は、自己判断せず医療機関にご相談ください。入力した数値はこの端末のブラウザにのみ保存されます。
            </p>
        </div>
    );
}
