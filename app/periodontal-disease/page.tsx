import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '歯周病とは ｜ 口の中の慢性炎症が、全身に広がる理由 | Mitoflow40',
    description: '歯周病は、歯ぐきの細菌感染から始まる慢性の炎症性疾患。歯肉炎と歯周炎の違い、見逃しやすいサイン、そして糖尿病・心血管・腸内環境とつながる「全身への波及」を、精密栄養学の視点で中立に整理します。痛みなく静かに進む「沈黙の炎症」を、口の外まで含めて捉え直すページです。診断・治療は歯科・医療機関で。',
    alternates: { canonical: 'https://mitoflow40.com/periodontal-disease' },
    openGraph: {
        title: '歯周病とは | Mitoflow40',
        description: '歯ぐきの慢性炎症が、糖尿病・心血管・腸へと広がる。口の中だけの病気ではない歯周病を中立に。診断・治療は歯科で。',
        url: 'https://mitoflow40.com/periodontal-disease',
        type: 'article',
    },
};

const stages = [
    { name: '健康な歯ぐき', note: '淡いピンクで引き締まり、歯みがきで出血しない。歯と歯ぐきの境目（歯周ポケット）は浅い。' },
    { name: '歯肉炎', note: '歯ぐきの表面だけに炎症がある段階。赤み・腫れ・出血が出るが、歯を支える骨はまだ溶けていない。ここで気づけば、ケアで元に戻せる可逆的な段階。' },
    { name: '歯周炎', note: '炎症が歯を支える骨にまで及び、骨が溶け始めた段階。歯周ポケットが深くなり、進むと歯がぐらつく。一度失った骨は戻りにくく、進行を止めることが目標になる。' },
];

const signs = [
    '歯みがきや食事で歯ぐきから出血する',
    '歯ぐきが赤く腫れる・むずがゆい',
    '口臭が気になる・指摘された',
    '朝起きたとき口の中がネバつく',
    '歯ぐきが下がって歯が長く見える',
    '歯がぐらつく・噛むと違和感がある',
];

export default function PeriodontalDiseasePage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F7E2DC' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '歯周病とは', description: '歯ぐきの慢性炎症が、糖尿病・心血管・腸へと広がる。口の中だけの病気ではない歯周病を中立に。診断・治療は歯科で。', path: '/periodontal-disease' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#mechanism' }, { name: '歯周病', path: '/periodontal-disease' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: '歯周病' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>PERIODONTAL DISEASE</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        PERIODONTAL DISEASE
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>歯周病とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        歯周病は「歯ぐきだけの病気」ではありません。<strong>痛みなく静かに進む慢性の炎症</strong>が、じつは<strong>糖尿病や心臓・血管、腸内環境ともつながっている</strong>——口の中を、全身の入口として捉え直すページです。
                    </p>
                </header>

                {/* 冒頭の立場 */}
                <div className="mb-10 rounded-2xl p-5 border border-[#E8896B] bg-white/70">
                    <p className="text-sm text-[#1A1A1A]/85 leading-relaxed">
                        <strong className="text-[#E8896B]">はじめに：</strong>このページは体の仕組みを正しく知るための<strong>教育的な解説</strong>で、診断・治療を行うものではありません。歯周病の診断・治療は歯科で行うものです。出血・腫れ・ぐらつきが気になる方は、まず歯科を受診してください。Mitoflow40が扱うのは、その<strong>手前（予防・全身とのつながり）の段階</strong>です。
                    </p>
                </div>

                {/* 歯周病とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">歯周病とは、どんな病気か</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        歯と歯ぐきの境目には、わずかな溝（<strong>歯周ポケット</strong>）があります。みがき残しがたまると、そこに<strong>細菌のかたまり（プラーク＝バイオフィルム）</strong>が住みつきます。体はこれを排除しようと免疫を働かせ、歯ぐきに<strong>炎症</strong>が起きます。これが歯周病の正体です。
                        {'\n\n'}
                        やっかいなのは、炎症が長びくと、細菌そのものよりも<strong>自分の免疫反応が、歯を支える骨をじわじわ溶かしていく</strong>こと。しかも初期は痛みがほとんどなく、<strong>「沈黙の炎症」</strong>として静かに進みます。気づいたときには骨が減っていた、となりやすいのが特徴です。日本では成人の多くが、軽いものを含め何らかの歯周病を持つとされます。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/inflammation', label: '炎症' }, { href: '/microbiome', label: '細菌叢（マイクロバイオーム）' }, { href: '/oxidative-stress', label: '酸化ストレス' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                {/* 段階 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">「歯肉炎」と「歯周炎」は別の段階</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">「歯周病」とひとくくりにされがちですが、炎症が表面だけか、骨にまで及んでいるかで意味が大きく変わります。早い段階ほど、取り戻せる余地があります。</p>
                    <div className="space-y-3">
                        {stages.map((t) => (
                            <div key={t.name} className="bg-white/70 rounded-2xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">{t.name}</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{t.note}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">※ 「歯肉炎」は元に戻せる可逆的な段階ですが、「歯周炎」で溶けた骨は自然には戻りません。だからこそ、出血のうちに気づくことに意味があります。</p>
                </section>

                {/* サイン */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">見逃しやすい、初期のサイン</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-4">初期は痛みがないことも多いですが、体は小さなサインを出しています。とくに<strong>「歯みがきでの出血」</strong>は、歯ぐきが炎症を起こしているわかりやすい合図。当てはまるものが続くなら、歯科で相談を。</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {signs.map((s) => (
                            <li key={s} className="flex gap-3 text-sm text-[#1A1A1A]/85 leading-relaxed bg-white/60 rounded-xl p-3 border border-[#1A1A1A]/15">
                                <span className="text-[#FF9855] flex-shrink-0 font-bold">●</span><span>{s}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 全身への波及 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">本当に怖いのは「口の外」</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        歯周病が注目されるのは、それが<strong>口の中だけにとどまらない</strong>からです。炎症を起こした歯ぐきは、いわば<strong>体内に開いた小さな傷口</strong>。そこから細菌や、炎症を伝える物質（炎症性サイトカイン）が血流にのり、<strong>全身に静かな炎症をくすぶらせる</strong>と考えられています。
                        {'\n\n'}
                        とくに知られているのが<strong>糖尿病との双方向の関係</strong>です。血糖が高いと歯周病が悪化しやすく、逆に歯周病の炎症が<strong>インスリンの効きを下げ、血糖コントロールを悪くする</strong>——という、互いに足を引っぱり合う関係が報告されています。さらに、<strong>動脈硬化・心臓や血管の病気</strong>との関連や、飲み込んだ口腔細菌を通じた<strong>腸内環境</strong>への影響も研究が進んでいます。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ href: '/diabetes', label: '糖尿病（双方向の関係）' }, { href: '/inflammation', label: '慢性炎症' }, { href: '/gut-health', label: '腸内環境' }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-3 leading-relaxed">※ 「関連がある」ことと「原因である」ことは別です。これらは研究で示されたつながりであり、歯周病を治せばすべての病気が防げる、という意味ではありません。</p>
                </section>

                {/* 口の中の細菌叢 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">口の中にも「細菌叢」がある</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        腸と同じように、口の中にも<strong>たくさんの細菌が暮らす生態系（口腔マイクロバイオーム）</strong>があります。多くは無害で、本来はバランスを保っています。問題は、みがき残しや砂糖・喫煙・ストレスなどでこの<strong>バランスが崩れ、炎症を起こしやすい細菌が優勢になる</strong>とき。口腔と腸は<strong>1本の管でつながった連続した環境</strong>であり、口のケアは「腸活」の入口でもある、という見方ができます。
                    </p>
                </section>

                {/* できること */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">予防のうちに、できること</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">歯周病は、日々のケアと生活が大きな意味を持つ領域です（治療中の方は、必ず歯科の指示を優先してください）。土台は「細菌を減らす」と「炎症を起こしにくい体にする」の2方向です。</p>
                    <div className="space-y-3">
                        {[
                            { head: 'プラークを毎日リセットする', body: '歯ブラシに加え、歯と歯の間（フロス・歯間ブラシ）まで。細菌のかたまりは毎日たまり直すので、完璧より「毎日」が効く。', href: '/microbiome' },
                            { head: '血糖の波をなだらかに', body: '高血糖は歯ぐきの炎症を悪化させる。糖質に偏らない食べ方は、歯周病と糖尿病の両方に効く共通の一手。', href: '/blood-sugar' },
                            { head: '炎症を抑える栄養を意識する', body: 'ビタミンC・たんぱく質は歯ぐきの組織を支える材料。抗炎症的な食事は、全身のくすぶる炎症ごと整える。', href: '/inflammation' },
                            { head: '禁煙・睡眠・ストレスを整える', body: '喫煙は歯周病の最大級のリスク。睡眠不足や慢性ストレスも免疫を乱し、歯ぐきの治りを遅らせる。', href: '/sleep' },
                            { head: '定期的に歯科でクリーニング', body: '自分では取りきれない歯石・深いポケットの汚れは、プロのケアで。早期発見の場としても重要。', href: '/check' },
                        ].map((s) => (
                            <Link key={s.head} href={s.href} className="group flex items-start gap-4 bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div>
                                    <div className="font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#FF9855] transition-colors">{s.head}</div>
                                    <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">※ すでに治療中の方は、自己流のケアに切り替えず、必ず歯科医・歯科衛生士の指導に従ってください。</p>
                </section>

                {/* もっと学ぶ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/inflammation', label: '炎症' },
                            { href: '/diabetes', label: '糖尿病' },
                            { href: '/microbiome', label: 'マイクロバイオーム' },
                            { href: '/gut-health', label: '腸内環境' },
                            { href: '/oxidative-stress', label: '酸化ストレス' },
                            { href: '/modern-diseases', label: '現代病とは' },
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
