import styles from './PostEditor.module.css';
import admin from '@/app/admin/admin.module.css';

// 記事エディタ（新規／編集）の読み込み中に出す骨組み。編集画面は WordPress から記事を取ってから描くので、
// その間もヘッダーの位置と本文欄の枠だけ先に見せて「固まっていない」ことを伝える。
export default function EditorSkeleton() {
    const bone = (w: number | string, h: number, extra?: React.CSSProperties) => (
        <span aria-hidden="true" className={styles.bone} style={{ width: w, height: h, ...extra }} />
    );
    return (
        <div className={`${admin.editorPage} ${styles.page}`} aria-busy="true" aria-live="polite">
            <div className={styles.topbar}>
                <div className={styles.topbarLeft}>{bone(70, 14)}{bone(90, 16)}</div>
                <div className={styles.topbarActions}>{bone(88, 32, { borderRadius: 8 })}{bone(96, 32, { borderRadius: 8 })}</div>
            </div>
            <div className={styles.container}>
                <div className={styles.panel}>
                    {bone(60, 11)}
                    {bone('100%', 48, { borderRadius: 8 })}
                    <div className={styles.row}>{bone('100%', 42, { borderRadius: 8 })}{bone('100%', 42, { borderRadius: 8 })}</div>
                    {bone('100%', 100, { borderRadius: 12 })}
                    {bone('100%', 360, { borderRadius: 10 })}
                </div>
            </div>
        </div>
    );
}
