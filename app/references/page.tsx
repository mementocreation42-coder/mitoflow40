import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '参照文献・出典 | Mitoflow40',
    description: 'Mitoflow40の解説が参照する一次情報・学術論文・公的機関の出典一覧。NIH・WHO・査読論文・ノーベル賞関連資料などの信頼できる情報源を、テーマ別にまとめています。',
    alternates: { canonical: 'https://mitoflow40.com/references' },
    openGraph: {
        title: '参照文献・出典 | Mitoflow40',
        description: 'Mitoflow40の解説が依拠する一次情報・学術論文・公的機関の出典一覧。NIH・WHO・査読論文などをテーマ別に掲載。',
        url: 'https://mitoflow40.com/references',
        type: 'article',
    },
};

type Ref = {
    title: string;
    publisher: string;
    year: string;
    url: string;
    note?: string;
    // この出典が支える主なサイト内ページ
    backs?: { href: string; label: string }[];
};

type RefGroup = {
    label: string;
    ja: string;
    items: Ref[];
};

const groups: RefGroup[] = [
    {
        label: 'WHAT IS HEALTH',
        ja: '健康の定義・考え方',
        items: [
            {
                title: 'Constitution of the World Health Organization（健康の定義）',
                publisher: 'WHO（世界保健機関）',
                year: '1948',
                url: 'https://www.who.int/about/governance/constitution',
                note: '健康を「病気・虚弱でないことではなく、身体的・精神的・社会的に完全に満たされた状態」と定義したWHO憲章。',
                backs: [{ href: '/health-philosophy', label: '健康とは' }],
            },
        ],
    },
    {
        label: 'PRECISION NUTRITION',
        ja: '精密栄養学・全体の土台',
        items: [
            {
                title: 'FACT SHEET: President Obama’s Precision Medicine Initiative',
                publisher: 'The White House（米国大統領府）',
                year: '2015',
                url: 'https://obamawhitehouse.archives.gov/the-press-office/2015/01/30/fact-sheet-president-obama-s-precision-medicine-initiative/',
                note: '「個人の遺伝子・環境・生活習慣の違いを考慮する」精密医療構想の起点。2016年度予算で2億1,500万ドルを投資。',
                backs: [{ href: '/precision-nutrition', label: '精密栄養学とは' }],
            },
            {
                title: 'NIH awards $170 million for precision nutrition study（Nutrition for Precision Health）',
                publisher: 'NIH（米国国立衛生研究所）',
                year: '2022',
                url: 'https://www.nih.gov/news-events/news-releases/nih-awards-170-million-precision-nutrition-study',
                note: '5年間で1億7,000万ドルを投じ、1万人規模で「個人ごとの食事への反応」を予測する大規模研究。',
                backs: [{ href: '/precision-nutrition', label: '精密栄養学とは' }],
            },
            {
                title: 'Personalized Nutrition by Prediction of Glycemic Responses',
                publisher: 'Zeevi et al., Cell（査読論文）',
                year: '2015',
                url: 'https://www.cell.com/fulltext/S0092-8674(15)01481-6',
                note: '同じ食事でも血糖の上がり方は人によって大きく違う——「個人差」を約800人・46,898食の連続血糖測定で示した代表的研究。',
                backs: [
                    { href: '/precision-nutrition', label: '精密栄養学とは' },
                    { href: '/blood-sugar', label: '血糖' },
                ],
            },
        ],
    },
    {
        label: 'MITOCHONDRIA & ENERGY',
        ja: 'ミトコンドリア・エネルギー代謝',
        items: [
            {
                title: 'Mitochondrial DNA（ミトコンドリアDNA）',
                publisher: 'MedlinePlus Genetics / NIH',
                year: '—',
                url: 'https://medlineplus.gov/genetics/chromosome/mitochondrial-dna/',
                note: 'ミトコンドリアDNAは37の遺伝子を持ち、うち13がATPを作る酸化的リン酸化（電子伝達系）の酵素をコードする、という基礎情報の出典。',
                backs: [
                    { href: '/mitochondria', label: 'ミトコンドリア' },
                    { href: '/atp', label: 'ATP' },
                    { href: '/electron-transport-chain', label: '電子伝達系' },
                    { href: '/tca-cycle', label: 'TCA回路' },
                    { href: '/glycolysis', label: '解糖系' },
                ],
            },
        ],
    },
    {
        label: 'CELLULAR MECHANISMS',
        ja: '細胞のしくみ（オートファジー・糖化）',
        items: [
            {
                title: 'The Nobel Prize in Physiology or Medicine 2016（オートファジーの仕組みの発見）',
                publisher: 'NobelPrize.org（大隅良典氏 受賞）',
                year: '2016',
                url: 'https://www.nobelprize.org/prizes/medicine/2016/press-release/',
                note: '細胞が自らの成分を分解・再利用する「オートファジー」の分子メカニズム解明にノーベル生理学・医学賞。',
                backs: [{ href: '/autophagy', label: 'オートファジー' }],
            },
            {
                title: 'The role of advanced glycation end products in aging and metabolic diseases',
                publisher: 'PMC / NIH（査読レビュー）',
                year: '2019',
                url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6355252/',
                note: '糖とタンパク質が結びつく「糖化」で生じるAGEs（終末糖化産物）が、加齢・代謝疾患に関わるしくみのレビュー。',
                backs: [{ href: '/glycation', label: '糖化' }],
            },
        ],
    },
    {
        label: 'BIOMARKERS & NUTRIENTS',
        ja: '検査・栄養素・サプリメント',
        items: [
            {
                title: 'Dietary Supplement Fact Sheets（栄養素・サプリメントのファクトシート一覧）',
                publisher: 'NIH Office of Dietary Supplements (ODS)',
                year: '—',
                url: 'https://ods.od.nih.gov/factsheets/list-all/',
                note: 'ビタミン・ミネラルなど各栄養素の働き・推奨量・上限量を、医療従事者向け／一般向けにまとめたNIH公式ファクトシート集。',
                backs: [
                    { href: '/nutrients', label: '栄養素' },
                    { href: '/supplements', label: 'サプリメント' },
                    { href: '/biomarkers', label: '血液検査' },
                ],
            },
            {
                title: 'Magnesium — Health Professional Fact Sheet',
                publisher: 'NIH Office of Dietary Supplements (ODS)',
                year: '—',
                url: 'https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/',
                note: 'マグネシウムは300超の酵素反応の補因子。個別栄養素ファクトシートの代表例。',
                backs: [{ href: '/nutrients', label: '栄養素' }],
            },
        ],
    },
    {
        label: 'FOOD & DIET',
        ja: '食べ物・食事',
        items: [
            {
                title: 'Trans fat — Fact sheet',
                publisher: 'WHO（世界保健機関）',
                year: '—',
                url: 'https://www.who.int/news-room/fact-sheets/detail/trans-fat',
                note: '工業的に作られるトランス脂肪酸の健康影響と、食品からの削減を求めるWHOの見解。',
                backs: [{ href: '/caution-foods', label: '気をつけたい食品' }],
            },
            {
                title: 'Carcinogenicity of the consumption of red meat and processed meat',
                publisher: 'WHO / IARC',
                year: '—',
                url: 'https://www.who.int/news-room/questions-and-answers/item/cancer-carcinogenicity-of-the-consumption-of-red-meat-and-processed-meat',
                note: '加工肉を「発がん性あり（グループ1）」、赤身肉を「おそらく発がん性あり（2A）」と分類。リスクは量と頻度しだいという解説も。',
                backs: [{ href: '/caution-foods', label: '気をつけたい食品' }],
            },
        ],
    },
    {
        label: 'TOXINS & SAFETY',
        ja: '有害物質・食の安全・嗜好品',
        items: [
            {
                title: 'No level of alcohol consumption is safe for our health',
                publisher: 'WHO（世界保健機関）',
                year: '2023',
                url: 'https://www.who.int/europe/news/item/04-01-2023-no-level-of-alcohol-consumption-is-safe-for-our-health',
                note: '健康にとって安全な飲酒量は存在しないとするWHOの見解。アルコールはIARCのグループ1発がん性物質。',
                backs: [{ href: '/stimulants', label: '嗜好品と体' }],
            },
            {
                title: 'Tobacco — Fact sheet',
                publisher: 'WHO（世界保健機関）',
                year: '—',
                url: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
                note: '喫煙の健康影響に関するWHOのファクトシート。世界の主要な死亡原因のひとつ。',
                backs: [{ href: '/stimulants', label: '嗜好品と体' }],
            },
            {
                title: '魚介類に含まれる水銀について（妊婦への摂取目安）',
                publisher: '厚生労働省',
                year: '—',
                url: 'https://www.mhlw.go.jp/topics/bukyoku/iyaku/syoku-anzen/suigin/',
                note: '大型魚に蓄積しやすい水銀について、とくに妊娠中の摂取量の目安を示した厚労省の注意事項。',
                backs: [{ href: '/reduce-toxins', label: '有害物質を減らす暮らし' }],
            },
            {
                title: 'Microplastics in drinking-water',
                publisher: 'WHO（世界保健機関）',
                year: '2019',
                url: 'https://www.who.int/publications/i/item/9789241516198',
                note: '飲料水中のマイクロプラスチックについて、現時点で健康リスクの明確な証拠はないとしつつ、さらなる研究の必要性を指摘。',
                backs: [{ href: '/reduce-toxins', label: '有害物質を減らす暮らし' }],
            },
            {
                title: 'Mycotoxins — Fact sheet',
                publisher: 'WHO（世界保健機関）',
                year: '—',
                url: 'https://www.who.int/news-room/fact-sheets/detail/mycotoxins',
                note: 'カビが作る有害物質「カビ毒」の種類と健康影響。アフラトキシンはIARCグループ1の発がん性物質。',
                backs: [{ href: '/mycotoxins', label: 'カビ毒と食の安全' }],
            },
        ],
    },
    {
        label: 'LIFESTYLE',
        ja: '生活習慣（睡眠・運動・体内時計）',
        items: [
            {
                title: 'The Nobel Prize in Physiology or Medicine 2017（概日リズムの分子機構の発見）',
                publisher: 'NobelPrize.org（Hall・Rosbash・Young 受賞）',
                year: '2017',
                url: 'https://www.nobelprize.org/prizes/medicine/2017/press-release/',
                note: '体内時計（概日リズム）を生み出す遺伝子レベルのフィードバック機構の解明にノーベル生理学・医学賞。',
                backs: [
                    { href: '/circadian-rhythm', label: '概日リズム' },
                    { href: '/sleep', label: '睡眠' },
                ],
            },
            {
                title: 'World Health Organization 2020 guidelines on physical activity and sedentary behaviour',
                publisher: 'WHO（世界保健機関）',
                year: '2020',
                url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7719906/',
                note: '成人は週150〜300分の中強度（または75〜150分の高強度）運動を、という運動・座位行動の国際ガイドライン。',
                backs: [{ href: '/exercise', label: '運動' }],
            },
        ],
    },
    {
        label: 'GUT & WHOLE BODY',
        ja: '腸と全身のつながり',
        items: [
            {
                title: 'The interplay between the gut-brain axis and the microbiome（腸脳相関と腸内細菌叢）',
                publisher: 'PMC / NIH（査読レビュー）',
                year: '2022',
                url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9650127/',
                note: '腸と脳が腸内細菌を介して双方向に影響し合う「腸脳相関」のレビュー。',
                backs: [{ href: '/gut-brain', label: '腸脳相関' }],
            },
        ],
    },
];

export default function ReferencesPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#CDEBE2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '参照文献・出典', description: 'Mitoflow40の解説が依拠する一次情報・学術論文・公的機関の出典一覧。', path: '/references' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '参照文献・出典', path: '/references' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '参照文献・出典' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        SOURCES &amp; CITATIONS
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        REFERENCES
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>参照文献・出典</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[620px] mx-auto">
                        Mitoflow40の解説は、できるかぎり<strong>信頼できる一次情報</strong>に基づいています。
                        NIH（米国国立衛生研究所）やWHO（世界保健機関）などの公的機関、査読を経た学術論文を中心に、テーマ別に出典をまとめました。
                    </p>
                </header>

                {/* 方針 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">出典についての方針</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        Mitoflow40は、健康・栄養という<strong>慎重さが求められる分野</strong>を扱っています。だからこそ、解説の土台には公的機関の資料や査読論文など、検証できる情報源を用いることを大切にしています。
                        {'\n\n'}
                        ここに挙げた出典は、各テーマの<strong>代表的・基礎的なもの</strong>です。各解説ページの内容すべてを網羅するものではなく、また医学的アドバイスに代わるものでもありません。サプリや食事の大きな変更、検査値の判断は、必ず医師・管理栄養士などの専門家にご相談ください。
                    </p>
                </section>

                {/* 出典グループ */}
                {groups.map((group) => (
                    <section key={group.label} className="mb-10">
                        <div className="mb-5">
                            <p className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{group.label}</p>
                            <h2 className="text-2xl font-bold text-[#1A1A1A] border-l-4 border-[#41C9B4] pl-3 leading-tight">{group.ja}</h2>
                        </div>
                        <ol className="space-y-3">
                            {group.items.map((ref) => (
                                <li key={ref.url} className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                                    <a href={ref.url} target="_blank" rel="noopener noreferrer"
                                        className="group block">
                                        <div className="flex items-start gap-2 mb-1">
                                            <span className="font-bold text-[#1A1A1A] leading-snug group-hover:text-[#FF9855] transition-colors">
                                                {ref.title}
                                            </span>
                                            <span className="shrink-0 text-[#41C9B4] group-hover:translate-x-0.5 transition-transform" aria-hidden>↗</span>
                                        </div>
                                        <div className="text-xs text-[#1A1A1A]/60 font-medium mb-2">
                                            {ref.publisher}{ref.year !== '—' ? `（${ref.year}）` : ''}
                                        </div>
                                    </a>
                                    {ref.note && (
                                        <p className="text-sm text-[#4A4A4A] leading-relaxed mb-3">{ref.note}</p>
                                    )}
                                    {ref.backs && ref.backs.length > 0 && (
                                        <div className="flex flex-wrap items-center gap-2 pt-1">
                                            <span className="text-[10px] font-bold tracking-wider text-[#1A1A1A]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>RELATED</span>
                                            {ref.backs.map((b) => (
                                                <Link key={b.href} href={b.href}
                                                    className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">
                                                    {b.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </section>
                ))}

                {/* 補足 */}
                <section className="mb-10">
                    <div className="bg-white/70 rounded-2xl p-6 border border-black">
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            外部リンクは別タブで開きます。リンク先の内容・運営についてMitoflow40は責任を負いません。リンク切れや誤りにお気づきの場合は、<Link href="/#contact" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855] font-bold">お問い合わせ</Link>からお知らせいただけると助かります。
                        </p>
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
