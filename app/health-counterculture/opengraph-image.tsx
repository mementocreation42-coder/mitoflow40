import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'COUNTERCULTURE', title: '健康とは、静かな反抗である', subtitle: '身体から始めるカウンターカルチャー', bg: '#EAE6DD' });
}
