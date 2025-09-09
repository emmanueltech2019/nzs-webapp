'use client'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { FaChevronDown } from 'react-icons/fa'
import { list } from 'postcss';

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

interface LegalServices {
    title: string;
    description: string; 
    similarSpecialty: string;
    servicesAvailable: string;
    procedureType: string;
    providerDetails: ProviderDetails[];
    bookingDetails: BookingDetail[];
}

interface LegalServicesProp {
  servicesSelection1: string,
  setServicesSelection1: (serviceId: string) => void;
  servicesSelection2: string,
  setServicesSelection2: (serviceId: string) => void;
  tab: string[]
  value: number;
  allLegalServicesObject: LegalServices[];
  handleRemoveServices: (index: number) => void;
  setAllLegalServicesObject: (services: LegalServices[]) => void;
}

const LegalServices: FC<LegalServicesProp> = ({ 
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

export default LegalServices



interface AddSpecialtyProps {
    activeRoute: string,
    setActiveRoute: (routeId: string) => void,
    setAddProduct: (addProductId: boolean) => void
    addProduct: boolean
    specialtyActiveSelection1: string,
    setSpecialtyActiveSelection1: (specialtyId: string) => void;
    specialtyActiveSelection2: string,
    setSpecialtyActiveSelection2: (specialtyId: string) => void;
    providerActiveSelection1: string,
    setProviderActiveSelection1: (provideId: string) => void;
    providerActiveSelection2: string,
    setProviderActiveSelection2: (provideId: string) => void;
    providerActiveSelection3: string,
    setProviderActiveSelection3: (provideId: string) => void;
    providerActiveSelection4: string,
    setProviderActiveSelection4: (provideId: string) => void;
    specialtyDescription: string,
    setSpecialDescription: (description: string) => void,
    similarSpecialty: string,
    setSimilarSpecialty: (title: string) => void,
    servicesAvailable: string,
    setServicesAvailable: (description: string) => void,
    procedureType: string, 
    setProcedureType: (title: string) => void,
    servicesSelection1: string,
    setServicesSelection1: (serviceId: string) => void;
    servicesSelection2: string,
    setServicesSelection2: (serviceId: string) => void;
    specialtyTitle: string, 
    setSpecialTitle: (title: string) => void,
    providerCategory1: string,
    setProviderCategory1: (categoryId: string) => void,
    providerCategory2: string,
    setProviderCategory2: (categoryId: string) => void,
    providerCategory3: string,
    setProviderCategory3: (categoryId: string) => void,
    providerCategory4: string,
    setProviderCategory4: (categoryId: string) => void,
    providerName1: string,
    setProviderName1: (nameId: string) => void,
    providerName2: string,
    setProviderName2: (nameId: string) => void,
    providerName3: string,
    setProviderName3: (nameId: string) => void,
    providerName4: string,
    setProviderName4: (nameId: string) => void,
    profileUrl1: string,
    setProfileUrl1: (urlId: string) => void,
    profileUrl2: string,
    setProfileUrl2: (urlId: string) => void,
    profileUrl3: string,
    setProfileUrl3: (urlId: string) => void,
    profileUrl4: string,
    setProfileUrl4: (urlId: string) => void,
    bookingYear1: number,
    setBookingYear1: (yearId: number) => void,
    bookingYear2: number,
    setBookingYear2: (yearId: number) => void,
    bookingYear3: number,
    setBookingYear3: (yearId: number) => void,
    bookingYear4: number,
    setBookingYear4: (yearId: number) => void,
    bookingMonth1: string,
    setBookingMonth1: (monthId: string) => void,
    bookingMonth2: string,
    setBookingMonth2: (monthId: string) => void,
    bookingMonth3: string,
    setBookingMonth3: (monthId: string) => void,
    bookingMonth4: string,
    setBookingMonth4: (monthId: string) => void,
    bookingDate1: number,
    setBookingDate1: (dateId: number) => void,
    bookingDate2: number,
    setBookingDate2: (dateId: number) => void,
    bookingDate3: number,
    setBookingDate3: (dateId: number) => void,
    bookingDate4: number,
    setBookingDate4: (dateId: number) => void,
    bookingDay1: string,
    setBookingDay1: (dayId: string) => void,
    bookingDay2: string,
    setBookingDay2: (dayId: string) => void,
    bookingDay3: string,
    setBookingDay3: (dayId: string) => void,
    bookingDay4: string,
    setBookingDay4: (dayId: string) => void,
    bookingTitle1: string,
    setBookingTitle1: (titleId: string) => void,
    bookingTitle2: string,
    setBookingTitle2: (titleId: string) => void,
    bookingTitle3: string,
    setBookingTitle3: (titleId: string) => void,
    bookingTitle4: string,
    setBookingTitle4: (titleId: string) => void,
    bookingMinutes1: string,
    setBookingMinutes1: (minutesId: string) => void,
    bookingMinutes2: string,
    setBookingMinutes2: (minutesId: string) => void,
    bookingMinutes3: string,
    setBookingMinutes3: (minutesId: string) => void,
    bookingMinutes4: string,
    setBookingMinutes4: (minutesId: string) => void,
    bookingHours1: string,
    setBookingHours1: (hoursId: string) => void,
    bookingHours2: string,
    setBookingHours2: (hoursId: string) => void,
    bookingHours3: string,
    setBookingHours3: (hoursId: string) => void,
    bookingHours4: string,
    setBookingHours4: (hoursId: string) => void,
    bookingAmOrPm1: string,
    setBookingAmOrPm1: (amOrPmId: string) => void,
    bookingAmOrPm2: string,
    setBookingAmOrPm2: (amOrPmId: string) => void,
    bookingAmOrPm3: string,
    setBookingAmOrPm3: (amOrPmId: string) => void,
    bookingAmOrPm4: string,
    setBookingAmOrPm4: (amOrPmId: string) => void,
    collectValue1: number;
    setCollectValue1: (value: number) => void;
    collectValue2: number;
    setCollectValue2: (value: number) => void;
}


export const AddSpecialty:FC<AddSpecialtyProps> = ({
    specialtyActiveSelection1, setSpecialtyActiveSelection1,
    specialtyActiveSelection2, setSpecialtyActiveSelection2,
    providerActiveSelection1, setProviderActiveSelection1,
    providerActiveSelection2, setProviderActiveSelection2,
    providerActiveSelection3, setProviderActiveSelection3,
    providerActiveSelection4, setProviderActiveSelection4,
    setAddProduct, addProduct,
    activeRoute, setActiveRoute, 
    specialtyTitle, setSpecialTitle, 
    specialtyDescription, setSpecialDescription,
    similarSpecialty, setSimilarSpecialty,
    servicesAvailable, setServicesAvailable,
    procedureType, setProcedureType,
    // provider info
    providerCategory1, setProviderCategory1,
    providerCategory2, setProviderCategory2,
    providerCategory3, setProviderCategory3,
    providerCategory4, setProviderCategory4,
    providerName1, setProviderName1,
    providerName2, setProviderName2,
    providerName3, setProviderName3,
    providerName4, setProviderName4,
    profileUrl1, setProfileUrl1,
    profileUrl2, setProfileUrl2,
    profileUrl3, setProfileUrl3,
    profileUrl4, setProfileUrl4,
    // booking info
    bookingYear1, setBookingYear1,
    bookingYear2, setBookingYear2,
    bookingYear3, setBookingYear3,
    bookingYear4, setBookingYear4,
    bookingMonth1, setBookingMonth1,
    bookingMonth2, setBookingMonth2,
    bookingMonth3, setBookingMonth3,
    bookingMonth4, setBookingMonth4,
    bookingDate1, setBookingDate1,
    bookingDate2, setBookingDate2,
    bookingDate3, setBookingDate3,
    bookingDate4, setBookingDate4,
    bookingDay1, setBookingDay1,
    bookingDay2, setBookingDay2,
    bookingDay3, setBookingDay3,
    bookingDay4, setBookingDay4,
    bookingTitle1, setBookingTitle1,
    bookingTitle2, setBookingTitle2,
    bookingTitle3, setBookingTitle3,
    bookingTitle4, setBookingTitle4,
    bookingMinutes1, setBookingMinutes1,
    bookingMinutes2, setBookingMinutes2,
    bookingMinutes3, setBookingMinutes3,
    bookingMinutes4, setBookingMinutes4,
    bookingHours1, setBookingHours1,
    bookingHours2, setBookingHours2,
    bookingHours3, setBookingHours3,
    bookingHours4, setBookingHours4,
    bookingAmOrPm1, setBookingAmOrPm1,
    bookingAmOrPm2, setBookingAmOrPm2,
    bookingAmOrPm3, setBookingAmOrPm3,
    bookingAmOrPm4, setBookingAmOrPm4,
    collectValue1, setCollectValue1,
    collectValue2, setCollectValue2,
}) => {

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
    const [timeSelectValue3, setTimeSelectValue3] = useState('AM')
    const [timeSelectValue4, setTimeSelectValue4] = useState('AM')
    const [timeSelectValue5, setTimeSelectValue5] = useState('AM')
    const [timeSelectValue6, setTimeSelectValue6] = useState('AM')
    const [timeSelectValue7, setTimeSelectValue7] = useState('AM')
    const [timeSelectValue8, setTimeSelectValue8] = useState('AM')
    const [timeSelectValue9, setTimeSelectValue9] = useState('AM')
    const [timeSelectValue10, setTimeSelectValue10] = useState('AM')
    const [timeSelectValue11, setTimeSelectValue11] = useState('AM')
    const hours = ['00','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const mins = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '00'];
    const amOrPm = ['AM', 'PM'];
    useEffect(() => {
        const days = [];
        for (let index = 0; index < 31; index++) {
            days.push(index + 1)
        }
        setNumber(days)
    }, [])
    
    const selection1 = ["CRIMINAL LAW", "PROPERTY LAW", "FAMILY LAW", "CORPORATE", "TAXATION", "EMPLOYMENT"]
    const selection2 = ["CONSULTATION", "REPRESENTATION", "ADVICE", "DOCUMENTATION", "CALL", "RETAIN"]
    const selection3 = ["PARTNER", "ASSOCIATE", "PARALEGAL", "LEGAL ASSISTANT", "CONSULTANT"]
    const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    
    useEffect(() => {
            if(addProduct) {
                setSpecialTitle('')
                setSpecialDescription('')
                setProcedureType('')
                setProviderName1('')
                setProviderName2('')
                setProviderName3('')
                setProviderName4('')
                setProfileUrl1('')
                setProfileUrl2('')
                setProfileUrl3('')
                setProfileUrl4('')
                setBookingTitle1('')
                setBookingTitle2('')
                setBookingTitle3('')
                setBookingTitle4('')
            }
    }, [addProduct])

    return (
        <div className='my-5'>
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
                                <input onChange={(e) => setSpecialTitle(e.target.value)} type="text"name="Specialty Title" value={specialtyTitle} id="specialty" placeholder='Specialty Title' className='border rounded-xl p-4 w-full' />
                            </label>
                            <label htmlFor="description">
                                <input onChange={(e) => setSpecialDescription(e.target.value)} type="text" name="Description" value={specialtyDescription} id="description" placeholder='Briefly Describe' className='border rounded-xl p-4 w-full' />
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
                            {selection1.map((item, index) => (
                                <div key={index} onClick={() => {setSpecialtyActiveSelection1(item); setSimilarSpecialty(item)}} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${specialtyActiveSelection1 === item ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                    {item}
                                </div>
                            ))}
                            
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-3">
                                <p className="font-light">Services Available</p>
                                <p className="text-sm text-[#e6dae5]">Select a Category</p>
                            </div>
                            <div className="w-8 h-8 items-center justify-center flex bg-[#006838] text-white rounded-full">9</div>
                        </div>
                        <div className="flex items-center flex-wrap gap-3 my-5">
                            {selection2.map((item, index) => (
                                <div key={index} onClick={() => {setSpecialtyActiveSelection2(item); setServicesAvailable(item)}} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${specialtyActiveSelection2 === item ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                    {item}
                                </div>
                            ))} 
                        </div>
                        <div className="flex flex-col gap-3 border p-3 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="flex justify-center items-center w-6 h-6 bg-[#006838] rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <p className="font-semibold text-gray-500">Procedure Type</p>
                            </div>
                            <label htmlFor="proceduretype">
                                <input onChange={(e) => setProcedureType(e.target.value)} value={procedureType} type="text" name="Procedure Type" id="proceduretype" placeholder='NGN 10' className='border rounded-xl p-4 w-full' />
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
                                            return setValue(value - 1)
                                        }
                                        setCollectValue1(value)
                                    }}>-</button>
                                    <p>{value}</p>
                                    <button className='w-7 h-7 rounded-full bg-[#f8f9fe]' onClick={() => {
                                        if(value >= 4) {
                                            return 4
                                        } else {
                                            return setValue(value + 1)
                                        }
                                        setCollectValue1(value)
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
                                    {selection3.map((item, index) => (
                                        <div key={index} onClick={() => {setProviderActiveSelection1(item); setProviderCategory1(item)}} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${providerActiveSelection1 === item ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="providerName">
                                        <input onChange={(e) => setProviderName1(e.target.value)} value={providerName1} type="text" name="providerName" id="providerName" placeholder='Provider Name' className='border rounded-xl p-4 w-full' />
                                    </label>
                                    <label htmlFor="providerUrl">
                                        <input onChange={(e) => setProfileUrl1(e.target.value)} value={profileUrl1} type="text" name="providerUrl" id="providerUrl" placeholder='Profile URL' className='border rounded-xl p-4 w-full' />
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
                                    {selection3.map((item, index) => (
                                        <div key={index} onClick={() => {setProviderActiveSelection2(item); setProviderCategory2(item)}} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${providerActiveSelection2 === item ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="providerName">
                                        <input onChange={(e) => setProviderName2(e.target.value)} value={providerName2} type="text" name="providerName" id="providerName" placeholder='Provider Name' className='border rounded-xl p-4 w-full' />
                                    </label>
                                    <label htmlFor="providerUrl">
                                        <input onChange={(e) => setProfileUrl2(e.target.value)} value={profileUrl2} type="text" name="providerUrl" id="providerUrl" placeholder='Profile URL' className='border rounded-xl p-4 w-full' />
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
                                    {selection3.map((item, index) => (
                                        <div key={index} onClick={() => {setProviderActiveSelection3(item); setProviderCategory3(item)}} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${providerActiveSelection3 === item ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="providerName">
                                        <input onChange={(e) => setProviderName3(e.target.value)} value={providerName3} type="text" name="providerName" id="providerName" placeholder='Provider Name' className='border rounded-xl p-4 w-full' />
                                    </label>
                                    <label htmlFor="providerUrl">
                                        <input onChange={(e) => setProfileUrl3(e.target.value)} value={profileUrl3} type="text" name="providerUrl" id="providerUrl" placeholder='Profile URL' className='border rounded-xl p-4 w-full' />
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
                                    {selection3.map((item, index) => (
                                        <div key={index} onClick={() => {setProviderActiveSelection4(item); setProviderCategory4(item)}} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${providerActiveSelection4 === item ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="providerName">
                                        <input onChange={(e) => setProviderName4(e.target.value)} value={providerName4} type="text" name="providerName" id="providerName" placeholder='Provider Name' className='border rounded-xl p-4 w-full' />
                                    </label>
                                    <label htmlFor="providerUrl">
                                        <input onChange={(e) => setProfileUrl4(e.target.value)} value={profileUrl4} type="text" name="providerUrl" id="providerUrl" placeholder='Profile URL' className='border rounded-xl p-4 w-full' />
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
                                            return setValue1(value1 - 1)
                                        }
                                        setCollectValue2(value)
                                    }}>-</button>
                                    <p>{value1}</p>
                                    <button className='w-7 h-7 rounded-full bg-[#f8f9fe]' onClick={() => {
                                        if(value1 >= 4) {
                                            return 4
                                        } else {
                                            return setValue1(value1 + 1)
                                        }
                                        setCollectValue2(value)
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
                                        <div className={`font-semibold text-black text-sm ${date === 'year' ? 'flex flex-wrap gap-3' : 'hidden'}`}>
                                            {years.map((year, index) => (
                                                <p key={index} onClick={() => setBookingYear1(year)} className={`rounded-3xl py-1 px-3 flex justify-center hover:bg-gray-400 items-center text-[10px] cursor-pointer ${bookingYear1 === year ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>{year}</p>
                                            ))}
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <div className={`py-1 px-3 flex justify-center items-center text-[10px] ${date === 'month' ? 'flex flex-wrap gap-3' : 'hidden'}`}>
                                                {months.map((month, index) => (
                                                    <p key={index} onClick={() => setBookingMonth1(month)} className={`rounded-3xl py-1 px-3 flex justify-center hover:bg-gray-400 items-center text-[10px] cursor-pointer ${bookingMonth1 === month ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>{month}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        {days.map((day, index) => (
                                            <p onClick={() => setBookingDay1(day)} key={index} className={`font-bold flex justify-center items-center w-20 h-10 hover:bg-gray-300 rounded cursor-pointer ${bookingDay1 === day ? 'bg-[#006838] text-white' : ''}`}>{day}</p>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {number.map((num, index) => {
                                            if (num >= 14 && num < 31) {
                                                return <p key={index} onClick={() => setBookingDate1(num)} className={`w-20 h-10 flex flex-grow hover:bg-[#00683725] cursor-pointer justify-center items-center text-[#006838] my-3 bg-[#00683735] ${num === 14 ? 'rounded-s' : num === 30 ? 'rounded-e' : ''} ${bookingDate1 === num ? 'bg-[#006838] text-white' : ''}`}>{num}</p>
                                            } else{
                                                return <p key={index} onClick={() => setBookingDate1(num)} className={`text-black w-20 h-10 flex-grow hover:bg-gray-200 cursor-pointer flex justify-center items-center my-3 ${bookingDate1 === num ? 'bg-[#006838] text-white' : ''}`}>{num}</p>
                                            }
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <label htmlFor="specialty">
                                        <input value={bookingTitle1} onChange={(e) => setBookingTitle1(e.target.value)} type="text" name="specialty" id="specialty" placeholder='Booking Title, e.g Afternoon Session' className='border rounded-xl p-4 w-full' />
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
                                                        <p key={index} onClick={() => {setTimeSelectValue(hour); setBookingHours1(hour)}} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{hour}</p>
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
                                                        <p key={index} onClick={() => {setTimeSelectValue1(min); setBookingMinutes1(min)}} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{min}</p>
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
                                                        <p key={index} onClick={() => {setTimeSelectValue2(or); setBookingAmOrPm1(or)}} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{or}</p>
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
                                        <div className={`font-semibold text-black text-sm ${date === 'year' ? 'flex flex-wrap gap-3' : 'hidden'}`}>
                                            {years.map((year, index) => (
                                                <p key={index} onClick={() => setBookingYear2(year)} className={`rounded-3xl py-1 px-3 flex justify-center hover:bg-gray-400 items-center text-[10px] cursor-pointer ${bookingYear2 === year ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>{year}</p>
                                            ))}
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <div className={`py-1 px-3 flex justify-center items-center text-[10px] ${date === 'month' ? 'flex flex-wrap gap-3' : 'hidden'}`}>
                                                {months.map((month, index) => (
                                                    <p key={index} onClick={() => setBookingMonth2(month)} className={`rounded-3xl py-1 px-3 flex justify-center hover:bg-gray-400 items-center text-[10px] cursor-pointer ${bookingMonth2 === month ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>{month}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        {days.map((day, index) => (
                                            <p onClick={() => setBookingDay2(day)} key={index} className={`font-bold flex justify-center items-center w-20 h-10 hover:bg-gray-300 rounded cursor-pointer ${bookingDay2 === day ? 'bg-[#006838] text-white' : ''}`}>{day}</p>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {number.map((num, index) => {
                                            if (num >= 14 && num < 31) {
                                                return <p key={index} onClick={() => setBookingDate2(num)} className={`w-20 h-10 flex flex-grow hover:bg-[#00683725] cursor-pointer justify-center items-center text-[#006838] my-3 bg-[#00683735] ${num === 14 ? 'rounded-s' : num === 30 ? 'rounded-e' : ''} ${bookingDate2 === num ? 'bg-[#006838] text-white' : ''}`}>{num}</p>
                                            } else{
                                                return <p key={index} onClick={() => setBookingDate2(num)} className={`text-black w-20 h-10 flex-grow hover:bg-gray-200 cursor-pointer flex justify-center items-center my-3 ${bookingDate2 === num ? 'bg-[#006838] text-white' : ''}`}>{num}</p>
                                            }
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <label htmlFor="specialty">
                                        <input onChange={(e) => setBookingTitle2(e.target.value)} value={bookingTitle2} type="text" name="specialty" id="specialty" placeholder='Booking Title, e.g Afternoon Session' className='border rounded-xl p-4 w-full' />
                                    </label>
                                    <div className="flex justify-between items-center">
                                        <p className="font-light text-sm">Slot 1</p>
                                        <div className="flex gap-3 items-center">
                                            <div onClick={() => setTimeSelect(!timeSelect)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                <p>{timeSelectValue3}</p>
                                                <Icon icon={'mdi:chevron-down'} />
                                                <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                    height: timeSelect ? '300px' : '0px'
                                                }}>
                                                    {hours.map((hour, index) => (
                                                        <p key={index} onClick={() => {setTimeSelectValue3(hour); setBookingHours2(hour)}} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{hour}</p>
                                                    ))}
                                                </div>
                                            </div>
                                            <p>:</p>
                                            <div onClick={() => setTimeSelect1(!timeSelect1)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect1 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                <p>{timeSelectValue4}</p>
                                                <Icon icon={'mdi:chevron-down'} />
                                                <div className="absolute flex flex-col gap-2 bg-white rounded top-10 transition-height duration-200 ease-in-out overflow-y-auto w-full" style={{
                                                    height: timeSelect1 ? '300px' : '0px'
                                                }}>
                                                    {mins.map((min, index) => (
                                                        <p key={index} onClick={() => {setTimeSelectValue4(min); setBookingMinutes2(min)}} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{min}</p>
                                                    ))}
                                                </div>
                                            </div>
                                            <p>:</p>
                                            <div onClick={() => setTimeSelect2(!timeSelect2)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect2 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                <p>{timeSelectValue5}</p>
                                                <Icon icon={'mdi:chevron-down'} />
                                                <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                    height: timeSelect2 ? '300px' : '0px'
                                                }}>
                                                    {amOrPm.map((or, index) => (
                                                        <p key={index} onClick={() => {setTimeSelectValue5(or); setBookingAmOrPm2(or)}} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{or}</p>
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
                                        <div className={`font-semibold text-black text-sm ${date === 'year' ? 'flex flex-wrap gap-3' : 'hidden'}`}>
                                            {years.map((year, index) => (
                                                <p key={index} onClick={() => setBookingYear3(year)} className={`rounded-3xl py-1 px-3 flex justify-center hover:bg-gray-400 items-center text-[10px] cursor-pointer ${bookingYear3 === year ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>{year}</p>
                                            ))}
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <div className={`py-1 px-3 flex justify-center items-center text-[10px] ${date === 'month' ? 'flex flex-wrap gap-3' : 'hidden'}`}>
                                                {months.map((month, index) => (
                                                    <p key={index} onClick={() => setBookingMonth3(month)} className={`rounded-3xl py-1 px-3 flex justify-center hover:bg-gray-400 items-center text-[10px] cursor-pointer ${bookingMonth3 === month ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>{month}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        {days.map((day, index) => (
                                            <p onClick={() => setBookingDay3(day)} key={index} className={`font-bold flex justify-center items-center w-20 h-10 hover:bg-gray-300 rounded cursor-pointer ${bookingDay3 === day ? 'bg-[#006838] text-white' : ''}`}>{day}</p>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {number.map((num, index) => {
                                            if (num >= 14 && num < 31) {
                                                return <p key={index} onClick={() => setBookingDate3(num)} className={`w-20 h-10 flex flex-grow hover:bg-[#00683725] cursor-pointer justify-center items-center text-[#006838] my-3 bg-[#00683735] ${num === 14 ? 'rounded-s' : num === 30 ? 'rounded-e' : ''} ${bookingDate3 === num ? 'bg-[#006838] text-white' : ''}`}>{num}</p>
                                            } else{
                                                return <p key={index} onClick={() => setBookingDate3(num)} className={`text-black w-20 h-10 flex-grow hover:bg-gray-200 cursor-pointer flex justify-center items-center my-3 ${bookingDate3 === num ? 'bg-[#006838] text-white' : ''}`}>{num}</p>
                                            }
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <label htmlFor="specialty">
                                        <input onChange={(e) => setBookingTitle3(e.target.value)} value={bookingTitle3} type="text" name="specialty" id="specialty" placeholder='Booking Title, e.g Afternoon Session' className='border rounded-xl p-4 w-full' />
                                    </label>
                                    <div className="flex justify-between items-center">
                                        <p className="font-light text-sm">Slot 1</p>
                                        <div className="flex gap-3 items-center">
                                            <div onClick={() => setTimeSelect(!timeSelect)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                <p>{timeSelectValue6}</p>
                                                <Icon icon={'mdi:chevron-down'} />
                                                <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                    height: timeSelect ? '300px' : '0px'
                                                }}>
                                                    {hours.map((hour, index) => (
                                                        <p key={index} onClick={() => {setTimeSelectValue6(hour); setBookingHours3(hour)}} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{hour}</p>
                                                    ))}
                                                </div>
                                            </div>
                                            <p>:</p>
                                            <div onClick={() => setTimeSelect1(!timeSelect1)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect1 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                <p>{timeSelectValue7}</p>
                                                <Icon icon={'mdi:chevron-down'} />
                                                <div className="absolute flex flex-col gap-2 bg-white rounded top-10 transition-height duration-200 ease-in-out overflow-y-auto w-full" style={{
                                                    height: timeSelect1 ? '300px' : '0px'
                                                }}>
                                                    {mins.map((min, index) => (
                                                        <p key={index} onClick={() => {setTimeSelectValue7(min); setBookingMinutes3(min)}} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{min}</p>
                                                    ))}
                                                </div>
                                            </div>
                                            <p>:</p>
                                            <div onClick={() => setTimeSelect2(!timeSelect2)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect2 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                <p>{timeSelectValue8}</p>
                                                <Icon icon={'mdi:chevron-down'} />
                                                <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                    height: timeSelect2 ? '300px' : '0px'
                                                }}>
                                                    {amOrPm.map((or, index) => (
                                                        <p key={index} onClick={() => {setTimeSelectValue8(or); setBookingAmOrPm3(or)}} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{or}</p>
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
                                        <div className={`font-semibold text-black text-sm ${date === 'year' ? 'flex flex-wrap gap-3' : 'hidden'}`}>
                                            {years.map((year, index) => (
                                                <p key={index} onClick={() => setBookingYear4(year)} className={`rounded-3xl py-1 px-3 flex justify-center hover:bg-gray-400 items-center text-[10px] cursor-pointer ${bookingYear4 === year ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>{year}</p>
                                            ))}
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <div className={`py-1 px-3 flex justify-center items-center text-[10px] ${date === 'month' ? 'flex flex-wrap gap-3' : 'hidden'}`}>
                                                {months.map((month, index) => (
                                                    <p key={index} onClick={() => setBookingMonth4(month)} className={`rounded-3xl py-1 px-3 flex justify-center hover:bg-gray-400 items-center text-[10px] cursor-pointer ${bookingMonth4 === month ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>{month}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        {days.map((day, index) => (
                                            <p onClick={() => setBookingDay4(day)} key={index} className={`font-bold flex justify-center items-center w-20 h-10 hover:bg-gray-300 rounded cursor-pointer ${bookingDay4 === day ? 'bg-[#006838] text-white' : ''}`}>{day}</p>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {number.map((num, index) => {
                                            if (num >= 14 && num < 31) {
                                                return <p key={index} onClick={() => setBookingDate4(num)} className={`w-20 h-10 flex flex-grow hover:bg-[#00683725] cursor-pointer justify-center items-center text-[#006838] my-3 bg-[#00683735] ${num === 14 ? 'rounded-s' : num === 30 ? 'rounded-e' : ''} ${bookingDate4 === num ? 'bg-[#006838] text-white' : ''}`}>{num}</p>
                                            } else{
                                                return <p key={index} onClick={() => setBookingDate4(num)} className={`text-black w-20 h-10 flex-grow hover:bg-gray-200 cursor-pointer flex justify-center items-center my-3 ${bookingDate4 === num ? 'bg-[#006838] text-white' : ''}`}>{num}</p>
                                            }
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <label htmlFor="specialty">
                                        <input onChange={(e) => setBookingTitle4(e.target.value)} value={bookingTitle4} type="text" name="specialty" id="specialty" placeholder='Booking Title, e.g Afternoon Session' className='border rounded-xl p-4 w-full' />
                                    </label>
                                    <div className="flex justify-between items-center">
                                        <p className="font-light text-sm">Slot 1</p>
                                        <div className="flex gap-3 items-center">
                                            <div onClick={() => setTimeSelect(!timeSelect)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                <p>{timeSelectValue9}</p>
                                                <Icon icon={'mdi:chevron-down'} />
                                                <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                    height: timeSelect ? '300px' : '0px'
                                                }}>
                                                    {hours.map((hour, index) => (
                                                        <p key={index} onClick={() => {setTimeSelectValue9(hour); setBookingHours4(hour)}} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{hour}</p>
                                                    ))}
                                                </div>
                                            </div>
                                            <p>:</p>
                                            <div onClick={() => setTimeSelect1(!timeSelect1)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect1 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                <p>{timeSelectValue10}</p>
                                                <Icon icon={'mdi:chevron-down'} />
                                                <div className="absolute flex flex-col gap-2 bg-white rounded top-10 transition-height duration-200 ease-in-out overflow-y-auto w-full" style={{
                                                    height: timeSelect1 ? '300px' : '0px'
                                                }}>
                                                    {mins.map((min, index) => (
                                                        <p key={index} onClick={() => {setTimeSelectValue10(min); setBookingMinutes4(min)}} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{min}</p>
                                                    ))}
                                                </div>
                                            </div>
                                            <p>:</p>
                                            <div onClick={() => setTimeSelect2(!timeSelect2)} className={`flex gap-2 cursor-pointer items-center justify-center rounded py-1 px-2 relative ${timeSelect2 ? 'border-2 border-[#006838] text-gray-500' : 'bg-[#e6dae5] border text-black'}`}>
                                                <p>{timeSelectValue11}</p>
                                                <Icon icon={'mdi:chevron-down'} />
                                                <div className="absolute flex flex-col gap-2 bg-white rounded transition-height duration-200 ease-in-out top-10 overflow-y-auto w-full" style={{
                                                    height: timeSelect2 ? '300px' : '0px'
                                                }}>
                                                    {amOrPm.map((or, index) => (
                                                        <p key={index} onClick={() => {setTimeSelectValue11(or); setBookingAmOrPm4(or)}} className='py-3 hover:bg-[#e6dae5] cursor-pointer w-full flex justify-center items-center'>{or}</p>
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
                        <div className="flex flex-col gap-3 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
                            <div className="flex flex-col gap-2">
                                <div className="py-3 border-b">
                                    <p className="font-bold">Specialty Info</p>
                                </div>
                                <div className="flex justify-between items">
                                    <p className="font-light text-sm">Specialty Title</p>
                                    <p className="text-sm">{specialtyTitle}</p>
                                </div>
                                <div className="flex justify-between items">
                                    <p className="font-light text-sm">Description</p>
                                    <p className="text-sm">{specialtyDescription}</p>
                                </div>
                                <div className="flex justify-between items">
                                    <p className="font-light text-sm">Similar Specialties</p>
                                    <p className="text-sm">{similarSpecialty}</p>
                                </div>
                                <div className="flex justify-between items">
                                    <p className="font-light text-sm">Services Available</p>
                                    <p className="text-sm">{servicesAvailable}</p>
                                </div>
                                <div className="flex justify-between items">
                                    <p className="font-light text-sm">Procedure Type</p>
                                    <p className="text-sm">{procedureType}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="py-3 border-b">
                                    <p className="font-bold">Provider Info</p>
                                </div>
                                <div className="flex justify-between items">
                                    <p className="font-light text-sm">Provider Category</p>
                                    <div className="flex flex-col gap-2">
                                        {value === 1 ? (
                                            <p>{providerCategory1}</p>
                                        ) : value === 2 ? (
                                            <p>{providerCategory2}</p>
                                        ) : value === 3 ? (
                                            <p>{providerCategory3}</p>
                                        ) : (
                                            <p>{providerCategory4}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items">
                                    <p className="font-light text-sm">Provider Name</p>
                                        <div className="flex flex-col gap-2">
                                        {value === 1 ? (
                                            <p>{providerName1}</p>
                                        ) : value === 2 ? (
                                            <p>{providerName2}</p>
                                        ) : value === 3 ? (
                                            <p>{providerName3}</p>
                                        ) : (
                                            <p>{providerName4}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items">
                                    <p className="font-light text-sm">Profile URL</p>
                                        <div className="flex flex-col gap-2">
                                        {value === 1 ? (
                                            <p>{profileUrl1}</p>
                                        ) : value === 2 ? (
                                            <p>{profileUrl2}</p>
                                        ) : value === 3 ? (
                                            <p>{profileUrl3}</p>
                                        ) : (
                                            <p>{profileUrl4}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="py-3 border-b">
                                    <p className="font-bold">Booking Info</p>
                                </div>
                                <div className="flex justify-between items">
                                    <p className="font-light text-sm">Booking Title</p>
                                    <div className="flex flex-col gap-2">
                                        {value === 1 ? (
                                            <p>{bookingTitle1}</p>
                                        ) : value === 2 ? (
                                            <p>{bookingTitle2}</p>
                                        ) : value === 3 ? (
                                            <p>{bookingTitle3}</p>
                                        ) : (
                                            <p>{bookingTitle4}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items">
                                    <p className="font-light text-sm">Booking Date</p>
                                    <div className="flex flex-col gap-2">
                                        {value === 1 ? (
                                            <p>{bookingDay1} / {bookingDate1} / {bookingMonth1} / {bookingYear1}</p>
                                        ) : value === 2 ? (
                                            <p>{bookingDay2} / {bookingDate2} / {bookingMonth2} / {bookingYear2}</p>
                                        ) : value === 3 ? (
                                            <p>{bookingDay3} / {bookingDate3} / {bookingMonth3} / {bookingYear3}</p>
                                        ) : (
                                            <p>{bookingDay4} / {bookingDate4} / {bookingMonth4} / {bookingYear4}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items">
                                    <p className="font-light text-sm">Booking Time</p>
                                        <div className="flex flex-col gap-2">
                                        {value === 1 ? (
                                            <p>{bookingHours1} : {bookingMinutes1}{bookingAmOrPm1}</p>
                                        ) : value === 2 ? (
                                            <p>{bookingHours2} : {bookingMinutes2}{bookingAmOrPm2}</p>
                                        ) : value === 3 ? (
                                            <p>{bookingHours3} : {bookingMinutes3}{bookingAmOrPm3}</p>
                                        ) : (
                                            <p>{bookingHours4} : {bookingMinutes4}{bookingAmOrPm4}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}