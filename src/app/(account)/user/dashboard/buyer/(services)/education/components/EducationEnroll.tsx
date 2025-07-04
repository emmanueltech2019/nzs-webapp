'use client'
import { input } from 'framer-motion/client'
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown, FaDownload, FaSearch, FaSort, FaStar } from 'react-icons/fa'

const EducationEnroll = () => {
  const [active, setActive] = useState('student')
  const [activeAmount, setActiveAmount] = useState('elite')
  const [count, setCount] = useState(0)
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState('year');
  const [monthDropdown, setMonthDropdown] = useState();
  const [number, setNumber] = useState<number[]>([]);
  const [activeButton, setActiveButton] = useState(true);
  const activeContainerRef = useRef<HTMLDivElement>(null)
  const activeContainerRef0 = useRef<HTMLDivElement>(null)
  const activeContainerRef1 = useRef<HTMLDivElement>(null)
  const [activeSession, setActiveSession] = useState('senior');
  const [radiusButton, setRadiusButton] = useState('visits')
  const [activeButton1, setActiveButton1] = useState('visit');
      const [readMore, setReadMore] = useState(false)
  const fullText = "Physically visit the lawyer's office, practice, or firm, sit face-to-face with the lawyer";
  const displayFullText = readMore ? fullText : fullText.slice(0, 50)

  useEffect(() => {
      const days = [];
      for (let index = 0; index < 31; index++) {
          days.push(index + 1)
      }
      setNumber(days)
  }, [])

  useEffect(() => {
    if(active === 'parent') {
        setActiveSession('umuahia');
    } else{
        setActiveSession('senior')
    }
  }, [active])

  const activeData = () => {
    if(active === 'student') {
      return <div className='flex flex-col gap-3 h-screen'>
        <label htmlFor="first-name">
          <input type="text" name="first-name" id="first-name" placeholder='First Name' className='outline-[0.05px] outline-[#ebedeb] focus:outline-2 focus:outline-[#006838] outline-none rounded-xl w-full py-3 px-5' />
        </label>
        <label htmlFor="last-name">
          <input type="text" name="last-name" id="last-name" placeholder='Last Name' className='outline-[0.05px] outline-[#ebedeb] focus:outline-2 focus:outline-[#006838] outline-none rounded-xl w-full py-3 px-5' />
        </label>
        <label htmlFor="date">
            <p className="font-bold">Date of Birth</p>
          <input type="date" name="date" id="date" className='outline-[0.05px] outline-[#ebedeb] focus:outline-2 focus:outline-[#006838] outline-none placeholder:text-[#ebedeb] rounded-xl w-full py-3 px-5' />
        </label>
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <p className="font-light text-lg">Section</p>
                <p className="font-light text-gray-500">List of Available classes</p>
            </div>
            <div className="flex justify-center items-center text-white w-10 h-10 bg-[#006838] rounded-full">9</div>
        </div>
        <div className="flex flex-wrap gap-3 my-2">
            <div onClick={() => setActiveSession('senior')} className={`py-1 px-3 rounded-2xl ${activeSession === 'senior' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>SENIOR SECONDARY</div>
            <div onClick={() => setActiveSession('primary')} className={`py-1 px-3 rounded-2xl ${activeSession === 'primary' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>PRIMARY</div>
            <div onClick={() => setActiveSession('junior')} className={`py-1 px-3 rounded-2xl ${activeSession === 'junior' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>JUNIOR</div>
            <div onClick={() => setActiveSession('nusery')} className={`py-1 px-3 rounded-2xl ${activeSession === 'nusery' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>NUSERY</div>
            <div onClick={() => setActiveSession('creche')} className={`py-1 px-3 rounded-2xl ${activeSession === 'creche' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>CRECHE</div>
            <div onClick={() => setActiveSession('delta')} className={`py-1 px-3 rounded-2xl ${activeSession === 'delta' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>DELTA</div>
            <div onClick={() => setActiveSession('ebonyi')} className={`py-1 px-3 rounded-2xl ${activeSession === 'ebonyi' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>EBONYI</div>
            <div onClick={() => setActiveSession('plateau')} className={`py-1 px-3 rounded-2xl ${activeSession === 'plateau' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>PLATEAU</div>
            <div onClick={() => setActiveSession('niger')} className={`py-1 px-3 rounded-2xl ${activeSession === 'niger' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>NIGER</div>
            <div onClick={() => setActiveSession('kogi')} className={`py-1 px-3 rounded-2xl ${activeSession === 'kogi' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>KOGI</div>
        </div>
        <div className="flex flex-col gap-2">
            <p className="font-bold">Class</p>
            <label htmlFor="class">
                <select name="class" id="class" className='w-full border px-5 py-3 rounded-xl outline-none'>
                    <option value="SS1">SS1</option>
                    <option value="SS2">SS2</option>
                    <option value="SS3">SS3</option>
                </select>
            </label>
        </div>
        <div className="flex flex-col gap-3 my-3">
          <p className="font-semibold text-sm text-black">Previous Result</p>
          <label htmlFor="pdf" className='flex items-center gap-3'>
            <button onClick={() => inputFileRef.current?.click()} className='py-2 px-5 text-white text-sm bg-[#006838] rounded-xl'>UPLOAD PDF</button>
            <FaDownload className='opacity-50' />
            <input ref={inputFileRef} type="file" name="pdf" id="pdf" className='hidden' />
          </label>
        </div>
      </div>
    } else if(active === 'parent') {
       return <div className='flex flex-col gap-3 h-screen'>
        <label htmlFor="first-name">
          <input type="text" name="first-name" id="first-name" placeholder='First Name' className='outline-[0.05px] outline-[#ebedeb] focus:outline-2 focus:outline-[#006838] outline-none rounded-xl w-full py-3 px-5' />
        </label>
        <label htmlFor="last-name">
          <input type="text" name="last-name" id="last-name" placeholder='Last Name' className='outline-[0.05px] outline-[#ebedeb] focus:outline-2 focus:outline-[#006838] outline-none rounded-xl w-full py-3 px-5' />
        </label>
        <label htmlFor="tel">
            <p className="font-bold mb-3">Phone Number</p>
          <input placeholder='+234 XXX XXXX XXX' type="tel" name="tel" id="tel" className='outline-[0.05px] outline-[#ebedeb] focus:outline-2 focus:outline-[#006838] outline-none rounded-xl w-full py-3 px-5' />
        </label>
        <label htmlFor="email">
            <p className="font-bold mb-3">Email Address</p>
          <input placeholder='name@gmail.com' type="email" name="email" id="email" className='outline-[0.05px] outline-[#ebedeb] focus:outline-2 focus:outline-[#006838] outline-none rounded-xl w-full py-3 px-5' />
        </label>
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <p className="font-light text-lg">State</p>
                <p className="font-light text-gray-500">Available in Nigeria</p>
            </div>
            <div className="flex justify-center items-center text-white w-10 h-10 bg-[#006838] rounded-full">9</div>
        </div>
        <div className="flex flex-wrap gap-3 my-2">
            <div onClick={() => setActiveSession('umuahia')} className={`py-1 px-3 rounded-2xl ${activeSession === 'umuahia' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>UMUAHIA</div>
            <div onClick={() => setActiveSession('jo')} className={`py-1 px-3 rounded-2xl ${activeSession === 'jo' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>JO</div>
            <div onClick={() => setActiveSession('AKWA-IBOM')} className={`py-1 px-3 rounded-2xl ${activeSession === 'AKWA-IBOM' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>AKWA-IBOM</div>
            <div onClick={() => setActiveSession('anambra')} className={`py-1 px-3 rounded-2xl ${activeSession === 'anambra' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>ANAMBRA</div>
            <div onClick={() => setActiveSession('bauchi')} className={`py-1 px-3 rounded-2xl ${activeSession === 'bauchi' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>BAUCHI</div>
            <div onClick={() => setActiveSession('bayelsa')} className={`py-1 px-3 rounded-2xl ${activeSession === 'bayelsa' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>BAYELSA</div>
            <div onClick={() => setActiveSession('delta')} className={`py-1 px-3 rounded-2xl ${activeSession === 'delta' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>DELTA</div>
            <div onClick={() => setActiveSession('ebonyi')} className={`py-1 px-3 rounded-2xl ${activeSession === 'ebonyi' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>EBONYI</div>
            <div onClick={() => setActiveSession('niger')} className={`py-1 px-3 rounded-2xl ${activeSession === 'niger' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>NIGER</div>
            <div onClick={() => setActiveSession('kogi')} className={`py-1 px-3 rounded-2xl ${activeSession === 'kogi' ? 'bg-[#006838] text-white' : 'bg-[#00683736] text-[#006838]'} cursor-pointer text-sm`}>KOGI</div>
        </div>
        <div className="flex flex-col gap-5 mt-3">
            <div className="flex flex-col gap-2">
                <p className="font-light">City</p>
                <div className="text-sm text-gray-500 font-light">Available in Nigeria</div>
            </div>
        </div>
        <div className="flex flex-coll p-4 rounded-3xl bg-[#ebedeb]">
            <div className="flex justify-between w-full">
                <label htmlFor="search" className='relative w-full'>
                    <FaSearch className='absolute top-1/2 -translate-y-1/2 left-5' />
                    <input type="search" name="search" id="search" className='py-3 outline-none bg-[#f7f7fd] px-10 w-full rounded-3xl' placeholder='Street Info' />
                    <FaChevronDown className='absolute top-1/2 -translate-y-1/2 right-5' />
                </label>
            </div>
        </div>
        <div className="flex flex-col gap-3 my-3">
          <p className="font-semibold text-sm text-black">Previous Result</p>
          <label htmlFor="pdf" className='flex items-center gap-3'>
            <button onClick={() => inputFileRef.current?.click()} className='py-2 px-5 text-white text-sm bg-[#006838] rounded-xl'>UPLOAD PDF</button>
            <FaDownload className='opacity-50' />
            <input ref={inputFileRef} type="file" name="pdf" id="pdf" className='hidden' />
          </label>
        </div>
      </div>
    } else if(active === 'enroll') {
        return <div className="flex flex-col gap-5 h-screen overflow-y-auto mb-52">
                <div className="flex justify-between items-center">
                  <div className="flex p-3 rounded-xl border items-center gap-2">
                    <FaSort className='text-gray-400' />
                    <p className="font-light text-black text-sm">Full Payment</p>
                    <FaChevronDown className='text-gray-400' />
                  </div>
                  <div className="flex gap-3 items-center">
                    <p className="font-light text-black">Duration</p>
                    <div className="flex gap-2 items-center">
                      <div onClick={() => {
                        if(count <= 0) {
                          return setCount(0)
                        } else{
                          setCount(count - 1)
                        }
                      }} className="flex justify-center cursor-pointer items-center bg-[#00683736] w-7 h-7 rounded-full text-lg">-</div>
                      <p className="font-light">{count}</p>
                      <div onClick={() => setCount(count + 1)} className="flex justify-center cursor-pointer items-center bg-[#00683736] w-7 h-7 rounded-full text-lg">+</div>
                    </div>
                  </div>
                </div>
                <div onClick={() => setActiveAmount('elite')} className={`flex cursor-pointer justify-between md:py-4 py-3 px-5 rounded-2xl items-center ${activeAmount === 'elite' ? 'bg-[#00683736]' : 'border'}`}>
                  <div className="flex gap-3 items-center">
                    <div className={`flex justify-center items-center rounded-full w-5 h-5 ${activeAmount === 'elite' ? 'bg-[#006838]' : 'border'}`}>
                      <div className={`rounded-full bg-full bg-white w-2 h-2 ${activeAmount === 'elite' ? 'block' : 'hidden'}`}></div>
                    </div>
                    <div className="flex flex-col gap-2 ">
                      <p className="font-extrabold">Day Learning</p>
                      <p className="text-sm font-light text-[#006838]">Regular with no accomodation</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <h3 className="font-bold md:text-xl">N 180,000.00</h3>
                    <p className="text-sm font-light">/Child</p>
                  </div>
                </div>
                <div onClick={() => setActiveAmount('premiere')} className={`flex cursor-pointer justify-between md:py-4 py-3 px-5 rounded-2xl items-center ${activeAmount === 'premiere' ? 'bg-[#00683736]' : 'border'}`}>
                  <div className="flex gap-3 items-center">
                    <div className={`flex justify-center items-center rounded-full w-5 h-5 ${activeAmount === 'premiere' ? 'bg-[#006838]' : 'border'}`}>
                      <div className={`rounded-full bg-full bg-white w-2 h-2 ${activeAmount === 'premiere' ? 'block' : 'hidden'}`}></div>
                    </div>
                    <div className="flex flex-col gap-2 ">
                      <p className="font-extrabold">Boarding</p>
                      <p className="text-sm font-light text-[#006838]">Full use of Accomodation</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <h3 className="font-bold md:text-xl">N 105,000.00</h3>
                    <p className="text-sm font-light">/Child</p>
                  </div>
                </div>
                <div onClick={() => setActiveAmount('regular')} className={`flex cursor-pointer justify-between md:py-4 py-3 px-5 rounded-2xl items-center ${activeAmount === 'regular' ? 'bg-[#00683736]' : 'border'}`}>
                  <div className="flex gap-3 items-center">
                    <div className={`flex justify-center items-center rounded-full w-5 h-5 ${activeAmount === 'regular' ? 'bg-[#006838]' : 'border'}`}>
                      <div className={`rounded-full bg-full bg-white w-2 h-2 ${activeAmount === 'regular' ? 'block' : 'hidden'}`}></div>
                    </div>
                    <div className="flex flex-col gap-2 ">
                      <p className="font-extrabold">Special Needs</p>
                      <p className="text-sm font-light text-[#006838]">Accomodation + Special Needs</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <h3 className="font-bold md:text-xl">N 600,000.00</h3>
                    <p className="text-sm font-light">/Child</p>
                  </div>
                </div>
                <div className="flex flex-col p-5 rounded-3xl gap-4 bg-[#00683736]">
                  <h3 className="font-bold text-xl">You'll get:</h3>
                  <div className="flex items-center gap-2">
                    <FaStar className='text-[#ffd33c]' />
                    <p className="text-sm">(STEM) with hands on learnig through robotics, coding, and innovation labs.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className='text-[#ffd33c]' />
                    <p className="text-sm">Leadership training, public speaking, and character development workshops designed to build confidence, integrity, and social responsibility in students.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className='text-[#ffd33c]' />
                    <p className="text-sm">Customized learning plans toilered to each student's strengths, weaknesses</p>
                  </div>
                </div>
              </div>
    } else {
        return <div className={`h-screen ${activeButton ? 'md:mb-[100%] mb-[160%]' : 'md:mb-10 mb-20'}`}>
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
                <div className="flex flex-col md:p-5 p-5 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer">
                    <div onClick={() => setActiveButton1('visit')} className="bg-white md:py-5 py-2 px-3 rounded-xl">
                        <div className="flex justify-between items-center pb-5">
                            <div className="flex items-center gap-2">
                                <div onClick={() => setRadiusButton('visits')} className={`w-6 h-6 flex justify-center items-center rounded-full ${radiusButton === 'visits' ? 'bg-[#006838]' : 'border'}`}>
                                    <div className={`w-2 h-2 rounded-full bg-white ${radiusButton === 'visits' ? 'block' : 'hidden'}`}></div>
                                </div>
                                <p className="font-semibold text-black text-sm">Visits</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeButton1 === 'visits' ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Available</div> 
                                <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeButton1 === 'visits' ? 'rotate-180' : ''}`} />       
                            </div>
                        </div>
                        <div ref={activeContainerRef0} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
                        style={{
                            height: activeButton1 === 'visits' ? `${activeContainerRef0.current?.scrollHeight}px` : '0px'
                        }}>
                            <p className='text-sm text-gray-500'>{displayFullText}<span>{readMore ? '' : '...'}</span></p>
                            <p onClick={() => setReadMore(!readMore)} className="italic text-sm cursor-pointer text-[#009cde]">{readMore ? 'Read less...' : 'Read more...'}</p>
                            <div className="flex justify-between items-end">
                            <div className="flex gap-3 items-center">
                                <div className="w-7 h-7 rounded-full text-sm bg-[#ebedeb] flex justify-center items-center text-gray-500">1</div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm">Morning</p>
                                    <p className="text-black text-md font-light">30 mins</p>
                                </div>
                            </div>
                                <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                    <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                        8:00 AM - 11:00 AM
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                            <div className="flex gap-3 items-center">
                                <div className="w-7 h-7 rounded-full text-sm bg-[#ebedeb] flex justify-center items-center text-gray-500">2</div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm">Afternoon</p>
                                    <p className="text-black text-md font-light">30 mins</p>
                                </div>
                            </div>
                                <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                    <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                        1:00 PM - 4:00 PM
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                            <div className="flex gap-3 items-center">
                                <div className="w-7 h-7 rounded-full text-sm bg-[#ebedeb] flex justify-center items-center text-gray-500">3</div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm">Evening</p>
                                    <p className="text-black text-md font-light">30 mins</p>
                                </div>
                            </div>
                                <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                    <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                        6:00 PM - 8:00 PM
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end w-full my-5">
                            <button className='bg-[#006838] text-white py-2 px-5 rounded-lg text-sm'>BOOK THIS</button>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setActiveButton1('calls')} className="bg-white md:py-5 py-2 px-3 rounded-xl">
                        <div className="flex justify-between items-center pb-5">
                            <div className="flex items-center gap-2">
                                <div onClick={() => setRadiusButton('calls')} className={`w-6 h-6 flex justify-center items-center rounded-full ${radiusButton === 'calls' ? 'bg-[#006838]' : 'border'}`}>
                                    <div className={`w-2 h-2 rounded-full bg-white ${radiusButton === 'calls' ? 'block' : 'hidden'}`}></div>
                                </div>
                                <p className="font-semibold text-black text-sm">Calls</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeButton1 === 'calls' ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Available</div> 
                                <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeButton1 === 'calls' ? 'rotate-180' : ''}`} />       
                            </div>
                        </div>
                        <div ref={activeContainerRef1} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
                        style={{
                            height: activeButton1 === 'calls' ? `${activeContainerRef1.current?.scrollHeight}px` : '0px'
                        }}>
                            <p className='text-sm text-gray-500'>{displayFullText}<span>{readMore ? '' : '...'}</span></p>
                            <p onClick={() => setReadMore(!readMore)} className="italic text-sm cursor-pointer text-[#009cde]">{readMore ? 'Read less...' : 'Read more...'}</p>
                            <div className="flex justify-between items-end">
                            <div className="flex gap-3 items-center">
                                <div className="w-7 h-7 rounded-full text-sm bg-[#ebedeb] flex justify-center items-center text-gray-500">1</div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm">Morning</p>
                                    <p className="text-black text-md font-light">30 mins</p>
                                </div>
                            </div>
                                <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                    <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                        8:00 AM - 11:00 AM
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                            <div className="flex gap-3 items-center">
                                <div className="w-7 h-7 rounded-full text-sm bg-[#ebedeb] flex justify-center items-center text-gray-500">2</div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm">Afternoon</p>
                                    <p className="text-black text-md font-light">30 mins</p>
                                </div>
                            </div>
                                <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                    <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                        1:00 PM - 4:00 PM
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                            <div className="flex gap-3 items-center">
                                <div className="w-7 h-7 rounded-full text-sm bg-[#ebedeb] flex justify-center items-center text-gray-500">3</div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm">Evening</p>
                                    <p className="text-black text-md font-light">30 mins</p>
                                </div>
                            </div>
                                <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                                    <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                                        6:00 PM - 8:00 PM
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end w-full my-5">
                            <button className='bg-[#006838] text-white py-2 px-5 rounded-lg text-sm'>BOOK THIS</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
  }

  return (
    <div className='flex flex-col gap-5 md:p-0 p-2 mb-40'>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3 items-center">
            <div onClick={() => setActive('student')} className={`flex justify-center items-center text-white text-sm rounded-full w-8 h-8 ${active === 'student' ? 'bg-[#006838]' : 'bg-[#00683736]'}`}>1</div>
            <p className="font-bold">Student Info</p>
        </div>
        <div className="flex flex-col gap-3 items-center">
            <div onClick={() => setActive('parent')} className={`flex justify-center items-center text-white text-sm rounded-full w-8 h-8 ${active === 'parent' ? 'bg-[#006838]' : 'bg-[#00683736]'}`}>2</div>
            <p className="font-bold">Parent Info</p>
        </div>
        <div className="flex flex-col gap-3 items-center">
            <div onClick={() => setActive('enroll')} className={`flex justify-center items-center text-white text-sm rounded-full w-8 h-8 ${active === 'enroll' ? 'bg-[#006838]' : 'bg-[#00683736]'}`}>3</div>
            <p className="font-bold">Enroll</p>
        </div>
        <div className="flex flex-col gap-3 items-center">
            <div onClick={() => setActive('book')} className={`flex justify-center items-center text-white text-sm rounded-full w-8 h-8 ${active === 'book' ? 'bg-[#006838]' : 'bg-[#00683736]'}`}>4</div>
            <p className="font-bold">Book</p>
        </div>
      </div>
      {activeData()}
    </div>
  )
}

export default EducationEnroll
