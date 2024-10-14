import React, { FC } from 'react'
import Image from 'next/image'
import productImg from './img/image.png'
import { Poppins } from 'next/font/google'
import { Icon } from '@iconify/react/dist/iconify.js'

const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  // variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const SellerAccordion: React.FC<{}> = () => {
  return (
    <div>
      <div className='bg-[#F8F9FE] p-4 rounded-lg'>
        <header>
          {/* product image */}
          <div>
            <Image src={productImg} alt="alt" />
          </div>

          <div className='flex justify-between items-center my-2 py-2 border-b-[#0C1F1F0A] border-b-[1px]'>
            <div>
              <h1 className={`text-xs font-semibold text-[#0C1F1F] ${poppins.className} antialiased`}>PRODUCT DETAILS</h1>
            </div>

            {/* status and accordion toggle button */}
            <div className='flex items-center gap-2'>
              {/* status */}
              <div>
                <button className='bg-[#20E58A] py-1 px-4 font-sans font-normal rounded-[15px] text-[9px] text-[#0C1F1F] leading-[12.26px] '>INCOMING</button>
              </div>

              {/* toggle */}
              <div>
                <Icon icon="tabler:chevron-down" className='text-[#0C1F1F80] cursor-pointer'></Icon>
              </div>
            </div>
          </div>
        </header>

        {/* product details */}
        <div className='grid grid-cols-2'>
          {/* col 1 */}
          <div>
            {/* product type */}
            <div>
              <p className='text-[#0C1F1F40] text-[9px]  leading-[12.26px] font-normal font-sans'>Product Type</p>
              <h2 className='text-[11px] text-[#0C1F1F] font-normal font-sans pt-1 pb-2'>Shoes</h2>
            </div>

            {/* description */}
            <div className='mt-[5px]'>
              <p className='text-[#0C1F1F40] text-[9px]  leading-[12.26px] font-normal font-sans'>Description</p>
              <p className='text-[#71727A] text-[10px] leading-4 font-sans w-[113px] py-1'>The perfect T-shirt for
                when you want to feel
                at ease but still stylish...</p>
            </div>
            {/* estimated arrival */}
            <div>
              <p className='text-[#0C1F1F40] text-[9px]  leading-[12.26px] font-normal font-sans'>Estimated Arrival</p>
              <h2 className='text-[11px] text-[#0C1F1F] font-normal font-sans py-1'>11 Hours</h2>
            </div>
          </div>

          {/* col 2 */}
          <div>
            {/* time */}
            <div>
              <div className='border-[1px] border-[#00683880] rounded-[4px] py-1 px-2 w-[97px]'>
                <p className='text-[9px] leading-[12.26px] font-sans font-normal text-[#0C1F1F] '>8:00 AM - 11:00 AM</p>
              </div>
              <h2 className='text-[11px] text-[#0C1F1F] font-normal font-sans py-1'>September 30, 2024</h2>
            </div>


            {/* approximate distance */}
            <div>
              <p className='text-[#0C1F1F40] text-[9px]  leading-[12.26px] font-normal font-sans'>Order Location</p>
              <h2 className='text-[11px] text-[#0C1F1F] font-normal font-sans'>Umahia, Abia</h2>
            </div>

            {/* order location */}
            <div className='mt-[37px]'>
              <p className='text-[#0C1F1F40] text-[9px]  leading-[12.26px] font-normal font-sans py-1'>Approximate Distance</p>
              <h2 className='text-[11px] text-[#0C1F1F] font-normal font-sans py-[3px]'>500 km</h2>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default SellerAccordion