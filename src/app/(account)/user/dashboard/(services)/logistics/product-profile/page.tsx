'use client'
import { Icon } from "@iconify/react/dist/iconify.js"
import Image from "next/image"
import { FC, useState } from "react"
import producImage from '@/assets/images/product-profile.png'
import maternityIcon from '@/assets/icons/Child-Care-2--Streamline-Ultimate.svg'
import diagnosticsIcon from '@/assets/icons/Checkup-Diagnostic--Streamline-Ultimate.svg'
import ProductProfileTab from "@/components/tabs/ProductProfileTab"
import openSansFont from "@/fonts/OpenSans"
import interFont from "@/fonts/Inter"
import Carousel from "./components/Carousel"
import Link from "next/link"

import onboardingImage from '@/assets/images/onboarding-image2.svg'
import eclipseImage from '@/assets/images/Ellipse 2.svg'

type pagePropsType = {

}

const similarServices = [
  { img: onboardingImage, title: 'UPS Services', price: 12.00 },
  { img: onboardingImage, title: 'DHL Logistics', price: 15.00 },
  { img: onboardingImage, title: 'UPS Services', price: 15.00 },
]


const page: FC<pagePropsType> = () => {
  const [active, setActive] = useState('profile')
  return (
    <div className={openSansFont}>
      <button>
        <Icon icon='mingcute:close-fill' className="text-[#2F3036]" />
      </button>
      <div className="product-image">
        <Image src={producImage} alt='product image' className="w-full" />
      </div>
      <ProductProfileTab activeTab={active} setActiveTab={setActive} />
      <h1 className={interFont}>Libmot Technologies</h1>
      <div className="flex gap-2">
        <p className={`maternity px-3 py-2 flex gap-[6px] text-sm text-[#101010] font-medium rounded-lg bg-[#C8C8F426] ${interFont}`}>
          <Image src={maternityIcon} alt="maternity" className="w-[18px] object-cover" />
          <span>Maternity</span>
        </p>
        <p className={`diagnostics px-3 py-2 flex gap-[6px] text-sm text-[#101010] font-medium rounded-lg bg-[#C8C8F426] ${interFont}`}>
          <Image src={diagnosticsIcon} alt="maternity" className="w-[18px] object-cover" />
          <span>Diagnostics</span>
        </p>
        <p className={`rating px-3 py-2 flex gap-[6px] text-sm text-[#101010] font-medium rounded-lg bg-[#C8C8F426] ${interFont}`}>
          <Icon icon='mingcute:star-fill' className="text-[#FFD33C] text-lg" />
          <span>4.5</span>
        </p>
      </div>
      <p>The perfect T-shirt for when you want to feel comfortable but still stylish. Amazing for all occasions.
        Made of 100% cotton fabric in four colours. Its modern style gives a lighter look to the outfit. Perfect for the warmest days.
      </p>
      <div className="flex justify-between">
        <h2>Similar Services</h2>
        <Link href=''>See more</Link>
      </div>
      <Carousel>
        {similarServices.map(({ img, title, price }) => (
          <div key={title} className="slide w-full flex-[0_40%] bg-[#C8C8F426] rounded-xl overflow-hidden">
            <div className="flex items-center justify-center">
              <Image src={img} alt={title} className="w-full object-cover" />
            </div>
            <h1 className="text-sm font-medium text-[#101010] mt-2">{title}</h1>
            <p className="text-sm font-medium text-[#101010]">N {price}</p>
          </div>
        ))}
      </Carousel>

      <div className="row">
        <div className="col">
          <div className="image w-[42px] h-[42px] overflow-hidden rounded-full">
            <Image src={eclipseImage} alt='product image' className="w-full" />
          </div>
        </div>
        <div className="col">
          <div className="header flex gap-4">
            <h3>Monye Fubara</h3>
            <p className="time">&#8226; 1 hr ago</p>
          </div>
          <p>
          Their timely and reliable delivery service helped us streamline our operations and meet customer demands faster than ever. With real-time tracking and exceptional customer support, we never have to worry about where our shipments are.
          </p>
          <div className="reactions flex gap-7">
            <button className="flex items-center"><Icon icon='ant-design:like-outlined' className="" /> 12</button>
            <button className="flex items-center"><Icon icon='akar-icons:comment' className="" /> 2</button>
            <button className="flex items-center ml-auto"><Icon icon='ph:share-fat' className="" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page