import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export default function SecondaryHero() {
    return (
        <section className="bg-background overflow-x-hidden py-24 lg:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <span className="text-sky-500 block text-sm font-medium max-md:text-center">Why Consider a HELOC?</span>
                <div className="mt-8 grid items-center gap-16 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-12">
                    <div className="max-md:text-center lg:col-span-2">
                        <h2 className="text-balance text-4xl font-semibold md:text-5xl">Credit card debt is expensive. Your home equity may help.</h2>
                        <p className="text-muted-foreground mb-8 mt-6 max-w-sm text-balance text-lg max-md:mx-auto">The average credit card rate is over 20%. A HELOC typically offers a much lower rate, which could mean lower monthly payments and less interest over time.</p>

                        <Button size="lg" className="h-12 px-5 text-base bg-sky-500 text-white hover:bg-sky-600 rounded-full" render={<Link href="#cta" />} nativeButton={false}>See If I May Qualify</Button>

                        <ul className="mt-8 space-y-2">
                            {['Potentially lower interest rate', 'One simple monthly payment', 'Keep your existing mortgage'].map((item, index) => (
                                <li
                                    key={index}
                                    className="text-muted-foreground flex items-center gap-2 max-md:justify-center">
                                    <CheckCircle2 className="size-4 fill-emerald-400/25 text-emerald-600 dark:text-emerald-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative lg:col-span-3 lg:pl-32">
                        <div className="bg-background/60 min-w-3xl ring-foreground/10 rounded-2xl p-1 shadow-xl ring-1 max-md:hidden">
                            <div className="bg-background ring-border-illustration relative aspect-video origin-top overflow-hidden rounded-xl border-4 border-transparent shadow ring-1"></div>
                        </div>
                        <div className="md:absolute md:-top-8 lg:left-20">
                            <div className="bg-background ring-foreground/10 h-156 md:h-124 max-w-84 rounded-3xl border border-transparent p-2 shadow-xl ring-1 max-md:mx-auto md:max-w-64">
                                <div className="border-foreground/10 shadow-foreground/5 h-full rounded-2xl border bg-gradient-to-b from-sky-50 to-white dark:from-sky-950/20 dark:to-zinc-900 flex items-center justify-center p-6">
                                    <div className="text-center space-y-4">
                                        <div className="text-5xl font-bold text-sky-500">20%+</div>
                                        <p className="text-muted-foreground text-sm">Average credit card APR</p>
                                        <div className="h-px bg-border my-2" />
                                        <div className="text-5xl font-bold text-emerald-500">8–9%</div>
                                        <p className="text-muted-foreground text-sm">Typical HELOC rate range</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
