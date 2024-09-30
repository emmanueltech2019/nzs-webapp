import React from 'react';
import placeholder from '@/assets/images/productMockup.png'
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';

type TransactionCardProps = {
  title: string;
  location: string;
  timeAgo: string;
  yesterday?: boolean;
  deleteFunc: () => void;
};

const TransactionCard: React.FC<TransactionCardProps> = ({ title, location, timeAgo, yesterday, deleteFunc }) => {
  return (
    <>
      {yesterday && (
        <div className="mt-4 mb-2 text-gray-500 font-semibold">Yesterday</div>
      )}
      <div className={`flex items-center justify-between bg-white shadow rounded-2xl mb-4 overflow-hidden`}>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 min-h-full w-20 self-stretch">
            <Image src={placeholder} alt="Placeholder" className="h-full w-full object-cover" />
          </div>
          <div className='py-4'>
            <div className="text-lg font-extrabold">{title}</div>
            <div className='flex space-x-2'>
              <div className="text-sm text-gray-500">{location}</div>
              <div className="text-sm text-gray-400 italic font-semibold tracking-wide">{timeAgo}</div>

            </div>
          </div>
        </div>
        <div className='flex'>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none flex space-x-3 pr-4">
            <Icon icon="ep:arrow-right-bold" className='text-[#8F9098] text-base' />
          </button>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none flex space-x-3 pr-4" onClick={deleteFunc}>
            <span className='flex items-center justify-center w-6 h-6 rounded-full bg-[#D4D6DD] '>
              <Icon icon="mingcute:close-fill" className='text-[12px] text-white' />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionCard;
