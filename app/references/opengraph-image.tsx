import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'SOURCES & CITATIONS', title: '参照文献・出典', subtitle: 'NIH・WHO・査読論文などの一次情報', bg: '#CDEBE2' });
}
