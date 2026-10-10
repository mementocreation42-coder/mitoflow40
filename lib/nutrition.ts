// 食事記録（/meal-log）の栄養計算。
// 食品データ：日本食品標準成分表（八訂）増補2023年（public/data/foods-mext.json、scripts/meal-log/build-foods.py で生成）
// 目標値：日本人の食事摂取基準（2025年版）の成人（18歳以上）の値

export type NutrientKey =
    | 'kcal' | 'prot' | 'fat' | 'carb' | 'avcarb' | 'fib' | 'salt' | 'chole'
    | 'vita' | 'vitd' | 'vite' | 'vitk' | 'b1' | 'b2' | 'ne' | 'b6' | 'b12' | 'fol' | 'pant' | 'biot' | 'vitc'
    | 'k' | 'ca' | 'mg' | 'p' | 'fe' | 'zn' | 'cu' | 'mn' | 'id' | 'se' | 'cr' | 'mo' | 'na';

export type NutrientGroup = '基本' | 'ビタミン' | 'ミネラル';

export interface NutrientDef {
    key: NutrientKey;
    label: string;
    unit: string;
    group: NutrientGroup;
    digits: number; // 表示する小数の桁数
}

export const NUTRIENTS: NutrientDef[] = [
    { key: 'kcal', label: 'エネルギー', unit: 'kcal', group: '基本', digits: 0 },
    { key: 'prot', label: 'たんぱく質', unit: 'g', group: '基本', digits: 1 },
    { key: 'fat', label: '脂質', unit: 'g', group: '基本', digits: 1 },
    { key: 'carb', label: '炭水化物', unit: 'g', group: '基本', digits: 1 },
    { key: 'avcarb', label: '糖質（利用可能炭水化物）', unit: 'g', group: '基本', digits: 1 },
    { key: 'fib', label: '食物繊維', unit: 'g', group: '基本', digits: 1 },
    { key: 'salt', label: '食塩相当量', unit: 'g', group: '基本', digits: 1 },
    { key: 'chole', label: 'コレステロール', unit: 'mg', group: '基本', digits: 0 },
    { key: 'vita', label: 'ビタミンA', unit: 'µgRAE', group: 'ビタミン', digits: 0 },
    { key: 'vitd', label: 'ビタミンD', unit: 'µg', group: 'ビタミン', digits: 1 },
    { key: 'vite', label: 'ビタミンE', unit: 'mg', group: 'ビタミン', digits: 1 },
    { key: 'vitk', label: 'ビタミンK', unit: 'µg', group: 'ビタミン', digits: 0 },
    { key: 'b1', label: 'ビタミンB1', unit: 'mg', group: 'ビタミン', digits: 2 },
    { key: 'b2', label: 'ビタミンB2', unit: 'mg', group: 'ビタミン', digits: 2 },
    { key: 'ne', label: 'ナイアシン', unit: 'mgNE', group: 'ビタミン', digits: 1 },
    { key: 'b6', label: 'ビタミンB6', unit: 'mg', group: 'ビタミン', digits: 2 },
    { key: 'b12', label: 'ビタミンB12', unit: 'µg', group: 'ビタミン', digits: 1 },
    { key: 'fol', label: '葉酸', unit: 'µg', group: 'ビタミン', digits: 0 },
    { key: 'pant', label: 'パントテン酸', unit: 'mg', group: 'ビタミン', digits: 2 },
    { key: 'biot', label: 'ビオチン', unit: 'µg', group: 'ビタミン', digits: 1 },
    { key: 'vitc', label: 'ビタミンC', unit: 'mg', group: 'ビタミン', digits: 0 },
    { key: 'k', label: 'カリウム', unit: 'mg', group: 'ミネラル', digits: 0 },
    { key: 'ca', label: 'カルシウム', unit: 'mg', group: 'ミネラル', digits: 0 },
    { key: 'mg', label: 'マグネシウム', unit: 'mg', group: 'ミネラル', digits: 0 },
    { key: 'p', label: 'リン', unit: 'mg', group: 'ミネラル', digits: 0 },
    { key: 'fe', label: '鉄', unit: 'mg', group: 'ミネラル', digits: 1 },
    { key: 'zn', label: '亜鉛', unit: 'mg', group: 'ミネラル', digits: 1 },
    { key: 'cu', label: '銅', unit: 'mg', group: 'ミネラル', digits: 2 },
    { key: 'mn', label: 'マンガン', unit: 'mg', group: 'ミネラル', digits: 2 },
    { key: 'id', label: 'ヨウ素', unit: 'µg', group: 'ミネラル', digits: 0 },
    { key: 'se', label: 'セレン', unit: 'µg', group: 'ミネラル', digits: 0 },
    { key: 'cr', label: 'クロム', unit: 'µg', group: 'ミネラル', digits: 0 },
    { key: 'mo', label: 'モリブデン', unit: 'µg', group: 'ミネラル', digits: 0 },
    { key: 'na', label: 'ナトリウム', unit: 'mg', group: 'ミネラル', digits: 0 },
];

export const NUTRIENT_BY_KEY = Object.fromEntries(NUTRIENTS.map((n) => [n.key, n])) as Record<NutrientKey, NutrientDef>;

export function fmt(v: number, digits: number): string {
    return v.toLocaleString('ja-JP', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

// ===== プロフィールと目標値 =====

export const AGE_GROUPS = ['18〜29', '30〜49', '50〜64', '65〜74', '75以上'] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];
export type Sex = 'male' | 'female';
export type Activity = 'low' | 'normal' | 'high';

export interface Profile {
    sex: Sex;
    age: AgeGroup;
    activity: Activity;
    menstruation: boolean; // 女性 18〜64 歳のみ意味を持つ（鉄の推奨量が変わる）
    kcal: number | null;   // 自分で決めたエネルギー目標（null なら推定エネルギー必要量）
}

export const DEFAULT_PROFILE: Profile = { sex: 'female', age: '30〜49', activity: 'normal', menstruation: true, kcal: null };

// 目標の種類。min＝これ以上が目安（推奨量・目安量・下限の目標量）、max＝これ未満が目安（食塩）
export interface Target {
    value: number;
    kind: 'min' | 'max';
    basis: '推奨量' | '目安量' | '目標量' | '推定エネルギー必要量' | '目標量から換算';
    ul?: number; // 耐容上限量（通常の食品からの摂取に適用されるものだけ）
}

type Row = [number, number, number, number, number]; // AGE_GROUPS の順
type BySex = { male: Row; female: Row };
const same = (v: number): Row => [v, v, v, v, v];

// 推定エネルギー必要量（kcal/日）参考表2
const EER: Record<Activity, BySex> = {
    low: { male: [2250, 2350, 2250, 2100, 1850], female: [1700, 1750, 1700, 1650, 1450] },
    normal: { male: [2600, 2750, 2650, 2350, 2250], female: [1950, 2050, 1950, 1850, 1750] },
    // 75 歳以上の「高い」は設定がないため「ふつう」を使う
    high: { male: [3000, 3150, 3000, 2650, 2250], female: [2250, 2350, 2250, 2050, 1750] },
};

// たんぱく質・脂質・炭水化物の目標量（%エネルギー）
const PROT_PCT: Row = [13, 13, 14, 15, 15]; // 下限。上限はすべて 20
export const PFC_RANGE = { prot: [13, 20], fat: [20, 30], carb: [50, 65] } as const;

const MIN_TARGETS: Partial<Record<NutrientKey, { basis: Target['basis']; v: BySex; ul?: BySex }>> = {
    prot: { basis: '推奨量', v: { male: [65, 65, 65, 60, 60], female: same(50) } },
    fib: { basis: '目標量', v: { male: [20, 22, 22, 21, 20], female: [18, 18, 18, 18, 17] } },
    vita: { basis: '推奨量', v: { male: [850, 900, 900, 850, 800], female: [650, 700, 700, 700, 650] } },
    vitd: { basis: '目安量', v: { male: same(9), female: same(9) }, ul: { male: same(100), female: same(100) } },
    vite: { basis: '目安量', v: { male: [6.5, 6.5, 6.5, 7.5, 7.0], female: [5.0, 6.0, 6.0, 7.0, 6.0] }, ul: { male: same(800), female: [650, 700, 700, 700, 650] } },
    vitk: { basis: '目安量', v: { male: same(150), female: same(150) } },
    b1: { basis: '推奨量', v: { male: [1.1, 1.2, 1.1, 1.0, 1.0], female: [0.8, 0.9, 0.8, 0.8, 0.7] } },
    b2: { basis: '推奨量', v: { male: [1.6, 1.7, 1.6, 1.4, 1.4], female: [1.2, 1.2, 1.2, 1.1, 1.1] } },
    ne: { basis: '推奨量', v: { male: [15, 16, 15, 14, 13], female: [11, 12, 11, 11, 10] } },
    b6: { basis: '推奨量', v: { male: [1.5, 1.5, 1.5, 1.4, 1.4], female: same(1.2) } },
    b12: { basis: '目安量', v: { male: same(4.0), female: same(4.0) } },
    fol: { basis: '推奨量', v: { male: same(240), female: same(240) } },
    pant: { basis: '目安量', v: { male: same(6), female: same(5) } },
    biot: { basis: '目安量', v: { male: same(50), female: same(50) } },
    vitc: { basis: '推奨量', v: { male: same(100), female: same(100) } },
    k: { basis: '目標量', v: { male: same(3000), female: same(2600) } },
    ca: { basis: '推奨量', v: { male: [800, 750, 750, 750, 750], female: [650, 650, 650, 650, 600] }, ul: { male: same(2500), female: same(2500) } },
    mg: { basis: '推奨量', v: { male: [340, 380, 370, 350, 330], female: [280, 290, 290, 280, 270] } },
    p: { basis: '目安量', v: { male: same(1000), female: same(800) }, ul: { male: same(3000), female: same(3000) } },
    zn: { basis: '推奨量', v: { male: [9.0, 9.5, 9.5, 9.0, 9.0], female: [7.5, 8.0, 8.0, 7.5, 7.0] }, ul: { male: [40, 45, 45, 45, 40], female: same(35) } },
    cu: { basis: '推奨量', v: { male: [0.8, 0.9, 0.9, 0.8, 0.8], female: same(0.7) }, ul: { male: same(7), female: same(7) } },
    mn: { basis: '目安量', v: { male: same(3.5), female: same(3.0) }, ul: { male: same(11), female: same(11) } },
    id: { basis: '推奨量', v: { male: same(140), female: same(140) }, ul: { male: same(3000), female: same(3000) } },
    se: { basis: '推奨量', v: { male: [30, 35, 30, 30, 30], female: same(25) }, ul: { male: [400, 450, 450, 450, 400], female: same(350) } },
    cr: { basis: '目安量', v: { male: same(10), female: same(10) }, ul: { male: same(500), female: same(500) } },
    mo: { basis: '推奨量', v: { male: [30, 30, 30, 30, 25], female: same(25) }, ul: { male: same(600), female: same(500) } },
};

const IRON: { male: Row; female: Row; femaleMenstruating: Row } = {
    male: [7.0, 7.5, 7.0, 7.0, 6.5],
    female: [6.0, 6.0, 6.0, 6.0, 5.5],
    femaleMenstruating: [10.0, 10.5, 10.5, 6.0, 5.5], // 65 歳以上は「月経あり」の区分がない
};

export function eer(p: Profile): number {
    return EER[p.activity][p.sex][AGE_GROUPS.indexOf(p.age)];
}

export function targetsFor(p: Profile): Partial<Record<NutrientKey, Target>> {
    const i = AGE_GROUPS.indexOf(p.age);
    const kcal = p.kcal ?? eer(p);
    const t: Partial<Record<NutrientKey, Target>> = {
        kcal: { value: kcal, kind: 'min', basis: p.kcal ? '目標量' : '推定エネルギー必要量' },
        // 脂質・炭水化物は %エネルギーの目標量の中央をグラムに換算（脂質 9 kcal/g、炭水化物 4 kcal/g）
        fat: { value: Math.round((kcal * 0.25) / 9), kind: 'min', basis: '目標量から換算' },
        carb: { value: Math.round((kcal * 0.575) / 4), kind: 'min', basis: '目標量から換算' },
        salt: { value: p.sex === 'male' ? 7.5 : 6.5, kind: 'max', basis: '目標量' },
        fe: { value: (p.sex === 'male' ? IRON.male : p.menstruation ? IRON.femaleMenstruating : IRON.female)[i], kind: 'min', basis: '推奨量' },
    };
    for (const [key, d] of Object.entries(MIN_TARGETS) as [NutrientKey, NonNullable<(typeof MIN_TARGETS)[NutrientKey]>][]) {
        t[key] = { value: d.v[p.sex][i], kind: 'min', basis: d.basis, ul: d.ul?.[p.sex][i] };
    }
    // たんぱく質は推奨量と %エネルギー目標量の下限のうち大きいほう
    const protPct = Math.round((kcal * PROT_PCT[i]) / 100 / 4);
    if (protPct > t.prot!.value) t.prot = { value: protPct, kind: 'min', basis: '目標量から換算' };
    return t;
}

// ===== 食品データ =====

export interface FoodDb {
    source: string;
    updated: string;
    groups: Record<string, string>;
    foods: Food[];
    byCode: Map<string, Food>;
}

export interface Food {
    code: string;
    name: string;
    group: string;
    values: Partial<Record<NutrientKey, number | null>>; // 可食部 100g 当たり。null は未測定
    words: string[];  // 検索用：名前の語（［ ］（ ）の中の小分類を除く）
    full: string;     // 検索用：小分類も含めた名前
    category: string; // 検索用：＜魚類＞ などの分類の見出しと食品群
}

let dbPromise: Promise<FoodDb> | null = null;

export function loadFoodDb(): Promise<FoodDb> {
    if (!dbPromise) {
        dbPromise = fetch('/data/foods-mext.json')
            .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
            .then((raw: { source: string; updated: string; keys: NutrientKey[]; groups: Record<string, string>; foods: (string | number | null)[][] }) => {
                const foods: Food[] = raw.foods.map((row) => {
                    const values: Food['values'] = {};
                    raw.keys.forEach((k, j) => { values[k] = row[j + 2] as number | null; });
                    const code = row[0] as string;
                    const name = row[1] as string;
                    const group = raw.groups[code.slice(0, 2)] ?? '';
                    const shown = displayName(name);
                    const core = normalize(shown.replace(/［[^］]*］|（[^）]*）/g, ' '));
                    return {
                        code, name, group, values,
                        words: core.split(' ').filter(Boolean),
                        full: normalize(shown),
                        category: normalize(`${(name.match(/＜[^＞]*＞/g) ?? []).join(' ')} ${group}`),
                    };
                });
                return { source: raw.source, updated: raw.updated, groups: raw.groups, foods, byCode: new Map(foods.map((f) => [f.code, f])) };
            })
            .catch((e) => { dbPromise = null; throw e; });
    }
    return dbPromise;
}

// 表示用に食品名を短くする（＜魚類＞ などの分類の見出しを外す）
export function displayName(name: string): string {
    return name.replace(/＜[^＞]*＞\s*/g, '').replace(/\s+/g, ' ').trim();
}

// カタカナ→ひらがな、全角→半角、括弧や区切りは空白に（語の境目は残す。消すと「そらまめ しょうゆ豆」が「めし」に当たる）
export function normalize(s: string): string {
    return s.normalize('NFKC').toLowerCase()
        .replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
        .replace(/[\s［］\[\]（）()＜＞<>・、,:：]+/g, ' ')
        .trim();
}

// 成分表は「ぶた」「にわとり」のようにひらがな表記が多いので、よく使う言い方を言い換える
const SYNONYMS: Record<string, string[]> = {
    鶏肉: ['にわとり'], 鶏: ['にわとり', '鶏卵'], とりにく: ['にわとり'], 豚肉: ['ぶた'], 豚: ['ぶた'], 牛肉: ['うし'], 牛: ['うし', '牛乳'],
    卵: ['鶏卵'], たまご: ['鶏卵'], ご飯: ['めし', '精白米 うるち米'], ごはん: ['めし', '精白米 うるち米'], 白米: ['精白米'], 米: ['こめ'],
    鮭: ['さけ'], サーモン: ['さけ', 'サーモン'], 鯖: ['さば'], 鰯: ['いわし'], 鮪: ['まぐろ'], ツナ: ['まぐろ', 'かつお'], 鰹: ['かつお'], 鯵: ['あじ'], 鰤: ['ぶり'], 鱈: ['たら'],
    海老: ['えび'], 蟹: ['かに'], 烏賊: ['いか'], 蛸: ['たこ'], 牡蠣: ['かき'],
    大根: ['だいこん'], 人参: ['にんじん'], 玉ねぎ: ['たまねぎ'], 玉葱: ['たまねぎ'], 葱: ['ねぎ'], 長ねぎ: ['根深ねぎ'], 胡瓜: ['きゅうり'], 茄子: ['なす'], 南瓜: ['かぼちゃ'],
    白菜: ['はくさい'], ほうれん草: ['ほうれんそう'], 小松菜: ['こまつな'], ピーマン: ['ピーマン'], 生姜: ['しょうが'], にんにく: ['にんにく'], 大蒜: ['にんにく'],
    じゃがいも: ['じゃがいも'], 馬鈴薯: ['じゃがいも'], さつまいも: ['さつまいも'], 里芋: ['さといも'],
    林檎: ['りんご'], 蜜柑: ['みかん'], 苺: ['いちご'], 葡萄: ['ぶどう'], 桃: ['もも'], 梨: ['なし'], 柿: ['かき'],
    椎茸: ['しいたけ'], 舞茸: ['まいたけ'], 若布: ['わかめ'], 昆布: ['こんぶ'], 海苔: ['のり'], 胡麻: ['ごま'], ピーナッツ: ['らっかせい'],
    味噌: ['みそ'], 醤油: ['しょうゆ'], オリーブオイル: ['オリーブ油'], 蜂蜜: ['はちみつ'], 砂糖: ['砂糖'],
    蕎麦: ['そば'], 饂飩: ['うどん'], 珈琲: ['コーヒー'], 緑茶: ['せん茶'], お茶: ['茶'],
};
const SYN = Object.entries(SYNONYMS).map(([k, v]) => [normalize(k), [normalize(k), ...v.map(normalize)]] as const);

// 言い換えの候補。「鶏むね」は「にわとり」＋「むね」の 2 語として探す
function alternatives(token: string): string[][] {
    const out: string[][] = [[token]];
    for (const [k, vs] of SYN) {
        if (!token.includes(k)) continue;
        for (const v of vs) out.push(token.replace(k, ` ${v} `).split(' ').filter(Boolean));
    }
    return out;
}

// よく食べる基本の食品は少し上に出す（成分表には「よく使われる順」がないため）
const STAPLES = new Set(['01088', '01085', '13003', '04032', '04033', '04046', '12004', '12005', '01206', '07107', '06061', '13040', '13025', '17045', '17007', '16045', '16037', '09041', '10136']);
// 菓子・調理済み食品は、それを探しているとき以外は下に（「納豆」で甘納豆、「牛乳」で牛乳寒天が先に出ないように）
const LOWER_GROUPS = new Set(['15', '18']);

// 日本語の複合語は後ろが本体（普通「牛乳」、糸引き「納豆」）なので、語のお尻に一致するほうを上に。
// 語にぴったり ＞ お尻 ＞ 頭 ＞ 途中 ＞ 小分類 ＞ 分類の見出し の順に点が低い（＝上位）
function matchScore(f: Food, t: string): number {
    let best = Infinity;
    f.words.forEach((w, i) => {
        const s = w === t ? 0 : w.endsWith(t) ? 1 : w.startsWith(t) ? 3 : w.includes(t) ? 5 : Infinity;
        best = Math.min(best, s + i * 0.5);
    });
    if (best < Infinity) return best;
    if (f.full.split(' ').some((w) => w.includes(t))) return 15;
    if (f.category.includes(t)) return 40;
    return Infinity;
}

export function searchFoods(db: FoodDb, query: string, limit = 50): Food[] {
    const tokens = normalize(query).split(' ').filter(Boolean);
    if (!tokens.length) return [];
    const alts = tokens.map(alternatives);
    const scored: { f: Food; s: number }[] = [];
    for (const f of db.foods) {
        let score = 0;
        for (const a of alts) {
            score += Math.min(...a.map((words) => words.reduce((n, t) => n + matchScore(f, t), 0)));
            if (score === Infinity) break;
        }
        if (score === Infinity) continue;
        // 名前が短いほど・「生」の食品ほど・基本の食品ほど上に
        score += f.full.length * 0.1 + (f.words.includes('生') ? -1.5 : 0) + (STAPLES.has(f.code) ? -4 : 0) + (LOWER_GROUPS.has(f.code.slice(0, 2)) ? 4 : 0);
        scored.push({ f, s: score });
    }
    return scored.sort((a, b) => a.s - b.s).slice(0, limit).map((x) => x.f);
}

// ===== 集計 =====

export interface Portion { code: string; grams: number }

export interface Totals {
    values: Record<NutrientKey, number>;
    missing: Partial<Record<NutrientKey, number>>; // 未測定のため 0 として数えた食品の数
}

export function totalsOf(db: FoodDb | null, portions: Portion[]): Totals {
    const values = Object.fromEntries(NUTRIENTS.map((n) => [n.key, 0])) as Record<NutrientKey, number>;
    const missing: Totals['missing'] = {};
    if (!db) return { values, missing };
    for (const p of portions) {
        const f = db.byCode.get(p.code);
        if (!f) continue;
        for (const n of NUTRIENTS) {
            const v = f.values[n.key];
            if (v == null) missing[n.key] = (missing[n.key] ?? 0) + 1;
            else values[n.key] += (v * p.grams) / 100;
        }
    }
    return { values, missing };
}
