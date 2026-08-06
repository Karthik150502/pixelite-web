"use client"

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { NavbarItems, socials, cal_dot_com_url } from "@/lib/constants/metadata";

interface Props {
    className?: string;
    children: React.ReactNode;
    delay?: number;
    reverse?: boolean;
    simple?: boolean;
}

const Container = ({ children, className, delay = 0.2, reverse, simple }: Props) => {
    return (
        <motion.div
            className={cn("w-full h-full", className)}
            initial={{ opacity: 0, y: reverse ? -20 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay, duration: simple ? 0.2 : 0.4, type: simple ? "keyframes" : "spring", stiffness: simple ? 100 : undefined }}
        >
            {children}
        </motion.div>
    )
};

export default function Footer() {
    const socialLinks = socials["Karthik J"];

    return (
        <footer className="flex flex-col relative items-center justify-center border-t border-zinc-800 pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-24">
            <div className="grid gap-12 md:grid-cols-3 md:gap-8 w-full">
                <Container>
                    <div className="flex flex-col items-start justify-start md:max-w-64">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/assets/brand/pixelite_logo_color_transparent.svg"
                                alt="Pixelite Studios"
                                width={44}
                                height={44}
                                className="rounded-full"
                            />
                            <span className="text-sm font-regular tracking-[0.2em] text-white">
                                Pixelite Studios
                            </span>
                        </Link>
                        <p className="text-zinc-500 mt-4 text-sm text-start">
                            Stories behind every frame we capture. Portraits, landscapes and weddings, told through our eyes.
                        </p>
                    </div>
                </Container>

                <Container delay={0.1} className="h-auto">
                    <h3 className="text-sm font-normal text-foreground capitalize">
                        Navigate
                    </h3>
                    <ul className="mt-4 text-sm text-zinc-500 space-y-4">
                        {NavbarItems.map((item) => (
                            <li key={item.id}>
                                <Link href={item.href} className="link capitalize hover:text-foreground transition-all duration-300">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Container>

                <Container delay={0.2} className="h-auto">
                    <h3 className="text-sm font-normal text-foreground">
                        Connect
                    </h3>
                    <ul className="mt-4 text-sm text-zinc-500 space-y-4">
                        <li>
                            <Link href={cal_dot_com_url} target="_blank" rel="noopener noreferrer" className="link hover:text-foreground transition-all duration-300">
                                Book a session
                            </Link>
                        </li>
                        {socialLinks.map((social) => (
                            <li key={social.name}>
                                <Link href={social.href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-2 hover:text-foreground transition-all duration-300">
                                    <Image src={social.icon} alt={social.name} width={16} height={16} className="opacity-70" />
                                    {social.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Container>
            </div>

            <Container delay={0.3} className="w-full relative mt-12 lg:mt-16">
                <div className="flex flex-col gap-2 border-t border-zinc-800 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>&copy; {new Date().getFullYear()} Pixelite Studios</span>
                    <span>Bangalore, Karnataka, India</span>
                </div>
            </Container>
        </footer>
    );
}
