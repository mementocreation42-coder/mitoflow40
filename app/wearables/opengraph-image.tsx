import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'QUANTIFY YOURSELF', title: 'ウェアラブル活用術', subtitle: 'Apple Watchで自分の体を読む', bg: '#DCE8EC' });
}
