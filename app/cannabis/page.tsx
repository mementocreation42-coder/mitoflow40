import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '大麻をめぐる歴史と世界の動き ｜ 中立な解説 | Mitoflow40',
    description: '大麻（カンナビス）の歴史と、世界で進む合法化・日本の2024年法改正を、中立・教育的に解説します。日本では違法であり使用を推奨するものではありません。麻の文化史、禁止の経緯、医療用と嗜好用の違いを出典つきで紹介します。',
    alternates: { canonical: 'https://mitoflow40.com/cannabis' },
    robots: { index: true, follow: true },
    openGraph: {
        title: '大麻をめぐる歴史と世界の動き ｜ Mitoflow40',
        description: '麻の文化史・禁止の経緯・世界の合法化・日本の2024年法改正を中立的に。日本では違法です。',
        url: 'https://mitoflow40.com/cannabis',
        type: 'article',
    },
};

const timeline = [
    { era: '古代〜', head: '繊維・薬・祈りとともに', body: '大麻（麻）は、人類が古くから利用してきた植物です。衣料・縄などの繊維、薬、そして祈りの場で世界中に用いられてきました。日本でも「麻（あさ）」は、衣食住から神事まで暮らしに深く根づき、注連縄（しめなわ）など神道とのつながりも残っています。' },
    { era: '20世紀前半', head: '世界的な禁止へ', body: 'アメリカが1937年に事実上の規制を始め、1961年の国連条約で国際的に厳しく規制されました。世界全体が「禁止」へと大きく舵を切った時代です。' },
    { era: '1948年（日本）', head: '大麻取締法の制定', body: '日本では戦前まで、麻は繊維作物として広く栽培されていました。戦後の1948年、GHQの方針のもとで大麻取締法が制定され、栽培は免許制となり、所持などが規制されるようになりました。' },
    { era: '21世紀〜', head: '見直しの波', body: '2013年にウルグアイが世界で初めて国として合法化。以後、カナダ（2018年）やアメリカの一部の州、ドイツ（2024年）などで、医療用・嗜好用の合法化や規制緩和が進みました。一方で、慎重な国も依然として多数派です。' },
];

export default function CannabisPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E3E8DF' }}>
            <JsonLd data={medicalWebPage({ name: '大麻をめぐる歴史と世界の動き', description: '麻の文化史・禁止の経緯・世界の合法化・日本の2024年法改正を中立的に。日本では違法です。', path: '/cannabis' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '大麻をめぐる歴史と世界の動き', path: '/cannabis' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '大麻をめぐる歴史と世界の動き' }]} />
                <header className="mb-8 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>HISTORY &amp; POLICY ／ 中立な解説</p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        大麻をめぐる歴史と世界の動き
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[620px] mx-auto text-left">
                        大麻は、人類の歴史とともにあり、いままさに世界で評価が揺れ動いている植物です。このページは、その<strong>歴史と各国の動向を中立的に整理する</strong>もので、使用を勧めるものでは一切ありません。
                    </p>
                </header>

                {/* 最重要警告 */}
                <section className="mb-10 rounded-2xl p-6 md:p-7 border-2" style={{ background: '#FBE3DC', borderColor: '#C0392B' }}>
                    <h2 className="text-lg md:text-xl font-bold mb-3" style={{ color: '#C0392B' }}>⚠ 最初に必ずお読みください</h2>
                    <ul className="space-y-2 text-sm text-[#1A1A1A] leading-relaxed">
                        <li className="flex gap-2"><span style={{ color: '#C0392B' }} className="font-bold flex-shrink-0">●</span><span><strong>日本では、大麻の所持・栽培・使用は犯罪です。</strong>2024年12月の法改正で「使用罪」も新設され、規制はむしろ強化されました。</span></li>
                        <li className="flex gap-2"><span style={{ color: '#C0392B' }} className="font-bold flex-shrink-0">●</span><span>本ページは<strong>歴史・各国の制度を伝える教育目的</strong>のみで、使用・入手の方法は一切扱いません。</span></li>
                        <li className="flex gap-2"><span style={{ color: '#C0392B' }} className="font-bold flex-shrink-0">●</span><span>「海外で合法化が進んでいること」と「日本で使ってよいこと」は、<strong>まったく別の話</strong>です。</span></li>
                    </ul>
                </section>

                {/* 大麻とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">大麻とは、どんな植物か</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        大麻（カンナビス）は、繊維・種子・成分など、さまざまな用途を持つ植物です。含まれる成分のうち、よく知られるのが、精神作用のある<strong>THC</strong>と、精神作用のない<strong>CBD</strong>です。社会的に問題とされるのは主にTHCで、各国の規制も、近年は「植物そのもの」より「<strong>THCの含有量</strong>」を基準にする方向へ移りつつあります。
                        {'\n\n'}
                        繊維用に品種改良された「ヘンプ」のように、THCをほとんど含まないものもあり、「大麻＝すべて同じ」ではありません。この成分による線引きが、いまの議論を理解する鍵になります。
                    </p>
                </section>

                {/* 歴史 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">大麻の歴史——利用、禁止、そして見直し</h2>
                    <div className="space-y-3">
                        {timeline.map((t) => (
                            <div key={t.era} className="rounded-xl p-4 border border-[#1A1A1A]/15 bg-white/50">
                                <div className="text-[10px] font-bold tracking-widest text-[#41C9B4] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.era}</div>
                                <div className="font-bold text-[#1A1A1A] mb-1">{t.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{t.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[#4A4A4A]/60 mt-4 leading-relaxed">
                        ※ 日本の「麻文化」は繊維や神事に関わるもので、嗜好目的の使用とは文脈が異なります。歴史的に身近だったことと、現在の法律で許されることは別である点に注意してください。
                    </p>
                </section>

                {/* 世界の現在地 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">世界の現在地</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        いくつかの国・地域では、医療用にとどまらず嗜好用の合法化も進んでいます。カナダは2018年に国として合法化し<sup className="text-[#FF9855] font-bold">[1]</sup>、ヨーロッパではドイツが2024年に成人の使用を一定の範囲で合法化しました<sup className="text-[#FF9855] font-bold">[2]</sup>。
                        {'\n\n'}
                        アメリカでも変化が起きています。州ごとに合法化が進む中、<strong>2026年4月には連邦政府が、医療用大麻を規制の分類で引き下げる（スケジュールIIIへ）措置を取り始めました</strong>。ただし嗜好用は対象外で、より広い見直しをめぐる議論はなお続いています<sup className="text-[#FF9855] font-bold">[4]</sup>。
                        {'\n\n'}
                        ただし、これらは「自由放任」ではありません。年齢制限、購入量や流通の規制、運転や公共の場での制限などを伴う、<strong>管理された制度</strong>として設計されています。また世界全体で見れば、いまも禁止を維持する国の方が多く、各国が試行錯誤の最中にある——というのが正確な現状です（2026年6月時点）。
                    </p>
                </section>

                {/* 日本 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">日本の選んだ方向（2024年改正）</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        日本は、世界の合法化の流れとは逆に、規制を<strong>強める</strong>方向を選びました。2024年12月施行の法改正で、大麻の不正な「<strong>使用</strong>」そのものが新たに罪となり（使用罪）、所持の罰則も強化されました。大麻のTHCは「麻薬」として扱われます<sup className="text-[#FF9855] font-bold">[3]</sup>。
                        {'\n\n'}
                        一方で、同じ改正にはもう一つの側面があります。それまで一律に禁じられていた大麻由来の「<strong>医薬品</strong>」（難治性てんかんの治療薬など）について、<strong>承認・使用への制度上の道が開かれた</strong>のです。「<strong>嗜好目的は厳しく禁じ、医療目的の可能性には道を残す</strong>」——これが、日本の選んだ方向性です。
                        {'\n\n'}
                        ただし、これはあくまで「制度上の道が開いた」という段階です。<strong>2026年時点で、実際に承認・使用できる大麻由来医薬品はまだありません</strong>（注目された難治性てんかんの治療薬も、国内の臨床試験が難航し、承認の見通しははっきりしていません）。「制度はできたが、実物はこれから」というのが現状です。
                        {'\n\n'}
                        また、<strong>CBD</strong>そのものは規制対象ではなく、THCの残留が定められた基準（残留限度値。日本は諸外国より格段に厳しい）を満たす<strong>CBD製品</strong>は、いまも合法に流通しています。
                        {'\n\n'}
                        ただし、規制は「部位」から「成分」へと移り、いまも動き続けています。たとえば<strong>CBN</strong>など一部のカンナビノイドについては、新たに規制（指定薬物化）する方向で手続きが進められています（施行時期は流動的です）。「どの成分が、どの基準で合法か」という線引きは年々変わっているため、最新の状況は厚生労働省など公的な情報で確認するのが確実です（2026年6月時点）。
                    </p>
                </section>

                {/* 立場 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">Mitoflow40の立場</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        私たちがこのテーマに触れるのは、賛成や推奨のためではなく、<strong>事実と歴史を知るための教養として</strong>です。世界で議論が揺れているからこそ、感情論ではなく、正確な情報で捉えることが大切だと考えています。そして繰り返しになりますが、<strong>日本では大麻の使用・所持は違法</strong>です。私たちが軸にするのは、あくまで合法で安全な、食事・栄養・生活習慣による未病予防です。
                    </p>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は歴史・制度に関する一般的・教育的な情報であり、いかなる物質の使用も推奨・勧誘するものではありません。日本国内での大麻の所持・栽培・使用は犯罪です。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">参照</h2>
                    <ol className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-2 text-sm list-none">
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[1]</span>
                            <a href="https://www.canada.ca/en/health-canada/news/2018/10/canada-legalizes-and-strictly-regulates-cannabis.html" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Canada legalizes and strictly regulates cannabis（2018）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Government of Canada</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[2]</span>
                            <a href="https://www.loc.gov/item/global-legal-monitor/2024-04-18/germany-new-cannabis-act-enters-into-force/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Germany: New Cannabis Act Enters into Force（2024）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Library of Congress</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[3]</span>
                            <a href="https://www.mhlw.go.jp/stf/newpage_43079.html" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                大麻取締法及び麻薬及び向精神薬取締法の一部を改正する法律の施行について
                            </a>
                            <span className="text-[#1A1A1A]/50"> — 厚生労働省</span>
                        </li>
                        <li>
                            <span className="text-[#FF9855] font-bold mr-1">[4]</span>
                            <a href="https://www.justice.gov/opa/pr/justice-department-places-fda-approved-marijuana-products-and-products-containing-marijuana" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Justice Department Places FDA-Approved / State-Licensed Medical Marijuana in Schedule III（2026）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — U.S. Department of Justice</span>
                        </li>
                    </ol>
                </section>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/psychedelics-research" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">サイケデリック研究の潮流へ</Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
