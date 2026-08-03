import Link from 'next/link';
import CharacterCard from '@/components/CharacterCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import { charactersByNo } from '@/lib/characters';

export const metadata = {
    title: 'ミトちゃんといのちの仲間たち | Mitoflow40 for kids',
    description: 'ミトちゃんといのちの仲間たち。体の中ではたらく細胞や栄養を、生化学ベースのキャラクターにした図鑑。No.順に集まり、こども向け・おとな向けで読み分けられる健康の図鑑です。',
    alternates: { canonical: 'https://mitoflow40.com/for-kids' },
    openGraph: {
        siteName: 'Mitoflow40',
        locale: 'ja_JP',
        title: 'ミトちゃんといのちの仲間たち | Mitoflow40 for kids',
        description: 'ミトちゃんといのちの仲間たち。体の中ではたらく仲間を、生化学ベースのキャラクターで集める図鑑。',
        url: 'https://mitoflow40.com/for-kids',
        type: 'website',
    },
};

export default function ForKidsPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-10">
            <JsonLd
                data={medicalWebPage({
                    name: 'ミトちゃんといのちの仲間たち',
                    description: 'ミトちゃんといのちの仲間たち。体の中ではたらく仲間を生化学ベースのキャラクターにした図鑑。',
                    path: '/for-kids',
                })}
            />
            <JsonLd data={breadcrumb([{ name: 'ホーム', path: '/' }, { name: 'ミトちゃんといのちの仲間たち', path: '/for-kids' }])} />

            <Breadcrumbs items={[{ name: 'ホーム', href: '/' }, { name: 'ミトちゃんといのちの仲間たち' }]} />

            <header className="mb-8">
                <p className="text-xs font-bold tracking-widest text-[#FF9855]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    FOR KIDS
                </p>
                <h1 className="mt-1 text-4xl md:text-5xl font-black text-[#41C9B4] leading-tight">ミトちゃんといのちの仲間たち</h1>
                <p className="mt-4 max-w-2xl text-[#4A4A4A] leading-relaxed">
                    体の中ではたらく「いのちの仲間」を、1体ずつキャラクターにして集める図鑑です。
                    やさしく書くけれど、中身はぜんぶ本当の生化学。各ページの<span className="font-bold">「こども向け」</span>と
                    <span className="font-bold">「おとな向け」</span>で、読む深さを切り替えられます。
                </p>
            </header>

            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {charactersByNo.map((c) => (
                    <CharacterCard key={c.id} character={c} />
                ))}
            </div>

            <p className="mt-10 text-sm text-[#1A1A1A]/55">
                このずかんは、細胞や栄養の本当のはたらき（生化学）をもとに作っています。仲間はこれから増えていきます。
                もっとくわしく知りたくなったら{' '}
                <Link href="/library" className="underline hover:text-[#1A1A1A]">
                    LIBRARY
                </Link>
                {' '}へ。
            </p>
        </main>
    );
}
