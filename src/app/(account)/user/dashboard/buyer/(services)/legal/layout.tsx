'use client'
import HospitalityTabs from '@/components/tabs/HospitalityTabs'
import { LayoutProps } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import LegalProfile from "@/app/(account)/user/dashboard/buyer/(services)/legal/components/LegalProfile"
import LegalSpecialties from "@/app/(account)/user/dashboard/buyer/(services)/legal/components/LegalSpecialties"
import LegalAppointment from "@/app/(account)/user/dashboard/buyer/(services)/legal/components/LegalAppointment"
import LegalTab from "@/components/tabs/LegalTab"

const layout:React.FC<React.PropsWithChildren<LayoutProps>> = ({children}) => {
    const [active, setActive] = useState('profile')
    const activeContainerRef = useRef<HTMLDivElement>(null)
    const [activeButton, setActiveButton] = useState(false)
  return (
    <div>
        {children}
        <div className='md:max-w-[80%] mx-auto'>
            <div className="py-6 px-2">
                <LegalTab activeTab={active} setActiveTab={setActive} />
            </div>
            {active == 'profile' && <LegalProfile />}
            {active == 'specialties' && <LegalSpecialties />}
            {active == 'appointments' && <LegalAppointment />}
            <div className={`flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white ${active === 'profile' ? 'hidden' : 'flex'}`}>
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
        </div>
    </div>
  )
}

export default layout
