import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'CIRCADIAN', title: 'サーカディアンリズム', subtitle: '約24時間の体内時計', bg: '#E2E0F0' });
}
