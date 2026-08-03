'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
    mediaType?: 'video' | 'image';
    mediaSrc: string;
    posterSrc?: string;
    bgImageSrc: string;
    title?: string;
    date?: string;
    scrollToExpand?: string;
    textBlend?: boolean;
    children?: ReactNode;
}

// How much extra scroll distance (beyond one viewport) the expand animation
// consumes while the media is pinned. Larger = slower/more gradual expand.
const TRACK_HEIGHT_VH = 220;

const ScrollExpandMedia = ({
    mediaType = 'video',
    mediaSrc,
    posterSrc,
    bgImageSrc,
    title,
    date,
    scrollToExpand,
    textBlend,
    children,
}: ScrollExpandMediaProps) => {
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const [showContent, setShowContent] = useState<boolean>(false);
    const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
    const [isMobileState, setIsMobileState] = useState<boolean>(false);
    const [prevMediaType, setPrevMediaType] = useState(mediaType);

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const isInitialMount = useRef<boolean>(true);

    // Reset when switching media type. Done during render (rather than in an
    // effect) so the reset is applied before paint instead of triggering an
    // extra commit; see https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes.
    if (mediaType !== prevMediaType) {
        setPrevMediaType(mediaType);
        setScrollProgress(0);
        setShowContent(false);
        setMediaFullyExpanded(false);
    }

    // Snap back to the start of this section's scroll track wherever it
    // happens to sit on the page. Skip the scroll-into-view on first mount so
    // the page opens at the top instead of jumping straight to this section.
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        trackRef.current?.scrollIntoView({ block: 'start' });
    }, [mediaType]);

    // Derive expand progress purely from how far we've scrolled through the
    // track. Before the track reaches the top of the viewport, progress is 0
    // (untouched, page scrolls normally). Once its top is at/above the
    // viewport top, progress ramps 0->1 over the track's extra height, then
    // clamps at 1 once fully scrolled past (page scroll continues normally
    // beneath the now-unstuck media). Scrolling back up reverses this for
    // free since it's just a function of scroll position.
    useEffect(() => {
        const handleScroll = () => {
            const track = trackRef.current;
            if (!track) return;

            const scrollableDistance = track.offsetHeight - window.innerHeight;
            if (scrollableDistance <= 0) {
                setScrollProgress(1);
                setMediaFullyExpanded(true);
                setShowContent(true);
                return;
            }

            const rect = track.getBoundingClientRect();
            const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);

            setScrollProgress(progress);
            setMediaFullyExpanded(progress >= 1);
            setShowContent(progress >= 0.75);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // iOS Safari's autoplay check looks for the `muted` HTML attribute at
    // play-time; React only sets it as a JS property, which can lose the
    // race against Safari's check. Calling play() explicitly once mounted
    // is the reliable cross-browser fallback for the `autoPlay` attribute.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.play().catch(() => {
            // Autoplay blocked; this video is decorative background footage
            // with no controls, so there's nothing further to do.
        });
    }, [mediaSrc]);

    useEffect(() => {
        const checkIfMobile = (): void => {
            setIsMobileState(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
    const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
    const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

    const firstWord = title ? title.split(' ')[0] : '';
    const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

    return (
        <div
            ref={sectionRef}
            className='relative transition-colors duration-700 ease-in-out'
        >
            <div ref={trackRef} className='relative' style={{ height: `${TRACK_HEIGHT_VH}dvh` }}>
                <div className='sticky top-0 h-dvh w-screen overflow-hidden flex flex-col items-center justify-start'>
                    <motion.div
                        className='absolute inset-0 z-0 h-full'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 - scrollProgress }}
                        transition={{ duration: 0.1 }}
                    >
                        <Image
                            src={bgImageSrc}
                            alt='Background'
                            width={1920}
                            height={1080}
                            className='w-screen h-screen'
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                            priority
                        />
                        <div className='absolute inset-0 bg-black/10' />
                    </motion.div>

                    <div className='container mx-auto flex flex-col items-center justify-center h-full relative z-10'>
                        <div className='flex flex-col items-center justify-center w-full h-full relative'>
                            <div
                                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl'
                                style={{
                                    width: `${mediaWidth}px`,
                                    height: `${mediaHeight}px`,
                                    maxWidth: '95vw',
                                    maxHeight: '85vh',
                                    boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                {mediaType === 'video' ? (
                                    mediaSrc.includes('youtube.com') ? (
                                        <div className='relative w-full h-full pointer-events-none'>
                                            <iframe
                                                width='100%'
                                                height='100%'
                                                src={
                                                    mediaSrc.includes('embed')
                                                        ? mediaSrc +
                                                        (mediaSrc.includes('?') ? '&' : '?') +
                                                        'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                                                        : mediaSrc.replace('watch?v=', 'embed/') +
                                                        '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                                                        mediaSrc.split('v=')[1]
                                                }
                                                className='w-full h-full rounded-xl'
                                                frameBorder='0'
                                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                allowFullScreen
                                            />
                                            <div
                                                className='absolute inset-0 z-10'
                                                style={{ pointerEvents: 'none' }}
                                            ></div>

                                            <motion.div
                                                className='absolute inset-0 bg-black/30 rounded-xl'
                                                initial={{ opacity: 0.7 }}
                                                animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </div>
                                    ) : (
                                        <div className='relative w-full h-full pointer-events-none'>
                                            <video
                                                ref={videoRef}
                                                src={mediaSrc}
                                                poster={posterSrc}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload='auto'
                                                className='w-full h-full object-cover rounded-xl'
                                                controls={false}
                                                disablePictureInPicture
                                                disableRemotePlayback
                                            />
                                            <div
                                                className='absolute inset-0 z-10'
                                                style={{ pointerEvents: 'none' }}
                                            ></div>

                                            <motion.div
                                                className='absolute inset-0 bg-black/30 rounded-xl'
                                                initial={{ opacity: 0.7 }}
                                                animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </div>
                                    )
                                ) : (
                                    <div className='relative w-full h-full'>
                                        <Image
                                            src={mediaSrc}
                                            alt={title || 'Media content'}
                                            width={1280}
                                            height={720}
                                            className='w-full h-full object-cover rounded-xl'
                                        />

                                        <motion.div
                                            className='absolute inset-0 bg-black/50 rounded-xl'
                                            initial={{ opacity: 0.7 }}
                                            animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    </div>
                                )}

                                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                                    {date && (
                                        <p
                                            className='text-2xl text-blue-200'
                                            style={{ transform: `translateX(-${textTranslateX}vw)` }}
                                        >
                                            {date}
                                        </p>
                                    )}
                                    {scrollToExpand && (
                                        <p
                                            className='text-blue-200 font-medium text-center'
                                            style={{ transform: `translateX(${textTranslateX}vw)` }}
                                        >
                                            {scrollToExpand}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div
                                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                                    }`}
                            >
                                <motion.h2
                                    className='text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200 transition-none'
                                    style={{ transform: `translateX(-${textTranslateX}vw)` }}
                                >
                                    {firstWord}
                                </motion.h2>
                                <motion.h2
                                    className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-blue-200 transition-none'
                                    style={{ transform: `translateX(${textTranslateX}vw)` }}
                                >
                                    {restOfTitle}
                                </motion.h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <motion.section
                className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.7 }}
            >
                {children}
            </motion.section>
        </div>
    );
};

export default ScrollExpandMedia;
