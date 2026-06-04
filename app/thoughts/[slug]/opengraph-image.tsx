import { ogImage, ogSize, ogContentType } from '@/lib/og';
import { essays, getEssayBySlug } from '@/lib/essays';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export function generateStaticParams() {
    return essays.map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const e = getEssayBySlug(slug);
    return ogImage({
        eyebrow: `THOUGHTS · ${e?.en ?? ''}`,
        title: e?.title ?? '思索',
        subtitle: e?.tagline ?? '',
        bg: e?.color ?? '#CDEBE2',
    });
}
