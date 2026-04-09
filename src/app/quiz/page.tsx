'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProgressBar } from './components/progress-bar'
import {
    QuizData,
    initialQuizData,
    STEPS,
    QuizResult,
    ProductRecommendation,
    FitLevel,
} from './types'
import { Step1 } from './steps/step-1'
import { Step2 } from './steps/step-2'
import { Step3 } from './steps/step-3'
import { Step4 } from './steps/step-4'
import { Step5 } from './steps/step-5'
import { Step6 } from './steps/step-6'
import { ArrowLeft, ArrowRight, ShieldCheck, Clock, Lock, TrendingUp, Home, CreditCard, Banknote, AlertTriangle, PauseCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// --- Equity helpers ---

const VALUE_MIDPOINTS: Record<string, number> = {
    'under-200k': 150_000,
    '200k-400k': 300_000,
    '400k-600k': 500_000,
    '600k-800k': 700_000,
    '800k-1m': 900_000,
    'over-1m': 1_200_000,
}

const MORTGAGE_MIDPOINTS: Record<string, number> = {
    'under-100k': 75_000,
    '100k-250k': 175_000,
    '250k-400k': 325_000,
    '400k-600k': 500_000,
    'over-600k': 700_000,
    'paid-off': 0,
}

function estimateEquityPercent(homeValue: string, mortgageBalance: string): number {
    const value = VALUE_MIDPOINTS[homeValue] ?? 0
    const owed = MORTGAGE_MIDPOINTS[mortgageBalance] ?? 0
    if (value === 0) return 0
    return Math.round(((value - owed) / value) * 100)
}

// --- Product-agnostic result routing ---

function determineResult(data: QuizData): QuizResult {
    const equity = estimateEquityPercent(data.homeValue, data.mortgageBalance)
    const goodCredit = ['excellent', 'good'].includes(data.creditScoreRange)
    const fairCredit = data.creditScoreRange === 'fair'
    const lowCredit = data.creditScoreRange === 'needs-work'
    const primaryRes = data.primaryResidence === 'yes'
    const employed = ['employed-w2', 'self-employed'].includes(data.employmentStatus)
    const highDebt = ['50k-100k', 'over-100k'].includes(data.creditCardDebt)
    const moderateDebt = ['25k-50k'].includes(data.creditCardDebt)
    const lowDebt = ['none', 'under-10k'].includes(data.creditCardDebt)
    const paidOff = data.mortgageBalance === 'paid-off'

    // ---- Debt counseling: poor credit + high debt, limited equity ----
    if (lowCredit && highDebt && equity < 30) {
        return {
            fitLevel: 'not-recommended',
            primaryProduct: 'debt-counseling',
            headline: 'A different approach may serve you better right now.',
            description:
                'Based on what you shared, speaking with a nonprofit credit counselor could be a strong first step. They can help you build a plan to manage debt, and you may qualify for reduced rates or structured repayment — with no impact on your home.',
        }
    }

    // ---- Hold off: very low equity regardless of credit ----
    if (equity < 15) {
        return {
            fitLevel: 'not-recommended',
            primaryProduct: 'hold-off',
            headline: "You may want to wait until you've built more equity.",
            description:
                "With less than ~15% equity, most lenders won't be able to offer a home equity product right now. The good news is that as you pay down your mortgage and property values change, this could open up. It may be worth checking back in a few months.",
        }
    }

    // ---- Personal loan: fair/low credit, but has income, moderate debt ----
    if (!goodCredit && employed && (moderateDebt || highDebt) && equity < 30) {
        return {
            fitLevel: 'possible',
            primaryProduct: 'personal-loan',
            secondaryProduct: 'debt-counseling',
            headline: 'A personal loan may be a practical option.',
            description:
                "Based on your situation, an unsecured personal loan could help consolidate your debt without putting your home on the line. Rates vary with credit, but a specialist can walk you through what's available — and whether a home equity option might also make sense.",
        }
    }

    // ---- Cash-out refi: wants lower mortgage, good equity + credit ----
    if (data.primaryGoal === 'lower-mortgage' && equity >= 20 && goodCredit && employed) {
        return {
            fitLevel: 'strong',
            primaryProduct: 'cash-out-refi',
            secondaryProduct: 'heloc',
            headline: 'A cash-out refinance could be a strong fit.',
            description:
                "Based on your equity and credit, refinancing your mortgage could lower your payment and free up cash at the same time. A licensed lending partner can compare this against a HELOC to help you choose what's best.",
        }
    }

    // ---- Home equity loan: wants fixed payment, renovation, or large lump sum ----
    if (
        ['home-renovation', 'access-cash'].includes(data.primaryGoal) &&
        equity >= 20 &&
        (goodCredit || fairCredit) &&
        employed
    ) {
        return {
            fitLevel: equity >= 30 && goodCredit ? 'strong' : 'possible',
            primaryProduct: 'home-equity-loan',
            secondaryProduct: 'heloc',
            headline:
                equity >= 30 && goodCredit
                    ? 'A home equity loan looks like a strong option.'
                    : 'A home equity loan may be worth exploring.',
            description:
                'A fixed-rate home equity loan gives you a lump sum with predictable monthly payments — often a great fit for renovations or large one-time expenses. A specialist can also compare it with a HELOC to see which saves you more.',
        }
    }

    // ---- HELOC: strong default for debt consolidation or exploring ----
    if (equity >= 20 && (goodCredit || fairCredit) && (employed || paidOff)) {
        const strong = equity >= 30 && goodCredit && primaryRes
        return {
            fitLevel: strong ? 'strong' : 'possible',
            primaryProduct: 'heloc',
            secondaryProduct: 'home-equity-loan',
            headline: strong
                ? 'This looks like it could be a great fit.'
                : 'There are options worth exploring.',
            description: strong
                ? 'Based on what you shared, a HELOC could give you flexible access to your home equity at a competitive rate — whether for debt consolidation, renovations, or other goals. A licensed partner can walk you through the specifics.'
                : "Your equity and finances suggest a home equity line of credit could work, though a lending partner will want to look at a few details more closely. It's worth a conversation to understand your options.",
        }
    }

    // ---- Fallback: possible personal loan or hold ----
    if (employed && (moderateDebt || highDebt)) {
        return {
            fitLevel: 'possible',
            primaryProduct: 'personal-loan',
            headline: "Let's look at what options are available.",
            description:
                "Based on your situation, a personal loan or alternative lending option could help. A specialist can review your full picture and point you in the right direction — there's no commitment involved.",
        }
    }

    // ---- Default hold-off ----
    return {
        fitLevel: 'not-recommended',
        primaryProduct: 'hold-off',
        headline: 'It might make sense to wait for now.',
        description:
            "Based on what you shared, the timing may not be ideal for a home equity product. That doesn't mean options won't open up — as your equity grows or your finances shift, it may be worth checking back. We're glad you took the time to look into it.",
    }
}

// --- Step validation ---

function isStepValid(step: number, data: QuizData): boolean {
    switch (step) {
        case 1:
            return !!data.primaryGoal
        case 2:
            return !!(data.address.verified && data.homeType && data.primaryResidence)
        case 3:
            return !!(data.homeValue && data.mortgageBalance)
        case 4:
            return !!(data.creditCardDebt && data.creditScoreRange && data.employmentStatus && data.householdIncome)
        case 5:
            return !!(data.decisionTimeline && data.wantHelp)
        case 6:
            return !!(data.firstName.trim() && data.email.trim() && data.phone.trim() && data.consentGiven)
        default:
            return false
    }
}

// --- Main Page ---

export default function QuizPage() {
    const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro')
    const [currentStep, setCurrentStep] = useState(1)
    const [data, setData] = useState<QuizData>(initialQuizData)
    const [result, setResult] = useState<QuizResult | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = useCallback((updates: Partial<QuizData>) => {
        setData((prev) => ({ ...prev, ...updates }))
    }, [])

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep((s) => s + 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((s) => s - 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            setPhase('intro')
        }
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        // Stub: send data to API
        // await fetch('/api/quiz', { method: 'POST', body: JSON.stringify(data) })
        await new Promise((r) => setTimeout(r, 1200))
        const quizResult = determineResult(data)
        setResult(quizResult)
        setPhase('result')
        setIsSubmitting(false)
    }

    // --- INTRO ---
    if (phase === 'intro') {
        return (
            <div className="bg-background flex min-h-screen flex-col">
                <header className="border-b">
                    <div className="mx-auto flex h-14 max-w-5xl items-center px-6">
                        <Link href="/" aria-label="home"><Logo uniColor /></Link>
                    </div>
                </header>
                <main className="flex flex-1 items-center justify-center px-6 py-16">
                    <div className="mx-auto max-w-lg text-center">
                        <div className="bg-sky-500/10 text-sky-600 mx-auto mb-6 flex size-12 items-center justify-center rounded-full">
                            <ShieldCheck className="size-6" />
                        </div>
                        <h1 className="text-foreground text-balance text-3xl font-semibold md:text-4xl">
                            Find out what your home equity can do for you.
                        </h1>
                        <p className="text-muted-foreground mx-auto mt-4 max-w-md text-balance text-lg">
                            Answer a few quick questions and we&apos;ll match you with the best option — whether it&apos;s a HELOC, home equity loan, refinance, or something else entirely.
                        </p>

                        <div className="mt-8 flex flex-col items-center gap-4">
                            <Button
                                onClick={() => setPhase('quiz')}
                                className="h-12 rounded-full bg-sky-500 px-8 text-base text-white hover:bg-sky-600">
                                Get Started
                            </Button>
                            <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-4 text-xs">
                                <span className="flex items-center gap-1"><Clock className="size-3" /> About 2 minutes</span>
                                <span className="flex items-center gap-1"><Lock className="size-3" /> No credit check</span>
                                <span className="flex items-center gap-1"><ShieldCheck className="size-3" /> No obligation</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    // --- RESULT ---
    if (phase === 'result' && result) {
        return (
            <ResultScreen
                result={result}
                firstName={data.firstName}
                onRestart={() => {
                    setPhase('intro')
                    setCurrentStep(1)
                    setData(initialQuizData)
                    setResult(null)
                }}
            />
        )
    }

    // --- QUIZ ---
    const stepValid = isStepValid(currentStep, data)
    const isLastStep = currentStep === STEPS.length

    return (
        <div className="bg-background flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
                <div className="mx-auto max-w-2xl px-6 py-3">
                    <div className="mb-3 flex items-center justify-between">
                        <Link href="/" aria-label="home"><Logo uniColor /></Link>
                        <span className="text-muted-foreground text-xs">Fit check — not a loan application</span>
                    </div>
                    <ProgressBar currentStep={currentStep} />
                </div>
            </header>

            <main className="flex flex-1 flex-col px-6 py-8">
                <div className="mx-auto w-full max-w-2xl">
                    <Card className="p-6 sm:p-8">
                        {currentStep === 1 && <Step1 data={data} onChange={handleChange} />}
                        {currentStep === 2 && <Step2 data={data} onChange={handleChange} />}
                        {currentStep === 3 && <Step3 data={data} onChange={handleChange} />}
                        {currentStep === 4 && <Step4 data={data} onChange={handleChange} />}
                        {currentStep === 5 && <Step5 data={data} onChange={handleChange} />}
                        {currentStep === 6 && <Step6 data={data} onChange={handleChange} />}
                    </Card>

                    <div className="mt-6 flex items-center justify-between">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            className="gap-2 rounded-full text-sm">
                            <ArrowLeft className="size-4" />
                            Back
                        </Button>

                        {isLastStep ? (
                            <Button
                                onClick={handleSubmit}
                                disabled={!stepValid || isSubmitting}
                                className="h-11 gap-2 rounded-full bg-sky-500 px-6 text-white hover:bg-sky-600 disabled:opacity-40">
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Processing…
                                    </span>
                                ) : (
                                    <>See My Results</>
                                )}
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                disabled={!stepValid}
                                className="h-11 gap-2 rounded-full bg-sky-500 px-6 text-white hover:bg-sky-600 disabled:opacity-40">
                                Continue
                                <ArrowRight className="size-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

// --- RESULT SCREEN ---

const PRODUCT_META: Record<ProductRecommendation, { icon: React.ReactNode; label: string; tagline: string }> = {
    heloc: {
        icon: <TrendingUp className="size-5" />,
        label: 'HELOC',
        tagline: 'Flexible credit line backed by your home equity',
    },
    'home-equity-loan': {
        icon: <Home className="size-5" />,
        label: 'Home Equity Loan',
        tagline: 'Fixed-rate lump sum with predictable payments',
    },
    'cash-out-refi': {
        icon: <Banknote className="size-5" />,
        label: 'Cash-Out Refinance',
        tagline: 'Replace your mortgage and access equity at once',
    },
    'personal-loan': {
        icon: <CreditCard className="size-5" />,
        label: 'Personal Loan',
        tagline: 'Unsecured option — no home equity required',
    },
    'debt-counseling': {
        icon: <AlertTriangle className="size-5" />,
        label: 'Debt Counseling',
        tagline: 'Expert guidance to get your finances on track',
    },
    'hold-off': {
        icon: <PauseCircle className="size-5" />,
        label: 'Wait & Revisit',
        tagline: 'Timing may not be right — but things change',
    },
}

const FIT_STYLES: Record<FitLevel, { badge: string; badgeBg: string; iconBg: string }> = {
    strong: {
        badge: 'Strong Fit',
        badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        iconBg: 'bg-emerald-500',
    },
    possible: {
        badge: 'Worth Exploring',
        badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        iconBg: 'bg-amber-500',
    },
    'not-recommended': {
        badge: 'Not Recommended Right Now',
        badgeBg: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
        iconBg: 'bg-zinc-400',
    },
}

interface ResultScreenProps {
    result: QuizResult
    firstName: string
    onRestart: () => void
}

function ResultScreen({ result, firstName, onRestart }: ResultScreenProps) {
    const primary = PRODUCT_META[result.primaryProduct]
    const secondary = result.secondaryProduct ? PRODUCT_META[result.secondaryProduct] : null
    const fit = FIT_STYLES[result.fitLevel]

    return (
        <div className="bg-background flex min-h-screen flex-col">
            <header className="border-b">
                <div className="mx-auto flex h-14 max-w-5xl items-center px-6">
                    <Link href="/" aria-label="home"><Logo uniColor /></Link>
                </div>
            </header>
            <main className="flex flex-1 items-center justify-center px-6 py-16">
                <div className="mx-auto max-w-lg text-center">
                    {/* Fit badge */}
                    <div className="mb-4 flex justify-center">
                        <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium', fit.badgeBg)}>
                            {fit.badge}
                        </span>
                    </div>

                    {/* Primary product icon */}
                    <div className={cn('mx-auto mb-6 flex size-14 items-center justify-center rounded-full text-white', fit.iconBg)}>
                        {primary.icon}
                    </div>

                    {/* Headline */}
                    <h1 className="text-foreground text-balance text-2xl font-semibold md:text-3xl">
                        {firstName
                            ? `${firstName}, ${result.headline.charAt(0).toLowerCase()}${result.headline.slice(1)}`
                            : result.headline}
                    </h1>

                    {/* Description */}
                    <p className="text-muted-foreground mx-auto mt-4 max-w-md text-balance">
                        {result.description}
                    </p>

                    {/* Recommended product card */}
                    <div className="ring-foreground/6.5 mx-auto mt-8 max-w-sm rounded-xl bg-zinc-50 p-4 text-left ring-1 dark:bg-zinc-900">
                        <div className="flex items-center gap-3">
                            <div className={cn('flex size-10 items-center justify-center rounded-lg text-white', fit.iconBg)}>
                                {primary.icon}
                            </div>
                            <div>
                                <div className="text-foreground text-sm font-medium">{primary.label}</div>
                                <div className="text-muted-foreground text-xs">{primary.tagline}</div>
                            </div>
                        </div>
                        {secondary && (
                            <div className="border-border mt-3 flex items-center gap-3 border-t pt-3">
                                <div className="bg-muted flex size-10 items-center justify-center rounded-lg text-zinc-500">
                                    {secondary.icon}
                                </div>
                                <div>
                                    <div className="text-foreground text-sm font-medium">Also consider: {secondary.label}</div>
                                    <div className="text-muted-foreground text-xs">{secondary.tagline}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-col items-center gap-3">
                        {result.fitLevel !== 'not-recommended' && (
                            <Button className="h-11 rounded-full bg-sky-500 px-8 text-white hover:bg-sky-600">
                                Connect With a Specialist
                            </Button>
                        )}
                        <Button variant="ghost" onClick={onRestart} className="rounded-full text-sm">
                            Start over
                        </Button>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-muted-foreground mt-12 text-xs">
                        This is a preliminary assessment only and does not constitute a loan offer, approval, or financial advice. All lending decisions are made by licensed partners.
                    </p>
                </div>
            </main>
        </div>
    )
}
