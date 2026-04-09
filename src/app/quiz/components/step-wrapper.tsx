'use client'

interface StepWrapperProps {
    title: string
    subtitle: string
    children: React.ReactNode
}

export function StepWrapper({ title, subtitle, children }: StepWrapperProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-foreground text-xl font-semibold">{title}</h2>
                <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>
            </div>
            <div className="space-y-5">
                {children}
            </div>
        </div>
    )
}

interface QuestionGroupProps {
    label: string
    children: React.ReactNode
}

export function QuestionGroup({ label, children }: QuestionGroupProps) {
    return (
        <fieldset className="space-y-3">
            <legend className="text-foreground text-sm font-medium">{label}</legend>
            {children}
        </fieldset>
    )
}
