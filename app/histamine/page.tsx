import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'ヒスタミンとは ｜ アレルギー・胃酸・脳・分解酵素（DAO/HNMT）を中立に | Mitoflow40',
    description: 'ヒスタミンは「アレルギーの悪者」だけではありません。アミノ酸ヒスチジンから作られ、アレルギー反応・胃酸分泌・脳の覚醒（神経伝達物質）など多くの役割を担う生理活性物質です。H1/H2受容体と抗ヒスタミン薬、分解酵素DAO・HNMT（メチレーション）の個人差、ヒスタミン不耐症と食べ物の関係、そしてアナフィラキシーやヒスタミン食中毒の注意までを、出典つきで中立に解説します。',
    alternates: { canonical: 'https://mitoflow40.com/histamine' },
    openGraph: {
        title: 'ヒスタミンとは ｜ Mitoflow40',
        description: 'アレルギー・胃酸・脳の覚醒という3つの顔と、分解酵素DAO/HNMTの個人差、ヒスタミン不耐症を中立に。',
        url: 'https://mitoflow40.com/histamine',
        type: 'article',
    },
};

export default function HistaminePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F6E2DC' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'ヒスタミンとは', description: 'ヒスタミンの3つの役割（アレルギー・胃酸・脳）と分解酵素DAO/HNMT、ヒスタミン不耐症を中立に整理する。', path: '/histamine' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: 'ヒスタミンとは', path: '/histamine' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: 'ヒスタミンとは' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MECHANISM</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        HISTAMINE
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>ヒスタミンとは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        花粉症やじんましんで名前を聞く「ヒスタミン」。じつは<strong>アレルギーの悪者</strong>であると同時に、<strong>胃酸を出し、脳を目覚めさせる</strong>——体に欠かせない伝達物質でもあります。
                    </p>
                </header>

                {/* 最重要：アナフィラキシー（先頭） */}
                <section className="mb-10 rounded-2xl p-6 md:p-7 border-2" style={{ background: '#FBE3DC', borderColor: '#C0392B' }}>
                    <h2 className="text-lg md:text-xl font-bold mb-3" style={{ color: '#C0392B' }}>⚠ こんなときは、すぐに救急を</h2>
                    <p className="text-sm text-[#1A1A1A] mb-3 leading-relaxed">ヒスタミンが一気に大量放出されると、<strong>アナフィラキシー</strong>という命に関わる反応が起きることがあります。次のサインがあれば、ためらわず<strong>119番・救急</strong>へ。エピペン（自己注射）を処方されている人は、医師の指示どおり使ってください。</p>
                    <ul className="space-y-2 text-sm text-[#1A1A1A] leading-relaxed">
                        {[
                            '急に全身にじんましん・赤み・激しいかゆみが広がる',
                            '唇・まぶた・舌・のどが腫れる、声がかすれる',
                            '息苦しい・ゼーゼーする・のどが詰まる感じ',
                            '気が遠くなる・血圧が下がる・ぐったりする',
                            '食べ物・薬・ハチ刺されのあとに、これらが急速に進む',
                        ].map((t) => (
                            <li key={t} className="flex gap-2"><span style={{ color: '#C0392B' }} className="font-bold flex-shrink-0">●</span><span>{t}</span></li>
                        ))}
                    </ul>
                </section>

                {/* ヒスタミンとは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「悪者」ではなく、必要な伝達物質</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ヒスタミンは、アミノ酸の<strong>ヒスチジン</strong>から作られる<strong>生理活性アミン</strong>です。体のあちこちにある<strong>肥満細胞（マスト細胞）</strong>などに蓄えられ、必要なときに放出されて「合図」を送ります<sup className="text-[#FF9855] font-bold">[1]</sup>。
                        {'\n\n'}
                        花粉やダニなどに反応して放出されると、血管をゆるめ、むくみ・かゆみ・鼻水を起こす——これが<strong>アレルギー症状</strong>です。でもヒスタミンの仕事はそれだけではありません。<strong>胃酸を出す</strong>、<strong>脳を目覚めさせる</strong>といった、生きるうえで欠かせない役割も担っています。「悪いもの」ではなく、<strong>出すぎたり、分解が追いつかないと困るもの</strong>、と捉えるのが正確です。
                    </p>
                </section>

                {/* 3つ（4つ）の顔 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">ヒスタミンの「顔」は、ひとつじゃない</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">ヒスタミンは、結合する<strong>受容体（H1〜H4）</strong>によって、まったく違う働きをします。薬も、どの受容体を狙うかで種類が分かれます。</p>
                    <div className="space-y-3">
                        {[
                            { head: '① アレルギーの最前線（H1受容体）', body: 'かゆみ・むくみ・鼻水・じんましん・気管支の収縮。花粉症やじんましんの薬「抗ヒスタミン薬」は、このH1をブロックして症状をやわらげる。' },
                            { head: '② 胃酸を出す（H2受容体）', body: '胃の壁細胞を刺激して胃酸を分泌させる。胃薬の「H2ブロッカー（ファモチジンなど）」は、ここを抑えて胃酸を減らす。' },
                            { head: '③ 脳を目覚めさせる（神経伝達物質）', body: '脳では覚醒・集中を保つ神経伝達物質として働く。古い抗ヒスタミン薬で「眠くなる」のは、この脳のヒスタミンまで抑えてしまうため。' },
                            { head: '④ 免疫・炎症の調整（H4など）', body: '免疫細胞に働きかけ、炎症やアレルギー反応の調整にも関わる。研究が進んでいる領域。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/70 mt-4 leading-relaxed">
                        ※「抗ヒスタミン薬で眠くなる／眠くならない」の違いは、薬が脳に入りやすいかどうかの差。眠気が出やすい薬は、車の運転前などに注意が必要です<sup className="text-[#FF9855] font-bold">[3]</sup>。
                    </p>
                </section>

                {/* 分解のしくみ（精密栄養の肝） */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「分解する力」には、個人差がある</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ヒスタミンは、出たあと<strong>すばやく分解</strong>されることで、はじめて困りません。その分解を担うのが、2つの<strong>酵素</strong>です<sup className="text-[#FF9855] font-bold">[2]</sup>。ここが、Mitoflow40 が大切にする「<strong>同じものを食べても、人によって反応が違う</strong>」という精密栄養学の視点とつながります。
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { head: 'DAO（ジアミンオキシダーゼ）', body: '主に腸で、食べ物から入ってきたヒスタミンを分解する“門番”。この働きが弱いと、ヒスタミンが処理しきれずに不調につながる、と考えられている。' },
                            { head: 'HNMT（ヒスタミンN-メチル基転移酵素）', body: '主に細胞の中でヒスタミンを分解する酵素。メチル基を使う反応＝「メチレーション」の一部で、体の解毒や代謝の土台ともつながっている。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose mt-5">
                        DAOがきちんと働くには、<strong>補酵素となる栄養素</strong>が必要だと考えられています。栄養は「ヒスタミンを処理する力」の土台でもあるのです。
                    </p>
                    <div className="mt-4 space-y-3">
                        {[
                            { href: '/nutrients/copper', label: '銅', note: 'DAOが働くために必要な微量ミネラル。酵素の中心で反応を支える。' },
                            { href: '/nutrients/b6', label: 'ビタミンB6', note: 'アミノ酸の代謝に広く関わる補酵素。DAOの働きを支えるとされる。' },
                            { href: '/nutrients/vitamin-c', label: 'ビタミンC', note: 'ヒスタミンの分解・血中濃度に関わる可能性が研究されている。' },
                        ].map((n) => (
                            <Link key={n.href} href={n.href} className="group flex items-start gap-4 bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#FF9855] transition-colors">{n.label}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{n.note}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/methylation', label: 'メチレーション' }, { href: '/enzymes', label: '酵素' }, { href: '/gut-health', label: '腸内環境' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* ヒスタミン不耐症 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「ヒスタミン不耐症」をどう見るか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ワインやチーズ、発酵食品を食べると<strong>頭痛・顔のほてり・鼻づまり・じんましん・お腹の不調・動悸</strong>が出る——こうした症状を、<strong>「ヒスタミン不耐症（ヒスタミン不耐性）」</strong>と呼ぶことがあります。体に入る／放出されるヒスタミンの量に対して、<strong>分解する力（主にDAO）が追いつかない</strong>状態、という考え方です<sup className="text-[#FF9855] font-bold">[2]</sup>。
                        {'\n\n'}
                        ただし、これは<strong>まだ研究の途上にある概念</strong>で、はっきりした診断基準や検査が確立しているわけではありません。症状が幅広く、ほかの病気（本物の食物アレルギー、肥満細胞の病気、過敏性腸症候群など）と見分けがつきにくいのも事実です。<strong>「これだ」と自己判断で決めつけない</strong>ことが大切です。
                    </p>
                </section>

                {/* 食べ物の視点 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">食べ物とヒスタミン</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">食品中のヒスタミンは、<strong>時間・発酵・熟成・鮮度の低下</strong>とともに増えます。多く含む／放出を促すとされる代表例です（量や反応には大きな個人差があります）。</p>
                    <div className="space-y-3">
                        {[
                            { head: '熟成・発酵食品', body: '熟成チーズ、発酵大豆食品、ザワークラウト、味噌・醤油など。発酵・熟成の過程でヒスタミンが増えやすい。' },
                            { head: 'アルコール（とくに赤ワイン）', body: 'お酒自体がヒスタミンを含み、さらに分解（DAO）を妨げるとされる。赤ワインは典型例。' },
                            { head: '加工肉・鮮度の落ちた魚', body: 'ハム・ソーセージなどの加工肉や、時間の経った魚。とくに魚は要注意（下記）。' },
                            { head: '一部の野菜・その他', body: 'トマト・なす・ほうれん草、酢の物など。柑橘などヒスタミンの放出を促すとされる食品もある。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 rounded-2xl p-5 border-2" style={{ background: '#FBE3DC', borderColor: '#C0392B55' }}>
                        <div className="font-bold mb-1 text-[#1A1A1A]">🐟 「ヒスタミン食中毒」は、鮮度が命</div>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            マグロ・カツオ・サバ・イワシなどの赤身魚は、常温に置くと細菌の働きで<strong>ヒスタミンが大量に作られ</strong>、食べると食中毒（顔の紅潮・じんましん・頭痛など）を起こします。やっかいなのは、<strong>一度できたヒスタミンは加熱しても壊れない</strong>こと。買ったらすぐ冷蔵・冷凍し、常温で放置しないことが何よりの予防です<sup className="text-[#FF9855] font-bold">[4]</sup>。
                        </p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/caution-foods', label: '気をつけたい食品' }, { href: '/foods', label: '食べ物' }, { href: '/gut-health', label: '腸内環境' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* まず確かめたいこと */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">自己判断の前に、確かめたいこと</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ネットの情報をもとに「自分はヒスタミン不耐症だ」と決めて、<strong>食品を次々に除去していくのは要注意</strong>です。除去がいきすぎると、栄養が偏ったり、食べること自体がストレスになったりします。
                        {'\n\n'}
                        症状がくり返す・つらいときは、まず<strong>本物の食物アレルギーや、ほかの病気でないか</strong>を医療機関（アレルギー科・内科）で確かめるのが先です。そのうえで食事を調整するなら、<strong>自己流の極端な除去ではなく、専門家と一緒に</strong>進めるのが安全です。Mitoflow40 は<strong>診断も治療もしません</strong>が、「分解を支える栄養」「腸を整える」といった<strong>土台づくり</strong>の視点で、その手前に立ちます。
                    </p>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-10 p-4 bg-white/60 rounded-lg border" style={{ borderColor: '#C0392B33', background: '#FBE3DC55' }}>
                    ※ 本記事は一般的・教育的な情報であり、診断・治療に代わるものではありません。アレルギーやヒスタミン不耐症が疑われる症状、くり返す不調があるときは、自己判断での食品除去やサプリの前に、必ず医療機関にご相談ください。アナフィラキシーを疑うサインがあるときは、ただちに救急へ。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://www.msdmanuals.com/home/immune-disorders/allergic-reactions-and-other-hypersensitivity-disorders/overview-of-allergic-reactions" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Overview of Allergic Reactions（ヒスタミンとアレルギー反応のしくみ）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — MSD Manual 家庭版</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[2]</span>
                            <a href="https://academic.oup.com/ajcn/article/85/5/1185/4633007" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Histamine and histamine intolerance（ヒスタミンとヒスタミン不耐症・DAO/HNMTの総説）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Maintz &amp; Novak, Am J Clin Nutr（2007）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[3]</span>
                            <a href="https://medlineplus.gov/ency/article/000844.htm" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Allergic reactions（抗ヒスタミン薬と眠気を含むアレルギーの基礎）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — MedlinePlus（米国国立医学図書館）</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[4]</span>
                            <a href="https://www.maff.go.jp/j/syouan/seisaku/foodpoisoning/f_encyclopedia/histamine.html" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                ヒスタミンによる食中毒（鮮度・加熱で壊れない点・予防）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — 農林水産省</span>
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
