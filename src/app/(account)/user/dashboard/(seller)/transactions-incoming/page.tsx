'use client'
import React, { useState } from 'react'
import Incoming from './components/orders/Incoming'
import SellerTransactionTab from '../../../../../../components/tabs/SellerTransactionTab';
import SellerTransStatusTab from '@/components/tabs/SellerTransStatusTab';
import { div } from 'framer-motion/client';
import Pending from './components/orders/Pending';
import ServiceFilterButtons from '@/components/SortFilter/ServiceFilterButtons';
import { sellerFilter } from '@/components/SortFilter/Filters';
import SortFilter from '@/components/SortFilter/SortFilter';
import Read from './reviews/Read';
const page = () => {
  const [activeTab, setActiveTab] = useState('Orders');
  const [activeOrderTab, setActiveOrderTab] = useState('Completed')
  const [activePendingTab, setActivePendingTab] = useState('Read')

  const orderTabs = ['Completed', 'Pending']
  const pendingTabs = ['Read', 'Pending']
  return (

    <div className='p-4 md:w-[85%] m-auto'>
      <SellerTransactionTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className='md:ms-5 flex items-center'>
        <SortFilter />
        <ServiceFilterButtons active='Status' filterArray={sellerFilter} />
      </div>

      <div className="">
        {activeTab === 'Orders' && <div>
          <SellerTransStatusTab activeStatTab={activeOrderTab} setActiveStatTab={setActiveOrderTab} tabs={orderTabs} />
          {activeOrderTab === "Completed" && <Incoming />}
          {activeOrderTab === "Pending" && <div><Pending /></div>}
        </div>}

        {activeTab === 'Reviews' && <div>
          <SellerTransStatusTab activeStatTab={activePendingTab} setActiveStatTab={setActivePendingTab} tabs={pendingTabs} />
          {activePendingTab === "Read" && <Read />}
        </div>}
      </div>

    </div>
  )
}

export default page