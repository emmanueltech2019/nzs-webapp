import {FC, useEffect, useState} from 'react'

import interFont from "@/fonts/Inter"
import Carousel from "./Carousel"
import Link from "next/link"
import { Icon } from "@iconify/react/dist/iconify.js"
import Image from "next/image"
import maternityIcon from '@/assets/icons/Child-Care-2--Streamline-Ultimate.svg'
import diagnosticsIcon from '@/assets/icons/Checkup-Diagnostic--Streamline-Ultimate.svg'
import onboardingImage from '@/assets/images/onboarding-image2.svg'
import eclipseImage from '@/assets/images/Ellipse 2.svg'
import rubikFont from "@/fonts/Rubik"
import { useRouter } from 'next/router'

const similarServices = [
    { img: onboardingImage, title: 'UPS Services', price: 12.00 },
    { img: onboardingImage, title: 'DHL Logistics', price: 15.00 },
    { img: onboardingImage, title: 'UPS Services', price: 15.00 },
  ]
  

const Profile:FC = () => {
  return (
    <div className='p-3'>
        <h1 className={`text-[#1F2024] font-black text-lg pb-6 ${interFont}`}>Libmot Technologies</h1>
      <div className="flex gap-2 pb-6">
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
      <p className="md:max-w-[427px] text-[#71727A] font-normal pb-10">The perfect T-shirt for when you want to feel comfortable but still stylish. Amazing for all occasions.
        Made of 100% cotton fabric in four colours. Its modern style gives a lighter look to the outfit. Perfect for the warmest days.
      </p>
      <div className="flex justify-between pb-4">
        <h2 className="font-extrabold ">Similar Services</h2>
        <Link href='' className="text-[#00683880] text-sm">See more</Link>
      </div>
      <Carousel>
        {similarServices.map(({ img, title, price }) => (
          <div key={title} className="slide w-full flex-[0_0_60%] lg:flex-[0_0_40%] bg-[#C8C8F426] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-center max-h-[120px] overflow-hidden">
              <Image src={img} alt={title} className="w-full object-fill" />
            </div>
            <div className="p-4 text-[#1F2024]">
            <h1 className="text-sm font-medium tracking-wide">{title}</h1>
            <p className="text-sm font-extrabold">N {price}.00</p>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="row flex gap-11 py-4">
        <div className="col">
          <div className="image w-[36.71px] md:w-[42px] h-[36.71px] md:h-[42px] overflow-hidden rounded-full">
            <Image src={eclipseImage} alt='product image' className="w-full" />
          </div>
        </div>
        <div className={`col ${rubikFont}`}>
          <div className={`header flex items-center gap-6 md:gap-8 pb-2`}>
            <h3 className="text-[#573926] font-medium text-base">Monye Fubara</h3>
            <p className="text-[#707070] text-sm">&#8226;&nbsp;&nbsp;1 hr ago</p>
          </div>
          <p className={`font-normal pb-4 text-sm text-[#573926]`}>
            Their timely and reliable delivery service helped us streamline our operations and meet customer demands faster than ever. With real-time tracking and exceptional customer support, we never have to worry about where our shipments are.
          </p>
          <div className="reactions flex gap-7 text-sm text-[#707070]">
            <button className="flex items-center gap-[10px]"><Icon icon='ant-design:like-outlined' className="text-[#D6CCC6] text-xl" /> 12</button>
            <button className="flex items-center gap-[10px]"><Icon icon='akar-icons:comment' className="text-[#D6CCC6] text-xl" /> 2</button>
            <button className="ml-auto"><Icon icon='ph:share-fat' className="text-[#D6CCC6] text-xl" /></button>
          </div>
        </div>
      </div>

      <div className="py-6 lg:p-6">
        <button className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95">
          Add A Review
        </button>
      </div>
    </div>
  )
}

export default Profile