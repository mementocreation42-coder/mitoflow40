// DaVinci24 Inbox — ローカル専用の受付ページ（依存ゼロ・Node単体）
//   node scripts/inbox.mjs   →  http://localhost:2424
// ブラウザから血液票/デバイス/カウンセリング/感覚メモを投げると inputs/<氏名_日付>/ に保存する。
// 保存するだけ。読み取り・判定は Claude Code（「DaVinci24 で ◯◯ を読んで」）が行う。
//
// できること
//   - 受付フォーム（ドラッグ＆ドロップ / ⌘V 貼り付け先の切替 / 下書き自動保存 / ⌘Enter で保存）
//   - 既存フォルダへの追記（ファイルは連番を継続、感覚メモは日時付きで追記。上書きしない）
//   - HEIC → JPEG 自動変換（macOS の sips。Claude が読める形式にそろえる）
//   - 受付一覧：各フォルダの中身と状態（未読取 / 読取済 🔴🟡🟢 / 解析引継ぎ済 / レポート生成済）

import { register } from 'node:module';
register('./ts-hooks.mjs', import.meta.url); // lib/*.ts の拡張子なし相対 import を Node で解決する
import { createServer } from 'node:http';
import { mkdirSync, writeFileSync, readdirSync, existsSync, readFileSync, statSync, appendFileSync, unlinkSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, execFile } from 'node:child_process';
import { homedir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const INPUTS = join(ROOT, 'inputs');
const OUTPUTS = join(ROOT, 'outputs');
const ANALYSIS = join(ROOT, '..', 'blood-analysis');
const PORT = 2424;
const MAX_BODY = 300 * 1024 * 1024;

const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/heic': 'heic', 'image/heif': 'heic', 'application/pdf': 'pdf', 'text/csv': 'csv', 'text/plain': 'txt', 'application/vnd.ms-excel': 'csv' };
const safe = (s) => String(s ?? '').replace(/[\/\\:*?"<>|\x00-\x1f]/g, '').trim();
const isFolderName = (s) => /^[^\/\\]+_\d{8}$/.test(s) && !s.startsWith('_') && !s.startsWith('.');
const json = (res, code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(obj)); };
const now = () => { const d = new Date(); const p = (n) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; };

// ── フォルダの状態を集める（一覧・詳細で共用）──
function readMeta(dir) {
    const p = join(dir, 'meta.txt');
    if (!existsSync(p)) return {};
    const meta = {};
    for (const line of readFileSync(p, 'utf8').split('\n')) {
        const m = line.match(/^([^:：]+)[:：]\s*(.*)$/);
        if (m) meta[m[1].trim()] = m[2].trim();
    }
    return meta;
}
function listFiles(dir, re) {
    return existsSync(dir) ? readdirSync(dir).filter((f) => re.test(f) && !f.startsWith('.')).sort() : [];
}
function folderInfo(folder) {
    const dir = join(INPUTS, folder);
    const out = join(OUTPUTS, folder);
    const meta = readMeta(dir);
    const blood = listFiles(dir, /^blood\d*\.(jpe?g|png|webp|pdf|heic)$/i);
    const device = listFiles(join(dir, 'device'), /\.(jpe?g|png|webp|pdf|csv|txt|heic)$/i).concat(listFiles(join(dir, 'apple_watch'), /\.(jpe?g|png|webp|pdf|csv|txt)$/i));
    const counselingFiles = listFiles(dir, /^counseling\d+\.(jpe?g|png|webp|pdf|csv|txt)$/i);
    const hasCounselingTxt = existsSync(join(dir, 'counseling.txt')) && readFileSync(join(dir, 'counseling.txt'), 'utf8').trim().length > 0;
    const hasKankaku = existsSync(join(dir, '感覚メモ.txt')) && readFileSync(join(dir, '感覚メモ.txt'), 'utf8').trim().length > 0;
    let judged = null;
    if (existsSync(join(out, 'judged.json'))) {
        try {
            const j = JSON.parse(readFileSync(join(out, 'judged.json'), 'utf8'));
            const c = { red: 0, yellow: 0, green: 0 };
            for (const r of j.rows ?? []) if (r.light && c[r.light] !== undefined) c[r.light]++;
            judged = { ...c, total: (j.rows ?? []).length, unmatched: (j.unmatched ?? []).length };
        } catch { /* 壊れていれば無視 */ }
    }
    const heic = blood.concat(device).filter((f) => /\.heic$/i.test(f)).length;
    let mtime = 0;
    try { mtime = statSync(dir).mtimeMs; } catch { /* ignore */ }
    return {
        folder, name: folder.replace(/_\d{8}$/, ''), date: folder.slice(-8), meta, mtime,
        files: { blood, device, counseling: counselingFiles, hasCounselingTxt, hasKankaku, heic },
        status: {
            read: existsSync(join(out, 'intake.md')),
            judged,
            handedOff: existsSync(join(ANALYSIS, 'inputs', folder)),
            reported: existsSync(join(ANALYSIS, 'outputs', folder, 'client.html')) || existsSync(join(ANALYSIS, 'outputs', folder, 'analyst.md')),
        },
    };
}
function listFolders() {
    if (!existsSync(INPUTS)) return [];
    return readdirSync(INPUTS)
        .filter((d) => isFolderName(d) && statSync(join(INPUTS, d)).isDirectory())
        .map(folderInfo)
        .sort((a, b) => b.mtime - a.mtime);
}
function nextIndex(dir, prefix, re) {
    const nums = listFiles(dir, re).map((f) => Number((f.match(new RegExp(`^${prefix}(\\d+)`)) || [])[1] || 0));
    return (nums.length ? Math.max(...nums) : 0) + 1;
}
// HEIC は Claude が読めないので JPEG に変換する（macOS の sips。失敗したら HEIC のまま残す）
function convertHeic(path) {
    const out = path.replace(/\.heic$/i, '.jpg');
    try {
        execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '90', path, '--out', out], { stdio: 'ignore' });
        unlinkSync(path);
        return { ok: true, out };
    } catch {
        return { ok: false, out: path };
    }
}

// ── Mitoflow40 本体との接続：サイト（/counseling-sheet）の提出を取り込む ──
// lib/intake.ts を Node の型ストリップで直接 import する（本体と同じ clientId・同じ問診ラベル）。
const MITOFLOW_ROOT = join(ROOT, '..', '..', '..');
function loadEnv() {
    const p = join(MITOFLOW_ROOT, '.env.local');
    if (!existsSync(p)) return;
    for (const line of readFileSync(p, 'utf8').split('\n')) {
        if (!line.includes('=') || line.trim().startsWith('#')) continue;
        const i = line.indexOf('=');
        process.env[line.slice(0, i).trim()] ??= line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
    }
}
let intakeMod = null;
async function intake() {
    if (intakeMod) return intakeMod;
    loadEnv();
    if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('.env.local に BLOB_READ_WRITE_TOKEN がありません（サイトの提出を読めません）');
    intakeMod = await import(join(MITOFLOW_ROOT, 'lib', 'intake.ts'));
    return intakeMod;
}
// 決済状況（orders/）。lib/orders.ts は拡張子なし import のため Node から読めないので Blob を直接読む
async function paidPlans() {
    loadEnv();
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return new Map();
    const { list } = await import('@vercel/blob');
    const out = new Map();
    let cursor;
    do {
        const page = await list({ prefix: 'orders/', token, cursor, limit: 1000 });
        for (const b of page.blobs) {
            if (!b.pathname.endsWith('.json') || b.pathname.startsWith('orders/_index/')) continue;
            try {
                const o = await (await fetch(b.url, { cache: 'no-store' })).json();
                if (o.status === 'paid' || o.status === 'active') out.set(o.clientId, o.planName);
            } catch { /* skip */ }
        }
        cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return out;
}
const ymd = (iso) => String(iso).slice(0, 10).replace(/-/g, '');
// 添付の振り分け：サイトのフォームの枠（血液検査／ウェアラブル）が付いていればそれを使う。
// 旧提出（枠なし）だけ名前から当て推量（画面で直せる）
const guessKind = (f) => (f.kind === 'blood' || f.kind === 'device') ? f.kind
    : (/watch|apple|oura|garmin|fitbit|whoop|hrv|sleep|睡眠|血圧|体組成|体重|glucose|libre|cgm|health/i.test(f.name || '') ? 'device' : 'blood');
// 取り込み済みか：inputs/ の meta.txt に同じメールがあるフォルダを探す
function importedFolders(email) {
    const e = String(email || '').toLowerCase();
    return listFolders().filter((f) => (f.meta['メール'] || '').toLowerCase() === e).map((f) => f.folder);
}
async function siteClients() {
    const m = await intake();
    const [clients, paid] = await Promise.all([m.listClients(), paidPlans().catch(() => new Map())]);
    return clients.map((c) => {
        const s = c.submissions[0];
        return {
            clientId: c.clientId, name: c.name, email: c.email, submissionCount: c.submissionCount, fileCount: c.fileCount,
            latestAt: c.latestAt, latestDate: ymd(c.latestAt), gender: s?.gender || '', age: s?.age || '', complaint: s?.complaint || '',
            paid: paid.get(c.clientId) || null, imported: importedFolders(c.email),
        };
    });
}
async function siteClient(clientId) {
    const m = await intake();
    const c = await m.getClient(clientId);
    if (!c) return null;
    const imported = importedFolders(c.email);
    // 既に取り込んだ添付の URL（各フォルダの .imported）
    const importedUrls = new Set(imported.flatMap((f) => {
        const p = join(INPUTS, f, '.imported');
        return existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean) : [];
    }));
    return {
        clientId: c.clientId, name: c.name, email: c.email, latestDate: ymd(c.latestAt), imported,
        submissions: c.submissions.map((s) => ({
            submissionId: s.submissionId, submittedAt: s.submittedAt, age: s.age, gender: s.gender, complaint: s.complaint, notes: s.notes,
            entries: m.questionnaireEntries(s.questionnaire),
            files: (s.files || []).map((f) => ({ ...f, kind: guessKind(f), imported: importedUrls.has(f.url) })),
        })),
    };
}
// 取り込み本体：サイトの提出 → inputs/<氏名_日付>/（既存フォルダには追記）
async function importFromSite(body) {
    const m = await intake();
    const clientId = String(body.clientId || '');
    if (!/^[a-f0-9]{24}$/.test(clientId)) throw new Error('clientId が不正です');
    const c = await m.getClient(clientId);
    if (!c) throw new Error('クライアントが見つかりません');
    const date = safe(body.date || '').replace(/-/g, '') || ymd(c.latestAt);
    if (!/^\d{8}$/.test(date)) throw new Error('日付は YYYY-MM-DD で');
    const name = safe(c.name) || 'no-name';
    const folder = `${name}_${date}`;
    const dir = join(INPUTS, folder);
    const existed = existsSync(dir);
    mkdirSync(join(dir, 'device'), { recursive: true });
    const latest = c.submissions[0];
    const prev = readMeta(dir);
    writeFileSync(join(dir, 'meta.txt'), [
        `氏名: ${name}`, `メール: ${c.email}`, `性別: ${latest?.gender || prev['性別'] || ''}`, `年齢: ${latest?.age || prev['年齢'] || ''}`,
        `検査日: ${date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')}`, `主訴: ${latest?.complaint || prev['主訴'] || ''}`,
        `clientId: ${c.clientId}`, `提出: ${c.submissionCount} 件（最新 ${String(c.latestAt).slice(0, 16).replace('T', ' ')}）`,
        `備考: サイト（/counseling-sheet）の提出から取り込み${existed ? `（最終追記 ${now()}）` : ''}`, '',
    ].join('\n'));
    // 問診 → counseling.txt（全提出、新しい順。DaVinci24 が reference/counseling_format.md へ正規化する）
    let counselingWritten = false;
    if (body.includeQuestionnaire !== false) {
        const parts = c.submissions.map((s, i) => {
            const lines = [`# カウンセリングシート（サイト提出 ${c.submissionCount - i} / ${String(s.submittedAt).slice(0, 16).replace('T', ' ')}）`];
            if (s.age || s.gender) lines.push(`年齢: ${s.age || ''}　性別: ${s.gender || ''}`);
            if (s.complaint) lines.push(`主訴・目的: ${s.complaint}`);
            for (const e of m.questionnaireEntries(s.questionnaire)) lines.push(`${e.label}: ${e.value}`);
            if (s.notes) lines.push(`その他: ${s.notes}`);
            return lines.join('\n');
        });
        const text = parts.join('\n\n');
        const p = join(dir, 'counseling.txt');
        if (!existsSync(p) || readFileSync(p, 'utf8') !== text + '\n') { writeFileSync(p, text + '\n'); counselingWritten = true; }
    }
    // 感覚メモ（同じ内容なら二重に足さない）
    let kankakuAdded = false;
    const memo = String(body.kankaku ?? '').trim();
    if (memo) {
        const mp = join(dir, '感覚メモ.txt');
        const cur = existsSync(mp) ? readFileSync(mp, 'utf8') : '';
        if (!cur.trim()) { writeFileSync(mp, memo + '\n'); kankakuAdded = true; }
        else if (!cur.includes(memo)) { appendFileSync(mp, `\n\n--- 追記 ${now()} ---\n${memo}\n`); kankakuAdded = true; }
    }
    // 添付をダウンロードして振り分け（連番は既存の続き）
    let bi = nextIndex(dir, 'blood', /^blood\d*\./i), di = nextIndex(join(dir, 'device'), 'device', /^device\d*\./i), ci = nextIndex(dir, 'counseling', /^counseling\d+\./i);
    let blood = 0, device = 0, coun = 0, converted = 0, heicLeft = 0, skipped = 0;
    const known = new Set(c.submissions.flatMap((s) => (s.files || []).map((f) => f.url)));
    const markPath = join(dir, '.imported');
    const already = new Set((existsSync(markPath) ? readFileSync(markPath, 'utf8').split('\n') : []).filter(Boolean));
    for (const f of Array.isArray(body.files) ? body.files : []) {
        if (!known.has(f.url)) continue;                 // サイトの添付以外の URL は受け付けない
        if (already.has(f.url)) { skipped++; continue; } // 同じ添付を二重に取り込まない
        const res = await fetch(f.url);
        if (!res.ok) throw new Error(`添付を取得できません: ${f.name}`);
        const buf = Buffer.from(await res.arrayBuffer());
        const type = (f.type && EXT[f.type]) ? f.type : ({ '.heic': 'image/heic', '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' }[extname(String(f.name || '')).toLowerCase()] || 'application/octet-stream');
        const ext = EXT[type] ?? (extname(String(f.name || '')).slice(1).toLowerCase() || 'bin');
        let path;
        if (f.kind === 'device') { device++; path = join(dir, 'device', `device${di++}.${ext}`); }
        else if (f.kind === 'counseling') { coun++; path = join(dir, `counseling${ci++}.${ext}`); }
        else { blood++; path = join(dir, `blood${bi++}.${ext}`); }
        writeFileSync(path, buf);
        if (ext === 'heic') { const r = convertHeic(path); if (r.ok) converted++; else heicLeft++; }
        appendFileSync(markPath, f.url + '\n');
    }
    return { ok: true, folder, dir, existed, blood, device, coun, converted, heicLeft, skipped, counselingWritten, kankakuAdded, info: folderInfo(folder) };
}

const server = createServer((req, res) => {
    // localhost 以外からのアクセスは受けない（DNS リバインディング対策。一覧も個人名を含むので全ルートで）
    const host = (req.headers.host || '').split(':')[0];
    if (host !== 'localhost' && host !== '127.0.0.1') { res.writeHead(403); res.end(); return; }
    const url = new URL(req.url, 'http://localhost');

    if (req.method === 'GET' && url.pathname === '/') {
        loadEnv();
        const site = (process.env.INBOX_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://mitoflow40.com').replace(/\/$/, '');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(page(site));
        return;
    }
    if (req.method === 'GET' && (url.pathname === '/list' || url.pathname === '/api/folders')) {
        try { json(res, 200, listFolders()); } catch (e) { json(res, 500, { error: e.message }); }
        return;
    }
    if (req.method === 'GET' && url.pathname === '/api/folder') {
        const folder = safe(url.searchParams.get('name'));
        if (!isFolderName(folder) || !existsSync(join(INPUTS, folder))) { json(res, 404, { error: 'not found' }); return; }
        const info = folderInfo(folder);
        const dir = join(INPUTS, folder);
        const read = (f) => (existsSync(join(dir, f)) ? readFileSync(join(dir, f), 'utf8') : '');
        json(res, 200, { ...info, kankaku: read('感覚メモ.txt'), counseling: read('counseling.txt') });
        return;
    }
    if (req.method === 'GET' && url.pathname === '/api/site/clients') {
        siteClients().then((r) => json(res, 200, r)).catch((e) => json(res, 500, { error: e.message }));
        return;
    }
    if (req.method === 'GET' && url.pathname === '/api/site/client') {
        siteClient(String(url.searchParams.get('clientId') || '')).then((r) => (r ? json(res, 200, r) : json(res, 404, { error: 'not found' }))).catch((e) => json(res, 500, { error: e.message }));
        return;
    }
    if (req.method === 'POST' && url.pathname === '/api/site/import') {
        const origin = req.headers.origin;
        if (origin && !/^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) { res.writeHead(403); res.end(); return; }
        const site = req.headers['sec-fetch-site'];
        if (site && site !== 'same-origin' && site !== 'none') { res.writeHead(403); res.end(); return; }
        let size = 0; const chunks = [];
        req.on('data', (c) => { size += c.length; if (size > 1024 * 1024) req.destroy(); else chunks.push(c); });
        req.on('end', () => {
            let body;
            try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { json(res, 400, { ok: false, error: 'invalid json' }); return; }
            importFromSite(body).then((r) => json(res, 200, r)).catch((e) => json(res, 400, { ok: false, error: e.message }));
        });
        return;
    }
    if (req.method === 'POST' && url.pathname === '/api/prep') {
        // Mac 上のパス（外付けボリューム含む）から dv.py prep で inputs/ に整える。アップロードなし・この Mac 内のコピーだけ
        const origin = req.headers.origin;
        if (origin && !/^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) { res.writeHead(403); res.end(); return; }
        const site = req.headers['sec-fetch-site'];
        if (site && site !== 'same-origin' && site !== 'none') { res.writeHead(403); res.end(); return; }
        let size = 0; const chunks = [];
        req.on('data', (c) => { size += c.length; if (size > 64 * 1024) req.destroy(); else chunks.push(c); });
        req.on('end', () => {
            let b;
            try { b = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { json(res, 400, { ok: false, error: 'invalid json' }); return; }
            const paths = String(b.path ?? '').split('\n').map((t) => t.trim().replace(/^["']|["']$/g, '').replace(/^~(?=\/|$)/, homedir())).filter(Boolean);
            if (!paths.length) { json(res, 400, { ok: false, error: 'パスを入れてください' }); return; }
            for (const q of paths) {
                if (!q.startsWith('/') || !existsSync(q)) { json(res, 400, { ok: false, error: `見つかりません: ${q}` }); return; }
            }
            const args = [join(ROOT, 'scripts', 'dv.py'), 'prep', ...paths];
            const name = safe(b.name), date = safe(b.date).replace(/-/g, ''), sex = safe(b.sex), memo = String(b.kankaku ?? '').trim();
            if (name) args.push('--name', name);
            if (/^\d{8}$/.test(date)) args.push('--date', date);
            if (sex === '男性' || sex === '女性') args.push('--sex', sex);
            if (memo) args.push('--memo', memo);
            if ([90, 180, 270].includes(Number(b.rotate))) args.push('--rotate', String(Number(b.rotate)));
            execFile('python3', args, { cwd: ROOT, timeout: 15 * 60 * 1000, maxBuffer: 16 * 1024 * 1024 }, (err, stdout, stderr) => {
                const out = String(stdout || '');
                const m = out.match(/^✅ inputs\/([^\/\n]+)\//m);
                if (err || !m) {
                    const tail = String(stderr || out || (err && err.message) || 'prep に失敗しました').trim().split('\n').slice(-6).join('\n');
                    json(res, 400, { ok: false, error: tail }); return;
                }
                const folder = m[1];
                json(res, 200, { ok: true, folder, out, info: existsSync(join(INPUTS, folder)) ? folderInfo(folder) : null });
            });
        });
        return;
    }
    if (req.method === 'POST' && url.pathname === '/save') {
        // 他サイトからの POST（CSRF/ドライブバイ書き込み）を遮断：
        // ブラウザ発のクロスオリジン要求は Origin ヘッダを必ず持つ。自ページ発以外は拒否。
        const origin = req.headers.origin;
        if (origin && !/^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) { res.writeHead(403); res.end(); return; }
        const site = req.headers['sec-fetch-site'];
        if (site && site !== 'same-origin' && site !== 'none') { res.writeHead(403); res.end(); return; }
        if (!String(req.headers['content-type'] || '').includes('application/json')) { res.writeHead(415); res.end(); return; }
        let size = 0; const chunks = [];
        req.on('data', (c) => { size += c.length; if (size > MAX_BODY) req.destroy(); else chunks.push(c); });
        req.on('end', () => {
            try {
                const b = JSON.parse(Buffer.concat(chunks).toString('utf8'));
                const name = safe(b.name); const date = safe(b.date).replace(/-/g, '');
                if (!name || !/^\d{8}$/.test(date)) throw new Error('氏名と検査日を入れてください');
                const folder = `${name}_${date}`;
                const dir = join(INPUTS, folder);
                const existed = existsSync(dir);
                mkdirSync(join(dir, 'device'), { recursive: true });

                // meta.txt は常に最新のフォームの内容で書き直す（空欄は既存の値を残す）
                const prev = readMeta(dir);
                const pick = (k, v) => (safe(v) || prev[k] || '');
                writeFileSync(join(dir, 'meta.txt'), [
                    `氏名: ${name}`, `カナ: ${pick('カナ', b.kana)}`, `性別: ${pick('性別', b.sex)}`, `年齢: ${pick('年齢', b.age)}`,
                    `検査日: ${safe(b.date)}`, `検査機関: ${pick('検査機関', b.lab)}`, `主訴: ${pick('主訴', b.complaint)}`,
                    `備考: ${(prev['備考'] || 'DaVinci24 Inbox 経由').replace(/（最終追記 [^）]*）$/, '')}${existed ? `（最終追記 ${now()}）` : ''}`,
                    // サイト取り込みが書いた「メール:」「clientId:」「提出:」などは残す（公開時の顧客自動紐付けに必要）
                    ...Object.entries(prev).filter(([k]) => !['氏名', 'カナ', '性別', '年齢', '検査日', '検査機関', '主訴', '備考'].includes(k)).map(([k, v]) => `${k}: ${v}`),
                    '',
                ].join('\n'));

                // 感覚メモ・カウンセリング貼り付け：既存と違えば日時付きで追記（上書きしない）
                const appendText = (file, text) => {
                    const t = String(text ?? '').trim();
                    if (!t) return false;
                    const p = join(dir, file);
                    if (existsSync(p) && readFileSync(p, 'utf8').trim().length) {
                        if (readFileSync(p, 'utf8').includes(t)) return false;
                        appendFileSync(p, `\n\n--- 追記 ${now()} ---\n${t}\n`);
                    } else {
                        writeFileSync(p, t + '\n');
                    }
                    return true;
                };
                const kankakuAdded = appendText('感覚メモ.txt', b.kankaku);
                const counselingAdded = appendText('counseling.txt', b.counseling);

                // ファイルは既存の連番の続きに置く
                let bi = nextIndex(dir, 'blood', /^blood\d*\./i), di = nextIndex(join(dir, 'device'), 'device', /^device\d*\./i), ci = nextIndex(dir, 'counseling', /^counseling\d+\./i);
                let blood = 0, device = 0, coun = 0, converted = 0, heicLeft = 0;
                for (const f of Array.isArray(b.files) ? b.files : []) {
                    const m = String(f.dataUrl ?? '').match(/^data:([\w\/+.-]+);base64,(.+)$/s);
                    if (!m) continue;
                    // ブラウザが type を空で渡す（HEIC など）ときは拡張子から補う
                    const type = m[1] === 'application/octet-stream' || !EXT[m[1]] ? ({ '.heic': 'image/heic', '.heif': 'image/heif', '.pdf': 'application/pdf', '.csv': 'text/csv', '.txt': 'text/plain', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }[extname(String(f.name || '')).toLowerCase()] || m[1]) : m[1];
                    const ext = EXT[type] ?? 'bin';
                    const buf = Buffer.from(m[2], 'base64');
                    let path;
                    if (f.kind === 'device') { device++; path = join(dir, 'device', `device${di++}.${ext}`); }
                    else if (f.kind === 'counseling') { coun++; path = join(dir, `counseling${ci++}.${ext}`); }
                    else { blood++; path = join(dir, `blood${bi++}.${ext}`); }
                    writeFileSync(path, buf);
                    if (ext === 'heic') { const r = convertHeic(path); if (r.ok) converted++; else heicLeft++; }
                }
                json(res, 200, { ok: true, folder, dir, existed, blood, device, coun, converted, heicLeft, kankakuAdded, counselingAdded, info: folderInfo(folder) });
            } catch (e) {
                json(res, 400, { ok: false, error: e.message });
            }
        });
        return;
    }
    res.writeHead(404); res.end();
});
server.listen(PORT, '127.0.0.1', () => {
    console.log(`DaVinci24 Inbox → http://localhost:${PORT}`);
    console.log(`保存先: ${INPUTS}`);
});

const page = (site) => `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>DaVinci24 | Mitoflow40 Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap" rel="stylesheet">
<style>
:root{--accent:#4af6c3;--surface:#fff;--border:#d9dfdc;--txt:#1a1a1a;--dim:#666;--muted:#777;--green:#1e7d4f;--orange:#8a5a00;--red:#c0392b;--line2:rgba(26,26,26,.16)}
*{box-sizing:border-box}html{scroll-behavior:smooth}[hidden]{display:none!important}
body{margin:0;background:#6fa8c4;color:var(--txt);font-family:'Noto Sans JP','Hiragino Kaku Gothic ProN','Hiragino Sans',Meiryo,sans-serif;letter-spacing:.02em;padding:0 0 72px}
.barWrap{position:sticky;top:0;z-index:50}
.bar{height:64px;padding:0 32px;display:flex;align-items:center;justify-content:space-between;gap:12px;background:rgba(255,255,255,.86);border-bottom:1px solid var(--line2);backdrop-filter:blur(18px)}
.barLeft{display:flex;align-items:center;gap:18px;min-width:0}
.mark{width:30px;height:30px;display:grid;place-items:center;border-radius:9px;background:var(--accent);color:#07110d;font-weight:900;text-decoration:none;flex-shrink:0}
.nav{display:flex;align-items:center;gap:4px;overflow-x:auto}
.navItem{padding:6px 12px;border-radius:999px;color:#555;font-size:12.5px;font-weight:700;white-space:nowrap;text-decoration:none;border:1px solid transparent;transition:background .15s,color .15s}
.navItem:hover{background:rgba(26,26,26,.06);color:var(--txt)}
.navActive,.navActive:hover{background:var(--txt);color:#fff}
.barRight{display:flex;align-items:center;gap:10px}
.groupTab{padding:8px 14px;border-radius:999px;color:#555;font-size:13px;font-weight:750;white-space:nowrap;text-decoration:none;border:1px solid transparent;transition:background .15s,color .15s}
.groupTab:hover{background:rgba(26,26,26,.06);color:var(--txt)}
.groupActive,.groupActive:hover{background:var(--txt);color:#fff}
.subbar{height:44px;padding:0 32px;display:flex;align-items:center;gap:4px;overflow-x:auto;background:rgba(255,255,255,.72);border-bottom:1px solid rgba(26,26,26,.12);backdrop-filter:blur(18px)}
.subLabel{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8a9691;margin-right:10px;white-space:nowrap}
.siteLink{padding:9px 13px;background:var(--accent);color:#07110d;border:1px solid var(--txt);border-radius:999px;font-size:12px;font-weight:750;text-decoration:none;white-space:nowrap;transition:transform .15s,background .15s}
.siteLink:hover{background:#30e8b2;transform:translateY(-1px)}
.localPill{padding:9px 12px;color:var(--dim);border:1px solid var(--border);border-radius:999px;font-size:12px;background:transparent;white-space:nowrap}
@media(max-width:720px){.bar,.subbar{padding:0 16px}.navItem{padding:6px 10px;font-size:12px}.localPill,.subLabel{display:none}}
.wrap{width:min(1120px,calc(100% - 48px));margin:0 auto;padding:40px 0 0}
h1{margin:0;font-size:clamp(24px,4vw,32px);line-height:1.2;letter-spacing:-.03em;font-weight:700}
.sub{margin:8px 0 22px;color:#2b4a5a;font-size:13.5px;line-height:1.7}
.layout{display:grid;grid-template-columns:320px minmax(0,1fr);gap:18px;align-items:start}
@media(max-width:920px){.layout{grid-template-columns:1fr}.side{position:static!important}}
.side{position:sticky;top:124px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:20px;margin-bottom:12px;box-shadow:0 4px 18px rgba(26,26,26,.035)}
.side .card{margin:0;padding:16px}
.side h2{margin:0 0 10px;font-size:14px;font-weight:800;display:flex;justify-content:space-between;align-items:baseline}
.side h2 .tag{font-size:10px;letter-spacing:.08em;color:var(--muted);font-weight:700}
.list{display:flex;flex-direction:column;gap:8px;max-height:calc(100vh - 230px);overflow:auto}
.item{border:1px solid var(--border);border-radius:12px;padding:10px 12px;background:#fff;cursor:pointer;transition:.15s}
.item:hover{border-color:#8a9691}
.item.on{border-color:var(--txt);box-shadow:inset 0 0 0 1px var(--txt)}
.item .nm{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-weight:800;font-size:13.5px}
.item .nm small{color:var(--muted);font-weight:400;font-size:11px;white-space:nowrap}
.item .files{color:#69716e;font-size:11px;line-height:1.6;margin-top:3px}
.badges{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0 0}
.b{padding:2px 7px;border-radius:999px;font-size:10px;font-weight:700;border:1px solid #dde3e0;color:#59625f;background:#f1f4f3}
.b.ok{color:#1e7d4f;border-color:#a3ddbf;background:#e9f7ef}.b.warn{color:#8a5a00;border-color:#e5c37a;background:#fff4e0}.b.acc{color:#2c5aa0;border-color:#a9c3e8;background:#eaf2fd}
.empty{color:var(--muted);font-size:12px;text-align:center;padding:14px;line-height:1.7}
.head{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:flex-start}
.head h2{margin:0;font-size:22px;font-weight:800;letter-spacing:-.02em}
.head .meta{font-size:12.5px;color:#556;margin-top:4px;line-height:1.7}
.chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px;align-items:center}
.chips .lbl{font-size:11px;font-weight:700;color:#444;margin-right:4px}
.chip{padding:6px 12px;border:1px solid var(--border);border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;background:#fff;color:#555;font-family:inherit}
.chip.on{background:var(--txt);color:#fff;border-color:var(--txt)}
.row{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;margin-top:12px}
.row>div{min-width:150px}
.step{display:flex;align-items:baseline;gap:10px;margin:0 0 12px;flex-wrap:wrap}
.step h3{margin:0;font-size:15px;font-weight:800}
.step small{color:var(--muted);font-size:11.5px;font-weight:700}
label{display:block;font-size:11px;font-weight:700;color:#444;margin:0 0 5px}
label.chk{display:flex;align-items:center;gap:6px;font-weight:400;font-size:13px;color:var(--txt);margin:0;padding:9px 0}
input[type=text],input[type=date],textarea{width:100%;background:#fff;border:1px solid var(--border);border-radius:10px;color:var(--txt);padding:10px 13px;font-size:14px;font-family:inherit}
input:focus,textarea:focus{outline:none;border-color:#4ebf94;box-shadow:0 0 0 3px rgba(83,224,170,.12)}
textarea{resize:vertical;line-height:1.7}
.drop{border:2px dashed #b9c6c1;border-radius:12px;padding:20px 16px;text-align:center;color:var(--dim);cursor:pointer;transition:.15s;font-size:13px;background:#f7faf9;line-height:1.7}
.drop small{font-size:11px;color:var(--muted)}
.drop.on,.drop:hover{border-color:#4ebf94;color:var(--txt);background:#eefaf5}
.thumbs{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.thumbs:empty{display:none}
.th{position:relative;width:140px;border-radius:10px;overflow:hidden;border:1px solid var(--border);background:#fff;font-size:10px;color:var(--muted)}
.th .im{height:80px;display:grid;place-items:center;font-size:12px;font-weight:700;color:#8a9691;background:#eff5f2}
.th img{width:100%;height:80px;object-fit:cover;display:block}
.th .nm{padding:4px 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.th .nm.heic{color:var(--orange);font-weight:700}
.th select{width:100%;border:0;border-top:1px solid var(--line2);font-size:11px;padding:5px 6px;background:#fff;font-family:inherit;color:var(--txt)}
.th button{position:absolute;top:3px;right:3px;width:18px;height:18px;border:none;border-radius:9px;background:var(--txt);color:#fff;font-size:11px;cursor:pointer;line-height:1}
.sexes{display:flex;gap:8px}
.sexes span{padding:8px 16px;border:1px solid var(--border);border-radius:999px;font-size:13px;font-weight:700;cursor:pointer;color:#555;background:#fff}
.sexes span.on{background:var(--txt);border-color:var(--txt);color:#fff}
.done{font-size:13px;color:#1e7d4f;background:#e9f7ef;border:1px solid #a3ddbf;border-radius:10px;padding:10px 14px;line-height:1.7}
.hint{font-size:11.5px;color:var(--muted);margin-top:8px;line-height:1.7}
.tagm{font-size:10px;color:var(--muted);font-weight:700;margin-left:6px}
details.more{margin-top:12px;font-size:12px;color:var(--dim)}details.more summary{cursor:pointer;font-weight:700;color:#555}details.more textarea{margin-top:8px}
.send{width:100%;padding:15px;border:1px solid var(--txt);border-radius:999px;background:var(--accent);color:var(--txt);font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;transition:transform .15s,background .15s;margin-top:4px}
.send:hover{background:#30e8b2;transform:translateY(-1px)}.send:disabled{opacity:.4;cursor:default;transform:none}
.reason{font-size:12px;color:#2b4a5a;text-align:center;margin-top:8px;min-height:1.6em}
.err{color:var(--red);font-size:13px;font-weight:700;margin-top:12px;display:none}
.result{background:#e9f7ef;border:1px solid #a3ddbf;border-radius:14px;padding:14px 18px;margin:14px 0 12px;display:none}
.result strong{display:block;color:var(--green);font-size:14px}
.result .det{font-size:12px;color:#456;margin-top:4px;line-height:1.7}
.cmdRow{display:flex;gap:8px;align-items:stretch;margin-top:10px;flex-wrap:wrap}
.cmdRow code{flex:1;min-width:220px;display:block;background:#fff;border:1px solid var(--border);border-radius:10px;padding:12px 14px;font-size:14px;font-weight:700;color:var(--txt);word-break:break-all;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;cursor:pointer}
.cmdRow button{border:1px solid var(--txt);border-radius:10px;background:var(--txt);color:#fff;padding:0 18px;font-weight:800;font-size:13px;cursor:pointer;font-family:inherit}
.act{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
.act button{background:#fff;border:1px solid var(--border);color:#555;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit}
.act button:hover{border-color:var(--txt);color:var(--txt)}
.foot{width:min(1120px,calc(100% - 48px));margin:28px auto 0;font-size:11px;color:rgba(255,255,255,.85);display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px}
</style></head><body>
<div class="barWrap">
<header class="bar">
  <div class="barLeft">
    <a class="mark" href="${site}/admin" data-admin-path="/admin" title="ダッシュボード" aria-label="ダッシュボードへ">M</a>
    <nav class="nav" aria-label="管理グループ">
      <a class="groupTab groupActive" href="${site}/admin/clients" data-admin-path="/admin/clients" aria-current="page">クライアント管理</a>
      <a class="groupTab" href="${site}/admin/posts" data-admin-path="/admin/posts">記事管理</a>
    </nav>
  </div>
  <div class="barRight">
    <span class="localPill" title="この受付ページはあなたの Mac の中だけで動いています（インターネットには公開されていません）。ヘッダーのリンクは開いた元の管理画面へ戻ります">この Mac 内だけで動作</span>
    <a class="siteLink" href="${site}" target="_blank" rel="noopener noreferrer" title="公開サイトのトップを別タブで開く">サイトを見る ↗</a>
  </div>
</header>
<nav class="subbar" aria-label="クライアント管理">
  <span class="subLabel">クライアント管理</span>
  <a class="navItem" href="${site}/admin/clients" data-admin-path="/admin/clients">クライアント</a>
  <a class="navItem" href="${site}/admin/orders" data-admin-path="/admin/orders">注文・契約</a>
  <a class="navItem" href="${site}/admin/newsletter" data-admin-path="/admin/newsletter">ニュースレター</a>
  <a class="navItem navActive" href="/" aria-current="page">DaVinci24</a>
</nav>
</div>
<div class="wrap">
<h1>DaVinci24 受付</h1>
<p class="sub">カウンセリングシートが届くと左に並びます。クライアントを選んで、シートを取り込み、足りないデータがあれば足して、Claude Code に「読んで」と渡します。</p>

<div class="layout">
<aside class="side"><div class="card"><h2><span>クライアント</span><span class="tag" id="listMeta"></span></h2>
<div class="list" id="list"><div class="empty">読み込み中…</div></div></div></aside>

<div class="main">
<div class="card" id="emptyDetail"><div class="empty">左の一覧からクライアントを選んでください。</div></div>
<div id="detail" hidden>

<div class="card"><div class="head"><div><h2 id="dName"></h2><div class="meta" id="dMeta"></div><div class="badges" id="dBadges"></div></div>
<div><label>性別 <span class="tagm">判定基準に使う</span></label><div class="sexes" id="sex"><span data-v="男性">男性</span><span data-v="女性">女性</span></div></div></div>
<div class="chips" id="dFolders"></div>
<div class="row" id="newRow" hidden><div><label>検査日（フォルダ名に使う）</label><input type="date" id="importDate"></div><div class="hint" id="folderPreview" style="margin:0 0 10px"></div></div>
</div>

<div class="card" id="sheetCard"><div class="step"><h3>カウンセリングシート</h3><small id="sheetState"></small></div>
<div id="sheetNew">
<label class="chk"><input type="checkbox" id="importQ" checked> 問診の回答も一緒に取り込む（counseling.txt）</label>
<div id="importFiles" class="thumbs"></div>
<p class="hint" id="importHint"></p>
</div>
<div id="sheetDone" class="done" hidden></div>
</div>

<div class="card"><div class="step"><h3>足りないデータを足す</h3><small>任意。あとから届いた票、Watch の記録、聞き取った内容など</small></div>
<div class="drop" id="drop">ここにファイルをドラッグ＆ドロップ（クリックで選択、⌘V でも）<br><small>画像 / PDF / CSV。HEIC は自動で JPEG に変換。種類はあとから直せます</small></div>
<input type="file" id="file" multiple accept="image/*,.heic,.heif,application/pdf,.csv,.txt" hidden>
<div class="thumbs" id="thumbs"></div>
<label style="margin-top:14px">または、Mac 上のフォルダ・ファイルのパス <span class="tagm">air などの外付けも可・アップロードなし</span></label>
<input type="text" id="srcPath" placeholder="/Volumes/Works/…/血液検査データサンプル　（Finder で選んで ⌥⌘C → ここに貼る）" autocomplete="off">
<details class="more"><summary>クライアントから聞き取った内容をテキストで足す（シートの追記になる）</summary><textarea id="counseling" rows="4" placeholder="電話やメールで聞いた補足。読み取り時にシートの回答と一緒に整理されます"></textarea></details>
</div>

<div class="card"><div class="step"><h3>感覚メモ</h3><small>任意。あなたの勘や仮説。原文のまま解析に渡ります</small></div>
<textarea id="kankaku" rows="4" placeholder="第一印象、気になっていること、仮説（糖代謝？鉄？睡眠？）、本人の温度感"></textarea>
</div>

<button class="send" id="send" type="button">取り込む</button>
<div class="reason" id="reason"></div>
<p class="err" id="err"></p>
<div class="result" id="ok"><strong id="okTitle"></strong><div class="det" id="okDetail"></div></div>

<div class="card" id="handCard" hidden><div class="step"><h3>Claude Code に渡す</h3><small id="handState"></small></div>
<div class="badges" id="handBadges"></div>
<div class="cmdRow"><code id="cmd"></code><button id="copyBtn" type="button">コピー</button></div>
<div class="hint">この一文を Claude Code のチャットに貼ると、読み取りと判定が始まります。</div>
<div class="act" id="handAct"></div>
</div>

</div>
</div>
</div></div>
<div class="foot"><span>Mitoflow40 Admin · DaVinci24 — このページはローカル専用（127.0.0.1）。外部には出ません。</span><span>読み取り・判定は Claude Code が行います</span></div>
<script>
// 管理画面から ?admin=<origin> 付きで開かれたら、その管理画面（localhost の開発環境でも本番でも）へ戻るリンクにする
(function(){try{var ok=function(u){try{var x=new URL(u);return (x.protocol==='http:'||x.protocol==='https:')&&/^(localhost|127\\.0\\.0\\.1|([a-z0-9-]+\\.)*mitoflow40\\.com)$/.test(x.hostname)}catch(e){return false}};
var p=new URLSearchParams(location.search).get('admin');if(p&&ok(p)){localStorage.setItem('davinci24:admin',new URL(p).origin);history.replaceState(null,'',location.pathname)}
var o=localStorage.getItem('davinci24:admin');if(o&&ok(o)){document.querySelectorAll('[data-admin-path]').forEach(function(a){a.href=o+a.getAttribute('data-admin-path')});var sl=document.querySelector('.siteLink');if(sl)sl.href=o;var pill=document.querySelector('.localPill');if(pill){pill.title='管理画面: '+o;pill.textContent='この Mac 内だけで動作 · 管理画面へ戻る → '+o.split('//')[1]}}}catch(e){}})();

var $=function(id){return document.getElementById(id)};
var folders=[],siteClients=[],entries=[],sel=null,selFolder=null,siteDetail=null,files=[],sexV='',DRAFT='davinci24:kankaku';
var KIND_LABEL={blood:'🩸 血液検査票',device:'⌚ デバイス',counseling:'📋 シート'};
function todayStr(){var d=new Date(),p=function(n){return String(n).padStart(2,'0')};return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())}
function dash(d){d=String(d||'');return d.length===8?d.slice(0,4)+'-'+d.slice(4,6)+'-'+d.slice(6,8):d}
function postJson(url,body){return fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(function(r){return r.json()}).then(function(j){if(!j.ok)throw new Error(j.error||'失敗しました');return j})}
function copy(text,el){navigator.clipboard.writeText(text).then(function(){var o=el.textContent;el.textContent='✔ コピーしました';setTimeout(function(){el.textContent=o},1400)})}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

// ── 一覧：シートの提出（サイト）と inputs/ のフォルダを 1 人ずつにまとめる ──
function badges(f){var s=f.status,b=[];
if(s.reported)b.push('<span class="b ok">レポート生成済</span>');
if(s.handedOff)b.push('<span class="b acc">解析へ引継ぎ済</span>');
if(s.judged)b.push('<span class="b ok">読取済 🔴'+s.judged.red+' 🟡'+s.judged.yellow+' 🟢'+s.judged.green+(s.judged.unmatched?' ・未収載'+s.judged.unmatched:'')+'</span>');
else if(s.read)b.push('<span class="b ok">読取済（血液なし）</span>');
else b.push('<span class="b warn">未読取</span>');
if(f.files.heic)b.push('<span class="b warn">HEIC '+f.files.heic+'</span>');
return b.join('')}
function fileLine(f){var c=f.files.counseling.length+(f.files.hasCounselingTxt?1:0);return '血液票 '+f.files.blood.length+' ・ デバイス '+f.files.device.length+' ・ 問診 '+(c?c:'—')+' ・ 感覚メモ '+(f.files.hasKankaku?'○':'—')}
function score(e){if(e.site&&!e.folders.length)return 3;if(e.folders.some(function(f){return !f.status.read}))return 2;return 1}
function buildEntries(){var used={};entries=[];
siteClients.forEach(function(c){var fs=folders.filter(function(f){return c.imported.indexOf(f.folder)>=0});fs.forEach(function(f){used[f.folder]=1});
entries.push({key:'c:'+c.clientId,name:c.name,email:c.email,gender:c.gender||'',age:c.age||'',complaint:c.complaint||'',site:c,folders:fs,at:String(c.latestAt||'').slice(0,10)})});
folders.forEach(function(f){if(used[f.folder])return;var m=f.meta||{};entries.push({key:'f:'+f.folder,name:f.name,email:m['メール']||'',gender:m['性別']||'',age:m['年齢']||'',complaint:m['主訴']||'',site:null,folders:[f],at:dash(f.date)})});
entries.sort(function(a,b){return score(b)-score(a)||String(b.at).localeCompare(String(a.at))})}
function entryBadges(e){var b=[];
if(e.site){if(e.site.paid)b.push('<span class="b ok">決済 '+esc(e.site.paid)+'</span>');b.push('<span class="b acc">シート '+e.site.submissionCount+' 件</span>');if(!e.folders.length)b.push('<span class="b warn">未取り込み</span>')}
else b.push('<span class="b">シートなし</span>');
if(e.folders.length)b.push(badges(e.folders[0]));return b.join('')}
function renderList(){var box=$('list');if(!entries.length){box.innerHTML='<div class="empty">まだ誰もいません。クライアントがカウンセリングシート（/counseling-sheet）を送ると、ここに並びます。</div>';$('listMeta').textContent='';return}
var todo=entries.filter(function(e){return score(e)>1}).length;$('listMeta').textContent=entries.length+' 人'+(todo?'・要対応 '+todo:'');
box.innerHTML='';entries.forEach(function(e){var d=document.createElement('div');d.className='item'+(sel&&sel.key===e.key?' on':'');
d.innerHTML='<div class="nm"><span>'+esc(e.name)+'</span><small>'+esc(e.at)+(e.gender?' ・ '+esc(e.gender):'')+(e.age?' ・ '+esc(e.age)+'歳':'')+'</small></div><div class="badges">'+entryBadges(e)+'</div><div class="files">'+(e.folders.length?fileLine(e.folders[0]):e.site?'添付 '+e.site.fileCount+' 件':'')+(e.email?'<br>'+esc(e.email):'')+'</div>';
d.onclick=function(){select(e.key)};box.appendChild(d)})}
function load(){return Promise.all([
fetch('/api/folders').then(function(r){return r.json()}).then(function(j){folders=Array.isArray(j)?j:[]}),
fetch('/api/site/clients').then(function(r){return r.json()}).then(function(j){siteClients=Array.isArray(j)?j:[]}).catch(function(){siteClients=[]})
]).then(function(){buildEntries();renderList()})}

// ── 選ぶ ──
function select(key){var e=entries.filter(function(x){return x.key===key})[0];if(!e)return;sel=e;selFolder=e.folders[0]||null;siteDetail=null;files=[];renderThumbs();$('srcPath').value='';$('counseling').value='';$('ok').style.display='none';$('err').style.display='none';
sexV=(selFolder&&selFolder.meta&&selFolder.meta['性別'])||e.gender||'';
renderList();renderDetail();
if(e.site)fetch('/api/site/client?clientId='+encodeURIComponent(e.site.clientId)).then(function(r){return r.json()}).then(function(c){if(c.error)throw new Error(c.error);if(sel===e){siteDetail=c;renderDetail()}}).catch(function(err){$('sheetState').textContent='読めません：'+err.message})}
function setFolder(f){selFolder=f;if(f&&f.meta&&f.meta['性別'])sexV=f.meta['性別'];files=[];renderThumbs();$('ok').style.display='none';renderDetail()}
function targetName(){return selFolder?selFolder.folder:(sel.name+'_'+$('importDate').value.split('-').join(''))}
function newFiles(){if(!siteDetail)return[];var a=[];siteDetail.submissions.forEach(function(s){s.files.forEach(function(f){if(!f.imported)a.push(f)})});return a}
function sheetNeeded(){if(!sel||!sel.site||!siteDetail)return false;if(!selFolder)return true;if(newFiles().length)return true;return !selFolder.files.hasCounselingTxt}

function renderDetail(){if(!sel){$('detail').hidden=true;$('emptyDetail').hidden=false;return}
$('detail').hidden=false;$('emptyDetail').hidden=true;
$('dName').textContent=sel.name;
$('dMeta').textContent=[sel.gender,sel.age?sel.age+'歳':'',sel.email,sel.complaint?'主訴: '+sel.complaint:''].filter(Boolean).join(' ・ ');
$('dBadges').innerHTML=entryBadges(sel);
Array.prototype.forEach.call($('sex').children,function(x){x.classList.toggle('on',x.dataset.v===sexV)});
// 検査回（フォルダ）の切替
var ch=$('dFolders');ch.innerHTML='<span class="lbl">検査回</span>';
sel.folders.forEach(function(f){var c=document.createElement('button');c.type='button';c.className='chip'+(selFolder===f?' on':'');c.textContent=dash(f.date)+(f.status.read?' ・ 読取済':' ・ 未読取');c.onclick=function(){setFolder(f)};ch.appendChild(c)});
var nb=document.createElement('button');nb.type='button';nb.className='chip'+(selFolder?'':' on');nb.textContent=sel.folders.length?'＋ 新しい検査回':'新規';nb.onclick=function(){setFolder(null)};ch.appendChild(nb);
$('newRow').hidden=!!selFolder;
if(!selFolder){if(!$('importDate').value)$('importDate').value=(sel.site&&sel.site.latestDate)?dash(sel.site.latestDate):todayStr();$('folderPreview').textContent='→ フォルダ '+targetName()}
// シート
if(sel.site){$('sheetCard').hidden=false;
if(!siteDetail){$('sheetState').textContent='読み込み中…';$('sheetNew').hidden=true;$('sheetDone').hidden=true}
else{var nf=newFiles(),q=siteDetail.submissions.reduce(function(a,s){return a+s.entries.length},0),total=siteDetail.submissions.reduce(function(a,s){return a+s.files.length},0);
if(sheetNeeded()){$('sheetNew').hidden=false;$('sheetDone').hidden=true;$('sheetState').textContent=selFolder?'新しい添付があります':'まだ取り込んでいません';
var box=$('importFiles');box.innerHTML='';nf.forEach(function(f){var d=document.createElement('div');d.className='th';d.innerHTML=thumbHtml(f,f.url)+kindSelect(f.kind,'data-url="'+esc(f.url)+'" data-name="'+esc(f.name)+'" data-type="'+esc(f.type)+'"');box.appendChild(d)});
$('importHint').textContent='添付 '+nf.length+' 件を取り込みます（種類はプルダウンで直せます）'+(total-nf.length?'・取り込み済み '+(total-nf.length)+' 件':'')+'・問診の回答 '+q+' 項目（'+siteDetail.submissions.length+' 回の提出）'}
else{$('sheetNew').hidden=true;$('sheetDone').hidden=false;$('sheetState').textContent='取り込み済み';$('sheetDone').textContent='シートは '+selFolder.folder+' に入っています（添付 '+total+' 件・問診の回答 '+q+' 項目）。新しい添付はありません。'}}}
else{$('sheetCard').hidden=true}
// Claude に渡す
if(selFolder){$('handCard').hidden=false;var f=selFolder;$('handBadges').innerHTML=badges(f);$('handState').textContent=fileLine(f);
var cmd='DaVinci24 で '+f.folder+' を読んで';$('cmd').textContent=cmd;$('copyBtn').onclick=function(){copy(cmd,$('copyBtn'))};$('cmd').onclick=function(){copy(cmd,$('copyBtn'))};
var act=$('handAct');act.innerHTML='';if(f.status.read&&!f.status.handedOff){var b=document.createElement('button');b.type='button';b.textContent='解析コマンドをコピー（そのまま解析して）';b.onclick=function(){copy('DaVinci24 の '+f.folder+' をそのまま解析して',b)};act.appendChild(b)}}
else $('handCard').hidden=true;
update()}

$('sex').onclick=function(e){var s=e.target.closest('span');if(!s)return;sexV=s.dataset.v;Array.prototype.forEach.call($('sex').children,function(x){x.classList.toggle('on',x===s)});update()};
$('importDate').addEventListener('input',function(){if(sel&&!selFolder)$('folderPreview').textContent='→ フォルダ '+targetName();update()});

// ── 足すファイル ──
function extOf(n){n=String(n||'').toLowerCase();var i=n.lastIndexOf('.');return i<0?'':n.slice(i+1)}
function isHeic(f){return /heic|heif/.test((String(f.type||'')+' '+String(f.name||'')).toLowerCase())}
function accept(f){var t=f.type||'';return t.indexOf('image/')===0||t==='application/pdf'||t==='text/csv'||t==='text/plain'||['heic','heif','csv','txt','pdf','jpg','jpeg','png','webp'].indexOf(extOf(f.name))>=0}
function guessKind(f){var n=(String(f.name||'')+' '+String(f.type||'')).toLowerCase();if(/counsel|sheet|シート|問診|カウンセ/.test(n))return 'counseling';if(/watch|apple|oura|garmin|fitbit|whoop|hrv|sleep|睡眠|血圧|体組成|体重|glucose|libre|cgm|health|device|csv/.test(n))return 'device';return 'blood'}
function addFiles(list){Array.prototype.forEach.call(list,function(f){if(!accept(f))return;var r=new FileReader();r.onload=function(){files.push({kind:guessKind(f),name:f.name,type:f.type||'application/octet-stream',size:f.size,dataUrl:r.result});renderThumbs();update()};r.readAsDataURL(f)})}
function fmtSize(n){return n>1048576?(n/1048576).toFixed(1)+' MB':Math.round(n/1024)+' KB'}
function kindSelect(kind,attrs){return '<select '+attrs+'>'+['blood','device','counseling'].map(function(k){return '<option value="'+k+'"'+(k===kind?' selected':'')+'>'+KIND_LABEL[k]+'</option>'}).join('')+'</select>'}
function thumbHtml(f,src){var img=String(f.type||'').indexOf('image/')===0&&!isHeic(f);var badge=isHeic(f)?'HEIC':String(f.type||'').indexOf('pdf')>=0?'PDF':/csv/.test(String(f.type||'')+String(f.name||''))?'CSV':'FILE';return (img?'<img src="'+esc(src)+'">':'<div class="im">'+badge+'</div>')+'<div class="nm'+(isHeic(f)?' heic':'')+'" title="'+esc(f.name)+'">'+esc(f.name)+(f.size?' · '+fmtSize(f.size):'')+'</div>'}
function renderThumbs(){var box=$('thumbs');box.innerHTML='';files.forEach(function(f,i){var d=document.createElement('div');d.className='th';d.innerHTML=thumbHtml(f,f.dataUrl)+kindSelect(f.kind,'')+'<button type="button" title="外す">×</button>';d.querySelector('select').onchange=function(e){files[i].kind=e.target.value};d.querySelector('button').onclick=function(){files.splice(i,1);renderThumbs();update()};box.appendChild(d)})}
var D=$('drop'),I=$('file');D.onclick=function(){I.click()};I.onchange=function(){addFiles(I.files);I.value=''};
D.ondragover=function(e){e.preventDefault();D.classList.add('on')};D.ondragleave=function(){D.classList.remove('on')};D.ondrop=function(e){e.preventDefault();D.classList.remove('on');addFiles(e.dataTransfer.files)};
document.addEventListener('paste',function(e){if(!sel)return;var t=e.target;if(t&&(t.tagName==='TEXTAREA'||t.tagName==='INPUT')&&e.clipboardData.files.length===0)return;var fs=Array.prototype.slice.call(e.clipboardData.files);if(fs.length){e.preventDefault();addFiles(fs)}});

// ── 感覚メモの下書き（黙って保存・復元）──
try{var dr=localStorage.getItem(DRAFT);if(dr)$('kankaku').value=dr}catch(e){}
$('kankaku').addEventListener('input',function(){try{localStorage.setItem(DRAFT,$('kankaku').value)}catch(e){}update()});
['srcPath','counseling'].forEach(function(id){$(id).addEventListener('input',update)});

// ── ボタン：何をするかを決める ──
function plan(){var a=[];if(!sel)return a;if(sheetNeeded())a.push('sheet');if(files.length||$('counseling').value.trim()||($('kankaku').value.trim()&&a.indexOf('sheet')<0))a.push('save');if($('srcPath').value.trim())a.push('prep');return a}
function update(){var btn=$('send'),why='';if(!sel){btn.disabled=true;$('reason').textContent='';return}
var acts=plan();
if(!selFolder&&$('importDate').value.length!==10)why='検査日を入れてください';
else if(!acts.length)why=selFolder?'足すものがあれば入れてください（ファイル・パス・聞き取り・感覚メモ）':'足すものを入れてください';
btn.textContent=selFolder?selFolder.folder+' に追加する':(acts.indexOf('sheet')>=0?'シートを取り込む':'取り込む');
btn.disabled=!!why;$('reason').textContent=why}

function submit(){var btn=$('send');if(btn.disabled||!sel)return;var acts=plan();btn.disabled=true;var label=btn.textContent;btn.textContent='取り込み中…';$('err').style.display='none';$('ok').style.display='none';
var e=sel,folder=targetName(),date=selFolder?dash(selFolder.date):$('importDate').value,det=[],kUsed=false,p=Promise.resolve();
if(acts.indexOf('sheet')>=0){var fl=Array.prototype.map.call($('importFiles').querySelectorAll('select'),function(s){return {url:s.dataset.url,name:s.dataset.name,type:s.dataset.type,kind:s.value}});kUsed=true;
p=p.then(function(){return postJson('/api/site/import',{clientId:e.site.clientId,date:date,files:fl,includeQuestionnaire:$('importQ').checked,kankaku:$('kankaku').value})}).then(function(j){folder=j.folder;det.push('シート：血液票 '+j.blood+'・デバイス '+j.device+'・シート画像 '+j.coun+(j.counselingWritten?'・問診テキスト':'')+(j.kankakuAdded?'・感覚メモ':''));if(j.skipped)det.push('前に取り込んだ添付 '+j.skipped+' 件はスキップ');if(j.converted)det.push('HEIC '+j.converted+' 枚を JPEG に変換');if(j.heicLeft)det.push('⚠ HEIC '+j.heicLeft+' 枚は変換できませんでした')})}
if(acts.indexOf('save')>=0){var usedHere=!kUsed;kUsed=true;
p=p.then(function(){return postJson('/save',{name:e.name,date:date,sex:sexV,counseling:$('counseling').value,kankaku:usedHere?$('kankaku').value:'',files:files})}).then(function(j){folder=j.folder;var parts=[];if(j.blood)parts.push('血液票 '+j.blood);if(j.device)parts.push('デバイス '+j.device);if(j.coun)parts.push('シート画像 '+j.coun);if($('counseling').value.trim())parts.push('聞き取りテキスト');if(j.kankakuAdded)parts.push('感覚メモ');det.push('追加：'+(parts.join('・')||'なし'));if(j.converted)det.push('HEIC '+j.converted+' 枚を JPEG に変換');if(j.heicLeft)det.push('⚠ HEIC '+j.heicLeft+' 枚は変換できませんでした')})}
if(acts.indexOf('prep')>=0){var useK=!kUsed;
p=p.then(function(){return postJson('/api/prep',{path:$('srcPath').value.trim(),name:e.name,date:date,sex:sexV,kankaku:useK?$('kankaku').value:''})}).then(function(j){folder=j.folder;String(j.out||'').split('\\n').forEach(function(l){if(l.indexOf('血液票:')>=0||l.indexOf('Apple Health:')>=0)det.push('パスから：'+l.trim())})})}
p.then(function(){$('okTitle').textContent='✅ 取り込みました → '+folder;$('okDetail').textContent=det.join(' ／ ');$('ok').style.display='block';
$('kankaku').value='';try{localStorage.removeItem(DRAFT)}catch(x){}files=[];renderThumbs();$('srcPath').value='';$('counseling').value='';
return load().then(function(){var key=e.key;var ne=entries.filter(function(x){return x.key===key})[0]||entries.filter(function(x){return x.folders.some(function(f){return f.folder===folder})})[0];
if(ne){sel=ne;selFolder=ne.folders.filter(function(f){return f.folder===folder})[0]||ne.folders[0]||null;renderList();
if(ne.site)return fetch('/api/site/client?clientId='+encodeURIComponent(ne.site.clientId)).then(function(r){return r.json()}).then(function(c){if(!c.error)siteDetail=c;renderDetail();$('handCard').scrollIntoView({behavior:'smooth',block:'center'})});
renderDetail();$('handCard').scrollIntoView({behavior:'smooth',block:'center'})}})
}).catch(function(err){$('err').textContent=err.message;$('err').style.display='block'}).then(function(){btn.textContent=label;update()})}
$('send').onclick=submit;
document.addEventListener('keydown',function(e){if((e.metaKey||e.ctrlKey)&&e.key==='Enter'&&!$('send').disabled)submit()});

load().then(function(){if(entries.length)select(entries[0].key)});
</script></body></html>`;
