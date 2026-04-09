'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function ContactSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [submitted, setSubmitted] = useState(false);
    const [briefEmail, setBriefEmail] = useState('');
    const [briefSubmitted, setBriefSubmitted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal').forEach((el, i) => {
                            setTimeout(() => el.classList.add('visible'), i * 150);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleConversationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleBriefSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setBriefSubmitted(true);
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="py-40 px-6 md:px-12 relative overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #0D0D0D 0%, #0E1218 100%)',
                borderTop: '1px solid rgba(245,240,232,0.05)',
            }}
        >
            {/* Ambient glow */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: '30%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '70%',
                    height: '60%',
                    background: 'radial-gradient(ellipse, rgba(27,58,92,0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
            />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-24 reveal">
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="panel-rule" />
                        <span className="section-label">The Door</span>
                        <div className="panel-rule" />
                    </div>
                    <h2
                        className="font-display font-light text-parchment"
                        style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}
                    >
                        The right conversation<br />
                        <span className="font-display italic" style={{ color: 'var(--color-parchment-dim)' }}>
                            begins here.
                        </span>
                    </h2>
                    <p
                        className="font-sans font-light text-parchment/40 max-w-md mx-auto mt-6"
                        style={{ fontSize: '0.9rem', lineHeight: 1.75 }}
                    >
                        This form is reviewed personally. If there is alignment, you will hear back within 48 hours.
                    </p>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Primary form */}
                    <div
                        className="reveal"
                        style={{ border: '1px solid rgba(245,240,232,0.08)', padding: '2.5rem' }}
                    >
                        <p
                            className="font-sans font-medium text-parchment/60 mb-8"
                            style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                        >
                            Request a Conversation
                        </p>

                        {submitted ? (
                            <div className="py-16 text-center">
                                <div
                                    className="font-display italic text-parchment/70 mb-3"
                                    style={{ fontSize: '1.4rem' }}
                                >
                                    Received.
                                </div>
                                <p className="font-sans text-parchment/35" style={{ fontSize: '0.8rem', lineHeight: 1.7 }}>
                                    Your message has been noted. If there is alignment,
                                    you will hear from the office within 48 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleConversationSubmit} className="space-y-10">
                                <div>
                                    <label
                                        className="section-label block mb-3"
                                        htmlFor="fullName"
                                        style={{ fontSize: '0.55rem' }}
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        placeholder="Margaret Chen"
                                        className="field-line"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        className="section-label block mb-3"
                                        htmlFor="organization"
                                        style={{ fontSize: '0.55rem' }}
                                    >
                                        Organization
                                    </label>
                                    <input
                                        id="organization"
                                        type="text"
                                        placeholder="Apex Ventures LLC"
                                        className="field-line"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        className="section-label block mb-3"
                                        htmlFor="exploring"
                                        style={{ fontSize: '0.55rem' }}
                                    >
                                        What are you exploring?
                                    </label>
                                    <input
                                        id="exploring"
                                        type="text"
                                        placeholder="Advisory seat on our board ahead of Series C"
                                        className="field-line"
                                        required
                                    />
                                </div>
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="btn-primary w-full border border-parchment/20 text-parchment text-[0.625rem] uppercase tracking-widest-2 font-semibold py-4 hover:text-parchment transition-colors duration-300"
                                    >
                                        <span>Send Request</span>
                                    </button>
                                    <p
                                        className="text-center text-parchment/20 mt-4"
                                        style={{ fontSize: '0.6rem', letterSpacing: '0.08em' }}
                                    >
                                        Reviewed personally. No intermediaries.
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Secondary: Executive Brief */}
                    <div className="reveal reveal-delay-2 flex flex-col justify-between">
                        <div>
                            <div className="panel-rule mb-6" />
                            <p className="section-label mb-4">Executive Brief</p>
                            <h3
                                className="font-display font-light text-parchment mb-5"
                                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', lineHeight: 1.2 }}
                            >
                                A condensed record for those who prefer to read before they call.
                            </h3>
                            <p
                                className="font-sans font-light text-parchment/40 mb-8"
                                style={{ fontSize: '0.85rem', lineHeight: 1.75 }}
                            >
                                The executive brief covers career arc, current focus areas, speaking topics,
                                board availability, and preferred engagement models. 8 pages. No fluff.
                            </p>

                            {briefSubmitted ? (
                                <div
                                    style={{
                                        border: '1px solid rgba(27,58,92,0.3)',
                                        padding: '1.5rem',
                                        background: 'rgba(27,58,92,0.06)',
                                    }}
                                >
                                    <p
                                        className="font-display italic text-parchment/60 mb-1"
                                        style={{ fontSize: '1rem' }}
                                    >
                                        Brief dispatched.
                                    </p>
                                    <p className="font-sans text-parchment/30" style={{ fontSize: '0.75rem' }}>
                                        Check your inbox. The PDF will arrive within a few minutes.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleBriefSubmit} className="space-y-6">
                                    <div>
                                        <label
                                            className="section-label block mb-3"
                                            htmlFor="briefEmail"
                                            style={{ fontSize: '0.55rem' }}
                                        >
                                            Business Email
                                        </label>
                                        <input
                                            id="briefEmail"
                                            type="email"
                                            value={briefEmail}
                                            onChange={(e) => setBriefEmail(e.target.value)}
                                            placeholder="m.chen@apexventures.com"
                                            className="field-line"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="group flex items-center justify-between w-full py-4"
                                        style={{ borderBottom: '1px solid rgba(245,240,232,0.12)' }}
                                    >
                                        <span
                                            className="font-sans font-medium text-parchment/60 group-hover:text-parchment transition-colors duration-300"
                                            style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
                                        >
                                            Download Executive Brief
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-parchment/30 group-hover:text-parchment/70 group-hover:translate-y-0.5 transition-all duration-300"
                                        >
                                            <path d="M12 5v14M5 12l7 7 7-7" />
                                        </svg>
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact details */}
                        <div
                            className="mt-12 pt-8"
                            style={{ borderTop: '1px solid rgba(245,240,232,0.06)' }}
                        >
                            <p className="section-label mb-4">Office</p>
                            <div className="space-y-2">
                                {[
                                    { label: 'Location', value: 'New York · London · Singapore' },
                                    { label: 'Representation', value: 'office@alexandermerritt.com' },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-baseline gap-4">
                                        <span
                                            className="font-sans text-parchment/25 shrink-0"
                                            style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', width: 80 }}
                                        >
                                            {item.label}
                                        </span>
                                        <span
                                            className="font-sans text-parchment/50"
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}