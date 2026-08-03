import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '電気療法とミトコンドリア ｜ 整体・接骨院の「電気」を事実ベースで読む | Mitoflow40',
    description: '整体院や接骨院で受ける「電気」は、低周波（TENS）・EMS・干渉波・高周波温熱・微弱電流（マイクロカレント）と、まったく別ものの集合です。「電気でミトコンドリアが活性化」「ATPが5倍」という説明はどこまで事実なのか——出典と限界、日本の資格・医療機器制度、禁忌までを中立に整理します。',
    alternates: { canonical: 'https://mitoflow40.com/electrotherapy' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: '電気療法とミトコンドリア ｜ Mitoflow40',
        description: '整体・接骨院の「電気」は本当に細胞を元気にするのか。種類ごとの根拠と限界を事実ベースで。',
        url: 'https://mitoflow40.com/electrotherapy',
        type: 'article',
    },
};

export default function ElectrotherapyPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E7E0F2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '電気療法とミトコンドリア', description: '整体・接骨院の「電気」は本当に細胞を元気にするのか。種類ごとの根拠と限界を事実ベースで。', path: '/electrotherapy' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '心とからだ', path: '/library#mind' }, { name: '電気療法とミトコンドリア', path: '/electrotherapy' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '心とからだ', href: '/library#mind' }, { name: '電気療法とミトコンドリア' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MIND &amp; BODY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        ELECTROTHERAPY
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>電気療法とミトコンドリア</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        整体院や接骨院で背中に貼られる、あの電気のパッド。「細胞が活性化します」「ATPが増えます」——その説明は、<strong>どこまでが確かめられた事実で、どこからが飛躍なのか</strong>。否定でも礼賛でもなく、出典に当たって整理します。
                    </p>
                </header>

                {/* まず整理 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">まず——「電気」はひとつの治療ではない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        話がややこしくなる最大の理由は、施術現場で「電気」と呼ばれるものが<strong>まったく仕組みの違う複数の技術の総称</strong>だからです。電流の強さは<strong>マイクロアンペア（µA）からミリアンペア（mA）まで1000倍以上の幅</strong>があり、狙う組織も、根拠の厚みも、それぞれ別ものです。
                        {'\n\n'}
                        だから「電気は効くのか？」という問いは、そもそも答えられません。<strong>どの電気か</strong>を分けるところから始めます。
                    </p>

                    <div className="mt-6 space-y-3">
                        {[
                            { head: '低周波（TENS）', sub: '経皮的電気神経刺激', body: 'ピリピリする刺激で感覚神経を刺激し、痛みの伝わり方を変える。狙いは「痛みの緩和」であって、細胞の代謝ではない。', chip: '痛み', chipBg: '#FBE9D0' },
                            { head: 'EMS／NMES', sub: '（神経）筋電気刺激', body: 'より強い電流で運動神経を刺激し、筋肉を実際に収縮させる。「自分では動かせない人の筋肉を動かす」ための技術。', chip: '筋収縮', chipBg: '#D7F0E8' },
                            { head: '干渉波（IFC）', sub: '中周波の干渉', body: '2つの中周波をぶつけ、深部で干渉させる。皮膚の痛みを抑えつつ深いところに届かせる狙い。位置づけはTENSに近い。', chip: '痛み', chipBg: '#FBE9D0' },
                            { head: '高周波・ラジオ波', sub: '温熱', body: '電気そのものより、組織が発する「熱」が主役。血流を増やす温熱療法として理解するのが正確。', chip: '温熱', chipBg: '#F7E2DC' },
                            { head: '微弱電流', sub: 'マイクロカレント（MENS）', body: '体が感じないほど微弱な電流（µAレベル）。「細胞レベルに働く」と語られることが多く、ATP話の中心にいるのがこれ。', chip: '細胞代謝を主張', chipBg: '#EFEAF6' },
                            { head: '近赤外・レーザー', sub: '光（PBM）※電気ではない', body: '同じ機械に載っていることも多いが、これは電流ではなく「光」。ミトコンドリアとの関係がいちばん明確なのは、実はこちら。', chip: '光', chipBg: '#CFE8F0' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                                    <span className="font-bold text-[#1A1A1A]">{s.head}</span>
                                    <span className="text-xs text-[#4A4A4A]/70">{s.sub}</span>
                                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#1A1A1A]/20 text-[#1A1A1A]" style={{ background: s.chipBg }}>{s.chip}</span>
                                </div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 本命の経路 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">ミトコンドリアに届く道は、「電気」ではなく「収縮」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ここが、この話でいちばん大事なところです。電気刺激とミトコンドリアの関係で<strong>ヒトで最もしっかり確かめられている経路</strong>は、電流が細胞に直接効くルートではありません。<strong>電気で筋肉を収縮させ、その収縮が運動と同じシグナルを起こす</strong>ルートです。
                    </p>

                    {/* 経路図 */}
                    <figure className="mt-6">
                        <svg viewBox="0 0 720 190" className="w-full h-auto" role="img" aria-label="電気刺激からミトコンドリア新生までの経路図。電気刺激が運動神経を刺激し、筋収縮が起き、エネルギー需要が高まってAMPK・PGC-1αが動き、ミトコンドリアが増える。">
                            {[
                                { x: 20, label1: '電気刺激', label2: 'EMS / NMES', fill: '#CFE8F0' },
                                { x: 160, label1: '運動神経', label2: 'を刺激', fill: '#D7F0E8' },
                                { x: 300, label1: '筋収縮', label2: 'が起きる', fill: '#41C9B4' },
                                { x: 440, label1: 'エネルギー需要', label2: 'AMPK・PGC-1α', fill: '#FBE9D0' },
                                { x: 580, label1: 'ミトコンドリア', label2: 'が増える・働く', fill: '#FF9855' },
                            ].map((b, i) => (
                                <g key={b.label1}>
                                    <rect x={b.x} y="55" width="120" height="72" rx="10" fill={b.fill} stroke="#1A1A1A" strokeWidth="1.5" />
                                    <text x={b.x + 60} y="88" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1A1A1A" fontFamily="'Noto Sans JP', sans-serif">{b.label1}</text>
                                    <text x={b.x + 60} y="109" textAnchor="middle" fontSize="12" fill="#1A1A1A" fillOpacity="0.65" fontFamily="'Noto Sans JP', sans-serif">{b.label2}</text>
                                    {i < 4 && (
                                        <path d={`M ${b.x + 126} 91 L ${b.x + 152} 91`} stroke="#1A1A1A" strokeWidth="2" markerEnd="url(#ar)" />
                                    )}
                                </g>
                            ))}
                            <defs>
                                <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                                    <path d="M0,0 L8,4 L0,8 z" fill="#1A1A1A" />
                                </marker>
                            </defs>
                            <text x="360" y="30" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1A1A1A" fillOpacity="0.6" fontFamily="'Noto Sans JP', sans-serif">効いているのは電流そのものではなく、電流が「起こした運動」</text>
                            <text x="360" y="165" textAnchor="middle" fontSize="12" fill="#1A1A1A" fillOpacity="0.5" fontFamily="'Noto Sans JP', sans-serif">※ 筋肉が収縮しないレベルの電気では、この経路は動かない</text>
                        </svg>
                    </figure>

                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        実際、<strong>脊髄損傷で自力の運動が難しい人</strong>を対象にした24週間のランダム化比較試験では、電気刺激による筋トレ・自転車運動を行った群で、<strong>筋肉のミトコンドリア密度や電子伝達系・複合体IIの活性が上昇</strong>したと報告されています<sup className="text-[#FF9855] font-bold">[1]</sup>。NMESが「運動のエミュレーター（代役）」としてPGC-1α——ミトコンドリア新生の司令塔——を動かしうる、という整理も総説にあります<sup className="text-[#FF9855] font-bold">[2]</sup>。
                        {'\n\n'}
                        つまり<strong>「電気でミトコンドリアが増える」は、条件付きで事実です</strong>。ただしその条件が重要で——
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { head: '条件① 筋肉が実際に収縮するレベルの刺激であること', body: '心地よくピリピリするだけのTENS強度では、この経路は動かない。研究で使われているのは、目に見えて筋が動く強度の刺激。' },
                            { head: '条件② 主な対象は「自分で動けない人」', body: '強いエビデンスがあるのは脊髄損傷・集中治療中・長期臥床など、自発的な運動ができない集団。健康な人の代替になるという話ではない。' },
                            { head: '条件③ 週単位・月単位の継続が前提', body: '上の試験は24週間。1回の施術で細胞が生まれ変わるという性質のものではない。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        逆に言えば、<strong>自分で歩ける人にとって、この経路の「本家」は運動そのもの</strong>です。電気刺激は、運動ができない事情がある人にとっての貴重な代役であって、動ける人が運動を省略するための近道ではありません。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/mitochondria', label: 'ミトコンドリア' }, { href: '/exercise', label: '運動' }, { href: '/energy', label: 'エネルギー代謝' }, { href: '/electron-transport-chain', label: '電子伝達系' }, { href: '/sarcopenia', label: 'サルコペニア' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* ATP5倍の出どころ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「ATPが5倍になる」——その数字の出どころを辿る</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        微弱電流（マイクロカレント）の説明でほぼ必ず登場するのが、<strong>「ATPが3〜5倍に増える」</strong>という数字です。これは根拠のない作り話ではありません。出典があります。<strong>1982年のChengらの実験</strong>です<sup className="text-[#FF9855] font-bold">[3]</sup>。
                    </p>

                    {/* 用量反応の図 */}
                    <figure className="mt-6">
                        <svg viewBox="0 0 720 300" className="w-full h-auto" role="img" aria-label="Cheng 1982の用量反応。ATP産生は500マイクロアンペア付近で最大となり、1000マイクロアンペアを超えると低下する。">
                            <line x1="70" y1="235" x2="690" y2="235" stroke="#1A1A1A" strokeWidth="1.5" />
                            <line x1="70" y1="40" x2="70" y2="235" stroke="#1A1A1A" strokeWidth="1.5" />
                            {/* curve */}
                            <path d="M 90 215 C 200 205, 250 90, 330 70 C 420 48, 480 130, 560 190 C 610 220, 650 228, 680 231"
                                fill="none" stroke="#41C9B4" strokeWidth="4" strokeLinecap="round" />
                            {/* peak marker */}
                            <line x1="350" y1="66" x2="350" y2="235" stroke="#FF9855" strokeWidth="2" strokeDasharray="5 5" />
                            <circle cx="350" cy="66" r="7" fill="#FF9855" stroke="#1A1A1A" strokeWidth="1.5" />
                            <text x="350" y="48" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1A1A1A" fontFamily="'Noto Sans JP', sans-serif">ピーク：約500µA</text>
                            {/* x labels */}
                            {[{ x: 110, t: '10µA' }, { x: 350, t: '500µA' }, { x: 520, t: '1,000µA' }, { x: 660, t: 'それ以上' }].map((l) => (
                                <text key={l.t} x={l.x} y="258" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1A1A1A" fillOpacity="0.7" fontFamily="'Space Grotesk', sans-serif">{l.t}</text>
                            ))}
                            <text x="70" y="28" fontSize="13" fill="#1A1A1A" fillOpacity="0.55" fontFamily="'Noto Sans JP', sans-serif">ATP産生（模式図）</text>
                            <text x="560" y="285" textAnchor="middle" fontSize="12" fill="#1A1A1A" fillOpacity="0.55" fontFamily="'Noto Sans JP', sans-serif">強くするほど良い、ではない</text>
                        </svg>
                        <figcaption className="text-xs text-[#4A4A4A]/60 mt-1 text-center">Cheng et al. 1982 について広く流通している要約（約500µAでピーク）を模式化したもの。原著の測定点を再現した図ではありません。</figcaption>
                    </figure>

                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        論文が報告しているのは、<strong>10〜1,000µAの微弱な直流でラット皮膚のATP濃度が上昇し、アミノ酸のタンパク質への取り込みも促された</strong>こと。膜を通したアミノ酸の輸送が促されたのは<strong>100〜750µAの範囲</strong>でした<sup className="text-[#FF9855] font-bold">[3]</sup>。よく引用される<strong>「3〜5倍」「約500µAでピーク、1,000µAを超えると低下」</strong>という具体的な数字は、この論文を紹介する二次資料（機器メーカーの解説など）で広く用いられている要約であって、原著の記述そのものではありません。
                        {'\n\n'}
                        いずれにせよ確かなのは、<strong>「強くするほど良い」ではなかった</strong>という点です。効果には最適な範囲があり、それを外れると失われる。
                        {'\n\n'}
                        では、この数字をそのまま「あなたの体でATPが5倍になります」と言えるか。<strong>言えません。</strong>ここには、越えられていない距離があります。
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { head: '① ラットの皮膚組織を用いた実験', body: '生きたヒトの体内で確かめられたことではなく、動物の皮膚組織に電流を流して測定した実験。人体への外挿は、そのままではできない。' },
                            { head: '② 測ったのは「皮膚」であって筋肉や脳ではない', body: '創傷治癒の文脈での研究。全身の代謝や慢性的な疲労が良くなることを示したものではない。' },
                            { head: '③ 40年以上、決定打が出ていない', body: '2025年のナラティブレビューでも、微弱電流療法は「有望だが、プロトコルが不統一で質の高い試験が不足している」と評価されている。', ref: '4' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}{s.ref && <sup className="text-[#FF9855] font-bold ml-0.5">[{s.ref}]</sup>}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        だから正確な言い方はこうなります。<strong>「培養レベルではATPが増えたという40年前の報告があり、それを人体に応用する試みが続いているが、まだ確立していない」</strong>。これを「ATPが5倍になります」と縮めた瞬間に、<strong>ラットの皮膚とあなたの体のあいだにある距離</strong>が消えてしまいます。
                    </p>
                </section>

                {/* 光は別 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">補足——ミトコンドリアと機序がいちばん噛み合うのは「光」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        皮肉なことに、同じ施術院で使われる機器のうち、<strong>ミトコンドリアとの関係が分子レベルでいちばん筋の通っているのは、電流ではなく光</strong>です。赤色〜近赤外光を当てる<strong>光生体調整（フォトバイオモジュレーション／PBM）</strong>がそれにあたります。
                        {'\n\n'}
                        提唱されている機序は具体的です。赤色（600〜700nm）〜近赤外（760〜940nm）の光を、<strong>電子伝達系の複合体IV＝シトクロムcオキシダーゼ（CCO）</strong>が吸収する。CCOに結合して働きを邪魔していた一酸化窒素（NO）が外れ、酸素消費と膜電位が上がり、ATP産生が増える——という筋書きです<sup className="text-[#FF9855] font-bold">[5][6]</sup>。
                        {'\n\n'}
                        ただしここでも留保が要ります。PBMは<strong>波長・出力・照射時間で結果が変わり、しかも用量反応が二相性（弱すぎても強すぎても効かない）</strong>とされます。機序が説得力を持つことと、<strong>あなたの症状に対して臨床的な効果が確立していることは、別の話</strong>です。
                    </p>
                    <p className="text-xs text-[#4A4A4A]/70 mt-4 leading-relaxed p-3 rounded-lg" style={{ background: '#EFE7DF', border: '1px solid #1A1A1A22' }}>
                        ※ ここで押さえておきたいのは、機器の名前ではなく<strong>「電気」と「光」と「熱」は別の物理現象で、体への入り方も別</strong>だということ。ひとまとめに「電気治療」と説明されているときは、実際に何が当たっているのかを確かめる価値があります。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/electron-transport-chain', label: '電子伝達系' }, { href: '/sunlight', label: '日光' }, { href: '/atp', label: 'ATP' }, { href: '/oxidative-stress', label: '酸化ストレス' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 痛みが取れる≠細胞が元気 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「楽になった」＝「細胞が元気になった」ではない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        施術を受けて実際に楽になる。これは主観ではなく、起きている現象です。ただし<strong>その楽さの正体は、多くの場合ミトコンドリアではありません</strong>。
                        {'\n\n'}
                        TENSの主な機序として説明されるのは、<strong>ゲートコントロール（太い感覚神経を刺激することで、痛みの信号が脊髄で伝わりにくくなる）</strong>と、<strong>体内で作られる鎮痛物質（内因性オピオイド）の関与</strong>です。神経の信号処理レベルの話であって、細胞のエネルギー産生の話ではありません。
                        {'\n\n'}
                        効果の大きさも、冷静に見ておく価値があります。381件のランダム化比較試験（約24,500人）をまとめたメタ解析では、<strong>プラセボと比べた直後の痛みの軽減は「中等度の確実性」で認められた</strong>一方、<strong>他の治療と比べた場合は「低い確実性」</strong>にとどまりました<sup className="text-[#FF9855] font-bold">[7]</sup>。慢性腰痛に絞ったWHO向けのレビューでは、<strong>確実性は「非常に低く」、効果も短時間かつ臨床的に重要とは言いがたい</strong>と評価されています<sup className="text-[#FF9855] font-bold">[8]</sup>。
                    </p>
                    <div className="mt-6 rounded-xl p-5 border-l-4" style={{ background: '#EFE7DF', borderColor: '#FF9855' }}>
                        <p className="text-[#1A1A1A] font-bold leading-relaxed">
                            楽になることには価値がある。それは否定しなくていい。<br />
                            <span className="text-[#4A4A4A] font-medium text-sm">——ただし「楽になった」を「原因が治った」「細胞が若返った」と読み替えないこと。この2つを混ぜないだけで、電気療法との付き合い方はずっと健全になります。</span>
                        </p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/autonomic-nervous-system', label: '自律神経' }, { href: '/inflammation', label: '炎症' }, { href: '/symptoms', label: '症状から引く' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 日本の制度 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">日本の制度を知っておく——「整体師」と国家資格の違い</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        機序の話と同じくらい、知っておくと判断が変わるのが制度の話です。日本では、<strong>「整体師」は国家資格ではありません</strong>。名称に法的な規定がなく、資格がなくても名乗れます。一方で、<strong>柔道整復師・あん摩マッサージ指圧師・はり師・きゅう師は国家資格</strong>で、養成校で3年以上学び国家試験に合格する必要があります<sup className="text-[#FF9855] font-bold">[9]</sup>。
                        {'\n\n'}
                        これは施術者個人の技術や誠実さの話ではありません。<strong>制度上の位置づけが違う</strong>という事実です。国家資格を持たない施術は「治療」「医療行為」にはあたらず、その範囲での説明・広告にも制約があります。
                    </p>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { head: '国家資格が要る', body: '柔道整復師（整骨院・接骨院）、あん摩マッサージ指圧師、はり師・きゅう師。養成校3年以上＋国家試験。', bg: '#D7F0E8' },
                            { head: '国家資格ではない', body: '「整体師」「カイロプラクター」「リラクゼーションセラピスト」など。民間資格や独自認定はあるが、法的な国家資格ではない。', bg: '#F7E2DC' },
                        ].map((s) => (
                            <div key={s.head} className="rounded-xl p-4 border border-[#1A1A1A]/20" style={{ background: s.bg }}>
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        機器の側にもルールがあります。家庭用の低周波治療器は<strong>「管理医療機器（クラスII）」</strong>に分類され、効能・効果や使用上の注意が承認・認証の枠内で定められています<sup className="text-[#FF9855] font-bold">[10]</sup>。<strong>承認された効能を超えた説明——「がんに効く」「難病が治る」「体質が変わる」——は、機器の枠を外れた主張</strong>だと考えてください。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/medical-roles', label: '医療者の役割' }, { href: '/integrative-medicine', label: '統合医療' }, { href: '/nutrition-literacy', label: '情報の読み方' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 安全性 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">受ける前に——避けるべき状況</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        電気療法は、有害事象の多くが軽微（皮膚のかゆみ・かぶれなど）で、重篤なものは稀とされています<sup className="text-[#FF9855] font-bold">[7]</sup>。ただし<strong>「使ってはいけない状況」だけは、確実に知っておく必要があります</strong>。
                    </p>
                    <div className="mt-5 rounded-xl p-5 border-2" style={{ background: '#F7E2DC', borderColor: '#1A1A1A' }}>
                        <div className="font-bold text-[#1A1A1A] mb-2">絶対に避けるべきもの</div>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            <strong>ペースメーカーなどの体内植込み型医用電気機器を使用している場合</strong>、低周波治療器との併用は禁止されています。機器の誤作動を招き、生命に関わる結果につながりうるためです<sup className="text-[#FF9855] font-bold">[11]</sup>。
                        </p>
                    </div>
                    <div className="mt-4 space-y-3">
                        {[
                            { head: '心臓の近く・頭部・顔面への使用', body: '家庭用機器の注意書きで一般に禁じられている部位。「肩こりだから」と首や頭へ寄せていくのは、想定された使い方ではない。' },
                            { head: '妊娠中、または妊娠の可能性があるとき', body: '安全性が確立していないため、腹部・腰部への使用は避け、主治医に確認を。' },
                            { head: '悪性腫瘍のある部位・原因不明のしこり', body: '該当部位への刺激は避ける。まず医療機関で評価を受けることが優先。' },
                            { head: '感覚が鈍っている部位・皮膚に傷や炎症がある部位', body: '「強すぎる」に気づけないと熱傷や皮膚障害のリスクが上がる。糖尿病の神経障害などがある人は特に注意。' },
                            { head: '発熱時・急性期の強い炎症・血栓の疑い', body: '安静と診断が先。原因のわからない急な痛みや腫れは、施術より受診。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/70 mt-4 leading-relaxed p-3 rounded-lg" style={{ background: '#EFE7DF', border: '1px solid #1A1A1A22' }}>
                        ※ 実際の禁忌・注意事項は機器ごとに異なります。<strong>使用する機器の添付文書・取扱説明書が最終的な基準</strong>です。持病・服薬・妊娠中の方、体内に金属や医療機器がある方は、必ず医師にご相談ください。このページは医療上の助言ではありません。
                    </p>
                </section>

                {/* どう付き合うか */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">では、どう付き合うか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        繰り返しますが、これは<strong>「電気療法は無意味だ」という話ではありません</strong>。痛みの緩和という目的には一定の裏づけがあり、自力で動けない人にとってのNMESは代替のきかない技術です。問題は、<strong>効果の範囲を超えた物語がくっついてくる</strong>ときです。
                    </p>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { head: '「何が当たっているか」を聞く', body: '低周波か、EMSか、温熱か、光か。答えられる施術者は、説明も正確なことが多い。' },
                            { head: '目的を「痛みの緩和」に置く', body: '楽になるために受ける。それで十分に意味がある。細胞レベルの若返りを期待しない。' },
                            { head: '「体質が変わる」系の説明は保留', body: '承認された効能を超える主張が出てきたら、いったん距離を取る材料にする。' },
                            { head: '動けるなら、本家は運動', body: 'ミトコンドリアを増やす経路の主役は自分の筋収縮。電気は補助であって、置き換えではない。' },
                            { head: '通う設計を決める', body: '回数券を買う前に、何がどうなったら終わりなのかを決めておく。終わりのない通院は、目的を見失いやすい。' },
                            { head: '痛みが続くなら、まず診断', body: '施術で紛らせ続けるより、原因を確かめる。とくに夜間痛・体重減少・しびれを伴う痛みは受診を。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 rounded-xl p-5 border-l-4" style={{ background: '#EFE7DF', borderColor: '#FF9855' }}>
                        <p className="text-[#1A1A1A] font-bold leading-relaxed">
                            電気が細胞を動かすのではない。電気が起こした「動き」が、細胞を変える。<br />
                            <span className="text-[#4A4A4A] font-medium text-sm">——だとすれば、いちばん確実な電気療法は、自分の神経が自分の筋肉に送っている電気信号のほうかもしれません。</span>
                        </p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/exercise', label: '運動' }, { href: '/mitochondria', label: 'ミトコンドリア' }, { href: '/sound', label: '音と健康' }, { href: '/integrative-medicine', label: '統合医療' }, { href: '/health-counterculture', label: '健康とはカウンターカルチャー' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        {[
                            { n: 1, url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11950031/', title: 'Skeletal muscle hypertrophy and enhanced mitochondrial bioenergetics following electrical stimulation exercises in spinal cord injury: a randomized clinical trial（電気刺激運動とミトコンドリア密度・複合体II活性）', src: 'PMC / ランダム化比較試験' },
                            { n: 2, url: 'https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2019.01463/full', title: 'Neuromuscular Electrical Stimulation: A New Therapeutic Option for Chronic Diseases Based on Contraction-Induced Myokine Secretion（NMESとPGC-1α・運動エミュレーターとしての位置づけ）', src: 'Frontiers in Physiology, 2019' },
                            { n: 3, url: 'https://journals.lww.com/clinorthop/citation/1982/11000/the_effects_of_electric_currents_on_atp.45.aspx', title: 'The Effects of Electric Currents on ATP Generation, Protein Synthesis, and Membrane Transport of Rat Skin（微弱電流とATP産生・タンパク合成）', src: 'Cheng N, et al. Clin Orthop Relat Res 171:264-272, 1982' },
                            { n: 4, url: 'https://journals.sagepub.com/doi/10.1177/20406223251361677', title: 'Investigating the therapeutic efficacy of microcurrent therapy: a narrative review（微弱電流療法の有効性：現時点の評価と限界）', src: 'Ther Adv Chronic Dis, 2025' },
                            { n: 5, url: 'https://pubmed.ncbi.nlm.nih.gov/32716711/', title: 'What Lies at the Heart of Photobiomodulation: Light, Cytochrome C Oxidase, and Nitric Oxide—Review of the Evidence（光・シトクロムcオキシダーゼ・一酸化窒素）', src: 'PubMed / 総説' },
                            { n: 6, url: 'https://onlinelibrary.wiley.com/doi/10.1111/php.12864', title: 'Mechanisms and Mitochondrial Redox Signaling in Photobiomodulation（PBMの機序とミトコンドリアの酸化還元シグナル）', src: 'Hamblin MR, Photochem Photobiol, 2018' },
                            { n: 7, url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8845179/', title: 'Efficacy and safety of TENS for acute and chronic pain in adults: a systematic review and meta-analysis of 381 studies（meta-TENS study：効果量と確実性、有害事象）', src: 'BMJ Open, 2022' },
                            { n: 8, url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10684422/', title: 'Systematic Review to Inform a WHO Clinical Practice Guideline: Benefits and Harms of TENS for Chronic Primary Low Back Pain in Adults（慢性腰痛：確実性は非常に低い）', src: 'PMC / WHOガイドライン向けレビュー' },
                            { n: 9, url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/newpage_48702.html', title: 'あん摩マッサージ指圧師、はり師、きゅう師、柔道整復師（国家資格と施術所に関する制度）', src: '厚生労働省' },
                            { n: 10, url: 'https://www.mhlw.go.jp/shingi/2005/07/dl/s0720-6j.pdf', title: '家庭用の医療機器の一般的名称と定義（家庭用低周波治療器の分類）', src: '厚生労働省' },
                            { n: 11, url: 'https://panasonic.jp/treatment/safety.html', title: '家庭用電気治療器 安全に関するご注意（ペースメーカー等の体内植込み型機器、使用部位の禁止事項）', src: 'メーカー安全情報（添付文書に準ずる表示例）' },
                        ].map((r) => (
                            <li key={r.n}>
                                <span className="text-[#FF9855] font-bold mr-1">[{r.n}]</span>
                                <a href={r.url} target="_blank" rel="noopener noreferrer"
                                    className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                    {r.title}
                                </a>
                                <span className="text-[#1A1A1A]/50"> — {r.src}</span>
                            </li>
                        ))}
                    </ol>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
