'use client'
import { useProvider } from '@/context/ServicesContext'
import { ArrowRight, ArrowUp, ArrowUpDown, Check, ChevronDown, ChevronLeft, Minus, Plus, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import TextNum from '../custom-components/TextNum'
import CustomButton from '../custom-components/CustomButton'
import { CircularProgress } from '@mui/material'
import product1 from '@/assets/images/product-1.png'
import Image, { StaticImageData } from 'next/image'

type Props = {}

const AddHospitality = (props: Props) => {
    const addHospitalityStepArray = ["Facility Info", "Add Media", "Booking Info", "Preview"];
    const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false)
    const [hostpitalityServicesSelection, setHospitalityServicesSelection] = useState<string>("")
    const [serviceTitleCollection, setServiceTitleCollection] = useState<string>("")
    const [serviceDescribeCollection, setServiceDescribeCollection] = useState<string>("")
    const [serviceCostCollection, setServiceCostCollection] = useState<string>("")
    const [handleBookingTitle, setHandleBookingTitle] = useState("")
    const [mediaFileData, setMediaFileData] = useState<string>("")
    const [addHospitalityPreviewDrop, setAddHealthPreviewDrop] = useState<boolean>(false)
    const numberOfBooking = [1, 2, 3,4];
    const [numberOfBookingCount, setNumberOfBookingCount] = useState<number>(1)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [activeBooking, setActiveBooking] = useState<number>(1)
    const {setAddHospitalityButton, addHospitalityBooking, setAddHospitalityBooking, setImageUrl, imageUrl, setServiceTitle, serviceTitle, setServiceDescribe, serviceDescribe, serviceList, setServiceList, componentsAvailable, setComponentsAvailable, maximumCapacity, setMaximumCapacity, addHospitalityButton} = useProvider();
    const [carouselSize, setCarouselSize] = useState<number>(0)
    const [previewCarouselSize, setPreviewCarouselSize] = useState<number>(0)
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
    const [previewCurrentImageIndex, setPreviewCurrentImageIndex] = useState<number>(0)
    const [activeTime, setActiveTime] = useState<string>("")
    const servicesArray = ["BED AND BOARDING", "RECREATION", "FINE DINING", "24-HR ROOM SERICE", "EVENTS", "CONCIERGE SERVICES"];
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

    const mediaRef = useRef<(HTMLDivElement | null)[]>([])
    const previewMediaRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        setServiceTitle(serviceTitleCollection);
        setServiceDescribe(serviceDescribeCollection);
        setMaximumCapacity(parseInt(serviceCostCollection));
        setAddHospitalityBooking(prev => ({...prev, bookingTitle: handleBookingTitle}))
    }, [serviceTitleCollection, serviceDescribeCollection, serviceCostCollection])

    useEffect(() => {
        const handleResize = () => {
            const firstElement = mediaRef.current[0];
            if(firstElement){
                const mediaSize = firstElement.getBoundingClientRect().width
                setCarouselSize(mediaSize)
            }
        }
        handleResize()
        const previewHandleResize = () => {
            const firstElement = previewMediaRef.current[0];
            if(firstElement){
                const mediaSize = firstElement.getBoundingClientRect().width
                setPreviewCarouselSize(mediaSize)
            }
        }

        previewHandleResize()

        window.addEventListener("resize", () => {
            handleResize()
            previewHandleResize()
        })

        return () => {
            window.removeEventListener("resize", () => {
                handleResize()
                previewHandleResize()
            })
        }
    }, [imageUrl, currentIndex])

  return (
    <div className='flex flex-col gap-10 w-full'>
        <div className="flex justify-between items-center">
            <ChevronLeft onClick={() => setAddHospitalityButton(false)} size={30} strokeWidth={1} className='text-gray-300' />
            <p className="font-bold mx-auto">{currentIndex === 3 ? "" : "New"} {addHospitalityStepArray[currentIndex].split(" ")[0]}</p>
        </div>
        <div className="flex justify-between gap-5">
            {addHospitalityStepArray.map((step, index) => (
                <div className="flex flex-col gap-3 items-center">
                    <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center text-sm ${currentIndex === index ? "bg-[#006838] text-white" : "bg-gray-300 cursor-not-allowed opacity-10"}`}>{index + 1}</div>
                    <p className="font-bold">{step}</p>
                </div>
            ))}
        </div>
        {currentIndex === 0 ? (
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                    <input onChange={(e) => setServiceTitleCollection(e.target.value)} type='text' placeholder='Specialy Title' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                    <input onChange={(e) => setServiceDescribeCollection(e.target.value)} type='text' placeholder='Briefly Describe' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                    <p className="text-[10px] text-gray-300">0/30</p>
                </div>
                <TextNum text='Care Type' optionalText='Select a category' number={9} />
                <div className="flex flex-wrap gap-3">
                    {servicesArray.map((service, index) => (
                        <CustomButton handleClick={() => setServiceList(prev => [...prev, service])} setActive={setHospitalityServicesSelection} active={hostpitalityServicesSelection} key={index} text={service} />
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
                        <div className="flex flex-col gap-3">
                            <input onChange={(e) => setServiceCostCollection(e.target.value)} type='text' placeholder='Briefly Describe' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                        </div>
                        <p className="text-sm text-gray-300">Students</p>
                    </div>
                </div>
            </div>   
        ) : currentIndex === 1 ? (
            <div className="flex flex-col gap-5 flex-shrink-0">
                <div className="flex overflow-hidden w-full ">
                    <div style={{
                        transform: `translateX(-${(carouselSize + 12) * currentImageIndex}px)`
                    }} className="flex gap-3 w-full transition-transform duration-200">
                        {imageUrl.length > 0 && (
                            <>
                                {imageUrl.map((image, index) => (
                                    <div key={index} ref={(el) => {mediaRef.current[index] = el}} className="w-full h-[20rem] flex-shrink-0 rounded-2xl overflow-hidden">
                                        <Image src={image} width={1000} height={1000} alt="file data" className='w-full h-full object-cover' />
                                    </div>
                                ))}
                            </>
                        )}
                        <label htmlFor='file' className='w-full h-[20rem] flex-shrink-0'>
                            <div className="flex justify-center items-center w-full h-full flex-grow bg-[#eaf2ff] rounded-2xl overflow-hidden">
                                {mediaFileData && !isLoadingFile ? (
                                    <Image src={mediaFileData} width={1000} height={1000} alt="file data" className='w-full h-full' />
                                ) : (
                                    <div className="flex justify-center items-center relative">
                                        <CircularProgress variant={isLoadingFile ? 'indeterminate' : 'determinate'} className='text-[#006838]' size={60} value={50} />
                                        <ArrowUp strokeWidth={1} size={30} className='absolute' />
                                    </div>
                                )}
                            </div>
                            <input onChange={(e) => {
                                const file = e.target.files;
                                if(!file) return
                                const selectedFile = file[0];
                                const url = URL.createObjectURL(selectedFile)
                                setIsLoadingFile(true)
                                setMediaFileData(url)
                                setImageUrl(prev =>  [...prev, url])

                                setTimeout(() => {
                                    setIsLoadingFile(false)
                                }, 3000)

                                e.target.value = "";
                                setTimeout(() => {
                                    setMediaFileData("")
                                }, 6000)
                            }} type="file" id='file' className='hidden' />
                        </label>
                    </div>
                </div>
                <div className="flex justify-end gap-3 p-3">
                    {imageUrl.length > 0 && (
                        <>
                            {imageUrl.map((_, index) => (
                                <div key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full ${currentImageIndex === index ? "bg-[#006838]" : "bg-[#eaf2ff]"}`} />
                            ))}
                            <div onClick={() => setCurrentImageIndex(imageUrl.length)} className={`h-3 rounded-full bg-[#006838] flex justify-center items-center text-white`}>
                                <Plus />
                            </div>
                        </>
                    )}
                </div>
            </div>   
        ) : currentIndex === 2 ?(
            <>
                {/* <div className="flex justify-between items-center">
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
                </div> */}
                {/* <div className="flex justify-between items-center md:px-20 px-5">
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
                </div> */}
                {activeBooking === 1 ? (    
                    <>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col relative w-15 h-8">
                                <div onClick={() => setActiveTime(prev => prev === "year" ? "" : "year")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400 cursor-pointer">
                                    <p className="">{addHospitalityBooking.year || "YEAR"}</p>
                                    <ChevronDown strokeWidth={1} size={20} />
                                </div>
                                <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full bg-white shadow" style={{
                                    height: activeTime === "year" ? `200px` : "0px",
                                    overflowY: activeTime === "year" ? `scroll` : "hidden",
                                }}>
                                    {bookingYear.map((year, index) => (
                                        <p onClick={() => setAddHospitalityBooking(prev => ({...prev, year: year.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{year}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col relative w-15 h-8">
                                <div onClick={() => setActiveTime(prev => prev === "month" ? "" : "month")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400 cursor-pointer">
                                    <p className="">{addHospitalityBooking.year || "MONTH"}</p>
                                    <ChevronDown strokeWidth={1} size={20} />
                                </div>
                                <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full bg-white shadow" style={{
                                    height: activeTime === "month" ? `200px` : "0px",
                                    overflowY: activeTime === "month" ? `scroll` : "hidden",
                                }}>
                                    {bookingMonth.map((month, index) => (
                                        <p onClick={() => setAddHospitalityBooking(prev => ({...prev, month: month}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{month}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            {bookingDay.map((day, index) => (
                                <p onClick={() => setAddHospitalityBooking(prev => ({...prev, day: day}))} key={index} className={`${(day === "Sa" || day === "Su") && "text-red-500"} ${addHospitalityBooking.day === day && "bg-[#eaf2ff]"} md:w-12 md:h-12 w-8 h-8 flex justify-center items-center rounded-xl border hover:scale-75 transition-transform duration-50 active:scale-50 cursor-pointer select-none hover:bg-[#eaf2ff]`}>{day}</p>
                            ) )}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-stretch">
                            {bookingDate.map((date, index) => (
                                <p onClick={() => setAddHospitalityBooking(prev => ({...prev, date: date.toString()}))} key={index} className={`md:w-12 md:h-12 w-8 h-8 flex justify-center items-center rounded-xl border hover:scale-75 transition-transform duration-50 active:scale-50 cursor-pointer select-none hover:bg-[#eaf2ff] ${addHospitalityBooking.date === date.toString() && "bg-[#eaf2ff]"}`}>{date}</p>
                            ) )}
                        </div>
                        <input onChange={(e) => setHandleBookingTitle(e.target.value)} type="text" placeholder='Booking Title, e.g Afternoon Session' className='outline-none border border-gray-100 p-3 rounded-xl' />
                        <div className="flex justify-between gap-3">
                            <p className="text-sm">Slot 1</p>
                            <div className="flex gap-3 items-center">
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "hour" ? "" : "hour")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{addHospitalityBooking.hour.padStart(2, "0") || "00"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full" style={{
                                        height: activeTime === "hour" ? `200px` : "0px",
                                        overflowY: activeTime === "hour" ? `scroll` : "hidden",
                                    }}>
                                        {bookingHour.map((hour, index) => (
                                            <p onClick={() => setAddHospitalityBooking(prev => ({...prev, hour: hour.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{hour}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "min" ? "" : "min")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{addHospitalityBooking.min.padStart(2, "0") || "00"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={minRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "min" ? `200px` : "0px",
                                        overflowY: activeTime === "min" ? `scroll` : "hidden",
                                    }}>
                                        {bookingMin.map((min, index) => (
                                            <p onClick={() => setAddHospitalityBooking(prev => ({...prev, min: min.toString()}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{min}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => {setActiveTime(prev => prev === "meridiem" ? "" : "meridiem")}} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">{addHospitalityBooking.meridiem || "AM"}</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={meridiemRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "meridiem" ? `${meridiemRef.current?.scrollHeight}px` : "0px"
                                    }}>
                                        {meridiem.map((mer, index) => (
                                            <p onClick={() => setAddHospitalityBooking(prev => ({...prev, meridiem: mer}))} key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{mer}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : activeBooking === 2 ? (
                    <>
                        <div className="flex justify-between items-center gap-3">
                            {bookingDay.map((day, index) => (
                                <p key={index} className={`${(day === "Sa" || day === "Su") && "text-red-500"}`}>{day}</p>
                            ) )}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-stretch">
                            {bookingDate.map((date, index) => (
                                <p key={index} className={`md:w-12 md:h-12 w-8 h-8 flex justify-center items-center rounded-xl border`}>{date}</p>
                            ) )}
                        </div>
                        <input type="text" placeholder='Booking Title, e.g Afternoon Session' className='outline-none border border-gray-100 p-3 rounded-xl' />
                        <div className="flex justify-between gap-3">
                            <p className="text-sm">Slot 1</p>
                            <div className="flex gap-3 items-center">
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "hour" ? "" : "hour")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">10</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full" style={{
                                        height: activeTime === "hour" ? `200px` : "0px",
                                        overflowY: activeTime === "hour" ? `scroll` : "hidden",
                                    }}>
                                        {bookingHour.map((hour, index) => (
                                            <p key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{hour}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "min" ? "" : "min")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">00</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={minRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "min" ? `200px` : "0px",
                                        overflowY: activeTime === "min" ? `scroll` : "hidden",
                                    }}>
                                        {bookingMin.map((min, index) => (
                                            <p key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{min}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "meridiem" ? "" : "meridiem")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">AM</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={meridiemRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "meridiem" ? `${meridiemRef.current?.scrollHeight}px` : "0px"
                                    }}>
                                        {meridiem.map((mer, index) => (
                                            <p key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{mer}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : activeBooking === 3 ?  (
                    <>
                        <div className="flex justify-between items-center gap-3">
                            {bookingDay.map((day, index) => (
                                <p key={index} className={`${(day === "Sa" || day === "Su") && "text-red-500"}`}>{day}</p>
                            ) )}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-stretch">
                            {bookingDate.map((date, index) => (
                                <p key={index} className={`md:w-12 md:h-12 w-8 h-8 flex justify-center items-center rounded-xl border`}>{date}</p>
                            ) )}
                        </div>
                        <input type="text" placeholder='Booking Title, e.g Afternoon Session' className='outline-none border border-gray-100 p-3 rounded-xl' />
                        <div className="flex justify-between gap-3">
                            <p className="text-sm">Slot 1</p>
                            <div className="flex gap-3 items-center">
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "hour" ? "" : "hour")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">10</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full" style={{
                                        height: activeTime === "hour" ? `200px` : "0px",
                                        overflowY: activeTime === "hour" ? `scroll` : "hidden",
                                    }}>
                                        {bookingHour.map((hour, index) => (
                                            <p key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{hour}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "min" ? "" : "min")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">00</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={minRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "min" ? `200px` : "0px",
                                        overflowY: activeTime === "min" ? `scroll` : "hidden",
                                    }}>
                                        {bookingMin.map((min, index) => (
                                            <p key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{min}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "meridiem" ? "" : "meridiem")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">AM</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={meridiemRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "meridiem" ? `${meridiemRef.current?.scrollHeight}px` : "0px"
                                    }}>
                                        {meridiem.map((mer, index) => (
                                            <p key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{mer}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-center gap-3">
                            {bookingDay.map((day, index) => (
                                <p key={index} className={`${(day === "Sa" || day === "Su") && "text-red-500"}`}>{day}</p>
                            ) )}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-stretch">
                            {bookingDate.map((date, index) => (
                                <p key={index} className={`md:w-12 md:h-12 w-8 h-8 flex justify-center items-center rounded-xl border`}>{date}</p>
                            ) )}
                        </div>
                        <input type="text" placeholder='Booking Title, e.g Afternoon Session' className='outline-none border border-gray-100 p-3 rounded-xl' />
                        <div className="flex justify-between gap-3">
                            <p className="text-sm">Slot 1</p>
                            <div className="flex gap-3 items-center">
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "hour" ? "" : "hour")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">10</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={hourRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full" style={{
                                        height: activeTime === "hour" ? `200px` : "0px",
                                        overflowY: activeTime === "hour" ? `scroll` : "hidden",
                                    }}>
                                        {bookingHour.map((hour, index) => (
                                            <p key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{hour}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "min" ? "" : "min")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">00</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={minRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "min" ? `200px` : "0px",
                                        overflowY: activeTime === "min" ? `scroll` : "hidden",
                                    }}>
                                        {bookingMin.map((min, index) => (
                                            <p key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{min}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-15 h-8">
                                    <div onClick={() => setActiveTime(prev => prev === "meridiem" ? "" : "meridiem")} className="w-full h-full flex items-center gap-2 border border-gray-100 rounded-lg p-1 text-gray-400">
                                        <p className="">AM</p>
                                        <ChevronDown strokeWidth={1} size={20} />
                                    </div>
                                    <div ref={meridiemRef} className="flex flex-col gap-3 absolute top-10 left-0 w-full overflow-hidden" style={{
                                        height: activeTime === "meridiem" ? `${meridiemRef.current?.scrollHeight}px` : "0px"
                                    }}>
                                        {meridiem.map((mer, index) => (
                                            <p key={index} className="text-gray-400 w-full text-center bg-gray-100 rounded-lg">{mer}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>  
        ) : (
            <div onClick={() => setAddHealthPreviewDrop(!addHospitalityPreviewDrop)} className="bg-gray-100 p-3 rounded-xl flex flex-col gap-3">
                <div className={`transition-all duration-200 rounded-xl flex flex-col gap-3 overflow-hidden`}>
                    <div className="flex flex-col gap-5 flex-shrink-0">
                        <div className="flex overflow-hidden w-full ">
                            <div style={{
                                transform: `translateX(-${(previewCarouselSize + 12) * previewCurrentImageIndex}px)`
                            }} className="flex gap-3 w-full transition-transform duration-200">
                                {imageUrl.length > 0 && (
                                    <>
                                        {imageUrl.map((image, index) => (
                                            <div key={index} ref={(el) => {previewMediaRef.current[index] = el}} className="w-[20rem] h-[15rem] flex-shrink-0 rounded-2xl overflow-hidden">
                                                <Image src={image} width={1000} height={1000} alt="file data" className='w-full h-full object-cover' />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 p-3">
                            {imageUrl.length > 0 && (
                                <>
                                    {imageUrl.map((_, index) => (
                                        <div key={index} onClick={() => setPreviewCurrentImageIndex(index)} className={`w-3 h-3 rounded-full ${previewCurrentImageIndex === index ? "bg-[#006838]" : "bg-[#eaf2ff]"}`} />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-5 justify-between">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <p className="text-gray-300 text-sm">Category</p>
                            {serviceList.length > 0 && (
                                <>
                                    {serviceList.map((service, index) => (
                                        <p key={index} className='text-sm'>{service}</p>
                                    ))}
                                </>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <p className="text-gray-300 text-sm">Description</p>
                            <p className='text-sm'>{serviceDescribe}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 flex-shrink-0">
                        <div className="flex flex-col">
                            <p className="text-gray-300 text-sm">Category</p>
                            <p>{addHospitalityBooking.month} {addHospitalityBooking.date}, {addHospitalityBooking.year}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-gray-300 text-sm">Service Category</p>
                            <p>Hospitality</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-300 text-sm">Capacity</p>
                    <p className='p-2 rounded-full bg-gray-200 me-[4rem]'>{maximumCapacity} Rooms</p>
                </div>
            </div>
        )}
        <div className="flex flex-col gap-3 w-1/2 fixed bottom-0  left-1/2 -translate-x-1/2 p-5 h-50">
            {currentIndex === addHospitalityStepArray.length - 1 ? (
                <button onClick={() => {setAddHospitalityButton(false)}} className='bg-[#006838] text-white rounded-2xl p-5 flex-grow'>CONFIRM AND SAVE</button>
            ) : (
                <>
                     <div onClick={() => setAddHospitalityButton(!addHospitalityPreviewDrop)} className="bg-gray-100 p-3 rounded-xl flex flex-col gap-3">
                        <div className="flex gap-5 justify-between">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col">
                                    <p className="text-gray-300 text-sm">Category</p>
                                    {serviceList.length > 0 && (
                                        <>
                                            {serviceList.map((service, index) => (
                                                <p key={index} className='text-sm'>{service}</p>
                                            ))}
                                        </>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-gray-300 text-sm">Description</p>
                                    <p className='text-sm'>{serviceDescribe}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 flex-shrink-0">
                                <div className="flex flex-col">
                                    <p className="text-gray-300 text-sm">Category</p>
                                    <p>{addHospitalityBooking.month} {addHospitalityBooking.date}, {addHospitalityBooking.year}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-gray-300 text-sm">Service Category</p>
                                    <p>Hospitality</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-300 text-sm">Capacity</p>
                            <p className='p-2 rounded-full bg-gray-200 me-[4rem]'>{maximumCapacity} Rooms</p>
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
                            <CircularProgress variant='determinate' size={60} className='text-[#006838]' value={((currentIndex + 1) / addHospitalityStepArray.length) * 100} />
                        </div>
                    </div>
                </>
            )}
         
        </div>
    </div>
  )
}

export default AddHospitality


export const EditHospitality = (props: Props) => {
    const [careTypeSelection, setCareTypeSelection] = useState<string>('');
    const addHealthStepArray = ["Services Info", "Facility", "Preview"];
    const [addHealthPreviewDrop, setAddHealthPreviewDrop] = useState<boolean>(false)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const {setAddHospitalityButton, setCareType, careType, specialtyTitle, setBrieflyDescribe, brieflyDescribe, procedureType, providerName, saveCurrentHealthData} = useProvider();
    const servicesArray = ["BED AND BOARDING", "RECREATION", "FINE DINING", "24-HR ROOM SERICE", "EVENTS", "CONCIERGE SERVICES"];
    const componentsArray = ["COMPLIMENTARY BREAKFAST", "LOCAL GUIDES", "SAFETY AND SECURITY", "LOUNGE", "TOURS", "EXTRAS"]
  return (
    <div className='flex flex-col gap-10 w-full'>
        <div className="flex justify-between items-center">
            <ChevronLeft onClick={() => setAddHospitalityButton(false)} size={30} strokeWidth={1} className='text-gray-300' />
            <p className="font-bold mx-auto">{currentIndex === 2 ? "" : "Add"} {addHealthStepArray[currentIndex].split(" ")[0]}</p>
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
                <TextNum text='Similar Service' optionalText='List of Available Categories' number={9} />
                <div className="flex flex-wrap gap-3">
                    {servicesArray.map((service, index) => (
                        <CustomButton handleClick={() => {setCareTypeSelection(service), setCareType(prev => prev.includes(service) ? prev.filter(item => item !== service) : [...prev, service])}} setActive={setCareTypeSelection} active={careTypeSelection} key={index} text={service} />
                    ))}
                </div>
                <TextNum text='Components Available' optionalText='Select a category' number={9} />
                <div className="flex flex-wrap gap-3">
                    {componentsArray.map((components, index) => (
                        <CustomButton handleClick={() => {setCareTypeSelection(components), setCareType(prev => prev.includes(components) ? prev.filter(item => item !== components) : [...prev, components])}} setActive={setCareTypeSelection} active={careTypeSelection} key={index} text={components} />
                    ))}
                </div>
                <div className="border border-gray-100 rounded-xl flex flex-col gap-5 p-3">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#006838] flex justify-center items-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                        <p className="font-semibold md:text-md text-sm">Service Cost</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <input onChange={(e) => setBrieflyDescribe(e.target.value)} type='text' placeholder='NGN 10' className='w-full border-gray-100 border p-3 rounded-xl outline-none' />
                    </div>
                </div>
            </div>   
        ) : currentIndex === 1 ? (
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5 p-3 bg-[#f8f9fe] rounded-xl">
                    <div className={`flex justify-between items-center gap-5`}>
                        <div className="flex items-center gap-2">
                            <div className=" w-6 h-6 rounded-full flex justify-center items-center text-white bg-[#ebeded]">
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                            </div>
                            <p className="md:text-md text-sm">Luxury Rooms</p>
                            </div>
                            <div className="flex items-center gap-2">
                            <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">75% Booked</div>
                            <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">EDIT FACILITY</div>
                            <ChevronDown strokeWidth={1} />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">Clean, well-furnished rooms with cozy bedding, seating areas, and basic amenities to ensure a pleasant stay:</p>
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] text-gray-200">Capacity</p>
                        <div className="p-1 rounded bg-white border-[#006838] border text-[10px]">8:00 AM - 11:00 AM</div>
                    </div>
                    <div className="flex gap-3 overflow-scroll">
                        <div className="w-50 h-60 flex-shrink-0 rounded-2xl overflow-hidden relative">
                            <div className="absolute rounded-lg p-2 text-sm top-3 right-3 bg-[#eaf2ff]">Fully Equipped</div>
                            <Image src={product1} width={1000} height={1000} alt='product 1' className='w-full h-full object cover' />
                        </div>
                        <div className="w-50 h-60 flex-shrink-0 rounded-2xl overflow-hidden relative">
                            <div className="absolute rounded-lg p-2 text-sm top-3 right-3 bg-[#eaf2ff]">Fully Equipped</div>
                            <Image src={product1} width={1000} height={1000} alt='product 1' className='w-full h-full object cover' />
                        </div>
                        <div className="w-50 h-60 flex-shrink-0 rounded-2xl overflow-hidden relative">
                            <div className="absolute rounded-lg p-2 text-sm top-3 right-3 bg-[#eaf2ff]">Fully Equipped</div>
                            <Image src={product1} width={1000} height={1000} alt='product 1' className='w-full h-full object cover' />
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                    </div>
                </div>
            </div>  
        ) : (
            <div className="flex flex-col gap-5 p-3 bg-[#f8f9fe] rounded-xl">
                <div className={`flex justify-between items-center gap-5`}>
                    <div className="flex items-center gap-2">
                        <div className=" w-6 h-6 rounded-full flex justify-center items-center text-white bg-[#ebeded]">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                        </div>
                        <p className="md:text-md text-sm">Luxury Rooms</p>
                        </div>
                        <div className="flex items-center gap-2">
                        <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">75% Booked</div>
                        <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">EDIT FACILITY</div>
                        <ChevronDown strokeWidth={1} />
                    </div>
                </div>
                <p className="text-sm text-gray-500">Clean, well-furnished rooms with cozy bedding, seating areas, and basic amenities to ensure a pleasant stay:</p>
                <div className="flex flex-wrap gap-3">
                    {servicesArray.map((care, index) => (
                        <CustomButton handleClick={() => {setCareTypeSelection(care), setCareType(prev => prev.includes(care) ? prev.filter(item => item !== care) : [...prev, care])}} setActive={setCareTypeSelection} active={careTypeSelection} key={index} text={care} />
                    ))}
                </div>
                <div className={`justify-between items-center flex`}>
                    <div className="flex items-center gap-5">
                    <div className="md:w-8 md:h-8 w-6 h-6 md:text-md text-sm rounded-full bg-[#ebeded]/20 flex justify-center items-center">1</div>
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold">Luxiry Rooms</p>
                        <p className="text-sm font-light">12 Rooms</p>
                    </div>
                    </div>
                </div>
            </div>
        )}
        <div className="flex flex-col gap-3 w-1/2 fixed bottom-0  left-1/2 -translate-x-1/2 p-5 h-50 bg-white">
            {currentIndex === addHealthStepArray.length - 1 ? (
                <button onClick={() => {saveCurrentHealthData(), setAddHospitalityButton(false)}} className='bg-[#006838] text-white rounded-2xl p-5 flex-grow'>CONFIRM AND SAVE</button>
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
                            <p className="md:text-md text-sm">{specialtyTitle}</p>
                            </div>
                            <div className="flex items-center gap-2">
                            <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">75% Booked</div>
                            <div className="py-1 rounded-full text-sm md:text-md bg-[#ffe3ac] px-3">EDIT SPECIALTY</div>
                            <ChevronDown strokeWidth={1} />
                            </div>
                        </div>
                        <div className={`bg-white transition-all duration-200 rounded-xl flex flex-col gap-3 overflow-hidden mt-3 ${addHealthPreviewDrop ? "h-auto" : "h-0"}`}>
                            <p className="text-sm md:text-md text-[#c3cad9] p-3">{brieflyDescribe}</p>
                            <div className="flex items-center justify-between p-3">
                            <p className="text-sm md:text-md text-[#c3cad9]/50">Care Type</p>
                            <CustomButton text={procedureType} background='bg-[#006838] text-white' active={procedureType} />
                            </div>
                            <div className="flex gap-3 items-center justify-between p-3 flex-wrap">
                            {careType.map((care, index) => (
                                <CustomButton text={care} key={index} background='bg-[#ebeded]' />
                            ))}
                            </div>
                            <div className="flex flex-col gap-5 p-3">
                                {
                                    providerName.map((name, index) => (
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