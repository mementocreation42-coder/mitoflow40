import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'ENZYMES', title: '酵素とは', subtitle: '体を動かす「触媒」の正体', bg: '#DCEFE4' });
}
