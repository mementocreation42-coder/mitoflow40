import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { listSentIssues, NEWSLETTER_NAME } from "@/lib/newsletter";
import { formatDateTime } from "@/lib/intake";

export const metadata = {
    title: `${NEWSLETTER_NAME} | Mitoflow40`,
    description: "40代からの精密栄養学・ミトコンドリア・血液検査の読み方を、ライブラリの新着とともに不定期でお届けするMitoflow40のニュースレター。登録無料・いつでも解除できます。",
    alternates: { canonical: 'https://mitoflow40.com/newsletter' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: `${NEWSLETTER_NAME} | Mitoflow40`,
        description: '40代からの精密栄養学・ミトコンドリア・血液検査の読み方を、不定期でお届けするニュースレター。',
        url: 'https://mitoflow40.com/newsletter',
        type: 'website',
    },
};
export const dynamic = 'force-dynamic';

const TOPICS = [
    { label: "血液検査の読み方", bg: "#DEEDF7" },
    { label: "ミトコンドリア", bg: "#4AF6C3" },
    { label: "精密栄養学", bg: "#FFE9D6" },
    { label: "食べ物・時間栄養", bg: "#FBE9D0" },
    { label: "睡眠・運動", bg: "#E7EFD8" },
    { label: "ライブラリ新着", bg: "#E6E0F2" },
];

export default async function NewsletterPage() {
    const recent = (await listSentIssues().catch(() => [])).slice(0, 3);
    return (
        <div className="pt-40 pb-20 px-6 md:px-10 overflow-hidden" style={{ background: "#FFB6B6", flex: 1, position: "relative" }}>
            <div className="absolute top-0 right-0 w-[260px] md:w-[380px] h-[260px] md:h-[380px] pointer-events-none">
                <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bg.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "top right" }} />
            </div>
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[440px] h-[300px] md:h-[440px] pointer-events-none">
                <img loading="lazy" decoding="async" src="/images/hero/hero-illustration-bl.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom" }} />
            </div>
            <div style={{ maxWidth: "600px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                <p className="text-xs tracking-widest text-[#1A1A1A] font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MITOFLOW40 LETTER</p>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    数値の奥にある、<br />
                    細胞の話を届ける。
                </h1>
                <p className="text-sm md:text-base text-[#1A1A1A]/80 leading-loose mb-8">
                    健康診断の数値をどう読むか、ミトコンドリアが元気に働くために何を食べ、いつ眠るか。
                    ライブラリに新しく加わった1枚の紹介とあわせて、40代からの体の整え方を不定期でお届けします。
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                    {TOPICS.map((t) => (
                        <span key={t.label} className="px-4 py-1.5 rounded-full text-xs font-bold border border-[#1A1A1A] text-[#1A1A1A]" style={{ backgroundColor: t.bg }}>{t.label}</span>
                    ))}
                </div>

                {/* 登録フォームと注意書きは同じカードに入れる（背景のイラストと重なって読みにくくなるため） */}
                <div className="rounded-2xl border border-black bg-white/90 backdrop-blur-[2px] p-6 md:p-8 mb-12">
                    <NewsletterForm source="newsletter-page" />
                    <div className="mt-7 pt-6 border-t border-[#1A1A1A]/10 flex flex-col gap-2 text-sm leading-relaxed text-[#1A1A1A]/80">
                        <p>📬 配信は不定期（月1〜2通程度）。長いメールは送りません。</p>
                        <p>🔬 内容はライブラリと同じ姿勢で——中立に整理し、細胞・ATPの側から考えます。</p>
                        <p>🔐 アドレスはニュースレターの配信以外に使いません。いつでも1クリックで解除できます。</p>
                    </div>
                </div>

                {recent.length > 0 && (
                    <div>
                        <p className="text-xs tracking-widest font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>RECENT ISSUES</p>
                        <ul className="space-y-2">
                            {recent.map((i) => (
                                <li key={i.id}>
                                    <Link href={`/newsletter/archive/${i.id}`} className="block rounded-xl border border-black bg-white/70 px-4 py-3 hover:-translate-y-0.5 transition-transform">
                                        <span className="text-[11px] text-[#4A4A4A] mr-2">{i.sentAt ? formatDateTime(i.sentAt).slice(0, 10) : ''}</span>
                                        <span className="text-sm font-bold text-[#1A1A1A]">{i.subject}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link href="/newsletter/archive" className="inline-block mt-3 text-xs font-bold underline text-[#1A1A1A]">バックナンバーをすべて見る →</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
