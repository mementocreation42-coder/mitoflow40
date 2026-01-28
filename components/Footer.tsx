import Link from 'next/link';

const footerLinks = [
    { href: '#hero', label: 'TOP' },
    { href: '#about', label: 'ABOUT' },
    { href: '#benefits', label: 'EXPERIENCE' },
    { href: '#for-you', label: 'FOR YOU' },
    { href: '#pricing', label: 'PRICE' },
    { href: '#flow', label: 'FLOW' },
    { href: '#profile', label: 'PROFILE' },
    { href: '#contact', label: 'CONTACT' },
];

export default function Footer() {
    return (
        <footer className="py-12 bg-[#1A1A1A] border-t border-[#333333]">
            <div className="max-w-[1000px] mx-auto px-4 text-center">
                {/* Logo */}
                <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    MitoFlow40
                </div>
                <p className="text-white/50 text-sm mb-8">40代からの健康戦略</p>

                {/* Navigation */}
                <nav className="mb-8">
                    <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {footerLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-white/70 hover:text-[#4AF6C3] transition-colors"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Copyright */}
                <div className="text-white/50 text-sm">
                    &copy; 2026 MitoFlow40. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
