'use client'

import { cn } from '@/lib/utils'

interface OptionCardProps {
    label: string
    description?: string
    selected: boolean
    onClick: () => void
    icon?: React.ReactNode
}

export function OptionCard({ label, description, selected, onClick, icon }: OptionCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'group relative w-full cursor-pointer rounded-xl border p-4 text-left transition-all duration-150',
                'ring-1 ring-transparent',
                selected
                    ? 'border-sky-500 bg-sky-50 ring-sky-500 dark:bg-sky-950/20'
                    : 'border-border bg-card hover:border-foreground/20 hover:bg-muted/30'
            )}>
            <div className="flex items-center gap-3">
                {icon && <div className="text-muted-foreground shrink-0">{icon}</div>}
                <div className="flex-1">
                    <div className={cn('text-sm font-medium', selected ? 'text-sky-700 dark:text-sky-300' : 'text-foreground')}>
                        {label}
                    </div>
                    {description && (
                        <div className="text-muted-foreground mt-0.5 text-xs">{description}</div>
                    )}
                </div>
                <div className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    selected
                        ? 'border-sky-500 bg-sky-500'
                        : 'border-foreground/20'
                )}>
                    {selected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </div>
            </div>
        </button>
    )
}
