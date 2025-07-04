import React, { useRef, useState } from 'react'
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa'
import hospitalityBackground from "@/assets/images/hospitalityBackground.png"

const HospitalityFacilities = () => {
    const [activeAccordion, setActiveAccordion] = useState('');
    const accordionContentRef0 = useRef<HTMLDivElement>(null);
    const accordionContentRef2 = useRef<HTMLDivElement>(null);
    const accordionContentRef3 = useRef<HTMLDivElement>(null);
  return (
    <div className=' flex flex-col gap-5 my-5 px-2 md:px-0 mb-40'>
      <div className="flex flex-col gap-3 items-center">
        <p className="text-[#EBEDEB] text-sm">Booking Fee</p>
        <h3 className="font-bold text-xl text-black">N 3,000.00</h3>
      </div>
      <div className="flex flex-col p-4 gap-3 rounded-3xl bg-[#EBEDEB]">
        <h2 className="font-semibold text-black">FACILITIES</h2>
        <div className="flex justify-between">
            <p className="text-[12px] font-light text-black">Accormmodation + Breakfast</p>
            <p className="font-light text-black text-[10px]">Updated 3 Weeks ago.</p>
        </div>
        <div onClick={() => setActiveAccordion('luxury')} className="flex flex-col gap-3 rounded-xl bg-white p-4 cursor-pointer">
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                <p className="font-semibold text-black text-sm">Luxury Rooms</p>
                <div className="flex gap-3 items-center">
                    <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeAccordion === 'luxury' ? 'rotate-180' : ''}`} />       
                </div>
            </div>
            <div ref={accordionContentRef0} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
            style={{
                height: activeAccordion === 'luxury' ? `${accordionContentRef0.current?.scrollHeight}px` : '0px'
            }}>
                <p className="text-gray-700 text-sm">Take a look at our infrastructure, including well furnished rooms and luxury environments.</p>
                <div className="flex gap-2 flex-col p-3">
                    <div className="flex overflow-x-auto gap-3">
                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='md:w-80 w-60 rounded-2xl' />
                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='md:w-80 w-60 rounded-2xl' />
                    </div>
                    <div className="flex items-center gap-2 ms-auto">
                        <div className="w-3 h-3 rounded-full bg-[#00683736]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#00683736]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#00683736]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#00683736]"></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center p-1 rounded-lg bg-[#00683736] text-xl">
                                ❤️
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-400">Likes</p>
                                <p className="font-semibold text-black">55</p>
                            </div>
                        </div>
                        <button className="text-white md:px-10 px-5 py-2 md:text-sm text-[10px] rounded-xl bg-[#006838]">VIEW FULLSCREEN</button>
                    </div>
                </div>
            </div>
        </div>
        <div onClick={() => setActiveAccordion('dining')} className="flex flex-col gap-3 rounded-xl bg-white p-4 cursor-pointer">
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                <p className="font-semibold text-black text-sm">Dining</p>
                <div className="flex gap-3 items-center">
                    <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeAccordion === 'dining' ? 'rotate-180' : ''}`} />       
                </div>
            </div>
            <div ref={accordionContentRef2} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
            style={{
                height: activeAccordion === 'dining' ? `${accordionContentRef2.current?.scrollHeight}px` : '0px'
            }}>
                <p className="text-gray-700 text-sm">Take a look at our infrastructure, including well furnished rooms and luxury environments.</p>
                <div className="flex gap-2 flex-col p-3">
                    <div className="flex overflow-x-auto gap-3">
                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='md:w-80 w-60 rounded-2xl' />
                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='md:w-80 w-60 rounded-2xl' />
                    </div>
                    <div className="flex items-center gap-2 ms-auto">
                        <div className="w-3 h-3 rounded-full bg-[#00683736]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#00683736]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#00683736]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#00683736]"></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center p-1 rounded-lg bg-[#00683736] text-xl">
                                ❤️
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-400">Likes</p>
                                <p className="font-semibold text-black">55</p>
                            </div>
                        </div>
                        <button className="text-white md:px-10 px-5 py-2 md:text-sm text-[10px] rounded-xl bg-[#006838]">VIEW FULLSCREEN</button>
                    </div>
                </div>
            </div>
        </div>
        <div onClick={() => setActiveAccordion('sport')} className="flex flex-col gap-3 rounded-xl bg-white p-4 cursor-pointer">
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                <p className="font-semibold text-black text-sm">Sport and Recreation</p>
                <div className="flex gap-3 items-center">
                    <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeAccordion === 'sport' ? 'rotate-180' : ''}`} />       
                </div>
            </div>
            <div ref={accordionContentRef3} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
            style={{
                height: activeAccordion === 'sport' ? `${accordionContentRef3.current?.scrollHeight}px` : '0px'
            }}>
                <p className="text-gray-700 text-sm">Take a look at our infrastructure, including well furnished rooms and luxury environments.</p>
                <div className="flex gap-2 flex-col p-3">
                    <div className="flex overflow-x-auto gap-3">
                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='md:w-80 w-60 rounded-2xl' />
                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='md:w-80 w-60 rounded-2xl' />
                    </div>
                    <div className="flex items-center gap-2 ms-auto">
                        <div className="w-3 h-3 rounded-full bg-[#00683736]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#00683736]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#00683736]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#00683736]"></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center p-1 rounded-lg bg-[#00683736] text-xl">
                                ❤️
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-400">Likes</p>
                                <p className="font-semibold text-black">55</p>
                            </div>
                        </div>
                        <button className="text-white md:px-10 px-5 py-2 md:text-sm text-[10px] rounded-xl bg-[#006838]">VIEW FULLSCREEN</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HospitalityFacilities
