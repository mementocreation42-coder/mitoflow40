export const WP_API_URL = 'https://hyperpast-journal.xyz/wp-json/wp/v2';

export type WPPost = {
    id: number;
    date: string;
    slug: string;
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
    };
};

export async function getAllPosts(): Promise<WPPost[]> {
    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=100`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    return res.json();
}

export async function getPostBySlug(slug: string): Promise<WPPost | undefined> {
    const res = await fetch(`${WP_API_URL}/posts?_embed&slug=${encodeURIComponent(slug)}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch post');
    }

    const posts = await res.json();
    return posts.length > 0 ? posts[0] : undefined;
}

export async function getPostById(id: number): Promise<WPPost | undefined> {
    const res = await fetch(`${WP_API_URL}/posts/${id}?_embed`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        return undefined;
    }

    return res.json();
}

export async function getPostByDateAndSlug(
    year: string,
    month: string,
    day: string,
    slug: string
): Promise<WPPost | undefined> {
    // Fetch by slug first, then verify the date matches
    const res = await fetch(`${WP_API_URL}/posts?_embed&slug=${encodeURIComponent(slug)}`, {
        next: { revalidate: 60 },
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
    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=${limit}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    return res.json();
}

export async function getRelatedPosts(currentPostId: number, limit = 3): Promise<WPPost[]> {
    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=${limit}&exclude=${currentPostId}`, {
        next: { revalidate: 60 },
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

export async function getPostsPaginated(page = 1, perPage = 20, search?: string): Promise<PaginatedPosts> {
    let url = `${WP_API_URL}/posts?_embed&per_page=${perPage}&page=${page}`;
    if (search) {
        url += `&search=${encodeURIComponent(search)}`;
    }

    const res = await fetch(url, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);

    return {
        posts: await res.json(),
        totalPages,
        currentPage: page,
    };
}
