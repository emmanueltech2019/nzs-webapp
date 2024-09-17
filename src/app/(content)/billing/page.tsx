import Counter from "@/components/Counter";
import Pricing from "./_components/Pricing";
import FeaturesCard from "@/components/cards/FeaturesCard";
import Footer from "@/components/Footer";
import Details from "./_components/Details";

export default function page() {
  return (
    <div className="Billing-Page">
        <Pricing />
        <Counter />
        <Details />
        <FeaturesCard shadow />
        <Footer />
    </div>
  )
}
