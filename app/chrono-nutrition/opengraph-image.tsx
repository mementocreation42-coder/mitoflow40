import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'CHRONO-NUTRITION', title: '時間栄養学', subtitle: 'いつ食べるかで、体は変わる', bg: '#F4ECDA' });
}
