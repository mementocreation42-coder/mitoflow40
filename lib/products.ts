// ── 販売プランの単一定義 ─────────────────────────────────────────
// 価格・プラン名・内容はここだけを編集する。
// /plans（料金ページ）・/api/checkout（決済開始）・Stripe への商品同期・
// 管理画面・マイページの表示が、すべてこの配列を参照する。
//
// priceJpy が 0 のプランは「準備中」として表示され、購入ボタンは押せない。
// stripeLookupKey は Stripe 上の Price を一意に引くためのキー。
// 価格を変更するときは lookupKey の末尾バージョン（_v1 → _v2）を上げる。
// （Stripe の Price は作成後に金額を変更できないため、新しい Price を作って切り替える）

export type PlanKind = 'one_time' | 'subscription';

export interface Plan {
    id: string;                 // 内部ID（URL・metadata に使う。英数字のみ）
    kind: PlanKind;
    name: string;               // 表示名
    en: string;                 // 英語ラベル（見出しの小文字）
    tagline: string;            // 1行の説明
    priceJpy: number;           // 税込価格（円）。0 = 未設定（準備中）
    interval?: 'month' | 'year';// subscription のみ
    features: string[];         // 含まれるもの
    note?: string;              // 補足（納期・条件など）
    minMonths?: number;         // 最低契約期間（月）。表示と規約上の明記に使う（Stripe 側では強制しない）
    sampleUrl?: string;         // サンプルレポートなどへのリンク
    stripeLookupKey: string;    // Stripe Price の lookup_key
    highlight?: boolean;        // 料金ページで強調
}

export const PLANS: Plan[] = [
    {
        id: 'mitoflow',
        kind: 'subscription',
        name: 'ミトフロープラン',
        en: 'MITOFLOW PLAN',
        tagline: '血液検査解析をもとに、月1〜2回のセッションで健康戦略を実行・調整していく継続プラン',
        priceJpy: 9900,
        interval: 'month',
        features: [
            '月1-2回のセッション',
            '血液検査解析から考えられる健康戦略を立案',
            '状況に応じた柔軟な対応',
        ],
        note: 'ミニマム3ヶ月から（血液検査解析付き）。月額・自動更新。お支払い情報の変更・解約はマイページから行えます。',
        minMonths: 3,
        stripeLookupKey: 'mf40_mitoflow_monthly_v1',
        highlight: true,
    },
    {
        id: 'analysis',
        kind: 'one_time',
        name: '血液検査解析プラン',
        en: 'BLOOD ANALYSIS',
        tagline: '健康診断・血液検査の結果を、ミトコンドリア・細胞の視点で読み解く1回完結のプラン',
        priceJpy: 19800,
        features: [
            '血液検査解析から考えられる健康戦略を立案',
            '最適な戦略アドバイスデータを共有',
            '一回のセッション',
        ],
        note: 'お申し込み後、カウンセリング票（問診・血液検査の結果）をご提出ください。解析レポートはマイページでご覧いただけます。',
        sampleUrl: '/r/SbCtC5JII0uqihoUR4Bf44l',
        stripeLookupKey: 'mf40_analysis_v1',
    },
];

export function getPlan(id: string): Plan | undefined {
    return PLANS.find((p) => p.id === id);
}

export function getPlanByLookupKey(key: string): Plan | undefined {
    return PLANS.find((p) => p.stripeLookupKey === key);
}

export function isPlanPurchasable(plan: Plan): boolean {
    return plan.priceJpy > 0;
}

export function formatJpy(amount: number): string {
    return `¥${amount.toLocaleString('ja-JP')}`;
}

export function intervalLabel(plan: Plan): string {
    if (plan.kind !== 'subscription') return '';
    return plan.interval === 'year' ? '／年' : '／月';
}
