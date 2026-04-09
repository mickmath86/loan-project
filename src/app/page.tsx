import HeroSection from '@/components/hero-section'
import SecondaryHero from '@/components/secondary-hero-13'
import HowItWorks from '@/components/how-it-works-7'
import Comparator from '@/components/comparator-7'
import Faqs from '@/components/faqs-3'
import CallToAction from '@/components/call-to-action'
import Footer from '@/components/footer'

export default function Home() {
    return (
        <>
            <HeroSection />
            <SecondaryHero />
            <HowItWorks />
            <Comparator />
            <Faqs />
            {/* <CallToAction /> */}
            <Footer />
        </>
    )
}
