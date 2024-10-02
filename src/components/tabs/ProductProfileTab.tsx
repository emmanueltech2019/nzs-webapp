"use client"
import { FC } from 'react';

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const ProductProfileTab: FC<TabsProps> = ({ activeTab, setActiveTab }) => {

    return (
        <div className='flex px-2 py-2 mb-5 rounded-full bg-[#f8f9fe]'>
            <button onClick={() => setActiveTab('Profile')} className={`py-2 flex-1 rounded-full ${activeTab === 'Profile' ? 'bg-white shadow-md  font-semibold' : ''}`}>
                Profile
            </button>
            <button onClick={() => setActiveTab('Routes')} className={`py-2 flex-1 rounded-full ${activeTab === 'Routes' ? 'bg-white shadow-md font-semibold' : ''}`}>
                Routes
            </button>

            <button onClick={() => setActiveTab('Carrier Info')} className={`py-2 flex-1 rounded-full ${activeTab === 'Carrier Info' ? 'bg-white shadow-md font-semibold' : ''}`}>
                Carrier Info
            </button>
            <button onClick={() => setActiveTab('Load Info')} className={`py-2 flex-1 rounded-full ${activeTab === 'Load Info' ? 'bg-white shadow-md font-semibold' : ''}`}>
                Load Info
            </button>
        </div>
    );
};

export default ProductProfileTab;
