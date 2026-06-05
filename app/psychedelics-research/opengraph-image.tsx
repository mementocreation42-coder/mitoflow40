import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'RESEARCH FRONTIER', title: 'サイケデリック研究の潮流', subtitle: '海外の研究動向を中立的に（日本では違法）', bg: '#E6E1EC' });
}
