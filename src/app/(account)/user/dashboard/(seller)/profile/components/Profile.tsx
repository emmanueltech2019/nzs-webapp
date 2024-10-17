import React from 'react'
import Image from 'next/image'
import ProfileImg from './img/image.png'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Roboto } from 'next/font/google'
import { profileOptions } from '@/components/dashboard/sidenav/NavlinkObj'

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  // variable: '--font-poppins',
  weight: ['100', '300', '400', '500', '700', '900'],
})
const Profile = () => {
  return (
    <div>
      <div className=''>
        <header>
          <h1 className='font-sans text-2xl font-extrabold text-center py-[19.5px]'>Profile</h1>
        </header>

        <div>
          {/* profile picture */}
          <div className='relative mt-[59px] border-2 border-s-[#006838] border-b-[#006838] border-t-[#006838] p-2 rounded-full w-[130px] h-[130px] m-auto -rotate-[40deg]'>
            <div className='absolute z-20 right-1 bottom-1 h-[30px] w-[30px] bg-[#006838] rotate-[40deg] rounded-full'>
              <p className={`text-xs text-[#ffffff] ${roboto.className} antialiased font-[900] mt-2 mx-3`}>9</p>
            </div>
            <Image src={ProfileImg} alt="alt" className='rounded-full rotate-[40deg]' />
          </div>

          {/* profile details */}
          <div className={`${roboto.className} antialiased font-bold text-center`}>
            {/* name */}
            <div className='mt-[31px] mb-1'>
              <h2 className='text-[#6B7A99] text-base leading-[30px]'>Hello Mary-Anne Akpan</h2>
            </div>
            {/* email */}
            <div>
              <p className='text-[#ADB8CC] text-sm leading-[30px]'>madreAnne24@yahoo.com</p>
            </div>
          </div>
        </div>

        {/* account filter */}
        <div className='my-6'>
          <div>

          </div>

          {/* switch business */}
          <div className='border-t-[0.5px] border-[#D4D6DD] cursor-pointer p-4 flex justify-between w-full'>
            <div>
              <h2 className={`text-[#ADB8CC] text-[10px] leading-5 font-bold ${roboto.className} antialiased`}>Switch Business</h2>
              <p className='text-[14px] font-normal font-sans leading-5'>Other Business</p>
            </div>

            {/* imgaes */}
            <div className='flex items-center gap-5'>
              <div className='relative flex'>
                <div className='h-[35px] w-[35px] bg-slate-500 rounded-full border border-white'></div>
                <div className='h-[35px] w-[35px] bg-slate-500 rounded-full border border-white -ms-3'></div>
                <div className='h-[35px] w-[35px] bg-slate-500 rounded-full border border-white -ms-3'></div>
              </div>

              <Icon icon="formkit:right" className='text-[18px] text-[#8F9098] rotate-90'></Icon>
            </div>

          </div>

          <div className='grid gap-[10px] w-full'>
          {
            profileOptions.map(({text, path}, index) => (
              <div key={index} className='border-t-[0.5px] border-[#D4D6DD] cursor-pointer p-4 flex justify-between w-full'>
                <span className='flex items-center justify-between w-full font-sans'>
                  <p className='text-[#1F2024] text-sm'>{text}</p>
                  <Icon icon="formkit:right" className='text-[20px] text-[#8F9098]'></Icon>
                </span>
              </div>
            ))
          }
        </div>

        </div>
      </div>
    </div>
  )
}

export default Profile