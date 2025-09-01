'use client'
import React, { FC, useRef, useState } from 'react'
import { Icon } from '@iconify/react'

interface LegalAtozProp {
  activeSelection: string,
  setActiveSelection: (selectionId: string) => void
}

const LegalAtoz: FC<LegalAtozProp> = ({activeSelection, setActiveSelection}) => {
  const [activeSelectionToggle, setActiveSelectionToggle] = useState('cardiology');
  const [sectionSelection, setSectionSelection] = useState('CONSULTATION');
  const cardiologyRef = useRef<HTMLDivElement>(null)
  return (
    <div className='my-5'>
      <div className="flex justify-between items-center bg-[#E0F4EA] py-3">
        <div className="flex gap-4 items-center border-s-4 border-[#29cc39] ps-5">
          <p className="font-bold text-[#4d5e80]">NEW SPECIALTY</p>
          <div className="w-10 h-10 border rounded-full flex justify-center items-center">
            <p className='text-[#4d5e80]'>5</p>
          </div>
        </div>
        <div className="flex gap-5 items-center justify-center m-2 w-10 h-10 bg-white rounded-full">
          <Icon icon={'mdi:plus'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
        </div>
      </div>
      <div className="flex justify-between my-5 items-center">
        <p>Your Services</p>
        <div className="w-10 h-10 rounded-full bg-[#006838] text-white flex justify-center items-center">9</div>
      </div>
      <div className="flex items-center flex-wrap gap-3">
        <div onClick={() => setActiveSelection('CONSULTATION')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'CONSULTATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          CONSULTATION
        </div>
        <div onClick={() => setActiveSelection('REPRESENTATION')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'REPRESENTATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          REPRESENTATION
        </div>
        <div onClick={() => setActiveSelection('ADVICE')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'ADVICE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          ADVICE
        </div>
        <div onClick={() => setActiveSelection('DOCUMENTATION')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'DOCUMENTATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          DOCUMENTATION
        </div>
        <div onClick={() => setActiveSelection('CALL')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'CALL' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          CALL
        </div>
        <div onClick={() => setActiveSelection('RETAIN')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'RETAIN' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          RETAIN
        </div>
      </div>
       <div className="flex flex-col gap-5 my-5">
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
                <div onClick={() => setActiveSelectionToggle('cardiology')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                    </div>
                    <p className='md:text-md text-[10px]'>Criminal Law</p>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                    <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                    <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
                </div>
                <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 bg-white rounded-lg ${activeSelectionToggle === 'cardiology' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'cardiology' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
                }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>Students in criminal law learn about the fundamental principles of criminal justice, including the elements of crimes, legal procedures, and courtroom practice. They study topics such as criminal responsibility, offenses against persons and property, constitutional rights of the accused, and sentencing.</p>
                <div className="flex justify-between items-center">
                    <p className="text-[##d6dae5] md:text-sm text-[12px]">Section</p>
                    <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">Senior Secondary</div>
                </div>
                <div className="flex justify-between gap-3 items-center overflow-x-auto flex-shrink-0">
                   <div onClick={() => setSectionSelection('CONSULTATION')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${sectionSelection === 'CONSULTATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
                      CONSULTATION
                    </div>
                   <div onClick={() => setSectionSelection('REPRESENATION')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${sectionSelection === 'REPRESENATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
                      REPRESENATION
                    </div>
                   <div onClick={() => setSectionSelection('ADVICE')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${sectionSelection === 'ADVICE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
                      ADVICE
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 text-sm flex justify-center items-center rounded-full bg-[#EAF2FF]">1</div>
                    <div className="flex flex-col gap-2">
                        <p className='md:text-md text-sm'>Asma'u Musa</p>
                        <p className='md:text-sm text-[10px] font-light'>MD FACTS.</p>
                    </div>
                    </div>
                    <p className='md:text-md text-sm'>BOOKED</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 text-sm flex justify-center items-center rounded-full bg-[#EAF2FF]">2</div>
                    <div className="flex flex-col gap-2">
                        <p className='md:text-md text-sm'>Adaeze Ezeoke</p>
                        <p className='md:text-sm text-[10px] font-light'>MD FACTS.</p>
                    </div>
                    </div>
                    <p className='md:text-md text-sm'>BOOKED</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 text-sm flex justify-center items-center rounded-full bg-[#EAF2FF]">3</div>
                    <div className="flex flex-col gap-2">
                        <p className='md:text-md text-sm'>Seyi Oyedepo</p>
                        <p className='md:text-sm text-[10px] font-light'>MD FACTS.</p>
                    </div>
                    </div>
                    <p className='md:text-md text-sm'>BOOKED</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 text-sm flex justify-center items-center rounded-full bg-[#EAF2FF]">4</div>
                    <div className="flex flex-col gap-2">
                        <p className='md:text-md text-sm'>Ummi Yahaya</p>
                        <p className='md:text-sm text-[10px] font-light'>MD FACTS.</p>
                    </div>
                    </div>
                    <p className='md:text-md text-sm'>SEE PROFILE</p>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LegalAtoz
