'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const speakingCards = [
    {
        event: 'En-route Pune',
        img: "/assets/interests/bikes.jpg",
        alt: 'En-route Pune'
    },
    {
        event: 'Thanjai Periya Kovil',
        img: "/assets/interests/temple-1.jpg",
        alt: 'Thanjai Periya Kovil'
    },
    {
        event: 'Satodi Falls, Yellapur',
        img: "/assets/interests/falls.jpg",
        alt: 'Satodi Falls, Yellapur'
    },
    {
        event: 'Devgad Beach',
        img: "/assets/interests/beach.jpg",
        alt: 'Devgad Beach'
    },
    {
        event: 'Taj Mahal, Agra',
        img: "/assets/interests/taj-1.jpg",
        alt: 'Taj Mahal, Agra'
    },
    {
        event: 'Music',
        img: "/assets/interests/music-album.png",
        alt: 'Music'
    }, 
    {
        event: 'Video Games',
        img: "/assets/interests/ps5-games.jpg",
        alt: 'Games'
    }, 
    {
        event: 'Sail to Ko-Pha-Ngan',
        img: "/assets/interests/ship.jpeg",
        alt: 'Sail to Ko-Pha-Ngan'
    }, 
    {
        event: 'Flight to Singapore',
        img: "/assets/interests/flight.jpeg",
        alt: 'Flight to Singapore'
    }, 
    {
        event: 'Skattegarden, Sweden',
        img: "/assets/interests/sweden.jpeg",
        alt: 'Skattegarden, Sweden'
    }, 
    {
        event: 'Thirparappu Falls',
        img: "/assets/interests/thiruparappu.jpeg",
        alt: 'Thirparappu Falls'
    }, 
];


export default function InterestSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal').forEach((el, i) => {
                            setTimeout(() => el.classList.add('visible'), i * 120);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );
        if (sectionRef?.current) observer?.observe(sectionRef?.current);
        return () => observer?.disconnect();
    }, []);

    return (
        <section
            id="interests"
            ref={sectionRef}
            className="py-32 bg-ink overflow-hidden"
            style={{ borderTop: '1px solid rgba(245,240,232,0.05)' }}>

            {/* Section header */}
            <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="reveal">
                        <div className="panel-rule mb-5" />
                        <span className="section-label">Interests</span>
                        <h2
                            className="font-display font-light text-parchment mt-4"
                            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.1 }}>

                            Our Passion is our Strength
                        </h2>
                    </div>
                    <p
                        className="reveal reveal-delay-2 font-sans font-light text-parchment/40 max-w-xs"
                        style={{ fontSize: '0.85rem', lineHeight: 1.75 }}>

                        Travel far enough, you meet yourself. <br/>— David Mitchell
                    </p>
                </div>
            </div>
            {/* Horizontal snap gallery */}
            <div
                ref={galleryRef}
                className="snap-gallery flex overflow-x-auto gap-4 px-6 md:px-12"
                style={{ paddingBottom: '1.5rem' }}>

                {speakingCards?.map((card, i) =>
                    <div
                        key={i}
                        className="snap-card group relative overflow-hidden"
                        style={{
                            width: 'clamp(260px, 30vw, 380px)',
                            height: 480,
                            border: '1px solid rgba(245,240,232,0.07)',
                            flexShrink: 0
                        }}>

                        <AppImage
                            src={card?.img}
                            alt={card?.alt}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
                            style={{
                                filter: 'grayscale(60%) brightness(0.5)',
                                transform: 'scale(1.02)',
                                transition: 'filter 0.8s ease, transform 0.8s ease'
                            }} />

                        {/* Hover: color reveal */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            style={{
                                background: 'rgba(13,13,13,0)'
                            }} />

                        <style>{`
                            .snap-card:hover img {
                                filter: grayscale(0%) brightness(0.55) !important;
                                transform: scale(1.06) !important;
                            }
                        `}</style>

                        {/* Gradient */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(to top, rgba(13,13,13,0.92) 0%, transparent 55%)'
                            }} />


                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-7">
                            <p
                                className="font-display italic text-parchment/90 mb-1"
                                style={{ fontSize: '1.1rem', lineHeight: 1.35 }}>

                                {card?.event}
                            </p>
                            {/* Hover reveal arrow */}
                            <div
                                className="mt-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
                                style={{ transform: 'translateY(8px)', transition: 'opacity 0.4s ease, transform 0.4s ease' }}>

                                <style>{`
                                    .snap-card:hover .speaking-arrow {
                                        opacity: 1 !important;
                                        transform: translateY(0) !important;
                                    }
                                `}</style>
                            </div>
                        </div>

                        {/* Index */}
                        <div
                            className="absolute top-6 right-6"
                            style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.2)' }}>

                            {String(i + 1)?.padStart(2, '0')}
                        </div>
                    </div>
                )}
            </div>
            {/* Gallery scroll hint */}
            <div className="px-6 md:px-12 mt-6 flex items-center gap-3">
                <div style={{ width: 24, height: 1, background: 'rgba(245,240,232,0.15)' }} />
                <span
                    className="font-sans text-parchment/25"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>

                    Scroll to explore
                </span>
            </div>
        </section>);

}