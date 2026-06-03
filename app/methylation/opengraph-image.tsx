import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'METHYLATION', title: 'メチレーション', subtitle: '遺伝子・栄養・検査が交わるハブ', bg: '#E6EFD9' });
}
