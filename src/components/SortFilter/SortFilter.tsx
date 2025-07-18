import { FC, useState } from 'react';
// import { FiFilter } from 'react-icons/fi';
import { Icon } from '@iconify/react/dist/iconify.js';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { FaChevronRight } from 'react-icons/fa';
interface SortFilter {
  activeTab: string,
  setActiveTab:(tabId: string) => void,
}

const SortFilter: FC<SortFilter> = ({ activeTab, setActiveTab }) => {
  const [toggleFilter, setToggleFilter] = useState(false);
  return (
    <div className="flex py-2 overflow-x-hidden">
      {/* <button className="flex items-center space-x-2 border p-2 rounded-md">
        <SwapVertIcon />
        <span>Sort</span>
        <KeyboardArrowDownOutlinedIcon/>
      </button> */}
      <button onClick={() => setToggleFilter(!toggleFilter)} className="flex items-center p-2 rounded-md text-[12px] bg-white relative z-10">
        {/* <FiFilter className='me-2'/> */}
        <Icon icon="hugeicons:menu-08" className='me-1'></Icon>
        <span>Filter</span>
        <FaChevronRight className='ms-2' />
        {/* <span className="ml-2 bg-[#006838] text-white text-[8px] px-2 py-1 rounded-full">2</span> */}
      </button>
      <div className={`flex gap-3 items-center transition-transform duration-200 ease-in-out overflow-x-auto ${toggleFilter ? '-translate-x-[100%]' : 'translate-x-0'}`}>
        <div onClick={() => setActiveTab('a-z')} className={`flex flex-shrink-0 rounded-2xl py-1 cursor-pointer items-center text-[12px] px-4 ${activeTab === 'a-z' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
          A-Z
        </div>
        <div onClick={() => setActiveTab('providers')} className={`flex flex-shrink-0 rounded-2xl py-1 cursor-pointer items-center text-[12px] ${activeTab === 'providers' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} px-4`}>
          PROVIDERS
        </div>
        <div onClick={() => setActiveTab('caretype')} className={`flex flex-shrink-0 rounded-2xl py-1 cursor-pointer items-center text-[12px] ${activeTab === 'caretype' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} px-4`}>
          CARE TYPE
        </div>
        <div onClick={() => setActiveTab('services')} className={`flex flex-shrink-0 rounded-2xl py-1 cursor-pointer items-center text-[12px] ${activeTab === 'services' ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'} px-4`}>
          SERVICES
        </div>
      </div>
    </div>
  );
};

export default SortFilter;
