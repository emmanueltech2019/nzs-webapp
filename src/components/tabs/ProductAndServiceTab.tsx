"use client"
import Link from 'next/link';
import { FC, useState } from 'react';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: FC<TabsProps> = ({ activeTab, setActiveTab }) => {

  return (
    <div className="flex p-1 bg-[#F8F9FE] mb-5 mx-4 rounded-[16px] md:w-[50%]">
      <button
        onClick={() => setActiveTab('products')}
        className={`py-2 px-3 w-full rounded-[12px] text-center text-xs ${activeTab === 'products' ? 'bg-white font-semibold' : 'text-[#71727A]'}`}
      >
        Products
      </button> 
      <button
        onClick={() => setActiveTab('services')}
        className={`py-2 px-3 w-full text-center rounded-[12px] text-xs ${activeTab === 'services' ? 'bg-white font-semibold' : 'text-[#71727A]'}`}
      >
        Services
      </button>
    </div>
  );
};

export default Tabs;
