import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'THE APPROACH', title: '精密栄養学とは', subtitle: 'みんなの平均ではなく、あなたの最適', bg: '#CDEBE2' });
}
