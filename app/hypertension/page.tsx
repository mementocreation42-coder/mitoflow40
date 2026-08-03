import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: '高血圧とは｜家庭血圧・原因・血管への影響と生活の整え方 | Mitoflow40',
    description: '高血圧は、症状がないまま血管・心臓・脳・腎臓に負担をかけることがある病気です。血圧の数字の意味、家庭での測り方、原因、受診の目安、生活でできることを中立に解説します。',
    alternates: { canonical: 'https://mitoflow40.com/hypertension' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: '高血圧とは | Mitoflow40',
        description: '血圧の数字の意味、家庭血圧、原因、血管への影響、生活でできることをわかりやすく。',
        url: 'https://mitoflow40.com/hypertension',
        type: 'article',
    },
};

const pressures = [
    { name: '収縮期血圧（上）', note: '心臓が縮んで血液を送り出したとき、血管にかかる圧力。' },
    { name: '拡張期血圧（下）', note: '心臓が広がって次の血液をためているとき、血管に残る圧力。' },
];

const measurementSteps = [
    '朝は起床後1時間以内・排尿後・朝食や服薬の前に測る',
    '夜は就寝前に測る',
    '椅子に座って1〜2分安静にし、脚を組まず、腕を心臓の高さに置く',
    '原則2回測って両方を記録し、単発の値より日々の平均を見る',
];

const dailyActions = [
    { head: '塩分を「見える化」する', body: '汁物・加工食品・外食・たれ類には塩分が重なりやすい。味を薄くするだけでなく、頻度と量を見直す。', href: '/foods' },
    { head: '無理のない運動を続ける', body: '歩行などの有酸素運動を中心に、座りっぱなしを減らす。治療中や持病がある場合は医師と強度を相談する。', href: '/exercise' },
    { head: '睡眠・飲酒・喫煙を見直す', body: '寝不足、過度な飲酒、喫煙は血圧と血管の負担に関わる。いびきや日中の強い眠気も相談の手がかりになる。', href: '/sleep' },
    { head: '体重より腹囲の変化にも注目', body: '内臓脂肪が増えると、血圧・血糖・脂質の問題が重なりやすい。急激な減量ではなく続けられる変化を。', href: '/modern-diseases' },
];

export default function HypertensionPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#E2EAF2' }}>
            <img loading="lazy" decoding="async" src="/images/for-you/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/misc/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: '高血圧とは', description: '血圧の数字の意味、家庭血圧、原因、血管への影響、生活でできることを解説。', path: '/hypertension' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: '老化と不調の土台', path: '/library#aging' }, { name: '高血圧', path: '/hypertension' }])} />

            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: '老化と不調の土台', href: '/library#aging' }, { name: '高血圧' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2 text-[#4F78A0]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HYPERTENSION</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        BLOOD PRESSURE
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>高血圧とは</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[580px] mx-auto">
                        痛みがなくても、血管には毎日圧がかかっています。高血圧は<strong>「数字の病気」ではなく、血管と臓器に負担が積み重なる状態</strong>です。
                    </p>
                </header>

                <div className="mb-10 rounded-2xl p-5 border border-[#4F78A0] bg-white/70">
                    <p className="text-sm text-[#1A1A1A]/85 leading-relaxed">
                        <strong className="text-[#4F78A0]">はじめに：</strong>このページは理解を助けるための教育的な情報で、診断や治療の代わりではありません。血圧の薬を自己判断で中断・変更しないでください。健診で高値を指摘された方、家庭でも高い値が続く方は医療機関にご相談ください。
                    </p>
                </div>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#4F78A0] pl-3 leading-tight">血圧は、血液が血管を押す力</h2>
                    <p className="text-[#4A4A4A] leading-loose mb-5">
                        心臓はポンプのように縮んだり広がったりしながら、全身へ血液を送ります。血圧は、その血液が動脈の壁を内側から押す力です。心拍ごとに上下するため、2つの数字で表します。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {pressures.map((p) => (
                            <div key={p.name} className="rounded-xl bg-white/70 border border-[#1A1A1A]/15 p-4">
                                <div className="font-bold text-[#1A1A1A] mb-1">{p.name}</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{p.note}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#4A4A4A] leading-loose mt-5">
                        血圧は運動、緊張、睡眠、気温、カフェインなどでも変動します。だからこそ、診察室の一度だけの値ではなく、条件をそろえて測った<strong>家庭血圧の積み重ね</strong>が大切です。
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3 border-l-4 border-[#4F78A0] pl-3 leading-tight">どこからが高血圧？</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-white/70 rounded-2xl p-5 border border-black">
                            <div className="text-xs font-bold tracking-widest text-[#4F78A0] mb-1">診察室血圧</div>
                            <div className="text-xl font-bold text-[#1A1A1A]">140 / 90 mmHg 以上</div>
                        </div>
                        <div className="bg-white/70 rounded-2xl p-5 border border-black">
                            <div className="text-xs font-bold tracking-widest text-[#4F78A0] mb-1">家庭血圧</div>
                            <div className="text-xl font-bold text-[#1A1A1A]">135 / 85 mmHg 以上</div>
                        </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mt-4">
                        日本高血圧学会では、上または下のどちらかが基準以上の場合を高血圧の診断基準としています。ただし、一度の測定だけで自己診断はできません。家庭と診察室で値が異なる「白衣高血圧」「仮面高血圧」もあるため、記録を医師と一緒に評価します。
                    </p>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#4F78A0] pl-3 leading-tight">症状がなくても、なぜ問題になるのか</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        高い圧が長く続くと、血管の壁は少しずつ厚く硬くなり、傷みやすくなります。心臓はより強い力で血液を押し出す必要があり、腎臓の細い血管にも負担がかかります。
                        {'\n\n'}
                        その積み重ねが、脳卒中、心筋梗塞・心不全、慢性腎臓病などのリスクにつながります。高血圧の多くに目立った症状がないことが、見つけるのを難しくします。頭痛や肩こりがないから安心、とは限りません。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[
                            { href: '/organs/heart', label: '心臓' },
                            { href: '/organs/kidney', label: '腎臓' },
                            { href: '/organs/brain', label: '脳' },
                            { href: '/inflammation', label: '慢性炎症' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="text-xs px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/20 font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white hover:border-[#41C9B4] transition-colors">{l.label}</Link>
                        ))}
                    </div>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#4F78A0] pl-3 leading-tight">家庭で、なるべく同じ条件で測る</h2>
                    <ul className="space-y-2">
                        {measurementSteps.map((step, i) => (
                            <li key={step} className="flex gap-3 text-sm text-[#1A1A1A]/85 leading-relaxed bg-white/60 rounded-xl p-3 border border-[#1A1A1A]/15">
                                <span className="w-6 h-6 rounded-full bg-[#4F78A0] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">{i + 1}</span>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-xs text-[#4A4A4A]/65 mt-4 leading-relaxed">上腕に巻くタイプの家庭用血圧計が基本です。測定中は話さず、カフ（腕帯）は説明書どおりに装着します。</p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 border-l-4 border-[#4F78A0] pl-3 leading-tight">生活で整える4つの方向</h2>
                    <p className="text-sm text-[#4A4A4A] mb-5 leading-relaxed">生活習慣は治療の土台ですが、必要な薬の代わりではありません。全部を一度に変えるより、測定しながら続けられる一つを選びます。</p>
                    <div className="space-y-3">
                        {dailyActions.map((a) => (
                            <Link key={a.head} href={a.href} className="group block bg-white/70 rounded-xl p-4 border border-[#1A1A1A]/15 hover:border-black hover:shadow-sm transition-all">
                                <div className="font-bold text-[#1A1A1A] mb-1 group-hover:text-[#4F78A0] transition-colors">{a.head}</div>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{a.body}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mb-10 rounded-2xl p-6 md:p-8 border border-[#C84848] bg-[#FFF2F0]">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">すぐに医療へつなぐサイン</h2>
                    <p className="text-sm text-[#4A4A4A] leading-loose">
                        血圧が<strong>180 / 120 mmHg以上</strong>で、胸痛、息苦しさ、突然の激しい頭痛、ろれつが回らない、片側の手足が動かしにくい、意識や見え方の異常などがある場合は、救急要請を含めて直ちに医療につないでください。症状がなくても同程度の高値が繰り返される場合は、放置せず速やかに医療機関へ相談してください。
                    </p>
                </section>

                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#4F78A0] pl-3 leading-tight">あわせて読む</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/autonomic-nervous-system', label: '自律神経' },
                            { href: '/stress', label: 'ストレス' },
                            { href: '/exercise', label: '運動' },
                            { href: '/sleep', label: '睡眠' },
                            { href: '/diabetes', label: '糖尿病' },
                            { href: '/metabolic-syndrome', label: 'メタボリックシンドローム' },
                            { href: '/chronic-kidney-disease', label: '慢性腎臓病（CKD）' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">{l.label} →</Link>
                        ))}
                    </div>
                </section>

                <section className="mb-10 text-xs text-[#4A4A4A]/70 leading-relaxed">
                    <h2 className="font-bold text-[#1A1A1A] mb-2">主な参考情報</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><a className="underline hover:text-[#4F78A0]" href="https://www.jpnsh.jp/general_ind.html" target="_blank" rel="noreferrer">日本高血圧学会「一般の方」</a></li>
                        <li><a className="underline hover:text-[#4F78A0]" href="https://www.jpnsh.jp/pub_katei.html" target="_blank" rel="noreferrer">日本高血圧学会「家庭で血圧を測定しましょう」</a></li>
                        <li><a className="underline hover:text-[#4F78A0]" href="https://www.who.int/news-room/fact-sheets/detail/hypertension" target="_blank" rel="noreferrer">World Health Organization, Hypertension</a></li>
                    </ul>
                </section>

                <div className="text-center">
                    <Link href="/library#aging" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] border border-black rounded-full font-bold hover:bg-[#41C9B4] hover:text-white transition-colors">← 老化と不調の土台に戻る</Link>
                </div>
            </article>
        </div>
    );
}
