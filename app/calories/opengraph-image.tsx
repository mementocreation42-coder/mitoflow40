import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'CALORIES', title: 'カロリーの誤解', subtitle: '「1kcalは1kcal」は本当？ 便利な目安の、正しい使い方', bg: '#FBEBD5' });
}
