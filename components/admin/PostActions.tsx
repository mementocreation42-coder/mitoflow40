'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PostActions({ postId }: { postId: number }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm('この投稿を削除しますか？')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      router.refresh();
    } catch {
      alert('削除に失敗しました');
      setDeleting(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
      <a
        href={`/admin/posts/${postId}/edit`}
        style={{
          padding: '6px 12px', background: '#1e1e1e', border: '1px solid #2a2a2a',
          borderRadius: 6, color: '#aaa', textDecoration: 'none', fontSize: 12,
          textAlign: 'center', whiteSpace: 'nowrap',
        }}
      >
        編集
      </a>
      <button
        onClick={handleDelete}
        disabled={deleting}
        style={{
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
