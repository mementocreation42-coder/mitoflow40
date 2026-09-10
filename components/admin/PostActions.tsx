'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// 削除は 2 段階（「削除」→「本当に削除」）。ブラウザの confirm / alert は使わない。
// アプリ内ブラウザや一部の環境ではネイティブのダイアログが出ず、押しても何も起きないように見えるため。
export default function PostActions({ postId, classes }: { postId: number; classes?: { actions: string; edit: string; delete: string } }) {
  const router = useRouter();
  const [phase, setPhase] = useState<'idle' | 'armed' | 'deleting' | 'done'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // 「本当に削除」を 6 秒放置したら元に戻す
  useEffect(() => {
    if (phase !== 'armed') return;
    const t = window.setTimeout(() => setPhase('idle'), 6000);
    return () => window.clearTimeout(t);
  }, [phase]);

  async function doDelete() {
    setPhase('deleting'); setMessage(null);
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, { method: 'DELETE' });
      if (!res.ok) {
        let detail = '';
        try { detail = (await res.json()).error ?? ''; } catch { /* 本文なし */ }
        throw new Error(`${res.status}${detail ? ` – ${detail}` : ''}`);
      }
      const data = await res.json().catch(() => ({}));
      if (data.how === 'trash') setMessage('完全削除は拒否されたため、ゴミ箱へ移動しました');
      setPhase('done');
      // WordPress 側のキャッシュで一覧の再取得に古い結果が返ることがあるので、まず画面から消す
      rootRef.current?.closest('article')?.remove();
      router.refresh();
    } catch (e) {
      setMessage(`削除に失敗（${e instanceof Error ? e.message : String(e)}）`);
      setPhase('idle');
    }
  }

  const btnStyle = classes ? undefined : {
    padding: '6px 12px', background: 'transparent', border: '1px solid #3a1a1a',
    borderRadius: 6, color: '#f87171', cursor: 'pointer', fontSize: 12, whiteSpace: 'nowrap' as const,
  };

  return (
    <div ref={rootRef} className={classes?.actions} style={classes ? undefined : { display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
      {/* クライアント遷移にして、編集画面の読み込み中も loading スケルトンが出るようにする。
          先読みは切る（20 記事ぶんの編集画面＝WordPress 問い合わせが走ってしまう） */}
      <Link
        href={`/admin/posts/${postId}/edit`}
        prefetch={false}
        className={classes?.edit}
        style={classes ? undefined : {
          padding: '6px 12px', background: '#1e1e1e', border: '1px solid #2a2a2a',
          borderRadius: 6, color: '#aaa', textDecoration: 'none', fontSize: 12,
          textAlign: 'center', whiteSpace: 'nowrap',
        }}
      >
        編集
      </Link>
      {phase === 'armed' ? (
        <>
          <button type="button" onClick={doDelete} className={classes?.delete} style={{ ...(btnStyle ?? {}), background: '#b34b4b', color: '#fff', borderColor: '#b34b4b' }}>
            本当に削除
          </button>
          <button type="button" onClick={() => setPhase('idle')} className={classes?.edit} style={classes ? undefined : { ...btnStyle, color: '#aaa', borderColor: '#2a2a2a' }}>
            やめる
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setPhase('armed')}
          disabled={phase !== 'idle'}
          className={classes?.delete}
          style={btnStyle}
        >
          {phase === 'deleting' ? '削除中…' : phase === 'done' ? '削除済み' : '削除'}
        </button>
      )}
      {message && <p style={{ margin: 0, fontSize: 11, color: '#b34b4b', maxWidth: 220, lineHeight: 1.4 }}>{message}</p>}
    </div>
  );
}
