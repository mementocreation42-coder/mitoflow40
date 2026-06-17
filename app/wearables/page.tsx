import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'ウェアラブル活用術（Apple Watch） | Mitoflow40',
    description: 'Apple Watchなどのウェアラブルで、自分の体をどう読むか。安静時心拍数・心拍変動（HRV）・睡眠・VO2 Max・活動量の見方と、40代の健康最適化への活かし方を精密栄養学の視点で解説します。',
    alternates: { canonical: 'https://mitoflow40.com/wearables' },
    openGraph: {
        title: 'ウェアラブル活用術（Apple Watch） | Mitoflow40',
        description: 'Apple Watchなどのウェアラブルで自分の体を読む。RHR・HRV・睡眠・VO2 Max・活動量の見方と活かし方を解説。',
        url: 'https://mitoflow40.com/wearables',
        type: 'article',
    },
};

// 注目すべき指標
const metrics = [
    { name: '安静時心拍数', en: 'RESTING HR', note: '朝・安静時の心拍。低いほど心臓に余裕がある状態。数日で上がったら、疲労・体調不良・がんばりすぎのサイン。', href: '/heart', hrefLabel: '心臓' },
    { name: '心拍変動（HRV）', en: 'HRV', note: '心拍の間隔の"ゆらぎ"。高いほど自律神経に余裕があり、回復できている証。ストレスや睡眠不足で下がる。', href: '/autonomic-nervous-system', hrefLabel: '自律神経とHRV' },
    { name: '睡眠', en: 'SLEEP', note: '深い睡眠・レム・覚醒の内訳。"何時間寝たか"より、深い睡眠が削れていないかという「質」を見る。', href: '/sleep', hrefLabel: '睡眠' },
    { name: '心肺機能（VO₂ Max）', en: 'CARDIO FITNESS', note: '体がどれだけ酸素を使えるか＝持久力の指標。ミトコンドリアの体力を映す。長期でじわっと上げたい。', href: '/mitochondria', hrefLabel: 'ミトコンドリア' },
    { name: '活動量', en: 'ACTIVITY', note: '歩数・運動・立ち時間など。座りすぎを防ぎ、ミトコンドリアを増やす運動の記録として使う。', href: '/exercise', hrefLabel: '運動' },
    { name: '血中酸素・呼吸数', en: 'SpO₂ / RESP', note: '補助的な指標。睡眠中の呼吸の乱れや、体調変化の早期サインに気づく手がかりになる。' },
];

// 読み方の原則
const principles = [
    { head: '絶対値より「自分のトレンド」', body: '正常範囲の幅は人それぞれ。他人や平均と比べるより、自分の平常値からの変化を見るのが基本です。' },
    { head: '1日の数値で一喜一憂しない', body: '日々の値はブレます。7日平均など「流れ」で判断すると、本当の変化が見えてきます。' },
    { head: '行動と数値を結びつける', body: '飲酒・夜更かし・ストレスの翌朝にHRVが下がる——など、行動と数値をひもづけると、自分の体の反応が学べます。' },
    { head: '数値は"気づき"の道具', body: 'ウェアラブルの数値は診断ではありません。体調を言葉にし、行動を振り返るための地図として使いましょう。' },
];

// 40代での活かし方
const practice = [
    { head: '朝のRHR・HRVをチェック', body: '起床直後の数値で「今日は攻める／休む」を判断。回復していない朝は無理をしない。' },
    { head: 'お酒・夜更かしの影響を見る', body: '翌朝のHRV低下・安静時心拍の上昇で、自分への影響を客観視できる。' },
    { head: '睡眠の質を点検する', body: '深い睡眠が減っていれば、就寝前の習慣を見直すサイン。', href: '/sleep' },
    { head: 'VO₂ Maxを長期で育てる', body: '少しきつい有酸素やインターバルで、持久力＝ミトコンドリアを底上げ。', href: '/exercise' },
    { head: 'セルフチェック・血液検査と重ねる', body: '主観（セルフチェック）×客観（ウェアラブル）×精密（血液検査）で、自分を立体的に読む。', href: '/biomarkers' },
];

export default function WearablesPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#DCE8EC' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'ウェアラブル活用術（Apple Watch）', description: 'Apple Watchなどのウェアラブルで自分の体を読む。RHR・HRV・睡眠・VO2 Max・活動量の見方と活かし方を解説。', path: '/wearables' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '生活習慣', path: '/library#lifestyle' }, { name: 'ウェアラブル活用術', path: '/wearables' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '生活習慣', href: '/library#lifestyle' }, { name: 'ウェアラブル活用術' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        QUANTIFY YOURSELF
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        WEARABLES
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>ウェアラブル活用術</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[580px] mx-auto">
                        Apple Watchなどのウェアラブルは、自分の体のデータを毎日とれる入口。数字を「眺める」から「活かす」へ。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜウェアラブルが効くのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        精密栄養学の出発点は「みんなの平均ではなく、あなたの最適を知る」こと。そのためには、自分の体の状態をデータで把握することが欠かせません。Apple Watchをはじめとするウェアラブルは、心拍・睡眠・活動量といった<strong>自分だけのデータを毎日、自動で記録</strong>してくれます。
                        {'\n\n'}
                        血液検査が「年に数回の精密なスナップショット」だとすれば、ウェアラブルは「毎日の連続的な動画」。両者を組み合わせることで、自分の体の変化を立体的に追えるようになります。
                        {'\n\n'}
                        大切なのは、数値を眺めて終わりにしないこと。<strong>どの数字を、どう読み、何を変えるか</strong>——ここまで踏み込んで初めて、ウェアラブルは健康最適化の武器になります。
                    </p>
                </section>

                {/* 注目すべき指標 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">注目すべき指標</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        たくさんの数値の中でも、40代の体調管理でとくに役立つのがこの6つです。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {metrics.map((m) => (
                            <div key={m.en} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/40 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m.en}</div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{m.name}</div>
                                <p className="text-xs text-[#4A4A4A] leading-snug mb-2">{m.note}</p>
                                {m.href && (
                                    <Link href={m.href} className="text-xs font-bold text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                        {m.hrefLabel} →
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 読み方の原則 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">数字の読み方の原則</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        数値に振り回されないために、押さえておきたい4つの考え方。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {principles.map((p) => (
                            <div key={p.head} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">{p.head}</div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{p.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 40代での活かし方 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">40代での活かし方</h2>
                    <div className="space-y-3 mt-5">
                        {practice.map((h, i) => (
                            <div key={h.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{i + 1}</span>
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">
                                        {h.href ? (
                                            <Link href={h.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{h.head}</Link>
                                        ) : h.head}
                                    </div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{h.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">あわせて読みたい</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                        ウェアラブルで見える指標の「中身」を、しくみのページで深掘りできます。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/cgm', label: '血糖モニタリング（CGM）' },
                            { href: '/autonomic-nervous-system', label: '自律神経とHRV' },
                            { href: '/sleep', label: '睡眠' },
                            { href: '/exercise', label: '運動' },
                            { href: '/circadian-rhythm', label: 'サーカディアンリズム' },
                            { href: '/mitochondria', label: 'ミトコンドリア' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
                </section>

                {/* セルフチェックCTA */}
                <div className="bg-white border border-black rounded-2xl p-6 md:p-8 text-center mb-12">
                    <p className="text-xs tracking-widest font-bold mb-3 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        SELF CHECK
                    </p>
                    <h2 className="text-lg md:text-xl font-bold mb-3 text-[#1A1A1A]">
                        数値の前に、主観の"現在地"も
                    </h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5 max-w-[480px] mx-auto">
                        12問・約2分のセルフチェックで、あなたのミトコンドリア活性度を可視化。ウェアラブルの客観データと重ねると、より立体的に読めます。無料・登録不要。
                    </p>
                    <Link href="/check" className="inline-block px-8 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", background: '#1A1A1A', color: '#FFFFFF' }}>
                        無料セルフチェックを試す →
                    </Link>
                </div>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ ウェアラブルの測定値は医療機器による検査とは異なり、診断を目的とするものではありません。体調不良や気になる症状があるときは、数値にかかわらず医療機関にご相談ください。
                </p>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/library#lifestyle" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        生活習慣 に戻る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
