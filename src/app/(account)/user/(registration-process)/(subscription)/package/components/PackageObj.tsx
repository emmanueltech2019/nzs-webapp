import React from 'react'
import { Inter } from "next/font/google";
import { Icon } from '@iconify/react';
const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  // variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const PackageObj = [
  {
    package: (<div className='relative premium h-[69px] p-4 rounded-2xl bg-[#FFEFC5] flex items-center gap-2'>
      <div className='rounded-full bg-[#006838] p-1 absolute -top-2 -right-2'>
        <Icon icon="eva:star-fill" className='text-white'></Icon>
      </div>
      <div className="radio-check w-4 h-4 rounded-full bg-[#006838] border-[1px] flex justify-center items-center">
        <div className="dot bg-white h-[5px] w-[5px] rounded-full"></div>
      </div>

      <div className="details w-[90%]">
        <header className='flex justify-between items-center font-sans'>
          <h3 className='text-[14px] font-[800]'>Premium</h3>
          <h3 className='text-[16px] font-[800]'>₦ 150,875</h3>
        </header>
        <div className={`period flex justify-between items-center ${inter.className} font-[400] text-[10px] leading-[14px] mt-[4px]`}>
          <p className='text-[#006838]'>-66% discount</p>
          <p>every month</p>
        </div>
      </div>
    </div>)
  },
  {
    package: (<div className='gold h-[69px] p-4 rounded-2xl bg-[#F0B92B] flex items-center gap-2'>

      <div className="radio-check w-4 h-4 rounded-full bg-[#ffffff] border-[1px] flex justify-center items-center">
        <div className="dot bg-white h-[5px] w-[5px] rounded-full"></div>
      </div>

      <div className="details w-[90%]">
        <header className='flex justify-between items-center font-sans'>
          <h3 className='text-[14px] font-[800]'>Gold</h3>
          <h3 className='text-[16px] font-[800]'>₦ 90,375</h3>
        </header>
        <div className={`period flex justify-between items-center ${inter.className} font-[400] text-[10px] leading-[14px] mt-[4px]`}>
          <p className='text-[#006838]'>-66% discount</p>
          <p>every month</p>
        </div>
      </div>
    </div>)
  },
  {
    package: (<div className=' silver h-[69px] p-4 rounded-2xl bg-[#F5F5F5] flex items-center gap-2 border-[#D4D6DD] border-[0.5px]'>

      <div className="radio-check w-4 h-4 rounded-full border-[1.5px] border-[#D4D6DD] flex justify-center items-center">
        <div className="dot  h-[5px] w-[5px] rounded-full"></div>
      </div>

      <div className="details w-[90%]">
        <header className='flex justify-between items-center font-sans'>
          <h3 className='text-[14px] font-[800]'>Silver</h3>
          <h3 className='text-[16px] font-[800]'>₦ 33,875</h3>
        </header>
        <div className={`period flex justify-between items-center ${inter.className} font-[400] text-[10px] leading-[14px] mt-[4px]`}>
          <p className='text-[#006838]'>-53% discount</p>
          <p>every month</p>
        </div>
      </div>
    </div>)
  },
  {
    package: (<div className='bronze h-[69px] p-4 rounded-2xl bg-[#FFEFC5] flex items-center gap-2 border-[#DDB78A] border-[0.5px]'>

      <div className="radio-check w-4 h-4 rounded-full border-[1.5px] border-[#D4D6DD] flex justify-center items-center">
        <div className="dot h-[5px] w-[5px] rounded-full"></div>
      </div>

      <div className="details w-[90%]">
        <header className='flex justify-between items-center font-sans'>
          <h3 className='text-[14px] font-[800]'>Bronze</h3>
          <h3 className='text-[16px] font-[800]'>₦ 20,875</h3>
        </header>
        <div className={`period flex justify-between items-center ${inter.className} font-[400] text-[10px] leading-[14px] mt-[4px]`}>
          <p className='text-[#006838]'>-53% discount</p>
          <p>every month</p>
        </div>
      </div>
    </div>)
  },
  {
    package: (<div className='access h-[69px] p-4 rounded-2xl flex items-center gap-2 border-[#D4D6DD] border-[0.5px]'>

      <div className="radio-check w-4 h-4 rounded-full border-[1.5px] border-[#D4D6DD] flex justify-center items-center">
        <div className="dot bg-white h-[5px] w-[5px] rounded-full"></div>
      </div>

      <div className="details w-[90%]">
        <header className='flex justify-between items-center font-sans'>
          <h3 className='text-[14px] font-[800]'>Access</h3>
          <h3 className='text-[16px] font-[800]'>₦ 10,375</h3>
        </header>
        <div className={`period flex justify-between items-center ${inter.className} font-[400] text-[10px] leading-[14px] mt-[4px]`}>
          <p className='text-[#006838]'></p>
          <p>every month</p>
        </div>
      </div>
    </div>)
  },
]