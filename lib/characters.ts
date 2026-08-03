// いのちの仲間キャラクター — スケール前提のキャラクターデータ
//
// 設計の背骨は `for kids/files/character.schema.json`。ここはその TS 実体。
// 3層モデルを崩さないこと:
//   ファクト層 (role / mechanism / lifestyle / relations) … 嘘をつかない
//   遊び層     (no / name.title / catchphrase)           … 事実の言い換えで作る
//   演出層     (personality)                              … ここだけ脚色を許す
// id は媒体をまたいでキャラを指す背骨。一度決めたら変えない。

export type CharacterCategory =
    | 'metabolism'
    | 'blood'
    | 'gut'
    | 'immune'
    | 'nerve'
    | 'food'
    | 'adversary';

export type LifestyleDirection = 'good' | 'bad';
export type RelationType = 'partner' | 'rival' | 'enemy';

export type Character = {
    /** 安定スラッグ。媒体をまたぐ背骨 */
    id: string;
    /** 図鑑ナンバー（遊び層）。No.001 から連番 */
    no: number;
    name: {
        nickname: string;
        identity: string;
        /** 二つ名（遊び層）。事実の言い換えで作り、誇張しない */
        title?: string;
    };
    category: CharacterCategory;
    /** 体内のどこにいるか（ファクト層） */
    location?: string;
    /** 生化学的機能（ファクト層）。年齢で出し分ける */
    role: { kids: string; adult: string };
    /** 読み物（ファクト層）。role より長い解説。年齢で出し分ける・健康学習の肉付け */
    story?: { kids: string; adult: string };
    /** どう働くか、正確に（ファクト層・任意） */
    mechanism?: { kids?: string; adult?: string };
    /** 性格・口調（演出層）。柔らかくする担当 */
    personality?: { trait?: string; tone?: string; catchphrase?: string };
    /** 関わる生活習慣（ファクト層）。1体1メッセージが原則・健康学習の核 */
    lifestyle: { message: string; direction?: LifestyleDirection }[];
    /** もっとくわしく（おとな向けで表示）。LIBRARY への導線。href は既存ページの slug */
    learnMore?: { label: string; href: string }[];
    /** 他キャラとの相性（遊び＋ファクト）。必ず実際の相互作用に紐づける */
    relations?: { targetId: string; type: RelationType; basis?: string }[];
    /** ビジュアル差し替えスロット。無くてもカードは成立する */
    art?: { image?: string | null; placeholder?: boolean };
    /** 出典・裏取りメモ（内部用・非表示） */
    sources?: string[];
};

/** 系統タグの表示メタ（系統別ビュー・からだマップ型への拡張用） */
export const categoryMeta: Record<CharacterCategory, { ja: string; en: string; color: string }> = {
    metabolism: { ja: '代謝', en: 'METABOLISM', color: '#DCF1EA' },
    blood: { ja: '血液', en: 'BLOOD', color: '#FFD9D9' },
    gut: { ja: '腸', en: 'GUT', color: '#FFEFD6' },
    immune: { ja: '免疫', en: 'IMMUNE', color: '#DEEDF7' },
    nerve: { ja: '神経', en: 'NERVE', color: '#EBDFEA' },
    food: { ja: '食べもの', en: 'FOOD', color: '#FBF0C9' },
    adversary: { ja: '手ごわい相手', en: 'ADVERSARY', color: '#ECECEC' },
};

export const relationMeta: Record<RelationType, { ja: string; mark: string }> = {
    partner: { ja: 'なかま', mark: '🤝' },
    rival: { ja: 'ライバル', mark: '⚡' },
    enemy: { ja: 'てごわい相手', mark: '🛡️' },
};

// ── キャラクター一覧（No.順） ──────────────────────────────
export const characters: Character[] = [
    {
        id: 'mitochan',
        no: 1,
        name: { nickname: 'ミトちゃん', identity: 'ミトコンドリア', title: 'エネルギー工場長' },
        category: 'metabolism',
        location: 'ほぼ全ての細胞の中',
        role: {
            kids: '食べたものと さんそから、体を 動かす 力を 作るよ',
            adult: '酸素と栄養素から ATP（アデノシン三リン酸）を産生する、細胞のエネルギー工場',
        },
        story: {
            kids: 'きみの体は、とても たくさんの 小さな「さいぼう」で できているよ。その ひとつひとつの 中に、ミトちゃんが 住んでいるんだ。走ったり、考えたり、笑ったり——なにかを するたびに、ミトちゃんが 作った「力（エネルギー）」が 使われているよ。とくに よく 動く きんにくや しんぞうには、ミトちゃんが たくさん 集まって、休まず 働いているんだ。',
            adult: '心臓・骨格筋・脳など、エネルギーをたくさん使う細胞ほどミトコンドリアの密度が高く、1つの細胞に数百〜数千個が存在する。生命活動に必要なATPの大半は、ここで酸素を使って作られている。40代以降は、運動量や睡眠の質の低下とともにミトコンドリアの量と質がゆっくり落ちやすく、それが「原因のはっきりしない疲れ」の背景になりやすい。裏を返せば、よく動き、よく眠り、食べ方を整えることが、そのまま元気の土台になるということだ。',
        },
        mechanism: {
            kids: 'こうじょうの 中で、食べたものを 少しずつ ぶんかいして 力に 変えていくんだ',
            adult: 'TCA回路で得た電子を電子伝達系で受け渡し、生じたプロトン勾配で ATP合成酵素を回して ATP を作る',
        },
        personality: {
            trait: '働き者で世話好き。無理をさせられると弱音を吐く',
            tone: 'やさしい・丁寧',
            catchphrase: 'エネルギー、ちゃんと作っとくね！',
        },
        lifestyle: [
            { message: 'よく動くと数が増えて、もっと元気に働く', direction: 'good' },
            { message: 'しっかり眠ると、傷んだ工場が修理される', direction: 'good' },
            { message: '食べすぎ・動かなすぎが続くと、工場がうまく回らなくなる', direction: 'bad' },
        ],
        learnMore: [
            { label: 'ミトコンドリアとは', href: '/mitochondria' },
            { label: 'ATP（エネルギー通貨）', href: '/atp' },
            { label: '電子伝達系', href: '/electron-transport-chain' },
            { label: 'TCA回路', href: '/tca-cycle' },
        ],
        relations: [
            { targetId: 'red-blood-cell', type: 'partner', basis: '赤血球が運んでくる酸素を使って ATP を作る' },
            { targetId: 'glucose', type: 'partner', basis: 'ブドウ糖を燃料として受け取り、分解してエネルギーに変える' },
            { targetId: 'autophagy', type: 'partner', basis: '傷んだ自分（ミトコンドリア）を片付けてもらう＝ミトファジー' },
            { targetId: 'reactive-oxygen', type: 'enemy', basis: 'エネルギーを作る過程で活性酸素が生じ、増えすぎると工場自身が傷つく' },
        ],
        art: { image: null, placeholder: true },
        sources: [
            'ミトコンドリアの酸化的リン酸化：標準的な生化学教科書レベルの記述',
            '運動によるミトコンドリア新生（biogenesis）：要一次文献の裏取り',
        ],
    },

    {
        id: 'red-blood-cell',
        no: 2,
        name: { nickname: 'せっけっちゃん', identity: '赤血球', title: '酸素の宅配便' },
        category: 'blood',
        location: '血液の中',
        role: {
            kids: 'さんそを 体の すみずみまで 運ぶ、たくはいびんの なかまだよ',
            adult: 'ヘモグロビンに酸素を結合させ、肺から全身の細胞へ酸素を運搬する血球',
        },
        story: {
            kids: 'せっけっちゃんは、はいで 受け取った さんそを せなかに のせて、体の すみずみまで 届けているよ。中には てつで できた「ヘモグロビン」という 赤い 運び屋が いて、これが さんそと ぴったり くっつくんだ。血が 赤いのは、じつは この ヘモグロビンの 色。届けた 先では、さんそは ミトちゃんの こうじょうで エネルギーに 変わるよ。',
            adult: '赤血球の主役は、鉄を含むタンパク質・ヘモグロビン。酸素の多い肺では酸素と結び、酸素の少ない組織ではそっと手放す——この「受け渡し上手」のおかげで、全身のすみずみまで酸素が行きわたる。運ばれた酸素は最終的にミトコンドリアでのATP産生に使われるため、鉄やタンパク質の不足は「酸素が届きにくい＝疲れやすい・息切れしやすい」に直結する。とくに40代前後の女性では、鉄不足が隠れて進んでいることが少なくない。',
        },
        mechanism: {
            kids: 'まん中が へこんだ 形で、せまい けっかんも するりと 通っていくよ',
            adult: '鉄を含むヘモグロビンが酸素分圧に応じて酸素を結合・解離し、組織へ受け渡す',
        },
        personality: {
            trait: 'まじめな働き者。休みなく全身をぐるぐる回っている',
            tone: '元気・きびきび',
            catchphrase: '酸素、お届けにあがりました！',
        },
        lifestyle: [
            { message: '鉄とタンパク質が足りると、元気な赤血球ができる', direction: 'good' },
            { message: '鉄不足が続くと数や質が落ちて、疲れやすくなる', direction: 'bad' },
        ],
        relations: [
            { targetId: 'mitochan', type: 'partner', basis: '運んだ酸素をミトちゃんに渡してATPを作ってもらう' },
            { targetId: 'water', type: 'partner', basis: '水（血しょう）に乗って全身をめぐる' },
        ],
        learnMore: [
            { label: '血液検査（BIOMARKERS）', href: '/biomarkers' },
            { label: '栄養素（鉄・タンパク質）', href: '/nutrients' },
            { label: '臓器のはたらき', href: '/organs' },
        ],
        art: { image: null, placeholder: true },
        sources: ['ヘモグロビンによる酸素運搬：標準的な生理学教科書レベルの記述'],
    },

    {
        id: 'reactive-oxygen',
        no: 3,
        name: { nickname: 'かっせいさん', identity: '活性酸素', title: 'さびさせるいたずら者' },
        category: 'adversary',
        location: '細胞のあちこち',
        role: {
            kids: '体を さびさせてしまう、ちょっと いたずらな やつ。でも 少しは 役にも 立つよ',
            adult: '酸素代謝の副産物。過剰になると脂質・タンパク質・DNAを酸化的に傷つける',
        },
        story: {
            kids: 'かっせいさんは、体が エネルギーを 作るときに、どうしても 出てしまう「火の粉（ひのこ）」みたいな ものだよ。じつは 少しなら、入ってきた ばいきんを やっつけるのに 役立つんだ。でも、増えすぎると 体の あちこちを さびつかせてしまう。だから「ゼロにする」のでは なく、「増やしすぎない」ことが たいせつなんだよ。',
            adult: '活性酸素は「悪者」と決めつけられがちだが、適量なら殺菌やシグナル伝達に使われる、体に必要な存在でもある。問題になるのは「多すぎる」とき。タバコ・紫外線・食べすぎ・過度な運動などで過剰になると、細胞膜やDNAを酸化的に傷つけ、老化や生活習慣病の背景になる。体にはもともと抗酸化のしくみが備わっており、色の濃い野菜や果物はその味方になる。善悪で切り分けるより、「バランス」で捉えるのが本質だ。',
        },
        mechanism: {
            kids: 'ほうっておくと 体の あちこちを さびつかせてしまうんだ',
            adult: '電子伝達系などで生じ反応性が高い。適量は殺菌やシグナル伝達にも使われる',
        },
        personality: {
            trait: 'いたずら好き。少しならいいが、増えすぎると手がつけられない',
            tone: 'やんちゃ',
            catchphrase: 'ちょっとくらい、いいでしょ？',
        },
        lifestyle: [
            { message: '色の濃い野菜や果物（抗酸化）で、暴れをおさえられる', direction: 'good' },
            { message: 'タバコ・紫外線・食べすぎ・激しすぎる運動で増えすぎる', direction: 'bad' },
        ],
        relations: [
            { targetId: 'mitochan', type: 'enemy', basis: 'ミトちゃんがエネルギーを作る過程で生まれ、増えすぎると工場を傷つける' },
            { targetId: 'neuron', type: 'enemy', basis: '酸化ストレスは神経細胞を傷つけやすい' },
        ],
        learnMore: [
            { label: '酸化ストレス', href: '/oxidative-stress' },
            { label: '炎症', href: '/inflammation' },
        ],
        art: { image: null, placeholder: true },
        sources: ['活性酸素種（ROS）と酸化ストレス：標準的な生化学教科書レベルの記述'],
    },

    {
        id: 'white-blood-cell',
        no: 4,
        name: { nickname: 'はっけっちゃん', identity: '白血球', title: 'からだの守り隊' },
        category: 'immune',
        location: '血液・リンパ・組織',
        role: {
            kids: 'ばいきんや ウイルスから 体を 守る、たたかう 係だよ',
            adult: '好中球・リンパ球など。病原体を貪食・排除し、免疫を担う血球',
        },
        story: {
            kids: 'はっけっちゃんは、体の 中を ぐるぐる パトロールしている 守り隊だよ。ばいきんや ウイルスを 見つけると、食べて やっつけたり、仲間を 呼んで 力を 合わせたり するんだ。じつは 1しゅるいじゃ なくて、とくいわざの ちがう 仲間が チームを 組んでいるよ。よく ねむって、よく 食べると、この 守り隊は もっと 強くなるんだ。',
            adult: '白血球は一枚岩ではなく、好中球・マクロファージ・リンパ球など、役割の違う細胞のチームだ。まっ先に駆けつけて食べる者、敵を記憶して備える者、抗体づくりを指示する者が連携して体を守る。睡眠不足や慢性的なストレス、栄養不足は、このチームワークを静かに乱す。派手な健康法よりも、「よく寝て、よく食べる」がいちばん地味で確実な免疫ケアになる。',
        },
        mechanism: {
            kids: '体の 中を 見回って、わるい やつを 見つけたら やっつけるんだ',
            adult: '病原体を貪食して活性酸素や酵素で分解し、抗体産生や免疫記憶も担う',
        },
        personality: {
            trait: '正義感が強い頼れる隊長。仲間思い',
            tone: 'たのもしい',
            catchphrase: 'まかせて、守るよ！',
        },
        lifestyle: [
            { message: 'よく眠って栄養が足りると、守りが強くなる', direction: 'good' },
            { message: '寝不足や慢性ストレスが続くと、守りが弱くなる', direction: 'bad' },
        ],
        relations: [
            { targetId: 'gut-bacteria', type: 'partner', basis: '腸内細菌が免疫を訓練し、バランスを整えてくれる' },
        ],
        learnMore: [
            { label: '炎症', href: '/inflammation' },
            { label: '血液検査（BIOMARKERS）', href: '/biomarkers' },
            { label: '睡眠', href: '/sleep' },
        ],
        art: { image: null, placeholder: true },
        sources: ['白血球による自然免疫・獲得免疫：標準的な免疫学教科書レベルの記述'],
    },

    {
        id: 'gut-bacteria',
        no: 5,
        name: { nickname: 'きんちゃんズ', identity: '腸内細菌叢（マイクロバイオータ）', title: 'おなかの発酵職人' },
        category: 'gut',
        location: '大腸',
        role: {
            kids: 'おなかの 中で 食べたものを ぶんかいして、体に いい ものを 作る 小さな 仲間だよ',
            adult: '大腸に共生し、食物繊維を発酵させて短鎖脂肪酸を産生。免疫・代謝・脳にも影響する',
        },
        story: {
            kids: 'きみの おなかの 中には、とても たくさんの 小さな きんたちが 住んでいるよ。食べ物の しょうかしきれ なかった ぶぶんを ぶんかいして、体に いい ものを 作ってくれるんだ。おもしろいのは、どんな きんが 増えるかは「きみが 何を 食べるか」で 毎日 変わること。やさいや はっこう食品が すきな きんも いれば、あまい ものが すきな きんも いるんだよ。',
            adult: '腸内には数百種・約100兆個ともいわれる細菌が共生し、その集まりを腸内細菌叢（マイクロバイオータ）と呼ぶ。食物繊維を発酵して作られる短鎖脂肪酸は、腸のバリアやエネルギー、免疫、さらには脳の状態にまで関わることがわかってきた。「善玉・悪玉」と単純に分けるより、多様でバランスのよい状態こそ健康的とされる。何を食べるかが、住人の顔ぶれを日々つくり変えていく——腸は、生活習慣がいちばん直接あらわれる場所のひとつだ。',
        },
        mechanism: {
            kids: 'しょうかしきれ なかった ものを 食べて、はっこうさせて くれるんだ',
            adult: '難消化性食物繊維を発酵して酪酸などの短鎖脂肪酸を生成し、腸管バリアと免疫を支える',
        },
        personality: {
            trait: 'にぎやかで多様。バランスが命で、えこひいきされると偏る',
            tone: 'わいわい',
            catchphrase: '発酵、まかせといて！',
        },
        lifestyle: [
            { message: '食物繊維や発酵食品を食べると、よい菌がふえる', direction: 'good' },
            { message: '甘いものや加工食品ばかりだと、バランスがくずれる', direction: 'bad' },
        ],
        relations: [
            { targetId: 'white-blood-cell', type: 'partner', basis: '腸で免疫を育て、守り隊のはたらきを整える' },
            { targetId: 'neuron', type: 'partner', basis: '腸と脳は連絡しあう（腸脳相関）' },
        ],
        learnMore: [
            { label: 'マイクロバイオーム', href: '/microbiome' },
            { label: '腸の健康', href: '/gut-health' },
            { label: '腸脳相関', href: '/gut-brain' },
        ],
        art: { image: null, placeholder: true },
        sources: ['腸内細菌叢と短鎖脂肪酸・腸管免疫：総説レベルの記述、要一次文献の裏取り'],
    },

    {
        id: 'insulin',
        no: 6,
        name: { nickname: 'インスリンさん', identity: 'インスリン', title: '血糖の門番' },
        category: 'metabolism',
        location: '血液（膵臓から出る）',
        role: {
            kids: '血の 中の とうを、体の さいぼうに しまってくれる 係だよ',
            adult: '膵臓β細胞が分泌するホルモン。糖を細胞に取り込ませ、血糖値を下げる',
        },
        story: {
            kids: 'ごはんを 食べて 血の 中の とうが 増えると、すいぞうから インスリンさんが 出てくるよ。インスリンさんは、さいぼうの ドアを 開けて とうを しまってくれるんだ。おかげで 血の 中の とうは、多すぎず 少なすぎず、ちょうどよい 量に たもたれるよ。でも、あまい ものばかり 続くと、インスリンさんは 働きづめで 疲れてしまうんだ。',
            adult: 'インスリンは、血糖を下げられるほぼ唯一のホルモン。食後に膵臓β細胞から分泌され、細胞に糖を取り込ませて血糖を安定させる。ところが、甘いものや食べすぎ・運動不足が続くと、同じ量では効きにくくなる（インスリン抵抗性）。これが長引くと膵臓が疲れ、血糖の高い状態＝糖尿病へと近づいていく。「ゆっくり食べる」「食後に体を動かす」といった習慣は、インスリンの効きを守るいちばんの基本になる。',
        },
        mechanism: {
            kids: '「とうが 来たよ」と さいぼうの ドアを 開けてあげるんだ',
            adult: 'インスリン受容体を介してGLUT4を細胞膜へ動員し、グルコースの取り込みを促す',
        },
        personality: {
            trait: 'まじめな門番。働きづめが続くと疲れてしまう',
            tone: 'おだやか・実直',
            catchphrase: 'はい、しまっておくね',
        },
        lifestyle: [
            { message: 'よく噛んで運動すると、少しの量でもよく効く', direction: 'good' },
            { message: '甘いものや食べすぎが続くと、効きが悪くなる', direction: 'bad' },
        ],
        relations: [
            { targetId: 'glucose', type: 'partner', basis: 'ブドウ糖を細胞の中へ導き入れる' },
        ],
        learnMore: [
            { label: '血糖値', href: '/blood-sugar' },
            { label: 'ホルモン', href: '/hormones' },
            { label: '運動', href: '/exercise' },
        ],
        art: { image: null, placeholder: true },
        sources: ['インスリンによる血糖調節・インスリン抵抗性：標準的な生理学教科書レベルの記述'],
    },

    {
        id: 'glucose',
        no: 7,
        name: { nickname: 'グルコちゃん', identity: 'ブドウ糖（グルコース）', title: 'いちばん人気の燃料' },
        category: 'food',
        location: '血液・細胞',
        role: {
            kids: '体を 動かす、いちばん 使いやすい ねんりょうだよ',
            adult: '単糖。解糖系・TCA回路を経てATPの主要な原料になる、血糖の本体',
        },
        story: {
            kids: 'ブドウ糖は、体が いちばん すぐに 使える ねんりょうだよ。ごはんや パン、くだものが しょうかされると、この ブドウ糖に なって 血に とけこむんだ。とくに のうは ブドウ糖が 大すきで、いつも たくさん 使っているよ。ただし、使いきれない ほど 食べると、あまった 分は しぼうに なってしまうから、体を 動かして 使い切るのが たいせつなんだ。',
            adult: 'ごはんやパンなどの糖質は、消化されると最終的にブドウ糖になって血液に入る。解糖系からTCA回路・電子伝達系を経てATPになる、いちばん使い勝手のよい燃料だ。脳のように、ふだんはブドウ糖を主なエネルギー源にする器官もある。ただし使い切れない分は中性脂肪として蓄えられるため、「どれだけ摂るか」だけでなく「どれだけ動いて使うか」がつねにセットで問われる。',
        },
        mechanism: {
            kids: 'すぐに 火が ついて、エネルギーに 変わるんだ',
            adult: '解糖系でピルビン酸に分解され、好気的条件でミトコンドリアに入りATPを生む',
        },
        personality: {
            trait: '明るくてすぐ働く。でも余ると居座ってしまう',
            tone: 'あかるい',
            catchphrase: 'すぐ燃えるよ！',
        },
        lifestyle: [
            { message: '体を動かすと、しっかり使い切れる', direction: 'good' },
            { message: '使いきれないほど摂ると、余って脂肪になる', direction: 'bad' },
        ],
        relations: [
            { targetId: 'mitochan', type: 'partner', basis: '燃料としてミトちゃんに渡され、エネルギーになる' },
            { targetId: 'insulin', type: 'partner', basis: 'インスリンに細胞の中へ入れてもらう' },
        ],
        learnMore: [
            { label: '解糖系', href: '/glycolysis' },
            { label: '血糖値', href: '/blood-sugar' },
        ],
        art: { image: null, placeholder: true },
        sources: ['グルコース代謝（解糖系・酸化的リン酸化）：標準的な生化学教科書レベルの記述'],
    },

    {
        id: 'neuron',
        no: 8,
        name: { nickname: 'ニューロくん', identity: '神経細胞（ニューロン）', title: 'からだの伝令' },
        category: 'nerve',
        location: '脳・脊髄・全身の神経',
        role: {
            kids: 'でんきの しんごうで、「動け」「感じろ」を 体じゅうに 伝えるよ',
            adult: '電気・化学信号で情報を伝える細胞。神経伝達物質でシナプスを介して連絡する',
        },
        story: {
            kids: 'ニューロくんは、体じゅうに でんきの しんごうを 走らせる つたえ役だよ。「あつい！」「動け！」「うれしい！」といった あいずを、あっという間に のうや 体に 伝えるんだ。さいぼうどうしは ほんの 少しだけ すき間が あいていて、そこを あいずが ジャンプして 次の 仲間へ 伝わっていくよ。よく ねむると、この つながりが せいりされて 頭が すっきりするんだ。',
            adult: 'ニューロンは電気（活動電位）で信号を運び、細胞のつなぎ目（シナプス）では神経伝達物質という化学のバトンで次へ渡す。この伝達には多くのエネルギーが要り、脳は体重の約2%しかないのに、全身のエネルギーの約2割を使う大食漢だ。睡眠は、日中に使ったつながりを整理・修復する時間。慢性的な炎症や酸化ストレスは、この繊細な回路を静かに傷つけていく。',
        },
        mechanism: {
            kids: '細い 道を でんきが ビリッと 走って、次の 仲間に 伝えるんだ',
            adult: '活動電位を軸索に伝導し、シナプスで神経伝達物質を放出して次の細胞へ伝える',
        },
        personality: {
            trait: '繊細で敏感。ちゃんと休むと調子が戻る',
            tone: 'しずか・ていねい',
            catchphrase: 'いま、伝えたよ！',
        },
        lifestyle: [
            { message: 'よく眠ると、つながりが整理される', direction: 'good' },
            { message: '慢性ストレスや炎症が続くと、傷つきやすくなる', direction: 'bad' },
        ],
        relations: [
            { targetId: 'gut-bacteria', type: 'partner', basis: '腸内細菌と連絡しあう（腸脳相関）' },
            { targetId: 'reactive-oxygen', type: 'enemy', basis: '酸化ストレスで傷つけられやすい' },
        ],
        learnMore: [
            { label: '自律神経', href: '/autonomic-nervous-system' },
            { label: '神経の炎症', href: '/neuroinflammation' },
            { label: '腸脳相関', href: '/gut-brain' },
        ],
        art: { image: null, placeholder: true },
        sources: ['ニューロンの活動電位とシナプス伝達：標準的な神経科学教科書レベルの記述'],
    },

    {
        id: 'enzyme',
        no: 9,
        name: { nickname: 'コーソくん', identity: '酵素（エンザイム）', title: '化学反応の仲人' },
        category: 'metabolism',
        location: '全身の細胞',
        role: {
            kids: '体の 中の かがくはんのうを、すばやく 進める 手助け役だよ',
            adult: '生体触媒。特定の反応の活性化エネルギーを下げ、代謝反応を高速化する',
        },
        story: {
            kids: 'コーソくんは、体の 中の かがくはんのうを 手伝う しょくにんだよ。ふつうなら、とても 時間が かかったり、起きなかったり する はんのうを、あっという間に 進めてくれるんだ。食べ物の しょうかも、エネルギーづくりも、コーソくん なしには 進まないよ。ただし、コーソくんが 働くには ビタミンや ミネラルという「道具」が ひつようなんだ。',
            adult: '体の中では数千種類もの酵素が、それぞれ決まった反応だけを猛スピードで進めている。消化・エネルギー産生・解毒——生命活動のほぼすべてが、酵素の仕事だといってよい。多くの酵素は、ビタミンやミネラルを「道具（補酵素）」として必要とするため、栄養が欠けると反応がとどこおる。サプリメントを足すより先に、まず土台の栄養がそろっているかどうかが効いてくる理由が、ここにある。',
        },
        mechanism: {
            kids: 'あいて どうしを くっつけて、はんのうを ぐっと 早めるんだ',
            adult: '基質を活性部位で結合して遷移状態を安定化。補酵素（ビタミン・ミネラル）を助けに触媒する',
        },
        personality: {
            trait: '縁の下の力持ち。道具（補酵素）がないと動けない',
            tone: 'まじめ',
            catchphrase: 'まかせて、早めるよ！',
        },
        lifestyle: [
            { message: 'ビタミン・ミネラルがそろうと、よく働く', direction: 'good' },
            { message: '栄養不足だと、反応がとどこおる', direction: 'bad' },
        ],
        relations: [
            { targetId: 'mitochan', type: 'partner', basis: 'エネルギーを作る代謝の反応を、そばで進める' },
        ],
        learnMore: [
            { label: '酵素', href: '/enzymes' },
            { label: '栄養素（ビタミン・ミネラル）', href: '/nutrients' },
        ],
        art: { image: null, placeholder: true },
        sources: ['酵素触媒と補酵素の役割：標準的な生化学教科書レベルの記述'],
    },

    {
        id: 'water',
        no: 10,
        name: { nickname: 'みずちゃん', identity: '水（H₂O）', title: 'いのちのめぐり水' },
        category: 'food',
        location: '体じゅう',
        role: {
            kids: '体の 中を めぐって、えいようや ゴミを 運ぶ 大事な 水だよ',
            adult: '体重の約6割を占め、栄養・老廃物の運搬、体温調節、化学反応の場になる',
        },
        story: {
            kids: '体の はんぶん いじょうは、じつは 水で できているんだ。水は、えいようや ゴミを 運んだり、あつい ときは あせに なって 体を 冷やしたりと、大いそがしで 体じゅうを めぐっているよ。足りなく なると、疲れやすく なったり、頭が いたく なったり するんだ。のどが かわいたと 感じる 前に、こまめに 飲むのが コツだよ。',
            adult: '成人の体重の約6割は水分で、血液やリンパとして栄養・老廃物を運び、発汗で体温を調整し、多くの代謝反応の「場」にもなる。水が足りないと血液が濃くなり、疲れ・頭痛・便秘・巡りの悪さとして表れやすい。加齢とともに喉の渇きを感じにくくなるため、「のどが渇いてから」では遅れがちに。時間を決めてこまめに飲む習慣が、地味だが確実に効いてくる。',
        },
        mechanism: {
            kids: '体の あちこちに 行きわたって、いろんな ものを 運ぶんだ',
            adult: '溶媒として物質輸送を担い、発汗で体温を調節し、多くの代謝反応の反応場となる',
        },
        personality: {
            trait: 'おだやかな縁の下。足りなくなるとみんなが困る',
            tone: 'やわらか',
            catchphrase: 'めぐらせるよ〜',
        },
        lifestyle: [
            { message: 'こまめに飲むと、体の巡りが良くなる', direction: 'good' },
            { message: '足りないと、疲れ・便秘・巡りの悪さが出る', direction: 'bad' },
        ],
        relations: [
            { targetId: 'red-blood-cell', type: 'partner', basis: '血液（血しょう）として赤血球を全身へ運ぶ' },
        ],
        learnMore: [{ label: '水と体', href: '/water' }],
        art: { image: null, placeholder: true },
        sources: ['体液の役割（運搬・体温調節・溶媒）：標準的な生理学教科書レベルの記述'],
    },

    {
        id: 'autophagy',
        no: 11,
        name: { nickname: 'オートファジーさん', identity: '自食作用（オートファジー）', title: '細胞のおそうじ屋' },
        category: 'metabolism',
        location: '細胞の中',
        role: {
            kids: 'さいぼうの 中の 古くなった ぶひんを 片付けて、リサイクルする 係だよ',
            adult: '細胞内の不要・損傷成分を分解・再利用する仕組み。飢餓や運動で活性化する',
        },
        story: {
            kids: 'オートファジーは、さいぼうの 中の「おそうじ＆リサイクル」の しくみだよ。古くなった ぶひんや、こわれた 道具を 集めて、いったん バラバラに こわして、また 新しい ざいりょうに 作りかえるんだ。おもしろいのは、おなかが すいた 時間が あると、この おそうじが はじまること。食べ続けている あいだは、なかなか スイッチが 入らないんだよ。',
            adult: 'オートファジー（自食作用）は、細胞が自分の中の壊れた部品を分解し、材料として再利用するしくみ。飢餓や運動で活性化し、傷んだミトコンドリアを片付ける「ミトファジー」は、エネルギーづくりの質に直結する。研究が進む一方で、「何時間の空腹で最適に働くか」などはまだわかっていないことも多い。だからこそ極端な断食に走るより、食べ続けない時間をほどよくつくる、が現実的なつき合い方になる。',
        },
        mechanism: {
            kids: 'いらなく なった ものを 包んで、こわして、また ざいりょうに 変えるんだ',
            adult: '隔離膜が不要成分を包んでオートファゴソームを作り、リソソームと融合して分解・再利用する',
        },
        personality: {
            trait: 'きれい好きの掃除屋。忙しい（空腹の）時ほど張り切る',
            tone: 'てきぱき',
            catchphrase: 'お片付け、まかせて！',
        },
        lifestyle: [
            { message: '空腹の時間をつくると、スイッチが入る', direction: 'good' },
            { message: 'ずっと食べ続けていると、始まりにくい', direction: 'bad' },
        ],
        relations: [
            { targetId: 'mitochan', type: 'partner', basis: '傷んだミトコンドリアを片付ける（ミトファジー）' },
        ],
        learnMore: [
            { label: 'オートファジー', href: '/autophagy' },
            { label: '断食（ファスティング）', href: '/fasting' },
        ],
        art: { image: null, placeholder: true },
        sources: ['オートファジーの分子機構とミトファジー：総説レベルの記述、要一次文献の裏取り'],
    },

    {
        id: 'platelet',
        no: 12,
        name: { nickname: 'けっしょうくん', identity: '血小板', title: '傷口のふさぎ屋' },
        category: 'blood',
        location: '血液の中',
        role: {
            kids: 'ケガを した とき、集まって 血を 止めてくれる 係だよ',
            adult: '血管が傷つくと粘着・凝集して一次止血を担い、凝固反応の足場になる血球成分',
        },
        story: {
            kids: 'けっしょうくんは、ケガを した ときに 真っ先に かけつけて、血を 止めてくれる 係だよ。きずぐちに 仲間と くっついて、ふたを するように きゅっと 固まるんだ。ころんだ あとに「かさぶた」が できるのも、この 働きの おかげ。とても 小さいけれど、いざという ときの たよれる きゅうきゅうたいなんだよ。',
            adult: '血小板は血球の中でいちばん小さく、血管が傷つくとすぐ集まって粘着・凝集し、一次止血のふたを作る。さらに凝固因子の反応の足場となって、丈夫なかさぶた（フィブリン）づくりを助ける。多すぎると血が固まりやすく、少なすぎると出血が止まりにくい——「ちょうどよさ」が命の職人だ。水分不足や偏った食事は血をドロドロにしやすく、その巡りにも影響する。',
        },
        mechanism: {
            kids: 'きずを 見つけると 仲間を 呼んで、ふたを するように 固まるんだ',
            adult: '損傷部のコラーゲン等に粘着して活性化・凝集し、フィブリン形成の場を提供する',
        },
        personality: {
            trait: 'すばやくて仲間思い。ピンチに真っ先に駆けつける',
            tone: 'きびきび',
            catchphrase: 'すぐ、ふさぐよ！',
        },
        lifestyle: [
            { message: 'バランスのよい栄養で、ちょうどよい数がたもたれる', direction: 'good' },
            { message: '水分不足や偏った食事が続くと、血がドロドロになりやすい', direction: 'bad' },
        ],
        relations: [
            { targetId: 'red-blood-cell', type: 'partner', basis: '同じ血液のなかまとして一緒に全身を流れる' },
        ],
        learnMore: [
            { label: '血液検査（BIOMARKERS）', href: '/biomarkers' },
            { label: '臓器のはたらき', href: '/organs' },
        ],
        art: { image: null, placeholder: true },
        sources: ['血小板による一次止血と凝固：標準的な生理学教科書レベルの記述'],
    },

    {
        id: 'dietary-fiber',
        no: 13,
        name: { nickname: 'せんいちゃん', identity: '食物繊維', title: 'おなかの掃除＆菌のごはん' },
        category: 'food',
        location: '腸の中',
        role: {
            kids: '体には しょうかされないけれど、おなかを そうじして、きんたちの ごはんに なるよ',
            adult: 'ヒトの消化酵素で分解されず、腸内細菌の発酵基質や便量の増加に寄与する多糖類など',
        },
        story: {
            kids: 'せんいちゃんは、体には しょうかされないのに、とても 大事な えいようだよ。しょうかされない まま ちょうまで 届いて、きんたちの ごはんに なったり、べんの かさを 増やして おなかを おそうじしたり するんだ。やさいや かいそう、きのこ、豆に たくさん 入っているよ。きんたちにとっては、いちばんの ごちそうなんだ。',
            adult: '食物繊維は「消化されないのに大切」という、ちょっと不思議な栄養素。水溶性繊維は腸内細菌の発酵基質となって短鎖脂肪酸を生み、不溶性繊維は便量を増やして腸を動かす。かつては「食べ物のカス」と軽視されたが、いまや腸内環境や代謝、免疫までを左右する主役の一つと見直されている。加工食品が中心の食事で、いちばん不足しやすい栄養でもある。',
        },
        mechanism: {
            kids: 'しょうかされずに ちょうまで 届いて、きんたちの ごちそうに なるんだ',
            adult: '水溶性繊維は腸内細菌に発酵されて短鎖脂肪酸を生み、不溶性繊維は便のかさを増やす',
        },
        personality: {
            trait: 'じみだけど働き者。菌たちに大人気',
            tone: 'そぼく',
            catchphrase: 'おなか、そうじしとくね',
        },
        lifestyle: [
            { message: '野菜・海藻・豆・全粒の主食でしっかりとれる', direction: 'good' },
            { message: '加工食品ばかりだと足りず、菌たちがおなかをすかせる', direction: 'bad' },
        ],
        relations: [
            { targetId: 'gut-bacteria', type: 'partner', basis: '発酵のエサになって、よい菌をふやす' },
        ],
        learnMore: [
            { label: '腸の健康', href: '/gut-health' },
            { label: '栄養素', href: '/nutrients' },
            { label: '食べ物', href: '/foods' },
        ],
        art: { image: null, placeholder: true },
        sources: ['食物繊維と短鎖脂肪酸・腸内環境：総説レベルの記述、要一次文献の裏取り'],
    },

    {
        id: 'antibody',
        no: 14,
        name: { nickname: 'こうたいくん', identity: '抗体', title: '敵を覚える名探偵' },
        category: 'immune',
        location: '血液・体液',
        role: {
            kids: 'いちど 会った てきを 覚えて、次から すぐ 見つけ出す めいたんていだよ',
            adult: 'B細胞由来の免疫グロブリン。抗原に特異的に結合し、中和や目印付けを行う',
        },
        story: {
            kids: 'こうたいくんは、いちど 出会った てきの 顔を 覚えておく めいたんていだよ。次に 同じ てきが やってきたら、すぐに くっついて「こいつは わるもの！」と めじるしを つけるんだ。だから、いちど かかった びょうきに 二どめは かかりにくい ことが あるんだよ。ワクチンは、この「覚える 力」を じょうずに つかっているんだ。',
            adult: '抗体（免疫グロブリン）は、特定の相手にだけぴったり結合する、いわば専用の手錠。敵を無力化（中和）したり、白血球が食べやすいように目印（オプソニン化）をつけたりする。一度作られた記憶は長く残り、これが免疫の「二度目は強い」の正体だ。ワクチンは、この記憶のしくみを、実際に病気にかからずに先取りする方法だといえる。',
        },
        mechanism: {
            kids: 'てきに ぴったり くっついて「こいつ わるものだよ」と めじるしを つけるんだ',
            adult: '抗原に特異的に結合して中和・オプソニン化し、白血球による排除を助ける',
        },
        personality: {
            trait: '記憶力ばつぐん。一度覚えた相手は忘れない',
            tone: 'れいせい',
            catchphrase: 'その顔、覚えたよ',
        },
        lifestyle: [
            { message: 'しっかり眠って栄養が足りると、よい抗体が作られる', direction: 'good' },
            { message: '慢性の炎症や強いストレスが続くと、はたらきが乱れやすい', direction: 'bad' },
        ],
        relations: [
            { targetId: 'white-blood-cell', type: 'partner', basis: '白血球（B細胞）が抗体を作り、力を合わせて敵を倒す' },
            { targetId: 'virus', type: 'enemy', basis: 'ウイルスにくっついて無力化する' },
        ],
        learnMore: [
            { label: '炎症', href: '/inflammation' },
            { label: '血液検査（BIOMARKERS）', href: '/biomarkers' },
        ],
        art: { image: null, placeholder: true },
        sources: ['抗体（免疫グロブリン）の機能：標準的な免疫学教科書レベルの記述'],
    },

    {
        id: 'serotonin',
        no: 15,
        name: { nickname: 'セロトニンさん', identity: 'セロトニン', title: '心を落ちつける係' },
        category: 'nerve',
        location: '脳・腸（多くは腸で作られる）',
        role: {
            kids: 'きもちを 落ちつけて、心を おだやかに してくれる 係だよ',
            adult: 'トリプトファン由来の神経伝達物質。気分・睡眠・腸の動きを調整する',
        },
        story: {
            kids: 'セロトニンさんは、きもちを 落ちつけて、心を おだやかに してくれる あいずの 役だよ。おどろくことに、その 多くは のうでは なく「ちょう」で 作られているんだ。だから、おなかの ちょうしと 心の 元気は、じつは つながっているんだよ。あさひを 浴びたり、よく 歩いたり すると、セロトニンさんは 増えやすく なるんだ。',
            adult: 'セロトニンは、気分・睡眠・腸の動きに関わる神経伝達物質で、材料は必須アミノ酸のトリプトファン。意外にも、体内のセロトニンの大部分は脳ではなく腸で作られる——ここに「腸と心はつながっている」と言われる理由の一端がある。朝日・運動・整った腸内環境が、その産生を後押しする。心の調子を、気合ではなく栄養と生活習慣の側から支える、という視点をくれる存在だ。',
        },
        mechanism: {
            kids: '心が 落ちつくように、のうや ちょうで そっと あいずを 出すんだ',
            adult: '必須アミノ酸トリプトファンから作られ、体内の大部分は腸で産生される',
        },
        personality: {
            trait: 'おだやかで安心感がある。生活リズムが乱れると元気がなくなる',
            tone: 'やさしい',
            catchphrase: 'だいじょうぶ、落ちついて',
        },
        lifestyle: [
            { message: '朝日を浴び、よく歩き、腸を整えると増えやすい', direction: 'good' },
            { message: '寝不足や腸の不調が続くと、作られにくくなる', direction: 'bad' },
        ],
        relations: [
            { targetId: 'gut-bacteria', type: 'partner', basis: '腸内細菌が材料づくりを助け、腸でたくさん作られる' },
            { targetId: 'neuron', type: 'partner', basis: '神経のあいだで気分の合図を伝える' },
        ],
        learnMore: [
            { label: '心と栄養', href: '/mood-nutrition' },
            { label: '腸脳相関', href: '/gut-brain' },
            { label: 'メンタルヘルス', href: '/mental-health' },
        ],
        art: { image: null, placeholder: true },
        sources: ['セロトニンの合成・腸での産生・機能：総説レベルの記述、要一次文献の裏取り'],
    },

    {
        id: 'virus',
        no: 16,
        name: { nickname: 'ウイルスくん', identity: 'ウイルス', title: 'こっそり忍び込む侵入者' },
        category: 'adversary',
        location: '外からやってくる',
        role: {
            kids: '自分では 増えられなくて、体の さいぼうに しのびこんで 増える やつだよ',
            adult: '自己増殖できず、宿主細胞に感染して自分のコピーを複製させる感染性微粒子',
        },
        story: {
            kids: 'ウイルスくんは、自分だけでは 増えられない、とても 小さな やつだよ。だから、体の さいぼうに こっそり 入り込んで、その しくみを 借りて 自分を 増やすんだ。ずるいけれど、とても 小さいので、見つけるのは ひとくろう。手あらいや よい すいみんは、入り込む すきを 減らして、体を 守ってくれるんだよ。',
            adult: 'ウイルスは細菌よりもずっと小さく、自分では増殖できないという特徴を持つ。宿主の細胞に入り込み、その合成装置を乗っ取って自分のコピーを作らせる、いわば「借り暮らしの侵入者」だ。体は白血球と抗体でこれに対抗するが、睡眠不足や疲れで守りが弱るとつけ込まれる。手洗い・睡眠・栄養という地味な習慣が、じつはいちばんの入口対策になる。',
        },
        mechanism: {
            kids: 'さいぼうに こっそり 入り込んで、その しくみを 借りて 増えるんだ',
            adult: '細胞に侵入して宿主の合成装置を乗っ取り、自らの遺伝情報を複製・拡散する',
        },
        personality: {
            trait: 'ずる賢くてこっそり屋。すきを見て入り込もうとする',
            tone: 'こそこそ',
            catchphrase: 'ちょっとお邪魔しますよ…',
        },
        lifestyle: [
            { message: '手洗い・睡眠・栄養で、入り込むすきを減らせる', direction: 'good' },
            { message: '寝不足や疲れで守りが弱ると、つけ込まれやすい', direction: 'bad' },
        ],
        relations: [
            { targetId: 'white-blood-cell', type: 'enemy', basis: '守り隊に見つかると追い出される' },
            { targetId: 'antibody', type: 'enemy', basis: '一度覚えられると、抗体にくっつかれて無力化される' },
        ],
        learnMore: [{ label: '炎症', href: '/inflammation' }],
        art: { image: null, placeholder: true },
        sources: ['ウイルスの感染・複製の基本：標準的な微生物学教科書レベルの記述'],
    },

    {
        id: 'ages',
        no: 17,
        name: { nickname: 'とうかちゃん', identity: '糖化（AGEs）', title: 'こんがり焦げつき魔' },
        category: 'adversary',
        location: '体のタンパク質のあちこち',
        role: {
            kids: 'あまった とうが 体の パーツに くっついて、こんがり こげつかせてしまう やつだよ',
            adult: '過剰な糖がタンパク質などと非酵素的に結合し、終末糖化産物（AGEs）を生じて組織を劣化させる',
        },
        story: {
            kids: 'とうかは、あまった とうが 体の パーツに くっついて、こんがり こげつかせてしまう ことだよ。パンを こんがり 焼くと 茶色く かたく なるよね。あれと 同じことが、体の 中でも ゆっくり 起きているんだ。だから、あまい ものの とりすぎには 気を つけたいね。ゆっくり 食べると、とうかは ぐっと 起きにくく なるよ。',
            adult: '糖化とは、あまった糖がタンパク質などにくっついて劣化させる反応で、できた物質を終末糖化産物（AGEs）と呼ぶ。ホットケーキがこんがり色づくのと同じ反応が、体の中でもゆっくり進み、血管や肌、コラーゲンの弾力低下の背景になる。だからこそ、血糖の急上昇を抑える食べ方——ゆっくり・食べる順番・こげの摂りすぎに注意——が、老化スピードへのささやかなブレーキになる。',
        },
        mechanism: {
            kids: 'とうが 多いと、体の あちこちに くっついて かたく こげつかせるんだ',
            adult: '高血糖が続くとタンパク質の糖化が進み、弾力低下や炎症・酸化を招きやすくなる',
        },
        personality: {
            trait: '甘い場所が大好き。糖が多いほど元気になってしまう',
            tone: 'ねっとり',
            catchphrase: 'あま〜い、いただき！',
        },
        lifestyle: [
            { message: 'ゆっくり食べて血糖の急上昇をふせぐと、暴れにくい', direction: 'good' },
            { message: '甘いもの・こげた食べ物のとりすぎで増える', direction: 'bad' },
        ],
        relations: [
            { targetId: 'glucose', type: 'rival', basis: '糖が余ると、それを材料にして生まれる' },
            { targetId: 'red-blood-cell', type: 'enemy', basis: 'ヘモグロビンが糖化するとHbA1cになり、多いと血管を傷めやすい' },
        ],
        learnMore: [
            { label: '糖化', href: '/glycation' },
            { label: '酸化ストレス', href: '/oxidative-stress' },
            { label: '血糖値', href: '/blood-sugar' },
        ],
        art: { image: null, placeholder: true },
        sources: ['糖化反応と終末糖化産物（AGEs）：総説レベルの記述、要一次文献の裏取り'],
    },

    {
        id: 'ketone',
        no: 18,
        name: { nickname: 'ケトンちゃん', identity: 'ケトン体', title: 'もう一つの燃料' },
        category: 'metabolism',
        location: '肝臓で作られ、血液をめぐる',
        role: {
            kids: 'とうが 少ない とき、しぼうから 作られる よびの ねんりょうだよ',
            adult: '脂肪酸のβ酸化を経て肝臓で作られる代替エネルギー基質（アセト酢酸・β-ヒドロキシ酪酸）',
        },
        story: {
            kids: 'ケトンちゃんは、とうが 少なく なった ときに 出てくる「もう一つの ねんりょう」だよ。しぼうを ざいりょうに して、かんぞうで 作られるんだ。ふだんは ブドウ糖が メインだけど、だんじきしたり、たくさん 運動して とうを 使い切ったり すると、この ひかえの ねんりょうが かつやくするよ。体は、こうして ねんりょうを じょうずに 使い分けているんだ。',
            adult: 'ケトン体は、糖が乏しいときに肝臓が脂肪酸から作り出す代替燃料。脳はふだんブドウ糖を主に使うが、絶食時にはケトン体もエネルギー源にできる、賢い切り替え機能を持つ。糖に頼りきりの生活だと、この回路は眠ったまま。空腹の時間や運動は、状況に応じて燃料を使い分ける柔軟さ（代謝の柔軟性）を取り戻すきっかけになる。',
        },
        mechanism: {
            kids: 'とうが へってくると、しぼうを ざいりょうに して 力に 変えるんだ',
            adult: '糖が乏しいとき肝臓で脂肪酸から生成され、脳や筋肉のエネルギー源として使われる',
        },
        personality: {
            trait: 'いざという時に頼れる控えめな二番手',
            tone: 'おちついた',
            catchphrase: 'ここは、まかせて',
        },
        lifestyle: [
            { message: '空腹の時間や運動で糖がへると、出番がくる', direction: 'good' },
            { message: '糖ばかり摂り続けると、いつまでも出番がない', direction: 'bad' },
        ],
        relations: [
            { targetId: 'mitochan', type: 'partner', basis: 'ミトちゃんに燃料として渡され、ATPになる' },
            { targetId: 'glucose', type: 'rival', basis: '同じエネルギー源として、状況で燃料の座を分け合う' },
        ],
        learnMore: [
            { label: 'ケトン体', href: '/ketones' },
            { label: '断食（ファスティング）', href: '/fasting' },
        ],
        art: { image: null, placeholder: true },
        sources: ['ケトン体の生成と利用：標準的な生化学教科書レベルの記述'],
    },

    {
        id: 'liver',
        no: 19,
        name: { nickname: 'かんぞうくん', identity: '肝臓', title: 'からだの化学工場' },
        category: 'metabolism',
        location: 'おなかの右上',
        role: {
            kids: 'えいようを 作りかえたり、いらない ものを ぶんかいする 体の 大きな こうじょうだよ',
            adult: '栄養の代謝変換・解毒・胆汁生成・グリコーゲン貯蔵を担う、最大の代謝臓器',
        },
        story: {
            kids: 'かんぞうくんは、体の 中で いちばん 大きな「かがくこうじょう」だよ。運ばれてきた えいようを、体が 使える 形に 作りかえたり、いらない ものや どくを ぶんかいしたりと、たくさんの 仕事を いちどに こなしているんだ。とても がまんづよくて、少しくらい 傷んでも 文句を 言わないんだ。だからこそ、気づかない うちに 疲れさせない ように、大事に してあげてね。',
            adult: '肝臓は「沈黙の臓器」と呼ばれる働き者。糖・脂質・タンパク質を相互に変換し、薬物やアンモニアを解毒し、脂肪の消化を助ける胆汁を作る——数百もの仕事を同時にこなしている。我慢強い分だけ不調が表に出にくく、食べすぎや飲みすぎが続くと、脂肪肝として静かに蓄積していく。休肝日をつくる、食べすぎないといった工夫は、この寡黙な工場をいたわる基本になる。',
        },
        mechanism: {
            kids: '運ばれてきた えいようや どくを、体が 使える 形に 作りかえるんだ',
            adult: '糖・脂質・タンパク質を相互変換し、薬物・アンモニアなどを解毒して胆汁を作る',
        },
        personality: {
            trait: '我慢強い働き者。無理が続いても弱音を吐かない（から気づかれにくい）',
            tone: 'どっしり',
            catchphrase: 'まかせとき、やっとくで',
        },
        lifestyle: [
            { message: '食べすぎない・休肝日をつくると元気に働く', direction: 'good' },
            { message: 'お酒・食べすぎ・脂肪のとりすぎが続くと脂肪肝になりやすい', direction: 'bad' },
        ],
        relations: [
            { targetId: 'glucose', type: 'partner', basis: '糖をグリコーゲンで貯め、必要なときに血液へ放す' },
            { targetId: 'ketone', type: 'partner', basis: 'ケトン体を作り出す工場' },
        ],
        learnMore: [
            { label: '臓器のはたらき', href: '/organs' },
            { label: '脂肪肝', href: '/fatty-liver' },
            { label: 'デトックス', href: '/detox' },
        ],
        art: { image: null, placeholder: true },
        sources: ['肝臓の代謝・解毒・胆汁生成：標準的な生理学教科書レベルの記述'],
    },

    {
        id: 'stomach-acid',
        no: 20,
        name: { nickname: 'いさんくん', identity: '胃酸', title: '消化と第一の関所' },
        category: 'gut',
        location: '胃の中',
        role: {
            kids: '強い さんで 食べ物を とかして、ばいきんも やっつける やくめだよ',
            adult: '胃で分泌される塩酸。タンパク質分解の開始とペプシンの活性化、殺菌を担う',
        },
        story: {
            kids: 'いさんくんは、食べ物を とかす 強い さんだよ。とても すっぱくて、食べ物と いっしょに 入ってきた ばいきんも やっつけてくれるんだ。こわそうに 見えるけど、しょうかの さいしょの かんもんを まかされた 大事な 守り役。よく かんで 食べると、いさんくんの 仕事が ぐっと 楽に なるんだよ。',
            adult: '胃酸の正体は塩酸で、金属も溶かすほど強い酸性。この酸がタンパク質消化酵素ペプシンを目覚めさせ、消化の第一歩と、食べ物とともに入る細菌の殺菌を担う。強すぎる印象があるが、じつは少なすぎても消化不良や感染のもとになる。早食い・食べすぎ・強いストレスは胃を荒らしやすく、「よく噛むこと」が最良の胃薬になることも多い。',
        },
        mechanism: {
            kids: 'すっぱくて 強い 力で、食べ物を ドロドロに とかすんだ',
            adult: '強い酸性環境でペプシノーゲンをペプシンに変え、タンパク質消化と殺菌を進める',
        },
        personality: {
            trait: '見た目はこわいが、実は消化の頼れる第一関門',
            tone: 'ごうかい',
            catchphrase: 'まず、とかすで！',
        },
        lifestyle: [
            { message: 'よく噛んで、落ちついて食べると働きやすい', direction: 'good' },
            { message: '早食い・食べすぎ・強いストレスで胃が荒れやすい', direction: 'bad' },
        ],
        relations: [
            { targetId: 'enzyme', type: 'partner', basis: '消化酵素ペプシンを目覚めさせ、消化を進める' },
        ],
        learnMore: [
            { label: '消化', href: '/digestion' },
            { label: 'おなかの不調', href: '/gut-troubles' },
        ],
        art: { image: null, placeholder: true },
        sources: ['胃酸（塩酸）とペプシンによる消化・殺菌：標準的な生理学教科書レベルの記述'],
    },

    {
        id: 'vitamin-d',
        no: 21,
        name: { nickname: 'ビタミンDくん', identity: 'ビタミンD', title: '日光でできる調整役' },
        category: 'food',
        location: '皮膚で作られ、全身ではたらく',
        role: {
            kids: '日光を 浴びると ひふで 作られて、ほねや めんえきを 整えてくれるよ',
            adult: '日光（UVB）で皮膚合成され、カルシウム代謝や免疫の調整に関わる脂溶性ビタミン',
        },
        story: {
            kids: 'ビタミンDくんは、日光を 浴びると 体の 中で 作られる、ちょっと 変わった えいようだよ。ほねを じょうぶに したり、めんえきを 整えたりと、はば広く 体を 支えているんだ。だから、外で 遊ぶ 時間も、じつは 体にとって 大事な えいようの 時間なんだよ。さかなや きのこにも 入っているよ。',
            adult: 'ビタミンDは「食べる」だけでなく、日光（UVB）を浴びて皮膚で作られる、ホルモンのような栄養素。カルシウムの吸収を助けて骨を支えるほか、免疫の調整にも関わることがわかってきた。屋内中心の生活や日照の少ない冬は不足しやすく、現代人に足りない代表格とされる。適度な日光と、魚・きのこなどの食品が、その供給源になる。',
        },
        mechanism: {
            kids: '日なたに 出ると、体の 中で 作られていくんだ',
            adult: '皮膚での合成後、肝臓・腎臓で活性型になり、カルシウム吸収や免疫を調整する',
        },
        personality: {
            trait: '日なたが大好きで面倒見がよい。冬はちょっと元気がなくなる',
            tone: 'あかるい',
            catchphrase: 'お日さま、あびようね',
        },
        lifestyle: [
            { message: '適度に日光を浴び、魚やきのこを食べるとたまりやすい', direction: 'good' },
            { message: '日光をほとんど浴びない生活が続くと不足しやすい', direction: 'bad' },
        ],
        relations: [
            { targetId: 'white-blood-cell', type: 'partner', basis: '免疫のはたらきを整える手助けをする' },
        ],
        learnMore: [
            { label: '日光', href: '/sunlight' },
            { label: '栄養素', href: '/nutrients' },
            { label: 'サプリメント', href: '/supplements' },
        ],
        art: { image: null, placeholder: true },
        sources: ['ビタミンDの皮膚合成・カルシウム/免疫調整：総説レベルの記述、要一次文献の裏取り'],
    },
];

// ── アクセサ ──────────────────────────────
export const charactersByNo = [...characters].sort((a, b) => a.no - b.no);

export function getCharacterById(id: string): Character | undefined {
    return characters.find((c) => c.id === id);
}

/** 図鑑番号の表示形（No.001） */
export function dexNo(no: number): string {
    return `No.${String(no).padStart(3, '0')}`;
}
