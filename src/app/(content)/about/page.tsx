import type { Metadata } from "next";
import Counter from '@/components/Counter'
import About from './_components/About'
import OurTeam from './_components/OurTeam'
import Footer from '@/components/Footer'
import OurPartners from './_components/OurPartners'
import CorePrinciples from './_components/CorePrinciples'

export const metadata: Metadata = {
  title: "NaijaZone | About",
  description: "About Page for NaijaZone",
};

export default function page() {
  return (
    <div>
        <About />
        <Counter />
        <OurTeam />
        <OurPartners />
        <CorePrinciples />
        <Footer />
    </div>
  )
}
