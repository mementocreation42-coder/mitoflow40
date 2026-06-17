import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '食べない時間の力 ｜ 断食・空腹がもたらすもの、向く人・向かない人 | Mitoflow40',
    description: '「何を食べるか」だけでなく「食べない時間をつくる」という選択。空腹がオートファジーや脂肪燃焼（ケトン）のスイッチになる仕組み、間欠的ファスティング（16:8など）の種類、期待できることと誇張、そして断食が向かない人・危険なケースを、安全第一で中立に整理します。',
    alternates: { canonical: 'https://mitoflow40.com/fasting' },
    openGraph: {
        title: '食べない時間の力 | Mitoflow40',
        description: '断食・空腹の効果と仕組み、向く人・向かない人を、安全第一で中立に整理。',
        url: 'https://mitoflow40.com/fasting',
        type: 'article',
    },
};

const types = [
    { name: '時間制限食（16:8など）', note: '1日のうち食べる時間を8〜12時間に収め、残りは水やお茶で過ごす。最も始めやすく、まずはここから。' },
    { name: '夜だけ長くあける（12〜14時間）', note: '夕食を早め、朝食を少し遅らせるだけ。睡眠時間を含めれば無理なく達成しやすい入口。' },
    { name: '週1〜2回の軽い節制（5:2など）', note: '週のうち1〜2日だけ食事量を大きく減らす方法。生活に合わせて選ぶ人もいる。' },
    { name: '長時間・本格的な断食', note: '24時間以上の断食は効果も負担も大きい。自己流は危険で、専門家の管理下が前提。' },
];

const benefits = [
    { head: '消化器を休ませる', body: '食べ続けている内臓に「休憩時間」を与える。胃腸の調子が整う人も。' },
    { head: '脂肪を使うモードへ', body: '糖が尽きると、体は脂肪を分解しケトン体を作り始める。代謝の柔軟性が高まる。' },
    { head: '細胞の掃除（オートファジー）', body: '空腹は、傷んだ部品をリサイクルする細胞の掃除スイッチのひとつとされる。' },
    { head: '血糖・体重の管理', body: '食べる時間が締まることで、結果的に総摂取量や血糖の波が整いやすい。' },
];

export default function FastingPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E6E0F2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '食べない時間の力', description: '断食・空腹の効果と仕組み、向く人・向かない人を、安全第一で中立に整理。', path: '/fasting' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '食べ物', path: '/library#food' }, { name: '食べない時間の力', path: '/fasting' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '食べ物', href: '/library#food' }, { name: '食べない時間の力' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>FASTING</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        FASTING
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>食べない時間の力</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        健康は「何を食べるか」だけではありません。<strong>あえて食べない時間をつくる</strong>——その空腹が、体のスイッチを切り替えます。ただし、<strong>合う人と合わない人</strong>がはっきり分かれるテーマです。
                    </p>
                </header>

                {/* なぜ空腹が効くのか */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">「ずっと食べている」が、現代の異常</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        人類の歴史の大半は、「食べられないとき」が当たり前でした。体は<strong>空腹の時間を前提に</strong>設計されています。ところが現代は、朝・昼・夜・間食と、ほぼ一日中、消化器が働きっぱなし。
                        {'\n\n'}
                        食べ物が入ってこない時間ができると、体は「<strong>蓄えを使うモード</strong>」に切り替わります。糖が尽きれば脂肪を燃やして<strong>ケトン体</strong>を作り、細胞は傷んだ部品を片づける<strong>オートファジー</strong>を進めます。これらは「食べない時間」があって初めて、しっかり働くスイッチです。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/autophagy', label: 'オートファジー' }, { href: '/ketones', label: 'ケトン体' }, { href: '/blood-sugar', label: '血糖' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 期待できること */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">空腹がもたらしうるもの</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">研究で示唆される効果ですが、効き方には個人差があり、「万能薬」ではありません。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {benefits.map((b) => (
                            <div key={b.head} className="bg-white/70 rounded-2xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">{b.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{b.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* やり方の種類 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">「食べない時間」のつくり方</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">いきなり厳しくする必要はありません。多くの人にとって現実的なのは、軽いものから。</p>
                    <div className="space-y-3">
                        {types.map((t) => (
                            <div key={t.name} className="flex items-start gap-4 bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{t.name}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{t.note}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">※ 断食中も<strong>水分はしっかり</strong>。回復食（あけ方）も大切で、いきなり大量・高脂質を食べると胃腸に負担がかかります。</p>
                </section>

                {/* 注意・向かない人（重要） */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#F7E2DC' }}>
                    <div className="inline-block text-[10px] font-bold tracking-widest text-white bg-[#E8896B] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SAFETY ／ 大切な注意</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">断食が「向かない人」もいます</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-4">
                        空腹は強力なスイッチだからこそ、合わない人には害になります。次に当てはまる方は、自己流の断食を<strong>避けるか、必ず主治医に相談</strong>してください。
                    </p>
                    <ul className="space-y-2">
                        {[
                            '妊娠中・授乳中の方、成長期の子ども',
                            '摂食障害の経験がある方、低体重の方',
                            '糖尿病などで血糖の薬やインスリンを使っている方（低血糖の危険）',
                            '持病があり服薬中の方（薬の効きが変わることがある）',
                            '高齢でフレイル・筋力低下が気になる方',
                        ].map((t) => (
                            <li key={t} className="flex gap-3 text-sm text-[#1A1A1A]/85 leading-relaxed">
                                <span className="text-[#E8896B] flex-shrink-0 font-bold">⚠</span><span>{t}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-[#4A4A4A] leading-loose mt-4">
                        また、断食は<strong>「掃除（オートファジー）」と「合成（体をつくる）」のメリハリ</strong>で効きます。食べない一辺倒では、とくに40代以降は<strong>筋肉が落ちやすい</strong>。食べる時間には<strong>タンパク質をしっかり</strong>確保することが、空腹を活かす条件です。ふらつき・強い空腹・気分の悪化が出たら、無理せず中止を。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/nutrients/protein', label: 'タンパク質' }, { href: '/exercise', label: '運動（筋肉）' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* はじめ方 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">無理のない、はじめ方</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">「つらいのを我慢する」ものではありません。心地よい範囲で、生活に溶け込ませるのがコツです。</p>
                    <div className="space-y-3">
                        {[
                            { head: 'まずは「夜長くあける」から', body: '夕食を早めに済ませ、寝るまで食べない。睡眠を含めれば12時間は意外と簡単。' },
                            { head: '水・お茶はしっかりとる', body: '空腹と脱水を混同しない。無糖の水分でこまめに潤す。' },
                            { head: '食べる時間に“ちゃんと”食べる', body: '回数が減るぶん、タンパク質・野菜・良い脂をしっかり。質を落とさない。' },
                            { head: '体調を最優先に', body: 'ふらつき・頭痛・気分の悪化が出たら中止。合わないなら、やらない勇気も大切。' },
                        ].map((s) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/autophagy', label: 'オートファジー' },
                            { href: '/ketones', label: 'ケトン体' },
                            { href: '/blood-sugar', label: '血糖コントロール' },
                            { href: '/rice', label: '白米・玄米の真実' },
                            { href: '/wheat', label: '小麦と健康' },
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
