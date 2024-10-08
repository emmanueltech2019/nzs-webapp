import { FC, ReactNode } from 'react';

interface GridWrapperProps {
  title: string;
  children: ReactNode;
}

const GridWrapper: FC<GridWrapperProps> = ({ title, children }) => {
  return (
    <div className="px-3 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm text-[#1F2024] font-sans font-extrabold">{title}</h2>
        <button className="text-[#006838] text-xs font-semibold">See more</button>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="flex space-x-4 mt-4 overflow-x-auto scrollbar-hide">
        <div className="flex-shrink-0 flex">
          {/* Container for Product Cards, showing 3 cards at a time */}
          <div className="flex space-x-3" style={{ minWidth: 'calc(60vw - 72px)', width: '10px' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridWrapper;
