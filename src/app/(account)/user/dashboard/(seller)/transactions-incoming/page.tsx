'use client'
import React, { useState } from 'react'
import Incoming from './components/Incoming'
import SellerTransactionTab from '../../../../../../components/tabs/SellerTransactionTab';
import SellerTransStatusTab from '@/components/tabs/SellerTransStatusTab';
const page = () => {
  const [activeTab, setActiveTab] = useState('Orders');
  const [activeStatTab, setActiveStatTab] = useState('Completed')
  return (

    <div className='p-4'>
      <SellerTransactionTab activeTab={activeTab} setActiveTab={setActiveTab}/>
      <div className="mt-4">
        {activeTab === 'Orders' && <div></div>}
        {activeTab === 'Reviews' && <div></div>}
      </div>
      <SellerTransStatusTab activeStatTab={activeStatTab} setActiveStatTab={setActiveStatTab}/>
      <Incoming />
    </div>
  )
}

export default page