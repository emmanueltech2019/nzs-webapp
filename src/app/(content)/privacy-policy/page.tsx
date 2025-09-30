import type { Metadata } from "next";
import About from './_components/Headers'
import OurTeam from './_components/PrivacyPolicy'
import Footer from '@/components/Footer'


export const metadata: Metadata = {
  title: "NaijaZone | About",
  description: "About Page for NaijaZone",
};

export default function page() {
  return (
    <div>
        <About />
        <OurTeam />
        <Footer />
    </div>
  )
}
