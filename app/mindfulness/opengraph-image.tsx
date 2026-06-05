import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'MIND & BODY', title: 'マインドフルネス・呼吸', subtitle: '自律神経を整えるスイッチ', bg: '#E6E1EC' });
}
