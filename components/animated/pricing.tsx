"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { cal_dot_com_url } from "@/lib/constants/metadata";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type PricingPlan = {
    plan_bg_color: string;
    plan_name: string;
    plan_descp: string;
    plan_price: number;
    plan_feature: string[];
    popular?: boolean;
};

const pricingData: PricingPlan[] = [
    {
        plan_bg_color: "bg-blue-500/10",
        plan_name: "Portrait Session",
        plan_descp: "Individual, couple or family portraits, shot on location",
        plan_price: 6000,
        plan_feature: [
            "1-hour session",
            "1 location",
            "20 edited photos",
            "Online gallery",
            "48-hour turnaround",
        ],
    },
    {
        plan_bg_color: "bg-teal-400/15",
        plan_name: "Pre-Wedding",
        plan_descp: "A relaxed shoot to capture your story before the big day",
        plan_price: 15000,
        plan_feature: [
            "2-hour session",
            "2 locations",
            "40 edited photos",
            "Outfit change",
            "Online gallery",
            "5-day turnaround",
        ],
    },
    {
        plan_bg_color: "bg-violet-500/15",
        plan_name: "Wedding Essentials",
        plan_descp: "Full-day coverage for your wedding, beautifully told",
        plan_price: 45000,
        plan_feature: [
            "6-hour coverage",
            "1 photographer",
            "150 edited photos",
            "Online gallery",
            "2-week turnaround",
        ],
    },
    {
        plan_bg_color: "bg-fuchsia-500/15",
        plan_name: "Wedding Premium",
        plan_descp: "Complete coverage with a second shooter and a printed album",
        plan_price: 85000,
        plan_feature: [
            "Full-day coverage",
            "2 photographers",
            "400 edited photos",
            "Premium printed album",
            "Same-day preview",
            "10-day turnaround",
        ],
        popular: true,
    },
    {
        plan_bg_color: "bg-amber-400/15",
        plan_name: "Corporate & Events",
        plan_descp: "Branding shoots, corporate events and celebrations, covered end-to-end",
        plan_price: 18000,
        plan_feature: [
            "Half or full-day coverage",
            "Brand-ready edits",
            "Multiple shooters available",
            "Commercial usage rights",
            "Same-week delivery",
        ],
    },
];

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

// Cal.com prefills its booking form from query params — "notes" lands in the
// "Additional notes" field, so the host sees which plan the visitor picked
// without them having to retype it.
const buildBookingUrl = (plan: PricingPlan) => {
    const notes = `Interested in: ${plan.plan_name} (${formatPrice(plan.plan_price)} onwards)\n${plan.plan_descp}`;
    const params = new URLSearchParams({ notes });
    return `${cal_dot_com_url}?${params.toString()}`;
};

const Pricing = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Track scroll position so the arrow buttons can hide themselves once
    // there's nothing left to reveal on that side.
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const updateScrollState = () => {
            setCanScrollLeft(el.scrollLeft > 4);
            setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
        };

        updateScrollState();
        el.addEventListener("scroll", updateScrollState, { passive: true });
        window.addEventListener("resize", updateScrollState);
        return () => {
            el.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, []);

    const scrollByPage = (direction: 1 | -1) => {
        scrollRef.current?.scrollBy({ left: direction * scrollRef.current.clientWidth * 0.9, behavior: "smooth" });
    };

    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 80,
        },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeInOut",
            },
        }),
    };

    return (
        <section className="w-full lg:pt-20">
            <div className="mx-auto max-w-7xl px-4 sm:py-10 lg:px-8 lg:py-8 xl:px-16">
                <div className="flex flex-col items-center justify-center gap-4 duration-700 ease-in-out animate-in fade-in slide-in-from-top-8">
                    <div className="mx-auto max-w-3xs text-center sm:max-w-md">
                        <h2 className="text-xl font-bold tracking-tighter text-foreground sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                            Packages for every occasion
                        </h2>
                    </div>
                </div>
            </div>

            {/* Pricing Plans — full-bleed, edge-to-edge, horizontally scrollable so any number of plans stays legible */}
            <div className="relative mt-8 md:mt-12">
                <div
                    ref={scrollRef}
                    className="w-full overflow-x-auto pb-4 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
                >
                    <div className="flex justify-start snap-x snap-mandatory gap-6 px-4 scroll-pl-4">
                        {pricingData?.map((items: PricingPlan, index: number) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={index}
                                className="w-72 shrink-0 snap-start sm:w-80"
                            >
                                <Card
                                    className={cn(
                                        items.plan_bg_color,
                                        "relative h-full w-full rounded-2xl border border-white/10 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.2)] ring-0 backdrop-blur-xl",
                                        items.popular && "ring-1 ring-accent/50",
                                    )}
                                    key={index}
                                >
                                    <CardContent className="flex h-full flex-col items-start gap-6 self-stretch px-0">
                                        <div className="flex flex-col gap-3">
                                            <Badge variant="outline" className="h-7 w-fit px-3 py-1 text-sm font-normal leading-5">
                                                {items.plan_name}
                                            </Badge>
                                            <p className="text-sm font-normal text-muted-foreground">
                                                {items.plan_descp}
                                            </p>
                                            {items.popular && (
                                                <Badge variant="secondary" className="h-7 w-fit px-3 py-1 text-sm font-normal leading-5">
                                                    Most Popular
                                                </Badge>
                                            )}
                                        </div>

                                        <p className="flex items-end text-4xl font-semibold text-card-foreground">
                                            {formatPrice(items.plan_price)}
                                            <span className="text-sm font-normal text-muted-foreground">
                                                &nbsp;onwards
                                            </span>
                                        </p>

                                        <Separator orientation="horizontal" className="bg-white/10" />

                                        <div className="flex grow flex-col items-start gap-3">
                                            <p className="text-base font-medium text-card-foreground">
                                                What&apos;s included
                                            </p>
                                            <ul className="flex flex-col items-start gap-3 self-stretch">
                                                {items.plan_feature?.map(
                                                    (feature: string, index: number) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center gap-3 text-sm font-normal tracking-normal text-card-foreground"
                                                        >
                                                            <Check size={16} aria-hidden="true" className="shrink-0" />
                                                            {feature}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>

                                        <Button
                                            onClick={() => window.open(buildBookingUrl(items), "_blank")}
                                            className="group relative h-12 w-full cursor-pointer overflow-hidden rounded-full bg-white p-1 ps-6 pe-14 text-sm font-medium text-black transition-all duration-500 hover:bg-white hover:ps-14 hover:pe-6 hover:text-black dark:hover:text-black"
                                        >
                                            <span className="relative z-10 transition-all duration-500">
                                                Let&apos;s Collaborate
                                            </span>
                                            <div className="absolute right-1 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                                                <ArrowUpRight size={16} />
                                            </div>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    aria-label="Previous plan"
                    onClick={() => scrollByPage(-1)}
                    disabled={!canScrollLeft}
                    className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-xl shadow-[0_8px_30px_-8px_rgba(61,7,69,0.35)] transition-all duration-300 hover:bg-black/60 disabled:pointer-events-none disabled:opacity-0 sm:left-4"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    type="button"
                    aria-label="Next plan"
                    onClick={() => scrollByPage(1)}
                    disabled={!canScrollRight}
                    className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-xl shadow-[0_8px_30px_-8px_rgba(61,7,69,0.35)] transition-all duration-300 hover:bg-black/60 disabled:pointer-events-none disabled:opacity-0 sm:right-4"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </section>
    );
};

export default Pricing;
