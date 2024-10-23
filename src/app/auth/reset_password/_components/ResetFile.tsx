'use client'
import TagHeader from '@/components/header/TagHeader'
import openSansFont from '@/fonts/OpenSans'
import useForm from '@/hooks/useForm'
import React, { useState } from 'react'
import Circle from './Circle'
import axios from '@/utils/axios'
import { showToast } from '@/utils/alert'
import useToggle from '@/hooks/useToggle'
import { Icon } from '@iconify/react/dist/iconify.js'
import interFont from '@/fonts/Inter'
import { useRouter } from 'next/navigation'

type eventType = React.MouseEvent<HTMLButtonElement, MouseEvent>
const eyeslash = 'heroicons:eye-slash-20-solid'
const eye = 'mdi:eye'

const ResetFile = () => {
    const router = useRouter()
    const [count, setCount] = useState(60)
    const [loading, setLoading] = useState(false)
    const [sections, setSections] = useState<'first' | 'second' | 'done'>('second')
    const [emailState, setemail] = useForm('')
    const [tpswd, tpswdFunc] = useToggle(false)
    const [tpswd2, tpswdFunc2] = useToggle(false)
    const [pwdState, setpwd] = useForm('')
    const [pwdState2, setpwd2] = useForm('')
    const [VCode, setVCode] = useState<number[]>(new Array(4).fill(""));
    const handleChange = (e: any, i: any) => {
        if (isNaN(e.target.value)) return false;
        setVCode([
            ...VCode.map((data, indx) => (indx === i ? e.target.value : data)),
        ]);
        if (e.target.value && e.target.nextSibling) e.target.nextSibling.focus();
        if (!e.target.value && e.target.previousSibling)
            e.target.previousSibling.focus();
    };
    // Handle pasting OTP
    const handlePaste = (e: any) => {
        const pasteData = e.clipboardData.getData('text');
        const pasteValues = pasteData.split('').slice(0, 4);  // Limiting to 4 digits
        if (pasteValues.length === 4 && pasteValues.every((char: any) => !isNaN(char))) {
            setVCode(pasteValues);
        }
    };

    // to GetCode from the server
    const getCode = async () => {
        if (!emailState) {
            console.log('add your email address please');
            return;
        }
        // Send email to the user with OTP
        if (count === 60) {
            setLoading(true);
            axios({
                method: 'POST',
                url: 'auth/reset-request',
                data: { email: emailState },
            }).then(res => {
                // Then set count to 60 and start timer
                setCount(60);
                const timer = setInterval(() => {
                    setCount((prevCount) => {
                        if (prevCount === 1) {
                            clearInterval(timer); // Stop the timer when count reaches 0
                            return 60;
                        }
                        return prevCount - 1 >= 0 ? prevCount - 1 : 0; // Ensure it doesn't go below 0
                    });
                }, 1000);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false)
            })
        }
        else console.log('timer has started')
    }

    // To submit the the code sent from the server
    const handleSbmit = async (e: eventType) => {
        e.preventDefault();

        let result: string = "";
        VCode.forEach((a) => {
            if (!a) {
                console.log("Please fill all fields");
            } else {
                result += a;
            }
        });
        if (!result || result.length !== 4) {
            console.log("Please fill all fields");
            return;
        }
        let res: number = Number(result);

        // TODO: validate code and Display the next Screen
        axios({
            method: "POST",
            url: `/auth/verify-reset-code/`,
            data: {
                code: result
            },
        }).then(response => {
            showToast('success', response.data.message)
            localStorage.setItem('reset_password_code', JSON.stringify(res))
            setSections('second')
        }).catch(err => {
            console.log(err)
        })

        // TODO: clear VCode state
        setVCode(new Array(4).fill(""));
    };

    // handles reset password and route to next page
    const handleConfirm = async (e: eventType) => {
        let code = localStorage.getItem('reset_password_code') || '';
        code = JSON.parse(code);
        const data = { email: emailState, resetCode: code, newPassword: pwdState, confirmPassword: pwdState2 }
        if (data.newPassword !== data.confirmPassword) {
            showToast('error', 'Passwords do not match')
            return
        }
        // TODO: reset password and display the success message
        axios({
            method: "POST",
            url: `/auth/reset-password/`,
            data: data,
        }).then(response => {
            showToast('success', response.data.message)
            localStorage.removeItem('reset_password_code')
            setSections('done')
            router.push('/user/dashboard')
        }).catch(err => {
            console.log(err)
            showToast('error', 'Failed to reset password')
        })
    }
    return (
        <section className='px-6 lg:px-16 py-8 lg:py-11 bg-[--foreground-light-green] rounded-[21px] lg:rounded-[18px]'>
            <TagHeader title='Reset Password' />
            <div className="row flex items-center justify-evenly gap-5 pb-3">
                <div className="col flex items-center flex-col gap-[9px]">
                    <div className={`flex items-center justify-center leading-0 rounded-full w-6 h-6 text-xs font-semibold text-white ${sections == 'first' ? 'bg-[--foreground-green]' : 'bg-[--icon-light-green3]'}`}>
                        {sections == 'first' ? 1 : <Icon icon='ph:check-bold' className='text-[--foreground-green] font-bold' />}
                    </div>
                    <p className={`text-center font-bold ${sections != 'first' && 'text-[#8F9098]'}`}>Confirm<br /> Reset</p>
                </div>
                <div className="col flex items-center flex-col gap-[9px]">
                    <div className={`flex items-center justify-center leading-0 rounded-full w-6 h-6 text-xs font-semibold ${sections == 'first' ? 'bg-white text-[#8F9098]' : sections == 'second' ? 'bg-[--foreground-green] text-white' : 'bg-[--icon-light-green3]'}`}>
                        {sections == 'first' || sections == 'second' ? 2 : <Icon icon='ph:check-bold' className='text-[--foreground-green] font-bold' />}
                    </div>
                    <p className={`text-center font-bold ${sections != 'second' && 'text-[#8F9098]'}`}>Input New<br /> Password</p>
                </div>
            </div>

            {sections == 'first' ?
                (<div className='first_section'>
                    <div className="p-[18px]">
                        <h2 className='font-black text-[#1F2024] tracking-tight text-xl pb-2'>Provide your Sign Up Email</h2>
                        <p className={`text-[#71727A] ${openSansFont}`}>
                            Use only the mail you created your Naijazone account with...
                        </p>
                    </div>
                    <div className="p-3">
                        <input type="text" id='email' onChange={e => setemail(e)} value={emailState} required className='w-full pl-7 pr-2 py-3 mb-3 rounded-lg text-sm outline-none bg-inherit border-[0.67px] border-[#666666] placeholder:text-[--text-color-gray]' placeholder='someone@gmail.com' />
                        <div className="flex items-center justify-between">
                            <button className={`text-xs text-[#0C1F1F] ${openSansFont} py-1 px-[6px] rounded bg-[#0C1F1F0F]`} onClick={getCode}>GET CODE</button>
                            <div className="">
                                <Circle count={count}>
                                    <p className={`text-[#1F2024] text-sm font-black ${interFont}`}>{count}</p>
                                </Circle>
                            </div>
                        </div>
                    </div>
                    <div className="py-[33.4px]">
                        <h2 className='font-black text-[#1F2024] tracking-tight text-xl pb-2 text-center'>Enter confirmation code</h2>
                        <p className={`text-[#71727A] text-center ${openSansFont} pb-[30px]`}>
                            A 4-digit code was sent to<br /> {emailState || 'someone@gmail.com'}
                        </p>

                        <div className="code-f flex justify-center items-center gap-2" onPaste={handlePaste}>
                            {VCode.map((data, i) => (
                                <input
                                    title={`OTP_Code_${i}`}
                                    key={"input_" + i}
                                    type="text"
                                    id="N1"
                                    value={data}
                                    maxLength={1}
                                    className="w-[48px] md:w-[69.68px] h-[48px] md:h-[69.68px] text-base text-center lg:text-lg rounded-[12px] md:rounded-[17.42px] bg-transparent border-[1.45px] border-[#C5C6CC] p-[12px] md:py-[17.42px] px-[18px] md:px-[23.23px] outline-[--foreground-green]"
                                    onInput={(e) => {
                                        handleChange(e, i);
                                    }}
                                    onKeyDown={(e: any) => { if (e.key === 'Backspace' && !data && e.target.previousSibling) e.target.previousSibling.focus(); }}
                                />
                            ))}
                        </div>
                    </div>
                    <button onClick={handleSbmit}
                        className="rounded-[12px] mt-3 py-5 px-4 text-base font-semibold leading-[14.52px] text-center block w-full bg-[--foreground-green] text-white scale-100 hover:scale-90 transition-all duration-500"
                    >
                        Next
                    </button>
                </div>)
                :
                (<div className="second_secion">
                    <div className="py-6 px-4">
                        <h2 className='font-black text-[#1F2024] tracking-tight text-xl pb-2'>Please type in your new Password</h2>
                        <p className={`text-[#71727A] ${openSansFont}`}>
                            Use only the mail you created your Naijazone account with...
                        </p>
                    </div>
                    <div className="py-3 px-3">
                        <div className="relative">
                            <span className="flex items-center gap-2 cursor-pointer absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2" onClick={tpswdFunc}>
                                <Icon icon={tpswd ? eye : eyeslash} className="inline" />
                            </span>
                            <input type={tpswd ? 'text' : 'password'} id='pswd' onChange={e => setpwd(e)} value={pwdState} required className='w-full pl-7 pr-7 py-3 rounded-[9.3px] text-sm outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[--text-color-gray]' placeholder='.*****' />
                        </div>

                        <label htmlFor="retype_password" className={`pt-3 pb-2 ${openSansFont} font-bold block`}>Retype Password</label>

                        <div className="relative">
                            <span className="flex items-center gap-2 cursor-pointer absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2" onClick={tpswdFunc2}>
                                <Icon icon={tpswd2 ? eye : eyeslash} className="inline" />
                            </span>
                            <input type={tpswd2 ? 'text' : 'password'} id='retype_password' onChange={e => setpwd2(e)} value={pwdState2} required className='w-full pl-7 pr-7 py-3 rounded-[9.3px] text-sm outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[--text-color-gray]' placeholder='.*****' />
                        </div>
                    </div>

                    <button onClick={handleConfirm}
                        className="rounded-[12px] mt-3 py-5 px-4 text-base font-semibold leading-[14.52px] text-center block w-full bg-[--foreground-green] text-white scale-100 hover:scale-90 transition-all duration-500"
                    >
                        CONFIRM
                    </button>
                </div>)}
        </section>
    )
}

export default ResetFile