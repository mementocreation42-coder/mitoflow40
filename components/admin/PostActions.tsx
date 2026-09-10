'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function PostActions({ postId, classes }: { postId: number; classes?: { actions: string; edit: string; delete: string } }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  async function handleDelete() {
    if (!confirm('この投稿を削除しますか？')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, { method: 'DELETE' });
      if (!res.ok) {
        let message = '';
        try { message = (await res.json()).error ?? ''; } catch { /* 本文なし */ }
        throw new Error(`${res.status}${message ? ` – ${message}` : ''}`);
      }
      const data = await res.json().catch(() => ({}));
      if (data.how === 'trash') alert('完全削除は WordPress 側で拒否されたため、ゴミ箱へ移動しました。');
      // WordPress 側のキャッシュで一覧の再取得に古い結果が返ることがあるので、まず画面から消す
      rootRef.current?.closest('article')?.remove();
      setDeleting(false);
      router.refresh();
    } catch (e) {
      // 失敗の理由をそのまま見せる（WordPress 側の応答を含む）
      alert(`削除に失敗しました（${e instanceof Error ? e.message : String(e)}）`);
      setDeleting(false);
    }
  }

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
      <button
        onClick={handleDelete}
        disabled={deleting}
        className={classes?.delete}
        style={classes ? undefined : {
          padding: '6px 12px', background: 'transparent', border: '1px solid #3a1a1a',
          borderRadius: 6, color: deleting ? '#444' : '#f87171', cursor: deleting ? 'not-allowed' : 'pointer',
          fontSize: 12, whiteSpace: 'nowrap',
        }}
      >
        {deleting ? '削除中...' : '削除'}
      </button>
    </div>
  );
}
