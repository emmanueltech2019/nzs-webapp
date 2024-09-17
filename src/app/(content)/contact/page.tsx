import Counter from "@/components/Counter"
import Contact from "./_components/Contact"
import Footer from "@/components/Footer"
import ContactDetails from "./_components/ContactDetails"
import ContactMap from "./_components/ContactMap"

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
