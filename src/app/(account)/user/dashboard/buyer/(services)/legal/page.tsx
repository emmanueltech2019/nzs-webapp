"use client"
import { filters } from '@/components/SortFilter/Filters'
import ServiceFilterButtons from '@/components/SortFilter/ServiceFilterButtons'
import React, { useState } from 'react'


const page = () => {  


  return (
    <div className="min-h-screen md:w-[61vw] ">
      <ServiceFilterButtons active='Legal' filterArray={filters} setActive={(tab: string) => console.log(`Active tab set to: ${tab}`)} />
    </div>
 )
}

export default page