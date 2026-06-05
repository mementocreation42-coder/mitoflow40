import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'MIND & BODY', title: '不安と体', subtitle: '性格ではなく、体のサインかもしれない', bg: '#E6E1EC' });
}
