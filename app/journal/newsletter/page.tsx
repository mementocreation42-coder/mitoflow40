import NewsletterForm from "@/components/NewsletterForm";

export const metadata = {
    title: "Newsletter | Mitoflow40 Journal",
    description: "40代からの健康実践・AI・クリエイティブをテーマに、領域を横断した視点でお届けするニュースレター。",
};

const TAGS = ["Health", "Nutrition", "AI", "Web", "Creative", "Sleep", "Mitochondria"];

export default function NewsletterPage() {
    return (
        <div className="py-24 px-6">
            <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
                {/* Label */}
                <p className="text-xs tracking-widest text-[#41C9B4] mb-6">NEWSLETTER</p>

                {/* Headline */}
                <h1
                    className="text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-8"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    領域を横断する、<br />
                    健康とクリエイティブのB面を。
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {TAGS.map((tag) => (
                        <span
                            key={tag}
                            className="px-4 py-1.5 rounded-full border border-[#1A1A1A] text-xs font-medium tracking-wide text-[#1A1A1A]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p className="text-sm text-[#4A4A4A]/70 leading-relaxed mb-10">
                    精密栄養学・睡眠・ミトコンドリア最適化など40代からの健康実践を軸に、AI・Web・クリエイティブなど領域を横断した視点で不定期配信します。
                </p>

                {/* Form */}
                <div className="flex justify-center">
                    <NewsletterForm />
                </div>

                {/* Divider */}
                <div className="flex justify-center my-12">
                    <div className="w-px h-16 bg-gray-200" />
                </div>
            </div>

            {/* Delivery content */}
            <div style={{ maxWidth: "600px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", fontSize: "14px", color: "#4A4A4A" }}>
                <div className="flex gap-3 items-start">
                    <span className="text-[#41C9B4] text-lg leading-none mt-0.5 flex-shrink-0">✦</span>
                    <div>
                        <p className="font-bold text-[#1A1A1A] mb-1">健康・栄養の実践記録</p>
                        <p className="text-xs text-[#4A4A4A]/70 leading-relaxed">精密栄養学・腸内環境・サプリ・血液検査データなど日々の実践をレポート</p>
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <span className="text-[#41C9B4] text-lg leading-none mt-0.5 flex-shrink-0">✦</span>
                    <div>
                        <p className="font-bold text-[#1A1A1A] mb-1">AI・Webの活用情報</p>
                        <p className="text-xs text-[#4A4A4A]/70 leading-relaxed">ツール・ワークフロー・プロンプトなどクリエイターが使える実践的な情報</p>
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <span className="text-[#41C9B4] text-lg leading-none mt-0.5 flex-shrink-0">✦</span>
                    <div>
                        <p className="font-bold text-[#1A1A1A] mb-1">クリエイターの裏側</p>
                        <p className="text-xs text-[#4A4A4A]/70 leading-relaxed">映像・写真・Web制作など現場のリアルな話と思考の断片</p>
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <span className="text-[#41C9B4] text-lg leading-none mt-0.5 flex-shrink-0">✦</span>
                    <div>
                        <p className="font-bold text-[#1A1A1A] mb-1">気づきと問い</p>
                        <p className="text-xs text-[#4A4A4A]/70 leading-relaxed">日々の読書・観察・実験から生まれる視点や問いを短く届けます</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
