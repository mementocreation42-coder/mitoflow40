import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'GENES', title: '遺伝子', subtitle: 'あなたの設計図を読み解く', bg: '#D7F0EC' });
}
