// ホルモンカタログ。血液検査・栄養素・しくみページへ相互リンクする。

export interface Hormone {
    slug: string;
    name: string;
    en: string;
    category: string;
    color: string;
    tagline: string;
    role: string;
    functions: string[];
    agingNote: string;
    relatedBiomarkers: string[];
    relatedNutrients: string[];
    relatedMechanisms: { href: string; label: string }[];
}

export const HORMONE_CATEGORY_ORDER = [
    '性ホルモン',
    'ストレス・副腎',
    '代謝・成長',
    '甲状腺',
    '睡眠・気分',
];

export const hormones: Hormone[] = [
    // ── 性ホルモン ──
    {
        slug: 'testosterone',
        name: 'テストステロン',
        en: 'Testosterone',
        category: '性ホルモン',
        color: '#FCE3D4',
        tagline: '筋肉・意欲・性欲を支える、活力のホルモン。',
        role:
            'テストステロンは「男性ホルモン」として知られますが、男女ともに分泌され、活力の土台を支える重要なホルモンです。筋肉量や骨密度の維持、意欲・気力、性欲、赤血球の産生などに関わります。\n\n血液中の多くはタンパク質（SHBG・アルブミン）と結合しており、実際に細胞で使えるのは結合していない「遊離テストステロン」。総量だけでなく、この有効分のバランスも効きを左右します。\n\n40代以降は加齢とともに少しずつ低下し、「疲れやすい・やる気が出ない・筋肉が落ちる・気分が沈む」といった変化につながることがあります。睡眠・筋トレ・亜鉛やビタミンDが、分泌を支える土台になります。',
        functions: [
            '筋肉量・骨密度の維持',
            '意欲・気力・性欲の維持',
            '赤血球の産生サポート',
            '脂肪のつき方・代謝への関与',
        ],
        agingNote:
            '40代以降、テストステロンは緩やかに低下します。意欲低下・筋力低下・体型の変化が続くときは、総・遊離テストステロンのチェックが役立ちます。睡眠・筋トレ・亜鉛・ビタミンDが分泌を支えます。',
        relatedBiomarkers: ['total-testosterone', 'free-testosterone'],
        relatedNutrients: ['zinc', 'vitamin-d', 'magnesium'],
        relatedMechanisms: [
            { href: '/exercise', label: '運動' },
            { href: '/sleep', label: '睡眠' },
        ],
    },
    {
        slug: 'estrogen',
        name: 'エストロゲン',
        en: 'Estrogen',
        category: '性ホルモン',
        color: '#F8DCE4',
        tagline: '骨・血管・脳・気分を守る女性ホルモン。',
        role:
            'エストロゲンは代表的な女性ホルモンで、もっとも強力なものがエストラジオール（E2）です。生殖機能だけでなく、骨を丈夫に保ち、血管をしなやかにし、脳や気分、肌の状態まで幅広く守っています。男性でも少量つくられ、骨や脳の健康に関わります。\n\n女性では40代後半から閉経にかけてエストロゲンが大きく減少し、ホットフラッシュ・骨密度の低下・気分の波・睡眠の乱れなど、いわゆる更年期の変化が現れます。\n\nこの時期の変化は自然なものですが、骨・血管・脳を守る生活習慣（運動・タンパク質・ビタミンD）と、必要に応じた医療のサポートが、その後の健康を大きく左右します。',
        functions: [
            '骨密度の維持',
            '血管をしなやかに保つ',
            '脳・気分・自律神経への関与',
            '肌・粘膜のうるおい',
        ],
        agingNote:
            '女性は40代後半〜閉経でエストロゲンが急減し、更年期の不調や骨・血管リスクの上昇につながります。運動・タンパク質・ビタミンDで土台を支え、つらい症状は医療機関に相談を。',
        relatedBiomarkers: ['estradiol'],
        relatedNutrients: ['vitamin-d', 'omega3', 'magnesium'],
        relatedMechanisms: [
            { href: '/exercise', label: '運動' },
            { href: '/inflammation', label: '慢性炎症' },
        ],
    },
    {
        slug: 'dhea',
        name: 'DHEA',
        en: 'DHEA',
        category: '性ホルモン',
        color: '#F3D9CE',
        tagline: '性ホルモンの材料になる、若さの前駆体。',
        role:
            'DHEAは、副腎でつくられるホルモンで、テストステロンやエストロゲンといった性ホルモンの「材料（前駆体）」になります。血液検査では安定した形のDHEA-Sとして測定されます。\n\n活力・免疫・気分・代謝など幅広く関わり、「若さのホルモン」とも呼ばれます。20代をピークに加齢とともに減少し、40代ではピーク時の半分以下になることも珍しくありません。\n\n慢性的なストレスが続くと、副腎はストレス対応のコルチゾールづくりを優先し、DHEAが後回しになりやすいとも言われます。睡眠・ストレスケア・副腎を労わる生活が、DHEAの土台を支えます。',
        functions: [
            '性ホルモン（テストステロン・エストロゲン）の材料',
            '活力・気分の維持',
            '免疫・代謝への関与',
        ],
        agingNote:
            'DHEAは加齢で大きく低下します。慢性ストレスはその低下に拍車をかけることも。DHEA-Sの数値は、副腎の余力やストレス状態を映す手がかりになります。',
        relatedBiomarkers: ['dhea-s', 'cortisol'],
        relatedNutrients: ['vitamin-c', 'magnesium'],
        relatedMechanisms: [
            { href: '/autonomic-nervous-system', label: '自律神経とHRV' },
            { href: '/organs/adrenal', label: '副腎' },
        ],
    },

    // ── ストレス・副腎 ──
    {
        slug: 'cortisol',
        name: 'コルチゾール',
        en: 'Cortisol',
        category: 'ストレス・副腎',
        color: '#F6DCD0',
        tagline: 'ストレスに立ち向かう、覚醒と血糖のホルモン。',
        role:
            'コルチゾールは、副腎から分泌される「ストレスホルモン」です。ストレスに対応して血糖や血圧を上げ、体を活動モードに切り替えます。炎症を抑える働きもあり、生命維持に欠かせません。\n\n本来は、朝にもっとも高く、夜に向かって下がっていく明確な日内リズムを持っています。このリズムが「朝シャキッと起きて、夜はリラックスして眠る」を支えています。\n\nところが慢性的なストレスが続くと、このリズムが乱れ、「朝だるいのに夜は冴える」「常に気が張って疲れが抜けない」といった状態に。睡眠・光のリズム・自律神経のケアが、コルチゾールを整える鍵になります。',
        functions: [
            'ストレスへの対応（血糖・血圧を上げる）',
            '炎症の抑制',
            '覚醒と日内リズムの維持',
            'エネルギー動員',
        ],
        agingNote:
            '慢性ストレスでコルチゾールの日内リズムが乱れると、睡眠・気分・血糖・お腹まわりの脂肪に影響します。朝の光・規則的な睡眠・自律神経のケアでリズムを取り戻すことが大切です。',
        relatedBiomarkers: ['cortisol', 'dhea-s', 'fasting-glucose'],
        relatedNutrients: ['vitamin-c', 'magnesium', 'b6'],
        relatedMechanisms: [
            { href: '/autonomic-nervous-system', label: '自律神経とHRV' },
            { href: '/circadian-rhythm', label: 'サーカディアンリズム' },
            { href: '/organs/adrenal', label: '副腎' },
        ],
    },

    // ── 代謝・成長 ──
    {
        slug: 'growth-hormone',
        name: '成長ホルモン / IGF-1',
        en: 'Growth Hormone / IGF-1',
        category: '代謝・成長',
        color: '#FBF0CE',
        tagline: '修復と再生をうながす、大人にも必要なホルモン。',
        role:
            '成長ホルモン（GH）は、子どもの成長だけでなく、大人になっても組織の修復・再生、筋肉や骨の維持、脂肪の分解に関わる重要なホルモンです。その働きの多くは、肝臓でつくられるIGF-1を介して全身に届けられます。\n\n成長ホルモンは、深い睡眠中と、強度のある運動後に多く分泌されます。つまり「しっかり眠り、しっかり動く」ことが、分泌を引き出す最大のスイッチです。\n\n加齢とともに分泌は低下し、回復力の低下や筋肉の減少、体脂肪の増加につながります。睡眠の質・筋力トレーニング・適切なタンパク質が、成長ホルモンを味方につける鍵です。',
        functions: [
            '組織の修復・再生',
            '筋肉・骨の維持',
            '脂肪の分解',
            'IGF-1を介した全身への作用',
        ],
        agingNote:
            '成長ホルモンは加齢で低下し、回復の遅れ・筋肉減少・体脂肪増加につながります。深い睡眠と強度のある運動が最大の分泌スイッチ。IGF-1は栄養状態の指標にもなります。',
        relatedBiomarkers: ['igf1'],
        relatedNutrients: ['protein', 'leucine', 'magnesium'],
        relatedMechanisms: [
            { href: '/sleep', label: '睡眠' },
            { href: '/exercise', label: '運動' },
        ],
    },
    {
        slug: 'insulin',
        name: 'インスリン',
        en: 'Insulin',
        category: '代謝・成長',
        color: '#FFE9D2',
        tagline: '血糖を下げる唯一のホルモン。代謝の司令塔。',
        role:
            'インスリンは膵臓から分泌される、血糖を下げる唯一のホルモンです。食事で上がった血糖を、細胞にエネルギーとして取り込ませたり、脂肪やグリコーゲンとして蓄えたりします。\n\n問題になるのは「効きの悪さ」。糖質の多い食事や運動不足が続くと、インスリンを出しても細胞が反応しにくくなり（インスリン抵抗性）、膵臓はさらに多くのインスリンを出すようになります。この状態は、内臓脂肪・高血糖・脂肪肝・慢性炎症の温床になります。\n\nインスリンを穏やかに保つ食べ方（血糖を急上昇させない）と運動が、40代の代謝を守るうえで最も効果的な打ち手のひとつです。',
        functions: [
            '血糖を下げる（細胞へ糖を取り込む）',
            'エネルギーの貯蔵（脂肪・グリコーゲン）',
            '同化（蓄える）方向の代謝の司令',
        ],
        agingNote:
            'インスリン抵抗性が進むと、空腹時インスリンやHOMA-IRが上昇し、血糖が下がりにくくなります。血糖を揺らさない食べ方と運動で、インスリンの効きを取り戻すことが鍵です。',
        relatedBiomarkers: ['fasting-insulin', 'homa-ir', 'fasting-glucose', 'hba1c'],
        relatedNutrients: ['magnesium', 'fiber', 'alpha-lipoic-acid'],
        relatedMechanisms: [
            { href: '/blood-sugar', label: '血糖コントロール' },
            { href: '/organs/pancreas', label: '膵臓' },
        ],
    },

    // ── 甲状腺 ──
    {
        slug: 'thyroid-hormone',
        name: '甲状腺ホルモン',
        en: 'Thyroid Hormone',
        category: '甲状腺',
        color: '#DCF1EA',
        tagline: '全身の代謝速度を決める、体のアクセル。',
        role:
            '甲状腺ホルモン（T3・T4）は、全身の細胞に「どれくらいの速さで代謝するか」を指示する、体のアクセル役のホルモンです。脳の下垂体から出るTSH（甲状腺刺激ホルモン）が、その分泌量を調整しています。\n\n血液検査では、司令役のTSHと、実際に働く活性型のFT3・FT4を組み合わせて評価します。TSHが高めなら、甲状腺の働きが落ちている（指令を強めている）サインのことがあります。\n\n甲状腺の働きが低下すると、代謝が落ちて冷え・むくみ・疲れ・体重増加・気分の落ち込みなどが現れます。ホルモンの材料となるヨウ素・セレン・亜鉛・鉄・チロシンの充足も、甲状腺を支える土台です。',
        functions: [
            '全身の代謝速度の調整',
            '体温の維持',
            'エネルギー産生の調整',
            '心拍・成長への関与',
        ],
        agingNote:
            '甲状腺機能の低下は中年期に増え、とくに女性に多くみられます。「疲れ・冷え・むくみ・体重増加」が続くときはTSH・FT3・FT4のチェックを。材料となるセレン・亜鉛・鉄の充足も大切です。',
        relatedBiomarkers: ['tsh', 'ft3', 'ft4'],
        relatedNutrients: ['selenium', 'zinc', 'iron', 'tyrosine'],
        relatedMechanisms: [
            { href: '/organs/thyroid', label: '甲状腺' },
            { href: '/mitochondria', label: 'ミトコンドリア' },
        ],
    },

    // ── 睡眠・気分 ──
    {
        slug: 'melatonin',
        name: 'メラトニン',
        en: 'Melatonin',
        category: '睡眠・気分',
        color: '#E6E0F2',
        tagline: '眠りへ導き、体内時計を整えるホルモン。',
        role:
            'メラトニンは、脳の松果体から夜に分泌される「睡眠ホルモン」です。暗くなると分泌が高まって眠気を誘い、明るくなると止まります。これにより、体内時計（サーカディアンリズム）が地球の昼夜と同期します。\n\nメラトニンの材料をたどると、トリプトファン → セロトニン → メラトニンという流れになっており、日中に光を浴びてセロトニンをしっかりつくることが、夜のメラトニンにつながります。\n\n夜のスマホやLED照明のブルーライトは、メラトニンの分泌を強く抑えてしまいます。加齢でも分泌は減るため、朝の光・夜の暗さ・規則的な生活が、自然な眠りを取り戻す鍵になります。',
        functions: [
            '眠気をうながす',
            '体内時計（サーカディアンリズム）の調整',
            '抗酸化作用',
        ],
        agingNote:
            'メラトニンの分泌は加齢で減り、寝つきの悪化や中途覚醒につながります。朝の光でリズムをつくり、夜はブルーライトを避けることが、自然な分泌を取り戻す近道です。',
        relatedBiomarkers: [],
        relatedNutrients: ['tryptophan', 'magnesium', 'glycine'],
        relatedMechanisms: [
            { href: '/circadian-rhythm', label: 'サーカディアンリズム' },
            { href: '/sleep', label: '睡眠' },
        ],
    },
    {
        slug: 'serotonin',
        name: 'セロトニン',
        en: 'Serotonin',
        category: '睡眠・気分',
        color: '#E1ECDF',
        tagline: '心の安定を支え、夜の眠りの材料になる。',
        role:
            'セロトニンは、気分の安定や満足感に関わる神経伝達物質であり、ホルモン的にも働く物質です。「幸せホルモン」とも呼ばれ、不足すると気分の落ち込みや不安、過食につながることがあります。\n\n意外なことに、セロトニンの約9割は腸でつくられています。腸内環境が気分に影響する「脳腸相関」の中心にいる物質でもあります。材料は必須アミノ酸のトリプトファンで、ビタミンB6などの補酵素を使ってつくられます。\n\nさらに、日中につくられたセロトニンは、夜になると睡眠ホルモンのメラトニンへと変換されます。つまり「日中の心の安定」と「夜の良い眠り」は、セロトニンを通じてひとつながりなのです。',
        functions: [
            '気分・感情の安定',
            '食欲・満足感の調整',
            'メラトニン（睡眠ホルモン）の材料',
            '腸の動きへの関与',
        ],
        agingNote:
            'ストレスや腸内環境の乱れ、トリプトファン不足はセロトニンを低下させます。日光・運動・腸活・タンパク質が、気分と眠りの土台であるセロトニンを支えます。',
        relatedBiomarkers: [],
        relatedNutrients: ['tryptophan', 'b6', 'protein'],
        relatedMechanisms: [
            { href: '/gut-brain', label: '脳腸相関' },
            { href: '/organs/brain', label: '脳' },
        ],
    },
];

export function getHormoneBySlug(slug: string): Hormone | undefined {
    return hormones.find((h) => h.slug === slug);
}

export function getHormonesByCategory(): { category: string; items: Hormone[] }[] {
    return HORMONE_CATEGORY_ORDER.map((category) => ({
        category,
        items: hormones.filter((h) => h.category === category),
    })).filter((g) => g.items.length > 0);
}
