'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// A social link backed by an icon asset (e.g. an SVG path under /public), as
// stored in lib/constants/metadata.ts.
export interface SocialLink {
    name?: string;
    icon: string;
    href: string;
}

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
    logoText?: string;
    mainText: string;
    readMoreLink?: string;
    imageSrc: string;
    imageAlt: string;
    overlayText: {
        part1: string;
        part2: string;
    };
    socialLinks?: SocialLink[];
    locationText: string;
    className?: string;
    imageBackgroundClassName?: string;
    contact?: {
        contactUrl: string,
        contactButtonText: string
    }
}

// Helper component for social media icons
const SocialIcon = ({ href, icon, name }: SocialLink) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
        <Image src={icon} alt={name ?? ''} width={24} height={24} className="h-6 w-6" />
    </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
    logoText,
    mainText,
    readMoreLink,
    imageSrc,
    imageAlt,
    overlayText,
    socialLinks,
    locationText,
    className,
    imageBackgroundClassName,
    contact
}: MinimalistHeroProps) => {
    return (
        <div
            className={cn(
                'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8 font-sans md:p-12',
                className
            )}
        >
            {/* Header */}
            <header className="z-30 flex w-full max-w-7xl items-center justify-between">
                {
                    logoText && <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl font-bold tracking-wider"
                    >
                        {logoText}
                    </motion.div>
                }
            </header>

            {/* Main Content Area */}
            <div className="relative grid w-full max-w-7xl grow grid-cols-1 items-center md:grid-cols-3">
                {/* Left Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="z-20 order-2 md:order-1 text-center md:text-left space-y-2"
                >
                    <p className="mx-auto max-w-xs text-sm leading-relaxed font-semibold lg:font-normal text-foreground/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)] md:mx-0">{mainText}</p>
                    {
                        readMoreLink && <a href={readMoreLink} className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font">
                            Read More
                        </a>
                    }
                    {
                        contact && <button className="group relative px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-semibold lg:font-normal overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border text-xs"
                            onClick={() => {
                                window.open(contact.contactUrl, "_blank")
                            }}
                        >
                            <span className="relative z-10">{contact.contactButtonText}</span>
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-foreground/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                        </button>
                    }

                </motion.div>

                {/* Center Image with Circle */}
                <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className={cn(
                            'absolute z-0 h-75 w-75 rounded-full md:h-100 md:w-100 lg:h-125 lg:w-125',
                            imageBackgroundClassName
                        )}
                    ></motion.div>
                    {
                        imageSrc && <motion.img
                            src={imageSrc}
                            alt={imageAlt}
                            className="relative z-10 h-auto w-72 object-cover drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)] md:w-80 scale-150 lg:w-74"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
                            }}
                        />
                    }
                </div>

                {/* Right Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
                >
                    <h1 className="text-7xl font-extrabold text-left text-foreground drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] md:text-8xl lg:text-8xl">
                        {overlayText.part1}
                        <br />
                        {overlayText.part2}
                    </h1>
                </motion.div>
            </div>

            {/* Footer Elements */}
            <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
                {
                    socialLinks && <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="flex items-center space-x-4"
                    >
                        {socialLinks.map((link, index) => (
                            <SocialIcon key={index} {...link} />
                        ))}
                    </motion.div>
                }

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className="text-sm font-medium text-foreground/80 ml-4"
                >
                    {locationText}
                </motion.div>
            </footer>
        </div>
    );
};
