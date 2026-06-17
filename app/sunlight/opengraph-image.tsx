import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'SUNLIGHT', title: '日光と健康', subtitle: '体内時計・ビタミンD・紫外線とのつき合い方', bg: '#FBEFD2' });
}
