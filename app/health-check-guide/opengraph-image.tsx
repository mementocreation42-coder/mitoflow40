import { ogImage, ogSize, ogContentType } from '@/lib/og';
export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';
export default function Image() { return ogImage({ eyebrow: 'HEALTH CHECK GUIDE', title: '40代の健康診断の読み方', subtitle: '結果票を次の行動につなげる', bg: '#FFF1DF' }); }
