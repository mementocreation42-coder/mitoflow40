import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'スピリチュアリティと体 ｜ 心身相関の科学 | Mitoflow40',
    description: '祈り・瞑想・感謝・人とのつながり・生きる意味——いわゆる「スピリチュアル」とされる営みを、自律神経・ストレスホルモン・炎症・プラセボといった“測れる体の反応”の視点で、40代の健康最適化のために中立に読み解きます。',
    alternates: { canonical: 'https://mitoflow40.com/spirituality' },
    openGraph: {
        title: 'スピリチュアリティと体 ｜ 心身相関の科学 | Mitoflow40',
        description: '祈り・瞑想・感謝・つながり・生きる意味を、自律神経やストレス反応など測れる体の反応として読み解く。',
        url: 'https://mitoflow40.com/spirituality',
        type: 'article',
    },
};

// 測れる体の反応として読み解くテーマ
const topics = [
    {
        head: '瞑想・マインドフルネス',
        body: '呼吸に意識を向ける瞑想は、副交感神経を優位にし、心拍変動（HRV）を高めることが多くの研究で示されています。ストレス反応のスイッチを手動で切り替える、もっとも身近な実践です。',
    },
    {
        head: '感謝・前向きな心の習慣',
        body: '「ありがたい」と感じる習慣は、睡眠の質や気分の安定と関連が報告されています。感謝を書き出すだけでも、ストレスホルモンの負担がやわらぐ可能性が研究で示唆されています。',
    },
    {
        head: '人とのつながり',
        body: '孤独は喫煙に匹敵するほど健康リスクを高める、という研究があります。逆に、安心できる人間関係は炎症をしずめ、長生きと関連することが報告されています。つながりは“栄養”の一種です。',
    },
    {
        head: '生きる意味・目的（いきがい）',
        body: '「人生に目的がある」と感じている人ほど、死亡リスクや認知機能の低下が少ないという追跡研究があります。意味の感覚は、体の回復力にまで影響しうると考えられています。',
    },
    {
        head: '自然とのふれあい',
        body: '森の中で過ごす「森林浴」は、ストレスホルモンの低下や免疫の指標の改善と関連すると報告されています。畏敬の念（awe）を感じる体験も、炎症の軽減と結びつくという研究があります。',
    },
    {
        head: '信じる力（プラセボ）',
        body: '「効くと信じる」だけで体が実際に反応するプラセボ効果は、心が体を動かす確かな証拠です。逆に不安が不調を生むノセボ効果もあり、心の状態は無視できない生理的な力を持ちます。',
    },
];

export default function SpiritualityPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#ECE5F4' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'スピリチュアリティと体 ― 心身相関の科学', description: '祈り・瞑想・感謝・つながり・生きる意味を、自律神経やストレス反応など測れる体の反応として読み解く。', path: '/spirituality' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: 'スピリチュアリティと体', path: '/spirituality' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: 'スピリチュアリティと体' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        MIND &amp; SPIRIT
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        SPIRITUALITY &amp; HEALTH
                        <span className="block text-2xl md:text-3xl mt-3 text-[#1A1A1A]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>スピリチュアリティと体</span>
                        <span className="block text-sm md:text-base mt-2 text-[#1A1A1A]/60" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>心身相関の科学</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        祈り・瞑想・感謝・つながり。古くから大切にされてきた営みを、「自律神経やホルモンなど、測れる体の反応」という視点で、中立に読み解きます。
                    </p>
                </header>

                {/* はじめに */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「心」と「体」は、別々ではない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        Mitoflow40は、血液検査や栄養といった<strong>「測れるもの」</strong>を大切にするメディアです。だからこそ、いわゆる「スピリチュアル」な話題も、雰囲気や信念ではなく、<strong>体に起きる反応として読み解きたい</strong>と考えています。
                        {'\n\n'}
                        実際、緊張すると心臓がドキドキし、安心するとお腹がゆるむように、<strong>心の状態は、自律神経やホルモンを通じて、確かに体を動かしています</strong>。これを「心身相関（しんしんそうかん）」と呼びます。祈りや瞑想、感謝、人とのつながりが体に良いとされるのは、神秘ではなく——<strong>ストレス反応がしずまり、回復のスイッチが入る</strong>という、生理的なしくみで説明できる部分が多くあります。
                        {'\n\n'}
                        このページでは、特定の宗教や信仰をすすめるのではなく、<strong>「心の習慣が、体にどう働きかけるのか」</strong>を中立的に整理します。効果には個人差があり、研究が続いている領域も多いので、断定ではなく「そういう関連が見えてきている」という距離感で読んでください。
                    </p>
                </section>

                {/* 自律神経というブリッジ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">心と体をつなぐ“配線”——自律神経</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        心が体に届く、いちばん太い“配線”が<strong>自律神経</strong>です。活動・緊張モードの<strong>交感神経</strong>と、休息・回復モードの<strong>副交感神経</strong>がシーソーのようにバランスを取り、心拍・呼吸・消化・血圧などを無意識に調整しています。
                        {'\n\n'}
                        慢性的なストレスは交感神経に偏らせ、ストレスホルモン（コルチゾール）を出しっぱなしにし、血糖や炎症、睡眠を乱します。一方、ゆっくりした呼吸や瞑想、安心できるつながりは<strong>副交感神経のスイッチ</strong>を入れ、体を回復側へ傾けます。「祈ると落ち着く」「瞑想で頭が静かになる」という実感は、この切り替えが起きているサインです。スピリチュアルな営みの多くは、結局<strong>この自律神経のバランスを整える方向に働く</strong>——そう捉えると、科学とつながって見えてきます。
                    </p>
                </section>

                {/* テーマ別 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-5 text-center">測れる反応として読み解く</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {topics.map((t) => (
                            <div key={t.head} className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                                <h3 className="text-base md:text-lg font-bold text-[#1A1A1A] mb-2">{t.head}</h3>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{t.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 人気のウェルネスと「よくわからなさ」 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">サウナ・よもぎ蒸し・アクセスバーズ…「効果がよくわからない」とどう付き合う？</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mb-5">
                        サウナ、よもぎ蒸し、アクセスバーズ……心地よくて、つい「体に効いている気がする」体験型のウェルネスはたくさんあります。正直にお伝えすると、これらは<strong>「リラックス効果はかなり本物。でも“デトックス”や“毒出し”といった具体的な効能は、根拠がまちまち（あるいは、はっきりしない）」</strong>というのが今のところの見方です。
                        {'\n\n'}
                        大事なのは、その<strong>二つを切り分ける</strong>こと。温かさ・静けさ・「自分を大切にする時間」そのものは、副交感神経を優位にし、ストレスをやわらげる——これは心身相関で説明できる確かな価値です。一方で、「○○が排出される」「ホルモンが整う」といった<strong>具体的なメカニズムの主張は、研究で確かめられていないものが多い</strong>。ここを混同しないことが、上手な付き合い方の入口です。
                    </p>
                    <div className="grid gap-4">
                        {[
                            {
                                level: 'リラックス効果は本物寄り',
                                levelColor: '#41C9B4',
                                note: '温熱・香り・触れられる心地よさが、副交感神経を通じてストレスをやわらげる。説明のつく価値があります。',
                                items: [
                                    { name: 'サウナ', desc: '温熱→外気浴の「ととのう」は自律神経で説明可。大規模な追跡研究で心血管リスクの低さとの関連も（観察研究のため因果は断定不可）。脱水・飲酒後に注意。' },
                                    { name: 'アロマテラピー', desc: '香りはダイレクトに脳へ届く。ラベンダー等で睡眠・不安がやわらぐ小規模な研究あり。原液の肌トラブル・猫など動物への毒性に注意。' },
                                    { name: '岩盤浴・温活', desc: 'サウナと同じく「温める＋休む」。冷えやこわばりがゆるむ心地よさは確か。水分補給を忘れずに。' },
                                    { name: 'リフレクソロジー・足つぼ・マッサージ', desc: '「触れられる・ほぐれる」こと自体がリラックスを生む。「内臓に効く」等の反射区の主張は根拠が弱いが、休息としての価値は十分。' },
                                ],
                            },
                            {
                                level: '心地よいが、効能の根拠は乏しい',
                                levelColor: '#FF9855',
                                note: '温め・巡り・スッキリ感はあっても、「老廃物が出る」「毒を排出」といった具体的なメカニズムは裏づけが乏しいもの。',
                                items: [
                                    { name: 'よもぎ蒸し', desc: '下半身を温める心地よさは理解できるが、「デトックス」「生理や更年期の不調が和らぐ」といった効能は質の高い研究での裏づけが乏しい。低温やけど・脱水に注意、妊娠中は医師に相談。' },
                                    { name: 'リンパマッサージ・腸もみ', desc: 'むくみがすっきりする実感はあるが、「老廃物・毒素の排出」という説明は誇張されがち。強すぎる施術はあざ・痛みのもとに。' },
                                    { name: 'カッピング（吸い玉）', desc: '血行や軽い凝りへの一時的な心地よさの報告はあるが、効果は限定的。あとが残る・内出血することがある。' },
                                    { name: 'ハーブピーリング／デトックスティー・白湯', desc: 'スッキリ感・肌の調子の実感はあるが、「毒出し」効果の根拠は弱い。下剤成分入りのお茶は使いすぎ注意。' },
                                ],
                            },
                            {
                                level: '科学的根拠はほぼない',
                                levelColor: '#9AA0A6',
                                note: 'リラックス体験としての価値はあっても、うたわれる効果を裏づける確かな科学的根拠は、現時点でほぼ見当たらないもの。',
                                items: [
                                    { name: 'アクセスバーズ', desc: '頭にそっと触れる施術。深い脱力を感じる人もいるが効果の根拠はほぼなし。「触れられて安心」「何もしない時間」という休息として。' },
                                    { name: 'レイキ・ヒーリング・気功系', desc: '「気・エネルギーを送る」という主張に客観的な裏づけはない。静かに横たわる時間がリラックスを生む面はある。' },
                                    { name: 'パワーストーン・クリスタル', desc: '身につけて気分が上がる・お守りになる、という心理的な効果まで。石そのものの物理的な作用は確認されていない。' },
                                    { name: 'アーシング（裸足で地面に触れる）／水素水／フラワーエッセンス', desc: 'いずれも効果の主張に確かな根拠は乏しい。外で過ごす・水を飲む習慣そのものの心地よさはあるが、特別な作用は期待しすぎないこと。' },
                                ],
                            },
                        ].map((tier) => (
                            <div key={tier.level} className="bg-white/60 rounded-xl p-4 md:p-5 border border-black/30">
                                <div className="flex items-center gap-2 flex-wrap mb-2">
                                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: tier.levelColor }}>{tier.level}</span>
                                </div>
                                <p className="text-xs text-[#4A4A4A]/80 leading-relaxed mb-3">{tier.note}</p>
                                <ul className="space-y-2">
                                    {tier.items.map((it) => (
                                        <li key={it.name} className="text-sm leading-relaxed">
                                            <span className="font-bold text-[#1A1A1A]">{it.name}</span>
                                            <span className="text-[#4A4A4A]"> — {it.desc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* 要注意系 */}
                        <div className="rounded-xl p-4 md:p-5 border-2" style={{ borderColor: '#C0504D', background: '#FBEDEC' }}>
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#C0504D' }}>要注意 — 体への害・医療を遠ざける危険</span>
                            </div>
                            <p className="text-xs text-[#4A4A4A] leading-relaxed mb-3">
                                「効果がない」だけでなく、<strong>健康被害や、必要な治療を遅らせるリスク</strong>が指摘されているもの。リラクゼーションとして楽しむ範囲を超えるので、特に慎重に。
                            </p>
                            <ul className="space-y-2">
                                <li className="text-sm leading-relaxed">
                                    <span className="font-bold text-[#1A1A1A]">ホメオパシー</span>
                                    <span className="text-[#4A4A4A]"> — 成分がほぼ残らないほど薄めた「レメディ」。効果は通常の医療を超えないという科学的な合意があり、これに頼って標準治療を遠ざけることが世界的に問題視されています。</span>
                                </li>
                                <li className="text-sm leading-relaxed">
                                    <span className="font-bold text-[#1A1A1A]">腸内洗浄・コーヒー浣腸</span>
                                    <span className="text-[#4A4A4A]"> — 「宿便・毒素を出す」とされますが、腸はもともと自浄作用を持ちます。電解質の乱れ・腸への傷・感染などの健康被害が報告されており、安易な実施は避けるべきです。</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        つまり——<strong>「気持ちよかった」「ホッとした」で十分</strong>なのです。それ自体が体を回復側へ傾ける、立派な効果。問題になるのは、確かめられていない効能を信じて<strong>高いお金を払い続けたり、必要な医療を後回しにしたりする</strong>ときだけ。「効くか・効かないか」の白黒よりも、<strong>自分が心地よいか、無理なく続けられるか</strong>を物差しにすると、上手に楽しめます。
                    </p>
                </section>

                {/* 根拠と体感は別 */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border-2" style={{ borderColor: '#41C9B4', background: '#EAF6F3' }}>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「根拠がない」と「あなたに効かない」は、別の話</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ここまで「科学的根拠は乏しい」と何度も書いてきました。でも、誤解しないでほしいことがあります。<strong>科学的根拠がない＝あなたにとって意味がない、ではありません</strong>。
                        {'\n\n'}
                        科学が見ているのは、たくさんの人を集めたときの<strong>「平均」</strong>です。「集団で見ると差が出なかった」ことと、「<strong>その日のあなたが、確かに軽くなった・ホッとした</strong>」ことは、まったく別のレイヤーの話。あなたの体で起きた変化は、平均に埋もれても、あなたにとっては紛れもない事実です。精密栄養学が大切にする<strong>「みんなの平均ではなく、あなたの最適」</strong>という視点は、ここにもつながっています。
                        {'\n\n'}
                        だからこそ大事なのは、効くか効かないかを誰かに決めてもらうことではなく、<strong>自分で知り、感じ、理解し、「体感値」として持つ</strong>ことです。やってみて、体がどう反応したかを観察する。気分・睡眠・お腹の調子・こわばり——自分だけが分かる小さな変化に耳をすませる。その積み重ねが、<strong>自分の体という、世界にひとつだけの“データ”</strong>になります。
                        {'\n\n'}
                        科学は「世の中の確からしさ」を測る、共有のものさし。体感は「自分にとっての確からしさ」を測る、あなただけのものさし。<strong>この二つは、どちらかが正しいのではなく、両方を持つことが強い</strong>のです。エビデンスを冷静に踏まえながら、自分の体感も信じる——その両刀づかいこそ、情報に振り回されない大人の付き合い方だと、私たちは考えています。
                    </p>
                </section>

                {/* 距離感 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">大切にしたい“距離感”</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        心の習慣が体を支えるのは確かですが、<strong>「気持ちさえあれば病気が治る」わけではありません</strong>。瞑想や感謝は、栄養・睡眠・運動・必要な医療と<strong>並んで効く“土台のひとつ”</strong>であって、それらの代わりにはなりません。
                        {'\n\n'}
                        とくに、高額な商品やサービスで「これだけで治る」とうたうものには注意が必要です。Mitoflow40がおすすめするのは、<strong>お金をかけずに今日から試せる、呼吸・感謝・つながり・自然</strong>といったシンプルな習慣です。自分にとって心地よいかどうかを基準に、生活へそっと取り入れてみてください。
                    </p>
                </section>

                {/* 注意書き */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <p className="text-xs text-[#4A4A4A]/80 leading-relaxed">
                        ※ このページは、心と体のつながり（心身相関）に関する一般的な解説です。特定の宗教・信仰・スピリチュアルな商品やサービスを推奨・否定するものではなく、医療行為や診断・治療に代わるものでもありません。心身の不調が続く場合は、医療機関にご相談ください。
                    </p>
                </section>

                {/* もっと深く知る */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">あわせて読む</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                        「心を、体から整える」視点でつながるページ。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/mindfulness', label: 'マインドフルネス・呼吸' },
                            { href: '/autonomic-nervous-system', label: '自律神経' },
                            { href: '/stress', label: 'ストレスとは' },
                            { href: '/gut-brain', label: '腸脳相関' },
                            { href: '/sleep', label: '睡眠' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
                    </div>
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
