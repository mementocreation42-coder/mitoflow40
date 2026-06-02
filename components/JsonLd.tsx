// 構造化データ（JSON-LD）を出力する汎用コンポーネント
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

const BASE_URL = 'https://mitoflow40.com';

// 健康・医療系の解説ページ向け MedicalWebPage スキーマを生成
export function medicalWebPage(opts: {
    name: string;
    description: string;
    path: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: opts.name,
        description: opts.description,
        url: `${BASE_URL}${opts.path}`,
        inLanguage: 'ja',
        isPartOf: {
            '@type': 'WebSite',
            name: 'Mitoflow40',
            url: BASE_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Mitoflow40',
            url: BASE_URL,
        },
    };
}
