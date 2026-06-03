import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'FROM SYMPTOMS', title: '症状から引く', subtitle: '不調から背景・血液検査・栄養素へ', bg: '#F0E7E0' });
}
