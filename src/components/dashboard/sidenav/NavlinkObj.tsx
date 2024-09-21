import { Icon } from '@iconify/react'
import { div } from 'framer-motion/client'

export const links = [
  {
    listItem: (
      <div className='flex items-center gap-[10px] border-e-4 border-[#006838]'>
        <Icon icon="mdi:cart-variant" className='text-[34px] text-[#006838]'></Icon>
        <p className='text-[19px] leading-[22.99px] font-[400]'>Explore</p>
      </div>
    )
  },
  {
    listItem: (
      <div className='flex items-center gap-[10px]'>
        <Icon icon="ep:menu" className='text-[34px] text-[#D4D6DD]'></Icon>
        <p className='text-[19px] text-[#71727A] leading-[22.99px] font-[400]'>Transactions</p>
      </div>
    )
  },
  {
    listItem: (
      <div className='flex items-center gap-[10px]'>
        <Icon icon="ic:round-store" className='text-[34px] text-[#D4D6DD]'></Icon>
        <p className='text-[19px] text-[#71727A] leading-[22.99px] font-[400]'>Inventory</p>
      </div>
    )
  },
  {
    listItem: (
      <div className='flex items-center gap-[10px]'>
        <Icon icon="ri:settings-5-fill" className='text-[34px] text-[#D4D6DD]'></Icon>
        <p className='text-[19px] text-[#71727A] leading-[22.99px] font-[400]'>Settings</p>
      </div>
    )
  },
]

export const profileOptions = [
  {
    optionItem: (
      <span className='p-[26px] flex items-center justify-between'>
        <p className='text-[#1F2024] text-sm'>My Wallet</p>
        <Icon icon="formkit:right" className='text-[20px] text-[#8F9098]'></Icon>
      </span>
    )
  },
  {
    optionItem: (
      <span className='p-[26px] flex items-center justify-between'>
        <p className='text-[#1F2024] text-sm'>Inventory</p>
        <Icon icon="formkit:right" className='text-[20px] text-[#8F9098]'></Icon>
      </span>
    )
  },
  {
    optionItem: (
      <span className='p-[26px] flex items-center justify-between'>
        <p className='text-[#1F2024] text-sm'>Notifications</p>
        <Icon icon="formkit:right" className='text-[20px] text-[#8F9098]'></Icon>
      </span>
    )
  },
  {
    optionItem: (
      <span className='p-[26px] flex items-center justify-between'>
        <p className='text-[#1F2024] text-sm'>Language</p>
        <Icon icon="formkit:right" className='text-[20px] text-[#8F9098]'></Icon>
      </span>
    )
  },
  {
    optionItem: (
      <span className='p-[26px] flex items-center justify-between'>
        <p className='text-[#1F2024] text-sm'>Privacy &#38; Security</p>
        <Icon icon="formkit:right" className='text-[20px] text-[#8F9098]'></Icon>
      </span>
    )
  },
  {
    optionItem: (
      <span className='p-[26px] flex items-center justify-between'>
        <p className='text-[#1F2024] text-sm'>Log Out</p>
        <Icon icon="formkit:right" className='text-[20px] text-[#8F9098]'></Icon>
      </span>
    )
  },
]