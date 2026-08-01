'use client'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface MobileSidebarItem {
    id: number | string
    href: string
    label: string
}

export default function MobileSidebar({
    items,
    className,
    isFullscreen = false,
}: {
    items: MobileSidebarItem[]
    className?: string
    isFullscreen?: boolean
}) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const [prevPathname, setPrevPathname] = useState(pathname)

    if (pathname !== prevPathname) {
        setPrevPathname(pathname)
        setIsOpen(false)
    }

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <div className={cn('md:hidden', className)}>
            <motion.button
                type='button'
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                initial={{ opacity: 0, y: -40, filter: 'blur(5px)' }}
                animate={{
                    opacity: isFullscreen ? 0 : 1,
                    y: isFullscreen ? -100 : 0,
                    filter: 'blur(0px)',
                }}
                transition={
                    isFullscreen
                        ? { duration: 0.3, ease: 'easeInOut' }
                        : { delay: 0.3, duration: 0.2, ease: 'easeInOut' }
                }
                className='fixed right-6 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-xl shadow-[0_8px_30px_-8px_rgba(61,7,69,0.35)] border-white/10 bg-black/25'
            >
                <span className='relative flex h-4 w-5 flex-col items-center justify-center'>
                    <motion.span
                        className='absolute h-[1.5px] w-5 rounded-full bg-white'
                        animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    />
                    <motion.span
                        className='absolute h-[1.5px] w-5 rounded-full bg-white'
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.15, ease: 'easeInOut' }}
                    />
                    <motion.span
                        className='absolute h-[1.5px] w-5 rounded-full bg-white'
                        animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    />
                </span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <React.Fragment>
                        <motion.div
                            key='backdrop'
                            className='fixed inset-0 z-40 bg-black/40 backdrop-blur-sm'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.aside
                            key='sidebar'
                            className='fixed inset-y-0 right-0 z-50 flex h-full w-64 max-w-[80vw] flex-col gap-2 border-l px-8 py-16 bg-black/40 backdrop-blur-3xl  border-white/10'
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                        >
                            {items.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className={cn(
                                            'py-2 text-sm capitalize tracking-tight opacity-70 transition-opacity duration-300 hover:opacity-100',
                                            isActive ? 'text-accent font-semibold opacity-100' : ''
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </motion.aside>
                    </React.Fragment>
                )}
            </AnimatePresence>
        </div>
    )
}
