import { notFound } from 'next/navigation';
import Link from 'next/link';
import CharacterDetail from '@/components/CharacterDetail';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd, { medicalWebPage, breadcrumb } from '@/components/JsonLd';
import { characters, getCharacterById, dexNo } from '@/lib/characters';

export function generateStaticParams() {
    return characters.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const c = getCharacterById(id);
    if (!c) return {};
    const title = `${c.name.nickname}（${c.name.identity}）| ミトちゃんといのちの仲間たち`;
    const description = `${dexNo(c.no)} ${c.name.nickname}。${c.role.kids}（おとな向け：${c.role.adult}）`;
    return {
        title,
        description,
        alternates: { canonical: `https://mitoflow40.com/for-kids/${c.id}` },
        openGraph: {
            siteName: 'Mitoflow40',
            locale: 'ja_JP',
            title,
            description,
            url: `https://mitoflow40.com/for-kids/${c.id}`,
            type: 'article',
        },
    };
}

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const character = getCharacterById(id);
    if (!character) notFound();

    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <JsonLd
                data={medicalWebPage({
                    name: `${character.name.nickname}（${character.name.identity}）`,
                    description: `${character.role.adult}`,
                    path: `/for-kids/${character.id}`,
                })}
            />
            <JsonLd
                data={breadcrumb([
                    { name: 'ホーム', path: '/' },
                    { name: 'ミトちゃんといのちの仲間たち', path: '/for-kids' },
                    { name: character.name.nickname, path: `/for-kids/${character.id}` },
                ])}
            />

            <Breadcrumbs
                items={[
                    { name: 'ホーム', href: '/' },
                    { name: 'ミトちゃんといのちの仲間たち', href: '/for-kids' },
                    { name: character.name.nickname },
                ]}
            />

            <CharacterDetail character={character} />

            <div className="mt-12">
                <Link href="/for-kids" className="text-sm text-[#1A1A1A]/60 underline hover:text-[#1A1A1A]">
                    ← ミトちゃんといのちの仲間たちに戻る
                </Link>
            </div>
        </main>
    );
}
