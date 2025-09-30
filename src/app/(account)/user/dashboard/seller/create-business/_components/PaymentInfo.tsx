import React, { FC, useEffect, useState } from 'react'
import interFont from '@/fonts/Inter'
import openSansFont from '@/fonts/OpenSans'
import general_type from './general.types'
import useForm from '@/hooks/useForm'
import { Icon } from '@iconify/react/dist/iconify.js'
import { ProfileInfo } from './Main'
import axios from "@/utils/axios";
import { showToast } from '@/utils/alert'

const PaymentInfo: FC<general_type> = ({ setCount, setSection, handleBtnFunc }) => {
    
    const [accountNumber, setAccountNumber] = useForm('')
    const [accountName, setAccountName] = useForm('')
    const [bankName, setBankName] = useForm('')
    const [accountType, setAccountType] = useState([
        { item: 'Savings', state: false },
        { item: 'Current', state: false },
    ])
    // const handleClick = (a: any) => setAccountType(prev => prev.map(({ item, state }) => ({ item, state: item == a ? !state : state })));
    const handleClick = (selectedType: string) => {
        setAccountType(prev =>
            prev.map(({ item }) => ({
                item,
                state: item === selectedType, // Only set the clicked item to true, all others to false
            }))
        );
    };
    const handleAPI = async () => {
        const selectedAccountType = accountType.find(({ state }) => state)?.item || null;
    
        axios({
            method: 'PUT',
            url: '/business/update-payment-info',
            data: {
                businessId: localStorage.getItem('addNewBusiness'),
                accountNumber: accountNumber,
                accountName: accountName,
                bankName: bankName,
                accountType: selectedAccountType, // Send only the selected item
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            }
        }).then((res) => {
            localStorage.setItem('addNewBusiness',res.data.business._id)
            showToast('success', res.data.message);
            // setSection(4);
            window.location.replace('./inventory');
        }).catch(err => {
            console.error(err);
            showToast('error', err.message);
        });
    }
    
    useEffect(() => {
        setCount(75)
        handleBtnFunc(handleAPI)
        return () => {
            handleBtnFunc(() => console.log('default'))
        }
    },);
    return (
        <div className='py-3'>
            <div className="py-5">
                <h2 className={`font-black text-[#1F2024] text-xl pb-2 ${interFont}`}>Select the right profile for your business.</h2>
                <p className={`text-[#71727A] ${openSansFont} pb-2`}>
                    We provide multiple options so feel free to get
                    super-specific!
                </p>
            </div> 

            <div className="border-[0.5px] border-[#D4D6DD] rounded-2xl p-4 mt-3">
                <h1 className='flex gap-2 items-center pb-6'>
                    <span className="flex items-center justify-center rounded-full w-4 h-4 bg-[--foreground-green]">
                        <span className="flex items-center justify-center rounded-full bg-white h-[5px] w-[5px]"></span>
                    </span>
                    <span className={`text-[#71727A] text-sm font-bold ${openSansFont}`}>Bank Account</span>
                </h1>

                <div className='pb-3'>
                    <input type="number" id='AccountNumber' onChange={e => setAccountNumber(e)} value={accountNumber} maxLength={10} required className='w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]' placeholder='Bank Account Number' />
                    <p className={`text-xs pt-2 text-[#8F9098] ${openSansFont}`}>0/10</p>
                </div>
                <input type="text" id='AccountName' onChange={e => setAccountName(e)} value={accountName} required className='w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]' placeholder='Account Name' />
                <input type="text" id='bankName' onChange={e => setBankName(e)} value={bankName} required className='w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]' placeholder='Bank Name' />

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
            {/* <ProfileInfo /> */}
        </div>
    )
}

export default PaymentInfo