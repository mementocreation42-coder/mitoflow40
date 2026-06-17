import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '白米・玄米の真実 ｜ どちらが正解？血糖・栄養・フィチン酸・ヒ素 | Mitoflow40',
    description: '「玄米は健康、白米は悪」と言い切れるのか。白米と玄米それぞれの長所と短所、血糖の上がりやすさ、玄米の食物繊維やビタミンと、フィチン酸・ヒ素・消化負担といった注意点を、確かなことと誇張を分けて中立に整理。あなたに合うお米の食べ方を考えます。',
    alternates: { canonical: 'https://mitoflow40.com/rice' },
    openGraph: {
        title: '白米・玄米の真実 | Mitoflow40',
        description: '白米と玄米、どちらが正解？ 血糖・栄養・フィチン酸・ヒ素を中立に整理し、自分に合う食べ方へ。',
        url: 'https://mitoflow40.com/rice',
        type: 'article',
    },
};

const compare = [
    { label: '血糖の上がりやすさ', white: '上がりやすい（GI高め）', brown: 'ゆるやか（食物繊維が多い）' },
    { label: '食物繊維・ビタミン・ミネラル', white: '精製で多くが失われる', brown: 'ぬか・胚芽に豊富に残る' },
    { label: '消化のしやすさ', white: 'やさしい・消化が速い', brown: '負担になる人も・よく噛む必要' },
    { label: 'フィチン酸', white: '少ない', brown: '多い（ミネラル吸収を妨げる面）' },
    { label: '無機ヒ素', white: '相対的に少なめ', brown: 'ぬかに溜まりやすく多め' },
    { label: '味・食べやすさ', white: '万人向け・合わせやすい', brown: '好みが分かれる・よく噛む' },
];

export default function RicePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F3EEDC' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '白米・玄米の真実', description: '白米と玄米、どちらが正解？ 血糖・栄養・フィチン酸・ヒ素を中立に整理し、自分に合う食べ方へ。', path: '/rice' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '食べ物', path: '/library#food' }, { name: '白米・玄米の真実', path: '/rice' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '食べ物', href: '/library#food' }, { name: '白米・玄米の真実' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>RICE</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        RICE
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>白米・玄米の真実</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        「<strong>玄米は健康、白米は悪</strong>」——よく聞く話ですが、本当でしょうか。どちらにも長所と短所があり、<strong>“正解”は人によって違います</strong>。思い込みを一度ほどいてみましょう。
                    </p>
                </header>

                {/* 精製とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">白米と玄米は「同じお米」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        玄米は、収穫した米からもみ殻だけを取り除いたもの。そこから<strong>ぬか層と胚芽を削り落として、白く磨いたものが白米</strong>です。つまり両者は別物ではなく、<strong>「どこまで削るか」の違い</strong>。
                        {'\n\n'}
                        削られるぬか・胚芽には、<strong>食物繊維・ビタミンB群・ミネラル</strong>が詰まっています。だから玄米は栄養が豊富。一方で、そこには<strong>消化を妨げたり、ミネラルの吸収を抑えたりする成分</strong>も含まれます。栄養と“クセ”は、いわばセットなのです。
                    </p>
                </section>

                {/* 比較表 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">白米 vs 玄米、フェアに比べる</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">どちらが上、ではなく「何が違うか」を並べてみます。長所と短所は、たいてい裏表です。</p>
                    <div className="bg-white/70 rounded-2xl border border-black overflow-hidden">
                        <div className="grid grid-cols-3 text-xs font-bold text-white bg-[#41C9B4]">
                            <div className="p-3">観点</div>
                            <div className="p-3 border-l border-white/30">白米</div>
                            <div className="p-3 border-l border-white/30">玄米</div>
                        </div>
                        {compare.map((c, i) => (
                            <div key={c.label} className={`grid grid-cols-3 text-sm ${i !== 0 ? 'border-t border-[#1A1A1A]/10' : ''}`}>
                                <div className="p-3 font-bold text-[#1A1A1A]">{c.label}</div>
                                <div className="p-3 border-l border-[#1A1A1A]/10 text-[#4A4A4A] leading-snug">{c.white}</div>
                                <div className="p-3 border-l border-[#1A1A1A]/10 text-[#4A4A4A] leading-snug">{c.brown}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 玄米の注意点（中立） */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#F3EFD6' }}>
                    <div className="inline-block text-[10px] font-bold tracking-widest text-[#1A1A1A] bg-[#FFD37A] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NEUTRAL ／ 玄米の“影”も知る</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">玄米は「無条件に正義」ではない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line mb-5">
                        玄米は栄養豊富で優れた主食ですが、過度に神聖視するのも考えもの。知っておきたい“影”の部分を、怖がらせるためでなく、<strong>賢く付き合うために</strong>挙げておきます。
                    </p>
                    <div className="space-y-3">
                        {[
                            { head: 'フィチン酸（ミネラル吸収）', body: 'ぬかに多いフィチン酸は、鉄・亜鉛・カルシウムなどの吸収を一部妨げる面がある。一方で抗酸化作用も持つ。浸水・発酵・よく噛むことで影響はやわらぐ。' },
                            { head: '無機ヒ素', body: '米は土壌のヒ素を吸収しやすく、とくにぬかに溜まるため玄米で多めになる。日本の通常の食生活で過度に心配する必要は低いが、よく研いで、たっぷりの水で炊くと減らせる。乳幼児には配慮を。' },
                            { head: '消化の負担', body: '食物繊維と硬い外皮で、胃腸が弱い人・体調が悪いときは負担になることも。よく噛む、しっかり浸水して柔らかく炊くのが基本。' },
                            { head: '農薬の残留', body: 'ぬか層に残留農薬が溜まりやすいとも言われる。気になる人は無農薬・減農薬の玄米を選ぶ選択肢もある。' },
                        ].map((s) => (
                            <div key={s.head} className="flex items-start gap-4 bg-white/60 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">※ いずれも「玄米を食べてはいけない」という話ではありません。下ごしらえの工夫で、長所を活かしつつ短所を小さくできます。</p>
                </section>

                {/* 白米の名誉回復 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">白米も、悪者ではない</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        白米の弱点は<strong>血糖を上げやすいこと</strong>ですが、それは<strong>食べ方でかなりコントロールできます</strong>。野菜やタンパク質を先に食べる、よく噛む、冷やご飯にする（レジスタントスターチが増える）、量を整える——こうした工夫で、白米の“速さ”はやわらぎます。
                        {'\n\n'}
                        また白米は<strong>消化にやさしく、ヒ素やフィチン酸が少なく、エネルギー源として優秀</strong>。胃腸が弱い人、運動量が多い人、玄米が続かない人にとっては、白米の方が合うことも十分あります。「白米か玄米か」の二択でなく、<strong>分づき米・雑穀米・もち麦ブレンド</strong>など“中間”も有力な選択肢です。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/blood-sugar', label: '血糖コントロール' }, { href: '/glycation', label: '糖化' }, { href: '/wheat', label: '小麦と健康' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 自分に合う選び方 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">あなたに合うのは、どっち？</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">「みんなの正解」より「あなたの最適」。タイプ別の目安です（あくまで一般的な傾向）。</p>
                    <div className="space-y-3">
                        {[
                            { head: '血糖・体重が気になるなら', body: '玄米・分づき米・雑穀ブレンドが向きやすい。白米なら食べ方の工夫を組み合わせて。' },
                            { head: '胃腸が弱い・体調を崩しやすいなら', body: '消化にやさしい白米や、しっかり浸水した柔らかめの玄米から。無理に玄米にしない。' },
                            { head: '玄米が続かない・苦手なら', body: '我慢して挫折するより、分づき米やもち麦ブレンドで“いいとこ取り”を。続くことが一番大事。' },
                            { head: '迷ったら', body: '日によって使い分けてもOK。主食を一種類に固定せず、米・雑穀・いもなどを巡らせると栄養も腸内細菌も多様に。' },
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
                            { href: '/wheat', label: '小麦と健康' },
                            { href: '/blood-sugar', label: '血糖コントロール' },
                            { href: '/caution-foods', label: '気をつけたい食品' },
                            { href: '/foods', label: '食べ物' },
                            { href: '/gut-health', label: '腸内環境' },
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
