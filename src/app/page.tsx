import HeroSection from '@/components/hero-section'
import ExpandableFeatures from '@/components/expandable-features-21'
import ExpandableFeatures11 from '@/components/expandable-features-11'
import Comparator from '@/components/comparator-7'
import Faqs from '@/components/faqs-3'
import CallToAction from '@/components/call-to-action'
import Footer from '@/components/footer'

export default function Home() {
    return (
        <>
            <HeroSection />
            <ExpandableFeatures />
            <ExpandableFeatures11 />
            <Comparator />
            <Faqs />
            {/* <CallToAction /> */}
            <Footer />
        </>
    )
}
