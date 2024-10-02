"use client"
import ServiceFilterButtons from '@/components/SortFilter/ServiceFilterButtons'
import SortFilter from '@/components/SortFilter/SortFilter'
import React, { useState } from 'react'
import Logistics from './components/Logistics';


const page = () => {  


  return (
    <div className="min-h-screen md:w-[61vw] md:m-auto">
        <ServiceFilterButtons active='Logistics'/>
        <SortFilter />
        <Logistics/>
    </div>
 )
}

export default page