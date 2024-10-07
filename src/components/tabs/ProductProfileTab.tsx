"use client"
import { FC, Fragment } from 'react';

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const tabs = [
    { title: 'Profile', tab: 'profile' },
    { title: 'Routes', tab: 'routes' },
    { title: 'Carrier Info', tab: 'carrier_info' },
    { title: 'Load Info', tab: 'load_info' },
]

const ProductProfileTab: FC<TabsProps> = ({ activeTab, setActiveTab }) => {

    return (
        <div className='flex px-2 py-2 mb-5 rounded-full bg-[#f8f9fe] items-center text-xs md:text-sm font-bold'>
            {tabs.map(({ title, tab }, i) => (
                <Fragment key={tab+i}>
                    <button onClick={() => setActiveTab(tab)} className={`py-2 flex-1 rounded-full ${activeTab === tab ? 'bg-white shadow-md  font-semibold' : ''}`}>
                        {title}
                    </button>
                    {i !== 3 && <div className="w-0 border border-[#C5C6CC] h-4"></div>}
                </Fragment>
            ))}
        </div>
    );
};

export default ProductProfileTab;
