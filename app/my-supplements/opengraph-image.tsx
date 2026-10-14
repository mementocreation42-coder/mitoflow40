import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'MY SUPPLEMENTS', title: '僕が飲んでいるサプリ', subtitle: '単体で、体に聞きながら', bg: '#EDE6D3' });
}
