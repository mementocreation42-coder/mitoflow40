import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'THE APPROACH', title: '健康とは', subtitle: '病気でないことは、ゴールではない', bg: '#CDEBE2' });
}
