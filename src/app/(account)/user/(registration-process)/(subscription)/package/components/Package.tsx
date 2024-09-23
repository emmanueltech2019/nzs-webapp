'use client'
import React, { useEffect } from 'react'
import { PackageObj } from './PackageObj'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useContextStore } from '@/context/SubscriptionContext'
import ourTeamBanner from "@/assets/images/our-team-banner.svg"


const Package = () => {
  const { handleProgressbar, handleImg } = useContextStore()
  useEffect(() => {
    handleImg(ourTeamBanner);
    handleProgressbar(80);
  }, [handleImg, handleProgressbar]);
  return (
    <div>
      <section>
        <div>
          <header>
            <h1 className=' text-2xl text-[#1F2024] md:text-[40px] md:leading-[48.41px] font-[900] mt-[50px]'>
              Choose your sales package
            </h1>
            <p className='text-[14px] md:text-[18px] text-[#71727A] leading-[20px] md:leading-[16px] font-[400] mt-[16px]'>
              And get a 2-day free trial
            </p>
          </header>

          <div className="packages grid md:grid-cols-2 gap-3 pt-12 pb-6">
            {
              PackageObj.map((item, index) => (
                <div key={index}>{item.package}</div>
              ))
            }
          </div>

          <div className="what-you-get bg-[#F8F9FE] p-6 rounded-2xl mb-[24px]">
            <header className="font-[900] text-[#1F2024] text-[16px] leading-[19.36px]">
              <h2>You'll get:</h2>
            </header>
            <div className='grid md:grid-cols-3 items-start gap-2 mt-[16px]'>
              <div className='flex items-center gap-3'>
                <Icon icon="eva:star-fill" className='text-[#006838] text-[11px]'></Icon>
                <p className='text-[#71727A] font-[400] text-xs'>50,000 all categories listing</p>
              </div>
              <div className='flex gap-3 w-[90%]'>
                <Icon icon="eva:star-fill" className='text-[#006838] text-[11px]'></Icon>
                <p className='text-[#71727A] font-[400] text-xs'>Personalized customer service</p>
              </div>
              <div className='flex gap-3 w-[90%]'>
                <Icon icon="eva:star-fill" className='text-[#006838] text-[11px]'></Icon>
                <p className='text-[#71727A] font-[400] text-xs'>Access to online advert promo</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Package