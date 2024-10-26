'use client'
import React from 'react'
import Box from '../../Box'
import { links } from './NavlinkObj'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import { usePathname } from 'next/navigation'

const LeftSidenav = () => {
  const pathname = usePathname()
  return (
    <div className='hidden bg-[#006838] text-white lg:flex justify-between items-center flex-col sticky top-0 h-screen overflow-y-auto max-h-[1200px] w-[23vw] max-w-[241px] py-[70px] ps-[35px]'>
      <div className="box flex-1 self-start">
        <Box />
      </div>

      <nav className='mt-[57px] flex-[3]'>
        <ul className='grid h-full justify-between'>
          {
            links.map(({text, icon, link}, index) => {
              const activeLink = pathname.startsWith(link)
              return (
                <li key={index} className='cursor-pointer text-[#fff]'>
                  <Link href={link}>
                    <div className={`flex items-center gap-[10px] pr-4 border-e-4 ${activeLink ? 'border-[#fff]': 'border-transparent'}`}>
                      <Icon icon={icon} className={`text-[34px] ${activeLink ? 'text-[#fff]': 'text-white'}`}></Icon>
                      <p className={`text-[19px] leading-[22.99px] font-[400] ${activeLink ? 'text-[#fff]': 'text-inherit'}`}>{text}</p>
                    </div>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </nav>

      <div className='empty_element flex-1 flex flex-col justify-end self-start'></div>
    </div>
  )
}

export default LeftSidenav