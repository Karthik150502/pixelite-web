'use client'
import React, { useRef } from 'react'
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NavbarItems } from '@/lib/constants/metadata'

export default function FloatingDockDashboard() {
    const mouseX = useMotionValue(Infinity);
    return <nav className='h-15 hidden md:flex items-center justify-center w-screen fixed top-4 z-50'>
        <motion.div
            initial={{ opacity: 0, y: -40, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
                delay: 0.3,
                duration: 0.2,
                ease: "easeInOut",
            }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className='h-full w-fit flex items-center justify-center p-4 rounded-full bg-white/70 dark:bg-black/50 backdrop-blur-xl gap-10 shadow-[0_8px_30px_-8px_rgba(61,7,69,0.35)] px-10'>
            {
                NavbarItems.map((item) => {
                    return <LinkContainer mouseX={mouseX} key={item.id} item={item} />
                })
            }
        </motion.div>
    </nav>
}



function LinkContainer({
    item,
    mouseX
}: {
    item: {
        id: number,
        href: string,
        label: string
    },
    mouseX: MotionValue
}) {

    const pathname = usePathname();
    const isActive = pathname === item.href;
    const ref = useRef<HTMLDivElement | null>(null)
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
        return val - bounds.x - (bounds.width / 2)
    })
    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
    const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])

    const width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12
    })
    const height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12
    })

    return <Link
        href={item.href}
    >
        <motion.div
            ref={ref}
            style={{
                width,
                height,
            }}
            className={cn("p-2 flex items-center justify-center relative text-xs font-normal opacity-70 hover:opacity-100 transition-opacity duration-300", isActive ? "text-primary opacity-100 font-semibold" : "")}>
            {item.label}
        </motion.div>
    </Link>
}
