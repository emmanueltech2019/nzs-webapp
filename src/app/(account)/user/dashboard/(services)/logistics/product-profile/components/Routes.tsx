'use client'
import interFont from '@/fonts/Inter'
import openSansFont from '@/fonts/OpenSans'
import { Icon } from '@iconify/react/dist/iconify.js'
import { FC, useState } from 'react'

const Pickup = () => (
  <>
    <div className="row flex justify-between items-center">
      <button className='flex items-center gap-2 text-[#1F2024] py-[10px] px-3 rounded-xl border-[0.5px] border-[#C5C6CC]'>
        <Icon icon='fluent:arrow-sort-16-regular' className='text-[#8F9098] text-sm' />
        Single
        <Icon icon='tabler:chevron-down' className='text-[#C5C6CC] text-sm' />
      </button>
      <div className='flex items-center text-sm tracking-wide'>
        <p>Add Location</p>
        <button>-</button>
        <span>1</span>
        <button className='w-'>+</button>
      </div>
    </div>
  </>
)

const Dropoff = () => (
  <>
  <div></div>
  </>
)

const Routes: FC = () => {
  const [activeTab, setActiveTab] = useState('pickup')
  return (
    <div className={openSansFont}>
      <div className="row flex items-center justify-center border-b border-[#0C1F1F33]">
        {['pickup', 'dropoff'].map(text => (<button onClick={() => { setActiveTab(text) }} className={`flex-1 py-3 uppercase ${interFont} text-sm text-[#71727A] border-b-4 transition-all duration-300 ${activeTab == text ? 'border-[#006838] font-bold bg-[#EAF2FF]' : 'border-transparent'}`}>
          {text}
        </button>))}
      </div>
      {activeTab == 'pickup' && <Pickup />}
      {activeTab == 'dropoff' && <Dropoff />}
    </div>
  )
}

export default Routes