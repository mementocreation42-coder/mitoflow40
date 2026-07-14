import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'FOOD JOURNEY', title: '食べてから、動くまで', subtitle: '消化・吸収・代謝の全体像', bg: '#EAF1E0' });
}
