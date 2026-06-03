import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'BLOOD SUGAR', title: '血糖コントロール', subtitle: '血糖の波を整える', bg: '#FBEFD2' });
}
