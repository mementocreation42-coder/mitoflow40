import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'YOUR ORGANS', title: '内臓・臓器', subtitle: '肝臓・腎臓・腸・心臓・脳…', bg: '#F4E7DC' });
}
