'use client'

import { QuizData, AddressComponents } from '../types'
import { OptionCard } from '../components/option-card'
import { StepWrapper, QuestionGroup } from '../components/step-wrapper'
import { AddressAutocomplete } from '../components/address-autocomplete'
import { Home, Building2, Building, Castle } from 'lucide-react'

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

export function Step2({ data, onChange }: StepProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

    const handleAddressChange = (address: AddressComponents) => {
        onChange({ address })
    }

    return (
        <StepWrapper
            title="Your Property"
            subtitle="Tell us about your home so we can check what options may be available.">

            <QuestionGroup label="What is your home address?">
                <AddressAutocomplete
                    value={data.address}
                    onChange={handleAddressChange}
                    apiKey={apiKey}
                />
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
