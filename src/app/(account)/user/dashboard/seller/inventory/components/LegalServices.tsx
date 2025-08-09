'use client'
import React, { FC, useRef, useState } from 'react'
import { Icon } from '@iconify/react'

interface LegalServicesProp {
  activeSelection: string,
  setActiveSelection: (selectionId: string) => void
}

const LegalServices: FC<LegalServicesProp> = ({activeSelection, setActiveSelection}) => {
  const [activeSelectionToggle, setActiveSelectionToggle] = useState('cardiology');
  const cardiologyRef = useRef<HTMLDivElement>(null)
  return (
    <div className='my-5'>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center border-s-4 border-[#29cc39] ps-5">
          <p className="font-bold text-[#4d5e80]">NEW SPECIALTY</p>
          <div className="w-10 h-10 border rounded-full flex justify-center items-center">
            <p className='text-[#4d5e80]'>5</p>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <Icon icon={'mdi:ellipsis-horizontal'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
          <Icon icon={'mdi:plus'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
        </div>
      </div>
      <div className="flex justify-between my-5 items-center">
        <p>Your LegalServices</p>
        <div className="w-10 h-10 rounded-full bg-[#006838] text-white flex justify-center items-center">9</div>
      </div>
      <div className="flex items-center flex-wrap gap-3">
        <div onClick={() => setActiveSelection('CONSULTATION')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'CONSULTATION' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          CONSULTATION
        </div>
        <div onClick={() => setActiveSelection('THERAPY')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'THERAPY' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          THERAPY
        </div>
        <div onClick={() => setActiveSelection('SURGERY')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'SURGERY' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          SURGERY
        </div>
        <div onClick={() => setActiveSelection('CALL')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'CALL' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          CALL
        </div>
        <div onClick={() => setActiveSelection('POST - SURGERY')} className={`flex justify-center items-center px-3 md:text-md text-sm py-1 rounded-lg cursor-pointer ${activeSelection === 'POST - SURGERY' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          POST - SURGERY
        </div>
      </div>
       <div className="flex flex-col gap-5 my-5">
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
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
                    <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">In-Patient</div>
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
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
                <div onClick={() => setActiveSelectionToggle('neurology')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                    </div>
                    <p className='md:text-md text-[10px]'>Neurology</p>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                    <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                    <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
                </div>
                <div ref={cardiologyRef} className={`flex flex-col transition-all duration-200 ease-in-out gap-5 overflow-hidden bg-white rounded-lg ${activeSelectionToggle === 'neurology' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'neurology' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
                }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>This is the branch of medicine focused on teh diagnosis, treatment, and prevention of diseases related to the heart and blood vessels.</p>
                <div className="flex justify-between items-center">
                    <p className="text-[##d6dae5] md:text-sm text-[12px]">A-Z</p>
                    <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">In-Patient</div>
                </div>
                <div className="flex justify-between gap-3 items-center overflow-x-auto flex-shrink-0">
                    <div className="flex justify-center flex-shrink-0 md:text-md text-[12px] py-1 px-5 items-center rounded-2xl bg-[#d6dae5]">Diagnostics</div>
                    <div className="flex justify-center flex-shrink-0 md:text-md text-[12px] py-1 px-5 items-center rounded-2xl bg-[#d6dae5]">Surgery</div>
                    <div className="flex justify-center flex-shrink-0 md:text-md text-[12px] py-1 px-5 items-center rounded-2xl bg-[#d6dae5]">Post - Surgery</div>
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
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
                <div onClick={() => setActiveSelectionToggle('dermatology')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                    </div>
                    <p className='md:text-md text-[10px]'>Dermatology</p>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                    <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                    <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
                </div>
                <div ref={cardiologyRef} className={`flex flex-col transition-all duration-200 ease-in-out gap-5 overflow-hidden bg-white rounded-lg ${activeSelectionToggle === 'dermatology' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'dermatology' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
                }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>This is the branch of medicine focused on teh diagnosis, treatment, and prevention of diseases related to the heart and blood vessels.</p>
                <div className="flex justify-between items-center">
                    <p className="text-[##d6dae5] text-sm">A-Z</p>
                    <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">In-Patient</div>
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
                        <p>Seyi Oyedepo</p>
                        <p className='md:text-sm text-[10px] font-light'>MD FACTS.</p>
                    </div>
                    </div>
                    <p>BOOKED</p>
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
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
                <div onClick={() => setActiveSelectionToggle('pediatrics')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                    </div>
                    <p className='md:text-md text-[10px]'>Pediatrics</p>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                    <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                    <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
                </div>
                <div ref={cardiologyRef} className={`flex flex-col transition-all duration-200 ease-in-out gap-5 overflow-hidden bg-white rounded-lg ${activeSelectionToggle === 'pediatrics' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'pediatrics' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
                }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>This is the branch of medicine focused on teh diagnosis, treatment, and prevention of diseases related to the heart and blood vessels.</p>
                <div className="flex justify-between items-center">
                    <p className="text-[##d6dae5] text-sm">A-Z</p>
                    <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">In-Patient</div>
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
                        <p>Adaeze Ezeoke</p>
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
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
                <div onClick={() => setActiveSelectionToggle('orthopedics')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                    </div>
                    <p className='md:text-md text-[10px]'>Orthopedics</p>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                    <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                    <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
                </div>
                <div ref={cardiologyRef} className={`flex flex-col transition-all duration-200 ease-in-out gap-5 overflow-hidden bg-white rounded-lg ${activeSelectionToggle === 'orthopedics' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'orthopedics' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
                }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>This is the branch of medicine focused on teh diagnosis, treatment, and prevention of diseases related to the heart and blood vessels.</p>
                <div className="flex justify-between items-center">
                    <p className="text-[##d6dae5] text-sm">A-Z</p>
                    <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">In-Patient</div>
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
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
                <div onClick={() => setActiveSelectionToggle('endocrinology')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                    </div>
                    <p className='md:text-md text-[10px]'>Endocrinology</p>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                    <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                    <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
                </div>
                <div ref={cardiologyRef} className={`flex flex-col transition-all duration-200 ease-in-out gap-5 overflow-hidden bg-white rounded-lg ${activeSelectionToggle === 'endocrinology' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'endocrinology' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
                }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>This is the branch of medicine focused on teh diagnosis, treatment, and prevention of diseases related to the heart and blood vessels.</p>
                <div className="flex justify-between items-center">
                    <p className="text-[##d6dae5] text-sm">A-Z</p>
                    <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">In-Patient</div>
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
            <div className="flex flex-col gap-5 bg-[#F8F9FE] rounded-xl p-3 cursor-pointer">
                <div onClick={() => setActiveSelectionToggle('obstetrics')} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="flex items-center rounded-full w-7 h-7 bg-[#d6dae5]">
                    <Icon icon={'mdi:times'} style={{fontSize: '30px', color:'white', cursor: 'pointer'}} />
                    </div>
                    <p className='md:text-md text-[10px]'>Obstetrics and Synecology</p>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="rounded-2xl flex justify-center items-center bg-[#FFE3AC] py-1 px-3 md:text-md text-[10px]">75% Booked</div>
                    <div className="rounded-lg flex justify-center items-center bg-[#EAF2FF] py-1 px-3 md:text-md text-[10px]">EDIT SPECIALTY</div>
                    <Icon icon={'tabler:chevron-down'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                </div>
                </div>
                <div ref={cardiologyRef} className={`flex flex-col transition-all duration-200 ease-in-out gap-5 overflow-hidden bg-white rounded-lg ${activeSelectionToggle === 'obstetrics' ? 'md:p-3 p-2' : 'md:p-0 p-0'}`} style={{
                height: activeSelectionToggle === 'obstetrics' ? `${cardiologyRef.current?.scrollHeight}px` : '0px'
                }}>
                <p className='text-[##afafb4] md:text-md text-[12px]'>This is the branch of medicine focused on teh diagnosis, treatment, and prevention of diseases related to the heart and blood vessels.</p>
                <div className="flex justify-between items-center">
                    <p className="text-[##d6dae5] text-sm">A-Z</p>
                    <div className="rounded-2xl py-1 px-5 bg-[#006838] text-white md:text-md text-[12px]">In-Patient</div>
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
        </div>
    </div>
  )
}

export default LegalServices
