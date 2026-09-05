'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LivePreview from './LivePreview';
import ProductInsertModal from './ProductInsertModal';
import MediaPickerModal from './MediaPickerModal';
import { bodyToWpContent, getCaretCoordinates, nowInTokyo, type UploadedImage } from './postBody';
import styles from './PostEditor.module.css';

// ── 記事エディタ（1 カラム＋リアルタイムプレビュー）──────────────────────
// HL Fishing の CMS と同じ作り：上から順にフォーム（タイトル → 日時・状態 → カテゴリー → アイキャッチ →
// 本文 → 抜粋）を縦に並べ、その下に公開ページと同じ見た目の PREVIEW を全幅で置く。入力するたびに更新される。
// 本文は行頭「/」でメニュー（見出し・箇条書き・画像・リンク・商品カード）。書式の解釈は postBody.ts に集約。

interface Category { id: number; name: string; slug: string; count: number }

export interface PostEditorDefaults {
  title: string;
  excerpt: string;
  body: string;
  date: string;               // YYYY-MM-DDTHH:mm（日本時間）
  categoryIds: number[];
  status: 'publish' | 'draft';
  featuredImage?: UploadedImage | null;
  uploadedImages?: UploadedImage[];
}

interface PostEditorProps {
  heading: string;
  categories: Category[];
  postId?: number;
  defaultValues?: PostEditorDefaults;
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

// ===== スラッシュメニュー =====
type SlashItem = { label: string; hint: string; keywords: string } & (
  | { kind: 'insert'; text: string }
  | { kind: 'wrap'; before: string; after: string }
  | { kind: 'action'; action: 'uploadImage' | 'pickImage' | 'link' | 'product' }
);

const SLASH_ITEMS: SlashItem[] = [
  { label: '大見出し', hint: '## ', keywords: 'h2 midashi 見出し', kind: 'insert', text: '## ' },
  { label: '小見出し', hint: '### ', keywords: 'h3 komidashi 小見出し', kind: 'insert', text: '### ' },
  { label: '箇条書き', hint: '- ', keywords: 'ul list kajou 箇条書き リスト', kind: 'insert', text: '- ' },
  { label: '番号付きリスト', hint: '1. ', keywords: 'ol number bangou 番号 リスト', kind: 'insert', text: '1. ' },
  { label: '引用', hint: '> ', keywords: 'quote inyou 引用', kind: 'insert', text: '> ' },
  { label: '太字', hint: '<strong>', keywords: 'bold strong futoji 太字', kind: 'wrap', before: '<strong>', after: '</strong>' },
  { label: '画像をアップロード', hint: 'ファイル', keywords: 'image photo gazou 画像 写真 アップロード', kind: 'action', action: 'uploadImage' },
  { label: 'メディアから画像', hint: 'WordPress', keywords: 'media gazou メディア 画像', kind: 'action', action: 'pickImage' },
  { label: 'リンクカード', hint: 'URL', keywords: 'link url ogp リンク', kind: 'action', action: 'link' },
  { label: '商品カード', hint: 'Amazon / 楽天', keywords: 'product shop amazon rakuten 商品 カード', kind: 'action', action: 'product' },
];

type SlashState = { open: boolean; top: number; left: number; lineStart: number; query: string; index: number };
const SLASH_CLOSED: SlashState = { open: false, top: 0, left: 0, lineStart: 0, query: '', index: 0 };

function counterTone(len: number, min: number, max: number): string {
  if (len === 0) return '';
  if (len < min) return styles.counterWarn;
  if (len <= max) return styles.counterOk;
  return styles.counterBad;
}

export default function PostEditor({ heading, categories, postId, defaultValues }: PostEditorProps) {
  const router = useRouter();
  const isEdit = !!postId;

  const [title, setTitle] = useState(defaultValues?.title ?? '');
  const [excerpt, setExcerpt] = useState(defaultValues?.excerpt ?? '');
  const [body, setBody] = useState(defaultValues?.body ?? '');
  const [date, setDate] = useState(() => defaultValues?.date ?? nowInTokyo());
  const [selectedCats, setSelectedCats] = useState<number[]>(defaultValues?.categoryIds ?? []);
  const [status, setStatus] = useState<'publish' | 'draft'>(defaultValues?.status ?? 'publish');
  const [featuredImage, setFeaturedImage] = useState<UploadedImage | null>(defaultValues?.featuredImage ?? null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(defaultValues?.uploadedImages ?? []);
  const [uploading, setUploading] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [dragBody, setDragBody] = useState(false);
  const [dragFeatured, setDragFeatured] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [linkModal, setLinkModal] = useState<{ open: boolean; url: string }>({ open: false, url: '' });
  const [mediaPicker, setMediaPicker] = useState<null | 'featured' | 'body'>(null);
  const [slash, setSlash] = useState<SlashState>(SLASH_CLOSED);

  const featuredRef = useRef<HTMLInputElement>(null);
  const bodyImageRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef(0);                 // 本文のキャレット位置（フォーカスが外れても覚えておく）
  const imagesRef = useRef(uploadedImages);    // 連続アップロードで番号がぶつからないよう、追加はこの ref を正とする
  const pendingCaret = useRef<number | null>(null);

  // 本文欄は内容に合わせて伸びる（内側にスクロールを作らず、ページをそのまま下へ辿るとプレビューに着く）
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.max(ta.scrollHeight, 360)}px`;
  }, [body]);

  // 挿入のあとにキャレットを置き直す
  useEffect(() => {
    const ta = textareaRef.current;
    const pos = pendingCaret.current;
    if (!ta || pos === null) return;
    pendingCaret.current = null;
    ta.focus();
    ta.setSelectionRange(pos, pos);
    cursorRef.current = pos;
  }, [body]);

  const rememberCaret = (e: React.SyntheticEvent<HTMLTextAreaElement>) => { cursorRef.current = e.currentTarget.selectionStart; };

  // キャレット位置にブロック（画像タグ・URL・商品カード）を、前後を空行で区切って差し込む
  const insertBlock = useCallback((text: string) => {
    setBody((b) => {
      const pos = Math.min(cursorRef.current, b.length);
      const before = b.slice(0, pos);
      const after = b.slice(pos);
      const pad1 = before.length === 0 || /\n\n$/.test(before) ? '' : /\n$/.test(before) ? '\n' : '\n\n';
      const pad2 = after.length === 0 || /^\n\n/.test(after) ? '' : /^\n/.test(after) ? '\n' : '\n\n';
      pendingCaret.current = (before + pad1 + text + pad2).length;
      return before + pad1 + text + pad2 + after;
    });
  }, []);

  // ===== 画像 =====
  const uploadFile = useCallback(async (file: File): Promise<UploadedImage> => {
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

  const addBodyImages = useCallback((items: UploadedImage[]) => {
    const start = imagesRef.current.length;
    imagesRef.current = [...imagesRef.current, ...items];
    setUploadedImages(imagesRef.current);
    insertBlock(items.map((_, i) => `[image:${start + i}]`).join('\n\n'));
  }, [insertBlock]);

  async function uploadToBody(files: File[]) {
    const imgs = files.filter((f) => f.type.startsWith('image/'));
    if (!imgs.length) return;
    setUploading((n) => n + 1); setError('');
    try { addBodyImages(await Promise.all(imgs.map(uploadFile))); }
    catch (e) { setError(`画像のアップロードに失敗しました: ${e instanceof Error ? e.message : String(e)}`); }
    finally { setUploading((n) => n - 1); }
  }

  async function uploadFeatured(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return;
    setUploading((n) => n + 1); setError('');
    try { setFeaturedImage(await uploadFile(file)); }
    catch (e) { setError(`アイキャッチ画像のアップロードに失敗しました: ${e instanceof Error ? e.message : String(e)}`); }
    finally { setUploading((n) => n - 1); }
  }

  // ===== 本文の入力とスラッシュメニュー =====
  const slashItems = SLASH_ITEMS.filter((it) => !slash.query || it.label.includes(slash.query) || it.keywords.includes(slash.query));

  function handleBodyChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    const caret = e.target.selectionStart;
    setBody(value);
    cursorRef.current = caret;
    const lineStart = value.lastIndexOf('\n', caret - 1) + 1;
    const line = value.slice(lineStart, caret);
    if (line.startsWith('/') && !/\s/.test(line)) {
      const query = line.slice(1).toLowerCase();
      if (!slash.open) {
        const c = getCaretCoordinates(e.target, lineStart);
        const lh = parseFloat(getComputedStyle(e.target).lineHeight) || 28;
        setSlash({ open: true, top: c.top + lh + 6, left: Math.max(0, Math.min(c.left, e.target.clientWidth - 280)), lineStart, query, index: 0 });
      } else {
        setSlash((s) => ({ ...s, lineStart, query, index: 0 }));
      }
    } else if (slash.open) {
      setSlash(SLASH_CLOSED);
    }
  }

  function applySlash(item: SlashItem) {
    const ta = textareaRef.current;
    const caret = ta ? ta.selectionStart : cursorRef.current;
    const { lineStart } = slash;
    const base = body.slice(0, lineStart) + body.slice(caret); // 「/クエリ」を消す
    setSlash(SLASH_CLOSED);
    if (item.kind === 'insert') {
      setBody(base.slice(0, lineStart) + item.text + base.slice(lineStart));
      pendingCaret.current = lineStart + item.text.length;
      return;
    }
    if (item.kind === 'wrap') {
      setBody(base.slice(0, lineStart) + item.before + item.after + base.slice(lineStart));
      pendingCaret.current = lineStart + item.before.length;
      return;
    }
    setBody(base);
    cursorRef.current = lineStart;
    pendingCaret.current = lineStart;
    setTimeout(() => {
      if (item.action === 'uploadImage') bodyImageRef.current?.click();
      else if (item.action === 'pickImage') setMediaPicker('body');
      else if (item.action === 'link') setLinkModal({ open: true, url: '' });
      else setShowProductModal(true);
    }, 0);
  }

  function handleBodyKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!slash.open) return;
    const n = slashItems.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); setSlash((s) => ({ ...s, index: n ? (s.index + 1) % n : 0 })); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSlash((s) => ({ ...s, index: n ? (s.index - 1 + n) % n : 0 })); }
    else if ((e.key === 'Enter' || e.key === 'Tab') && slashItems[slash.index]) { e.preventDefault(); applySlash(slashItems[slash.index]); }
    else if (e.key === 'Escape') { e.preventDefault(); setSlash(SLASH_CLOSED); }
  }

  // ===== 抜粋 =====
  function generateExcerpt() {
    const plain = body
      .replace(/\[image:\d+\]/g, '')
      .replace(/<div[^>]*mf-product-card[^>]*><\/div>/g, '')
      .replace(/^https?:\/\/\S+$/gm, '')
      .replace(/<[^>]+>/g, '')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/^[-*>\d.)\s]+/gm, '')
      .replace(/\n{2,}/g, '\n')
      .replace(/\n/g, ' ')
      .trim();
    let result = plain.slice(0, 160);
    const cutPoint = result.search(/[。．!?！？]/);
    if (cutPoint >= 60) result = plain.slice(0, cutPoint + 1);
    else result = plain.slice(0, 120);
    setExcerpt(result.trim());
  }

  // ===== 保存 =====
  async function savePost(forced?: 'publish' | 'draft') {
    if (!title.trim()) { setError('タイトルを入力してください'); return; }
    if (uploading > 0) { setError('画像のアップロードが終わるまでお待ちください'); return; }
    setSaving(true); setError('');
    const fd = new FormData();
    fd.append('title', title);
    fd.append('excerpt', excerpt);
    fd.append('content', bodyToWpContent(body, uploadedImages));
    // WordPress はタイムゾーン無しの日時をサイトの時刻（JST）として受け取る。UTC に変換して送らない
    fd.append('date', date.length === 16 ? `${date}:00` : date);
    fd.append('postStatus', forced ?? status);
    selectedCats.forEach((id) => fd.append('categoryIds', String(id)));
    if (featuredImage) {
      if (featuredImage.id) fd.append('featuredImageId', String(featuredImage.id));
    } else if (isEdit) {
      fd.append('featuredImageId', '0'); // 編集で外した
    }
    try {
      const res = await fetch(isEdit ? `/api/admin/posts/${postId}` : '/api/admin/posts', { method: isEdit ? 'PUT' : 'POST', body: fd });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || 'Save failed'); }
      router.push('/admin/posts');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
      setSaving(false);
    }
  }

  function toggleCat(id: number) {
    setSelectedCats((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  // 現在の下書き（未保存含む）を localStorage に書き出し、別タブでプレビューを開く
  function openPreviewTab() {
    try {
      localStorage.setItem('mito_post_preview', JSON.stringify({ title, date, body, excerpt, featuredImage, selectedCats, categories, uploadedImages }));
    } catch { /* localStorage 不可でも開くだけ試みる */ }
    window.open('/admin/preview', '_blank', 'noopener');
  }

  const scrollToPreview = () => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const publishLabel = saving ? '保存中…' : isEdit ? '更新して公開' : '公開する';

  return (
    <div className={styles.page}>
      <form onSubmit={(e) => { e.preventDefault(); savePost(); }}>
        {/* ── 追従ヘッダー ── */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <Link href="/admin/posts" className={styles.back}>← 記事一覧</Link>
            <h1 className={styles.heading}>{heading}</h1>
            <span className={`${styles.statusPill} ${status === 'draft' ? styles.statusPillDraft : ''}`}>{status === 'draft' ? '下書き' : '公開'}</span>
          </div>
          <div className={styles.topbarActions}>
            <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={scrollToPreview}>プレビューへ ↓</button>
            <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={openPreviewTab}>別タブ ↗</button>
            <button type="button" className={styles.btn} disabled={saving} onClick={() => savePost('draft')}>下書き保存</button>
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={saving}>{publishLabel}</button>
          </div>
        </header>

        <div className={styles.container}>
          <div className={styles.panel}>
            {/* タイトル */}
            <div className={styles.field}>
              <div className={styles.labelRow}>
                <label className={styles.label} htmlFor="post-title">タイトル<span className={styles.required}>*</span></label>
                <span className={`${styles.counter} ${counterTone(title.length, 20, 60)}`}>
                  {title.length} 文字{title.length > 60 ? ' ⚠ 長すぎ' : title.length >= 20 ? ' ✓ SEO最適' : ''}
                </span>
              </div>
              <input id="post-title" className={`${styles.input} ${styles.titleInput}`} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="記事タイトルを入力（20〜35文字程度がSEOに最適）" required />
            </div>

            {/* 公開日時 / ステータス */}
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="post-date">公開日時</label>
                <input id="post-date" type="datetime-local" className={styles.input} value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="post-status">ステータス</label>
                <select id="post-status" className={styles.select} value={status} onChange={(e) => setStatus(e.target.value as 'publish' | 'draft')}>
                  <option value="publish">公開</option>
                  <option value="draft">下書き</option>
                </select>
              </div>
            </div>

            {/* カテゴリー */}
            <div className={styles.field}>
              <span className={styles.label}>カテゴリー</span>
              <div className={styles.chips}>
                {categories.map((cat) => {
                  const selected = selectedCats.includes(cat.id);
                  return (
                    <button key={cat.id} type="button" className={`${styles.chip} ${selected ? styles.chipActive : ''}`} aria-pressed={selected} onClick={() => toggleCat(cat.id)}>
                      {selected ? '✓ ' : ''}{cat.name}
                    </button>
                  );
                })}
              </div>
              <span className={styles.hint}>複数選べます。公開ページの上部と記事一覧のバッジに出ます</span>
            </div>

            {/* アイキャッチ */}
            <div className={styles.field}>
              <span className={styles.label}>アイキャッチ画像</span>
              <div
                className={`${styles.dropZone} ${dragFeatured ? styles.dropZoneOver : ''}`}
                role="button" tabIndex={0}
                onClick={() => featuredRef.current?.click()}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); featuredRef.current?.click(); } }}
                onDragOver={(e) => { e.preventDefault(); setDragFeatured(true); }}
                onDragLeave={() => setDragFeatured(false)}
                onDrop={(e) => { e.preventDefault(); setDragFeatured(false); uploadFeatured(e.dataTransfer.files?.[0]); }}
              >
                {featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featuredImage.url} alt="" className={styles.thumb} />
                ) : (
                  <div className={styles.thumbEmpty}>No Image</div>
                )}
                <div className={styles.dropText}>
                  {uploading > 0 ? 'アップロード中…' : (
                    <>
                      <strong>{featuredImage ? '差し替える：ここにドラッグ&ドロップ' : 'ここにドラッグ&ドロップ'}</strong>
                      <span className={styles.dropSub}>またはクリックして選択（自動で約200KBに圧縮）</span>
                    </>
                  )}
                </div>
                <div className={styles.dropActions} onClick={(e) => e.stopPropagation()}>
                  <button type="button" className={styles.miniBtn} onClick={() => setMediaPicker('featured')}>メディアから選択</button>
                  {featuredImage && <button type="button" className={`${styles.miniBtn} ${styles.miniBtnDanger}`} onClick={() => setFeaturedImage(null)}>外す</button>}
                </div>
              </div>
              <input ref={featuredRef} type="file" accept="image/*" hidden onChange={(e) => { uploadFeatured(e.target.files?.[0]); e.target.value = ''; }} />
            </div>

            {/* 本文 */}
            <div className={styles.field}>
              <div className={styles.labelRow}>
                <label className={styles.label} htmlFor="post-body">本文</label>
                <span className={styles.counter}>{body.length} 文字</span>
              </div>
              <div
                className={styles.bodyWrap}
                onDragOver={(e) => { e.preventDefault(); setDragBody(true); }}
                onDragLeave={() => setDragBody(false)}
                onDrop={(e) => { e.preventDefault(); setDragBody(false); uploadToBody(Array.from(e.dataTransfer.files)); }}
              >
                <textarea
                  id="post-body"
                  ref={textareaRef}
                  className={`${styles.textarea} ${styles.bodyArea} ${dragBody ? styles.bodyAreaDrag : ''}`}
                  value={body}
                  onChange={handleBodyChange}
                  onKeyDown={handleBodyKeyDown}
                  onKeyUp={rememberCaret}
                  onClick={rememberCaret}
                  onSelect={rememberCaret}
                  onBlur={() => setTimeout(() => setSlash((s) => (s.open ? SLASH_CLOSED : s)), 150)}
                  onPaste={(e) => { const files = Array.from(e.clipboardData.files); if (files.length) { e.preventDefault(); uploadToBody(files); } }}
                  placeholder={'本文を入力...\n\n空行で段落が分かれます。行頭で「/」を入力するとメニューが出ます。\n画像はドラッグ＆ドロップ／貼り付けで挿入できます。'}
                />
                {slash.open && (
                  <ul className={styles.slashMenu} style={{ top: slash.top, left: slash.left }}>
                    <li className={styles.slashTitle}>ブロックを選択（↑↓ で移動・Enter で決定）</li>
                    {slashItems.length > 0 ? slashItems.map((it, i) => (
                      <li
                        key={it.label}
                        className={`${styles.slashItem} ${i === slash.index ? styles.slashItemActive : ''}`}
                        onMouseDown={(e) => { e.preventDefault(); applySlash(it); }}
                        onMouseEnter={() => setSlash((s) => ({ ...s, index: i }))}
                      >
                        <span>{it.label}</span>
                        <span className={styles.slashHint}>{it.hint}</span>
                      </li>
                    )) : <li className={styles.slashEmpty}>一致する項目がありません</li>}
                  </ul>
                )}
                {dragBody && <div className={styles.dropHint}>📷 ここにドロップして挿入</div>}
              </div>
              <input ref={bodyImageRef} type="file" accept="image/*" multiple hidden onChange={(e) => { uploadToBody(Array.from(e.target.files || [])); e.target.value = ''; }} />

              {uploadedImages.length > 0 && (
                <div className={styles.imageStrip}>
                  {uploadedImages.map((img, i) => (
                    <div key={`${img.url}-${i}`} className={styles.imageChip} title={`[image:${i}]`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt="" />
                      <span>[{i}]</span>
                    </div>
                  ))}
                </div>
              )}
              <span className={styles.hint}>「/」でメニュー。直接書いても可：## 大見出し、### 小見出し、- 箇条書き、&gt; 引用、URL だけの行 → リンクカード</span>
            </div>

            {/* 抜粋・メタディスクリプション */}
            <div className={styles.field}>
              <div className={styles.labelRow}>
                <label className={styles.label} htmlFor="post-excerpt">抜粋 / メタディスクリプション</label>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <button type="button" className={styles.miniBtn} onClick={generateExcerpt}>本文から自動抽出</button>
                  <span className={`${styles.counter} ${counterTone(excerpt.length, 80, 160)}`}>
                    {excerpt.length} 文字{excerpt.length > 160 ? ' ⚠ 長すぎ' : excerpt.length >= 80 ? ' ✓ SEO最適' : ''}
                  </span>
                </span>
              </div>
              <textarea id="post-excerpt" className={styles.textarea} rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="検索結果に表示される説明文（80〜160文字推奨）。空欄の場合は本文先頭が使われます。" />
            </div>

            {(title || excerpt) && (
              <div className={styles.field}>
                <span className={styles.label}>Google 検索結果プレビュー</span>
                <div className={styles.serp}>
                  <div className={styles.serpUrl}>mitoflow40.com › journal › ...</div>
                  <div className={styles.serpTitle}>{(title || '記事タイトル').slice(0, 60)}{title.length > 60 ? '...' : ''} | Mitoflow40</div>
                  <div className={styles.serpDesc}>{(excerpt || '抜粋を入力するとここに表示されます').slice(0, 160)}{excerpt.length > 160 && '...'}</div>
                </div>
              </div>
            )}

            {error && <p className={styles.error} role="alert">{error}</p>}

            <div className={styles.footer}>
              {uploading > 0 && <span className={styles.uploadingNote}>画像をアップロード中…</span>}
              <button type="button" className={styles.btn} disabled={saving} onClick={() => savePost('draft')}>下書き保存</button>
              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={saving}>{publishLabel}</button>
            </div>
          </div>
        </div>
      </form>

      {/* ── リアルタイムプレビュー（フォームの下・全幅）── */}
      <div ref={previewRef} className={`${styles.container} ${styles.previewSection}`}>
        <div className={styles.previewHead}>
          <span className={styles.previewLabel}>Preview<small>入力するたびに更新されます</small></span>
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑ 編集に戻る</button>
        </div>
        <LivePreview
          title={title}
          date={date}
          body={body}
          featuredImage={featuredImage}
          selectedCats={selectedCats}
          categories={categories}
          uploadedImages={uploadedImages}
        />
      </div>

      {/* ── モーダル（フォームの外に置く：中のボタンで誤って送信されないように）── */}
      {linkModal.open && (
        <div className={styles.modalBackdrop} onClick={() => setLinkModal({ open: false, url: '' })}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>🔗 リンクカードを挿入</h2>
            <p>URL を 1 行だけの段落として挿入します。公開時に OGP カード（Amazon／楽天は商品カード）になります。</p>
            <input
              autoFocus
              className={styles.input}
              value={linkModal.url}
              onChange={(e) => setLinkModal({ open: true, url: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && /^https?:\/\//.test(linkModal.url.trim())) { insertBlock(linkModal.url.trim()); setLinkModal({ open: false, url: '' }); }
                if (e.key === 'Escape') setLinkModal({ open: false, url: '' });
              }}
              placeholder="https://..."
            />
            <div className={styles.modalActions}>
              <button type="button" className={styles.btn} onClick={() => setLinkModal({ open: false, url: '' })}>キャンセル</button>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary}`}
                disabled={!/^https?:\/\//.test(linkModal.url.trim())}
                onClick={() => { insertBlock(linkModal.url.trim()); setLinkModal({ open: false, url: '' }); }}
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
          if (mediaPicker === 'featured') setFeaturedImage(item);
          else addBodyImages([item]);
        }}
      />

      <ProductInsertModal
        open={showProductModal}
        onClose={() => setShowProductModal(false)}
        onInsert={(html) => insertBlock(html)}
      />
    </div>
  );
}
