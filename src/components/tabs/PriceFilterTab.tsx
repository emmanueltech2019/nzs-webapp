import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const PriceFilterTab: React.FC = () => {
  const [count, setCount] = React.useState(100000);
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-NG").format(value); // e.g. 100000 → "100,000"
  };

  const prevCount = () => {
    if (count > 0){
        setCount(count - 1);
    }
  };
  const nextCount = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <div className="my-2 px-1">
        
        <div className="flex justify-between items-center my-2">
          <div className="border rounded-xl flex items-center justify-between px-2 py-2 pl-3 mt-2 w-[35%]">
            <Icon
              icon="mdi:naira"
              width="14"
              height="14"
              className="text-[#0C1F1F80]"
            />
            <span className="text-[14px]">Thousand</span>
            <Icon
              icon="tdesign:chevron-down"
              width="18"
              height="18"
              className="text-[#0C1F1F80]"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[12px]">Above</span>
            <div className="flex items-center gap-3">
              <Icon
                icon="clarity:minus-line"
                className="bg-[#EAF2FF] rounded-full cursor-pointer"
                width="22"
                height="22"
                onClick={prevCount}
              />
              <span className="text-[12px] w-[49px] mx-auto">{formatPrice(count)}</span>
              <Icon
                icon="mynaui:plus"
                className="bg-[#EAF2FF] rounded-full cursor-pointer"
                width="22"
                height="22"
                onClick={nextCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilterTab;
