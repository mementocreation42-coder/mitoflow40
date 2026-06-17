import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'CGM', title: '血糖モニタリング', subtitle: 'フリースタイルリブレで自分の血糖を可視化する', bg: '#DEEDF7' });
}
