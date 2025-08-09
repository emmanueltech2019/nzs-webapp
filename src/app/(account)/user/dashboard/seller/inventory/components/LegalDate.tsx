'use client'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { FaChevronDown } from 'react-icons/fa'

interface LegalDateProp {
  activeSelection: string,
  setActiveSelection: (selectionId: string) => void
  tab: string[]
}

const LegalDate: FC<LegalDateProp> = ({activeSelection, setActiveSelection, tab}) => {
  const [activeSelectionToggle, setActiveSelectionToggle] = useState('criminal');
  const cardiologyRef = useRef<HTMLDivElement>(null)
  const [number, setNumber] = useState<number[]>([]);
  const [date, setDate] = useState('year');
  const [monthDropdown, setMonthDropdown] = useState();
  useEffect(() => {
        const days = [];
        for (let index = 0; index < 31; index++) {
            days.push(index + 1)
        }
        setNumber(days)
    }, [])
  
  return (
    <>
        <div className='flex flex-col gap-3 md:px-0 px-2'>
            <div className="flex">
                <div onClick={() => setDate('year')} className={`flex justify-center items-center flex-1 p-3 ${date === 'year' ? 'border-b-[0.05px] border-[#006838]' : 'border-b-[0.05px] border-[#ebedeb]'}`}>YEAR</div>
                <div onClick={() => setDate('month')} className={`flex justify-center items-center flex-1 p-3 ${date === 'month' ? 'border-b-[0.05px] border-[#006838]' : 'border-b-[0.05px] border-[#ebedeb]'}`}>MONTH</div>
            </div>
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                <p className="font-semibold text-black text-sm">2024</p>
                <div className="flex gap-3 items-center">
                    <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] bg-gray-300`}>September</div> 
                    <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${monthDropdown === 'booked' ? 'rotate-180' : ''}`} />       
                </div>
            </div>
            <div className="flex justify-between items-center">
                <p className="font-bold flex justify-center items-center w-20 h-10">Mo</p>
                <p className="font-bold flex justify-center items-center w-20 h-10">Tu</p>
                <p className="font-bold flex justify-center items-center w-20 h-10">We</p>
                <p className="font-bold flex justify-center items-center w-20 h-10">Th</p>
                <p className="font-bold flex justify-center items-center w-20 h-10">Fr</p>
                <p className="font-bold flex justify-center items-center w-20 h-10 text-[#ff1f1f]">Sa</p>
                <p className="font-bold flex justify-center items-center w-20 h-10 text-[#ff1f1f]">Su</p>
            </div>
            <div className="flex flex-wrap">
                {number.map((num) => { 
                    if(num >= 14 && num < 31) {
                        return <p className={`w-20 h-10 flex flex-grow   justify-center items-center text-[#006838] my-3 bg-[#00683735] ${num === 14 ? 'rounded-s' : num === 30 ? 'rounded-e' : ''}`}>{num}</p>
                    } else{
                        return <p className="text-black w-20 h-10 flex-grow  flex justify-center items-center my-3">{num}</p>
                    }
                })}
            </div>
        </div>
        <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
            <div onClick={() => setActiveSelectionToggle('criminal')} className="flex justify-between items-center">
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
            <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 bg-white rounded-lg ${activeSelectionToggle === 'criminal' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'criminal' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
            }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>Students learn about musical notation, composition, rhythm, melody, and harmony.</p>
                <div className="flex justify-between items-center">
                <p className="text-[##d6dae5] md:text-sm text-[12px]">Section</p>
                <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">Senior Secondary</div>
                </div>
                <div className="flex items-center flex-wrap gap-3 my-5">
                    {tab.map((ta, index) => (
                        <div key={index} onClick={() => setActiveSelection(ta)} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === ta ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        {ta.toLocaleUpperCase()}
                        </div>
                    ))}
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
        <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
            <div onClick={() => setActiveSelectionToggle('property')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                </div>
                <p className='md:text-md text-[10px]'>Property Law</p>
                </div>
                <div className="flex gap-2 items-center">
                <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
            </div>
            <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 bg-white rounded-lg ${activeSelectionToggle === 'property' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'property' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
            }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>Students learn about musical notation, composition, rhythm, melody, and harmony.</p>
                <div className="flex justify-between items-center">
                <p className="text-[##d6dae5] md:text-sm text-[12px]">Section</p>
                <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">Senior Secondary</div>
                </div>
                <div className="flex items-center flex-wrap gap-3 my-5">
                    {tab.map((ta, index) => (
                        <div key={index} onClick={() => setActiveSelection(ta)} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === ta ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        {ta.toLocaleUpperCase()}
                        </div>
                    ))}
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
        <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
            <div onClick={() => setActiveSelectionToggle('employment')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                </div>
                <p className='md:text-md text-[10px]'>Employment and Labour</p>
                </div>
                <div className="flex gap-2 items-center">
                <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
            </div>
            <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 bg-white rounded-lg ${activeSelectionToggle === 'employment' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'employment' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
            }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>Students learn about musical notation, composition, rhythm, melody, and harmony.</p>
                <div className="flex justify-between items-center">
                <p className="text-[##d6dae5] md:text-sm text-[12px]">Section</p>
                <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">Senior Secondary</div>
                </div>
                <div className="flex items-center flex-wrap gap-3 my-5">
                    {tab.map((ta, index) => (
                        <div key={index} onClick={() => setActiveSelection(ta)} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === ta ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        {ta.toLocaleUpperCase()}
                        </div>
                    ))}
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
        <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
            <div onClick={() => setActiveSelectionToggle('oil')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                </div>
                <p className='md:text-md text-[10px]'>Oil and Gas</p>
                </div>
                <div className="flex gap-2 items-center">
                <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
            </div>
            <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 bg-white rounded-lg ${activeSelectionToggle === 'oil' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'oil' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
            }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>Students learn about musical notation, composition, rhythm, melody, and harmony.</p>
                <div className="flex justify-between items-center">
                <p className="text-[##d6dae5] md:text-sm text-[12px]">Section</p>
                <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">Senior Secondary</div>
                </div>
                <div className="flex items-center flex-wrap gap-3 my-5">
                    {tab.map((ta, index) => (
                        <div key={index} onClick={() => setActiveSelection(ta)} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === ta ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        {ta.toLocaleUpperCase()}
                        </div>
                    ))}
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
        <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
            <div onClick={() => setActiveSelectionToggle('intellectual')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                </div>
                <p className='md:text-md text-[10px]'>Intellectual Property</p>
                </div>
                <div className="flex gap-2 items-center">
                <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
            </div>
            <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 bg-white rounded-lg ${activeSelectionToggle === 'intellectual' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'intellectual' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
            }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>Students learn about musical notation, composition, rhythm, melody, and harmony.</p>
                <div className="flex justify-between items-center">
                <p className="text-[##d6dae5] md:text-sm text-[12px]">Section</p>
                <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">Senior Secondary</div>
                </div>
                <div className="flex items-center flex-wrap gap-3 my-5">
                    {tab.map((ta, index) => (
                        <div key={index} onClick={() => setActiveSelection(ta)} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === ta ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        {ta.toLocaleUpperCase()}
                        </div>
                    ))}
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
    </>
  )
}

export default LegalDate
