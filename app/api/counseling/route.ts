import { NextResponse } from 'next/server';

// MVP: 受信したデータをサーバーログに出すだけ。
// 後で Notion 保存 + Resend 確認メール送信に拡張する。

export async function POST(req: Request) {
    try {
        const data = await req.json();
        if (!data?.name || !data?.email || !data?.complaint) {
            return NextResponse.json({ ok: false, error: 'required fields missing' }, { status: 400 });
        }
        console.log('[counseling] received:', {
            at: new Date().toISOString(),
            name: data.name,
            email: data.email,
            age: data.age,
            gender: data.gender,
            complaint: data.complaint?.slice(0, 80),
            symptomsCount: Object.keys(data.symptoms || {}).length,
        });
        // TODO: Notion DBへpush
        // TODO: Resendで確認メール
        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error('[counseling] error:', e);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
