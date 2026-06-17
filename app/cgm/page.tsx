import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '血糖モニタリング（CGM）｜ フリースタイルリブレで血糖を可視化する | Mitoflow40',
    description: '持続血糖モニタリング（CGM）は、腕に貼ったセンサーで血糖の動きを24時間追える技術。フリースタイルリブレなどで「自分にとって何が血糖を上げるか」を可視化できます。仕組み、何が分かるか、活かし方、そして数字に振り回されないための注意点を中立に整理します。',
    alternates: { canonical: 'https://mitoflow40.com/cgm' },
    openGraph: {
        title: '血糖モニタリング（CGM）| Mitoflow40',
        description: 'フリースタイルリブレなどのCGMで自分の血糖を可視化する。仕組み・活かし方・注意点を中立に。',
        url: 'https://mitoflow40.com/cgm',
        type: 'article',
    },
};

const findings = [
    { head: '同じ食事でも、人で違う', note: '何が血糖を上げるかには大きな個人差がある。「健康に良いとされる食品」でも自分は跳ねる、ということが見える。' },
    { head: '食べ順・組み合わせの効果', note: '野菜やタンパク質を先に、最後に炭水化物。食べる順番でスパイクが変わるのを実感できる。' },
    { head: '運動の即効性', note: '食後の散歩や軽い運動で、血糖の山がなだらかになる様子がその場で分かる。' },
    { head: '睡眠・ストレスの影響', note: '寝不足やストレスの翌日は、同じ食事でも血糖が上がりやすい——という関連に気づける。' },
];

export default function CgmPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#DEEDF7' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '血糖モニタリング（CGM）', description: 'フリースタイルリブレなどのCGMで自分の血糖を可視化する。仕組み・活かし方・注意点を中立に。', path: '/cgm' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '生活習慣', path: '/library#lifestyle' }, { name: '血糖モニタリング', path: '/cgm' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '生活習慣', href: '/library#lifestyle' }, { name: '血糖モニタリング' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>CGM</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        CGM
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>血糖モニタリング</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        「自分にとって、何が血糖を上げるのか」——これまで見えなかったその答えを、<strong>腕のセンサーで24時間追える</strong>のがCGMです。精密栄養学を、自分の体で“実験”できる道具。
                    </p>
                </header>

                {/* CGMとは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">CGM（持続血糖モニタリング）とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        CGM（Continuous Glucose Monitoring）は、<strong>二の腕などに貼った小さなセンサー</strong>で、皮下の間質液中のグルコース濃度を<strong>数分おきに自動で測り続ける</strong>技術です。代表的なのが<strong>フリースタイルリブレ（FreeStyle Libre）</strong>などの製品で、スマホやリーダーをかざすだけで今の血糖の傾向が読めます。
                        {'\n\n'}
                        これまで血糖は、採血した「点」でしか分かりませんでした。CGMは、それを<strong>1日中の「線（グラフ）」</strong>に変えます。食事・運動・睡眠で血糖がどう動くかが、自分の目で見えるようになるのが最大の価値です。
                    </p>
                    <p className="text-xs text-[#4A4A4A]/60 mt-3 leading-relaxed">※ 指先穿刺の自己血糖測定や採血の値とは、測る場所（間質液）や時間差の関係で、ぴったり一致しないことがあります。CGMは「絶対値」より「動きの傾向」を見る道具と捉えるのが基本です。</p>
                </section>

                {/* 何が分かるか */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">CGMで「見える」ようになること</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">知識として知っていたことを、自分の体で“体験”できる。これがCGMの面白さです。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {findings.map((f) => (
                            <div key={f.head} className="bg-white/70 rounded-2xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">{f.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{f.note}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/blood-sugar', label: '血糖コントロールの基本' }, { href: '/glycation', label: '糖化' }, { href: '/wearables', label: 'ウェアラブル活用術' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 活かし方 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">「自分実験」としての使い方</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-5">
                        CGMがいちばん活きるのは、<strong>同じ条件を変えて比べる</strong>とき。漠然と眺めるより、「仮説を立てて試す」と発見が増えます。
                    </p>
                    <div className="space-y-3">
                        {[
                            { head: '同じ食品で食べ順を変える', body: '「白米だけ」と「野菜→おかず→白米」で、スパイクがどう変わるかを比べる。' },
                            { head: '食後に動く／動かないを比べる', body: '食後にじっとした日と、10〜15分歩いた日で、山の高さを見比べる。' },
                            { head: '“跳ねやすい自分の食品”を見つける', body: '人によって跳ねる食品は違う。自分の「要注意リスト」を作る感覚で。' },
                            { head: '生活の影響も観察する', body: '寝不足・飲酒・ストレスの翌日の血糖を見て、食事以外の要因にも気づく。' },
                        ].map((s) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 注意（中立） */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#F3EFD6' }}>
                    <div className="inline-block text-[10px] font-bold tracking-widest text-[#1A1A1A] bg-[#FFD37A] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NEUTRAL ／ 振り回されないために</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">数字に、心まで縛られないこと</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        CGMは強力な道具ですが、注意も必要です。まず、<strong>健康な人の血糖は、食事のたびにある程度上下するのが正常</strong>。少し上がっただけで「スパイクだ」と過剰に恐れると、食事が楽しめなくなり、かえってストレスになります。
                        {'\n\n'}
                        また、健康な人がCGMを使うことで本当に長期的な健康が改善するかは、<strong>まだ研究が十分とは言えません</strong>。数値はあくまで「気づきのきっかけ」。一度の値に一喜一憂せず、<strong>傾向と、自分の体感を合わせて</strong>見るのが賢い使い方です。
                        {'\n\n'}
                        そして大切な前提——<strong>CGMは診断の道具ではありません</strong>。糖尿病が心配な方、すでに治療中の方は、自己判断せず<strong>必ず主治医に相談</strong>を。治療目的の使用は医療の枠組みの中で行われます。
                    </p>
                    <div className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-white/60 mt-4">
                        <p className="text-sm text-[#1A1A1A]/85 leading-relaxed"><strong>Mitoflow40の立場：</strong>CGMは「自分を知るための学びの道具」。数字に支配されるのではなく、自分の体の傾向をつかみ、暮らしの工夫につなげるために使います。</p>
                    </div>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/blood-sugar', label: '血糖コントロール' },
                            { href: '/wearables', label: 'ウェアラブル活用術' },
                            { href: '/glycation', label: '糖化' },
                            { href: '/rice', label: '白米・玄米の真実' },
                            { href: '/precision-nutrition', label: '精密栄養学とは' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">{l.label} →</Link>
                        ))}
                    </div>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
