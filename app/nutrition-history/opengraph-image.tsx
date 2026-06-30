import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'NUTRITION HISTORY', title: '栄養学の歴史', subtitle: 'カロリー→ビタミン→細胞へ。そして日本の戦後、食卓が変わった物語', bg: '#ECE5D6' });
}
