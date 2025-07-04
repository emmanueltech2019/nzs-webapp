import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';

const HealthAppointment = () => {
    const [date, setDate] = useState('year');
    const [monthDropdown, setMonthDropdown] = useState();
    const [number, setNumber] = useState<number[]>([]);
    const [activeButton, setActiveButton] = useState('')
    const activeContainerRef = useRef<HTMLDivElement>(null)
    const activeContainerRef1 = useRef<HTMLDivElement>(null)
    const [radiusButton, setRadiusButton] = useState('visits')
    const textRef = useRef<HTMLParagraphElement>(null)
    const [readMore, setReadMore] = useState(false)
    const fullText = "Physically visit the lawyer's office, practice, or firm, sit face-to-face with the lawyer";
    const displayFullText = readMore ? fullText : fullText.slice(0, 50)

    useEffect(() => {
        const textValue = textRef.current?.textContent;
        if(!readMore) {
            
        }
    })

    useEffect(() => {
        const days = [];
        for (let index = 0; index < 31; index++) {
            days.push(index + 1)
        }
        setNumber(days)
    }, [])
    
  return (
    <>
        <div className={`h-screen ${activeButton ? 'md:mb-[100%] mb-[160%]' : 'md:mb-40 mb-52'}`}>
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
                <div className="flex flex-col md:p-5 p-5 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer">
                    <div onClick={() => setActiveButton('visits')} className="bg-white md:py-5 py-2 px-3 rounded-xl">
                        <div className="flex justify-between items-center pb-5">
                            <div className="flex items-center gap-2">
                                <div onClick={() => setRadiusButton('visits')} className={`w-6 h-6 flex justify-center items-center rounded-full ${radiusButton === 'visits' ? 'bg-[#006838]' : 'border'}`}>
                                    <div className={`w-2 h-2 rounded-full bg-white ${radiusButton === 'visits' ? 'block' : 'hidden'}`}></div>
                                </div>
                                <p className="font-semibold text-black text-sm">Visits</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeButton === 'visits' ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Available</div> 
                                <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeButton === 'visits' ? 'rotate-180' : ''}`} />       
                            </div>
                        </div>
                        <div ref={activeContainerRef} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
                        style={{
                            height: activeButton === 'visits' ? `${activeContainerRef.current?.scrollHeight}px` : '0px'
                        }}>
                            <p ref={textRef} className='text-sm text-gray-500'>{displayFullText}<span>{readMore ? '' : '...'}</span></p>
                            <p onClick={() => setReadMore(!readMore)} className="italic text-sm cursor-pointer text-[#009cde]">{readMore ? 'Read less...' : 'Read more...'}</p>
                            <div className="flex justify-between items-end">
                            <div className="flex gap-3 items-center">
                                <div className="w-7 h-7 rounded-full text-sm bg-[#ebedeb] flex justify-center items-center text-gray-500">1</div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm">Morning</p>
                                    <p className="text-black text-md font-light">30 mins</p>
                                </div>
                            </div>
                                <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                    <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                        8:00 AM - 11:00 AM
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                            <div className="flex gap-3 items-center">
                                <div className="w-7 h-7 rounded-full text-sm bg-[#ebedeb] flex justify-center items-center text-gray-500">2</div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm">Afternoon</p>
                                    <p className="text-black text-md font-light">30 mins</p>
                                </div>
                            </div>
                                <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                    <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                        1:00 PM - 4:00 PM
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                            <div className="flex gap-3 items-center">
                                <div className="w-7 h-7 rounded-full text-sm bg-[#ebedeb] flex justify-center items-center text-gray-500">3</div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm">Evening</p>
                                    <p className="text-black text-md font-light">30 mins</p>
                                </div>
                            </div>
                                <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                    <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                        6:00 PM - 8:00 PM
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end w-full my-5">
                            <button className='bg-[#006838] text-white py-2 px-5 rounded-lg text-sm'>BOOK THIS</button>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setActiveButton('calls')} className="bg-white md:py-5 py-2 px-3 rounded-xl">
                        <div className="flex justify-between items-center pb-5">
                            <div className="flex items-center gap-2">
                                <div onClick={() => setRadiusButton('calls')} className={`w-6 h-6 flex justify-center items-center rounded-full ${radiusButton === 'calls' ? 'bg-[#006838]' : 'border'}`}>
                                    <div className={`w-2 h-2 rounded-full bg-white ${radiusButton === 'calls' ? 'block' : 'hidden'}`}></div>
                                </div>
                                <p className="font-semibold text-black text-sm">Calls</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeButton === 'calls' ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Available</div> 
                                <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeButton === 'calls' ? 'rotate-180' : ''}`} />       
                            </div>
                        </div>
                        <div ref={activeContainerRef1} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
                        style={{
                            height: activeButton === 'calls' ? `${activeContainerRef1.current?.scrollHeight}px` : '0px'
                        }}>
                            <p ref={textRef} className='text-sm text-gray-500'>{displayFullText}<span>{readMore ? '' : '...'}</span></p>
                            <p onClick={() => setReadMore(!readMore)} className="italic text-sm cursor-pointer text-[#009cde]">{readMore ? 'Read less...' : 'Read more...'}</p>
                            <div className="flex justify-between items-end">
                            <div className="flex gap-3 items-center">
                                <div className="w-7 h-7 rounded-full text-sm bg-[#ebedeb] flex justify-center items-center text-gray-500">1</div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm">Morning</p>
                                    <p className="text-black text-md font-light">30 mins</p>
                                </div>
                            </div>
                                <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                    <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                        8:00 AM - 11:00 AM
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                            <div className="flex gap-3 items-center">
                                <div className="w-7 h-7 rounded-full text-sm bg-[#ebedeb] flex justify-center items-center text-gray-500">2</div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm">Afternoon</p>
                                    <p className="text-black text-md font-light">30 mins</p>
                                </div>
                            </div>
                                <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                    <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                        1:00 PM - 4:00 PM
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                            <div className="flex gap-3 items-center">
                                <div className="w-7 h-7 rounded-full text-sm bg-[#ebedeb] flex justify-center items-center text-gray-500">3</div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm">Evening</p>
                                    <p className="text-black text-md font-light">30 mins</p>
                                </div>
                            </div>
                                <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                    <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                        6:00 PM - 8:00 PM
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end w-full my-5">
                            <button className='bg-[#006838] text-white py-2 px-5 rounded-lg text-sm'>BOOK THIS</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HealthAppointment
