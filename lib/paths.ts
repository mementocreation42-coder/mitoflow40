// 教科書（読む順）。既存ページを書き換えず、上に「順番」だけを載せる薄い層。
// 事実はライブラリ本体、体験はジャーナル（n=1）。ここではライブラリの順番だけを決める。

export interface PathStep {
    href: string;   // 既存ページのパス
    title: string;  // 表示名
    why: string;    // なぜこの位置で読むのか（1 行）
}

export interface ReadingPath {
    slug: string;
    n: number;
    title: string;
    en: string;
    color: string;   // 淡い背景
    accent: string;  // 濃い差し色
    lead: string;    // この章で身につくこと
    steps: PathStep[];
}

export const readingPaths: ReadingPath[] = [
    {
        slug: 'first-seven', n: 1, title: 'はじめての 7 枚', en: 'THE BACKBONE', color: '#D7F0E8', accent: '#2FB59F',
        lead: 'このライブラリ全体を貫く考え方を、7 枚で通しで読む。「病気でない」の先に何を目指すのか、体の本体はどこにあるのか、なぜ足す前に引くのか。ここを読んでから他の章へ進むと、どのページも同じ地図の上に置ける。',
        steps: [
            { href: '/health-philosophy', title: '健康とは', why: '出発点。「病気でない」ではなく「本来の力を発揮できる状態」を目指すという立場を先に決める。' },
            { href: '/precision-nutrition', title: '精密栄養学とは', why: '「みんなの平均」ではなく「あなたの最適」を探す。ライブラリの読み方そのもの。' },
            { href: '/mitochondria', title: 'ミトコンドリア', why: '体の本体はここ。疲れも冷えも不調も、まず「エネルギーが作れているか」で読む。' },
            { href: '/atp', title: 'ATP', why: 'カロリーではなく ATP。エネルギーの単位を入れ替えると、食事と運動の意味が変わる。' },
            { href: '/blood-sugar', title: '血糖コントロール', why: '毎日の体調を最も大きく揺らす変数。ミトコンドリアと血糖はひと続きの話。' },
            { href: '/fasting', title: '食べない時間の力', why: '足す前に引く。栄養を「足す」発想から、いらないものを「引く」発想へ。' },
            { href: '/balance', title: 'バランス（中庸）', why: '引きすぎもまた不調のもと。揺れながら調整し続ける、という着地点。' },
        ],
    },
    {
        slug: 'read-blood-tests', n: 2, title: '血液検査を読めるようになる 11 枚', en: 'READ YOUR BLOOD', color: '#CFE8F0', accent: '#3AA7C9',
        lead: '健康診断の A・B 判定で終わらせず、数値を「体の現在地」として読む。単独の値ではなくペアと比率で、炎症で歪む指標に気をつけながら。読み終えたら、自分の検査票を手に取って、同じ順番でたどってみる。',
        steps: [
            { href: '/health-check-guide', title: '40 代の健康診断の読み方', why: '基準値と理想値の違い、経年変化の見方。読み方の土台。' },
            { href: '/biomarkers', title: '血液検査 50 項目', why: '全体の地図。どの項目がどの系統（血球・肝・腎・糖・脂質・甲状腺…）に属するかを眺める。' },
            { href: '/inflammation', title: '炎症', why: 'フェリチン・アルブミン・亜鉛は炎症で歪む。数値を読む前に、この落とし穴を知る。' },
            { href: '/biomarkers/hscrp', title: '高感度 CRP', why: '炎症の物差し。他の値を読むときに、必ず横に置く 1 本。' },
            { href: '/biomarkers/ferritin', title: 'フェリチン', why: '「貧血ではない」と「鉄が足りている」は別。隠れ貧血の読み方。' },
            { href: '/biomarkers/hba1c', title: 'HbA1c', why: '1〜2 ヶ月の平均血糖。正常範囲でも食後高血糖は隠れる。' },
            { href: '/biomarkers/glycoalbumin', title: 'グリコアルブミン', why: 'HbA1c の横に置く。2〜3 週間の平均と「揺れ」を映し、鉄欠乏に左右されない。' },
            { href: '/biomarkers/fasting-insulin', title: '空腹時インスリン', why: '血糖が正常でもインスリンが高ければ抵抗性は進んでいる。HOMA-IR の考え方。' },
            { href: '/biomarkers/ast', title: 'AST', why: 'ALT とのペアで読む代表例。比率が語ること。' },
            { href: '/biomarkers/ggt', title: 'γ-GT', why: '酒だけではない。酸化ストレスと解毒の負担を映す。' },
            { href: '/biomarkers/vitamin-d-serum', title: 'ビタミン D（25-OH）', why: '「一般基準」と「理想値」の差が最も大きい項目のひとつ。' },
        ],
    },
    {
        slug: 'fatigue', n: 3, title: '40 代の疲れを解く 10 枚', en: 'WHY SO TIRED', color: '#FDEAD0', accent: '#EE9A3C',
        lead: '「異常なし」なのに疲れが抜けない。症状から入り、血液で確かめ、栄養で下支えし、暮らしで整える。この章の順番そのものが、Mitoflow40 の解析の順番。',
        steps: [
            { href: '/symptoms/fatigue', title: '疲れやすい・だるい', why: '症状の入口。何を疑い、どの血液項目を見るか。' },
            { href: '/energy', title: 'エネルギー', why: '疲れを「気合」ではなく「エネルギー産生」の問題として捉え直す。' },
            { href: '/biomarkers/ferritin', title: 'フェリチン', why: '疲れの原因として最も見落とされる貯蔵鉄。' },
            { href: '/biomarkers/tsh', title: 'TSH', why: '代謝の司令部。甲状腺は疲れ・冷え・体重を同時に動かす。' },
            { href: '/nutrients/iron', title: '鉄', why: '電子伝達系の中心。摂り方と吸収の妨げ。' },
            { href: '/nutrients/magnesium', title: 'マグネシウム', why: 'ATP を「使える形」にするミネラル。最も隠れ不足が多い。' },
            { href: '/sleep', title: '睡眠', why: '回復の時間。量より質、質より一定。' },
            { href: '/autonomic-nervous-system', title: '自律神経', why: '休む側に切り替わらない体。HRV という物差し。' },
            { href: '/exercise', title: '運動', why: '5 分でよい。細胞に酸素を届けるイメージで。' },
            { href: '/stress', title: 'ストレスとは', why: 'ストレスはマグネシウムを使い、睡眠を削り、血糖を上げる。最後に全体を束ねる。' },
        ],
    },
    {
        slug: 'fix-your-plate', n: 4, title: '食事を整える 9 枚', en: 'LESS, THEN MORE', color: '#FBE9D0', accent: '#E39A2E',
        lead: '「何を食べるか」の前に「何をやめるか」。カロリーの常識を疑い、主食と油を見直し、食べない時間をつくってから、食材と香りで足していく。',
        steps: [
            { href: '/calories', title: 'カロリーの誤解', why: '「1kcal は 1kcal」ではない。数え方を手放すところから。' },
            { href: '/nutrition-history', title: '栄養学の歴史', why: 'いまの常識がどこから来たか。戦後の粉食奨励まで。' },
            { href: '/rice', title: '白米・玄米の真実', why: '主食の見直し。玄米＝健康とは限らない、個人差の話。' },
            { href: '/wheat', title: '小麦と健康', why: '血糖・グルテン・精製。やめると体が軽くなる人が多い理由。' },
            { href: '/caution-foods', title: '気をつけたい食品', why: '超加工食品と酸化した油。引くものの一覧。' },
            { href: '/fasting', title: '食べない時間の力', why: '引き算の仕上げ。16 時間の意味と、やってはいけないやり方。' },
            { href: '/foods', title: '食べ物', why: 'ここから足す。卵・魚・納豆・葉物、身近な食材で何が摂れるか。' },
            { href: '/spices', title: 'スパイスの歴史と現在', why: '塩と砂糖を減らす代わりに香りを足す。効能の言いすぎに注意しながら。' },
            { href: '/supplements', title: 'サプリメント', why: '最後に、足りない分だけ。マルチではなく単体で、体に聞きながら減らす。' },
        ],
    },
];

export function findStep(pathname: string): { path: ReadingPath; index: number } | null {
    for (const path of readingPaths) {
        const index = path.steps.findIndex((s) => s.href === pathname);
        if (index >= 0) return { path, index };
    }
    return null;
}
