// ── セルフチェック（/check）の設問と、回答から読み取れる「可能性」 ─────────────
// クライアント（結果画面）とサーバー（AI 解析）の両方から使う。React に依存しない。

export type Axis = 'energy' | 'mental' | 'recovery' | 'flex';

// invert: true の場合「あてはまる=活性度低い」のサイン。スコアは 6 - 回答 で反転。
export type Question = { id: string; axis: Axis; text: string; labelLow: string; labelHigh: string; invert?: boolean };

export const QUESTIONS: Question[] = [
    // Energy
    { id: 'e1', axis: 'energy', text: '朝、目覚めて10分以内に体が動き出せる', labelLow: 'なかなか動けない', labelHigh: 'すぐ動ける' },
    { id: 'e2', axis: 'energy', text: '午前中、コーヒーやエナジードリンクがないと頭が回らない', labelLow: '頼らない', labelHigh: '毎日頼る', invert: true },
    { id: 'e3', axis: 'energy', text: '何もしていない午後、体に「重さ」を感じない', labelLow: 'いつも重い', labelHigh: '感じない' },
    // Mental Clarity
    { id: 'm1', axis: 'mental', text: '集中したい仕事を90分続けられる', labelLow: '続かない', labelHigh: '続く' },
    { id: 'm2', axis: 'mental', text: '名前や言葉が「のど元まで出かかる」もどかしさが、週に何度かある', labelLow: 'ほぼない', labelHigh: '頻繁にある', invert: true },
    { id: 'm3', axis: 'mental', text: '夜遅い時間でも頭が冴えて寝つけないことがある', labelLow: 'ない', labelHigh: 'よくある', invert: true },
    // Recovery
    { id: 'r1', axis: 'recovery', text: '軽い運動の翌日、筋肉痛や疲労がほとんど残らない', labelLow: 'いつも残る', labelHigh: '残らない' },
    { id: 'r2', axis: 'recovery', text: '風邪をひくと長引く、または最近よく体調を崩す', labelLow: 'ない', labelHigh: 'よくある', invert: true },
    { id: 'r3', axis: 'recovery', text: '寝ても疲れが取れた感覚がない朝が多い', labelLow: 'ほぼない', labelHigh: '頻繁', invert: true },
    // Metabolic Flexibility
    { id: 'f1', axis: 'flex', text: '食事を1食抜いても、頭と体が動き続ける', labelLow: 'すぐフラつく', labelHigh: '平気' },
    { id: 'f2', axis: 'flex', text: '甘いもの・パン・米への強い渇望が、週に何度かある', labelLow: 'ない', labelHigh: 'よくある', invert: true },
    { id: 'f3', axis: 'flex', text: '冷たい環境でも体の芯から冷えにくい', labelLow: 'すぐ冷える', labelHigh: '冷えにくい' },
];

/** 回答（1〜5）を「サイン」の言葉にする。AI に渡すときと、可能性カードの根拠表示に使う */
export const SIGN_PHRASES: Record<string, { low: string; high: string }> = {
    e1: { low: '朝なかなか体が動かない', high: '朝すぐ動ける' },
    e2: { low: 'カフェインに頼らない', high: '午前中はカフェインが無いと頭が回らない' },
    e3: { low: '午後、体が重い', high: '午後も体が軽い' },
    m1: { low: '集中が90分続かない', high: '90分集中できる' },
    m2: { low: '言葉が出てこないことはほぼない', high: '言葉が「のど元まで出かかる」ことが頻繁' },
    m3: { low: '夜は自然に眠くなる', high: '夜遅くまで頭が冴えて寝つけない' },
    r1: { low: '軽い運動でも翌日に疲労や筋肉痛が残る', high: '運動の翌日に疲労が残らない' },
    r2: { low: '風邪はひいても長引かない', high: '風邪が長引く・よく体調を崩す' },
    r3: { low: '寝れば疲れが取れる', high: '寝ても疲れが取れない朝が多い' },
    f1: { low: '1食抜くとフラつく', high: '1食抜いても平気' },
    f2: { low: '甘いもの・パン・米の渇望はない', high: '甘いもの・パン・米への強い渇望が週に何度もある' },
    f3: { low: '体の芯からすぐ冷える', high: '冷えにくい' },
};

export type AnswerLine = { id: string; axis: Axis; text: string; value: number; sign: string };

/** 回答を「質問・数値・サインの言葉」の並びにする（AI へ渡す形） */
export function describeAnswers(answers: Record<string, number>): AnswerLine[] {
    return QUESTIONS.filter((q) => answers[q.id]).map((q) => {
        const v = answers[q.id];
        const ph = SIGN_PHRASES[q.id];
        const sign = v >= 4 ? ph.high : v <= 2 ? ph.low : `${q.labelLow}と${q.labelHigh}の中間`;
        return { id: q.id, axis: q.axis, text: q.text, value: v, sign };
    });
}

// ── 読み取れる可能性（ルールベース） ───────────────────────────────
// 「診断」ではなく、ライブラリのページに橋をかけるための仮説。根拠（ground）はライブラリの記述に沿う。

export type Hypothesis = {
    id: string;
    title: string;
    confidence: 'high' | 'mid';
    /** どの回答から読み取ったか（サインの言葉） */
    why: string[];
    /** ライブラリの要点（AI の根拠、カードの一言） */
    ground: string;
    pages: { href: string; label: string }[];
};

export type HypothesisProfile = { gender: 'male' | 'female' | 'other' | ''; bmiBand: 'low' | 'normal' | 'over' | 'high' | 'unknown'; age: number };

export function deriveHypotheses(a: Record<string, number>, p: HypothesisProfile): Hypothesis[] {
    const v = (id: string) => a[id] || 3;
    const hi = (id: string) => v(id) >= 4;
    const lo = (id: string) => v(id) <= 2;
    const sign = (id: string) => (v(id) >= 4 ? SIGN_PHRASES[id].high : SIGN_PHRASES[id].low);
    const out: Hypothesis[] = [];

    // 血糖の波：渇望 × 1食抜けない × 午後の重さ
    {
        const hits = [hi('f2') && 'f2', lo('f1') && 'f1', lo('e3') && 'e3'].filter(Boolean) as string[];
        if (hits.length >= 2 && hi('f2')) {
            out.push({
                id: 'blood-sugar', title: '血糖の波（食後の眠気・渇望）の可能性', confidence: hits.length === 3 ? 'high' : 'mid',
                why: hits.map(sign),
                ground: '精製された糖質で血糖が急に上がると、インスリンが多く出て急降下が起きる。甘いものへの渇望、午後のだるさ、食事を抜くと動けない、が典型のサイン。空腹時インスリンや HbA1c、CGM で客観的に見える。',
                pages: [{ href: '/blood-sugar', label: '血糖コントロール' }, { href: '/symptoms/post-meal-sleepiness', label: '食後の眠気' }, { href: '/insulin-resistance', label: 'インスリン抵抗性' }, { href: '/cgm', label: '血糖モニタリング' }],
            });
        }
    }

    // 鉄欠乏（隠れ貧血）：冷え × 疲れ × 回復しない（女性はサインが揃いやすい）
    {
        const hits = [lo('f3') && 'f3', (lo('e1') || lo('e3')) && (lo('e1') ? 'e1' : 'e3'), hi('r3') && 'r3', lo('m1') && 'm1'].filter(Boolean) as string[];
        const need = p.gender === 'female' ? 2 : 3;
        if (lo('f3') && hits.length >= need) {
            out.push({
                id: 'iron', title: '鉄欠乏（隠れ貧血）の可能性', confidence: hits.length >= 3 ? 'high' : 'mid',
                why: hits.map(sign),
                ground: '貧血と言われる前に、貯蔵鉄（フェリチン）が先に減り、ATP を作る現場が静かに減速する。寝ても抜けない疲れ、手足の冷え、集中が続かない、気分が沈む、が典型。ヘモグロビンが基準値内でもフェリチンは別に見る。',
                pages: [{ href: '/conditions/iron-deficiency', label: '鉄欠乏（隠れ貧血）' }, { href: '/biomarkers/ferritin', label: 'フェリチン' }, { href: '/nutrients/iron', label: '鉄' }],
            });
        }
    }

    // 体内時計のズレ：夜冴える × 朝動けない
    if (hi('m3') && lo('e1')) {
        out.push({
            id: 'circadian', title: '体内時計のズレ（夜型化）の可能性', confidence: hi('r3') ? 'high' : 'mid',
            why: [sign('m3'), sign('e1'), ...(hi('r3') ? [sign('r3')] : [])],
            ground: '夜になっても交感神経が高いままだとメラトニンが出にくく、寝つきが遅れ、朝の立ち上がりも遅れる。朝の光、夜の光と画面、カフェインの時間（半減期は約5時間）が鍵。',
            pages: [{ href: '/circadian-rhythm', label: 'サーカディアンリズム' }, { href: '/sleep', label: '睡眠' }, { href: '/sunlight', label: '日光と健康' }, { href: '/symptoms/poor-sleep', label: '寝つきが悪い' }],
        });
    } else if (hi('r3') && lo('e1')) {
        // 眠りの質：寝ても取れない × 朝動けない
        out.push({
            id: 'sleep', title: '眠りの質の低下（回復の土台）の可能性', confidence: 'mid',
            why: [sign('r3'), sign('e1')],
            ground: '睡眠は修復と再生の時間。深い眠りが足りないと、寝ても疲れが抜けず、回復が遅れる。時間だけでなく、深さと規則性を見る。',
            pages: [{ href: '/sleep', label: '睡眠' }, { href: '/symptoms/poor-sleep', label: '寝つきが悪い・眠りが浅い' }, { href: '/wearables', label: 'ウェアラブルで眠りを測る' }],
        });
    }

    // カフェインで疲れを隠している：依存 × 朝動けない or 午後重い
    if (hi('e2') && (lo('e1') || lo('e3') || hi('r3'))) {
        out.push({
            id: 'caffeine', title: 'カフェインで疲れを隠している可能性', confidence: hi('m3') ? 'high' : 'mid',
            why: [sign('e2'), ...(lo('e1') ? [sign('e1')] : []), ...(lo('e3') ? [sign('e3')] : []), ...(hi('m3') ? [sign('m3')] : [])],
            ground: 'カフェインは眠気の物質（アデノシン）の受容体を塞いで眠気を隠すだけで、エネルギーは作らない。半減期は約5時間で、午後の一杯が夜の眠りに響き、翌朝またカフェインが必要になる循環ができやすい。',
            pages: [{ href: '/caffeine', label: 'カフェインとの付き合い方' }, { href: '/stimulants', label: '嗜好品と体' }, { href: '/symptoms/fatigue', label: '疲れやすい' }],
        });
    }

    // 慢性炎症・回復不足：筋肉痛が残る × 風邪が長引く
    if (lo('r1') && hi('r2')) {
        out.push({
            id: 'inflammation', title: '慢性炎症・回復不足の可能性', confidence: hi('r3') ? 'high' : 'mid',
            why: [sign('r1'), sign('r2'), ...(hi('r3') ? [sign('r3')] : [])],
            ground: '自覚のない弱い炎症がくすぶり続けると、修復が後回しになり、風邪が長引く・運動の疲れが残る、が出やすい。hs-CRP で客観的に測れる。睡眠、腸、油の質、内臓脂肪が火種になりやすい。',
            pages: [{ href: '/inflammation', label: '慢性炎症' }, { href: '/biomarkers/hscrp', label: 'hs-CRP' }, { href: '/oxidative-stress', label: '酸化ストレス' }],
        });
    }

    // 代謝の低下（甲状腺など）：冷え × 午後重い × （体重増 or 集中低下）× 寝ても取れない
    if (lo('f3') && lo('e3') && hi('r3') && (p.bmiBand === 'over' || p.bmiBand === 'high' || lo('m1'))) {
        out.push({
            id: 'thyroid', title: '代謝の低下（甲状腺など）の可能性', confidence: 'mid',
            why: [sign('f3'), sign('e3'), sign('r3'), ...(lo('m1') ? [sign('m1')] : [])],
            ground: '甲状腺ホルモンは全身の代謝速度のアクセル。不足すると冷え・むくみ・疲れ・体重増加・気分の落ち込みが出る。TSH・FT3・FT4 で評価でき、材料のヨウ素・セレン・亜鉛・鉄も関わる。',
            pages: [{ href: '/organs/thyroid', label: '甲状腺' }, { href: '/symptoms/cold', label: '冷え・寒がり' }, { href: '/biomarkers/tsh', label: 'TSH' }],
        });
    }

    // 脳のエネルギー不足：集中が続かない × 言葉が出ない
    if (lo('m1') && hi('m2')) {
        out.push({
            id: 'brain-fog', title: '脳のエネルギー不足（ブレインフォグ）の可能性', confidence: out.some((h) => h.id === 'blood-sugar' || h.id === 'iron') ? 'high' : 'mid',
            why: [sign('m1'), sign('m2')],
            ground: '脳はもっともエネルギーを使う臓器。血糖の乱高下、弱い炎症、B群・鉄・オメガ3の不足、腸内環境、睡眠の影響を強く受ける。単独の症状より、他のサインとの組み合わせで読む。',
            pages: [{ href: '/symptoms/brain-fog', label: 'ブレインフォグ' }, { href: '/gut-brain', label: '腸脳相関' }, { href: '/biomarkers/vitamin-b12-serum', label: 'ビタミンB12' }],
        });
    }

    // 順序：確度の高いものを先に、最大 4 つ
    return out.sort((x, y) => (x.confidence === y.confidence ? 0 : x.confidence === 'high' ? -1 : 1)).slice(0, 4);
}
