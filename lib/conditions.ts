// ── 不調・現代病（conditions）コレクション ───────────────────────────
// 「病態」を1枚ずつ積み上げるデータ駆動コレクション。
// 1件追加すると /conditions/<slug>・一覧・sitemap・横断検索・OG画像・関連ブロックに自動で載る。
//
// 編集方針（docs/library-1000-requirements.md）：
//   - 1ページ = 1つの固有の視点（uniqueAngle 必須）。テンプレの穴埋めは作らない
//   - 本文は最低3節。出典1件以上。関連リンク2件以上（ビルド時に検証して落とす）
//   - 語り口：中立だが明確なPOV／歴史から問い直す／細胞・ATP軸
//   - symptoms（体感の逆引き）との棲み分け：ここは「病態」を主語にする

export type SectionKind = 'evidence' | 'neutral' | 'history' | 'core' | 'plain';

export interface ConditionSection {
    heading: string;
    body: string;                 // 段落は \n\n 区切り
    kind?: SectionKind;           // evidence=比較的確か / neutral=根拠未確立 / history=歴史 / core=本質（細胞・ATP）
}

export interface ConditionReference {
    title: string;
    url?: string;
    note?: string;
}

export interface Condition {
    slug: string;
    name: string;
    en: string;
    reading?: string;
    tagline: string;              // 1行（カード・OG・meta）
    category: string;             // 一覧の見出し
    color: string;                // 背景色（カード・ヒーロー）
    uniqueAngle: string;          // このページ固有の切り口（ヒーロー直下に表示）
    summary: string;              // 定義（2〜4文）
    signs: string[];              // こんなサインがあれば
    sections: ConditionSection[]; // 本文（最低3節）
    selfCare: string[];           // 暮らしの打ち手
    whenToSeeDoctor: string[];    // 受診の目安（必要な医療を遠ざけない）
    relatedBiomarkers: string[];  // lib/biomarkers.ts の slug
    relatedSymptoms: string[];    // lib/symptoms.ts の slug
    relatedNutrients: string[];   // lib/nutrients.ts の slug
    relatedFoods?: string[];      // lib/foods.ts の slug
    relatedLinks: { href: string; label: string }[]; // しくみ・臓器・生活習慣ページ
    references: ConditionReference[];
    updatedAt: string;            // YYYY-MM-DD
}

export const CONDITION_CATEGORY_ORDER = [
    '栄養・代謝',
    '血糖・脂質・血圧',
    '内臓',
    'ホルモン',
    '炎症・免疫',
    '神経・こころ',
] as const;

export const conditions: Condition[] = [
    {
        slug: 'iron-deficiency',
        name: '鉄欠乏（隠れ貧血）',
        en: 'IRON DEFICIENCY',
        reading: 'てつけつぼう',
        tagline: '貧血と言われる前に、細胞のエネルギー工場が先に止まる',
        category: '栄養・代謝',
        color: '#FCE3D4',
        uniqueAngle: 'フェリチンを「鉄の貯金残高」ではなく「ATPをつくる現場の原料在庫」として読み直す。ヘモグロビンが下がるのは最後の段階で、その前に電子伝達系・TCA回路・神経伝達物質の合成が静かに減速している——「基準値内なのにしんどい」の正体をここから考える。',
        summary: '鉄欠乏とは、体内の鉄が必要量に対して不足している状態です。貧血（ヘモグロビンの低下）はその最終段階にすぎず、手前には「貯蔵鉄が減る」「鉄を使った造血が滞る」という、血液検査の基準値の内側で進む段階があります。この手前の段階が、いわゆる「隠れ貧血」です。日本では月経のある女性の多くが何らかの鉄不足を抱えているとされ、男性や閉経後の女性に見つかった場合は、別の原因（出血源）を探す必要があります。',
        signs: [
            '寝ても疲れが抜けない、階段で息が上がる',
            '手足の冷え、顔色が冴えない',
            '抜け毛が増えた、爪が薄く割れやすい',
            '集中が続かない、気分が沈みがち',
            '立ちくらみ、動悸',
            '氷を噛みたくなる（氷食症）',
            '夜、脚がむずむずして眠れない',
        ],
        sections: [
            {
                heading: '「貧血」と「鉄欠乏」は同じではない',
                kind: 'evidence',
                body: '健康診断で「貧血ではありません」と言われたのに、疲れが抜けない。こういう人の血液を見直すと、ヘモグロビン（Hb）は基準値内なのに、フェリチンだけが一桁〜十数 ng/mL まで下がっていることが珍しくありません。\n\n鉄欠乏は段階的に進みます。まず肝臓や脾臓に蓄えた貯蔵鉄が減り（フェリチン低下）、次に鉄を使った赤血球づくりが滞り（トランスフェリン飽和度の低下・MCVの小型化）、最後にヘモグロビンが下がって「貧血」と呼ばれる状態になります。健康診断の多くは最後の段階しか見ていません。\n\nつまり「貧血ではない」は「鉄は足りている」を意味しません。手前の2段階——貯蔵鉄の減少と鉄欠乏性造血——をまとめて「隠れ貧血」と呼ぶ理由はここにあります。',
            },
            {
                heading: '萎黄病から、数値の病へ——鉄欠乏の短い歴史',
                kind: 'history',
                body: '16世紀から19世紀のヨーロッパには「萎黄病（クロローシス）」と呼ばれる病がありました。若い女性に多く、顔色が青白く（緑がかって見えるとされ）、疲れやすく、動悸がし、食欲が偏る。当時は「恋の病」「処女の病」と説明され、結婚が治療法として語られたほどです。\n\n17世紀の医師トマス・シデナムは、この病に鉄を（ワインに鉄くずを漬けた薬として）処方し、効果を記録しています。1831年にはフランスのブローが硫酸鉄の丸薬（ブロー丸）を考案し、萎黄病は「鉄で治る病」として広く知られるようになりました。そして20世紀初頭、萎黄病という診断名そのものが医学から消えていきます。鉄欠乏性貧血という、血液検査で定義される病名に置き換わったからです。\n\n1972年に血清フェリチンの測定法が確立されると、鉄欠乏は「症状」ではなく「数値」で語られるようになりました。これは大きな進歩でしたが、同時に新しい問いを生みました。どの数値からを「欠乏」と呼ぶのか、という問いです。萎黄病の時代には「しんどい人に鉄を与えたら元気になった」という体感が基準でしたが、いまは基準値の線引きが人を分けています。',
            },
            {
                heading: '鉄はATPをつくる現場にいる',
                kind: 'core',
                body: '鉄というと「血を作る」イメージが先に立ちますが、体内の鉄の役割はそれだけではありません。ミトコンドリアの電子伝達系は、ヘム鉄を含むシトクロムと、鉄硫黄クラスターを抱えた複合体の連なりで、電子を受け渡しながらATPを合成しています。TCA回路のアコニターゼも鉄硫黄クラスターを必要とする酵素です。\n\nつまり鉄が不足すると、酸素を運ぶ赤血球が減るより前に、酸素を「使う」側であるミトコンドリアの仕事が落ちます。ヘモグロビンが正常でも疲れやすいのは、配送トラック（赤血球）は足りていても、工場（ミトコンドリア）の生産ラインが鉄不足で減速しているからだと考えると筋が通ります。\n\n鉄は脳でも働いています。ドーパミンやセロトニンの合成に関わるチロシン水酸化酵素・トリプトファン水酸化酵素は鉄を補因子とする酵素です。鉄欠乏で集中力が落ちる、気分が沈む、脚がむずむずする（レストレスレッグス症候群との関連）といった訴えは、血液の問題というより「鉄を使う酵素」の問題として理解できます。甲状腺ホルモンの合成にも鉄は必要で、鉄不足は冷えや代謝低下を通じて甲状腺機能低下と似た顔を見せることがあります。',
            },
            {
                heading: '「基準値内なのにしんどい」をどう読むか',
                kind: 'neutral',
                body: 'フェリチンの基準値は検査機関によって幅があり、女性では下限が 5 ng/mL 程度に設定されていることもあります。一方、WHO は健康な成人の鉄欠乏の目安を 15 ng/mL 未満とし、日本鉄バイオサイエンス学会の治療指針は鉄欠乏性貧血の診断に 12 ng/mL 未満を用いています。臨床の現場では、炎症がなければ 30 ng/mL 未満を鉄欠乏とみなす考え方も広く使われています。\n\nMitoflow40 の立場は明確です。フェリチンが 30 ng/mL を下回っていて、疲れ・冷え・抜け毛・集中力低下のような「鉄を使う酵素が足りないサイン」が重なっているなら、それは「基準値内だから問題なし」ではなく、調べる価値のある状態だと考えます。\n\nただし、理想値として語られる「50〜100 ng/mL」のような数字は、症状の改善と結びつけた研究はあるものの、万人に当てはまる根拠が確立しているわけではありません。ここは断定せず、本人の体感と他の指標（Hb・MCV・TSAT・hs-CRP）を合わせて読むのが誠実です。もう一つ忘れてはいけないのは、フェリチンは炎症で上昇する「急性期タンパク」でもあること。CRPが高いときのフェリチンは、鉄の在庫を実際より多く見せます。',
            },
            {
                heading: 'なぜ減るのか——入る・吸収する・出ていく',
                kind: 'evidence',
                body: '鉄が減る理由は「摂取が少ない」「吸収できない」「失っている」「需要が増えた」の4つに整理できます。\n\n摂取：日本人の鉄摂取量は減少傾向にあり、40代女性の平均はおよそ 6〜7 mg/日で、推奨量（月経あり 10.5 mg/日）に届いていません。肉や魚に含まれるヘム鉄は吸収率が高く、植物性の非ヘム鉄は低い（数％程度）ため、「何を」食べているかが量以上に効きます。\n\n吸収：鉄の吸収には胃酸が必要です。胃酸を抑える薬の長期使用、加齢による胃酸分泌の低下、ピロリ菌感染、セリアック病などは吸収を妨げます。食事中のお茶・コーヒーのタンニン、穀物や豆のフィチン酸も非ヘム鉄の吸収を下げます。逆にビタミンCは吸収を助けます。\n\n喪失：月経のある女性では、毎月の出血が最大の鉄の出口です。一方、男性や閉経後の女性で鉄欠乏が見つかった場合、消化管からの出血（胃潰瘍・大腸ポリープ・がんなど）が隠れていることがあり、サプリで数値を戻す前に出血源を探すのが医学の原則です。\n\n需要：妊娠・授乳、成長期、持久系の運動（汗・足底での赤血球破壊・運動後の炎症によるヘプシジン上昇）は鉄の需要を押し上げます。',
            },
        ],
        selfCare: [
            'ヘム鉄を「週に数回」意識する：レバー・赤身肉・あさり・牡蠣。植物性の鉄は吸収率が低いので、ほうれん草だけで補おうとしない',
            '鉄を含む食事にビタミンC（柑橘・ブロッコリー・ピーマン）を添える。吸収が上がる',
            'お茶・コーヒーは食事と1時間ずらす。タンニンが非ヘム鉄の吸収を妨げる',
            'タンパク質を足りさせる。鉄の運搬（トランスフェリン）も貯蔵（フェリチン）もタンパク質でできている',
            '胃酸を抑える薬を長く飲んでいる人は、鉄の数値を主治医と一緒に確認する',
            'サプリを使うなら「検査→補う→3ヶ月後に再検査」をセットに。数値を見ずに飲み続けない',
        ],
        whenToSeeDoctor: [
            'ヘモグロビンが基準値を下回っている（貧血の診断がついた）',
            '男性、または閉経後の女性で鉄欠乏が見つかった——消化管出血の精査が必要です',
            '黒い便・血便・月経過多がある',
            '動悸・息切れが強い、立ち上がるとふらつく',
            '妊娠中・授乳中に疲労や動悸が強い',
            '鉄剤・サプリで胃の不快感や便秘が続く（量や剤形の調整は医師・薬剤師へ）',
        ],
        relatedBiomarkers: ['ferritin', 'hemoglobin', 'mcv', 'serum-iron', 'tibc', 'transferrin-saturation', 'hscrp', 'vitamin-b12-serum'],
        relatedSymptoms: ['fatigue', 'cold', 'brain-fog', 'skin-hair', 'palpitations', 'dizziness', 'low-mood'],
        relatedNutrients: ['iron', 'vitamin-c', 'protein', 'b12', 'folate', 'copper'],
        relatedFoods: ['liver', 'beef', 'clams', 'oyster', 'spinach'],
        relatedLinks: [
            { href: '/electron-transport-chain', label: '電子伝達系' },
            { href: '/energy', label: 'エネルギーとは' },
            { href: '/digestion', label: '消化・吸収' },
            { href: '/health-check-guide', label: '40代の健康診断の読み方' },
            { href: '/hormones/thyroid-hormone', label: '甲状腺ホルモン' },
        ],
        references: [
            { title: 'WHO guideline on use of ferritin concentrations to assess iron status in individuals and populations (2020)', url: 'https://www.who.int/publications/i/item/9789240000124' },
            { title: '日本鉄バイオサイエンス学会 治療指針作成委員会『鉄剤の適正使用による貧血治療指針 改訂第3版』（2015）' },
            { title: 'Camaschella C. Iron-Deficiency Anemia. N Engl J Med. 2015;372:1832-1843.', url: 'https://www.nejm.org/doi/full/10.1056/NEJMra1401038' },
            { title: 'Pasricha SR, et al. Iron deficiency. Lancet. 2021;397:233-248.', url: 'https://doi.org/10.1016/S0140-6736(20)32594-0' },
            { title: '厚生労働省『日本人の食事摂取基準（2020年版）』鉄', url: 'https://www.mhlw.go.jp/stf/newpage_08517.html' },
            { title: 'Loudon I. The diseases called chlorosis. Psychol Med. 1984;14:27-36.', note: '萎黄病の歴史' },
        ],
        updatedAt: '2026-08-21',
    },
];

export function getConditionBySlug(slug: string): Condition | undefined {
    return conditions.find((c) => c.slug === slug);
}

export function getConditionsByCategory(): { category: string; items: Condition[] }[] {
    const order = CONDITION_CATEGORY_ORDER as readonly string[];
    const cats = Array.from(new Set(conditions.map((c) => c.category)))
        .sort((a, b) => (order.indexOf(a) === -1 ? 99 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 99 : order.indexOf(b)));
    return cats.map((category) => ({ category, items: conditions.filter((c) => c.category === category) }));
}

// ── ビルド時バリデーション（薄いページを「出さない」ための型外チェック）────
// 本文3節・uniqueAngle・出典1件・関連リンク2件・slug の重複。違反があれば import 時点で落とす。
function validateConditions(items: Condition[]): void {
    const seen = new Set<string>();
    const problems: string[] = [];
    for (const c of items) {
        const where = `conditions[${c.slug}]`;
        if (!/^[a-z0-9-]{3,60}$/.test(c.slug)) problems.push(`${where}: slug は英小文字・数字・ハイフン`);
        if (seen.has(c.slug)) problems.push(`${where}: slug が重複`);
        seen.add(c.slug);
        if (c.sections.length < 3) problems.push(`${where}: 本文は最低3節（現在 ${c.sections.length}）`);
        if (c.uniqueAngle.trim().length < 40) problems.push(`${where}: uniqueAngle が短すぎる（固有の切り口を書く）`);
        if (c.references.length < 1) problems.push(`${where}: 出典が必要`);
        const links = c.relatedBiomarkers.length + c.relatedSymptoms.length + c.relatedNutrients.length + (c.relatedFoods?.length ?? 0) + c.relatedLinks.length;
        if (links < 2) problems.push(`${where}: 関連リンクは最低2件`);
        if (c.selfCare.length < 1 || c.whenToSeeDoctor.length < 1) problems.push(`${where}: selfCare / whenToSeeDoctor は各1件以上`);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(c.updatedAt)) problems.push(`${where}: updatedAt は YYYY-MM-DD`);
    }
    if (problems.length) throw new Error(`[conditions] データ検証エラー:\n- ${problems.join('\n- ')}`);
}
validateConditions(conditions);
