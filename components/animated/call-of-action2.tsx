"use client";

import { cal_dot_com_url } from "@/lib/constants/metadata";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef } from "react";

interface VerticalMarqueeProps {
    children: ReactNode;
    pauseOnHover?: boolean;
    reverse?: boolean;
    className?: string;
    speed?: number;
    onItemsRef?: (items: HTMLElement[]) => void;
}

function VerticalMarquee({
    children,
    pauseOnHover = false,
    reverse = false,
    className,
    speed = 30,
    onItemsRef,
}: VerticalMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (onItemsRef && containerRef.current) {
            const items = Array.from(containerRef.current.querySelectorAll('.marquee-item')) as HTMLElement[];
            onItemsRef(items);
        }
    }, [onItemsRef]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "group flex flex-col overflow-hidden",
                className
            )}
            style={
                {
                    "--duration": `${speed}s`,
                } as React.CSSProperties
            }
        >
            <div
                className={cn(
                    "flex shrink-0 flex-col animate-marquee-vertical",
                    reverse && "[animation-direction:reverse]",
                    pauseOnHover && "group-hover:[animation-play-state:paused]"
                )}
            >
                {children}
            </div>
            <div
                className={cn(
                    "flex shrink-0 flex-col animate-marquee-vertical",
                    reverse && "[animation-direction:reverse]",
                    pauseOnHover && "group-hover:[animation-play-state:paused]"
                )}
                aria-hidden="true"
            >
                {children}
            </div>
        </div>
    );
}

const marqueeItems = [
    "Portraits",
    "Candid",
    "Wedding",
    "Birthdays",
    "Professional",
    "Corporate Events",
    "Traditional",
    "Intimate"
];

export default function CTAWithVerticalMarquee() {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marqueeContainer = marqueeRef.current;
        if (!marqueeContainer) return;

        const updateOpacity = () => {
            const items = marqueeContainer.querySelectorAll('.marquee-item');
            const containerRect = marqueeContainer.getBoundingClientRect();
            const centerY = containerRect.top + containerRect.height / 2;

            items.forEach((item) => {
                const itemRect = item.getBoundingClientRect();
                const itemCenterY = itemRect.top + itemRect.height / 2;
                const distance = Math.abs(centerY - itemCenterY);
                const maxDistance = containerRect.height / 2;
                const normalizedDistance = Math.min(distance / maxDistance, 1);
                const opacity = 1 - normalizedDistance * 0.75;
                (item as HTMLElement).style.opacity = opacity.toString();
            });
        };

        const animationFrame = () => {
            updateOpacity();
            requestAnimationFrame(animationFrame);
        };

        const frame = requestAnimationFrame(animationFrame);

        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <div className="min-h-screen text-foreground flex items-center justify-center px-6 py-12 overflow-hidden">
            <div className="w-full max-w-7xl animate-fade-in-up">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Marquee */}
                    <div ref={marqueeRef} className="relative h-150 lg:h-175 flex items-center justify-center animate-fade-in-up [animation-delay:400ms]">
                        <div
                            className="relative w-full h-full mask-[linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
                        >
                            <VerticalMarquee speed={10} className="h-full">
                                {marqueeItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight py-8 marquee-item text-right"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </VerticalMarquee>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="space-y-6 max-w-xl">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight text-foreground animate-fade-in-up [animation-delay:200ms]">
                            Impressed by our work?
                        </h1>
                        <div className="flex flex-wrap gap-4 animate-fade-in-up [animation-delay:600ms]">
                            <button className="text-sm font-light md:text-md group relative px-6 py-3 bg-foreground text-background rounded-md font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                <span className="relative z-10">Check out the Services</span>
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                            </button>
                            <button className="text-sm font-light md:text-md group relative px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border"
                                onClick={() => {
                                    window.open(cal_dot_com_url, "_blank")
                                }}
                            >
                                <span className="relative z-10">Book a 15 minute call</span>
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-foreground/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                            </button>
                        </div>
                        <p className="text-sm font-light md:text-md text-muted-foreground animate-fade-in-up [animation-delay:400ms]">
                            Freeze the beautiful moments of your precious life and preserve it in the most surreal way possible
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
