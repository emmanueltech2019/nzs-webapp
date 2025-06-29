import React from 'react'
import Status from '../../app/(account)/user/dashboard/seller/transaction/components/status/Status';


interface StatusTabProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}
const StatusTab: React.FC<StatusTabProps> = ({activeTab, setActiveTab}) => {
    const tabs = ['Charts', 'Summary', 'Toplist'];
  return (
    <div>
        <div className='flex items-center justify-start w-[60%] gap-3'>
            {
                tabs.map((tab, index) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`font-sans text-xs text-center ${index === tabs.length -1 ? "" : "uppercase"} w-full p-[6px] rounded-lg transition duration-300 ${activeTab === tab ? 'bg-[#FFBB5B] text-[#000000] font-medium' : ' antialiased text-[#838383]'}`}
                    >
                        {tab}
                    </button>
                ))
            }
        </div>
    </div>
  )
}

export default StatusTab