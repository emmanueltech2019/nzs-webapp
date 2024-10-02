import React from 'react'
import { Icon } from '@iconify/react'
import { profileOptions } from './NavlinkObj'

const RightSidenav = () => {
  return (
    <div className='hidden bg-[#EAF2FF] md:flex justify-between items-center flex-col top-0 h-screen  lg:w-[22vw] py-[60px] px-[32px] sticky right-0'>

      {/* Profile */}
      <div className='py-2 block justify-center items-center w-full'>
        <div className='bg-[#E09427] w-[80px] h-[80px] m-auto rounded-[32px] overflow-hidden'>
          <Icon icon="mingcute:user-2-fill" className='relative top-2 left-[1px] text-white text-[80px]'></Icon>
        </div>

        {/* brief info */}
        <div className='text-center mt-4'>
          <h3 className='font-black text-[#1F2024] text-base'>Lucas Scott</h3>
          <p className='text-xs font-normal text-[#71727A]'>@lucasscott3</p>
        </div>

        {/* profile options */}
        <div className='py-6 grid gap-[10px]'>
          {
            profileOptions.map(({text, path}, index) => (
              <div key={index} className='w-full block border-t-[0.5px] border-[#D4D6DD] cursor-pointer'>
                <span className='p-5 lg:p-[26px] flex items-center justify-between'>
                  <p className='text-[#1F2024] text-sm'>{text}</p>
                  <Icon icon="formkit:right" className='text-[20px] text-[#8F9098]'></Icon>
                </span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default RightSidenav
