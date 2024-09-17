"use client";
import Image from "next/image"
import { Icon } from "@iconify/react/dist/iconify.js"
import hand from "@/assets/images/hand.svg"
import useToggle from '@/hooks/useToggle'
import Link from "next/link";



const CorePrinciples = () => {
    const [a, aFunc] = useToggle(true)
    const [b, bFunc] = useToggle(false)
    const [c, cFunc] = useToggle(false)

    const card1Body = 'py-3 lg:py-[18px] rounded-[9.84px] lg:rounded-[18.13px] px-3 lg:px-[25px] bg-white flex drop-shadow-md gap-3 lg:gap-5'
    const card1Title = 'text-sm lg:text-base font-semibold leading-normal mb-[2px] lg:mb-[5px]'
    const card1Text = 'text-[#8D8D8D] text-xs lg:text-sm'

    return (
        <section className='business-analysis-section pb-[62px] lg:pb-[73px]'>
            <div className="flex flex-col gap-9 lg:gap-[10%] md:flex-row items-center px-[--padding-x] pt-[60px] lg:pt-[70px]">
                <div className="content-slide-img w-full lg:w-[40%]">
                    <Image src={hand} alt='content img' className='w-full object-cover' />
                </div>
                <div className="content-slide-text w-full lg:w-6/12 xl:w-5/12">
                    <h1 className='text-2xl lg:text-3xl flex flex-row items-center gap-4 text-start font-semibold lg:mb-[13.28px]'>Our Core Principles <span className="bg-[#3CD856] text-[--foreground-green] px-3 py-[4px] text-xs rounded-[5px] font-bold">Active</span></h1>
                    <p className='mb-7 text-base text-[--text-color-gray] lg:text-xl max-w-[501.73px] lg:max-w-full'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Id interdum dui mollis . Suspendisse nulla :
                    </p>
                    <div className="cards-container flex flex-col gap-4">
                        <div className={`col ${card1Body}`}>
                            <div className="col">
                                <div className="check">
                                    <Icon icon={`material-symbols:check-box`} className={`text-[--icon-green-2] text-3xl lg:text-5xl`} />
                                </div>
                            </div>
                            <div className="col">
                                <h2 className={`card-title ${card1Title}`}>Efficiency:</h2>
                                <ul role="list" className="marker:text-[#8D8D8D] list-disc pl-3 md:pl-5">
                                    <li className={`card-text ${card1Text}`}>
                                        Streamlined processes that save resources for merchants and consumers.... <Link href={'/'} className="text-[#058E6E]">read more</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={`col ${card1Body}`}>
                            <div className="col">
                                <div className="check">
                                    <Icon icon={`material-symbols:check-box`} className={`text-[--icon-green-2] text-3xl lg:text-5xl`} />
                                </div>
                            </div>
                            <div className="col">
                                <h2 className={`card-title ${card1Title}`}>Reliability:</h2>
                                <ul role="list" className="marker:text-[#8D8D8D] list-disc pl-3 md:pl-5">
                                    <li className={`card-text ${card1Text}`}>
                                        Product sales to delivery tracking, must be dependable and accurate.... <Link href={'/'} className="text-[#058E6E]">read more</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={`col ${card1Body}`}>
                            <div className="col">
                                <div className="check">
                                    <Icon icon={`material-symbols:check-box`} className={`text-[--icon-green-2] text-3xl lg:text-5xl`} />
                                </div>
                            </div>
                            <div className="col">
                                <h2 className={`card-title ${card1Title}`}>Customer-Centricity:</h2>
                                <ul role="list" className="marker:text-[#8D8D8D] list-disc pl-3 md:pl-5">
                                    <li className={`card-text ${card1Text}`}>
                                        Users are at the heart of everything we do. We are dedicated to  their needs ...  <Link href={'/'} className="text-[#058E6E]">read more</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CorePrinciples