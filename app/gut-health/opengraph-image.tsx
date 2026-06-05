import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'GUT HEALTH', title: '腸内環境とは', subtitle: '免疫・気分・解毒の交差点 ／ 腸活の基本', bg: '#CDEBE2' });
}
