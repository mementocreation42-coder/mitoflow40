import styles from './admin.module.css';

// 管理画面の各ページは Blob / WordPress / Stripe への問い合わせを待ってから描画される（force-dynamic）。
// この loading が無いと、待っている間ブラウザは前のページのまま止まって見える（「もさっと」の正体）。
// ヘッダーと同じ高さの枠と本文の骨組みを先に出し、データが揃いしだい差し替える。
// Link の先読みも、この境界までで止まる（各ページのデータ取得を先読みで走らせない）。
export default function AdminLoading() {
    return (
        <div className={styles.shell} aria-busy="true" aria-live="polite">
            <style>{`@keyframes adminPulse { 0%, 100% { opacity: 1 } 50% { opacity: .45 } }`}</style>
            <div className={styles.headerWrap}>
                <header className={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                        <Bone w={34} h={34} r={10} dark />
                        <Bone w={120} h={16} dark />
                        <Bone w={80} h={16} dark />
                    </div>
                    <Bone w={150} h={16} dark />
                </header>
                <nav className={styles.subbar}>
                    <Bone w={90} h={12} dark />
                    <Bone w={70} h={12} dark style={{ marginLeft: 14 }} />
                    <Bone w={90} h={12} dark style={{ marginLeft: 14 }} />
                </nav>
            </div>
            <main className={styles.main} style={{ maxWidth: 820 }}>
                <Bone w={72} h={11} />
                <Bone w={280} h={34} style={{ marginTop: 10 }} />
                <Bone w="min(420px, 100%)" h={13} style={{ marginTop: 12 }} />
                {[0, 1, 2, 3].map((i) => (
                    <Bone key={i} w="100%" h={104} r={14} style={{ marginTop: i === 0 ? 32 : 12 }} />
                ))}
            </main>
        </div>
    );
}

function Bone({ w, h, r = 6, dark, style }: { w: number | string; h: number; r?: number; dark?: boolean; style?: React.CSSProperties }) {
    return (
        <span
            aria-hidden="true"
            style={{
                display: 'block', width: w, height: h, borderRadius: r,
                background: dark ? 'rgba(26,26,26,.10)' : 'rgba(255,255,255,.55)',
                animation: 'adminPulse 1.3s ease-in-out infinite',
                ...style,
            }}
        />
    );
}
