import NewsletterForm from "@/components/NewsletterForm";

export const metadata = {
    title: "Newsletter | Mitoflow40",
    description: "40代からの健康実践・AI・クリエイティブをテーマに、領域を横断した視点でお届けするニュースレター。登録者にはSAL謹製写真現像プリセット「selpico3」をプレゼント。",
    alternates: { canonical: 'https://mitoflow40.com/newsletter' },
    openGraph: {
        title: 'Newsletter | Mitoflow40',
        description: '40代からの健康実践・AI・クリエイティブをテーマに、領域を横断した視点でお届けするニュースレター。',
        url: 'https://mitoflow40.com/newsletter',
        type: 'website',
    },
};

const TAGS = [
    { label: "AI",      bg: "#1A1A1A", color: "#ffffff" },
    { label: "Video",   bg: "#e05c5c", color: "#ffffff" },
    { label: "Photo",   bg: "#7b5ea7", color: "#ffffff" },
    { label: "Web",     bg: "#3a8fd4", color: "#ffffff" },
    { label: "Tools",   bg: "#e0943a", color: "#ffffff" },
    { label: "Health",  bg: "#41C9B4", color: "#ffffff" },
    { label: "Fishing", bg: "#4a8c6e", color: "#ffffff" },
];

export default function NewsletterPage() {
    return (
        <div className="pt-40 pb-20 px-10 overflow-hidden" style={{ background: "#FFB6B6", flex: 1, position: "relative" }}>
            {/* Illustration - Top Right */}
            <div className="absolute top-0 right-0 w-[260px] md:w-[380px] h-[260px] md:h-[380px] pointer-events-none">
                <img src="/images/for-you-illustration-bg.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "top right" }} />
            </div>

            {/* Illustration - Bottom Left */}
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[440px] h-[300px] md:h-[440px] pointer-events-none">
                <img src="/images/hero-illustration-bl.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom" }} />
            </div>
            <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>

                {/* Label */}
                <p className="text-xs tracking-widest text-[#41C9B4] mb-6">SAL LETTER</p>

                {/* Headline */}
                <h1
                    className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-12"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    領域を横断する、<br />
                    健康とクリエイティブのB面を。
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {TAGS.map((tag) => (
                        <span
                            key={tag.label}
                            className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide"
                            style={{ backgroundColor: tag.bg, color: tag.color }}
                        >
                            {tag.label}
                        </span>
                    ))}
                </div>

                {/* Form */}
                <div style={{ textAlign: "center" }}>
                    <NewsletterForm />
                </div>

                {/* Description + Benefits */}
                <div className="mt-12 flex flex-col gap-0.5 text-sm leading-snug" style={{ color: "#4A4A4A" }}>
                    <p>精密栄養学・ミトコンドリア最適化・食事・生活習慣など40代からの健康実践を軸に、AI・Web・クリエイティブなど領域を横断した視点でニュースレターを不定期配信します。</p>
                    <div className="mt-4" />
                    <p style={{ whiteSpace: "nowrap" }}>🎁 登録者には、SAL謹製写真現像プリセット「selpico3」をプレゼント。</p>
                    <p style={{ whiteSpace: "nowrap" }}>📬 映像・写真・健康・AI・自然、暮らしのヒントを不定期に届ける。</p>
                    <p style={{ whiteSpace: "nowrap" }}>🔧 使っているツール・ワークフロー・機材の話を共有。</p>
                    <p style={{ whiteSpace: "nowrap" }}>🍖 スパムは送りません。いつでも解除できます。</p>
                </div>

            </div>
        </div>
    );
}
