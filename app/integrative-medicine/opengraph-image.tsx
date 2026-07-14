import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'INTEGRATIVE MEDICINE', title: '統合医療とは', subtitle: '西洋医学と補完療法を中立に', bg: '#CDEBE2' });
}
