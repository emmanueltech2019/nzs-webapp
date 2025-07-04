"use client"
import { FC, Fragment } from 'react';

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const tabs = [
    { title: 'Profile', tab: 'profile' },
    { title: 'Facilities', tab: 'facilities' },
    { title: 'Study', tab: 'study' },
    { title: 'Enroll', tab: 'enroll' },
]

const HealthServicesTab: FC<TabsProps> = ({ activeTab, setActiveTab }) => {

    return (
        <div className='flex px-2 py-1 mb-5 rounded-full bg-[#f8f9fe] items-center text-xs md:text-sm font-bold'>
            {tabs.map(({ title, tab }, i) => (
                <Fragment key={tab+i}>
                    <button onClick={() => setActiveTab(tab)} className={`py-3 flex-1 rounded-full ${activeTab === tab ? 'bg-white font-semibold' : ''}`}>
                        {title}
                    </button>
                    {i !== 3 && <div className="w-0 border border-[#C5C6CC] h-4"></div>}
                </Fragment>
            ))}
        </div>
    );
};

export default HealthServicesTab;
