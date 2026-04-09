import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

const faqItems = [
    {
        group: 'About HELOCs',
        items: [
            {
                id: 'item-1',
                question: 'What is a HELOC?',
                answer: 'A HELOC (Home Equity Line of Credit) is a loan that lets you borrow against the equity you\'ve built in your home. It works similarly to a credit card — you have a credit limit and can draw from it as needed — but typically at a much lower interest rate.',
            },
            {
                id: 'item-2',
                question: 'Will this replace my current mortgage?',
                answer: 'No. A HELOC is a separate line of credit that sits alongside your existing mortgage. Your first mortgage stays in place. You\'re simply accessing some of the equity your home has gained over time.',
            },
            {
                id: 'item-3',
                question: 'How much home equity do I typically need?',
                answer: 'Most lenders look for at least 15–20% equity in your home after accounting for your existing mortgage. The exact amount varies by lender, your credit profile, and your property.',
            },
        ],
    },
    {
        group: 'Process & Privacy',
        items: [
            {
                id: 'item-4',
                question: 'Will checking my fit affect my credit score?',
                answer: 'No. Our initial fit check does not require a credit pull. If you decide to move forward with a lending partner, they may run a credit check at that stage — but that\'s your choice and comes later in the process.',
            },
            {
                id: 'item-5',
                question: 'How long does the process take?',
                answer: 'The initial fit check takes about 2 minutes. If you choose to connect with a lending partner, the HELOC application and approval process typically takes 2–6 weeks depending on the lender and your situation.',
            },
            {
                id: 'item-6',
                question: 'What if a HELOC isn\'t the right fit for me?',
                answer: 'That\'s completely fine. The whole point of this tool is to help you understand your options before committing to anything. If a HELOC doesn\'t look like a good match, you\'ll know — and there\'s zero obligation to move forward.',
            },
            {
                id: 'item-7',
                question: 'Who makes the final lending decisions?',
                answer: 'Licensed lending partners handle all underwriting and approval decisions. We help you understand whether it may be worth exploring, but we are not a lender and do not make credit or lending decisions.',
            },
        ],
    },
]

export default function FAQs() {
    return (
        <section id="faqs" className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-1 md:px-6">
                <div className="grid max-md:gap-8 md:grid-cols-5 md:divide-x md:border">
                    <div className="max-w-lg max-md:px-6 md:col-span-2 md:p-10 lg:p-12">
                        <h2 className="text-foreground text-4xl font-semibold">FAQs</h2>
                        <p className="text-muted-foreground mt-4 text-balance text-lg">Common questions about HELOCs and debt consolidation</p>
                        <p className="text-muted-foreground mt-6 max-md:hidden">
                            Have another question?{' '}
                            <Link
                                href="#cta"
                                className="text-sky-500 font-medium hover:underline">
                                Get in touch
                            </Link>
                        </p>
                    </div>

                    <div className="space-y-12 md:col-span-3 md:px-4 md:pb-4 md:pt-10 lg:pt-12">
                        {faqItems.map((item) => (
                            <div
                                className="space-y-4"
                                key={item.group}>
                                <h3 className="text-foreground pl-6 text-lg font-semibold">{item.group}</h3>
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="-space-y-1">
                                    {item.items.map((item) => (
                                        <AccordionItem
                                            key={item.id}
                                            value={item.id}
                                            className="data-[state=open]:bg-card data-[state=open]:ring-border data-[state=open]:shadow-black/6.5 group peer rounded-xl border-none px-6 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm data-[state=open]:ring-1">
                                            <AccordionTrigger className="not-group-last:border-b cursor-pointer rounded-none text-base transition-none hover:no-underline data-[state=open]:border-transparent hover:[&>svg]:translate-y-1 hover:data-[state=open]:[&>svg]:translate-y-0">{item.question}</AccordionTrigger>
                                            <AccordionContent>
                                                <p className="text-muted-foreground text-base">{item.answer}</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-muted-foreground mt-12 px-6 md:hidden">
                    Have another question?{' '}
                    <Link
                        href="#cta"
                        className="text-sky-500 font-medium hover:underline">
                        Get in touch
                    </Link>
                </p>
            </div>
        </section>
    )
}
