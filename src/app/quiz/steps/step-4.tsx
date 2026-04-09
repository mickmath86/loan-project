'use client'

import { QuizData } from '../types'
import { OptionCard } from '../components/option-card'
import { StepWrapper, QuestionGroup } from '../components/step-wrapper'

const creditScoreRanges = [
    { value: 'excellent', label: 'Excellent (740+)' },
    { value: 'good', label: 'Good (670–739)' },
    { value: 'fair', label: 'Fair (580–669)' },
    { value: 'needs-work', label: 'Needs work (below 580)' },
    { value: 'not-sure', label: 'I\'m not sure' },
]

const employmentOptions = [
    { value: 'employed-w2', label: 'Employed (W-2)' },
    { value: 'self-employed', label: 'Self-employed' },
    { value: 'retired', label: 'Retired' },
    { value: 'other', label: 'Other' },
]

const incomeRanges = [
    { value: 'under-50k', label: 'Under $50,000' },
    { value: '50k-75k', label: '$50,000 – $75,000' },
    { value: '75k-100k', label: '$75,000 – $100,000' },
    { value: '100k-150k', label: '$100,000 – $150,000' },
    { value: 'over-150k', label: 'Over $150,000' },
    { value: 'prefer-not', label: 'Prefer not to say' },
]

interface StepProps {
    data: QuizData
    onChange: (updates: Partial<QuizData>) => void
}

export function Step4({ data, onChange }: StepProps) {
    return (
        <StepWrapper
            title="Your Profile"
            subtitle="A few details to check if this could be a good fit.">

            <QuestionGroup label="What's your estimated credit score range?">
                <div className="grid gap-2 sm:grid-cols-2">
                    {creditScoreRanges.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            selected={data.creditScoreRange === option.value}
                            onClick={() => onChange({ creditScoreRange: option.value })}
                        />
                    ))}
                </div>
            </QuestionGroup>

            <QuestionGroup label="What best describes your employment?">
                <div className="grid gap-2 sm:grid-cols-2">
                    {employmentOptions.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            selected={data.employmentStatus === option.value}
                            onClick={() => onChange({ employmentStatus: option.value })}
                        />
                    ))}
                </div>
            </QuestionGroup>

            <QuestionGroup label="What is your household income range?">
                <div className="grid gap-2 sm:grid-cols-2">
                    {incomeRanges.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            selected={data.householdIncome === option.value}
                            onClick={() => onChange({ householdIncome: option.value })}
                        />
                    ))}
                </div>
            </QuestionGroup>
        </StepWrapper>
    )
}
