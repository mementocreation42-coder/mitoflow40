import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'NUTRIENTS', title: '栄養素', subtitle: '体をつくる分子たち', bg: '#FFF1DF' });
}
