'use client'
import { useProvider } from '@/context/ServicesContext'
import { ArrowRight, ArrowUpDown, Check, ChevronDown, ChevronLeft, Minus, Plus, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import TextNum from '../custom-components/TextNum'
import CustomButton from '../custom-components/CustomButton'
import { ProgressBar } from 'react-loader-spinner'
import { CircularProgress } from '@mui/material'
type Props = {}

const AddHealth = (props: Props) => {
    const [careTypeSelection, setCareTypeSelection] = useState<string>('');
    const [symptomaticSelection, setSymptomaticSelection] = useState<string>("")
    const addHealthStepArray = ["Specialty Info", "Provider Info", "Booking Info", "Preview"];
    const [addHealthPreviewDrop, setAddHealthPreviewDrop] = useState<boolean>(false)
    const numberOfProviders = [1, 2, 3,4];
    const numberOfBooking = [1, 2, 3,4];
    const [numberOfProvidersCount, setNumberOfProvidersCount] = useState<number>(1)
    const [numberOfBookingCount, setNumberOfBookingCount] = useState<number>(1)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [activeProvider, setActiveProvider] = useState<number>(1)
    const [activeBooking, setActiveBooking] = useState<number>(1)
    const {setClassBookingInfo, classBookingInfo, classTitle, setClassTitle, setClassBrieflyDescribe, classBrieflyDescribe, classSectionList, setClassSectionList, setClassStudentCategory, classStudentCategory, setClassMaximumCapacity, classMaximumCapacity, classCertification, setClassCertification, classProviderType, setClassProviderType, classProviderName, setClassProviderName, classProviderProfileUrl, setClassProviderProfileUrl, setAddClass, setClassBookingTitle, classBookingTitle, handleSaveClassData, classDataList} = useProvider();
    const [activeTime, setActiveTime] = useState<string>("")
    const [activeProcedure, setActiveProcedure] = useState<string>("");
    const studentSectionArray = ["SENIOR SECONDARY", "PRIMARY", "JUNIOR", "NURSERY", "CRECHE", "PREP SCHOOL", "TUTOR"];
    const studentCategoryArray = ["REGULAR", "SPECIAL NEEDS", "HOME-SCHOOLED", "NURSERY", "CRECHE", "PREP SCHOOL", "TUTOR"];
    const symptomaticArray = ["HIGH BLOOD PRESSURE", "HEART ATTACKS", "ARRHYTHMIA"]
    const activeCertificationArray = ["External", "Internal"];
    const providerTypeArray = ["CLASSROOM TEACHER", "SPECIAL EDUCATION TEACHER", "SUPPORT STAFF", "SUBJECT-SPECIFIC TEACHER", "ONLINE TUTOR"];
    const bookingDay = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const bookingMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const bookingYear = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040];
    const bookingDate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const bookingMin = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
    const bookingHour = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const meridiem = ["AM", "PM"];
    const hourRef = useRef<HTMLDivElement>(null)
    const minRef = useRef<HTMLDivElement>(null)
    const meridiemRef = useRef<HTMLDivElement>(null)
  return (
    <div className='flex flex-col gap-10 w-full'>
        <div className="flex justify-between items-center">
            <ChevronLeft onClick={() => setAddClass(false)} size={30} strokeWidth={1} className='text-gray-300' />
            <p className="font-bold mx-auto">{currentIndex === 3 ? "" : "New"} {addHealthStepArray[currentIndex].split(" ")[0]}</p>
        </div>
        <div className="flex justify-between gap-5">
            {addHealthStepArray.map((step, index) => (
                <div className="flex flex-col gap-3 items-center">
                    <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center text-sm ${currentIndex === index ? "bg-[#006838] text-white" : "bg-gray-300 cursor-not-allowed opacity-10"}`}>{index + 1}</div>
                    <p className="font-bold">{step}</p>
                </div>
            ))}
        </div>
        {currentIndex === 0 ? (
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <input onChange={(e) => setClassTitle(e.target.value)} type='text' placeholder='Course Title' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                    <input onChange={(e) => setClassBrieflyDescribe(e.target.value)} type='text' placeholder='Briefly Describe' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                    <p className="text-[10px] text-gray-300">0/30</p>
                </div>
                <TextNum text='Section' optionalText='List of Available Sections' number={9} />
                <div className="flex flex-wrap gap-3">
                    {studentSectionArray.map((sec, index) => (
                        <CustomButton handleClick={() => setClassSectionList(sec)} setActive={setClassSectionList} active={classSectionList} key={index} text={sec} />
                    ))}
                </div>
                <TextNum text='Student Category' optionalText='Select a category' number={9} />
                <div className="flex flex-wrap gap-3">
                    {studentCategoryArray.map((sec, index) => (
                        <CustomButton handleClick={() => {setCareTypeSelection(sec), setClassStudentCategory(sec)}} setActive={setCareTypeSelection} active={careTypeSelection} key={index} text={sec} />
                    ))}
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="border border-gray-100 rounded-xl flex flex-col gap-5 p-3">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-[#006838] flex justify-center items-center">
                                <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                            <p className="font-semibold md:text-md text-sm">Maximum Capacity</p>
                        </div>
                        <input onChange={(e) => setClassMaximumCapacity(Number(e.target.value))} type='number' placeholder='Maximum Capacity' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="border border-gray-100 rounded-xl flex flex-col gap-5 p-3">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-[#006838] flex justify-center items-center">
                                <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                            <p className="font-semibold md:text-md text-sm">Certification</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            {activeCertificationArray.map((procedure, index) => (
                                <div onClick={() => {setActiveProcedure(procedure), setClassCertification(procedure)}} key={index} className={`p-3 rounded-xl ${activeProcedure === procedure ? "bg-[#eaf2ff]" : "border border-gray-100"}`}>{procedure}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>   
        ) : currentIndex === 1 ? (
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center p-2 rounded-xl border border-gray-100">
                        <ArrowUpDown strokeWidth={1} size={20} />
                        <p className="font-light text-sm">Multiple</p>
                        <ChevronDown strokeWidth={1} />
                    </div>
                    <div className="flex gap-3 items-center">
                        <p className="text-sm">Add Provider</p>
                        <div className="flex items-center">
                            <div onClick={() => setNumberOfProvidersCount(prev => prev-1 < 1 ? 1 : prev-1)} className="w-6 h-6 p-1 active:bg-[#006838] active:text-white flex justify-center items-center bg-[#eaf2ff] rounded-full"><Minus strokeWidth={1} /></div>
                            <div className="w-6 h-6 p-1 flex justify-center items-center rounded-full">{numberOfProvidersCount}</div>
                            <div onClick={() => setNumberOfProvidersCount(prev => prev+1 > 4 ? 4 : prev + 1)} className="w-6 h-6 p-1 active:bg-[#006838] active:text-white flex justify-center items-center bg-[#eaf2ff] rounded-full"><Plus strokeWidth={1} /></div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center md:px-20 px-5">
                    {numberOfProviders.map((provider, index) => (
                        <div key={index} className="flex flex-col gap-3 items-center">
                            <div onClick={() => {
                                if(numberOfProvidersCount > provider || numberOfProvidersCount === provider) {
                                    setActiveProvider(provider)
                                }else {
                                    return
                                } 
                            }} className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center text-sm ${activeProvider === provider ? "bg-[#006838] text-white" : numberOfProvidersCount > provider || numberOfProvidersCount === provider ? "bg-[#eaf2ff]" : "bg-gray-300  opacity-10"}`}>{provider}</div>
                        </div>
                    ))}
                </div>
                {activeProvider === 1 ? (
                    <>
                        <TextNum text='Provider Type' optionalText='Select a category' number={9} />
                        <div className="flex flex-wrap gap-3">
                            {providerTypeArray.map((provider, index) => (
                                <CustomButton handleClick={() => setClassProviderType(prev => prev.includes(provider) ? prev.filter(item => item !== provider) : [...prev, provider])} key={index} text={provider} />
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            <input onChange={(e) => setClassProviderName(prev => {
                                const newNames = [...prev];
                                newNames[activeProvider] = e.target.value;
                                return newNames
                            })} type='text' placeholder='Provider Name' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                            <input onChange={(e) => setClassProviderProfileUrl(prev => {
                                const newNames = [...prev];
                                newNames[activeProvider] = e.target.value;
                                return newNames
                            })} type='text' placeholder='Profile URL' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                        </div>
                    </>
                ) : activeProvider === 2 ? (
                    <>
                        <TextNum text='Provider Type' optionalText='Select a category' number={9} />
                        <div className="flex flex-wrap gap-3">
                            {providerTypeArray.map((provider, index) => (
                                <CustomButton handleClick={() => setClassProviderType(prev => prev.includes(provider) ? prev.filter(item => item !== provider) : [...prev, provider])} key={index} text={provider} />
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            <input onChange={(e) => setClassProviderName(prev => {
                                const newNames = [...prev];
                                newNames[activeProvider] = e.target.value;
                                return newNames
                            })} type='text' placeholder='Provider Name' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                            <input onChange={(e) => setClassProviderProfileUrl(prev => {
                                const newNames = [...prev];
                                newNames[activeProvider] = e.target.value;
                                return newNames
                            })} type='text' placeholder='Profile URL' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                        </div>
                    </>
                ) : activeProvider === 3 ? (
                    <>
                        <TextNum text='Provider Type' optionalText='Select a category' number={9} />
                        <div className="flex flex-wrap gap-3">
                            {providerTypeArray.map((provider, index) => (
                                <CustomButton handleClick={() => setClassProviderType(prev => prev.includes(provider) ? prev.filter(item => item !== provider) : [...prev, provider])} key={index} text={provider} />
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            <input onChange={(e) => setClassProviderName(prev => {
                                const newNames = [...prev];
                                newNames[activeProvider] = e.target.value;
                                return newNames
                            })} type='text' placeholder='Provider Name' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                            <input onChange={(e) => setClassProviderProfileUrl(prev => {
                                const newNames = [...prev];
                                newNames[activeProvider] = e.target.value;
                                return newNames
                            })} type='text' placeholder='Profile URL' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                        </div>
                    </>
                ) : (
                    <>
                        <TextNum text='Provider Type' optionalText='Select a category' number={9} />
                        <div className="flex flex-wrap gap-3">
                            {providerTypeArray.map((provider, index) => (
                                <CustomButton handleClick={() => setClassProviderType(prev => prev.includes(provider) ? prev.filter(item => item !== provider) : [...prev, provider])} key={index} text={provider} />
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            <input onChange={(e) => setClassProviderName(prev => {
                                const newNames = [...prev];
                                newNames[activeProvider] = e.target.value;
                                return newNames
                            })} type='text' placeholder='Provider Name' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                            <input onChange={(e) => setClassProviderProfileUrl(prev => {
                                const newNames = [...prev];
                                newNames[activeProvider] = e.target.value;
                                return newNames
                            })} type='text' placeholder='Profile URL' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                        </div>
                    </>
                )}
            </div>   
        ) : currentIndex === 2 ?(
            <>
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center p-2 rounded-xl border border-gray-100">
                        <ArrowUpDown strokeWidth={1} size={20} />
                        <p className="font-light text-sm">Single</p>
                        <ChevronDown strokeWidth={1} />
                    </div>
                    <div className="flex gap-3 items-center">
                        <p className="text-sm">Booking Slots</p>
                        <div className="flex items-center">
                            <div onClick={() => setNumberOfBookingCount(prev => prev-1 < 1 ? 1 : prev-1)} className="w-6 h-6 p-1 active:bg-[#006838] active:text-white flex justify-center items-center bg-[#eaf2ff] rounded-full"><Minus strokeWidth={1} /></div>
                            <div className="w-6 h-6 p-1 flex justify-center items-center rounded-full">{numberOfBookingCount}</div>
                            <div onClick={() => setNumberOfBookingCount(prev => prev+1 > 4 ? 4 : prev + 1)} className="w-6 h-6 p-1 active:bg-[#006838] active:text-white flex justify-center items-center bg-[#eaf2ff] rounded-full"><Plus strokeWidth={1} /></div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center md:px-20 px-5">
                    {numberOfBooking.map((booking, index) => (
                        <div key={index} className="flex flex-col gap-3 items-center">
                            <div onClick={() => {
                                if(numberOfBookingCount > booking || numberOfBookingCount === booking) {
                                    setActiveBooking(booking)
                                }else {
                                    return
                                } 
                            }} className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center text-sm ${activeBooking === booking ? "bg-[#006838] text-white" : numberOfBookingCount > booking || numberOfBookingCount === booking ? "bg-[#eaf2ff]" : "bg-gray-300  opacity-10"}`}>{booking}</div>
                        </div>
                    ))}
                </div>
                {activeBooking === 1 ? (    
                    <>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col relative w-15 h-8">
                                <div onClick={() => setActiveTime(prev => prev === "year" ? "" : "year")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400 cursor-pointer">
                                    <p className="">{classBookingInfo.year || "YEAR"}</p>
                                    <ChevronDown strokeWidth={1} size={20} />
                                </div>
                                <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full bg-white shadow" style={{
                                    height: activeTime === "year" ? `200px` : "0px",
                                    overflowY: activeTime === "year" ? `scroll` : "hidden",
                                }}>
                                    {bookingYear.map((year, index) => (
                                        <p onClick={() => setClassBookingInfo(prev => ({...prev, year: year.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{year}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col relative w-15 h-8">
                                <div onClick={() => setActiveTime(prev => prev === "month" ? "" : "month")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400 cursor-pointer">
                                    <p className="">{classBookingInfo.month || "MONTH"}</p>
                                    <ChevronDown strokeWidth={1} size={20} />
                                </div>
                                <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full bg-white shadow" style={{
                                    height: activeTime === "month" ? `200px` : "0px",
                                    overflowY: activeTime === "month" ? `scroll` : "hidden",
                                }}>
                                    {bookingMonth.map((month, index) => (
                                        <p onClick={() => setClassBookingInfo(prev => ({...prev, month: month}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{month}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            {bookingDay.map((day, index) => (
                                <p onClick={() => setClassBookingInfo(prev => ({...prev, day: day}))} key={index} className={`${(day === "Sa" || day === "Su") && "text-red-500"} ${classBookingInfo.day === day && "bg-[#eaf2ff]"} md:w-12 md:h-12 w-8 h-8 flex justify-center items-center rounded-xl border hover:scale-75 transition-transform duration-50 active:scale-50 cursor-pointer select-none hover:bg-[#eaf2ff]`}>{day}</p>
                            ) )}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-stretch">
                            {bookingDate.map((date, index) => (
                                <p onClick={() => setClassBookingInfo(prev => ({...prev, date: date.toString()}))} key={index} className={`md:w-12 md:h-12 w-8 h-8 flex justify-center items-center rounded-xl border hover:scale-75 transition-transform duration-50 active:scale-50 cursor-pointer select-none hover:bg-[#eaf2ff] ${classBookingInfo.date === date.toString() && "bg-[#eaf2ff]"}`}>{date}</p>
                            ) )}
                        </div>
                        <input onChange={(e) => setClassBookingTitle(prev => {
                                const newData = [...prev];
                                newData[activeBooking] = e.target.value;
                                return newData
                        }
                            )} type="text" placeholder='Booking Title, e.g Afternoon Session' className='outline-none border border-gray-100 p-3 rounded-xl' />
                        <div className="flex justify-between gap-3">
                            <p className="text-sm">Slot 1</p>
                            <div className="flex gap-3 items-center">
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "hour" ? "" : "hour")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{classBookingInfo.hour.padStart(2, "0") || "00"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full" style={{
                                        height: activeTime === "hour" ? `200px` : "0px",
                                        overflowY: activeTime === "hour" ? `scroll` : "hidden",
                                    }}>
                                        {bookingHour.map((hour, index) => (
                                            <p onClick={() => setClassBookingInfo(prev => ({...prev, hour: hour.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{hour}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "min" ? "" : "min")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{classBookingInfo.min.padStart(2, "0") || "00"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={minRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "min" ? `200px` : "0px",
                                        overflowY: activeTime === "min" ? `scroll` : "hidden",
                                    }}>
                                        {bookingMin.map((min, index) => (
                                            <p onClick={() => setClassBookingInfo(prev => ({...prev, min: min.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{min}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => {setActiveTime(prev => prev === "meridiem" ? "" : "meridiem")}} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{classBookingInfo.meridiem || "AM"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={meridiemRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "meridiem" ? `${meridiemRef.current?.scrollHeight}px` : "0px"
                                    }}>
                                        {meridiem.map((mer, index) => (
                                            <p onClick={() => setClassBookingInfo(prev => ({...prev, meridiem: mer}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{mer}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : activeBooking === 2 ? (
                    <>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col relative w-15 h-8">
                                <div onClick={() => setActiveTime(prev => prev === "year" ? "" : "year")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400 cursor-pointer">
                                    <p className="">{classBookingInfo.year || "YEAR"}</p>
                                    <ChevronDown strokeWidth={1} size={20} />
                                </div>
                                <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full bg-white shadow" style={{
                                    height: activeTime === "year" ? `200px` : "0px",
                                    overflowY: activeTime === "year" ? `scroll` : "hidden",
                                }}>
                                    {bookingYear.map((year, index) => (
                                        <p onClick={() => setClassBookingInfo(prev => ({...prev, year: year.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{year}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col relative w-15 h-8">
                                <div onClick={() => setActiveTime(prev => prev === "month" ? "" : "month")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400 cursor-pointer">
                                    <p className="">{classBookingInfo.month || "MONTH"}</p>
                                    <ChevronDown strokeWidth={1} size={20} />
                                </div>
                                <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full bg-white shadow" style={{
                                    height: activeTime === "month" ? `200px` : "0px",
                                    overflowY: activeTime === "month" ? `scroll` : "hidden",
                                }}>
                                    {bookingMonth.map((month, index) => (
                                        <p onClick={() => setClassBookingInfo(prev => ({...prev, month: month}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{month}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            {bookingDay.map((day, index) => (
                                <p onClick={() => setClassBookingInfo(prev => ({...prev, day: day}))} key={index} className={`${(day === "Sa" || day === "Su") && "text-red-500"} ${classBookingInfo.day === day && "bg-[#eaf2ff]"} md:w-12 md:h-12 w-8 h-8 flex justify-center items-center rounded-xl border hover:scale-75 transition-transform duration-50 active:scale-50 cursor-pointer select-none hover:bg-[#eaf2ff]`}>{day}</p>
                            ) )}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-stretch">
                            {bookingDate.map((date, index) => (
                                <p onClick={() => setClassBookingInfo(prev => ({...prev, date: date.toString()}))} key={index} className={`md:w-12 md:h-12 w-8 h-8 flex justify-center items-center rounded-xl border hover:scale-75 transition-transform duration-50 active:scale-50 cursor-pointer select-none hover:bg-[#eaf2ff] ${classBookingInfo.date === date.toString() && "bg-[#eaf2ff]"}`}>{date}</p>
                            ) )}
                        </div>
                        <input onChange={(e) => setClassBookingTitle(prev => {
                                const newData = [...prev];
                                newData[activeBooking] = e.target.value;
                                return newData
                        }
                            )} type="text" placeholder='Booking Title, e.g Afternoon Session' className='outline-none border border-gray-100 p-3 rounded-xl' />
                        <div className="flex justify-between gap-3">
                            <p className="text-sm">Slot 1</p>
                            <div className="flex gap-3 items-center">
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "hour" ? "" : "hour")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{classBookingInfo.hour.padStart(2, "0") || "00"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full" style={{
                                        height: activeTime === "hour" ? `200px` : "0px",
                                        overflowY: activeTime === "hour" ? `scroll` : "hidden",
                                    }}>
                                        {bookingHour.map((hour, index) => (
                                            <p onClick={() => setClassBookingInfo(prev => ({...prev, hour: hour.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{hour}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "min" ? "" : "min")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{classBookingInfo.min.padStart(2, "0") || "00"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={minRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "min" ? `200px` : "0px",
                                        overflowY: activeTime === "min" ? `scroll` : "hidden",
                                    }}>
                                        {bookingMin.map((min, index) => (
                                            <p onClick={() => setClassBookingInfo(prev => ({...prev, min: min.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{min}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => {setActiveTime(prev => prev === "meridiem" ? "" : "meridiem")}} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{classBookingInfo.meridiem || "AM"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={meridiemRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "meridiem" ? `${meridiemRef.current?.scrollHeight}px` : "0px"
                                    }}>
                                        {meridiem.map((mer, index) => (
                                            <p onClick={() => setClassBookingInfo(prev => ({...prev, meridiem: mer}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{mer}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : activeBooking === 3 ?  (
                    <>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col relative w-15 h-8">
                                <div onClick={() => setActiveTime(prev => prev === "year" ? "" : "year")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400 cursor-pointer">
                                    <p className="">{classBookingInfo.year || "YEAR"}</p>
                                    <ChevronDown strokeWidth={1} size={20} />
                                </div>
                                <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full bg-white shadow" style={{
                                    height: activeTime === "year" ? `200px` : "0px",
                                    overflowY: activeTime === "year" ? `scroll` : "hidden",
                                }}>
                                    {bookingYear.map((year, index) => (
                                        <p onClick={() => setClassBookingInfo(prev => ({...prev, year: year.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{year}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col relative w-15 h-8">
                                <div onClick={() => setActiveTime(prev => prev === "month" ? "" : "month")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400 cursor-pointer">
                                    <p className="">{classBookingInfo.month || "MONTH"}</p>
                                    <ChevronDown strokeWidth={1} size={20} />
                                </div>
                                <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full bg-white shadow" style={{
                                    height: activeTime === "month" ? `200px` : "0px",
                                    overflowY: activeTime === "month" ? `scroll` : "hidden",
                                }}>
                                    {bookingMonth.map((month, index) => (
                                        <p onClick={() => setClassBookingInfo(prev => ({...prev, month: month}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{month}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            {bookingDay.map((day, index) => (
                                <p onClick={() => setClassBookingInfo(prev => ({...prev, day: day}))} key={index} className={`${(day === "Sa" || day === "Su") && "text-red-500"} ${classBookingInfo.day === day && "bg-[#eaf2ff]"} md:w-12 md:h-12 w-8 h-8 flex justify-center items-center rounded-xl border hover:scale-75 transition-transform duration-50 active:scale-50 cursor-pointer select-none hover:bg-[#eaf2ff]`}>{day}</p>
                            ) )}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-stretch">
                            {bookingDate.map((date, index) => (
                                <p onClick={() => setClassBookingInfo(prev => ({...prev, date: date.toString()}))} key={index} className={`md:w-12 md:h-12 w-8 h-8 flex justify-center items-center rounded-xl border hover:scale-75 transition-transform duration-50 active:scale-50 cursor-pointer select-none hover:bg-[#eaf2ff] ${classBookingInfo.date === date.toString() && "bg-[#eaf2ff]"}`}>{date}</p>
                            ) )}
                        </div>
                        <input onChange={(e) => setClassBookingTitle(prev => {
                                const newData = [...prev];
                                newData[activeBooking] = e.target.value;
                                return newData
                        }
                            )} type="text" placeholder='Booking Title, e.g Afternoon Session' className='outline-none border border-gray-100 p-3 rounded-xl' />
                        <div className="flex justify-between gap-3">
                            <p className="text-sm">Slot 1</p>
                            <div className="flex gap-3 items-center">
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "hour" ? "" : "hour")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{classBookingInfo.hour.padStart(2, "0") || "00"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full" style={{
                                        height: activeTime === "hour" ? `200px` : "0px",
                                        overflowY: activeTime === "hour" ? `scroll` : "hidden",
                                    }}>
                                        {bookingHour.map((hour, index) => (
                                            <p onClick={() => setClassBookingInfo(prev => ({...prev, hour: hour.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{hour}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "min" ? "" : "min")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{classBookingInfo.min.padStart(2, "0") || "00"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={minRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "min" ? `200px` : "0px",
                                        overflowY: activeTime === "min" ? `scroll` : "hidden",
                                    }}>
                                        {bookingMin.map((min, index) => (
                                            <p onClick={() => setClassBookingInfo(prev => ({...prev, min: min.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{min}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => {setActiveTime(prev => prev === "meridiem" ? "" : "meridiem")}} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{classBookingInfo.meridiem || "AM"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={meridiemRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "meridiem" ? `${meridiemRef.current?.scrollHeight}px` : "0px"
                                    }}>
                                        {meridiem.map((mer, index) => (
                                            <p onClick={() => setClassBookingInfo(prev => ({...prev, meridiem: mer}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{mer}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col relative w-15 h-8">
                                <div onClick={() => setActiveTime(prev => prev === "year" ? "" : "year")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400 cursor-pointer">
                                    <p className="">{classBookingInfo.year || "YEAR"}</p>
                                    <ChevronDown strokeWidth={1} size={20} />
                                </div>
                                <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full bg-white shadow" style={{
                                    height: activeTime === "year" ? `200px` : "0px",
                                    overflowY: activeTime === "year" ? `scroll` : "hidden",
                                }}>
                                    {bookingYear.map((year, index) => (
                                        <p onClick={() => setClassBookingInfo(prev => ({...prev, year: year.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{year}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col relative w-15 h-8">
                                <div onClick={() => setActiveTime(prev => prev === "month" ? "" : "month")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400 cursor-pointer">
                                    <p className="">{classBookingInfo.month || "MONTH"}</p>
                                    <ChevronDown strokeWidth={1} size={20} />
                                </div>
                                <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full bg-white shadow" style={{
                                    height: activeTime === "month" ? `200px` : "0px",
                                    overflowY: activeTime === "month" ? `scroll` : "hidden",
                                }}>
                                    {bookingMonth.map((month, index) => (
                                        <p onClick={() => setClassBookingInfo(prev => ({...prev, month: month}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{month}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            {bookingDay.map((day, index) => (
                                <p onClick={() => setClassBookingInfo(prev => ({...prev, day: day}))} key={index} className={`${(day === "Sa" || day === "Su") && "text-red-500"} ${classBookingInfo.day === day && "bg-[#eaf2ff]"} md:w-12 md:h-12 w-8 h-8 flex justify-center items-center rounded-xl border hover:scale-75 transition-transform duration-50 active:scale-50 cursor-pointer select-none hover:bg-[#eaf2ff]`}>{day}</p>
                            ) )}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-stretch">
                            {bookingDate.map((date, index) => (
                                <p onClick={() => setClassBookingInfo(prev => ({...prev, date: date.toString()}))} key={index} className={`md:w-12 md:h-12 w-8 h-8 flex justify-center items-center rounded-xl border hover:scale-75 transition-transform duration-50 active:scale-50 cursor-pointer select-none hover:bg-[#eaf2ff] ${classBookingInfo.date === date.toString() && "bg-[#eaf2ff]"}`}>{date}</p>
                            ) )}
                        </div>
                        <input onChange={(e) => setClassBookingTitle(prev => {
                                const newData = [...prev];
                                newData[activeBooking] = e.target.value;
                                return newData
                        }
                            )} type="text" placeholder='Booking Title, e.g Afternoon Session' className='outline-none border border-gray-100 p-3 rounded-xl' />
                        <div className="flex justify-between gap-3">
                            <p className="text-sm">Slot 1</p>
                            <div className="flex gap-3 items-center">
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "hour" ? "" : "hour")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{classBookingInfo.hour.padStart(2, "0") || "00"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full" style={{
                                        height: activeTime === "hour" ? `200px` : "0px",
                                        overflowY: activeTime === "hour" ? `scroll` : "hidden",
                                    }}>
                                        {bookingHour.map((hour, index) => (
                                            <p onClick={() => setClassBookingInfo(prev => ({...prev, hour: hour.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{hour}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "min" ? "" : "min")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{classBookingInfo.min.padStart(2, "0") || "00"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={minRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "min" ? `200px` : "0px",
                                        overflowY: activeTime === "min" ? `scroll` : "hidden",
                                    }}>
                                        {bookingMin.map((min, index) => (
                                            <p onClick={() => setClassBookingInfo(prev => ({...prev, min: min.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{min}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => {setActiveTime(prev => prev === "meridiem" ? "" : "meridiem")}} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{classBookingInfo.meridiem || "AM"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={meridiemRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "meridiem" ? `${meridiemRef.current?.scrollHeight}px` : "0px"
                                    }}>
                                        {meridiem.map((mer, index) => (
                                            <p onClick={() => setClassBookingInfo(prev => ({...prev, meridiem: mer}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{mer}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>  
        ) : (
            <div onClick={() => setAddHealthPreviewDrop(!addHealthPreviewDrop)} className="bg-gray-100 p-3 rounded-xl flex flex-col gap-3">
                <div className={`flex justify-between items-center gap-5`}>
                    <div className="flex items-center gap-2">
                    <div className="md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center text-white bg-[#ebeded]">
                        <X strokeWidth={1} />
                    </div>
                    <p className="md:text-md text-sm">{classTitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                    <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">75% Booked</div>
                    <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">EDIT COURSE</div>
                    <ChevronDown strokeWidth={1} />
                    </div>
                </div>
                <div className={`bg-white transition-all duration-200 rounded-xl flex flex-col gap-3 overflow-hidden mt-3`}>
                    <p className="text-sm md:text-md text-[#c3cad9] p-3">{classBrieflyDescribe}</p>
                    <div className="flex items-center justify-between p-3">
                    <p className="text-sm md:text-md text-[#c3cad9]/50">Section</p>
                    <CustomButton text={classSectionList} background='bg-[#006838] text-white' active={classSectionList} />
                    </div>
                    <div className="flex flex-col gap-5 p-3">
                        {classProviderName.length > 0 && (
                            <>
                                {
                                    classProviderName.map((name, index) => (
                                        <div className={`justify-between items-center ${index === 0 ? "hidden" : "flex"}`} key={index}>
                                            <div className="flex items-center gap-5">
                                            <div className="md:w-8 md:h-8 w-6 h-6 md:text-md text-sm rounded-full bg-[#ebeded]/20 flex justify-center items-center">{index}</div>
                                            <div className="flex flex-col gap-1">
                                                <p className="font-semibold">{name}</p>
                                                <p className="text-sm font-light">MD FACS.</p>
                                            </div>
                                            </div>
                                            <p>BOOKED</p>
                                        </div>
                                    ))
                                }
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
        )}
        <div className="flex flex-col gap-3 w-1/2 fixed bottom-0  left-1/2 -translate-x-1/2 p-5 h-50">
            {currentIndex === addHealthStepArray.length - 1 ? (
                <button onClick={() => {handleSaveClassData(), setAddClass(false)}} className='bg-[#006838] text-white rounded-2xl p-5 flex-grow'>CONFIRM AND SAVE</button>
            ) : (
                <>
                     <div onClick={() => setAddHealthPreviewDrop(!addHealthPreviewDrop)} className="bg-gray-100 p-3 rounded-xl flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-xl">SPECIALTY DETAILS</p>
                            <ChevronDown className='text-gray-300' strokeWidth={1} />
                        </div>
                        <div className={`flex justify-between items-center gap-5`}>
                            <div className="flex items-center gap-2">
                            <div className="md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center text-white bg-[#ebeded]">
                                <X strokeWidth={1} />
                            </div>
                            <p className="md:text-md text-sm">{classTitle}</p>
                            </div>
                            <div className="flex items-center gap-2">
                            <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">75% Booked</div>
                            <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">EDIT SPECIALTY</div>
                            <ChevronDown strokeWidth={1} />
                            </div>
                        </div>
                        <div className={`bg-white transition-all duration-200 rounded-xl flex flex-col gap-3 overflow-hidden mt-3 ${addHealthPreviewDrop ? "h-auto" : "h-0"}`}>
                            <p className="text-sm md:text-md text-[#c3cad9] p-3">{classBrieflyDescribe}</p>
                            <div className="flex items-center justify-between p-3">
                            <p className="text-sm md:text-md text-[#c3cad9]/50">Section</p>
                            <CustomButton text={classSectionList} background='bg-[#006838] text-white' active={classSectionList} />
                            </div>
                            <div className="flex gap-3 items-center justify-between p-3 flex-wrap">
                            </div>
                            <div className="flex flex-col gap-5 p-3">
                                {
                                    classProviderName.map((name, index) => (
                                        <div className={`justify-between items-center ${index === 0 ? "hidden" : "flex"}`}>
                                            <div className="flex items-center gap-5">
                                                <div className="md:w-8 md:h-8 w-6 h-6 md:text-md text-sm rounded-full bg-[#ebeded]/20 flex justify-center items-center">{index}</div>
                                                <div className="flex flex-col gap-1">
                                                    <p className="font-semibold">{name}</p>
                                                    <p className="text-sm font-light">MD FACS.</p>
                                                </div>
                                            </div>
                                            <p>BOOKED</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full">
                        <button onClick={() => {
                            if(currentIndex === 3) {
                                return
                            }
                            setCurrentIndex(prev => prev + 1)
                        }} className='bg-[#006838] text-white rounded-2xl p-5 flex-grow'>NEXT</button>
                        <div className="flex justify-center items-center relative">
                            <ArrowRight className='absolute text-[#006838]' />
                            <CircularProgress variant='determinate' size={60} className='text-[#006838]' value={((currentIndex + 1) / addHealthStepArray.length) * 100} />
                        </div>
                    </div>
                </>
            )}
         
        </div>
    </div>
  )
}

export default AddHealth