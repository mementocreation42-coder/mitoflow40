import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'DIGESTION & ABSORPTION', title: '消化・吸収とは', subtitle: '「食べた」と「吸収できた」は別の話', bg: '#CDEBE2' });
}
