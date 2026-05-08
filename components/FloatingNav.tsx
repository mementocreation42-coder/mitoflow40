'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
    { href: '/journal', label: 'Journal' },
];

export default function FloatingNav() {
    const [visible, setVisible] = useState(false);
    const footerRef = useRef<Element | null>(null);
    const headerRef = useRef<Element | null>(null);

    useEffect(() => {
        footerRef.current = document.querySelector('footer');
        headerRef.current = document.querySelector('header');

        const onScroll = () => {
            const headerBottom = headerRef.current
                ? headerRef.current.getBoundingClientRect().bottom
                : 0;
            const pastHeader = headerBottom < 0;

            let footerVisible = false;
            if (footerRef.current) {
                const rect = footerRef.current.getBoundingClientRect();
                footerVisible = rect.top < window.innerHeight;
            }

            setVisible(pastHeader && !footerVisible);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div
            className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none"
        >
            <div
                className="pointer-events-auto transition-all duration-500 ease-out"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: `translateY(${visible ? '0px' : '20px'})`,
                }}
            >
                <div
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
                    style={{
                        background: 'rgba(180,240,228,0.90)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.8) inset',
                        border: '1px solid rgba(0,0,0,0.08)',
                    }}
                >
                    {/* Author avatar */}
                    <Link
                        href="/#profile"
                        className="flex items-center gap-1.5 px-2 py-1 rounded-full hover:bg-black/5 transition-colors"
                    >
                        <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-[#41C9B4]/60">
                            <Image
                                src="/images/profile.jpg"
                                alt="Daisuke Kobayashi"
                                width={24}
                                height={24}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        <span className="text-xs font-semibold text-[#1A1A1A]/80 hidden sm:block">小林大介</span>
                    </Link>

                    <div className="w-px h-4 bg-black/10 mx-0.5" />

                    {/* Nav links */}
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="px-2.5 py-1 rounded-full text-xs font-semibold text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-black/5 transition-all whitespace-nowrap"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="w-px h-4 bg-black/10 mx-0.5" />

                    {/* CTA */}
                    <Link
                        href="/#contact"
                        className="px-3 py-1 rounded-full text-xs font-bold text-[#1A1A1A] transition-all whitespace-nowrap"
                        style={{
                            background: 'linear-gradient(135deg, #4AF6C3 0%, #3AE6B3 100%)',
                            boxShadow: '0 2px 8px rgba(74,246,195,0.4)',
                        }}
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </div>
    );
}
