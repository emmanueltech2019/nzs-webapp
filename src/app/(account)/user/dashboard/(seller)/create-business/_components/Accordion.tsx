'use client'
import { FC, useState } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js"
import { AccordionPropsType } from "@/types/AccordionProps.types"
import openSansFont from '@/fonts/OpenSans'

const Accordion: FC<AccordionPropsType> = ({ title, subTitle, children, onClick, state, batch = 0 }) => {
    const [batchNum, setBatch] = useState(batch)
    return (
        <div className='flex justify-between items-start py-4 border-b-[0.5px] border-[#D4D6DD]'>
            <div className="col">
                <div onClick={() => { setBatch(0); onClick() }} className='flex justify-between cursor-pointer'>
                    <div>
                        <h2 className={`text-[#1F2024] text-base`}>{title}</h2>
                        <h3 className='text-[#71727A] text-sm'>{subTitle}</h3>
                    </div>
                    {batchNum ? <div className={`w-6 h-6 rounded-full flex justify-center items-center text-white text-[10px] bg-[--foreground-green] ${openSansFont}`}>{batchNum}</div>
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