'use client'

import { QuizData } from '../types'
import { OptionCard } from '../components/option-card'
import { StepWrapper, QuestionGroup } from '../components/step-wrapper'
import { Zap, CalendarDays, Clock, HelpCircle } from 'lucide-react'

const timelineOptions = [
    { value: 'asap', label: 'As soon as possible', icon: <Zap className="size-4" /> },
    { value: '1-3-months', label: 'In the next 1–3 months', icon: <CalendarDays className="size-4" /> },
    { value: 'no-rush', label: 'No rush — just researching', icon: <Clock className="size-4" /> },
    { value: 'not-sure', label: 'Not sure yet', icon: <HelpCircle className="size-4" /> },
]

const helpOptions = [
    { value: 'yes', label: 'Yes, I\'d like to connect with a specialist', description: 'A licensed lending partner can walk you through your options.' },
    { value: 'maybe', label: 'Maybe — show me my results first', description: 'See your fit assessment before deciding on next steps.' },
    { value: 'no', label: 'No thanks, just show my results', description: 'We\'ll share what we found — no follow-up required.' },
]

interface StepProps {
    data: QuizData
    onChange: (updates: Partial<QuizData>) => void
}

export function Step5({ data, onChange }: StepProps) {
    return (
        <StepWrapper
            title="Timing"
            subtitle="No rush — just helps us understand where you are.">

            <QuestionGroup label="How soon are you hoping to make a decision?">
                <div className="grid gap-2 sm:grid-cols-2">
                    {timelineOptions.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            icon={option.icon}
                            selected={data.decisionTimeline === option.value}
                            onClick={() => onChange({ decisionTimeline: option.value })}
                        />
                    ))}
                </div>
            </QuestionGroup>

            <QuestionGroup label="Would you like help reviewing your options?">
                <div className="grid gap-2">
                    {helpOptions.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            description={option.description}
                            selected={data.wantHelp === option.value}
                            onClick={() => onChange({ wantHelp: option.value })}
                        />
                    ))}
                </div>
            </QuestionGroup>
        </StepWrapper>
    )
}
