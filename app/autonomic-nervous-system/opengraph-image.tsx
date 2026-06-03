import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'ANS & HRV', title: '自律神経とHRV', subtitle: 'アクセルとブレーキのバランス', bg: '#DCE7F0' });
}
