"use client"
import Link from 'next/link';
import { FC, useState } from 'react';

interface TabsProps {
  tabs: string[];
  activeStatTab: string;
  setActiveStatTab: (tab: string) => void;
}

const SellerTransStatusTab: FC<TabsProps> = ({ activeStatTab, setActiveStatTab, tabs }) => {

  return (
    <div className="flex p-1 bg-[#F8F9FE] mb-5 rounded-[16px] md:w-[90%] m-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveStatTab(tab)}
          className={`py-2 md:py-3 px-3 w-full rounded-[12px] text-center text-xs ${
            activeStatTab === tab ? 'bg-white font-semibold' : 'text-[#71727A]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SellerTransStatusTab;