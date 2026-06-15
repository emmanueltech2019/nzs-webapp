'use client'
import React, { useRef, useState } from 'react'
import TextNum from '../custom-components/TextNum'
import CustomButton from '../custom-components/CustomButton';
import { ChevronDown, X } from 'lucide-react';
import { useProvider } from '@/context/ServicesContext';

type Props = {}

const LegalAtoz = (props: Props) => {
  const customButtonArray = ["NNEKA IBE", "KEMI OJO", "CHUKWUDI MADUABUCHI", "RUKAYYA DANJUMA", "EREKOSIMA IKIRIKO"];
  const careTypeArray = ["Diagnostics", "Surgery", "Post-Surgery"];

  const [active, setActive] = useState<string>("")
  const dropRef = useRef<(HTMLDivElement | null)[]>([])

  const {legalDataList} = useProvider()

  return (
    <div className='text-black flex flex-col gap-5 py-10'>
      <TextNum text='Your Providers' number={9} />
      <div className="flex flex-wrap gap-3">
        {customButtonArray.map((button, index) => (
          <CustomButton text={button} key={index} />
        ))}        
      </div>
      {legalDataList.length > 0 && (
        <>
          {legalDataList.map((data, index) => (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col p-3 bg-[#f8f9fe] rounded-xl">
                <div onClick={() => setActive(index.toString())} className={`flex justify-between items-center gap-5`}>
                    <div className="flex items-center gap-2">
                    <div className="md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center text-white bg-[#ebeded]">
                        <X strokeWidth={1} />
                    </div>
                    <p className="md:text-md text-sm">{data.LegalSpecialtyTitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                    <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">75% Booked</div>
                    <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">EDIT SPECIALTY</div>
                    <ChevronDown strokeWidth={1} />
                    </div>
                </div>
                <div className={`bg-white transition-all duration-200 rounded-xl flex flex-col gap-3 overflow-hidden mt-3 ${active === index.toString() ? "h-auto" : "h-0"}`}>
                    <p className="text-sm md:text-md text-[#c3cad9] p-3">{data.LegalBrieflyDescribe}</p>
                    <div className="flex gap-3 items-center justify-between p-3 flex-wrap">
                    </div>
                    <div className="flex flex-col gap-5 p-3">
                        {
                            data.legalProviderName.map((providerName, index) => (
                                <div className={`justify-between items-center ${index === 0 ? "hidden" : "flex"}`}>
                                    <div className="flex items-center gap-5">
                                        <div className="md:w-8 md:h-8 w-6 h-6 md:text-md text-sm rounded-full bg-[#ebeded]/20 flex justify-center items-center">{index}</div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-semibold">{providerName}</p>
                                            <p className="text-sm font-light">MD FACS.</p>
                                        </div>
                                    </div>
                                    <p>BOOKED</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default LegalAtoz