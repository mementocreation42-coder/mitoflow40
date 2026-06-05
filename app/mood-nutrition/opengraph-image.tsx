import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'MIND & BODY', title: '気分と栄養', subtitle: '心の材料は、食べ物', bg: '#E6E1EC' });
}
