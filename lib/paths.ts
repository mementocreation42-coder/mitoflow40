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
    {
        slug: 'gut-first', n: 5, title: '腸を整える 8 枚', en: 'GUT FIRST', color: '#F0E2D8', accent: '#C98A5E',
        lead: '「食べた」と「吸収できた」は別の話。消化から吸収、腸内細菌、腸と脳のつながりまでを順に読むと、肌・気分・免疫の不調が腸から見えてくる。',
        steps: [
            { href: '/digestion', title: '消化・吸収', why: '入口。胃酸と酵素がそろって初めて、食べ物は材料になる。' },
            { href: '/gut-health', title: '腸内環境', why: '腸は消化だけの臓器ではない。免疫の最前線と、気分の材料がここにある。' },
            { href: '/microbiome', title: '腸内フローラ', why: '善玉菌を「足す」より「育てる」。食物繊維と発酵食品の役割。' },
            { href: '/gut-troubles', title: '気になる腸のキーワード', why: 'グルテン・カゼイン・リーキーガット・SIBO。言葉が先行しがちな話題を中立に。' },
            { href: '/gut-brain', title: '脳腸相関', why: '腸の不調が気分に、気分が腸に。双方向の道を知ると、打ち手が増える。' },
            { href: '/organs/gut', title: '腸', why: '臓器としての腸。関わる血液項目と、40 代での変化。' },
            { href: '/symptoms/gut-issues', title: 'お腹の不調・便秘', why: '症状から逆引きする。何を疑い、どの血液項目を見るか。' },
            { href: '/foods/natto', title: '納豆', why: '腸活の理想形をひとつ。食べ物で章を締める。' },
        ],
    },
    {
        slug: 'hormones-at-40', n: 6, title: '40 代のホルモン 8 枚', en: 'HORMONES AT 40', color: '#F3E0EC', accent: '#C96BA3',
        lead: '疲れ・冷え・気分の揺れ・眠りの浅さ。40 代の変化の多くは、ホルモンの量と効きが変わることで説明がつく。司令塔から順に、揺らぎを読む。',
        steps: [
            { href: '/hormones', title: 'ホルモンの種類', why: '全体の地図。どのホルモンが何を動かしているかを眺める。' },
            { href: '/hormones/cortisol', title: 'コルチゾール', why: 'ストレスに応じて血糖を上げる緊急ホルモン。出っぱなしが 40 代の疲れを作る。' },
            { href: '/organs/adrenal', title: '副腎', why: 'コルチゾールと DHEA を作る小さな司令塔。ストレスの受け皿。' },
            { href: '/hormones/thyroid-hormone', title: '甲状腺ホルモン', why: '全身の代謝速度を決めるアクセル。冷え・むくみ・体重を同時に動かす。' },
            { href: '/organs/thyroid', title: '甲状腺', why: '臓器としての甲状腺。TSH・FT3・FT4 のペアで読む。' },
            { href: '/menopause', title: '更年期・更年期移行期', why: '女性の 40 代。エストロゲンの揺らぎが心身に及ぶ範囲。' },
            { href: '/male-menopause', title: '男性更年期', why: '男性にもある。テストステロンの低下と、活力・気分・筋肉。' },
            { href: '/hormones/melatonin', title: 'メラトニン', why: '眠りへ導くホルモン。光と時間で整える、最後の 1 枚。' },
        ],
    },
    {
        slug: 'mind-from-body', n: 7, title: '心とからだ 8 枚', en: 'MIND FROM THE BODY', color: '#E6E0F2', accent: '#8B78C9',
        lead: '気分の落ち込みや不安を「性格」で片づけない。神経伝達物質の材料、炎症、呼吸と自律神経。心を体の土台から読み直す章。',
        steps: [
            { href: '/mind-body', title: '心とからだ', why: '入口。気分・不安・ストレスを「体の土台」から読み解く見取り図。' },
            { href: '/mood-nutrition', title: '気分と栄養', why: 'セロトニンもドーパミンも、材料は食べ物。心の材料をそろえる。' },
            { href: '/anxiety', title: '不安と体', why: '理由のない不安や動悸の裏に、血糖・鉄・甲状腺があることも。' },
            { href: '/hormones/serotonin', title: 'セロトニン', why: '心の安定を支え、夜の眠りの材料になる。多くは腸で作られる。' },
            { href: '/neuroinflammation', title: '神経炎症', why: 'サイトカインが脳に及ぶとき。気分の不調を炎症から読む。' },
            { href: '/mindfulness', title: 'マインドフルネス・呼吸', why: '自律神経を整えるスイッチ。今日からできる打ち手。' },
            { href: '/spirituality', title: 'スピリチュアリティと体', why: '祈り・瞑想・つながり。心身相関を科学の側から。' },
            { href: '/thoughts/happiness', title: '幸せとは？', why: '幸せを体の側から問い直して、章を閉じる。' },
        ],
    },
    {
        slug: 'foundation-of-aging', n: 8, title: '老化の土台 8 枚', en: 'THE FOUNDATION OF AGING', color: '#F7E2DC', accent: '#E07A6A',
        lead: '老いは劣化ではなく変化。ただし「さびる・こげる・くすぶる」が重なると、変化は不調に傾く。土台を知り、筋肉とタンパク質で下支えする。',
        steps: [
            { href: '/thoughts/aging', title: '老いるとは？', why: '出発点。暦年齢と生物学的年齢は別、という立場を先に決める。' },
            { href: '/modern-diseases', title: '現代病とは', why: 'なぜ便利な暮らしが人を病気にするのか。老化を早める環境の話。' },
            { href: '/oxidative-stress', title: '活性酸素・酸化ストレス', why: '「さびる」。ミトコンドリアが出す副産物と、抗酸化のしくみ。' },
            { href: '/glycation', title: '糖化・AGEs', why: '「こげる」。血糖の波が、肌と血管を硬くする。' },
            { href: '/autophagy', title: 'オートファジー', why: '細胞の掃除と再利用。空腹の時間が回すしくみ。' },
            { href: '/sarcopenia', title: 'サルコペニア・フレイル', why: '40 代から始まる筋肉の減少。老化の進み方を大きく左右する。' },
            { href: '/nutrients/protein', title: 'タンパク質', why: '筋肉・酵素・ホルモンの材料。量と分け方。' },
            { href: '/hormones/growth-hormone', title: '成長ホルモン / IGF-1', why: '修復と再生。睡眠と運動で保つ、締めの 1 枚。' },
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
