"use client";

import { useState } from "react";

export default function JournalNewsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, type: "newsletter" }),
            });
            if (res.ok) setStatus("success");
            else setStatus("error");
        } catch {
            setStatus("error");
        }
    }

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

            {status === "success" ? (
                <p className="text-[#41C9B4] font-bold">登録ありがとうございます！</p>
            ) : (
                <form onSubmit={handleSubmit} style={{ maxWidth: "480px", margin: "0 auto", display: "flex", gap: "8px" }}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="flex-1 px-4 py-3 rounded-full border border-white/20 text-sm focus:outline-none focus:border-[#41C9B4] bg-white/10 text-white placeholder:text-white/30"
                    />
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="px-6 py-3 bg-[#41C9B4] text-[#1A1A1A] text-sm font-bold rounded-full hover:bg-white transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                        {status === "loading" ? "送信中..." : "登録する"}
                    </button>
                </form>
            )}
            {status === "error" && (
                <p className="text-red-500 text-xs mt-2">エラーが発生しました。もう一度お試しください。</p>
            )}
        </div>
    );
}
