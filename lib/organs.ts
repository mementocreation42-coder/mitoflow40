// 内臓（臓器）カタログ。血液検査・栄養素・しくみページへ相互リンクする。

export interface Organ {
    slug: string;
    name: string;      // 日本語名
    en: string;        // 英語名
    reading?: string;  // ふりがな
    category: string;  // 系統グループ
    color: string;     // カード背景色
    tagline: string;   // 一言
    role: string;      // 役割（改行込み）
    functions: string[];        // 主な働き
    agingNote: string;          // 40代での変化
    relatedBiomarkers: string[]; // biomarkers.ts の slug
    relatedNutrients: string[];  // nutrients.ts の slug
    relatedMechanisms: { href: string; label: string }[]; // しくみ/しくみ系ページ
}

export const ORGAN_CATEGORY_ORDER = [
    '代謝・解毒',
    '消化・吸収',
    '循環・神経',
    '内分泌',
];

export const organs: Organ[] = [
    // ── 代謝・解毒 ──
    {
        slug: 'liver',
        name: '肝臓',
        en: 'Liver',
        reading: 'かんぞう',
        category: '代謝・解毒',
        color: '#F3DEC9',
        tagline: '体内最大の化学工場。代謝・解毒・貯蔵を一手に。',
        role:
            '肝臓は、体の中でもっとも多くの仕事をこなす「化学工場」です。食べたものから吸収した栄養を、使いやすい形につくり変えて蓄え、必要なときに送り出します。\n\nもうひとつの大きな役割が解毒です。アルコールや薬、体内で生じた老廃物（アンモニアなど）を無害化し、排出できる形に変えます。さらに、脂肪の消化を助ける胆汁をつくり、血液中のタンパク質（アルブミンなど）を合成し、血糖が下がれば糖を新しく作り出す（糖新生）など、生命維持の中枢を担っています。\n\n「沈黙の臓器」と呼ばれ、かなり傷んでも症状が出にくいのが特徴。だからこそ、AST・ALT・γ-GTPといった血液検査で、こまめに負担を見ておくことが大切です。',
        functions: [
            '栄養の代謝・貯蔵（糖・脂質・タンパク質）',
            '解毒（アルコール・薬・老廃物の処理）',
            '胆汁をつくり脂肪の消化を助ける',
            'アルブミンなど血中タンパク質の合成',
            '血糖の調整（糖新生・グリコーゲン貯蔵）',
        ],
        agingNote:
            '40代では、食べすぎ・飲酒・運動不足から「脂肪肝」が増えます。自覚症状がないまま進むため、AST・ALT・γ-GTPの数値で早めに気づくことが、その後の代謝の安定を左右します。',
        relatedBiomarkers: ['ast', 'alt', 'ggt', 'alp', 'bilirubin', 'albumin'],
        relatedNutrients: ['glutathione', 'nac', 'choline', 'cysteine', 'magnesium'],
        relatedMechanisms: [
            { href: '/detox', label: '解毒（デトックス）' },
            { href: '/methylation', label: 'メチレーション' },
            { href: '/blood-sugar', label: '血糖コントロール' },
        ],
    },
    {
        slug: 'kidney',
        name: '腎臓',
        en: 'Kidney',
        reading: 'じんぞう',
        category: '代謝・解毒',
        color: '#D9E6F2',
        tagline: '血液をろ過する、精密なフィルター。',
        role:
            '腎臓は、握りこぶしほどの大きさで左右に1つずつある臓器です。1日に約150リットルもの血液をろ過し、老廃物や余分な水分・塩分を尿として体の外へ出します。\n\n役割はろ過だけではありません。体内の水分量や電解質（ナトリウム・カリウムなど）のバランス、血圧、血液のpHを細かく調整しています。さらに、赤血球をつくるよう骨髄に指令を出すホルモン（エリスロポエチン）を分泌し、ビタミンDを活性型に変えて骨やカルシウム代謝も支えています。\n\n腎臓もまた、機能が落ちても症状が出にくい臓器です。クレアチニンやeGFRといった数値で、ろ過する力（腎機能）を定期的に確認しておくことが重要です。',
        functions: [
            '血液のろ過と老廃物の排出',
            '水分・電解質・pHのバランス調整',
            '血圧の調整',
            '赤血球をつくる指令（エリスロポエチン）',
            'ビタミンDの活性化',
        ],
        agingNote:
            '腎機能（eGFR）は加齢とともに少しずつ低下します。高血圧・高血糖・高尿酸はその低下を加速させるため、40代からは血圧・血糖の管理が腎臓を守ることに直結します。',
        relatedBiomarkers: ['creatinine', 'egfr', 'bun', 'uric-acid'],
        relatedNutrients: ['magnesium', 'omega3', 'fiber'],
        relatedMechanisms: [
            { href: '/blood-sugar', label: '血糖コントロール' },
            { href: '/detox', label: '解毒（デトックス）' },
        ],
    },

    // ── 消化・吸収 ──
    {
        slug: 'gut',
        name: '腸',
        en: 'Gut',
        reading: 'ちょう',
        category: '消化・吸収',
        color: '#DCF1EA',
        tagline: '消化・免疫・脳との対話が集まる「第二の脳」。',
        role:
            '腸は、食べたものを消化して栄養を吸収する、長さ約7〜9メートルの臓器です。しかしその役割は消化吸収だけにとどまりません。\n\n腸には数百兆個ともいわれる腸内細菌が住み、私たちの消化・代謝・免疫を大きく左右します。体の免疫細胞の約7割が腸に集まり、外敵から体を守る最前線にもなっています。さらに、幸せホルモンと呼ばれるセロトニンの多くが腸でつくられ、迷走神経を通じて脳と双方向に対話しています（脳腸相関）。\n\n「お腹の調子が悪いと気分も落ちる」のは、気のせいではなく、腸と脳がつながっている証拠。腸を整えることは、消化だけでなく、免疫・気分・睡眠の土台を整えることでもあります。',
        functions: [
            '栄養の消化・吸収',
            '腸内細菌叢（腸内フローラ）の住処',
            '免疫細胞の約7割が集まる免疫の最前線',
            'セロトニンなど神経伝達物質の産生',
            '脳との双方向の対話（脳腸相関）',
        ],
        agingNote:
            '加齢やストレス、食生活の乱れで腸内環境が崩れると、便通の変化・免疫低下・気分の不調につながります。40代からは、食物繊維と発酵食品で腸内細菌を育てる意識が効いてきます。',
        relatedBiomarkers: ['hscrp', 'albumin', 'total-protein'],
        relatedNutrients: ['fiber', 'glutathione', 'glycine', 'zinc'],
        relatedMechanisms: [
            { href: '/gut-brain', label: '脳腸相関' },
            { href: '/autophagy', label: 'オートファジー' },
        ],
    },
    {
        slug: 'pancreas',
        name: '膵臓',
        en: 'Pancreas',
        reading: 'すいぞう',
        category: '消化・吸収',
        color: '#FCE3D4',
        tagline: '消化酵素と血糖ホルモンの二刀流。',
        role:
            '膵臓は、胃の裏側にある細長い臓器で、2つのまったく異なる仕事を兼ねています。\n\nひとつは「外分泌」。脂質・タンパク質・糖質を分解する消化酵素をつくり、十二指腸へ送り出して消化を助けます。もうひとつが「内分泌」で、血糖を調整するホルモンを分泌します。血糖を下げる唯一のホルモン・インスリンと、血糖を上げるグルカゴン。この2つをきめ細かく出し入れすることで、血糖値を一定の範囲に保っています。\n\nとくにインスリンは、現代の食生活で酷使されやすいホルモン。糖質の多い食事を続けると膵臓は休みなくインスリンを出し続け、やがて効きが悪くなる（インスリン抵抗性）と、血糖が下がりにくくなっていきます。',
        functions: [
            '消化酵素の分泌（外分泌）',
            'インスリンの分泌（血糖を下げる）',
            'グルカゴンの分泌（血糖を上げる）',
            '血糖の精密なコントロール',
        ],
        agingNote:
            '糖質過多の食生活はインスリンを出し続ける膵臓を疲弊させます。40代でインスリン抵抗性が進むと、空腹時血糖やHbA1cが上がりやすくなるため、血糖を揺らさない食べ方が膵臓を守ります。',
        relatedBiomarkers: ['fasting-glucose', 'hba1c', 'fasting-insulin', 'homa-ir'],
        relatedNutrients: ['magnesium', 'fiber', 'alpha-lipoic-acid', 'omega3'],
        relatedMechanisms: [
            { href: '/blood-sugar', label: '血糖コントロール' },
            { href: '/glycolysis', label: '解糖系' },
        ],
    },

    // ── 循環・神経 ──
    {
        slug: 'heart',
        name: '心臓',
        en: 'Heart',
        reading: 'しんぞう',
        category: '循環・神経',
        color: '#F6DAD4',
        tagline: '一生休まず動く、全身の循環ポンプ。',
        role:
            '心臓は、握りこぶしほどの筋肉のかたまりで、全身に血液を送り出すポンプです。1日に約10万回拍動し、酸素と栄養を体のすみずみへ届け、二酸化炭素や老廃物を回収します。\n\nそのリズムは、心臓自身が生み出す電気信号によって保たれています。同時に、自律神経（交感神経・副交感神経）の影響を受けて速くなったり遅くなったりと、状況に応じて細かく調整されます。この拍動の「ゆらぎ」を見るのが心拍変動（HRV）で、自律神経のバランスを映す鏡になります。\n\n心臓を支えるのは、心臓そのものだけでなく、血液の通り道である血管の健康。血管が硬くなったり詰まったりすると、ポンプに大きな負担がかかります。',
        functions: [
            '血液を全身に送り出す（ポンプ機能）',
            '酸素・栄養の供給と老廃物の回収',
            '電気信号による拍動リズムの維持',
            '自律神経と連動した拍動の調整（HRV）',
        ],
        agingNote:
            '40代以降は、LDLコレステロールや中性脂肪、慢性炎症が血管に負担をかけ始めます。心臓の筋肉はエネルギーを大量に使うため、ミトコンドリアの元気さも心機能を左右します。',
        relatedBiomarkers: ['ldl', 'hdl', 'triglycerides', 'hscrp', 'fibrinogen', 'homocysteine'],
        relatedNutrients: ['omega3', 'coq10', 'magnesium'],
        relatedMechanisms: [
            { href: '/autonomic-nervous-system', label: '自律神経とHRV' },
            { href: '/atp', label: 'ATP（エネルギー通貨）' },
            { href: '/inflammation', label: '慢性炎症' },
        ],
    },
    {
        slug: 'brain',
        name: '脳',
        en: 'Brain',
        reading: 'のう',
        category: '循環・神経',
        color: '#E5D7DF',
        tagline: '思考・感情・記憶をつかさどる司令塔。',
        role:
            '脳は、思考・記憶・感情・運動など、あらゆる活動をつかさどる司令塔です。体重の約2%ほどの重さしかないのに、体全体のエネルギーの約20%を消費する、きわめて燃費の悪い（＝活発な）臓器でもあります。\n\nその働きは、神経細胞どうしが神経伝達物質をやりとりすることで成り立っています。やる気のドーパミン、安心のセロトニン、リラックスのGABAなど、これらの材料はアミノ酸やビタミンB群といった栄養素から作られます。つまり、何を食べるかが、思考や気分に直結します。\n\nまた脳は、腸と密接につながり（脳腸相関）、睡眠・血糖・慢性炎症の影響を強く受けます。脳を守ることは、食事・腸・睡眠を整えることと地続きです。',
        functions: [
            '思考・記憶・感情・判断',
            '全身への指令（運動・自律機能）',
            '神経伝達物質の産生とやりとり',
            '睡眠・覚醒リズムの制御',
        ],
        agingNote:
            '40代では、集中力や記憶の変化を感じ始める人も。脳は血糖の乱高下・慢性炎症・睡眠不足に弱く、オメガ3やビタミンB群の不足も影響します。腸内環境を含めた総合的なケアが効きます。',
        relatedBiomarkers: ['homocysteine', 'hba1c', 'vitamin-b12-serum', 'hscrp'],
        relatedNutrients: ['omega3', 'b12', 'folate', 'choline', 'tyrosine', 'tryptophan'],
        relatedMechanisms: [
            { href: '/gut-brain', label: '脳腸相関' },
            { href: '/methylation', label: 'メチレーション' },
            { href: '/circadian-rhythm', label: 'サーカディアンリズム' },
        ],
    },

    // ── 内分泌 ──
    {
        slug: 'thyroid',
        name: '甲状腺',
        en: 'Thyroid',
        reading: 'こうじょうせん',
        category: '内分泌',
        color: '#DEEDF7',
        tagline: '全身の代謝速度を決めるアクセル。',
        role:
            '甲状腺は、のどぼとけの下にある蝶のような形の小さな臓器です。ここから分泌される甲状腺ホルモン（T3・T4）は、全身の細胞に「どれくらいの速さで代謝するか」を指示する、いわば体のアクセルです。\n\n甲状腺ホルモンが十分にあると、代謝が活発になり、体温が保たれ、エネルギーがしっかり作られます。逆に不足すると、代謝のスピードが落ち、冷え・むくみ・疲れ・体重増加・気分の落ち込みなどが現れます。多すぎても動悸や発汗、体重減少などが起こり、過不足のどちらも不調につながります。\n\n甲状腺ホルモンをつくるには、ヨウ素やセレン、亜鉛、鉄、チロシンといった材料が欠かせません。TSH・FT3・FT4の数値で、その働きを評価します。',
        functions: [
            '全身の代謝速度の調整',
            '体温の維持',
            'エネルギー産生の調整',
            '心拍・成長・発達への関与',
        ],
        agingNote:
            '甲状腺機能の低下（橋本病など）は中年期の女性に増えます。「疲れ・冷え・むくみ・体重増加」が続くときは、TSH・FT3・FT4のチェックが役立ちます。材料となるセレン・亜鉛・鉄の充足も大切です。',
        relatedBiomarkers: ['tsh', 'ft3', 'ft4'],
        relatedNutrients: ['selenium', 'zinc', 'iron', 'tyrosine'],
        relatedMechanisms: [
            { href: '/mitochondria', label: 'ミトコンドリア' },
        ],
    },
    {
        slug: 'adrenal',
        name: '副腎',
        en: 'Adrenal Gland',
        reading: 'ふくじん',
        category: '内分泌',
        color: '#FFF1DF',
        tagline: 'ストレスに立ち向かう、小さな司令塔。',
        role:
            '副腎は、左右の腎臓の上にちょこんと乗った、小さな三角形の臓器です。小さいながら、生命維持とストレス対応に欠かせないホルモンを数多くつくっています。\n\n代表格がコルチゾール。ストレスに対応し、血糖や血圧を上げ、炎症を抑える働きを持ち、本来は朝に高く夜に低いというリズムを刻みます。瞬間的な危機にはアドレナリンが心拍や血圧を一気に高めて「戦うか逃げるか」の態勢をつくります。また、性ホルモンの材料となるDHEAも分泌しています。\n\n慢性的なストレスが続くと、このコルチゾールのリズムが乱れ、「朝起きられないのに夜は冴える」「常に疲れている」といった状態につながります。副腎を労わることは、ストレスと上手につき合うことそのものです。',
        functions: [
            'コルチゾールの分泌（ストレス対応）',
            'アドレナリンによる瞬発的な反応',
            '血糖・血圧の調整',
            'DHEA（性ホルモンの前駆体）の分泌',
            '炎症の抑制',
        ],
        agingNote:
            '40代は仕事・家庭のストレスが重なりやすい時期。慢性ストレスでコルチゾールのリズムが乱れると、睡眠や気分、血糖にも影響します。DHEAは加齢で低下していくため、休養と自律神経のケアが鍵になります。',
        relatedBiomarkers: ['cortisol', 'dhea-s'],
        relatedNutrients: ['vitamin-c', 'magnesium', 'b6'],
        relatedMechanisms: [
            { href: '/autonomic-nervous-system', label: '自律神経とHRV' },
            { href: '/circadian-rhythm', label: 'サーカディアンリズム' },
        ],
    },
];

export function getOrganBySlug(slug: string): Organ | undefined {
    return organs.find((o) => o.slug === slug);
}

export function getOrgansByCategory(): { category: string; items: Organ[] }[] {
    return ORGAN_CATEGORY_ORDER.map((category) => ({
        category,
        items: organs.filter((o) => o.category === category),
    })).filter((g) => g.items.length > 0);
}
