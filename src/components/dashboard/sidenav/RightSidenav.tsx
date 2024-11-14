import React from 'react'
import { Icon } from '@iconify/react'
import Profile from '@/app/(account)/user/dashboard/seller/profile/components/Profile'


const RightSidenav = () => {
  return (
    <div className='hidden bg-[#EAF2FF] md:flex justify-between flex-col top-0 overflow-y-auto max-h-screen md:min-w-[30vw] lg:min-w-[23vw] py-[60px] px-4 sticky right-0'>

      <Profile />

      {/* Profile */}
      {/* <div className='py-2 block justify-center items-center w-full'>
        <div className='bg-[#E09427] w-[80px] h-[80px] m-auto rounded-[32px] overflow-hidden'>
          <Icon icon="mingcute:user-2-fill" className='relative top-2 left-[1px] text-white text-[80px]'></Icon>
        </div> */}

        {/* brief info */}
        {/* <div className='text-center mt-4'>
          <h3 className='font-black text-[#1F2024] text-base'>Lucas Scott</h3>
          <p className='text-xs font-normal text-[#71727A]'>@lucasscott3</p>
        </div> */}

        {/* profile options */}

      {/* </div> */}
    </div>
  )
}

export default RightSidenav
