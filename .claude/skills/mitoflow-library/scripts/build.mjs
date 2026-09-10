// Mitoflow40 ライブラリ → 知識ベース（knowledge/）生成
//   node .claude/skills/mitoflow-library/scripts/build.mjs [--no-journal]
//
// 元データはすべてサイトのソース：
//   - 静的ページ … lib/pages.ts の一覧 → app/<path>/page.tsx から本文（見出し・段落・ページ内データ・リンク）を抽出
//   - コレクション … lib/{biomarkers,nutrients,foods,symptoms,hormones,organs,genes,essays,conditions}.ts を import して項目ごとに 1 枚
//   - ジャーナル … journal.mitoflow40.com の WordPress REST（公開 API）から本文テキスト
// 出力：knowledge/INDEX.md（索引）＋ knowledge/<種類>/<slug>.md。再実行すれば作り直す（差分ではなく全生成）。

import { mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const SKILL = resolve(here, '..');
const ROOT = resolve(SKILL, '..', '..', '..');          // Mitoflow40/
const OUT = join(SKILL, 'knowledge');
const SITE = 'https://mitoflow40.com';
const NO_JOURNAL = process.argv.includes('--no-journal');

const require = createRequire(join(ROOT, 'package.json'));
const ts = require('typescript');

const log = (s) => console.log(s);
const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const paras = (s) => String(s ?? '').split(/\n\s*\n/).map((p) => clean(p)).filter(Boolean);
const mdEsc = (s) => String(s ?? '').replace(/\|/g, '｜');

// ───────────────────────── 静的ページ（TSX → テキスト） ─────────────────────────
const BLOCK = new Set(['h1', 'h2', 'h3', 'h4', 'p', 'li', 'blockquote', 'figcaption', 'dt', 'dd', 'th', 'td', 'summary']);
const SKIP_TAGS = new Set(['JsonLd', 'Breadcrumbs', 'script', 'style', 'svg', 'img', 'Image']);

function tagName(node) {
    const open = ts.isJsxElement(node) ? node.openingElement : node;
    return open.tagName ? open.tagName.getText() : '';
}
function inlineText(node) {
    // 要素の中の文字だけを取り出す（ネストした strong / Link / em はそのまま連結）
    let out = '';
    const walk = (n) => {
        if (ts.isJsxAttributes(n) || ts.isJsxAttribute(n)) return;   // className="..." などの属性値は本文ではない
        if (ts.isJsxText(n)) { out += n.getText(); return; }
        if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) { out += n.text; return; }
        if (ts.isJsxExpression(n)) {
            if (n.expression && (ts.isStringLiteral(n.expression) || ts.isNoSubstitutionTemplateLiteral(n.expression))) out += n.expression.text;
            else if (n.expression && ts.isTemplateExpression(n.expression)) out += n.expression.getText().replace(/^`|`$/g, '').replace(/\$\{[^}]*\}/g, '');
            // 変数・関数呼び出し（{item.body} など）はデータ側で拾うので無視
            return;
        }
        if (ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n) || ts.isJsxFragment(n)) {
            const t = ts.isJsxFragment(n) ? '' : tagName(n);
            if (SKIP_TAGS.has(t)) return;
            if (t === 'br') { out += ' '; return; }
        }
        ts.forEachChild(n, walk);
    };
    walk(node);
    return clean(out.replace(/\{' '\}/g, ' '));
}
function jsxAttr(node, name) {
    const open = ts.isJsxElement(node) ? node.openingElement : node;
    for (const a of open.attributes?.properties ?? []) {
        if (ts.isJsxAttribute(a) && a.name.getText() === name && a.initializer) {
            if (ts.isStringLiteral(a.initializer)) return a.initializer.text;
            if (ts.isJsxExpression(a.initializer) && a.initializer.expression && ts.isStringLiteral(a.initializer.expression)) return a.initializer.expression.text;
        }
    }
    return undefined;
}
function literalValue(node) {
    if (!node) return undefined;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isTemplateExpression(node)) return node.getText().replace(/^`|`$/g, '').replace(/\$\{[^}]*\}/g, '');
    if (ts.isNumericLiteral(node)) return node.text;
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(literalValue).filter((v) => v !== undefined);
    if (ts.isObjectLiteralExpression(node)) {
        const o = {};
        for (const p of node.properties) {
            if (ts.isPropertyAssignment(p)) {
                const k = p.name.getText().replace(/^['"]|['"]$/g, '');
                const v = literalValue(p.initializer);
                if (v !== undefined) o[k] = v;
            }
        }
        return o;
    }
    if (ts.isParenthesizedExpression(node)) return literalValue(node.expression);
    if (ts.isAsExpression(node) || ts.isSatisfiesExpression?.(node)) return literalValue(node.expression);
    return undefined;
}
const hasJa = (s) => /[぀-ヿ一-鿿]/.test(String(s));

function extractPage(file) {
    const src = readFileSync(file, 'utf8');
    const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const page = { title: '', description: '', blocks: [], data: [], links: [] };
    const seen = new Set();
    const push = (kind, text) => { const t = clean(text); if (!t || seen.has(kind + t)) return; seen.add(kind + t); page.blocks.push({ kind, text: t }); };

    for (const st of sf.statements) {
        if (ts.isVariableStatement(st)) {
            for (const d of st.declarationList.declarations) {
                const name = d.name.getText();
                if (name === 'metadata' && d.initializer && ts.isObjectLiteralExpression(d.initializer)) {
                    const m = literalValue(d.initializer) || {};
                    page.title = clean(m.title || '').replace(/\s*\|\s*Mitoflow40\s*$/, '');
                    page.description = clean(m.description || '');
                    continue;
                }
                const v = literalValue(d.initializer);
                if (Array.isArray(v) && v.length && v.some((x) => typeof x === 'object' || hasJa(x))) page.data.push({ name, items: v });
                else if (v && typeof v === 'object' && !Array.isArray(v) && Object.values(v).some((x) => hasJa(typeof x === 'string' ? x : JSON.stringify(x)))) page.data.push({ name, items: [v] });
            }
        }
    }
    const visit = (n) => {
        if (ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n)) {
            const t = tagName(n);
            if (SKIP_TAGS.has(t)) return;
            if (t === 'Link' || t === 'a') {
                const href = jsxAttr(n, 'href');
                if (href && href.startsWith('/') && !href.startsWith('/#')) page.links.push({ href, label: inlineText(n) });
            }
            if (BLOCK.has(t)) {
                const text = inlineText(n);
                if (/^h[1-4]$/.test(t)) push(t, text);
                else if (t === 'li' || t === 'dt' || t === 'dd') push('li', text);
                else push('p', text);
                return; // ブロックの中は再帰しない（二重取りを防ぐ）
            }
        }
        ts.forEachChild(n, visit);
    };
    visit(sf);
    return page;
}

function renderPage(entry, page, linksTo) {
    const path = entry.path;
    const s = entry.search || {};
    const lines = [`# ${page.title || s.title || path}`, '', `- URL: ${SITE}${path}`];
    if (s.group || s.sub) lines.push(`- 分類: ${[s.group, s.sub].filter(Boolean).join(' ／ ')}`);
    if (page.description) lines.push(`- 概要: ${page.description}`);
    lines.push('', '## 本文');
    for (const b of page.blocks) {
        if (b.kind === 'h1') continue;                       // タイトルと重複
        if (b.kind === 'h2') lines.push('', `### ${b.text}`);
        else if (b.kind === 'h3' || b.kind === 'h4') lines.push('', `#### ${b.text}`);
        else if (b.kind === 'li') lines.push(`- ${b.text}`);
        else lines.push('', b.text);
    }
    if (page.data.length) {
        lines.push('', '## ページ内のデータ（一覧・表・カード）');
        for (const d of page.data) {
            lines.push('', `### ${d.name}`);
            for (const it of d.items) {
                if (typeof it === 'string') { lines.push(`- ${it}`); continue; }
                if (typeof it !== 'object') continue;
                const parts = Object.entries(it).filter(([k]) => !/^(color|bg|illustration|image|icon|img|href|slug|id|src)$/i.test(k)).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join('・') : typeof v === 'object' ? JSON.stringify(v) : v}`);
                if (parts.length) lines.push(`- ${parts.join(' ／ ')}`);
            }
        }
    }
    const rel = [...new Map(page.links.filter((l) => !/^\/(library|journal|podcast|plans|counseling-sheet|check|sample)?$/.test(l.href)).map((l) => [l.href, l])).values()];
    if (rel.length) {
        lines.push('', '## このページからのリンク');
        for (const l of rel) lines.push(`- ${l.href}${l.label ? ` — ${l.label}` : ''}`);
    }
    const back = linksTo.get(path);
    if (back?.length) {
        lines.push('', '## このページへのリンク元');
        for (const b of back) lines.push(`- ${b.path} — ${b.title}`);
    }
    return lines.join('\n') + '\n';
}

// ───────────────────────── コレクション（lib/*.ts） ─────────────────────────
const COLLECTIONS = [
    { key: 'biomarkers', label: '血液検査', route: '/biomarkers', mod: 'biomarkers', export: 'biomarkers' },
    { key: 'nutrients', label: '栄養素', route: '/nutrients', mod: 'nutrients', export: 'nutrients' },
    { key: 'foods', label: '食べ物', route: '/foods', mod: 'foods', export: 'foods' },
    { key: 'symptoms', label: '症状', route: '/symptoms', mod: 'symptoms', export: 'symptoms' },
    { key: 'hormones', label: 'ホルモン', route: '/hormones', mod: 'hormones', export: 'hormones' },
    { key: 'organs', label: '臓器', route: '/organs', mod: 'organs', export: 'organs' },
    { key: 'genes', label: '遺伝子', route: '/genes', mod: 'genes', export: 'genes' },
    { key: 'conditions', label: '疾患・状態', route: '/conditions', mod: 'conditions', export: 'conditions' },
    { key: 'essays', label: '思索（エッセイ）', route: '/thoughts', mod: 'essays', export: 'essays' },
];
const FIELD_LABEL = {
    tagline: '一言', role: '解説', summary: '定義', lead: '導入', description: '説明', body: '本文', closing: '締め（Mitoflow40 の視点）',
    standardRange: '一般の基準値', optimalRange: 'Mitoflow40 の理想値', highSigns: '高いとき', lowSigns: '低いとき', tips: 'ヒント',
    category: '分類', uniqueAngle: '固有の切り口', signs: 'こんなサイン', sections: '本文', selfCare: '暮らしの打ち手', whenToSeeDoctor: '受診の目安',
    references: '参考文献', updatedAt: '更新日', reading: '読み', en: '英名', functions: 'はたらき', function: 'はたらき', deficiency: '不足すると', excess: '過剰だと',
    sources: '多く含む食べ物', foods: '食べ物', nutrients: '栄養素', dose: '目安量', timing: 'タイミング', caution: '注意', notes: '補足',
    causes: '考えられる原因', mechanism: 'しくみ', checklist: 'チェック', actions: '打ち手', related: '関連ページ', relatedLinks: '関連ページ',
    relatedNutrients: '関連する栄養素', relatedGenes: '関連する遺伝子', relatedBiomarkers: '関連する血液検査', relatedSymptoms: '関連する症状', relatedSymptomSlugs: '関連する症状ページ',
    relatedFoods: '関連する食べ物', relatedHormones: '関連するホルモン', relatedOrgans: '関連する臓器', relatedConditions: '関連する疾患・状態',
};
const SKIP_FIELDS = new Set(['slug', 'name', 'title', 'color', 'illustration', 'image', 'icon', 'bg', 'hero', 'ogImage', 'emoji']);
const REL_TO_COLL = { relatedNutrients: 'nutrients', relatedGenes: 'genes', relatedBiomarkers: 'biomarkers', relatedSymptoms: 'symptoms', relatedSymptomSlugs: 'symptoms', relatedFoods: 'foods', relatedHormones: 'hormones', relatedOrgans: 'organs', relatedConditions: 'conditions' };

function renderValue(v, depth = 0) {
    const ind = '  '.repeat(depth);
    if (v == null || v === '') return [];
    if (typeof v === 'string') return depth ? [`${ind}- ${clean(v)}`] : paras(v).flatMap((p) => ['', p]);
    if (typeof v === 'number' || typeof v === 'boolean') return [`${ind}- ${v}`];
    if (Array.isArray(v)) return v.flatMap((x) => (typeof x === 'string' ? [`${ind}- ${clean(x)}`] : renderValue(x, depth + 1)));
    if (typeof v === 'object') {
        if (v.heading && (v.body || v.text)) {
            const kind = v.kind ? `【${{ evidence: '比較的確か', neutral: '根拠未確立', history: '歴史', core: '本質' }[v.kind] || v.kind}】` : '';
            return ['', `#### ${clean(v.heading)} ${kind}`.trim(), ...paras(v.body || v.text).flatMap((p) => ['', p])];
        }
        if (v.href && v.label) return [`${ind}- ${v.href} — ${clean(v.label)}`];
        if (v.title && (v.url || v.note)) return [`${ind}- ${clean(v.title)}${v.url ? ` — ${v.url}` : ''}${v.note ? `（${clean(v.note)}）` : ''}`];
        const parts = Object.entries(v).filter(([k]) => !SKIP_FIELDS.has(k)).map(([k, x]) => `${FIELD_LABEL[k] || k}: ${Array.isArray(x) ? x.map(clean).join('・') : typeof x === 'object' ? JSON.stringify(x) : clean(x)}`);
        return [`${ind}- ${parts.join(' ／ ')}`];
    }
    return [];
}

function renderItem(coll, item, byColl, linksTo) {
    const name = item.name || item.title || item.slug;
    const url = `${SITE}${coll.route}/${item.slug}`;
    const lines = [`# ${name}${item.en ? `（${item.en}）` : ''}`, '', `- URL: ${url}`, `- 種類: ${coll.label}`];
    if (item.category) lines.push(`- 分類: ${clean(item.category)}`);
    if (item.tagline) lines.push(`- 一言: ${clean(item.tagline)}`);
    for (const [k, v] of Object.entries(item)) {
        if (SKIP_FIELDS.has(k) || k === 'en' || k === 'category' || k === 'tagline') continue;
        if (v == null || (Array.isArray(v) && !v.length)) continue;
        const label = FIELD_LABEL[k] || k;
        if (REL_TO_COLL[k] && !(coll.key === 'genes' && k === 'relatedSymptoms')) {
            const target = REL_TO_COLL[k];
            const names = byColl[target] || new Map();
            const c = COLLECTIONS.find((x) => x.key === target);
            lines.push('', `## ${label}`, ...v.map((slug) => `- [${names.get(slug) || slug}](../${target}/${slug}.md) — ${SITE}${c.route}/${slug}`));
            continue;
        }
        lines.push('', `## ${label}`, ...renderValue(v));
    }
    const back = linksTo.get(`${coll.route}/${item.slug}`);
    if (back?.length) lines.push('', '## このページを参照しているページ（しくみ・症状・疾患など）', ...back.map((b) => `- ${b.path} — ${b.title}`));
    return lines.join('\n') + '\n';
}

// ───────────────────────── ジャーナル（WordPress REST） ─────────────────────────
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', mdash: '—', ndash: '–', laquo: '«', raquo: '»', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’' };
function htmlToText(html) {
    return String(html || '')
        .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, '')
        .replace(/<\/(p|div|h[1-6]|li|blockquote|tr|figure|figcaption)>/gi, '\n\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<h([1-6])[^>]*>/gi, (_, n) => '\n\n' + '#'.repeat(Math.min(Number(n) + 1, 4)) + ' ')
        .replace(/<li[^>]*>/gi, '\n- ')
        .replace(/<[^>]+>/g, '')
        .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
        .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
        .replace(/&([a-z]+);/gi, (m, e) => ENT[e.toLowerCase()] ?? m)
        .replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
async function fetchJournal() {
    const base = 'https://journal.mitoflow40.com/index.php';
    const posts = [];
    for (let page = 1; page <= 20; page++) {
        const u = new URL(base);
        u.searchParams.set('rest_route', '/wp/v2/posts');
        u.searchParams.set('per_page', '100');
        u.searchParams.set('page', String(page));
        u.searchParams.set('_fields', 'id,slug,date,modified,title,excerpt,content,link');
        const res = await fetch(u, { headers: { 'user-agent': 'mitoflow-library-build' } });
        if (!res.ok) { if (page === 1) throw new Error(`WP ${res.status}`); break; }
        const batch = await res.json();
        posts.push(...batch);
        const total = Number(res.headers.get('x-wp-totalpages') || '1');
        if (page >= total) break;
    }
    return posts;
}

// ───────────────────────── main ─────────────────────────
async function main() {
    log('Mitoflow40 ライブラリ → knowledge/ を生成します');
    rmSync(OUT, { recursive: true, force: true });
    mkdirSync(OUT, { recursive: true });

    // 1) 静的ページ
    const pagesMod = await import(pathToFileURL(join(ROOT, 'lib', 'pages.ts')).href);
    const staticPages = pagesMod.staticPages.filter((p) => p.path !== '/' && existsSync(join(ROOT, 'app', p.path.replace(/^\//, ''), 'page.tsx')));
    const pages = [];
    for (const entry of staticPages) {
        const file = join(ROOT, 'app', entry.path.replace(/^\//, ''), 'page.tsx');
        try { pages.push({ entry, page: extractPage(file) }); } catch (e) { log(`  ⚠ ${entry.path}: ${e.message}`); }
    }
    // 被リンク索引（どの静的ページがどこへリンクしているか）
    const linksTo = new Map();
    for (const { entry, page } of pages) {
        const title = page.title || entry.search?.title || entry.path;
        for (const l of new Set(page.links.map((x) => x.href.split('#')[0]))) {
            if (!linksTo.has(l)) linksTo.set(l, []);
            linksTo.get(l).push({ path: entry.path, title });
        }
    }
    mkdirSync(join(OUT, 'pages'), { recursive: true });
    const index = [];
    index.push(`# Mitoflow40 ライブラリ 知識索引`, '', `生成: ${new Date().toISOString().slice(0, 16).replace('T', ' ')} ／ 再生成: \`node .claude/skills/mitoflow-library/scripts/build.mjs\``, '',
        '使い方: この索引で当たりを付けて、必要な .md だけを Read する（全部は読まない）。各ファイル冒頭に公開 URL がある。', '');
    const groups = new Map();
    for (const { entry, page } of pages) {
        const slug = entry.path.replace(/^\//, '').replace(/\//g, '__');
        writeFileSync(join(OUT, 'pages', `${slug}.md`), renderPage(entry, page, linksTo));
        const g = entry.search?.group || 'その他';
        if (!groups.has(g)) groups.set(g, []);
        groups.get(g).push(`- [${page.title || entry.search?.title || entry.path}](pages/${slug}.md) — ${entry.path}${entry.search?.sub ? ` — ${entry.search.sub}` : ''}${page.description ? ` — ${page.description.slice(0, 80)}` : ''}`);
    }
    index.push(`## しくみ・コンセプトなどの静的ページ（${pages.length}）`);
    for (const [g, arr] of [...groups.entries()].sort((a, b) => b[1].length - a[1].length)) index.push('', `### ${g}（${arr.length}）`, ...arr);
    log(`  静的ページ ${pages.length} 枚`);

    // 2) コレクション
    const byColl = {};
    const loaded = {};
    for (const c of COLLECTIONS) {
        const mod = await import(pathToFileURL(join(ROOT, 'lib', `${c.mod}.ts`)).href);
        const items = mod[c.export] || [];
        loaded[c.key] = items;
        byColl[c.key] = new Map(items.map((it) => [it.slug, it.name || it.title || it.slug]));
    }
    // コレクション同士の被参照（例：この血液項目を参照している疾患・症状）
    for (const c of COLLECTIONS) {
        for (const it of loaded[c.key]) {
            for (const [k, target] of Object.entries(REL_TO_COLL)) {
                for (const slug of it[k] || []) {
                    const tc = COLLECTIONS.find((x) => x.key === target);
                    const key = `${tc.route}/${slug}`;
                    if (!linksTo.has(key)) linksTo.set(key, []);
                    linksTo.get(key).push({ path: `${c.route}/${it.slug}`, title: `${it.name || it.title}（${c.label}）` });
                }
            }
        }
    }
    for (const c of COLLECTIONS) {
        mkdirSync(join(OUT, c.key), { recursive: true });
        const items = loaded[c.key];
        index.push('', `## ${c.label}（${items.length}）`);
        for (const it of items) {
            writeFileSync(join(OUT, c.key, `${it.slug}.md`), renderItem(c, it, byColl, linksTo));
            const extra = c.key === 'biomarkers' ? ` ｜ 理想 ${clean(it.optimalRange || '—')}` : '';
            index.push(`- [${it.name || it.title}${it.en ? `（${it.en}）` : ''}](${c.key}/${it.slug}.md) — ${c.route}/${it.slug} — ${clean(it.tagline || it.summary || '').slice(0, 70)}${extra}`);
        }
        log(`  ${c.label} ${items.length} 件`);
    }

    // 3) ジャーナル
    let journalCount = 0;
    if (!NO_JOURNAL) {
        try {
            const posts = await fetchJournal();
            mkdirSync(join(OUT, 'journal'), { recursive: true });
            index.push('', `## ジャーナル（${posts.length}）— n=1（本人の体験記録）。事実の根拠にはライブラリ本体を使う`);
            for (const p of posts) {
                const title = htmlToText(p.title?.rendered || '');
                // ファイル名は「id-タイトル」（WP の slug は数字だけ・URL エンコード済み日本語のことが多く、一覧で読めないため）
                const slug = `${p.id}-${title.replace(/[【】「」『』（）()［］\[\]、。・!！?？:：,，.\s]+/g, '-').replace(/^-|-$/g, '').slice(0, 36)}`.replace(/-$/, '');
                const body = htmlToText(p.content?.rendered || '');
                const md = [`# ${title}`, '', `- URL: ${SITE}/journal/${p.id}`, `- 日付: ${String(p.date).slice(0, 10)}`, `- 種類: ジャーナル（n=1：本人の体験記録。事実の根拠には使わず、ライブラリ本体を正とする）`, '', '## 要約', '', htmlToText(p.excerpt?.rendered || ''), '', '## 本文', '', body, ''].join('\n');
                writeFileSync(join(OUT, 'journal', `${slug}.md`), md);
                index.push(`- [${title}](journal/${slug}.md) — /journal/${p.id} — ${String(p.date).slice(0, 10)}`);
                journalCount++;
            }
            log(`  ジャーナル ${journalCount} 本`);
        } catch (e) {
            log(`  ⚠ ジャーナルを取得できませんでした（${e.message}）。--no-journal と同じ扱いで続行`);
        }
    }

    writeFileSync(join(OUT, 'INDEX.md'), index.join('\n') + '\n');
    writeFileSync(join(OUT, '_meta.json'), JSON.stringify({ generatedAt: new Date().toISOString(), pages: pages.length, collections: Object.fromEntries(COLLECTIONS.map((c) => [c.key, loaded[c.key].length])), journal: journalCount }, null, 2));
    log(`✅ ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
