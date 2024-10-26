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
            <button onClick={() => setActiveTab('completed')} className={`py-2 flex-1 rounded-full ${activeTab === 'completed' ? 'bg-white shadow-md  font-semibold' : ''}`}>
                Completed
            </button>
            <button onClick={() => setActiveTab('pending')} className={`py-2 flex-1 rounded-full ${activeTab === 'pending' ? 'bg-white shadow-md font-semibold' : ''}`}>
                Pending
            </button>

            <button onClick={() => setActiveTab('failed')} className={`py-2 flex-1 rounded-full ${activeTab === 'failed' ? 'bg-white shadow-md font-semibold' : ''}`}>
                Failed
            </button>
        </div>
    );
};

export default TransactionTab;
