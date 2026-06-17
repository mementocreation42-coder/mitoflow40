import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'MICROBIOME', title: '腸内フローラとプレ・プロバイオティクス', subtitle: '善玉菌・エサ・短鎖脂肪酸の地図', bg: '#CDEBE2' });
}
