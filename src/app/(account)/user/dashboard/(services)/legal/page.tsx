"use client"
import ServiceFilterButtons from '@/components/SortFilter/ServiceFilterButtons'
import React, { useState } from 'react'


const page = () => {  


  return (
    <div className="min-h-screen md:w-[61vw] ">
      <ServiceFilterButtons active='Legal'/>
    </div>
 )
}

export default page