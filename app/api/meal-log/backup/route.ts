import { list, put } from '@vercel/blob';
import { backupDir } from '@/lib/meal-log-store';

// 食事記録（/meal-log）の控え。端末で作った復元コードごとに、記録をサイト側に預かる。
// 保存先: meal-log/<sha256(コード)>/latest.json と、日ごとの控え <YYYY-MM-DD>.json
// コードそのものは保存しない（ハッシュだけ）。コードを知っている人だけが戻せる。

export const dynamic = 'force-dynamic';

const CODE_RE = /^[A-HJ-NP-Z2-9]{16}$/; // 読み違えやすい I・O・0・1 を除いた 16 文字
const MAX_BYTES = 1_000_000;
const MAX_MEALS = 10_000;
const TYPES = new Set(['朝食', '昼食', '夕食', '間食']);

type Meal = { id: string; date: string; time: string; type: string; food: string };


function cleanMeals(v: unknown): Meal[] | null {
    if (!Array.isArray(v) || v.length > MAX_MEALS) return null;
    const out: Meal[] = [];
    for (const m of v) {
        if (!m || typeof m !== 'object') return null;
        const { id, date, time, type, food } = m as Record<string, unknown>;
        if (typeof id !== 'string' || id.length > 40) return null;
        if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
        if (typeof time !== 'string' || time.length > 5) return null;
        if (typeof type !== 'string' || !TYPES.has(type)) return null;
        if (typeof food !== 'string' || food.length > 2000) return null;
        out.push({ id, date, time, type, food });
    }
    return out;
}

function today(): string {
    // 日本時間の日付
    return new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10);
}

export async function POST(req: Request) {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return Response.json({ ok: false, error: '保存先が設定されていません' }, { status: 503 });

    const raw = await req.text();
    if (raw.length > MAX_BYTES) return Response.json({ ok: false, error: '記録が大きすぎます' }, { status: 413 });
    let body: Record<string, unknown>;
    try { body = JSON.parse(raw); } catch { return Response.json({ ok: false, error: '形式が正しくありません' }, { status: 400 }); }

    const code = typeof body.code === 'string' ? body.code.replace(/[-\s]/g, '').toUpperCase() : '';
    if (!CODE_RE.test(code)) return Response.json({ ok: false, error: '復元コードが正しくありません' }, { status: 400 });
    const prefix = backupDir(code);

    if (body.action === 'save') {
        const meals = cleanMeals(body.meals);
        if (!meals) return Response.json({ ok: false, error: '記録の形式が正しくありません' }, { status: 400 });
        if (meals.length === 0) return Response.json({ ok: false, error: '記録がないので保存しません' }, { status: 400 });
        const memory = body.memory && typeof body.memory === 'object' && !Array.isArray(body.memory) ? body.memory : {};
        const savedAt = new Date().toISOString();
        const payload = JSON.stringify({ v: 1, savedAt, count: meals.length, meals, memory });
        const opts = { access: 'public' as const, token, addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 60 };
        await Promise.all([
            put(`${prefix}latest.json`, payload, opts),
            put(`${prefix}${today()}.json`, payload, opts),
        ]);
        return Response.json({ ok: true, savedAt, count: meals.length });
    }

    if (body.action === 'restore') {
        const { blobs } = await list({ prefix, token });
        const latest = blobs.find((b) => b.pathname === `${prefix}latest.json`);
        if (!latest) return Response.json({ ok: false, error: 'このコードの控えは見つかりませんでした' }, { status: 404 });
        const res = await fetch(`${latest.url}?t=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) return Response.json({ ok: false, error: '控えを読み込めませんでした' }, { status: 502 });
        const data = await res.json();
        return Response.json({ ok: true, savedAt: data.savedAt, count: data.count, meals: data.meals ?? [], memory: data.memory ?? {} });
    }

    return Response.json({ ok: false, error: '不明な操作です' }, { status: 400 });
}
