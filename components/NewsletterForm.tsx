"use client";

import { useState } from "react";

export default function NewsletterForm() {
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

    if (status === "success") {
        return <p className="text-[#41C9B4] font-bold text-lg">登録ありがとうございます！</p>;
    }

    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-5 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-[#41C9B4] bg-white text-[#1A1A1A] placeholder:text-gray-400"
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-6 py-3 bg-[#1A1A1A] text-white text-sm font-bold rounded-full hover:bg-[#41C9B4] hover:text-[#1A1A1A] transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                    {status === "loading" ? "送信中..." : "登録する"}
                </button>
            </form>
            {status === "error" && (
                <p className="text-red-500 text-xs mt-2 text-center">エラーが発生しました。もう一度お試しください。</p>
            )}
        </div>
    );
}
