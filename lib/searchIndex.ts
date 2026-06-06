// Library全体の横断検索インデックス。
// 構造化データ（食べ物・栄養素・遺伝子・血液検査・ホルモン・症状・臓器）と、
// 精密栄養学・しくみ解説などの固定ページをまとめて、クライアント側で絞り込む。

import { foods } from './foods';
import { nutrients } from './nutrients';
import { genes } from './genes';
import { biomarkers } from './biomarkers';
import { hormones } from './hormones';
import { symptoms } from './symptoms';
import { organs } from './organs';
import { essays } from './essays';

export interface SearchItem {
    title: string;       // 表示タイトル
    sub?: string;        // 補助テキスト（英語名・一言など）
    href: string;        // 遷移先
    group: string;       // カテゴリ見出し
    keywords: string;    // 検索用テキスト（小文字化済み）
}

const norm = (...parts: (string | undefined)[]) =>
    parts.filter(Boolean).join(' ').toLowerCase();

// 精密栄養学・しくみ・考え方などの固定ページ
const conceptPages: Omit<SearchItem, 'keywords'>[] = [
    { title: '健康とは', sub: 'Mitoflow40の健康哲学', href: '/health-philosophy', group: '考え方' },
    { title: 'なぜ、未病予防か', sub: 'Our Mission', href: '/mission', group: '考え方' },
    { title: '精密栄養学とは', sub: 'Precision Nutrition', href: '/precision-nutrition', group: '考え方' },
    { title: '分子栄養学とは', sub: 'Molecular Nutrition', href: '/molecular-nutrition', group: '考え方' },
    { title: '学ぶと、何が変わる？', sub: '生化学・栄養学を知る価値 / Nutrition Literacy', href: '/nutrition-literacy', group: '考え方' },
    { title: 'エネルギーとは', sub: 'Energy / 疲れにくさの正体', href: '/energy', group: 'しくみ' },
    { title: 'ミトコンドリア', sub: 'Mitochondria', href: '/mitochondria', group: 'しくみ' },
    { title: 'ATP', sub: 'エネルギー通貨', href: '/atp', group: 'しくみ' },
    { title: '解糖系', sub: 'Glycolysis', href: '/glycolysis', group: 'しくみ' },
    { title: 'TCA回路（クエン酸回路）', sub: 'TCA Cycle', href: '/tca-cycle', group: 'しくみ' },
    { title: '電子伝達系', sub: 'Electron Transport Chain', href: '/electron-transport-chain', group: 'しくみ' },
    { title: 'ケトン体', sub: 'Ketones', href: '/ketones', group: 'しくみ' },
    { title: 'オートファジー', sub: 'Autophagy', href: '/autophagy', group: 'しくみ' },
    { title: '酸化ストレス（さびる）', sub: 'Oxidative Stress', href: '/oxidative-stress', group: 'しくみ' },
    { title: '糖化（こげる）', sub: 'Glycation', href: '/glycation', group: 'しくみ' },
    { title: '炎症', sub: 'Inflammation', href: '/inflammation', group: 'しくみ' },
    { title: '血糖コントロール', sub: 'Blood Sugar', href: '/blood-sugar', group: 'しくみ' },
    { title: 'メチレーション', sub: 'Methylation', href: '/methylation', group: 'しくみ' },
    { title: 'デトックス（解毒）', sub: 'Detox', href: '/detox', group: 'しくみ' },
    { title: '有害物質を減らす暮らし', sub: '農薬・水銀・マイクロプラスチック', href: '/reduce-toxins', group: 'しくみ' },
    { title: 'カビ毒と食の安全', sub: 'マイコトキシン（アフラトキシン等）', href: '/mycotoxins', group: 'しくみ' },
    { title: '自律神経', sub: 'Autonomic Nervous System', href: '/autonomic-nervous-system', group: 'しくみ' },
    { title: '概日リズム（体内時計）', sub: 'Circadian Rhythm', href: '/circadian-rhythm', group: 'しくみ' },
    { title: '腸内環境（腸活）', sub: 'Gut Health / 腸内細菌・マイクロバイオーム', href: '/gut-health', group: 'しくみ' },
    { title: '気になる腸のキーワード', sub: 'グルテン・カゼイン・リーキーガット・SIBO', href: '/gut-troubles', group: 'しくみ' },
    { title: '腸脳相関', sub: 'Gut-Brain Axis', href: '/gut-brain', group: 'しくみ' },
    { title: '消化・吸収', sub: 'Digestion & Absorption', href: '/digestion', group: 'しくみ' },
    { title: 'ストレスとは', sub: 'Stress', href: '/stress', group: '心とからだ' },
    { title: '気分と栄養', sub: 'Mood & Food', href: '/mood-nutrition', group: '心とからだ' },
    { title: '不安と体', sub: 'Anxiety', href: '/anxiety', group: '心とからだ' },
    { title: 'マインドフルネス・呼吸', sub: 'Breath / Mindfulness', href: '/mindfulness', group: '心とからだ' },
    { title: 'スピリチュアリティと体', sub: '心身相関の科学 / 祈り・瞑想・つながり', href: '/spirituality', group: '心とからだ' },
    { title: '睡眠', sub: 'Sleep', href: '/sleep', group: '生活習慣' },
    { title: '運動', sub: 'Exercise', href: '/exercise', group: '生活習慣' },
    { title: '嗜好品と体', sub: 'アルコール・タバコ・カフェイン', href: '/stimulants', group: '生活習慣' },
    { title: 'サプリメント', sub: 'Supplements', href: '/supplements', group: '生活習慣' },
    { title: 'ウェアラブル活用', sub: 'Wearables', href: '/wearables', group: '生活習慣' },
    { title: '気をつけたい食品', sub: 'Caution Foods', href: '/caution-foods', group: '食べ物' },
    { title: 'サイケデリック研究の潮流', sub: '海外の研究動向（中立解説）', href: '/psychedelics-research', group: '考え方' },
    { title: '大麻をめぐる歴史と世界の動き', sub: '歴史・法政策（中立解説・日本では違法）', href: '/cannabis', group: '考え方' },
    { title: 'おすすめ書籍', sub: 'Recommended Books / もっと深く知るための本', href: '/books', group: '考え方' },
    { title: '参照文献・出典', sub: 'References', href: '/references', group: '考え方' },
];

export const searchIndex: SearchItem[] = [
    ...foods.map((f) => ({
        title: f.name,
        sub: f.en,
        href: `/foods/${f.slug}`,
        group: '食べ物',
        keywords: norm(f.name, f.en, f.tagline, f.category),
    })),
    ...nutrients.map((n) => ({
        title: n.name,
        sub: n.en,
        href: `/nutrients/${n.slug}`,
        group: '栄養素',
        keywords: norm(n.name, n.en, n.tagline, n.category),
    })),
    ...genes.map((g) => ({
        title: g.symbol,
        sub: g.name,
        href: `/genes/${g.slug}`,
        group: '遺伝子',
        keywords: norm(g.symbol, g.reading, g.name, g.tagline, g.category),
    })),
    ...biomarkers.map((b) => ({
        title: b.name,
        sub: b.en,
        href: `/biomarkers/${b.slug}`,
        group: '血液検査',
        keywords: norm(b.name, b.en, b.tagline, b.category),
    })),
    ...hormones.map((h) => ({
        title: h.name,
        sub: h.en,
        href: `/hormones/${h.slug}`,
        group: 'ホルモン',
        keywords: norm(h.name, h.en, h.tagline, h.category),
    })),
    ...symptoms.map((s) => ({
        title: s.name,
        sub: s.en,
        href: `/symptoms/${s.slug}`,
        group: '症状',
        keywords: norm(s.name, s.en, s.tagline),
    })),
    ...organs.map((o) => ({
        title: o.name,
        sub: o.en,
        href: `/organs/${o.slug}`,
        group: '内臓・臓器',
        keywords: norm(o.name, o.en, o.reading, o.tagline, o.category),
    })),
    ...conceptPages.map((p) => ({
        ...p,
        keywords: norm(p.title, p.sub, p.group),
    })),
    ...essays.map((e) => ({
        title: e.title,
        sub: e.en,
        href: `/thoughts/${e.slug}`,
        group: '思索',
        keywords: norm(e.title, e.en, e.tagline),
    })),
];

export function searchLibrary(query: string, limit = 12): SearchItem[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const terms = q.split(/\s+/).filter(Boolean);
    return searchIndex
        .filter((item) => terms.every((t) => item.keywords.includes(t)))
        .slice(0, limit);
}
