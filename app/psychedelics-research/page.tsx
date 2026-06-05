import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'サイケデリック研究の潮流（海外）｜ 中立な解説 | Mitoflow40',
    description: '海外で進む「サイケデリック（幻覚剤）」のメンタルヘルス研究や、大麻をめぐる各国の法改正の動きを、中立・教育的に解説します。日本では違法であり使用を推奨するものではありません。研究・政策の現在地と課題を、出典つきで紹介します。',
    alternates: { canonical: 'https://mitoflow40.com/psychedelics-research' },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'サイケデリック研究の潮流（海外）｜ Mitoflow40',
        description: '海外で進むサイケデリックのメンタルヘルス研究を中立的に解説。日本では違法・使用推奨ではありません。',
        url: 'https://mitoflow40.com/psychedelics-research',
        type: 'article',
    },
};

export default function PsychedelicsResearchPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E6E1EC' }}>
            <JsonLd data={medicalWebPage({ name: 'サイケデリック研究の潮流（海外）', description: '海外で進むサイケデリックのメンタルヘルス研究を中立的に解説。日本では違法・使用推奨ではありません。', path: '/psychedelics-research' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: 'サイケデリック研究の潮流', path: '/psychedelics-research' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: 'サイケデリック研究の潮流' }]} />
                <header className="mb-8 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        RESEARCH FRONTIER ／ 海外の研究潮流
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        サイケデリック研究の潮流
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[620px] mx-auto text-left">
                        近年、海外で「サイケデリック（幻覚剤）」をメンタルヘルスの治療に応用しようとする研究が注目されています。このページは、その<strong>研究の潮流を中立的に紹介する</strong>もので、使用を勧めるものでは一切ありません。
                    </p>
                </header>

                {/* 最重要警告 */}
                <section className="mb-10 rounded-2xl p-6 md:p-7 border-2" style={{ background: '#FBE3DC', borderColor: '#C0392B' }}>
                    <h2 className="text-lg md:text-xl font-bold mb-3" style={{ color: '#C0392B' }}>⚠ 最初に必ずお読みください</h2>
                    <ul className="space-y-2 text-sm text-[#1A1A1A] leading-relaxed">
                        <li className="flex gap-2"><span style={{ color: '#C0392B' }} className="font-bold flex-shrink-0">●</span><span><strong>日本では、シロシビン（マジックマッシュルーム）・LSD・MDMA などは麻薬取締法等で規制されており、所持・使用は犯罪です。</strong></span></li>
                        <li className="flex gap-2"><span style={{ color: '#C0392B' }} className="font-bold flex-shrink-0">●</span><span>本ページは<strong>海外の臨床研究の動向を伝える教育目的</strong>のみで、使用方法・入手方法は一切扱いません。</span></li>
                        <li className="flex gap-2"><span style={{ color: '#C0392B' }} className="font-bold flex-shrink-0">●</span><span>これらは<strong>強い作用と深刻なリスクを伴う物質</strong>です。研究は専門家の厳重な管理下で行われており、<strong>個人での自己使用は危険かつ違法</strong>です。絶対に行わないでください。</span></li>
                    </ul>
                </section>

                {/* 歴史 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ今また注目されるのか——その歴史</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mb-5">
                        いまの研究ブームを理解するには、一度大きく「上がって、落ちた」歴史を知るとわかりやすくなります。
                    </p>
                    <div className="space-y-3">
                        {[
                            { era: '1940〜50年代', head: '科学の対象として登場', body: '1938年、スイスの化学者アルバート・ホフマンがLSDを合成し、その作用を発見。1950〜60年代には、精神医学の研究対象として、うつやアルコール依存などへの応用が世界中で研究されていました。' },
                            { era: '1960年代', head: 'カウンターカルチャーへ', body: '研究室を飛び出し、ヒッピー文化と結びついて若者へ広がります。1967年の「サマー・オブ・ラブ」に象徴される対抗文化のうねりの中で、サイケデリックは時代のアイコンになりました。' },
                            { era: '1970年代〜', head: '全面禁止と「冬の時代」', body: '社会問題化を受け、アメリカは1970年に規制法でこれらを最も厳しい分類（スケジュールI）に指定。国連条約もこれに続き、研究はほぼ止まりました。以後、数十年にわたる空白が続きます。' },
                            { era: '2000年代〜現在', head: '「再来（ルネサンス）」', body: '2000年代以降、大学などが厳格な倫理基準のもとで臨床研究を再開。難治性のうつやPTSDといった領域で、管理された条件下での可能性が、あらためて科学的に検証されるようになりました——これが現在の流れです。' },
                        ].map((t) => (
                            <div key={t.era} className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-white/50">
                                <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.era}</div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{t.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{t.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">
                        ※ 1960年代の流行は、娯楽的・無管理な使用による健康被害や社会問題も伴いました。現在の研究が「専門家の管理下」を強調するのは、その反省を踏まえたものでもあります。
                    </p>
                </section>

                {/* 何が研究されているか */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">何が、なぜ研究されているのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        うつ病やPTSD（心的外傷後ストレス障害）の中には、既存の薬や治療で十分に良くならない「<strong>難治性</strong>」のケースがあります。こうした、これまで打つ手が限られていた領域に対して、<strong>専門家の管理と心理的サポートを組み合わせた条件下で</strong>、サイケデリック物質が役立つ可能性はないか——それを検証しようとするのが、近年の研究の流れです。
                        {'\n\n'}
                        あくまで「薬物単独」ではなく、訓練を受けた専門家による<strong>心理療法とセットで、管理された環境で</strong>用いられる点が特徴です。娯楽的な使用とは、まったく文脈が異なります。
                    </p>
                </section>

                {/* 研究の現在地 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">研究の現在地——期待と、慎重論</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        2022年には、難治性うつ病を対象に<strong>シロシビン</strong>を用いた国際的な臨床試験の結果が医学誌に報告され、一部で症状の改善がみられたと発表されました<sup className="text-[#FF9855] font-bold">[1]</sup>。その後も研究は進み、2025〜2026年にかけて、シロシビンのうつ病治療について大規模な第3相試験で良好な結果が報告され、<strong>米国での承認申請に向けた動き</strong>が本格化しています。
                        {'\n\n'}
                        一方で、慎重な見方も根強くあります。<strong>MDMA併用療法（PTSD向け）</strong>については、2024年に米国FDA（食品医薬品局）が承認を見送り、<strong>2025年時点でも承認には至っていません</strong>。有効性の証拠や試験の方法に十分でない点があると判断されたためです<sup className="text-[#FF9855] font-bold">[2]</sup>。
                        {'\n\n'}
                        つまり現状（2026年6月時点）は、「<strong>有望で、追い風も強まっているが、まだ研究段階</strong>」。物質ごとに評価が分かれ、効果も安全性も最終的な結論が出たわけではありません。過度な期待も、全否定も避け、推移を見守るべきテーマです。
                    </p>
                </section>

                {/* 世界の流れ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">世界で起きている動き</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        研究と並行して、制度の面でも変化が起きています。一部の国・地域では、<strong>厳格な管理下に限って</strong>、治療目的での利用に道を開く動きが出てきました。
                        {'\n\n'}
                        たとえば<strong>オーストラリア</strong>では、2023年7月から、認可された精神科医が、治療抵抗性うつ病に対するシロシビン、PTSDに対するMDMAを、管理された医療の場で処方できるようになりました<sup className="text-[#FF9855] font-bold">[3]</sup>。アメリカの<strong>オレゴン州</strong>では住民投票（2020年）を経て監督下でのシロシビン利用の枠組みが2023年から始まり<sup className="text-[#FF9855] font-bold">[4]</sup>、<strong>コロラド州</strong>でも2025年から、免許を持つ施設・支援者による提供がスタートしました<sup className="text-[#FF9855] font-bold">[5]</sup>。さらに2026年には、米国の連邦政府が研究を加速する方針を打ち出すなど、制度面の動きが加速しています<sup className="text-[#FF9855] font-bold">[6]</sup>。
                        {'\n\n'}
                        ただし、いずれも「誰でも自由に使える」という話では決してありません。<strong>対象となる症状・場所・資格者が厳しく限定された、医療的な枠組みの中</strong>での話です。世界全体で見れば、慎重な国の方がまだ多数派で、これらは“先行する一部の例”という位置づけです。賛否と模索が、同時に進んでいるのが世界の現状です（2026年6月時点）。
                    </p>
                </section>

                {/* 大麻への導線 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">（関連）大麻をめぐる動き</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-4">
                        規制される物質をめぐっては、<strong>大麻</strong>も世界で大きく議論されています。歴史、世界の合法化の流れ、そして日本の2024年法改正（使用罪の新設と医療用の解禁）については、別ページで中立的にまとめています。
                    </p>
                    <Link href="/cannabis"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                        style={{ background: '#FF9855', color: '#1A1A1A' }}>
                        大麻をめぐる歴史と世界の動き
                        <span>→</span>
                    </Link>
                </section>

                {/* 日本では */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">日本での位置づけ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        くり返しになりますが、これらの物質は<strong>日本では違法</strong>であり、医療として受けられるものでもありません。海外で研究が進んでいることと、日本で使ってよいことは、まったく別の話です。
                        {'\n\n'}
                        Mitoflow40がこのテーマに触れるのは、あくまで「世界でこうした議論が起きている」という<strong>知識・教養として</strong>です。私たちが軸にしているのは、食事・栄養・生活習慣で心身を整える、<strong>合法的で安全な未病予防</strong>。メンタルの不調についても、まずは睡眠・腸・血糖・栄養といった土台から整える視点を大切にしています。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/gut-brain" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">腸脳相関</Link>
                        <Link href="/sleep" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">睡眠</Link>
                        <Link href="/autonomic-nervous-system" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">自律神経</Link>
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は海外の研究動向に関する一般的・教育的な情報であり、いかなる物質の使用も推奨・勧誘するものではありません。日本国内での所持・使用は違法です。心の不調については、医療機関や公的な相談窓口にご相談ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://www.nejm.org/doi/full/10.1056/NEJMoa2206443" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Single-Dose Psilocybin for a Treatment-Resistant Episode of Major Depression
                            </a>
                            <span className="text-[#1A1A1A]/50"> — New England Journal of Medicine（2022）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[2]</span>
                            <a href="https://www.nature.com/articles/d41586-024-01622-3" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                MDMA therapy for PTSD rejected by FDA panel
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Nature（2024）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[3]</span>
                            <a href="https://www.tga.gov.au/news/media-releases/change-classification-psilocybin-and-mdma-enable-prescribing-authorised-psychiatrists" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Change to classification of psilocybin and MDMA to enable prescribing by authorised psychiatrists
                            </a>
                            <span className="text-[#1A1A1A]/50"> — TGA（オーストラリア・2023）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[4]</span>
                            <a href="https://www.oregon.gov/oha/ph/preventionwellness/pages/oregon-psilocybin-services.aspx" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Oregon Psilocybin Services（オレゴン州の規制下サービス）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Oregon Health Authority</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[5]</span>
                            <a href="https://stateline.org/2025/01/06/colorado-can-now-issue-licenses-to-psychedelic-mushroom-therapy-facilitators/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Colorado can now issue licenses to psychedelic mushroom therapy facilitators（2025）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Stateline</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[6]</span>
                            <a href="https://www.cnn.com/2026/04/24/health/fda-psychedelic-drugs-priority-vouchers" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                FDA moves to fast-track review of psilocybin and methylone for mental health（2026）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — CNN</span>
                        </li>
                    </ol>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
