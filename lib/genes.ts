export type Gene = {
    slug: string;
    symbol: string;
    name: string;
    category: string;
    tagline: string;
    role: string;
    dirtyEffects: string[];
    cleanStrategies: {
        title: string;
        description: string;
    }[];
    nutrients: string[];
    relatedSymptoms: string[];
    references?: string[];
};

export const genes: Gene[] = [
    {
        slug: 'mthfr',
        symbol: 'MTHFR',
        name: 'メチレンテトラヒドロ葉酸還元酵素',
        category: 'メチレーション',
        tagline: '葉酸を活性型に変え、メチレーションの起点になる',
        role: '食事から摂った葉酸を活性型(5-MTHF)に変換する酵素。メチレーションは解毒、神経伝達物質の合成、DNAの修復、ホモシステイン代謝などに必須。',
        dirtyEffects: [
            'ホモシステインが上昇しやすく心血管リスクが上がる',
            '気分の落ち込み・不安が出やすい',
            '解毒能力が下がりやすい',
            '妊娠期は神経管欠損リスクに関与',
        ],
        cleanStrategies: [
            { title: '葉酸は天然食品から', description: '濃い緑の葉物、レバー、豆類。合成葉酸(folic acid)は避け、活性型(5-MTHF)のサプリで補う' },
            { title: 'B12・B6を一緒に', description: 'メチレーション回路はB12・B6・コリンと連携する。単独補給は避ける' },
            { title: 'アルコールを控える', description: '葉酸代謝を妨げる' },
        ],
        nutrients: ['葉酸 (5-MTHF)', 'ビタミンB12 (メチルコバラミン)', 'ビタミンB6', 'コリン', 'リボフラビン'],
        relatedSymptoms: ['疲労', '気分の落ち込み', '高ホモシステイン', '頭痛'],
    },
    {
        slug: 'comt',
        symbol: 'COMT',
        name: 'カテコール-O-メチル基転移酵素',
        category: '神経・ストレス',
        tagline: 'ドーパミン・エストロゲンを分解する「ブレーキ」',
        role: 'ドーパミン、ノルアドレナリン、アドレナリン、エストロゲンを分解する酵素。活性が低い(slow)タイプは集中力が高い反面、ストレスで疲れやすく、活性が高い(fast)タイプは切り替えは早いが意欲が出にくい。',
        dirtyEffects: [
            '不安・イライラ・寝つきの悪さ(slow)',
            'モチベーション低下・退屈に弱い(fast)',
            'カフェインへの過敏反応',
            '更年期症状が強く出やすい',
        ],
        cleanStrategies: [
            { title: 'マグネシウムを十分に', description: 'COMTの補因子。緑の葉物、ナッツ、海藻から' },
            { title: 'カフェインを見直す', description: 'slow型はコーヒーで不安が増す。緑茶やデカフェに切り替え' },
            { title: 'メチル供与体に注意', description: 'メチル基(SAMe等)の取りすぎはslow型で症状を悪化させる' },
        ],
        nutrients: ['マグネシウム', 'SAMe', 'ビタミンB群'],
        relatedSymptoms: ['不安', '不眠', 'イライラ', 'PMS', '更年期障害'],
    },
    {
        slug: 'dao',
        symbol: 'DAO',
        name: 'ジアミンオキシダーゼ',
        category: '消化・アレルギー',
        tagline: '腸でヒスタミンを分解する第一の関門',
        role: '腸管から入ってくるヒスタミンを分解する酵素。発酵食品・熟成食品・赤ワイン・古い食材にはヒスタミンが多く、DAOが弱いと過剰反応を起こす。',
        dirtyEffects: [
            '食後の頭痛・鼻づまり・じんましん',
            '原因不明の腹部膨満・下痢',
            '赤ワイン・チーズ・発酵食品で不調',
            '花粉症・蕁麻疹が悪化',
        ],
        cleanStrategies: [
            { title: '高ヒスタミン食を一時的に減らす', description: '発酵食品・熟成チーズ・燻製・赤ワイン・残り物を避ける期間を作る' },
            { title: '新鮮な食材を選ぶ', description: '魚は当日、肉は冷凍保存。作り置きを長く置かない' },
            { title: '腸内環境を整える', description: 'リーキーガットがあるとDAO活性が落ちる。グルテン・砂糖の見直し' },
        ],
        nutrients: ['ビタミンC', 'ビタミンB6', '銅', 'ケルセチン'],
        relatedSymptoms: ['頭痛', '蕁麻疹', '腹部膨満', '鼻炎', '皮膚のかゆみ'],
    },
    {
        slug: 'maoa',
        symbol: 'MAOA',
        name: 'モノアミン酸化酵素A',
        category: '神経・ストレス',
        tagline: 'セロトニン・ドーパミンの分解スピードを決める',
        role: 'セロトニン、ノルアドレナリン、ドーパミンを分解する酵素。活性が高いと神経伝達物質の枯渇で気分が落ちやすく、低いと過剰で攻撃性・不眠が出やすい。',
        dirtyEffects: [
            '気分の波が大きい',
            '砂糖・炭水化物への強い渇望',
            '不眠または過眠',
            'PMSや月経前の気分悪化',
        ],
        cleanStrategies: [
            { title: '血糖を安定させる', description: 'MAOAの動きは血糖と連動。タンパク質+脂質+繊維で安定させる' },
            { title: 'トリプトファンを補う', description: '七面鳥、卵、カボチャの種など。セロトニン合成の材料' },
            { title: 'リボフラビン(B2)', description: 'MAOAの補因子。レバー、卵、アーモンド' },
        ],
        nutrients: ['リボフラビン (B2)', 'トリプトファン', '鉄', 'ビタミンB6'],
        relatedSymptoms: ['気分変動', '不眠', '砂糖渇望', '不安', '攻撃性'],
    },
    {
        slug: 'gst-gpx',
        symbol: 'GST / GPX',
        name: 'グルタチオン-S-転移酵素 / グルタチオンペルオキシダーゼ',
        category: '解毒・抗酸化',
        tagline: '体内最強の抗酸化システム「グルタチオン」を回す',
        role: 'グルタチオンを使って毒素・重金属・酸化ストレスを処理する酵素群。ミトコンドリアの保護にも直結。GSTM1/GSTT1の遺伝子欠損は日本人で頻度が高い。',
        dirtyEffects: [
            '化学物質・香料・排ガスに敏感',
            '二日酔いがひどい',
            '慢性炎症・疲労',
            '加齢に伴う症状が早く出やすい',
        ],
        cleanStrategies: [
            { title: 'アブラナ科野菜を毎日', description: 'ブロッコリー、芽キャベツ、ケール。スルフォラファンがGSTを誘導' },
            { title: '硫黄食材', description: 'ニンニク、玉ねぎ、卵。グルタチオンの材料' },
            { title: '環境毒素を減らす', description: 'プラスチック、香料、農薬を避ける。負荷を下げる' },
        ],
        nutrients: ['NAC (Nアセチルシステイン)', 'グルタチオン', 'セレン', 'スルフォラファン', 'ビタミンC'],
        relatedSymptoms: ['化学物質過敏', '慢性疲労', '二日酔い', '炎症'],
    },
    {
        slug: 'nos3',
        symbol: 'NOS3',
        name: '内皮型一酸化窒素合成酵素',
        category: '循環器・血管',
        tagline: '一酸化窒素(NO)で血管をしなやかにする',
        role: '血管内皮で一酸化窒素を作り、血管を拡張させる酵素。NOが不足すると血圧上昇、勃起機能低下、運動パフォーマンス低下、認知機能低下に繋がる。葉酸サイクル(MTHFR)と密接に連動。',
        dirtyEffects: [
            '高血圧・冷え性',
            '運動時の息切れ・回復の遅さ',
            '勃起機能の低下',
            '頭がぼーっとする',
        ],
        cleanStrategies: [
            { title: '硝酸塩を含む食材', description: 'ビーツ、ほうれん草、ルッコラ。NOの前駆体' },
            { title: 'BH4を支える栄養', description: '葉酸、B12、マグネシウム。MTHFRと連動' },
            { title: '適度な運動', description: '内皮機能を直接改善する。HIITやウォーキング' },
        ],
        nutrients: ['L-アルギニン', 'L-シトルリン', '硝酸塩 (ビーツ等)', '葉酸', 'CoQ10'],
        relatedSymptoms: ['高血圧', '冷え', '勃起不全', '運動耐容能低下'],
    },
    {
        slug: 'pemt',
        symbol: 'PEMT',
        name: 'ホスファチジルエタノールアミンN-メチル基転移酵素',
        category: '肝臓・細胞膜',
        tagline: '細胞膜と肝臓を支えるホスファチジルコリンを作る',
        role: '肝臓でホスファチジルコリン(PC)を内製する酵素。PCは細胞膜、胆汁、VLDLの構成要素。Dirtyだと脂肪肝、胆汁うっ滞、細胞膜の不調が出やすい。エストロゲンが酵素を活性化するため、女性は閉経後・男性は元々リスクが高い。',
        dirtyEffects: [
            '脂肪肝・肝機能異常',
            '胆嚢の不調・脂質消化不良',
            '筋肉痛・回復の遅さ',
            '記憶力の低下',
        ],
        cleanStrategies: [
            { title: 'コリン豊富な食材', description: '卵黄、レバー、大豆。1日6g程度を目安に' },
            { title: 'メチレーションを支える', description: 'PEMTはメチル基を大量に消費する。葉酸・B12・ベタイン' },
            { title: 'アルコールと果糖を控える', description: '脂肪肝を悪化させ、PEMT負荷を上げる' },
        ],
        nutrients: ['コリン', 'ホスファチジルコリン', 'ベタイン (TMG)', '葉酸', 'B12'],
        relatedSymptoms: ['脂肪肝', '筋肉痛', '記憶力低下', '胆嚢の不調'],
    },
];

export function getGeneBySlug(slug: string): Gene | undefined {
    return genes.find((g) => g.slug === slug);
}
