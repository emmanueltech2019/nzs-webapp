import React from "react";
import { Icon } from "@iconify/react";

const StatCards = () => {
  return (
    <div className="font-sans">
      <div>
        <div className="flex items-center w-full gap-2">
          {/* pending sales */}
          <div className="flex-1">
            <p className="text-[#C5C6CC] text-[14px] font-normal font-sans my-1">
              Pending Sales
            </p>
            <div className="px-[20px] py-4 bg-[#FFBB5B] rounded-lg">
              <span className="text-[#000000] text-[20px] font-semibold">
                ₦14,032.56
              </span>
            </div>
          </div>
          {/* Increase */}
          <div>
            <p className="text-[#C5C6CC] text-[14px] text-center font-normal font-sans my-1">
              Increase
            </p>
            <div className="px-[20px] py-5 bg-[#006838] rounded-lg">
              <span className="flex items-center text-[#fff] text-[14px] font-semibold">
                <Icon icon="basil:plus-outline" width="22" height="22" />
                20%
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full gap-2">
          {/* pending sales */}
          <div className="flex-1">
            <p className="text-[#C5C6CC] text-[14px] font-normal font-sans my-1">
              Inventory Total
            </p>
            <div className="px-[20px] pe-3 py-3 bg-[#EAF2FF] rounded-lg flex items-center justify-between">
              <span className="text-[#000000] text-[20px] font-semibold">
                ₦7,532.21
              </span>
              <div>
                <div className="px-[15px] py-3 bg-[#FFBB5B] rounded-lg">
                  <Icon icon="lucide:arrow-right" className="text-[#fff]" width="20" height="20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
