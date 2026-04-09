import React from 'react';

const items = [
    'Harvard Business Review',
    'World Economic Forum',
    'Financial Times',
    'Fortune 500 Boards',
    'TED Global',
    'McKinsey Quarterly',
    'Davos Panelist',
    'MIT Sloan Fellow',
    'Harvard Business Review',
    'World Economic Forum',
    'Financial Times',
    'Fortune 500 Boards',
    'TED Global',
    'McKinsey Quarterly',
    'Davos Panelist',
    'MIT Sloan Fellow',
];

export default function MarqueeStrip() {
    return (
        <div className="rule-parchment border-t border-b border-white/5 py-5 overflow-hidden bg-ink-soft">
            <div className="marquee-container">
                <div className="marquee-track">
                    {items?.map((item, i) => (
                        <React.Fragment key={i}>
                            <span
                                className="mx-10 text-parchment/25 font-sans font-medium"
                                style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
                            >
                                {item}
                            </span>
                            <span className="text-blue/40 mx-2" style={{ fontSize: '0.5rem' }}>·</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}