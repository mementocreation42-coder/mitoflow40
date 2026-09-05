'use client';

import { useState } from 'react';

// 一斉配信の二重確認：SEND と入力 → ボタン → confirm ダイアログ
export default function SendConfirm({ count, disabled, hint }: { count: number; disabled: boolean; hint?: string }) {
    const [v, setV] = useState('');
    const ok = v.trim() === 'SEND' && !disabled;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input name="confirm" value={v} onChange={(e) => setV(e.target.value)} placeholder="SEND" disabled={disabled}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', background: '#fff' }} />
            <button type="submit" disabled={!ok}
                onClick={(e) => { if (!confirm(`${count} 名に配信します。取り消せません。よろしいですか？`)) e.preventDefault(); }}
                style={{ alignSelf: 'flex-start', padding: '9px 16px', borderRadius: 999, border: '1px solid #1a1a1a', background: ok ? '#1a1a1a' : '#eee', color: ok ? '#fff' : '#999', fontWeight: 700, fontSize: 12, cursor: ok ? 'pointer' : 'not-allowed' }}>
                {count} 名へ配信する
            </button>
            {hint && <span style={{ fontSize: 11, color: '#8a5a00' }}>{hint}</span>}
        </div>
    );
}
