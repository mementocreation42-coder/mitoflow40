import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'THE MIDDLE WAY', title: 'バランス（中庸）', subtitle: '体は「ちょうどよさ」でできている', bg: '#EAE6DD' });
}
