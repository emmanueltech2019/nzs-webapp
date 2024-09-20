import { Icon } from '@iconify/react'

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