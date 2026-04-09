'use client';
import React, { useEffect, useRef } from 'react';

export default function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef?.current) {
            videoRef.current.playbackRate = 0.6;
        }
    }, []);

    return (
        <section className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
            {/* Video Background */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover grayscale"
                style={{ filter: 'grayscale(100%) brightness(0.45) contrast(1.1)' }}
                autoPlay
                muted
                loop
                playsInline
                poster="/assets/images/Superman-9.png"
            >
                {/* Pexels / Unsplash fallback — replace with actual executive footage */}
                {/* <source
                    src="https://www.pexels.com/video/man-in-suit-walking-through-office-corridor-3571264/"
                    type="video/mp4"
                /> */}
            </video>

            {/* Gradient overlay */}
            <div className="video-overlay absolute inset-0" />

            {/* Atmospheric blue accent glow */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(27,58,92,0.18) 0%, transparent 70%)',
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center px-6 flex flex-col items-center">
                {/* Pre-title */}
                <div className="fade-in-up delay-500 flex items-center gap-4 mb-10">
                    <div className="w-10 h-px bg-parchment/30" />
                    <span className="section-label" style={{ color: 'rgba(245,240,232,0.45)' }}>
                        Data Scientist · Open to Work
                    </span>
                    <div className="w-10 h-px bg-parchment/30" />
                </div>

                {/* Name — wide letterspace reveal after 2s */}
                <h1
                    className="name-reveal delay-500 font-display font-light text-parchment"
                    style={{
                        fontSize: 'clamp(2.8rem, 8vw, 7.5rem)',
                        letterSpacing: '0.25em',
                        lineHeight: 1,
                    }}
                >
                    Arunakiri Venkatachalam
                </h1>

                {/* Thin rule */}
                <div
                    className="fade-in-up delay-500 mt-8 mb-8"
                    style={{ width: 60, height: 1, background: 'rgba(27,58,92,0.7)' }}
                />

                {/* Tagline */}
                <p
                    className="fade-in-up delay-500 font-sans font-light text-parchment/55 max-w-3xl"
                    style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.05rem)', letterSpacing: '0.04em', lineHeight: 1.7 }}
                >
                    Proficient in Python with strong analytical thinking and cross functional collaboration.
                    <br /> Eight years building Data Pipelines, Cloud Native Applications and Advanced Analytics. 
                </p>

                {/* CTAs */}
                {/* <div className="fade-in-up delay-2200 flex flex-col sm:flex-row items-center gap-4 mt-12">
                    <a
                        href="#contact"
                        className="btn-primary border border-parchment/25 text-parchment text-[0.625rem] uppercase tracking-widest-2 font-semibold px-10 py-4"
                    >
                        <span>Request a Conversation</span>
                    </a>
                    <a
                        href="#about"
                        className="underline-hover text-[0.625rem] uppercase tracking-widest-2 font-medium text-parchment/45 hover:text-parchment/80 transition-colors duration-300 px-4 py-4"
                    >
                        Enter
                    </a>
                </div> */}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 fade-in-up delay-2200 flex flex-col items-center gap-3">
                <div
                    className="w-px bg-parchment/20"
                    style={{
                        height: 48,
                        animation: 'scrollPulse 2.4s ease-in-out infinite',
                    }}
                />
                <style>{`
                    @keyframes scrollPulse {
                        0%, 100% { opacity: 0.2; transform: scaleY(1); }
                        50%       { opacity: 0.6; transform: scaleY(1.15); }
                    }
                `}</style>
                <span className="section-label" style={{ fontSize: '0.5rem' }}>Scroll</span>
            </div>
        </section>
    );
}