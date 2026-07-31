"use client";

import { motion } from "framer-motion";
import { AuroraHero } from "./hero-2";
import { RainbowButton } from "./rainbow-button";

export default function AuroraHeroDemo() {
    return (
        <AuroraHero>
            <div className="flex items-center justify-center flex-col gap-1">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-6xl"
                >
                    Be Present in the Moment
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.5,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground"
                >
                    Feel the high and happiness that you have never felt before
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.7,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="pt-4"
                >
                    <RainbowButton
                        onClick={() =>
                            document
                                .getElementById("slideshow-section")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Check out our Work
                    </RainbowButton>
                </motion.div>
            </div>
        </AuroraHero>
    );
}
