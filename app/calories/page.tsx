import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'カロリーの誤解 ｜ 「1kcalは1kcal」は本当？ 便利な目安の正しい使い方 | Mitoflow40',
    description: 'カロリーは便利な目安ですが、それは「燃料の量」を測る単位であって「健康」の単位ではありません。なぜ私たちはカロリーで考えるようになったのか（アトウォーターと従来栄養学の歴史）、よくある5つの誤解、そして本当に大切な「ATP（細胞のエネルギー通貨）」の視点まで——カロリーベースの健康観を問い直します。',
    alternates: { canonical: 'https://mitoflow40.com/calories' },
    openGraph: {
        title: 'カロリーの誤解 | Mitoflow40',
        description: '「1kcalは1kcal」は本当？ カロリーをめぐる5つの誤解を解き、便利な目安の正しい使い方を中立に整理。',
        url: 'https://mitoflow40.com/calories',
        type: 'article',
    },
};

const myths = [
    {
        myth: '「1kcalは1kcal」。何から摂っても同じ',
        real: '同じカロリーでも、体内での扱いは食品ごとに大きく変わります。タンパク質は消化・代謝そのものに多くのエネルギーを使い（食事誘発性熱産生＝TEF。タンパク質は約20〜30%、糖質5〜10%、脂質0〜3%）、食物繊維・加工度・噛む回数によって満腹感やホルモンの反応も違います。同じ200kcalでも、ゆで卵と砂糖入り飲料では、体への影響はまるで別物です。',
    },
    {
        myth: '食品ラベルのカロリーは正確だ',
        real: 'ラベルの数値は、19世紀の「Atwater係数」（糖質4・タンパク質4・脂質9 kcal/g）にもとづく推定値です。実際の吸収量は、食物繊維の量・調理法・加工度・人それぞれの消化吸収力で変わり、±20%ほどずれることもあります。たとえばナッツは、表示より吸収カロリーが少ないという研究も。あくまで「おおよその目安」です。',
    },
    {
        myth: '消費＞摂取なら、必ず痩せる',
        real: '大きな方向性としては正しいのですが、単純な引き算ではありません。摂取を減らすと、体は消費を抑えて適応します（代謝適応）。さらに睡眠・ホルモン・筋肉量・腸内細菌によって、「消費する側」も「吸収する側」も変動します。だから同じ摂取カロリーでも、結果は人によって、また時期によって変わります。',
    },
    {
        myth: '低カロリー＝健康的な食べ物',
        real: 'カロリーの大小と、栄養の豊かさは別物です。低カロリーでも栄養はスカスカという食品もあれば、高カロリーでも栄養がぎっしり詰まった食品（卵・ナッツ・オリーブオイル・アボカドなど）もあります。数字の低さより、「その一口で何が摂れるか」＝栄養密度で見るほうが、体にとっては大切です。',
    },
    {
        myth: '運動すれば、食べた分を帳消しにできる',
        real: '運動で消費するカロリーは、思うより小さいものです（ケーキ1個分を、1時間以上のランニングでようやく、ということも）。しかも体は、運動した日に他の活動を減らしたり食欲が増したりして“埋め合わせ”ようとします。減量はまず食事の質から。運動は、健康・体力・筋肉の維持といった別の大きな価値のために。',
    },
];

const checklist = [
    { head: '栄養密度', body: 'その食べ物で、ビタミン・ミネラル・タンパク質など「何が摂れるか」。同じカロリーなら、中身の濃いほうを。' },
    { head: '食品の質・加工度', body: '素材に近いか、超加工食品か。加工度は満腹感・血糖・食べ過ぎやすさに影響する。' },
    { head: '満腹感の持続', body: 'すぐ空腹に戻る食べ物か、長く満たされる食べ物か。タンパク質・繊維・水分がカギ。' },
    { head: '血糖への影響', body: '血糖を急上昇させないか。同じ糖質量でも、食べる順番や組み合わせで応答は変わる。' },
];

export default function CaloriesPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#FBEBD5' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'カロリーの誤解', description: '「1kcalは1kcal」は本当？ カロリーをめぐる5つの誤解を解き、便利な目安の正しい使い方を中立に整理。', path: '/calories' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '食べ物', path: '/library#food' }, { name: 'カロリーの誤解', path: '/calories' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '食べ物', href: '/library#food' }, { name: 'カロリーの誤解' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>CALORIES</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        CALORIES
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>カロリーの誤解</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        カロリーは便利な目安。でも、それは<strong>「燃料の量」を測る単位</strong>であって、<strong>「健康」を測る単位ではありません</strong>。なぜ私たちはカロリーで考えるようになったのか——その流れをたどると、本当に大切なものが見えてきます。
                    </p>
                </header>

                {/* そもそもカロリーとは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">そもそも「カロリー」とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        1kcal（キロカロリー）は、もともと<strong>水1Lの温度を1℃上げるのに必要な熱量</strong>のこと。食品のカロリーは、その食品を<strong>“燃やした”ときに出る熱量</strong>を基準に決められています（ボンブカロリメーターという装置で測定）。
                        {'\n\n'}
                        でも、私たちの体は<strong>燃焼炉ではありません</strong>。食べ物は、消化・吸収・代謝という何段階もの過程を経て、エネルギーや体の材料になります。だから「燃やして出た熱量」と「体が実際に使える量」は、必ずしも一致しません。ここが、カロリーをめぐる多くの誤解の出発点です。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/energy', label: 'エネルギーとは' }, { href: '/mitochondria', label: 'ミトコンドリア' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* なぜカロリーで考えるようになったのか */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <div className="inline-block text-[10px] font-bold tracking-widest text-[#1A1A1A]/45 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HISTORY ／ どこから来たのか</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">なぜ、私たちは「カロリー」で考えるようになったのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        「カロリー」はもともと、19世紀の<strong>物理学（熱力学）</strong>の言葉でした。それを<strong>栄養の世界に持ち込んだ</strong>のが、アメリカの化学者<strong>ウィルバー・アトウォーター</strong>（1844〜1907）です。ドイツで生理学を学んだ彼は、巨大な装置（呼吸熱量計）で人と食べ物の“熱量”を測定し、糖質4・タンパク質4・脂質9 kcal/gという<strong>「アトウォーター係数」</strong>を確立。食べ物を「エネルギー源（燃料）」として数値化しました。彼は「アメリカ栄養学の父」と呼ばれます。
                        {'\n\n'}
                        カロリーは、なぜここまで広まったのか。理由はシンプルで、<strong>測れて・比べられて・管理しやすかった</strong>からです。食べ物を一つの数字に還元できれば、政策（配給・食事指針）にも、食品ラベルにも、ダイエットにも使えます。20世紀初頭には『カロリーを数えて痩せる』式の本がベストセラーになり、<strong>「カロリー計算＝健康・減量の王道」</strong>というイメージが定着しました。
                        {'\n\n'}
                        つまりカロリーは、<strong>食を“科学的に測れるもの”にした大発明</strong>でした。ただし、それは<strong>「燃料の量」を測る物差し</strong>であって、「体の中で何が起きているか」「健康かどうか」を測るものではなかった——ここに、いまにつながる限界の種がありました。
                    </p>
                </section>

                {/* 5つの誤解 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">カロリーをめぐる、5つの誤解</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">どれも「半分は正しいけれど、それだけでは足りない」話です。<strong>誤解</strong>と<strong>実際</strong>を並べて見ていきます。</p>
                    <div className="space-y-4">
                        {myths.map((m, i) => (
                            <div key={i} className="bg-white/70 rounded-2xl border border-black p-5 md:p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <span className="flex-shrink-0 text-[10px] font-bold tracking-widest text-white bg-[#C0392B] rounded-full px-3 py-1 mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>誤解</span>
                                    <p className="font-bold text-[#1A1A1A] leading-snug">{m.myth}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 text-[10px] font-bold tracking-widest text-white bg-[#41C9B4] rounded-full px-3 py-1 mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>実際</span>
                                    <p className="text-sm text-[#4A4A4A] leading-loose">{m.real}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* カロリーより、ATP */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#EAF1E6' }}>
                    <div className="inline-block text-[10px] font-bold tracking-widest text-white bg-[#41C9B4] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WHAT MATTERS ／ 本体はこちら</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">カロリーより、「ATP」が本体</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        食べ物のカロリーは、あくまで<strong>“燃料の量”</strong>。でも、私たちの体が実際に使うエネルギーは、カロリーそのものではありません。細胞の中の<strong>ミトコンドリア</strong>が、食べ物と酸素から作り出す<strong>ATP（エネルギー通貨）</strong>です。
                        {'\n\n'}
                        ここが肝心です。<strong>同じカロリーを食べても、それがうまくATPに変わるかどうかは別の話</strong>。変換には、ビタミンB群・マグネシウム・鉄・CoQ10といった<strong>“裏方の栄養素（補酵素）”</strong>と、健康なミトコンドリア、そして酸素が必要です。だから「ちゃんと食べているのに疲れる」——カロリーは足りているのに<strong>ATPがうまく作れていない</strong>、ということが起こります。
                        {'\n\n'}
                        ラベルの数字は、その燃料を<strong>あなたの細胞が使えるエネルギーに変えられるか</strong>までは教えてくれません。健康に近いのは「何kcal摂ったか」ではなく、<strong>「どれだけうまくATPを作り、使えているか」</strong>。エネルギーの話の“本体”は、カロリーよりもこちらにあります。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/atp', label: 'ATP（エネルギー通貨）' }, { href: '/mitochondria', label: 'ミトコンドリア' }, { href: '/tca-cycle', label: 'TCA回路' }, { href: '/energy', label: 'エネルギーとは' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 数字より中身 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <div className="inline-block text-[10px] font-bold tracking-widest text-white bg-[#41C9B4] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>WHAT TO LOOK AT ／ 数字より中身</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">数字より、中身を見る</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-5">
                        カロリーを捨てる必要はありません。<strong>食べ過ぎ・不足に気づく“おおよその目安”</strong>としては、十分に役立ちます。大切なのは、<strong>カロリーを唯一の物差しにしない</strong>こと。次の4つを合わせて見ると、数字の奥にある「中身」が見えてきます。
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {checklist.map((c) => (
                            <div key={c.head} className="bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{c.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{c.body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/nutrient-density', label: '栄養価の変化' }, { href: '/blood-sugar', label: '血糖コントロール' }, { href: '/molecular-nutrition', label: '分子栄養学' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* Mitoflow40の立場 */}
                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-black" style={{ background: '#F3EFD6' }}>
                    <div className="inline-block text-[10px] font-bold tracking-widest text-[#1A1A1A] bg-[#FFD37A] rounded-full px-3 py-1 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>OUR STANCE ／ 正直に</div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">Mitoflow40の立場</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        カロリーを<strong>否定はしません</strong>。極端な食べ過ぎ・食べなさすぎに気づく、ざっくりした“燃料計”としては役に立ちます。でも、<strong>積極的に肯定もできない</strong>——なぜなら、カロリーは<strong>「熱量（燃料の量）」の単位</strong>であって、<strong>「健康」の単位ではない</strong>からです。カロリーが少ないことも、きっちり計算することも、それ自体が健康を意味するわけではありません。
                        {'\n\n'}
                        19世紀生まれのこの物差しは、食を“測れるもの”にした功績は大きい。けれど、いま私たちが本当に大切にしたいのは、<strong>その燃料を細胞がどれだけうまくATPに変え、使えているか</strong>です。<strong>カロリーベースの健康観は、もう一歩先——代謝・ミトコンドリア・栄養の質——へと更新されつつあります</strong>。「何kcalか」より「何を食べ、体がどう使うか」。判断の主役は、いつもあなた自身です。
                    </p>
                </section>

                {/* あわせて読む */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/nutrition-history', label: '栄養学の歴史' },
                            { href: '/atp', label: 'ATP（エネルギー通貨）' },
                            { href: '/energy', label: 'エネルギーとは' },
                            { href: '/tca-cycle', label: 'TCA回路' },
                            { href: '/nutrient-density', label: '食べ物の栄養価の変化' },
                            { href: '/blood-sugar', label: '血糖コントロール' },
                            { href: '/molecular-nutrition', label: '分子栄養学' },
                            { href: '/nutrition-literacy', label: '栄養を学ぶ価値' },
                            { href: '/fasting', label: '食べない時間の力' },
                            { href: '/symptoms/weight-gain', label: '太りやすい・痩せにくい' },
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
