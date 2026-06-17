import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'RICE', title: '白米・玄米の真実', subtitle: 'どちらが正解？ 血糖・栄養・フィチン酸・ヒ素', bg: '#F3EEDC' });
}
