import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '脂肪肝（MASLD）とは｜お酒を飲まなくてもなる"沈黙の現代病" | Mitoflow40',
    description: '脂肪肝とは、肝臓に脂肪がたまりすぎた状態。いまはお酒を飲まない人の脂肪肝（MASLD／旧NAFLD）が急増しています。原因（糖質・果糖・内臓脂肪・インスリン抵抗性）、自覚症状の乏しさ、糖尿病や心血管病の入口になる理由、そして戻せる段階での対策を、生化学ベースで出典つきに解説します。',
    alternates: { canonical: 'https://mitoflow40.com/fatty-liver' },
    openGraph: {
        title: '脂肪肝（MASLD）とは｜お酒を飲まなくてもなる"沈黙の現代病" | Mitoflow40',
        description: '肝臓に脂肪がたまる脂肪肝（MASLD）。原因・無症状で進む怖さ・糖尿病や心血管病との関係・戻せる対策を解説。',
        url: 'https://mitoflow40.com/fatty-liver',
        type: 'article',
    },
};

const stages = [
    { name: '単純性脂肪肝', en: 'STEATOSIS', body: '肝臓に脂肪がたまった初期段階。この時点では炎症は少なく、生活の見直しで戻せることが多い。', tone: '#41C9B4' },
    { name: '脂肪肝炎（MASH/NASH）', en: 'STEATOHEPATITIS', body: '脂肪に炎症が加わった段階。肝細胞が傷つきはじめ、線維化（かたくなる）が進みうる。', tone: '#F0B429' },
    { name: '線維化・肝硬変', en: 'FIBROSIS / CIRRHOSIS', body: '炎症が長引くと肝臓が硬く変質。肝硬変や肝がんのリスクが上がる。ここまで進むと戻しにくい。', tone: '#E08A8A' },
];

export default function FattyLiverPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F3E2D2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '脂肪肝（MASLD）とは', description: '肝臓に脂肪がたまる脂肪肝（MASLD）。原因・無症状で進む怖さ・糖尿病や心血管病との関係・戻せる対策を解説。', path: '/fatty-liver' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '身体の仕組み', path: '/library#aging' }, { name: '脂肪肝とは', path: '/fatty-liver' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '老化と不調の土台', href: '/library#aging' }, { name: '脂肪肝とは' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>FATTY LIVER / MASLD</p>
                    <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-8 md:mt-8 md:mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        脂肪肝とは
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-loose max-w-[640px] mx-auto text-left">
                        「脂肪肝はお酒を飲む人の病気」——それはもう古い常識です。いま増えているのは、<strong>お酒をほとんど飲まない人の脂肪肝（MASLD／旧NAFLD）</strong>。痛くもかゆくもないまま静かに進み、<strong>糖尿病や心臓病の入口</strong>にもなる、まさに現代の代表的な不調です。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">脂肪肝＝肝臓に脂肪がたまりすぎた状態</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        脂肪肝とは、その名のとおり<strong>肝臓の細胞に中性脂肪がたまりすぎた状態</strong>です。肝臓は栄養の中継基地（→<Link href="/food-journey" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">運搬の段階</Link>）。ここに脂肪が過剰にたまると、本来の働き（解毒・代謝・貯蔵）が少しずつ妨げられます。
                        {'\n\n'}
                        かつて脂肪肝の主因はお酒でしたが、現在は<strong>食べすぎ・糖質や果糖のとりすぎ・運動不足・内臓脂肪</strong>による「非アルコール性」が主流に。近年は代謝の問題と結びつけて<strong>MASLD（代謝異常関連脂肪性肝疾患）</strong>と呼ばれるようになりました。日本でも成人の<strong>3〜4人に1人</strong>とされ、ありふれた状態です。
                    </p>
                </section>

                {/* なぜ起きる */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#FF9855] pl-3 leading-tight">なぜたまるのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        食べすぎた糖質、とくに<strong>果糖（清涼飲料・お菓子・果汁）</strong>は、肝臓で脂肪に変えられて蓄えられます。さらに<strong>インスリン抵抗性</strong>（インスリンが効きにくい状態）があると、脂肪が肝臓にたまりやすくなります。
                        {'\n\n'}
                        だから脂肪肝は、<strong>血糖の乱れ・内臓肥満・脂質異常と同じ根っこ</strong>を持つ「メタボの一員」。お酒の有無にかかわらず、<strong>糖と内臓脂肪のコントロール</strong>がカギになります。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/blood-sugar" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">血糖コントロール</Link>
                        <Link href="/organs/liver" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">肝臓の働き</Link>
                        <Link href="/diabetes" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">糖尿病</Link>
                    </div>
                </section>

                {/* 進行段階 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#FF9855] pl-3 leading-tight">放っておくと、どう進むか</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">多くは初期で止まりますが、一部は静かに進行します。早い段階ほど戻しやすいのがポイントです。</p>
                    <div className="space-y-3">
                        {stages.map((s, i) => (
                            <div key={s.en} className="flex gap-4 bg-white/70 rounded-2xl p-5 border border-black">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow shrink-0"
                                    style={{ background: s.tone, fontFamily: "'Space Grotesk', sans-serif" }}>{i + 1}</div>
                                <div>
                                    <div className="text-[10px] font-bold tracking-widest mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: s.tone }}>{s.en}</div>
                                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{s.name}</h3>
                                    <p className="text-sm text-[#4A4A4A] leading-relaxed">{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 気づき方 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">自覚症状はほとんどない──だから数値で見る</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        脂肪肝のいちばんやっかいなところは、<strong>初期にはほとんど症状が出ない</strong>こと。だからこそ、年に一度の健診の数値が手がかりになります。<strong>ALT（GPT）・AST（GOT）・γ-GTP</strong>などの肝機能の値や、腹部エコーで見つかることが多いです。
                        {'\n\n'}
                        「お酒を飲まないから関係ない」と思わず、<strong>肝機能の数値・お腹まわり・血糖や中性脂肪</strong>をあわせて見ておくと、早い段階で気づけます。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/biomarkers" className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">血液検査の見方</Link>
                    </div>
                </section>

                {/* 戻す */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">戻せる病気でもある</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">朗報は、初期の脂肪肝は<strong>生活の見直しで改善が期待できる</strong>こと。薬より、まず日々の積み重ねです。</p>
                    <div className="space-y-3">
                        {[
                            { head: '果糖・糖質のとりすぎを見直す', body: '清涼飲料・お菓子・果汁を減らす。肝臓に脂肪をためる最大の入口をしぼる。' },
                            { head: '内臓脂肪を減らす', body: '体重の数%減らすだけでも肝臓の脂肪は大きく改善しうる。極端な断食より、続く減量を。' },
                            { head: '体を動かす', body: '有酸素運動と筋トレ。筋肉が糖と脂肪の受け皿になり、インスリンの効きも改善する。' },
                            { head: 'お酒は適量・休肝日', body: '非アルコール性でも、お酒は肝臓の負担を上乗せする。飲むなら量と頻度を抑える。' },
                        ].map((s) => (
                            <div key={s.head} className="bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15">
                                <div className="font-bold text-[#1A1A1A] mb-0.5">{s.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-snug">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 免責 */}
                <p className="text-xs text-[#4A4A4A]/70 leading-relaxed mb-8 p-4 bg-white/60 rounded-lg border border-[#1A1A1A]/10">
                    ※ 本記事は一般的な健康情報であり、診断・治療を目的とするものではありません。健診で肝機能の異常を指摘された場合や、進行が心配な場合は、必ず医療機関にご相談ください。
                </p>

                {/* 参照 */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#41C9B4] pl-3 leading-tight">このページの参照</h2>
                    <ul className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black space-y-3 text-sm">
                        <li>
                            <a href="https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                Nonalcoholic Fatty Liver Disease (NAFLD) & NASH（非アルコール性脂肪肝の概要）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — NIDDK（米国国立衛生研究所）</span>
                        </li>
                        <li>
                            <a href="https://pubmed.ncbi.nlm.nih.gov/37363821/" target="_blank" rel="noopener noreferrer"
                                className="text-[#1A1A1A] underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">
                                A multi-society Delphi consensus on new fatty liver disease nomenclature（MASLDという新名称の合意）
                            </a>
                            <span className="text-[#1A1A1A]/50"> — Rinella ME ら, Hepatology / J Hepatol, 2023</span>
                        </li>
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/70 mt-2">
                        全テーマの出典は{' '}
                        <Link href="/references" className="underline decoration-[#41C9B4] decoration-2 underline-offset-2 font-bold hover:text-[#41C9B4]">参照文献・出典ページ</Link>
                        {' '}にまとめています。
                    </p>
                </section>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/modern-diseases" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">現代病とは</Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← Library に戻る</Link>
                </div>
            </article>
        </div>
    );
}
