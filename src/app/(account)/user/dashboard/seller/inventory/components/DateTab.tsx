'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { Icon } from '@iconify/react'

const DateTab = () => {
    const [number, setNumber] = useState<number[]>([]);
    const [date, setDate] = useState('year');
    const [monthDropdown, setMonthDropdown] = useState();
    const [activeSelectionToggle, setActiveSelectionToggle] = useState('cardiology');
    const cardiologyRef = useRef<HTMLDivElement>(null)
    const [activeArrayTab, setActiveArrayTab] = useState('')
    useEffect(() => {
        const days = [];
        for (let index = 0; index < 31; index++) {
            days.push(index + 1)
        }
        setNumber(days)
    }, [])
    const tab = ["COMPLIMENTARY BREAKFAST", "LOCAL GUIDES", "SAFETY AND SECURITY", "LOUNGE", "TOURS", "EXTRAS"]
  return (
    <>
        <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center border-s-4 border-[#29cc39] ps-5">
                <p className="font-bold text-[#4d5e80]">NEW SPECIALTY</p>
                <div className="w-10 h-10 border rounded-full flex justify-center items-center">
                <p className='text-[#4d5e80]'>5</p>
                </div>
            </div>
            <div className="flex gap-5 items-center">
                <Icon icon={'mdi:ellipsis-horizontal'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                <Icon icon={'mdi:plus'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
            </div>
        </div>
        <div className='flex flex-col gap-3 md:px-0 px-2 my-5'>
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                <p className="font-semibold text-black text-sm">2024</p>
                <div className="flex gap-3 items-center">
                    <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] bg-gray-300`}>September</div> 
                    <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${monthDropdown === 'VIEW FACILITY' ? 'rotate-180' : ''}`} />       
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
        <div className="flex flex-col gap-5 my-5">
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
                <div onClick={() => setActiveSelectionToggle('cardiology')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                    </div>
                    <p className='md:text-md text-[10px]'>Bed and <br /> Boarding</p>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">80% VIEW FACILITY</div>
                    <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SERVICE</div>
                    <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
                </div>
                <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 bg-white rounded-lg ${activeSelectionToggle === 'cardiology' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'cardiology' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
                }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>Clean, well-furnished rooms with cozy bedding, seating areas, and basic amenities to ensure a pleasant stay.</p>
                <div className="flex items-center flex-wrap gap-3 my-5">
                    {tab.map((ta, index) => (
                        <div onClick={() => setActiveArrayTab(ta)} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeArrayTab === ta ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            {ta}
                        </div>
                    ))}
                    <div className="absolute w-[0.5px] h-3 bg-[#d6dae5] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 text-sm flex justify-center items-center rounded-full bg-[#EAF2FF]">1</div>
                    <div className="flex flex-col gap-2">
                        <p className='md:text-md text-sm'>Luxury Rooms</p>
                        <p className='md:text-sm text-[10px] font-light'>12 Rooms</p>
                    </div>
                    </div>
                    <p className='md:text-md text-sm'>VIEW FACILITY</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 text-sm flex justify-center items-center rounded-full bg-[#EAF2FF]">2</div>
                    <div className="flex flex-col gap-2">
                        <p className='md:text-md text-sm'>Regular Rooms</p>
                        <p className='md:text-sm text-[10px] font-light'>26 Rooms</p>
                    </div>
                    </div>
                    <p className='md:text-md text-sm'>VIEW FACILITY</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 text-sm flex justify-center items-center rounded-full bg-[#EAF2FF]">3</div>
                    <div className="flex flex-col gap-2">
                        <p className='md:text-md text-sm'>Royal Suites</p>
                        <p className='md:text-sm text-[10px] font-light'>10 Rooms</p>
                    </div>
                    </div>
                    <p className='md:text-md text-sm'>VIEW FACILITY</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 text-sm flex justify-center items-center rounded-full bg-[#EAF2FF]">4</div>
                    <div className="flex flex-col gap-2">
                        <p className='md:text-md text-sm'>Private Villa</p>
                        <p className='md:text-sm text-[10px] font-light'>2 Rooms</p>
                    </div>
                    </div>
                    <p className='md:text-md text-sm'>VIEW FACILITY</p>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DateTab
