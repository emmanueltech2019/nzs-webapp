"use client"
import { FC, useState } from 'react';

const Tabs: FC = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="flex px-2 bg-[#f8f9fe] py-2 mb-5 rounded-full w-[30vw]">
      <button
        onClick={() => setActiveTab('products')}
        className={`py-2 px-[16.7%] rounded-full ${activeTab === 'products' ? 'bg-white shadow-md  font-semibold' : ''}`}
      >
        Products
      </button>
      <button
        onClick={() => setActiveTab('services')}
        className={`py-2 px-[16.7%] rounded-full ${activeTab === 'services' ? 'bg-white shadow-md font-semibold' : ''}`}
      >
        Services
      </button>
    </div>
  );
};

export default Tabs;
