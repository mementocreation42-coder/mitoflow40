import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'SOUND', title: '音と健康', subtitle: 'α波・振動・音楽療法と、周波数ヒーリングの潮流', bg: '#E6E0F2' });
}
