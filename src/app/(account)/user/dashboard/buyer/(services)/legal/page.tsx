"use client"
import { filters } from '@/components/SortFilter/Filters'
import ServiceFilterButtons from '@/components/SortFilter/ServiceFilterButtons'
import React, { useState } from 'react'
import Legal from "@/app/(account)/user/dashboard/buyer/(services)/legal/components/Legal"


const page = () => {  


  return (
    <div className="min-h-screen md:w-[61vw] ">
      <Legal />
    </div>
 )
}

export default page