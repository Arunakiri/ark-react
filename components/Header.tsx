'use client';
import React, { useEffect, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Interests', href: '#interests' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-white/5' : ''
                }`}
            style={{ mixBlendMode: scrolled ? 'normal' : 'difference' }}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group">
                    <AppLogo
                        size={28}
                        text="Ark-React"
                        className="opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                </a>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks?.map((link) => (
                        <a
                            key={link?.href}
                            href={link?.href}
                            className="underline-hover text-[0.625rem] font-medium tracking-widest-2 uppercase text-white/60 hover:text-white transition-colors duration-300"
                        >
                            {link?.label}
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                {/* Open CV PDF in a new tab for better user experience */}
                <a
                    href={`${BASE_PATH}/assets/resume/Arunakiri_Resume_11042026.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.625rem] font-semibold uppercase tracking-widest-2 border border-white/25 text-white px-6 py-2.5 hover:border-blue hover:text-parchment hover:bg-blue transition-all duration-400"
                >
                    Download CV
                </a>
            </div>
        </header>
    );
}