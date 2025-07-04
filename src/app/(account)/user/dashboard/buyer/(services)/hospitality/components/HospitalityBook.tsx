'use client'
import { input } from 'framer-motion/client'
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown, FaDownload, FaSort, FaStar } from 'react-icons/fa'

const HospitalityBook = () => {
  const [active, setActive] = useState('info')
  const [activeAmount, setActiveAmount] = useState('elite')
  const [count, setCount] = useState(0)
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState('year');
  const [monthDropdown, setMonthDropdown] = useState();
  const [number, setNumber] = useState<number[]>([]);
  const [activeButton, setActiveButton] = useState(true);
  const activeContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
      const days = [];
      for (let index = 0; index < 31; index++) {
          days.push(index + 1)
      }
      setNumber(days)
  }, [])

  const activeData = () => {
    if(active === 'info') {
      return <div className='flex flex-col gap-3 h-screen'>
        <label htmlFor="first-name w-full py-3 px-5">
          <input type="text" name="first-name" id="first-name" placeholder='First Name' className='outline-[0.05px] outline-[#ebedeb] focus:outline-2 focus:outline-[#006838] outline-none rounded-xl w-full py-3 px-5' />
        </label>
        <label htmlFor="last-name w-full py-3 px-5">
          <input type="text" name="last-name" id="last-name" placeholder='Last Name' className='outline-[0.05px] outline-[#ebedeb] focus:outline-2 focus:outline-[#006838] outline-none rounded-xl w-full py-3 px-5' />
        </label>
        <div className="flex flex-col gap-3 my-3">
          <p className="font-semibold text-sm text-black">Previous Identification (NIN)</p>
          <label htmlFor="pdf" className='flex items-center gap-3'>
            <button onClick={() => inputFileRef.current?.click()} className='py-2 px-5 text-white text-sm bg-[#006838] rounded-xl'>UPLOAD PDF</button>
            <FaDownload className='opacity-50' />
            <input ref={inputFileRef} type="file" name="pdf" id="pdf" className='hidden' />
          </label>
        </div>
      </div>
    } else if(active === 'select') {
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
              <p className="font-extrabold">Elite Luxury</p>
              <p className="text-sm font-light text-[#006838]">Our comprehensive package</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <h3 className="font-bold md:text-xl">N 170,000.00</h3>
            <p className="text-sm font-light">/Night</p>
          </div>
        </div>
        <div onClick={() => setActiveAmount('premiere')} className={`flex cursor-pointer justify-between md:py-4 py-3 px-5 rounded-2xl items-center ${activeAmount === 'premiere' ? 'bg-[#00683736]' : 'border'}`}>
          <div className="flex gap-3 items-center">
            <div className={`flex justify-center items-center rounded-full w-5 h-5 ${activeAmount === 'premiere' ? 'bg-[#006838]' : 'border'}`}>
              <div className={`rounded-full bg-full bg-white w-2 h-2 ${activeAmount === 'premiere' ? 'block' : 'hidden'}`}></div>
            </div>
            <div className="flex flex-col gap-2 ">
              <p className="font-extrabold">Premiere</p>
              <p className="text-sm font-light text-[#006838]">Luxury Suites</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <h3 className="font-bold md:text-xl">N 105,000.00</h3>
            <p className="text-sm font-light">/Night</p>
          </div>
        </div>
        <div onClick={() => setActiveAmount('regular')} className={`flex cursor-pointer justify-between md:py-4 py-3 px-5 rounded-2xl items-center ${activeAmount === 'regular' ? 'bg-[#00683736]' : 'border'}`}>
          <div className="flex gap-3 items-center">
            <div className={`flex justify-center items-center rounded-full w-5 h-5 ${activeAmount === 'regular' ? 'bg-[#006838]' : 'border'}`}>
              <div className={`rounded-full bg-full bg-white w-2 h-2 ${activeAmount === 'regular' ? 'block' : 'hidden'}`}></div>
            </div>
            <div className="flex flex-col gap-2 ">
              <p className="font-extrabold">Regular</p>
              <p className="text-sm font-light text-[#006838]">Suites + Breakfast</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <h3 className="font-bold md:text-xl">N 40,000.00</h3>
            <p className="text-sm font-light">/Night</p>
          </div>
        </div>
        <div className="flex flex-col p-5 rounded-3xl gap-4 bg-[#00683736]">
          <h3 className="font-bold text-xl">You'll get:</h3>
          <div className="flex items-center gap-2">
            <FaStar className='text-[#ffd33c]' />
            <p className="text-sm">Luxurious bathroom with premium toiletries, rain showers, and jacuzzi or soaking tub.</p>
          </div>
          <div className="flex items-center gap-2">
            <FaStar className='text-[#ffd33c]' />
            <p className="text-sm">Personalized services such as a dedicated concierge, room service, or private butler.</p>
          </div>
          <div className="flex items-center gap-2">
            <FaStar className='text-[#ffd33c]' />
            <p className="text-sm">High-speed Wi-Fi, large flat-screen TV, and entertainment system for leisure.</p>
          </div>
        </div>
      </div>
    } else{
      return <div className={`h-screen ${activeButton ? 'md:mb-[100%] mb-[160%]' : 'md:mb-40 mb-52'}`}>
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
              <div onClick={() => setActiveButton(!activeButton)} className="flex flex-col md:p-5 p-5 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer">
                <div className="bg-white md:py-5 py-2 px-3 rounded-xl">
                  <div className="flex justify-between items-center pb-5">
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
                      <div className="flex justify-between items-end">
                        <div className="flex gap-3 items-center">
                          <div className="w-7 h-7 rounded-full text-sm bg-[#ebedeb] flex justify-center items-center text-gray-500">1</div>
                          <div className="flex flex-col gap-3">
                              <p className="text-gray-300 text-sm">Morning</p>
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
                              <p className="text-gray-300 text-sm">Afternoon</p>
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
                              <p className="text-gray-300 text-sm">Evening</p>
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
    <div className='flex flex-col gap-5 md:p-0 p-2'>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3 items-center">
            <div onClick={() => setActive('info')} className={`flex justify-center items-center text-white text-sm rounded-full w-8 h-8 ${active === 'info' ? 'bg-[#006838]' : 'bg-[#00683736]'}`}>1</div>
            <p className="font-bold">Your Info</p>
        </div>
        <div className="flex flex-col gap-3 items-center">
            <div onClick={() => setActive('select')} className={`flex justify-center items-center text-white text-sm rounded-full w-8 h-8 ${active === 'select' ? 'bg-[#006838]' : 'bg-[#00683736]'}`}>2</div>
            <p className="font-bold">Select</p>
        </div>
        <div className="flex flex-col gap-3 items-center">
            <div onClick={() => setActive('check')} className={`flex justify-center items-center text-white text-sm rounded-full w-8 h-8 ${active === 'check' ? 'bg-[#006838]' : 'bg-[#00683736]'}`}>3</div>
            <p className="font-bold">Check-in</p>
        </div>
      </div>
      {activeData()}
    </div>
  )
}

export default HospitalityBook
