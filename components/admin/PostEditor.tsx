'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LivePreview from './LivePreview';
import ProductInsertModal from './ProductInsertModal';
import MediaPickerModal from './MediaPickerModal';

interface Category { id: number; name: string; slug: string; count: number }

interface PostEditorProps {
  categories: Category[];
  postId?: number;
  defaultValues?: {
    title: string;
    excerpt: string;
    body: string;
    date: string;
    categoryIds: number[];
    status: 'publish' | 'draft';
    featuredImage?: { url: string; id: number } | null;
  };
}

// ===== 画像圧縮（目標 200KB） =====
const TARGET_SIZE = 200 * 1024;
const MAX_DIM = 1920;

async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > MAX_DIM || height > MAX_DIM) {
        if (width >= height) { height = Math.round((height / width) * MAX_DIM); width = MAX_DIM; }
        else { width = Math.round((width / height) * MAX_DIM); height = MAX_DIM; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width; canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
      const tryQ = (q: number) => {
        canvas.toBlob((blob) => {
          if (!blob) { resolve(file); return; }
          if (blob.size <= TARGET_SIZE || q <= 0.05) {
            resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }));
          } else {
            tryQ(Math.max(q - 0.05, 0.05));
          }
        }, 'image/jpeg', q);
      };
      tryQ(0.85);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error(`画像をデコードできませんでした (${file.type || '不明'}, ${file.name})`)); };
    img.src = url;
  });
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', background: '#1a1a1a',
  border: '1px solid #2a2a2a', borderRadius: 8, color: '#e5e5e5',
  fontSize: 14, outline: 'none', boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, color: '#555', marginBottom: 6,
  textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600,
};

export default function PostEditor({ categories, postId, defaultValues }: PostEditorProps) {
  const router = useRouter();
  const isEdit = !!postId;

  const [title, setTitle] = useState(defaultValues?.title ?? '');
  const [excerpt, setExcerpt] = useState(defaultValues?.excerpt ?? '');
  const [body, setBody] = useState(defaultValues?.body ?? '');
  const [date, setDate] = useState(defaultValues?.date ?? new Date().toISOString().slice(0, 16));
  const [selectedCats, setSelectedCats] = useState<number[]>(defaultValues?.categoryIds ?? []);
  const [status, setStatus] = useState<'publish' | 'draft'>(defaultValues?.status ?? 'publish');

  const [featuredImage, setFeaturedImage] = useState<{ url: string; id: number } | null>(
    defaultValues?.featuredImage ?? null
  );
  const [uploadedImages, setUploadedImages] = useState<{ url: string; id: number }[]>([]);
  const [, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const showPreview = true;
  const [showProductModal, setShowProductModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [mediaPicker, setMediaPicker] = useState<null | 'featured' | 'body'>(null);
  const [slashQuery, setSlashQuery] = useState<string | null>(null);

  const featuredRef = useRef<HTMLInputElement>(null);
  const bodyImageRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cursorPosRef = useRef<number>(0);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const save = () => { cursorPosRef.current = ta.selectionStart; };
    ta.addEventListener('mouseup', save);
    ta.addEventListener('keyup', save);
    return () => { ta.removeEventListener('mouseup', save); ta.removeEventListener('keyup', save); };
  }, []);

  function generateExcerpt() {
    const plain = body
      .replace(/\[image:\d+\]/g, '')         // 画像タグ除去
      .replace(/^#{1,6}\s+/gm, '')           // 見出し記号除去
      .replace(/\*\*(.+?)\*\*/g, '$1')       // bold
      .replace(/\*(.+?)\*/g, '$1')           // italic
      .replace(/`(.+?)`/g, '$1')             // code
      .replace(/^[-*>\s]+/gm, '')            // リスト・引用記号
      .replace(/\n{2,}/g, '\n')              // 連続改行を1つに
      .replace(/\n/g, ' ')                   // 改行をスペースに
      .trim();
    // 文末句点で切る（80〜160字）
    let result = plain.slice(0, 160);
    const cutPoint = result.search(/[。．!?！？]/g);
    if (cutPoint >= 60) result = plain.slice(0, cutPoint + 1);
    else result = plain.slice(0, 120);
    setExcerpt(result.trim());
  }

  const uploadFile = useCallback(async (file: File): Promise<{ url: string; id: number }> => {
    const compressed = await compressImage(file);
    const fd = new FormData();
    fd.append('image', compressed, compressed.name);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Upload failed (${res.status}): ${text.slice(0, 300)}`);
    }
    return res.json();
  }, []);

  const uploadAndInsert = useCallback(async (files: File[]) => {
    if (!files.length) return;
    setUploading(true);
    try {
      const results = await Promise.all(files.map(uploadFile));
      setUploadedImages((prev) => {
        const startIdx = prev.length;
        const tag = results.map((_, i) => `[image:${startIdx + i}]`).join('\n');
        const pos = cursorPosRef.current;
        setBody((b) => b.slice(0, pos) + '\n' + tag + '\n' + b.slice(pos));
        return [...prev, ...results];
      });
    } catch (e) {
      setError(`画像のアップロードに失敗しました: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setUploading(false);
    }
  }, [uploadFile]);

  async function handleFeaturedUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try { setFeaturedImage(await uploadFile(file)); }
    catch (err) { setError(`アイキャッチ画像のアップロードに失敗しました: ${err instanceof Error ? err.message : String(err)}`); }
    finally { setUploading(false); }
  }

  async function handleBodyImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    await uploadAndInsert(Array.from(e.target.files || []));
    e.target.value = '';
  }

  function handleDragOver(e: React.DragEvent) { e.preventDefault(); setIsDragging(true); }
  function handleDragLeave(e: React.DragEvent) { e.preventDefault(); setIsDragging(false); }
  async function handleDrop(e: React.DragEvent) {
    e.preventDefault(); setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    if (files.length) await uploadAndInsert(files);
  }

  function handleBodyChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    const cursor = e.target.selectionStart;
    const lineStart = value.lastIndexOf('\n', cursor - 1) + 1;
    const currentLine = value.slice(lineStart, cursor);
    setBody(value);
    cursorPosRef.current = cursor;
    setSlashQuery(currentLine.startsWith('/') ? currentLine.slice(1).toLowerCase() : null);
  }

  function insertSlashCommand(before: string, after = '') {
    const ta = textareaRef.current;
    if (!ta) return;
    const cursor = ta.selectionStart;
    const lineStart = body.lastIndexOf('\n', cursor - 1) + 1;
    const replacement = before + after;
    setBody(body.slice(0, lineStart) + replacement + body.slice(cursor));
    setSlashQuery(null);
    setTimeout(() => {
      const nextCursor = lineStart + before.length;
      ta.selectionStart = ta.selectionEnd = nextCursor;
      cursorPosRef.current = nextCursor;
      ta.focus();
    }, 0);
  }

  function runSlashAction(action: () => void) {
    const ta = textareaRef.current;
    if (!ta) return;
    const cursor = ta.selectionStart;
    const lineStart = body.lastIndexOf('\n', cursor - 1) + 1;
    setBody(body.slice(0, lineStart) + body.slice(cursor));
    setSlashQuery(null);
    cursorPosRef.current = lineStart;
    setTimeout(action, 0);
  }

  const slashCommands = [
    { label: '見出し H2', keywords: 'h2 見出し', action: () => insertSlashCommand('<h2>', '</h2>') },
    { label: '小見出し H3', keywords: 'h3 小見出し', action: () => insertSlashCommand('<h3>', '</h3>') },
    { label: '太字', keywords: 'bold strong 太字', action: () => insertSlashCommand('<strong>', '</strong>') },
    { label: '斜体', keywords: 'italic em 斜体', action: () => insertSlashCommand('<em>', '</em>') },
    { label: '箇条書きリスト', keywords: 'ul 箇条書き リスト', action: () => insertSlashCommand('<ul>\n<li>', '</li>\n</ul>') },
    { label: '番号付きリスト', keywords: 'ol 番号 リスト', action: () => insertSlashCommand('<ol>\n<li>', '</li>\n</ol>') },
    { label: '引用', keywords: 'blockquote 引用', action: () => insertSlashCommand('<blockquote>', '</blockquote>') },
    { label: '画像をアップロード', keywords: 'image photo 画像 写真 アップロード', action: () => runSlashAction(() => bodyImageRef.current?.click()) },
    { label: 'メディアから画像を選択', keywords: 'media image メディア 画像', action: () => runSlashAction(() => setMediaPicker('body')) },
    { label: 'リンクを挿入', keywords: 'link url リンク', action: () => runSlashAction(() => { setLinkUrl(''); setShowLinkModal(true); }) },
    { label: '商品カードを挿入', keywords: 'product shop 商品 カード', action: () => runSlashAction(() => setShowProductModal(true)) },
  ].filter((command) => slashQuery === null || command.keywords.includes(slashQuery));


  function buildContent(): string {
    const blocks: string[] = [];
    for (const para of body.split('\n\n')) {
      const t = para.trim();
      if (!t) continue;
      const parts = t.split(/(\[image:\d+\])/);
      for (const part of parts) {
        const m = part.match(/^\[image:(\d+)\]$/);
        if (m) {
          const img = uploadedImages[parseInt(m[1], 10)];
          if (img) blocks.push(`<!-- wp:image {"id":${img.id}} -->\n<figure class="wp-block-image"><img src="${img.url}" class="wp-image-${img.id}" /></figure>\n<!-- /wp:image -->`);
        } else if (part.trim()) {
          const pt = part.trim();
          if (/^<(h[2-6]|ul|ol|blockquote|div|figure|table)/i.test(pt)) {
            blocks.push(`<!-- wp:html -->\n${pt}\n<!-- /wp:html -->`);
          } else {
            blocks.push(`<!-- wp:paragraph -->\n<p>${pt.replace(/\n/g, '<br>')}</p>\n<!-- /wp:paragraph -->`);
          }
        }
      }
    }
    return blocks.join('\n');
  }

  async function savePost(forcedStatus?: 'publish' | 'draft') {
    if (!title.trim()) { setError('タイトルを入力してください'); return; }
    setSaving(true); setError('');
    const fd = new FormData();
    fd.append('title', title);
    fd.append('excerpt', excerpt);
    fd.append('body', body);
    fd.append('content', buildContent());
    fd.append('date', new Date(date).toISOString());
    fd.append('postStatus', forcedStatus ?? status);
    selectedCats.forEach((id) => fd.append('categoryIds', String(id)));
    if (featuredImage) {
      fd.append('featuredImageUrl', featuredImage.url);
      fd.append('featuredImageId', String(featuredImage.id));
    }
    try {
      const url = isEdit ? `/api/admin/posts/${postId}` : '/api/admin/posts';
      const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', body: fd });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Save failed'); }
      router.push('/admin/posts'); router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
      setSaving(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); await savePost(); }
  function toggleCat(id: number) {
    setSelectedCats((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
  }

  // ===== エディター部分（左カラム） =====
  const editorPanel = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* タイトル */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>タイトル *</label>
          <span style={{
            fontSize: 11,
            color: title.length === 0 ? '#444'
              : title.length < 20 ? '#f59e0b'      // 短すぎ
              : title.length <= 35 ? '#22c55e'     // SEO最適 (検索結果に収まる)
              : title.length <= 60 ? '#22c55e'     // 上限内
              : '#ef4444',                          // 長すぎ
          }}>
            {title.length} 文字 {title.length > 60 ? '⚠ 長すぎ' : title.length >= 20 && title.length <= 60 ? '✓ SEO最適' : ''}
          </span>
        </div>
        <input
          value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="記事タイトルを入力... (20〜35文字程度がSEOに最適)"
          style={{ ...inputStyle, fontSize: 18, fontWeight: 600 }} required
        />
      </div>

      {/* 公開日時 / ステータス */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <label style={labelStyle}>公開日時</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>ステータス</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as 'publish' | 'draft')}
            style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="publish">公開</option>
            <option value="draft">下書き</option>
          </select>
        </div>
      </div>

      {/* 本文 */}
      <div>
        {/* テキストエリア */}
        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} style={{ position: 'relative' }}>
          <textarea
            ref={textareaRef} value={body} onChange={handleBodyChange}
            onKeyDown={(e) => { if (e.key === 'Escape') setSlashQuery(null); }}
            placeholder={'本文を入力...\n\n段落は空行で区切ります。\n画像はドラッグ＆ドロップで挿入できます。'}
            rows={22}
            style={{
              ...inputStyle, resize: 'vertical', lineHeight: 1.8,
              fontFamily: '"Noto Sans JP", sans-serif',
              borderRadius: 8,
              borderColor: isDragging ? '#22c55e' : '#2a2a2a',
              boxShadow: isDragging ? '0 0 0 2px #22c55e30' : 'none',
              transition: 'border-color 0.15s',
            }}
          />
          {slashQuery !== null && (
            <div style={{
              position: 'absolute', zIndex: 20, top: 12, left: 12, width: 220,
              padding: 6, background: '#fff', border: '1px solid #bfcac5', borderRadius: 10,
              boxShadow: '0 12px 32px rgba(26,26,26,.16)',
            }}>
              <p style={{ margin: '3px 8px 6px', color: '#7a8580', fontSize: 10 }}>ブロックを選択</p>
              {slashCommands.length > 0 ? slashCommands.map((command) => (
                <button
                  key={command.label}
                  type="button"
                  onClick={command.action}
                  style={{
                    display: 'block', width: '100%', padding: '8px 10px', textAlign: 'left',
                    background: '#fff', border: 'none', borderRadius: 6, color: '#1a1a1a',
                    fontSize: 12, cursor: 'pointer',
                  }}
                >{command.label}</button>
              )) : <p style={{ margin: 8, color: '#888', fontSize: 11 }}>一致する項目がありません</p>}
            </div>
          )}
          {isDragging && (
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(34,197,94,0.08)',
              border: '2px dashed #22c55e', borderRadius: '0 0 8px 8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
            }}>
              <span style={{ color: '#22c55e', fontSize: 15, fontWeight: 600 }}>📷 ここにドロップして挿入</span>
            </div>
          )}
        </div>
        <input ref={bodyImageRef} type="file" accept="image/*" multiple onChange={handleBodyImageInput} style={{ display: 'none' }} />

        {uploadedImages.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {uploadedImages.map((img, i) => (
              <div key={i} style={{ position: 'relative' }} title={`[image:${i}]`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 6, border: '1px solid #2a2a2a' }} />
                <span style={{
                  position: 'absolute', bottom: 2, right: 2, background: 'rgba(0,0,0,0.85)',
                  color: '#fff', fontSize: 9, padding: '1px 4px', borderRadius: 3,
                }}>[{i}]</span>
              </div>
            ))}
          </div>
        )}
        <p style={{ fontSize: 11, color: '#333', marginTop: 6 }}>
          💡 ドラッグ＆ドロップで挿入 ／ 画像は自動で約200KBに圧縮
        </p>
      </div>

      {/* 抜粋・メタディスクリプション */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>抜粋 / メタディスクリプション</label>
          <button type="button" onClick={generateExcerpt}
            style={{ fontSize: 11, padding: '3px 8px', background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: 5, color: '#888', cursor: 'pointer' }}>
            自動抽出
          </button>
          <span style={{
            fontSize: 11,
            color: excerpt.length === 0 ? '#444'
              : excerpt.length < 80 ? '#f59e0b'
              : excerpt.length <= 160 ? '#22c55e'
              : '#ef4444',
          }}>
            {excerpt.length} 文字 {excerpt.length > 160 ? '⚠ 長すぎ' : excerpt.length >= 80 && excerpt.length <= 160 ? '✓ SEO最適' : ''}
          </span>
        </div>
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
          placeholder="検索結果に表示される説明文 (80〜160文字推奨)。空欄の場合は本文先頭が使われます。"
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }} />
        <p style={{ fontSize: 11, color: '#3a3a3a', marginTop: 6 }}>
          💡 検索結果に表示される説明文です。本文の要約と「読みたくなるフック」を盛り込みましょう。
        </p>
      </div>

      {/* 検索結果プレビュー */}
      {(title || excerpt) && (
        <div>
          <label style={labelStyle}>Google検索結果プレビュー</label>
          <div style={{
            background: '#fff', padding: '14px 18px', borderRadius: 8,
            border: '1px solid #2a2a2a', fontFamily: 'arial, sans-serif',
          }}>
            <div style={{ fontSize: 12, color: '#202124', marginBottom: 2 }}>
              mitoflow40.com › journal › ...
            </div>
            <div style={{
              fontSize: 20, color: '#1a0dab', fontWeight: 400, lineHeight: 1.3, marginBottom: 3,
              fontFamily: 'arial, sans-serif',
            }}>
              {(title || '記事タイトル').slice(0, 60)}{title.length > 60 ? '...' : ''} | Mitoflow40
            </div>
            <div style={{ fontSize: 14, color: '#4d5156', lineHeight: 1.58, fontFamily: 'arial, sans-serif' }}>
              {(excerpt || '抜粋を入力するとここに表示されます').slice(0, 160)}
              {(excerpt.length > 160) && '...'}
            </div>
          </div>
        </div>
      )}

    </div>
  );

  // 現在の下書き（未保存含む）を localStorage に書き出し、新しいタブでプレビューを開く
  const openPreviewTab = () => {
    try {
      localStorage.setItem('mito_post_preview', JSON.stringify({
        title, date, body, excerpt, featuredImage, selectedCats, categories, uploadedImages,
      }));
    } catch { /* localStorage 不可でも開くだけ試みる */ }
    window.open('/admin/preview', '_blank', 'noopener');
  };

  // ===== プレビュー部分（右カラム） =====
  const previewPanel = (
    <LivePreview
      title={title}
      date={date}
      body={body}
      excerpt={excerpt}
      featuredImage={featuredImage}
      selectedCats={selectedCats}
      categories={categories}
      uploadedImages={uploadedImages}
      onUploadFeatured={() => featuredRef.current?.click()}
      onChooseFeatured={() => setMediaPicker('featured')}
      onRemoveFeatured={() => setFeaturedImage(null)}
      onToggleCategory={toggleCat}
    />
  );

  return (
    <form onSubmit={handleSubmit} className="admin-post-editor">
      <input ref={featuredRef} type="file" accept="image/*" onChange={handleFeaturedUpload} style={{ display: 'none' }} />
      {/* ── トップバー（追従） ── */}
      <div className="admin-editor-topbar" style={{
        position: 'fixed', top: 0, right: 8, zIndex: 60, height: 56,
        background: 'transparent',
        margin: 0, padding: 0,
        display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
        flexWrap: 'wrap', gap: 10,
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a href="/admin/posts" style={{
            padding: '9px 18px', background: 'transparent', border: '1px solid #2a2a2a',
            borderRadius: 8, color: '#555', textDecoration: 'none', fontSize: 13,
          }}>
            キャンセル
          </a>

          <button type="button" onClick={openPreviewTab} style={{
            padding: '9px 18px', background: 'transparent', border: '1px solid #2a2a2a',
            borderRadius: 8, color: '#8ab4f8', fontSize: 13, cursor: 'pointer',
          }}>
            プレビュー ↗
          </button>

          <button type="button" disabled={saving} onClick={() => savePost('draft')} style={{
            padding: '9px 18px', background: saving ? '#1a1a1a' : '#1e2a1e',
            border: '1px solid #2a4a2a', borderRadius: 8,
            color: saving ? '#444' : '#4ade80', fontSize: 13, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer',
          }}>
            下書き保存
          </button>

          <button type="submit" disabled={saving} style={{
            padding: '9px 22px', background: saving ? '#333' : '#22c55e',
            color: saving ? '#666' : '#000', border: 'none', borderRadius: 8,
            fontSize: 13, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
          }}>
            {saving ? '保存中...' : isEdit ? '更新して公開' : '公開する'}
          </button>
        </div>
      </div>

      {/* エラー */}
      {error && (
        <div style={{
          marginBottom: 16, padding: '10px 16px', background: '#1a0000',
          border: '1px solid #3a1a1a', borderRadius: 8, color: '#f87171', fontSize: 13,
        }}>
          {error}
        </div>
      )}

      {showLinkModal && (
        <div
          onClick={() => setShowLinkModal(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
        >
          <div
            className="admin-editor-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 12, padding: 24, width: '100%', maxWidth: 440, color: '#e5e5e5' }}
          >
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>🔗 リンクを挿入</h2>
            <p style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>
              URLを単独行で挿入します。記事公開時にOGPカードに自動変換されます。
            </p>
            <input
              autoFocus
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && linkUrl.startsWith('http')) {
                  const pos = cursorPosRef.current;
                  setBody((b) => b.slice(0, pos) + '\n\n' + linkUrl.trim() + '\n\n' + b.slice(pos));
                  setShowLinkModal(false);
                }
              }}
              placeholder="https://..."
              style={{ width: '100%', padding: '10px 12px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, color: '#e5e5e5', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
              <button type="button" onClick={() => setShowLinkModal(false)} style={{ padding: '8px 16px', background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: 6, color: '#aaa', cursor: 'pointer', fontSize: 12 }}>キャンセル</button>
              <button
                type="button"
                disabled={!linkUrl.startsWith('http')}
                onClick={() => {
                  const pos = cursorPosRef.current;
                  setBody((b) => b.slice(0, pos) + '\n\n' + linkUrl.trim() + '\n\n' + b.slice(pos));
                  setShowLinkModal(false);
                }}
                style={{ padding: '8px 20px', background: linkUrl.startsWith('http') ? '#22c55e' : '#333', color: '#000', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: linkUrl.startsWith('http') ? 'pointer' : 'not-allowed' }}
              >
                挿入
              </button>
            </div>
          </div>
        </div>
      )}

      <MediaPickerModal
        open={mediaPicker !== null}
        onClose={() => setMediaPicker(null)}
        title={mediaPicker === 'featured' ? 'アイキャッチ画像を選択' : '本文に挿入する画像を選択'}
        onSelect={(item) => {
          if (mediaPicker === 'featured') {
            setFeaturedImage(item);
          } else if (mediaPicker === 'body') {
            setUploadedImages((prev) => {
              const idx = prev.length;
              const pos = cursorPosRef.current;
              setBody((b) => b.slice(0, pos) + '\n[image:' + idx + ']\n' + b.slice(pos));
              return [...prev, item];
            });
          }
        }}
      />

      <ProductInsertModal
        open={showProductModal}
        onClose={() => setShowProductModal(false)}
        onInsert={(html) => {
          const ta = textareaRef.current;
          const pos = ta ? cursorPosRef.current : body.length;
          setBody((b) => b.slice(0, pos) + '\n\n' + html + '\n\n' + b.slice(pos));
        }}
      />

      {/* ── メインレイアウト ── */}
      <div className="admin-editor-grid" style={{
        display: 'grid',
        gridTemplateColumns: showPreview ? 'minmax(0, 1fr) minmax(0, 1fr)' : '1fr',
        gap: 10,
        alignItems: 'start',
      }}>
        {editorPanel}
        {showPreview && previewPanel}
      </div>
    </form>
  );
}
