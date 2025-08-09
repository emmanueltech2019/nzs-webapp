import { Icon } from '@iconify/react';
import React, {useEffect, useRef, useState} from 'react'
import { FaChevronDown, FaTimes } from 'react-icons/fa';

interface LogisticsLocationProps {
    setActiveSelection: (selection: string) => void;
    activeSelection: string;
    activeRoute: string;
    setActiveRoute: (value: string) => void
    addProduct: boolean;
    setAddProduct: (value: boolean) => void;
}

const LogisticLocation: React.FC<LogisticsLocationProps> = ({
    setActiveSelection,
    activeSelection,
    setActiveRoute,
    activeRoute,
    addProduct,
    setAddProduct
}) => {
    const [activeStatTab, setActiveStatTab] = useState("Pick-up");
    const locationRef = useRef<HTMLDivElement>(null);
    const [locationToggle, setLocationToggle] = useState('portharcourt');
    const [value, setValue] = useState(1)
    const tabs = ["Pick-up", "Drop-off"];
    const addProductTabs = ["Pick-up", "Drop-off"];
  return (
    <div>
        {addProduct ? (
            <div>
                <div className="flex p-1 bg-[#F8F9FE] mb-5 rounded-[16px] w-full">
                    {addProductTabs.map((tab) => (
                        <button
                        key={tab}
                        onClick={() => setActiveStatTab(tab)}
                        className={`py-3 md:py-3 px-3 w-full rounded-[12px] text-center text-xs ${
                            activeStatTab === tab ? 'bg-white font-semibold' : 'text-[#71727A]'
                        }`}
                        >
                        {tab}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between items-start">
                    <div className={`flex flex-col gap-2 items-center rounded-full ${activeRoute === 'route-info' ? 'opacity-100' : 'opacity-50'}`}>
                        <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center md:text-md text-[12px] ${activeRoute === 'route-info' ? 'bg-[#006838] text-white' : 'bg-[#e6dae5]'}`}>1</div>
                        <p className="text-center font-bold md:text-sm text-[12px]">Route <br /> Info </p>
                    </div>
                    <div onClick={() => setActiveRoute("pricing")} className={`flex flex-col gap-2 items-center rounded-full ${activeRoute === 'pricing' ? 'opacity-100' : 'opacity-50'}`}>
                        <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center md:text-md text-[12px] ${activeRoute === 'pricing' ? 'bg-[#006838] text-white' : 'bg-[#e6dae5]'}`}>2</div>
                        <p className="text-center font-bold md:text-sm text-[12px]">Pricing</p>
                    </div>
                    <div className={`flex flex-col gap-2 items-center rounded-full ${activeRoute === 'preview' ? 'opacity-100' : 'opacity-50'}`}>
                        <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center md:text-md text-[12px] ${activeRoute === 'preview' ? 'bg-[#006838] text-white' : 'bg-[#e6dae5]'}`}>3</div>
                        <p className="text-center font-bold md:text-sm text-[12px]">Preview</p>
                    </div>
                </div>
                {activeRoute === 'route-info' && (
                    <div className='flex flex-col gap-5 my-5'>
                        <div className="row flex justify-between items-center my-5">
                            <button className='flex items-center gap-2 text-[#1F2024] py-[10px] px-3 rounded-xl border-[0.5px] border-[#C5C6CC]'>
                            <Icon icon='fluent:arrow-sort-16-regular' className='text-[#8F9098] text-sm' />
                            Single
                            <Icon icon='tabler:chevron-down' className='text-[#C5C6CC] text-sm' />
                            </button>
                            <div className='flex items-center text-sm tracking-wide gap-2'>
                            <p>Add Location</p>
                            <button onClick={() => {
                                if(value <= 1) {
                                return 1
                                } else{
                                setValue(value - 1)
                                }
                            }} className='w-6 h-6 rounded-full flex items-center justify-center text-lg bg-[#EAF2FF] leading-[0]'>
                                <Icon icon='flowbite:minus-outline' className='text-sm' />
                            </button>
                            <span>{value}</span>
                            <button onClick={() => setValue(value + 1)} className='w-6 h-6 rounded-full flex items-center justify-center text-lg bg-[#EAF2FF] leading-[0]'>
                                <Icon icon='flowbite:plus-outline' className='text-sm' />
                            </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-3">
                                <p className="font-light">State</p>
                                <p className="text-sm text-[#e6dae5]">Available in Nigeria</p>
                            </div>
                            <div className="w-8 h-8 items-center justify-center flex bg-[#006838] text-white rounded-full">9</div>
                        </div>
                        <div className="flex items-center flex-wrap gap-3 my-5">
                            <div onClick={() => setActiveSelection('UMUAHIA')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'UMUAHIA' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            UMUAHIA
                            </div>
                            <div onClick={() => setActiveSelection('JO')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'JO' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            JO
                            </div>
                            <div onClick={() => setActiveSelection('AKWA-IBOM')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'AKWA-IBOM' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            AKWA-IBOM
                            </div>
                            <div onClick={() => setActiveSelection('ANAMBRA')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'ANAMBRA' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            ANAMBRA
                            </div>
                            <div onClick={() => setActiveSelection('BAUCHI')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'BAUCHI' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            BAUCHI
                            </div>
                            <div onClick={() => setActiveSelection('DELTA')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'DELTA' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            DELTA
                            </div>
                            <div onClick={() => setActiveSelection('EBONYI')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'EBONYI' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            EBONYI
                            </div>
                            <div onClick={() => setActiveSelection('PLATEAU')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'PLATEAU' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            PLATEAU
                            </div>
                            <div onClick={() => setActiveSelection('NIGER')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'NIGER' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            NIGER
                            </div>
                            <div onClick={() => setActiveSelection('KOGI')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'KOGI' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            KOGI
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <p>City</p>
                                <p className="text-[#e6dae5] text-[12px]">Available in Nigeria</p>
                            </div>
                            <Icon icon='tabler:chevron-down' className='text-[#C5C6CC] text-2xl' />
                        </div>
                        <div className="relative">
                            <label htmlFor="street" className='absolute top-5 md:w-[80%] w-[95%] left-1/2 -translate-x-1/2 bg-[#eaf2ff] rounded-2xl p-3'>
                                <input type="search" name="street" id="street" className='w-full bg-transparent outline-none px-6 text-sm' placeholder='Street Info' />
                                <div className="w-full flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 justify-between px-3">
                                    <Icon icon='tabler:search' className='text-[#C5C6CC] text-xl' />
                                    <Icon icon='tabler:chevron-down' className='text-[#C5C6CC] text-2xl' />
                                </div>
                            </label>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127223.16264394466!2d7.00479655!3d4.81741045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cea39f2c48e3%3A0x53562bdd7d8832db!2sPort%20Harcourt%2C%20Rivers!5e0!3m2!1sen!2sng!4v1754526074357!5m2!1sen!2sng" width="100%" height="450" className='rounded-2xl'></iframe>
                        </div>
                    </div>
                )}
                {activeRoute === 'pricing' && (
                    <div className='flex flex-col gap-5 my-5'>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="product">
                                <input type="text" name="product" id="product" placeholder='NGN 0.00' className='border rounded-xl p-4 w-full' />
                            </label>
                            <p className='text-[12px] text-[#e6dae5]'>Product Price</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-3">
                                <p className="font-light">UNIT</p>
                                <p className="text-sm text-[#e6dae5]">Distance in</p>
                            </div>
                            <div className="w-8 h-8 items-center justify-center flex bg-[#006838] text-white rounded-full">9</div>
                        </div>
                        <div className="flex items-center flex-wrap gap-3 my-5">
                            <div onClick={() => setActiveSelection('KILOMETER (KM)')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'KILOMETER (KM)' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            KILOMETER (KM)
                            </div>
                            <div onClick={() => setActiveSelection('METER (M)')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'METER (M)' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            METER (M)
                            </div>
                            <div onClick={() => setActiveSelection('MILES (MI)')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'MILES (MI)' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                            MILES (MI)
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 rounded-xl">
                            <div className="flex gap-3 w-full">
                                <label htmlFor="specialty" className='flex flex-col flex-grow'>
                                    <input type="text" name="specialty" id="specialty" placeholder='NGN 1,800.00' className='border outline-none rounded-xl p-4' />
                                    <p className='text-[12px] text-[#e6dae5]'>Price</p>
                                </label>
                                <div className="flex flex-col">
                                    <div className="flex justify-center items-center flex-grow w-[5rem] rounded-xl border bg-[#eaf2ff] text-[#e6dae5]">1</div>
                                    <p className='text-[12px] text-[#e6dae5]'>Qty</p>
                                </div>
                            </div>
                        </div>
                        <div className="border flex flex-col p-3 rounded-xl gap-3">
                            <div className="flex gap-3 items-center">
                                <div className="w-6 h-6 bg-[#006838] rounded-full flex justify-center items-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <p className='text-[12px] text-[#e6dae5]'>Discount</p>
                            </div>
                            <div className="flex gap-3 w-full">
                                <label htmlFor="specialty" className='flex flex-col flex-grow'>
                                    <input type="text" name="specialty" id="specialty" placeholder='NGN 1,800.00' className='border outline-none rounded-xl p-4' />
                                    <p className='text-[12px] text-[#e6dae5]'>Price</p>
                                </label>
                                <div className="flex flex-col">
                                    <div className="flex justify-center items-center flex-grow w-[5rem] rounded-xl border bg-[#eaf2ff] text-[#e6dae5]">45</div>
                                    <p className='text-[12px] text-[#e6dae5]'>Qty</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeRoute === 'preview' && (
                    <>
                        <div className="flex flex-col rounded-xl gap-3 bg-[#F8F9FE] p-3">
                            <div onClick={() => setLocationToggle('portharcourt')} className="flex justify-between gap-2 items-center">
                                <div className="flex justify-center items-center p-1 rounded-full bg-[#c3cad9]">
                                    <FaTimes className='text-white' />
                                </div>
                                <p className="text-black">Port Harcourt</p>
                                <p className="text-xs text-[#71727A]">N1,800 / km</p>
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full w-1 h-1 bg-[#006838]"></div>
                                    <p className='text-[#006838]'>All Locations</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="flex justify-center items-center bg-[#eaf2ff] py-1 px-3 text-sm rounded-md">EDIT ROUTE</div>
                                    <FaChevronDown className='text-[#71727A]' />
                                </div>
                            </div>
                            <div ref={locationRef} style={{
                                height: locationToggle === 'portharcourt' ? `${locationRef.current?.scrollHeight}px` : '0px',
                                overflow: 'hidden',
                                transition: 'height 0.3s ease-in-out',
                            }}>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127223.16264394466!2d7.00479655!3d4.81741045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cea39f2c48e3%3A0x53562bdd7d8832db!2sPort%20Harcourt%2C%20Rivers!5e0!3m2!1sen!2sng!4v1754526074357!5m2!1sen!2sng" width="100%" height="450" className='rounded-2xl'></iframe>
                            </div>
                        </div>
                    </>
                )}
            </div>
        ) : (
            <>
                <div className="flex mb-5 justify-between items-center py-3 bg-[#f8f9fe]">
                    <div className="flex gap-4 items-center border-s-4 border-[#29cc39] ps-5 py-2">
                    <p className="font-bold text-[#4d5e80]">NEW SPECIALTY</p>
                    </div>
                    <div onClick={() => setAddProduct(!addProduct)} className="flex items-center mx-5 p-2 rounded-full bg-white justify-center">
                    <Icon icon={'mdi:plus'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                    </div>
                </div>
                <div className="flex p-1 bg-[#F8F9FE] mb-5 rounded-[16px] w-full">
                    {tabs.map((tab) => (
                        <button
                        key={tab}
                        onClick={() => setActiveStatTab(tab)}
                        className={`py-3 md:py-3 px-3 w-full rounded-[12px] text-center text-xs ${
                            activeStatTab === tab ? 'bg-white font-semibold' : 'text-[#71727A]'
                        }`}
                        >
                        {tab}
                        </button>
                    ))}
                </div>
                {activeStatTab === "Pick-up" && (    
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col rounded-xl gap-3 bg-[#F8F9FE] p-3">
                            <div onClick={() => setLocationToggle('portharcourt')} className="flex justify-between gap-2 items-center">
                                <div className="flex justify-center items-center p-1 rounded-full bg-[#c3cad9]">
                                    <FaTimes className='text-white' />
                                </div>
                                <p className="text-black">Port Harcourt</p>
                                <p className="text-xs text-[#71727A]">N1,800 / km</p>
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full w-1 h-1 bg-[#006838]"></div>
                                    <p className='text-[#006838]'>All Locations</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="flex justify-center items-center bg-[#eaf2ff] py-1 px-3 text-sm rounded-md">EDIT ROUTE</div>
                                    <FaChevronDown className='text-[#71727A]' />
                                </div>
                            </div>
                            <div ref={locationRef} style={{
                                height: locationToggle === 'portharcourt' ? `${locationRef.current?.scrollHeight}px` : '0px',
                                overflow: 'hidden',
                                transition: 'height 0.3s ease-in-out',
                            }}>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127223.16264394466!2d7.00479655!3d4.81741045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cea39f2c48e3%3A0x53562bdd7d8832db!2sPort%20Harcourt%2C%20Rivers!5e0!3m2!1sen!2sng!4v1754526074357!5m2!1sen!2sng" width="100%" height="450" className='rounded-2xl'></iframe>
                            </div>
                        </div>
                        <div className="flex flex-col rounded-xl gap-3 bg-[#F8F9FE] p-3">
                            <div onClick={() => setLocationToggle('enugu')} className="flex justify-between gap-2 items-center">
                                <div className="flex justify-center items-center p-1 rounded-full bg-[#c3cad9]">
                                    <FaTimes className='text-white' />
                                </div>
                                <p className="text-black">Enugu</p>
                                <p className="text-xs text-[#71727A]">N1,800 / km</p>
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full w-1 h-1 bg-[#006838]"></div>
                                    <p className='text-[#006838]'>All Locations</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="flex justify-center items-center bg-[#eaf2ff] py-1 px-3 text-sm rounded-md">EDIT ROUTE</div>
                                    <FaChevronDown className='text-[#71727A]' />
                                </div>
                            </div>
                            <div ref={locationRef} style={{
                                height: locationToggle === 'enugu' ? `${locationRef.current?.scrollHeight}px` : '0px',
                                overflow: 'hidden',
                                transition: 'height 0.3s ease-in-out',
                            }}>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127223.16264394466!2d7.00479655!3d4.81741045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cea39f2c48e3%3A0x53562bdd7d8832db!2sPort%20Harcourt%2C%20Rivers!5e0!3m2!1sen!2sng!4v1754526074357!5m2!1sen!2sng" width="100%" height="450" className='rounded-2xl'></iframe>
                            </div>
                        </div>
                    </div>
                )}
                {activeStatTab === "Drop-off" && (    
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col rounded-xl gap-3 bg-[#F8F9FE] p-3">
                            <div onClick={() => setLocationToggle('portharcourt')} className="flex justify-between gap-2 items-center">
                                <div className="flex justify-center items-center p-1 rounded-full bg-[#c3cad9]">
                                    <FaTimes className='text-white' />
                                </div>
                                <p className="text-black">Port Harcourt</p>
                                <p className="text-xs text-[#71727A]">N1,800 / km</p>
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full w-1 h-1 bg-[#006838]"></div>
                                    <p className='text-[#006838]'>All Locations</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="flex justify-center items-center bg-[#eaf2ff] py-1 px-3 text-sm rounded-md">EDIT ROUTE</div>
                                    <FaChevronDown className='text-[#71727A]' />
                                </div>
                            </div>
                            <div ref={locationRef} style={{
                                height: locationToggle === 'portharcourt' ? `${locationRef.current?.scrollHeight}px` : '0px',
                                overflow: 'hidden',
                                transition: 'height 0.3s ease-in-out',
                            }}>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127223.16264394466!2d7.00479655!3d4.81741045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cea39f2c48e3%3A0x53562bdd7d8832db!2sPort%20Harcourt%2C%20Rivers!5e0!3m2!1sen!2sng!4v1754526074357!5m2!1sen!2sng" width="100%" height="450" className='rounded-2xl'></iframe>
                            </div>
                        </div>
                        <div className="flex flex-col rounded-xl gap-3 bg-[#F8F9FE] p-3">
                            <div onClick={() => setLocationToggle('enugu')} className="flex justify-between gap-2 items-center">
                                <div className="flex justify-center items-center p-1 rounded-full bg-[#c3cad9]">
                                    <FaTimes className='text-white' />
                                </div>
                                <p className="text-black">Enugu</p>
                                <p className="text-xs text-[#71727A]">N1,800 / km</p>
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full w-1 h-1 bg-[#006838]"></div>
                                    <p className='text-[#006838]'>All Locations</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="flex justify-center items-center bg-[#eaf2ff] py-1 px-3 text-sm rounded-md">EDIT ROUTE</div>
                                    <FaChevronDown className='text-[#71727A]' />
                                </div>
                            </div>
                            <div ref={locationRef} style={{
                                height: locationToggle === 'enugu' ? `${locationRef.current?.scrollHeight}px` : '0px',
                                overflow: 'hidden',
                                transition: 'height 0.3s ease-in-out',
                            }}>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127223.16264394466!2d7.00479655!3d4.81741045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cea39f2c48e3%3A0x53562bdd7d8832db!2sPort%20Harcourt%2C%20Rivers!5e0!3m2!1sen!2sng!4v1754526074357!5m2!1sen!2sng" width="100%" height="450" className='rounded-2xl'></iframe>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )}
    </div>
  )
}

export default LogisticLocation
