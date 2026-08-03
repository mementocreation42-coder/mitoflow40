import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'INSULIN RESISTANCE', title: 'インスリン抵抗性', subtitle: '血糖が上がる前に起きていること', bg: '#F6E6CF' });
}
