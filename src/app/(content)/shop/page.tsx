import type { Metadata } from "next";
import Counter from '@/components/Counter'
import About from './_components/About'
import OurTeam from './_components/OurTeam'
import Footer from '@/components/Footer'
import OurPartners from './_components/OurPartners'
import CorePrinciples from './_components/CorePrinciples'
import ProductsView from "@/components/Counter";
import { Suspense } from "react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "NaijaZone | Shopp",
  description: "Shop for NaijaZone products",
};

export default function page() {
  return (
    <>
    <Script
        id="naijazone-about-conversion"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'conversion_event_page_view', {
              // Recommended: Pass actual parameters to measure engagement or value
              page_title: 'NaijaZone About',
              send_to: '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}'
            });
          `,
        }}
      />
    <Suspense fallback={<div>Loading...</div>}>
        <About />
        <ProductsView />
        {/* <OurTeam />
        <OurPartners />
        <CorePrinciples /> */}
        <Footer />
    </Suspense>
    </>
  )
}
