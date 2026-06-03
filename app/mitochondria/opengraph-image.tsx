import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'MITOCHONDRIA', title: 'ミトコンドリアとは', subtitle: '細胞のエネルギー発電所', bg: '#CFEAEC' });
}
