// ── 基準値・理想値の文字列を数値レンジに解釈する ─────────────────────
// lib/biomarkers.ts の standardRange / optimalRange は人が読む文字列（例：
//   '男性 13.5〜17.5 g/dL、女性 11.5〜15.0 g/dL' / '40 mg/dL以上' / '1.6以下（目安）'）。
// 検査値リーダー（/biomarkers/reader）が数値判定に使えるよう、ここで構造化する。
// 解釈できない書式は null を返し、呼び出し側は文字列表示にフォールバックする。

export type Sex = 'male' | 'female';

export interface NumericRange {
    min?: number;      // 下限（未定義＝下限なし）
    max?: number;      // 上限（未定義＝上限なし）
    unit: string;      // 表示用単位（抽出できなければ ''）
    raw: string;       // 元の文字列（この性別ぶん）
}

const NUM = '(\\d[\\d,]*(?:\\.\\d+)?)(万)?';

function toNumber(s: string, man?: string): number {
    const n = parseFloat(s.replace(/,/g, ''));
    return man ? n * 10000 : n;
}

// 数値のあとに続く単位（'万/μL' の '万' は数値側で消費済み）
function unitAfter(text: string, idx: number): string {
    const rest = text.slice(idx);
    const m = rest.match(/^\s*(万)?\s*([A-Za-zμµ%\/²³\.]+(?:\/[A-Za-zμµ0-9\.²³]+)*)/);
    return m?.[2] ?? '';
}

// 1つの性別ぶん（または性別区別なし）の文字列を解釈する
export function parseRangeSegment(seg: string): NumericRange | null {
    const text = seg.replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '').trim(); // 注釈を落とす
    // A〜B
    const between = text.match(new RegExp(`${NUM}\\s*[〜～-]\\s*${NUM}`));
    if (between) {
        // 「430〜570万」のように末尾の「万」は両方の数に掛かる
        const man = between[2] || between[4];
        const min = toNumber(between[1], man);
        const max = toNumber(between[3], man);
        const unit = unitAfter(text, (between.index ?? 0) + between[0].length);
        return { min, max, unit, raw: seg.trim() };
    }
    // A以上 / A以下 / A未満（単位が数値と「以上」の間に挟まることがある）
    const oneSided = text.match(new RegExp(`${NUM}\\s*([A-Za-zμµ%\\/²³\\.0-9]*)\\s*(以上|以下|未満)`));
    if (oneSided) {
        const v = toNumber(oneSided[1], oneSided[2]);
        const unit = oneSided[3] || '';
        const kind = oneSided[4];
        return kind === '以上' ? { min: v, unit, raw: seg.trim() } : { max: v, unit, raw: seg.trim() };
    }
    return null;
}

// 性別を考慮して該当セグメントを選ぶ。
// '男性 …、女性 …' 形式なら sex で選び、区別がなければ全体を使う。
export function parseRange(rangeText: string | undefined, sex: Sex): NumericRange | null {
    if (!rangeText) return null;
    const hasSex = /男性|女性/.test(rangeText);
    if (hasSex) {
        const key = sex === 'male' ? '男性' : '女性';
        // 「40代男性 200〜350 μg/dL、40代女性 100〜250 μg/dL」のような前置きにも対応
        const parts = rangeText.split(/、|,/);
        const seg = parts.find((p) => p.includes(key));
        if (!seg) return null;
        return parseRangeSegment(seg.replace(/^.*?(男性|女性)\s*[:：]?\s*/, ''));
    }
    // 「朝: 6〜23 μg/dL」「成人: 70〜250」など接頭辞つき
    return parseRangeSegment(rangeText.replace(/^[^\d]*?[:：]\s*/, ''));
}

export type Verdict = 'below' | 'within' | 'above';

export function judge(value: number, r: NumericRange): Verdict {
    if (r.min !== undefined && value < r.min) return 'below';
    if (r.max !== undefined && value > r.max) return 'above';
    return 'within';
}

export function formatRange(r: NumericRange): string {
    const u = r.unit ? (/^[\/%]/.test(r.unit) ? r.unit : ` ${r.unit}`) : '';
    if (r.min !== undefined && r.max !== undefined) return `${fmt(r.min)}〜${fmt(r.max)}${u}`;
    if (r.min !== undefined) return `${fmt(r.min)}${u} 以上`;
    if (r.max !== undefined) return `${fmt(r.max)}${u} 以下`;
    return r.raw;
}

function fmt(n: number): string {
    return n >= 10000 ? `${(n / 10000).toLocaleString('ja-JP')}万` : n.toLocaleString('ja-JP', { maximumFractionDigits: 3 });
}
