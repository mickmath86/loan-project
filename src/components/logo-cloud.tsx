'use client'
import { cn } from '@/lib/utils'
import { ShieldCheck, GraduationCap, Clock, UserCheck, Lock, HeartHandshake } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useState } from 'react'

const trustItems = [
    { icon: <ShieldCheck key="shield" className="size-5" />, label: 'No obligation' },
    { icon: <GraduationCap key="edu" className="size-5" />, label: 'Educational first' },
    { icon: <Clock key="clock" className="size-5" />, label: '2-minute fit check' },
    { icon: <UserCheck key="user" className="size-5" />, label: 'Licensed partners' },
    { icon: <Lock key="lock" className="size-5" />, label: 'No credit pull' },
    { icon: <HeartHandshake key="hand" className="size-5" />, label: 'Your pace, your choice' },
]

export function LogoCloud() {
    return (
        <section className="bg-background">
            <div className="relative mx-auto max-w-6xl px-6 py-16">
                <div
                    aria-hidden
                    className="*:corner-bevel absolute inset-0 grid grid-cols-3 gap-px *:border-x *:via-transparent *:first:border-l-0 *:last:rounded-r-[2rem] *:last:border-r-0 md:grid-cols-6">
                    <div />
                    <div className="max-md:hidden" />
                    <div className="max-md:hidden" />
                    <div className="max-md:hidden" />
                    <div />
                    <div />
                </div>
                <div className="grid grid-cols-3 gap-y-6 md:grid-cols-6">
                    {trustItems.map((item, index) => (
                        <div key={index} className="relative h-10 flex items-center justify-center gap-2 text-muted-foreground">
                            {item.icon}
                            <span className="text-sm font-medium">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
