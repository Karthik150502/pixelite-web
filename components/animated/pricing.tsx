"use client";

import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { cal_dot_com_url } from "@/lib/constants/metadata";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type PricingPlan = {
    plan_bg_color: string;
    plan_name: string;
    plan_descp: string;
    plan_price: number;
    plan_feature: string[];
    popular?: boolean;
    /** Who the package is aimed at — shown in the details modal. */
    idealFor?: string;
    /** Fuller write-up for the details modal; falls back to plan_descp. */
    longDescription?: string;
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
        idealFor: "Individuals, couples, or families wanting a relaxed, personal shoot.",
        longDescription:
            "A one-on-one portrait session designed around you — whether it's a solo shoot, a couple's session, or a small family gathering. We scout a location that fits your story, work at a relaxed pace, and hand over a curated gallery you'll actually want to share.",
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
        idealFor: "Couples who want a relaxed, story-driven shoot before the wedding rush begins.",
        longDescription:
            "Two hours, two locations, and no rush — a pre-wedding session built to capture the calm before the big day. We help plan outfits and locations ahead of time so the shoot flows naturally, from candid laughs to the quiet in-between moments.",
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
        idealFor: "Couples who want full-day coverage without a second shooter or a printed album.",
        longDescription:
            "Six hours of dedicated coverage from one of our lead photographers, following your day from getting-ready shots through to the reception. You get a fully edited online gallery within two weeks — everything you need to relive the day, nothing you don't.",
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
        idealFor: "Couples who want every angle covered — literally — with a keepsake to hold.",
        longDescription:
            "Our most complete wedding package: full-day coverage with two photographers working in tandem, a same-day preview so you don't have to wait to see the highlights, and a premium printed album delivered alongside 400+ edited photos. Includes a complimentary pre-wedding session.",
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
        idealFor: "Brands, businesses and event organisers who need dependable, fast-turnaround coverage.",
        longDescription:
            "From product launches to office offsites, we cover corporate events and celebrations with an eye for brand-ready imagery. Multiple shooters are available for larger events, and every photo comes with full commercial usage rights so you can put them to work right away.",
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
    /** Index of the plan whose details modal is open, if any. */
    const [detailsIndex, setDetailsIndex] = useState<number | null>(null);
    const searchParams = useSearchParams();

    // Deep-links from elsewhere on the site (e.g. "Check out the package" on
    // a portfolio shot) land here with ?plan=<name> — open that plan's
    // details modal automatically.
    useEffect(() => {
        const requestedPlan = searchParams.get("plan");
        if (!requestedPlan) return;

        const index = pricingData.findIndex(
            (plan) => plan.plan_name.toLowerCase() === requestedPlan.toLowerCase(),
        );
        if (index !== -1) setDetailsIndex(index);
    }, [searchParams]);

    // Esc closes the details modal, and the page shouldn't scroll behind it.
    useEffect(() => {
        if (detailsIndex === null) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setDetailsIndex(null);
        };

        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = overflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [detailsIndex]);

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
                    className="w-full overflow-x-auto overflow-y-hidden pt-4 pb-4 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
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

                                        <button
                                            type="button"
                                            onClick={() => setDetailsIndex(index)}
                                            className="cursor-pointer self-center text-sm font-normal text-muted-foreground underline decoration-from-font underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            Know more about this package
                                        </button>
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

            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {detailsIndex !== null && (
                            <motion.div
                                className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setDetailsIndex(null)}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 12 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 12 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    onClick={(event) => event.stopPropagation()}
                                    className={cn(
                                        pricingData[detailsIndex].plan_bg_color,
                                        "relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-10",
                                    )}
                                >
                                    <button
                                        type="button"
                                        aria-label="Close"
                                        onClick={() => setDetailsIndex(null)}
                                        className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-xl transition-colors hover:bg-black/60 sm:right-6 sm:top-6"
                                    >
                                        <X size={18} />
                                    </button>

                                    <div className="flex flex-col items-start gap-4 pr-10">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge className="h-7 w-fit px-3 py-1 text-sm font-normal leading-5">
                                                {pricingData[detailsIndex].plan_name}
                                            </Badge>
                                            {pricingData[detailsIndex].popular && (
                                                <Badge variant="secondary" className="h-7 w-fit px-3 py-1 text-sm font-normal leading-5">
                                                    Most Popular
                                                </Badge>
                                            )}
                                        </div>

                                        <p className="flex items-end text-3xl font-semibold text-card-foreground sm:text-4xl">
                                            {formatPrice(pricingData[detailsIndex].plan_price)}
                                            <span className="text-sm font-normal text-muted-foreground">&nbsp;onwards</span>
                                        </p>

                                        {pricingData[detailsIndex].idealFor && (
                                            <p className="text-sm text-foreground/80">
                                                <span className="font-medium text-foreground">Ideal for: </span>
                                                {pricingData[detailsIndex].idealFor}
                                            </p>
                                        )}

                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {pricingData[detailsIndex].longDescription ?? pricingData[detailsIndex].plan_descp}
                                        </p>

                                        <Separator orientation="horizontal" className="bg-white/10" />

                                        <div className="flex w-full flex-col items-start gap-3">
                                            <p className="text-base font-medium text-card-foreground">
                                                What&apos;s included
                                            </p>
                                            <ul className="flex flex-col items-start gap-3 self-stretch">
                                                {pricingData[detailsIndex].plan_feature.map((feature, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-center gap-3 text-sm font-normal tracking-normal text-card-foreground"
                                                    >
                                                        <Check size={16} aria-hidden="true" className="shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Button
                                            onClick={() => window.open(buildBookingUrl(pricingData[detailsIndex]), "_blank")}
                                            className="group relative mt-2 h-12 w-full cursor-pointer overflow-hidden rounded-full bg-white p-1 ps-6 pe-14 text-sm font-medium text-black transition-all duration-500 hover:bg-white hover:ps-14 hover:pe-6 hover:text-black dark:hover:text-black"
                                        >
                                            <span className="relative z-10 transition-all duration-500">
                                                Let&apos;s Collaborate
                                            </span>
                                            <div className="absolute right-1 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                                                <ArrowUpRight size={16} />
                                            </div>
                                        </Button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </section>
    );
};

export default Pricing;
