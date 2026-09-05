import { NextRequest, NextResponse } from 'next/server';
import { requestSubscription, isValidEmail, normalizeEmail, isNewsletterConfigured } from '@/lib/newsletter';

// ニュースレター登録の受付。台帳（Blob）に記録し、Resend があれば確認メールを送る（ダブルオプトイン）。
// Resend 未設定でもリスト収集は動く（その場で登録完了）。
// 既存購読者かどうかに関わらず「受け付けました」系の応答にする（アドレスの存在確認に使われないように）。
export const runtime = 'nodejs';

const SOURCES = new Set(['newsletter-page', 'journal', 'check', 'footer', 'library', 'other']);

export async function POST(req: NextRequest) {
    if (!isNewsletterConfigured().blob) {
        return NextResponse.json({ ok: false, error: 'ニュースレターは現在準備中です' }, { status: 503 });
    }
    let body: { email?: string; source?: string; website?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ ok: false, error: 'invalid body' }, { status: 400 });
    }
    // ハニーポット（人間には見えない項目が埋まっていれば bot）
    if (body.website) return NextResponse.json({ ok: true });

    const email = normalizeEmail(String(body.email || ''));
    if (!isValidEmail(email)) return NextResponse.json({ ok: false, error: 'メールアドレスの形式を確認してください' }, { status: 400 });
    const source = SOURCES.has(String(body.source)) ? String(body.source) : 'other';

    try {
        const mode = await requestSubscription(email, source);
        // already（登録済み）は新規と同じ見せ方にする（存在確認に使わせない）
        const shown = mode === 'already' ? (isNewsletterConfigured().resend ? 'double' : 'single') : mode;
        return NextResponse.json({ ok: true, mode: shown });
    } catch (e) {
        console.error('[newsletter/subscribe] failed:', e);
        return NextResponse.json({ ok: false, error: '確認メールを送れませんでした。時間をおいて再度お試しください' }, { status: 500 });
    }
}
