import NewsletterForm from "./NewsletterForm";

// ジャーナル記事末尾の登録ボックス（Mitoflow40 独自配信）
export default function JournalNewsletter() {
    return (
        <div className="my-16 rounded-2xl bg-[#1A1A1A] px-6 py-10 text-center">
            <p className="text-xs tracking-widest text-[#41C9B4] mb-2">MITOFLOW40 LETTER</p>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                数値の奥にある、<br className="md:hidden" />細胞の話をメールで。
            </h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
                血液検査の読み方・ミトコンドリア・精密栄養学の実践と、ライブラリの新着を<br className="hidden md:block" />
                不定期でお届けします。登録無料、いつでも解除できます。
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-xs text-white/50">
                <span className="flex items-center gap-1.5"><span className="text-[#41C9B4]">✦</span> 血液検査の読み方</span>
                <span className="flex items-center gap-1.5"><span className="text-[#41C9B4]">✦</span> 40代からの栄養・睡眠・運動</span>
                <span className="flex items-center gap-1.5"><span className="text-[#41C9B4]">✦</span> ライブラリの新着1枚</span>
            </div>
            <NewsletterForm source="journal" dark />
        </div>
    );
}
