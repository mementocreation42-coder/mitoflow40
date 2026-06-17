import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '音と健康 ｜ α波・振動・音楽療法と周波数ヒーリングの潮流 | Mitoflow40',
    description: '音は「空気の振動」として体に届き、自律神経や気分に作用します。脳波（α波）と音の関係、音楽療法など実証されていること、骨や体に響く振動、そして528Hzやタイムウェーバーなど「周波数ヒーリング」の潮流を、科学的根拠の確かさを分けて中立に整理します。',
    alternates: { canonical: 'https://mitoflow40.com/sound' },
    openGraph: {
        title: '音と健康 | Mitoflow40',
        description: 'α波・振動・音楽療法の実証と、周波数ヒーリングの潮流を、根拠の確かさで分けて中立に整理。',
        url: 'https://mitoflow40.com/sound',
        type: 'article',
    },
};

const waves = [
    { name: 'β波（ベータ）', hz: '約14〜30Hz', note: '起きて活動・集中しているときの脳波。考えごとや緊張時に優位。' },
    { name: 'α波（アルファ）', hz: '約8〜13Hz', note: 'リラックスしつつ覚醒している状態。目を閉じて落ち着くと増えやすい。' },
    { name: 'θ波（シータ）', hz: '約4〜7Hz', note: 'まどろみ・深い瞑想・ひらめきの状態で現れる。' },
    { name: 'δ波（デルタ）', hz: '約0.5〜3Hz', note: '深い眠りのときの脳波。体の修復が進む時間帯。' },
];

export default function SoundPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E6E0F2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '音と健康', description: 'α波・振動・音楽療法の実証と、周波数ヒーリングの潮流を、根拠の確かさで分けて中立に整理。', path: '/sound' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '心とからだ', path: '/library#mind' }, { name: '音と健康', path: '/sound' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '心とからだ', href: '/library#mind' }, { name: '音と健康' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>SOUND</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        SOUND
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>音と健康</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        心地よい音にホッとし、騒音にイライラする——音は確かに体に作用します。ただし「<strong>よく分かっていること</strong>」と「<strong>まだ確かめられていないこと</strong>」を分けて見ることが大切です。
                    </p>
                </header>

                {/* 音とは振動 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">音は、体に届く「振動」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        音の正体は<strong>空気の振動（波）</strong>です。耳の奥でその振動が電気信号に変わり、脳へ届きます。つまり音は、目に見えなくても物理的に体に作用する刺激です。
                        {'\n\n'}
                        心地よい音楽や自然音は<strong>副交感神経（休む側）</strong>を優位にし、心拍や呼吸を落ち着かせます。逆に騒音は<strong>交感神経（戦う側）</strong>を高ぶらせ、ストレスホルモンや血圧を上げることが知られています。音が「気分の問題」だけでなく、自律神経を通じて体に届いている——ここが出発点です。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/autonomic-nervous-system', label: '自律神経' }, { href: '/stress', label: 'ストレス' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 脳波とα波 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">脳波と「α波」</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">脳の活動は、状態によって異なる「波（脳波）」として現れます。よく聞く<strong>α波</strong>は、リラックスして落ち着いた状態の指標です。</p>
                    <div className="bg-white/70 rounded-2xl border border-black overflow-hidden mb-4">
                        {waves.map((w, i) => (
                            <div key={w.name} className={`px-5 py-4 ${i !== 0 ? 'border-t border-[#1A1A1A]/10' : ''}`}>
                                <div className="flex items-baseline justify-between mb-0.5">
                                    <span className="font-bold text-[#1A1A1A]">{w.name}</span>
                                    <span className="text-xs font-bold text-[#1A1A1A]/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{w.hz}</span>
                                </div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{w.note}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-loose">
                        静かな音楽や自然音でリラックスすると、結果として<strong>α波が増えやすい</strong>のは確かです。ただし「α波が出る音楽を聴けば健康になる」と単純化するのは行き過ぎ。α波は<strong>くつろいだ状態の“結果”として現れる指標</strong>であり、それ自体が治療になるわけではない、という距離感が大切です。
                    </p>
                </section>

                {/* 実証されていること */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <div className="inline-block text-[10px] font-bold tracking-widest text-white bg-[#41C9B4] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>EVIDENCE ／ 比較的確かなこと</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">音楽療法など、研究の積み重ねがある領域</h2>
                    <div className="space-y-3">
                        {[
                            { head: '音楽療法', body: '不安・痛み・抑うつの緩和、認知症ケア、リハビリなどで、医療現場でも活用される。心拍・血圧・ストレスホルモンの変化として測れることも多い。' },
                            { head: 'リラックスと睡眠導入', body: '静かな音楽・自然音・ホワイトノイズは、入眠を助けたり集中を支えたりするのに役立つことがある。' },
                            { head: '騒音のリスク', body: '逆に慢性的な騒音は、ストレス・睡眠障害・血圧上昇との関連が指摘されている。「いい音」より先に「悪い音を減らす」ことも大切。' },
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

                {/* 振動 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">「振動」として感じる音</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        音は耳だけでなく、低い音ほど<strong>体に響く振動</strong>としても感じられます。これを使うのが、椅子やベッドに振動を伝える<strong>バイブロアコースティック（体感音響）</strong>などのアプローチで、リラックスや痛みの緩和をねらって一部の現場で試みられています。
                        {'\n\n'}
                        心地よい振動が緊張をほぐす体験そのものは多くの人が実感するところですが、医療的な効果としては<strong>研究が発展途上</strong>で、対象や条件によって結果はまちまちです。「気持ちよさ」と「治療効果」は分けて受け取るのが安全です。
                    </p>
                </section>

                {/* 周波数ヒーリング・タイムウェーバー（中立） */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#F3EFD6' }}>
                    <div className="inline-block text-[10px] font-bold tracking-widest text-[#1A1A1A] bg-[#FFD37A] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NEUTRAL ／ 根拠は未確立</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">「周波数ヒーリング」の潮流</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        近年、<strong>「特定の周波数が体を癒す」</strong>という考え方が広がっています。「<strong>528Hz（ソルフェジオ周波数）</strong>でDNAが修復する」「<strong>タイムウェーバー</strong>などの機器が、体の“情報場”を読み取り整える」といった主張がその代表です。
                        {'\n\n'}
                        ここで正直にお伝えしておきたいのは、これらの<strong>多くは、現在の科学では効果が確認されていない</strong>ということです。たとえば「特定のHzでDNAが治る」という主張に、確かな科学的裏づけはありません。タイムウェーバーのような「情報場」を扱う機器も、<strong>医療機器として有効性が証明されたものではなく</strong>、各国で景品表示・医療広告の観点から問題視されることもあります。
                        {'\n\n'}
                        一方で、「好きな音や周波数を聴くとリラックスできた」という<strong>主観的な心地よさ</strong>まで否定する必要はありません。大切なのは、<strong>「リラックスの手段」と「医療的な治療」を混同しないこと</strong>。そして、これらを理由に<strong>必要な医療を遠ざけないこと</strong>です。高額な機器やサービスには、とくに慎重な視点を持っておくと安心です。
                    </p>
                    {/* タイムウェーバーの歴史 */}
                    <div className="rounded-xl p-5 border border-[#1A1A1A]/15 bg-white/60 mt-5">
                        <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/45 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HISTORY ／ どこから来たのか</div>
                        <div className="font-bold text-[#1A1A1A] mb-2">タイムウェーバーの歴史と背景</div>
                        <p className="text-sm text-[#4A4A4A] leading-loose whitespace-pre-line">
                            タイムウェーバー（TimeWaver）は、<strong>ドイツ</strong>で生まれた機器です。物理学を学んだドイツ人の<strong>マルクス・シュミーケ（Marcus Schmieke）</strong>が、2000年代に開発・事業化したとされ、運営も<strong>ドイツの企業（TimeWaver社）</strong>が担っています。「体や環境の<strong>“情報場（Information Field）”</strong>を読み取り、整える」という独自のコンセプトを掲げ、量子物理学を思わせる言葉で説明されるのが特徴です。
                            {'\n\n'}
                            ただし発想そのものは新しいものではなく、<strong>ラジオニクス（radionics）</strong>という古い流れに連なります。ラジオニクスは20世紀初頭のアメリカで医師<strong>アルバート・エイブラムス</strong>らが唱えた「体の“波動”を測定・治療する」という考え方で、当時から科学界では否定されてきました。ドイツ語圏で広がった<strong>バイオレゾナンス（生体共鳴）</strong>も、近い系譜にあります。
                            {'\n\n'}
                            つまりタイムウェーバーは、<strong>「最先端の量子機器」というより、20世紀から続く“波動医療”の系譜に、現代的な装い（PC・ソフトウェア・量子の言葉）を与えたもの</strong>と捉えるのが、歴史的には正確です。ドイツ発という出自が信頼性を保証するわけではない、という点も押さえておきたいところです。
                        </p>
                    </div>

                    <div className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-white/60 mt-4">
                        <p className="text-sm text-[#1A1A1A]/85 leading-relaxed"><strong>Mitoflow40の立場：</strong>否定も盲信もせず、「気持ちよさは尊重しつつ、治療効果は今のところ確認されていない」と中立に整理します。判断の主役は、いつもあなた自身です。</p>
                    </div>
                </section>

                {/* 暮らしへ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">暮らしへの、やさしい取り入れ方</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">難しい理屈より、「自分が心地よいか」を物差しに。小さな工夫で十分です。</p>
                    <div className="space-y-3">
                        {[
                            { head: '好きな音楽で気分を切り替える', body: '朝は明るい曲、夜は静かな曲——音で自律神経のモードを切り替える。「効く周波数」より「好きな音」を。' },
                            { head: '自然音・環境音を味方に', body: '川・雨・波の音などは、多くの人が落ち着きやすい。作業や入眠時のBGMに。' },
                            { head: '夜は「静けさ」もつくる', body: 'いい音を足すだけでなく、夜は刺激的な音や通知音を減らす。静けさも、立派な音の使い方。' },
                            { head: '騒音から自分を守る', body: '騒がしい環境が続くならイヤーマフやノイズキャンセリングも選択肢。「悪い音を減らす」効果は確か。' },
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
                            { href: '/smell', label: '匂いと健康' },
                            { href: '/autonomic-nervous-system', label: '自律神経' },
                            { href: '/stress', label: 'ストレス' },
                            { href: '/mindfulness', label: 'マインドフルネス・呼吸' },
                            { href: '/sleep', label: '睡眠' },
                            { href: '/spirituality', label: 'スピリチュアリティと体' },
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
