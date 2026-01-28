'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
    { href: '#hero', label: 'TOP' },
    { href: '#about', label: 'ABOUT' },
    { href: '#benefits', label: 'EXPERIENCE' },
    { href: '#for-you', label: 'FOR YOU' },
    { href: '#pricing', label: 'PRICE' },
    { href: '#flow', label: 'FLOW' },
    { href: '#profile', label: 'PROFILE' },
    { href: '#contact', label: 'CONTACT' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-[#1A1A1A]/20">
            <div className="max-w-[800px] mx-auto px-4 h-[60px] flex items-center justify-between">
                {/* Logo */}
                <Link href="#" className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Mitoflow40
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-6">
                        {navItems.slice(1, -1).map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium hover:text-[#4AF6C3] transition-colors"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="#contact"
                                className="px-4 py-2 bg-[#4AF6C3] text-[#1A1A1A] text-sm font-semibold rounded-full hover:bg-[#3AE6B3] transition-colors"
                            >
                                Contact
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

            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 py-4">
                    <ul className="flex flex-col items-center gap-4">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="text-base font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}
