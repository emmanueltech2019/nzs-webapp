import { FC, useEffect, useState } from 'react'
import general_type from './general.types'
import interFont from '@/fonts/Inter'
import openSansFont from '@/fonts/OpenSans'
import Link from 'next/link'
import Circle from '@/components/Circle'
import { Icon } from '@iconify/react/dist/iconify.js'
import poppinsFont from '@/fonts/Poppins'
import useForm from '@/hooks/useForm'
import Accordion from './Accordion'
import useToggle from '@/hooks/useToggle'
import { ProfileInfo } from './Main'

const initialState = [
    { item: 'Health Regulation', state: false },
    { item: 'Age-based Regulation', state: false },
    { item: 'Safety Regulation', state: false },
]

const mainState = [
    { item: 'umuahia', state: false },
    { item: 'jos', state: false },
    { item: 'akwa-ibom', state: false },
    { item: 'anambra', state: false },
    { item: 'bauchi', state: false },
    { item: 'bayelsa', state: false },
    { item: 'delta', state: false },
    { item: 'ebonyi', state: false },
    { item: 'plateau', state: false },
    { item: 'niger', state: false },
    { item: 'kogi', state: false },
]

// dummy google map
const GoogleMapEmbed = () => {
    return (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.4729100739933!2d7.022166680562655!3d4.860128682521301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069d3356c536691%3A0x545520791186f2d3!2sPristine%20Medical%20Consultants!5e0!3m2!1sen!2sng!4v1726304749925!5m2!1sen!2sng"
        height="450"
        style={{ border: 0, width: '100vw' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map Embed"
      ></iframe>
    );
  };

const BusinessInfo: FC<general_type> = ({ handleBtnFunc, setCount, setSection }) => {
    const [uploadCount, setuploadCount] = useState(50)
    const [states, setState] = useState(mainState)
    const handleStates = (a: string) => {
        setState(prev => prev.map(({ item, state }, i) => ({ item, state: item == a ? !state : state })))
    }

    const [registeredBusinessName, setRegisteredBusinessName] = useForm('')
    const [businessDetails, setBusinessDetails] = useForm('')
    const [CAC, setCAC] = useForm('' as any)

    const [regulations, setRegulations] = useState(initialState)
    const handleClick = (a: any) => setRegulations(prev => prev.map(({ item, state }) => ({ item, state: item == a ? !state : state })));
    const [a, aFunc] = useToggle(true)
    const [b, bFunc] = useToggle(true)
    const handleAPI = async () => {
        console.log('handle API')
    }
    useEffect(() => {
        setCount(50)
        handleBtnFunc(handleAPI)
        return () => {
            handleBtnFunc(() => console.log('default'))
        }
    }, [regulations, uploadCount, states, registeredBusinessName, businessDetails, CAC])
    return (
        <div className='py-3'>
            <div className="py-5">
                <h2 className={`font-black text-[#1F2024] text-xl pb-2 ${interFont}`}>Select the right profile for your business.</h2>
                <p className={`text-[#71727A] ${openSansFont} pb-2`}>
                    We provide multiple options so feel free to get
                    super-specific!
                </p>
                <Link href={''} className='underline text-[#006FFD] text-sm'>View here</Link>
            </div>
            <div className="py-5 w-full">
                <div className="bg-[#F8F9FE] p-4 rounded-lg">
                    <div className="bg-white rounded-lg min-h-[97px] justify-center items-center flex">
                        <Circle size={48} count={uploadCount} period={100}>
                            <Icon icon='akar-icons:arrow-up' className='text-xl text-[--foreground-green] font-extrabold'></Icon>
                        </Circle>
                    </div>
                    <div className='flex py-2 items-center gap-2'>
                        <h3 className={`${poppinsFont} mr-auto`}>YOUR LOGO</h3>
                        <button className={`py-1 px-2 text-sm text-[#0C1F1F] bg-[#EAF2FF] rounded-[4px] ${openSansFont}`}>Upload Logo</button>
                        <Icon icon={`bi:chevron-down`} className='font-extrabold text-[#0C1F1F80]' />
                    </div>
                </div>

                <div className="py-5 flex flex-col gap-4">
                    <input type="text" id='businessName' onChange={e => setRegisteredBusinessName(e)} value={registeredBusinessName} required className='w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]' placeholder='Registered Business Name' />
                    <div>
                        <input type="text" id='businessName' onChange={e => setBusinessDetails(e)} value={businessDetails} required className='w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]' placeholder='Briefly describe your business' />
                        <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>0/30</p>
                    </div>
                    <div>
                        <input type="text" id='businessName' onChange={e => setCAC(e)} value={CAC} required className='w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]' placeholder='CAC Registration Number' />
                        <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>0/7</p>
                    </div>
                </div>
                <div className="border-[0.5px] border-[#D4D6DD] rounded-2xl p-4 mt-3">
                    <h1 className='flex gap-2 items-center pb-6'>
                        <span className="flex items-center justify-center rounded-full w-4 h-4 bg-[--foreground-green]">
                            <span className="flex items-center justify-center rounded-full bg-white h-[5px] w-[5px]"></span>
                        </span>
                        <span className={`text-[#71727A] text-sm font-bold ${openSansFont}`}>Consideration</span>
                    </h1>
                    <div className='flex flex-col gap-3'>
                        {regulations.map(({ item, state }, i) => (
                            <div
                                key={item}
                                className={`p-4 py-3 flex justify-between rounded-[12px] transition-all duration-300 border-[0.5px] ${state ? "bg-[#EAF2FF] border-transparent" : "bg-[#ffffff] border-[#C5C6CC]"
                                    } cursor-pointer`}
                                onClick={() => {
                                    handleClick(item);
                                }}
                            >
                                <p className="text-[14px] text-[#1F2024]">{item}</p>
                                {/* <div className="checkbox flex items-center">
                                <Icon
                                    icon="ph:check-bold"
                                    className={`text-[#006838] text-[14px] transition-all duration-300 ${state ? "opacity-100" : "opacity-0"}`}
                                ></Icon>
                            </div> */}
                            </div>
                        ))}
                    </div>
                </div>

                <Accordion title='State' subTitle='Available in Nigeria' batch={9} state={a} onClick={aFunc} border={false}>
                    {<div className='flex gap-2 flex-wrap'>
                        {states.map(({ item, state }) => (
                            <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleStates(item)}>{item}</button>
                        ))}
                    </div>}
                </Accordion>
                <Accordion title='City' subTitle='Available in Nigeria' state={b} onClick={bFunc} border={false} durations={500}>
                    <div className='w-full'>
                        <GoogleMapEmbed />
                    </div>
                </Accordion>

                <ProfileInfo />
            </div>
        </div>
    )
}

export default BusinessInfo