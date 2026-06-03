import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'HORMONES', title: 'ホルモンの種類', subtitle: '体を調整する化学メッセンジャー', bg: '#ECDCE6' });
}
