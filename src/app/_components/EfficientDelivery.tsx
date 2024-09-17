import Image from "next/image"
import { Icon } from "@iconify/react/dist/iconify.js"
import efficientDeliveryMale from "@/assets/images/efficient-delivery-male.svg"

const card1Body = 'flex-1 py-3 lg:py-5 rounded-[9.84px] px-3 lg:px-4 '
const card1Icon = 'px-[6.65px] lg:px-3 py-[5.12px] lg:py-[10px] rounded-[9.84px] lg:rounded-[18.13px] text-white'
const card1Title = 'text-base lg:text-xl font-medium mb-[2px] lg:mb-[5px]'
const card1Text = 'text-[--text-color-gray] text-xs lg:text-base'

const EfficientDelivery = () => {
    return (
        <section className="Efficient-Delivery-Section pb-[30px] lg:pb-[135px]">
            <div className="flex flex-col-reverse gap-9 md:flex-row justify-between items-center px-[--padding-x]">
                <div className="content-slide-text lg:flex-1">
                    <div className='pb-[10px] lg:pb-[11px]'><span className='px-[17px] lg:px-[36.25px] py-[5.07px] lg:py-[10.88px] rounded-[8.45px] lg:rounded-[18.13px] opacity-60 text-[10px] lg:text-[13.05px] lg:leading-[19.58px] bg-[--foreground-light-orange2]'>For <span className='font-bold'>Logistics</span></span></div>
                    <h1 className='text-2xl lg:text-[46.4px] leading-[36px] lg:leading-[69.6px] flex flex-col text-start font-semibold lg:mb-[13.28px]'><span>Efficient Delivery & </span> <span>Tracking</span></h1>
                    <p className='mb-7 text-base text-[--text-color-gray] lg:text-xl max-w-[501.73px]'>
                        With Naijazone, managing deliveries is no longer a guessing game. Our delivery and tracking system ensures that you and your customers stay informed from the moment an order is placed until it’s delivered. Here’s how to utilize these features:
                    </p>
                    <div className="cards-container flex gap-4 lg:gap-[29px] justify-between">
                        <div className={`col bg-[--foreground-light-green] ${card1Body}`}>
                            <div className={`card-icon flex pb-[6px] lg:pb-[10px]`}>
                                <span className={`bg-[--icon-green] ${card1Icon}`}>
                                    <Icon icon="ic:outline-speed" className="text-[16.73px] lg:text-[30.81px]" />
                                </span>
                            </div>
                            <h2 className={`card-title flex flex-col ${card1Title}`}><span>Track Orders in </span><span>Real-Time</span></h2>
                            <p className={`card-text ${card1Text}`}>
                                We provide live updates, showing the delivery status and estimated time of arrival.
                            </p>
                        </div>
                        <div className={`col bg-[--foreground-light-green] ${card1Body}`}>
                            <div className={`card-icon flex pb-[6px] lg:pb-[10px]`}>
                                <span className={`bg-[--icon-green] ${card1Icon}`}>
                                    <Icon icon="carbon:delivery" className="text-[16.73px] lg:text-[30.81px]" />
                                </span>
                            </div>
                            <h2 className={`card-title flex flex-col ${card1Title}`}><span>Manage Delivery </span><span>Issues</span></h2>
                            <p className={`card-text ${card1Text}`}>
                                We provide live updates, showing the delivery status and estimated time of arrival.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="content-slide-img w-full lg:flex-[1.2]">
                    <Image src={efficientDeliveryMale} alt='content img' className='w-full object-cover' />
                </div>
            </div>
        </section>
    )
}

export default EfficientDelivery