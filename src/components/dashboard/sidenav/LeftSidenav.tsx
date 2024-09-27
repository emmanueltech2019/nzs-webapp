import React from 'react'
import Box from '../../Box'
import { links } from './NavlinkObj'

const LeftSidenav = () => {
  return (
    <div className='hidden lg:flex justify-between items-center flex-col sticky top-0 h-screen max-h-[1200px] w-[22vw] max-w-[241px] py-[70px] ps-[35px]'>
      <div className="box flex-1 self-start">
        <Box />
      </div>

      <nav className='mt-[57px] flex-[3]'>
        <ul className='grid h-full justify-between'>
          {
            links.map((item, index) => (
              <li key={index} className='cursor-pointer'>
                {item.listItem}
              </li>
            ))
          }
        </ul>
      </nav>

      <div className='empty_element flex-1 flex flex-col justify-end self-start'></div>
    </div>
  )
}

export default LeftSidenav