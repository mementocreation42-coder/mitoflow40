// 「僕が飲んでいるサプリ」（/my-supplements）のデータ。
// 中身は本人の記録（ジャーナル #20082「生活習慣とサプリ」2025-11-20 ほか）から。勧めるリストではなく、記録。
// 商品が決まっているものは productUrl に iHerb の商品ページを入れる。空なら品名での検索結果に飛ぶ。
// どのリンクにも紹介コード（rcode）を付ける。広告であることはページ側で明示する（景品表示法のステマ規制）。

export const IHERB_RCODE = 'CCT0425';
export const UPDATED_AT = '2025-11-20'; // 一覧を見直したら更新する

export type SupplementStatus = 'taking' | 'paused' | 'food';

export type SupplementKind = 'mineral' | 'vitamin' | 'fat' | 'antioxidant' | 'other' | 'food';

export const KIND_META: Record<SupplementKind, { label: string; bg: string; fg: string }> = {
    mineral: { label: 'ミネラル', bg: '#41C9B4', fg: '#06302A' },
    vitamin: { label: 'ビタミン', bg: '#FFB37B', fg: '#4A2208' },
    fat: { label: '脂質', bg: '#6CCFF6', fg: '#0B3346' },
    antioxidant: { label: '抗酸化', bg: '#B9A6E8', fg: '#2B1C55' },
    other: { label: 'その他', bg: '#E9E2D6', fg: '#3A3326' },
    food: { label: '食品', bg: '#FBE9D0', fg: '#4A3410' },
};

export interface MySupplement {
    name: string;
    symbol: string;             // サムネイルの記号（周期表ふう）
    kind: SupplementKind;
    status: SupplementStatus;   // 飲んでいる／見合わせ中／食品として
    nutrientSlug?: string;      // ライブラリの栄養素ページ（働きの説明はそちらに任せる）
    note?: string;              // 本人の言葉で、なぜ・どう飲んでいるか（記録にあることだけ）
    search: string;             // iHerb で探すときの語
    productUrl?: string;        // iHerb の商品ページ（決まっていれば）
}

export const MY_SUPPLEMENTS: MySupplement[] = [
    { name: '塩化マグネシウム', symbol: 'Mg', kind: 'mineral', status: 'taking', nutrientSlug: 'magnesium', note: '人はストレスを感じるとマグネシウムを使うと言われています。僕の中では超重要です。', search: 'magnesium chloride' },
    { name: 'ビタミンD3', symbol: 'D3', kind: 'vitamin', status: 'taking', nutrientSlug: 'vitamin-d', note: 'マグネシウムと合わせて飲んでいます。', search: 'vitamin d3' },
    { name: 'ビタミンC', symbol: 'C', kind: 'vitamin', status: 'taking', nutrientSlug: 'vitamin-c', search: 'vitamin c' },
    { name: '亜鉛', symbol: 'Zn', kind: 'mineral', status: 'taking', nutrientSlug: 'zinc', search: 'zinc' },
    { name: 'オメガ3脂肪酸', symbol: 'Ω3', kind: 'fat', status: 'taking', nutrientSlug: 'omega3', search: 'omega 3 fish oil' },
    { name: 'コエンザイムQ10', symbol: 'Q10', kind: 'antioxidant', status: 'taking', nutrientSlug: 'coq10', search: 'coq10' },
    { name: 'αリポ酸', symbol: 'ALA', kind: 'antioxidant', status: 'taking', nutrientSlug: 'alpha-lipoic-acid', search: 'alpha lipoic acid' },
    { name: 'アスタキサンチン', symbol: 'Ax', kind: 'antioxidant', status: 'taking', search: 'astaxanthin' },
    { name: 'クエン酸', symbol: 'Cit', kind: 'other', status: 'taking', search: 'citric acid' },
    { name: '炭酸水素ナトリウム', symbol: 'NaHCO₃', kind: 'mineral', status: 'taking', search: 'sodium bicarbonate' },
    { name: '八重山クロレラ', symbol: 'Chl', kind: 'food', status: 'taking', search: 'chlorella' },
    { name: 'セレン', symbol: 'Se', kind: 'mineral', status: 'paused', nutrientSlug: 'selenium', note: '体にまったく合わず、いまは見合わせています。', search: 'selenium' },
    { name: 'MCTオイル', symbol: 'MCT', kind: 'fat', status: 'food', note: '朝のコーヒーに少し。お腹が減りにくく感じています。', search: 'mct oil' },
    { name: 'ソイプロテイン', symbol: 'Soy', kind: 'food', status: 'food', nutrientSlug: 'protein', search: 'soy protein' },
];

export function iherbUrl(s: MySupplement): string {
    const base = s.productUrl ?? `https://jp.iherb.com/search?kw=${encodeURIComponent(s.search)}`;
    const u = new URL(base);
    u.searchParams.set('rcode', IHERB_RCODE);
    return u.toString();
}

export const IHERB_HOME = `https://jp.iherb.com/?rcode=${IHERB_RCODE}`;
