"use client"
import React, { useEffect, useState } from 'react'
import { interests } from './InterestObj'
import { Icon } from '@iconify/react';  
import { useContextStore } from '@/context/SubscriptionContext';
import businessAnalysis_img from '@/assets/images/business-analysis.png'


const Interest = () => {
  interface InterestItem {
    interest: string;
    // Add other properties if needed
  }

  const [check, setCheck] = useState<boolean[]>(new Array(interests.length).fill(true));


  const handleClick = (index: number) => {
    setCheck((prev) => {
      const updatedCheck = [...prev];
      updatedCheck[index] = !updatedCheck[index];
      return updatedCheck;
    });
  };

  const { handleProgressbar, handleImg } = useContextStore()
  useEffect(() => {
    handleImg(businessAnalysis_img);
    handleProgressbar(80);
  }, [handleImg, handleProgressbar]);

  return (
    <div>
      <section>
        <div>
          <header>
            <h1 className=' text-2xl text-[#1F2024] md:text-[40px] md:leading-[48.41px] font-[900] mt-[50px]'>
              Personalize your market experience
            </h1>
            <p className='text-[14px] md:text-[18px] text-[#71727A] leading-[20px] md:leading-[16px] font-[400] mt-[16px]'>
              Choose your interests.
            </p>
          </header>

          <div className="choose-interest flex flex-col gap-2 mt-[41px] mb-[24px]">
            {
              interests.map((item: InterestItem, index: number) => (
                <div key={index} className={`p-4 py-3 flex justify-between rounded-[12px] ${check[index]
                    ? "bg-[#ffffff]"
                    : "bg-[#EAF2FF]"
                  } border-[#C5C6CC] border-[0.5px] cursor-pointer`}
                  onClick={() => handleClick(index)}
                >
                  <p className='text-[14px] text-[#1F2024]'>{item.interest}</p>
                  <div className="checkbox ">
                    <Icon icon="ph:check-bold" className='text-[#006838] text-[14px]'></Icon>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Interest