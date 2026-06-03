import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';

export default function Image() {
    return ogImage({ eyebrow: 'THE FIRST STEP', title: '解糖系（グリコリシス）', subtitle: 'エネルギー産生の最初のステップ', bg: '#F4EFCE' });
}
