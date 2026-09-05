import Stripe from 'stripe';

// Stripe クライアント（サーバー専用）。
// STRIPE_SECRET_KEY が未設定のときは null を返し、呼び出し側で「準備中」扱いにする。
let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return null;
    if (!cached) cached = new Stripe(key);
    return cached;
}

export function isStripeConfigured(): boolean {
    return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function isWebhookConfigured(): boolean {
    return Boolean(process.env.STRIPE_WEBHOOK_SECRET);
}

// テストモードのキーか（管理画面のバッジ表示用）
export function isStripeTestMode(): boolean {
    return (process.env.STRIPE_SECRET_KEY || '').startsWith('sk_test_');
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitoflow40.com';
