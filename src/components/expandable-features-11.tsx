'use client'

import { cn } from '@/lib/utils'
import { useState, useEffect, useCallback, useRef } from 'react'
import { AiSearchIllustration } from "@/components/ui/illustrations/ai-search-illustration"
import Image from 'next/image'
import { ShieldCheck } from 'lucide-react'
import { Windsurf } from '@/components/ui/svgs/windsurf'
import { Antigravity } from '@/components/ui/svgs/antigravity'
import { Cursor } from '@/components/ui/svgs/cursor'
import FlowIllustration from "@/components/ui/illustrations/flow-illustration"
import KanbanIllustration from "@/components/ui/illustrations/kanban"
import { AnimatePresence, motion } from 'motion/react'

const AUTOPLAY_DURATION = 7000

const Metrics = () => {
    return (
        <ul className="text-muted-foreground mt-auto space-y-3 pt-8 text-sm">
            <li className="flex items-center gap-2">
                <ShieldCheck className="*:nth-2:text-emerald-600 size-4 dark:text-emerald-500/25" />
                <span className="text-foreground font-medium">SOC 2</span>
            </li>
            <li className="flex items-center gap-2">
                <ShieldCheck className="*:nth-2:text-emerald-600 size-4 dark:text-emerald-500/25" />
                <span className="text-foreground font-medium">ISO 27001</span>
            </li>
            <li className="flex items-center gap-2">
                <ShieldCheck className="*:nth-2:text-emerald-600 size-4 dark:text-emerald-500/25" />
                <span className="text-foreground font-medium">GDPR</span>
            </li>
            <li>
                <span className="text-foreground font-medium">99.9%</span> uptime
            </li>
        </ul>
    )
}

const ShadTestimonial = () => {
    return (
        <div className="before:bg-border relative mt-auto max-w-xl pt-8 before:absolute before:inset-y-0 before:-left-4 before:w-0.5 before:rounded-full">
            <p className="text-foreground max-w-xs text-balance">"Looks really good. Did you design in code or Figma first?"</p>

            <footer className="mt-4 flex items-center gap-2">
                <div className="before:border-foreground/10 relative size-10 overflow-hidden rounded-lg shadow before:absolute before:inset-0 before:rounded-lg before:border">
                    <Image
                        src="https://avatars.githubusercontent.com/u/124599?v=4"
                        alt="Shadcn Avatar"
                        width={56}
                        height={56}
                    />
                </div>

                <div className="space-y-0.5">
                    <p className="text-foreground text-sm font-medium">Shadcn</p>
                    <span className="text-muted-foreground block text-xs">Creator of Shadcn UI</span>
                </div>
            </footer>
        </div>
    )
}

const IDESupport = () => {
    return (
        <div className="mt-auto space-y-3 pt-8">
            <h4 className="text-sm font-medium">Native IDE Support</h4>
            <div className="*:bg-foreground/5 grid max-w-56 grid-cols-3 gap-0.5 *:flex *:items-center *:justify-center *:rounded *:px-2 *:py-3">
                <div className="!rounded-l-lg">
                    <Antigravity className="size-5" />
                </div>
                <div>
                    <Cursor className="fill-foreground size-4.5" />
                </div>
                <div className="!rounded-r-lg">
                    <Windsurf className="*:fill-foreground! size-6" />
                </div>
            </div>
        </div>
    )
}

const features = [
    {
        title: 'AI Model Hub',
        description: 'Access and switch between multiple AI models including GPT, Claude, and Gemini from a unified interface.',
        illustration: <FlowIllustration key="m3" />,
        supportiveContent: <IDESupport />,
    },
    {
        title: 'Global Collaboration',
        description: 'Work with teammates across the globe with real-time presence indicators and seamless syncing.',
        illustration: <KanbanIllustration key="ai" />,
        supportiveContent: <Metrics />,
    },
    {
        title: 'Automated Workflows',
        description: 'Build custom automation pipelines with drag-and-drop simplicity and pre-built integrations.',
        illustration: <AiSearchIllustration key="wf" />,
        supportiveContent: <ShadTestimonial />,
    },
]

export default function ExpandableFeatures() {
    const [expandedIndex, setExpandedIndex] = useState<number>(0)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const pausedRef = useRef(false)

    const resetTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            if (pausedRef.current) return
            setExpandedIndex((current) => (current + 1) % features.length)
        }, AUTOPLAY_DURATION)
    }, [])

    useEffect(() => {
        resetTimer()
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [resetTimer])

    const handleSelect = (index: number) => {
        if (index === expandedIndex) return
        setExpandedIndex(index)
        resetTimer()
    }

    return (
        <section className="bg-background @container">
            <div className="mx-auto max-w-5xl">
                <div className="grid items-end gap-4 border-x border-dashed px-6 pb-6 pt-24 md:grid-cols-2">
                    <h2 className="text-foreground text-4xl font-semibold">For growing teams and organizations</h2>
                    <p className="text-muted-foreground text-balance text-lg">Four pillars that power your development workflow from idea to deployment.</p>
                </div>
            </div>
            <div className="border-t border-dashed">
                <div className="mx-auto grid h-6 max-w-5xl grid-cols-2 border-x border-dashed" />
            </div>
            <div className="lg:grid lg:grid-cols-[1fr_auto_1fr]">
                <div
                    aria-hidden
                    className="border-r-card border-y border-r border-dashed max-lg:hidden"
                />
                <div className="lg:min-w-5xl border-b-card mx-auto max-w-5xl border">
                    <div className="border-t-card border-y">
                        <div className="not-dark:bg-foreground/2 relative grid sm:grid-cols-5 lg:grid-cols-3">
                            <div
                                className="mask-l-from-50% absolute inset-0 z-0 dark:opacity-75"
                                style={{
                                    backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-border) 1px, transparent 0)',
                                    backgroundSize: '20px 20px',
                                }}
                            />
                            <div className={cn('grid gap-3 py-6 pl-6 transition-all duration-300 max-sm:pr-6 sm:col-span-2 lg:col-span-1', expandedIndex === 0 && 'grid-rows-[1fr_auto_auto]', expandedIndex === 1 && 'grid-rows-[auto_1fr_auto]', expandedIndex === 2 && 'grid-rows-[auto_auto_1fr]')}>
                                {features.map((feature, index) => (
                                    <div
                                        key={feature.title}
                                        data-expanded={expandedIndex === index}
                                        className="data-[expanded=true]:bg-card ring-border data-[expanded=true]:z-1 data-[expanded=true]:shadow-black/4 group relative grid grid-rows-[auto_1fr] rounded-xl shadow-lg shadow-transparent ring-1">
                                        <button
                                            onClick={() => handleSelect(index)}
                                            className="group flex w-full cursor-pointer items-center gap-3 px-6 py-4 text-left">
                                            <h3 className={cn('group-hover:text-foreground font-medium transition-colors', expandedIndex === index ? 'text-foreground' : 'text-muted-foreground')}>{feature.title}</h3>
                                        </button>

                                        <div className={cn('grid px-6 transition-[grid-template-rows] duration-300', expandedIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                                            <div className="overflow-hidden">
                                                <div className="flex h-full flex-col pb-6">
                                                    <p className="text-muted-foreground max-w-sm text-balance">{feature.description}</p>

                                                    <div
                                                        key={expandedIndex}
                                                        className="starting:opacity-0 starting:blur-xs in-data-[expanded=true]:opacity-100 duration-400 delay-250 mt-auto">
                                                        {feature.supportiveContent}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-120 sm:h-144 relative flex items-center justify-center overflow-hidden p-12 max-sm:row-start-1 sm:col-span-3 lg:col-span-2">
                                <AnimatePresence
                                    initial={false}
                                    mode="popLayout">
                                    <motion.div
                                        key={expandedIndex}
                                        className="scale-90"
                                        initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.85, y: 6 }}
                                        animate={{ opacity: 1, filter: 'blur(0px)', scale: 0.9, y: 0 }}
                                        exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.85, y: 6 }}
                                        transition={{ duration: 0.3 }}>
                                        {features[expandedIndex].illustration}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    aria-hidden
                    className="border-l-card border-y border-l border-dashed max-lg:hidden"
                />
            </div>
            <div className="mx-auto w-full max-w-5xl border-x border-dashed pb-24" />
        </section>
    )
}