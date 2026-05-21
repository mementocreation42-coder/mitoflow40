export const metadata = {
    title: "利用規約 | Mitoflow40",
    description: "Mitoflow40の利用規約です。",
    alternates: { canonical: "https://mitoflow40.com/terms" },
    robots: { index: true, follow: true },
};

export default function TermsPage() {
    return (
        <>
            <p className="text-xs tracking-widest font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#FF9855" }}>
                TERMS OF SERVICE
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                利用規約
            </h1>

            <p>本利用規約（以下「本規約」）は、小林大介（以下「当方」）が提供するパーソナルヘルスケアサービス「Mitoflow40」（以下「本サービス」）の利用条件を定めるものです。本サービスをご利用いただくお客様（以下「利用者」）には、本規約に同意いただいたものとみなします。</p>

            <h2 className="text-xl font-bold mt-10 mb-3">第1条（適用）</h2>
            <p>本規約は、本サービスの利用に関するすべての関係に適用されます。当方が本サイト上に掲載する個別の規定・ガイドラインは、本規約の一部を構成します。</p>

            <h2 className="text-xl font-bold mt-10 mb-3">第2条（サービス内容）</h2>
            <ol className="list-decimal pl-6 space-y-1">
                <li>本サービスは、血液検査データ・カウンセリングシート・Apple Watch等のライフデータをもとに、精密栄養学の視点から栄養状態や体質傾向を読み取り、レポートとして提供するパーソナルヘルスケアサービスです。</li>
                <li>本サービスでは、血液検査結果の読み取り・複合指標の算出に AI（Anthropic Claude）を補助的に活用しています。AI の出力には誤差が含まれる可能性があるため、最終的なレポートはカウンセラー（小林大介）が監修・検証したうえでお届けします。</li>
                <li>本サービスは医療行為・診断・治療ではありません。レポートの内容は、現時点のデータから読み取れる予測・仮説であり、医療上の助言を代替するものではありません。</li>
                <li>具体的な疾患の診断・治療・予防については、必ず医師等の医療専門家にご相談ください。</li>
            </ol>

            <h2 className="text-xl font-bold mt-10 mb-3">第3条（申込み・契約成立）</h2>
            <ol className="list-decimal pl-6 space-y-1">
                <li>利用希望者は、当方所定の方法によりサービス利用を申し込むものとします。</li>
                <li>当方が申込みを承諾した時点で、利用者と当方の間に本規約に基づく契約が成立します。</li>
            </ol>

            <h2 className="text-xl font-bold mt-10 mb-3">第4条（料金・支払方法）</h2>
            <ol className="list-decimal pl-6 space-y-1">
                <li>本サービスの料金は、本サイトの料金プランページに記載のとおりとします。</li>
                <li>支払方法・支払時期の詳細は、特定商取引法に基づく表記ページに従います。</li>
            </ol>

            <h2 className="text-xl font-bold mt-10 mb-3">第5条（キャンセル・返金）</h2>
            <ol className="list-decimal pl-6 space-y-1">
                <li>サービスの性質上、解析開始後のキャンセル・返金は原則としてお受けできません。</li>
                <li>解析開始前のキャンセルについては、特定商取引法に基づく表記ページに従って処理します。</li>
            </ol>

            <h2 className="text-xl font-bold mt-10 mb-3">第6条（禁止事項）</h2>
            <p>利用者は、本サービスの利用にあたり、次の行為をしてはなりません。</p>
            <ol className="list-decimal pl-6 space-y-1">
                <li>法令または公序良俗に違反する行為</li>
                <li>当方または第三者の知的財産権・プライバシー権その他の権利を侵害する行為</li>
                <li>本サービスの運営を妨げる行為</li>
                <li>提供されたレポート・コンテンツを第三者に共有・転売・複製・公開する行為</li>
                <li>他人になりすまして本サービスを利用する行為</li>
                <li>その他、当方が不適切と判断する行為</li>
            </ol>

            <h2 className="text-xl font-bold mt-10 mb-3">第7条（知的財産権）</h2>
            <p>本サービス内で提供されるレポート、テキスト、画像、デザイン、ロゴ等の著作権その他の知的財産権は、当方または正当な権利者に帰属します。利用者は、私的利用の範囲を超えてこれらを使用することはできません。</p>

            <h2 className="text-xl font-bold mt-10 mb-3">第8条（免責事項）</h2>
            <ol className="list-decimal pl-6 space-y-1">
                <li>本サービスは医療行為ではなく、レポートの内容は健康増進のための参考情報です。当方は、レポートに基づく利用者の判断・行動から生じた結果について、一切の責任を負いません。</li>
                <li>当方は、本サービスの内容に事実上または法律上の瑕疵がないことを明示的にも黙示的にも保証しません。</li>
                <li>当方は、本サービスの提供の中断・停止・終了・利用不能・変更によって利用者に生じた損害について、一切の責任を負わないものとします。</li>
                <li>AI による読み取り誤差、データ欠損、その他技術的制約による情報の不正確さについて、当方は重大な過失がない限り責任を負わないものとします。</li>
            </ol>

            <h2 className="text-xl font-bold mt-10 mb-3">第9条（個人情報の取り扱い）</h2>
            <p>本サービスにおける個人情報の取り扱いについては、別途定めるプライバシーポリシーによります。</p>

            <h2 className="text-xl font-bold mt-10 mb-3">第10条（規約の変更）</h2>
            <p>当方は、必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。変更後の規約は、本サイトに掲載した時点から効力を生じます。</p>

            <h2 className="text-xl font-bold mt-10 mb-3">第11条（準拠法・裁判管轄）</h2>
            <p>本規約は日本法に準拠し、本サービスに関して紛争が生じた場合は、当方所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。</p>

            <p className="text-xs text-[#555] mt-12">制定日: 2026年5月21日</p>
        </>
    );
}
