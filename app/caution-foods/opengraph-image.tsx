import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'ON YOUR PLATE', title: '気をつけたい食品', subtitle: '頻度と量に気をつけたい8つ', bg: '#FBE9D6' });
}
