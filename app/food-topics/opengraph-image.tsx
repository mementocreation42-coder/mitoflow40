import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'FOOD TOPICS', title: '食のテーマ', subtitle: '小麦・米・断食・カロリー・気をつけたい食品・スパイス', bg: '#FBE9D0' });
}
