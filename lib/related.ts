// ── コレクション横断の関連解決（逆引きインデックス）────────────────────
// 各コレクションは「自分 → 相手」のリンク（relatedBiomarkers など）を持っているが、
// 相手側のページには載らない。ここで全コレクションを一度読み、逆方向の関連を機械的に組み立てる。
//   biomarkers ページ → この項目を参照している 症状・病態
//   nutrients  ページ → この栄養素を含む 食材、関わる 検査項目・症状・病態
//   symptoms   ページ → この症状を扱う 病態
//   foods      ページ → この食材を挙げている 病態
// 1枚足すほど、既存ページ同士のつながりが自動で増える（orphan を作らない仕組み）。

import { biomarkers, getBiomarkerBySlug } from './biomarkers';
import { symptoms, getSymptomBySlug } from './symptoms';
import { getNutrientBySlug } from './nutrients';
import { foods } from './foods';
import { conditions, getConditionBySlug, type Condition } from './conditions';

export interface RelatedCard {
    href: string;
    label: string;
    sub?: string;
    color?: string;
}

export interface RelatedGroup {
    key: string;
    title: string;     // 見出し（例：この項目が関わる症状）
    cards: RelatedCard[];
}

// 1グループに並べる上限。フェリチンのように多くの症状から参照される項目で一覧が長くなりすぎないように。
const MAX_PER_GROUP = 8;
const cap = <T,>(arr: T[]) => arr.slice(0, MAX_PER_GROUP);

const foodBySlug = (slug: string) => foods.find((f) => f.slug === slug);

function conditionCard(c: Condition): RelatedCard {
    return { href: `/conditions/${c.slug}`, label: c.name, sub: c.tagline, color: c.color };
}

// ── biomarkers ──
export function relatedForBiomarker(slug: string): RelatedGroup[] {
    const groups: RelatedGroup[] = [];
    const syms = symptoms.filter((s) => s.relatedBiomarkers.includes(slug));
    if (syms.length) groups.push({ key: 'symptoms', title: 'この項目が手がかりになる症状', cards: cap(syms).map((s) => ({ href: `/symptoms/${s.slug}`, label: s.name, sub: s.tagline, color: s.color })) });
    const conds = conditions.filter((c) => c.relatedBiomarkers.includes(slug));
    if (conds.length) groups.push({ key: 'conditions', title: 'この項目が関わる不調・病態', cards: conds.map(conditionCard) });
    return groups;
}

// ── nutrients ──
export function relatedForNutrient(slug: string): RelatedGroup[] {
    const groups: RelatedGroup[] = [];
    const fs = foods.filter((f) => f.nutrients.includes(slug));
    if (fs.length) groups.push({ key: 'foods', title: 'この栄養素を多く含む食材', cards: cap(fs).map((f) => ({ href: `/foods/${f.slug}`, label: f.name, sub: f.tagline, color: f.color })) });
    const bms = biomarkers.filter((b) => b.relatedNutrients.includes(slug));
    if (bms.length) groups.push({ key: 'biomarkers', title: '関わる血液検査の項目', cards: cap(bms).map((b) => ({ href: `/biomarkers/${b.slug}`, label: b.name, sub: b.tagline, color: b.color })) });
    const syms = symptoms.filter((s) => s.relatedNutrients.includes(slug));
    if (syms.length) groups.push({ key: 'symptoms', title: '不足すると出やすい症状', cards: cap(syms).map((s) => ({ href: `/symptoms/${s.slug}`, label: s.name, sub: s.tagline, color: s.color })) });
    const conds = conditions.filter((c) => c.relatedNutrients.includes(slug));
    if (conds.length) groups.push({ key: 'conditions', title: '関わる不調・病態', cards: conds.map(conditionCard) });
    return groups;
}

// ── symptoms ──
export function relatedForSymptom(slug: string): RelatedGroup[] {
    const conds = conditions.filter((c) => c.relatedSymptoms.includes(slug));
    return conds.length ? [{ key: 'conditions', title: 'この症状の背景にありうる病態', cards: conds.map(conditionCard) }] : [];
}

// ── foods ──
export function relatedForFood(slug: string): RelatedGroup[] {
    const conds = conditions.filter((c) => c.relatedFoods?.includes(slug));
    return conds.length ? [{ key: 'conditions', title: 'この食材が役立つ不調・病態', cards: conds.map(conditionCard) }] : [];
}

// ── conditions（順方向の解決。slug → 実体）──
export function resolveCondition(c: Condition) {
    const pick = <T,>(slugs: string[], get: (s: string) => T | undefined) => slugs.map(get).filter((x): x is T => Boolean(x));
    return {
        biomarkers: pick(c.relatedBiomarkers, getBiomarkerBySlug),
        symptoms: pick(c.relatedSymptoms, getSymptomBySlug),
        nutrients: pick(c.relatedNutrients, getNutrientBySlug),
        foods: pick(c.relatedFoods ?? [], foodBySlug),
        others: conditions.filter((x) => x.slug !== c.slug && x.category === c.category),
    };
}

// ── リンク切れ検証（ビルド時）：conditions が指す slug が実在するか ──
function checkConditionLinks(): void {
    const problems: string[] = [];
    for (const c of conditions) {
        for (const s of c.relatedBiomarkers) if (!getBiomarkerBySlug(s)) problems.push(`${c.slug}: biomarker '${s}' が存在しない`);
        for (const s of c.relatedSymptoms) if (!getSymptomBySlug(s)) problems.push(`${c.slug}: symptom '${s}' が存在しない`);
        for (const s of c.relatedNutrients) if (!getNutrientBySlug(s)) problems.push(`${c.slug}: nutrient '${s}' が存在しない`);
        for (const s of c.relatedFoods ?? []) if (!foodBySlug(s)) problems.push(`${c.slug}: food '${s}' が存在しない`);
    }
    if (problems.length) throw new Error(`[related] リンク切れ:\n- ${problems.join('\n- ')}`);
}
checkConditionLinks();

export { getConditionBySlug };
