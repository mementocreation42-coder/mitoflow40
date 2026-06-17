import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'FASTING', title: '食べない時間の力', subtitle: '断食・空腹がもたらすもの、向く人・向かない人', bg: '#E6E0F2' });
}
