import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import JsonLd, { medicalWebPage } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '電子伝達系（ETC） | Mitoflow40',
    description: 'ミトコンドリアでATPの大半を生み出す最終工程「電子伝達系」を、仕組み・酸素と活性酸素の関係・必要な栄養素から、TCA回路・ATPとのつながりとあわせてわかりやすく解説。',
    alternates: { canonical: 'https://mitoflow40.com/electron-transport-chain' },
    openGraph: {
        title: '電子伝達系（ETC） | Mitoflow40',
        description: 'ATPの大半を生み出す最終工程「電子伝達系」を、仕組み・酸素と活性酸素・必要な栄養素から解説。',
        url: 'https://mitoflow40.com/electron-transport-chain',
        type: 'article',
    },
};

// 5つの複合体（簡略）
const complexes = [
    { name: '複合体 I〜II', note: 'TCA回路が運んできた NADH・FADH2 から電子を受け取る入口' },
    { name: 'CoQ10', note: '受け取った電子を次へ運ぶ「運搬役」。脂溶性の電子キャリア', href: '/nutrients/coq10' },
    { name: '複合体 III〜IV', note: '電子を受け渡しながら、最後に酸素と結びつけて水にする（鉄が必須）' },
    { name: '複合体 V（ATP合成酵素）', note: '生まれた水素イオンの流れを使って ATP を組み立てるモーター', href: '/atp' },
];

const cofactors = [
    { slug: 'coq10', why: '複合体間で電子を運ぶ必須の運搬役' },
    { slug: 'iron', why: '複合体や酸素利用の最終工程に不可欠' },
    { slug: 'copper', why: '酸素と結合させる複合体IVの構成成分' },
    { slug: 'niacin', why: 'NAD+として電子を運び込む' },
    { slug: 'b2', why: 'FADとして電子を受け渡す' },
    { slug: 'alpha-lipoic-acid', why: '漏れた活性酸素を抑える抗酸化サポート' },
];

export default function EtcPage() {
    const nutrients = cofactors.map((c) => ({ ...c, n: getNutrientBySlug(c.slug) })).filter((c) => c.n);

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#D9E6F2' }}>
            <img loading="lazy" decoding="async" src="/images/experience_vitality_new.png" alt="" className="absolute pointer-events-none opacity-80 hidden md:block"
                style={{ top: '60px', right: '-50px', width: '260px' }} />
            <img loading="lazy" decoding="async" src="/images/for-you-science.png" alt="" className="absolute pointer-events-none opacity-40"
                style={{ bottom: '-60px', left: '-70px', width: '320px', transform: 'scaleX(-1)' }} />

            <JsonLd data={medicalWebPage({ name: '電子伝達系（ETC）とは', description: 'ATPの大半を生み出す最終工程「電子伝達系」を、仕組み・酸素と活性酸素・必要な栄養素から解説。', path: '/electron-transport-chain' })} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '電子伝達系' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        ENERGY FINAL STEP
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        ETC
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>電子伝達系とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[560px] mx-auto">
                        ミトコンドリアで、ATPの大半を生み出す最終工程。酸素を使い切る、エネルギー産生のクライマックスです。
                    </p>
                </header>

                {/* 三部作の位置づけ */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <p className="text-xs font-bold tracking-wider mb-4 text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        WHERE IT FITS ／ エネルギー産生の最終段階
                    </p>
                    <div className="flex flex-col sm:flex-row items-stretch gap-2">
                        <Link href="/tca-cycle" className="flex-1 rounded-xl p-4 text-center border border-black hover:-translate-y-0.5 transition-transform" style={{ background: '#FFE9D2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>STEP 1</div>
                            <div className="font-bold text-[#1A1A1A]">TCA回路</div>
                            <div className="text-xs text-[#1A1A1A]/60 mt-0.5">電子の運び屋を作る</div>
                        </Link>
                        <span className="hidden sm:flex items-center text-[#1A1A1A]/30 font-bold">→</span>
                        <div className="flex-1 rounded-xl p-4 text-center border-2 border-[#1A1A1A]" style={{ background: '#D9E6F2' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>STEP 2</div>
                            <div className="font-bold text-[#1A1A1A]">電子伝達系</div>
                            <div className="text-xs text-[#1A1A1A]/60 mt-0.5">酸素でATPを量産</div>
                        </div>
                        <span className="hidden sm:flex items-center text-[#1A1A1A]/30 font-bold">→</span>
                        <Link href="/atp" className="flex-1 rounded-xl p-4 text-center border border-black hover:-translate-y-0.5 transition-transform" style={{ background: '#D7F0E8' }}>
                            <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>STEP 3</div>
                            <div className="font-bold text-[#1A1A1A]">ATP</div>
                            <div className="text-xs text-[#1A1A1A]/60 mt-0.5">エネルギー通貨</div>
                        </Link>
                    </div>
                </section>

                {/* とは */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">電子伝達系とは</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        電子伝達系（ETC）は、ミトコンドリアの内膜にずらりと並んだタンパク質の「リレー」です。<Link href="/tca-cycle" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">TCA回路</Link>が作った電子の運び屋（NADH・FADH2）から電子を受け取り、複合体から複合体へとバケツリレーのように受け渡していきます。
                        {'\n\n'}
                        このリレーの力で、水素イオン(H+)が膜の外へ汲み出され、濃度差（電位差）が生まれます。最後にその流れがダム放流のように戻る勢いを使って、複合体V（ATP合成酵素）が <Link href="/atp" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">ATP</Link> を一気に組み立てます。実は、私たちが1日に作るATPの<strong>大半（約9割）がこの工程</strong>で生まれます。
                        {'\n\n'}
                        そして電子の最終的な受け取り手が<strong>酸素</strong>です。電子と水素が酸素と結びついて水になり、リレーが完結します。私たちが呼吸で酸素を必要とする本当の理由は、この電子伝達系を回しきるためなのです。
                    </p>
                </section>

                {/* 流れ */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">電子のリレー（ざっくり）</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        内膜に並ぶ複合体を、電子が順に通り抜けていきます。
                    </p>
                    <div className="space-y-2">
                        {complexes.map((c, i) => (
                            <div key={c.name}>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/70 border border-black">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#41C9B4] text-white text-sm font-bold flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{i + 1}</span>
                                    <div className="flex-1">
                                        <div className="font-bold text-[#1A1A1A]">
                                            {c.href ? (
                                                <Link href={c.href} className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">{c.name}</Link>
                                            ) : c.name}
                                        </div>
                                        <p className="text-xs text-[#4A4A4A] mt-0.5">{c.note}</p>
                                    </div>
                                </div>
                                {i < complexes.length - 1 && <div className="text-center text-[#FF9855] text-lg leading-none py-1">↓</div>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 活性酸素との関係 */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">活性酸素が生まれる場所でもある</h2>
                    <p className="text-[#4A4A4A] leading-loose">
                        電子伝達系は強力なエネルギー工場であると同時に、電子の一部が漏れて<Link href="/oxidative-stress" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">活性酸素</Link>が生まれる場所でもあります。
                        ミトコンドリアの質が落ちると電子の漏れが増え、酸化ストレスが高まる——だからこそ、<Link href="/autophagy" className="underline decoration-[#FF9855] decoration-2 underline-offset-2 hover:text-[#FF9855]">質の良いミトコンドリアを保つこと</Link>と、抗酸化の備えが、エネルギーと若さの両方に効いてきます。
                    </p>
                </section>

                {/* 栄養素 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">電子伝達系を支える栄養素</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">
                        電子の運搬と酸素利用には、これらの栄養素が欠かせません。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {nutrients.map(({ slug, why, n }) => (
                            <Link key={slug} href={`/nutrients/${slug}`}
                                className="flex items-start gap-3 p-4 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-sm transition-all bg-white/70">
                                <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold text-[#1A1A1A]" style={{ background: n!.color }}>{n!.name}</span>
                                <span className="text-xs text-[#4A4A4A] leading-snug">{why}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <p className="text-xs text-[#4A4A4A]/60 leading-relaxed mb-12 p-4 bg-white/60 rounded-lg">
                    ※ 本ページは生化学の一般的な解説であり、診断・治療を目的とするものではありません。
                </p>

                <div className="text-center flex flex-wrap justify-center gap-3">
                    <Link href="/tca-cycle" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        TCA回路を見る
                    </Link>
                    <Link href="/atp" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ATPを見る
                    </Link>
                    <Link href="/library" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">
                        ← Library に戻る
                    </Link>
                </div>
            </article>
        </div>
    );
}
