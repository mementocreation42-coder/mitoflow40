import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'SMELL', title: '匂いと健康', subtitle: '記憶・感情・脳とのつながりと、アロマの見極め', bg: '#F0E6DA' });
}
