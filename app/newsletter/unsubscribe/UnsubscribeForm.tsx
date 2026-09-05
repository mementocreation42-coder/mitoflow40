'use client';

import { useState, useTransition } from 'react';
import { unsubscribeAction } from './actions';

export default function UnsubscribeForm({ token, email }: { token: string; email: string }) {
    const [done, setDone] = useState<'idle' | 'ok' | 'fail'>('idle');
    const [pending, start] = useTransition();
    const font = { fontFamily: "'Space Grotesk', sans-serif" } as const;

    if (done === 'ok') {
        return (
            <>
                <p className="text-xs tracking-widest font-bold mb-3" style={{ ...font, color: '#FF9855' }}>UNSUBSCRIBED</p>
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1A1A]" style={font}>配信を停止しました</h1>
                <p className="text-sm text-[#4A4A4A] leading-loose">{email} への配信は停止されました。これまでお読みいただきありがとうございました。<br />また読みたくなったら、いつでも登録フォームからお戻りください。</p>
            </>
        );
    }
    return (
        <form action={(fd) => start(async () => { const r = await unsubscribeAction(fd); setDone(r.ok ? 'ok' : 'fail'); })}>
            <input type="hidden" name="t" value={token} />
            <p className="text-xs tracking-widest font-bold mb-3" style={{ ...font, color: '#FF9855' }}>UNSUBSCRIBE</p>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1A1A]" style={font}>配信を停止しますか？</h1>
            <p className="text-sm text-[#4A4A4A] leading-loose mb-8">{email} への Mitoflow40 レターの配信を停止します。</p>
            <button type="submit" disabled={pending} className="inline-block px-8 py-3 rounded-full text-sm font-bold bg-[#1A1A1A] text-white disabled:opacity-50" style={font}>
                {pending ? '処理中…' : '配信を停止する'}
            </button>
            {done === 'fail' && <p className="text-xs font-bold mt-4" style={{ color: '#C0392B' }}>解除できませんでした。リンクが無効な可能性があります。お手数ですが info@mitoflow40.com までご連絡ください。</p>}
        </form>
    );
}
