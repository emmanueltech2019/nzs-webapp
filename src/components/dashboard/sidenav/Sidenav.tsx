import React from 'react'
import Box from '../../Box'
import { links } from './NavlinkObj'
import { div, li } from 'framer-motion/client'

const Sidenav = () => {
  return (
    <div className='hidden md:block sticky top-0 h-screen w-[241px] py-[70px] ps-[35px]'>
      <div className="box">
        <Box />
      </div>

      <nav className='mt-[57px]'>
        <ul className='grid gap-[57px]'>
          {
            links.map((item, index) => (
              <li key={index} className='cursor-pointer'>
                {item.listItem}
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  )
}

export default Sidenav