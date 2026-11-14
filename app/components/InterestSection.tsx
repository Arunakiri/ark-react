'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import CircularCarousel from './CircularCarousel';

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
            <CircularCarousel
                items={speakingCards.map((card) => ({
                    src: card.img,
                    alt: card.alt,
                    title: card.event
                }))}
                cardWidth={280}
                aspectRatio={0.75}
                speed={14}
                gap={25}
                tilt={0}
                curve={1}
                perspective={2500}
                autoplay="drift"
                direction="right"
                momentum={0.6}
                snap
                pauseOnHover
                focusOnClick
                depthFade={0.55}
                cornerRadius={12}
                onItemClick={(item) => handleImageClick(item.src, item.alt)} />

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