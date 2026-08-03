import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
    title: 'からだナビ | Mitoflow40',
    description: '症状や目的から、食事・栄養・検査・体の仕組みを横断して探せる健康ライブラリアプリ。',
    manifest: '/karada-navi/manifest.webmanifest',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'からだナビ',
    },
    alternates: { canonical: 'https://mitoflow40.com/karada-navi' },
};

export const viewport: Viewport = {
    themeColor: '#ECE6F3',
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export default function KaradaNaviLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
