'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Character,
    categoryMeta,
    relationMeta,
    dexNo,
    getCharacterById,
} from '@/lib/characters';

type Mode = 'kids' | 'adult';

// 詳細ページの本体。年齢トグルでファクト層（role / mechanism）を出し分ける。
// 遊び層・演出層は常に表示。art が未着でも成立する。
export default function CharacterDetail({ character }: { character: Character }) {
    const [mode, setMode] = useState<Mode>('kids');
    const cat = categoryMeta[character.category];
    const hasArt = character.art?.image && !character.art?.placeholder;
    const isKids = mode === 'kids';

    return (
        <div>
            {/* ヘッダー：アート枠 ＋ 名前・二つ名・No.（遊び層） */}
            <div className="grid gap-6 md:grid-cols-[minmax(0,320px)_1fr] items-start">
                <div className="relative aspect-square rounded-3xl border-2 border-black flex items-center justify-center overflow-hidden" style={{ backgroundColor: cat.color }}>
                    <span
                        className="absolute top-4 left-4 text-sm font-bold tracking-wider text-[#1A1A1A]/60"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        {dexNo(character.no)}
                    </span>
                    {hasArt ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={character.art!.image!} alt={character.name.nickname} className="h-full w-full object-contain p-6" />
                    ) : (
                        <span className="text-7xl font-black text-[#1A1A1A]/25 select-none">{character.name.nickname.slice(0, 1)}</span>
                    )}
                </div>

                <div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold rounded-full px-3 py-1" style={{ backgroundColor: cat.color }}>
                            {cat.ja}
                        </span>
                        {character.name.title && (
                            <span className="text-xs font-bold text-[#1A1A1A] rounded-full border-2 border-black px-3 py-1">
                                {character.name.title}
                            </span>
                        )}
                    </div>
                    <h1 className="mt-3 text-4xl font-black text-[#1A1A1A]">{character.name.nickname}</h1>
                    <p className="mt-1 text-sm text-[#1A1A1A]/60">正体：{character.name.identity}</p>
                    {character.location && <p className="mt-1 text-sm text-[#1A1A1A]/60">いる場所：{character.location}</p>}

                    {/* 演出層：キャッチフレーズ（ここだけ脚色OK） */}
                    {character.personality?.catchphrase && (
                        <p className="mt-4 inline-block rounded-2xl border-2 border-black bg-[#FBF0C9] px-4 py-2 text-[#1A1A1A] font-bold">
                            「{character.personality.catchphrase}」
                        </p>
                    )}

                    {/* 年齢トグル */}
                    <div className="mt-5 inline-flex rounded-full border-2 border-black bg-white p-1 text-sm">
                        {(['kids', 'adult'] as Mode[]).map((m) => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`rounded-full px-4 py-1.5 font-bold transition-colors ${
                                    mode === m ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                                }`}
                            >
                                {m === 'kids' ? 'こども向け' : 'おとな向け'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ファクト層：はたらき */}
            <section className="mt-10">
                <h2 className="text-xs font-bold tracking-widest text-[#41C9B4]">WHAT I DO ／ はたらき</h2>
                <p className="mt-2 text-lg leading-relaxed text-[#1A1A1A]">{isKids ? character.role.kids : character.role.adult}</p>
                {character.mechanism && (isKids ? character.mechanism.kids : character.mechanism.adult) && (
                    <div className="mt-4 rounded-2xl bg-[#F7F7F7] p-4 text-[#1A1A1A]/80 leading-relaxed">
                        <span className="block text-xs font-bold tracking-wider text-[#1A1A1A]/45 mb-1">どうやって？</span>
                        {isKids ? character.mechanism.kids : character.mechanism.adult}
                    </div>
                )}

                {/* おとな向けのときだけ：LIBRARY への導線 */}
                {!isKids && character.learnMore && character.learnMore.length > 0 && (
                    <div className="mt-5 rounded-2xl border-2 border-black bg-white p-4">
                        <span className="block text-xs font-bold tracking-wider text-[#FF9855] mb-3">
                            もっとくわしく ／ LIBRARY で読む
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {character.learnMore.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-white px-4 py-1.5 text-sm font-bold text-[#1A1A1A] transition-colors hover:bg-[#41C9B4] hover:text-white"
                                >
                                    {l.label}
                                    <span aria-hidden>→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* ファクト層：読み物（年齢別） */}
            {character.story && (
                <section className="mt-10">
                    <h2 className="text-xs font-bold tracking-widest text-[#41C9B4]">STORY ／ もっと知る</h2>
                    <p className="mt-2 leading-loose text-[#1A1A1A] whitespace-pre-line">
                        {isKids ? character.story.kids : character.story.adult}
                    </p>
                </section>
            )}

            {/* ファクト層：生活習慣（健康学習の核） */}
            <section className="mt-10">
                <h2 className="text-xs font-bold tracking-widest text-[#41C9B4]">HOW TO GET ALONG ／ なかよくするには</h2>
                <ul className="mt-3 space-y-2">
                    {character.lifestyle.map((l, i) => {
                        const bad = l.direction === 'bad';
                        return (
                            <li
                                key={i}
                                className={`flex items-start gap-3 rounded-2xl border-2 border-black p-4 ${
                                    bad ? 'bg-[#FFD9D9]' : 'bg-[#C7F5E5]'
                                }`}
                            >
                                <span className="text-lg leading-none mt-0.5">{bad ? '⚠️' : '◎'}</span>
                                <span className="text-[#1A1A1A] leading-snug">{l.message}</span>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* 遊び＋ファクト：相性 */}
            {character.relations && character.relations.length > 0 && (
                <section className="mt-10">
                    <h2 className="text-xs font-bold tracking-widest text-[#41C9B4]">RELATIONS ／ あいしょう</h2>
                    <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                        {character.relations.map((r, i) => {
                            const target = getCharacterById(r.targetId);
                            const rel = relationMeta[r.type];
                            const body = (
                                <div className="rounded-2xl border-2 border-black p-4 h-full bg-white">
                                    <div className="flex items-center gap-2">
                                        <span>{rel.mark}</span>
                                        <span className="font-bold text-[#1A1A1A]">{target ? target.name.nickname : r.targetId}</span>
                                        <span className="text-xs text-[#1A1A1A]/50">{rel.ja}</span>
                                    </div>
                                    {r.basis && <p className="mt-2 text-sm text-[#1A1A1A]/70 leading-snug">{r.basis}</p>}
                                </div>
                            );
                            return (
                                <li key={i}>
                                    {target ? (
                                        <Link href={`/for-kids/${target.id}`} className="block transition-transform hover:-translate-y-0.5">
                                            {body}
                                        </Link>
                                    ) : (
                                        body
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </section>
            )}

            {/* 演出層：性格 */}
            {character.personality?.trait && (
                <section className="mt-10">
                    <h2 className="text-xs font-bold tracking-widest text-[#41C9B4]">PERSONALITY ／ せいかく</h2>
                    <p className="mt-2 text-[#1A1A1A]/80 leading-relaxed">{character.personality.trait}</p>
                </section>
            )}
        </div>
    );
}
