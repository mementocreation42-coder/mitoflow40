import { MetadataRoute } from 'next';
import { getAllPostsForSitemap } from '@/lib/wp';
import { genes } from '@/lib/genes';
import { nutrients } from '@/lib/nutrients';
import { biomarkers } from '@/lib/biomarkers';
import { foods } from '@/lib/foods';
import { organs } from '@/lib/organs';
import { hormones } from '@/lib/hormones';
import { symptoms } from '@/lib/symptoms';
import { essays } from '@/lib/essays';
import { conditions } from '@/lib/conditions';
import { staticPages } from '@/lib/pages';

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
    const hormoneUrls = hormones.map((h) => ({
        url: `${BASE_URL}/hormones/${h.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));
    const symptomUrls = symptoms.map((s) => ({
        url: `${BASE_URL}/symptoms/${s.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));
    const conditionUrls = conditions.map((c) => ({
        url: `${BASE_URL}/conditions/${c.slug}`,
        lastModified: new Date(c.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));
    const essayUrls = essays.map((e) => ({
        url: `${BASE_URL}/thoughts/${e.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // 固定ページ（トップ・ハブ・コンセプト解説など）は単一レジストリ lib/pages.ts から。
    // ページ追加は pages.ts に1行足すだけで、sitemap・横断検索の双方へ自動反映される。
    const staticUrls = staticPages.map((p) => ({
        url: p.path === '/' ? BASE_URL : `${BASE_URL}${p.path}`,
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
        ...hormoneUrls,
        ...symptomUrls,
        ...conditionUrls,
        ...essayUrls,
        ...journalUrls,
    ];
}
