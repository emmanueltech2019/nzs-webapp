'use client'
import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Icon } from '@iconify/react/dist/iconify.js'

const LoadInfo = () => {
    const [activeTab, setActiveTab] = useState('');
    const [activeRadius, setActiveRadius] = useState(false)
    const [selected, setSelected] = useState('fragile');
  return (
    <div className='flex flex-col gap-5 mt-5 mb-60'>
        <div className="flex justify-between">
            <div className="flex flex-col gap-3">
                <p className="text-2xl font-bold text-black">CHOOSE UNIT</p>
                <p className="text-sm font-light">Prices are valid within 24hrs only</p>
            </div>
            <div className="flex flex-col gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#c5c6cc]">
                    <FaArrowRight className='-rotate-45' />
                </div>
                <p className="font-light text-sm">00:21:00</p>
            </div>
        </div>
        <div className="flex gap-3 items-center">
            <div onClick={() => setActiveTab('mg')} className={`flex justify-center items-center text-sm w-20 cursor-pointer h-10 rounded-xl ${activeTab === 'mg' ? 'bg-[#006838] text-white' : 'bg-[#eaf2ff] text-[#006838]'}`}>MG</div>
            <div onClick={() => setActiveTab('g')} className={`flex justify-center items-center text-sm w-20 cursor-pointer h-10 rounded-xl ${activeTab === 'g' ? 'bg-[#006838] text-white' : 'bg-[#eaf2ff] text-[#006838]'}`}>G</div>
            <div onClick={() => setActiveTab('kg')} className={`flex justify-center items-center text-sm w-20 cursor-pointer h-10 rounded-xl ${activeTab === 'kg' ? 'bg-[#006838] text-white' : 'bg-[#eaf2ff] text-[#006838]'}`}>KG</div>
            <div onClick={() => setActiveTab('ton')} className={`flex justify-center items-center text-sm w-20 cursor-pointer h-10 rounded-xl ${activeTab === 'ton' ? 'bg-[#006838] text-white' : 'bg-[#eaf2ff] text-[#006838]'}`}>TON</div>
            <div onClick={() => setActiveTab('sq')} className={`flex justify-center items-center text-sm w-20 cursor-pointer h-10 rounded-xl ${activeTab === 'sq' ? 'bg-[#006838] text-white' : 'bg-[#eaf2ff] text-[#006838]'}`}>SQ/FT</div>
            <div onClick={() => setActiveTab('m')} className={`flex justify-center items-center text-sm w-20 cursor-pointer h-10 rounded-xl ${activeTab === 'm' ? 'bg-[#006838] text-white' : 'bg-[#eaf2ff] text-[#006838]'}`}>M<sub>2</sub></div>
        </div>
        <div className="flex flex-col gap-2">
            <p className="text-sm text-[#c5c6cc]">Cost</p>
            <p className="text-lg font-bold text-black">N 12.00</p>
        </div>
        <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-2">
                <label htmlFor="number" className='border border-[#c5c6cc] p-3 text-[#c5c6cc] rounded-xl'>
                    G <input type="text" placeholder='1.00' id='number' name='number' className='outline-none border-none bg-transparent' />
                </label>
                <p className="text-sm text-[#c5c6cc] font-light">Unit Volume</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-center items-center rounded-xl p-3 border-[#c5c6cc] border bg-[#eaf2ff] text-[#c5c6cc]"> 1 </div>
                <p className="text-sm font-light text-[#c5c6cc]">Quantity</p>
            </div>
            <div className="flex items-center gap-3">
                <p>Type</p>
                <Icon icon='tabler:chevron-down' className='text-[#C5C6CC] text-sm' />
            </div>
        </div>
        <div className="flex flex-col gap-5 p-5 border border-[#c5c6cc] rounded-xl">
            <div className="flex items-center gap-2">
                <div onClick={() => setActiveRadius(!activeRadius)} className={`flex justify-center rounded-full items-center w-6 h-6 ${activeRadius ? 'bg-[#006838]' : 'border border-[#c5c6cc]'}`}>
                    <div className={`w-2 h-2 rounded-full bg-white ${activeRadius ? 'block' : 'hidden'}`}></div>
                </div>
                <p className='text-[#c5c6cc] font-semibold'>Special Handling</p>
            </div>
            <div className="flex flex-col gap-2">
                <div onClick={() => setSelected('fragile')} className={`flex justify-between p-3 cursor-pointer rounded-xl items-center ${selected === 'fragile' ? 'bg-[#eaf2ff]' : 'border border-[#c5c6cc]'}`}>
                    <div className="flex flex-col gap-3">
                        <p>Fragile</p>
                        <p className='text-sm text-[#c5c6cc]'>5 - 8 days</p>
                    </div>
                    <p className='text-sm text-[#c5c6cc]'>N 0.50/Unit</p>
                </div>
                <div onClick={() => setSelected('perishable')} className={`flex justify-between cursor-pointer p-3 rounded-xl items-center ${selected === 'perishable' ? 'bg-[#eaf2ff]' : 'border border-[#c5c6cc]'}`}>
                    <div className="flex flex-col gap-3">
                        <p>Perishable</p>
                        <p className='text-sm text-[#c5c6cc]'>5 - 8 days</p>
                    </div>
                    <p className='text-sm text-[#c5c6cc]'>N 0.50/Unit</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoadInfo
