import { cn } from '@/lib/utils'
import { CheckCircle2, XCircle } from 'lucide-react'

const goodFitItems = [
    'You own a home with equity built up',
    'You carry credit card balances with high interest rates',
    'Your mortgage is in good standing',
    'You want one predictable monthly payment',
    'You\'re looking to reduce total interest paid',
    'You\'re comfortable using your home as collateral',
]

const notFitItems = [
    'You have little or no home equity',
    'You\'re behind on mortgage payments',
    'Your credit card balances are small and manageable',
    'You\'re planning to sell your home soon',
    'You\'re not comfortable with a secured loan',
    'You\'re looking for a short-term fix without a plan',
]

export default function QualificationSnapshot() {
    return (
        <section id="who-its-for" className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-5xl md:px-6">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="max-w-lg max-md:px-6">
                        <div className="text-balance lg:max-w-xs">
                            <h2 className="text-foreground text-3xl font-semibold md:text-4xl lg:text-5xl">Is this the right fit?</h2>
                            <p className="text-muted-foreground mt-4 text-balance lg:mt-6">Not every situation calls for a HELOC. Here&apos;s a quick way to see if it may be worth exploring for you.</p>
                        </div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 max-md:px-6">
                        <div>
                            <h3 className="text-foreground font-semibold mb-4">This may be worth exploring if…</h3>
                            <ul className="space-y-3">
                                {goodFitItems.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="size-4 mt-0.5 shrink-0 fill-emerald-400/25 text-emerald-600 dark:text-emerald-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-foreground font-semibold mb-4">This may not be the best fit if…</h3>
                            <ul className="space-y-3">
                                {notFitItems.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <XCircle className="size-4 mt-0.5 shrink-0 fill-rose-400/25 text-rose-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
