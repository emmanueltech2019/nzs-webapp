import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const DateFilterTab: React.FC = () => {
  const [count, setCount] = React.useState(4);

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
        <div className="flex justify-between items-center">
          <h2 className="text-[#0C1F1F] text-[22px] font-bold font-sans">
            2024
          </h2>
          <div className="flex items-center gap-1">
            <button className="rounded-full text-[#0C1F1F] text-[12px] font-normal font-sans bg-[#CFEBDE] py-1 px-4">
              September
            </button>
            <Icon
              icon="tdesign:chevron-down"
              width="20"
              height="20"
              className="text-[#0C1F1F80]"
            />
          </div>
        </div>

        <div className="flex justify-between items-center my-2">
          <div className="border rounded-xl flex items-center justify-between px-2 py-2 pl-3 mt-2 w-[35%]">
            <Icon
              icon="gravity-ui:arrow-up-arrow-down"
              width="14"
              height="14"
              className="text-[#0C1F1F80]"
            />
            <span className="text-[14px]">Recent</span>
            <Icon
              icon="tdesign:chevron-down"
              width="18"
              height="18"
              className="text-[#0C1F1F80]"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[12px]">Period</span>
            <div className="flex items-center gap-3">
              <Icon
                icon="clarity:minus-line"
                className="bg-[#EAF2FF] rounded-full cursor-pointer"
                width="22"
                height="22"
                onClick={prevCount}
              />
              <span className="text-[12px] w-[49px] mx-auto">{count} {count > 1 ? "Days" : "Day"}</span>
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

export default DateFilterTab;
