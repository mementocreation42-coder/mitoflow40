import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'HISTORY & POLICY', title: '大麻をめぐる歴史と世界の動き', subtitle: '中立な解説（日本では違法）', bg: '#E3E8DF' });
}
