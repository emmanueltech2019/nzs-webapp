import React, { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import profileImg1 from '@/assets/images/logistics-img/image copy 2.png'
import profileImg2 from '@/assets/images/logistics-img/image copy 3.png'
import Image from 'next/image';


const SimilarServices: React.FC = () => {

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

            <div className="similar embla__slide w-[240px] flex-[0_0_50%] bg-blue-100 rounded-2xl">
              <div className="h-[191px] md:h-[260px]">
                {/* image */}
                <div className=''>
                  <Image src={profileImg1} alt="alt" className='rounded-t-2xl h-[120px] md:h-[180px] object-cover' />
                </div>

                {/* details */}
                <div className='font-sans p-4 flex flex-col gap-1'>
                  <p className='font-normal text-xs text-[#71727A]'>UPS Services</p>
                  <h3 className='font-extrabold text-sm text-[#1F2024]'>N 12.00</h3>

                </div>

              </div>
            </div>
            <div className="similar embla__slide w-[240px] flex-[0_0_50%] bg-blue-100 rounded-2xl">
              <div className="h-[191px] md:h-[260px]">
                {/* image */}
                <div className=''>
                  <Image src={profileImg2} alt="alt" className='rounded-t-2xl h-[120px] md:h-[180px] object-cover' />
                </div>

                {/* details */}
                <div className='font-sans p-4 flex flex-col gap-1'>
                  <p className='font-normal text-xs text-[#71727A]'>DHL Logistics</p>
                  <h3 className='font-extrabold text-sm text-[#1F2024]'>N 15.00</h3>

                </div>

              </div>
            </div>
            <div className="similar embla__slide w-[240px] flex-[0_0_50%] bg-blue-100 rounded-2xl">
              <div className="h-[191px] md:h-[260px]">
                {/* image */}
                <div className=''>
                  <Image src={profileImg2} alt="alt" className='rounded-t-2xl h-[120px] md:h-[180px] object-cover' />
                </div>

                {/* details */}
                <div className='font-sans p-4 flex flex-col gap-1'>
                  <p className='font-normal text-xs text-[#71727A]'>DHL Logistics</p>
                  <h3 className='font-extrabold text-sm text-[#1F2024]'>N 15.00</h3>

                </div>

              </div>
            </div>


          </div>
        </div>
      </section>

    </div>
  )
}

export default SimilarServices