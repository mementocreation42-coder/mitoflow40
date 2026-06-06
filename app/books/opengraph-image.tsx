import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'FURTHER READING', title: 'おすすめ書籍', subtitle: 'もっと深く知るための本', bg: '#F1E7DE' });
}
