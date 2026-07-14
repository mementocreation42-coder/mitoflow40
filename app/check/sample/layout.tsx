// /check/sample は 'use client' のためページ本体で metadata を宣言できない。
// 親 /check の canonical を継承しないよう、この層で正しい metadata を上書きする。
export const metadata = {
    title: "セルフチェック結果サンプル | Mitoflow40",
    description: "ミトコンドリア・セルフチェックの結果サンプル。4軸スコアとAI解析コメントの見え方をデモ表示します。",
    alternates: { canonical: "https://mitoflow40.com/check/sample" },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: "セルフチェック結果サンプル | Mitoflow40",
        description: "4軸スコアとAI解析コメントの見え方をデモで体験できます。",
        url: "https://mitoflow40.com/check/sample",
        type: "website",
    },
};

export default function CheckSampleLayout({ children }: { children: React.ReactNode }) {
    return children;
}
