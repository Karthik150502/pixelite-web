"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import Image from 'next/image';
import { Maximize2, Minimize2 } from 'lucide-react';

const items = [
    {
        id: 1,
        url: 'https://plus.unsplash.com/premium_photo-1712685912272-96569030d1d7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1175',
        title: 'A large body of water surrounded by mountains',
        subTitle: 'Still waters cut between towering peaks,\nreflecting the calm of early morning light.',
    },
    {
        id: 2,
        url: 'https://plus.unsplash.com/premium_photo-1761478617343-12a3dd981cf6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1175',
        title: 'Abstract streaks of pink and blue on black',
        subTitle: 'Color in motion, a quiet study of light\nbending against the dark.',
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=880&h=600&fit=crop',
        title: 'Mountain Summit',
        subTitle: 'Bare rock meets open sky at the highest point\nof the range.',
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=880&h=600&fit=crop',
        title: 'Alpine Landscape',
        subTitle: 'Layered ridgelines fade into the distance\nunder a wide, open sky.',
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=880&h=600&fit=crop',
        title: 'Mountain Range',
        subTitle: 'A chain of summits stretches across the horizon,\nunbroken and vast.',
    },
    {
        id: 6,
        url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=880&h=600&fit=crop',
        title: 'Mountain Wilderness',
        subTitle: 'Untouched terrain where the trail disappears\ninto rock and cloud.',
    },
    {
        id: 7,
        url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=880&h=600&fit=crop',
        title: 'Mountain Trail',
        subTitle: 'A narrow path winding upward,\ncut into the side of the mountain.',
    },
    {
        id: 8,
        url: 'https://plus.unsplash.com/premium_photo-1761940415449-c09ef466c698?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=715',
        title: 'A lone figure stands on a futuristic, reflective surface.',
        subTitle: 'A single silhouette against endless reflection,\nsomewhere between real and imagined.',
    },
    {
        id: 9,
        url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=880&h=600&fit=crop',
        title: 'Rocky Cliffs',
        subTitle: 'Weathered stone drops sharply toward the water\nbelow.',
    },
    {
        id: 10,
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=880&h=600&fit=crop',
        title: 'Forest Path',
        subTitle: 'Dappled light filters through the canopy\nonto a quiet trail below.',
    },
    {
        id: 11,
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=880&h=600&fit=crop',
        title: 'Green Hills',
        subTitle: 'Rolling slopes of green stretch out\nunder a soft, open sky.',
    },
    {
        id: 12,
        url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=880&h=600&fit=crop',
        title: 'Sunrise Peak',
        subTitle: 'First light breaks over the summit,\nwarming the ridge in gold.',
    },
];

const FULL_WIDTH_PX = 120;
const COLLAPSED_WIDTH_PX = 35;
const GAP_PX = 2;
const MARGIN_PX = 2;

const CONTROLS_HIDE_DELAY_MS = 5000;

function Thumbnails({ index, setIndex, controlsVisible }: {
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    controlsVisible: boolean,
}) {
    const thumbnailsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (thumbnailsRef.current) {
            let scrollPosition = 0;
            for (let i = 0; i < index; i++) {
                scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX;
            }

            scrollPosition += MARGIN_PX;

            const containerWidth = thumbnailsRef.current.offsetWidth;
            const centerOffset = containerWidth / 2 - FULL_WIDTH_PX / 2;
            scrollPosition -= centerOffset;

            thumbnailsRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth',
            });
        }
    }, [index]);

    return (
        <motion.div
            ref={thumbnailsRef}
            className='overflow-x-auto pb-4 px-4'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', pointerEvents: controlsVisible ? 'auto' : 'none' }}
            animate={{ opacity: controlsVisible ? 1 : 0, y: controlsVisible ? 0 : 40 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            <style>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
            <div className='flex gap-0.5 h-20 pb-2' style={{ width: 'fit-content' }}>
                {items.map((item, i) => (
                    <motion.button
                        key={item.id}
                        onClick={() => setIndex(i)}
                        initial={false}
                        animate={i === index ? 'active' : 'inactive'}
                        variants={{
                            active: {
                                width: FULL_WIDTH_PX,
                                marginLeft: MARGIN_PX,
                                marginRight: MARGIN_PX,
                            },
                            inactive: {
                                width: COLLAPSED_WIDTH_PX,
                                marginLeft: 0,
                                marginRight: 0,
                            },
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className='relative shrink-0 h-full overflow-hidden rounded'
                    >
                        <Image
                            src={item.url}
                            alt={item.title}
                            fill
                            sizes='120px'
                            className='object-cover pointer-events-none select-none'
                            draggable={false}
                        />
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}

export default function SlideShow() {
    const [index, setIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(true);
    const [counterHovered, setCounterHovered] = useState(false);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [naturalSizes, setNaturalSizes] = useState<Record<number, { width: number, height: number }>>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const x = useMotionValue(0);

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Track the carousel's box so we can work out exactly where each
    // object-contain image is actually rendered (it's letterboxed inside a full-size box).
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const updateSize = () => setContainerSize({ width: el.offsetWidth, height: el.offsetHeight });
        updateSize();

        const observer = new ResizeObserver(updateSize);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Given the container's box and an image's natural dimensions, work out the
    // rectangle the image is actually drawn into (object-contain letterboxes it).
    const getImageRect = (itemId: number) => {
        const natural = naturalSizes[itemId];
        if (!natural || !containerSize.width || !containerSize.height) return null;

        const scale = Math.min(containerSize.width / natural.width, containerSize.height / natural.height);
        const renderedWidth = natural.width * scale;
        const renderedHeight = natural.height * scale;

        return {
            left: (containerSize.width - renderedWidth) / 2,
            width: renderedWidth,
            bottom: (containerSize.height - renderedHeight) / 2,
        };
    };

    // Controls are only ever auto-hidden while in fullscreen; outside of it they're always shown.
    const effectiveControlsVisible = isFullscreen ? controlsVisible : true;

    useEffect(() => {
        if (!isFullscreen) {
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            return;
        }

        const armHideTimer = () => {
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            hideTimerRef.current = setTimeout(() => setControlsVisible(false), CONTROLS_HIDE_DELAY_MS);
        };

        const revealControls = () => {
            setControlsVisible(true);
            armHideTimer();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                setIndex((i) => Math.max(0, i - 1));
                revealControls();
            } else if (e.key === 'ArrowRight') {
                setIndex((i) => Math.min(items.length - 1, i + 1));
                revealControls();
            }
        };

        armHideTimer();
        window.addEventListener('mousemove', revealControls);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('mousemove', revealControls);
            window.removeEventListener('keydown', handleKeyDown);
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, [isFullscreen]);

    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    };

    useEffect(() => {
        if (!isDragging && containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth || 1;
            const targetX = -index * containerWidth;

            animate(x, targetX, {
                type: 'spring',
                stiffness: 300,
                damping: 30,
            });
        }
    }, [index, x, isDragging]);

    return (
        <div className='relative w-full h-screen'>
            {/* Main Carousel */}
            <div className='absolute inset-0 overflow-hidden bg-black' ref={containerRef}>
                <motion.div
                    className='flex h-full'
                    drag='x'
                    dragElastic={0.2}
                    dragMomentum={false}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={(e, info) => {
                        setIsDragging(false);
                        const containerWidth = containerRef.current?.offsetWidth || 1;
                        const offset = info.offset.x;
                        const velocity = info.velocity.x;

                        let newIndex = index;

                        // If fast swipe, use velocity
                        if (Math.abs(velocity) > 500) {
                            newIndex = velocity > 0 ? index - 1 : index + 1;
                        }
                        // Otherwise use offset threshold (30% of container width)
                        else if (Math.abs(offset) > containerWidth * 0.3) {
                            newIndex = offset > 0 ? index - 1 : index + 1;
                        }

                        // Clamp index
                        newIndex = Math.max(0, Math.min(items.length - 1, newIndex));
                        setIndex(newIndex);
                    }}
                    style={{ x }}
                >
                    {items.map((item, i) => {
                        const imageRect = getImageRect(item.id);

                        return (
                            <div key={item.id} className='relative shrink-0 w-full h-full overflow-hidden'>
                                <Image
                                    src={item.url}
                                    alt=''
                                    aria-hidden='true'
                                    fill
                                    sizes='100vw'
                                    loading={i === 0 ? 'eager' : 'lazy'}
                                    className='object-cover scale-110 blur-2xl select-none pointer-events-none'
                                    draggable={false}
                                />
                                <Image
                                    src={item.url}
                                    alt={item.title}
                                    fill
                                    sizes='100vw'
                                    loading={i === 0 ? 'eager' : 'lazy'}
                                    fetchPriority={i === 0 ? 'high' : 'auto'}
                                    className='relative object-contain select-none pointer-events-none'
                                    draggable={false}
                                    onLoad={(e) => {
                                        const img = e.currentTarget;
                                        setNaturalSizes((prev) => ({
                                            ...prev,
                                            [item.id]: { width: img.naturalWidth, height: img.naturalHeight },
                                        }));
                                    }}
                                />
                                {imageRect && (
                                    <motion.div
                                        className='absolute pt-16 pb-6 px-6 text-right'
                                        style={{
                                            left: imageRect.left,
                                            width: imageRect.width,
                                            textShadow: '2px 3px 6px rgba(0,0,0,0.85)',
                                        }}
                                        animate={{
                                            bottom: effectiveControlsVisible ? imageRect.bottom + 75 : imageRect.bottom + 8,
                                        }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    >
                                        <p className='uppercase text-white font-semibold tracking-wide text-xl sm:text-2xl'>
                                            {item.title}
                                        </p>
                                        <p className='lowercase text-white text-sm m:text-base whitespace-pre-line'>
                                            {item.subTitle}
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </motion.div>

                {/* Previous Button */}
                <motion.div
                    className='absolute left-4 top-1/2 -translate-y-1/2 z-10'
                    style={{ pointerEvents: effectiveControlsVisible ? 'auto' : 'none' }}
                    animate={{ opacity: effectiveControlsVisible ? 1 : 0, x: effectiveControlsVisible ? 0 : -20 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                    <button
                        disabled={index === 0}
                        onClick={() => setIndex((i) => Math.max(0, i - 1))}
                        className={`text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform
                  ${index === 0
                                ? 'opacity-40 cursor-not-allowed'
                                : 'bg-white hover:scale-110 hover:opacity-100 opacity-70'
                            }`}
                    >
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M15 19l-7-7 7-7'
                            />
                        </svg>
                    </button>
                </motion.div>

                {/* Next Button */}
                <motion.div
                    className='absolute right-4 top-1/2 -translate-y-1/2 z-10'
                    style={{ pointerEvents: effectiveControlsVisible ? 'auto' : 'none' }}
                    animate={{ opacity: effectiveControlsVisible ? 1 : 0, x: effectiveControlsVisible ? 0 : 20 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                    <button
                        disabled={index === items.length - 1}
                        onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
                        className={`text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform
                  ${index === items.length - 1
                                ? 'opacity-40 cursor-not-allowed'
                                : 'bg-white hover:scale-110 hover:opacity-100 opacity-70'
                            }`}
                    >
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M9 5l7 7-7 7'
                            />
                        </svg>
                    </button>
                </motion.div>

                {/* Image Counter */}
                <motion.div
                    className='absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 text-white px-3 py-1 rounded-full text-sm'
                    style={{ pointerEvents: effectiveControlsVisible ? 'auto' : 'none' }}
                    onMouseEnter={() => setCounterHovered(true)}
                    onMouseLeave={() => setCounterHovered(false)}
                    animate={{
                        opacity: effectiveControlsVisible ? (counterHovered ? 1 : 0.5) : 0,
                        y: effectiveControlsVisible ? 0 : 20,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                    {index + 1} / {items.length}
                </motion.div>
            </div>

            {/* Thumbnails */}
            <div className='absolute inset-x-0 bottom-0 z-20'>
                <Thumbnails index={index} setIndex={setIndex} controlsVisible={effectiveControlsVisible} />
            </div>

            {/* Fullscreen Toggle */}
            <motion.div
                className='fixed right-4 bottom-4 z-40 hidden md:block'
                style={{ pointerEvents: effectiveControlsVisible ? 'auto' : 'none' }}
                animate={{ opacity: effectiveControlsVisible ? 1 : 0, y: effectiveControlsVisible ? 0 : 20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
                <button
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    className='text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform bg-white hover:scale-110 hover:opacity-100 opacity-50'
                >
                    {isFullscreen ? (
                        <Minimize2 className='w-5 h-5' />
                    ) : (
                        <Maximize2 className='w-5 h-5' />
                    )}
                </button>
            </motion.div>
        </div>
    );
}