import React, { useState } from "react";
import Charts from "../Charts";
import StatusTab from "@/components/tabs/StatusTab";
import StatCards from "../StatCards";
import Summary from "./Summary";
import Toplist from "./Toplist";

const tabs: Array<keyof typeof sampleData> = ["1D", "5D", "1M", "6M", "1Y"];

const sampleData = {
  "1D": [
    { name: "10am", sales: 2400 },
    { name: "11am", sales: 1398 },
    { name: "12pm", sales: 9800 },
    { name: "1pm", sales: 3908 },
    { name: "2pm", sales: 4800 },
  ],
  "5D": [
    { name: "Mon", sales: 3000 },
    { name: "Tue", sales: 5000 },
    { name: "Wed", sales: 4000 },
    { name: "Thu", sales: 2500 },
    { name: "Fri", sales: 6000 },
  ],
  "1M": [
    { name: "Week 1", sales: 12000 },
    { name: "Week 2", sales: 15000 },
    { name: "Week 3", sales: 14000 },
    { name: "Week 4", sales: 17000 },
  ],
  "6M": [
    { name: "Jan", sales: 30000 },
    { name: "Feb", sales: 25000 },
    { name: "Mar", sales: 27000 },
    { name: "Apr", sales: 32000 },
    { name: "May", sales: 35000 },
    { name: "Jun", sales: 37000 },
  ],
  "1Y": [
    { name: "Jan", sales: 15000 },
    { name: "Feb", sales: 18000 },
    { name: "Mar", sales: 20000 },
    { name: "Apr", sales: 23000 },
    { name: "May", sales: 26000 },
    { name: "Jun", sales: 29000 },
    { name: "Jul", sales: 30000 },
    { name: "Aug", sales: 32000 },
    { name: "Sep", sales: 35000 },
    { name: "Oct", sales: 33000 },
    { name: "Nov", sales: 31000 },
    { name: "Dec", sales: 40000 },
  ],
};

const mockData = {
  "1D": {
    dayLow: 11999.87,
    dayHigh: 12248.15,
    prevLow: 10440.64,
    prevHigh: 15265.42,
    current: 12166.6,
  },
  "5D": {
    dayLow: 11789.34,
    dayHigh: 12500.0,
    prevLow: 10200.0,
    prevHigh: 14900.0,
    current: 12010.25,
  },
  "1M": {
    dayLow: 11050.5,
    dayHigh: 12999.99,
    prevLow: 10000.0,
    prevHigh: 15500.0,
    current: 12500.75,
  },
  "6M": {
    dayLow: 9500.1,
    dayHigh: 14500.0,
    prevLow: 8800.0,
    prevHigh: 16000.0,
    current: 13880.6,
  },
  "1Y": {
    dayLow: 8600.0,
    dayHigh: 15000.0,
    prevLow: 7999.99,
    prevHigh: 17000.0,
    current: 14220.3,
  },
};

const customersData = {
  "1D": [
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+12%",
      image: "/customer1.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+3%",
      image: "/customer2.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+1%",
      image: "/customer3.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+8%",
      image: "/customer4.png",
      changeColor: "text-[#77B900]",
    },
  ],
  "5D": [
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+15%",
      image: "/customer1.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+2%",
      image: "/customer2.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "-1%",
      image: "/customer3.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+6%",
      image: "/customer4.png",
      changeColor: "text-[#77B900]",
    },
  ],
  "1M": [
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+20%",
      image: "/customer1.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+5%",
      image: "/customer2.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+3%",
      image: "/customer3.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+9%",
      image: "/customer4.png",
      changeColor: "text-[#77B900]",
    },
  ],
  "6M": [
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+30%",
      image: "/customer1.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+7%",
      image: "/customer2.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+4%",
      image: "/customer3.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+11%",
      image: "/customer4.png",
      changeColor: "text-[#77B900]",
    },
  ],
  "1Y": [
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+50%",
      image: "/customer1.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+10%",
      image: "/customer2.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+6%",
      image: "/customer3.png",
      changeColor: "text-[#77B900]",
    },
    {
      name: "____ ____",
      amount: "₦000,000.00",
      change: "+12%",
      image: "/customer4.png",
      changeColor: "text-[#77B900]",
    },
  ],
};


const Status = () => {
  const [activeTab, setActiveTab] = React.useState("Charts");
  const [activeSalesTab, setActiveSalesTab] =
    useState<keyof typeof sampleData>("1D");
  return (
    <div>
      <div>
        <div>
          <StatusTab activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex gap-3 p-1 w-full my-4">
          {tabs.map((tab, index) => (
            <div
              key={tab}
              onClick={() => setActiveSalesTab(tab)}
              className={`w-full text-[14px] border-r-[2px] ${
                index === tabs.length - 1 ? "border-none" : ""
              } border-[#83838380] px-3 py-1 transition-all cursor-pointer`}
            >
              <span
                className={`w-[20px] ${
                  activeSalesTab === tab
                    ? "text-[#006838] border-b-[1.3px] border-[#006838] font-semibold"
                    : "text-gray-600 hover:text-[#006838] hover:font-semibold"
                }`}
              >
                {tab}
              </span>
            </div>
          ))}
        </div>
        {activeTab === "Charts" && (
          <Charts
            activeTab={activeSalesTab}
            data={sampleData[activeSalesTab]}
          />
        )}
        {activeTab === "Summary" && (
          <Summary
            dayLow={mockData[activeSalesTab].dayLow}
            dayHigh={mockData[activeSalesTab].dayHigh}
            prevLow={mockData[activeSalesTab].prevLow}
            prevHigh={mockData[activeSalesTab].prevHigh}
            current={mockData[activeSalesTab].current}
          />
        )}
        {activeTab === "Toplist" && <Toplist customers={customersData[activeSalesTab]} />}
      </div>
      <div className="mt-[2rem]">
        <StatCards />
      </div>
    </div>
  );
};

export default Status;
