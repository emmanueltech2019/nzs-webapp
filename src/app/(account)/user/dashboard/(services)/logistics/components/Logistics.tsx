import React from 'react'
import LogisticsCarousel from '@/components/carousel/LogisticsCarousel'
import { topRated } from './TopRatedObj';
import { Icon } from '@iconify/react/dist/iconify.js';
import FloatingButton from '@/components/buttons/FloatingButton';
import ServiceFilterButtons from '@/components/SortFilter/ServiceFilterButtons'
import SortFilter from '@/components/SortFilter/SortFilter'
import { filters } from '@/components/SortFilter/Filters';

const Logistics = () => {
  return (
    <div className=''>
       <ServiceFilterButtons active='Logistics' filterArray={filters}/>
       <SortFilter />
      <FloatingButton color='bg-[#E09427]'/>
      <LogisticsCarousel />

      {/* Top Rated */}
      <section>
        <div className='mt-[20px]'>
          <header className='font-sans mb-4'>
            <h2 className='font-extrabold text-sm text-[#1F2024]'>Top-rated</h2>
          </header>
          <div className='grid gap-4'>
            {
              topRated.map((item) => (
                <div className='flex items-center justify-between p-4 bg-[#F8F9FE] rounded-2xl'>
                  {/* profile */}
                  <div>
                    {item.profile}
                  </div>

                  {/* details */}
                  <div className='font-sans'>
                    <h3 className='font-extrabold text-sm text-[#1F2024]'>{item.company}</h3>
                    <p className='font-normal text-xs text-[#71727A]'>{item.location}</p>
                  </div>

                  {/* rating */}
                  <div className='flex items-center gap-4'>
                    <p className='font-normal text-xs text-[#71727A] flex items-center gap-1'><Icon icon="bxs:star" className='text-[#006838]'></Icon>{item.rating}</p>
                    <div className='cursor-pointer'>
                      <Icon icon="fluent:ios-arrow-right-24-filled" className='text-[#71727A]'></Icon>
                    </div>
                  </div>
                </div>
              ))

            }
          </div>
        </div>
      </section>

    </div>
  )
}

export default Logistics