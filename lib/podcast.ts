// SAL Radio のエピソードを RSS から取得し、ヘルスケア回だけを自動キュレーションする。
//
// 「どれがヘルスケア回か」を人手で登録しないのが方針。
// タイトルに「ヘルスケア」という言葉が含まれる回だけが自動で /podcast に載る。

export const SHOW_ID = '3g1Jexgm6ZWa1XYTFLGIxo';
export const SHOW_NAME = 'SAL Radio｜釣りと身体とものづくりの雑談';
export const SHOW_URL = `https://open.spotify.com/show/${SHOW_ID}`;

const RSS_URL = 'https://anchor.fm/s/f035da90/podcast/rss';

/** これをタイトルに含むものだけをヘルスケア回とみなす */
const HEALTH_KEYWORD = 'ヘルスケア';

export interface Episode {
    id: string;
    name: string;
    description: string;
    releaseDate: string;
    durationMin: number;
    imageUrl: string | null;
    /** エピソードのリンク先（Spotify for Podcasters） */
    spotifyUrl: string;
    /** 再生用の音源URL（RSSのenclosure） */
    audioUrl: string;
}

export function isHealthEpisode(title: string): boolean {
    return title.includes(HEALTH_KEYWORD);
}

function decodeEntities(s: string): string {
    return s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
}

function extractTag(block: string, tag: string): string | null {
    const cdataMatch = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`));
    if (cdataMatch) return cdataMatch[1].trim();
    const plainMatch = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
    if (plainMatch) return decodeEntities(plainMatch[1].trim());
    return null;
}

function extractAttr(block: string, tag: string, attr: string): string | null {
    const match = block.match(new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"[^>]*/?>`));
    return match ? match[1] : null;
}

function parseDurationToMin(raw: string | null): number {
    if (!raw) return 0;
    const parts = raw.split(':').map((p) => Number.parseInt(p, 10));
    if (parts.some((p) => Number.isNaN(p))) return 0;
    let seconds = 0;
    for (const p of parts) seconds = seconds * 60 + p;
    return Math.round(seconds / 60);
}

function toIsoDate(pubDate: string | null): string {
    if (!pubDate) return '';
    const d = new Date(pubDate);
    if (Number.isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
}

function parseItem(block: string, channelImage: string | null): Episode | null {
    const title = extractTag(block, 'title');
    const enclosureUrl = extractAttr(block, 'enclosure', 'url');
    const guid = extractTag(block, 'guid');
    if (!title || !enclosureUrl || !guid) return null;

    const rawDescription = extractTag(block, 'description') || '';
    const description = rawDescription
        .replace(/<[^>]*>/g, ' ')
        .split(/▶|https?:\/\//)[0]
        .replace(/\s+/g, ' ')
        .trim();

    return {
        id: guid,
        name: title,
        description,
        releaseDate: toIsoDate(extractTag(block, 'pubDate')),
        durationMin: parseDurationToMin(extractTag(block, 'itunes:duration')),
        imageUrl: extractAttr(block, 'itunes:image', 'href') ?? channelImage,
        spotifyUrl: extractTag(block, 'link') ?? SHOW_URL,
        audioUrl: enclosureUrl,
    };
}

export interface PodcastResult {
    /** ヘルスケア回（新しい順） */
    episodes: Episode[];
    /** 番組全体の配信本数（取得できなかった場合は null） */
    totalEpisodes: number | null;
    /** RSS から取得できたか */
    available: boolean;
}

/**
 * RSS フィードから全エピソードを取得し、タイトルに「ヘルスケア」を含む回だけに絞って返す。
 * 取得に失敗した場合も throw せず available:false を返す（ビルドを落とさない）。
 */
export async function getHealthEpisodes(): Promise<PodcastResult> {
    try {
        const res = await fetch(RSS_URL, { next: { revalidate: 3600 } });
        if (!res.ok) {
            console.error('[podcast] RSS fetch failed:', res.status);
            return { episodes: [], totalEpisodes: null, available: false };
        }
        const xml = await res.text();
        const channelImage = extractAttr(xml, 'itunes:image', 'href');
        const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
        const all = itemBlocks
            .map((block) => parseItem(block, channelImage))
            .filter((ep): ep is Episode => ep !== null);

        const episodes = all
            .filter((ep) => isHealthEpisode(ep.name))
            .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));

        return { episodes, totalEpisodes: all.length, available: true };
    } catch (e) {
        console.error('[podcast] RSS parse error:', e);
        return { episodes: [], totalEpisodes: null, available: false };
    }
}

export function formatDate(iso: string): string {
    const [y, m, d] = iso.split('-');
    if (!m) return y;
    return d ? `${y}.${m}.${d}` : `${y}.${m}`;
}
