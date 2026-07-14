import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'NEUROINFLAMMATION', title: '神経炎症とは', subtitle: 'IL-6が脳と心に及ぶとき', bg: '#E9E3EF' });
}
