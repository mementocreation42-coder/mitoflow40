// DaVinci24 判定スクリプト（Node 22.18+ / 24 の型ストリップで直接実行）
//   node scripts/judge.ts --catalog                      … slug カタログを表示（抽出前に読む）
//   node scripts/judge.ts <extracted.json> --sex male|female [--out <dir>]
//                                                        … 理想値ベースで 🟢🟡🔴 判定し、report.md / blood_data.txt を出力
// Mitoflow40 の lib/biomarkers.ts（基準値・理想値）と lib/biomarker-ranges.ts（レンジ解釈）をそのまま使う。

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { biomarkers } from '../../../../lib/biomarkers.ts';
import { parseRange, judge, formatRange, type Sex, type NumericRange } from '../../../../lib/biomarker-ranges.ts';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (k: string) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };

if (args.includes('--catalog')) {
    console.log('slug | 英名 | 和名 | 基準値 | 理想値');
    for (const b of biomarkers) console.log(`${b.slug} | ${b.en} | ${b.name} | ${b.standardRange} | ${b.optimalRange ?? '-'}`);
    process.exit(0);
}

const file = args.find((a) => !a.startsWith('--') && a !== flag('--sex') && a !== flag('--out'));
if (!file) { console.error('usage: node scripts/judge.ts <extracted.json> --sex male|female [--out dir]'); process.exit(1); }
const sex: Sex = flag('--sex') === 'male' ? 'male' : 'female';
const outDir = resolve(flag('--out') ?? dirname(resolve(file)));

interface Extracted { name: string; value: number; unit?: string; referenceMin?: number | null; referenceMax?: number | null; slug?: string | null }
interface Input { subject?: string; testedAt?: string | null; lab?: string | null; items: Extracted[] }
const input = JSON.parse(readFileSync(file, 'utf8')) as Input;

// ── slug 補完（Claude が付けなかった/間違えたとき用の表記ゆれ辞書）──
const VALID = new Set(biomarkers.map((b) => b.slug));
const ALIASES: Record<string, string> = {
    rbc: 'rbc', '赤血球': 'rbc', '赤血球数': 'rbc',
    hb: 'hemoglobin', hgb: 'hemoglobin', 'ヘモグロビン': 'hemoglobin', '血色素': 'hemoglobin', '血色素量': 'hemoglobin',
    ht: 'hematocrit', hct: 'hematocrit', 'ヘマトクリット': 'hematocrit',
    mcv: 'mcv', mch: 'mch', wbc: 'wbc', '白血球': 'wbc', '白血球数': 'wbc',
    plt: 'platelets', '血小板': 'platelets', '血小板数': 'platelets',
    'フェリチン': 'ferritin', ferritin: 'ferritin', fe: 'serum-iron', '血清鉄': 'serum-iron', '鉄': 'serum-iron', tibc: 'tibc',
    glu: 'fasting-glucose', '血糖': 'fasting-glucose', '空腹時血糖': 'fasting-glucose', fpg: 'fasting-glucose',
    hba1c: 'hba1c', 'ヘモグロビンa1c': 'hba1c', iri: 'fasting-insulin', 'インスリン': 'fasting-insulin',
    't-cho': 'total-cholesterol', tc: 'total-cholesterol', '総コレステロール': 'total-cholesterol',
    ldl: 'ldl', 'ldl-c': 'ldl', 'ldlコレステロール': 'ldl', hdl: 'hdl', 'hdl-c': 'hdl', 'hdlコレステロール': 'hdl',
    tg: 'triglycerides', '中性脂肪': 'triglycerides',
    ast: 'ast', got: 'ast', 'ast(got)': 'ast', alt: 'alt', gpt: 'alt', 'alt(gpt)': 'alt',
    'γ-gtp': 'ggt', 'γ-gt': 'ggt', ggt: 'ggt', ggtp: 'ggt', alp: 'alp', 't-bil': 'bilirubin', '総ビリルビン': 'bilirubin',
    tp: 'total-protein', '総蛋白': 'total-protein', '総タンパク': 'total-protein', alb: 'albumin', 'アルブミン': 'albumin',
    cre: 'creatinine', cr: 'creatinine', 'クレアチニン': 'creatinine', egfr: 'egfr', bun: 'bun', '尿素窒素': 'bun',
    ua: 'uric-acid', '尿酸': 'uric-acid', tsh: 'tsh', ft3: 'ft3', ft4: 'ft4',
    crp: 'hscrp', 'hs-crp': 'hscrp', '高感度crp': 'hscrp', 'ホモシステイン': 'homocysteine', homocysteine: 'homocysteine',
    'ビタミンd': 'vitamin-d-serum', '25(oh)d': 'vitamin-d-serum', 'ビタミンb12': 'vitamin-b12-serum', b12: 'vitamin-b12-serum', '葉酸': 'folate-serum',
    '亜鉛': 'zinc-serum', zn: 'zinc-serum', '銅': 'serum-copper', cu: 'serum-copper', mg: 'rbc-magnesium',
    'テストステロン': 'total-testosterone', 'dhea-s': 'dhea-s', 'コルチゾール': 'cortisol', e2: 'estradiol', 'igf-1': 'igf1',
};
function guessSlug(name: string): string | null {
    const n = name.toLowerCase().replace(/[\s　（）()【】\[\]]/g, '');
    if (ALIASES[n] && VALID.has(ALIASES[n])) return ALIASES[n];
    for (const [k, v] of Object.entries(ALIASES)) if (k.length >= 3 && n.startsWith(k) && VALID.has(v)) return v;
    return null;
}

// ── 判定：🟢 理想範囲内 / 🟡 理想外だが ±10% 以内 / 🔴 大きく乖離（blood-analysis スキルの規則）──
type Light = 'green' | 'yellow' | 'red';
function light(value: number, r: NumericRange): Light {
    const v = judge(value, r);
    if (v === 'within') return 'green';
    const edge = v === 'below' ? r.min! : r.max!;
    const span = r.min !== undefined && r.max !== undefined ? r.max - r.min : Math.abs(edge);
    return Math.abs(value - edge) <= Math.max(Math.abs(edge) * 0.1, span * 0.1) ? 'yellow' : 'red';
}
// 「487 万/μL」→ 4,870,000 /μL のような桁ズレを吸収
function normalize(value: number, unit: string, r: NumericRange | null): { value: number; unit: string } {
    if (!r || r.min === undefined) return { value, unit };
    const u = unit.replace(/\s/g, ''); const rest = u.replace(/^(万|×?x?10\^?[24])/, '') || '/μL';
    if (/^万/.test(u) && r.min >= 10000) return { value: value * 10000, unit: rest };
    if (/^×?x?10\^?4/.test(u) && r.min >= 10000) return { value: value * 10000, unit: rest };
    if (/^×?x?10\^?2/.test(u) && r.min >= 1000) return { value: value * 100, unit: rest };
    return { value, unit };
}

const MARK: Record<Light, string> = { green: '🟢', yellow: '🟡', red: '🔴' };
const ORDER: Record<Light, number> = { red: 0, yellow: 1, green: 2 };
const bySlug = new Map(biomarkers.map((b) => [b.slug, b]));

interface Row { mark: string; label: string; raw: string; value: number; unit: string; optimal: string; standard: string; sheetRef: string; direction: string; light: Light | null; slug: string }
const rows: Row[] = []; const unmatched: Extracted[] = [];
for (const it of input.items) {
    const slug = (it.slug && VALID.has(it.slug) ? it.slug : null) ?? guessSlug(it.name);
    const b = slug ? bySlug.get(slug) : undefined;
    if (!b || !slug) { unmatched.push(it); continue; }
    const std = parseRange(b.standardRange, sex); const opt = parseRange(b.optimalRange, sex);
    const { value, unit } = normalize(it.value, it.unit ?? '', std ?? opt);
    const L = opt ? light(value, opt) : null;
    const dir = opt ? judge(value, opt) : std ? judge(value, std) : 'within';
    rows.push({
        mark: L ? MARK[L] : '⚪', label: b.name, raw: it.name, value, unit,
        optimal: opt ? formatRange(opt) : '—', standard: std ? formatRange(std) : '—',
        sheetRef: it.referenceMin != null || it.referenceMax != null ? `${it.referenceMin ?? ''}〜${it.referenceMax ?? ''}` : '—',
        direction: dir === 'above' ? '高め' : dir === 'below' ? '低め' : '範囲内', light: L, slug,
    });
}
rows.sort((a, b) => (a.light ? ORDER[a.light] : 3) - (b.light ? ORDER[b.light] : 3));

const counts = { green: 0, yellow: 0, red: 0 };
for (const r of rows) if (r.light) counts[r.light]++;
const fmt = (n: number) => n.toLocaleString('ja-JP', { maximumFractionDigits: 3 });

const md = [
    `# DaVinci24 読み取り結果${input.subject ? ` — ${input.subject}` : ''}`,
    '',
    `- 検査日: ${input.testedAt ?? '不明'}${input.lab ? ` ／ 機関: ${input.lab}` : ''}`,
    `- 判定基準: ${sex === 'male' ? '男性' : '女性'}（Mitoflow40 理想値）`,
    `- ${rows.length} 項目 ・ 🟢 ${counts.green} ・ 🟡 ${counts.yellow} ・ 🔴 ${counts.red}${unmatched.length ? ` ・ 未収載 ${unmatched.length}` : ''}`,
    '',
    '| | 項目 | 値 | 理想値 | 判定 | 基準値 | 票の基準 |',
    '|---|---|---|---|---|---|---|',
    ...rows.map((r) => `| ${r.mark} | ${r.label}${r.raw !== r.label ? `（${r.raw}）` : ''} | **${fmt(r.value)}** ${r.unit} | ${r.optimal} | ${r.direction} | ${r.standard} | ${r.sheetRef} |`),
    '',
    ...(unmatched.length ? ['**Mitoflow40 未収載（判定外）**', ...unmatched.map((u) => `- ${u.name}: ${u.value}${u.unit ? ' ' + u.unit : ''}`), ''] : []),
    '> 判定は理想値からの距離による仮の見立てであり、診断ではありません。数値は原票と照合すること。',
    '',
].join('\n');

// blood-analysis スキルの inputs/<氏名_日付>/blood_data.txt と同じ「項目: 値」形式
const bloodData = [
    `# DaVinci24 抽出（${input.testedAt ?? '検査日不明'}${input.lab ? '・' + input.lab : ''}）`,
    ...rows.map((r) => `${r.label}: ${fmt(r.value)}`),
    ...unmatched.map((u) => `${u.name}: ${u.value}`),
    '',
].join('\n');

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'report.md'), md);
writeFileSync(join(outDir, 'blood_data.txt'), bloodData);
writeFileSync(join(outDir, 'judged.json'), JSON.stringify({ sex, testedAt: input.testedAt ?? null, rows, unmatched }, null, 2));
console.log(md);
console.log(`→ ${join(outDir, 'report.md')}\n→ ${join(outDir, 'blood_data.txt')}`);
