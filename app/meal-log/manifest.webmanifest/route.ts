// /meal-log をホーム画面に置ける単独アプリにするための Web App Manifest。
// サブフォルダの manifest.ts は Next.js が配信しないので、ルートハンドラで返す。
export const dynamic = 'force-static';

export function GET() {
    return Response.json(
        {
            name: '食事記録 by Mitoflow40',
            short_name: '食事記録',
            description: '毎日の食事をかんたんに記録して、月末に CSV で書き出す。記録はこの端末の中だけに保存されます。',
            id: '/meal-log',
            start_url: '/meal-log',
            scope: '/meal-log',
            display: 'standalone',
            background_color: '#FAFAF7',
            theme_color: '#FAFAF7',
            lang: 'ja',
            icons: [
                { src: '/meal-log/icon-192.png', sizes: '192x192', type: 'image/png' },
                { src: '/meal-log/icon-512.png', sizes: '512x512', type: 'image/png' },
                { src: '/meal-log/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
            ],
        },
        { headers: { 'Content-Type': 'application/manifest+json' } },
    );
}
