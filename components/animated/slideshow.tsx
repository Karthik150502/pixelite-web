"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Maximize, Minimize, Pause, Play, ChevronLeft, ChevronRight, Info, X } from 'lucide-react';

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
const IMAGE_STAY_DURATION = 8000;

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
    const [isPlaying, setIsPlaying] = useState(true);
    const [infoOpen, setInfoOpen] = useState(false);
    const [prevIndexForInfo, setPrevIndexForInfo] = useState(0);
    const [controlsVisible, setControlsVisible] = useState(true);
    const [counterHovered, setCounterHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [inView, setInView] = useState(false);

    const x = useMotionValue(0);

    // Close the details drawer whenever the visible slide changes. Done
    // during render (rather than in an effect) so the reset is applied
    // before paint instead of triggering an extra commit.
    if (index !== prevIndexForInfo) {
        setPrevIndexForInfo(index);
        setInfoOpen(false);
    }

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Only show the play/pause + fullscreen controls while the slideshow
    // section is actually in view.
    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Controls are only ever auto-hidden while in fullscreen; outside of it they're always shown.
    const effectiveControlsVisible = isFullscreen ? controlsVisible : true;

    // Only actually show the play/pause + fullscreen buttons once the
    // section has scrolled into view (fullscreen always counts, since the
    // section fills the viewport at that point).
    const playbackControlsVisible = effectiveControlsVisible && (inView || isFullscreen);

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

    // Auto-advance the slideshow every 8s while playing; pauses itself while the
    // user is mid-drag so it doesn't fight a manual swipe.
    useEffect(() => {
        if (!isPlaying || isDragging) return;

        const intervalId = setInterval(() => {
            setIndex((i) => (i + 1) % items.length);
        }, IMAGE_STAY_DURATION);

        return () => clearInterval(intervalId);
    }, [isPlaying, isDragging]);

    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            rootRef.current?.requestFullscreen();
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

    // The carousel's x offset is computed from the container's pixel width,
    // which changes whenever fullscreen is toggled (or the window resizes).
    // Re-snap instantly (no spring) whenever that happens, or the slides end
    // up stopped partway between two images.
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new ResizeObserver(() => {
            if (isDragging) return;
            const containerWidth = el.offsetWidth || 1;
            x.set(-index * containerWidth);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, [index, x, isDragging]);

    return (
        <div
            className={`relative w-full h-full overflow-hidden ${isFullscreen ? '' : 'rounded-2xl'}`}
            ref={rootRef}
        >
            {/* Main Carousel */}
            <div className='absolute inset-0 overflow-hidden' ref={containerRef}>
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
                    {items.map((item, i) => (
                        <div key={item.id} className='relative shrink-0 w-full h-full overflow-hidden'>
                            {
                                isFullscreen && <Image
                                    src={item.url}
                                    alt=''
                                    aria-hidden='true'
                                    fill
                                    sizes='100vw'
                                    loading={i === 0 ? 'eager' : 'lazy'}
                                    className='object-cover scale-110 blur-2xl select-none pointer-events-none'
                                    draggable={false}
                                />
                            }
                            <Image
                                src={item.url}
                                alt={item.title}
                                fill
                                sizes='100vw'
                                loading={i === 0 ? 'eager' : 'lazy'}
                                fetchPriority={i === 0 ? 'high' : 'auto'}
                                className='relative object-contain select-none pointer-events-none'
                                draggable={false}
                            />
                        </div>
                    ))}
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
                        onClick={() => {
                            if (isPlaying) {
                                setIsPlaying(false)
                            }
                            setIndex((i) => Math.max(0, i - 1))
                        }}
                        className={`text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform
                  ${index === 0
                                ? 'opacity-40 cursor-not-allowed'
                                : 'bg-white hover:scale-110 hover:opacity-100 opacity-70'
                            }`}
                    >
                        <ChevronLeft size={15} />
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
                        onClick={() => {
                            if (isPlaying) {
                                setIsPlaying(false)
                            }
                            setIndex((i) => Math.min(items.length - 1, i + 1))
                        }}
                        className={`text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform
                  ${index === items.length - 1
                                ? 'opacity-40 cursor-not-allowed'
                                : 'bg-white hover:scale-110 hover:opacity-100 opacity-70'
                            }`}
                    >
                        <ChevronRight size={15} />
                    </button>
                </motion.div>

                {/* Image Counter */}
                <motion.div
                    className='absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 text-white px-3 py-1 rounded-full text-xs'
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

            {/* Image Details Drawer */}
            <AnimatePresence>
                {infoOpen && (
                    <motion.div
                        key={items[index].id}
                        className='absolute inset-x-0 bottom-0 z-30 rounded-t-2xl border-t border-white/10 bg-black/40 backdrop-blur-2xl px-6 pt-6 pb-20 md:pb-8'
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                    >
                        <button
                            onClick={() => setInfoOpen(false)}
                            aria-label='Close details'
                            className='absolute right-4 top-4 text-white/70 transition-colors hover:text-white'
                        >
                            <X size={18} />
                        </button>
                        <p className='pr-8 uppercase text-white font-semibold tracking-wide text-lg sm:text-xl'>
                            {items[index].title}
                        </p>
                        <p className='mt-2 text-sm sm:text-base text-white/80 whitespace-pre-line'>
                            {items[index].subTitle}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Play/Pause + Fullscreen Toggle */}
            <motion.div
                className='absolute right-4 bottom-4 z-40 flex items-center gap-2'
                style={{ pointerEvents: playbackControlsVisible ? 'auto' : 'none' }}
                animate={{ opacity: playbackControlsVisible ? 1 : 0, y: playbackControlsVisible ? 0 : 20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
                <button
                    onClick={() => {
                        if (isPlaying) {
                            setIsPlaying(false);
                        }
                        setInfoOpen((o) => !o);
                    }}
                    aria-label={infoOpen ? 'Hide image details' : 'Show image details'}
                    aria-pressed={infoOpen}
                    className={`text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform bg-white hover:scale-110 hover:opacity-100 ${infoOpen ? 'opacity-100' : 'opacity-50'
                        }`}
                >
                    <Info size={15} />
                </button>
                <button
                    onClick={() => setIsPlaying((p) => !p)}
                    aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                    className='text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform bg-white hover:scale-110 hover:opacity-100 opacity-50'
                >
                    {isPlaying ? (
                        <Pause fill="black" size={15} />
                    ) : (
                        <Play fill="black" size={15} />
                    )}
                </button>
                <button
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    className='hidden md:flex text-black w-8 h-8 rounded-full items-center justify-center shadow-lg transition-transform bg-white hover:scale-110 hover:opacity-100 opacity-50'
                >
                    {isFullscreen ? (
                        <Minimize size={15} />
                    ) : (
                        <Maximize size={15} />
                    )}
                </button>
            </motion.div>
        </div>
    );
}