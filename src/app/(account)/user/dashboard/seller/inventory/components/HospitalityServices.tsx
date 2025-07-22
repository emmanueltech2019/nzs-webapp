'use client'
import React, { FC, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import biochemist from '@/assets/images/biochemist.jpg'

interface ServicesProp {
  activeSelection: string,
  setActiveSelection: (selectionId: string) => void
  activeRoute: string,
  setActiveRoute: (routeId: string) => void,
  addProduct: boolean,
  setAddProduct: (productId: boolean) => void,
}

const HospitalityServices: FC<ServicesProp> = ({activeSelection, setActiveSelection, addProduct, setAddProduct, activeRoute, setActiveRoute}) => {
  const [activeSelectionToggle, setActiveSelectionToggle] = useState('bed');
  const [activeSelectionToggle1, setActiveSelectionToggle1] = useState('luxury');
  const cardiologyRef = useRef<HTMLDivElement>(null)
  const luxuryRef = useRef<HTMLDivElement>(null)
  const [activeArrayTab, setActiveArrayTab] = useState('COMPLIMENTARY BREAKFAST')
  const tab = ["fine dining", "concierge services", "events", "24hr room service", "recreation"];
  const subTab = ["COMPLIMENTARY BREAKFAST", "LOCAL GUIDES", "SAFETY AND SECURITY", "LOUNGE", "TOURS", "EXTRAS"]
  return (
    <div className='my-5'>
        {addProduct ? (
            <div>
                <div className="flex justify-between items-start">
                    <div className={`flex flex-col gap-2 items-center rounded-full ${activeRoute === 'specialty' ? 'opacity-100' : 'opacity-50'}`}>
                        <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center md:text-md text-[12px] ${activeRoute === 'specialty' ? 'bg-[#006838] text-white' : 'bg-[#e6dae5]'}`}>1</div>
                        <p className="text-center font-bold md:text-sm text-[12px]">Specialty <br /> Info </p>
                    </div>
                    <div className={`flex flex-col gap-2 items-center rounded-full ${activeRoute === 'facility' ? 'opacity-100' : 'opacity-50'}`}>
                        <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center md:text-md text-[12px] ${activeRoute === 'facility' ? 'bg-[#006838] text-white' : 'bg-[#e6dae5]'}`}>2</div>
                        <p className="text-center font-bold md:text-sm text-[12px]">Facility</p>
                    </div>
                    <div className={`flex flex-col gap-2 items-center rounded-full ${activeRoute === 'preview' ? 'opacity-100' : 'opacity-50'}`}>
                        <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center md:text-md text-[12px] ${activeRoute === 'preview' ? 'bg-[#006838] text-white' : 'bg-[#e6dae5]'}`}>3</div>
                        <p className="text-center font-bold md:text-sm text-[12px]">Preview </p>
                    </div>
                </div>
                {activeRoute === 'specialty' && (
                    <div className='flex flex-col gap-5 my-5'>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="title">
                                <input type="text" name="title" id="specialty" placeholder='Title' className='border rounded-xl p-4 w-full' />
                            </label>
                            <label htmlFor="describe">
                                <input type="text" name="describe" id="describe" placeholder='Briefly Describe' className='border rounded-xl p-4 w-full' />
                            </label>
                            <p className='text-[12px] text-[#e6dae5]'>0/30</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-3">
                                <p className="font-light">Similar Services</p>
                                <p className="text-sm text-[#e6dae5]">List of Available Categories</p>
                            </div>
                            <div className="w-8 h-8 items-center justify-center flex bg-[#006838] text-white rounded-full">9</div>
                        </div>
                        <div className="flex items-center flex-wrap gap-3 my-5">
                            <div onClick={() => setActiveSelection('BED AND BOARDING')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'BED AND BOARDING' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            BED AND BOARDING
                            </div>
                            <div onClick={() => setActiveSelection('RECREATION')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'RECREATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            RECREATION
                            </div>
                            <div onClick={() => setActiveSelection('SURGICAL SERVICES')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'FINE DINING' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            SURGICAL SERVICES
                            </div>
                            <div onClick={() => setActiveSelection('24-HR ROOM SERVICE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === '24-HR ROOM SERVICE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            24-HR ROOM SERVICE
                            </div>
                            <div onClick={() => setActiveSelection('EVENTS')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'EVENTS' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            EVENTS
                            </div>
                            <div onClick={() => setActiveSelection('CONCIERGE SERVICES')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'CONCIERGE SERVICES' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            CONCIERGE SERVICES
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-3">
                                <p className="font-light">Components Available</p>
                                <p className="text-sm text-[#e6dae5]">Select a category</p>
                            </div>
                            <div className="w-8 h-8 items-center justify-center flex bg-[#006838] text-white rounded-full">9</div>
                        </div>
                        <div className="flex items-center flex-wrap gap-3 my-5">
                            <div onClick={() => setActiveSelection('COMPLIMENTARY BREAKFAST')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'COMPLIMENTARY BREAKFAST' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            COMPLIMENTARY BREAKFAST
                            </div>
                            <div onClick={() => setActiveSelection('LOCAL GUIDES')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'LOCAL GUIDES' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            LOCAL GUIDES
                            </div>
                            <div onClick={() => setActiveSelection('SURGICAL SERVICES')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'SAFETY AND SECURITY' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            SAFETY AND SECURITY
                            </div>
                            <div onClick={() => setActiveSelection('LOUNGE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'LOUNGE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            LOUNGE
                            </div>
                            <div onClick={() => setActiveSelection('TOURS')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'TOURS' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            TOURS
                            </div>
                            <div onClick={() => setActiveSelection('EXTRAS')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'EXTRAS' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            EXTRAS
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 border p-3 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="flex justify-center items-center w-6 h-6 bg-[#006838] rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <p className="font-semibold text-gray-500">Service Cost</p>
                            </div>
                            <label htmlFor="cost">
                                <input type="text" name="cost" id="cost" placeholder='NGN 10' className='border rounded-xl p-4 w-full' />
                            </label>
                        </div>
                    </div>
                )}
                {activeRoute === 'facility' && (
                    <>
                        <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
                            <div onClick={() => setActiveSelectionToggle1('luxury')} className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                                </div>
                                <p className='md:text-md text-[10px]'>Luxury Rooms</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                                <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                                <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                                </div>
                            </div>
                            <div ref={luxuryRef} className={`flex flex-col flex-shrink-0 overflow-hidden transition-all duration-200 ease-in-out gap-5 rounded-lg ${activeSelectionToggle1 === 'luxury' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                                height: activeSelectionToggle1 === 'luxury' ? `30rem` : '0px'
                            }}>
                                <p className='text-[##afafb4] md:text-md text-[12px]'>Clean, well-furnished rooms with cozy bedding, seating areas, and basic amenities to ensure a pleasant stay.</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-3">
                                        <p className="text-[#d6dae5] md:text-sm text-[12px]">Capacity</p>
                                        <p className="md:text-sm text-sm">12 Rooms</p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="rounded-lg py-1 px-5 border-[0.05px] border-[#006838] text-[#006838] bg-white md:text-md text-[12px]">8:00 AM - 11:00 AM </div>
                                        <p className="md:text-sm text-sm">September 30, 2024</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center overflow-x-auto flex-shrink-0">
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#EAF2FF] text-[#006838]">WIFI</div>
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#EAF2FF] text-[#006838]">JACUZZI</div>
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#EAF2FF] text-[#006838]">ENTERTAINMENT CONSOLE</div>
                                </div>
                                <div className="flex overflow-x-auto flex-shrink-0 gap-3 flex-1">
                                    <div className="flex justify-center items-center flex-shrink-0 relative w-[80%] overflow-hidden rounded-2xl">
                                        <Image src={biochemist} alt='biochemist' width={1000} height={1000} className='w-full h-full object-cover' />
                                        <div className="flex absolute top-5 right-5 py-1 px-3 justify-center items-center rounded-lg bg-[#EAF2FF]">Fully Equipped</div>
                                    </div>
                                    <div className="flex justify-center items-center flex-shrink-0 relative w-[80%] overflow-hidden rounded-2xl">
                                        <Image src={biochemist} alt='biochemist' width={1000} height={1000} className='w-full h-full object-cover' />
                                        <div className="flex absolute top-5 right-5 py-1 px-3 justify-center items-center rounded-lg bg-[#EAF2FF]">Fully Equipped</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
                            <div onClick={() => setActiveSelectionToggle1('regular')} className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                                </div>
                                <p className='md:text-md text-[10px]'>Regular Rooms</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                                <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                                <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                                </div>
                            </div>
                            <div ref={luxuryRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 rounded-lg ${activeSelectionToggle1 === 'regular' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                                height: activeSelectionToggle1 === 'regular' ? `30rem` : '0px'
                            }}>
                                <p className='text-[##afafb4] md:text-md text-[12px]'>Clean, well-furnished rooms with cozy bedding, seating areas, and basic amenities to ensure a pleasant stay.</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-3">
                                        <p className="text-[#d6dae5] md:text-sm text-[12px]">Capacity</p>
                                        <p className="md:text-sm text-sm">12 Rooms</p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="rounded-lg py-1 px-5 border-[0.05px] border-[#006838] text-[#006838] bg-white md:text-md text-[12px]">8:00 AM - 11:00 AM </div>
                                        <p className="md:text-sm text-sm">September 30, 2024</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center overflow-x-auto flex-shrink-0">
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#EAF2FF] text-[#006838]">WIFI</div>
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#EAF2FF] text-[#006838]">JACUZZI</div>
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#EAF2FF] text-[#006838]">ENTERTAINMENT CONSOLE</div>
                                </div>
                                <div className="flex overflow-x-auto gap-3">
                                    <div className="flex justify-center items-center flex-shrink-0 relative w-[80%] overflow-hidden rounded-2xl">
                                        <Image src={biochemist} alt='biochemist' width={1000} height={1000} className='w-full h-full' />
                                        <div className="flex absolute top-5 right-5 py-1 px-3 justify-center items-center rounded-lg bg-[#EAF2FF]">Fully Equipped</div>
                                    </div>
                                    <div className="flex justify-center items-center flex-shrink-0 relative w-[80%] overflow-hidden rounded-2xl">
                                        <Image src={biochemist} alt='biochemist' width={1000} height={1000} className='w-full h-full' />
                                        <div className="flex absolute top-5 right-5 py-1 px-3 justify-center items-center rounded-lg bg-[#EAF2FF]">Fully Equipped</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
                            <div onClick={() => setActiveSelectionToggle1('suite')} className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                                </div>
                                <p className='md:text-md text-[10px]'>Suite Royale</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                                <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                                <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                                </div>
                            </div>
                            <div ref={luxuryRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 rounded-lg ${activeSelectionToggle1 === 'suite' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                                height: activeSelectionToggle1 === 'suite' ? `30rem` : '0px'
                            }}>
                                <p className='text-[##afafb4] md:text-md text-[12px]'>Clean, well-furnished rooms with cozy bedding, seating areas, and basic amenities to ensure a pleasant stay.</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-3">
                                        <p className="text-[#d6dae5] md:text-sm text-[12px]">Capacity</p>
                                        <p className="md:text-sm text-sm">12 Rooms</p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="rounded-lg py-1 px-5 border-[0.05px] border-[#006838] text-[#006838] bg-white md:text-md text-[12px]">8:00 AM - 11:00 AM </div>
                                        <p className="md:text-sm text-sm">September 30, 2024</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center overflow-x-auto flex-shrink-0">
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#EAF2FF] text-[#006838]">WIFI</div>
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#EAF2FF] text-[#006838]">JACUZZI</div>
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#EAF2FF] text-[#006838]">ENTERTAINMENT CONSOLE</div>
                                </div>
                                <div className="flex overflow-x-auto gap-3">
                                    <div className="flex justify-center items-center flex-shrink-0 relative w-[80%] overflow-hidden rounded-2xl">
                                        <Image src={biochemist} alt='biochemist' width={1000} height={1000} className='w-full h-full' />
                                        <div className="flex absolute top-5 right-5 py-1 px-3 justify-center items-center rounded-lg bg-[#EAF2FF]">Fully Equipped</div>
                                    </div>
                                    <div className="flex justify-center items-center flex-shrink-0 relative w-[80%] overflow-hidden rounded-2xl">
                                        <Image src={biochemist} alt='biochemist' width={1000} height={1000} className='w-full h-full' />
                                        <div className="flex absolute top-5 right-5 py-1 px-3 justify-center items-center rounded-lg bg-[#EAF2FF]">Fully Equipped</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
                            <div onClick={() => setActiveSelectionToggle1('villa')} className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                                </div>
                                <p className='md:text-md text-[10px]'>Private Villa</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                                <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                                <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                                </div>
                            </div>
                            <div ref={luxuryRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 rounded-lg ${activeSelectionToggle1 === 'villa' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                                height: activeSelectionToggle1 === 'villa' ? `30rem` : '0px'
                            }}>
                                <p className='text-[##afafb4] md:text-md text-[12px]'>Clean, well-furnished rooms with cozy bedding, seating areas, and basic amenities to ensure a pleasant stay.</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-3">
                                        <p className="text-[#d6dae5] md:text-sm text-[12px]">Capacity</p>
                                        <p className="md:text-sm text-sm">12 Rooms</p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="rounded-lg py-1 px-5 border-[0.05px] border-[#006838] text-[#006838] bg-white md:text-md text-[12px]">8:00 AM - 11:00 AM </div>
                                        <p className="md:text-sm text-sm">September 30, 2024</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center overflow-x-auto flex-shrink-0">
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#EAF2FF] text-[#006838]">WIFI</div>
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#EAF2FF] text-[#006838]">JACUZZI</div>
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#EAF2FF] text-[#006838]">ENTERTAINMENT CONSOLE</div>
                                </div>
                                <div className="flex overflow-x-auto gap-3">
                                    <div className="flex justify-center items-center flex-shrink-0 relative w-[80%] overflow-hidden rounded-2xl">
                                        <Image src={biochemist} alt='biochemist' width={1000} height={1000} className='w-full h-full' />
                                        <div className="flex absolute top-5 right-5 py-1 px-3 justify-center items-center rounded-lg bg-[#EAF2FF]">Fully Equipped</div>
                                    </div>
                                    <div className="flex justify-center items-center flex-shrink-0 relative w-[80%] overflow-hidden rounded-2xl">
                                        <Image src={biochemist} alt='biochemist' width={1000} height={1000} className='w-full h-full' />
                                        <div className="flex absolute top-5 right-5 py-1 px-3 justify-center items-center rounded-lg bg-[#EAF2FF]">Fully Equipped</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {activeRoute === 'preview' && (
                    <>
                        <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
                                <div onClick={() => setActiveSelectionToggle('cardiology')} className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                    <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                                        <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                                    </div>
                                    <p className='md:text-md text-[10px]'>Cardiology</p>
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
                                    <p className='text-[##afafb4] md:text-md text-[12px]'>This is the branch of medicine focused on teh diagnosis, treatment, and prevention of diseases related to the heart and blood vessels.</p>
                                    <div className="flex justify-between items-center">
                                    <p className="text-[##d6dae5] md:text-sm text-[12px]">A-Z</p>
                                    <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">Out-Patient</div>
                                    </div>
                                    <div className="flex justify-between gap-3 items-center overflow-x-auto flex-shrink-0">
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#d6dae5]">Diagnostics</div>
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#d6dae5]">Surgery</div>
                                    <div className="flex justify-center py-1 px-5 items-center md:text-md text-[12px] flex-shrink-0 rounded-2xl bg-[#d6dae5]">Post - Surgery</div>
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
                )}
            </div>
        ) : (
            <>
                <div className="flex justify-between items-center py-3 bg-[#f8f9fe]">
                    <div className="flex gap-4 items-center border-s-4 border-[#29cc39] ps-5 py-2">
                        <p className="font-bold text-[#4d5e80]">NEW SPECIALTY</p>
                    </div>
                    <div onClick={() => setAddProduct(!addProduct)} className="flex items-center mx-5 p-2 rounded-full bg-white justify-center">
                        <Icon icon={'mdi:plus'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                    </div>
                </div>
                <div className="flex justify-between my-5 items-center">
                    <p>Your Services</p>
                    <div className="w-10 h-10 rounded-full bg-[#006838] text-white flex justify-center items-center">9</div>
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    {tab.map((ta, index) => {      
                        return <div key={index} onClick={() => setActiveSelection(ta)} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === ta ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
                            {ta.toLocaleUpperCase()}
                        </div>
                    })}
                </div>
                <div className="flex flex-col gap-5 my-5">
                    <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
                        <div onClick={() => setActiveSelectionToggle('bed')} className="flex justify-between items-center">
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
                        <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 bg-white rounded-lg ${activeSelectionToggle === 'bed' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                        height: activeSelectionToggle === 'bed' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
                        }}>
                        <p className='text-[##afafb4] md:text-md text-[12px]'>Clean, well-furnished rooms with cozy bedding, seating areas, and basic amenities to ensure a pleasant stay.</p>
                        <div className="flex items-center flex-wrap gap-3 my-5">
                            {subTab.map((ta, index) => (
                                <div key={index} onClick={() => setActiveArrayTab(ta)} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeArrayTab === ta ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
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
        )}
    </div>
  )
}

export default HospitalityServices
