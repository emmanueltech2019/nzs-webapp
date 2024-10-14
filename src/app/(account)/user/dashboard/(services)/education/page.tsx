"use client"
import ServiceFilterButtons from '@/components/SortFilter/ServiceFilterButtons'
import React, { useState } from 'react'
import Education from './components/Education'

const page = () => {  


  return (
    <div className="min-h-screen md:w-[61vw] ">
      <ServiceFilterButtons active='Education'/>
      <Education />
    </div>
 )
}

export default page