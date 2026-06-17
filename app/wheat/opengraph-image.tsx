import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'WHEAT', title: '小麦と健康', subtitle: '血糖・グルテン・精製と、上手なつき合い方', bg: '#F6E9CF' });
}
