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
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";
import Image from 'next/image'


const mainState = [
    { item: 'KILOGRAMS (KG)', state: false },
    { item: 'GRAMS (G)', state: false },
    { item: 'TONNES (T)', state: false },
    { item: 'POUNDS (LBS)', state: false },
    { item: 'OUNCES (OZ)', state: false },
]
const QualityTypeState = [
    { item: 'WEIGHT', state: false },
    { item: 'VOLUME', state: false },
    { item: 'UNIT', state: false },
    { item: 'LENGTH', state: false },
    { item: 'AREA', state: false },
    { item: 'SPECIALIZED', state: false },
    { item: 'OTHER', state: false },
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
    const [uploadCount, setuploadCount] = useState(0)
    const [file, setFile] = useState<File | null >(null)
    const [states, setState] = useState(mainState)
    const handleStates = (a: string) => {
        setState(prev => prev.map(({ item, state }, i) => ({ item, state: item == a ? !state : state })))
    }    
    const [qualityType, setQualityType] = useState(QualityTypeState)
    const handleQuantityType = (a: string) => {
        setState(prev => prev.map(({ item, state }, i) => ({ item, state: item == a ? !state : state })))
    }

    const [registeredBusinessName, setRegisteredBusinessName] = useForm('')
    const [description, setDescription] = useForm('')

    // const [regulations, setRegulations] = useState(initialState)
    // const handleClick = (a: any) => setRegulations(prev => prev.map(({ item, state }) => ({ item, state: item == a ? !state : state })));
    const [a, aFunc] = useToggle(true)
    const [b, bFunc] = useToggle(true)
    const handleAPI = async () => {
        setSection(3);
        // axios({
        //     method: 'PUT',
        //     url: '/business/add-business-info',
        //     data: {
                
        //     },
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        //     }
        // }).then((res)=>{
        //     showToast('success', res.data.message);
        //     setSection(3);
        // }).catch(err => {
        //     console.error(err);
        //     showToast( 'error', err.message)
        // })
    }
    useEffect(() => {
        setCount(50)
        handleBtnFunc(handleAPI)
        return () => {
            handleBtnFunc(() => console.log('default'))
        }
    }, [uploadCount, states, registeredBusinessName, description])
    return (
        <div className='py-3'>

            <div className="py-5 w-full">
                {/* <div className="bg-[#F8F9FE] p-4 rounded-lg">
                    <div className="bg-white rounded-lg min-h-[97px] justify-center items-center flex">
                        <input type="file" name="logo" id="logo" accept="image/*" className='hidden' onChange={(e:any) => setFile(e.target.files[0])} />
                        <label htmlFor="logo">
                            <Circle size={48} count={uploadCount} period={100}>
                                <Icon icon='akar-icons:arrow-up' className='text-xl text-[--foreground-green] font-extrabold'></Icon>
                            </Circle>
                        </label>
                    </div>
                    <div className='flex py-2 items-center gap-2'>
                        <h3 className={`${poppinsFont} mr-auto`}>YOUR LOGO</h3>
                        <label htmlFor={'logo'} className={`py-1 px-2 text-sm text-[#0C1F1F] bg-[#EAF2FF] rounded-[4px] ${openSansFont}`}>Upload Logo</label>
                        <Icon icon={`bi:chevron-down`} className='font-extrabold text-[#0C1F1F80]' />
                    </div>
                </div> */}

<Accordion title='Quantity Type' subTitle='Available in Nigeria' batch={9} state={a} onClick={aFunc} border={false}>
                    {<div className='flex gap-2 flex-wrap'>
                        {qualityType.map(({ item, state }) => (
                            <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleStates(item)}>{item}</button>
                        ))}
                    </div>}
                </Accordion>

                <Accordion title='Quantity Unit' subTitle='Available in Nigeria' batch={9} state={a} onClick={aFunc} border={false}>
                    {<div className='flex gap-2 flex-wrap'>
                        {states.map(({ item, state }) => (
                            <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleStates(item)}>{item}</button>
                        ))}
                    </div>}
                </Accordion>

                <div className="py-5 flex flex-row gap-4">

                    
                <div className='w-[80%]'>
                        <input type="text" id='CAC'  value={'KG 40'} required className='w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]' placeholder='CAC Registration Number' />
                        <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>Unit Amount</p>
                    </div>
                    <div className='w-[15%]'>
                        <input type="text" id='CAC'  value={'45'} required className='w-full px-4 py-3 rounded-xl outline-none bg-[#EAF2FF] border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]' placeholder='CAC Registration Number' />
                        <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>QTY</p>
                    </div>
                </div>


                {/* <Accordion title='State' subTitle='Available in Nigeria' batch={9} state={a} onClick={aFunc} border={false}>
                    {<div className='flex gap-2 flex-wrap'>
                        {states.map(({ item, state }) => (
                            <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl uppercase ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleStates(item)}>{item}</button>
                        ))}
                    </div>}
                </Accordion> */}
               

                {/* <ProfileInfo /> */}
            </div>
        </div>
    )
}

export default BusinessInfo