"use client";

import { useState } from "react";

// Mitoflow40 レター登録フォーム（ダブルオプトイン）。/api/newsletter/subscribe に投げ、確認メールを送る。
export default function NewsletterForm({ source = "newsletter-page", dark = false }: { source?: string; dark?: boolean }) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [mode, setMode] = useState<"double" | "single">("double");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!email || status === "loading") return;
        setStatus("loading");
        setError(null);
        const website = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
        try {
            const res = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source, website }),
            });
            const json = await res.json().catch(() => ({}));
            if (res.ok && json.ok) { setMode(json.mode === "single" ? "single" : "double"); setStatus("success"); }
            else { setStatus("error"); setError(json.error || null); }
        } catch {
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className={`text-center ${dark ? "text-white" : "text-[#1A1A1A]"}`}>
                {mode === "single" ? (
                    <>
                        <p className="font-bold text-lg" style={{ color: '#41C9B4' }}>登録ありがとうございます</p>
                        <p className="text-xs mt-2 opacity-80">{email} 宛に、不定期でお届けします。いつでも解除できます。</p>
                    </>
                ) : (
                    <>
                        <p className="font-bold text-lg" style={{ color: '#41C9B4' }}>確認メールを送りました</p>
                        <p className="text-xs mt-2 opacity-80">{email} に届いたメールのリンクを開くと登録が完了します。届かない場合は迷惑メールフォルダをご確認ください。</p>
                    </>
                )}
            </div>
        );
    }

    return (
        <div style={{ width: "100%", maxWidth: "448px", margin: "0 auto" }}>
            <form onSubmit={handleSubmit} className="flex gap-2">
                {/* ハニーポット（人間には見えない） */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    className="flex-1 min-w-0 px-5 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-[#41C9B4] bg-white text-[#1A1A1A] placeholder:text-gray-400"
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-6 py-3 bg-[#1A1A1A] text-white text-sm font-bold rounded-full hover:bg-[#41C9B4] hover:text-[#1A1A1A] transition-colors disabled:opacity-50 whitespace-nowrap"
                    style={dark ? { background: '#4AF6C3', color: '#1A1A1A' } : undefined}
                >
                    {status === "loading" ? "送信中..." : "登録する"}
                </button>
            </form>
            <p className={`text-[11px] mt-2 text-center ${dark ? "text-white/60" : "text-[#4A4A4A]"}`}>確認メールのリンクを開くと登録完了。スパムは送りません。いつでも解除できます。</p>
            {status === "error" && (
                <p className="text-red-500 text-xs mt-2 text-center">{error || "エラーが発生しました。もう一度お試しください。"}</p>
            )}
        </div>
    );
}
