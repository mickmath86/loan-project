'use client'

import { QuizData } from '../types'
import { OptionCard } from '../components/option-card'
import { StepWrapper, QuestionGroup } from '../components/step-wrapper'
import { CreditCard, Hammer, GraduationCap, Banknote, HelpCircle, TrendingDown } from 'lucide-react'

const goalOptions = [
    { value: 'consolidate-debt', label: 'Consolidate credit card or high-interest debt', icon: <CreditCard className="size-4" />, description: 'Use home equity to potentially lower what you pay each month.' },
    { value: 'home-renovation', label: 'Fund a home renovation or improvement', icon: <Hammer className="size-4" />, description: 'Tap into equity to upgrade or repair your home.' },
    { value: 'access-cash', label: 'Access cash for a major expense', icon: <Banknote className="size-4" />, description: 'Tuition, medical bills, business investment, or other needs.' },
    { value: 'lower-mortgage', label: 'Lower my mortgage payment', icon: <TrendingDown className="size-4" />, description: 'Explore whether refinancing could reduce your monthly payment.' },
    { value: 'not-sure', label: 'I\'m not sure yet — just exploring', icon: <HelpCircle className="size-4" />, description: 'No problem. We\'ll help you figure out what makes sense.' },
]

interface StepProps {
    data: QuizData
    onChange: (updates: Partial<QuizData>) => void
}

export function Step1({ data, onChange }: StepProps) {
    return (
        <StepWrapper
            title="What are you looking to do?"
            subtitle="This helps us understand which options might work best for your situation.">

            <QuestionGroup label="">
                <div className="grid gap-2">
                    {goalOptions.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            description={option.description}
                            icon={option.icon}
                            selected={data.primaryGoal === option.value}
                            onClick={() => onChange({ primaryGoal: option.value })}
                        />
                    ))}
                </div>
            </QuestionGroup>
        </StepWrapper>
    )
}
