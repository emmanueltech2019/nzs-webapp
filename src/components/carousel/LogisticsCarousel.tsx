"use client"
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import img1 from '@/assets/images/logistics-img/image.png'
import img2 from '@/assets/images/logistics-img/image copy.png'
import { Icon } from '@iconify/react/dist/iconify.js';

const LogisticsObj = [
  {
    image: { img1 }
  },
]

const LogisticsCarousel: React.FC = () => {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className='md:px-2'>
      {/* Carousel */}
      <section>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3">

            <div className="logistics embla__slide w-[250px] flex-[0_0_50%] bg-blue-100 rounded-2xl">
              <div className="h-[267px] md:h-[300px]">
                {/* image */}
                <div>
                  <Image src={img1} alt="alt" className='rounded-t-2xl h-[120px] md:h-[150px] object-cover' />
                </div>

                {/* details */}
                <div className='font-sans p-4 flex flex-col gap-1'>
                  <h3 className='font-extrabold text-sm text-[#1F2024]'>Limbot Technoligies</h3>
                  <p className='font-normal text-xs text-[#71727A]'>Freight Delivery</p>
                  <p className='font-normal text-xs text-[#71727A] flex items-center gap-1'><Icon icon="bxs:star" className='text-[#006838]'></Icon>4.8</p>
                </div>

                {/* button */}
                <div className='px-4'>
                  <button className='text-center text-[#006838] cursor-pointer w-full text-xs font-semibold py-3 px-4 border-[#006838] border-[1.5px] rounded-xl'>Open</button>
                </div>
              </div>
            </div>
            <div className="logistics embla__slide w-[250px] flex-[0_0_50%] bg-blue-100 rounded-2xl">
              <div className="h-[267px] md:h-[300px]">
                {/* image */}
                <div>
                  <Image src={img2} alt="alt" className='rounded-t-2xl h-[120px] md:h-[150px] object-cover' />
                </div>

                {/* details */}
                <div className='font-sans p-4 flex flex-col gap-1'>
                  <h3 className='font-extrabold text-sm text-[#1F2024]'>GIG Logistics</h3>
                  <p className='font-normal text-xs text-[#71727A]'>Parcel Delivery</p>
                  <p className='font-normal text-xs text-[#71727A] flex items-center gap-1'><Icon icon="bxs:star" className='text-[#006838]'></Icon>4.8</p>
                </div>

                {/* button */}
                <div className='px-4'>
                  <button className='text-center text-[#006838] cursor-pointer w-full text-xs font-semibold py-3 px-4 border-[#006838] border-[1.5px] rounded-xl'>Open</button>
                </div>
              </div>
            </div>
            <div className="logistics embla__slide w-[250px] flex-[0_0_50%] bg-blue-100 rounded-2xl">
              <div className="h-[267px] md:h-[300px]">
                {/* image */}
                <div>
                  <Image src={img2} alt="alt" className='rounded-t-2xl h-[120px] md:h-[150px] object-cover' />
                </div>

                {/* details */}
                <div className='font-sans p-4 flex flex-col gap-1'>
                  <h3 className='font-extrabold text-sm text-[#1F2024]'>GIG Logistics</h3>
                  <p className='font-normal text-xs text-[#71727A]'>Parcel Delivery</p>
                  <p className='font-normal text-xs text-[#71727A] flex items-center gap-1'><Icon icon="bxs:star" className='text-[#006838]'></Icon>4.8</p>
                </div>

                {/* button */}
                <div className='px-4'>
                  <button className='text-center text-[#006838] cursor-pointer w-full text-xs font-semibold py-3 px-4 border-[#006838] border-[1.5px] rounded-xl'>Open</button>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

    </div>
  )
}

export default LogisticsCarousel