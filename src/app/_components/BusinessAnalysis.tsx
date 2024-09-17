"use client";
import Image from "next/image"
import { Icon } from "@iconify/react/dist/iconify.js"
import businessAnalsis from "@/assets/images/business-analysis.png"
import useToggle from '@/hooks/useToggle'



const BusinessAnalysis = () => {
    const [a, aFunc] = useToggle(true)
    const [b, bFunc] = useToggle(false)
    const [c, cFunc] = useToggle(false)

    const card1Body = 'py-3 lg:py-[18px] rounded-[9.84px] lg:rounded-[18.13px] px-4 lg:px-[25px]'
    const card1Title = 'text-sm lg:text-base font-medium leading-normal mb-[2px] lg:mb-[5px]'
    const card1Text = 'text-[--text-color-gray] text-xs lg:text-sm overflow-hidden transition-all duration-200'

    return (
        <section className='business-analysis-section pb-[147px] lg:pb-[135px]'>
            <div className="flex flex-col gap-9 lg:gap-0 md:flex-row justify-between items-center px-[--padding-x]">
                <div className="content-slide-img w-full lg:flex-[1.2]">
                    <Image src={businessAnalsis} alt='content img' className='w-full object-cover' />
                </div>
                <div className="content-slide-text lg:flex-1">
                    <div className='pb-[10px] lg:pb-[11px]'><span className='px-[17px] lg:px-[36.25px] py-[5.07px] lg:py-[10.88px] rounded-[8.45px] lg:rounded-[18.13px] opacity-60 text-[10px] lg:text-[13.05px] lg:leading-[19.58px] bg-[--foreground-light-orange2]'>For <span className='font-bold'>Vendors</span></span></div>
                    <h1 className='text-2xl lg:text-[46.4px] leading-[36px] lg:leading-[69.6px] flex flex-col text-start font-semibold lg:mb-[13.28px]'><span>In-Depth Business </span> <span>Analytics</span></h1>
                    <p className='mb-7 text-base text-[--text-color-gray] lg:text-xl max-w-[501.73px]'>
                        Understanding your business performance is key to growth. Naijazone’s in-depth analytics provide you with the insights you need to make informed decisions. Here’s how to leverage these tools:
                    </p>
                    <div className="cards-container flex flex-col gap-[10.15px] justify-between">
                        <div className={`col bg-white border-[0.36px] border-black flex items-center ${card1Body}`}>
                            <div className="col">
                                <h2 className={`card-title ${card1Title}`}>Access Your Analytics Dashboard</h2>
                                <p className={`card-text ${card1Text} ${a ? 'mt-3 max-h-[100px]' : 'mt-0 max-h-0'}`}>
                                    Set up your dashboard to track the metrics that matter most to you such as sales trends, customer demographics, or product performance.
                                </p>
                            </div>
                            <div className="col">
                                <button onClick={() => { b ? bFunc() : ""; c ? cFunc() : ""; aFunc() }}>
                                    <Icon icon={`bi:chevron-down`} className={`font-bold transition-all duration-200 ${a ? 'rotate-180' : 'rotate-0'}`} />
                                </button>
                            </div>
                        </div>

                        <div className={`col bg-[--foreground-light-green] flex items-center  ${card1Body}`}>
                            <div className="col">
                                <h2 className={`card-title ${card1Title}`}>Analyze Your Sales Data</h2>
                                <p className={`card-text ${card1Text} ${b ? 'mt-3 max-h-[100px]' : 'mt-0 max-h-0'}`}>
                                    Set up your dashboard to track the metrics that matter most to you such as sales trends, customer demographics, or product performance.
                                </p>
                            </div>
                            <div className="col">
                                <button onClick={() => { a ? aFunc() : ""; c ? cFunc() : ""; bFunc() }}>
                                    <Icon icon={`bi:chevron-down`} className={`font-bold transition-all duration-200 ${b ? 'rotate-180' : 'rotate-0'}`} />
                                </button>
                            </div>
                        </div>

                        <div className={`col bg-[--foreground-green] text-white flex items-center  ${card1Body}`}>
                            <div className="col">
                                <h2 className={`card-title ${card1Title}`}>Optimize Your Business Strategy</h2>
                                <p className={`card-text ${card1Text} ${c ? 'mt-3 max-h-[100px]' : 'mt-0 max-h-0'}`} style={{ color: '#ffffffc9' }}>
                                    Set up your dashboard to track the metrics that matter most to you such as sales trends, customer demographics, or product performance.
                                </p>
                            </div>
                            <div className="col">
                                <button onClick={() => { a ? aFunc() : ""; b ? bFunc() : ""; cFunc() }}>
                                    <Icon icon={`bi:chevron-down`} className={`font-bold transition-all duration-200 ${c ? 'rotate-180' : 'rotate-0'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BusinessAnalysis