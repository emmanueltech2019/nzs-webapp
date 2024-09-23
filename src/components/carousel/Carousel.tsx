"use client"
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';
import banner from "../../assets/images/Banner.png"

const CarouselEmbla: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          <div className="embla__slide w-full flex-[0_0_100%] bg-blue-100 rounded-lg">
            <div className="h-40 flex items-center justify-center">
              <Image src={banner} alt="Product 1" className="h-[100%] w-full object-cover" />
            </div>
          </div>
          <div className="embla__slide w-full flex-[0_0_100%] bg-blue-100  rounded-lg">
            <div className="h-40 flex items-center justify-center">
              <Image src={banner} alt="Product 2" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="embla__slide w-full flex-[0_0_100%] bg-blue-100 rounded-lg">
            <div className="h-40 flex items-center justify-center">
              <Image src={banner} alt="Product 3" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Previous and Next buttons */}
      {/* <button
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 ${
          prevBtnEnabled ? 'opacity-100' : 'opacity-30'
        }`}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 ${
          nextBtnEnabled ? 'opacity-100' : 'opacity-30'
        }`}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <FiChevronRight size={24} />
      </button> */}

      {/* Dots for carousel */}
      <div className="flex justify-center mt-4 space-x-2 absolute bottom-3 left-[50%] transform -translate-x-1/2 ">
        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default CarouselEmbla;
