import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CancelIcon from '@mui/icons-material/Cancel';

type TransactionCardProps = {
  title: string;
  location: string;
  timeAgo: string;
  yesterday?: boolean;
};

const TransactionCard: React.FC<TransactionCardProps> = ({ title, location, timeAgo, yesterday }) => {
  return (
    <>
      {yesterday && (
        <div className="mt-4 mb-2 text-gray-500 font-semibold">Yesterday</div>
      )}
      <div className="flex items-center justify-between bg-white p-4 shadow rounded-lg mb-4">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center">
            <img src="/placeholder-image.svg" alt="Placeholder" className="h-8 w-8" />
          </div>
          <div>
            <div className="text-lg font-medium">{title}</div>
            <div className='flex space-x-2'>
              <div className="text-sm text-gray-500">{location}</div>
              <div className="text-sm text-gray-400 italic">{timeAgo}</div>

            </div>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none flex space-x-3">
            <KeyboardArrowRightIcon/>
            <CancelIcon/>
        </button>
      </div>
    </>
  );
};

export default TransactionCard;
