'use client'
import React, { useRef, useState } from 'react'
import TextNum from '../custom-components/TextNum'
import CustomButton from '../custom-components/CustomButton';
import { ChevronDown, X } from 'lucide-react';
import { useProvider } from '@/context/ServicesContext';

type Props = {}

const EducationFacilities = (props: Props) => {
  const customButtonArray = ["SENIOR SECONDARY", "PRIMARY", "JUNIOR", "NURSERY", "CRECHE", "PREP SCHOOL", "TUTOR"];
  const careTypeArray = ["Diagnostics", "Surgery", "Post-Surgery"];

  const [addClassPreviewDrop, setAddClassPreviewDrop] = useState<number>(0);
  const dropRef = useRef<(HTMLDivElement | null)[]>([])

  const {classDataList} = useProvider()

  return (
    <div className='text-black flex flex-col gap-5 py-10'>
      <TextNum text='Your Providers' number={9} />
      <div className="flex flex-wrap gap-3">
        {customButtonArray.map((button, index) => (
          <CustomButton text={button} key={index} />
        ))}        
      </div>
      {classDataList.length > 0 && (
        <>
          {classDataList.map((classData, index) => (
            <div onClick={() => setAddClassPreviewDrop(index)} className="bg-gray-100 p-3 rounded-xl flex flex-col gap-3">
                <div className={`flex justify-between items-center gap-5`}>
                    <div className="flex items-center gap-2">
                    <div className="md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center text-white bg-[#ebeded]">
                        <X strokeWidth={1} />
                    </div>
                    <p className="md:text-md text-sm">{classData.classTitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                    <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">75% Booked</div>
                    <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">EDIT COURSE</div>
                    <ChevronDown strokeWidth={1} />
                    </div>
                </div>
                <div ref={(el) => {dropRef.current[index] = el}} className={`bg-white transition-all duration-200 rounded-xl flex flex-col gap-3 overflow-hidden mt-3`}
                    style={{
                      height: addClassPreviewDrop === index ? `${dropRef.current[index]?.scrollHeight}px` : "0px"
                    }}
                  >
                    <p className="text-sm md:text-md text-[#c3cad9] p-3">{classData.classBrieflyDescribe}</p>
                    <div className="flex items-center justify-between p-3">
                    <p className="text-sm md:text-md text-[#c3cad9]/50">Section</p>
                    <CustomButton text={classData.classSectionList} background='bg-[#006838] text-white' active={classData.classSectionList} />
                    </div>
                    <div className="flex flex-col gap-5 p-3">
                        {classData.classProviderName.length > 0 && (
                            <>
                                {
                                    classData.classProviderName.map((name, index) => (
                                        <div className={`justify-between items-center ${index === 0 ? "hidden" : "flex"}`} key={index}>
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
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default EducationFacilities