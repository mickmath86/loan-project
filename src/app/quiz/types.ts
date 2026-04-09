export interface AddressComponents {
    fullAddress: string
    street: string
    city: string
    state: string
    zip: string
    county: string
    placeId: string
    lat: number | null
    lng: number | null
    verified: boolean
}

export interface QuizData {
    // Step 1: Your goal
    primaryGoal: string

    // Step 2: Your property
    address: AddressComponents
    homeType: string
    primaryResidence: string

    // Step 3: Your equity
    homeValue: string
    mortgageBalance: string

    // Step 4: Your debt & finances
    creditCardDebt: string
    creditScoreRange: string
    employmentStatus: string
    householdIncome: string

    // Step 5: Timing & preferences
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

export const emptyAddress: AddressComponents = {
    fullAddress: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    county: '',
    placeId: '',
    lat: null,
    lng: null,
    verified: false,
}

export const initialQuizData: QuizData = {
    primaryGoal: '',
    address: { ...emptyAddress },
    homeType: '',
    primaryResidence: '',
    homeValue: '',
    mortgageBalance: '',
    creditCardDebt: '',
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

export type ProductRecommendation =
    | 'heloc'
    | 'home-equity-loan'
    | 'cash-out-refi'
    | 'personal-loan'
    | 'debt-counseling'
    | 'hold-off'

export type FitLevel = 'strong' | 'possible' | 'not-recommended'

export interface QuizResult {
    fitLevel: FitLevel
    primaryProduct: ProductRecommendation
    secondaryProduct?: ProductRecommendation
    headline: string
    description: string
}

export interface StepConfig {
    id: number
    title: string
    subtitle: string
}

export const STEPS: StepConfig[] = [
    { id: 1, title: 'Your Goal', subtitle: 'What are you looking to accomplish?' },
    { id: 2, title: 'Your Property', subtitle: 'Tell us about your home.' },
    { id: 3, title: 'Your Equity', subtitle: 'Rough estimates are fine — we\'re looking for a general picture.' },
    { id: 4, title: 'Your Finances', subtitle: 'A few details to understand your situation.' },
    { id: 5, title: 'Timing', subtitle: 'No rush — just helps us understand where you are.' },
    { id: 6, title: 'Your Info', subtitle: 'So we can share your results and next steps.' },
]
