'use client';
import React, { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import useEmblaCarousel from 'embla-carousel-react'
import amaraTestimonial from '@/assets/images/Amara-testimonial.svg'
import jumoTestimonial from '@/assets/images/jumo-testimonial.svg'
import coreCorpTestimonial from '@/assets/images/core-corp-testimonial.svg'


type tCardType = {
    title: string
    children: string
    image: any
    name: string
    dept: string
    cardStyles?: string
    box?: string
}

const TestimonialCards = ({ children, title, image, name, dept, cardStyles = 'bg-[--foreground-light-green]', box = "bg-[--foreground-green]" }: tCardType) => (
    <div className={`card px-[29px] lg:px-[38px] py-[32px] rounded-[27.32px] lg:rounded-[36.25px] hover:bg-[--foreground-green] group hover:text-white transition-all duration-300 ${cardStyles}`}>
        <header className='flex items-center gap-[9px] lg:gap-[11px] pb-[18px] lg:pb-6'>
            <div className={`box w-[34.42px] lg:w-[45.68px] h-[34.42px] lg:h-[45.68px] rounded-[13.66px] group-hover:bg-[white] transition-all duration-300 ${box}`}></div>
            <h1 className='text-[26px] lg:text-[34px] leading-normal'>{title}</h1>
        </header>
        <div className="stroke h-[0.55px] lg:h-[0.73px] bg-[#979797]"></div>
        <div className="body pt-[30px] lg:pt-10 pb-4 lg:pb-[22px]">
            <p className='text-sm lg:text-base'>{children}</p>
        </div>
        <div className="stroke h-[0.55px] lg:h-[0.73px] bg-[#979797]"></div>
        <footer className='flex pt-4  lg:pb-[22px] gap-2 lg:gap-[11px]'>
            <div className="footer-img w-[36.61px] lg:w-[48.58px] h-[36.61px] lg:h-[48.58px] overflow-hidden rounded-full">
                <Image src={image} alt="Amara Cosmetics" className='w-full object-cover' />
            </div>
            <div className="footer-details">
                <h2 className='text-[13.11px] lg:text-[17.4px] font-medium leading-normal'>{name}</h2>
                <p className='text-[9.83px] lg:text-[13.05px] leading-[16.4px] lg:leading-[21.8px]'>{dept}</p>
            </div>
        </footer>
    </div>
)

const Testimonials = () => {
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
        <section className={`Testimonials-section bg-bgiPhone15 pt-[30px]`}>
            <div className='px-[--padding-x] pb-[22px] lg:pb-[29px] flex flex-col lg:flex-row justify-between'>
                <div>
                    <h1 className={'font-semibold text-xs lg:text-base tracking-[0.5em]'}>TESTIMONIALS</h1>
                    <p className='font-semibold text-2xl lg:text-[46.4px] lg:leading-normal'>What our Users <span className='block'>say About Us?</span></p>
                </div>
                <div className="buttons flex items-center justify-end gap-2 pt-3">
                    <button title='prev-btn' className="embla__prev" onClick={scrollPrev}>
                        <span className='flex rotate-180 justify-center items-center w-[32px] lg:w-[59px] h-[32px] lg:h-[59px] rounded-full bg-white shadow-md'><Icon icon="maki:arrow" className='inline my-auto text-sm lg:text-lg' /></span>
                    </button>
                    <button title='next-btn' className="embla__next" onClick={scrollNext}>
                        <span className='flex justify-center items-center w-[32px] lg:w-[59px] h-[32px] lg:h-[59px] rounded-full bg-[--foreground-orange] shadow-md'><Icon icon="maki:arrow" className='inline my-auto text-sm lg:text-lg text-white' /></span>
                    </button>
                </div>
            </div>

            <div className="embla px-[--padding-x] overflow-hidden">
                
                <div className="embla__viewport" ref={emblaRef}>
                    <div className='testimonial-cards embla__container flex gap-[29px]'>
                        <div className="embla__slide tCard">
                            <TestimonialCards title='Amara' name='Firdausi Maiwada' dept='CEO, Amara Cosmetics' image={amaraTestimonial}>
                                “Finding reliable suppliers for bulk ingredients and packaging has always been a challenge. This app has completely transformed the way we source materials. The extensive listing of vetted suppliers, combined with seamless bulk ordering, has saved us both time and money. Our production has become more efficient, and we’ve built stronger partnerships.
                            </TestimonialCards>
                        </div>

                        <div className="embla__slide tCard">
                            <TestimonialCards title='Core Corp' name='Seiye Amakiri' dept='Sales Officer, Core.' image={jumoTestimonial}>
                                “In the tool manufacturing business, managing large orders and ensuring timely delivery are critical. This app has been a game-changer for our sales team. It allows us to quickly list our products, manage bulk orders, and communicate directly with buyers. The streamlined process has not only boosted our sales but also improved customer satisfaction.
                            </TestimonialCards>
                        </div>

                        <div className="embla__slide tCard">
                            <TestimonialCards title='Jumo' name='Temidayo Oyeleke' dept='Head of Operations, Jumo.' image={coreCorpTestimonial}>
                                “For a logistics company, efficiency and accuracy are paramount. This app has significantly enhanced our ability to manage bulk shipments and coordinate services with clients. The detailed service listings and easy-to-use bulk ordering system have reduced errors and sped up our operations. This platform is now a crucial part of our logistics management toolkit."
                            </TestimonialCards>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Testimonials