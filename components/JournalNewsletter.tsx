import Link from "next/link";

export default function JournalNewsletter() {
    return (
        <div className="my-16 rounded-2xl bg-[#1A1A1A] px-6 py-10 text-center">
            <p className="text-xs tracking-widest text-[#41C9B4] mb-2">NEWSLETTER</p>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                40代からの健康実践を、<br className="md:hidden" />メールで受け取る。
            </h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
                精密栄養学・睡眠・ミトコンドリア最適化など日々の気づきと実践レポートを、<br className="hidden md:block" />
                健康に限らずAI・Web・クリエイティブなど領域を横断した視点でお届けします。
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8 text-xs text-white/50">
                <span className="flex items-center gap-1.5"><span className="text-[#41C9B4]">✦</span> 健康・栄養の実践記録</span>
                <span className="flex items-center gap-1.5"><span className="text-[#41C9B4]">✦</span> AI・Webの活用情報</span>
                <span className="flex items-center gap-1.5"><span className="text-[#41C9B4]">✦</span> クリエイターの裏側</span>
            </div>

            <Link
                href="https://www.shinealight.jp/newsletter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-16 py-4 bg-[#41C9B4] text-[#1A1A1A] text-sm font-bold rounded-full hover:bg-white transition-colors"
            >
                ニュースレターを登録
            </Link>
        </div>
    );
}
