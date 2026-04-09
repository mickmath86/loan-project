'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProgressBar } from './components/progress-bar'
import { QuizData, initialQuizData, STEPS, ResultType } from './types'
import { Step1 } from './steps/step-1'
import { Step2 } from './steps/step-2'
import { Step3 } from './steps/step-3'
import { Step4 } from './steps/step-4'
import { Step5 } from './steps/step-5'
import { Step6 } from './steps/step-6'
import { ArrowLeft, ArrowRight, ShieldCheck, Clock, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

function determineResult(data: QuizData): ResultType {
    const lowEquity = data.homeValue === 'under-200k'
    const noResidence = data.primaryResidence === 'no'
    const lowCredit = data.creditScoreRange === 'needs-work'
    const lowDebt = data.creditCardDebt === 'under-10k'
    const paidOff = data.mortgageBalance === 'paid-off'

    let score = 0

    // Positive signals
    if (['400k-600k', '600k-800k', '800k-1m', 'over-1m'].includes(data.homeValue)) score += 2
    if (data.primaryResidence === 'yes') score += 1
    if (['excellent', 'good'].includes(data.creditScoreRange)) score += 2
    if (['25k-50k', '50k-75k', '75k-100k', 'over-100k'].includes(data.creditCardDebt)) score += 1
    if (['employed-w2', 'self-employed'].includes(data.employmentStatus)) score += 1
    if (paidOff) score += 1

    // Negative signals
    if (lowEquity) score -= 2
    if (lowCredit) score -= 2
    if (lowDebt) score -= 1
    if (noResidence) score -= 1

    if (score >= 4) return 'likely-fit'
    if (score >= 1) return 'maybe-fit'
    return 'not-fit'
}

function isStepValid(step: number, data: QuizData): boolean {
    switch (step) {
        case 1: return !!(data.propertyState && data.homeType && data.primaryResidence)
        case 2: return !!(data.homeValue && data.mortgageBalance)
        case 3: return !!(data.creditCardDebt && data.mainGoal)
        case 4: return !!(data.creditScoreRange && data.employmentStatus && data.householdIncome)
        case 5: return !!(data.decisionTimeline && data.wantHelp)
        case 6: return !!(data.firstName.trim() && data.email.trim() && data.phone.trim() && data.consentGiven)
        default: return false
    }
}

export default function QuizPage() {
    const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro')
    const [currentStep, setCurrentStep] = useState(1)
    const [data, setData] = useState<QuizData>(initialQuizData)
    const [result, setResult] = useState<ResultType | null>(null)
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
        const resultType = determineResult(data)
        setResult(resultType)
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
                            Could home equity help simplify your credit card debt?
                        </h1>
                        <p className="text-muted-foreground mx-auto mt-4 max-w-md text-balance text-lg">
                            Answer a few quick questions to see whether a HELOC may be worth exploring. This is a fit check — not a loan application.
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
        return <ResultScreen result={result} firstName={data.firstName} onRestart={() => { setPhase('intro'); setCurrentStep(1); setData(initialQuizData); setResult(null) }} />
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

interface ResultScreenProps {
    result: ResultType
    firstName: string
    onRestart: () => void
}

const resultContent: Record<ResultType, { emoji: string; headline: string; description: string; bgClass: string }> = {
    'likely-fit': {
        emoji: '✓',
        headline: 'This looks like it could be a good fit.',
        description: 'Based on what you shared, a HELOC may be worth exploring as a way to consolidate your credit card debt at a potentially lower rate. A licensed lending partner can walk you through specific numbers and next steps.',
        bgClass: 'bg-emerald-500',
    },
    'maybe-fit': {
        emoji: '?',
        headline: 'There may be options worth exploring.',
        description: 'Based on what you shared, a HELOC could potentially help — though there are a few factors that a lending partner would want to look at more closely. It may still be worth a conversation to understand your options.',
        bgClass: 'bg-amber-500',
    },
    'not-fit': {
        emoji: '—',
        headline: 'A HELOC may not be the strongest fit right now.',
        description: 'Based on what you shared, a HELOC might not be the best path at this time. That said, everyone\'s situation is different, and there may be other options worth considering. We\'re glad you took the time to check.',
        bgClass: 'bg-zinc-400',
    },
}

function ResultScreen({ result, firstName, onRestart }: ResultScreenProps) {
    const content = resultContent[result]

    return (
        <div className="bg-background flex min-h-screen flex-col">
            <header className="border-b">
                <div className="mx-auto flex h-14 max-w-5xl items-center px-6">
                    <Link href="/" aria-label="home"><Logo uniColor /></Link>
                </div>
            </header>
            <main className="flex flex-1 items-center justify-center px-6 py-16">
                <div className="mx-auto max-w-lg text-center">
                    <div className={cn('mx-auto mb-6 flex size-14 items-center justify-center rounded-full text-xl font-bold text-white', content.bgClass)}>
                        {content.emoji}
                    </div>
                    <h1 className="text-foreground text-balance text-2xl font-semibold md:text-3xl">
                        {firstName ? `${firstName}, ${content.headline.charAt(0).toLowerCase()}${content.headline.slice(1)}` : content.headline}
                    </h1>
                    <p className="text-muted-foreground mx-auto mt-4 max-w-md text-balance">
                        {content.description}
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-3">
                        {result !== 'not-fit' && (
                            <Button className="h-11 rounded-full bg-sky-500 px-8 text-white hover:bg-sky-600">
                                Connect With a Specialist
                            </Button>
                        )}
                        <Button variant="ghost" onClick={onRestart} className="rounded-full text-sm">
                            Start over
                        </Button>
                    </div>
                    <p className="text-muted-foreground mt-12 text-xs">
                        This is a preliminary assessment only and does not constitute a loan offer, approval, or financial advice. All lending decisions are made by licensed partners.
                    </p>
                </div>
            </main>
        </div>
    )
}
