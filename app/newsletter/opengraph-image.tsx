import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'NEWSLETTER', title: 'SAL LETTER', subtitle: 'ニュースレター', bg: '#EAE2F0' });
}
