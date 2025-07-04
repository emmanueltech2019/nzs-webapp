import React, { useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

const HealthSpecialties = () => {
    const [activeAccordion, setActiveAccordion] = useState('');
    const accordionContentRef0 = useRef<HTMLDivElement>(null);
    const accordionContentRef2 = useRef<HTMLDivElement>(null);
    const accordionContentRef3 = useRef<HTMLDivElement>(null);
  return (
    <div className=' flex flex-col gap-5 my-5 px-2 md:px-0'>
      <div className="flex flex-col gap-3 items-center">
        <p className="text-[#EBEDEB] text-sm">Consultation</p>
        <h3 className="font-bold text-xl text-black">N 35,000.00</h3>
      </div>
      <div className="flex flex-col p-4 gap-3 rounded-3xl bg-[#EBEDEB]">
        <h2 className="font-semibold text-black">OUR SPECIALTIES</h2>
        <div className="flex justify-between">
            <p className="text-[12px] font-light text-black">Total Services (20)</p>
            <p className="font-light text-black text-[10px]">Updated 3 Weeks ago.</p>
        </div>
        <div onClick={() => setActiveAccordion('booked')} className="flex flex-col gap-3 rounded-xl bg-white p-4 cursor-pointer">
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                <p className="font-semibold text-black text-sm">Obstetrics/Gynecology</p>
                <div className="flex gap-3 items-center">
                    <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeAccordion === 'booked' ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Booked</div> 
                    <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeAccordion === 'booked' ? 'rotate-180' : ''}`} />       
                </div>
            </div>
            <div ref={accordionContentRef0} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
            style={{
                height: activeAccordion === 'booked' ? `${accordionContentRef0.current?.scrollHeight}px` : '0px'
            }}>
                <p className="text-gray-700 text-sm">Anesthesiology is a branch of medicine that focuses on providing pain relief and ensuring patient comfort and safety during surgeries or other medical procedures.</p>
                <div className="flex gap-4 flex-col p-3">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center ">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">1</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Asma'u Musa</p>
                                <p className="text-[12px] text-gray-700">MD FACS</p>
                            </div>
                        </div>
                        <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">BOOK NOW</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center ">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">2</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Asma'u Musa</p>
                                <p className="text-[12px] text-gray-700">MD FACS</p>
                            </div>
                        </div>
                        <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">BOOK NOW</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center ">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">1</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Asma'u Musa</p>
                                <p className="text-[12px] text-gray-700">MD FACS</p>
                            </div>
                        </div>
                        <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">BOOK NOW</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center ">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">1</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Asma'u Musa</p>
                                <p className="text-[12px] text-gray-700">MD FACS</p>
                            </div>
                        </div>
                        <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">BOOK NOW</div>
                    </div>
                </div>
            </div>
        </div>
        <div onClick={() => setActiveAccordion('available')} className="flex flex-col gap-3 rounded-xl bg-white p-4 cursor-pointer">
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                <p className="font-semibold text-black text-sm">Obstetrics/Gynecology</p>
                <div className="flex gap-3 items-center">
                    <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeAccordion === 'available' ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Available</div> 
                    <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeAccordion === 'available' ? 'rotate-180' : ''}`} />       
                </div>
            </div>
            <div ref={accordionContentRef2} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
            style={{
                height: activeAccordion === 'available' ? `${accordionContentRef2.current?.scrollHeight}px` : '0px'
            }}>
                <p className="text-gray-700 text-sm">Anesthesiology is a branch of medicine that focuses on providing pain relief and ensuring patient comfort and safety during surgeries or other medical procedures.</p>
                <div className="flex gap-4 flex-col p-3">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center ">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">1</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Asma'u Musa</p>
                                <p className="text-[12px] text-gray-700">MD FACS</p>
                            </div>
                        </div>
                        <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">BOOK NOW</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center ">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">2</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Asma'u Musa</p>
                                <p className="text-[12px] text-gray-700">MD FACS</p>
                            </div>
                        </div>
                        <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">BOOK NOW</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center ">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">1</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Asma'u Musa</p>
                                <p className="text-[12px] text-gray-700">MD FACS</p>
                            </div>
                        </div>
                        <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">BOOK NOW</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center ">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">1</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Asma'u Musa</p>
                                <p className="text-[12px] text-gray-700">MD FACS</p>
                            </div>
                        </div>
                        <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">BOOK NOW</div>
                    </div>
                </div>
            </div>
        </div>
        <div onClick={() => setActiveAccordion('80%booked')} className="flex flex-col gap-3 rounded-xl bg-white p-4 cursor-pointer">
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                <p className="font-semibold text-black text-sm">Obstetrics/Gynecology</p>
                <div className="flex gap-3 items-center">
                    <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeAccordion === '80%booked' ? 'bg-[#006838] text-white' : 'bg-[#FFE3AC]'}`}>80% Booked</div> 
                    <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeAccordion === '80%booked' ? 'rotate-180' : ''}`} />       
                </div>
            </div>
            <div ref={accordionContentRef3} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
            style={{
                height: activeAccordion === '80%booked' ? `${accordionContentRef3.current?.scrollHeight}px` : '0px'
            }}>
                <p className="text-gray-700 text-sm">Anesthesiology is a branch of medicine that focuses on providing pain relief and ensuring patient comfort and safety during surgeries or other medical procedures.</p>
                <div className="flex gap-4 flex-col p-3">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center ">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">1</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Asma'u Musa</p>
                                <p className="text-[12px] text-gray-700">MD FACS</p>
                            </div>
                        </div>
                        <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">BOOK NOW</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center ">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">2</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Asma'u Musa</p>
                                <p className="text-[12px] text-gray-700">MD FACS</p>
                            </div>
                        </div>
                        <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">BOOK NOW</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center ">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">1</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Asma'u Musa</p>
                                <p className="text-[12px] text-gray-700">MD FACS</p>
                            </div>
                        </div>
                        <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">BOOK NOW</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center ">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">1</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Asma'u Musa</p>
                                <p className="text-[12px] text-gray-700">MD FACS</p>
                            </div>
                        </div>
                        <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">BOOK NOW</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className="md:p-5 p-2 flex flex-col gap-2 bg-white">
        <button className="rounded-2xl bg-[#ebedeb] p-3 font-bold text-black text-xl flex justify-between items-center">BOOKING DETAILS <FaChevronDown className='text-sm' /></button>
        <button className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95">
          Add A Review
        </button>
      </div>
    </div>
  )
}

export default HealthSpecialties
