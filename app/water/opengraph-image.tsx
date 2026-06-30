import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'WATER', title: '水と健康', subtitle: '体の約60%は水。役割と必要量、そして「機能水」の見極め', bg: '#DEEAF2' });
}
