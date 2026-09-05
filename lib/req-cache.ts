// ── 読み取りの短期キャッシュ ────────────────────────────────────────────
// 管理画面は Vercel Blob を「一覧 → 各 JSON を fetch」で読むため、ページごとに数十回の往復が発生して重い。
// 同じ一覧を数秒〜数十秒だけ使い回す（同一プロセス内）。書き込み時は invalidate() で捨てる。
// Vercel では複数インスタンスにまたがると別インスタンスのキャッシュは残るが、TTL が短いので影響は数秒〜数十秒。

type Entry = { at: number; value: Promise<unknown> };
const store = new Map<string, Entry>();

export function memo<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
    const hit = store.get(key);
    if (hit && Date.now() - hit.at < ttlMs) return hit.value as Promise<T>;
    const value = fn().catch((e) => { store.delete(key); throw e; });
    store.set(key, { at: Date.now(), value });
    return value;
}

export function invalidate(prefix: string): void {
    for (const k of Array.from(store.keys())) if (k.startsWith(prefix)) store.delete(k);
}

export const TTL = { list: 20_000 } as const;
