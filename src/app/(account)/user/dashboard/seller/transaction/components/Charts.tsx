import { div } from "framer-motion/client";
import { Open_Sans } from "next/font/google";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const tabs: Array<keyof typeof sampleData> = ["1D", "5D", "1M", "6M", "1Y"];

// const sampleData = {
//   "1D": [
//     { name: "10am", sales: 2400 },
//     { name: "11am", sales: 1398 },
//     { name: "12pm", sales: 9800 },
//     { name: "1pm", sales: 3908 },
//     { name: "2pm", sales: 4800 },
//   ],
//   "5D": [
//     { name: "Mon", sales: 3000 },
//     { name: "Tue", sales: 5000 },
//     { name: "Wed", sales: 4000 },
//     { name: "Thu", sales: 2500 },
//     { name: "Fri", sales: 6000 },
//   ],
//   "1M": [
//     { name: "Week 1", sales: 12000 },
//     { name: "Week 2", sales: 15000 },
//     { name: "Week 3", sales: 14000 },
//     { name: "Week 4", sales: 17000 },
//   ],
//   "6M": [
//     { name: "Jan", sales: 30000 },
//     { name: "Feb", sales: 25000 },
//     { name: "Mar", sales: 27000 },
//     { name: "Apr", sales: 32000 },
//     { name: "May", sales: 35000 },
//     { name: "Jun", sales: 37000 },
//   ],
//   "1Y": [
//     { name: "Jan", sales: 15000 },
//     { name: "Feb", sales: 18000 },
//     { name: "Mar", sales: 20000 },
//     { name: "Apr", sales: 23000 },
//     { name: "May", sales: 26000 },
//     { name: "Jun", sales: 29000 },
//     { name: "Jul", sales: 30000 },
//     { name: "Aug", sales: 32000 },
//     { name: "Sep", sales: 35000 },
//     { name: "Oct", sales: 33000 },
//     { name: "Nov", sales: 31000 },
//     { name: "Dec", sales: 40000 },
//   ],
// };

const stats = [
  { label: "High", value: "₦11,691.89" },
  { label: "Prev Close (Yesterday)", value: "₦11,512.41" },
  { label: "Low", value: "₦11,470.47" },
  { label: "Open", value: "₦11,690.11" },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: { name: string; sales: number } }[];
}

interface ChartsProps {
  activeTab: string;
  data: { name: string; sales: number }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-[#20E58A] shadow-md rounded-md px-3 py-2 text-xs text-gray-800">
        <p className="font-semibold text-[11px]">
          <strong>Best Sale:</strong> {data.name}
        </p>
        <p className="font-semi-bold text-[#fff] text-[16px] w-full">
          ₦{data.sales.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const Charts: React.FC<ChartsProps> = ({activeTab, data}) => {
  // const [activeTab, setActiveTab] = useState<keyof typeof sampleData>("1D");
  // const data = sampleData[activeTab];

  return (
    <div>
      <div className="w-full py-4">
        {/* <div className="flex justify-between items-center mb-4 w-full">
          <div className="flex gap-3 p-1 w-full">
            {tabs.map((tab, index) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-[14px] border-r-[2px] ${
                  index === tabs.length - 1 ? "border-none" : ""
                } border-[#83838380] px-3 py-1 transition-all cursor-pointer
                `}
              >
                <span
                  className={`w-[20px] ${
                    activeTab === tab
                      ? "text-[#006838] border-b-[1.3px] border-[#006838] font-semibold"
                      : "text-gray-600 hover:text-[#006838] hover:font-semibold"
                  }`}
                >
                  {tab}
                </span>
              </div>
            ))}
          </div>
        </div> */}

        <ResponsiveContainer width="104%" height={270}>
          <AreaChart
            data={data}
            margin={{ top: 15, right: 22, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#006838" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#006838" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              stroke="#6F6AF838"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fontFamily: "'Open Sans', sans-serif", dy: 19 }}
              stroke="#9CA3AF"
              strokeOpacity={0}
            />
            <YAxis
              tick={{ fontSize: 12, fontFamily: "'Open Sans', sans-serif", dx: -19 }}
              stroke="#9CA3AF"
              strokeOpacity={0}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#006838"
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="px-3 mt-3 ms-2">
        <div className="grid grid-cols-2 gap-y-6 gap-x-6">
          {stats.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-2">
              <span className="text-[14px] text-[#838383] font-sans">{label}</span>
              <span className="text-[16px] text-[#2C2C2C] font-semibold font-sans">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Charts;
