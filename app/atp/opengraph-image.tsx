import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'ATP', title: 'ATP', subtitle: 'アデノシン三リン酸＝エネルギー通貨', bg: '#D7F0E8' });
}
