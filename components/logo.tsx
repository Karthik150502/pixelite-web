'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Logo() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    const [ready, setReady] = useState(false);
    const [inTopSection, setInTopSection] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        if (!isHomePage) {
            setInTopSection(true);
            return;
        }

        const heroSection = document.getElementById("hero-section");
        if (!heroSection) return;

        const observer = new IntersectionObserver(
            ([entry]) => setInTopSection(entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(heroSection);

        return () => observer.disconnect();
    }, [isHomePage]);

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -40, filter: "blur(5px)" }}
            animate={
                isFullscreen || (ready && !inTopSection)
                    ? { opacity: 0, y: -80, filter: "blur(0px)" }
                    : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            transition={
                ready
                    ? { duration: 0.3, ease: "easeInOut" }
                    : { delay: 0.3, duration: 0.5, ease: "easeInOut" }
            }
            onAnimationComplete={() => setReady(true)}
            className="fixed left-6 top-4 z-50 sm:left-10"
        >
            <Link href="/" className="mx-auto flex flex-row items-center gap-0">
                <Image
                    src="/assets/brand/pixelite_logo_color_transparent.svg"
                    alt="Pixelite"
                    width={65}
                    height={65}
                    className="rounded-full"
                    priority
                />
                <p className="hidden text-sm font-regular tracking-[0.2em] text-white md:block">
                    Pixelite Studios
                </p>
            </Link>
        </motion.div>
    );
}
