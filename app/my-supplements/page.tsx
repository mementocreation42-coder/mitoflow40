import Link from 'next/link';
import { getNutrientBySlug } from '@/lib/nutrients';
import { MY_SUPPLEMENTS, UPDATED_AT, IHERB_HOME, KIND_META, iherbUrl, type MySupplement } from '@/lib/my-supplements';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '僕が飲んでいるサプリ ｜ 単体で、体に聞きながら | Mitoflow40',
    description: 'Mitoflow40 の著者・小林大介がいま飲んでいるサプリの記録。マルチではなく単体で摂り、合わないものは減らす。iHerb で買っています（広告リンクを含みます）。',
    alternates: { canonical: 'https://mitoflow40.com/my-supplements' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: '僕が飲んでいるサプリ | Mitoflow40',
        description: 'マルチではなく単体で、体に聞きながら。著者がいま飲んでいるサプリの記録。',
        url: 'https://mitoflow40.com/my-supplements',
        type: 'article',
    },
};

const STATUS: Record<MySupplement['status'], { label: string; bg: string }> = {
    taking: { label: '飲んでいる', bg: '#D7F0E8' },
    paused: { label: '見合わせ中', bg: '#EEEEEE' },
    food: { label: '食品として', bg: '#FBE9D0' },
};

function ymd(d: string) { const [y, m, dd] = d.split('-').map(Number); return `${y}年${m}月${dd}日`; }

export default function MySupplementsPage() {
    const groups: { title: string; items: MySupplement[] }[] = [
        { title: 'いま飲んでいるもの', items: MY_SUPPLEMENTS.filter((s) => s.status === 'taking') },
        { title: '食品として摂っているもの', items: MY_SUPPLEMENTS.filter((s) => s.status === 'food') },
        { title: '見合わせているもの', items: MY_SUPPLEMENTS.filter((s) => s.status === 'paused') },
    ];

    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#EDE6D3' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block mf-deco-flip"
                style={{ top: '-48px', right: '0', width: '260px' }} />
            <JsonLd data={medicalWebPage({ name: '僕が飲んでいるサプリ', description: '著者がいま飲んでいるサプリの記録。', path: '/my-supplements' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: 'サプリメントの選び方', path: '/supplements' }, { name: '僕が飲んでいるサプリ', path: '/my-supplements' }])} />

            <article className="max-w-[760px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: 'サプリメントの選び方', href: '/supplements' }, { name: '僕が飲んでいるサプリ' }]} />

                {/* 広告の表示（景品表示法のステマ規制） */}
                <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1A1A1A]/30 bg-white/80 px-3 py-1 text-xs text-[#4A4A4A]">
                    <span className="rounded-full bg-[#1A1A1A] px-2 py-0.5 text-[10px] font-bold text-white">PR</span>
                    このページには広告（iHerb のアフィリエイトリンク）が含まれます
                </p>

                <header className="mb-10">
                    <div className="text-xs tracking-widest text-[#1A1A1A]/50 font-mono mb-3">MY SUPPLEMENTS</div>
                    <h1 className="text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4">僕が飲んでいるサプリ</h1>
                    <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                        Mitoflow40 の小林です。僕がいま実際に飲んでいるサプリを、そのまま並べました。おすすめのリストではなく、ひとりの記録（n=1）です。
                    </p>
                    <p className="mt-2 text-xs text-[#4A4A4A]/80">最終更新：{ymd(UPDATED_AT)}</p>
                </header>

                <section className="mb-12 rounded-2xl border border-[#1A1A1A] bg-white/80 p-5 md:p-6">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">飲み方のルール</h2>
                    <ul className="space-y-2 text-sm text-[#1A1A1A] leading-relaxed">
                        <li>・マルチビタミンではなく、ひとつずつ単体で摂っています。どれがどう効いているかを、体に聞くためです。</li>
                        <li>・必要がなさそうなものは、積極的に減らします。一時は 1 日 10 種類を超えていましたが、いまは 5〜7 種類ほどに落ち着いています。</li>
                        <li>・あくまで、毎日の食事で足りない分の補助です。サプリを手放せるくらいの体になるのが、いちばんだと思っています。</li>
                        <li>・買うのは iHerb です。6,000 円以上で送料無料になるので、9,000 円分ほどを年に 4 回くらいに分けて買っています。</li>
                    </ul>
                </section>

                {groups.filter((g) => g.items.length).map((g) => (
                    <section key={g.title} className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">{g.title}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {g.items.map((s) => {
                                const n = s.nutrientSlug ? getNutrientBySlug(s.nutrientSlug) : undefined;
                                const st = STATUS[s.status];
                                return (
                                    <div key={s.name} className={`flex gap-3 rounded-2xl border border-[#1A1A1A]/20 bg-white/80 p-4 ${s.status === 'paused' ? 'opacity-70' : ''}`}>
                                        <Thumb s={s} />
                                        <div className="flex flex-col min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="text-base font-bold text-[#1A1A1A]">{s.name}</span>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-[#1A1A1A]/70" style={{ background: st.bg }}>{st.label}</span>
                                        </div>
                                        {s.note && <p className="text-[13px] text-[#1A1A1A] leading-relaxed">{s.note}</p>}
                                        {n && <p className="text-xs text-[#4A4A4A] leading-relaxed mt-1">ライブラリ：<Link href={`/nutrients/${n.slug}`} className="font-bold underline underline-offset-2">{n.name}</Link>（{n.tagline}）</p>}
                                        {s.status !== 'paused' && (
                                            <a href={iherbUrl(s)} target="_blank" rel="sponsored noopener noreferrer"
                                                className="mt-3 self-start inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold text-[#1A1A1A] bg-[#FF9855] border border-[#1A1A1A]">
                                                iHerb で見る <span aria-hidden>↗</span> <span className="ml-1 text-[9px] font-normal opacity-70">PR</span>
                                            </a>
                                        )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}

                <section className="mb-12 rounded-2xl border border-[#1A1A1A] bg-white/80 p-5 md:p-6">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">真似する前に</h2>
                    <ul className="space-y-2 text-sm text-[#1A1A1A] leading-relaxed">
                        <li>・何が足りないかは、人によって違います。僕に合っているものが、ほかの人に合うとは限りません。まず血液検査で、自分に足りないものを知ってからがおすすめです。</li>
                        <li>・持病のある方、薬を飲んでいる方、妊娠中・授乳中の方は、必ず医師・薬剤師に相談してください。</li>
                        <li>・僕は医師ではありません。このページは診断や治療の代わりになるものではありません。</li>
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Link href="/supplements" className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">サプリメントの選び方 →</Link>
                        <Link href="/biomarkers/reader" className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">検査値リーダー →</Link>
                        <Link href="/plans" className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">血液検査の解析 →</Link>
                    </div>
                </section>

                <p className="text-xs text-[#4A4A4A]/80 leading-relaxed">
                    iHerb へのリンクには紹介コードが付いています。このリンクから買い物をすると、僕に紹介料が入ります。価格は変わりません。
                    <a href={IHERB_HOME} target="_blank" rel="sponsored noopener noreferrer" className="ml-1 underline">iHerb のトップ ↗</a>
                </p>
            </article>
        </div>
    );
}

// サムネイル：周期表ふうのタイル（記号＋種類の色）。商品写真を使わず、見分けやすさだけを担う
function Thumb({ s }: { s: MySupplement }) {
    const k = KIND_META[s.kind];
    const long = s.symbol.length > 3;
    return (
        <div aria-hidden className="relative flex-shrink-0 w-16 h-16 md:w-[72px] md:h-[72px] rounded-xl border-2 border-[#1A1A1A] flex items-center justify-center shadow-[2px_2px_0_#1A1A1A]"
            style={{ background: k.bg, color: k.fg }}>
            <span className={`font-bold leading-none ${long ? 'text-[13px]' : 'text-2xl'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.symbol}</span>
            <span className="absolute bottom-1 left-0 right-0 text-center text-[8px] font-bold opacity-80">{k.label}</span>
        </div>
    );
}
