'use client';

import { useState } from 'react';

// 「申し込む」ボタン。/api/checkout に planId を渡し、Stripe のホスト型決済画面へ遷移する。
// カード情報はこのサイトでは扱わない（Stripe の画面で入力）。
export default function CheckoutButton({
    planId,
    clientId,
    label,
    disabled,
    className,
    style,
}: {
    planId: string;
    clientId?: string;
    label: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function start() {
        if (loading || disabled) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId, clientId }),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok || !json.url) {
                setError(json.error || '決済画面を開けませんでした');
                setLoading(false);
                return;
            }
            window.location.href = json.url;
        } catch {
            setError('通信エラーが発生しました。時間をおいて再度お試しください');
            setLoading(false);
        }
    }

    return (
        <div>
            <button
                type="button"
                onClick={start}
                disabled={disabled || loading}
                aria-busy={loading}
                className={className}
                style={{ ...style, ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}), ...(loading ? { opacity: 0.7, cursor: 'progress' } : {}) }}
            >
                {loading ? '決済画面を開いています…' : label}
            </button>
            {error && (
                <p role="alert" className="mt-2 text-xs font-bold" style={{ color: '#C0392B' }}>{error}</p>
            )}
        </div>
    );
}
