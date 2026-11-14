'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './CircularCarousel.module.css';

export interface CircularCarouselItem {
    src: string;
    alt: string;
    title: string;
}

interface CircularCarouselProps {
    items: CircularCarouselItem[];
    cardWidth?: number;
    aspectRatio?: number;
    gap?: number;
    curve?: number;
    tilt?: number;
    perspective?: number;
    speed?: number;
    direction?: 'left' | 'right';
    momentum?: number;
    autoplay?: 'drift' | 'off';
    snap?: boolean;
    pauseOnHover?: boolean;
    focusOnClick?: boolean;
    cornerRadius?: number;
    depthFade?: number;
    onItemClick?: (item: CircularCarouselItem) => void;
}

interface CarouselPhysics {
    angle: number;
    velocity: number;
    target: number | null;
    dragging: boolean;
    hover: boolean;
    press: { x: number; angle: number; samples: { time: number; angle: number }[] } | null;
    suppressClick: boolean;
    holdUntil: number;
}

const TILE_COUNT = 8;
const TILE_OVERLAP = 2.5;
const DRAG_THRESHOLD = 5;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const getImagePath = (src: string) => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    return src.startsWith('/') && basePath && !src.startsWith(`${basePath}/`)
        ? `${basePath}${src}`
        : src;
};

export default function CircularCarousel({
    items,
    cardWidth = 280,
    aspectRatio = 0.75,
    gap = 25,
    curve = 1,
    tilt = 11,
    perspective = 2500,
    speed = 14,
    direction = 'left',
    momentum = 0.6,
    autoplay = 'drift',
    snap = true,
    pauseOnHover = true,
    focusOnClick = true,
    cornerRadius = 12,
    depthFade = 0.55,
    onItemClick
}: CircularCarouselProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const wakeRef = useRef<() => void>(() => {});
    const activeRef = useRef(0);
    const physicsRef = useRef<CarouselPhysics>({
        angle: 0,
        velocity: 0,
        target: null,
        dragging: false,
        hover: false,
        press: null,
        suppressClick: false,
        holdUntil: 0
    });
    const [active, setActive] = useState(0);
    const [dragging, setDragging] = useState(false);
    const count = items.length;
    const step = 360 / count;
    const cardHeight = cardWidth / aspectRatio;
    const bend = curve > 0 ? 1 / curve : 0;
    const pitch = cardWidth + gap;
    const n = Math.max(count, 3);
    const chord = pitch / (2 * Math.sin(Math.PI / n));
    const arc = (n * pitch) / (2 * Math.PI);
    const radius = Math.max(chord + (arc - chord) * clamp(curve, 0, 1), cardWidth * 0.6);
    const settingsRef = useRef({ step, radius, speed, direction, momentum, autoplay, snap, pauseOnHover, depthFade });

    useEffect(() => {
        settingsRef.current = { step, radius, speed, direction, momentum, autoplay, snap, pauseOnHover, depthFade };
    }, [step, radius, speed, direction, momentum, autoplay, snap, pauseOnHover, depthFade]);

    const tiles = useMemo(() => Array.from({ length: TILE_COUNT }, (_, index) => {
        const segment = cardWidth / TILE_COUNT;
        const start = index * segment - (index > 0 ? TILE_OVERLAP / 2 : 0);
        const end = (index + 1) * segment + (index < TILE_COUNT - 1 ? TILE_OVERLAP / 2 : 0);
        const width = end - start;
        const center = (start + end) / 2 - cardWidth / 2;
        const bendRadius = bend ? radius * bend : 0;
        const alpha = bendRadius ? center / bendRadius : 0;
        const shift = bendRadius ? bendRadius * Math.sin(alpha) : center;
        const depth = bendRadius ? -bendRadius * (1 - Math.cos(alpha)) : 0;
        const turn = alpha * 180 / Math.PI;
        return { index, start, end, width, shift, depth, turn };
    }), [cardWidth, bend, radius]);

    useEffect(() => {
        const root = rootRef.current;
        const ring = ringRef.current;
        if (!root || !ring) return;

        const physics = physicsRef.current;
        let frame = 0;
        let last = 0;
        let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updateMotionPreference = () => {
            reducedMotion = motionPreference.matches;
            wake();
        };
        motionPreference.addEventListener('change', updateMotionPreference);

        const render = () => {
            ring.style.transform = `rotateY(${physics.angle}deg)`;
            const settings = settingsRef.current;
            const next = ((Math.round(-physics.angle / settings.step) % count) + count) % count;
            for (let index = 0; index < count; index++) {
                const world = ((index * settings.step + physics.angle + 180) % 360 + 360) % 360 - 180;
                const facing = Math.cos(world * Math.PI / 180);
                const fade = settings.depthFade * Math.pow((1 - facing) / 2, 1.25);
                cardRefs.current[index]?.style.setProperty('--card-brightness', (1 - fade * 0.65).toFixed(3));
            }
            if (next !== activeRef.current) {
                activeRef.current = next;
                setActive(next);
            }
        };

        const tick = (now: number) => {
            frame = 0;
            const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
            last = now;
            const settings = settingsRef.current;
            const state = physicsRef.current;

            if (!state.dragging && state.target !== null) {
                let remaining = dt;
                while (remaining > 0) {
                    const h = Math.min(remaining, 1 / 240);
                    const acceleration = 118 * (state.target - state.angle) - 22 * state.velocity;
                    state.velocity += acceleration * h;
                    state.angle += state.velocity * h;
                    remaining -= h;
                }
                if (Math.abs(state.target - state.angle) < 0.004 && Math.abs(state.velocity) < 0.03) {
                    state.angle = state.target;
                    state.velocity = 0;
                    state.target = null;
                }
            } else if (!state.dragging) {
                const nowMs = performance.now();
                const paused = (settings.pauseOnHover && state.hover) || nowMs < state.holdUntil;
                const cruising = settings.autoplay === 'drift' && !reducedMotion && !paused;
                if (cruising) {
                    const cruise = settings.speed * (settings.direction === 'right' ? 1 : -1);
                    state.velocity += (cruise - state.velocity) * (1 - Math.exp(-dt / 0.4));
                    state.angle += state.velocity * dt;
                } else if (Math.abs(state.velocity) > 0.1) {
                    const wasMoving = Math.abs(state.velocity) > 12;
                    state.velocity *= Math.exp(-dt / (0.18 + settings.momentum * 1.5));
                    state.angle += state.velocity * dt;
                    if (Math.abs(state.velocity) < 0.5) {
                        state.velocity = 0;
                        if (wasMoving && settings.snap && !state.hover && nowMs >= state.holdUntil) {
                            state.target = Math.round(state.angle / settings.step) * settings.step;
                        }
                    }
                }
            }

            render();
            const moving = state.target !== null || Math.abs(state.velocity) > 0.1;
            const drifting = settings.autoplay === 'drift' && !reducedMotion && !(settings.pauseOnHover && state.hover);
            if (moving || drifting) frame = requestAnimationFrame(tick);
            else last = 0;
        };

        const wake = () => {
            if (!frame) frame = requestAnimationFrame(tick);
        };
        wakeRef.current = wake;
        root.setAttribute('data-ready', '');
        render();
        wake();

        return () => {
            cancelAnimationFrame(frame);
            motionPreference.removeEventListener('change', updateMotionPreference);
        };
    }, [count]);

    const focusIndex = (index: number) => {
        const state = physicsRef.current;
        const settings = settingsRef.current;
        let target = -index * settings.step;
        target += 360 * Math.round((state.angle - target) / 360);
        state.target = target;
        state.velocity = 0;
        state.holdUntil = performance.now() + 1800;
        wakeRef.current();
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        const state = physicsRef.current;
        state.suppressClick = false;
        state.press = {
            x: event.clientX,
            angle: state.angle,
            samples: [{ time: performance.now(), angle: state.angle }]
        };
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const state = physicsRef.current;
        const press = state.press;
        if (!press) return;
        const delta = event.clientX - press.x;
        if (!state.dragging && Math.abs(delta) < DRAG_THRESHOLD) return;
        if (!state.dragging) {
            state.dragging = true;
            state.target = null;
            state.velocity = 0;
            setDragging(true);
        }
        const degreesPerPixel = 180 / (Math.PI * settingsRef.current.radius);
        state.angle = press.angle + delta * degreesPerPixel;
        const time = performance.now();
        press.samples.push({ time, angle: state.angle });
        while (press.samples.length > 2 && time - press.samples[0].time > 110) press.samples.shift();
        wakeRef.current();
    };

    const releasePointer = () => {
        const state = physicsRef.current;
        const press = state.press;
        if (!press) return;
        state.press = null;
        if (!state.dragging) return;
        state.dragging = false;
        state.suppressClick = true;
        setDragging(false);
        const first = press.samples[0];
        const last = press.samples[press.samples.length - 1];
        const span = (last.time - first.time) / 1000;
        state.velocity = span > 0.008 ? clamp((last.angle - first.angle) / span, -1400, 1400) : 0;
        const settings = settingsRef.current;
        if (settings.snap) {
            const coast = state.angle + state.velocity * (0.18 + settings.momentum * 1.5) * 0.55;
            state.target = Math.round(coast / settings.step) * settings.step;
        }
        state.holdUntil = performance.now() + 1200;
        wakeRef.current();
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const state = physicsRef.current;
        if (state.suppressClick) {
            state.suppressClick = false;
            return;
        }
        const card = (event.target as HTMLElement).closest<HTMLElement>('[data-carousel-index]');
        if (!card) return;
        const index = Number(card.dataset.carouselIndex);
        if (focusOnClick) focusIndex(index);
        onItemClick?.(items[index]);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') focusIndex((active + 1) % count);
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') focusIndex((active - 1 + count) % count);
        else if (event.key === 'Home') focusIndex(0);
        else if (event.key === 'End') focusIndex(count - 1);
        else return;
        event.preventDefault();
    };

    return (
        <div
            ref={rootRef}
            className={`${styles.carousel} ${dragging ? styles.dragging : ''}`}
            role="region"
            aria-roledescription="carousel"
            aria-label="Interests photo carousel"
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={releasePointer}
            onPointerCancel={releasePointer}
            onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') {
                    physicsRef.current.hover = true;
                    wakeRef.current();
                }
            }}
            onPointerLeave={(event) => {
                if (event.pointerType === 'mouse') {
                    physicsRef.current.hover = false;
                    wakeRef.current();
                }
            }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <div className={styles.stage} style={{ perspective }}>
                <div className={styles.camera} style={{ transform: `rotateX(${tilt}deg)` }}>
                    <div ref={ringRef} className={styles.ring}>
                        {items.map((item, index) => {
                            const imagePath = getImagePath(item.src);
                            return (
                                <button
                                    key={item.title}
                                    ref={(element) => {
                                        cardRefs.current[index] = element;
                                    }}
                                    type="button"
                                    className={styles.card}
                                    style={{
                                        width: cardWidth,
                                        height: cardHeight,
                                        transform: `translate(-50%, -50%) rotateY(${index * step}deg) translateZ(${radius}px)`,
                                        borderRadius: cornerRadius
                                    }}
                                    data-carousel-index={index}
                                    aria-label={`View ${item.title}, ${index + 1} of ${count}`}
                                >
                                    {tiles.map((tile) => (
                                        <span
                                            key={`back-${tile.index}`}
                                            className={`${styles.tile} ${styles.backTile}`}
                                            aria-hidden="true"
                                            style={{
                                                left: (cardWidth - tile.width) / 2,
                                                top: 0,
                                                width: tile.width,
                                                height: cardHeight,
                                                transform: `translate3d(${tile.shift}px, 0, ${tile.depth}px) rotateY(${tile.turn}deg) rotateY(180deg)`,
                                                backgroundImage: `url("${imagePath}")`,
                                                backgroundSize: `${cardWidth}px ${cardHeight}px`,
                                                backgroundPosition: `${-(cardWidth - tile.end)}px 0`
                                            }}
                                        />
                                    ))}
                                    {tiles.map((tile) => (
                                        <span
                                            key={tile.index}
                                            className={styles.tile}
                                            aria-hidden="true"
                                            style={{
                                                left: (cardWidth - tile.width) / 2,
                                                top: 0,
                                                width: tile.width,
                                                height: cardHeight,
                                                transform: `translate3d(${tile.shift}px, 0, ${tile.depth}px) rotateY(${tile.turn}deg)`,
                                                backgroundImage: `url("${imagePath}")`,
                                                backgroundSize: `${cardWidth}px ${cardHeight}px`,
                                                backgroundPosition: `${-tile.start}px 0`
                                            }}
                                        />
                                    ))}
                                    <span className={styles.overlay} aria-hidden="true">
                                        <span className={styles.title}>{item.title}</span>
                                        <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <span className={styles.live} aria-live="polite" aria-atomic="true">
                {`${items[active]?.title ?? ''}, ${active + 1} of ${count}`}
            </span>
        </div>
    );
}
