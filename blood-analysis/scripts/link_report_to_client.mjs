// 公開したレポートのトークンを、Mitoflow40 顧客管理のクライアントに自動で紐付ける。
//   node scripts/link_report_to_client.mjs <氏名_日付> <client_token> [analyst_token] [--dry-run]
//   紐付けは履歴に「追加」される（継続の顧客は解析が積み上がる）。ラベルは <氏名_日付> の日付から作る
//
// 仕組み：
//   1. inputs/<氏名_日付>/meta.txt の「メール:」行からクライアントのメールを読む（DaVinci24 Inbox の取り込みが書く）
//   2. Mitoflow40 本体の lib/intake.ts と同じ HMAC（INTAKE_LINK_SECRET）で clientId を算出
//   3. setClientReport() で intake/_reports/<clientId>.json（Vercel Blob）に書く → マイページに「解析結果ができました」が出る
//
// 安全装置：INTAKE_LINK_SECRET が .env.local に無ければ何もしない（本番と違う鍵で計算すると別人に紐付くため）。
// publish_report.sh から呼ばれる。手動で貼る場合は /admin/clients の顧客詳細に client_token を貼ればよい。

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { register } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, '..');              // blood-analysis/
const MITOFLOW_ROOT = resolve(ROOT, '..');     // Mitoflow40/
// lib/*.ts の拡張子なし相対 import（'./req-cache' など）を Node で解決する
register(pathToFileURL(join(MITOFLOW_ROOT, '.claude/skills/davinci24/scripts/ts-hooks.mjs')).href);

const [subject, token, analystToken] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const dryRun = process.argv.includes('--dry-run');
if (!subject || !token) {
    console.error('usage: node scripts/link_report_to_client.mjs <氏名_日付> <client_token> [--dry-run]');
    process.exit(2);
}

// .env.local を読む（Blob と HMAC 鍵）。既に環境変数があればそちらを優先。
const envPath = join(MITOFLOW_ROOT, '.env.local');
if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
        if (!line.includes('=') || line.trim().startsWith('#')) continue;
        const i = line.indexOf('=');
        const k = line.slice(0, i).trim();
        const v = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
        process.env[k] ??= v;
    }
}

if (!process.env.INTAKE_LINK_SECRET) {
    console.log('⏭  自動紐付けをスキップ：.env.local に INTAKE_LINK_SECRET がありません。');
    console.log('   本番（Vercel）と同じ値を .env.local に入れると、次回から自動で顧客に紐付きます。');
    console.log(`   いまは /admin/clients の顧客詳細に client トークン ${token} を貼ってください。`);
    process.exit(0);
}
if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.log('⏭  自動紐付けをスキップ：BLOB_READ_WRITE_TOKEN がありません。');
    process.exit(0);
}

// メールは inputs/<subject>/meta.txt（DaVinci24 経由で来た場合はそこにも同じ meta.txt がある）
const candidates = [
    join(ROOT, 'inputs', subject, 'meta.txt'),
    join(MITOFLOW_ROOT, '.claude', 'skills', 'davinci24', 'inputs', subject, 'meta.txt'),
];
let email = '';
for (const p of candidates) {
    if (!existsSync(p)) continue;
    const m = readFileSync(p, 'utf8').match(/^メール[:：]\s*(\S+@\S+)/m);
    if (m) { email = m[1].trim().toLowerCase(); break; }
}
if (!email) {
    console.log('⏭  自動紐付けをスキップ：meta.txt に「メール:」がありません（サイト提出から取り込んだフォルダには自動で入ります）。');
    console.log(`   /admin/clients の顧客詳細に client トークン ${token} を貼ってください。`);
    process.exit(0);
}

const intake = await import(join(MITOFLOW_ROOT, 'lib', 'intake.ts'));
const clientId = intake.clientIdFromEmail(email);
const client = await intake.getClient(clientId);
if (!client) {
    console.log(`⏭  自動紐付けをスキップ：${email} のカウンセリング票がサイトに見つかりません（未提出、または本番と鍵が違う）。`);
    console.log(`   /admin/clients で該当クライアントを開き、client トークン ${token} を貼ってください。`);
    process.exit(0);
}

const myPage = `https://mitoflow40.com/counseling-sheet/my/${clientId}`;
if (dryRun) {
    console.log(`(dry-run) ${client.name} <${email}> → clientId ${clientId} に token ${token} を紐付けます。マイページ: ${myPage}`);
    process.exit(0);
}
const d = subject.match(/(\d{4})(\d{2})(\d{2})$/);
const label = d ? `${d[1]}-${d[2]}-${d[3]} の解析` : undefined;
await intake.setClientReport(clientId, token, { label, analystToken: analystToken || undefined });
console.log(`🔗 顧客管理に紐付けました（履歴に追加）：${client.name} <${email}>${label ? ` ／ ${label}` : ''}`);
console.log(`   マイページ: ${myPage}（「解析結果ができました」カードが表示されます）`);
console.log(`   管理画面:   https://mitoflow40.com/admin/clients/client/${clientId}`);
