import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '統合医療とは ｜ 西洋医学と補完療法を「いいとこ取り」で中立に | Mitoflow40',
    description: '統合医療とは、西洋医学（標準治療）を土台にしながら、鍼灸・ヨガ・瞑想・食事・サプリといった補完的なアプローチを、エビデンスにもとづいて組み合わせる考え方です。補完医療・代替医療・統合医療の違い、「自然＝安全」という誤解、薬との相互作用、そして「代替だけに頼らない」という最も大切な原則までを、出典つきで中立に整理します。診断・治療は医療機関で。',
    alternates: { canonical: 'https://mitoflow40.com/integrative-medicine' },
    openGraph: {
        title: '統合医療とは ｜ Mitoflow40',
        description: '西洋医学を土台に、補完療法をエビデンスで組み合わせる「統合医療」を中立に。用語の整理・安全の原則・Mitoflow40の立ち位置まで。',
        url: 'https://mitoflow40.com/integrative-medicine',
        type: 'article',
    },
};

export default function IntegrativeMedicinePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '統合医療とは', description: '西洋医学を土台に、補完療法をエビデンスで組み合わせる「統合医療」を中立に整理する。', path: '/integrative-medicine' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '統合医療とは', path: '/integrative-medicine' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '統合医療とは' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>THE APPROACH</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        INTEGRATIVE MEDICINE
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>統合医療とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        統合医療とは、<strong>西洋医学（標準治療）を土台</strong>にしながら、鍼灸・ヨガ・瞑想・食事・サプリといった補完的なアプローチを、<strong>エビデンスにもとづいて</strong>組み合わせ、人を「からだ・こころ・くらし」の全体として診ようとする考え方です。
                    </p>
                </header>

                {/* 最重要：代替だけに頼らない（先頭） */}
                <section className="mb-10 rounded-2xl p-6 md:p-7 border-2" style={{ background: '#FBE3DC', borderColor: '#C0392B' }}>
                    <h2 className="text-lg md:text-xl font-bold mb-3" style={{ color: '#C0392B' }}>⚠ いちばん大切な原則：「代替」だけに頼らない</h2>
                    <p className="text-sm text-[#1A1A1A] mb-3 leading-relaxed">
                        統合医療の主役は、あくまで<strong>標準治療（科学的根拠のある西洋医学）</strong>です。補完療法は、それを<strong>置きかえるものではなく、支えるもの</strong>。次のような場合は、特に注意してください。
                    </p>
                    <ul className="space-y-2 text-sm text-[#1A1A1A] leading-relaxed">
                        {[
                            'がん・感染症など、有効な標準治療があるのに「これだけで治る」と代替療法をすすめられたとき',
                            'サプリ・ハーブを「薬の代わり」にすすめられたとき（薬との相互作用・治療の遅れの危険）',
                            '「自然だから安全」「副作用ゼロ」と断定する説明',
                            '高額な商品・施術を、効果を誇張して契約させようとする勧誘',
                        ].map((t) => (
                            <li key={t} className="flex gap-2"><span style={{ color: '#C0392B' }} className="font-bold flex-shrink-0">●</span><span>{t}</span></li>
                        ))}
                    </ul>
                    <p className="text-sm text-[#1A1A1A] mt-3 leading-relaxed">
                        補完療法を試したいときは、<strong>自己判断でやめず、まず主治医に相談</strong>を。「いま受けている治療を続けながら、これを足してよいか」を一緒に確認するのが、安全な統合医療です。
                    </p>
                </section>

                {/* 統合医療とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「病気」だけでなく「人」を診る</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        西洋医学は、検査で異常を見つけ、薬や手術でピンポイントに治す——<strong>急性の病気や明確な異常</strong>に、きわめて強い力を発揮します。一方で、はっきりした病名はつかないけれど不調が続く「<strong>未病</strong>」や、生活習慣・ストレス・睡眠・食事といった<strong>背景の積み重ね</strong>は、薬だけでは扱いきれないこともあります。
                        {'\n\n'}
                        統合医療は、その西洋医学を<strong>土台</strong>に置きながら、食事・運動・睡眠・こころのケアや、鍼灸・ヨガ・瞑想といった<strong>補完的なアプローチ</strong>を、<strong>エビデンス（科学的根拠）で見極めて</strong>組み合わせていく考え方です<sup className="text-[#FF9855] font-bold">[1]</sup>。めざすのは「病名を消すこと」だけでなく、<strong>その人が、その人らしく整っていく</strong>こと。<strong>患者中心</strong>で、からだ・こころ・くらしを全体として見る——それが統合医療の姿勢です。
                    </p>
                </section>

                {/* 用語の整理 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">まぎらわしい3つの言葉を整理する</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-5">
                        「補完」「代替」「統合」はよく混同されますが、米国の研究機関（NCCIH）は、<strong>「標準治療と一緒に使うか／代わりに使うか」</strong>で次のように区別しています<sup className="text-[#FF9855] font-bold">[2]</sup>。ここがいちばん大事なポイントです。
                    </p>
                    <div className="space-y-3">
                        {[
                            { head: '補完医療（Complementary）', body: '標準治療と「一緒に（with）」使うもの。例：抗がん治療の吐き気に鍼や瞑想を併用する。これが統合医療の中心。' },
                            { head: '代替医療（Alternative）', body: '標準治療の「代わりに（instead of）」使うもの。有効な治療を捨てることになりやすく、リスクが大きい。実際にはこのケースはごく少ない、とされる。' },
                            { head: '統合医療（Integrative）', body: '標準治療と補完療法を、エビデンスにもとづいて「計画的に・協調して」組み合わせる、患者中心のアプローチ。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/70 mt-4 leading-relaxed">
                        ※ 日本では、これらをまとめて「補完代替医療（CAM）」と呼ぶこともあります。呼び名より、<strong>「標準治療を手放していないか」</strong>を確認することが大切です。
                    </p>
                </section>

                {/* どんなものが含まれるか */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">どんなものが含まれる？</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        補完療法はとても幅広く、エビデンスの量も<strong>「よく研究されたもの」から「ほとんど未検証のもの」まで玉石混交</strong>です。Mitoflow40 のライブラリにも、関連するテーマがあります。
                    </p>
                    <div className="space-y-3">
                        {[
                            { head: '心と体へのアプローチ', body: 'ヨガ・瞑想・マインドフルネス・呼吸法・気功など。ストレスや痛み・睡眠の研究が進んでいる領域。', href: '/mindfulness' },
                            { head: '手技・身体への施術', body: '鍼灸・指圧・マッサージ・整体など。腰痛や緊張、慢性の痛みに用いられる。', href: '/autonomic-nervous-system' },
                            { head: '食事・栄養・サプリ', body: '食事療法、ハーブ、ビタミン・ミネラルなどの栄養素。Mitoflow40が最も力を入れる領域でもある。', href: '/nutrients' },
                            { head: '音・匂い・自然', body: '音楽療法・アロマテラピー・自然とのふれあいなど、感覚を通じて自律神経を整えるアプローチ。', href: '/sound' },
                            { head: '伝統医療', body: '漢方・アーユルヴェーダ・伝統中国医学など、長い歴史をもつ体系。WHOも研究・統合を進めている。', href: '/health-philosophy' },
                        ].map((s) => (
                            <Link key={s.head} href={s.href} className="group flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#FF9855] transition-colors">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* エビデンスの考え方 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「自然＝安全」ではない——エビデンスで見極める</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        統合医療でいちばん大切なのは、<strong>「気持ちよさそう」「自然そう」で選ばない</strong>ことです。補完療法には、<strong>よく研究され効果が確かめられたもの</strong>もあれば、<strong>効果がはっきりしないもの・かえって害になりうるもの</strong>もあります。
                        {'\n\n'}
                        たとえばハーブやサプリは「自然由来」でも、<strong>薬の効きを強めたり弱めたりする相互作用</strong>を起こすことがあります<sup className="text-[#FF9855] font-bold">[2]</sup>。だからこそ、ひとつひとつを<strong>エビデンスで確かめる</strong>姿勢が欠かせません。
                        {'\n\n'}
                        日本では、厚生労働省が<strong>「統合医療」情報発信サイト（eJIM）</strong>を公開し、各療法の科学的根拠や注意点を中立にまとめています<sup className="text-[#FF9855] font-bold">[3]</sup>。気になる療法があれば、まずこうした一次情報で「どこまで分かっているか」を確かめるのがおすすめです。
                    </p>
                </section>

                {/* Mitoflow40の立ち位置 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">Mitoflow40 は、どこに立つのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        Mitoflow40 は、<strong>診断も治療もしません</strong>。病気を治すのは、これからも<strong>医療機関と、あなたの主治医</strong>の役割です。私たちが立つのは、その<strong>「未病の手前」</strong>——食事・睡眠・運動・ストレスといった<strong>日々の土台</strong>を、血液データなどを手がかりに整えていく場所です。
                        {'\n\n'}
                        統合医療の言葉でいえば、Mitoflow40 が扱う<strong>精密栄養学</strong>は、西洋医学という土台に添える<strong>「栄養・生活習慣」という補完的なピース</strong>のひとつ。<strong>標準治療を置きかえるものでは、決してありません</strong>。むしろ「主治医の治療を続けながら、生活の土台をどう整えるか」を一緒に考えるのが、私たちの役割です。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/medical-roles', label: '医療者の役割と立ち位置' }, { href: '/precision-nutrition', label: '精密栄養学とは' }, { href: '/mission', label: 'なぜ、未病予防か' }, { href: '/health-philosophy', label: '健康観' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 世界の動き */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">世界での広がりと研究</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-5">
                        統合医療は「あやしいもの」ではなく、世界の公的機関が<strong>研究し、エビデンスを整理している</strong>分野です。
                    </p>
                    <div className="space-y-3">
                        {[
                            { head: '米国：NIHに専門センター（NCCIH）', body: '米国国立衛生研究所（NIH）の中に「国立補完統合衛生センター（NCCIH）」があり、補完療法を科学的に研究し、用語や安全性の情報を発信しています。', ref: '2' },
                            { head: '日本：厚労省のeJIMと統合医療学会', body: '厚生労働省は「統合医療」情報発信サイト（eJIM）を運営。学術面では日本統合医療学会（IMJ）が研究・教育を進めています。', ref: '3' },
                            { head: 'WHO：伝統・補完・統合医療の戦略', body: 'WHO（世界保健機関）は、伝統医療・補完医療を各国の医療に安全に統合していくための戦略を掲げ、エビデンスにもとづく活用を推進しています。', ref: '4' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}<sup className="text-[#FF9855] font-bold ml-0.5">[{s.ref}]</sup></div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-10 p-4 bg-white/60 rounded-lg border" style={{ borderColor: '#C0392B33', background: '#FBE3DC55' }}>
                    ※ 本記事は一般的・教育的な情報であり、診断・治療に代わるものではありません。補完療法を試したいときは、<strong>いま受けている標準治療を自己判断でやめず、必ず主治医・薬剤師に相談</strong>してください。サプリ・ハーブは薬との相互作用や、妊娠中・持病がある場合の注意があります。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://www.ejim.ncgg.go.jp/public/overview/index.html" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                統合医療とは（定義・考え方の概説）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — 厚生労働省「統合医療」情報発信サイト eJIM</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[2]</span>
                            <a href="https://www.nccih.nih.gov/health/complementary-alternative-or-integrative-health-whats-in-a-name" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Complementary, Alternative, or Integrative Health: What&rsquo;s In a Name?（用語の定義・安全性）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — NCCIH（米国国立補完統合衛生センター／NIH）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[3]</span>
                            <a href="https://www.ejim.ncgg.go.jp/public/index.html" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                「統合医療」情報発信サイト eJIM（各療法のエビデンス・注意点）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — 厚生労働省 / 国立長寿医療研究センター</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[4]</span>
                            <a href="https://www.who.int/health-topics/traditional-complementary-and-integrative-medicine" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Traditional, Complementary and Integrative Medicine（伝統・補完・統合医療）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — World Health Organization</span>
                        </li>
                    </ol>
                </section>

                <div className="text-center">
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
