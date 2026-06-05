import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'ON YOUR HABITS', title: '嗜好品と体', subtitle: 'アルコール・タバコ・カフェイン', bg: '#CDEBE2' });
}
