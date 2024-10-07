'use client'
import React, { useState } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js"

type accordionPropsType = {
  children: React.ReactNode
  title: string,
  state: boolean
  onClick: () => void
  batch?: number
}

const Accordion: React.FC<accordionPropsType> = ({ title, children, onClick, state, batch = 0 }) => {
  const [batchNum, setBatch] = useState(batch)

  return (
    <div className='flex justify-between items-start py-4 border-b-[0.5px] border-[#D4D6DD]'>
      <div className="col">
        <div onClick={() => { setBatch(0); onClick() }} className='flex justify-between cursor-pointer'>
          <h2 className={`card-title`}>{title}</h2>
          {batchNum ? <div className="w-6 h-6 rounded-full flex justify-center items-center text-white text-[10px] bg-[--foreground-green]">{batchNum}</div>
            : <Icon icon={`bi:chevron-down`} className={`font-bold transition-all duration-200 ${state ? 'rotate-180' : 'rotate-0'}`} />}
        </div>
        <div className={`overflow-hidden transition-all duration-200 ${state ? 'mt-3 max-h-[1000px]' : 'mt-0 max-h-0'}`}>
          {children}
        </div>
      </div>
    </div >
  )
}

export default Accordion

// ${a ? 'rotate-180' : 'rotate-0'}
// ${a ? 'mt-3 max-h-[100px]' : 'mt-0 max-h-0'}