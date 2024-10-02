import { FC } from 'react';
// import { FiFilter } from 'react-icons/fi';
import { Icon } from '@iconify/react/dist/iconify.js';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
const SortFilter: FC = () => {
  return (
    <div className="flex justify-between px-4 py-2">
      {/* <button className="flex items-center space-x-2 border p-2 rounded-md">
        <SwapVertIcon />
        <span>Sort</span>
        <KeyboardArrowDownOutlinedIcon/>
      </button> */}
      <button className="flex items-center p-2 rounded-md text-[12px]">
        {/* <FiFilter className='me-2'/> */}
        <Icon icon="hugeicons:menu-08" className='me-1'></Icon>
        <span>Filter</span>
        {/* <span className="ml-2 bg-[#006838] text-white text-[8px] px-2 py-1 rounded-full">2</span> */}
      </button>
    </div>
  );
};

export default SortFilter;
