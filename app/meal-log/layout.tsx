import type { Metadata, Viewport } from 'next';

// 単独アプリ（iPhone のホーム画面に追加して使う）。サイトのヘッダー・フッターは付けない。
export const metadata: Metadata = {
    title: '食事記録 | Mitoflow40',
    description: '毎日の食事をかんたんに記録して、CSV で書き出せるツール。記録はこの端末の中だけに保存され、送信されません。',
    alternates: { canonical: 'https://mitoflow40.com/meal-log' },
    manifest: '/meal-log/manifest.webmanifest',
    appleWebApp: { capable: true, title: '食事記録', statusBarStyle: 'default' },
    icons: { apple: '/meal-log/apple-touch-icon.png' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: '食事記録 | Mitoflow40',
        description: '毎日の食事をかんたんに記録して、CSV で書き出せるツール。',
        url: 'https://mitoflow40.com/meal-log',
        type: 'website',
    },
};

export const viewport: Viewport = {
    themeColor: '#FAFAF7',
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export default function MealLogLayout({ children }: { children: React.ReactNode }) {
    return (
        <main
            style={{
                background: '#FAFAF7',
                minHeight: '100dvh',
                paddingTop: 'env(safe-area-inset-top)',
                paddingBottom: 'env(safe-area-inset-bottom)',
                paddingLeft: 'env(safe-area-inset-left)',
                paddingRight: 'env(safe-area-inset-right)',
            }}
        >
            {children}
        </main>
    );
}
