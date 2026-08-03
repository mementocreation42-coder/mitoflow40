import { ogImage, ogSize, ogContentType } from '@/lib/og';
export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';
export default function Image() {
    return ogImage({ eyebrow: 'DYSLIPIDEMIA', title: '脂質異常症とは', subtitle: 'LDL・HDL・中性脂肪をまとめて読む', bg: '#E7EFD8' });
}
