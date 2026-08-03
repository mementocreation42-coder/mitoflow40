'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { searchIndex, searchLibrary, type SearchItem } from '@/lib/searchIndex';

type Tab = 'home' | 'library' | 'saved';

const shelves = [
    { id: 'body', title: '体のしくみ', subtitle: '細胞から臓器まで', color: '#DCF1EA', groups: ['しくみ', '内臓・臓器', 'ホルモン', '遺伝子'] },
    { id: 'materials', title: '栄養と食事', subtitle: '体をつくる材料', color: '#FCE3D4', groups: ['栄養素', '食べ物'] },
    { id: 'signals', title: '症状から知る', subtitle: '体のサインを入口に', color: '#E7E0F2', groups: ['症状'] },
    { id: 'numbers', title: '検査値を読む', subtitle: '現在地を数字で知る', color: '#DEEDF7', groups: ['血液検査'] },
    { id: 'thinking', title: '考え方を深める', subtitle: '健康を捉え直す', color: '#FFF0C9', groups: ['思索', '考え方'] },
];

const paths = [
    { title: 'エネルギーはどう作られる？', note: 'ミトコンドリアからATPまで', color: '#DCF1EA', hrefs: ['/mitochondria', '/glycolysis', '/tca-cycle', '/electron-transport-chain', '/atp'] },
    { title: '血糖の波を理解する', note: '食後の眠気から糖化まで', color: '#FCE3D4', hrefs: ['/symptoms/post-meal-sleepiness', '/blood-sugar', '/insulin-resistance', '/glycation'] },
    { title: '鉄と酸素をつなげて読む', note: '疲れと検査値の関係', color: '#FBE2E2', hrefs: ['/nutrients/iron', '/biomarkers/ferritin', '/biomarkers/hemoglobin', '/symptoms/fatigue'] },
];

const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'home', label: 'ホーム', icon: '⌂' },
    { id: 'library', label: 'Knowledge', icon: '▤' },
    { id: 'saved', label: '保存', icon: '♡' },
];

export default function LibraryApp() {
    const [tab, setTab] = useState<Tab>('home');
    const [query, setQuery] = useState('');
    const [activeShelf, setActiveShelf] = useState<string | null>(null);
    const [saved, setSaved] = useState<string[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => { queueMicrotask(() => { try { setSaved(JSON.parse(localStorage.getItem('mitoflow-saved') || '[]')); } catch { /* empty */ } setReady(true); }); }, []);
    useEffect(() => { if (ready) localStorage.setItem('mitoflow-saved', JSON.stringify(saved)); }, [saved, ready]);

    const featured = useMemo(() => ['/mitochondria', '/symptoms/fatigue', '/nutrients/magnesium', '/blood-sugar'].map((href) => searchIndex.find((item) => item.href === href)).filter((item): item is SearchItem => Boolean(item)), []);
    const currentShelf = shelves.find((item) => item.id === activeShelf);
    const shelfItems = currentShelf ? searchIndex.filter((item) => currentShelf.groups.includes(item.group)) : [];
    const results = query ? searchLibrary(query, 40) : shelfItems.length ? shelfItems : searchIndex;
    const savedItems = saved.map((href) => searchIndex.find((item) => item.href === href)).filter((item): item is SearchItem => Boolean(item));
    const toggleSaved = (href: string) => setSaved((items) => items.includes(href) ? items.filter((item) => item !== href) : [href, ...items]);
    const openLibrary = (shelf?: string) => { setActiveShelf(shelf || null); setQuery(''); setTab('library'); };

    return <div className="min-h-[100dvh] bg-[#ECE6F3] pb-28 text-[#1A1A1A]">
        <div className="mx-auto min-h-[100dvh] max-w-[520px] px-5 pt-[max(16px,env(safe-area-inset-top))]">
            <AppHeader savedCount={saved.length} onHome={() => setTab('home')} onSaved={() => setTab('saved')} />

            {tab === 'home' && <main className="animate-[fadeInUp_.28s_ease-out]">
                <section className="relative overflow-hidden rounded-[28px] border border-black bg-white/65 p-6 shadow-[0_10px_32px_rgba(68,48,82,.08)]"><div className="relative z-10"><p className="text-xs font-bold tracking-[.18em] text-[#FF9855]">MITOFLOW40 KNOWLEDGE</p><h1 className="mt-3 normal-case text-[34px] font-bold leading-[1.22] text-[#41C9B4]">体の仕組みを、<br />つなげて理解する。</h1><p className="mt-4 max-w-[350px] text-sm leading-7 text-[#4A4A4A]">症状・栄養・検査値を、別々の知識で終わらせないためのライブラリ。</p><button onClick={() => openLibrary()} className="mt-6 flex w-full items-center gap-3 rounded-2xl border border-black bg-white px-5 py-4 text-left text-sm text-[#555] active:scale-[.99]"><span className="text-xl text-[#41C9B4]">⌕</span>Knowledgeを検索</button></div><Image src="/images/for-you/for-you-illustration-bl.png" alt="" width={220} height={220} className="absolute -bottom-24 -right-24 w-52 opacity-35" /></section>

                <section className="mt-8"><div className="flex items-end justify-between"><div><p className="text-xs font-bold tracking-[.15em] text-[#159E89]">SHELVES</p><h2 className="normal-case text-2xl font-bold">知識の棚</h2></div><button onClick={() => openLibrary()} className="text-sm font-bold text-[#159E89]">すべて見る ›</button></div><div className="mt-4 grid grid-cols-2 gap-3">{shelves.slice(0, 4).map((shelf) => <button key={shelf.id} onClick={() => openLibrary(shelf.id)} className="min-h-[128px] rounded-[22px] border border-black p-4 text-left shadow-sm active:scale-[.98]" style={{ background: shelf.color }}><span className="text-[10px] font-bold tracking-[.12em] text-[#159E89]">{shelf.groups.join(' / ')}</span><span className="mt-5 block font-bold">{shelf.title}</span><span className="mt-1 block text-xs text-[#555]">{shelf.subtitle}</span></button>)}</div></section>

                <section className="mt-9"><p className="text-xs font-bold tracking-[.15em] text-[#FF9855]">LEARNING PATHS</p><h2 className="normal-case text-2xl font-bold">つながりで読む</h2><div className="mt-4 grid gap-3">{paths.map((path) => <Link key={path.title} href={`/karada-navi/knowledge${path.hrefs[0]}`} className="flex items-center rounded-[22px] border border-black p-5 shadow-sm active:scale-[.985]" style={{ background: path.color }}><span><span className="block font-bold">{path.title}</span><span className="mt-1 block text-xs text-[#555]">{path.note}・{path.hrefs.length} Knowledge</span></span><span className="ml-auto text-2xl">›</span></Link>)}</div></section>

                <section className="mt-9"><p className="text-xs font-bold tracking-[.15em] text-[#159E89]">START HERE</p><h2 className="mb-4 normal-case text-2xl font-bold">まず読むKnowledge</h2><KnowledgeList items={featured} saved={saved} onSave={toggleSaved} /></section>
            </main>}

            {tab === 'library' && <main className="animate-[fadeInUp_.28s_ease-out]">
                <p className="text-xs font-bold tracking-[.16em] text-[#FF9855]">ALL KNOWLEDGE</p><h1 className="mt-1 normal-case text-3xl font-bold">Knowledge</h1>
                <label className="sticky top-[68px] z-20 mt-5 flex items-center gap-3 rounded-2xl border border-black bg-white px-5 py-4 shadow-sm"><span className="text-xl text-[#41C9B4]">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="症状・栄養・検査・しくみ…" className="w-full bg-transparent outline-none" />{query && <button onClick={() => setQuery('')}>×</button>}</label>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">{[{ id: null, title: 'すべて' }, ...shelves].map((shelf) => <button key={shelf.id || 'all'} onClick={() => { setActiveShelf(shelf.id); setQuery(''); }} className={`shrink-0 rounded-full border border-black px-4 py-2 text-sm font-bold ${activeShelf === shelf.id ? 'bg-[#41C9B4] text-white' : 'bg-white'}`}>{shelf.title}</button>)}</div>
                <p className="mb-3 mt-6 text-xs font-bold text-[#666]">{query ? `「${query}」 ${results.length}件` : `${currentShelf?.title || 'すべて'} ${results.length}件`}</p><KnowledgeList items={results} saved={saved} onSave={toggleSaved} />
            </main>}

            {tab === 'saved' && <main className="animate-[fadeInUp_.28s_ease-out]"><p className="text-xs font-bold tracking-[.16em] text-[#FF9855]">MY KNOWLEDGE</p><h1 className="mt-1 normal-case text-3xl font-bold">保存したKnowledge</h1><div className="mt-7">{savedItems.length ? <KnowledgeList items={savedItems} saved={saved} onSave={toggleSaved} /> : <div className="rounded-[22px] border border-dashed border-black bg-white/55 p-9 text-center"><div className="text-4xl">♡</div><p className="mt-4 text-sm leading-6 text-[#666]">Knowledgeを保存すると、ここからいつでも読み返せます。</p><button onClick={() => openLibrary()} className="mt-5 rounded-full border border-black bg-[#41C9B4] px-6 py-3 text-sm font-bold text-white">Knowledgeを見る</button></div>}</div></main>}
        </div>
        <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[520px] justify-around border-t border-black/20 bg-white/82 px-5 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(35,20,45,.12)] backdrop-blur-2xl">{tabs.map((item) => <button key={item.id} onClick={() => setTab(item.id)} className={`min-w-20 rounded-2xl px-3 py-2 text-center active:scale-95 ${tab === item.id ? 'text-[#159E89]' : 'text-[#777]'}`}><span className="block text-[22px] leading-none">{item.icon}</span><span className="mt-1 block text-[10px] font-bold">{item.label}</span></button>)}</nav>
    </div>;
}

function AppHeader({ savedCount, onHome, onSaved }: { savedCount: number; onHome: () => void; onSaved: () => void }) { return <header className="sticky top-0 z-30 -mx-5 mb-7 flex items-center justify-between border-b border-black/10 bg-[#ECE6F3]/88 px-5 pb-3 pt-2 backdrop-blur-xl"><button onClick={onHome} className="flex items-center gap-3 text-left"><span className="grid h-10 w-10 place-items-center rounded-[12px] border border-black bg-[#41C9B4] font-black text-white">M</span><span><span className="block text-[10px] font-bold tracking-[.16em] text-[#41A996]">MITOFLOW40 APP</span><span className="block text-lg font-bold leading-tight">Knowledge</span></span></button><button onClick={onSaved} className="relative grid h-11 w-11 place-items-center rounded-full border border-black bg-white text-xl">♡{savedCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#FF9855] px-1 text-[10px] font-bold text-white">{savedCount}</span>}</button></header>; }

function KnowledgeList({ items, saved, onSave }: { items: SearchItem[]; saved: string[]; onSave: (href: string) => void }) {
    if (!items.length) return <div className="rounded-[22px] border border-dashed border-black bg-white/55 p-8 text-center text-sm text-[#666]">該当するKnowledgeがありません。</div>;
    return <div className="grid gap-3">{items.map((item) => <article key={item.href} className="flex items-center gap-3 rounded-[20px] border border-black bg-white p-4 shadow-sm active:scale-[.985]"><Link href={`/karada-navi/knowledge${item.href}`} className="min-w-0 flex-1"><span className="text-[10px] font-bold tracking-[.12em] text-[#159E89]">{item.group}</span><h3 className="mt-1 truncate normal-case text-base font-bold">{item.title}</h3>{item.sub && <p className="mt-0.5 truncate text-xs text-[#555]">{item.sub}</p>}</Link><span className="text-2xl text-[#AAA]">›</span><button onClick={() => onSave(item.href)} aria-label={saved.includes(item.href) ? '保存を解除' : '保存'} className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xl ${saved.includes(item.href) ? 'bg-[#FCE3D4] text-[#D7663E]' : 'bg-[#ECE6F3]'}`}>{saved.includes(item.href) ? '♥' : '♡'}</button></article>)}</div>;
}
