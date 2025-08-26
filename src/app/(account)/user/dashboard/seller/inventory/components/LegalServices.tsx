'use client'
import React, { FC, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { FaChevronDown } from 'react-icons/fa';

interface LegalServicesProp {
  setAddProduct: (addProductId: boolean) => void,
  addProduct: boolean,
  setActiveArrayTab: (arrayId: string) => void,
  activeArrayTab: string,
  activeRoute: string,
  setActiveRoute: (routeId: string) => void,
  legalServicesTabSpecialInfo: string,
  setLegalServicesTabSpecialInfo: (info: string) => void,
  legalServicesTabSpecialInfo1: string,
  setLegalServicesTabSpecialInfo1: (info: string) => void,
  legalServicesTabSpecialInfo2: string,
  setLegalServicesTabSpecialInfo2: (info: string) => void,
  legalServicesTabSpecialInfo3: string,
  setLegalServicesTabSpecialInfo3: (info: string) => void,
  legalServicesTabSpecialInfo4: string,
  setLegalServicesTabSpecialInfo4: (info: string) => void,
  legalServicesTabSpecialInfo5: string,
  setLegalServicesTabSpecialInfo5: (info: string) => void,
  setLegalServicesTabInput1: (value: string) => void,
  legalServicesTabInput1: string,
  setLegalServicesTabInput2: (value: string) => void,
  legalServicesTabInput2: string,
  setLegalServicesTabInput3: (value: string) => void,
  legalServicesTabInput3: string,
  countValue: number,
  setCountValue: React.Dispatch<React.SetStateAction<number>>,

}

const LegalServices: FC<LegalServicesProp> = ({setAddProduct, addProduct, setActiveArrayTab, activeArrayTab, activeRoute, setActiveRoute, legalServicesTabSpecialInfo, setLegalServicesTabSpecialInfo, legalServicesTabSpecialInfo1, setLegalServicesTabSpecialInfo1, legalServicesTabSpecialInfo2, setLegalServicesTabSpecialInfo2, legalServicesTabSpecialInfo3, setLegalServicesTabSpecialInfo3, legalServicesTabSpecialInfo4, setLegalServicesTabSpecialInfo4, legalServicesTabSpecialInfo5, setLegalServicesTabSpecialInfo5, setLegalServicesTabInput1, legalServicesTabInput1, setLegalServicesTabInput2, legalServicesTabInput2, setLegalServicesTabInput3, legalServicesTabInput3, countValue, setCountValue}) => {
  const [legalServicesTabSpecialInfo3Toggle, setLegalServicesTabSpecialInfo2Toggle] = useState('cardiology');
  const [sectionSelection, setSectionSelection] = useState('CONSULTATION');
  const cardiologyRef = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState(1)
    const [activeValueState, setActiveValueState] = useState('1')
    const [value1, setValue1] = useState(1)
    const [activeValueState1, setActiveValueState1] = useState('1')
    const [number, setNumber] = useState<number[]>([]);
    const [date, setDate] = useState('year');
    const [monthDropdown, setMonthDropdown] = useState();
    const [timeSelect, setTimeSelect] = useState(false);
    const [timeSelectValue, setTimeSelectValue] = useState('00')
    const [timeSelect1, setTimeSelect1] = useState(false);
    const [timeSelectValue1, setTimeSelectValue1] = useState('00')
    const [timeSelect2, setTimeSelect2] = useState(false);
    const [timeSelectValue2, setTimeSelectValue2] = useState('AM')
    const hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const mins = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '00'];
    const amOrPm = ['AM', 'PM'];
  return (
    <div className='my-5'>
         {addProduct ? (
                        <div>
                            <div className="flex justify-between items-start">
                                <div className={`flex flex-col gap-2 items-center rounded-full ${activeRoute === 'specialty' ? 'opacity-100' : 'opacity-50'}`}>
                                    <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center md:text-md text-[12px] ${activeRoute === 'specialty' ? 'bg-[#006838] text-white' : 'bg-[#e6dae5]'}`}>1</div>
                                    <p className="text-center font-bold md:text-sm text-[12px]">Specialty <br /> Info </p>
                                </div>
                                <div className={`flex flex-col gap-2 items-center rounded-full ${activeRoute === 'provider' ? 'opacity-100' : 'opacity-50'}`}>
                                    <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center md:text-md text-[12px] ${activeRoute === 'provider' ? 'bg-[#006838] text-white' : 'bg-[#e6dae5]'}`}>2</div>
                                    <p className="text-center font-bold md:text-sm text-[12px]">Provider <br /> Info </p>
                                </div>
                                <div className={`flex flex-col gap-2 items-center rounded-full ${activeRoute === 'booking' ? 'opacity-100' : 'opacity-50'}`}>
                                    <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center md:text-md text-[12px] ${activeRoute === 'booking' ? 'bg-[#006838] text-white' : 'bg-[#e6dae5]'}`}>3</div>
                                    <p className="text-center font-bold md:text-sm text-[12px]">Booking <br /> Info </p>
                                </div>
                                <div className={`flex flex-col gap-2 items-center rounded-full ${activeRoute === 'preview' ? 'opacity-100' : 'opacity-50'}`}>
                                    <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center md:text-md text-[12px] ${activeRoute === 'preview' ? 'bg-[#006838] text-white' : 'bg-[#e6dae5]'}`}>4</div>
                                    <p className="text-center font-bold md:text-sm text-[12px]">Preview </p>
                                </div>
                            </div>
                            {activeRoute === 'specialty' && (
                                <div className='flex flex-col gap-5 my-5'>
                                    <div className="flex flex-col gap-3">
                                        <label htmlFor="specialty">
                                            <input onChange={(e) => setLegalServicesTabInput1(e.target.value)} type="text" name="specialty" id="specialty" placeholder='Specialty Title' className='border rounded-xl p-4 w-full' />
                                        </label>
                                        <label htmlFor="specialty">
                                            <input onChange={(e) => setLegalServicesTabInput2(e.target.value)} type="text" name="specialty" id="specialty" placeholder='Briefly Describe' className='border rounded-xl p-4 w-full' />
                                        </label>
                                        <p className='text-[12px] text-[#e6dae5]'>0/30</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-3">
                                            <p className="font-light">Similar Specialties</p>
                                            <p className="text-sm text-[#e6dae5]">List of Available Categories</p>
                                        </div>
                                        <div className="w-8 h-8 items-center justify-center flex bg-[#006838] text-white rounded-full">9</div>
                                    </div>
                                    <div className="flex items-center flex-wrap gap-3 my-5">
                                        <div onClick={() => setLegalServicesTabSpecialInfo('CRIMINAL LAW')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo === 'CRIMINAL LAW' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                        CRIMINAL LAW
                                        </div>
                                        <div onClick={() => setLegalServicesTabSpecialInfo('PROPERTY LAW')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo === 'PROPERTY LAW' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                        PROPERTY LAW
                                        </div>
                                        <div onClick={() => setLegalServicesTabSpecialInfo('FAMILY LAW')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo === 'FAMILY LAW' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                        FAMILY LAW
                                        </div>
                                        <div onClick={() => setLegalServicesTabSpecialInfo('COPORATE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo === 'COPORATE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                        COPORATE
                                        </div>
                                        <div onClick={() => setLegalServicesTabSpecialInfo('TAXATION')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo === 'TAXATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                        TAXATION
                                        </div>
                                        <div onClick={() => setLegalServicesTabSpecialInfo('EMPLOYMENT')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo === 'EMPLOYMENT' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                        EMPLOYMENT
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-3">
                                            <p className="font-light">Services Available</p>
                                            <p className="text-sm text-[#e6dae5]">Select a Category</p>
                                        </div>
                                        <div className="w-8 h-8 items-center justify-center flex bg-[#006838] text-white rounded-full">9</div>
                                    </div>
                                    <div className="flex items-center flex-wrap gap-3 my-5">
                                        <div onClick={() => setLegalServicesTabSpecialInfo1('CONSULTATION')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo1 === 'CONSULTATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                        CONSULTATION
                                        </div>
                                        <div onClick={() => setLegalServicesTabSpecialInfo1('REPRESENTATION')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo1 === 'REPRESENTATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                        REPRESENTATION
                                        </div>
                                        <div onClick={() => setLegalServicesTabSpecialInfo1('ADVICE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo1 === 'ADVICE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                        ADVICE
                                        </div>
                                        <div onClick={() => setLegalServicesTabSpecialInfo1('DOCUMENTATION')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo1 === 'DOCUMENTATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                        DOCUMENTATION
                                        </div>
                                        <div onClick={() => setLegalServicesTabSpecialInfo1('CALL')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo1 === 'CALL' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                        CALL
                                        </div>
                                        <div onClick={() => setLegalServicesTabSpecialInfo1('RETAIN')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo1 === 'RETAIN' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                        RETAIN
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 border p-3 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="flex justify-center items-center w-6 h-6 bg-[#006838] rounded-full">
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            </div>
                                            <p className="font-semibold text-gray-500">Procedure Type</p>
                                        </div>
                                        <label htmlFor="specialty">
                                            <input onChange={(e) => setLegalServicesTabInput3(e.target.value)} type="text" name="specialty" id="specialty" placeholder='NGN 10' className='border rounded-xl p-4 w-full' />
                                        </label>
                                        <p className='text-[12px] text-[#e6dae5]'>Payable before service</p>
                                    </div>
                                </div>
                            )}
                            {activeRoute === 'provider' && (
                                <div className='flex flex-col gap-5 my-5'>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3 p-3 rounded-xl border">
                                            <Icon icon={'mdi:swap-vertical'} style={{fontSize: '20px', color: '#e6dae5'}} />
                                            Multiple
                                            <Icon icon={'mdi:chevron-down'} style={{fontSize: '20px', color: '#e6dae5'}} />
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <p>Add Provider</p>
                                            <div className="flex items-center gap-3">
                                                <button className='w-7 h-7 rounded-full bg-[#f8f9fe]' onClick={() => {
                                                    if(value <= 1) {
                                                        return 1
                                                    } else{
                                                        return setValue(value - 1)}; setCountValue(value)
                                                }}>-</button>
                                                <p>{value}</p>
                                                <button className='w-7 h-7 rounded-full bg-[#f8f9fe]' onClick={() => {
                                                    if(value >= 4) {
                                                        return 4
                                                    } else {
                                                        return setValue(value + 1)
                                                    }; 
                                                    setCountValue(value)
                                                }}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div onClick={() => setActiveValueState('1')} className={`w-7 h-7 justify-center items-center rounded-full ${value >= 1 ? 'flex' : ' hidden'} ${activeValueState === '1' ? 'bg-[#006838] text-white' : 'bg-[#f8f9fe]'}`}>1</div>
                                        <div onClick={() => setActiveValueState('2')} className={`w-7 h-7 justify-center items-center rounded-full ${value >= 2 ? 'flex' : ' hidden'} ${activeValueState === '2' ? 'bg-[#006838] text-white' : 'bg-[#f8f9fe]'}`}>2</div>
                                        <div onClick={() => setActiveValueState('3')} className={`w-7 h-7 justify-center items-center rounded-full ${value >= 3 ? 'flex' : ' hidden'} ${activeValueState === '3' ? 'bg-[#006838] text-white' : 'bg-[#f8f9fe]'}`}>3</div>
                                        <div onClick={() => setActiveValueState('4')} className={`w-7 h-7 justify-center items-center rounded-full ${value >= 4 ? 'flex' : ' hidden'} ${activeValueState === '4' ? 'bg-[#006838] text-white' : 'bg-[#f8f9fe]'}`}>4</div>
                                    </div>
                                    {value >= 1 && activeValueState === '1' && (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col gap-3">
                                                    <p className="font-light">Provider Type</p>
                                                    <p className="text-sm text-[#e6dae5]">Select a category</p>
                                                </div>
                                                <div className="w-8 h-8 items-center justify-center flex bg-[#006838] text-white rounded-full">9</div>
                                            </div>
                                            <div className="flex items-center flex-wrap gap-3 my-5">
                                                <div onClick={() => setLegalServicesTabSpecialInfo2('PARTNER')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo2 === 'PARTNER' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                PARTNER
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo2('ASSOCIATE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo2 === 'ASSOCIATE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                ASSOCIATE
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo2('PARALEGAL')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo2 === 'PARALEGAL' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                PARALEGAL
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo2('LEGAL ASSISTANT')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo2 === 'LEGAL ASSISTANT' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                LEGAL ASSISTANT
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo2('CONSUNTANT')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo2 === 'CONSUNTANT' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                CONSUNTANT
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label htmlFor="specialty">
                                                    <input type="text" name="specialty" id="specialty" placeholder='Provider Name' className='border rounded-xl p-4 w-full' />
                                                </label>
                                                <label htmlFor="specialty">
                                                    <input type="text" name="specialty" id="specialty" placeholder='Profile URL' className='border rounded-xl p-4 w-full' />
                                                </label>
                                            </div>
                                        </>
                                    )}
                                    {value >= 2 && activeValueState === '2' && (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col gap-3">
                                                    <p className="font-light">Provider Type</p>
                                                    <p className="text-sm text-[#e6dae5]">Select a category</p>
                                                </div>
                                                <div className="w-8 h-8 items-center justify-center flex bg-[#006838] text-white rounded-full">9</div>
                                            </div>
                                            <div className="flex items-center flex-wrap gap-3 my-5">
                                                <div onClick={() => setLegalServicesTabSpecialInfo3('PARTNER')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo3 === 'PARTNER' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                PARTNER
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo3('ASSOCIATE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo3 === 'ASSOCIATE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                ASSOCIATE
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo3('PARALEGAL')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo3 === 'PARALEGAL' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                PARALEGAL
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo3('LEGAL ASSISTANT')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo3 === 'LEGAL ASSISTANT' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                LEGAL ASSISTANT
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo4('CONSUNTANT')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo3 === 'CONSUNTANT' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                CONSUNTANT
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo3('EMPLOYMENT')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo3 === 'EMPLOYMENT' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                EMPLOYMENT
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label htmlFor="specialty">
                                                    <input type="text" name="specialty" id="specialty" placeholder='Provider Name' className='border rounded-xl p-4 w-full' />
                                                </label>
                                                <label htmlFor="specialty">
                                                    <input type="text" name="specialty" id="specialty" placeholder='Profile URL' className='border rounded-xl p-4 w-full' />
                                                </label>
                                            </div>
                                        </>
                                    )}
                                    {value >= 3 && activeValueState === '3' && (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col gap-3">
                                                    <p className="font-light">Provider Type</p>
                                                    <p className="text-sm text-[#e6dae5]">Select a category</p>
                                                </div>
                                                <div className="w-8 h-8 items-center justify-center flex bg-[#006838] text-white rounded-full">9</div>
                                            </div>
                                            <div className="flex items-center flex-wrap gap-3 my-5">
                                                <div onClick={() => setLegalServicesTabSpecialInfo4('PARTNER')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo4 === 'PARTNER' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                PARTNER
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo4('ASSOCIATE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo4 === 'ASSOCIATE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                ASSOCIATE
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo4('PARALEGAL')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo4 === 'PARALEGAL' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                PARALEGAL
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo4('LEGAL ASSISTANT')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo4 === 'LEGAL ASSISTANT' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                LEGAL ASSISTANT
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo4('CONSUNTANT')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo4 === 'CONSUNTANT' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                CONSUNTANT
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo4('EMPLOYMENT')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo4 === 'EMPLOYMENT' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                EMPLOYMENT
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label htmlFor="specialty">
                                                    <input type="text" name="specialty" id="specialty" placeholder='Provider Name' className='border rounded-xl p-4 w-full' />
                                                </label>
                                                <label htmlFor="specialty">
                                                    <input type="text" name="specialty" id="specialty" placeholder='Profile URL' className='border rounded-xl p-4 w-full' />
                                                </label>
                                            </div>
                                        </>
                                    )}
                                    {value >= 4 && activeValueState === '4' && (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col gap-3">
                                                    <p className="font-light">Provider Type</p>
                                                    <p className="text-sm text-[#e6dae5]">Select a category</p>
                                                </div>
                                                <div className="w-8 h-8 items-center justify-center flex bg-[#006838] text-white rounded-full">9</div>
                                            </div>
                                            <div className="flex items-center flex-wrap gap-3 my-5">
                                                <div onClick={() => setLegalServicesTabSpecialInfo5('PARTNER')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo5 === 'PARTNER' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                PARTNER
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo5('ASSOCIATE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo5 === 'ASSOCIATE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                ASSOCIATE
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo5('PARALEGAL')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo5 === 'PARALEGAL' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                PARALEGAL
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo5('LEGAL ASSISTANT')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo5 === 'LEGAL ASSISTANT' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                LEGAL ASSISTANT
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo5('CONSUNTANT')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo5 === 'CONSUNTANT' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                CONSUNTANT
                                                </div>
                                                <div onClick={() => setLegalServicesTabSpecialInfo5('EMPLOYMENT')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo5 === 'EMPLOYMENT' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                                EMPLOYMENT
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label htmlFor="specialty">
                                                    <input type="text" name="specialty" id="specialty" placeholder='Provider Name' className='border rounded-xl p-4 w-full' />
                                                </label>
                                                <label htmlFor="specialty">
                                                    <input type="text" name="specialty" id="specialty" placeholder='Profile URL' className='border rounded-xl p-4 w-full' />
                                                </label>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                            {activeRoute === 'booking' && (
                                <div className='flex flex-col gap-5 my-5'>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3 p-3 rounded-xl border">
                                            <Icon icon={'mdi:swap-vertical'} style={{fontSize: '20px', color: '#e6dae5'}} />
                                            Multiple
                                            <Icon icon={'mdi:chevron-down'} style={{fontSize: '20px', color: '#e6dae5'}} />
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <p>Add Provider</p>
                                            <div className="flex items-center gap-3">
                                                <button className='w-7 h-7 rounded-full bg-[#f8f9fe]' onClick={() => {
                                                    if(value1 <= 1) {
                                                        return 1
                                                    } else{
                                                        return setValue1(value1 - 1)}
                                                }}>-</button>
                                                <p>{value1}</p>
                                                <button className='w-7 h-7 rounded-full bg-[#f8f9fe]' onClick={() => {
                                                    if(value1 >= 4) {
                                                        return 4
                                                    } else {
                                                        return setValue1(value1 + 1)
                                                    }
                                                }}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div onClick={() => setActiveValueState1('1')} className={`w-7 h-7 justify-center items-center rounded-full ${value1 >= 1 ? 'flex' : ' hidden'} ${activeValueState1 === '1' ? 'bg-[#006838] text-white' : 'bg-[#f8f9fe]'}`}>1</div>
                                        <div onClick={() => setActiveValueState1('2')} className={`w-7 h-7 justify-center items-center rounded-full ${value1 >= 2 ? 'flex' : ' hidden'} ${activeValueState1 === '2' ? 'bg-[#006838] text-white' : 'bg-[#f8f9fe]'}`}>2</div>
                                        <div onClick={() => setActiveValueState1('3')} className={`w-7 h-7 justify-center items-center rounded-full ${value1 >= 3 ? 'flex' : ' hidden'} ${activeValueState1 === '3' ? 'bg-[#006838] text-white' : 'bg-[#f8f9fe]'}`}>3</div>
                                        <div onClick={() => setActiveValueState1('4')} className={`w-7 h-7 justify-center items-center rounded-full ${value1 >= 4 ? 'flex' : ' hidden'} ${activeValueState1 === '4' ? 'bg-[#006838] text-white' : 'bg-[#f8f9fe]'}`}>4</div>
                                    </div>
                                    {value1 >= 1 && activeValueState1 === '1' && (
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
                                            <div className="flex flex-col gap-5">
                                                <label htmlFor="specialty">
                                                    <input type="text" name="specialty" id="specialty" placeholder='Booking Title, e.g Afternoon Session' className='border rounded-xl p-4 w-full' />
                                                </label>
                                                <div className="flex justify-between items-center">
                                                    <p className="font-light text-sm">Slot 1</p>
                                                    <div className="flex gap-3 items-center">
                                                        <div onClick={() => setTimeSelect(!timeSelect)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                            <p>{timeSelectValue}</p>
                                                            <Icon icon={'mdi:chevron-down'} />
                                                            <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                                height: timeSelect ? '300px' : '0px'
                                                            }}>
                                                                {hours.map((hour, index) => (
                                                                    <p key={index} onClick={() => setTimeSelectValue(hour)} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{hour}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p>:</p>
                                                        <div onClick={() => setTimeSelect1(!timeSelect1)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect1 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                            <p>{timeSelectValue1}</p>
                                                            <Icon icon={'mdi:chevron-down'} />
                                                            <div className="absolute flex flex-col gap-2 bg-white rounded top-10 transition-height duration-200 ease-in-out overflow-y-auto w-full" style={{
                                                                height: timeSelect1 ? '300px' : '0px'
                                                            }}>
                                                                {mins.map((min, index) => (
                                                                    <p key={index} onClick={() => setTimeSelectValue1(min)} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{min}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p>:</p>
                                                        <div onClick={() => setTimeSelect2(!timeSelect2)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect2 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                            <p>{timeSelectValue2}</p>
                                                            <Icon icon={'mdi:chevron-down'} />
                                                            <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                                height: timeSelect2 ? '300px' : '0px'
                                                            }}>
                                                                {amOrPm.map((or, index) => (
                                                                    <p key={index} onClick={() => setTimeSelectValue2(or)} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{or}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {value1 >= 2 && activeValueState1 === '2' && (
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
                                            <div className="flex flex-col gap-5">
                                                <label htmlFor="specialty">
                                                    <input type="text" name="specialty" id="specialty" placeholder='Booking Title, e.g Afternoon Session' className='border rounded-xl p-4 w-full' />
                                                </label>
                                                <div className="flex justify-between items-center">
                                                    <p className="font-light text-sm">Slot 1</p>
                                                    <div className="flex gap-3 items-center">
                                                        <div onClick={() => setTimeSelect(!timeSelect)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                            <p>{timeSelectValue}</p>
                                                            <Icon icon={'mdi:chevron-down'} />
                                                            <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                                height: timeSelect ? '300px' : '0px'
                                                            }}>
                                                                {hours.map((hour, index) => (
                                                                    <p key={index} onClick={() => setTimeSelectValue(hour)} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{hour}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p>:</p>
                                                        <div onClick={() => setTimeSelect1(!timeSelect1)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect1 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                            <p>{timeSelectValue1}</p>
                                                            <Icon icon={'mdi:chevron-down'} />
                                                            <div className="absolute flex flex-col gap-2 bg-white rounded top-10 transition-height duration-200 ease-in-out overflow-y-auto w-full" style={{
                                                                height: timeSelect1 ? '300px' : '0px'
                                                            }}>
                                                                {mins.map((min, index) => (
                                                                    <p key={index} onClick={() => setTimeSelectValue1(min)} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{min}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p>:</p>
                                                        <div onClick={() => setTimeSelect2(!timeSelect2)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect2 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                            <p>{timeSelectValue2}</p>
                                                            <Icon icon={'mdi:chevron-down'} />
                                                            <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                                height: timeSelect2 ? '300px' : '0px'
                                                            }}>
                                                                {amOrPm.map((or, index) => (
                                                                    <p key={index} onClick={() => setTimeSelectValue2(or)} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{or}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {value1 >= 3 && activeValueState1 === '3' && (
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
                                            <div className="flex flex-col gap-5">
                                                <label htmlFor="specialty">
                                                    <input type="text" name="specialty" id="specialty" placeholder='Booking Title, e.g Afternoon Session' className='border rounded-xl p-4 w-full' />
                                                </label>
                                                <div className="flex justify-between items-center">
                                                    <p className="font-light text-sm">Slot 1</p>
                                                    <div className="flex gap-3 items-center">
                                                        <div onClick={() => setTimeSelect(!timeSelect)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                            <p>{timeSelectValue}</p>
                                                            <Icon icon={'mdi:chevron-down'} />
                                                            <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                                height: timeSelect ? '300px' : '0px'
                                                            }}>
                                                                {hours.map((hour, index) => (
                                                                    <p key={index} onClick={() => setTimeSelectValue(hour)} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{hour}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p>:</p>
                                                        <div onClick={() => setTimeSelect1(!timeSelect1)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect1 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                            <p>{timeSelectValue1}</p>
                                                            <Icon icon={'mdi:chevron-down'} />
                                                            <div className="absolute flex flex-col gap-2 bg-white rounded top-10 transition-height duration-200 ease-in-out overflow-y-auto w-full" style={{
                                                                height: timeSelect1 ? '300px' : '0px'
                                                            }}>
                                                                {mins.map((min, index) => (
                                                                    <p key={index} onClick={() => setTimeSelectValue1(min)} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{min}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p>:</p>
                                                        <div onClick={() => setTimeSelect2(!timeSelect2)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect2 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                            <p>{timeSelectValue2}</p>
                                                            <Icon icon={'mdi:chevron-down'} />
                                                            <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                                height: timeSelect2 ? '300px' : '0px'
                                                            }}>
                                                                {amOrPm.map((or, index) => (
                                                                    <p key={index} onClick={() => setTimeSelectValue2(or)} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{or}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {value1 >= 4 && activeValueState1 === '4' && (
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
                                            <div className="flex flex-col gap-5">
                                                <label htmlFor="specialty">
                                                    <input type="text" name="specialty" id="specialty" placeholder='Booking Title, e.g Afternoon Session' className='border rounded-xl p-4 w-full' />
                                                </label>
                                                <div className="flex justify-between items-center">
                                                    <p className="font-light text-sm">Slot 1</p>
                                                    <div className="flex gap-3 items-center">
                                                        <div onClick={() => setTimeSelect(!timeSelect)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                            <p>{timeSelectValue}</p>
                                                            <Icon icon={'mdi:chevron-down'} />
                                                            <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                                height: timeSelect ? '300px' : '0px'
                                                            }}>
                                                                {hours.map((hour, index) => (
                                                                    <p key={index} onClick={() => setTimeSelectValue(hour)} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{hour}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p>:</p>
                                                        <div onClick={() => setTimeSelect1(!timeSelect1)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect1 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                            <p>{timeSelectValue1}</p>
                                                            <Icon icon={'mdi:chevron-down'} />
                                                            <div className="absolute flex flex-col gap-2 bg-white rounded top-10 transition-height duration-200 ease-in-out overflow-y-auto w-full" style={{
                                                                height: timeSelect1 ? '300px' : '0px'
                                                            }}>
                                                                {mins.map((min, index) => (
                                                                    <p key={index} onClick={() => setTimeSelectValue1(min)} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{min}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p>:</p>
                                                        <div onClick={() => setTimeSelect2(!timeSelect2)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect2 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                            <p>{timeSelectValue2}</p>
                                                            <Icon icon={'mdi:chevron-down'} />
                                                            <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                                height: timeSelect2 ? '300px' : '0px'
                                                            }}>
                                                                {amOrPm.map((or, index) => (
                                                                    <p key={index} onClick={() => setTimeSelectValue2(or)} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{or}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                            {activeRoute === 'preview' && (
                                <>
                                    <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
                                            <div onClick={() => setLegalServicesTabSpecialInfo2Toggle('criminal')} className="flex justify-between items-center">
                                                <div className="flex gap-2 items-center">
                                                <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                                                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                                                </div>
                                                <p className='md:text-md text-[10px]'>Criminal Law</p>
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                                                <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                                                <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                                                </div>
                                            </div>
                                            <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 bg-white rounded-lg ${legalServicesTabSpecialInfo3Toggle === 'criminal' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                                                height: legalServicesTabSpecialInfo3Toggle === 'criminal' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
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
                    <div className="flex justify-between items-center py-3 bg-[#E0F4EA]">
                        <div className="flex gap-4 items-center border-s-4 border-[#29cc39] ps-5 py-2">
                        <p className="font-bold text-[#4d5e80]">NEW SPECIALTY</p>
                        </div>
                        <div onClick={() => setAddProduct(!addProduct)} className="flex items-center mx-5 p-2 rounded-full bg-white justify-center">
                        <Icon icon={'mdi:plus'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                        </div>
                    </div>
                    <div className="flex justify-between my-5 items-center">
                        <p>Your Providers</p>
                        <div className="w-10 h-10 rounded-full bg-[#006838] text-white flex justify-center items-center">9</div>
                    </div>
                    <div className="flex items-center flex-wrap gap-3">
                        <div onClick={() => setLegalServicesTabSpecialInfo2('ASMAU MUSA')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo3 === 'ASMAU MUSA' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        ASMA'U MUSA
                        </div>
                        <div onClick={() => setLegalServicesTabSpecialInfo2('ESTHER PEPPLE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo3 === 'ESTHER PEPPLE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        ESTHER PEPPLE
                        </div>
                        <div onClick={() => setLegalServicesTabSpecialInfo2('NAOMI OJO')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo3 === 'NAOMI OJO' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        NAOMI OJO
                        </div>
                        <div onClick={() => setLegalServicesTabSpecialInfo2('JOSEPH BANKOLE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo3 === 'JOSEPH BANKOLE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        JOSEPH BANKOLE
                        </div>
                        <div onClick={() => setLegalServicesTabSpecialInfo2('DANIEL ORJI')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo3 === 'DANIEL ORJI' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        DANIEL ORJI
                        </div>
                        <div onClick={() => setLegalServicesTabSpecialInfo2('SIMON ANOZIE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${legalServicesTabSpecialInfo3 === 'SIMON ANOZIE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        SIMON ANOZIE
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 my-5">
                                <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
                                    <div onClick={() => setLegalServicesTabSpecialInfo2Toggle('cardiology')} className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                                        <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                                        </div>
                                        <p className='md:text-md text-[10px]'>Criminal Law</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                                        <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                                        <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                                    </div>
                                    </div>
                                    <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 bg-white rounded-lg ${legalServicesTabSpecialInfo3Toggle === 'cardiology' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                                    height: legalServicesTabSpecialInfo3Toggle === 'cardiology' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
                                    }}>
                                    <p className='text-[##afafb4] md:text-md text-[12px]'>Students in criminal law learn about the fundamental principles of criminal justice, including the elements of crimes, legal procedures, and courtroom practice. They study topics such as criminal responsibility, offenses against persons and property, constitutional rights of the accused, and sentencing.</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[##d6dae5] md:text-sm text-[12px]">Section</p>
                                        <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">Senior Secondary</div>
                                    </div>
                                    <div className="flex justify-between gap-3 items-center overflow-x-auto flex-shrink-0">
                                        <div onClick={() => setSectionSelection('CONSULTATION')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${sectionSelection === 'CONSULTATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
                                            CONSULTATION
                                        </div>
                                        <div onClick={() => setSectionSelection('REPRESENATION')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${sectionSelection === 'REPRESENATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
                                            REPRESENATION
                                        </div>
                                        <div onClick={() => setSectionSelection('ADVICE')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${sectionSelection === 'ADVICE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
                                            ADVICE
                                        </div>
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
                            </div>
                </>
            )}
    </div>
  )
}

export default LegalServices