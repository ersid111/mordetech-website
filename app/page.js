import Navbar         from '../components/layout/Navbar'
import Footer         from '../components/layout/Footer'
import WhatsAppFloat  from '../components/layout/WhatsAppFloat'
import Hero           from '../components/sections/Hero'
import ProblemSection from '../components/sections/ProblemSection'
import SolutionSection from '../components/sections/SolutionSection'
import DemoSection    from '../components/sections/DemoSection'
import CaseStudies    from '../components/sections/CaseStudies'
import Testimonials   from '../components/sections/Testimonials'
import PlansSection   from '../components/sections/PlansSection'
import FinalCTA       from '../components/sections/FinalCTA'

export const metadata = {
  title: 'MordeTech Solutions — Engineering Intelligent Automation',
  description:
    'MordeTech Solutions — AI machine vision, Siemens PLC automation, SCADA/HMI, and IIoT systems. Reduce defects by 94%, improve OEE by 22%. Pune, India.',
  alternates: {
    canonical: 'https://mordetech-solutions.in',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/*
        STORY ARC:
        1. Hero          — Hook: the loss counter creates instant urgency
        2. Problem       — The wound: 3 pain cards quantify the damage
        3. Solution      — Hope: MordeTech as the intelligence layer
        4. Demo          — Proof of concept: live dashboard simulation
        5. Case Studies  — Transformation: real before/after numbers
        6. Testimonials  — Trust: real people, real plants, real results
        7. Plans         — Offer: how to engage, no pricing pressure
        8. Final CTA     — Action: single focused conversion moment
      */}

      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <DemoSection />
        <CaseStudies />
        <Testimonials />
        <PlansSection />
        <FinalCTA />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
