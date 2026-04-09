'use client'

import { QuizData } from '../types'
import { OptionCard } from '../components/option-card'
import { StepWrapper, QuestionGroup } from '../components/step-wrapper'

const homeValueRanges = [
    { value: 'under-200k', label: 'Under $200,000' },
    { value: '200k-400k', label: '$200,000 – $400,000' },
    { value: '400k-600k', label: '$400,000 – $600,000' },
    { value: '600k-800k', label: '$600,000 – $800,000' },
    { value: '800k-1m', label: '$800,000 – $1,000,000' },
    { value: 'over-1m', label: 'Over $1,000,000' },
]

const mortgageRanges = [
    { value: 'under-100k', label: 'Under $100,000' },
    { value: '100k-250k', label: '$100,000 – $250,000' },
    { value: '250k-400k', label: '$250,000 – $400,000' },
    { value: '400k-600k', label: '$400,000 – $600,000' },
    { value: 'over-600k', label: 'Over $600,000' },
    { value: 'paid-off', label: 'Mortgage is paid off' },
]

interface StepProps {
    data: QuizData
    onChange: (updates: Partial<QuizData>) => void
}

export function Step2({ data, onChange }: StepProps) {
    return (
        <StepWrapper
            title="Your Equity"
            subtitle="Rough estimates are fine — we're looking for a general picture.">

            <QuestionGroup label="About what is your home worth?">
                <div className="grid gap-2 sm:grid-cols-2">
                    {homeValueRanges.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            selected={data.homeValue === option.value}
                            onClick={() => onChange({ homeValue: option.value })}
                        />
                    ))}
                </div>
            </QuestionGroup>

            <QuestionGroup label="About how much do you still owe on your mortgage?">
                <div className="grid gap-2 sm:grid-cols-2">
                    {mortgageRanges.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            selected={data.mortgageBalance === option.value}
                            onClick={() => onChange({ mortgageBalance: option.value })}
                        />
                    ))}
                </div>
            </QuestionGroup>
        </StepWrapper>
    )
}
