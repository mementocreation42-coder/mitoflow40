import Link from 'next/link';

const footerLinks = [
    { href: '/check', label: 'FREE CHECK' },
    { href: '/sample', label: 'SAMPLE ANALYSIS' },
    { href: '/library', label: 'LIBRARY' },
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
                <p className="text-white text-sm mb-2">あなたの未来をミトのちからと共に —</p>
                <p className="text-white text-xs mb-8 opacity-80" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em" }}>May the Mito-Force be with you.</p>

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

                {/* Legal */}
                <nav className="mb-6">
                    <ul className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs opacity-70">
                        <li><Link href="/author" className="footer-link">著者・監修</Link></li>
                        <li><Link href="/terms" className="footer-link">利用規約</Link></li>
                        <li><Link href="/privacy" className="footer-link">プライバシーポリシー</Link></li>
                        <li><Link href="/legal" className="footer-link">特定商取引法に基づく表記</Link></li>
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
