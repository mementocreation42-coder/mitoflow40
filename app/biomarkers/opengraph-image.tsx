import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'BIOMARKERS', title: 'バイオマーカー', subtitle: '数値で体の状態を読み解く', bg: '#D9EBF7' });
}
