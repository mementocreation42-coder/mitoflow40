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
        slug: 'post-meal-sleepiness',
        name: '食後の眠気',
        en: 'Post-Meal Sleepiness',
        color: '#FCEBCE',
        tagline: '昼食後の強い眠気は、血糖スパイクのいちばん身近な窓。',
        intro:
            '食事のあとに強い眠気やだるさが襲ってくる——これは「食べたから休む」という自然な反応であると同時に、血糖の動きがもっとも表に出やすいサインでもあります。精製された糖質を早食い・ドカ食いすると、血糖が急上昇し、それを下げようとインスリンが大量に出て、今度は急降下する（血糖スパイク／反応性低血糖）。この乱高下そのものが眠気とだるさを生みます。加えて、血糖の上昇は脳で覚醒を保つ物質（オレキシン）の働きを抑えるため、糖質に偏った食事ほど眠くなりやすいのです。裏を返せば、食後の眠気は「今の食べ方が血糖にどう響いたか」を体が教えてくれる、いちばん身近なフィードバック。ただし、毎食後に耐えがたい眠気があり、のどの渇き・多尿・体重減少などを伴うときは、食後高血糖や糖尿病のサインのこともあります。気になるときは血糖の確認を。',
        causes: [
            '血糖の急上昇と急降下（血糖スパイク・反応性低血糖）',
            'インスリンの過剰な放出（精製糖質・早食い・ドカ食い）',
            '血糖の上昇が、覚醒を保つ物質オレキシンの働きを抑える',
            'インスリン抵抗性・食後高血糖（40代からの代謝の変化）',
            '食物繊維・タンパク質・マグネシウムの不足（血糖を穏やかにする要素）',
        ],
        relatedBiomarkers: ['hba1c', 'fasting-glucose', 'fasting-insulin', 'homa-ir', 'triglycerides'],
        relatedNutrients: ['fiber', 'protein', 'magnesium', 'alpha-lipoic-acid', 'thiamine'],
        relatedLinks: [
            { href: '/blood-sugar', label: '血糖コントロール' },
            { href: '/cgm', label: 'CGM（血糖の可視化）' },
            { href: '/glycation', label: '糖化' },
            { href: '/mitochondria', label: 'ミトコンドリア' },
        ],
        selfCare: [
            '野菜・タンパク質から食べ、精製糖質のドカ食いと早食いを避ける',
            '白米・パン・麺の“単品ランチ”を、具だくさん・低GIに寄せる',
            '食後に10分ほど歩き、筋肉に糖を取り込ませて血糖の山を削る',
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
    {
        slug: 'palpitations',
        name: '動悸・息切れ',
        en: 'Palpitations',
        color: '#F6D7D2',
        tagline: '胸のドキドキ・息切れ。心臓だけでなく代謝のサインも。',
        intro:
            '動悸（胸がドキドキする・脈が飛ぶ感じ）や、少し動いただけの息切れは、心臓そのものだけでなく、貧血・甲状腺・血糖・自律神経・カフェインなど全身の状態を映すサインです。鉄不足による貧血は「酸素を運ぶ力」の低下から心臓を代償的に働かせ、甲状腺機能の亢進は代謝と心拍の高ぶりから、動悸を起こします。一方で、胸の痛みを伴う・安静時にも続く・意識が遠のくといった動悸は、見逃せない心臓のサインのこともあります。気になるときは自己判断せず、循環器の受診を。',
        causes: [
            '鉄不足・貧血（酸素を運ぶ力の低下を心臓が代償）',
            '甲状腺機能の亢進（代謝・心拍の高ぶり）',
            '血糖の乱高下（低血糖時の動悸）',
            '自律神経の乱れ・ストレス（交感神経の高ぶり）',
            'カフェイン・アルコール・脱水、マグネシウム不足',
        ],
        relatedBiomarkers: ['ferritin', 'hemoglobin', 'tsh', 'ft3', 'ft4', 'hba1c'],
        relatedNutrients: ['iron', 'magnesium', 'b12', 'coq10'],
        relatedLinks: [
            { href: '/organs/heart', label: '心臓' },
            { href: '/hormones/thyroid-hormone', label: '甲状腺ホルモン' },
            { href: '/autonomic-nervous-system', label: '自律神経とHRV' },
            { href: '/blood-sugar', label: '血糖コントロール' },
        ],
        selfCare: [
            'カフェイン・アルコールを控え、水分をしっかり摂る',
            '鉄・マグネシウムなど不足しやすい栄養を見直す',
            '深い呼吸で副交感神経を優位にし、脈を落ち着かせる',
        ],
    },
    {
        slug: 'dizziness',
        name: 'めまい・立ちくらみ',
        en: 'Dizziness',
        color: '#D9EBEA',
        tagline: 'くらっとする立ちくらみ。鉄・血圧・血糖から探る。',
        intro:
            'めまいや立ちくらみは、脳へ届く血流・酸素と、平衡感覚（内耳）のバランスが崩れたときに起こります。立ち上がった瞬間にくらっとする「立ちくらみ」は、鉄不足の貧血や血圧の調整（起立性低血圧）、脱水が背景にあることが多く、低血糖やビタミンB12の不足でも起こります。ぐるぐる回る回転性のめまいは内耳が関わることもあります。突然の激しいめまいに、ろれつの回りにくさ・手足のしびれ・激しい頭痛を伴う場合は、すぐ受診を。',
        causes: [
            '鉄不足・貧血（脳への酸素供給の低下）',
            '起立性低血圧・血圧調整の乱れ・脱水',
            '血糖の乱高下（低血糖）',
            'ビタミンB12の不足（造血・神経への影響）',
            '内耳（前庭）の不調・自律神経の乱れ',
        ],
        relatedBiomarkers: ['ferritin', 'hemoglobin', 'hematocrit', 'hba1c', 'vitamin-b12-serum'],
        relatedNutrients: ['iron', 'b12', 'folate', 'magnesium'],
        relatedLinks: [
            { href: '/organs/brain', label: '脳' },
            { href: '/organs/heart', label: '心臓・血圧' },
            { href: '/blood-sugar', label: '血糖コントロール' },
            { href: '/autonomic-nervous-system', label: '自律神経とHRV' },
        ],
        selfCare: [
            'ゆっくり立ち上がり、こまめに水分・塩分を補う',
            '鉄・ビタミンB12など造血に関わる栄養を見直す',
            '空腹を避け、血糖を安定させる',
        ],
    },
    {
        slug: 'allergy',
        name: 'アレルギー・むずむず（鼻炎・かゆみ）',
        en: 'Allergy & Histamine',
        color: '#ECEFCF',
        tagline: '鼻炎・かゆみ・むずむず。ヒスタミンと免疫から読む。',
        intro:
            'くしゃみ・鼻水・目や肌のかゆみといった「むずむず」は、免疫が花粉や食べ物などに過剰に反応し、ヒスタミンが放出されて起こります。ヒスタミンはアレルギーの「悪者」だけでなく、胃酸分泌や脳の覚醒も担う物質で、つくる量と分解する力（DAO/HNMT酵素）のバランスが鍵。腸内環境・慢性炎症・ビタミンやミネラルの状態が、反応のしやすさに関わります。症状が強い・通年続く場合は、アレルギー科の受診も検討を。',
        causes: [
            '免疫の過剰反応とヒスタミンの放出',
            'ヒスタミン分解酵素（DAO/HNMT）の働きの低下',
            '腸内環境の乱れ（免疫の多くは腸に）',
            '慢性炎症・酸化ストレス',
            'ビタミンC・ビタミンB6・銅など分解に関わる栄養の不足',
        ],
        relatedBiomarkers: ['hscrp', 'wbc', 'ferritin', 'vitamin-d-serum'],
        relatedNutrients: ['vitamin-c', 'b6', 'copper', 'omega3', 'magnesium'],
        relatedLinks: [
            { href: '/histamine', label: 'ヒスタミン' },
            { href: '/organs/gut', label: '腸' },
            { href: '/inflammation', label: '慢性炎症' },
            { href: '/oxidative-stress', label: '活性酸素' },
        ],
        selfCare: [
            '腸活（食物繊維・発酵食品）で免疫の土台を整える',
            'ビタミンC・B6など、ヒスタミン分解を支える栄養を意識',
            '睡眠と炎症ケアで過敏な反応を鎮める',
        ],
    },
    {
        slug: 'oral-gum',
        name: '口臭・歯ぐきの不調',
        en: 'Oral & Gums',
        color: '#F0DEEC',
        tagline: '口臭・歯ぐきの腫れや出血。全身の炎症ともつながる。',
        intro:
            '口臭や歯ぐきの腫れ・出血は、口の中だけの問題に見えて、全身とつながるサインです。歯ぐきの細菌による慢性炎症（歯周病）は、糖尿病・心血管・腸内環境とも双方向に関わることがわかってきました。血糖の乱れは歯周病を悪化させ、歯周病は血糖を乱す——という悪循環も。唾液の減少（ドライマウス・口呼吸）やビタミン・栄養の不足も、口内環境を左右します。出血や腫れが続くときは、歯科の受診を。',
        causes: [
            '歯ぐきの細菌による慢性炎症（歯周病）',
            '血糖の乱れ（高血糖と歯周病の悪循環）',
            '唾液の減少（ドライマウス・口呼吸）',
            'ビタミンC・ビタミンD・亜鉛などの不足',
            '腸内環境・全身の炎症との関わり',
        ],
        relatedBiomarkers: ['hba1c', 'fasting-glucose', 'hscrp', 'vitamin-d-serum'],
        relatedNutrients: ['vitamin-c', 'vitamin-d', 'zinc', 'coq10'],
        relatedLinks: [
            { href: '/periodontal-disease', label: '歯周病' },
            { href: '/blood-sugar', label: '血糖コントロール' },
            { href: '/inflammation', label: '慢性炎症' },
            { href: '/organs/gut', label: '腸' },
        ],
        selfCare: [
            'ていねいな歯みがき・歯間ケアで細菌を減らす',
            '血糖を安定させ、歯ぐきの炎症を抑える',
            'ビタミンC・D・亜鉛など歯ぐきの材料を満たす',
        ],
    },
    {
        slug: 'leg-cramps',
        name: 'こむら返り・筋けいれん',
        en: 'Leg Cramps',
        color: '#DDEBE2',
        tagline: '夜中のこむら返り。筋肉と電解質、そして"弛緩"のサイン。',
        intro:
            'ふくらはぎが突然ギュッと攣る「こむら返り」。筋肉は縮む（収縮）ことより、じつはゆるむ（弛緩）ことにエネルギーとミネラルを必要とします。縮んだ筋肉を元に戻すには、カルシウムをくみ出すポンプが働かなければならず、その動力はミトコンドリアが作るATP、そして調整役はマグネシウム。だからマグネシウムや水分・電解質が不足すると、筋肉はうまくゆるめずに攣ってしまうのです。運動後や就寝中に多いのは、発汗や脱水で電解質が偏りやすいから。加齢による筋肉量の低下や血流の滞りも背景になります。多くは生活と栄養で減らせますが、頻繁で強い・片側だけ・むくみやしびれを伴うこむら返りは、甲状腺や腎臓、血糖、神経の状態が関わることもあり、確認が役立ちます。',
        causes: [
            'マグネシウム不足（筋肉をゆるめる調整役の欠乏）',
            '発汗・脱水による電解質バランスの乱れ',
            'ミトコンドリアの機能低下（弛緩に使うATPの不足）',
            '加齢による筋肉量の低下・血流の滞り',
            '甲状腺機能の低下・食後高血糖・腎機能など背景の要因',
        ],
        relatedBiomarkers: ['rbc-magnesium', 'creatinine', 'hba1c', 'tsh', 'ferritin'],
        relatedNutrients: ['magnesium', 'vitamin-d', 'thiamine', 'creatine'],
        relatedLinks: [
            { href: '/mitochondria', label: 'ミトコンドリア' },
            { href: '/water', label: '水と水分補給' },
            { href: '/exercise', label: '運動' },
            { href: '/hormones/thyroid-hormone', label: '甲状腺ホルモン' },
        ],
        selfCare: [
            'マグネシウムを意識し、汗をかいた日は水分と電解質を補う',
            '寝る前・運動前にふくらはぎを軽くストレッチする',
            'ふくらはぎを動かす習慣で血流と筋肉量を保つ',
        ],
    },
    {
        slug: 'stiff-shoulders',
        name: '肩こり・首こり',
        en: 'Stiff Shoulders',
        color: '#EDE4DA',
        tagline: '慢性的な肩こりは、筋肉の"酸欠"と緊張のサイン。',
        intro:
            '肩こりや首こりは、同じ姿勢による筋肉の疲労や血流の滞りが土台にありますが、「揉んでも戻る」しつこいこりの背景には、体の内側の要因が隠れていることがあります。緊張した筋肉は血管を圧迫し、酸素と栄養が届きにくくなる——いわば筋肉の"酸欠"。ここに鉄不足（酸素を運ぶヘモグロビンの材料）や、筋肉をゆるめるマグネシウムの不足が重なると、こりは慢性化しやすくなります。さらに、ストレスで交感神経が高ぶり続けると筋肉は緊張が抜けず、血流も細くなる。つまり肩こりは、姿勢・血流・ミネラル・自律神経が交差する場所に立つサインです。手や腕のしびれ・激しい頭痛・力の入りにくさを伴うときは、神経の圧迫などの可能性もあるため受診を。',
        causes: [
            '同じ姿勢・筋緊張による血流の滞り（筋肉の酸欠）',
            '鉄不足（酸素を運ぶヘモグロビンの材料の欠乏）',
            'マグネシウム不足（筋肉をゆるめる力の低下）',
            '自律神経の乱れ（交感神経が高いままの持続的緊張）',
            '冷え・眼精疲労・慢性炎症の関与',
        ],
        relatedBiomarkers: ['ferritin', 'hemoglobin', 'rbc-magnesium', 'hscrp', 'tsh'],
        relatedNutrients: ['magnesium', 'iron', 'b12', 'vitamin-e'],
        relatedLinks: [
            { href: '/autonomic-nervous-system', label: '自律神経とHRV' },
            { href: '/stress', label: 'ストレス' },
            { href: '/exercise', label: '運動' },
            { href: '/mitochondria', label: 'ミトコンドリア' },
        ],
        selfCare: [
            '1時間ごとに肩を回し、同じ姿勢を切らして血流を戻す',
            '鉄・マグネシウムなど不足しやすい栄養を見直す',
            '深い呼吸・入浴で交感神経をゆるめ、筋緊張を解く',
        ],
    },
    {
        slug: 'eye-strain',
        name: '眼精疲労・目のかすみ',
        en: 'Eye Strain',
        color: '#DCEAF0',
        tagline: '目の奥の重だるさ。網膜は、脳と並ぶ高エネルギー器官。',
        intro:
            '目の疲れ・かすみ・奥の重だるさは、画面の見すぎやピント調整筋の酷使が土台にありますが、「休んでも取れない」疲れには、体の内側の要因も関わります。じつは網膜は、脳と並んでミトコンドリアの密度が高く、体の中でもとりわけ大量のエネルギーと酸素を消費する組織。だからこそ、酸素を運ぶ鉄が足りなかったり、微小な血流が滞ったり、血糖の乱高下で網膜の血管が揺さぶられたりすると、目は真っ先に疲れを訴えます。ピント調整を担う自律神経の乱れや、涙の減少（ドライアイ）、首・肩こりとの連動も背景に。目の疲れは、全身の「エネルギーと巡り」の状態が末端に映る窓とも言えます。視野が欠ける・急な視力低下・強い痛みや頭痛を伴うときは、早めに眼科を受診してください。',
        causes: [
            '画面の見すぎ・ピント調整筋の酷使、ドライアイ',
            '鉄不足（酸素を運ぶ力の低下と網膜の高い酸素需要）',
            '微小循環の滞り・血糖の乱高下による網膜血管への影響',
            '自律神経の乱れ（ピント調整と涙の分泌）',
            '首・肩こりとの連動、マグネシウム不足',
        ],
        relatedBiomarkers: ['ferritin', 'hba1c', 'rbc-magnesium', 'hscrp'],
        relatedNutrients: ['omega3', 'magnesium', 'b12', 'zinc'],
        relatedLinks: [
            { href: '/organs/brain', label: '脳' },
            { href: '/autonomic-nervous-system', label: '自律神経とHRV' },
            { href: '/mitochondria', label: 'ミトコンドリア' },
            { href: '/blood-sugar', label: '血糖コントロール' },
        ],
        selfCare: [
            '20分ごとに20秒、遠くを見てピント調整筋をゆるめる',
            '意識的にまばたきし、乾燥を防ぐ（画面は目線より下に）',
            '鉄・オメガ3など、酸素運搬と網膜を支える栄養を見直す',
        ],
    },
    {
        slug: 'hot-flashes',
        name: 'ほてり・のぼせ・多汗',
        en: 'Hot Flashes',
        color: '#F6DEDA',
        tagline: '急なほてりと汗。ホルモンが体温の"温度調節"を揺らすサイン。',
        intro:
            '突然カーッと顔や上半身がほてり、汗が噴き出す——40代以降に増えるこの感覚は、体温を一定に保つ「体温調節」のゆらぎとして起こります。中心にいるのはエストロゲン。エストロゲンが減ると、脳の視床下部にある体温調節の中枢が敏感になり、わずかな体温の変化を「暑すぎる」と誤認して、血管を急に広げ発汗させてしまう。これがほてり・のぼせ・寝汗の正体です。加えて、自律神経の乱れ、血糖の乱高下、甲状腺機能の亢進、ストレスによるコルチゾールの高ぶりも、ほてりを起こしたり強めたりします。更年期に典型的ですが、男性のホルモン変化や、甲状腺・血糖の問題でも起こるため、強い動悸や体重変化を伴うときは背景の確認を。',
        causes: [
            'エストロゲンの低下（体温調節中枢の過敏化）',
            '自律神経の乱れ（血管の拡張と発汗の調整）',
            '血糖の乱高下・食後高血糖',
            '甲状腺機能の亢進（代謝と発汗の高ぶり）',
            '慢性ストレス（コルチゾールの高ぶり）',
        ],
        relatedBiomarkers: ['estradiol', 'tsh', 'hba1c', 'hscrp', 'ferritin'],
        relatedNutrients: ['vitamin-e', 'omega3', 'magnesium', 'b6'],
        relatedLinks: [
            { href: '/hormones/estrogen', label: 'エストロゲン' },
            { href: '/autonomic-nervous-system', label: '自律神経とHRV' },
            { href: '/stress', label: 'ストレス' },
            { href: '/circadian-rhythm', label: 'サーカディアンリズム' },
        ],
        selfCare: [
            'カフェイン・アルコール・辛いものなど、ほてりの引き金を控える',
            '深い呼吸でほてりの波をやり過ごし、自律神経を整える',
            '血糖を揺らさない食べ方と、良質な睡眠でリズムを支える',
        ],
    },
    {
        slug: 'indigestion',
        name: '胃もたれ・胸やけ',
        en: 'Indigestion',
        color: '#EFE6D0',
        tagline: '食後の胃の重さ。じつは"胃酸が足りない"ことも多い。',
        intro:
            '食後に胃が重い・もたれる・胸やけがする——こうした不調は「胃酸が多すぎる」せいだと思われがちですが、40代以降ではむしろ「胃酸が足りない（低胃酸）」ことが少なくありません。胃酸は加齢やストレス、ピロリ菌などで減りやすく、酸が足りないとタンパク質の消化が進まず、食べ物が胃に長くとどまって、もたれや発酵によるガスを生みます。胃酸はさらに、鉄・ビタミンB12・亜鉛といった栄養の吸収の入口でもあるため、低胃酸が続くとこれらの不足にもつながる。早食い・脂質の摂りすぎ・自律神経の乱れ（消化は副交感神経が担う）も、胃の働きを鈍らせます。市販薬で胃酸を抑えても改善しない・体重が減る・黒い便が出るといった場合は、自己判断せず消化器の受診を。',
        causes: [
            '胃酸の不足（低胃酸／加齢・ストレス・ピロリ菌）',
            'タンパク質の消化力の低下・消化酵素の不足',
            '早食い・脂質の摂りすぎによる胃への負担',
            '自律神経の乱れ（消化を担う副交感神経の低下）',
            '低胃酸に伴う鉄・ビタミンB12・亜鉛の吸収低下',
        ],
        relatedBiomarkers: ['albumin', 'total-protein', 'ferritin', 'vitamin-b12-serum'],
        relatedNutrients: ['zinc', 'b12', 'protein', 'b6'],
        relatedLinks: [
            { href: '/digestion', label: '消化・吸収' },
            { href: '/organs/gut', label: '腸' },
            { href: '/autonomic-nervous-system', label: '自律神経とHRV' },
            { href: '/gut-health', label: '腸内環境' },
        ],
        selfCare: [
            'よく噛み、リラックスして食べる（消化は副交感神経が担う）',
            '脂っこいもの・食べすぎ・寝る直前の食事を避ける',
            'タンパク質は少量ずつ、亜鉛など消化を支える栄養も意識する',
        ],
    },
];

export function getSymptomBySlug(slug: string): Symptom | undefined {
    return symptoms.find((s) => s.slug === slug);
}
