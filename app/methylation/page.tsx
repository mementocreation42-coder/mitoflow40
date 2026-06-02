import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import { getGeneBySlug } from '@/lib/genes';
import JsonLd, { medicalWebPage } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'メチレーション（メチル化） | Mitoflow40',
    description: '解毒・神経伝達物質・DNA・血管を支える体の根幹反応「メチレーション（メチル化）」を、仕組み・関わる遺伝子と栄養素・ホモシステインとの関係からわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/methylation' },
    openGraph: {
        title: 'メチレーション（メチル化） | Mitoflow40',
        description: '体の根幹反応「メチレーション」を、仕組み・関わる遺伝子と栄養素・ホモシステインから解説。',
        url: 'https://mitoflow40.com/methylation',
        type: 'article',
    },
};

// メチレーションが担う仕事
const roles = [
    { title: '解毒', note: '毒素・ホルモン・薬物を処理しやすい形に変える' },
    { title: '神経伝達物質', note: 'セロトニン・ドーパミン・アドレナリンの合成と分解' },
    { title: 'DNA・遺伝子', note: '遺伝子のオン/オフを切り替え、修復する' },
    { title: '細胞膜・脂質', note: 'ホスファチジルコリンを作り、膜とミエリンを保つ' },
    { title: 'エネルギー・抗酸化', note: 'CoQ10・カルニチン・グルタチオン経路を支える' },
    { title: '血管の保護', note: 'ホモシステインを無害化し、血管を守る' },
];

// 関わる栄養素（メチル回路の材料・補因子）
const relNutrients = [
    { slug: 'folate', why: '活性型葉酸(5-MTHF)がメチル基を供給する中心' },
    { slug: 'b12', why: '葉酸と連携して回路を回す必須ビタミン' },
    { slug: 'b6', why: 'ホモシステインの処理（分解経路）に必要' },
    { slug: 'b2', why: 'MTHFRの補酵素として回路を下支え' },
    { slug: 'choline', why: 'もう一つのメチル供与経路（ベタイン）を担う' },
    { slug: 'methionine', why: 'メチル供与体SAMeの出発材料' },
];
// 関わる遺伝子
const relGenes = [
    { slug: 'mthfr', why: '葉酸を活性型に変えるメチレーションの起点' },
    { slug: 'comt', why: 'メチル基を使ってドーパミン等を分解' },
    { slug: 'pemt', why: 'メチル基を大量に消費して細胞膜の材料を作る' },
];

export default function MethylationPage() {
    const nutrients = relNutrients.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);
    const genes = relGenes.map((c) => ({ ...c, g: getGeneBySlug(c.slug) })).filter((c) => c.g);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E6EFD9' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-science.png" alt="" className="absolute pointer-events-none opacity-80 hidden md:block"
                style={{ top: '60px', right: '-50px', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/experience_vitality_new.png" alt="" className="absolute pointer-events-none opacity-40"
                style={{ bottom: '-60px', left: '-70px', width: '320px', transform: 'scaleX(-1)' }} />

            <JsonLd data={medicalWebPage({ name: 'メチレーション（メチル化）とは', description: '体の根幹反応「メチレーション」を、仕組み・関わる遺伝子と栄養素・ホモシステインから解説。', path: '/methylation' })} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '身体の仕組み', href: '/library#mechanism' }, { name: 'メチレーション' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        THE METHYL CYCLE
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        METHYLATION
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>メチレーション（メチル化）とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        体じゅうで「メチル基」という小さな目印を受け渡す根幹反応。解毒・気分・遺伝子・血管まで、静かに全身を支えています。
                    </p>
                </header>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">メチレーションとは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        メチレーション（メチル化）とは、「メチル基」というごく小さな部品（炭素1つ＋水素3つ）を、ある分子から別の分子へ受け渡す化学反応です。地味に聞こえますが、体の中で<strong>1秒間に何十億回</strong>も起きている、生命維持の根幹プロセスです。
                        {'\n\n'}
                        このメチル基の受け渡しによって、遺伝子のスイッチが切り替わり、神経伝達物質が作られ、毒素が処理され、細胞膜が組み立てられます。いわば全身に貼る「付箋（目印）」で、どこに何を貼るかで体の働きが変わります。
                        {'\n\n'}
                        メチレーションは単独では回りません。<strong>葉酸・B12・B6・コリン</strong>などの栄養素を材料・補酵素とし、<Link href="/genes/mthfr" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">MTHFR</Link> をはじめとする酵素が回路を回します。だからこそ、遺伝子と栄養素が交差する「ハブ」なのです。
                    </p>
                </section>

                {/* 担う仕事 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#41C9B4] pl-3 leading-tight">メチレーションが担う仕事</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        一つの反応が、これだけ幅広い働きの土台になっています。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {roles.map((r) => (
                            <div key={r.title} className="bg-white/70 rounded-xl p-5 border border-black">
                                <div className="font-bold text-[#1A1A1A] mb-1">{r.title}</div>
                                <p className="text-xs text-[#4A4A4A] leading-snug">{r.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ホモシステイン */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">「うまく回っているか」は測れる</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-4">
                        メチレーションの調子は、血液検査の<Link href="/biomarkers/homocysteine" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">ホモシステイン</Link>に表れます。
                        ホモシステインはメチル基を渡し終えた後に生じる中間物質で、葉酸・B12・B6によって再処理されます。回路が滞ると行き場を失って血中に増え、血管や神経への負担のサインになります。
                        高めの場合は、葉酸・B12・B6・コリンの充足を見直すのが基本です。
                    </p>
                    <Link href="/biomarkers/homocysteine" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition" style={{ fontFamily: "'Space Grotesk', sans-serif", background: '#1A1A1A', color: '#FFFFFF' }}>
                        ホモシステインを見る <span>→</span>
                    </Link>
                </section>

                {/* 関わる栄養素・遺伝子 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">メチレーションに関わる栄養素・遺伝子</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {nutrients.map(({ slug, why, n }) => (
                            <Link key={slug} href={`/nutrients/${slug}`}
                                className="flex items-start gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: n!.color }}>{n!.name}</span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                        {genes.map(({ slug, why, g }) => (
                            <Link key={slug} href={`/genes/${slug}`}
                                className="flex items-start gap-3 p-3 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif", background: g!.color }}>{g!.symbol}</span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 支えるコツ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">メチレーションを支えるコツ</h2>
                    <ul className="space-y-2 text-[#4A4A4A]">
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span>緑の葉物など<strong>天然葉酸</strong>を。MTHFRが気になる人は活性型(5-MTHF)を選ぶ</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span><strong>B12・B6</strong>を一緒に。葉酸だけの単独補給は避ける</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span>卵・レバーなど<strong>コリン</strong>源を取り入れる</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span>アルコールを控える（葉酸代謝を妨げる）</span></li>
                        <li className="flex gap-3"><span className="text-[#41C9B4] flex-shrink-0">●</span><span>ホモシステイン値で状態を確認する</span></li>
                    </ul>
                </section>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは一般的な解説であり、診断・治療やサプリメントの推奨を目的とするものではありません。
                </p>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/library#mechanism" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        身体の仕組み に戻る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
