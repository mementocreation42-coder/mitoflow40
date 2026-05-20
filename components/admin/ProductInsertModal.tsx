'use client';

import { useState, useRef, useEffect } from 'react';
import MediaPickerModal from './MediaPickerModal';

interface Props {
  open: boolean;
  onClose: () => void;
  onInsert: (html: string) => void;
}

const AMAZON_RE = /amazon\.co\.jp|amzn\.to|amzn\.asia/i;
const RAKUTEN_RE = /rakuten\.co\.jp|item\.rakuten/i;

export default function ProductInsertModal({ open, onClose, onInsert }: Props) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [fetching, setFetching] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setUrl(''); setTitle(''); setImageUrl(''); setPrice(''); setBrand('');
      setError(''); setFetching(false); setUploading(false);
    }
  }, [open]);

  if (!open) return null;

  const isAmazon = AMAZON_RE.test(url);
  const isRakuten = RAKUTEN_RE.test(url);

  async function autoFill() {
    if (!url.startsWith('http')) { setError('URLを入力してください'); return; }
    if (!isAmazon && !isRakuten) { setError('Amazon または 楽天 のURLを入力してください'); return; }
    setError(''); setFetching(true);
    try {
      const res = await fetch(`/api/product-metadata?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error('取得失敗');
      const d = await res.json();
      if (d.title && !title) setTitle(d.title);
      if (d.image && !imageUrl) setImageUrl(d.image);
      if (d.price && !price) setPrice(d.price);
      if (d.brand && !brand) setBrand(d.brand);
    } catch {
      setError('商品情報の自動取得に失敗。手動入力してください。');
    } finally {
      setFetching(false);
    }
  }

  async function uploadImage(file: File) {
    setUploading(true); setError('');
    try {
      const fd = new FormData();
      fd.append('image', file, file.name);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('アップロード失敗');
      const data = await res.json();
      setImageUrl(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'アップロードに失敗しました');
    } finally {
      setUploading(false);
    }
  }

  function insert() {
    if (!url.startsWith('http')) { setError('URLは必須です'); return; }
    if (!isAmazon && !isRakuten) { setError('Amazon または 楽天 のURLが必要です'); return; }

    const attrs = [
      isAmazon ? `data-amazon-url="${escapeAttr(url)}"` : `data-rakuten-url="${escapeAttr(url)}"`,
      title && `data-title="${escapeAttr(title)}"`,
      imageUrl && `data-image="${escapeAttr(imageUrl)}"`,
      price && `data-price="${escapeAttr(price)}"`,
      brand && `data-brand="${escapeAttr(brand)}"`,
    ].filter(Boolean).join(' ');

    const html = `<div class="mf-product-card" ${attrs}></div>`;
    onInsert(html);
    onClose();
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#141414', border: '1px solid #2a2a2a', borderRadius: 12,
          padding: 24, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto',
          color: '#e5e5e5', fontFamily: '"Noto Sans JP", sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>🛒 商品カードを挿入</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#666', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>

        {/* URL */}
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>商品URL (Amazon または 楽天) *</label>
          <div style={{ display: 'flex', gap: 6 }}>
            <input
              value={url} onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.amazon.co.jp/dp/..."
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              type="button" onClick={autoFill} disabled={fetching || !url}
              style={{
                padding: '0 14px', borderRadius: 8, fontSize: 12, cursor: fetching ? 'wait' : 'pointer',
                background: '#1e2a1e', border: '1px solid #2a4a2a', color: '#4ade80', whiteSpace: 'nowrap',
              }}
            >
              {fetching ? '取得中...' : '🔄 自動取得'}
            </button>
          </div>
          {url && !isAmazon && !isRakuten && (
            <p style={{ fontSize: 11, color: '#f87171', marginTop: 4 }}>Amazon または 楽天 のURLを入力してください</p>
          )}
        </div>

        {/* Image */}
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>商品画像</label>
          {imageUrl ? (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="" style={{ width: 80, height: 80, objectFit: 'contain', background: '#fff', borderRadius: 6, padding: 4 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <input
                  value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="画像URL"
                  style={{ ...inputStyle, fontSize: 11 }}
                />
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} style={smallBtn}>
                    {uploading ? '...' : '📷 アップロード'}
                  </button>
                  <button type="button" onClick={() => setShowPicker(true)} style={smallBtn}>🖼 メディアから</button>
                  <button type="button" onClick={() => setImageUrl('')} style={smallBtn}>クリア</button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div
                onClick={() => fileRef.current?.click()}
                style={{ padding: '18px 10px', border: '2px dashed #2a2a2a', borderRadius: 8, textAlign: 'center', color: '#666', fontSize: 12, cursor: 'pointer', background: '#0f0f0f' }}
              >
                {uploading ? '⏳ ...' : '📷 アップロード'}
              </div>
              <div
                onClick={() => setShowPicker(true)}
                style={{ padding: '18px 10px', border: '2px dashed #2a2a2a', borderRadius: 8, textAlign: 'center', color: '#666', fontSize: 12, cursor: 'pointer', background: '#0f0f0f' }}
              >
                🖼 メディアから
              </div>
              <p style={{ gridColumn: '1 / -1', fontSize: 11, color: '#444', margin: 0 }}>
                空欄なら自動取得 / 自動取得失敗時はここから指定
              </p>
            </div>
          )}
          <input
            ref={fileRef} type="file" accept="image/*"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = ''; }}
            style={{ display: 'none' }}
          />
        </div>

        {/* Title / Brand / Price */}
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>タイトル（任意・空欄なら自動取得）</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="商品名" style={inputStyle} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <div>
            <label style={labelStyle}>ブランド</label>
            <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="任意" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>価格</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="￥1,234" style={inputStyle} />
          </div>
        </div>

        {error && (
          <div style={{ padding: '8px 12px', background: '#1a0000', border: '1px solid #3a1a1a', borderRadius: 6, color: '#f87171', fontSize: 12, marginBottom: 14 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 18 }}>
          <button type="button" onClick={onClose} style={{ ...smallBtn, padding: '9px 18px' }}>キャンセル</button>
          <button
            type="button" onClick={insert} disabled={!url || (!isAmazon && !isRakuten)}
            style={{
              padding: '9px 22px', background: !url || (!isAmazon && !isRakuten) ? '#333' : '#22c55e',
              color: '#000', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}
          >
            挿入
          </button>
        </div>
      </div>

      <MediaPickerModal
        open={showPicker}
        onClose={() => setShowPicker(false)}
        title="商品画像を選択"
        onSelect={(item) => setImageUrl(item.url)}
      />
    </div>
  );
}

function escapeAttr(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, color: '#666', marginBottom: 6,
  textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', background: '#1a1a1a',
  border: '1px solid #2a2a2a', borderRadius: 8, color: '#e5e5e5',
  fontSize: 13, outline: 'none', boxSizing: 'border-box',
};

const smallBtn: React.CSSProperties = {
  padding: '7px 12px', background: '#1e1e1e', border: '1px solid #2a2a2a',
  borderRadius: 6, color: '#aaa', cursor: 'pointer', fontSize: 12,
};
