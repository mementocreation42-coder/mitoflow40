'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export type KnowledgeDocument = {
    title: string;
    en?: string;
    group: string;
    tagline?: string;
    color: string;
    body: string;
    sections: { title: string; items: string[] }[];
    related: { title: string; group: string; href: string }[];
    sourceHref?: string;
};

export default function KnowledgeReader({ document }: { document: KnowledgeDocument }) {
    const router = useRouter();
    const prepareEmbeddedKnowledge = useCallback((frame: HTMLIFrameElement) => {
        const content = frame.contentDocument;
        if (!content) return;
        content.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((anchor) => {
            const rawHref = anchor.getAttribute('href');
            if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;
            const url = new URL(rawHref, window.location.origin);
            if (url.origin !== window.location.origin) {
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
                return;
            }
            if (url.pathname === '/library' || url.pathname === '/library/map') {
                anchor.href = '/karada-navi';
                anchor.target = '_top';
                return;
            }
            if (url.pathname.startsWith('/karada-navi')) {
                anchor.target = '_top';
                return;
            }
            anchor.href = `/karada-navi/knowledge${url.pathname}${url.search}${url.hash}`;
            anchor.target = '_top';
        });
    }, []);
    if (document.sourceHref) {
        return <div className="h-[100dvh] overflow-hidden bg-[#ECE6F3] text-[#1A1A1A]">
            <header className="flex h-[calc(58px+env(safe-area-inset-top))] items-end border-b border-black/15 bg-[#ECE6F3]/95 px-5 pb-2 backdrop-blur-xl"><button onClick={() => router.back()} className="flex min-h-10 items-center text-sm font-bold text-[#159E89]"><span className="mr-1 text-2xl">‹</span>Knowledgeへ戻る</button><span className="mx-auto pb-2 pr-24 text-xs font-bold tracking-[.12em]">{document.title}</span></header>
            <iframe src={document.sourceHref} title={document.title} onLoad={(event) => prepareEmbeddedKnowledge(event.currentTarget)} className="h-[calc(100dvh-58px-env(safe-area-inset-top))] w-full border-0 bg-white" />
        </div>;
    }
    return <div className="min-h-[100dvh] bg-[#ECE6F3] pb-16 text-[#1A1A1A]">
        <div className="mx-auto max-w-[520px] px-5 pt-[max(16px,env(safe-area-inset-top))]">
            <header className="sticky top-0 z-30 -mx-5 flex items-center border-b border-black/10 bg-[#ECE6F3]/88 px-5 py-3 backdrop-blur-xl"><button onClick={() => router.back()} className="flex min-h-10 items-center text-sm font-bold text-[#159E89]"><span className="mr-1 text-2xl">‹</span>戻る</button><span className="mx-auto pr-12 text-sm font-bold">Knowledge</span></header>
            <main className="animate-[fadeInUp_.28s_ease-out] pt-6">
                <section className="rounded-[26px] border border-black p-6" style={{ background: document.color }}><p className="text-xs font-bold tracking-[.15em] text-[#159E89]">{document.group}</p><h1 className="mt-3 normal-case text-[32px] font-bold leading-[1.3]">{document.title}</h1>{document.en && <p className="mt-1 text-xs font-bold tracking-[.12em] text-[#555]">{document.en}</p>}{document.tagline && <p className="mt-5 text-base font-bold leading-7">{document.tagline}</p>}</section>
                <section className="mt-7"><p className="text-xs font-bold tracking-[.14em] text-[#FF9855]">UNDERSTAND</p><h2 className="mt-1 normal-case text-2xl font-bold">仕組みを理解する</h2><div className="mt-4 whitespace-pre-line rounded-[22px] border border-black bg-white p-5 text-sm leading-8 text-[#3F3F3F]">{document.body}</div></section>
                {document.sections.map((section) => <section key={section.title} className="mt-7"><h2 className="normal-case text-xl font-bold">{section.title}</h2><ul className="mt-3 grid gap-2 rounded-[20px] border border-black bg-white p-5">{section.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><span className="text-[#41C9B4]">●</span>{item}</li>)}</ul></section>)}
                {document.related.length > 0 && <section className="mt-9"><p className="text-xs font-bold tracking-[.14em] text-[#159E89]">KEEP EXPLORING</p><h2 className="mb-4 mt-1 normal-case text-2xl font-bold">関連Knowledge</h2><div className="grid gap-3">{document.related.map((item) => <Link key={item.href} href={item.href} className="flex items-center rounded-[18px] border border-black bg-white p-4"><span><span className="block text-[10px] font-bold text-[#159E89]">{item.group}</span><span className="font-bold">{item.title}</span></span><span className="ml-auto text-2xl text-[#999]">›</span></Link>)}</div></section>}
                <aside className="mt-8 rounded-[18px] border border-black/40 bg-white/55 p-4 text-xs leading-6 text-[#666]">このKnowledgeは体の仕組みを理解するための情報です。診断や治療の代わりにはなりません。気になる症状や検査値は医療者に相談してください。</aside>
            </main>
        </div>
    </div>;
}
