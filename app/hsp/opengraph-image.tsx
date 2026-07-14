import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'HIGHLY SENSITIVE PERSON', title: 'HSP（繊細さん）', subtitle: '気質と体の状態を切り分ける', bg: '#EFEAF6' });
}
