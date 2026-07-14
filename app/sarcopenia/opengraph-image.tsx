import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'SARCOPENIA / FRAILTY', title: 'サルコペニア・フレイル', subtitle: '40代から始まる筋肉の減少', bg: '#E7EEDA' });
}
