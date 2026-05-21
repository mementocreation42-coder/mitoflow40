export const metadata = {
    title: "特定商取引法に基づく表記 | Mitoflow40",
    description: "Mitoflow40の特定商取引法に基づく表記です。",
    alternates: { canonical: "https://mitoflow40.com/legal" },
    robots: { index: true, follow: true },
};

const ROWS: { label: string; value: React.ReactNode }[] = [
    { label: "販売事業者", value: "小林大介" },
    { label: "運営責任者", value: "小林大介" },
    { label: "所在地", value: "請求があった場合に遅滞なく開示いたします。" },
    { label: "電話番号", value: "請求があった場合に遅滞なく開示いたします。" },
    { label: "メールアドレス", value: "info@mitoflow40.com" },
    { label: "サービス名", value: "Mitoflow40 パーソナルヘルスケアサービス" },
    { label: "販売価格", value: "各サービスページに記載の金額（消費税込）" },
    { label: "商品代金以外の必要料金", value: "決済手数料・通信料等はお客様のご負担となります。" },
    { label: "支払方法", value: "クレジットカード、銀行振込（その他、別途案内する方法）" },
    { label: "支払時期", value: "クレジットカード: ご注文時に決済／銀行振込: ご注文後7日以内" },
    { label: "サービス提供時期", value: "血液検査結果・必要データのお預かり後、概ね2週間以内にレポートをお届けします。" },
    {
        label: "返品・キャンセル",
        value: (
            <>
                サービスの性質上、解析開始後のキャンセル・返金は原則としてお受けできません。<br />
                解析開始前のキャンセルについては、お問い合わせ窓口までご連絡ください。<br />
                当方の責に帰すべき事由による不備が生じた場合は、別途協議のうえ対応いたします。
            </>
        ),
    },
    {
        label: "免責事項",
        value: (
            <>
                本サービスは医療行為・診断・治療ではありません。レポートの内容は、現時点のデータから読み取れる予測・仮説であり、医療上の助言を代替するものではありません。<br />
                具体的な疾患の診断・治療・予防については、必ず医師等の医療専門家にご相談ください。
            </>
        ),
    },
];

export default function LegalPage() {
    return (
        <>
            <p className="text-xs tracking-widest font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#FF9855" }}>
                COMMERCIAL TRANSACTION
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                特定商取引法に基づく表記
            </h1>

            <p className="mb-8">特定商取引に関する法律第11条に基づき、以下のとおり表示します。</p>

            <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#E5E5E5", background: "#FFF" }}>
                <table className="w-full text-sm md:text-base">
                    <tbody>
                        {ROWS.map((row, i) => (
                            <tr key={row.label} style={{ borderTop: i === 0 ? "none" : "1px solid #EEE" }}>
                                <th
                                    className="text-left align-top p-4 w-[140px] md:w-[200px]"
                                    style={{
                                        background: "#FAFAF7",
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontWeight: 700,
                                        fontSize: "12px",
                                        letterSpacing: "0.04em",
                                        color: "#1A1A1A",
                                    }}
                                >
                                    {row.label}
                                </th>
                                <td className="p-4 align-top leading-relaxed" style={{ color: "#1A1A1A" }}>
                                    {row.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="text-xs text-[#555] mt-8">
                ※ 所在地・電話番号については、消費者庁ガイドラインに基づき、ご請求があった場合に遅滞なく書面または電子メールで開示いたします。開示をご希望の場合は info@mitoflow40.com までご連絡ください。
            </p>

            <p className="text-xs text-[#555] mt-12">制定日: 2026年5月21日</p>
        </>
    );
}
