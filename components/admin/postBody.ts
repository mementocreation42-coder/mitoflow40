// ── 記事本文の共通ルール ─────────────────────────────────────────────
// エディタの textarea に入る素のテキスト（body）を、リアルタイムプレビュー・保存（WordPress ブロック）・
// 既存記事を開くときの逆変換の 3 か所が同じ関数で扱う。ここを通る限り「書いた通りに公開される」。
//
//   段落          … 空行で区切る。行内の <strong> <em> <a> などの HTML はそのまま使える
//   見出し        … 「## 見出し」「### 小見出し」（<h2>…</h2> と書いても同じ）
//   箇条書き      … 「- 項目」を並べる。「1. 項目」で番号付き
//   引用          … 「> 文」
//   画像          … [image:0] のように番号で参照（ドロップ／メディア選択で自動挿入）
//   リンクカード  … URL を 1 行だけの段落にすると OGP カードになる（Amazon／楽天は商品カード）
//   商品カード    … <div class="mf-product-card" data-…></div>（「商品カードを挿入」が生成）

export interface UploadedImage { url: string; id: number }

export interface ProductData {
    amazonUrl?: string; rakutenUrl?: string;
    title?: string; image?: string; price?: string; brand?: string;
}

export type ContentBlock =
    | { type: 'paragraph'; html: string }
    | { type: 'heading'; level: 2 | 3 | 4; html: string }
    | { type: 'list'; ordered: boolean; items: string[] }
    | { type: 'quote'; html: string }
    | { type: 'html'; html: string }
    | { type: 'image'; index: number; image: UploadedImage | null }
    | { type: 'url'; url: string }
    | { type: 'product'; url: string }
    | { type: 'productCustom'; html: string; product: ProductData };

export const AMAZON_RE = /amazon\.co\.jp|amzn\.to|amzn\.asia|a\.co\//i;
export const RAKUTEN_RE = /rakuten\.co\.jp|item\.rakuten/i;
const STANDALONE_URL = /^https?:\/\/[^\s<>"]+$/;
const BLOCK_HTML = /^<(h[2-6]|ul|ol|blockquote|figure|table|div|pre|iframe|section)\b/i;

// 記事一覧・プレビューで使うカテゴリ色（WordPress のカテゴリ ID）
export const CATEGORY_COLORS: Record<number, { background: string; borderColor: string; color: string }> = {
    1: { background: '#FAD9CE', borderColor: '#E9A58E', color: '#8C3E25' },   // 食事・栄養
    5: { background: '#D5F0DF', borderColor: '#95D4AC', color: '#246B42' },   // 運動
    10: { background: '#CDD8F5', borderColor: '#9FB2E2', color: '#36568F' },  // 生活習慣
    11: { background: '#ECCAE3', borderColor: '#D69AC3', color: '#7D3566' },  // サプリメント
    12: { background: '#F5EAC0', borderColor: '#DDC976', color: '#735F12' },  // データ・効果検証
};
export const DEFAULT_CATEGORY_COLOR = { background: '#D7F7ED', borderColor: '#94DFC9', color: '#246E58' };

export function splitBlocks(body: string): string[] {
    return body.replace(/\r\n?/g, '\n').split(/\n[ \t]*\n/).map((s) => s.trim()).filter(Boolean);
}

function decodeAttr(s: string): string {
    return s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

export function parseProductDiv(html: string): ProductData | null {
    if (!/mf-product-card/.test(html)) return null;
    const get = (attr: string) => {
        const m = html.match(new RegExp(`data-${attr}="([^"]*)"`, 'i'));
        return m ? decodeAttr(m[1]) : undefined;
    };
    const amazonUrl = get('amazon-url');
    const rakutenUrl = get('rakuten-url');
    if (!amazonUrl && !rakutenUrl) return null;
    return { amazonUrl, rakutenUrl, title: get('title'), image: get('image'), price: get('price'), brand: get('brand') };
}

// body → ブロック列（プレビューと保存の両方がこれを使う）
export function parseBlocks(body: string, images: UploadedImage[]): ContentBlock[] {
    const out: ContentBlock[] = [];
    for (const t of splitBlocks(body)) {
        const img = t.match(/^\[image:(\d+)\]$/);
        if (img) {
            const i = parseInt(img[1], 10);
            out.push({ type: 'image', index: i, image: images[i] ?? null });
            continue;
        }
        if (STANDALONE_URL.test(t)) {
            out.push(AMAZON_RE.test(t) || RAKUTEN_RE.test(t) ? { type: 'product', url: t } : { type: 'url', url: t });
            continue;
        }
        if (/^<div[^>]+class="[^"]*mf-product-card/i.test(t)) {
            const p = parseProductDiv(t);
            if (p) { out.push({ type: 'productCustom', html: t, product: p }); continue; }
        }
        const lines = t.split('\n');
        const h = lines[0].match(/^(#{2,4})\s+(.+)$/);
        if (h) {
            out.push({ type: 'heading', level: h[1].length as 2 | 3 | 4, html: h[2].trim() });
            const rest = lines.slice(1).join('\n').trim();
            if (rest) out.push({ type: 'paragraph', html: rest.replace(/\n/g, '<br>') });
            continue;
        }
        if (lines.every((l) => /^[-*]\s+/.test(l))) {
            out.push({ type: 'list', ordered: false, items: lines.map((l) => l.replace(/^[-*]\s+/, '')) });
            continue;
        }
        if (lines.every((l) => /^\d+[.)]\s+/.test(l))) {
            out.push({ type: 'list', ordered: true, items: lines.map((l) => l.replace(/^\d+[.)]\s+/, '')) });
            continue;
        }
        if (lines.every((l) => /^>/.test(l))) {
            out.push({ type: 'quote', html: lines.map((l) => l.replace(/^>\s?/, '')).join('<br>') });
            continue;
        }
        if (BLOCK_HTML.test(t)) { out.push({ type: 'html', html: t }); continue; }
        out.push({ type: 'paragraph', html: t.replace(/\n/g, '<br>') });
    }
    return out;
}

// ブロック列 → WordPress のブロックマークアップ（保存用）
export function bodyToWpContent(body: string, images: UploadedImage[]): string {
    const parts: string[] = [];
    for (const b of parseBlocks(body, images)) {
        switch (b.type) {
            case 'paragraph':
                parts.push(`<!-- wp:paragraph -->\n<p>${b.html}</p>\n<!-- /wp:paragraph -->`);
                break;
            case 'heading':
                parts.push(`<!-- wp:heading${b.level === 2 ? '' : ` {"level":${b.level}}`} -->\n<h${b.level} class="wp-block-heading">${b.html}</h${b.level}>\n<!-- /wp:heading -->`);
                break;
            case 'list': {
                const tag = b.ordered ? 'ol' : 'ul';
                const items = b.items.map((it) => `<!-- wp:list-item -->\n<li>${it}</li>\n<!-- /wp:list-item -->`).join('\n');
                parts.push(`<!-- wp:list${b.ordered ? ' {"ordered":true}' : ''} -->\n<${tag} class="wp-block-list">${items}</${tag}>\n<!-- /wp:list -->`);
                break;
            }
            case 'quote':
                parts.push(`<!-- wp:quote -->\n<blockquote class="wp-block-quote"><!-- wp:paragraph -->\n<p>${b.html}</p>\n<!-- /wp:paragraph --></blockquote>\n<!-- /wp:quote -->`);
                break;
            case 'html':
            case 'productCustom':
                parts.push(`<!-- wp:html -->\n${b.html}\n<!-- /wp:html -->`);
                break;
            case 'image':
                if (!b.image) break; // 未設定の [image:N] は公開しない（プレビューで警告を出す）
                parts.push(b.image.id
                    ? `<!-- wp:image {"id":${b.image.id}} -->\n<figure class="wp-block-image"><img src="${b.image.url}" alt="" class="wp-image-${b.image.id}"/></figure>\n<!-- /wp:image -->`
                    : `<!-- wp:image -->\n<figure class="wp-block-image"><img src="${b.image.url}" alt=""/></figure>\n<!-- /wp:image -->`);
                break;
            case 'url':
            case 'product':
                // 公開側（JournalContent）が URL だけの段落を OGP／商品カードに変換する
                parts.push(`<!-- wp:paragraph -->\n<p>${b.url}</p>\n<!-- /wp:paragraph -->`);
                break;
        }
    }
    return parts.join('\n\n');
}

function inlineText(inner: string): string {
    return inner
        .replace(/\s*\n\s*/g, ' ')
        .replace(/<br\s*\/?>\s*/gi, '\n')
        .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'")
        .trim();
}

// 公開済み記事の HTML（content.rendered）→ エディタの body。
// 以前はタグを全部剥がしていたため、見出し・画像・商品カードが編集のたびに消えていた。
export function htmlToBody(html: string): { body: string; images: UploadedImage[] } {
    const images: UploadedImage[] = [];
    const keep: string[] = [];
    const hold = (s: string) => { keep.push(s); return `\n\n@@KEEP${keep.length - 1}@@\n\n`; };
    const pushImg = (tag: string, src: string) => {
        const id = parseInt(tag.match(/wp-image-(\d+)/)?.[1] ?? tag.match(/data-id="(\d+)"/)?.[1] ?? '0', 10) || 0;
        images.push({ url: decodeAttr(src), id });
        return `\n\n[image:${images.length - 1}]\n\n`;
    };
    let s = html.replace(/\r\n?/g, '\n').replace(/<!--\s*\/?wp:[\s\S]*?-->/g, '');
    s = s.replace(/<figure\b[^>]*>[\s\S]*?<img\b[^>]*src="([^"]+)"[^>]*>[\s\S]*?<\/figure>/gi, (m, src) => pushImg(m, src));
    s = s.replace(/<img\b[^>]*src="([^"]+)"[^>]*>/gi, (m, src) => pushImg(m, src));
    s = s.replace(/<div\b[^>]*class="[^"]*mf-product-card[^"]*"[^>]*>\s*<\/div>/gi, (m) => hold(m.trim()));
    s = s.replace(/<(table|pre|iframe)\b[\s\S]*?<\/\1>/gi, (m) => hold(m.trim()));
    s = s.replace(/<h([2-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, l, inner) => `\n\n${'#'.repeat(parseInt(l, 10))} ${inlineText(inner)}\n\n`);
    s = s.replace(/<h([156])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, l, inner) => `\n\n${l === '1' ? '## ' : '#### '}${inlineText(inner)}\n\n`);
    s = s.replace(/<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, tag, inner) => {
        const items = [...inner.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((x) => inlineText(x[1]).replace(/\n+/g, ' '));
        return `\n\n${items.map((it, i) => (tag.toLowerCase() === 'ol' ? `${i + 1}. ` : '- ') + it).join('\n')}\n\n`;
    });
    s = s.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner) => {
        const paras = [...inner.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((x) => inlineText(x[1]));
        const lines = (paras.length ? paras : [inlineText(inner)]).join('\n').split('\n');
        return `\n\n${lines.map((l) => `> ${l}`).join('\n')}\n\n`;
    });
    s = s.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, inner) => {
        const text = inlineText(inner);
        const link = text.match(/^<a\b[^>]*href="([^"]+)"[^>]*>\s*([^<]+?)\s*<\/a>$/i);
        return `\n\n${link && decodeAttr(link[1]) === link[2].trim() ? decodeAttr(link[1]) : text}\n\n`;
    });
    s = s.replace(/<br\s*\/?>/gi, '\n');
    // 段落内で使える行内タグだけ残し、それ以外のタグは剥がす
    s = s.replace(/<\/?(?!(?:strong|em|b|i|a|code|mark|s|u|sup|sub|span)\b)[a-z][^>]*>/gi, '');
    s = s.replace(/@@KEEP(\d+)@@/g, (_, i) => keep[parseInt(i, 10)]);
    const body = s.split('\n').map((l) => l.replace(/[ \t]+$/, '')).join('\n').replace(/\n{3,}/g, '\n\n').trim();
    return { body, images };
}

export function decodeEntities(s: string): string {
    const named: Record<string, string> = {
        amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
        hellip: '…', ndash: '–', mdash: '—', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
    };
    return s
        .replace(/&#(x[0-9a-f]+|\d+);/gi, (_, v: string) => String.fromCodePoint(v[0].toLowerCase() === 'x' ? parseInt(v.slice(1), 16) : parseInt(v, 10)))
        .replace(/&([a-z]+);/gi, (m, n: string) => named[n.toLowerCase()] ?? m);
}

// 日本時間の「いま」を datetime-local の値（YYYY-MM-DDTHH:mm）で返す。
// WordPress はタイムゾーン無しの日時をサイトのローカル時刻（JST）として扱うので、この形式のまま送る。
export function nowInTokyo(): string {
    return new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(new Date()).replace(' ', 'T');
}

// textarea 内のキャレット座標（ミラー DOM 方式）。スラッシュメニューを入力位置の直下に出すために使う
export function getCaretCoordinates(ta: HTMLTextAreaElement, position: number): { top: number; left: number } {
    const div = document.createElement('div');
    const style = getComputedStyle(ta);
    const props = [
        'boxSizing', 'width', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
        'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
        'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'lineHeight', 'fontFamily',
        'textAlign', 'textTransform', 'textIndent', 'letterSpacing', 'wordSpacing', 'tabSize', 'whiteSpace', 'wordWrap',
    ] as const;
    for (const p of props) {
        (div.style as unknown as Record<string, string>)[p] = style.getPropertyValue(p.replace(/([A-Z])/g, '-$1').toLowerCase());
    }
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.whiteSpace = 'pre-wrap';
    div.style.wordWrap = 'break-word';
    div.textContent = ta.value.substring(0, position);
    const span = document.createElement('span');
    span.textContent = ta.value.substring(position) || '.';
    div.appendChild(span);
    document.body.appendChild(div);
    const top = span.offsetTop - ta.scrollTop;
    const left = span.offsetLeft;
    document.body.removeChild(div);
    return { top, left };
}
