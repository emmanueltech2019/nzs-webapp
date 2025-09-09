'use client'
import React, { FC, useRef, useState } from 'react'
import { Icon } from '@iconify/react'

interface ProviderName {
    name: string[];
    profileUrl: string[];
    date: any[];
    time: string[];
    title: string[];
}

interface ProviderType {
    name: string
}

interface ProviderDetails {
    providerType: ProviderType[];
    providerName: ProviderName[];
}


interface BookingDetail {
    bookingTitleDetails: string[];
}

interface LegalAtoz {
    title: string;
    description: string; 
    similarSpecialty: string;
    servicesAvailable: string;
    procedureType: string;
    providerDetails: ProviderDetails[];
    bookingDetails: BookingDetail[];
}

interface LegalAtozProp {
  servicesSelection1: string,
  setServicesSelection1: (serviceId: string) => void;
  servicesSelection2: string,
  setServicesSelection2: (serviceId: string) => void;
  tab: string[]
  value: number;
  allLegalServicesObject: LegalAtoz[];
  handleRemoveServices: (index: number) => void;
  setAllLegalServicesObject: (services: LegalAtoz[]) => void;
}

const LegalAtoz: FC<LegalAtozProp> = ({
    tab, 
    setAllLegalServicesObject, allLegalServicesObject,
    setServicesSelection1, servicesSelection1,
    setServicesSelection2, servicesSelection2,
    value,
    handleRemoveServices,
}) => {
  const [activeSelectionToggle, setActiveSelectionToggle] = useState<number>(0);
  const cardiologyRef = useRef<HTMLDivElement>(null)
  return (
    <div className='my-5'>
            <div className="flex items-center flex-wrap gap-3 my-5">
                {tab.map((ta, index) => (
                    <div key={index} onClick={() => setServicesSelection1(ta)} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${servicesSelection1 === ta ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                    {ta.toLocaleUpperCase()}
                    </div>
                ))}
            </div>
            {allLegalServicesObject.length > 0 && (
            <>
                {allLegalServicesObject.map((services, index) => (
                    <div key={index} className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
                        <div onClick={() => setActiveSelectionToggle(index)} className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                            <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                                <Icon onClick={() => handleRemoveServices(index)} icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                            </div>
                            <p className='md:text-md text-[10px]'>{services.title}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                            <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                            <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                            </div>
                        </div>
                        <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 bg-white rounded-lg ${activeSelectionToggle === index ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                            height: activeSelectionToggle === index ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
                        }}>
                            <p className='text-[##afafb4] md:text-md text-[12px]'>{services.description}</p>
                            <div className="flex items-center flex-wrap gap-3 my-5 ">
                                {services.providerDetails?.map((service, index) => (
                                    <div key={index} className='w-full'>
                                        <div className="flex justify-between items-center flex-wrap mb-4">
                                            {service.providerType?.slice(0, value).map((serve, index) => (
                                                <div key={index} onClick={() => setServicesSelection2(serve.name)} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${servicesSelection2 === serve.name ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                    {serve.name.toLocaleUpperCase()}
                                                </div>
                                            ))}
                                        </div>
                                        {service.providerName?.slice(0, value).map(({name, profileUrl, date, time, title}, index) => (
                                            <div key={index} className="flex flex-col gap-8 w-full">
                                                <p>{title}</p>
                                                <div className="flex justify-between items-center w-full">
                                                    <div className="flex gap-4 items-center">
                                                        <div className="w-8 h-8 text-sm flex justify-center items-center rounded-full bg-[#EAF2FF]">{index + 1}</div>
                                                        <div className="flex flex-col gap-2">
                                                            <p className='md:text-md text-sm'>{name}</p>
                                                            <p className='md:text-sm text-[10px] font-light'>{profileUrl}</p>
                                                        </div>
                                                    </div>
                                                    <button className='md:text-md text-sm bg-[#006838] text-white px-3 py-1 rounded-lg'>BOOKED</button>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <p>Date / Time</p>
                                                    <div className="flex flex-col gap-2">
                                                        <p>{date}</p>
                                                        <p>{time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
    
                        </div>
                    </div>
                ))}
            </>
            )} 
    </div>
  )
}

export default LegalAtoz
