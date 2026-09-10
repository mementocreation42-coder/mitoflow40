import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { foods } from '@/lib/foods';

export const metadata = {
    title: 'スパイスの歴史と現在 ｜ 薬から食卓へ。効能の期待と、確かめられていること | Mitoflow40',
    description: '胡椒は金と同じ重さで取引され、生姜と桂皮は漢方の生薬になり、ターメリックはアーユルヴェーダの薬でした。スパイスが「薬」だった歴史から、現代の研究で確かめられていること・まだ言えないことまでを分けて整理し、40代の台所での使い方に落とします。',
    alternates: { canonical: 'https://mitoflow40.com/spices' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: 'スパイスの歴史と現在 | Mitoflow40',
        description: '薬から食卓へ。スパイスの効能の期待と、確かめられていることを分けて整理。',
        url: 'https://mitoflow40.com/spices',
        type: 'article',
    },
};

const history = [
    { era: '紀元前', title: '薬としての始まり', note: 'エジプトではクミンやシナモンが防腐と薬に、インドのアーユルヴェーダではターメリックや生姜が処方に。中国の医学書『神農本草経』には生姜・桂皮・山椒が生薬として載る。' },
    { era: '古代ローマ', title: '胡椒は金と並ぶ', note: 'インドから運ばれた黒胡椒はローマで金と並ぶ価値を持ち、大プリニウスは「ただ辛いだけのものに大金を払う」と嘆いた。' },
    { era: '中世ヨーロッパ', title: '富と薬の象徴', note: '胡椒が家賃や持参金に使われ、香辛料は「体液のバランスを整える薬」として医師が処方した。ペストの時代には香りが病を遠ざけると信じられた。' },
    { era: '15〜17世紀', title: '大航海時代', note: 'コロンブス、ヴァスコ・ダ・ガマ、マゼラン。航海の目的の第一は香辛料だった。唐辛子はコロンブス以後わずか数十年でアジア全域の食文化を塗り替える。' },
    { era: '19〜20世紀', title: '薬から調味料へ', note: '化学が有効成分を取り出し、薬は合成されるようになる。スパイスは「薬」の座を降り、「香りと味」の調味料になった。' },
    { era: '現代', title: '「効能」の再発見', note: 'クルクミン・カプサイシン・ジンゲロールが研究対象になり、「スパイスは体に効く」という期待が再び広がる。ただし研究の多くは高用量の抽出物で行われている。' },
];

const evidence = [
    { head: '生姜と吐き気', body: '妊娠中のつわり、乗り物酔い、抗がん剤治療にともなう吐き気を和らげることは、複数の臨床試験で確かめられている。スパイスのなかで最も根拠が厚い。' },
    { head: '山椒と腸の動き', body: '山椒を主成分とする漢方薬（大建中湯）は、腹部手術後の腸の動きを助ける目的で医療の現場でも使われる。' },
    { head: '減塩・減糖の助け', body: '香りと辛味があると薄味でも満足しやすい。「塩と砂糖を減らせる」ことは、どのスパイスにも共通する、地味だが確かな働き。' },
    { head: '吸収を変える黒胡椒', body: 'ピペリンがクルクミンなどの代謝を遅らせ、血中濃度を上げることが示されている。台所の組み合わせに理由があった。' },
    { head: 'カプサイシンの貼り薬', body: '皮膚に塗るカプサイシンは関節や神経の痛みに医療で使われる。痛みの信号を鈍らせる働きは確か。' },
];

const neutral = [
    { head: 'ターメリックで炎症が消える？', body: 'クルクミンの抗炎症作用は細胞・動物では繰り返し示されているが、腸からほとんど吸収されない。ヒトでの結果は高用量の抽出物や吸収を高めた製剤によるもので、料理の量で同じことは起きない。' },
    { head: 'シナモンで血糖が下がる？', body: '空腹時血糖がわずかに下がった報告はあるが、研究の質はまちまちで効果は小さい。安価なカッシア種はクマリンを多く含み、毎日小さじ1杯以上は肝臓への負担が懸念される。' },
    { head: '唐辛子で脂肪が燃える？', body: 'カプサイシンで消費エネルギーは増えるが、1日数十kcal程度。体重を変える力はない。' },
    { head: '生姜で代謝が上がって痩せる？', body: '体温のわずかな上昇を大きく言いすぎたもの。効果は穏やかで、量も少ない。' },
    { head: 'スパイスのサプリメント', body: '高用量の抽出物は薬の代謝に影響したり（ピペリン）、胆石や出血傾向のある人に向かなかったり（クルクミン）する。「食べ物として使う量」と「サプリの量」は別の話。' },
];

const cautions = [
    { head: 'カビ毒と重金属', body: '乾燥した輸入スパイスは、カビ毒（アフラトキシンなど）や鉛の混入が報告された例がある。信頼できる産地・製造者のものを、少量ずつ買って早めに使い切る。' },
    { head: '胃腸への刺激', body: '唐辛子・黒胡椒・生姜は胃粘膜を刺激する。胃炎・逆流・痔のある方は控えめに。空腹時の大量摂取は避ける。' },
    { head: '薬との相互作用', body: '生姜・ターメリック・シナモンは血液をさらさらにする薬（ワルファリンなど）の作用を強めることがある。大量に摂る前に主治医へ。' },
    { head: '妊娠中', body: '料理の量なら問題ないとされるが、山椒・シナモンの多量摂取や高用量サプリは避ける。' },
];

export default function SpicesPage() {
    const spices = foods.filter((f) => f.category === 'スパイス・ハーブ');
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F6E9CF' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'スパイスの歴史と現在', description: '薬から食卓へ。スパイスの効能の期待と、確かめられていることを分けて整理。', path: '/spices' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '食べ物', path: '/foods' }, { name: 'スパイスの歴史と現在', path: '/spices' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '食べ物', href: '/foods' }, { name: 'スパイスの歴史と現在' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>SPICES</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        SPICES
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>スパイスの歴史と現在</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        スパイスはかつて<strong>薬</strong>でした。いま再び「効く」と語られています。歴史をたどり、<strong>確かめられていること</strong>と<strong>まだ言えないこと</strong>を分けて、台所での使い方に落とします。
                    </p>
                </header>

                {/* スパイスとは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">スパイスは「少量で強く香る植物」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        スパイスとは、植物の<strong>種子・実・樹皮・根・葉</strong>のうち、少量で強い香りや辛味を持つものの総称です。植物がつくる香りや辛味は、本来は虫や動物から身を守るための化学物質。人はそれを、食べ物の保存・臭み消し・薬として使ってきました。
                        {'\n\n'}
                        ここに、スパイスを考えるときの出発点があります。<strong>効くほど強い成分を持つが、使う量はごく少ない</strong>。だからスパイスは「食べ物」と「薬」のちょうど境目にいます。料理に使う量では効果は穏やかで、効果を出すほど摂れば刺激や副作用が出る。この距離感を忘れると、「効能」の話は簡単に行きすぎます。
                    </p>
                </section>

                {/* 歴史 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">薬だった時代、調味料になった時代</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">スパイスが「体に効く」という感覚は、新しいものではありません。むしろ人類史のほとんどの期間、スパイスは薬でした。</p>
                    <div className="bg-white/70 rounded-2xl border border-black overflow-hidden mb-4">
                        {history.map((h, i) => (
                            <div key={h.title} className={`px-5 py-4 ${i !== 0 ? 'border-t border-[#1A1A1A]/10' : ''}`}>
                                <div className="flex items-baseline justify-between mb-0.5">
                                    <span className="font-bold text-[#1A1A1A]">{h.title}</span>
                                    <span className="text-xs font-bold text-[#1A1A1A]/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{h.era}</span>
                                </div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{h.note}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-loose">
                        つまり現代の「スパイスの効能」ブームは、<strong>薬だった時代の記憶が、研究という新しい言葉で戻ってきたもの</strong>です。記憶は正しい部分もあれば、大きく言いすぎている部分もあります。次に、その仕分けをします。
                    </p>
                </section>

                {/* 確かなこと */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <div className="inline-block text-[10px] font-bold tracking-widest text-white bg-[#41C9B4] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>EVIDENCE ／ 比較的確かなこと</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">研究の積み重ねがあること</h2>
                    <div className="space-y-3">
                        {evidence.map((s) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 未確立 */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#F3EFD6' }}>
                    <div className="inline-block text-[10px] font-bold tracking-widest text-[#1A1A1A] bg-[#FFD37A] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NEUTRAL ／ 根拠は未確立・言いすぎ</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">よく聞くけれど、そのままは言えないこと</h2>
                    <div className="space-y-3">
                        {neutral.map((s) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-white/60 mt-4">
                        <p className="text-sm text-[#1A1A1A]/85 leading-relaxed"><strong>Mitoflow40の立場：</strong>スパイスは薬ではなく食べ物です。「効能」より「働き」と呼び、料理の量で期待できることを正直に書きます。確かなのは、塩と砂糖を減らし、消化を助け、食事を楽しくすること。それだけでも十分に価値があります。</p>
                    </div>
                </section>

                {/* 8つのスパイス */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">台所で使う 8 つのスパイス</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">それぞれの歴史・確かめられていること・使い方を 1 枚ずつ。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {spices.map((f) => (
                            <Link key={f.slug} href={`/foods/${f.slug}`} className="flex items-start gap-3 p-4 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all" style={{ background: f.color }}>
                                <span className="text-2xl" aria-hidden>{f.emoji}</span>
                                <span>
                                    <span className="block font-bold text-[#1A1A1A]">{f.name}</span>
                                    <span className="block text-xs text-[#4A4A4A] leading-snug mt-0.5">{f.tagline}</span>
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 注意 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">気をつけたいこと</h2>
                    <div className="space-y-3">
                        {cautions.map((s) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 暮らしへ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">暮らしへの、やさしい取り入れ方</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">効くスパイスを探すより、塩と砂糖の代わりに香りを使う。それが 40 代の台所でいちばん確かな使い方です。</p>
                    <div className="space-y-3">
                        {[
                            { head: '塩を減らす代わりに黒胡椒・山椒・唐辛子', body: '香りと辛味があると薄味でも満足しやすい。まず「塩をひとつまみ減らして、香りをひとふり足す」から。' },
                            { head: '砂糖を減らす代わりにシナモン', body: 'コーヒー・ヨーグルト・煮込みに。甘い香りが甘さの記憶を補う。毎日使うならセイロン種を。' },
                            { head: '冷えと胃の重さに生姜・山椒', body: '味噌汁やスープにすりおろし生姜。冷えによる腹の張りには山椒。どちらも量は少なめに、毎日。' },
                            { head: 'ターメリックは油と胡椒と一緒に', body: '単独で摂っても吸収されにくい。カレーやスープで、油・黒胡椒・野菜と組み合わせて使う。' },
                            { head: '少量ずつ買って、早めに使い切る', body: '香りは飛び、カビ毒のリスクは古いほど増える。粒や種子で買って挽きたてを使うのがいちばん。' },
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

                {/* あわせて読む */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/foods', label: '食べ物' },
                            { href: '/nutrition-history', label: '栄養学の歴史' },
                            { href: '/food-journey', label: '食べてから、動くまで' },
                            { href: '/caution-foods', label: '気をつけたい食品' },
                            { href: '/blood-sugar', label: '血糖コントロール' },
                            { href: '/gut-troubles', label: '胃腸の不調' },
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
