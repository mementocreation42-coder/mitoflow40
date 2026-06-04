import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'OUR MISSION', title: 'なぜ、未病予防か', subtitle: '個人の活力と、これからの社会の健康', bg: '#CDEBE2' });
}
