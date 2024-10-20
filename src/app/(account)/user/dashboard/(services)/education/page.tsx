"use client"
import ServiceFilterButtons from '@/components/SortFilter/ServiceFilterButtons'
import React, { useState } from 'react'
import Education from './components/Education'
import { filters } from '@/components/SortFilter/Filters'

const page = () => {  


  return (
    <div className="min-h-screen md:w-[61vw] ">
      <ServiceFilterButtons active='Education' filterArray={filters}/>
      <Education />
    </div>
 )
}

export default page