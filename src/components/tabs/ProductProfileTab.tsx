"use client"
import { FC } from 'react';

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}



const ProductProfileTab: FC<TabsProps> = ({ activeTab, setActiveTab }) => {

    return (
        <div className='flex px-2 py-2 mb-5 rounded-full bg-[#f8f9fe] items-center'>
            <button onClick={() => setActiveTab('profile')} className={`py-2 flex-1 rounded-full ${activeTab === 'profile' ? 'bg-white shadow-md  font-semibold' : ''}`}>
                Profile
            </button>
            <div className="w-0 border border-[#C5C6CC] h-4"></div>
            <button onClick={() => setActiveTab('routes')} className={`py-2 flex-1 rounded-full ${activeTab === 'routes' ? 'bg-white shadow-md font-semibold' : ''}`}>
                Routes
            </button>
            <div className="w-0 border border-[#C5C6CC] h-4"></div>
            <button onClick={() => setActiveTab('carrier info')} className={`py-2 flex-1 rounded-full ${activeTab === 'carrier info' ? 'bg-white shadow-md font-semibold' : ''}`}>
                Carrier Info
            </button>
            <div className="w-0 border border-[#C5C6CC] h-4"></div>
            <button onClick={() => setActiveTab('load info')} className={`py-2 flex-1 rounded-full ${activeTab === 'load info' ? 'bg-white shadow-md font-semibold' : ''}`}>
                Load Info
            </button>
        </div>
    );
};

export default ProductProfileTab;
