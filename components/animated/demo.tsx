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
        src: 'https://www.dropbox.com/scl/fi/5d9bqrfd55oznzgthqdxp/videoplayback.mp4?rlkey=zl1hnn28hqauzloih7ph1kpqp&st=d50eauo5&raw=1',
        poster:
            'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg',
        background:
            'https://ucc89de135e61c466538964444d4.dl.dropboxusercontent.com/cd/0/inline/DE8sjBmJ_VPdFO2HiwCj2GQpIy3BxKAvSd4GfRU7t358avKoyjJFbQQbpkejygSg_P0EYr3CTfWVXddJ5xthWhkWv1gujAOtxUQpI2oUqx4pRAhZZKNKjszkiATAo-6o7tDrkyOvNBXprh6vL8Z9IK9q/file#',
        title: "Julia and Jacob's journey",
        // date: 'Anjali and Arjun',
        scrollToExpand: 'Scroll to Expand Demo',
        about: {
            title: "Julia and Jacob's Journey",
            overview:
                'Jacob and Julia recently began a beautiful new chapter of their lives as husband and wife. Their marriage is a celebration of love, trust, and the promise of a shared future. Together, they inspire those around them with their kindness, laughter, and unwavering support for one another. As they embark on this exciting journey, may every day bring them happiness, strength, and cherished memories.',
            conclusion:
                'May their home always be filled with love, peace, and endless joy. Wishing Jacob and Julia a lifetime of togetherness, adventure, and countless blessings as they build a wonderful life side by side.',
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
            <h2 className='text-3xl font-bold mb-6 text-black dark:text-white'>
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
