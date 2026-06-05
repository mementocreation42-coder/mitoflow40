import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'REDUCE YOUR EXPOSURE', title: '有害物質を減らす暮らし', subtitle: '農薬・水銀・マイクロプラスチック', bg: '#CDEBE2' });
}
