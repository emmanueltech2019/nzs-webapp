"use client"
import Link from 'next/link';
import { FC, useState } from 'react';

interface TabsProps {
  activeStatTab: string;
  setActiveStatTab: (tab: string) => void;
}

const SellerTransStatusTab: FC<TabsProps> = ({ activeStatTab, setActiveStatTab }) => {

  return (
    <div className="flex p-1 bg-[#F8F9FE] mb-5 rounded-[16px] md:w-[75%] m-auto">
      <button
        onClick={() => setActiveStatTab('Completed')}
        className={`py-2 md:py-3 px-3 w-full rounded-[12px] text-center text-xs ${activeStatTab === 'Completed' ? 'bg-white font-semibold' : 'text-[#71727A]'}`}
      >
        Completed
      </button> 
      <button
        onClick={() => setActiveStatTab('Pending')}
        className={`py-2 px-3 w-full text-center rounded-[12px] text-xs ${activeStatTab === 'Pending' ? 'bg-white font-semibold' : 'text-[#71727A]'}`}
      >
        Pending
      </button>
    </div>
  );
};

export default SellerTransStatusTab;