"use client";
import React, { useState } from "react";
import ServicesTab from "@/components/tabs/ServicesTab";
import ServiceFilterButtons from "@/components/SortFilter/ServiceFilterButtons";
import { sellerFilter } from "@/components/SortFilter/Filters";
import useToggle from "@/hooks/useToggle";
import { Icon } from "@iconify/react";
import SellerTransStatusTab from "@/components/tabs/SellerTransStatusTab";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>("ROUTES");
  const [isVisible, toggleVisibility] = useToggle(false);
  const [activeStatTab, setActiveStatTab] = useState<string>("Completed");

  return (
    <div>
      <div className="p-3">
        <div>
          <ServicesTab activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex items-center gap-1 my-2 py-2 relative overflow-x-hidden">
          <div className="flex items-center gap-1 my-2 p-2 bg-[#FFF] z-40">
            <Icon
              icon="hugeicons:menu-08"
              className={`text-[#8F9098]`}
              width="15"
              height="15"
            />
            <p className="text-[14px] font-normal text-[#1F2024] leading-4">
              Filter
            </p>
            <Icon
              icon="mynaui:chevron-left"
              className={`cursor-pointer ms-2 text-[#8F9098] ${
                isVisible ? "rotate-180" : ""
              }`}
              width="19"
              height="19"
              onClick={() => toggleVisibility()}
            />
          </div>
          <div
            className={`absolute overflow-x-auto whitespace-nowrap ${
              isVisible ? "right-[70%]" : "right-0"
            } transition-all duration-500 ease-in-out`}
          >
            <ServiceFilterButtons filterArray={sellerFilter} active="Status" />
          </div>
        </div>
        <SellerTransStatusTab
          tabs={["Completed", "Pending"]}
          activeStatTab={activeStatTab}
          setActiveStatTab={setActiveStatTab}
        />
        {children}
      </div>
    </div>
  );
}
