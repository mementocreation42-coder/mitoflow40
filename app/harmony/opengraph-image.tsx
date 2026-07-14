import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'HARMONY', title: '健康と和', subtitle: '「和」から健康を読み解く', bg: '#ECE5DA' });
}
