import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'EXERCISE', title: '運動', subtitle: 'ミトコンドリアを増やす唯一の方法', bg: '#E1EFDD' });
}
