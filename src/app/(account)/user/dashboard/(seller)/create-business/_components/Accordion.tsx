'use client'
import { FC, useState } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js"
import { AccordionPropsType } from "@/types/AccordionProps.types"
import openSansFont from '@/fonts/OpenSans'

type extraProps = {
    border?: boolean
    durations?: number //miliseconds
}

const Accordion: FC<AccordionPropsType & extraProps> = ({ title, subTitle, children, onClick, state, batch = 0, border = true, durations = 200 }) => {
    const [batchNum, setBatch] = useState(batch)
    return (
        <div className={`py-4 ${border ? 'border-[#D4D6DD] border-b-[0.5px]':''}`}>
            <div className="col pb-3 w-full">
                <div onClick={() => { setBatch(0); onClick() }} className='flex w-full justify-between cursor-pointer pb-4'>
                    <div>
                        <h2 className={`text-[#1F2024] text-base pb-2`}>{title}</h2>
                        <h3 className='text-[#71727A] text-sm'>{subTitle}</h3>
                    </div>
                    {batchNum ? <div className={`w-6 h-6 rounded-full flex justify-center items-center text-white text-[10px] bg-[--foreground-green] ${openSansFont}`}>{batchNum}</div>
                        : <Icon icon={`bi:chevron-down`} className={`font-bold transition-all duration-200 ${state ? 'rotate-180' : 'rotate-0'}`} />}
                </div>
                <div className={`overflow-hidden transition-all ${state ? 'pt-3 max-h-[1000px]' : 'pb-0 max-h-0'}`} style={{transitionDuration: durations + 'ms'}}>
                    {children}
                </div>
            </div>
        </div >
    )
}

export default Accordion