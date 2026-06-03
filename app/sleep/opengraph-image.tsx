import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'SLEEP', title: '睡眠', subtitle: '修復・再生の最強の回復時間', bg: '#DCE3F0' });
}
