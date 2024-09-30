"use client"
import { FC, useState } from 'react';

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TransactionTab: FC<TabsProps> = ({ activeTab, setActiveTab }) => {

    return (
        // <div className="flex px-2 bg-[#f8f9fe] py-2 mb-5 rounded-full w-[40xw]">
        <div className='flex px-2 py-2 mb-5 rounded-full bg-[#f8f9fe]'>
            <button onClick={() => setActiveTab('incoming')} className={`py-2 flex-1 rounded-full ${activeTab === 'incoming' ? 'bg-white shadow-md  font-semibold' : ''}`}>
                Incoming
            </button>
            <button onClick={() => setActiveTab('pending')} className={`py-2 flex-1 rounded-full ${activeTab === 'pending' ? 'bg-white shadow-md font-semibold' : ''}`}>
                Pending
            </button>

            <button onClick={() => setActiveTab('outgoing')} className={`py-2 flex-1 rounded-full ${activeTab === 'outgoing' ? 'bg-white shadow-md font-semibold' : ''}`}>
                Outgoing
            </button>
        </div>
    );
};

export default TransactionTab;
