'use client';

import React, { useEffect } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import useEmblaCarousel from 'embla-carousel-react'

import iPhone13Card from '@/assets/images/iPhone13card.svg'
import verticalCard from '@/assets/images/VerticalCard.svg'
import groupLayer from '@/assets/images/groupLayer.svg'

import iPhone13FullControl from '@/assets/images/phone-slide-3.png'
import iPhone13FullControl2 from '@/assets/images/phone-slide-2.png'
import iPhone13FullControl3 from '@/assets/images/phone-slide-1.png'



const card1Body = 'flex-1 pt-3 lg:pt-8 rounded-[18.13px]'
const card1Icon = 'px-[11.95px] py-[10.88px] rounded-[8.63px] lg:rounded-[18.13px] text-white'
const card1Title = 'px-[35px] lg:px-14 text-base lg:text-[34.8px] font-medium leading-[26.29px] lg:leading-[52.2px] mb-2 lg:mb-[13px]'
const card1Text = 'px-[35px] lg:px-14 text-[--text-color-gray] text-sm lg:text-base lg:leading-[21.75px]'

type featuredCardType = {
    shadow?: boolean
}

const FeaturesCard = ({shadow}:featuredCardType) => {

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes()) // Access API
        }
    }, [emblaApi])

    return (
        <section className='content-section'>
            <h1 className='text-2xl lg:text-[46.4px] leading-[36px] lg:leading-[69.6px] pb-5 flex flex-col text-center font-semibold'><span>Built for Hustlers, 
Makers & Movers</span> <span>in Nigeria</span></h1>
            <p className='px-[--padding-x] mb-10 md:px-0 text-base lg:text-lg max-w-[601.73px] mx-auto text-center'>
                Discover Nigerian-made goods at unbeatable bulk prices. No middlemen. No delay. Just the products you need—when and where you need them.
            </p>

            <div className="functionality-cards">
                <div className="row flex flex-col md:flex-row px-[--padding-x] gap-7">

                    <div className={`col bg-[--foreground-light-green] ${card1Body}`}>
                        <div className={`card-icon flex px-[35px] lg:px-14 pb-[2px] lg:pb-[10px]`}>
                            <span className={`bg-[--icon-green] ${card1Icon}`}>
                                <Icon icon="carbon:content-delivery-network" className="text-[17.25px] lg:text-[33.35px]" />
                            </span>
                        </div>
                        <h2 className={`card-title ${card1Title}`}>Top Searches</h2>
                        <p className={`card-text ${card1Text}`}>
                            Whether you're a professional, artisan, freelancer, or contractor—put your service in front of thousands of verified institutions and business clients looking for what you do.
                        </p>
                        <div className="card-imgs flex items-end justify-between -mt-9 xl:-mt-[80.83px]">
                            <div className="img1 flex-[2]">
                                <Image src={iPhone13Card} alt="iPhone" className={`w-full max-w-[577.13px] object-cover`} />
                            </div>
                            <div className="img2 flex-1">
                                <Image src={verticalCard} alt="Vertical Card" className={`w-full max-w-[181.26px] object-cover ml-auto`} />
                            </div>
                        </div>
                    </div>

                    <div className={`col bg-[--foreground-light-orange] overflow-hidden ${card1Body}`}>
                        <div className={`card-icon flex px-[35px] lg:px-14 pb-[2px] lg:pb-[10px]`}>
                            <span className={`bg-[--text-color-orange] ${card1Icon}`}>
                                <Icon icon={`hugeicons:money-security`} className='text-[17.25px] lg:text-[33.35px]' />
                            </span>
                        </div>
                        <h2 className={`card-title ${card1Title}`}>Safe Transactions</h2>
                        <p className={`card-text ${card1Text}`}>
                           Do business with peace of mind. Naijazone protects every transaction with a secure payment system—keeping both buyers and service providers safe from scams and delays.
                        </p>
                        <div className="card-imgs w-full mt-4">
                            <Image src={groupLayer} alt='group Layer img' className='w-full object-cover translate-x-[35px] lg:translate-x-14' />
                        </div>
                    </div>
                </div>

                <div className="embla px-[--padding-x] overflow-hidden " ref={emblaRef}>
                    <div className="embla__container flex gap-[29px] mt-[29px]">
                        <div className="embla__slide fCard">
                            <div className={`col bg-[--foreground-light-green] ${card1Body} ${shadow && "drop-shadow-2xl"}`}>
                                <div className={`card-icon flex px-[35px] lg:px-14 pb-[2px] lg:pb-[10px]`}>
                                    <span className={`bg-[--icon-green] ${card1Icon}`}>
                                        <Icon icon="material-symbols:settings-remote-outline-sharp" className="text-[17.25px] lg:text-[33.35px]" />
                                    </span>
                                </div>
                                <h2 className={`card-title ${card1Title}`}>Take Control</h2>
                                <p className={`card-text ${card1Text}`}>
                                    Never lose sight of a shipment. Naijazone’s logistics system offers live tracking, delivery updates, and location monitoring so both vendors and buyers know where every package is—at all times.


                                </p>
                                <div className="card-imgs flex items-end justify-between">
                                    <div className="img1 flex-[2] pt-10">
                                        <Image src={iPhone13FullControl} alt="iPhone" className={`w-full w-[577.13px] object-cover`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="embla__slide fCard">
                            <div className={`col bg-[--foreground-light-green] ${card1Body} ${shadow && "drop-shadow-2xl"}`}>
                                <div className={`card-icon flex px-[35px] lg:px-14 pb-[2px] lg:pb-[10px]`}>
                                    <span className={`bg-[--icon-green] ${card1Icon}`}>
                                        <Icon icon="streamline:chat-two-bubbles-oval" className="text-[17.25px] lg:text-[33.35px]" />
                                    </span>
                                </div>
                                <h2 className={`card-title ${card1Title}`}>Chat</h2>
                                <p className={`card-text ${card1Text}`}>
                                    Never lose sight of a shipment. Naijazone’s logistics system offers live tracking, delivery updates, and location monitoring so both vendors and buyers know where every package is—at all times.

                     
                                    </p>
                                <div className="card-imgs flex items-end justify-between">
                                    <div className="img1 flex-[2] pt-10">
                                        <Image src={iPhone13FullControl2} alt="iPhone" className={`w-full w-[577.13px] object-cover`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="embla__slide fCard">
                            <div className={`col bg-[--foreground-light-green] ${card1Body} ${shadow && "drop-shadow-2xl"}`}>
                                <div className={`card-icon flex px-[35px] lg:px-14 pb-[2px] lg:pb-[10px]`}>
                                    <span className={`bg-[--icon-green] ${card1Icon}`}>
                                        <Icon icon="streamline:arrow-cursor-2" className="text-[17.25px] lg:text-[33.35px]" />
                                    </span>
                                </div>
                                <h2 className={`card-title ${card1Title}`}>Tracking</h2>
                                <p className={`card-text ${card1Text}`}>
                                   Never lose sight of a shipment. Naijazone’s logistics system offers live tracking, delivery updates, and location monitoring so both vendors and buyers know where every package is—at all times.                        </p>
                                <div className="card-imgs flex items-end justify-between">
                                    <div className="img1 flex-[2] pt-10">
                                        <Image src={iPhone13FullControl3} alt="iPhone" className={`w-full w-[577.13px] object-cover`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturesCard