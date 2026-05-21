export const metadata = {
    title: "プライバシーポリシー | Mitoflow40",
    description: "Mitoflow40のプライバシーポリシー（個人情報保護方針）です。",
    alternates: { canonical: "https://mitoflow40.com/privacy" },
    robots: { index: true, follow: true },
};

export default function PrivacyPage() {
    return (
        <>
            <p className="text-xs tracking-widest font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#FF9855" }}>
                PRIVACY POLICY
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                プライバシーポリシー
            </h1>

            <p>小林大介（以下「当方」）は、Mitoflow40（以下「本サービス」）における個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。当方は、個人情報保護法その他の関連法令を遵守し、利用者の個人情報を適切に取り扱います。</p>

            <h2 className="text-xl font-bold mt-10 mb-3">1. 取得する情報</h2>
            <p>当方は、本サービスの提供にあたり、以下の情報を取得することがあります。</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>氏名・カナ・年齢・性別・生年月日</li>
                <li>メールアドレス・電話番号</li>
                <li>血液検査の結果（数値・画像）</li>
                <li>カウンセリングシートへの回答内容</li>
                <li>Apple Watch等のライフログデータ（睡眠・心拍・歩数等）</li>
                <li>支払関連情報（決済代行サービスを通じて取得）</li>
                <li>お問い合わせ内容</li>
                <li>本サイトの閲覧履歴（Cookie・アクセスログ）</li>
            </ul>

            <h2 className="text-xl font-bold mt-10 mb-3">2. 利用目的</h2>
            <p>当方は、取得した個人情報を以下の目的で利用します。</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>本サービスの提供（解析レポートの作成・お届け）</li>
                <li>利用者からのお問い合わせへの対応</li>
                <li>料金の請求・受領</li>
                <li>本サービスの改善・新サービスの企画</li>
                <li>ニュースレター・お知らせの配信（同意いただいた場合）</li>
                <li>法令に基づく対応</li>
            </ul>

            <h2 className="text-xl font-bold mt-10 mb-3">3. 第三者提供</h2>
            <p>当方は、以下の場合を除き、利用者の同意なく個人情報を第三者に提供しません。</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>法令に基づく場合</li>
                <li>人の生命・身体・財産の保護のために必要があり、本人の同意取得が困難な場合</li>
                <li>合併・事業譲渡その他事業の承継に伴い提供する場合</li>
            </ul>

            <h2 className="text-xl font-bold mt-10 mb-3">4. 業務委託（外部サービスの利用）</h2>
            <p>当方は、本サービスの運営にあたり、以下の外部サービスを利用しており、利用目的の達成に必要な範囲で個人情報を取り扱わせる場合があります。これらの委託先には適切な管理を求めます。</p>
            <ul className="list-disc pl-6 space-y-1">
                <li><strong>Vercel</strong>（米国） — ウェブサイトのホスティング・レポートファイルの保管</li>
                <li><strong>Notion</strong>（米国） — 顧客情報・解析データの管理</li>
                <li><strong>Resend</strong>（米国） — メール配信</li>
                <li><strong>Google</strong>（米国） — アクセス解析・フォーム回答収集</li>
                <li><strong>Anthropic</strong>（米国） — 血液検査画像のOCR・解析支援に AI（Claude）を利用。送信されたデータは Anthropic 社のモデル学習には使用されません（同社公式仕様）。</li>
                <li>その他、決済代行・クラウドサービス等</li>
            </ul>
            <p>海外のサービスを利用する場合、利用者の個人情報が日本国外（主に米国）に移転されることがあります。</p>

            <h2 className="text-xl font-bold mt-10 mb-3">5. 安全管理措置</h2>
            <p>当方は、取得した個人情報の漏洩・滅失・毀損の防止のため、適切な安全管理措置を講じます。レポートの保管にあたっては、推測困難な固有URLによるアクセス制限を行い、検索エンジンへのインデックスを禁止しています。AI 解析に送信される画像・データは、Anthropic の API 経由で都度処理され、同社のポリシーに基づきモデル学習に利用されません。</p>

            <h2 className="text-xl font-bold mt-10 mb-3">6. 開示・訂正・利用停止・削除の請求</h2>
            <p>利用者は、ご本人の個人情報について、開示・訂正・追加・削除・利用停止・第三者提供の停止を請求することができます。下記のお問い合わせ窓口までご連絡ください。</p>

            <h2 className="text-xl font-bold mt-10 mb-3">7. Cookie等の利用</h2>
            <p>本サイトでは、サービス向上およびアクセス解析のためCookieを利用することがあります。ブラウザの設定によりCookieの受け入れを拒否することができますが、その場合、一部機能が利用できなくなる場合があります。</p>

            <h2 className="text-xl font-bold mt-10 mb-3">8. 改定</h2>
            <p>当方は、本ポリシーを随時改定することがあります。改定後の内容は、本サイトに掲載した時点から効力を生じます。</p>

            <h2 className="text-xl font-bold mt-10 mb-3">9. お問い合わせ窓口</h2>
            <p>個人情報の取扱いに関するお問い合わせは、下記までお願いいたします。</p>
            <div className="p-4 rounded-xl mt-3" style={{ background: "#FFF", border: "1px solid #E5E5E5" }}>
                <p>事業者: 小林大介（Mitoflow40）</p>
                <p>メール: info@mitoflow40.com</p>
            </div>

            <p className="text-xs text-[#555] mt-12">制定日: 2026年5月21日</p>
        </>
    );
}
