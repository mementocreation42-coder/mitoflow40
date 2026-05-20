'use client';

import { useState, useEffect, useCallback } from 'react';

interface MediaItem {
  id: number;
  source_url: string;
  thumbnail_url: string;
  title: string;
  alt_text: string;
  date: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (item: { url: string; id: number }) => void;
  title?: string;
}

export default function MediaPickerModal({ open, onClose, onSelect, title = 'メディアライブラリから選択' }: Props) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const fetchMedia = useCallback(async (p: number, q: string) => {
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams({ page: String(p), per_page: '50' });
      if (q) params.set('search', q);
      const res = await fetch(`/api/admin/media?${params.toString()}`);
      if (!res.ok) throw new Error('読み込みに失敗しました');
      const data = await res.json();
      setItems(data.items);
      setTotalPages(data.totalPages);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'エラー');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) { setSelectedId(null); fetchMedia(page, search); }
  }, [open, page, search, fetchMedia]);

  useEffect(() => {
    if (!open) { setPage(1); setSearch(''); setSearchInput(''); }
  }, [open]);

  if (!open) return null;

  const selectedItem = items.find((i) => i.id === selectedId);

  function handleInsert() {
    if (!selectedItem) return;
    onSelect({ url: selectedItem.source_url, id: selectedItem.id });
    onClose();
  }

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#141414', border: '1px solid #2a2a2a', borderRadius: 12,
          width: '100%', maxWidth: 900, maxHeight: '90vh', display: 'flex', flexDirection: 'column',
          color: '#e5e5e5', fontFamily: '"Noto Sans JP", sans-serif',
        }}
      >
        {/* ヘッダー */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: '1px solid #2a2a2a' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 }}>🖼 {title}</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#666', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>

        {/* 検索 */}
        <div style={{ padding: '14px 22px', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 8 }}>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { setPage(1); setSearch(searchInput); } }}
            placeholder="ファイル名・タイトルで検索..."
            style={{ flex: 1, padding: '8px 12px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 6, color: '#e5e5e5', fontSize: 13, outline: 'none' }}
          />
          <button
            onClick={() => { setPage(1); setSearch(searchInput); }}
            style={{ padding: '8px 16px', background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: 6, color: '#aaa', cursor: 'pointer', fontSize: 12 }}
          >
            検索
          </button>
          {search && (
            <button
              onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}
              style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #2a2a2a', borderRadius: 6, color: '#666', cursor: 'pointer', fontSize: 12 }}
            >
              クリア
            </button>
          )}
        </div>

        {/* グリッド */}
        <div style={{ flex: 1, overflow: 'auto', padding: 22 }}>
          {error && (
            <div style={{ padding: 10, background: '#1a0000', border: '1px solid #3a1a1a', borderRadius: 6, color: '#f87171', fontSize: 13, marginBottom: 14 }}>{error}</div>
          )}
          {loading ? (
            <div style={{ textAlign: 'center', color: '#666', padding: 40, fontSize: 13 }}>読み込み中...</div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#666', padding: 40, fontSize: 13 }}>画像がありません</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
              {items.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    onDoubleClick={() => { setSelectedId(item.id); onSelect({ url: item.source_url, id: item.id }); onClose(); }}
                    title={item.title || item.source_url}
                    style={{
                      position: 'relative', aspectRatio: '1', borderRadius: 8, overflow: 'hidden',
                      cursor: 'pointer', background: '#0a0a0a',
                      border: isSelected ? '2px solid #22c55e' : '2px solid transparent',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumbnail_url}
                      alt={item.alt_text}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                    {isSelected && (
                      <div style={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#000', fontWeight: 700 }}>✓</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* フッター */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 22px', borderTop: '1px solid #2a2a2a' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              style={{ padding: '6px 12px', background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: 6, color: page <= 1 ? '#444' : '#aaa', cursor: page <= 1 ? 'not-allowed' : 'pointer', fontSize: 12 }}
            >← 前</button>
            <span style={{ fontSize: 12, color: '#666' }}>{page} / {totalPages}</span>
            <button
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              style={{ padding: '6px 12px', background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: 6, color: page >= totalPages ? '#444' : '#aaa', cursor: page >= totalPages ? 'not-allowed' : 'pointer', fontSize: 12 }}
            >次 →</button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onClose} style={{ padding: '8px 16px', background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: 6, color: '#aaa', cursor: 'pointer', fontSize: 12 }}>キャンセル</button>
            <button
              disabled={!selectedItem}
              onClick={handleInsert}
              style={{ padding: '8px 20px', background: selectedItem ? '#22c55e' : '#333', color: '#000', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: selectedItem ? 'pointer' : 'not-allowed' }}
            >
              この画像を挿入
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
