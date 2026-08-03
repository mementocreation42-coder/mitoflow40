// SAL Radio（Spotify）のエピソードを取得し、ヘルスケア回だけを自動キュレーションする。
//
// 「どれがヘルスケア回か」を人手で登録しないのが方針。
// タイトル／説明文をキーワードで判定し、条件に合った回だけが自動で /podcast に載る。
// 判定を変えたいときは、このファイル上部の3つの定数だけを触ればよい。

export const SHOW_ID = '3g1Jexgm6ZWa1XYTFLGIxo';
export const SHOW_NAME = 'SAL Radio｜釣りと身体とものづくりの雑談';
export const SHOW_URL = `https://open.spotify.com/show/${SHOW_ID}`;

/** これを含むエピソードをヘルスケア回とみなす（タイトル優先、なければ説明文も見る） */
const HEALTH_KEYWORDS = [
    'ヘルスケア', '健康', 'ヘルス', 'Mitoflow', 'ミトフロー',
    '体調', '不調', '疲れ', '疲労', '未病',
    '栄養', '食事', '食べ', '血糖', '血液検査', '健康診断',
    '腸', '睡眠', 'ミトコンドリア', '細胞', '代謝', 'ATP',
    'ストレス', 'メンタル', '自律神経', 'ホルモン',
    'サプリ', '断食', 'ファスティング', '呼吸',
];

/** これを含むものは、健康ワードを持っていてもヘルスケア回として扱わない（釣り／制作ブランド回） */
const EXCLUDE_KEYWORDS = ['HL Fishing', 'HLフィッシング'];

/** キーワード判定を飛び越して必ず載せたい回があれば、エピソードIDをここに足す */
const PINNED_EPISODE_IDS: string[] = [];

export interface Episode {
    id: string;
    name: string;
    description: string;
    releaseDate: string;
    durationMin: number;
    imageUrl: string | null;
    spotifyUrl: string;
    embedUrl: string;
    /** 手動ピンで載っているか（キーワード判定ではなく） */
    pinned: boolean;
}

interface SpotifyEpisode {
    id: string;
    name: string;
    description: string;
    release_date: string;
    duration_ms: number;
    images?: { url: string; width: number }[];
    external_urls?: { spotify?: string };
}

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string | null> {
    const id = process.env.SPOTIFY_CLIENT_ID;
    const secret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!id || !secret) return null;

    if (tokenCache && tokenCache.expiresAt > Date.now() + 30_000) return tokenCache.token;

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
        },
        body: 'grant_type=client_credentials',
        cache: 'no-store',
    });
    if (!res.ok) {
        console.error('[podcast] Spotify token request failed:', res.status, await res.text());
        return null;
    }
    const data = (await res.json()) as { access_token: string; expires_in: number };
    tokenCache = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
    return data.access_token;
}

function normalize(s: string): string {
    return s.toLowerCase();
}

function isExcluded(ep: SpotifyEpisode): boolean {
    const hay = normalize(ep.name);
    return EXCLUDE_KEYWORDS.some((k) => hay.includes(normalize(k)));
}

/** ヘルスケア回かどうか。タイトルに健康ワードがあれば確定、なければ説明文でも拾う。 */
export function isHealthEpisode(ep: SpotifyEpisode): boolean {
    if (PINNED_EPISODE_IDS.includes(ep.id)) return true;
    if (isExcluded(ep)) return false;
    const title = normalize(ep.name);
    if (HEALTH_KEYWORDS.some((k) => title.includes(normalize(k)))) return true;
    // 説明文は共通のリンク集が入るため、判定には「健康」の明示ワードのみを使う
    const desc = normalize(ep.description || '');
    return ['ヘルスケア', '健康法', '健康の話'].some((k) => desc.includes(normalize(k)));
}

function toEpisode(ep: SpotifyEpisode): Episode {
    const image = (ep.images || []).slice().sort((a, b) => (b.width || 0) - (a.width || 0))[0];
    return {
        id: ep.id,
        name: ep.name,
        // 説明文の末尾に毎回同じリンク集が付くので、最初の段落だけを表示用に使う
        description: (ep.description || '').split(/▶|https?:\/\//)[0].trim(),
        releaseDate: ep.release_date,
        durationMin: Math.round(ep.duration_ms / 60000),
        imageUrl: image?.url ?? null,
        spotifyUrl: ep.external_urls?.spotify ?? `https://open.spotify.com/episode/${ep.id}`,
        embedUrl: `https://open.spotify.com/embed/episode/${ep.id}?utm_source=generator&theme=0`,
        pinned: PINNED_EPISODE_IDS.includes(ep.id),
    };
}

export interface PodcastResult {
    /** ヘルスケア回（新しい順） */
    episodes: Episode[];
    /** 番組全体の配信本数（取得できなかった場合は null） */
    totalEpisodes: number | null;
    /** Spotify から取得できたか。false ならキーワード判定以前の問題（未設定・失敗） */
    available: boolean;
}

/**
 * 番組の全エピソードを取得し、ヘルスケア回だけに絞って返す。
 * 認証情報が無い／取得に失敗した場合も throw せず available:false を返す（ビルドを落とさない）。
 */
export async function getHealthEpisodes(): Promise<PodcastResult> {
    const token = await getAccessToken();
    if (!token) return { episodes: [], totalEpisodes: null, available: false };

    const all: SpotifyEpisode[] = [];
    let url: string | null =
        `https://api.spotify.com/v1/shows/${SHOW_ID}/episodes?market=JP&limit=50`;

    try {
        while (url) {
            const res: Response = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
                next: { revalidate: 3600 },
            });
            if (!res.ok) {
                console.error('[podcast] Spotify episodes request failed:', res.status, await res.text());
                return { episodes: [], totalEpisodes: null, available: false };
            }
            const data = (await res.json()) as { items: (SpotifyEpisode | null)[]; next: string | null };
            all.push(...data.items.filter((x): x is SpotifyEpisode => Boolean(x)));
            url = data.next;
        }
    } catch (e) {
        console.error('[podcast] Spotify fetch error:', e);
        return { episodes: [], totalEpisodes: null, available: false };
    }

    const episodes = all
        .filter(isHealthEpisode)
        .map(toEpisode)
        .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));

    return { episodes, totalEpisodes: all.length, available: true };
}

export function formatDate(iso: string): string {
    const [y, m, d] = iso.split('-');
    if (!m) return y;
    return d ? `${y}.${m}.${d}` : `${y}.${m}`;
}
