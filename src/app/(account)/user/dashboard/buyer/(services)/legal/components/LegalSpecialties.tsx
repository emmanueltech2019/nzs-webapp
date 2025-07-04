import React, { useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

const HealthSpecialties = () => {
    const [activeAccordion, setActiveAccordion] = useState('');
    const accordionContentRef = useRef<HTMLDivElement>(null);
    const accordionContentRef2 = useRef<HTMLDivElement>(null);
    const accordionContentRef3 = useRef<HTMLDivElement>(null);
  return (
    <div className=' flex flex-col gap-5 my-5 px-2 md:px-0 mb-60'>
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
            <div className="flex justify-between items-center pb-2">
                <p className="font-semibold text-black text-sm">Family Law</p>
                <div className="flex gap-3 items-center">
                    <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeAccordion === 'booked' ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Booked</div> 
                    <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeAccordion === 'booked' ? 'rotate-180' : ''}`} />       
                </div>
            </div>
            <div ref={accordionContentRef} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
            style={{
                height: activeAccordion === 'booked' ? `${accordionContentRef.current?.scrollHeight}px` : '0px'
            }}>
                <p className="text-gray-700 text-sm">Property law covers areas such as buying, selling, leasing, and inheritance or property, as well as resolving disputes over property ownership. It also regulates zoning, land use, and property taxes.</p>
                <div className="flex gap-4 flex-col p-3">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">1</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Suoyo Obubra</p>
                                <p className="text-[12px] text-gray-700">LLB. LLM.</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">See Profile</div>
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">...</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">2</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Adebisi Aluko</p>
                                <p className="text-[12px] text-gray-700">LLB. LLM.</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">See Profile</div>
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">...</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">3</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Ayibaemi Opuene</p>
                                <p className="text-[12px] text-gray-700">LLB. LLM.</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">See Profile</div>
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">...</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">4</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Ayibaemi Seiyefa</p>
                                <p className="text-[12px] text-gray-700">LLB. LLM.</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">See Profile</div>
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div onClick={() => setActiveAccordion('available')} className="flex flex-col gap-3 rounded-xl bg-white p-4 cursor-pointer">
            <div className="flex justify-between items-center pb-2">
                <p className="font-semibold text-black text-sm">Property Law</p>
                <div className="flex gap-3 items-center">
                    <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeAccordion === 'available' ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Available</div> 
                    <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeAccordion === 'available' ? 'rotate-180' : ''}`} />       
                </div>
            </div>
            <div ref={accordionContentRef2} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
            style={{
                height: activeAccordion === 'available' ? `${accordionContentRef2.current?.scrollHeight}px` : '0px'
            }}>
                <p className="text-gray-700 text-sm">Property law covers areas such as buying, selling, leasing, and inheritance or property, as well as resolving disputes over property ownership. It also regulates zoning, land use, and property taxes.</p>
                <div className="flex gap-4 flex-col p-3">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">1</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Suoyo Obubra</p>
                                <p className="text-[12px] text-gray-700">LLB. LLM.</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">See Profile</div>
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">...</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">2</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Adebisi Aluko</p>
                                <p className="text-[12px] text-gray-700">LLB. LLM.</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">See Profile</div>
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">...</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">3</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Ayibaemi Opuene</p>
                                <p className="text-[12px] text-gray-700">LLB. LLM.</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">See Profile</div>
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">...</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">4</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Ayibaemi Seiyefa</p>
                                <p className="text-[12px] text-gray-700">LLB. LLM.</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">See Profile</div>
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div onClick={() => setActiveAccordion('unavailable')} className="flex flex-col gap-3 rounded-xl bg-white p-4 cursor-pointer">
            <div className="flex justify-between items-center pb-2">
                <p className="font-semibold text-black text-sm">Taxation</p>
                <div className="flex gap-3 items-center">
                    <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeAccordion === 'unavailable' ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Unavailable</div> 
                    <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeAccordion === 'unavailable' ? 'rotate-180' : ''}`} />       
                </div>
            </div>
            <div ref={accordionContentRef3} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
            style={{
                height: activeAccordion === 'unavailable' ? `${accordionContentRef3.current?.scrollHeight}px` : '0px'
            }}>
                <p className="text-gray-700 text-sm">Property law covers areas such as buying, selling, leasing, and inheritance or property, as well as resolving disputes over property ownership. It also regulates zoning, land use, and property taxes.</p>
                <div className="flex gap-4 flex-col p-3">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">1</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Suoyo Obubra</p>
                                <p className="text-[12px] text-gray-700">LLB. LLM.</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">See Profile</div>
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">...</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">2</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Adebisi Aluko</p>
                                <p className="text-[12px] text-gray-700">LLB. LLM.</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">See Profile</div>
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">...</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">3</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Ayibaemi Opuene</p>
                                <p className="text-[12px] text-gray-700">LLB. LLM.</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">See Profile</div>
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">...</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="flex justify-center items-center bg-[#ebedeb] rounded-full w-7 h-7 text-gray-600 text-sm">4</div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-sm">Ayibaemi Seiyefa</p>
                                <p className="text-[12px] text-gray-700">LLB. LLM.</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">See Profile</div>
                            <div className="py-1 px-3 bg-[#ebedeb] rounded-lg text-sm">...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HealthSpecialties
