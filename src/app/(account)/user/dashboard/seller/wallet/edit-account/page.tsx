"use client"
import React, { FC, useEffect, useState } from 'react'
import interFont from '@/fonts/Inter'
import openSansFont from '@/fonts/OpenSans'
// import general_type2 from '../components/general.types'
import useForm from '@/hooks/useForm'
import { Icon } from '@iconify/react/dist/iconify.js'
// import { ProfileInfo } from './Main'
import axios from "@/utils/axios";
import { showToast } from '@/utils/alert'
import Header from '@/components/header/TagHeader'
type general_type2 = {
    setCount: (value: number) => void;
    setSection: (value: number) => void;
    handleBtnFunc: (callback: () => void) => void;
  }
const PaymentInfo: FC<general_type2> = ({ setCount, setSection, handleBtnFunc }) => {
    
    const [accountNumber, setAccountNumber] = useForm('')
    const [accountName, setAccountName] = useForm('')
    const [accountType, setAccountType] = useState([
        { item: 'Savings', state: false },
        { item: 'Current', state: false },
    ])
    const handleClick = (a: any) => setAccountType(prev => prev.map(({ item, state }) => ({ item, state: item == a ? !state : state })));
    const handleAPI = async () => {
        const selectedAccountType = accountType.find(({ state }) => state)?.item || null;
    
        axios({
            method: 'PUT',
            url: '/business/update-payment-info',
            data: {
                accountNumber: accountNumber,
                accountName: accountName,
                accountType: selectedAccountType, // Send only the selected item
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            }
        }).then((res) => {
            showToast('success', res.data.message);
            setSection(4);
        }).catch(err => {
            console.error(err);
            showToast('error', err.message);
        });
    }
    
    useEffect(() => {
        // setCount(75)
        // handleBtnFunc(handleAPI)
        // return () => {
        //     handleBtnFunc(() => console.log('default'))
        // }
    },);
    return (
        <div className='py-3 px-4'>
            <Header title='Edit account'/>

            <div className="py-5">
                <h2 className={`font-black text-[#1F2024] text-xl pb-2 ${interFont}`}>Edit Your Payment Details.</h2>
                <p className={`text-[#71727A] ${openSansFont} pb-2`}>
                Any functioning bank account will do.
                </p>
            </div> 

            <div className="border-[0.5px] border-[#D4D6DD] rounded-2xl p-4 mt-3">
                <h1 className='flex gap-2 items-center pb-6'>
                    {/* <span className="flex items-center justify-center rounded-full w-4 h-4 bg-[--foreground-green]">
                        <span className="flex items-center justify-center rounded-full bg-white h-[5px] w-[5px]"></span>
                    </span> */}
                    <span className={`text-[#71727A] text-sm font-bold ${openSansFont}`}>Bank Account</span>
                </h1>

                <div className='pb-3'>
                    <input type="text" id='businessName' onChange={e => setAccountNumber(e)} value={accountNumber} required className='w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]' placeholder='Bank Account Number' />
                    <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>0/10</p>
                </div>
                <input type="text" id='businessName' onChange={e => setAccountName(e)} value={accountName} required className='w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]' placeholder='Account Name' />
            </div>
            <div className="border-[0.5px] border-[#D4D6DD] rounded-2xl p-4 mt-3">
                <h1 className='flex gap-2 items-center pb-6'>
                    <span className="flex items-center justify-center rounded-full w-4 h-4 bg-[--foreground-green]">
                        <span className="flex items-center justify-center rounded-full bg-white h-[5px] w-[5px]"></span>
                    </span>
                    <span className={`text-[#71727A] text-sm font-bold ${openSansFont}`}>Account Type</span>
                </h1>

               
                <div className='flex flex-col gap-3 py-3'>
                    {accountType.map(({ item, state }, i) => (
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
            <button className="w-full bg-green-800 text-white py-3 rounded-full font-semibold mt-4 mb-10">
        SAVE
      </button>
        </div>
    )
}

export default PaymentInfo