import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 py-10 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left: Logo + copyright */}
                <div className="flex items-center gap-4">
                    <AppLogo size={22} className="opacity-50" />
                    <span className="text-[0.625rem] uppercase tracking-widest text-parchment/30 font-medium">
                        © 2026 Arunakiri
                    </span>
                </div>
            </div>
        </footer>
    );
}