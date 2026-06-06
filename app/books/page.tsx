import Link from 'next/link';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'おすすめ書籍 | Mitoflow40',
    description: '生化学・栄養学・睡眠・腸内環境・運動・老化など、体の仕組みをもっと深く知るためのおすすめ書籍を、40代の健康最適化の視点でテーマ別に紹介します。Libraryと合わせて読むと理解が立体的になります。',
    alternates: { canonical: 'https://mitoflow40.com/books' },
    openGraph: {
        title: 'おすすめ書籍 | Mitoflow40',
        description: '体の仕組みをもっと深く知るための本を、テーマ別に紹介。Libraryと合わせて読むと理解が立体的に。',
        url: 'https://mitoflow40.com/books',
        type: 'article',
    },
};

// テーマ別おすすめ書籍
const shelves: { theme: string; intro: string; books: { title: string; author: string; published?: string; note: string; url?: string }[] }[] = [
    {
        theme: '精密栄養学と血液検査',
        intro: '血液データから自分の体を読み解く——Mitoflow40の核に最も近い一冊。',
        books: [
            {
                title: '血液データから読み解くあなたの人生 ―精密栄養学のすすめ―',
                author: '田中 基之',
                published: '2025年2月14日 / NEXTRAVELER BOOKS',
                note: '健康診断ではおなじみの血液検査を、「基準値内かどうか」ではなく「理想値からどう離れているか」という精密栄養学の視点で読み解く一冊。12名の実例をもとに、データから不足や偏りを見つけ、食事・栄養で整えていく道筋が描かれます。Mitoflow40が大切にしている「自分の現在地を数値で知り、材料で整える」という考え方とまっすぐ重なります。',
                url: 'https://www.amazon.co.jp/dp/4991289386',
            },
        ],
    },
    {
        theme: '遺伝子と栄養',
        intro: '生まれ持った「設計図」と、栄養・生活習慣のつながりを学べる本。',
        books: [
            {
                title: 'Dirty Genes',
                author: 'Dr. Ben Lynch',
                published: '2018年（原書 HarperOne）',
                note: 'MTHFRやCOMTなど、よくある遺伝子の個性（多型）が、メチレーション・解毒・気分にどう影響するかをやさしく解説。遺伝子は「変えられない運命」ではなく、食事や生活習慣で“きれいに”整えられる——という考え方は、このLibraryの遺伝子ページと深く響き合います。',
                url: 'https://www.amazon.co.jp/-/en/Ben-Lynch/dp/0062698141',
            },
        ],
    },
    {
        theme: 'バイオハック',
        intro: '最新の知見やデータを使って、自分の体を能動的に最適化する。',
        books: [
            {
                title: 'BIO HACKING 未来を生きるための遺伝子の理解',
                author: '高城 剛',
                published: '2022年10月1日 / NEXTRAVELER BOOKS',
                note: '世界を旅しながら最新のバイオハックを試し続ける著者が、遺伝子検査をはじめ、自分の体を能動的に最適化するアプローチを紹介。「自分の設計図（遺伝子）を理解し、データをもとに整える」という発想は、Mitoflow40の遺伝子・精密栄養学の考え方と通じます。先端的な話題も多いので、エビデンスの段階を意識しながら読むのがおすすめです。',
                url: 'https://www.amazon.co.jp/dp/499105947X',
            },
        ],
    },
];

export default function BooksPage() {
    return (
        <div className="pt-[calc(60px+3rem)] md:pt-[calc(60px+6rem)] pb-12 md:pb-24 px-6 md:px-4 min-h-screen relative overflow-hidden" style={{ background: '#F1E7DE' }}>
            <img loading="lazy" decoding="async" src="/images/for-you-illustration-bl.png" alt="" className="absolute pointer-events-none opacity-90 hidden md:block"
                style={{ top: '0', right: '-40px', width: '260px', transform: 'scaleY(-1)' }} />
            <img loading="lazy" decoding="async" src="/images/24.png" alt="" className="absolute pointer-events-none"
                style={{ bottom: '-40px', left: '-40px', width: '260px' }} />

            <JsonLd data={medicalWebPage({ name: 'おすすめ書籍', description: '体の仕組みをもっと深く知るためのおすすめ書籍を、テーマ別に紹介。', path: '/books' })} />
            <JsonLd data={breadcrumb([{ name: 'Library', path: '/library' }, { name: 'おすすめ書籍', path: '/books' }])} />
            <article className="max-w-[820px] mx-auto relative" style={{ zIndex: 1 }}>
                <Breadcrumbs items={[{ name: 'Library', href: '/library' }, { name: 'おすすめ書籍' }]} />
                <header className="mb-12 text-center">
                    <p className="text-xs tracking-widest font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF9855' }}>
                        FURTHER READING
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        RECOMMENDED BOOKS
                        <span className="block text-base md:text-lg mt-2 text-[#1A1A1A]/70" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>おすすめ書籍</span>
                    </h1>
                    <p className="text-sm md:text-base text-[#1A1A1A] font-medium leading-relaxed max-w-[600px] mx-auto">
                        体の仕組みを、もっと深く知りたくなったら。このLibraryと合わせて読むと、点が線になり、理解が立体的になります。
                    </p>
                </header>

                {/* はじめに */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">本で深める、という選び方</h2>
                    <p className="text-[#4A4A4A] leading-loose whitespace-pre-line">
                        Libraryは「広く・つなげて」知るための場所。一方で本は、<strong>ひとつのテーマを、著者の視点で深く・物語として</strong>たどれるのが魅力です。気になったテーマがあれば、関連する一冊を手に取ると、知識がぐっと自分のものになります。
                        {'\n\n'}
                        ここでは、<strong>専門的すぎず、けれど中身は確か</strong>——そんなバランスの本をテーマ別に選びました。健康や栄養の分野は研究が日々進んでいます。本の内容も「絶対の正解」ではなく、<strong>考えるための地図のひとつ</strong>として、最新の知見と照らし合わせながら読み進めてください。
                    </p>
                </section>

                {/* 本棚 */}
                {shelves.map((shelf) => (
                    <section key={shelf.theme} className="mb-10">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1 border-l-4 border-[#41C9B4] pl-3 leading-tight">{shelf.theme}</h2>
                        <p className="text-sm text-[#4A4A4A] mb-4 pl-4">{shelf.intro}</p>
                        <div className="grid gap-4">
                            {shelf.books.map((book) => (
                                <div key={book.title} className="bg-white/70 rounded-2xl p-5 md:p-6 border border-black">
                                    <div className="flex items-baseline gap-2 flex-wrap mb-2">
                                        <h3 className="text-base md:text-lg font-bold text-[#1A1A1A]">『{book.title}』</h3>
                                        <span className="text-xs text-[#4A4A4A]/80">{book.author}</span>
                                    </div>
                                    {book.published && (
                                        <p className="text-[11px] text-[#4A4A4A]/60 mb-2">{book.published}</p>
                                    )}
                                    <p className="text-sm text-[#4A4A4A] leading-relaxed">{book.note}</p>
                                    {book.url && (
                                        <a href={book.url} target="_blank" rel="noopener noreferrer"
                                            className="mt-3 inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white border border-[#1A1A1A] text-xs font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                            Amazonで見る →
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                {/* 注意書き */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <p className="text-xs text-[#4A4A4A]/80 leading-relaxed">
                        ※ ここで紹介する書籍は、体の仕組みへの理解を深めるための一般的な参考図書です。特定の治療法・健康法を推奨・保証するものではなく、診断や治療の代わりになるものでもありません。持病のある方や治療中の方は、必ず主治医にご相談ください。
                    </p>
                </section>

                {/* もっと深く知る */}
                <section className="mb-10 bg-white/70 rounded-2xl p-6 md:p-8 border border-black">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 border-l-4 border-[#41C9B4] pl-3 leading-tight">Libraryで読む</h2>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                        本を読む前に、まずは気になるテーマをLibraryでつまみ食いするのもおすすめです。
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { href: '/nutrition-literacy', label: '学ぶと、何が変わる？' },
                            { href: '/molecular-nutrition', label: '分子栄養学とは' },
                            { href: '/sleep', label: '睡眠' },
                            { href: '/gut-health', label: '腸内環境' },
                            { href: '/exercise', label: '運動' },
                            { href: '/references', label: '参照文献・出典' },
                            { href: '/library', label: 'Library 全体' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href}
                                className="px-4 py-2 rounded-full bg-white border border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] hover:bg-[#41C9B4] hover:text-white transition-colors">
                                {l.label} →
                            </Link>
                        ))}
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
