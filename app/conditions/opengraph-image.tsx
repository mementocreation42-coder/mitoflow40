import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'CONDITIONS', title: '不調・現代病を読み解く', subtitle: '病態を、細胞とATPの側から', bg: '#FCE3D4' });
}
