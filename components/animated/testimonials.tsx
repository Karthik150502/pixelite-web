"use client";
import React from "react";
import { motion } from 'framer-motion';
import Image from "next/image";

export type Testimonials = {
    text: string,
    image: string,
    role: string,
    name: string
}

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonials[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-transparent"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <div className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full border-white/10 bg-transparent" key={i}>
                                    <div className="text-zinc-400 text-sm font-light">{text}</div>
                                    <div className="flex items-center gap-2 mt-5">
                                        <Image
                                            width={40}
                                            height={40}
                                            src={image}
                                            alt={name}
                                            className="h-10 w-10 rounded-full"
                                        />
                                        <div className="flex flex-col">
                                            <div className="font-medium tracking-tight leading-5 text-zinc-200">{name}</div>
                                            <div className="leading-5 tracking-tight text-zinc-500 text-sm font-semibold">{role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};

;