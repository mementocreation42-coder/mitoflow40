import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'TCA CYCLE', title: 'TCA回路', subtitle: 'クエン酸回路（TCAサイクル）', bg: '#FFE9D2' });
}
