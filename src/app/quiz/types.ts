export interface QuizData {
    // Step 1: About your home
    propertyState: string
    homeType: string
    primaryResidence: string

    // Step 2: Your equity
    homeValue: string
    mortgageBalance: string

    // Step 3: Your debt
    creditCardDebt: string
    mainGoal: string

    // Step 4: Your profile
    creditScoreRange: string
    employmentStatus: string
    householdIncome: string

    // Step 5: Timing
    decisionTimeline: string
    wantHelp: string

    // Step 6: Contact + consent
    firstName: string
    email: string
    phone: string
    consentGiven: boolean
    consentTimestamp: string | null
    consentText: string
    source: string
}

export const initialQuizData: QuizData = {
    propertyState: '',
    homeType: '',
    primaryResidence: '',
    homeValue: '',
    mortgageBalance: '',
    creditCardDebt: '',
    mainGoal: '',
    creditScoreRange: '',
    employmentStatus: '',
    householdIncome: '',
    decisionTimeline: '',
    wantHelp: '',
    firstName: '',
    email: '',
    phone: '',
    consentGiven: false,
    consentTimestamp: null,
    consentText: '',
    source: typeof window !== 'undefined' ? window.location.href : '',
}

export type ResultType = 'likely-fit' | 'maybe-fit' | 'not-fit'

export interface StepConfig {
    id: number
    title: string
    subtitle: string
}

export const STEPS: StepConfig[] = [
    { id: 1, title: 'About Your Home', subtitle: 'Let\'s start with the basics about your property.' },
    { id: 2, title: 'Your Equity', subtitle: 'Rough estimates are fine — we\'re looking for a general picture.' },
    { id: 3, title: 'Your Debt', subtitle: 'Help us understand what you\'re working with.' },
    { id: 4, title: 'Your Profile', subtitle: 'A few details to check if this could be a good fit.' },
    { id: 5, title: 'Timing', subtitle: 'No rush — just helps us understand where you are.' },
    { id: 6, title: 'Your Info', subtitle: 'So we can share your results and next steps.' },
]
