'use client';
import Image from "next/image"
import americanExpress from "@/assets/images/our-partners/american-express.svg"
import konga from "@/assets/images/our-partners/konga.svg"
import saintB from "@/assets/images/our-partners/Saint-B.svg"
import orangeStar from "@/assets/images/our-partners/orange-star.svg"
import ups from "@/assets/images/our-partners/ups.svg"
import dhl from "@/assets/images/our-partners/dhl.svg"
import gig from "@/assets/images/gig-logistics.png"

import { Icon } from "@iconify/react/dist/iconify.js";

const images = [gig]

const OurPartners = () => {
  return (
    <section className={`counter-section -mt-1 py-[43px] px-[--padding-x] bg-[--foreground-light-green] text-[--text-color-light] flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20`}>
      <div className="col text-base lg:text-lg text-[--foreground-green] text-nowrap flex flex-col gap-6">
        <p>From Long-time business relationships</p>
        <h1 className='text-[#393939] text-4xl lg:text-6xl font-semibold'>Our Partners</h1>
        <p>To Happy Investors & Shareholders</p>
        
      </div>
      <div className="col">
        <p className='text-[#6C6C6C]'>We’re proud to collaborate with a diverse network of partners who share our commitment to service excellence. Our partners include trusted delivery services, payment gateways, and a wide range of essential service providers across Nigeria. </p>
        <div className="image-row flex items-center gap-4 pt-4 flex-wrap">
          {images.map((img,i) => <div key={i}><Image src={img} alt="" className={`w-full object-cover`} /></div>)} <button className="text-[#FB9C46] flex items-center gap-2 text-nowrap">View All <span><Icon icon='bi:play-fill' className="inline" /></span></button>
        </div>
      </div>
    </section>
  )
}

export default OurPartners