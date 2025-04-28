import React from 'react';

interface Filter {
  name: string,
}

interface ServiceFilterButtonsProps {
  active: string;
  setActive: (tab: string) => void;
  filterArray: Filter[],
}



const ServiceFilterButtons: React.FC<ServiceFilterButtonsProps> = ({ active, setActive, filterArray }) => {


  return (
    <div className="flex p-4 my-1 gap-2 w-full">
      {filterArray.map((filter, index) => (
        <div
          key={index}
          onClick={() => setActive(filter.name)}
          className={`px-2 py-[6px] rounded-[12px] text-[10px] leading-[13.62px] font-[550] uppercase cursor-pointer
          ${filter.name === active ? "bg-[#006838] text-[#fff]" : "bg-[#EAF2FF] text-[#006838]"}`}
        > 
          {filter.name}
        </div>
      ))}
    </div>
  );

};

export default ServiceFilterButtons;
