'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
    { href: '/check', label: 'FREE CHECK', ja: '無料チェック' },
    { href: '/sample', label: 'SAMPLE ANALYSIS', ja: '解析サンプル' },
    { href: '/library', label: 'LIBRARY', ja: 'ライブラリ' },
    { href: '/journal', label: 'JOURNAL', ja: 'ジャーナル' },
    { href: '/#contact', label: 'CONTACT', ja: 'お問い合わせ' },
];

// ホバーで日本語に切り替わるラベル（レイアウトずれ防止のためグリッド重ね）
function SwapLabel({ en, ja }: { en: string; ja: string }) {
    return (
        <span className="relative inline-block align-middle whitespace-nowrap">
            <span className="transition-opacity duration-200 group-hover:opacity-0">{en}</span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ fontFamily: "'Noto Sans JP', sans-serif" }} aria-hidden="true">{ja}</span>
        </span>
    );
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
        <header className="w-full z-50 bg-white/80 backdrop-blur-sm border-b border-[#1A1A1A]/20">
            <div className="max-w-[800px] mx-auto px-4 h-[60px] flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight" style={{ fontFamily: "'MuseoModerno', sans-serif" }}>
                    Mitoflow40
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-6">
                        {navItems.slice(0, -1).map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="group text-sm font-medium hover:text-[#4AF6C3] transition-colors pb-1 border-b-2 border-transparent hover:border-[#4AF6C3]"
                                >
                                    <SwapLabel en={item.label} ja={item.ja} />
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/#contact"
                                className="group px-4 py-2 bg-[#4AF6C3] text-[#1A1A1A] border border-[#1A1A1A] text-sm font-semibold rounded-full hover:bg-[#3AE6B3] transition-colors"
                            >
                                <SwapLabel en="CONTACT" ja="お問い合わせ" />
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden flex flex-col gap-1.5"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menu"
                >
                    <span className="block w-6 h-0.5 bg-[#1A1A1A]" />
                    <span className="block w-6 h-0.5 bg-[#1A1A1A]" />
                    <span className="block w-6 h-0.5 bg-[#1A1A1A]" />
                </button>
            </div>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <nav className="md:hidden fixed inset-0 top-[60px] z-40 bg-white border-t border-gray-200 flex items-center justify-center overflow-y-auto">
                <ul className="flex flex-col items-center gap-10">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="block text-xl font-semibold tracking-wide py-2 px-6"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        )}
        </>
    );
}
