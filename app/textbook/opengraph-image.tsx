import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'TEXTBOOK', title: '教科書', subtitle: '辞書を、教科書として読む。ライブラリを読む順番', bg: '#ECE6F3' });
}
