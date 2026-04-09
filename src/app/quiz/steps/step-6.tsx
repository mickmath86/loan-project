'use client'

import { QuizData } from '../types'
import { StepWrapper } from '../components/step-wrapper'
import { cn } from '@/lib/utils'

const CONSENT_TEXT = `By clicking "See My Results," I consent to be contacted by phone, email, or text message regarding home equity and debt consolidation options. I understand that this is a preliminary fit check and not a loan application or approval. All lending decisions are made by licensed lending partners. I may opt out at any time. Standard message and data rates may apply.`

interface StepProps {
    data: QuizData
    onChange: (updates: Partial<QuizData>) => void
}

export function Step6({ data, onChange }: StepProps) {
    return (
        <StepWrapper
            title="Your Info"
            subtitle="So we can share your results and next steps.">

            <div className="space-y-4">
                <div>
                    <label htmlFor="firstName" className="text-foreground mb-1.5 block text-sm font-medium">First name</label>
                    <input
                        id="firstName"
                        type="text"
                        placeholder="Your first name"
                        value={data.firstName}
                        onChange={(e) => onChange({ firstName: e.target.value })}
                        className="bg-card ring-foreground/10 text-foreground placeholder:text-muted-foreground w-full rounded-xl border border-transparent px-4 py-3 text-sm shadow ring-1 outline-none focus:ring-sky-500"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="text-foreground mb-1.5 block text-sm font-medium">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={data.email}
                        onChange={(e) => onChange({ email: e.target.value })}
                        className="bg-card ring-foreground/10 text-foreground placeholder:text-muted-foreground w-full rounded-xl border border-transparent px-4 py-3 text-sm shadow ring-1 outline-none focus:ring-sky-500"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="text-foreground mb-1.5 block text-sm font-medium">Phone number</label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={data.phone}
                        onChange={(e) => onChange({ phone: e.target.value })}
                        className="bg-card ring-foreground/10 text-foreground placeholder:text-muted-foreground w-full rounded-xl border border-transparent px-4 py-3 text-sm shadow ring-1 outline-none focus:ring-sky-500"
                    />
                </div>
            </div>

            <div className="ring-foreground/6.5 mt-6 rounded-xl bg-zinc-50 p-4 ring-1 dark:bg-zinc-900">
                <label className="flex cursor-pointer items-start gap-3">
                    <input
                        type="checkbox"
                        checked={data.consentGiven}
                        onChange={(e) => onChange({
                            consentGiven: e.target.checked,
                            consentTimestamp: e.target.checked ? new Date().toISOString() : null,
                            consentText: CONSENT_TEXT,
                        })}
                        className="mt-0.5 size-4 shrink-0 cursor-pointer rounded accent-sky-500"
                    />
                    <span className="text-muted-foreground text-xs leading-relaxed">
                        {CONSENT_TEXT}
                    </span>
                </label>
            </div>
        </StepWrapper>
    )
}
