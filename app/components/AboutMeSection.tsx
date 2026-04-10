'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const stats = [
    { value: '8 yrs.', label: 'Experience' },
    { value: '6', label: 'Projects' },
    { value: '4', label: 'Apps Built' },
    { value: '- DSL Connect, - Drive Matrix, - H2 Dash, - DSL Assistant', label: 'Apps'}
];

export default function AboutMeSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal').forEach((el, i) => {
                            setTimeout(() => el.classList.add('visible'), i * 100);
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
            id="about"
            ref={sectionRef}
            className="py-32 px-6 md:px-12 bg-ink"
            style={{ borderTop: '1px solid rgba(245,240,232,0.05)' }}>

            <div className="max-w-7xl mx-auto">
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
                    <div className="reveal">
                        <div className="panel-rule mb-5" />
                        <span className="section-label">About Me</span>
                        <h2
                            className="font-display font-light text-parchment mt-4"
                            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}>

                            Hello<br />
                            <span className="font-display italic" style={{ color: 'var(--color-parchment-dim)' }}>
                                I am Arun
                            </span>
                        </h2>
                    </div>
                    <p
                        className="reveal reveal-delay-2 font-sans font-light text-parchment/45 max-w-sm"
                        style={{ fontSize: '0.9rem', lineHeight: 1.75, letterSpacing: '0.01em' }}>

                        Proactive and Decisive, I take ownership and accountability for the responsibilities entrusted to me.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    {/* Tall image card — spans 2 rows */}
                    <div
                        className="reveal bento-card md:row-span-2 relative overflow-hidden"
                        style={{
                            border: '1px solid rgba(245,240,232,0.07)',
                            minHeight: 420
                        }}>

                        <AppImage
                            src="/assets/images/My_Photo.jpg"
                            alt="Alexander Merritt in a boardroom, formal dark suit, confident posture"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ filter: 'grayscale(30%) brightness(0.6) contrast(1.05)' }} />

                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(to top, rgba(13,13,13,0.9) 0%, transparent 50%)'
                            }} />

                        <div className="absolute bottom-8 left-8 right-8">
                            <p className="section-label mb-2">Current Position</p>
                            <p className="font-display font-light text-parchment" style={{ fontSize: '1.35rem', lineHeight: 1.3 }}>
                                Data Scientist
                            </p>
                            <p className="text-parchment/45 font-sans mt-1" style={{ fontSize: '0.8rem' }}>
                                Volvo Trucks
                            </p>
                        </div>
                    </div>

                    {/* Stats — 2 across top */}
                    <div
                        className="reveal reveal-delay-1 bento-card col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-0"
                        style={{ border: '1px solid rgba(245,240,232,0.07)' }}>

                        {/* Render Apps stat as a vertical list with smaller text, other stats as normal */}
                        {stats?.map((stat, i) =>
                            stat.label === 'Apps' ? (
                                <div
                                    key={i}
                                    className="p-8 flex flex-col justify-end"
                                    style={{
                                        borderRight: i < stats?.length - 1 ? '1px solid rgba(245,240,232,0.06)' : 'none'
                                    }}>
                                    <div className="flex flex-col gap-1">
                                        {stat.value.split(',').map((app, idx) => (
                                            <div
                                                key={idx}
                                                className="font-sans text-parchment/70"
                                                style={{ fontSize: '0.75rem', fontWeight: '300', lineHeight: 1.4 }}
                                            >
                                                {app.trim()}
                                            </div>
                                        ))}
                                    </div>
                                    <p
                                        className="font-sans text-parchment/35 mt-2"
                                        style={{ fontSize: '0.65rem', letterSpacing: '0.08em', lineHeight: 1.5 }}>
                                        {stat?.label}
                                    </p>
                                </div>
                            ) : (
                                <div
                                    key={i}
                                    className="p-8 flex flex-col justify-end"
                                    style={{
                                        borderRight: i < stats?.length - 1 ? '1px solid rgba(245,240,232,0.06)' : 'none'
                                    }}>
                                    <div className="stat-number">{stat?.value}</div>
                                    <p
                                        className="font-sans text-parchment/35 mt-2"
                                        style={{ fontSize: '0.65rem', letterSpacing: '0.08em', lineHeight: 1.5 }}>
                                        {stat?.label}
                                    </p>
                                </div>
                            )
                        )}
                    </div>

                    {/* Contact card */}
                    <div
                        className="reveal reveal-delay-2 bento-card p-8"
                        style={{ border: '1px solid rgba(245,240,232,0.07)' }}>

                        <p className="section-label mb-5">Contact</p>
                        <div className="space-y-2">
                            {[
                                { label: 'mail', value: 'arunakiri.v@gmail.com' },
                                { label: 'phone', value: '+91 741-890-8007' },
                                { label: 'linked-in', value: 'https://linkedin.com/in/arunakiri-venkatachalam-13a9611a0/'},
                                { label: 'location', value: 'Bangalore'},
                            ].map((item) => (
                                <div key={item.label} className="flex items-baseline gap-4" style={{ marginBottom: '1rem' }}>
                                    <span
                                        className="font-sans text-parchment/25 shrink-0"
                                        style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', width: 80 }}
                                    >
                                        {item.label}
                                    </span>
                                    {item.label === 'linked-in' ? (
                                        <a
                                            href={item.value}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-sans text-blue-400 hover:text-blue-300"
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            linkedin.com/in/arunakiri
                                        </a>
                                    ) : (
                                        <span
                                            className="font-sans text-parchment/50"
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            {item.value}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education card */}
                    <div
                        className="reveal reveal-delay-3 bento-card p-8"
                        style={{ border: '1px solid rgba(245,240,232,0.07)' }}>

                        <p className="section-label mb-5">Education</p>
                        <div className="space-y-4">
                            {[
                                { deg: 'M.Sc in Data Science', school: 'BITS Pilani, Hyderabad', year: '2020 - 2022', logo: '/assets/logos/bits_pilani-cropped.svg', hw: 48, weight: 48 },
                                { deg: 'BE in Electronics & Communication', school: 'Anna University, Chennai', year: '2012 - 2016', logo: '/assets/logos/anna_university-cropped.svg', hw: 48, weight: 48}]?.
                                map((edu) =>
                                    <div key={edu?.school} className="flex items-center gap-4">
                                        
                                        {/* Logo container */}
                                        <span className="flex items-center justify-center rounded-full bg-parchment/10" style={{ height: `${edu?.hw}px`, width: `${edu?.hw}px` }}>
                                            <AppImage
                                                src={edu?.logo || '/assets/images/no_image.png'}
                                                alt={`${edu?.school} logo`}
                                                width={edu?.weight}
                                                height={edu?.weight}
                                                className="object-contain"
                                            />
                                        </span>

                                        {/* Text */}
                                        <div>
                                            <p className="font-display italic text-parchment/70" style={{ fontSize: '1rem' }}>
                                                {edu?.deg}
                                            </p>
                                            <p className="font-sans text-parchment/35" style={{ fontSize: '0.7rem', letterSpacing: '0.06em' }}>
                                                {edu?.school}
                                            </p>
                                            <p className="font-sans text-parchment/35" style={{ fontSize: '0.7rem', letterSpacing: '0.06em' }}>
                                                {edu?.year}
                                            </p>
                                        </div>

                                    </div>
                            )}
                                
                        </div>
                    </div>
                </div>

                {/* Logo grid */}
                <div
                    className="reveal"
                    style={{ borderTop: '1px solid rgba(245,240,232,0.06)', paddingTop: '2.5rem' }}>

                    <p className="section-label mb-8">Technical Skills</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: 'Language & Frameworks',
                                items: ['Python', 'Django Web Framework', 'Shell', 'REST API', 'SQL Alchemy', 'React']
                            },
                            {
                                title: 'DevOps & Cloud',
                                items: ['Docker', 'Kubernetes', 'Git/GitHub', 'CI/CD DevOps', 'OAuth 2.0']
                            },
                            {
                                title: 'Visualization & Analytics',
                                items: ['Power BI', 'Grafana', 'Plotly Dash', 'Streamlit']
                            },
                            {
                                title: 'Data Science',
                                items: ['Machine Learning', 'Artificial Intelligence', 'Image/Text Scanning']
                            }
                        ].map((category) => (
                            <div key={category.title} className="bento-card p-6" style={{ border: '1px solid rgba(245,240,232,0.07)' }}>
                                <p className="section-label mb-4">{category.title}</p>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map((item) => (
                                        <span
                                            key={item}
                                            className="font-sans font-medium text-parchment/50 hover:text-parchment/80 transition-colors duration-300"
                                            style={{
                                                fontSize: '0.65rem',
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                padding: '4px 8px',
                                                border: '1px solid rgba(245,240,232,0.1)',
                                                cursor: 'default'
                                            }}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>);

}