import { FC, useEffect, useState } from 'react'
import general_type from './general.types'
import Circle from '@/components/Circle'
import { Icon } from '@iconify/react/dist/iconify.js'
import poppinsFont from '@/fonts/Poppins'
import openSansFont from '@/fonts/OpenSans'

const Preview: FC<general_type> = ({handleBtnFunc, setCount, setSection, setDisplayCircle, setBtnText}) => {
  const [uploadCount, setuploadCount] = useState(75)
  useEffect(() => {
    setCount(100)
    if(setDisplayCircle) setDisplayCircle(false)
    if(setBtnText) setBtnText('CONFIRM')
  })
  return (
    <div className='py-3'>
      <div className="bg-[#F8F9FE] p-4 rounded-lg">
        <div className="bg-white rounded-lg min-h-[97px] justify-center items-center flex">
          <Circle size={48} count={uploadCount} period={100}>
            <Icon icon='akar-icons:arrow-up' className='text-xl text-[--foreground-green] font-extrabold'></Icon>
          </Circle>
        </div>
        <div className='flex py-3 items-center gap-2 pr-3 border-b border-[#0C1F1F0A] mb-[10px]'>
          <h3 className={`${poppinsFont} mr-auto`}>BUSINESS NAME</h3>
          <button className={`py-1 px-2 text-sm text-[#0C1F1F] bg-[#EAF2FF] rounded-[4px] ${openSansFont}`}>Upload Logo</button>
          <Icon icon={`bi:chevron-down`} className='font-extrabold text-[#0C1F1F80]' />
        </div>
        <div className="flex justify-between gap-10 mb-4">
          <div className='flex-1'>
            <h3 className={`${openSansFont} text-[#0C1F1F40] text-sm pb-1`}>Sector</h3>
            <p className={`text-[#0C1F1F] ${openSansFont}`}>Fashion & Textiles</p>
          </div>
          <div className='flex-1'>
            <h3 className={`${openSansFont} text-[#0C1F1F40] text-sm pb-1`}>Added</h3>
            <p className={`text-[#0C1F1F] ${openSansFont}`}>September 30, 2024</p>
          </div>
        </div>

        <div className="flex justify-between gap-10 mb-4">
          <div className='flex-1'>
            <h3 className={`${openSansFont} text-[#0C1F1F40] text-sm pb-1`}>Description</h3>
            <p className={`text-[#0C1F1F] ${openSansFont}`}>The perfect T-shirt for
              when you want to feel
              at ease but still stylish...</p>
          </div>
          <div className='flex-1'>
            <h3 className={`${openSansFont} text-[#0C1F1F40] text-sm pb-1`}>Product Category</h3>
            <p className={`text-[#0C1F1F] ${openSansFont}`}>Fashion Accessories
              & Jewelry</p>
          </div>
        </div>

        <div className="flex justify-between gap-10 mb-4">
          <div className='flex-1'>
            <p className={`text-[#0C1F1F40] ${openSansFont}`}>Consideration</p>
          </div>
          <div className='flex-1'>
            <button className={`text-[#0C1F1F] py-1 px-4 rounded-[15px] bg-[#EBEDED] ${openSansFont}`}>Health</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview