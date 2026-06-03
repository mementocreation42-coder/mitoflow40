// 症状から引くリバース索引。症状 → 背景・血液検査・栄養素・関連ページへ案内する。

export interface Symptom {
    slug: string;
    name: string;
    en: string;
    color: string;
    tagline: string;
    intro: string;            // なぜ起きるか
    causes: string[];         // 考えられる背景
    relatedBiomarkers: string[]; // 確認したい血液検査（slug）
    relatedNutrients: string[];  // 関わりやすい栄養素（slug）
    relatedLinks: { href: string; label: string }[]; // 臓器・しくみ・ホルモン・生活習慣など
    selfCare: string[];       // まず試したい生活の打ち手
}

export const symptoms: Symptom[] = [
    {
        slug: 'fatigue',
        name: '疲れやすい・だるい',
        en: 'Fatigue',
        color: '#FBE6D6',
        tagline: '休んでも抜けない疲れの、背景を切り分ける。',
        intro:
            '「疲れやすい・だるい」は、もっとも多い不調であると同時に、原因が多岐にわたるサインです。エネルギーを作るミトコンドリアの不調、鉄や栄養の不足、甲状腺やホルモンの低下、血糖の乱高下、睡眠の質の低下、慢性炎症——これらが単独または重なって起こります。「気合いの問題」ではなく、体のどこかで“エネルギーの作り方”がうまくいっていないサインとして切り分けていきましょう。',
        causes: [
            'ミトコンドリアの機能低下（エネルギー産生の不足）',
            '鉄・ビタミンB群・マグネシウムなどの不足',
            '甲状腺機能の低下、ホルモンの変化',
            '血糖の乱高下（食後の眠気・だるさ）',
            '睡眠の質の低下、慢性的なストレス・炎症',
        ],
        relatedBiomarkers: ['ferritin', 'tsh', 'ft3', 'hba1c', 'hscrp', 'vitamin-d-serum'],
        relatedNutrients: ['iron', 'b12', 'magnesium', 'coq10', 'thiamine'],
        relatedLinks: [
            { href: '/mitochondria', label: 'ミトコンドリア' },
            { href: '/hormones/thyroid-hormone', label: '甲状腺ホルモン' },
            { href: '/blood-sugar', label: '血糖コントロール' },
            { href: '/sleep', label: '睡眠' },
        ],
        selfCare: [
            'まず睡眠の量と質を見直す（同じ時刻に寝起き）',
            '朝にタンパク質を摂り、血糖の乱高下を防ぐ',
            '軽い有酸素運動でミトコンドリアを刺激する',
        ],
    },
    {
        slug: 'brain-fog',
        name: 'ブレインフォグ（頭がぼんやり）',
        en: 'Brain Fog',
        color: '#E7E0F2',
        tagline: '思考の霧。集中・記憶のかすみの背景を探る。',
        intro:
            'ブレインフォグは、「頭にもやがかかったよう」「集中できない・言葉が出にくい」と感じる状態です。脳は大量のエネルギーを使う臓器なので、エネルギー産生・血糖・血流・炎症・腸内環境・睡眠の影響を強く受けます。とくに血糖の乱高下、慢性炎症、ビタミンB群やオメガ3の不足、腸内環境の乱れ（脳腸相関）が背景にあることが多いサインです。',
        causes: [
            '血糖の乱高下、インスリン抵抗性',
            '慢性炎症（弱い炎症が脳に影響）',
            'ビタミンB群・オメガ3・鉄の不足',
            '腸内環境の乱れ（脳腸相関）',
            '睡眠不足・自律神経の乱れ',
        ],
        relatedBiomarkers: ['hba1c', 'hscrp', 'homocysteine', 'ferritin', 'vitamin-b12-serum'],
        relatedNutrients: ['omega3', 'b12', 'folate', 'choline', 'iron'],
        relatedLinks: [
            { href: '/organs/brain', label: '脳' },
            { href: '/gut-brain', label: '脳腸相関' },
            { href: '/inflammation', label: '慢性炎症' },
            { href: '/blood-sugar', label: '血糖コントロール' },
        ],
        selfCare: [
            '血糖を揺らさない食べ方（精製糖質を控える）',
            '青魚やオメガ3で脳に良質な脂を補う',
            '腸活（食物繊維・発酵食品）で脳腸を整える',
        ],
    },
    {
        slug: 'poor-sleep',
        name: '寝つきが悪い・眠りが浅い',
        en: 'Poor Sleep',
        color: '#DCE3F0',
        tagline: '眠れない・休まらない夜の、原因をたどる。',
        intro:
            '寝つきの悪さや浅い眠りは、体内時計（サーカディアンリズム）、自律神経、ホルモン（メラトニン・コルチゾール）、栄養の状態が複雑に絡みます。夜になっても交感神経が高ぶったまま、メラトニンが十分に出ない、コルチゾールのリズムが乱れている——こうした背景が、眠りの質を下げます。加齢でも深い睡眠は減りやすくなります。',
        causes: [
            'メラトニンの分泌低下（夜の光・加齢）',
            'コルチゾールの日内リズムの乱れ',
            '自律神経の乱れ（交感神経が高いまま）',
            'マグネシウム・グリシン・トリプトファンの不足',
            'カフェイン・アルコール・就寝前のスマホ',
        ],
        relatedBiomarkers: ['cortisol', 'ferritin', 'rbc-magnesium'],
        relatedNutrients: ['magnesium', 'glycine', 'tryptophan'],
        relatedLinks: [
            { href: '/sleep', label: '睡眠' },
            { href: '/circadian-rhythm', label: 'サーカディアンリズム' },
            { href: '/hormones/melatonin', label: 'メラトニン' },
            { href: '/wearables', label: 'ウェアラブル活用術' },
        ],
        selfCare: [
            '朝に光を浴び、夜はブルーライトを減らす',
            'カフェインは午後早めまで、寝酒は避ける',
            '就寝前にマグネシウム・グリシンを意識する',
        ],
    },
    {
        slug: 'cold',
        name: '冷え・寒がり',
        en: 'Cold Sensitivity',
        color: '#DEEAF2',
        tagline: '手足の冷え。代謝と巡りのサインとして読む。',
        intro:
            '冷えは、熱を生み出す力（代謝）と、その熱を全身へ運ぶ力（血流）の両面から起こります。代謝を司る甲状腺ホルモンの低下、エネルギーを作るミトコンドリアや鉄の不足、自律神経による血流調整の乱れが、背景にあることが多いサインです。とくに「疲れ・むくみ・体重増加」を伴う冷えは、甲状腺のチェックが役立ちます。',
        causes: [
            '甲状腺機能の低下（代謝の低下）',
            '鉄不足・貧血（熱を運ぶ赤血球の問題）',
            'ミトコンドリアの機能低下',
            '自律神経の乱れ（末端の血流調整）',
            '筋肉量の低下（熱を生む組織の減少）',
        ],
        relatedBiomarkers: ['tsh', 'ft3', 'ft4', 'ferritin', 'hemoglobin'],
        relatedNutrients: ['iron', 'thiamine', 'tyrosine', 'selenium'],
        relatedLinks: [
            { href: '/hormones/thyroid-hormone', label: '甲状腺ホルモン' },
            { href: '/organs/thyroid', label: '甲状腺' },
            { href: '/mitochondria', label: 'ミトコンドリア' },
            { href: '/exercise', label: '運動' },
        ],
        selfCare: [
            '筋トレで熱を生む筋肉を増やす',
            '鉄とタンパク質をしっかり摂る',
            '入浴・適度な運動で巡りを良くする',
        ],
    },
    {
        slug: 'low-mood',
        name: '気分が沈む・やる気が出ない',
        en: 'Low Mood',
        color: '#E3E8DF',
        tagline: '心の落ち込みの背景に、体の要因がないか。',
        intro:
            '気分の落ち込みややる気の低下は、心の問題であると同時に、体の状態が大きく影響します。気分を支える神経伝達物質（セロトニン・ドーパミン）の材料となるアミノ酸やビタミンB群の不足、腸内環境（脳腸相関）、甲状腺やテストステロンの低下、慢性炎症、血糖の乱高下などが、背景に隠れていることがあります。つらさが続くときは、無理せず医療機関にも相談してください。',
        causes: [
            'セロトニン・ドーパミンの材料不足（アミノ酸・B群）',
            '腸内環境の乱れ（脳腸相関）',
            '甲状腺・テストステロンの低下',
            '慢性炎症、血糖の乱高下',
            '日光不足・運動不足',
        ],
        relatedBiomarkers: ['ferritin', 'tsh', 'vitamin-d-serum', 'total-testosterone', 'hscrp'],
        relatedNutrients: ['tryptophan', 'tyrosine', 'b6', 'omega3', 'vitamin-d'],
        relatedLinks: [
            { href: '/hormones/serotonin', label: 'セロトニン' },
            { href: '/gut-brain', label: '脳腸相関' },
            { href: '/hormones/testosterone', label: 'テストステロン' },
            { href: '/exercise', label: '運動' },
        ],
        selfCare: [
            '朝の光と運動でセロトニンを増やす',
            'タンパク質で神経伝達物質の材料を補う',
            '腸活で脳腸のつながりを整える',
        ],
    },
    {
        slug: 'weight-gain',
        name: '太りやすい・痩せにくい',
        en: 'Weight Gain',
        color: '#FBF0CE',
        tagline: '同じ生活でも増える。代謝の背景を見直す。',
        intro:
            '40代から「同じ食事でも太りやすい」と感じるのは、代謝の変化が背景にあります。インスリン抵抗性による脂肪の蓄積、甲状腺機能の低下、筋肉量の減少による基礎代謝の低下、コルチゾール過多による内臓脂肪、睡眠不足による食欲ホルモンの乱れ——これらが複合的に関わります。カロリーだけでなく、ホルモンと代謝の視点で見直すのが鍵です。',
        causes: [
            'インスリン抵抗性（脂肪を蓄えやすい状態）',
            '甲状腺機能の低下（代謝の低下）',
            '筋肉量の減少による基礎代謝の低下',
            'コルチゾール過多（内臓脂肪・むくみ）',
            '睡眠不足による食欲ホルモンの乱れ',
        ],
        relatedBiomarkers: ['fasting-insulin', 'homa-ir', 'hba1c', 'triglycerides', 'tsh'],
        relatedNutrients: ['fiber', 'magnesium', 'protein', 'alpha-lipoic-acid'],
        relatedLinks: [
            { href: '/hormones/insulin', label: 'インスリン' },
            { href: '/blood-sugar', label: '血糖コントロール' },
            { href: '/exercise', label: '運動' },
            { href: '/hormones/thyroid-hormone', label: '甲状腺ホルモン' },
        ],
        selfCare: [
            '血糖を揺らさない食べ方でインスリンを穏やかに',
            '筋トレで基礎代謝を底上げする',
            '睡眠を整え、食欲ホルモンを安定させる',
        ],
    },
    {
        slug: 'skin-hair',
        name: '肌荒れ・抜け毛',
        en: 'Skin & Hair',
        color: '#F8DCE4',
        tagline: '肌と髪は、内側の栄養状態を映す鏡。',
        intro:
            '肌や髪は、体の中でも入れ替わりが速い組織。だからこそ、栄養やホルモンの状態を敏感に映します。タンパク質・鉄・亜鉛・ビタミンの不足、甲状腺やホルモンの変化、腸内環境、慢性炎症、血糖（糖化）などが、肌荒れや抜け毛として現れることがあります。「外側のケア」だけでなく、「内側の材料と巡り」を見直す視点が役立ちます。',
        causes: [
            'タンパク質・鉄・亜鉛・ビタミンの不足',
            '甲状腺機能の低下、ホルモンの変化',
            '糖化（AGEs）による肌の老化',
            '腸内環境の乱れ・慢性炎症',
            '酸化ストレス',
        ],
        relatedBiomarkers: ['ferritin', 'zinc-serum', 'tsh', 'total-protein', 'hba1c'],
        relatedNutrients: ['zinc', 'iron', 'protein', 'vitamin-c', 'omega3'],
        relatedLinks: [
            { href: '/glycation', label: '糖化' },
            { href: '/organs/gut', label: '腸' },
            { href: '/hormones/thyroid-hormone', label: '甲状腺ホルモン' },
            { href: '/oxidative-stress', label: '活性酸素' },
        ],
        selfCare: [
            'タンパク質・鉄・亜鉛を意識して材料を満たす',
            '糖化を防ぐため血糖の急上昇を避ける',
            '腸活と抗酸化（野菜・ビタミンC）を心がける',
        ],
    },
    {
        slug: 'gut-issues',
        name: 'お腹の不調・便秘',
        en: 'Gut Issues',
        color: '#DCF1EA',
        tagline: '腸の調子は、全身と気分にも波及する。',
        intro:
            '便秘・お腹の張り・ゆるさといった不調は、腸内環境（腸内細菌叢）のバランス、食物繊維や水分の不足、自律神経の乱れ、消化力の低下などが背景にあります。腸は免疫や気分（脳腸相関）とも深くつながるため、腸を整えることは消化だけでなく、免疫・メンタル・肌の調子にも波及します。',
        causes: [
            '腸内細菌叢のバランスの乱れ',
            '食物繊維・水分・発酵食品の不足',
            '自律神経の乱れ（腸の動きの低下）',
            '消化力（胃酸・消化酵素）の低下',
            'ストレス（脳腸相関）',
        ],
        relatedBiomarkers: ['hscrp', 'albumin', 'total-protein'],
        relatedNutrients: ['fiber', 'glutathione', 'glycine', 'zinc'],
        relatedLinks: [
            { href: '/organs/gut', label: '腸' },
            { href: '/gut-brain', label: '脳腸相関' },
            { href: '/organs/pancreas', label: '膵臓' },
            { href: '/autonomic-nervous-system', label: '自律神経とHRV' },
        ],
        selfCare: [
            '食物繊維と発酵食品で腸内細菌を育てる',
            '水分をしっかり摂る',
            'よく噛み、リラックスして食べる（副交感神経を優位に）',
        ],
    },
    {
        slug: 'swelling',
        name: 'むくみ',
        en: 'Swelling',
        color: '#DEEAF2',
        tagline: '水分の巡りの滞り。腎臓・甲状腺・巡りを見る。',
        intro:
            'むくみは、水分や塩分のバランス、血液やリンパの巡り、腎臓・甲状腺の働き、タンパク質（アルブミン）の状態などが関わります。長時間の同じ姿勢や塩分の摂りすぎといった一時的なものから、甲状腺機能の低下や腎機能、低タンパクなど体の状態を反映するものまで幅があります。続くむくみは、背景の確認が役立ちます。',
        causes: [
            '塩分の摂りすぎ・水分バランスの乱れ',
            '甲状腺機能の低下',
            '腎臓の機能の問題',
            '血液中のタンパク質（アルブミン）の低下',
            '血流・リンパの巡りの滞り（運動不足）',
        ],
        relatedBiomarkers: ['albumin', 'tsh', 'creatinine', 'egfr', 'bun'],
        relatedNutrients: ['protein', 'magnesium', 'omega3'],
        relatedLinks: [
            { href: '/organs/kidney', label: '腎臓' },
            { href: '/organs/thyroid', label: '甲状腺' },
            { href: '/exercise', label: '運動' },
            { href: '/hormones/thyroid-hormone', label: '甲状腺ホルモン' },
        ],
        selfCare: [
            '塩分を控え、カリウムの多い野菜を摂る',
            'こまめに体を動かし巡りを促す',
            'タンパク質をしっかり確保する',
        ],
    },
    {
        slug: 'low-libido',
        name: '性欲・活力の低下',
        en: 'Low Libido & Vitality',
        color: '#F3D9CE',
        tagline: '活力の低下は、ホルモンと土台のサイン。',
        intro:
            '性欲や活力の低下は、性ホルモン（テストステロン・エストロゲン・DHEA）の変化が中心ですが、それだけではありません。睡眠不足・慢性ストレス（コルチゾール過多）・栄養不足・運動不足・血糖や血流の問題も、ホルモンの分泌や全身の活力を押し下げます。「年齢のせい」と片づけず、土台となる生活と栄養から立て直せる部分が多くあります。',
        causes: [
            'テストステロン・エストロゲン・DHEAの低下',
            '慢性ストレス（コルチゾール過多）',
            '睡眠不足・運動不足',
            '亜鉛・ビタミンD・タンパク質の不足',
            '血糖・血流の問題',
        ],
        relatedBiomarkers: ['total-testosterone', 'free-testosterone', 'dhea-s', 'estradiol', 'vitamin-d-serum'],
        relatedNutrients: ['zinc', 'vitamin-d', 'magnesium', 'protein'],
        relatedLinks: [
            { href: '/hormones/testosterone', label: 'テストステロン' },
            { href: '/hormones/dhea', label: 'DHEA' },
            { href: '/sleep', label: '睡眠' },
            { href: '/exercise', label: '運動' },
        ],
        selfCare: [
            '睡眠と筋トレでホルモンの土台を整える',
            '亜鉛・ビタミンD・タンパク質を満たす',
            'ストレスケアでコルチゾールを抑える',
        ],
    },
];

export function getSymptomBySlug(slug: string): Symptom | undefined {
    return symptoms.find((s) => s.slug === slug);
}
