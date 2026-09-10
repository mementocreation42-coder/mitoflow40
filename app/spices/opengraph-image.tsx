import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'SPICES', title: 'スパイスの歴史と現在', subtitle: '薬から食卓へ。効能の期待と、確かめられていること', bg: '#F6E9CF' });
}
