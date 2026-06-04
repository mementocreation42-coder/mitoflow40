import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '気をつけたい食品 | Mitoflow40',
    description: '「食べてはいけない」ではなく「頻度と量に気をつけたい」食品を、超加工食品・甘い飲み物・トランス脂肪酸・加工肉などカテゴリ別に、減らし方と代わりまでやさしく解説します。',
    alternates: { canonical: 'https://mitoflow40.com/caution-foods' },
    openGraph: {
        title: '気をつけたい食品 | Mitoflow40',
        description: '「ゼロにしなくていい、でも頻度と量に気をつけたい」食品を、しくみと減らし方からやさしく解説。',
        url: 'https://mitoflow40.com/caution-foods',
        type: 'article',
    },
};

const items = [
    {
        label: '超加工食品（ウルトラプロセスドフード）',
        en: 'ULTRA-PROCESSED',
        why: 'スナック菓子・カップ麺・菓子パン・成分表示が長い加工食品など。栄養が乏しい一方で、砂糖・塩分・脂質・添加物が多く、しかも「もっと食べたくなる」ように設計されています。食べすぎ・血糖の乱れ・くすぶり炎症につながりやすいのが気になる点です。',
        better: 'ゼロにする必要はありませんが、「素材に近いもの」へ少しずつ寄せるのがコツ。原材料の表示が短い食品を選び、間食はナッツ・ゆで卵・果物などに置き換えていくと、無理なく頻度が下がります。',
        links: [{ href: '/inflammation', label: '炎症' }, { href: '/blood-sugar', label: '血糖' }],
    },
    {
        label: '甘い飲み物・砂糖の摂りすぎ',
        en: 'SUGARY DRINKS',
        why: '清涼飲料・エナジードリンク・加糖コーヒーなど、液体の糖は固形物より一気に吸収され、血糖を急上昇させます。血糖の乱高下は眠気やだるさを招き、長期的には糖化（こげる）を進める一因にもなります。',
        better: 'まずは「飲み物の糖」から見直すのが効果的。水・お茶・無糖炭酸に置き換え、甘みが欲しいときは果物で。やめるより「減らす・薄める」から始めると続きます。',
        links: [{ href: '/blood-sugar', label: '血糖コントロール' }, { href: '/glycation', label: '糖化' }],
    },
    {
        label: 'トランス脂肪酸',
        en: 'TRANS FAT',
        why: 'マーガリン・ショートニング、一部の洋菓子や揚げ物などに含まれる脂です。WHO（世界保健機関）は、工業的に作られるトランス脂肪酸を食品から減らすよう各国に勧告しています。炎症や心血管への影響が指摘されている脂質です。',
        better: '原材料に「ショートニング」「植物油脂（部分水素添加）」とあるものは控えめに。オリーブオイルや魚の脂など、良質な油に置き換えていくのがおすすめです。',
        links: [{ href: '/inflammation', label: '炎症' }],
    },
    {
        label: '加工肉（ハム・ソーセージ・ベーコン）',
        en: 'PROCESSED MEAT',
        why: 'WHOの専門機関IARCは、加工肉を「ヒトに対して発がん性がある（グループ1）」と分類しています。ただしこれは「タバコと同じ強さで危険」という意味ではなく、証拠の確かさの分類で、実際のリスクは量と頻度しだいです。',
        better: '毎日の主役にしないのが現実的。新鮮な肉や魚をメインにしつつ、加工肉は「ときどきの楽しみ」に。亜硝酸塩などの少ない無塩せきタイプを選ぶ手もあります。',
        links: [{ href: '/detox', label: 'デトックス' }],
    },
    {
        label: '酸化した油・高温の焦げ',
        en: 'OXIDIZED OILS',
        why: '使い回した揚げ油や、強く焦げた部分には、酸化した脂や糖化物質（AGEs）が増えます。これらは体のサビ＝酸化ストレスや糖化を進め、老化を後押しする方向に働きます。',
        better: '揚げ物の頻度をほどほどに、油は新しいものを。調理は「焦がしすぎない」を意識し、こんがり程度に。蒸す・煮る・低温で焼く調理を増やすのも有効です。',
        links: [{ href: '/oxidative-stress', label: '酸化ストレス' }, { href: '/glycation', label: '糖化' }],
    },
    {
        label: '精製された「白い炭水化物」の摂りすぎ',
        en: 'REFINED CARBS',
        why: '白いパン・白米・甘い菓子・麺類に偏ると、食物繊維が少ないぶん血糖が急上昇しやすく、食後の眠気や、長期的な代謝の乱れにつながります。「悪」ではなく「偏り」が問題です。',
        better: '全粒（玄米・全粒パン）への置き換えや、食物繊維・タンパク質と一緒に食べる「食べ合わせ」で、血糖の波はぐっとゆるやかになります。野菜から食べる順番も効果的。',
        links: [{ href: '/blood-sugar', label: '血糖' }, { href: '/foods/brown-rice', label: '玄米' }],
    },
    {
        label: '人工甘味料の常用',
        en: 'ARTIFICIAL SWEETENERS',
        why: 'ゼロカロリー飲料などに使われる人工甘味料は、砂糖の代わりとして役立つ場面もあります。一方で、腸内環境への影響を指摘する研究もあり、まだ結論は出ていません。「常用しすぎない」のが無難というのが今のところの目安です。',
        better: '一時的に頼るのはOKでも、毎日の習慣にはしないのが安心。基本は水・お茶に戻し、甘い味そのものへの慣れを少しずつリセットしていくのがおすすめです。',
        links: [{ href: '/gut-brain', label: '腸脳相関' }],
    },
    {
        label: '過度なアルコール',
        en: 'EXCESS ALCOHOL',
        why: '適量を超えるアルコールは、肝臓の負担を増やし、睡眠の質を下げ、解毒に使う栄養を消耗させます。「リラックスのつもり」が、翌日の不調や回復力の低下につながることもあります。',
        better: '休肝日をつくる、量をあらかじめ決める、水を挟む——小さなルールが効きます。飲むなら、つまみにタンパク質や野菜を添えると負担をやわらげられます。',
        links: [{ href: '/detox', label: 'デトックス（肝臓）' }, { href: '/sleep', label: '睡眠' }],
    },
];

export default function CautionFoodsPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '気をつけたい食品', description: '「ゼロにしなくていい、でも頻度と量に気をつけたい」食品を、しくみと減らし方からやさしく解説。', path: '/caution-foods' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '食べ物', path: '/foods' }, { name: '気をつけたい食品', path: '/caution-foods' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '食べ物', href: '/foods' }, { name: '気をつけたい食品' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        ON YOUR PLATE
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        気をつけたい食品
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[620px] mx-auto text-left">
                        これは「食べてはいけないものリスト」ではありません。どんな食品も、ゼロにする必要はありません。大切なのは<strong>頻度と量</strong>。ここでは、長期的・習慣的にとりすぎると気になる食品を、「なぜ」「どう減らすか」「代わりは何か」とセットで見ていきます。
                    </p>
                </header>

                {/* なぜ今これが問題か */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">「ごちそう」が、毎日の主役になった</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        甘いもの、揚げ物、加工肉、白いパンや麺。これらはかつて、お祝いの日や特別なときに楽しむ「<strong>ハレの日のごちそう・嗜好品</strong>」でした。ところが今は、コンビニにもスーパーにも安く豊富に並び、<strong>毎日・毎食の“主役”</strong>になっています。
                        {'\n\n'}
                        私たちの体は、これほど高頻度・高濃度の糖や脂、加工された食品を、毎日浴びるようには設計されていません。だから、現代に増えている「<strong>なんとなくの不調</strong>」——疲れやすさ、だるさ、気分の波、血糖や体重の乱れ——の背景には、こうした食品が<strong>日常の中心になっていること</strong>があるのかもしれません。
                        {'\n\n'}
                        これは、「意志が弱いから不調になる」という話ではありません。むしろ逆で、<strong>食をとりまく環境そのものが大きく変わった</strong>結果です。だからこそ、自分を責める必要はありません。大切なのは、その変化に<strong>気づいて、少しだけ本来の側へ戻していくこと</strong>。このページは、そのための地図です。
                    </p>
                </section>

                {/* 前提 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">読む前に、ひとつだけ</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        食べ物に「絶対の正解」も「絶対の悪」もありません。たまの楽しみまで我慢すると、かえって続きませんし、心の満足も健康の一部です。
                        {'\n\n'}
                        また、何がどれくらい体に響くかには<strong>個人差</strong>があります。同じものを食べても、平気な人と不調が出る人がいる。だからこのページも「ルール」ではなく、自分の体の反応を観察するための<strong>ヒント</strong>として読んでください。減らすなら、「やめる」より「頻度を落とす・代わりに置き換える」から。それで十分です。
                    </p>
                </section>

                {/* 一覧 */}
                <section className="mb-6">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-5 border-l-4 border-[#FF9855] pl-3 leading-tight">頻度と量に気をつけたい8つ</h2>
                    <div className="space-y-4">
                        {items.map((it) => (
                            <div key={it.en} className="bg-white/70 rounded-2xl p-6 md:p-7 border border-black">
                                <div className="text-[10px] font-bold tracking-widest text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{it.en}</div>
                                <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-3">{it.label}</h3>
                                <p className="text-sm text-[#4A4A4A] leading-loose mb-3">{it.why}</p>
                                <div className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-[#E3F2EE]">
                                    <span className="text-[10px] font-bold tracking-widest text-[#41C9B4] block mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HOW TO EASE</span>
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

                {/* バランスへ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「引く」と「足す」はセット</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        気をつけたい食品を減らす（引く）と同時に、積極的に摂りたい食べ物を増やす（足す）と、置き換えがスムーズに進みます。「我慢」ではなく「より良いものへの置き換え」と捉えると、ぐっと続けやすくなります。
                    </p>
                    <div className="mt-5">
                        <Link href="/foods"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition"
                            style={{ background: '#FF9855', color: '#1A1A1A' }}>
                            積極的に摂りたい食べ物を見る
                            <span>→</span>
                        </Link>
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は一般的な栄養情報であり、特定の食品を断罪したり、診断・治療を目的とするものではありません。持病・アレルギー・服薬中の方や、食事制限が必要な方は、食事の大きな変更前に医師・管理栄養士などの専門家にご相談ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">このページの参照</h2>
                    <ul className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm">
                        <li>
                            <a href="https://www.who.int/news-room/fact-sheets/detail/trans-fat" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Trans fat — Fact sheet
                            </a>
                            <span className="text-[#1A1A1A]/50"> — WHO（世界保健機関）</span>
                        </li>
                        <li>
                            <a href="https://www.who.int/news-room/questions-and-answers/item/cancer-carcinogenicity-of-the-consumption-of-red-meat-and-processed-meat" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Carcinogenicity of the consumption of red meat and processed meat
                            </a>
                            <span className="text-[#1A1A1A]/50"> — WHO / IARC</span>
                        </li>
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/70 mt-2">
                        全テーマの出典は{' '}
                        <Link href="/references" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">参照文献・出典ページ</Link>
                        {' '}にまとめています。
                    </p>
                </section>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/foods" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        食べ物 一覧へ
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
