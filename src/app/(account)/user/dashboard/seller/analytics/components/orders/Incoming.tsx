
import SellerAccordion from '../Accordion'
import React from 'react'
import Status from '../status/Status'

interface IncomingProps {
  activeFilter: string
}
const Incoming: React.FC<IncomingProps> = ({activeFilter}) => {
  return (
    <div>
      {
        activeFilter === 'Status' ? (
          <Status />
        ) : (
          <SellerAccordion status='INCOMING' style='bg-[#20E58A]' imgRepStyle='hidden'/>
        )
      }
    </div>
  )
}

export default Incoming