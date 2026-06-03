import { MetadataRoute } from 'next';
import { getAllPostsForSitemap } from '@/lib/wp';
import { genes } from '@/lib/genes';
import { nutrients } from '@/lib/nutrients';
import { biomarkers } from '@/lib/biomarkers';
import { foods } from '@/lib/foods';
import { organs } from '@/lib/organs';

const BASE_URL = 'https://mitoflow40.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();
    const posts = await getAllPostsForSitemap();

    const journalUrls = posts.map((post) => ({
        url: `${BASE_URL}/journal/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 各カタログの詳細ページ
    const geneUrls = genes.map((g) => ({
        url: `${BASE_URL}/genes/${g.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));
    const nutrientUrls = nutrients.map((n) => ({
        url: `${BASE_URL}/nutrients/${n.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));
    const biomarkerUrls = biomarkers.map((b) => ({
        url: `${BASE_URL}/biomarkers/${b.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));
    const foodUrls = foods.map((f) => ({
        url: `${BASE_URL}/foods/${f.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));
    const organUrls = organs.map((o) => ({
        url: `${BASE_URL}/organs/${o.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // 固定ページ（トップ・ハブ・コンセプト解説など）
    const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
        { path: '', priority: 1, changeFrequency: 'daily' },
        { path: '/journal', priority: 0.9, changeFrequency: 'daily' },
        { path: '/check', priority: 0.9, changeFrequency: 'monthly' },
        { path: '/sample', priority: 0.7, changeFrequency: 'monthly' },
        { path: '/library', priority: 0.8, changeFrequency: 'weekly' },
        { path: '/precision-nutrition', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/molecular-nutrition', priority: 0.8, changeFrequency: 'monthly' },
        // カタログ一覧
        { path: '/genes', priority: 0.7, changeFrequency: 'monthly' },
        { path: '/nutrients', priority: 0.7, changeFrequency: 'monthly' },
        { path: '/biomarkers', priority: 0.7, changeFrequency: 'monthly' },
        { path: '/foods', priority: 0.7, changeFrequency: 'monthly' },
        { path: '/organs', priority: 0.7, changeFrequency: 'monthly' },
        { path: '/hormones', priority: 0.7, changeFrequency: 'monthly' },
        // からだのしくみ
        { path: '/mitochondria', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/glycolysis', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/tca-cycle', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/electron-transport-chain', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/atp', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/ketones', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/gut-brain', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/autophagy', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/methylation', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/blood-sugar', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/autonomic-nervous-system', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/circadian-rhythm', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/sleep', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/exercise', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/detox', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/wearables', priority: 0.6, changeFrequency: 'monthly' },
        // 老化の3大ルート
        { path: '/oxidative-stress', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/glycation', priority: 0.6, changeFrequency: 'monthly' },
        { path: '/inflammation', priority: 0.6, changeFrequency: 'monthly' },
        // その他
        { path: '/author', priority: 0.5, changeFrequency: 'yearly' },
        { path: '/newsletter', priority: 0.5, changeFrequency: 'monthly' },
    ];

    const staticUrls = staticPages.map((p) => ({
        url: `${BASE_URL}${p.path}`,
        lastModified: now,
        changeFrequency: p.changeFrequency,
        priority: p.priority,
    }));

    return [
        ...staticUrls,
        ...geneUrls,
        ...nutrientUrls,
        ...biomarkerUrls,
        ...foodUrls,
        ...organUrls,
        ...journalUrls,
    ];
}
