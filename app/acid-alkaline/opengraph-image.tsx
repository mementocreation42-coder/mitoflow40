import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'ACID & ALKALINE', title: '酸性・アルカリ性とは', subtitle: '「アルカリ性食品」の誤解を中立に', bg: '#D9E6F2' });
}
