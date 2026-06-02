import Link from 'next/link';

type Crumb = { name: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
    return (
        <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#1A1A1A]/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {items.map((it, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                        {it.href ? (
                            <Link href={it.href} className="hover:text-[#1A1A1A] hover:underline transition-colors">
                                {it.name}
                            </Link>
                        ) : (
                            <span className="text-[#1A1A1A]/90 font-bold">{it.name}</span>
                        )}
                        {i < items.length - 1 && <span className="opacity-40">/</span>}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
