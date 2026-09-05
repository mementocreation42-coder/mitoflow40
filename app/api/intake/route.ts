import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { Resend } from 'resend';
import { clientIdFromEmail, ALL_QUESTIONNAIRE_KEYS } from '@/lib/intake';
import { invalidate } from '@/lib/req-cache';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitoflow40.com';

// クライアントの健康情報受け取り口。
// - ファイル（血液検査PDF/写真・Apple Watch画像）と問診テキストを受信
// - Vercel Blob の推測不能パス（intake/<id>/…）へ保存
// - あなたへの通知メールには「誰から・いつ届いたか」だけを載せ、健康データ本体は載せない
//   （閲覧は管理者ログインの裏側にある一覧ページから行う想定）
export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_FILE_BYTES = 15 * 1024 * 1024; // 1ファイル15MBまで
const MAX_FILES = 12;
const ALLOWED_MIME = new Set([
    'application/pdf',
    'image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/heif',
]);

// 推測不能なID（保管パスの先頭）
function newSubmissionId(): string {
    return `${Date.now().toString(36)}-${crypto.randomUUID()}`;
}

function safeExt(name: string): string {
    const m = name.match(/\.([a-zA-Z0-9]{1,8})$/);
    return m ? m[1].toLowerCase() : 'bin';
}

export async function POST(req: NextRequest) {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
        console.error('[intake] BLOB_READ_WRITE_TOKEN missing');
        return NextResponse.json({ ok: false, error: 'storage not configured' }, { status: 500 });
    }

    let form: FormData;
    try {
        form = await req.formData();
    } catch {
        return NextResponse.json({ ok: false, error: 'invalid form' }, { status: 400 });
    }

    // ハニーポット（bot対策）：人間には見えない項目。埋まっていればbotとみなし、
    // 保存せず「成功」を返す（攻撃側に検知させない）
    if (String(form.get('website') || '').trim() !== '') {
        console.warn('[intake] honeypot triggered — rejected as spam');
        return NextResponse.json({ ok: true, submissionId: 'skipped' });
    }

    // 同意チェック（機微情報のため必須）
    if (form.get('consent') !== 'true') {
        return NextResponse.json({ ok: false, error: 'consent required' }, { status: 400 });
    }

    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    if (!name || !email) {
        return NextResponse.json({ ok: false, error: 'name and email required' }, { status: 400 });
    }

    // コア問診の回答を拾う（空は保存しない）
    const questionnaire: Record<string, string> = {};
    for (const key of ALL_QUESTIONNAIRE_KEYS) {
        const v = String(form.get(key) || '').trim();
        if (v) questionnaire[key] = v;
    }

    const meta = {
        name,
        email,
        age: String(form.get('age') || '').trim(),
        gender: String(form.get('gender') || '').trim(),
        complaint: String(form.get('complaint') || '').trim(),
        notes: String(form.get('notes') || '').trim(),
        questionnaire,
        submittedAt: new Date().toISOString(),
    };

    // 添付は枠ごとに受ける：血液検査（bloodFiles）／Apple Watch 等（deviceFiles）／旧フォーム互換（files）
    const groups: [string, 'blood' | 'device' | 'other'][] = [['bloodFiles', 'blood'], ['deviceFiles', 'device'], ['files', 'other']];
    const tagged = groups.flatMap(([field, kind]) =>
        form.getAll(field).filter((f): f is File => f instanceof File && f.size > 0).map((file) => ({ file, kind })));
    const files = tagged.map((t) => t.file);
    if (files.length > MAX_FILES) {
        return NextResponse.json({ ok: false, error: `ファイルは最大${MAX_FILES}件までです` }, { status: 400 });
    }
    for (const f of files) {
        if (f.size > MAX_FILE_BYTES) {
            return NextResponse.json({ ok: false, error: `「${f.name}」が大きすぎます（1ファイル15MBまで）` }, { status: 400 });
        }
        if (f.type && !ALLOWED_MIME.has(f.type)) {
            return NextResponse.json({ ok: false, error: `対応していない形式です: ${f.name}` }, { status: 400 });
        }
    }

    const submissionId = newSubmissionId();
    const basePath = `intake/${submissionId}`;

    // 整合性：ファイル保存後に submission.json が失敗したら、孤立ファイルを消す
    const stored: { name: string; url: string; size: number; type: string; kind: 'blood' | 'device' | 'other' }[] = [];
    try {
        // ファイルを保存（addRandomSuffix で URL をさらに推測困難にする）。ファイル名に種類を含める
        for (let i = 0; i < tagged.length; i++) {
            const { file: f, kind } = tagged[i];
            const blob = await put(`${basePath}/${kind}-${i + 1}.${safeExt(f.name)}`, f, {
                access: 'public',
                token,
                addRandomSuffix: true,
                contentType: f.type || 'application/octet-stream',
            });
            stored.push({ name: f.name, url: blob.url, size: f.size, type: f.type, kind });
        }

        // 問診・メタ情報を submission.json として保存（健康データ本体はここに集約）
        const record = { submissionId, ...meta, files: stored };
        invalidate('intake');
        await put(`${basePath}/submission.json`, JSON.stringify(record, null, 2), {
            access: 'public',
            token,
            addRandomSuffix: true,
            contentType: 'application/json',
        });

        // 通知メール：本文には健康データを載せず「誰から・いつ・件数・ID」だけ
        const resendKey = process.env.RESEND_API_KEY;
        if (resendKey) {
            try {
                const resend = new Resend(resendKey);
                await resend.emails.send({
                    from: 'Mitoflow40 <info@mitoflow40.com>',
                    to: process.env.INTAKE_NOTIFY_EMAIL || process.env.CONTACT_EMAIL || 'info@mitoflow40.com',
                    subject: `【Mitoflow40】カウンセリング票が届きました（${name} 様）`,
                    html: `
                        <h2>カウンセリング票が届きました</h2>
                        <p><strong>お名前:</strong> ${name}</p>
                        <p><strong>連絡先:</strong> ${email}</p>
                        <p><strong>添付ファイル:</strong> ${stored.length} 件（血液検査 ${stored.filter((x) => x.kind === 'blood').length}・ウェアラブル ${stored.filter((x) => x.kind === 'device').length}）</p>
                        <p><strong>受付日時:</strong> ${new Date(meta.submittedAt).toLocaleString('ja-JP')}</p>
                        <p><strong>受付ID:</strong> ${submissionId}</p>
                        <hr>
                        <p style="color:#888;font-size:12px">内容（血液データ・問診・画像）は本メールには含めていません。管理画面のクライアント一覧からご確認ください。</p>
                    `,
                    replyTo: email,
                });
            } catch (e) {
                // メール失敗は致命傷にしない（データは保存済み）
                console.error('[intake] notify email failed:', e);
            }
        } else {
            console.warn('[intake] RESEND_API_KEY missing — notification email skipped. submissionId:', submissionId);
        }

        // クライアント本人への受付確認メール（マイページのリンク付き）。RESEND未設定ならスキップ。
        const clientId = clientIdFromEmail(email);
        if (resendKey && process.env.INTAKE_CLIENT_EMAIL !== 'off') {
            try {
                const resend = new Resend(resendKey);
                const myUrl = `${SITE_URL}/counseling-sheet/my/${clientId}`;
                await resend.emails.send({
                    from: 'Mitoflow40 <info@mitoflow40.com>',
                    to: email,
                    subject: '【Mitoflow40】カウンセリング票を受け付けました',
                    html: `
                        <p>${name} 様</p>
                        <p>カウンセリング票を受け付けました。ありがとうございます。</p>
                        <p>以下はあなた専用のマイページです。登録内容の確認や、情報の追加ができます。<br>
                        <a href="${myUrl}">${myUrl}</a></p>
                        <p style="color:#888;font-size:12px">このURLはあなた専用です。第三者に共有しないでください。心当たりがない場合はこのメールを破棄してください。</p>
                    `,
                });
            } catch (e) {
                console.error('[intake] client confirmation email failed:', e);
            }
        }

        return NextResponse.json({ ok: true, submissionId, fileCount: stored.length, clientId });
    } catch (e) {
        console.error('[intake] error — cleaning up partial files:', e);
        // 孤立ファイルを削除（部分書き込み対策）
        for (const s of stored) {
            try { await del(s.url, { token }); } catch { /* best effort */ }
        }
        return NextResponse.json({ ok: false, error: 'save failed' }, { status: 500 });
    }
}
