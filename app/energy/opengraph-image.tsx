import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'ENERGY & METABOLISM', title: 'エネルギーとは', subtitle: '疲れにくさ＝作り続けられること', bg: '#CDEBE2' });
}
