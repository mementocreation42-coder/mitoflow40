import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'からだナビ by Mitoflow40',
        short_name: 'からだナビ',
        description: '自分の体を読み解く健康ライブラリアプリ',
        start_url: '/karada-navi',
        display: 'standalone',
        background_color: '#ECE6F3',
        theme_color: '#ECE6F3',
        icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }],
    };
}
