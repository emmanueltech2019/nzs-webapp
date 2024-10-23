'use client'
import TagHeader from '@/components/header/TagHeader'
import interFont from '@/fonts/Inter'
import openSansFont from '@/fonts/OpenSans'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'

const initialState = [
    { id: 1, title: <>Business<br /> Description</>, done: false },
    { id: 2, title: <>Business<br /> Info</>, done: false },
    { id: 3, title: <>Payment<br /> Info</>, done: false },
    { id: 4, title: <>Preview</>, done: false },
]

const Main = () => {
    const [section, setSection] = useState<1 | 2 | 3 | 4 | 'done'>(1)
    const [tab, setTab] = useState(initialState)
    const BusinessDescription = () => (<div>
        <div className="p-2">
            <h2 className={`font-black text-[#1F2024] tracking-tight text-xl pb-2 ${interFont}`}>Select the right profile for your business.</h2>
            <p className={`text-[#71727A] ${openSansFont}`}>
                We provide multiple options so feel free to get
                super-specific!
            </p>
        </div>
    </div>)

    const BusinessInfo = () => (<div>

    </div>)

    const PaymentInfo = () => (<div></div>)

    const Preview = () => (<div></div>)

    return (
        <div>
            <TagHeader title="Add Business" />
            <div className="row flex items-start justify-between gap-5 pb-3">
                {tab.map(({ id, title, done }) => (
                    <div className="col flex items-center flex-col gap-[9px]">
                        <div className={`flex items-center justify-center leading-0 rounded-full w-6 h-6 text-[10px] font-semibold ${openSansFont} ${section == id ? 'text-white bg-[--foreground-green]' : done ? 'bg-[#1FCB2B]' : 'text-[#8F9098] bg-[#F8F9FE]'}`}>
                            {done ? <Icon icon='fa6-solid:check' className='text-[--foreground-green] font-bl' /> : id}
                        </div>
                        <p className={`text-center font-bold text-sm ${openSansFont} ${section == id ? 'text-[#1F2024]' : 'text-[#8F9098]'}`}>{title}</p>
                    </div>
                ))}
            </div>
            {section === 1 && <BusinessDescription />}
            {section === 2 && <BusinessInfo />}
            {section === 3 && <PaymentInfo />}
            {section === 4 && <Preview />}
        </div>
    )
}

export default Main