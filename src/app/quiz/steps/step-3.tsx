'use client'

import { QuizData } from '../types'
import { OptionCard } from '../components/option-card'
import { StepWrapper, QuestionGroup } from '../components/step-wrapper'

const debtRanges = [
    { value: 'under-10k', label: 'Under $10,000' },
    { value: '10k-25k', label: '$10,000 – $25,000' },
    { value: '25k-50k', label: '$25,000 – $50,000' },
    { value: '50k-75k', label: '$50,000 – $75,000' },
    { value: '75k-100k', label: '$75,000 – $100,000' },
    { value: 'over-100k', label: 'Over $100,000' },
]

const goalOptions = [
    { value: 'lower-payments', label: 'Lower my monthly payments' },
    { value: 'reduce-interest', label: 'Reduce total interest paid' },
    { value: 'simplify', label: 'Simplify into one payment' },
    { value: 'pay-off-faster', label: 'Pay off debt faster' },
    { value: 'not-sure', label: 'I\'m not sure yet — just exploring' },
]

interface StepProps {
    data: QuizData
    onChange: (updates: Partial<QuizData>) => void
}

export function Step3({ data, onChange }: StepProps) {
    return (
        <StepWrapper
            title="Your Debt"
            subtitle="Help us understand what you're working with.">

            <QuestionGroup label="About how much credit card debt are you carrying?">
                <div className="grid gap-2 sm:grid-cols-2">
                    {debtRanges.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            selected={data.creditCardDebt === option.value}
                            onClick={() => onChange({ creditCardDebt: option.value })}
                        />
                    ))}
                </div>
            </QuestionGroup>

            <QuestionGroup label="What's your main goal?">
                <div className="grid gap-2">
                    {goalOptions.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            selected={data.mainGoal === option.value}
                            onClick={() => onChange({ mainGoal: option.value })}
                        />
                    ))}
                </div>
            </QuestionGroup>
        </StepWrapper>
    )
}
