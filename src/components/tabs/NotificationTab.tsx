"use client"
import { FC } from 'react';

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const NotificationTab: FC<TabsProps> = ({ activeTab, setActiveTab }) => {

    return (
        // <div className="flex px-2 bg-[#f8f9fe] py-2 mb-5 rounded-full w-[40xw]">
        <div className='flex px-2 py-2 mb-5 rounded-full bg-[#f8f9fe]'>
            <button onClick={() => setActiveTab('Read')} className={`py-2 flex-1 rounded-full ${activeTab === 'Read' ? 'bg-white shadow-md  font-semibold' : ''}`}>
                Read
            </button>
            <button onClick={() => setActiveTab('Unread')} className={`py-2 flex-1 rounded-full ${activeTab === 'Unread' ? 'bg-white shadow-md font-semibold' : ''}`}>
                Unread
            </button>


        </div>
    );
};

export default NotificationTab;
