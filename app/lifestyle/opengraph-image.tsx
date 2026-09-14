import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'LIFESTYLE', title: '生活習慣', subtitle: '睡眠・光・水・運動・嗜好品・解毒・計測・サプリ', bg: '#E7EFD8' });
}
