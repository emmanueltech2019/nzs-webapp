import { useEffect, useState, FC } from 'react'
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";
import useToggle from '@/hooks/useToggle'
import Accordion from './Accordion'
import {ProfileInfo} from './Main'
import interFont from '@/fonts/Inter'
import openSansFont from '@/fonts/OpenSans'
import { useRouter } from "next/navigation";
import general_type from './general.types';



const sector = [
    { item: 'Health', state: false },
    { item: 'Hospitality', state: false },
    { item: 'Education', state: false },
    { item: 'Legal', state: false },
    { item: 'Logistics', state: false },
]
const category = [
    { item: 'Clothing & Footwear', state: false },
    { item: 'Tailoring & Custom Designs', state: false },
    { item: 'Textile Materials', state: false },
    { item: 'Fashion Accessories & Jewelry', state: false },
]


const BusinessDescription:FC<general_type> = ({handleBtnFunc, setCount, setSection}) => {
    const [a, aFunc] = useToggle(true)
    const [b, bFunc] = useToggle(true)

    const [sectorState, setSectorState] = useState(sector)
    const handleSector = (a: string) => {
        setSectorState(prev => prev.map(({ item, state }, i) => ({ item, state: item == a ? !state : state })))
    }

    const [categoryState, setCategoryState] = useState(category)
    const handleCategory = (a: string) => {
        setCategoryState(prev => prev.map(({ item, state }, i) => ({ item, state: item == a ? !state : state })))
    }


    const handleAPI = async () => {
        const userToken = localStorage.getItem("userToken") || ''
        const tr = JSON.parse(userToken)

        let sectors = sectorState.filter(s => s.state).map(({ item }) => item)
        let categories = categoryState.filter(c => c.state).map(({ item }) => item)
        // (sectorState.filter(s => s.state).length == 0 || categoryState.filter(c => c.state).length == 0)
        if (sectors.length || categories.length) {
            axios({
                method: "PUT",
                url: "/business/select-sectors-categories",
                data: {
                    sectors: sectors,
                    categories: categories,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }).then(res => {
                console.log(res.data)
                showToast('success', res.data.message)
                setSection(2)
            }).catch(err => {
                console.log(err)
                showToast('error', err.message)
            })
        } else {
            showToast('error', 'Please select sectors and categories')
            return
        }
    }
    useEffect(() => {
        setCount(25)
        handleBtnFunc(handleAPI)
        return () => {
            handleBtnFunc(() => console.log('default'))
        }
    },[sectorState, categoryState])
    return (
        <div className='py-3'>
            <div className="py-5">
                <h2 className={`font-black text-[#1F2024] text-xl pb-2 ${interFont}`}>Select the right profile for your business.</h2>
                <p className={`text-[#71727A] ${openSansFont}`}>
                    We provide multiple options so feel free to get
                    super-specific!
                </p>
            </div>

            <Accordion title='Sector' subTitle='Select up to 2 options' onClick={aFunc} state={a} batch={11}>
                <div className='flex gap-2 flex-wrap'>
                    {sectorState.map(({ item, state }) => (
                        <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleSector(item)}>{item}</button>
                    ))}
                </div>
            </Accordion>
            <Accordion title='Category' subTitle='Select up up to' onClick={bFunc} state={b} batch={10}>
                <div className='flex gap-3 flex-wrap'>
                    {categoryState.map(({ item, state }) => (
                        <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleCategory(item)}>{item}</button>
                    ))}
                </div>
            </Accordion>
            <ProfileInfo />
        </div>
    )
}

export default BusinessDescription