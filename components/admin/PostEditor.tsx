'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LivePreview from './LivePreview';

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

const toolbarBtnStyle: React.CSSProperties = {
  padding: '5px 10px', background: '#1e1e1e', border: '1px solid #2a2a2a',
  borderRadius: 6, color: '#aaa', cursor: 'pointer', fontSize: 12,
  whiteSpace: 'nowrap', lineHeight: 1,
};

// プレビュー用CSS
const PREVIEW_CSS = `
  .preview-body { font-family: "Noto Sans JP", sans-serif; font-size: 15px; line-height: 1.9; color: #222; }
  .preview-body h2 { font-size: 20px; font-weight: 700; margin: 36px 0 12px; padding-bottom: 8px; border-bottom: 2px solid #e5e5e5; color: #111; }
  .preview-body h3 { font-size: 17px; font-weight: 700; margin: 28px 0 10px; color: #222; }
  .preview-body p { margin: 0 0 18px; }
  .preview-body ul, .preview-body ol { margin: 16px 0; padding-left: 24px; }
  .preview-body ul { list-style: disc; }
  .preview-body ol { list-style: decimal; }
  .preview-body li { margin-bottom: 6px; line-height: 1.8; }
  .preview-body blockquote { margin: 24px 0; padding: 14px 20px; border-left: 3px solid #ccc; background: #f8f8f8; color: #555; font-style: italic; border-radius: 0 6px 6px 0; }
  .preview-body strong { font-weight: 700; }
  .preview-body em { font-style: italic; }
  .preview-body img { max-width: 100%; border-radius: 8px; margin: 16px 0; display: block; }
`;

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
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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

  function wrapOrInsert(before: string, after: string = '') {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = body.slice(start, end);
    const replacement = before + (selected || '') + after;
    setBody(body.slice(0, start) + replacement + body.slice(end));
    setTimeout(() => {
      const cur = selected ? start + replacement.length : start + before.length;
      ta.selectionStart = ta.selectionEnd = cur;
      ta.focus();
    }, 0);
  }


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
          if (/^<(h[2-6]|ul|ol|blockquote)/i.test(pt)) {
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
      router.push('/admin'); router.refresh();
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

      {/* アイキャッチ */}
      <div>
        <label style={labelStyle}>アイキャッチ画像</label>
        {featuredImage ? (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featuredImage.url} alt="" style={{ width: 200, height: 120, objectFit: 'cover', borderRadius: 8 }} />
            <button type="button" onClick={() => setFeaturedImage(null)} style={{
              position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.7)',
              border: 'none', borderRadius: '50%', width: 24, height: 24,
              color: '#fff', cursor: 'pointer', fontSize: 14, lineHeight: 1,
            }}>×</button>
          </div>
        ) : (
          <div onClick={() => featuredRef.current?.click()} style={{
            width: 200, height: 120, background: '#1a1a1a', border: '2px dashed #2a2a2a',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#555', fontSize: 13,
          }}>
            {uploading ? 'アップロード中...' : '+ 画像を選択'}
          </div>
        )}
        <input ref={featuredRef} type="file" accept="image/*" onChange={handleFeaturedUpload} style={{ display: 'none' }} />
      </div>

      {/* カテゴリ */}
      <div>
        <label style={labelStyle}>カテゴリ</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {categories.map((cat) => (
            <button key={cat.id} type="button" onClick={() => toggleCat(cat.id)} style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer',
              border: selectedCats.includes(cat.id) ? '1px solid #22c55e' : '1px solid #2a2a2a',
              background: selectedCats.includes(cat.id) ? '#22c55e20' : '#1a1a1a',
              color: selectedCats.includes(cat.id) ? '#22c55e' : '#888',
            }}>{cat.name}</button>
          ))}
        </div>
      </div>

      {/* 本文 */}
      <div>
        {/* ツールバー */}
        <div style={{
          display: 'flex', gap: 6, flexWrap: 'wrap', padding: '8px 10px',
          background: '#141414', border: '1px solid #2a2a2a', borderBottom: 'none',
          borderRadius: '8px 8px 0 0', alignItems: 'center',
        }}>
          <span style={{ fontSize: 11, color: '#444', marginRight: 2 }}>見出し</span>
          <button type="button" style={toolbarBtnStyle} onClick={() => wrapOrInsert('<h2>', '</h2>')}>H2</button>
          <button type="button" style={toolbarBtnStyle} onClick={() => wrapOrInsert('<h3>', '</h3>')}>H3</button>
          <span style={{ width: 1, height: 18, background: '#2a2a2a', margin: '0 4px' }} />
          <span style={{ fontSize: 11, color: '#444', marginRight: 2 }}>書式</span>
          <button type="button" style={{ ...toolbarBtnStyle, fontWeight: 700 }} onClick={() => wrapOrInsert('<strong>', '</strong>')}>B</button>
          <button type="button" style={{ ...toolbarBtnStyle, fontStyle: 'italic' }} onClick={() => wrapOrInsert('<em>', '</em>')}>I</button>
          <span style={{ width: 1, height: 18, background: '#2a2a2a', margin: '0 4px' }} />
          <span style={{ fontSize: 11, color: '#444', marginRight: 2 }}>リスト</span>
          <button type="button" style={toolbarBtnStyle} onClick={() => wrapOrInsert('<ul>\n<li>', '</li>\n</ul>')}>UL</button>
          <button type="button" style={toolbarBtnStyle} onClick={() => wrapOrInsert('<ol>\n<li>', '</li>\n</ol>')}>OL</button>
          <span style={{ width: 1, height: 18, background: '#2a2a2a', margin: '0 4px' }} />
          <button type="button" style={toolbarBtnStyle} onClick={() => wrapOrInsert('<blockquote>', '</blockquote>')}>❝</button>
          <span style={{ width: 1, height: 18, background: '#2a2a2a', margin: '0 4px' }} />
          <button type="button" style={{ ...toolbarBtnStyle, color: uploading ? '#444' : '#aaa' }}
            disabled={uploading} onClick={() => bodyImageRef.current?.click()}>
            {uploading ? '⏳' : '📷'}
          </button>
          <button type="button" style={toolbarBtnStyle} onClick={() => {
            const url = prompt('URLを入力してください');
            if (url?.startsWith('http')) {
              const ta = textareaRef.current;
              if (!ta) return;
              const pos = ta.selectionStart;
              setBody((b) => b.slice(0, pos) + '\n\n' + url.trim() + '\n\n' + b.slice(pos));
            }
          }}>🔗</button>
        </div>

        {/* テキストエリア */}
        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} style={{ position: 'relative' }}>
          <textarea
            ref={textareaRef} value={body} onChange={(e) => setBody(e.target.value)}
            placeholder={'本文を入力...\n\n段落は空行で区切ります。\n画像はドラッグ＆ドロップで挿入できます。'}
            rows={22}
            style={{
              ...inputStyle, resize: 'vertical', lineHeight: 1.8,
              fontFamily: '"Noto Sans JP", sans-serif',
              borderRadius: '0 0 8px 8px',
              borderColor: isDragging ? '#22c55e' : '#2a2a2a',
              boxShadow: isDragging ? '0 0 0 2px #22c55e30' : 'none',
              transition: 'border-color 0.15s',
            }}
          />
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

      {/* 公開日時 / ステータス */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
    </div>
  );

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
    />
  );

  return (
    <form onSubmit={handleSubmit}>
      {/* ── トップバー（追従） ── */}
      <div style={{
        position: 'sticky', top: 56, zIndex: 40,
        background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1e1e1e',
        margin: '0 -32px 24px', padding: '10px 32px',
        display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
        flexWrap: 'wrap', gap: 10,
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* プレビュー切り替え */}
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            style={{
              padding: '9px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
              border: showPreview ? '1px solid #22c55e' : '1px solid #2a2a2a',
              background: showPreview ? '#22c55e15' : '#1a1a1a',
              color: showPreview ? '#22c55e' : '#888',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <span style={{ fontSize: 14 }}>{showPreview ? '◧' : '▣'}</span>
            {showPreview ? 'プレビューON' : 'プレビュー'}
          </button>

          <a href="/admin" style={{
            padding: '9px 18px', background: 'transparent', border: '1px solid #2a2a2a',
            borderRadius: 8, color: '#555', textDecoration: 'none', fontSize: 13,
          }}>
            キャンセル
          </a>

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

      {/* ── メインレイアウト ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: showPreview ? '1fr 1fr' : '1fr',
        gap: 24,
        alignItems: 'start',
      }}>
        {editorPanel}
        {showPreview && previewPanel}
      </div>
    </form>
  );
}
