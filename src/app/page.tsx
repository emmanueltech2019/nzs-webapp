import Home from '@/app/_components/Home'
import Counter from '@/components/Counter'
import FeaturesCard from '@/components/cards/FeaturesCard'
import ProductSales from './_components/ProductSales'
import EfficientDelivery from './_components/EfficientDelivery'
import BusinessAnalysis from './_components/BusinessAnalysis'
import Testimonials from './_components/Testimonials'
import Simplify from './_components/Simplify'
import Footer from '@/components/Footer'
import TawkToChat from '@/components/Tawk'
import { Suspense } from 'react'

const bgImg = "bg-bgImage bg-cover bg-center h-full"

export default function Page() {
  return (
     <Suspense fallback={<div>Loading...</div>}>
        <div className="Landing-Page">
                  <TawkToChat/>
          <Home />
          {/* <Counter /> */}
          <div className='text-center pt-[60px] lg:pt-[100px] pb-4 lg:pb-[14px]'><span className='px-[36.25px] py-[10.88px] rounded-[18.13px] opacity-60 text-sm lg:text-[13.05px] lg:leading-[19.58px] bg-[--foreground-light-orange2]'>Nigeria’s First Ultra-sales <span className='font-bold'>Platform</span></span></div>
          <FeaturesCard />
          <ProductSales />
          <EfficientDelivery />
          <BusinessAnalysis />
          <Testimonials />
          <Simplify />
          <Footer />
        </div>
     </Suspense>
  )
}
