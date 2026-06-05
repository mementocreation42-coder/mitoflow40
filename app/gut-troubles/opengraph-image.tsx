import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'GUT KEYWORDS', title: '気になる腸のキーワード', subtitle: 'グルテン・カゼイン・リーキーガット・SIBO', bg: '#CDEBE2' });
}
