import { FC } from 'react';
import { FiFilter } from 'react-icons/fi';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
const SortFilter: FC = () => {
  return (
    <div className="flex justify-between px-4 py-2">
      <button className="flex items-center space-x-2 border p-2 rounded-md">
        <SwapVertIcon />
        <span>Sort</span>
        <KeyboardArrowDownOutlinedIcon/>
      </button>
      <button className="flex items-center space-x-2 border p-2 rounded-md">
        <FiFilter />
        <span>Filter</span>
        <span className="ml-2 bg-[#006838] text-white text-[8px] px-2 py-1 rounded-full">2</span>
      </button>
    </div>
  );
};

export default SortFilter;
