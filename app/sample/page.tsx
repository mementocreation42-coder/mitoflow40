import Link from "next/link";

const SAMPLE_REPORT_URL = "https://mitoflow40.com/r/SbCtC5JII0uqihoUR4Bf44l";

export const metadata = {
    title: "解析サンプル | Mitoflow40",
    description: "Mitoflow40の血液解析レポートのサンプル。血液・カウンセリング・Apple Watch を統合した、精密栄養学視点の解析を体験できます。",
    alternates: { canonical: "https://mitoflow40.com/sample" },
    openGraph: {
        title: "解析サンプル | Mitoflow40",
        description: "実際の解析レポートのフォーマットと内容をご覧いただけます。",
        url: "https://mitoflow40.com/sample",
        type: "website",
    },
};

const HIGHLIGHTS = [
    {
        tag: "BLOOD SNAPSHOT",
        ja: "血液データ一覧",
        body: "すべての検査項目を、現在値と精密栄養学の理想値で並べて表示。一般の「基準値」ではなく、最適に機能している体に見られるレンジで判定します。",
        bg: "#FFE3D0",
    },
    {
        tag: "SYSTEM BALANCE",
        ja: "全体バランス図",
        body: "糖代謝・酸化・栄養・自律神経など8つの複合指標スコアで、体のどこに余白があるかを可視化。総合スコアとレーダーチャートで全体像を掴めます。",
        bg: "#D9EFFB",
    },
    {
        tag: "CORE PATTERN",
        ja: "中心テーマ",
        body: "「何が起点で、何に波及している可能性があるか」を3つのノードで描く独自フロー。バラバラの異常値ではなく、ひとつながりの仮説として読み解きます。",
        bg: "#F4DCEF",
    },
    {
        tag: "YOUR STORY",
        ja: "あなたの体で今起きていること",
        body: "数値の羅列ではなく、4本の補助線で「物語」として届けます。Apple Watchの生活データと血液所見を統合した、あなただけの解釈。",
        bg: "#D5F5EC",
    },
];

const FORMAT_NOTES = [
    "ひとつひとつの数値を単独で見るのではなく、複数の指標を束ねて「体のはたらき」として読みます。",
    "現在値 vs 精密栄養学の理想値が評価軸。一般の基準値ではありません。",
    "断定ではなく、現時点のデータから読み取れる「予測」。次の検査・問診で更新される前提です。",
    "血液（客観・代謝）・カウンセリング（主観・生活）・Apple Watch（客観・自律神経）— 3ソースを三角測量する多角的な読み方を採用しています。",
    "医療診断ではなく、栄養状態・体質傾向の読み取りです。",
    "血液検査画像の読み取り・複合指標の算出には AI（Anthropic Claude）を補助的に活用し、最終的なレポートはカウンセラー（小林大介）が監修します。",
];

export default function SamplePage() {
    return (
        <div className="pt-32 pb-24 px-6 md:px-10 overflow-hidden" style={{ background: "#B2EBF2", flex: 1, position: "relative" }}>

            {/* Decorative illustrations */}
            <div className="absolute top-10 right-0 w-[200px] md:w-[320px] pointer-events-none opacity-90">
                <img src="/images/for-you-illustration-bg.png" alt="" style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="absolute bottom-0 left-0 w-[240px] md:w-[380px] pointer-events-none opacity-90">
                <img src="/images/hero-illustration-bl.png" alt="" style={{ width: "100%", height: "auto" }} />
            </div>

            <div style={{ maxWidth: "820px", margin: "0 auto", position: "relative", zIndex: 1 }}>

                {/* Eyebrow */}
                <p className="text-xs tracking-widest text-[#1A1A1A] mb-5 font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    MITOFLOW40 / ANALYSIS SAMPLE
                </p>

                {/* Headline */}
                <h1
                    className="text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-6"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    あなたに届く、<br />
                    <span style={{ color: "#FF9855" }}>解析レポートの</span><br />
                    フォーマット。
                </h1>

                <p className="text-sm md:text-base leading-relaxed text-[#1A1A1A] mb-12" style={{ maxWidth: "640px" }}>
                    血液検査（客観・代謝）・カウンセリングシート（主観・生活）・Apple Watch（客観・自律神経）— 3つの異なる視点を重ね合わせ、精密栄養学の軸で多角的に読み解いた一冊。
                    数値の羅列ではなく、あなたの体で今起きていることを「物語」として届けます。
                </p>

                {/* Primary CTA */}
                <div className="mb-16">
                    <Link
                        href={SAMPLE_REPORT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 rounded-full font-bold text-base hover:opacity-90 transition"
                        style={{ background: "#1A1A1A", color: "#FFFFFF", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em" }}
                    >
                        実物のサンプルを見る →
                    </Link>
                    <p className="text-xs text-[#4A4A4A] mt-3" style={{ letterSpacing: "0.04em" }}>
                        ※ 新しいタブで開きます。実際のお客様を想定した解析サンプルです。
                    </p>
                </div>

                {/* Highlights */}
                <div className="mb-16">
                    <p className="text-xs tracking-widest text-[#1A1A1A] mb-6 font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        WHAT YOU&apos;LL FIND
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {HIGHLIGHTS.map((h) => (
                            <div
                                key={h.tag}
                                className="p-5 rounded-2xl"
                                style={{ background: h.bg, border: "1px solid #1A1A1A" }}
                            >
                                <div className="text-xs font-bold tracking-wider mb-1" style={{ color: "#FF9855", fontFamily: "'Space Grotesk', sans-serif" }}>
                                    {h.tag}
                                </div>
                                <div className="text-sm font-bold text-[#1A1A1A] mb-2">
                                    {h.ja}
                                </div>
                                <p className="text-xs leading-relaxed text-[#4A4A4A]">
                                    {h.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Format notes */}
                <div className="mb-16 p-6 rounded-2xl border border-[#1A1A1A]" style={{ background: "rgba(255,255,255,0.85)" }}>
                    <p className="text-xs tracking-widest text-[#1A1A1A] mb-4 font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        READING NOTES <span className="font-normal" style={{ letterSpacing: 0 }}>／ レポートの読み方</span>
                    </p>
                    <ul className="space-y-2">
                        {FORMAT_NOTES.map((note, i) => (
                            <li key={i} className="text-xs md:text-sm text-[#1A1A1A] leading-relaxed flex gap-2">
                                <span style={{ color: "#FF9855", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>0{i + 1}.</span>
                                <span>{note}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Free check teaser */}
                <div className="mb-12 p-5 md:p-6 rounded-2xl border-2 border-dashed border-[#1A1A1A] bg-white/70 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <div>
                        <p className="text-xs font-bold tracking-widest mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#FF9855" }}>
                            FREE · まず試してみる
                        </p>
                        <p className="text-sm md:text-base text-[#1A1A1A] font-bold">
                            12問・約2分の無料ミトコンドリア・セルフチェック
                        </p>
                        <p className="text-xs text-[#4A4A4A] mt-1">
                            自分のタイプ＆ケアの方向性を即時で確認できます。
                        </p>
                    </div>
                    <Link href="/check"
                        className="flex-shrink-0 inline-block px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition whitespace-nowrap"
                        style={{ background: "#1A1A1A", color: "#FFFFFF", fontFamily: "'Space Grotesk', sans-serif" }}>
                        無料解析を試す →
                    </Link>
                </div>

                {/* Secondary CTA */}
                <div className="text-center pt-8 border-t border-[#1A1A1A]/20">
                    <p className="text-sm text-[#1A1A1A] mb-5">
                        あなただけのレポートをお届けします。
                    </p>
                    <div className="flex flex-col md:flex-row gap-3 justify-center">
                        <Link
                            href={SAMPLE_REPORT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition"
                            style={{ background: "#FF9855", color: "#FFFFFF", fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            サンプルを見る
                        </Link>
                        <Link
                            href="/#pricing"
                            className="inline-block px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition"
                            style={{ background: "#1A1A1A", color: "#FFFFFF", fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            料金プラン
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
