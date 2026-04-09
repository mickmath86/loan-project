'use client'

import { cn } from '@/lib/utils'
import { STEPS } from '../types'

interface ProgressBarProps {
    currentStep: number
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
    const totalSteps = STEPS.length
    const progress = (currentStep / totalSteps) * 100

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Step {currentStep} of {totalSteps}</span>
                <span className="text-muted-foreground">{STEPS[currentStep - 1]?.title}</span>
            </div>
            <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                <div
                    className="h-full rounded-full bg-sky-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}
