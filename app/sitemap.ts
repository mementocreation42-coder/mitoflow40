import { MetadataRoute } from 'next';
import { getAllPostsForSitemap } from '@/lib/wp';
import { genes } from '@/lib/genes';

const BASE_URL = 'https://mitoflow40.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPostsForSitemap();

    const journalUrls = posts.map((post) => ({
        url: `${BASE_URL}/journal/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const geneUrls = genes.map((gene) => ({
        url: `${BASE_URL}/genes/${gene.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/journal`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/genes`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/newsletter`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        ...journalUrls,
        ...geneUrls,
    ];
}
