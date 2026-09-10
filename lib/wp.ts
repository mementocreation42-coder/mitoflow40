const WP_BASE = 'https://journal.mitoflow40.com/index.php';
const WP_ORIGIN = 'https://journal.mitoflow40.com';
const FRONT_ORIGIN = 'https://mitoflow40.com';

// ===== Write API (Application Password) =====

function getAuthHeader(): string {
  const user = process.env.WP_APP_USERNAME || '';
  const pass = process.env.WP_APP_PASSWORD || '';
  const token = Buffer.from(`${user}:${pass}`).toString('base64');
  return `Basic ${token}`;
}

function writeUrl(path: string): string {
  return `${WP_ORIGIN}/?rest_route=/wp/v2${path}`;
}

export async function uploadMedia(file: Blob, filename: string): Promise<{ id: number; source_url: string }> {
  // 拡張子を保持しつつ非ASCII文字を除去（WAF対策）
  const extMatch = filename.match(/\.([a-zA-Z0-9]+)$/);
  const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg';
  const safeName = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  // multipart/form-data でブラウザ標準のアップロードと同じ形式にする（WAF対策）
  const form = new FormData();
  form.append('file', file, safeName);

  const res = await fetch(writeUrl('/media'), {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'User-Agent': 'Mozilla/5.0 (compatible; Mitoflow40-Admin/1.0)',
    },
    body: form,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Media upload failed: ${res.status} – ${err}`);
  }
  const data = await res.json();
  return { id: data.id, source_url: data.source_url };
}

export interface MediaItem {
  id: number;
  source_url: string;
  thumbnail_url: string;
  title: string;
  alt_text: string;
  mime_type: string;
  date: string;
}

export async function listMedia(opts: { page?: number; perPage?: number; search?: string } = {}): Promise<{ items: MediaItem[]; total: number; totalPages: number }> {
  const page = opts.page ?? 1;
  const perPage = opts.perPage ?? 24;
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    media_type: 'image',
    orderby: 'date',
    order: 'desc',
  });
  if (opts.search) params.set('search', opts.search);

  const url = `${writeUrl('/media')}&${params.toString()}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: getAuthHeader() },
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`List media failed: ${res.status} – ${err}`);
  }
  const data = await res.json();
  const total = parseInt(res.headers.get('x-wp-total') || '0', 10);
  const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);

  type WPMediaSize = { source_url?: string };
  type WPMedia = {
    id: number; source_url: string; mime_type: string; date: string;
    title?: { rendered?: string }; alt_text?: string;
    media_details?: { sizes?: { thumbnail?: WPMediaSize; medium?: WPMediaSize } };
  };
  const items: MediaItem[] = (data as WPMedia[]).map((m) => ({
    id: m.id,
    source_url: m.source_url,
    thumbnail_url: m.media_details?.sizes?.thumbnail?.source_url
      || m.media_details?.sizes?.medium?.source_url
      || m.source_url,
    title: m.title?.rendered || '',
    alt_text: m.alt_text || '',
    mime_type: m.mime_type,
    date: m.date,
  }));
  return { items, total, totalPages };
}

export interface CreatePostInput {
  title: string;
  content: string;
  excerpt?: string;
  date?: string;
  status?: 'publish' | 'draft';
  categories?: number[];
  featured_media?: number;
}

export async function createWPPost(input: CreatePostInput): Promise<{ id: number; slug: string }> {
  const res = await fetch(writeUrl('/posts'), {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: input.title,
      content: input.content,
      excerpt: input.excerpt || '',
      date: input.date,
      status: input.status || 'publish',
      categories: input.categories || [],
      featured_media: input.featured_media || 0,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Create post failed: ${res.status} – ${err}`);
  }
  const post = await res.json();
  return { id: post.id, slug: post.slug };
}

export async function updateWPPost(id: number, input: Partial<CreatePostInput>): Promise<{ id: number; slug: string }> {
  const res = await fetch(writeUrl(`/posts/${id}`), {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Update post failed: ${res.status} – ${err}`);
  }
  const post = await res.json();
  return { id: post.id, slug: post.slug };
}

export async function deleteWPPost(id: number): Promise<{ how: string }> {
  // WAF (SiteGuard等) が DELETE メソッドを弾くことがあるため、順に試す：
  // 1) POST + _method=DELETE（メソッド上書き） 2) 本物の DELETE 3) ゴミ箱へ移動（WordPress 管理画面の「ゴミ箱へ」と同じ）
  const base = { Authorization: getAuthHeader(), 'User-Agent': 'Mozilla/5.0 (compatible; Mitoflow40-Admin/1.0)' };
  const attempts: Array<{ how: string; run: () => Promise<Response> }> = [
    { how: 'override', run: () => fetch(`${writeUrl(`/posts/${id}`)}&force=true&_method=DELETE`, { method: 'POST', headers: { ...base, 'X-HTTP-Method-Override': 'DELETE' } }) },
    { how: 'delete', run: () => fetch(`${writeUrl(`/posts/${id}`)}&force=true`, { method: 'DELETE', headers: base }) },
    // WordPress は status:'trash' の更新を受け付けない（無効なパラメータ）。force なしの DELETE がゴミ箱移動
    { how: 'trash', run: () => fetch(`${writeUrl(`/posts/${id}`)}&_method=DELETE`, { method: 'POST', headers: { ...base, 'X-HTTP-Method-Override': 'DELETE' } }) },
  ];
  const errors: string[] = [];
  for (const a of attempts) {
    const res = await a.run();
    if (res.ok) return { how: a.how };
    const body = (await res.text()).replace(/\s+/g, ' ').slice(0, 200);
    errors.push(`${a.how}: ${res.status} ${body}`);
    if (res.status === 401) break; // 認証そのものが通っていない（アプリケーションパスワードを確認）
  }
  throw new Error(`Delete post failed – ${errors.join(' / ')}`);
}

// 記事内のWordPress内部リンクをフロントエンドURLに書き換える
function rewriteLinks(html: string): string {
    // /?p=123 形式 → /journal/123
    let result = html.replace(
        new RegExp(`${WP_ORIGIN}/\\?p=(\\d+)`, 'g'),
        `${FRONT_ORIGIN}/journal/$1`
    );
    // その他のWPオリジンURL（カテゴリ・スラッグ等）→ /journal
    // ただし /wp-content/ (画像等) と /wp-includes/ は除外
    result = result.replace(
        new RegExp(`${WP_ORIGIN}(?!/wp-content|/wp-includes|/wp-json)(/[^"'\\s]*)?`, 'g'),
        `${FRONT_ORIGIN}/journal`
    );
    return result;
}

function wpUrl(path: string, params?: Record<string, string | number>): string {
    const url = new URL(WP_BASE);
    url.searchParams.set('rest_route', `/wp/v2${path}`);
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            url.searchParams.set(key, String(value));
        }
    }
    return url.toString();
}

export type WPPost = {
    id: number;
    date: string;
    slug: string;
    status?: 'publish' | 'draft' | 'pending' | 'private';
    featured_media?: number; // アイキャッチのメディア ID（0 = 無し）
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
            media_details?: {
                width?: number;
                height?: number;
                sizes?: Record<string, { source_url: string; width: number; height: number }>;
            };
        }>;
        'wp:term'?: Array<Array<{
            id: number;
            name: string;
            slug: string;
        }>>;
    };
};

// 一覧のサムネイル用に、WordPress が生成した縮小版（medium=300px 幅など）の URL を返す。
// 原寸（1200〜1920px・100〜400KB）をそのまま <img> に流すと、一覧 1 ページで数 MB の転送と
// デコードが発生して重い。縮小版が無い古いメディアは原寸にフォールバックする。
export function featuredImageUrl(post: WPPost, prefer: string[] = ['medium', 'medium_large', 'thumbnail']): string | undefined {
    const media = post._embedded?.['wp:featuredmedia']?.[0];
    if (!media) return undefined;
    const sizes = media.media_details?.sizes;
    if (sizes) {
        for (const key of prefer) {
            const hit = sizes[key]?.source_url;
            if (hit) return hit;
        }
    }
    return media.source_url;
}

export async function getAllPosts(): Promise<WPPost[]> {
    const res = await fetch(wpUrl('/posts', { _embed: '1', per_page: 100 }), {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    return res.json();
}

export async function getPostBySlug(slug: string): Promise<WPPost | undefined> {
    const res = await fetch(wpUrl('/posts', { _embed: '1', slug }), {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch post');
    }

    const posts = await res.json();
    return posts.length > 0 ? posts[0] : undefined;
}

export async function getPostById(id: number): Promise<WPPost | undefined> {
    const res = await fetch(wpUrl(`/posts/${id}`, { _embed: '1' }), {
        next: { revalidate: 3600 },
    });

    if (res.ok) {
        const post: WPPost = await res.json();
        post.content.rendered = rewriteLinks(post.content.rendered);
        return post;
    }

    // 公開APIで取得できない場合は下書きの可能性があるので認証付きで再試行
    try {
        const draftUrl = new URL(writeUrl(`/posts/${id}`));
        draftUrl.searchParams.set('_embed', '1');
        const draftRes = await fetch(draftUrl.toString(), {
            cache: 'no-store',
            headers: { Authorization: getAuthHeader() },
        });
        if (!draftRes.ok) return undefined;
        const post: WPPost = await draftRes.json();
        post.content.rendered = rewriteLinks(post.content.rendered);
        return post;
    } catch {
        return undefined;
    }
}

export async function getPostByDateAndSlug(
    year: string,
    month: string,
    day: string,
    slug: string
): Promise<WPPost | undefined> {
    // Fetch by slug first, then verify the date matches
    const res = await fetch(wpUrl('/posts', { _embed: '1', slug }), {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch post');
    }

    const posts: WPPost[] = await res.json();

    // Find the post that matches both slug and date
    return posts.find((post) => {
        const postDate = new Date(post.date);
        return (
            postDate.getFullYear().toString() === year &&
            (postDate.getMonth() + 1).toString().padStart(2, '0') === month &&
            postDate.getDate().toString().padStart(2, '0') === day
        );
    });
}

export async function getLatestPosts(limit = 3): Promise<WPPost[]> {
    const res = await fetch(wpUrl('/posts', { _embed: '1', per_page: limit }), {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    return res.json();
}

export async function getRelatedPosts(currentPostId: number, limit = 3): Promise<WPPost[]> {
    const res = await fetch(wpUrl('/posts', { _embed: '1', per_page: limit, exclude: currentPostId }), {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        return [];
    }

    return res.json();
}

export type PaginatedPosts = {
    posts: WPPost[];
    totalPages: number;
    currentPage: number;
};

export async function getPostsPaginated(page = 1, perPage = 20, search?: string, categoryId?: number): Promise<PaginatedPosts> {
    const base: Record<string, string | number> = {
        _embed: '1',
        per_page: perPage,
        page,
        _fields: 'id,date,slug,title,excerpt,status,_links,_embedded',
    };
    if (search) base.search = search;
    if (categoryId) base.categories = categoryId;

    // 公開済み（認証不要、デフォルトで publish のみ返る）
    // WordPress 側（ホストのページキャッシュ）が REST の応答を数分保持することがあり、削除直後に古い一覧が返る。
    // 管理画面の一覧は毎回ユニークなパラメータを付けてキャッシュをすり抜ける
    const fetchPublished = async (): Promise<{ posts: WPPost[]; totalPages: number }> => {
        const res = await fetch(wpUrl('/posts', { ...base, _cb: Date.now() }), { cache: 'no-store' });
        if (!res.ok) {
            const body = await res.text().catch(() => '');
            throw new Error(`Failed to fetch posts (${res.status}): ${body.slice(0, 200)}`);
        }
        return { posts: await res.json(), totalPages: parseInt(res.headers.get('X-WP-TotalPages') || '1', 10) };
    };

    // 下書き（認証あり）。1ページ目の先頭にだけ並べるので、2ページ目以降は取りに行かない
    const fetchDrafts = async (): Promise<WPPost[]> => {
        if (page !== 1) return [];
        try {
            const draftUrl = new URL(writeUrl('/posts'));
            const draftParams: Record<string, string | number> = { ...base, status: 'draft', per_page: 100, page: 1 };
            for (const [k, v] of Object.entries(draftParams)) draftUrl.searchParams.set(k, String(v));
            const draftRes = await fetch(draftUrl.toString(), {
                cache: 'no-store',
                headers: { Authorization: getAuthHeader() },
            });
            if (draftRes.ok) return draftRes.json();
            const body = await draftRes.text().catch(() => '');
            console.warn(`[wp] Draft fetch failed (${draftRes.status}): ${body.slice(0, 300)}`);
        } catch (e) {
            console.warn('[wp] Draft fetch error:', e);
        }
        return [];
    };

    // 公開済みと下書きは互いに依存しないので同時に取りに行く（直列だと WordPress 往復 2 回ぶん待つ）
    const [published, draftPosts] = await Promise.all([fetchPublished(), fetchDrafts()]);

    // 下書きを先頭に、公開済みをその後に並べる
    const posts = [...draftPosts, ...published.posts];

    return { posts, totalPages: published.totalPages, currentPage: page };
}

export type WPCategory = {
    id: number;
    name: string;
    slug: string;
    count: number;
};

export async function getCategories(): Promise<WPCategory[]> {
    const res = await fetch(wpUrl('/categories', { per_page: 50 }), {
        next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
}

export async function getAllPostsForSitemap(): Promise<{ id: number; date: string }[]> {
    // Fetch all posts (up to 1000 for now) with minimal fields
    const res = await fetch(wpUrl('/posts', { per_page: 100, _fields: 'id,date' }), {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        return [];
    }

    // Handle pagination if needed in the future, currently just returns first 100
    // Realistically for a sitemap we might need to loop through pages if > 100
    // But let's start with this.
    return res.json();
}
