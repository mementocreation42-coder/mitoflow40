import { list, put } from '@vercel/blob';
import { clientIdFromEmail } from './intake';
import { memo, invalidate, TTL } from './req-cache';

// ── セルフチェック（/check）の結果を顧客に紐付けて保存 ─────────────────────
// 結果をメールで受け取る人はメールアドレスを入れるので、その時点で顧客レコード（clientId = メールの HMAC）に紐付く。
// 保存先: check/<clientId>/<timestamp>.json

export interface SelfCheckResult {
    clientId: string;
    email: string;
    archetypeName: string;
    archetypeCatch: string;
    total: number;
    axisScores: { energy: number; mental: number; recovery: number; flex: number };
    personalAnalysis?: string;
    personalActions?: string[];
    newsletterOptIn: boolean;
    createdAt: string;
}

const PREFIX = 'check/';

function token(): string | undefined {
    return process.env.BLOB_READ_WRITE_TOKEN;
}

async function readJson<T>(url: string): Promise<T | null> {
    try {
        const res = await fetch(url, { cache: 'no-store' });
        return res.ok ? ((await res.json()) as T) : null;
    } catch {
        return null;
    }
}

export async function saveSelfCheck(input: Omit<SelfCheckResult, 'clientId' | 'createdAt'>): Promise<SelfCheckResult | null> {
    const t = token();
    if (!t) return null;
    const email = input.email.trim().toLowerCase();
    const record: SelfCheckResult = { ...input, email, clientId: clientIdFromEmail(email), createdAt: new Date().toISOString() };
    invalidate('check');
    const stamp = record.createdAt.replace(/[-:.TZ]/g, '').slice(0, 14);
    await put(`${PREFIX}${record.clientId}/${stamp}.json`, JSON.stringify(record), {
        access: 'public', token: t, addRandomSuffix: true, contentType: 'application/json',
    });
    return record;
}

export async function listSelfChecks(clientId: string): Promise<SelfCheckResult[]> {
    const t = token();
    if (!t || !/^[a-f0-9]{24}$/.test(clientId)) return [];
    const { blobs } = await list({ prefix: `${PREFIX}${clientId}/`, token: t });
    const items = (await Promise.all(blobs.filter((b) => b.pathname.endsWith('.json')).map((b) => readJson<SelfCheckResult>(b.url))))
        .filter((x): x is SelfCheckResult => Boolean(x));
    return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function listAllSelfChecks(): Promise<SelfCheckResult[]> {
    return memo('check:all', TTL.list, listAllSelfChecksUncached);
}
async function listAllSelfChecksUncached(): Promise<SelfCheckResult[]> {
    const t = token();
    if (!t) return [];
    const out: SelfCheckResult[] = [];
    let cursor: string | undefined;
    do {
        const page = await list({ prefix: PREFIX, token: t, cursor, limit: 1000 });
        const loaded = await Promise.all(page.blobs.filter((b) => b.pathname.endsWith('.json')).map((b) => readJson<SelfCheckResult>(b.url)));
        for (const x of loaded) if (x) out.push(x);
        cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
