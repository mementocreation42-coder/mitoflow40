// メール本文のプレビュー（受信者から見える見た目を確認するためのページ）
// /check/email-preview でアクセス

export const dynamic = 'force-static';

const mock = {
    email: 'sample@example.com',
    archetypeName: '思考オーバーヒート',
    archetypeCatch: '頭は冴えてるけど、休まらない。',
    total: 59,
    axisScores: { energy: 62, mental: 78, recovery: 42, flex: 55 },
    personalAnalysis: 'あなたは「思考オーバーヒート型」。脳のクリアさ78点は同世代でもかなり上位、知的アウトプットが活発な状態が見えます。一方で回復力42点は低めで、頭の冴えに対して身体側の休養が追いついていない可能性があります。\n\nカフェイン依存と夜更かし傾向も加わり、ミトコンドリアが脳の需要に応え続けて疲弊しているサインかもしれません。一度立ち止まって、回復モードを意識的に作る時期です。',
    personalActions: [
        '就寝1時間前にスクリーンを切り、深呼吸ルーチンを5分入れる',
        '日中に「何もしない15分」を予定にブロックする',
        'L-テアニン200mg・グリシン3gで副交感優位を補助する',
    ],
};

function escapeHtml(s: string): string {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

function buildHtml(b: typeof mock): string {
    const actions = b.personalActions.map((a, i) => `<li><strong>0${i + 1}.</strong> ${escapeHtml(a)}</li>`).join('');
    return `<!DOCTYPE html>
<html><body style="font-family: -apple-system, 'Hiragino Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1A1A1A; line-height: 1.7;">
  <div style="border-bottom: 2px solid #1A1A1A; padding-bottom: 12px; margin-bottom: 20px;">
    <p style="font-size: 11px; letter-spacing: 0.2em; color: #FF9855; font-weight: bold; margin: 0 0 4px;">MITOFLOW40 / SELF-CHECK RESULT</p>
    <h1 style="font-size: 22px; margin: 0;">あなたのミトコンドリア・セルフチェック結果</h1>
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
  <div style="margin-bottom: 20px;"><h3 style="font-size: 14px; margin: 0 0 8px;">AI解析</h3><p style="font-size: 13px; white-space: pre-wrap;">${escapeHtml(b.personalAnalysis)}</p></div>
  <div style="margin-bottom: 20px;"><h3 style="font-size: 14px; margin: 0 0 8px;">あなたの3つの一歩</h3><ul style="font-size: 13px; padding-left: 20px;">${actions}</ul></div>
  <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #EEE; font-size: 12px; color: #4A4A4A;">
    <p>もっと深く読み解きたい方は、血液検査＆Apple Watchデータを統合したフル解析サービスをご検討ください。</p>
    <p><a href="https://mitoflow40.com/sample" style="color: #FF9855; font-weight: bold;">解析サンプルを見る →</a></p>
  </div>
  <div style="margin-top: 24px; font-size: 11px; color: #999; text-align: center;">
    MitoFlow40 — May the Mito-Force be with you.
  </div>
</body></html>`;
}

export default function EmailPreviewPage() {
    const html = buildHtml(mock);
    return (
        <div style={{ background: '#F0F0F0', minHeight: '100vh', padding: '32px 16px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto 16px', fontFamily: "'Space Grotesk', sans-serif" }}>
                <p style={{ fontSize: 11, letterSpacing: '0.2em', fontWeight: 700, color: '#FF9855' }}>EMAIL PREVIEW</p>
                <h1 style={{ fontSize: 20, margin: '4px 0' }}>受信者に届くメール</h1>
                <p style={{ fontSize: 12, color: '#666' }}>件名: <code>【Mitoflow40】あなたのミトコンドリア・セルフチェック結果（{mock.archetypeName}）</code></p>
                <p style={{ fontSize: 12, color: '#666' }}>差出人: <code>Mitoflow40 &lt;info@mitoflow40.com&gt;</code></p>
            </div>
            <div style={{ maxWidth: 720, margin: '0 auto', background: '#FFF', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                <iframe srcDoc={html} style={{ width: '100%', height: 1100, border: 'none' }} />
            </div>
        </div>
    );
}
