'use client';
import { Icon } from '@iconify/react/dist/iconify.js'
import useToggle from '@/hooks/useToggle'
import Link from 'next/link'

const Details = () => {
    const [pState, pFunc] = useToggle(false)
    return (
        <section className='details-section relative px-[--padding-x] mb-[60px] lg:mb-[133px]'>
            <div className="period pt-16 lg:pt-24 pb-7 lg:pb-14 flex justify-center items-center gap-3">
                <p className='text-xs md:text-sm'>Monthly</p>
                <button className={`period-activate`} onClick={pFunc}>
                    <div className={`w-[56.09px] h-[29.68px] bg-[--foreground-green] rounded-[18.13px] relative flex items-center`}>
                        <div className={`circle w-[18.89px] h-[18.89px] rounded-full bg-white mx-[5px] ${pState?'ml-[54%]':''} transition-all duration-500`}></div>
                    </div>
                </button>
                <p className='text-xs md:text-sm'>Yearly</p>
                <span className="bg-[#3CD856] text-[--foreground-green] px-3 py-[5px] text-sm rounded-[5px] font-bold">Best Value</span>
            </div>

            <div className="details-card-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5 xl:gap-7">
                <div className="card py-9 px-12 bg-white rounded-[34px] w-full border-[0.98px] border-[#E7E9ED]">
                    <div className="card-title">
                        <h1 className='text-[--foreground-green] text-sm font-bold lg:text-base pb-10'>STANDARD</h1>
                        <div className={`text-[#161C2D] text-base`}>
                            <span className={`font-bold text-xl`}>$</span>
                            <span className={`font-bold text-4xl`}>49</span>
                            <span className={`ml-2`}>/{pState?"year":"month"}</span>
                        </div>
                        <p className={`mt-2 text-sm text-[--text-color-gray]`}>billed {pState?"yearly":"monthly"}</p>
                    </div>
                    <div className="card-body pt-9">
                        <ul className={`flex flex-col gap-[14px]`}>
                            <li className={`flex gap-7 items-center`}>
                                <span><Icon icon="ph:check-bold" className={`text-[--icon-light-green3]`} /></span>
                                <span>Commercial</span>
                            </li>
                            <li className={`flex gap-7 items-center`}>
                                <span><Icon icon="ph:check-bold" className={`text-[--icon-light-green3]`} /></span>
                                <span>100+ HTML UI Elements</span>
                            </li>
                            <li className={`flex gap-7 items-center`}>
                                <span><Icon icon="ph:check-bold" className={`text-[--icon-light-green3]`} /></span>
                                <span>Unlimited Domain Support</span>
                            </li>
                            <li className={`flex gap-7 items-center`}>
                                <span><Icon icon="ph:check-bold" className={`text-[--icon-light-green3]`} /></span>
                                <span>6 Month Premium Support</span>
                            </li>
                            <li className={`text-[--text-color-gray] flex gap-7 items-center`}>
                                <span><Icon icon="maki:cross" className={`opacity-70`} /></span>
                                <span>Lifetime Updates</span>
                            </li>
                        </ul>
                        <div className="my-5">
                            <Link href={`/auth/login`} className='px-7 py-4 bg-[--foreground-green] text-white text-base lg:text-lg font-bold rounded-lg block w-max'>
                                <div className="flex items-center gap-8">
                                    <span>Start Free Trial</span>
                                    <span className='flex'><Icon icon="maki:arrow" className='inline my-auto' /></span>
                                </div>
                            </Link>
                        </div>
                        <p className='text-sm lg:text-base text-[--text-color-gray]'>No credit card required</p>
                    </div>
                </div>
                <div className="card py-9 px-12 bg-[--foreground-light-orange] rounded-[34px] w-full">
                    <div className="card-title">
                        <h1 className='text-[--foreground-green] text-sm font-bold lg:text-base pb-10'>STANDARD</h1>
                        <div className={`text-[#161C2D] text-base`}>
                            <span className={`font-bold text-xl`}>$</span>
                            <span className={`font-bold text-4xl`}>49</span>
                            <span className={`ml-2`}>/{pState?"year":"month"}</span>
                        </div>
                        <p className={`mt-2 text-sm text-[--text-color-gray]`}>billed {pState?"yearly":"monthly"}</p>
                    </div>
                    <div className="card-body pt-9">
                        <ul className={`flex flex-col gap-[14px]`}>
                            <li className={`flex gap-7 items-center`}>
                                <span><Icon icon="ph:check-bold" className={`text-[--icon-light-green3]`} /></span>
                                <span>Commercial</span>
                            </li>
                            <li className={`flex gap-7 items-center`}>
                                <span><Icon icon="ph:check-bold" className={`text-[--icon-light-green3]`} /></span>
                                <span>100+ HTML UI Elements</span>
                            </li>
                            <li className={`flex gap-7 items-center`}>
                                <span><Icon icon="ph:check-bold" className={`text-[--icon-light-green3]`} /></span>
                                <span>Unlimited Domain Support</span>
                            </li>
                            <li className={`flex gap-7 items-center`}>
                                <span><Icon icon="ph:check-bold" className={`text-[--icon-light-green3]`} /></span>
                                <span>6 Month Premium Support</span>
                            </li>
                            <li className={`text-[--text-color-gray] flex gap-7 items-center`}>
                                <span><Icon icon="maki:cross" className={`opacity-70`} /></span>
                                <span>Lifetime Updates</span>
                            </li>
                        </ul>
                        <div className="my-5">
                            <Link href={`/auth/login`} className='px-7 py-4 bg-[--foreground-green] text-[--foreground-light-orange] text-base lg:text-lg font-bold rounded-lg block w-max'>
                                <div className="flex items-center gap-8">
                                    <span>Start Free Trial</span>
                                    <span className='flex'><Icon icon="maki:arrow" className='inline my-auto' /></span>
                                </div>
                            </Link>
                        </div>
                        <p className='text-sm lg:text-base text-[--text-color-gray]'>No credit card required</p>
                    </div>
                </div>
                <div className="card md:col-span-2 lg:col-auto py-9 px-12 bg-[--foreground-green] text-white rounded-[34px] w-full md:w-auto lg:w-full">
                    <div className="card-title">
                        <h1 className='text-[--foreground-orange] text-sm font-bold lg:text-base pb-10'>STANDARD</h1>
                        <div className={`text-base`}>
                            <span className={`font-bold text-xl text-[--foreground-orange]`}>$</span>
                            <span className={`font-bold text-4xl text-[--foreground-orange]`}>49</span>
                            <span className={`ml-2`}>/ {pState?"year":"month"}</span>
                        </div>
                        <p className={`mt-2 text-sm text-[--text-color-light-gray]`}>billed {pState?"yearly":"monthly"}</p>
                    </div>
                    <div className="card-body pt-9">
                        <ul className={`flex flex-col gap-[14px]`}>
                            <li className={`flex gap-7 items-center`}>
                                <span><Icon icon="ph:check-bold" className={`text-[--icon-light-green3]`} /></span>
                                <span>Commercial</span>
                            </li>
                            <li className={`flex gap-7 items-center`}>
                                <span><Icon icon="ph:check-bold" className={`text-[--icon-light-green3]`} /></span>
                                <span>100+ HTML UI Elements</span>
                            </li>
                            <li className={`flex gap-7 items-center`}>
                                <span><Icon icon="ph:check-bold" className={`text-[--icon-light-green3]`} /></span>
                                <span>Unlimited Domain Support</span>
                            </li>
                            <li className={`flex gap-7 items-center`}>
                                <span><Icon icon="ph:check-bold" className={`text-[--icon-light-green3]`} /></span>
                                <span>6 Month Premium Support</span>
                            </li>
                            <li className={`text-[--text-color-light-gray] flex gap-7 items-center`}>
                                <span><Icon icon="maki:cross" className={`opacity-70`} /></span>
                                <span>Lifetime Updates</span>
                            </li>
                        </ul>
                        <div className="my-5">
                            <Link href={`/auth/login`} className='px-7 py-4 bg-[--foreground-orange] text-white text-base lg:text-lg font-bold rounded-lg block w-max'>
                                <div className="flex items-center gap-8">
                                    <span>Start Free Trial</span>
                                    <span className='flex'><Icon icon="maki:arrow" className='inline my-auto' /></span>
                                </div>
                            </Link>
                        </div>
                        <p className='text-sm lg:text-base text-[--text-color-light-gray]'>No credit card required</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Details

//  ${pState?'justify-end':'justify-start'}