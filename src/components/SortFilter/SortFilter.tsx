import { FC, useState } from 'react';
// import { FiFilter } from 'react-icons/fi';
import { Icon } from '@iconify/react/dist/iconify.js';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { FaChevronRight } from 'react-icons/fa';
interface SortFilter {
  activeTab: string,
  setActiveTab:(tabId: string) => void,
  sortFilterArray: string[]
}

const SortFilter: FC<SortFilter> = ({ activeTab, setActiveTab, sortFilterArray }) => {
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
        {sortFilterArray.map((filter, index) => (
          <div key={index} onClick={() => setActiveTab(filter)} className={`flex flex-shrink-0 rounded-2xl py-1 cursor-pointer items-center text-[12px] px-4 ${activeTab === filter ? 'bg-[#006838] text-white' : 'bg-[#EAF2FF] text-[#006838]'}`}>
            {filter.toLocaleUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortFilter;
