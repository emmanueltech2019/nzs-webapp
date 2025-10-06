"use client";
import React, { useState } from "react";
import Incoming from "./components/orders/Incoming";
import SellerTransactionTab from "../../../../../../components/tabs/SellerTransactionTab";
import SellerTransStatusTab from "@/components/tabs/SellerTransStatusTab";
import { div } from "framer-motion/client";
import Pending from "./components/orders/Pending";
import ServiceFilterButtons from "@/components/SortFilter/ServiceFilterButtons";
import { sellerFilter } from "@/components/SortFilter/Filters";
import SortFilter from "@/components/SortFilter/SortFilter";
import Read from "./reviews/Read";
import { Icon } from "@iconify/react/dist/iconify.js";
import useToggle from "@/hooks/useToggle";
import DateFilterTab from "@/components/tabs/DateFilterTab";
import Options from "./components/Options";
import { Inter } from "next/font/google";
import PriceFilterTab from "@/components/tabs/PriceFilterTab";
import TagHeader from "@/components/header/TagHeader";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // You can add or remove as needed
  display: "swap",
});

const states = [
  "UMUAHIA",
  "JO",
  "AKWA-IBOM",
  "ANAMBARA",
  "BAUCHI",
  "BAYESLSA",
  "DELTA",
  "EBONYI",
  "PLATEAU",
  "NIGER",
  "KOGI",
];
const page = () => {
  const [activeTab, setActiveTab] = useState("Orders");
  const [activeOrderTab, setActiveOrderTab] = useState("Completed");
  const [activePendingTab, setActivePendingTab] = useState("Read");
  const [isVisible, toggleVisibility] = useToggle(false);
  const [activeFilter, setActiveFilter] = useState("Status");
  const [activeState, setActiveState] = useState("");

  const selectState = (state: string) => {
    setActiveState(state);
  };

  const orderTabs = ["Completed", "Pending"];
  const pendingTabs = ["Read", "Pending"];
  return (
    <div className="p-4 md:w-[85%] m-auto mb-[5rem]">
      {/* <SellerTransactionTab activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      {/* <div className="flex items-center gap-1 my-2 py-2 relative overflow-x-hidden">
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
          <ServiceFilterButtons
            filterArray={sellerFilter}
            active={activeFilter}
            setActive={setActiveFilter}
          />
        </div>
      </div> */}
      {/* <div>{activeFilter === "Date" && <DateFilterTab />}</div>
      <div>{activeFilter === "Price" && <PriceFilterTab />}</div> */}
      {/* <div>
        {activeFilter === "Location" && (
          <div>
            <div className="flex items-center justify-between my-4 px-4">
              <div>
                <h3 className="font-sans font-normal text-[#1F2024] text-[16px]">State</h3>
                <p className="font-sans font-normal text-[#71727A] text-[14px]">Available in Nigeria</p>
              </div>
              <div className="bg-[#006838] p-[6px] rounded-full h-[24px] w-[24px]"><p className={`text-[#FFFFFF] text-[10px] font-semibold ${inter.className} ms-[2px]`}>9</p></div>
            </div>

            <Options
              optionsArray={states}
              active={activeState}
              setActive={setActiveState}
            />
          </div>
          
        )}
      </div> */}
    <TagHeader title="Analytics" />
      <div className="">
        {/* {activeTab === "Orders" && (
          <div>
            {activeFilter === "Status" && (
              <SellerTransStatusTab
                activeStatTab={activeOrderTab}
                setActiveStatTab={setActiveOrderTab}
                tabs={orderTabs}
              />
            )}
            {activeOrderTab === "Completed" && <Incoming activeFilter={activeFilter}/>}
            {activeOrderTab === "Pending" && (
              <div>
                <Pending />
              </div>
            )}
          </div>
        )} */}
        <div>
          <Incoming activeFilter={activeFilter} />
        </div>
        {/* {activeTab === "Reviews" && (
          <div>
            <SellerTransStatusTab
              activeStatTab={activePendingTab}
              setActiveStatTab={setActivePendingTab}
              tabs={pendingTabs}
            />
            {activePendingTab === "Read" && <Read />}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default page;
