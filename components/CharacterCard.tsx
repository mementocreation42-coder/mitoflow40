import Link from 'next/link';
import { Character, categoryMeta, dexNo } from '@/lib/characters';

// 図鑑グリッドの1枚。art が未着（placeholder）でもカードは成立する。
export default function CharacterCard({ character }: { character: Character }) {
    const cat = categoryMeta[character.category];
    const hasArt = character.art?.image && !character.art?.placeholder;

    return (
        <Link
            href={`/for-kids/${character.id}`}
            className="group block rounded-3xl border-2 border-black bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
        >
            {/* アート枠：未着なら愛称の頭文字プレースホルダー */}
            <div className="relative aspect-square flex items-center justify-center" style={{ backgroundColor: cat.color }}>
                <span
                    className="absolute top-3 left-3 text-[11px] font-bold tracking-wider text-[#1A1A1A]/60"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    {dexNo(character.no)}
                </span>
                <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider text-[#1A1A1A]/50 rounded-full bg-white/70 px-2 py-0.5">
                    {cat.ja}
                </span>
                {hasArt ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={character.art!.image!} alt={character.name.nickname} className="h-full w-full object-contain p-4" />
                ) : (
                    <span className="text-5xl font-black text-[#1A1A1A]/25 select-none">{character.name.nickname.slice(0, 1)}</span>
                )}
            </div>

            <div className="p-4">
                <p className="font-bold text-lg text-[#1A1A1A] leading-tight">{character.name.nickname}</p>
                {character.name.title && <p className="mt-0.5 text-xs text-[#1A1A1A]/55">{character.name.title}</p>}
                <p className="mt-2 text-sm text-[#1A1A1A]/75 leading-snug line-clamp-2">{character.role.kids}</p>
            </div>
        </Link>
    );
}
