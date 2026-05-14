import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/login'],
            },
        ],
        sitemap: 'https://mitoflow40.com/sitemap.xml',
    };
}
