'use client'
import TagHeader from '@/components/header/TagHeader'
import openSansFont from '@/fonts/OpenSans'
import Image from 'next/image'
import React, { useState } from 'react'
import placeholder from '@/assets/images/productMockup.png'
import Accordion from './components/Accordion'
import useToggle from '@/hooks/useToggle'

const page = () => {
    // const [accordionState, setAccordionState] = useState('')
    const [a, aFunc] = useToggle(false)
    const [b, bFunc] = useToggle(false)
    const [c, cFunc] = useToggle(false)
    const [d, dFunc] = useToggle(false)
    const [e, eFunc] = useToggle(false)
    const [f, fFunc] = useToggle(false)
    const [g, gFunc] = useToggle(false)

    const initalState = [
        { item: 'Black', state: false },
        { item: 'White', state: false },
        { item: 'Blue', state: false },
        { item: 'Purple', state: false },
        { item: 'Green', state: false },
        { item: 'Orange', state: false },
        { item: 'Gold', state: false },
        { item: 'Grey', state: false },
        { item: 'Yellow', state: false },
        { item: 'Red', state: false },
        { item: 'Pink', state: false },
        { item: 'Silver', state: false },
    ]
    const [btnState, setBtnState] = useState(initalState)
    const handleBtn = (a: string) => {
        setBtnState(prev => prev.map(({ item, state }, i) => ({ item, state: item == a ? !state : state })))
    }
    return (
        <div className={`max-w-3xl mx-auto px-4 py-6 ${openSansFont}`}>
            <TagHeader title='Add item' />
            <div className="image">
                <Image src={placeholder} alt='placeholder' className='w-full' />
            </div>
            <p>Upload an accurate photo with good lighting.</p>
            <div>
                <Accordion title='Category' onClick={aFunc} state={a} batch={1}>
                    <div className='flex gap-2 flex-wrap'>
                        {btnState.map(({ item, state }) => (
                            <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleBtn(item)}>{item}</button>
                        ))}
                    </div>
                </Accordion>
                <Accordion title='Product Type' onClick={bFunc} state={b}>
                    <div className='flex gap-2 flex-wrap'>
                        {btnState.map(({ item, state }) => (
                            <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleBtn(item)}>{item}</button>
                        ))}
                    </div>
                </Accordion>
                <Accordion title='Brands' onClick={cFunc} state={c} batch={2}>
                    <div className='flex gap-2 flex-wrap'>
                        {btnState.map(({ item, state }) => (
                            <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleBtn(item)}>{item}</button>
                        ))}
                    </div>
                </Accordion>
                <Accordion title='Price Range' onClick={dFunc} state={d}>
                    <div className='flex gap-2 flex-wrap'>
                        {btnState.map(({ item, state }) => (
                            <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleBtn(item)}>{item}</button>
                        ))}
                    </div>
                </Accordion>
                <Accordion title='Color' onClick={eFunc} state={e} batch={3}>
                    <div className='flex gap-2 flex-wrap'>
                        {btnState.map(({ item, state }) => (
                            <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleBtn(item)}>{item}</button>
                        ))}
                    </div>
                </Accordion>
                <Accordion title='Size' onClick={fFunc} state={f}>
                    <div className='flex gap-2 flex-wrap'>
                        {btnState.map(({ item, state }) => (
                            <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleBtn(item)}>{item}</button>
                        ))}
                    </div>
                </Accordion>
                <Accordion title='Quantity' onClick={gFunc} state={g}>
                    <div className='flex gap-2 flex-wrap'>
                        {btnState.map(({ item, state }) => (
                            <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleBtn(item)}>{item}</button>
                        ))}
                    </div>
                </Accordion>
            </div>

            <div className='p-6'>
                <button className='w-full flex items-center justify-center bg-[--foreground-green] text-white text-base py-4 font-medium rounded-xl transition-all duration-300 hover:scale-75'>Done</button>
            </div>
        </div>
    )
}

export default page