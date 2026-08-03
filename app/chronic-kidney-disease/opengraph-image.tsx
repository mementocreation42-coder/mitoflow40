import { ogImage, ogSize, ogContentType } from '@/lib/og';
export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Mitoflow40';
export default function Image() { return ogImage({ eyebrow: 'CHRONIC KIDNEY DISEASE', title: '慢性腎臓病（CKD）', subtitle: 'eGFR・クレアチニン・尿たんぱく', bg: '#DDE9E6' }); }
