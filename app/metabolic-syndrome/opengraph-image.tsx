import { ogImage, ogSize, ogContentType } from '@/lib/og';
export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';
export default function Image() { return ogImage({ eyebrow: 'METABOLIC SYNDROME', title: 'メタボリックシンドローム', subtitle: '腹囲・血圧・血糖・脂質のつながり', bg: '#F0E2D8' }); }
