import Link from 'next/link';

const footerLinks = [
    { href: '/', label: 'TOP' },
    { href: '/#about', label: 'ABOUT' },
    { href: '/#pricing', label: 'PRICE' },
    { href: '/#flow', label: 'FLOW' },
    { href: '/#profile', label: 'PROFILE' },
    { href: '/journal', label: 'JOURNAL' },
    { href: '/#contact', label: 'CONTACT' },
];

export default function Footer() {
    return (
        <footer className="py-12 bg-[#1A1A1A] border-t border-[#333333]">
            <div className="max-w-[800px] mx-auto px-4 text-center">
                {/* Logo */}
                <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'MuseoModerno', sans-serif" }}>
                    Mitoflow40
                </div>
                <p className="text-white text-sm mb-8">40代からの健康戦略</p>

                {/* Navigation */}
                <nav className="mb-8">
                    <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {footerLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm footer-link"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Copyright */}
                <div className="text-white text-sm">
                    &copy; 2026 Mitoflow40. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
