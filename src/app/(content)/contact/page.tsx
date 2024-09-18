import type { Metadata } from "next";
import Counter from "@/components/Counter"
import Contact from "./_components/Contact"
import Footer from "@/components/Footer"
import ContactDetails from "./_components/ContactDetails"
import ContactMap from "./_components/ContactMap"

export const metadata: Metadata = {
  title: "NaijaZone | Contact",
  description: "Contact Page for NaijaZone",
};

export default function page() {
  return (
    <div>
        <Contact />
        <Counter />
        <ContactDetails />
        <ContactMap />
        <Footer />
    </div>
  )
}
