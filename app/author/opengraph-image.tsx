import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'AUTHOR', title: '小林大介', subtitle: '著者・監修', bg: '#EAE2F0' });
}
