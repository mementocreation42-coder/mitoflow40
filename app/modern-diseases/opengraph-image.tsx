import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'MODERN DISEASES', title: '現代病', subtitle: 'なぜ便利な暮らしが、人を病気にするのか', bg: '#F0E2D8' });
}
