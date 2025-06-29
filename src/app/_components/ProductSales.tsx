'use client';
import React, { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import useEmblaCarousel from 'embla-carousel-react'
import productSalesFemale from '@/assets/images/product-sales-female.svg'
import productSalesMale from '@/assets/images/product-sales-male.svg'

const ProductSales = () => {

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes()) // Access API
        }
    }, [emblaApi])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <section className='product-sales-section mt-[37.51px] lg:mt-[54px] pb-[71px] lg:pb-[79px]'>
            <div className="embla overflow-hidden">
                <div className="buttons flex items-center justify-end gap-2 pt-3  px-[--padding-x]">
                    <button className="embla__prev" onClick={scrollPrev}>
                        <span className='flex rotate-180 justify-center items-center w-[32px] lg:w-[59px] h-[32px] lg:h-[59px] rounded-full bg-white shadow-md'><Icon icon="maki:arrow" className='inline my-auto text-sm lg:text-lg' /></span>
                    </button>
                    <button className="embla__next" onClick={scrollNext}>
                        <span className='flex justify-center items-center w-[32px] lg:w-[59px] h-[32px] lg:h-[59px] rounded-full bg-[--foreground-orange] shadow-md'><Icon icon="maki:arrow" className='inline my-auto text-sm lg:text-lg text-white' /></span>
                    </button>
                </div>
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container flex gap-2 lg:gap-[16px] lg:pl-[--padding-x]">
                        <div className="embla__slide content-slide flex flex-col md:flex-row lg:items-center w-full">
                            <div className="content-slide-img">
                                <Image src={productSalesFemale} alt='content img' className='w-full object-cover' />
                            </div>
                            <div className="content-slide-text px-[37px] lg:pl-0 md:pt-16 xl:pt-20 lg:mt-5">
                                <div className='pb-[10px] lg:pb-[11px]'><span className='px-[17px] lg:px-[36.25px] py-[5.07px] lg:py-[10.88px] rounded-[8.45px] lg:rounded-[18.13px] opacity-60 text-[10px] lg:text-[13.05px] lg:leading-[19.58px] bg-[--foreground-light-orange2]'>For <span className='font-bold'>Vendors</span></span></div>
                                <h1 className='text-2xl lg:text-[46.4px] leading-[36px] lg:leading-[69.6px] flex flex-col text-start font-semibold lg:mb-[13.28px]'><span>Buy in Bulk, </span> <span> Direct from the Source</span></h1>
                                <p className='mb-10 text-base text-[--text-color-gray] lg:text-xl max-w-[501.73px]'>
Discover Nigerian-made goods at unbeatable bulk prices. No middlemen. No delay. Just the products you need—when and where you need them.                                    </p>
                                <p className='flex items-center gap-3 lg:gap-5 mb-[7px] lg:mb-[15px]'>
                                    <span className='ml-[5px] w-[16.31px] h-[16.31px] bg-[--icon-light-green2] rounded-full flex items-center justify-center'><Icon icon='fa:check' className='text-white text-[9px]' /></span>
                                    <span className='text-[9px] lg:text-[14.5px] leading-[10px] lg:leading-5 font-bold text-[--text-color-gray]'>Sign Up and Set Up Your Store</span>
                                </p>
                                <p className='flex items-center gap-3 lg:gap-5 mb-[7px] lg:mb-[15px]'>
                                    <span className='ml-[5px] w-[16.31px] h-[16.31px] bg-[--icon-light-green2] rounded-full flex items-center justify-center'><Icon icon='fa:check' className='text-white text-[9px]' /></span>
                                    <span className='text-[9px] lg:text-[14.5px] leading-[10px] lg:leading-5 font-bold text-[--text-color-gray]'>Manage Orders Efficiently</span>
                                </p>
                                <p className='flex items-center gap-3 lg:gap-5'>
                                    <span className='ml-[5px] w-[16.31px] h-[16.31px] bg-[--icon-light-green2] rounded-full flex items-center justify-center'><Icon icon='fa:check' className='text-white text-[9px]' /></span>
                                    <span className='text-[9px] lg:text-[14.5px] leading-[10px] lg:leading-5 font-bold text-[--text-color-gray]'>Process and Deliver Orders</span>
                                </p>

                            </div>
                        </div>

                        <div className="embla__slide content-slide flex flex-col md:flex-row lg:items-center w-full">
                            <div className="content-slide-img">
                                <Image src={productSalesMale} alt='content img' className='w-full object-cover' />
                            </div>
                            <div className="content-slide-text px-[37px] lg:pl-0 md:pt-16 xl:pt-20 lg:mt-5">
                                <div className='pb-[10px] lg:pb-[11px]'><span className='px-[17px] lg:px-[36.25px] py-[5.07px] lg:py-[10.88px] rounded-[8.45px] lg:rounded-[18.13px] opacity-60 text-[10px] lg:text-[13.05px] lg:leading-[19.58px] bg-[--foreground-light-orange2]'>For <span className='font-bold'>Service Providers</span></span></div>
                                <h1 className='text-2xl lg:text-[46.4px] leading-[36px] lg:leading-[69.6px] flex flex-col text-start font-semibold lg:mb-[13.28px]'><span>Detailed Service  </span> <span>Listings</span></h1>
                                <p className='mb-10 text-base text-[--text-color-gray] lg:text-xl max-w-[501.73px]'>
                                    Naijazone isn’t just for merchants—it’s also a valuable resource for anyone needing to find essential services. Whether you’re looking for a healthcare provider, a repair shop, or any other critical service, Naijazone’s detailed service listings have you covered. Here’s how to find and utilize these services:
                                </p>
                                <p className='flex items-center gap-3 lg:gap-5 mb-[7px] lg:mb-[15px]'>
                                    <span className='ml-[5px] w-[16.31px] h-[16.31px] bg-[--icon-light-green2] rounded-full flex items-center justify-center'><Icon icon='fa:check' className='text-white text-[9px]' /></span>
                                    <span className='text-[9px] lg:text-[14.5px] leading-[10px] lg:leading-5 font-bold text-[--text-color-gray]'>Use the Search Bar:</span>
                                </p>
                                <p className='flex items-center gap-3 lg:gap-5 mb-[7px] lg:mb-[15px]'>
                                    <span className='ml-[5px] w-[16.31px] h-[16.31px] bg-[--icon-light-green2] rounded-full flex items-center justify-center'><Icon icon='fa:check' className='text-white text-[9px]' /></span>
                                    <span className='text-[9px] lg:text-[14.5px] leading-[10px] lg:leading-5 font-bold text-[--text-color-gray]'>MFilter Results</span>
                                </p>
                                <p className='flex items-center gap-3 lg:gap-5'>
                                    <span className='ml-[5px] w-[16.31px] h-[16.31px] bg-[--icon-light-green2] rounded-full flex items-center justify-center'><Icon icon='fa:check' className='text-white text-[9px]' /></span>
                                    <span className='text-[9px] lg:text-[14.5px] leading-[10px] lg:leading-5 font-bold text-[--text-color-gray]'>Connect with Service Providers</span>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductSales