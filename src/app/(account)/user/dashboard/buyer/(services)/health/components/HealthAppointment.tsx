import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';

const HealthAppointment = () => {
    const [date, setDate] = useState('year');
    const [monthDropdown, setMonthDropdown] = useState();
    const [number, setNumber] = useState<number[]>([]);
    const [activeButton, setActiveButton] = useState(false)
    const activeContainerRef = useRef<HTMLDivElement>(null)

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
        <div className="flex flex-col gap-2 bg-white">
            <div onClick={() => setActiveButton(!activeButton)} className="flex flex-col md:p-5 p-2 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer">
                <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                    <p className="font-semibold text-black text-sm">BOOKING DETAILS</p>
                    <div className="flex gap-3 items-center">
                        <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeButton ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Ready</div> 
                        <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeButton ? 'rotate-180' : ''}`} />       
                    </div>
                </div>
                <div ref={activeContainerRef} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
                style={{
                    height: activeButton ? `${activeContainerRef.current?.scrollHeight}px` : '0px'
                }}>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3">
                            <p className="text-gray-300 text-sm">Booking Type</p>
                            <p className="text-black text-md font-light">Consultation Visit</p>
                        </div>
                        <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                            <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                8:00 AM - 11:00 AM
                            </div>
                            <p className="text-md font-light text-black">September 30, 2024</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3">
                            <p className="text-gray-300 text-sm">Specialty</p>
                            <p className="text-black text-lg font-light">Anesthesiology</p>
                        </div>
                        <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                            <p className="text-gray-300 text-sm">Location</p>
                            <p className="text-lg font-light text-black">Umahia, Abia</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3">
                            <p className="text-gray-300 text-sm">Estimted Arrival</p>
                            <p className="text-black text-lg font-light">11 Hours</p>
                        </div>
                        <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                            <p className="text-gray-300 text-sm">Approximate Distance</p>
                            <p className="text-lg font-light text-black">500 km</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-3">
                            <p className="text-gray-300 text-sm">Service</p>
                        </div>
                        <div className="flex flex-col gap-3 items-start md:w-60 w-40">
                            <div className='rounded-xl py-1 px-3 bg-[#ff3333bf] text-white'>
                                Consultation Visit
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-3">
                            <p className="text-gray-300 text-sm">Calculating Price (NGN)</p>
                        </div>
                        <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                            <div className='rounded-xl py-1 px-3 bg-[#d9dbd7] text-black font-bold text-xl'>
                                3,000.00
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-3">
                            <p className="text-gray-300 text-sm">Provider</p>
                        </div>
                        <div className="flex flex-col gap-3 md:w-60 w-40">
                            <div className='py-1 px-3'>
                                GilChrist Health 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95">
                CONFIRM
            </button>
        </div>
    </>
  )
}

export default HealthAppointment
