import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: '全ての項目を入力してください' },
                { status: 400 }
            );
        }

        // Send email
        const { data, error } = await resend.emails.send({
            from: 'MitoFlow40 <onboarding@resend.dev>', // Change to your verified domain
            to: process.env.CONTACT_EMAIL || 'your-email@example.com',
            subject: `【MitoFlow40】お問い合わせ: ${name}様より`,
            html: `
        <h2>MitoFlow40 お問い合わせ</h2>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>メッセージ:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
            replyTo: email,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'メール送信に失敗しました' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'サーバーエラーが発生しました' },
            { status: 500 }
        );
    }
}
