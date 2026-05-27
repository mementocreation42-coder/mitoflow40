import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

type RequestBody = {
    email: string;
    newsletter: boolean;
    archetypeName: string;
    archetypeCatch: string;
    total: number;
    axisScores: { energy: number; mental: number; recovery: number; flex: number };
    personalAnalysis?: string;
    personalActions?: string[];
};

export async function POST(req: Request) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ ok: false, error: 'mail not configured' }, { status: 500 });
    }

    try {
        const body = (await req.json()) as RequestBody;
        if (!body.email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });

        const resend = new Resend(apiKey);

        // ユーザーへ結果メール送信
        const html = buildResultEmailHtml(body);
        await resend.emails.send({
            from: 'Mitoflow40 <info@mitoflow40.com>',
            to: body.email,
            subject: `【Mitoflow40】あなたのミトコンドリア・セルフチェック結果（${body.archetypeName}）`,
            html,
        });

        // ニュースレター登録が選択されていれば、管理者宛に通知（後でリスト管理）
        if (body.newsletter) {
            await resend.emails.send({
                from: 'Mitoflow40 <info@mitoflow40.com>',
                to: process.env.CONTACT_EMAIL || 'info@mitoflow40.com',
                subject: `【SAL Letter登録】${body.email}`,
                html: `<p>セルフチェック経由でニュースレター登録希望:</p><p><strong>${body.email}</strong></p><p>Archetype: ${body.archetypeName} / Total: ${body.total}</p>`,
                replyTo: body.email,
            });
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error('[api/check/email] error:', e);
        return NextResponse.json({ ok: false, error: 'send failed' }, { status: 500 });
    }
}

function buildResultEmailHtml(b: RequestBody): string {
    const actions = (b.personalActions || []).map((a, i) => `<li><strong>0${i + 1}.</strong> ${escapeHtml(a)}</li>`).join('');
    return `<!DOCTYPE html>
<html><body style="font-family: -apple-system, 'Hiragino Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1A1A1A; line-height: 1.7;">
  <div style="border-bottom: 2px solid #1A1A1A; padding-bottom: 12px; margin-bottom: 20px;">
    <p style="font-size: 11px; letter-spacing: 0.2em; color: #FF9855; font-weight: bold; margin: 0 0 4px;">MITOFLOW40 / SELF-CHECK RESULT</p>
    <h1 style="font-size: 22px; margin: 0 0 8px;">あなたのミトコンドリア・セルフチェック結果</h1>
    <p style="font-size: 11px; color: #4A4A4A; margin: 0;">※ この結果は12問の自覚症状から読み取れる<strong>「可能性レベルの仮説」</strong>です。確定ではなく、断定でもありません。</p>
  </div>

  <div style="background: #FFF6E5; border: 1px solid #FF9855; border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: center;">
    <p style="font-size: 11px; letter-spacing: 0.15em; color: #4A4A4A; margin: 0 0 4px;">YOUR TYPE</p>
    <h2 style="font-size: 20px; margin: 0 0 4px;">${escapeHtml(b.archetypeName)}</h2>
    <p style="font-size: 13px; color: #1A1A1A; margin: 0 0 12px; font-weight: bold;">${escapeHtml(b.archetypeCatch)}</p>
    <p style="font-size: 28px; font-weight: bold; color: #FF9855; margin: 0;">${b.total} <span style="font-size: 14px; color: #4A4A4A;">/ 100</span></p>
  </div>

  <div style="margin-bottom: 20px;">
    <h3 style="font-size: 14px; margin: 0 0 8px;">4軸スコア</h3>
    <ul style="list-style: none; padding: 0; margin: 0; font-size: 13px;">
      <li style="padding: 4px 0; border-bottom: 1px solid #EEE;">エネルギー: <strong>${b.axisScores.energy}</strong></li>
      <li style="padding: 4px 0; border-bottom: 1px solid #EEE;">脳のクリアさ: <strong>${b.axisScores.mental}</strong></li>
      <li style="padding: 4px 0; border-bottom: 1px solid #EEE;">回復力: <strong>${b.axisScores.recovery}</strong></li>
      <li style="padding: 4px 0;">代謝の柔軟性: <strong>${b.axisScores.flex}</strong></li>
    </ul>
  </div>

  ${b.personalAnalysis ? `<div style="margin-bottom: 20px;"><h3 style="font-size: 14px; margin: 0 0 8px;">AI解析</h3><p style="font-size: 13px; white-space: pre-wrap;">${escapeHtml(b.personalAnalysis)}</p></div>` : ''}
  ${actions ? `<div style="margin-bottom: 20px;"><h3 style="font-size: 14px; margin: 0 0 8px;">あなたの3つの一歩</h3><ul style="font-size: 13px; padding-left: 20px;">${actions}</ul></div>` : ''}

  <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #EEE; font-size: 12px; color: #4A4A4A;">
    <p>もっと深く読み解きたい方は、血液検査＆Apple Watchデータを統合したフル解析サービスをご検討ください。</p>
    <p><a href="https://mitoflow40.com/sample" style="color: #FF9855; font-weight: bold;">解析サンプルを見る →</a></p>
  </div>

  <div style="margin-top: 24px; font-size: 11px; color: #999; text-align: center;">
    MitoFlow40 — May the Mito-Force be with you.
  </div>
</body></html>`;
}

function escapeHtml(s: string): string {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
