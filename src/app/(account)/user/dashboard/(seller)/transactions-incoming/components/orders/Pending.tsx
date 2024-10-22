import React from 'react'
import SellerAccordion from '../Accordion'
import { Icon } from '@iconify/react/dist/iconify.js'

const Pending = () => {
  return (
    <div>
      <SellerAccordion status="CONFIRM ORDER" style="bg-[#EAF2FF]" imgStyle='hidden'/>
    </div>
  )
}

export default Pending