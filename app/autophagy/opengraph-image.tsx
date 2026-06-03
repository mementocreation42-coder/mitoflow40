import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'AUTOPHAGY', title: 'オートファジー', subtitle: '細胞の自己リサイクル', bg: '#E7EEDA' });
}
