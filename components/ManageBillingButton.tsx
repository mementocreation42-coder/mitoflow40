'use client';

import { useState } from 'react';

// Stripe カスタマーポータルを開く（お支払い方法の変更・解約・領収書）。マイページ専用。
export default function ManageBillingButton({ clientId, label = 'お支払い情報を管理' }: { clientId: string; label?: string }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function open() {
        if (loading) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/billing-portal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clientId }),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok || !json.url) {
                setError(json.error || '開けませんでした');
                setLoading(false);
                return;
            }
            window.location.href = json.url;
        } catch {
            setError('通信エラーが発生しました');
            setLoading(false);
        }
    }

    return (
        <div>
            <button type="button" onClick={open} disabled={loading}
                className="inline-block px-5 py-2.5 rounded-full text-xs font-bold border border-[#1A1A1A] text-[#1A1A1A] bg-white hover:bg-[#1A1A1A] hover:text-white transition"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {loading ? '開いています…' : `${label} →`}
            </button>
            {error && <p role="alert" className="mt-2 text-xs font-bold" style={{ color: '#C0392B' }}>{error}</p>}
        </div>
    );
}
