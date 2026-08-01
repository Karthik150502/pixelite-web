'use client';

import { useState, useEffect } from 'react';
import ScrollExpandMedia from './immersive_image';

interface MediaAbout {
    title: string
    overview: string;
    conclusion: string;
}

interface MediaContent {
    src: string;
    poster?: string;
    background: string;
    title: string;
    date?: string;
    scrollToExpand: string;
    about: MediaAbout;
}

interface MediaContentCollection {
    [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
    video: {
        src: 'https://dl.dropboxusercontent.com/scl/fi/5d9bqrfd55oznzgthqdxp/videoplayback.mp4?rlkey=zl1hnn28hqauzloih7ph1kpqp&st=d50eauo5&raw=1',
        poster:
            'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg',
        background:
            'https://dl.dropboxusercontent.com/scl/fi/58ib1gm0njzzlmpzacaxb/wp15155293.jpg?rlkey=urbw48p135mwl16taoi9h4oy2&st=mweusarg',
        title: "Julia and Jacob's journey",
        // date: 'Anjali and Arjun',
        scrollToExpand: 'Scroll to Expand Demo',
        about: {
            title: "Julia and Jacob's Journey",
            overview:
                "Every wedding tells a story, and Jacob and Julia's was one of quiet elegance and genuine joy. From the nervous excitement of getting ready to the first shared glance at the altar, we were there to capture every fleeting, unscripted moment. Our lens followed the soft morning light, the warmth between family and friends, and the little details that made this day uniquely theirs. It was an honor to document not just a wedding, but the beginning of a lifelong love story.",
            conclusion:
                "Through candid frames and timeless portraits, we hope to have preserved the emotion, laughter, and love that filled every corner of Jacob and Julia's celebration. May these photographs be a window back into this beautiful day, for them to revisit again and again in the years ahead.",
        },
    },
    image: {
        src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop',
        background:
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop',
        title: 'Dynamic Image Showcase',
        date: 'Underwater Adventure',
        scrollToExpand: 'Scroll to Expand Demo',
        about: {
            title: "",
            overview:
                'This is a demonstration of the ScrollExpandMedia component with an image. The same smooth expansion effect works beautifully with static images, allowing you to create engaging visual experiences without video content.',
            conclusion:
                'The ScrollExpandMedia component works equally well with images and videos. This flexibility allows you to choose the media type that best suits your content while maintaining the same engaging user experience.',
        },
    },
};

const MediaContent = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
    const currentMedia = sampleMediaContent[mediaType];

    return (
        <div className='max-w-4xl mx-auto'>
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mb-6 text-black dark:text-white'>
                {currentMedia.about.title}
            </h2>
            <p className='text-sm font-light mb-8 text-black dark:text-white'>
                {currentMedia.about.overview}
            </p>

            <p className='text-sm font-light mb-8 text-black dark:text-white'>
                {currentMedia.about.conclusion}
            </p>
        </div>
    );
};

export const VideoExpansionTextBlend = () => {
    const mediaType = 'video';
    const currentMedia = sampleMediaContent[mediaType];

    useEffect(() => {
        const resetEvent = new Event('resetSection');
        window.dispatchEvent(resetEvent);
    }, []);

    return (
        <div className='min-h-screen'>
            <ScrollExpandMedia

                mediaType={mediaType}
                mediaSrc={currentMedia.src}
                posterSrc={currentMedia.poster}
                bgImageSrc={currentMedia.background}
                title={currentMedia.title}
                date={currentMedia.date}
                scrollToExpand={currentMedia.scrollToExpand}
                textBlend
            >
                <MediaContent mediaType={mediaType} />
            </ScrollExpandMedia>
        </div>
    );
};

export const ImageExpansionTextBlend = () => {
    const mediaType = 'image';
    const currentMedia = sampleMediaContent[mediaType];

    useEffect(() => {
        const resetEvent = new Event('resetSection');
        window.dispatchEvent(resetEvent);
    }, []);

    return (
        <div className='min-h-screen'>
            <ScrollExpandMedia
                mediaType={mediaType}
                mediaSrc={currentMedia.src}
                bgImageSrc={currentMedia.background}
                title={currentMedia.title}
                date={currentMedia.date}
                scrollToExpand={currentMedia.scrollToExpand}
                textBlend
            >
                <MediaContent mediaType={mediaType} />
            </ScrollExpandMedia>
        </div>
    );
};

export const VideoExpansion = () => {
    const mediaType = 'video';
    const currentMedia = sampleMediaContent[mediaType];

    useEffect(() => {
        const resetEvent = new Event('resetSection');
        window.dispatchEvent(resetEvent);
    }, []);

    return (
        <div className='min-h-screen'>
            <ScrollExpandMedia
                mediaType={mediaType}
                mediaSrc={currentMedia.src}
                posterSrc={currentMedia.poster}
                bgImageSrc={currentMedia.background}
                title={currentMedia.title}
                date={currentMedia.date}
                scrollToExpand={currentMedia.scrollToExpand}
            >
                <MediaContent mediaType={mediaType} />
            </ScrollExpandMedia>
        </div>
    );
};

export const ImageExpansion = () => {
    const mediaType = 'image';
    const currentMedia = sampleMediaContent[mediaType];

    useEffect(() => {
        const resetEvent = new Event('resetSection');
        window.dispatchEvent(resetEvent);
    }, []);

    return (
        <div className='min-h-screen'>
            <ScrollExpandMedia
                mediaType={mediaType}
                mediaSrc={currentMedia.src}
                bgImageSrc={currentMedia.background}
                title={currentMedia.title}
                date={currentMedia.date}
                scrollToExpand={currentMedia.scrollToExpand}
            >
                <MediaContent mediaType={mediaType} />
            </ScrollExpandMedia>
        </div>
    );
};

const Demo = () => {
    const [mediaType, setMediaType] = useState('video');
    const currentMedia = sampleMediaContent[mediaType];

    useEffect(() => {
        const resetEvent = new Event('resetSection');
        window.dispatchEvent(resetEvent);
    }, [mediaType]);

    return (
        <div className='min-h-screen'>
            <ScrollExpandMedia
                mediaType={mediaType as 'video' | 'image'}
                mediaSrc={currentMedia.src}
                posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
                bgImageSrc={currentMedia.background}
                title={currentMedia.title}
                date={currentMedia.date}
                scrollToExpand={currentMedia.scrollToExpand}
            >
                <MediaContent mediaType={mediaType as 'video' | 'image'} />
            </ScrollExpandMedia>
        </div>
    );
};

export default Demo;
