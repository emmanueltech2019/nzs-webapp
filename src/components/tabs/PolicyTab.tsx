"use client"
import { FC } from 'react';

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TransactionTab: FC<TabsProps> = ({ activeTab, setActiveTab }) => {

    return (
        // <div className="flex px-2 bg-[#f8f9fe] py-2 mb-5 rounded-full w-[40xw]">
        <div className='flex px-2 py-2 mb-5 rounded-full bg-[#f8f9fe]'>
            <button onClick={() => setActiveTab('policy')} className={`py-2 flex-1 rounded-full ${activeTab === 'policy' ? 'bg-white shadow-md  font-semibold' : ''}`}>
                Policy
            </button>
            <button onClick={() => setActiveTab('security')} className={`py-2 flex-1 rounded-full ${activeTab === 'security' ? 'bg-white shadow-md font-semibold' : ''}`}>
                Security
            </button>


        </div>
    );
};

export default TransactionTab;
