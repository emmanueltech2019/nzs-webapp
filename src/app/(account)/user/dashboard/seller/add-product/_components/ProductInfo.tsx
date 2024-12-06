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
import { Icon } from '@iconify/react/dist/iconify.js'



const sector = [
    { item: 'Health', state: false },
    { item: 'Hospitality', state: false },
    { item: 'Education', state: false },
    { item: 'Legal', state: false },
    { item: 'Logistics', state: false },
]
const productType = [
    { item: 'Editble', state: false },
    { item: 'Wears', state: false },
    { item: 'Eqipment', state: false },
    { item: 'Stationaries', state: false },
]
const color = [
  
    { item: 'WHILE', state: false },
    { item: 'BLACK', state: false },
    { item: 'GRAY', state: false },
    { item: 'YELLOW', state: false },
    { item: 'BLUE', state: false },
    { item: 'PURPLE', state: false },
    { item: 'GREEN', state: false },
    { item: 'RED', state: false },
    { item: 'PINK', state: false },
    { item: 'ORANGE', state: false },
    { item: 'GOLD', state: false },
    { item: 'SILVER', state: false },
]


const BusinessDescription:FC<general_type> = ({handleBtnFunc, setCount, setSection}) => {
    const [a, aFunc] = useToggle(true)
    const [b, bFunc] = useToggle(true)
    const [productName, setProductName] = useState("")
    const [productDescription, setProductDescription] = useState("")

    const [productTypetate, setproductTypetate] = useState(productType)
    const handleSector = (a: string) => {
        setproductTypetate(prev => prev.map(({ item, state }, i) => ({ item, state: item == a ? !state : state })))
    }

    const [colorState, setcolorState] = useState(color)
    const handleCategory = (a: string) => {
        setcolorState(prev => prev.map(({ item, state }, i) => ({ item, state: item == a ? !state : state })))
    }
    const [handlingType, setHandlingType] = useState([
        { item: 'Fragile', state: false },
        { item: 'Perishable', state: false },
    ])
    const handleClick = (a: any) => setHandlingType(prev => prev.map(({ item, state }) => ({ item, state: item == a ? !state : state })));
    const handleAPI = async () => {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
            showToast('error', 'User token not found');
            return;
        }
    
        let productType = productTypetate.filter(s => s.state).map(({ item }) => item);
        let color = colorState.filter(c => c.state).map(({ item }) => item);
        let selectedProductTypes = productTypetate.filter(s => s.state).map(({ item }) => item);
        let selectedColors = colorState.filter(c => c.state).map(({ item }) => item);
        let selectedHandlingTypes = handlingType.filter(h => h.state).map(({ item }) => item);
        if (productType && color.length) { // Both need to be non-empty
            try {
                console.log({productName, color:selectedColors, productDescription, productType:selectedProductTypes, handlingType:selectedHandlingTypes})
                // console.log(product)
                // const res = await axios({
                //     method: "POST",
                //     url: "/vendor/create",
                //     data: {  },
                //     headers: {
                //         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                //     },
                // });
                // console.log(res.data);
                // showToast('success', res.data.message);
                // setSection(2);
            } catch (err) {
                console.error(err);
                // showToast('error', err.message || 'An error occurred');
            }
        } else {
            showToast('error', 'Please select both productType and color');
        }
    };
    
    // const handleAPI = async () => {
    //     // const userToken = localStorage.getItem("userToken") || ''
    //     // const tr = JSON.parse(userToken)

    //     let productType = productTypetate.filter(s => s.state).map(({ item }) => item)
    //     let color = colorState.filter(c => c.state).map(({ item }) => item)
    //     // (productTypetate.filter(s => s.state).length == 0 || colorState.filter(c => c.state).length == 0)
    //     if (productType.length || color.length) {
    //         axios({
    //             method: "PUT",
    //             url: "/business/select-productType-color",
    //             data: {
    //                 productType: productType,
    //                 color: color,
    //             },
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    //             },
    //         }).then(res => {
    //             console.log(res.data)
    //             showToast('success', res.data.message)
    //             setSection(2)
    //         }).catch(err => {
    //             console.log(err)
    //             showToast('error', err.message)
    //         })
    //     } else {
    //         showToast('error', 'Please select productType and color')
    //         return
    //     }
    // }
    useEffect(() => {
        setCount(25);
        handleBtnFunc(handleAPI)
        return () => {
            handleBtnFunc(() => console.log('default'))
        }
    },[productTypetate, colorState])
    return (
        <div className='py-3 pb-5 '>

                <div className='pb-3'>
                    <input type="text" id='productName' value={productName} onChange={(e)=>setProductName(e.target.value)} required className='w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]' placeholder='Product Name' />
                    <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>0/10</p>
                </div>
                <div className='pb-3'>
                    <input type="text" id='productDescription' value={productDescription} onChange={(e)=>setProductDescription(e.target.value)}  required className='w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]' placeholder='Description' />
                    <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>0/10</p>
                </div>
            <Accordion title='Product Type' subTitle='Select up to 2 options' onClick={aFunc} state={a} batch={11}>
                <div className='flex gap-2 flex-wrap'>
                    {productTypetate.map(({ item, state }) => (
                        <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleSector(item)}>{item}</button>
                    ))}
                </div>
            </Accordion>
            <Accordion title='Color' subTitle='Select up up to' onClick={bFunc} state={b} batch={10}>
                <div className='flex gap-3 flex-wrap'>
                    {colorState.map(({ item, state }) => (
                        <button key={item} className={`px-4 py-[6px] text-3 rounded-2xl ${state ? 'bg-[--foreground-green] text-white' : 'bg-[#EAF2FF] text-[--foreground-green]'}`} onClick={() => handleCategory(item)}>{item}</button>
                    ))}
                </div>
            </Accordion>
           
            <div className="border-[0.5px] border-[#D4D6DD] rounded-2xl p-4 mt-3">
                <h1 className='flex gap-2 items-center pb-6'>
                    <span className="flex items-center justify-center rounded-full w-4 h-4 bg-[--foreground-green]">
                        <span className="flex items-center justify-center rounded-full bg-white h-[5px] w-[5px]"></span>
                    </span>
                    <span className={`text-[#71727A] text-sm font-bold ${openSansFont}`}>Special Handling</span>
                </h1>

               
                <div className='flex flex-col gap-3 py-3'>
                    {handlingType.map(({ item, state }, i) => (
                        <div
                            key={item}
                            className={`p-4 py-3 flex justify-between rounded-[12px] transition-all duration-300 border-[0.5px] ${state ? "bg-[#EAF2FF] border-transparent" : "bg-[#ffffff] border-[#C5C6CC]"
                                } cursor-pointer`}
                            onClick={() => {
                                handleClick(item);
                            }}
                        >
                            <p className="text-[14px] text-[#1F2024]">{item}</p>
                            <div className="checkbox flex items-center">
                                <Icon
                                    icon="ph:check-bold"
                                    className={`text-[#006838] text-[14px] transition-all duration-300 ${state ? "opacity-100" : "opacity-0"}`}
                                ></Icon>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <ProfileInfo /> */}
        </div>
    )
}

export default BusinessDescription