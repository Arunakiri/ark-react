'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

interface CaseStudy {
  id: string;
  index: string;
  category: string;
  title: string;
  location: string;
  year: string;
  image: string;
  imageAlt: string;
  details: {
    label: string;
    value: string;
  }[];
  outcome: {
    label: string;
    value: string[];
  }[];
}

const cases: CaseStudy[] = [
{
  id: 'cs1',
  index: '01',
  category: 'Retaining Structure',
  title: 'Volvo',
  location: 'Marin County, CA',
  year: '2021',
  image: "https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/market-landing-volvo-trucks-grille-close-up?qlt=82&wid=1440&ts=1741354193495&dpr=off&fit=constrain",
//   image: "https://tunit.com/wp-content/uploads/2022/07/Volvo-fh-with-tunit-logo-banner-size.png",
//   image: "/assets/work/volvo-closeup.avif",
  imageAlt: 'Large concrete retaining wall system built into hillside terrain with rebar reinforcement visible during construction',
  details: [
    { label: 'Position', value: 'Data Scientist' },
    { label: 'Interval', value: 'Oct 2023 - Present' },
  ],
  outcome: [
    {label: 'Data Science Lab (DSL)', value: [
        'Designed scalable data solutions in a secure on-premises DSL, supporting 200+ concurrent users.',
        'Developed high-frequency ETL pipelines and web apps for Hydrogen Engine Rigs, reducing pipeline latency.',
        'Built LLM agent systems with RAG pipelines for enterprise document Q&A and in-chat data visualization.',
        'Delivered real-time monitoring dashboards in Grafana and Databricks for engineering test rigs.',
        'Led the site-wide Volvo Data Science Conference 2026, driving cross-team knowledge sharing.',
    ]},
  ],
},
{
  id: 'cs2',
  index: '02',
  category: 'Retaining Structure',
  title: 'HCL',
  location: 'Marin County, CA',
  year: '2021',
  image: "https://th-i.thgim.com/public/incoming/ee8pg0/article69812409.ece/alternates/FREE_1200/2025-04-22T124842Z_1165470939_RC2RP6AK0GJN_RTRMADP_3_HCL-TECHNO-RESULTS.JPG",
  imageAlt: 'Large concrete retaining wall system built into hillside terrain with rebar reinforcement visible during construction',
  details: [
    { label: 'Position', value: 'Lead Analyst' },
    { label: 'Interval', value: 'Oct 2021 - Oct 2023' },
  ],
  outcome: [
    {label: 'Digital Operations', value: [
        'Core member of the MATLAB-to-Python migration, cutting third-party licensing costs by 30%.',
        'Re-engineered Dolly Tire wear modelling, Geo-Location tracking, and Battery SoC estimation as Python solutions.',
        'Designed reusable Python libraries to standardize workflows and accelerate delivery across projects.',
        'Conducted structured Python training sessions to drive analytics adoption across Volvo teams.',
    ]},
  ],
},
{
  id: 'cs3',
  index: '03',
  category: 'Retaining Structure',
  title: 'Infosys',
  location: 'Marin County, CA',
  year: '2021',
  image: "https://www.infosys.com/content/dam/infosys-web/en/about/images/esg-policies.jpg",
  imageAlt: 'Large concrete retaining wall system built into hillside terrain with rebar reinforcement visible during construction',
  details: [
    { label: 'Position', value: 'Senior System Engineer' },
    { label: 'Interval', value: 'Apr 2018 - Oct 2021' },
  ],
  outcome: [
    {label: 'OCR Data Extraction', value: [
        'Built OCR-based extraction pipelines for Novartis, achieving ~80% accuracy on complex multi-format documents.',
        'Automated structured data extraction from unstructured PDFs and scanned images, reducing manual entry.',
        'Designed a PostgreSQL architecture to centralize extracted product data for efficient querying.',
        'Developed Power BI dashboards (PIL Boards) for self-service access to product and quality metrics.',
    ]},
  ],
},
];


export default function WorkSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

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
        if (sectionRef?.current) observer?.observe(sectionRef?.current);
        return () => observer?.disconnect();
    }, []);

    return (

        <section
            id="work"
            ref={sectionRef}
            className="relative py-40 px-6 md:px-12 overflow-hidden"
            style={{
                background: 'linear-gradient(165deg, #0D0D0D 0%, #111416 50%, #0D0D0D 100%)',
                borderTop: '1px solid rgba(245,240,232,0.05)',
            }}
        >
            {/* Parallax ambient glow */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: '20%',
                    left: '-10%',
                    width: '50%',
                    height: '60%',
                    background: 'radial-gradient(ellipse, rgba(27,58,92,0.12) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />
            <div
                className="absolute pointer-events-none"
                style={{
                    bottom: '10%',
                    right: '-5%',
                    width: '40%',
                    height: '50%',
                    background: 'radial-gradient(ellipse, rgba(27,58,92,0.08) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
            />
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section header */}
                <div className="items-center gap-4 mb-4 reveal">
                    <div className="panel-rule mb-5" />
                    <span className="section-label">Work</span>
                </div>
                
                {/* Case Studies */}
                {cases.map((cs, idx) => {
                    const isEven = idx % 2 === 0;
                    const isOdd = idx % 2 !== 0;
                    return (
                    <div key={cs.id}>
                        
                        <div className="max-w-7xl mx-auto px-6 md:px-6 py-20 md:py-20">
                            {/* 60/40 Asymmetric Grid */}
                            <div
                                className={`grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-0 items-start ${
                                !isOdd ? 'md:grid-cols-[40fr_60fr]' : ''}`
                                }>
                                
                                {/* Photo Column (60) */}
                                <div
                                    className={`reveal case-card relative ${
                                    !isOdd ? 'md:order-2' : ''}`
                                    }>

                                    {/* Photo */}
                                    <div
                                        className="relative overflow-hidden"
                                        style={{ height: 'clamp(280px, 38vw, 520px)' }}>
                                        
                                        <AppImage
                                            src={cs.image}
                                            alt={cs.imageAlt}
                                            fill
                                            className="case-photo object-cover"
                                            style={{ filter: 'grayscale(70%) contrast(1.05)' }} />
                                        
                                        {/* Violet overlay bottom */}
                                        <div
                                        className="absolute inset-0"
                                        style={{
                                            background:
                                            'linear-gradient(to top, rgba(123,47,190,0.25) 0%, transparent 50%)'
                                        }} />
                                        
                                    </div>
                                </div>

                                {/* Story Column (40) */}
                                <div
                                    className={`reveal delay-2 flex flex-col justify-start pt-16 md:pt-0 ${
                                    isOdd ? 'md:pl-14' : 'md:pr-14 md:order-1'}`
                                    }>
                                    {/* Title */}
                                    <h3
                                        className="font-manrope font-light text-eng-white mb-6 leading-tight"
                                        style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}>
                                        {cs.title}
                                    </h3>

                                    {/* Engineering Details Grid */}
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-8 pb-8 border-b border-white/8">
                                        {cs.details.map((d) =>
                                        <div key={d.label} className="flex flex-col gap-1">
                                            <span className="font-dm text-eng-white/35 text-[9px] tracking-[0.22em] uppercase">
                                            {d.label}
                                            </span>
                                            <span className="font-dm text-eng-white/90 text-sm font-medium">
                                            {d.value}
                                            </span>
                                        </div>
                                        )}
                                    </div>

                                    {/* Narrative */}
                                    {/* <p className="font-dm font-light text-eng-white/60 text-sm leading-relaxed mb-6">
                                        {cs.narrative}
                                    </p> */}

                                    {/* Outcome */}
                                    {cs.outcome.map((o) =>
                                        <div
                                            key={idx} 
                                            className="p-4 border-l-2 mb-8"
                                            style={{ borderColor: 'var(--violet)', background: 'rgba(123,47,190,0.06)' }}>
                                                
                                            <span className="font-dm text-eng-white/35 text-[9px] tracking-[0.22em] uppercase">
                                            {o.label}
                                            </span>
                                            {/* Render outcome values as bullet list with proper alignment, fallback to paragraph for empty arrays */}
                                            {Array.isArray(o.value) && o.value.length > 0 ? (
                                                <ul className="list-disc space-y-1 mt-2 pl-4">
                                                    {o.value.map((item, idx) => (
                                                        <li key={idx} className="font-dm text-eng-white/80 text-sm leading-relaxed">
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="font-dm text-eng-white/80 text-sm leading-relaxed italic">
                                                    {o.value}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                </div>

                            </div>
                        </div>
                    </div>);

                })}
                
            </div>

        </section>
    );
}