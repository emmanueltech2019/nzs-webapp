import React, { useRef, useState } from 'react'
import Image from 'next/image';
import { FaChevronDown, FaPlayCircle, FaStar } from 'react-icons/fa'
import hospitalityBackground from "@/assets/images/hospitalityBackground.png"
import hospitalityLogo from '@/assets/images/hospitalityLogo.png'

const EducationStudy = () => {
    const [activeAccordion, setActiveAccordion] = useState('');
    const [activeTab, setActiveTab] = useState('junior');
    const accordionContentRef0 = useRef<HTMLDivElement>(null);
    const accordionContentRef2 = useRef<HTMLDivElement>(null);
    const displayContent = () => {
        if(activeTab === 'junior') {
            return <>
                <div className="flex flex-col p-4 gap-3 my-5 rounded-3xl bg-[#EBEDEB]">
                    <div onClick={() => setActiveAccordion('subjects')} className="flex flex-col gap-3 rounded-xl bg-white p-4 cursor-pointer">
                        <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                            <p className="font-semibold text-black text-sm">Subjects</p>
                            <div className="flex gap-3 items-center">
                                <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeAccordion === 'subjects' ? 'rotate-180' : ''}`} />       
                            </div>
                        </div>
                        <div ref={accordionContentRef0} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
                        style={{
                            height: activeAccordion === 'subjects' ? `${accordionContentRef0.current?.scrollHeight}px` : '0px'
                        }}>
                            <p className="text-gray-700 text-sm">We provide students with a foundational understanding of the natural world, scientific principles, and critical thinking skills. It's essential for pursuing careers in medicine, engineering, environmental science, and other STEM-related fields.</p>
                            <div className="flex gap-4 flex-col p-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='w-[5rem] h-[5rem] object-cover rounded-full border-2 border-[#ffbb5b]' />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-semibold">Introduction to Basic Science</p>
                                            <p className="textsm"><span className='text-[10px] text-[#006ffd] italic'>with</span> Ana Shobowale</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center p-3 rounded-lg bg-[#f7f7fd]">
                                        <FaStar className='text-[#ffbb5b]' />
                                        3.0
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='w-[5rem] h-[5rem] rounded-full object-cover' />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-semibold">C.R.E</p>
                                            <p className="textsm"><span className='text-[10px] text-[#006ffd] italic'>with</span> Regina Sam</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center p-3 rounded-lg bg-[#f7f7fd]">
                                        <FaStar className='text-[#ffbb5b]' />
                                        3.0
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='w-[5rem] h-[5rem] rounded-full object-cover' />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-semibold">Computer Science</p>
                                            <p className="textsm"><span className='text-[10px] text-[#006ffd] italic'>with</span> Njideka Opal</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center p-3 rounded-lg bg-[#f7f7fd]">
                                        <FaStar className='text-[#ffbb5b]' />
                                        3.0
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='w-[5rem] h-[5rem] rounded-full object-cover' />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-semibold">Mathematics</p>
                                            <p className="textsm"><span className='text-[10px] text-[#006ffd] italic'>with</span> Tariq Sambo</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center p-3 rounded-lg bg-[#f7f7fd]">
                                        <FaStar className='text-[#ffbb5b]' />
                                        3.0
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        } else{
            return <>
                <div className="flex justify-between gap-5 rounded-3xl p-5 bg-[#006838] items-start my-3 relative overflow-hidden">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-2xl font-bold text-white">Upcoming Session</h3>
                        <p className="text-sm font-light text-white">Admission into all Classes</p>
                        <p className="text-sm text-white">Sep 03 - Sep 24</p>
                        <p className="font-bold text-lg text-[#ffbb5b] flex items-center gap-3">Enrol Now <FaPlayCircle /></p>
                    </div>
                    <div className="flex justify-center items-center bg-white rounded-xl overflow-hidden">
                        <Image src={hospitalityLogo} width={1000} height={1000} alt='hospitality logo' className='w-20' />
                    </div>
                    <div className="absolute bg-white/20 w-[40rem] h-[40rem] rounded-full -bottom-[36rem] -right-[20rem]"></div>
                </div>
                <div className="flex flex-col p-4 gap-3 rounded-3xl bg-[#EBEDEB]">
                    <h2 className="font-semibold text-black">Subjects</h2>
                    <div onClick={() => setActiveAccordion('art')} className="flex flex-col gap-3 rounded-xl bg-white p-4 cursor-pointer">
                        <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                            <p className="font-semibold text-black text-sm">Arts</p>
                            <div className="flex gap-3 items-center">
                                <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeAccordion === 'art' ? 'rotate-180' : ''}`} />       
                            </div>
                        </div>
                        <div ref={accordionContentRef0} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
                        style={{
                            height: activeAccordion === 'art' ? `${accordionContentRef0.current?.scrollHeight}px` : '0px'
                        }}>
                            <p className="text-gray-700 text-sm">We provide students with a foundational understanding of the natural world, scientific principles, and critical thinking skills. It's essential for pursuing careers in medicine, engineering, environmental science, and other STEM-related fields.</p>
                            <div className="flex gap-4 flex-col p-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='w-[5rem] h-[5rem] object-cover rounded-full border-2 border-[#ffbb5b]' />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-semibold">Introduction to Physics</p>
                                            <p className="textsm"><span className='text-[10px] text-[#006ffd] italic'>with</span> Ana Shobowale</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center p-3 rounded-lg bg-[#f7f7fd]">
                                        <FaStar className='text-[#ffbb5b]' />
                                        3.0
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='w-[5rem] h-[5rem] rounded-full object-cover' />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-semibold">Biology</p>
                                            <p className="textsm"><span className='text-[10px] text-[#006ffd] italic'>with</span> Regina Sam</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center p-3 rounded-lg bg-[#f7f7fd]">
                                        <FaStar className='text-[#ffbb5b]' />
                                        3.0
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='w-[5rem] h-[5rem] rounded-full object-cover' />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-semibold">Chemistry</p>
                                            <p className="textsm"><span className='text-[10px] text-[#006ffd] italic'>with</span> Njideka Opal</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center p-3 rounded-lg bg-[#f7f7fd]">
                                        <FaStar className='text-[#ffbb5b]' />
                                        3.0
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='w-[5rem] h-[5rem] rounded-full object-cover' />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-semibold">Mathematics</p>
                                            <p className="textsm"><span className='text-[10px] text-[#006ffd] italic'>with</span> Tariq Sambo</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center p-3 rounded-lg bg-[#f7f7fd]">
                                        <FaStar className='text-[#ffbb5b]' />
                                        3.0
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setActiveAccordion('science')} className="flex flex-col gap-3 rounded-xl bg-white p-4 cursor-pointer">
                        <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                            <p className="font-semibold text-black text-sm">Science</p>
                            <div className="flex gap-3 items-center">
                                <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeAccordion === 'science' ? 'rotate-180' : ''}`} />       
                            </div>
                        </div>
                        <div ref={accordionContentRef2} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
                        style={{
                            height: activeAccordion === 'science' ? `${accordionContentRef2.current?.scrollHeight}px` : '0px'
                        }}>
                            <p className="text-gray-700 text-sm">We provide students with a foundational understanding of the natural world, scientific principles, and critical thinking skills. It's essential for pursuing careers in medicine, engineering, environmental science, and other STEM-related fields.</p>
                            <div className="flex gap-4 flex-col p-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='w-[5rem] h-[5rem] object-cover rounded-full border-2 border-[#ffbb5b]' />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-semibold">Introduction to Physics</p>
                                            <p className="textsm"><span className='text-[10px] text-[#006ffd] italic'>with</span> Ana Shobowale</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center p-3 rounded-lg bg-[#f7f7fd]">
                                        <FaStar className='text-[#ffbb5b]' />
                                        3.0
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='w-[5rem] h-[5rem] rounded-full object-cover' />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-semibold">Biology</p>
                                            <p className="textsm"><span className='text-[10px] text-[#006ffd] italic'>with</span> Regina Sam</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center p-3 rounded-lg bg-[#f7f7fd]">
                                        <FaStar className='text-[#ffbb5b]' />
                                        3.0
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='w-[5rem] h-[5rem] rounded-full object-cover' />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-semibold">Chemistry</p>
                                            <p className="textsm"><span className='text-[10px] text-[#006ffd] italic'>with</span> Njideka Opal</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center p-3 rounded-lg bg-[#f7f7fd]">
                                        <FaStar className='text-[#ffbb5b]' />
                                        3.0
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Image src={hospitalityBackground} width={1000} height={1000} alt='hospitality background' className='w-[5rem] h-[5rem] rounded-full object-cover' />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-semibold">Mathematics</p>
                                            <p className="textsm"><span className='text-[10px] text-[#006ffd] italic'>with</span> Tariq Sambo</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center p-3 rounded-lg bg-[#f7f7fd]">
                                        <FaStar className='text-[#ffbb5b]' />
                                        3.0
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }
    }
  return (
    <div className='mb-40'>
        <div className="flex w-full">
            <div onClick={() => setActiveTab('junior')} className={`flex justify-center items-center flex-grow cursor-pointer py-3 ${activeTab === 'junior' ? 'border-b-2 border-[#006838]' : 'border-b'} font-light`}>JUNIOR</div>
            <div onClick={() => setActiveTab('senior')} className={`flex justify-center items-center flex-grow cursor-pointer py-3 ${activeTab === 'senior' ? 'border-b-2 border-[#006838]' : 'border-b'} font-light`}>SENIOR</div>
        </div>
        {displayContent()}
    </div>
  )
}

export default EducationStudy
