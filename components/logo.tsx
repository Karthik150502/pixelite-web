'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Logo() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -40, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
                delay: 0.3,
                duration: 0.5,
                ease: "easeInOut",
            }}
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
