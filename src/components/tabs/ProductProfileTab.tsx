"use client"
import { FC } from 'react';

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const ProductProfileTab: FC<TabsProps> = ({ activeTab, setActiveTab }) => {

    return (
        <div className='flex p-1 bg-[#F8F9FE] my-5 mx-2 rounded-[16px] md:w-[50%]'>
            <button onClick={() => setActiveTab('profile')} className={`py-2 px-1 w-full rounded-[12px] text-center text-xs ${activeTab === 'profile' ? 'bg-white font-semibold' : 'text-[#71727A]'}`}>
                Profile
            </button>
            <button onClick={() => setActiveTab('routes')} className={`py-2 px-1 w-full rounded-[12px] text-center text-xs ${activeTab === 'routes' ? 'bg-white font-semibold' : 'text-[#71727A]'}`}>
                Routes
            </button>

            <button onClick={() => setActiveTab('carrier info')} className={`py-2 w-full rounded-[12px] text-center text-xs ${activeTab === 'carrier info' ? 'bg-white font-semibold' : 'text-[#71727A]'}`}>
                Carrier Info
            </button>
            <button onClick={() => setActiveTab('load info')} className={`py-2 px-1 w-full rounded-[12px] text-center text-xs ${activeTab === 'load info' ? 'bg-white font-semibold' : 'text-[#71727A]'}`}>
                Load Info
            </button>
        </div>
    );
};

export default ProductProfileTab;
