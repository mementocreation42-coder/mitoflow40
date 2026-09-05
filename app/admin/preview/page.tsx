'use client';

import { useMemo, useSyncExternalStore } from 'react';
import LivePreview from '@/components/admin/LivePreview';

// 記事エディタの「別タブ ↗」用ページ。
// エディタが localStorage に書き出した下書き（未保存を含む）を読み、LivePreview を全幅で表示する。
// localStorage は外部ストアとして購読する（storage イベントで別タブの更新を反映。effect 内の setState を使わない）。

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

function subscribe(onChange: () => void) {
    window.addEventListener('storage', onChange);
    return () => window.removeEventListener('storage', onChange);
}
function getSnapshot(): string | null {
    try { return localStorage.getItem(KEY); } catch { return null; }
}
const getServerSnapshot = () => null;
const isClientSnapshot = () => true;
const isServerSnapshot = () => false;
const noop = () => () => {};

export default function PostPreviewPage() {
    const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const hydrated = useSyncExternalStore(noop, isClientSnapshot, isServerSnapshot);
    const draft = useMemo<Draft | null>(() => {
        if (!raw) return null;
        try { return JSON.parse(raw) as Draft; } catch { return null; }
    }, [raw]);

    return (
        <div className="admin-root" style={{ minHeight: '100vh', background: '#6fa8c4' }}>
            <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#1a1a1a', color: '#cfe9df', fontSize: 12, padding: '8px 16px', letterSpacing: '.05em' }}>
                PREVIEW — この画面は下書きの見た目確認用です（未保存の内容を含みます）
            </div>

            <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 16px 80px' }}>
                {!hydrated ? (
                    <p style={{ color: '#1a1a1a', fontSize: 14, textAlign: 'center', padding: '80px 0' }}>読み込み中…</p>
                ) : draft ? (
                    <LivePreview
                        title={draft.title}
                        date={draft.date}
                        body={draft.body}
                        featuredImage={draft.featuredImage}
                        selectedCats={draft.selectedCats}
                        categories={draft.categories}
                        uploadedImages={draft.uploadedImages ?? []}
                    />
                ) : (
                    <p style={{ color: '#1a1a1a', fontSize: 14, textAlign: 'center', padding: '80px 0' }}>
                        プレビューする下書きが見つかりません。エディタの「別タブ ↗」から開いてください。
                    </p>
                )}
            </div>
        </div>
    );
}
