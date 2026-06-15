'use client'
import React, { FC, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import TextNum from '../custom-components/TextNum'
import { useProvider } from '@/context/ServicesContext'
import { ChevronDown, X } from 'lucide-react'
import CustomButton from '../custom-components/CustomButton'

interface ServicesProp {
  activeSelection: string,
  setActiveSelection: (selectionId: string) => void
}

const Services: FC<ServicesProp> = ({activeSelection, setActiveSelection}) => {
  const [active, setActive] = useState('cardiology');
  const dropRef = useRef<(HTMLDivElement | null)[]>([]);
  const {healthDataList} = useProvider()
  return (
    <div className='my-5'>
      <TextNum text='Your Service' number={9} />
      <div className="flex items-center flex-wrap gap-3 mt-5">
        <div onClick={() => setActiveSelection('CONSULTATION')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'CONSULTATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          CONSULTATION
        </div>
        <div onClick={() => setActiveSelection('THERAPY')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'THERAPY' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          THERAPY
        </div>
        <div onClick={() => setActiveSelection('SURGERY')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'SURGERY' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          SURGERY
        </div>
        <div onClick={() => setActiveSelection('CALL')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'CALL' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          CALL
        </div>
        <div onClick={() => setActiveSelection('POST - SURGERY')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'POST - SURGERY' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          POST - SURGERY
        </div>
      </div>
       {healthDataList.length > 0 && (
        <>
          {healthDataList.map((healthDataList, index) => (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col p-3 bg-[#f8f9fe] rounded-xl">
                <div onClick={() => setActive(index.toString())} className={`flex justify-between items-center gap-5`}>
                      <div className="flex items-center gap-2">
                      <div className="md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center text-white bg-[#ebeded]">
                          <X strokeWidth={1} />
                      </div>
                      <p className="md:text-md text-sm">{healthDataList.specialtyTitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                      <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">75% Booked</div>
                      <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">EDIT SPECIALTY</div>
                      <ChevronDown strokeWidth={1} />
                      </div>
                </div>
                <div ref={(el) => {dropRef.current[index] = el}} className={`bg-white transition-all duration-200 rounded-xl flex flex-col gap-3 overflow-hidden mt-3`}
                    style={{
                      height: active === index.toString() ? `${dropRef.current[index]?.scrollHeight}px` : '0px'
                    }}
                  >
                    <p className="text-sm md:text-md text-[#c3cad9] p-3">{healthDataList.brieflyDescribe}</p>
                    <div className="flex items-center justify-between p-3">
                    <p className="text-sm md:text-md text-[#c3cad9]/50">Care Type</p>
                    <CustomButton text={healthDataList.procedureType} background='bg-[#006838] text-white' active={healthDataList.procedureType} />
                    </div>
                    <div className="flex gap-3 items-center justify-between p-3 flex-wrap">
                    {healthDataList.careType.map((care, index) => (
                        <CustomButton text={care} key={index} background='bg-[#ebeded]' />
                    ))}
                    </div>
                    <div className="flex flex-col gap-5 p-3">
                        {
                            healthDataList.providerName.map((name, index) => (
                                <div className={`justify-between items-center ${index === 0 ? "hidden" : "flex"}`}>
                                    <div className="flex items-center gap-5">
                                    <div className="md:w-8 md:h-8 w-6 h-6 md:text-md text-sm rounded-full bg-[#ebeded]/20 flex justify-center items-center">{index}</div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold">{name}</p>
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

export default Services
