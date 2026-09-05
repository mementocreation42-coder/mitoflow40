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
import { conditions } from './conditions';
import { staticPages } from './pages';

export interface SearchItem {
    title: string;       // 表示タイトル
    sub?: string;        // 補助テキスト（英語名・一言など）
    href: string;        // 遷移先
    group: string;       // カテゴリ見出し
    keywords: string;    // 検索用テキスト（小文字化済み）
}

const norm = (...parts: (string | undefined)[]) =>
    parts.filter(Boolean).join(' ').toLowerCase();

// 精密栄養学・しくみ・考え方などの固定ページ。
// 単一レジストリ lib/pages.ts のうち search を持つページから自動生成する
// （sitemap.ts と共有。ページ追加は pages.ts に1行足すだけで両方へ反映）。
const conceptPages: Omit<SearchItem, 'keywords'>[] = staticPages
    .filter((p) => p.search)
    .map((p) => ({
        title: p.search!.title,
        sub: p.search!.sub,
        href: p.path,
        group: p.search!.group,
    }));

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
    ...conditions.map((c) => ({
        title: c.name,
        sub: c.en,
        href: `/conditions/${c.slug}`,
        group: '不調・現代病',
        keywords: norm(c.name, c.en, c.reading, c.tagline, c.category),
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
