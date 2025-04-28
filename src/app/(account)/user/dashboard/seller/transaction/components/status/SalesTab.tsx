// import React, { useState } from "react";

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

// const SalesTab = () => {
//   const [activeTab, setActiveTab] = useState<keyof typeof sampleData>("1D");

//   return (
//     <div>
//       <div className="flex gap-3 p-1 w-full mb-4">
//         {tabs.map((tab, index) => (
//           <div
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`w-full text-[14px] border-r-[2px] ${
//               index === tabs.length - 1 ? "border-none" : ""
//             } border-[#83838380] px-3 py-1 transition-all cursor-pointer`}
//           >
//             <span
//               className={`w-[20px] ${
//                 activeTab === tab
//                   ? "text-[#006838] border-b-[1.3px] border-[#006838] font-semibold"
//                   : "text-gray-600 hover:text-[#006838] hover:font-semibold"
//               }`}
//             >
//               {tab}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SalesTab;
