import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'ON YOUR PLATE', title: '栄養が豊富な食べ物', subtitle: '身近な食材で何が摂れるか', bg: '#FFF4E2' });
}
