'use client'
import React, { FC, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import biochemist from '@/assets/images/biochemist.jpg'
import { Box, CircularProgress } from '@mui/material'
import { FaArrowRight } from 'react-icons/fa'

interface EducationFacilitiesProp {
  activeSelection: string,
  setActiveSelection: (selectionId: string) => void
  activeRoute: string,
  setActiveRoute: (routeId: string) => void,
  addProduct: boolean,
  setAddProduct: (productId: boolean) => void,
}

const EducationFacilities: FC<EducationFacilitiesProp> = ({activeSelection, setActiveSelection, addProduct, setAddProduct, activeRoute, setActiveRoute}) => {
  const [activeSelectionToggle, setActiveSelectionToggle] = useState('cardiology');
  const cardiologyRef = useRef<HTMLDivElement>(null)
  return (
    <div className='my-5'>
      {addProduct ? (
        <div>
            <div className="flex justify-between items-start">
                <div className={`flex flex-col gap-2 items-center rounded-full ${activeRoute === 'facility' ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center md:text-md text-[12px] ${activeRoute === 'facility' ? 'bg-[#006838] text-white' : 'bg-[#e6dae5]'}`}>1</div>
                    <p className="text-center font-bold md:text-sm text-[12px]">Facility <br /> Info </p>
                </div>
                <div className={`flex flex-col gap-2 items-center rounded-full ${activeRoute === 'add-media' ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center md:text-md text-[12px] ${activeRoute === 'add-media' ? 'bg-[#006838] text-white' : 'bg-[#e6dae5]'}`}>2</div>
                    <p className="text-center font-bold md:text-sm text-[12px]">Add Media</p>
                </div>
                <div className={`flex flex-col gap-2 items-center rounded-full ${activeRoute === 'preview' ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`md:w-8 md:h-8 w-6 h-6 rounded-full flex justify-center items-center md:text-md text-[12px] ${activeRoute === 'preview' ? 'bg-[#006838] text-white' : 'bg-[#e6dae5]'}`}>3</div>
                    <p className="text-center font-bold md:text-sm text-[12px]">Preview</p>
                </div>
            </div>
            {activeRoute === 'facility' && (
                <div className='flex flex-col gap-5 my-5'>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="title">
                            <input type="text" name="title" id="title" placeholder='Title' className='border rounded-xl p-4 w-full' />
                        </label>
                        <label htmlFor="describe">
                            <input type="text" name="describe" id="describe" placeholder='Briefly Describe' className='border rounded-xl p-4 w-full' />
                        </label>
                        <p className='text-[12px] text-[#e6dae5]'>0/30</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-3">
                            <p className="font-light">Category</p>
                            <p className="text-sm text-[#e6dae5]">Select up to</p>
                        </div>
                        <div className="w-8 h-8 items-center justify-center flex bg-[#006838] text-white rounded-full">11</div>
                    </div>
                    <div className="flex items-center flex-wrap gap-3 my-5">
                        <div onClick={() => setActiveSelection('CAFETERIA')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'CAFETERIA' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        CAFETERIA
                        </div>
                        <div onClick={() => setActiveSelection('LABORATORY')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'LABORATORY' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        LABORATORY
                        </div>
                        <div onClick={() => setActiveSelection('CLASSROOM')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'CLASSROOM' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        CLASSROOM
                        </div>
                        <div onClick={() => setActiveSelection('LIBRARY AND RESOURCE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'LIBRARY AND RESOURCE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        LIBRARY AND RESOURCE
                        </div>
                        <div onClick={() => setActiveSelection('SPORTS AND RECREATIONAL')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'SPORTS AND RECREATIONAL' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        SPORTS AND RECREATIONAL
                        </div>
                        <div onClick={() => setActiveSelection('OFFICE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'OFFICE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        OFFICE
                        </div>
                        <div onClick={() => setActiveSelection('OTHER')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'OTHER' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
                        OTHER
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 border p-3 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center w-6 h-6 bg-[#006838] rounded-full">
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                            </div>
                            <p className="font-semibold text-gray-500">Maximum Capacity</p>
                        </div>
                        <label htmlFor="cost">
                            <input type="text" name="cost" id="cost" placeholder='40' className='border rounded-xl p-4 w-full' />
                        </label>
                        <p className='text-[12px] text-[#e6dae5]'>Students</p>
                    </div>
                </div>
            )}
            {activeRoute === 'add-media' && (
                <div className='flex flex-col gap-5 my-5 items-end'>
                  <div className="w-full rounded-3xl h-[30rem] bg-[#eaf2ff] flex justify-center items-center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                      <CircularProgress size={60} sx={{ color: '#006838' }} variant="determinate" value={25} />
                      <FaArrowRight className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[#006838]" />
                    </Box>
                  </div>
                  <button className='rounded-xl py-2 px-5 text-white bg-[#006838]'>UPLOAD PHOTO</button>
                </div>
            )}
            {activeRoute === 'preview' && (
                <>
                    <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer my-5">
                          <div className="flex gap-3 overflow-x-auto">
                              <Image src={biochemist} width={1000} height={1000} alt='biochemist' className='w-[80%] rounded-xl' />
                              <Image src={biochemist} width={1000} height={1000} alt='biochemist' className='w-[80%] rounded-xl' />
                          </div>
                          <div className="flex flex-col gap-3">
                              <div className={`flex justify-between items-center`}>
                                  <h5 className="font-bold text-xl">FACILITY NAME</h5>
                                  <div className="flex items-center gap-2">
                                    <div className="py-1 px-2 rounded-lg bg-[#eaf2ff]"></div>
                                    <Icon icon={`mdi:chevron-down`} />
                                  </div>
                              </div>
                              <hr />
                              <div className="flex justify-between items-center gap-3">
                                  <div className="flex flex-col gap-2 items-start">
                                      <p className='text-[12px] text-[#e6dae5]'>Category</p>
                                      <p className='text-sm'>Bed and Boarding</p>
                                  </div>
                                  <div className="flex flex-col gap-2 items-start w-[200px]">
                                      <p className='text-[12px] text-[#e6dae5]'>Added</p>
                                      <p className='text-sm'>September 30, 2024</p>
                                  </div>
                              </div>
                              <div className="flex justify-between items-start gap-3">
                                  <div className="flex flex-col gap-2 items-start">
                                      <p className='text-[12px] text-[#e6dae5]'>Description</p>
                                      <p className='text-[12px] text-[#d1c9d0]'>Established with a vision to nurture future leaders, the school offers a comprehensive curriculum that combines academic excellence, extracurricular activities, and character building...</p>
                                  </div>
                                  <div className="flex flex-col gap-2 items-start w-[200px] flex-shrink-0">
                                      <p className='text-[12px] text-[#e6dae5]'>Service Category</p>
                                      <p className='text-sm'>School & Learning Centre</p>
                                  </div>
                              </div>
                              <div className="flex justify-between items-start gap-3">
                                  <div className="flex flex-col gap-2 items-start">
                                      <p className='text-[12px] text-[#e6dae5]'>Capacity</p>
                                  </div>
                                  <div className="flex flex-col gap-2 items-start w-[200px]">
                                      <div className='bg-[#e6dae5] py-1 px-3 rounded-3xl'>
                                          <p className='text-sm'>40 Persons</p>
                                      </div>
                                  </div>
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
            <div className="flex flex-col">
                <p>Your Providers</p>
                <p className='text-sm text-[#d6dae5]'>List of Available Sections</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#006838] text-white flex justify-center items-center">9</div>
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <div onClick={() => setActiveSelection('SENIOR SECONDARY')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'SENIOR SECONDARY' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
              SENIOR SECONDARY
            </div>
            <div onClick={() => setActiveSelection('PRIMARY')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'PRIMARY' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
              PRIMARY
            </div>
            <div onClick={() => setActiveSelection('JUNIOR')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'JUNIOR' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
              JUNIOR
            </div>
            <div onClick={() => setActiveSelection('NURSERY')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'NURSERY' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
              NURSERY
            </div>
            <div onClick={() => setActiveSelection('CRECHE')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'CRECHE' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
              CRECHE
            </div>
            <div onClick={() => setActiveSelection('PREP SCHOOOL')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'PREP SCHOOOL' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
              PREP SCHOOOL
            </div>
            <div onClick={() => setActiveSelection('TUTOR')} className={`flex justify-center items-center px-3 py-1 rounded-lg cursor-pointer ${activeSelection === 'TUTOR' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} md:text-md text-[12px]`}>
              TUTOR
            </div>
          </div>
          <div className="flex flex-col gap-5 my-5">
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
              <div onClick={() => setActiveSelectionToggle('cardiology')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                  </div>
                  <p className='md:text-md text-[10px]'>Music (Optional)</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                  <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT FACILITY</div>
                  <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
              </div>
              <div ref={cardiologyRef} className={`flex flex-col flex-shrink-0 overflow-hidden transition-all duration-200 ease-in-out gap-5 rounded-lg ${activeSelectionToggle === 'cardiology' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'cardiology' ? `400px` : '0px'
              }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>Take a look at our infrastructure, including technology-equipped classrooms and learning environments.</p>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <p className="text-[##d6dae5] md:text-sm text-[12px]">Capacity</p>
                        <p>40 persons</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="rounded-2xl py-1 px-5 border-[#006838] border text-[#006838] md:text-md text-[12px]">8:00 AM - 11:00 AM</div>
                        <p>September 30, 2024</p>
                    </div>
                </div>
                <div className="flex gap-3 flex-shrink-0 overflow-x-auto">
                    <div className="relative w-[80%] flex-shrink-0">
                        <Image src={biochemist} width={1000} height={1000} alt='biochemist' className='w-[100%] h-full object-cover rounded-xl flex-shrink-0' />
                        <div className="absolute top-5 rounded-lg py-1 px-3 right-5 bg-[#f8f9fe]">
                            Fully Equipped
                        </div>
                    </div>
                    <div className="relative w-[80%] flex-shrink-0">
                        <Image src={biochemist} width={1000} height={1000} alt='biochemist' className='w-[100%] h-full object-cover rounded-xl flex-shrink-0' />
                        <div className="absolute top-5 rounded-lg py-1 px-3 right-5 bg-[#f8f9fe]">
                            Fully Equipped
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
              <div onClick={() => setActiveSelectionToggle('neurology')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                  </div>
                  <p className='md:text-md text-[10px]'>Mathematics</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                  <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT COURSE</div>
                  <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
              </div>
              <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 rounded-lg ${activeSelectionToggle === 'neurology' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'neurology' ? `400px` : '0px'
              }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>Take a look at our infrastructure, including technology-equipped classrooms and learning environments.</p>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <p className="text-[##d6dae5] md:text-sm text-[12px]">Capacity</p>
                        <p>40 persons</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="rounded-2xl py-1 px-5 border-[#006838] border text-[#006838] md:text-md text-[12px]">8:00 AM - 11:00 AM</div>
                        <p>September 30, 2024</p>
                    </div>
                </div>
                <div className="flex gap-3 overflow-x-auto">
                    <div className="relative w-[80%] flex-shrink-0">
                        <Image src={biochemist} width={1000} height={1000} alt='biochemist' className='w-[100%] h-full object-cover rounded-xl flex-shrink-0' />
                        <div className="absolute top-5 rounded-lg py-1 px-3 right-5 bg-[#f8f9fe]">
                            Fully Equipped
                        </div>
                    </div>
                    <div className="relative w-[80%] flex-shrink-0">
                        <Image src={biochemist} width={1000} height={1000} alt='biochemist' className='w-[100%] h-full object-cover rounded-xl flex-shrink-0' />
                        <div className="absolute top-5 rounded-lg py-1 px-3 right-5 bg-[#f8f9fe]">
                            Fully Equipped
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
              <div onClick={() => setActiveSelectionToggle('dermatology')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                  </div>
                  <p className='md:text-md text-[10px]'>Physical and Health Education</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                  <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT COURSE</div>
                  <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
              </div>
              <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 rounded-lg ${activeSelectionToggle === 'dermotology' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'dermotology' ? `400px` : '0px'
              }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>Take a look at our infrastructure, including technology-equipped classrooms and learning environments.</p>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <p className="text-[##d6dae5] md:text-sm text-[12px]">Capacity</p>
                        <p>40 persons</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="rounded-2xl py-1 px-5 border-[#006838] border text-[#006838] md:text-md text-[12px]">8:00 AM - 11:00 AM</div>
                        <p>September 30, 2024</p>
                    </div>
                </div>
                <div className="flex gap-3 overflow-x-auto">
                    <div className="relative w-[80%] flex-shrink-0">
                        <Image src={biochemist} width={1000} height={1000} alt='biochemist' className='w-[100%] h-full object-cover rounded-xl flex-shrink-0' />
                        <div className="absolute top-5 rounded-lg py-1 px-3 right-5 bg-[#f8f9fe]">
                            Fully Equipped
                        </div>
                    </div>
                    <div className="relative w-[80%] flex-shrink-0">
                        <Image src={biochemist} width={1000} height={1000} alt='biochemist' className='w-[100%] h-full object-cover rounded-xl flex-shrink-0' />
                        <div className="absolute top-5 rounded-lg py-1 px-3 right-5 bg-[#f8f9fe]">
                            Fully Equipped
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
              <div onClick={() => setActiveSelectionToggle('pediatrics')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                  </div>
                  <p className='md:text-md text-[10px]'>Basic Technology</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                  <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT COURSE</div>
                  <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
              </div>
              <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 rounded-lg ${activeSelectionToggle === 'pediatrics' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'pediatrics' ? `400px` : '0px'
              }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>Take a look at our infrastructure, including technology-equipped classrooms and learning environments.</p>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <p className="text-[##d6dae5] md:text-sm text-[12px]">Capacity</p>
                        <p>40 persons</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="rounded-2xl py-1 px-5 border-[#006838] border text-[#006838] md:text-md text-[12px]">8:00 AM - 11:00 AM</div>
                        <p>September 30, 2024</p>
                    </div>
                </div>
                <div className="flex gap-3 overflow-x-auto">
                    <div className="relative w-[80%] flex-shrink-0">
                        <Image src={biochemist} width={1000} height={1000} alt='biochemist' className='w-[100%] h-full object-cover rounded-xl flex-shrink-0' />
                        <div className="absolute top-5 rounded-lg py-1 px-3 right-5 bg-[#f8f9fe]">
                            Fully Equipped
                        </div>
                    </div>
                    <div className="relative w-[80%] flex-shrink-0">
                        <Image src={biochemist} width={1000} height={1000} alt='biochemist' className='w-[100%] h-full object-cover rounded-xl flex-shrink-0' />
                        <div className="absolute top-5 rounded-lg py-1 px-3 right-5 bg-[#f8f9fe]">
                            Fully Equipped
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
              <div onClick={() => setActiveSelectionToggle('orthopedics')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                  </div>
                  <p className='md:text-md text-[10px]'>Computer Studies/ICT</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                  <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT COURSE</div>
                  <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
              </div>
              <div ref={cardiologyRef} className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out gap-5 rounded-lg ${activeSelectionToggle === 'orthopedics' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'orthopedics' ? `400px` : '0px'
              }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>Take a look at our infrastructure, including technology-equipped classrooms and learning environments.</p>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <p className="text-[##d6dae5] md:text-sm text-[12px]">Capacity</p>
                        <p>40 persons</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="rounded-2xl py-1 px-5 border-[#006838] border text-[#006838] md:text-md text-[12px]">8:00 AM - 11:00 AM</div>
                        <p>September 30, 2024</p>
                    </div>
                </div>
                <div className="flex gap-3 overflow-x-auto">
                    <div className="relative w-[80%] flex-shrink-0">
                        <Image src={biochemist} width={1000} height={1000} alt='biochemist' className='w-[100%] h-full object-cover rounded-xl flex-shrink-0' />
                        <div className="absolute top-5 rounded-lg py-1 px-3 right-5 bg-[#f8f9fe]">
                            Fully Equipped
                        </div>
                    </div>
                    <div className="relative w-[80%] flex-shrink-0">
                        <Image src={biochemist} width={1000} height={1000} alt='biochemist' className='w-[100%] h-full object-cover rounded-xl flex-shrink-0' />
                        <div className="absolute top-5 rounded-lg py-1 px-3 right-5 bg-[#f8f9fe]">
                            Fully Equipped
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default EducationFacilities
