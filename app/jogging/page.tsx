import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'ジョギングと体 ｜ 効果・「膝に悪い」の真偽・走る量を中立に | Mitoflow40',
    description: 'ジョギングは体に何を起こすのか。ミトコンドリア・心肺・メンタルへの効果、「膝に悪い」という通説の真偽、そして「どれだけ走ればいいか」の用量反応（U字の関係）まで——走るという最も原始的な運動を、出典つきで中立に読み解きます。',
    alternates: { canonical: 'https://mitoflow40.com/jogging' },
    openGraph: {
        title: 'ジョギングと体 ｜ Mitoflow40',
        description: 'ジョギングの効果・「膝に悪い」の真偽・最適な走る量を、出典つきで中立に。',
        url: 'https://mitoflow40.com/jogging',
        type: 'article',
    },
};

export default function JoggingPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E3EFE9' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'ジョギングと体', description: 'ジョギングの効果・「膝に悪い」の真偽・最適な走る量を、出典つきで中立に。', path: '/jogging' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '心とからだ', path: '/library#mind' }, { name: 'ジョギングと体', path: '/jogging' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '心とからだ', href: '/library#mind' }, { name: 'ジョギングと体' }]} />
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>MIND &amp; BODY</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        JOGGING
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>ジョギングと体</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        靴さえあれば、誰でも、どこでも始められる——ジョギングは<strong>もっとも原始的で、もっとも手軽な運動</strong>です。体に何が起き、「膝に悪い」は本当で、どれだけ走ればいいのか。中立に読み解きます。
                    </p>
                </header>

                {/* 歴史：走ることの再発見 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">歴史——「走る」は、わざわざ取り戻されたもの</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        人類は本来、長距離を走ることに長けた動物です。汗で体を冷やしながら、獲物が疲れるまで追い続ける——<strong>「持久狩猟」</strong>という仮説があるほど、走ることは私たちの体に刻まれています。
                        {'\n\n'}
                        ところが近代化で日常から「走る理由」が消えると、今度はそれを<strong>健康のためにわざわざ取り戻す</strong>動きが生まれます。1960〜70年代、アメリカで「ジョギング」が一大ブームになりました。陸上コーチのビル・バウワーマン（のちのナイキ共同創業者）が広めたこの運動は、特別な才能も道具もいらない<strong>「誰のものでもある運動」</strong>として広がっていきました。ジムの乱立とよく似て、これも<strong>失った身体活動の埋め戻し</strong>だったとも言えます。
                    </p>
                </section>

                {/* 体に起きること */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">走ると、体に何が起きるか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ジョギングは、<strong>酸素を使ってエネルギー（ATP）を作る有酸素運動</strong>の代表です。だからこそ、効果は筋肉だけにとどまりません。
                    </p>
                    <div className="mt-5 space-y-3">
                        {[
                            { head: 'ミトコンドリアが増える', body: '持久的な運動は、細胞のなかでエネルギーを作るミトコンドリアの数と働きを増やす（ミトコンドリア新生）。これが「疲れにくい体」の土台になる。', ref: '4' },
                            { head: '心臓と血管が鍛えられる', body: '心拍を適度に上げる刺激が、心肺機能を高め、血圧や血糖、脂質の管理にもつながる。', ref: null },
                            { head: '脳と気分に効く', body: '走ったあとの爽快感「ランナーズハイ」は、長らくエンドルフィンのおかげとされてきたが、近年は脳内の「内因性カンナビノイド」の関与が示されている。気分の安定やストレス対処にも役立つ。', ref: '5' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}{s.ref && <sup className="text-[#FF9855] font-bold ml-0.5">[{s.ref}]</sup>}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 「膝に悪い」は本当か */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「膝に悪い」は本当か</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「走ると膝の軟骨がすり減る」——よく聞く通説ですが、研究の結論は<strong>むしろ逆</strong>に近いものです。約11万人を対象にした系統的レビューでは、<strong>趣味で走る人の変形性膝・股関節症は3.5%</strong>だったのに対し、<strong>運動しない人は10.2%</strong>。一方、<strong>競技レベルで走りこむ人は13.3%</strong>と高くなりました<sup className="text-[#FF9855] font-bold">[3]</sup>。
                    </p>
                    <div className="mt-5 rounded-xl p-5 border-l-4" style={{ background: '#EFE7DF', borderColor: '#FF9855' }}>
                        <p className="text-[#1A1A1A] font-bold leading-relaxed mb-3">関節トラブルの割合（変形性膝・股関節症）</p>
                        <div className="space-y-2">
                            {[
                                { label: '運動しない人', value: 10.2, color: '#C0392B' },
                                { label: '趣味のランナー', value: 3.5, color: '#41C9B4' },
                                { label: '競技ランナー', value: 13.3, color: '#FF9855' },
                            ].map((b) => (
                                <div key={b.label} className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-[#1A1A1A] w-28 flex-shrink-0">{b.label}</span>
                                    <div className="flex-1 h-6 rounded-full bg-white/70 overflow-hidden border border-[#1A1A1A]/15">
                                        <div className="h-full rounded-full flex items-center justify-end pr-2" style={{ width: `${(b.value / 13.3) * 100}%`, background: b.color }}>
                                            <span className="text-[11px] font-bold text-white">{b.value}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        つまり関係は<strong>「U字」</strong>です。<strong>走らなさすぎても、走りすぎても良くない</strong>。適度なジョギングは膝にとって「破壊」ではなく、むしろ軟骨や筋肉を保つ「適度な負荷」になります。怖がって動かないことのほうが、関節にも全身にもリスクなのです。
                    </p>
                </section>

                {/* どれだけ走ればいい */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">どれだけ走ればいい？——「少しでも効く、でも多ければいいわけじゃない」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        うれしいことに、効果を得るのに<strong>長い距離は必要ありません</strong>。14の研究をまとめた解析では、<strong>週1回でも、走る習慣のある人は総死亡が約27%低い</strong>と報告されています<sup className="text-[#FF9855] font-bold">[1]</sup>。コペンハーゲンの大規模研究でも、ジョギングをする人はしない人より<strong>寿命が約6年長く</strong>、しかも一番得をしていたのは<strong>「ゆっくり〜ほどほどのペースで、ほどほどの量」</strong>を走る人たちでした<sup className="text-[#FF9855] font-bold">[2]</sup>。
                    </p>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { head: '「会話ができるペース」で', body: '息は弾むが、隣の人と話せるくらい。きつすぎる必要はない。これが脂肪とミトコンドリアによく効く強度（いわゆるゾーン2）。' },
                            { head: '週に合計2〜3時間まででも十分', body: '健康効果の大半は、無理のない範囲で得られる。記録を狙う競技とは別物として始める。' },
                            { head: '歩く→走るから', body: 'はじめは歩きと走りを交互に。靴は足に合うものを。痛みが出たら休む勇気を。' },
                            { head: 'やりすぎは「U字の右肩」', body: '長距離をやりこむほど健康になる、ではない。疲労・故障・免疫低下のサインが出たら減らす。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* POV・土台 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「走らねば」から自由になる</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        ジョギングの一番の価値は、<strong>お金も施設も要らないこと</strong>です。月会費もマシンも要らず、玄関を出れば始まる。ジムの乱立が「運動をお金で買う」方向だとすれば、ジョギングは<strong>運動を生活に取り戻す</strong>もっとも素直な方法です。
                        {'\n\n'}
                        ただし、<strong>「走らねばならない」という強迫</strong>になった瞬間、それはストレス源に変わります。タイムや距離はアプリが煽ってきますが、体にとって大切なのは記録ではなく<strong>続くこと</strong>。走れない日は歩く。それでも十分、体は応えてくれます。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {[{ href: '/exercise', label: '運動' }, { href: '/mitochondria', label: 'ミトコンドリア' }, { href: '/energy', label: 'エネルギー代謝' }, { href: '/gym-boom', label: 'ジムの乱立' }, { href: '/autonomic-nervous-system', label: '自律神経' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-10 p-4 bg-white/60 rounded-lg border" style={{ borderColor: '#C0392B33', background: '#FBE3DC55' }}>
                    ※ 本記事は一般的・教育的な情報です。心臓・関節・持病のある方、運動から長く離れていた方、妊娠中の方は、始める前に医療機関にご相談ください。運動中の胸の痛み・強い息切れ・めまいなどがあれば、すぐに中止して受診してください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://bjsm.bmj.com/content/54/15/898" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Is running associated with a lower risk of all-cause mortality?（走習慣と死亡リスクの系統的レビュー）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — British Journal of Sports Medicine, 2020</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[2]</span>
                            <a href="https://pubmed.ncbi.nlm.nih.gov/25660917/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Dose of Jogging and Long-Term Mortality（コペンハーゲン市心臓研究：ジョギングの量と寿命）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Journal of the American College of Cardiology, 2015</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[3]</span>
                            <a href="https://www.jospt.org/doi/10.2519/jospt.2017.7137" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                The Association of Recreational and Competitive Running With Hip and Knee Osteoarthritis（ランニングと変形性関節症）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — JOSPT, 2017</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[4]</span>
                            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3970844/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Exercise and mitochondrial biogenesis（運動とミトコンドリアの新生）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — PMC / 査読論文</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[5]</span>
                            <a href="https://www.pnas.org/doi/10.1073/pnas.1514996112" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                A runner&apos;s high depends on cannabinoid receptors in mice（ランナーズハイと内因性カンナビノイド）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — PNAS, 2015</span>
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
