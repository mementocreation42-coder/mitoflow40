import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '有害物質を減らす暮らし ｜ 農薬・水銀・マイクロプラスチック | Mitoflow40',
    description: '完全には避けられないからこそ、できる範囲で“入れる量を減らす”。農薬とオーガニック、大型魚の水銀、マイクロプラスチック、食品添加物について、神経質になりすぎず減らすコツを、出典つきでやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/reduce-toxins' },
    openGraph: {
        title: '有害物質を減らす暮らし | Mitoflow40',
        description: '農薬・水銀・マイクロプラスチック・添加物。神経質になりすぎず、できる範囲で曝露を減らすコツ。',
        url: 'https://mitoflow40.com/reduce-toxins',
        type: 'article',
    },
};

const items = [
    {
        label: '農薬とオーガニック・無農薬',
        en: 'PESTICIDES',
        why: '野菜や果物には、栽培で使われた農薬がわずかに残ることがあります。オーガニック（有機）や無農薬の食品は、この農薬の曝露を減らせる選択肢です。ただし「無農薬だから栄養価が高い」とは科学的に言い切れず、栄養面の差は小さいとする研究も少なくありません。あくまで“農薬を減らせる”という観点で捉えるのが正確です。',
        better: '神経質になる必要はありません。流水でよく洗う、皮をむく、外葉を取り除くだけでも残留はかなり減らせます。予算が許せば、皮ごと食べるもの（いちご・ぶどう等）から優先してオーガニックに、というメリハリも有効です。',
        links: [{ href: '/foods', label: '食べ物' }, { href: '/detox', label: 'デトックス' }],
    },
    {
        label: '大型魚の水銀',
        en: 'MERCURY',
        why: '魚は良質な栄養源ですが、食物連鎖の上位にいる大型魚（マグロ・メカジキ・キンメダイなど）には、水銀が蓄積しやすいことが知られています。厚生労働省も、とくに妊娠中の方に向けて、これら大型魚の摂取量の目安を示しています。一方で、魚を食べること自体のメリットは大きく、避けるべきは「偏った多量摂取」です。',
        better: 'いわし・さば・あじ・鮭などの小型〜中型魚を中心に、種類を散らして食べるのがコツ。大型魚は“ときどきのごちそう”に。妊娠中・妊娠の可能性がある方は、厚労省の目安を参考に量を調整してください。',
        links: [{ href: '/foods/salmon', label: '鮭' }, { href: '/foods/mackerel', label: '青魚' }],
    },
    {
        label: 'マイクロプラスチック',
        en: 'MICROPLASTICS',
        why: '微細なプラスチック粒子は、水や食品、空気中など環境のいたるところに存在します。ただし、現時点では人体への健康影響を示す明確な証拠は見つかっておらず、WHOも「さらなる研究が必要」としている段階です。過度に怖がる必要はありませんが、分かっていないからこそ、減らせる範囲で減らしておく——という構えが現実的です。',
        better: 'プラスチック容器のまま電子レンジで加熱しない、熱い飲食物を長時間プラ容器に入れない、ペットボトル飲料の常用を控えて水筒を使う、使い捨てプラを減らす。完璧を目指さず、できることから。',
        links: [{ href: '/detox', label: 'デトックス' }],
    },
    {
        label: '食品添加物・容器の化学物質',
        en: 'ADDITIVES',
        why: '保存料・着色料などの食品添加物は、国の基準のもとで使われており、通常の範囲ですぐ害になるものではありません。とはいえ、加工度の高い食品ほど添加物も多くなりがち。「絶対ダメ」ではなく、加工食品に偏りすぎないことが、自然と曝露を減らすことにつながります。',
        better: '原材料表示が短く、素材に近い食品を選ぶ。これは「気をつけたい食品」の話とも重なります。神経質に成分を一つひとつ避けるより、全体として加工度を下げる方が、無理なく続きます。',
        links: [{ href: '/caution-foods', label: '気をつけたい食品' }],
    },
];

export default function ReduceToxinsPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '有害物質を減らす暮らし', description: '農薬・水銀・マイクロプラスチック・添加物。神経質になりすぎず、できる範囲で曝露を減らすコツ。', path: '/reduce-toxins' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '有害物質を減らす暮らし', path: '/reduce-toxins' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '有害物質を減らす暮らし' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        REDUCE YOUR EXPOSURE
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        有害物質を減らす暮らし
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[620px] mx-auto text-left">
                        体は、たえず「出す（解毒）」働きで自分を守っています。けれど、そもそも<strong>入ってくる量を減らせれば</strong>、その負担はぐっと軽くなります。これは「出す」と対になる、「<strong>入れない</strong>」ための暮らしの話です。
                    </p>
                </header>

                {/* 前提 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">完璧は目指さない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        まずお伝えしたいのは、現代社会で有害物質を<strong>ゼロにすることは不可能</strong>だということ。すべてを避けようとすると、食べるものがなくなり、暮らしが息苦しくなってしまいます。
                        {'\n\n'}
                        大切なのは、<strong>神経質になりすぎず、できる範囲で「量」を減らす</strong>こと。そして、入ってきたものを<strong>しっかり出せる体を保つ</strong>こと。この「減らす×出す」の両輪で、十分です。ここでは、影響が比較的はっきりしているものを中心に、現実的な減らし方をまとめます。
                    </p>
                </section>

                {/* 体に溜まると */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">なぜ「溜まる」と問題なのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        有害物質には、<strong>すぐに出ていくもの</strong>と、<strong>体に溜まりやすいもの</strong>があります。水に溶けるタイプの多くは尿などで比較的早く排出されます。一方で、<strong>水銀などの重金属</strong>や、脂に溶けるタイプの物質は、脂肪・腎臓・肝臓・骨などに少しずつ蓄積していきます。この体内にたまった総量を「<strong>体内負荷（ボディバーデン）</strong>」と呼びます。
                        {'\n\n'}
                        一回の量はごくわずかでも、<strong>毎日積み重なれば、じわじわと負荷が高まっていく</strong>。これが「溜まる」ことの怖さです。蓄積した有害物質は、長期的に次のような形で体に影響しうると考えられています。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                        {[
                            { head: '神経への負担', body: '水銀などの重金属は、神経系に影響しやすいとされる。だるさや集中力の低下として感じることも。' },
                            { head: '肝臓・腎臓への負担', body: '多くの有害物質を処理・排出する肝臓と腎臓に、慢性的な負担がかかる（カビ毒や重金属など）。' },
                            { head: '酸化ストレス・炎症', body: '有害物質は体内で活性酸素を増やし、酸化ストレスやくすぶり炎症を通じて老化を後押ししうる。' },
                            { head: 'ホルモン・代謝の乱れ', body: '一部の化学物質は、ホルモンの働きをかく乱する可能性が指摘されている。' },
                        ].map((x) => (
                            <div key={x.head} className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-[#F3EEDF]">
                                <div className="font-bold text-[#1A1A1A] mb-1">{x.head}</div>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{x.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mt-5">
                        ただし、体には本来、これらを処理して<strong>排出する力（解毒）</strong>が備わっています。問題は、入ってくる量が処理能力を上回り続けること。だから対策は、「<strong>入る量を減らす</strong>」と「<strong>出す力を保つ</strong>」の両輪になります。なお、溜まりやすさには、解毒に関わる遺伝子や、肝臓・腸の状態による<strong>個人差</strong>もあります。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/detox', label: 'デトックス（出す力）' }, { href: '/mycotoxins', label: 'カビ毒' }, { href: '/oxidative-stress', label: '酸化ストレス' }, { href: '/genes', label: '解毒の個人差（遺伝子）' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 一覧 */}
                <section className="mb-6">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-5 border-l-4 border-[#FF9855] pl-3 leading-tight">減らしたい4つと、その対策</h2>
                    <div className="space-y-4">
                        {items.map((it) => (
                            <div key={it.en} className="bg-white/70 rounded-2xl p-6 md:p-7 border border-black">
                                <div className="text-[10px] font-bold tracking-widest text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{it.en}</div>
                                <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-3">{it.label}</h3>
                                <p className="text-sm text-[#4A4A4A] leading-loose mb-3">{it.why}</p>
                                <div className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-[#E3F2EE]">
                                    <span className="text-[10px] font-bold tracking-widest text-[#41C9B4] block mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HOW TO REDUCE</span>
                                    <p className="text-sm text-[#1A1A1A]/85 leading-relaxed">{it.better}</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 mt-3">
                                    <span className="text-[10px] font-bold tracking-wider text-[#1A1A1A]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>RELATED</span>
                                    {it.links.map((l) => (
                                        <Link key={l.href} href={l.href}
                                            className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">
                                            {l.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 入れない×出す */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「入れない」と「出す」は両輪</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        どれだけ気をつけても、入ってくるものをゼロにはできません。だからこそ、入ってきた有害物質を処理して排出する<strong>解毒（デトックス）</strong>の力を保つことが、同じくらい大切です。肝臓の働きを支え、腸を整え、しっかり出す。「入れない」と「出す」がそろってはじめて、体の負担は最小になります。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/detox"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                            style={{ background: '#FF9855', color: '#1A1A1A' }}>
                            デトックス（出す）を読む
                            <span>→</span>
                        </Link>
                        <Link href="/mycotoxins"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                            カビ毒と食の安全
                            <span>→</span>
                        </Link>
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は一般的な情報であり、特定の食品・製品の危険性を煽ったり、診断・治療を目的とするものではありません。妊娠中の方や持病のある方、食事に不安のある方は、医師・管理栄養士などの専門家にご相談ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">このページの参照</h2>
                    <ul className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm">
                        <li>
                            <a href="https://www.mhlw.go.jp/topics/bukyoku/iyaku/syoku-anzen/suigin/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                魚介類に含まれる水銀について（妊婦への摂取目安）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — 厚生労働省</span>
                        </li>
                        <li>
                            <a href="https://www.who.int/publications/i/item/9789241516198" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Microplastics in drinking-water（現時点で健康リスクの明確な証拠はなく、要研究）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — WHO（2019）</span>
                        </li>
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/70 mt-2">
                        全テーマの出典は{' '}
                        <Link href="/references" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">参照文献・出典ページ</Link>
                        {' '}にまとめています。
                    </p>
                </section>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/detox" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        デトックスへ
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
