import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'MENTAL HEALTH', title: '心の現代病', subtitle: 'うつ・不安・燃え尽きを「体から」', bg: '#E6E0F2' });
}
