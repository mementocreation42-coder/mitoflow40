'use client';

import { useEffect, useState } from 'react';
import LivePreview from '@/components/admin/LivePreview';

// 記事エディタの「新しいタブでプレビュー」用ページ。
// エディタが localStorage に書き出した下書き（未保存を含む）を読み、
// LivePreview を編集コントロール無し（.admin-preview-control を非表示）で全幅表示する。

const KEY = 'mito_post_preview';

interface Draft {
    title: string;
    date: string;
    body: string;
    excerpt: string;
    featuredImage: { url: string; id: number } | null;
    selectedCats: number[];
    categories: { id: number; name: string }[];
    uploadedImages: { url: string; id: number }[];
}

const noop = () => {};

export default function PostPreviewPage() {
    const [draft, setDraft] = useState<Draft | null>(null);
    const [missing, setMissing] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(KEY);
            if (!raw) { setMissing(true); return; }
            setDraft(JSON.parse(raw));
        } catch {
            setMissing(true);
        }
        // 別タブでエディタが更新したら反映
        const onStorage = (e: StorageEvent) => {
            if (e.key === KEY && e.newValue) {
                try { setDraft(JSON.parse(e.newValue)); setMissing(false); } catch { /* ignore */ }
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    return (
        <div className="admin-root" style={{ minHeight: '100vh', background: '#f4f6f5' }}>
            {/* プレビューでは編集用ボタンを隠す */}
            <style>{`.admin-preview-control { display: none !important; }`}</style>
            <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#1a1a1a', color: '#cfe9df', fontSize: 12, padding: '8px 16px', letterSpacing: '.05em' }}>
                PREVIEW — この画面は下書きの見た目確認用です（未保存の内容を含みます）
            </div>

            <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px 80px' }}>
                {missing ? (
                    <p style={{ color: '#666', fontSize: 14, textAlign: 'center', padding: '80px 0' }}>
                        プレビューする下書きが見つかりません。エディタの「新しいタブでプレビュー」から開いてください。
                    </p>
                ) : draft ? (
                    <LivePreview
                        title={draft.title}
                        date={draft.date}
                        body={draft.body}
                        excerpt={draft.excerpt}
                        featuredImage={draft.featuredImage}
                        selectedCats={draft.selectedCats}
                        categories={draft.categories}
                        uploadedImages={draft.uploadedImages}
                        onUploadFeatured={noop}
                        onChooseFeatured={noop}
                        onRemoveFeatured={noop}
                        onToggleCategory={noop}
                    />
                ) : (
                    <p style={{ color: '#999', fontSize: 14, textAlign: 'center', padding: '80px 0' }}>読み込み中…</p>
                )}
            </div>
        </div>
    );
}
