import { createHash } from 'crypto';
import { list } from '@vercel/blob';

// 食事記録の控え（サイト側）。保存は app/api/meal-log/backup、閲覧は /admin/meal-log。
// meal-log/<sha256(復元コード)>/latest.json と <YYYY-MM-DD>.json（日ごとの控え）

export const MEAL_LOG_PREFIX = 'meal-log/';

export function backupDir(code: string): string {
    return `${MEAL_LOG_PREFIX}${createHash('sha256').update(`mf-meal-log:${code}`).digest('hex')}/`;
}

export interface StoredMeal { id: string; date: string; time: string; type: string; food: string }
export interface StoredBackup { v: number; savedAt: string; count: number; meals: StoredMeal[]; memory: Record<string, unknown> }

export interface BackupSummary {
    id: string;            // ハッシュ（フォルダ名）
    savedAt: string;
    count: number;
    firstDate: string | null;
    lastDate: string | null;
    days: number;          // 記録のある日数
    snapshots: string[];   // 日ごとの控え（新しい順）
}

function token() { return process.env.BLOB_READ_WRITE_TOKEN; }

async function allBlobs() {
    const t = token();
    if (!t) return [];
    const out: { pathname: string; url: string }[] = [];
    let cursor: string | undefined;
    do {
        const page = await list({ prefix: MEAL_LOG_PREFIX, token: t, cursor, limit: 1000 });
        out.push(...page.blobs.map((b) => ({ pathname: b.pathname, url: b.url })));
        cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return out;
}

async function readJson(url: string): Promise<StoredBackup | null> {
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    return res.ok ? res.json() : null;
}

function summarize(id: string, data: StoredBackup, snapshots: string[]): BackupSummary {
    const dates = [...new Set(data.meals.map((m) => m.date))].sort();
    return { id, savedAt: data.savedAt, count: data.count, firstDate: dates[0] ?? null, lastDate: dates.at(-1) ?? null, days: dates.length, snapshots };
}

export async function listBackups(): Promise<BackupSummary[]> {
    const blobs = await allBlobs();
    const byDir = new Map<string, { latest?: string; snaps: string[] }>();
    for (const b of blobs) {
        const [, id, file] = b.pathname.split('/');
        if (!id || !file) continue;
        const e = byDir.get(id) ?? { snaps: [] };
        if (file === 'latest.json') e.latest = b.url; else e.snaps.push(file.replace('.json', ''));
        byDir.set(id, e);
    }
    const rows = await Promise.all([...byDir].map(async ([id, e]) => {
        if (!e.latest) return null;
        const data = await readJson(e.latest).catch(() => null);
        return data ? summarize(id, data, e.snaps.sort().reverse()) : null;
    }));
    return rows.filter((r): r is BackupSummary => Boolean(r)).sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

export async function getBackup(id: string, snapshot?: string): Promise<{ summary: BackupSummary; data: StoredBackup } | null> {
    if (!/^[0-9a-f]{64}$/.test(id)) return null;
    if (snapshot && !/^\d{4}-\d{2}-\d{2}$/.test(snapshot)) return null;
    const t = token();
    if (!t) return null;
    const { blobs } = await list({ prefix: `${MEAL_LOG_PREFIX}${id}/`, token: t });
    const latest = blobs.find((b) => b.pathname.endsWith('/latest.json'));
    const target = snapshot ? blobs.find((b) => b.pathname.endsWith(`/${snapshot}.json`)) : latest;
    if (!latest || !target) return null;
    const [latestData, data] = await Promise.all([readJson(latest.url), target === latest ? null : readJson(target.url)]);
    if (!latestData) return null;
    const snaps = blobs.map((b) => b.pathname.split('/')[2]).filter((f) => f && f !== 'latest.json').map((f) => f.replace('.json', '')).sort().reverse();
    return { summary: summarize(id, latestData, snaps), data: data ?? latestData };
}
