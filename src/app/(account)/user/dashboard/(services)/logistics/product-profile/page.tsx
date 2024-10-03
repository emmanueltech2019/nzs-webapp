'use client'
import { Icon } from "@iconify/react/dist/iconify.js"
import Image from "next/image"
import { FC, useState } from "react"
import producImage from '@/assets/images/product-profile.png'
import ProductProfileTab from "@/components/tabs/ProductProfileTab"
import SimilarServices from "@/components/carousel/SimilarServices"
import { Rubik } from "next/font/google"

const rubik = Rubik({
  display: "swap",
  subsets: ["latin"],
  // variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

type pagePropsType = {

}


const page: FC<pagePropsType> = () => {
  const [active, setActive] = useState('profile')
  return (
    <div>
      <div className="product-image relative ">
        <button className="absolute top-6 left-3 ">
          <Icon icon='mingcute:close-fill' className="text-[#2F3036] text-[25px]" />
        </button>
        <Image src={producImage} alt='product image' className="w-full" />
      </div>
      <ProductProfileTab activeTab={active} setActiveTab={setActive} />

      <header className=" px-2">
        <h1 className="font-[900] text-lg text-[#1F2024] ">Libmot Technologies</h1>
      </header>

      <div className="my-6 px-2 flex items-center gap-3">
        <div className="bg-[#C8C8F426] py-2 px-3 rounded-lg">
          <p className="text-[#101010] text-xs font-medium">Maternity</p>
        </div>
        <div className="bg-[#C8C8F426] py-2 px-3 rounded-lg">
          <p className="text-[#101010] text-xs font-normal">Diagnostics</p>
        </div>
        <div className="bg-[#C8C8F426] py-2 px-3 rounded-lg">
          <p className="text-[#101010] text-xs font-normal">4.5</p>
        </div>
      </div>

      <div className="px-2 mb-10">
        <p className="text-[#71727A] text-xs font-normal">The perfect T-shirt for when you want to feel comfortable but still stylish. Amazing for all occasions.
          Made of 100% cotton fabric in four colours. Its modern style gives a lighter look to the outfit. Perfect for the warmest days.</p>
      </div>

      {/* carousel */}
      <section>
        <header className="flex items-center justify-between px-2 mb-4">
          <h2 className="font-sans font-[900] text-sm">Similar Services</h2>
          <p className="text-[#00683880] text-xs">See more</p>
        </header>

        <SimilarServices />
      </section>

      {/* Review */}
      <section>
        <div className="flex gap-3 my-[9.4px]">
          {/* profile img */}
          <div className='py-2 block justify-center items-center w-full'>
            <div className='bg-[#EAF2FF] w-[34px] h-[34px] m-auto rounded-full overflow-hidden'>
              <Icon icon="mingcute:user-2-fill" className='relative top-[12px] left-[5px] text-[#E09427] text-[24px]'></Icon>
            </div>
          </div>

          {/* review text */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm text-[#573926] font-medium">Monye Fubara</h3>
              <span className="text-sm text-[#707070] font-normal">.</span>
              <p className="text-xs text-[#707070] font-normal">1hr ago</p>
            </div>
            <p className={`text-[13px] text-[#573926] font-normal ${rubik.className} antialiased`}>Their timely and reliable delivery service helped us streamline our operations and meet customer demands faster than ever. With real-time tracking and exceptional customer support, we never have to worry about where our shipments are.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page