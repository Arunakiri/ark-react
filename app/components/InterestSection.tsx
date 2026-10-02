'use client';
import React, { useEffect, useRef, useState } from 'react';
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
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const cardAngle = 360 / speakingCards.length;

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

    const handleImageClick = (src: string, alt: string) => {
        setSelectedImage({ src, alt });
    };

    const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === modalRef.current) {
            setSelectedImage(null);
        }
    };

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

                            Exploring the World
                        </h2>
                    </div>
                    <p
                        className="reveal reveal-delay-2 font-sans font-light text-parchment/40 max-w-xs"
                        style={{ fontSize: '0.85rem', lineHeight: 1.75 }}>

                        Travel far enough, you meet yourself. <br/>— David Mitchell
                    </p>
                </div>
            </div>
            <style>{`
                .interest-cylinder {
                    position: relative;
                    height: 540px;
                    overflow: hidden;
                    perspective: 3200px;
                    perspective-origin: 50% 48%;
                    -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
                    mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
                }
                .interest-cylinder-ring {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    transform-style: preserve-3d;
                    animation: interest-cylinder-rotation 66s linear infinite;
                    will-change: transform;
                }
                .interest-cylinder:hover .interest-cylinder-ring,
                .interest-cylinder:focus-within .interest-cylinder-ring {
                    animation-play-state: paused;
                }
                .interest-cylinder-card {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: clamp(260px, 30vw, 380px);
                    height: 480px;
                    overflow: hidden;
                    padding: 0;
                    border: 1px solid rgba(245, 240, 232, 0.16);
                    background: #17191a;
                    color: var(--color-parchment);
                    text-align: left;
                    appearance: none;
                    backface-visibility: hidden;
                    cursor: pointer;
                    transition: border-color 400ms ease;
                }
                .interest-cylinder-card:hover { border-color: rgba(245, 240, 232, 0.55); }
                .interest-cylinder-card img { transition: filter 700ms ease, transform 900ms ease; }
                .interest-cylinder-card:hover img {
                    filter: grayscale(0%) brightness(0.88) !important;
                    transform: scale(1.05);
                }
                .interest-cylinder-shade {
                    position: absolute;
                    z-index: 1;
                    inset: 0;
                    background: linear-gradient(to top, rgba(13, 13, 13, 0.92), transparent 55%);
                    pointer-events: none;
                }
                .interest-cylinder-title {
                    position: absolute;
                    z-index: 2;
                    right: 28px;
                    bottom: 28px;
                    left: 28px;
                    color: rgba(245, 240, 232, 0.94);
                    font-size: 1.1rem;
                    line-height: 1.35;
                }
                .interest-cylinder-index {
                    position: absolute;
                    z-index: 2;
                    top: 24px;
                    right: 24px;
                    color: rgba(245, 240, 232, 0.65);
                    font-size: 0.65rem;
                }
                @keyframes interest-cylinder-rotation {
                    from { transform: rotateY(0deg); }
                    to { transform: rotateY(-360deg); }
                }
                @media (max-width: 640px) {
                    .interest-cylinder { height: 520px; perspective: 3200px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .interest-cylinder-ring { animation: none; }
                    .interest-cylinder-card,
                    .interest-cylinder-card img { transition: none; }
                }
            `}</style>
            <div className="interest-cylinder" aria-label="Rotating photo gallery">
                <div className="interest-cylinder-ring">
                    {speakingCards.map((card, i) =>
                        <button
                            key={card.event}
                            type="button"
                            className="interest-cylinder-card group"
                            style={{ transform: `translate(-50%, -50%) rotateY(${i * cardAngle}deg) translateZ(clamp(500px, 44vw, 620px)) scale(0.83)` }}
                            onClick={() => handleImageClick(card.img, card.alt)}
                            aria-label={`View ${card.event}`}>
                            <AppImage
                                src={card.img}
                                alt={card.alt}
                                className="absolute inset-0 h-full w-full object-cover"
                                style={{ filter: 'grayscale(45%) brightness(0.78)' }} />
                            <span className="interest-cylinder-shade" />
                            <span className="interest-cylinder-title font-display italic">{card.event}</span>
                            <span className="interest-cylinder-index">{String(i + 1).padStart(2, '0')}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    ref={modalRef}
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={handleModalClose}>
                    <div
                        className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}>
                        <AppImage
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="w-full h-full object-contain rounded-lg"
                            style={{
                                maxHeight: '90vh',
                                filter: 'brightness(1)'
                            }} />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 bg-parchment/10 hover:bg-parchment/20 rounded-full p-3 transition-all"
                            aria-label="Close modal">
                            <svg
                                className="w-6 h-6 text-parchment"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </section>);

}