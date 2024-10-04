'use client'
import interFont from '@/fonts/Inter'
import openSansFont from '@/fonts/OpenSans'
import { Icon } from '@iconify/react/dist/iconify.js'
import { FC, useState } from 'react'

const states = ['umuahia', 'jos', 'akwa-ibom', 'anambra', 'bauchi', 'bayelsa', 'delta', 'ebonyi', 'plateau', 'niger', 'kogi']

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
        <button className='w-6 h-6 rounded-full flex items-center justify-center text-lg bg-[#EAF2FF] leading-[0]'>
          <Icon icon='flowbite:minus-outline' className='text-sm' />
        </button>
        <span>1</span>
        <button className='w-6 h-6 rounded-full flex items-center justify-center text-lg bg-[#EAF2FF] leading-[0]'>
          <Icon icon='flowbite:plus-outline' className='text-sm' />
        </button>
      </div>
    </div>

    <section className="locations">
      <div className="row flex justify-between items-center">
        <div className="col">
          <h2 className='text-[#1F2024]'>State</h2>
          <p className='text-[#71727A] text-sm tracking-wide'>Available in Nigeria</p>
        </div>
        <div className="col">
          <div className='w-6 h-6 rounded-full flex items-center justify-center text-sm bg-[--foreground-green] text-white leading-[0]'>9</div>
        </div>
      </div>

      <div className="flex flex-wrap">
        {states.map(state => (<div className='px-3 py-[6px] text-[--foreground-green] bg-[#EAF2FF] text-sm uppercase tracking-wider rounded-2xl'>{state}</div>))}
      </div>

      <div className="row flex justify-between items-center">
        <div className="col">
          <h2 className='text-[#1F2024]'>City</h2>
          <p className='text-[#71727A] text-sm tracking-wide'>Available in Nigeria</p>
        </div>
        <div className="col">
          <Icon icon='tabler:chevron-down' className='text-[--foreground-green] text-base' />
        </div>
      </div>
    </section>
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