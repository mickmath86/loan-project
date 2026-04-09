'use client'

import { QuizData } from '../types'
import { OptionCard } from '../components/option-card'
import { StepWrapper, QuestionGroup } from '../components/step-wrapper'
import { Home, Building2, Building, Castle } from 'lucide-react'

const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming',
]

const homeTypes = [
    { value: 'single-family', label: 'Single-family home', icon: <Home className="size-4" /> },
    { value: 'condo', label: 'Condo / Townhome', icon: <Building2 className="size-4" /> },
    { value: 'multi-family', label: 'Multi-family (2–4 units)', icon: <Building className="size-4" /> },
    { value: 'other', label: 'Other', icon: <Castle className="size-4" /> },
]

const residenceOptions = [
    { value: 'yes', label: 'Yes, I live here' },
    { value: 'no', label: 'No, it\'s an investment property' },
    { value: 'second-home', label: 'It\'s a second home' },
]

interface StepProps {
    data: QuizData
    onChange: (updates: Partial<QuizData>) => void
}

export function Step1({ data, onChange }: StepProps) {
    return (
        <StepWrapper
            title="About Your Home"
            subtitle="Let's start with the basics about your property.">

            <QuestionGroup label="What state is the property in?">
                <select
                    value={data.propertyState}
                    onChange={(e) => onChange({ propertyState: e.target.value })}
                    className="bg-card ring-foreground/10 text-foreground w-full rounded-xl border border-transparent px-4 py-3 text-sm shadow ring-1 outline-none focus:ring-sky-500">
                    <option value="">Select a state</option>
                    {US_STATES.map((state) => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </QuestionGroup>

            <QuestionGroup label="What type of home is it?">
                <div className="grid gap-2 sm:grid-cols-2">
                    {homeTypes.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            icon={option.icon}
                            selected={data.homeType === option.value}
                            onClick={() => onChange({ homeType: option.value })}
                        />
                    ))}
                </div>
            </QuestionGroup>

            <QuestionGroup label="Is this your primary residence?">
                <div className="grid gap-2">
                    {residenceOptions.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            selected={data.primaryResidence === option.value}
                            onClick={() => onChange({ primaryResidence: option.value })}
                        />
                    ))}
                </div>
            </QuestionGroup>
        </StepWrapper>
    )
}
