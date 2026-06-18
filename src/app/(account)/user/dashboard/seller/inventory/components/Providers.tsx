'use client'
import React, { useRef, useState } from 'react'
import TextNum from '../custom-components/TextNum'
import CustomButton from '../custom-components/CustomButton';
import { ChevronDown, X } from 'lucide-react';
import CustomSwitchPatient from '../custom-components/CustomSwitchPatient';
import { useProvider } from '@/context/ServicesContext';

type Props = {}

const Providers = (props: Props) => {
  const {healthDataList} = useProvider();
  const dropRef = useRef<(HTMLDivElement | null)[]>([])

  const [active, setActive] = useState<string | null>(null)
  const [activeSwitch, setActiveSwitch] = useState<string>("IN-PATIENT")
  const switchArray = ["IN-PATIENT", "OUT-PATIENT"]
  return (
    <div className='text-black flex flex-col gap-5 py-10'>
      <div className="flex flex-col gap-5">
        <CustomSwitchPatient setActive={setActiveSwitch} switchTextArray={switchArray} active={activeSwitch}  />
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
    </div>
  )
}

export default Providers