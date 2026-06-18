import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '片頭痛と体 ｜ 引き金・栄養・受診の目安を中立に | Mitoflow40',
    description: '片頭痛は「ただの頭痛」ではなく、脳とエネルギー代謝が深く関わる神経の不調です。引き金（トリガー）の見つけ方、マグネシウム・ビタミンB2・CoQ10といった栄養の視点、そして「すぐ受診すべき危険な頭痛」の見分け方までを、出典つきで中立に解説します。診断・治療は医療機関で。',
    alternates: { canonical: 'https://mitoflow40.com/migraine' },
    openGraph: {
        title: '片頭痛と体 ｜ Mitoflow40',
        description: '片頭痛の引き金・栄養（Mg・B2・CoQ10）の視点・危険な頭痛の見分け方を中立に。',
        url: 'https://mitoflow40.com/migraine',
        type: 'article',
    },
};

export default function MigrainePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E9E3EF' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '片頭痛と体', description: '片頭痛の引き金・栄養（Mg・B2・CoQ10）の視点・危険な頭痛の見分け方を中立に。', path: '/migraine' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '心とからだ', path: '/library#mind' }, { name: '片頭痛と体', path: '/migraine' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '心とからだ', href: '/library#mind' }, { name: '片頭痛と体' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MIND &amp; BODY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        MIGRAINE
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>片頭痛と体</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[580px] mx-auto">
                        ズキズキと脈打つ痛み、吐き気、光や音のつらさ——片頭痛は「ただの頭痛」ではなく、<strong>脳とエネルギー代謝</strong>が関わる神経の不調です。
                    </p>
                </header>

                {/* 危険な頭痛（最重要・先頭） */}
                <section className="mb-10 rounded-2xl p-6 md:p-7 border-2" style={{ background: '#FBE3DC', borderColor: '#C0392B' }}>
                    <h2 className="text-lg md:text-xl font-bold mb-3" style={{ color: '#C0392B' }}>⚠ こんな頭痛は、すぐに受診を</h2>
                    <p className="text-sm text-[#1A1A1A] mb-3 leading-relaxed">次のような頭痛は、片頭痛ではなく<strong>命に関わる病気のサイン</strong>のことがあります。ためらわず医療機関（救急）へ。</p>
                    <ul className="space-y-2 text-sm text-[#1A1A1A] leading-relaxed">
                        {[
                            '突然、バットで殴られたような「これまでで最悪」の激しい頭痛',
                            '手足の力が入らない・しびれ・ろれつが回らない・物が二重に見える',
                            '高熱や首の硬さ（うなじが曲げにくい）を伴う',
                            '頭を打ったあとの頭痛、けいれんや意識のもうろうを伴う',
                            '50歳を過ぎてから初めて出た頭痛、だんだん強く頻回になる頭痛',
                        ].map((t) => (
                            <li key={t} className="flex gap-2"><span style={{ color: '#C0392B' }} className="font-bold flex-shrink-0">●</span><span>{t}</span></li>
                        ))}
                    </ul>
                </section>

                {/* 片頭痛とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">片頭痛は「ただの頭痛」ではない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        片頭痛は、<strong>片側または両側がズキズキと脈打つように痛み</strong>、体を動かすと悪化し、しばしば<strong>吐き気・光や音への過敏</strong>を伴います。数時間〜2〜3日続くこともあり、女性に多いのが特徴です。一部の人は、痛みの前に<strong>ギザギザの光が見える「前兆（オーラ）」</strong>を経験します<sup className="text-[#FF9855] font-bold">[1]</sup>。
                        {'\n\n'}
                        単なる「疲れ頭痛」と違い、片頭痛は脳の神経と血管、そして<strong>エネルギー代謝</strong>が関わる現象だと考えられています。「気のせい」でも「我慢する根性の問題」でもありません。まずは<strong>引き金（トリガー）を知る</strong>こと、そして適切な診断・治療につなぐことが出発点です。
                    </p>
                </section>

                {/* しくみ：神経・血管・気圧 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">なぜ起きる？——神経・血管・気圧のしくみ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        片頭痛は、かつて「血管が広がって痛む病気」と説明されていました。いまは、<strong>神経の引き金と、血管の反応の両方</strong>が関わると考えられています（<strong>神経血管系</strong>）。神経が興奮し、それが血管の拡張・炎症を呼ぶ——その中心にあるのが<strong>三叉神経血管系</strong>です<sup className="text-[#FF9855] font-bold">[1]</sup>。
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { head: '① 神経が興奮する', body: 'ストレス・睡眠・空腹・気圧などの引き金で、脳の神経が過敏になり、興奮の波が広がる（前兆＝オーラのもとになる現象）。' },
                            { head: '② 血管がゆるみ、炎症が起きる', body: '三叉神経の先から「CGRP」という物質が放出され、脳をつつむ血管が広がり、まわりに炎症が起きる。この拍動が、あのズキズキとした痛みになる。' },
                            { head: '③ 痛みが増幅される', body: '一度始まると痛みの回路が過敏になり、光・音・においまでつらく感じる。近年の新しい予防薬・治療薬は、この「CGRP」を狙って効く。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        では<strong>低気圧・天気</strong>はどう関わるのでしょう。はっきりした仕組みはまだ研究中ですが、<strong>気圧の変化を「内耳」が感じ取り、自律神経のバランスが乱れる</strong>ことが、上の引き金になると考えられています（いわゆる「<strong>気象病・天気頭痛</strong>」）<sup className="text-[#FF9855] font-bold">[4]</sup>。台風や梅雨、季節の変わり目に頭痛が増える人が多いのは、このためとされています。気圧そのものは変えられませんが、<strong>気圧予報アプリで「来る日」を予測して備える</strong>、睡眠・水分・血糖を整えておく、といった対策はできます。
                    </p>
                </section>

                {/* トリガー */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">引き金（トリガー）を知る</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">トリガーは人それぞれ。<strong>頭痛ダイアリー</strong>で「何の後に起きたか」を記録すると、自分のパターンが見えてきます。</p>
                    <div className="space-y-3">
                        {[
                            { head: '睡眠の乱れ', body: '寝不足も寝すぎも引き金に。就寝・起床の時刻を一定に保つことが予防の土台。', href: '/sleep' },
                            { head: '空腹・血糖の乱高下・脱水', body: '食事を抜く、水分不足は典型的なトリガー。規則的な食事とこまめな水分を。', href: '/blood-sugar' },
                            { head: 'ストレスと、その「あと」', body: '緊張の最中だけでなく、ストレスが解けた週末などに起きる「週末頭痛」も知られる。', href: '/stress' },
                            { head: 'カフェイン・アルコール', body: 'カフェインは効くことも切らして痛むことも。赤ワインなどアルコールも引き金になりやすい。', href: '/caffeine' },
                            { head: 'ホルモンの変化', body: '月経前後のエストロゲン低下に伴う「月経関連片頭痛」がある。', href: '/hormones' },
                            { head: '低気圧・天気の変化（気象病）', body: '台風・梅雨・季節の変わり目など、気圧が下がるときに起きやすい。気圧予報で「来る日」を予測して備える。', href: '/circadian-rhythm' },
                            { head: '光・におい', body: 'まぶしい光・ちらつく画面、強いにおいも引き金になりやすい。', href: '/smell' },
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

                {/* ミトコンドリア・栄養の視点 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">ミトコンドリアと栄養の視点</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        近年の研究では、片頭痛の脳は<strong>エネルギー（ATP）をつくる効率がやや低下している</strong>のではないか、という「ミトコンドリアのエネルギー不足」仮説が注目されています。だからこそ、<strong>エネルギー代謝を支える栄養素</strong>が予防の研究対象になってきました<sup className="text-[#FF9855] font-bold">[2]</sup>。
                        {'\n\n'}
                        実際、海外の頭痛ガイドラインでは、いくつかの栄養素が<strong>片頭痛予防に有効な可能性がある</strong>とされています<sup className="text-[#FF9855] font-bold">[3]</sup>。
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { href: '/nutrients/magnesium', label: 'マグネシウム', note: '不足しがちなミネラル。予防に用いられることがある。緑の野菜・ナッツ・海藻などに多い。' },
                            { href: '/nutrients/b2', label: 'ビタミンB2（リボフラビン）', note: 'ミトコンドリアでエネルギーを作る補酵素。高用量が予防研究で使われてきた。' },
                            { href: '/nutrients/coq10', label: 'コエンザイムQ10', note: '電子伝達系で働く、エネルギー産生の要。予防に有効な可能性が報告されている。' },
                        ].map((n) => (
                            <Link key={n.href} href={n.href} className="group flex items-start gap-4 bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#FF9855] transition-colors">{n.label}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{n.note}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/70 mt-4 leading-relaxed p-3 rounded-lg" style={{ background: '#FBE3DC55', border: '1px solid #C0392B33' }}>
                        ※ これらは「効く可能性が研究されている」段階で、すべての人に効くわけではありません。予防に用いる量は食事で摂る量より多いことがあり、<strong>下痢などの副作用・薬との相互作用・妊娠中の注意</strong>もあります。サプリでの摂取は<strong>自己判断せず、必ず医師・薬剤師に相談</strong>してください。
                    </p>
                </section>

                {/* 研究でわかってきたこと */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">研究でわかってきたこと</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-5">
                        片頭痛は「気のせい」どころか、世界中で研究が進む<strong>れっきとした神経疾患</strong>です。近年わかってきた主なことを、出典つきで整理します。
                    </p>
                    <div className="space-y-3">
                        {[
                            { head: '世界で「最も生活に支障を与える病気」の上位', body: 'WHOによれば、片頭痛は世界でもっとも一般的な病気のひとつで、障害（生活への支障）の主要な原因とされています。とくに50歳未満の女性で負担が大きく、女性は男性のおよそ2〜3倍多いとされます。', ref: '5' },
                            { head: '前兆（オーラ）の正体は「脳を広がる波」', body: 'ギザギザの光などの前兆は、脳の表面をゆっくり伝わる神経活動の波（皮質拡延性抑制）によるものと考えられています。1940年代に発見され、いまは画像でも捉えられています。', ref: '2' },
                            { head: 'CGRPの発見が、治療を大きく変えた', body: '痛みに関わる物質「CGRP」を狙った予防薬・治療薬（抗体薬やジェパントなど）が2018年以降に登場し、片頭痛治療は新しい時代に入りました。', ref: '1' },
                            { head: '遺伝の影響は、思った以上に大きい', body: '一部にはひとつの遺伝子が原因の型（家族性片麻痺性片頭痛）があり、さらに大規模なゲノム研究で100を超える関連領域が見つかっています。「体質」には確かな遺伝的背景があります。', ref: '6' },
                            { head: '脳の「エネルギーの余裕」が少ない可能性', body: '画像研究では、片頭痛の脳はエネルギー（ATP）の余裕がやや少ないことを示すものがあり、これが代謝を支えるB2・CoQ10などの予防研究の根拠になっています。', ref: '2' },
                            { head: '低気圧が発作を増やすことを示す研究も', body: '気圧の低下が片頭痛発作を増やすことを示す研究があり、日本国内でも報告されています。「天気のせい」は気のせいではありません。', ref: '4' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}<sup className="text-[#FF9855] font-bold ml-0.5">[{s.ref}]</sup></div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 土台 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">まず整えたい、土台</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        薬の前にできることも多くあります。<strong>睡眠と食事の時間を一定に保つ</strong>、空腹をつくりすぎない、こまめに水分をとる、自分のトリガーを避ける、適度な有酸素運動を続ける——こうした<strong>規則正しさ</strong>そのものが、片頭痛の頻度を下げる土台になります。
                        {'\n\n'}
                        逆に注意したいのが<strong>「薬の使いすぎによる頭痛（薬物乱用頭痛）」</strong>です。市販の痛み止めを月に10〜15日以上のむ状態が続くと、かえって頭痛が慢性化することがあります<sup className="text-[#FF9855] font-bold">[1]</sup>。痛みの回数が多いときは、我慢や市販薬の常用ではなく、<strong>頭痛外来や脳神経内科で相談</strong>するのが近道です。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/sleep', label: '睡眠' }, { href: '/blood-sugar', label: '血糖' }, { href: '/mitochondria', label: 'ミトコンドリア' }, { href: '/autonomic-nervous-system', label: '自律神経' }, { href: '/exercise', label: '運動' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-10 p-4 bg-white/60 rounded-lg border" style={{ borderColor: '#C0392B33', background: '#FBE3DC55' }}>
                    ※ 本記事は一般的・教育的な情報であり、診断・治療に代わるものではありません。片頭痛には有効な治療薬（予防薬・発作時の薬）があります。頭痛が続く・強い・くり返す場合や、上記の「危険な頭痛」に当てはまる場合は、必ず医療機関を受診してください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://americanmigrainefoundation.org/resource-library/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Resource Library（片頭痛の症状・前兆・薬物乱用頭痛など）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — American Migraine Foundation</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[2]</span>
                            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8533683/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Mitochondrial dysfunction and migraine（片頭痛とミトコンドリアの関係に関する総説）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — PMC / 査読論文</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[3]</span>
                            <a href="https://americanmigrainefoundation.org/resource-library/magnesium-riboflavin-and-coq10/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Magnesium, Riboflavin and CoQ10（栄養素による片頭痛予防の解説）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — American Migraine Foundation</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[4]</span>
                            <a href="https://americanmigrainefoundation.org/resource-library/weather-and-migraine/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Weather and Migraine（天候・気圧と片頭痛の関係）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — American Migraine Foundation</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[5]</span>
                            <a href="https://www.who.int/news-room/fact-sheets/detail/migraine-and-other-headache-disorders" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Migraine and other headache disorders（有病率・障害負担・男女差）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — World Health Organization</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[6]</span>
                            <a href="https://www.nature.com/articles/s41588-021-00990-0" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Genome-wide analysis identifies 123 risk loci for migraine（片頭痛の遺伝的背景）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Nature Genetics（2022）</span>
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
