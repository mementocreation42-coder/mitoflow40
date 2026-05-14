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
  const res = await fetch(writeUrl('/media'), {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
      'Content-Type': file.type || 'image/jpeg',
    },
    body: file,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Media upload failed: ${res.status} – ${err}`);
  }
  const data = await res.json();
  return { id: data.id, source_url: data.source_url };
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

export async function deleteWPPost(id: number): Promise<void> {
  const res = await fetch(writeUrl(`/posts/${id}?force=true`), {
    method: 'DELETE',
    headers: { Authorization: getAuthHeader() },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Delete post failed: ${res.status} – ${err}`);
  }
}

// 記事内のWordPress内部リンクをフロントエンドURLに書き換える
function rewriteLinks(html: string): string {
    // /?p=123 形式 → /journal/123
    let result = html.replace(
        new RegExp(`${WP_ORIGIN}/\\?p=(\\d+)`, 'g'),
        `${FRONT_ORIGIN}/journal/$1`
    );
    // その他のWPオリジンURL（カテゴリ・スラッグ等）→ /journal
    result = result.replace(
        new RegExp(`${WP_ORIGIN}(/[^"']*)?`, 'g'),
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
        }>;
        'wp:term'?: Array<Array<{
            id: number;
            name: string;
            slug: string;
        }>>;
    };
};

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
    const pubRes = await fetch(wpUrl('/posts', base), { cache: 'no-store' });
    if (!pubRes.ok) {
        const body = await pubRes.text().catch(() => '');
        throw new Error(`Failed to fetch posts (${pubRes.status}): ${body.slice(0, 200)}`);
    }
    const totalPages = parseInt(pubRes.headers.get('X-WP-TotalPages') || '1', 10);
    const pubPosts: WPPost[] = await pubRes.json();

    // 下書き（認証あり、1ページ目のみ全件）
    let draftPosts: WPPost[] = [];
    try {
        const draftUrl = new URL(writeUrl('/posts'));
        const draftParams: Record<string, string | number> = { ...base, status: 'draft', per_page: 100, page: 1 };
        for (const [k, v] of Object.entries(draftParams)) draftUrl.searchParams.set(k, String(v));
        const draftRes = await fetch(draftUrl.toString(), {
            cache: 'no-store',
            headers: { Authorization: getAuthHeader() },
        });
        if (draftRes.ok) {
            draftPosts = await draftRes.json();
        } else {
            const body = await draftRes.text().catch(() => '');
            console.warn(`[wp] Draft fetch failed (${draftRes.status}): ${body.slice(0, 300)}`);
        }
    } catch (e) {
        console.warn('[wp] Draft fetch error:', e);
    }

    // 下書きを先頭に、公開済みをその後に並べる
    const posts = page === 1 ? [...draftPosts, ...pubPosts] : pubPosts;

    return { posts, totalPages, currentPage: page };
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
