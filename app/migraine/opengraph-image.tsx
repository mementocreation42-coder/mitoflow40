import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'MIGRAINE', title: '片頭痛と体', subtitle: '引き金・栄養・受診の目安を中立に', bg: '#E9E3EF' });
}
