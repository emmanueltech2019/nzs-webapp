// import React, {FC} from 'react'
// import { Inter } from 'next/font/google';

// const inter = Inter({
//   display: "swap",
//   subsets: ["latin"],
//   // variable: '--font-poppins',
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
// })
// interface WalletTabProps{
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
// }

// const WalletTab: FC<WalletTabProps> = ({ activeTab, setActiveTab }) => {

//   return (
//     <div className='flex items-center w-full md:w-[90%] md:mx-[40px] border-b-[2px] '>
//       <button onClick={() => setActiveTab('PURCHASE')} className={`font-sans text-xs text-center uppercase w-full p-4 transition duration-700 ${activeTab === 'PURCHASE' ? 'bg-[#EAF2FF] border-b-4 border-[#006838] text-[#71727A] font-bold' : `border-b-[#0C1F1F33] ${inter.className} antialiased`}`}>
//         PURCHASE
//       </button>
//       <button onClick={() => setActiveTab('DEPOSITS')} className={`font-sans text-xs text-center uppercase w-full p-4 transition duration-700 ${activeTab === 'DEPOSITS' ? 'bg-[#EAF2FF] border-b-4 border-[#006838] text-[#71727A] font-bold' : `border-b-[#0C1F1F33] ${inter.className} antialiased`}`}>
//         DEPOSITS
//       </button>
//     </div>
//   )
// }

// export default WalletTab
"use client";

import React, { FC } from "react";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";

type WalletTabType = "PURCHASE" | "DEPOSITS";

interface WalletTabProps {
  activeTab: WalletTabType;
  setActiveTab: (tab: WalletTabType) => void;
  purchaseCount?: number;
  depositCount?: number;
}

const WalletTab: FC<WalletTabProps> = ({
  activeTab,
  setActiveTab,
  purchaseCount = 0,
  depositCount = 0,
}) => {
  const tabs = [
    {
      id: "PURCHASE" as const,
      label: "Purchases",
      count: purchaseCount,
      icon: (
        <PaymentsRoundedIcon
          sx={{ fontSize: 19 }}
        />
      ),
    },
    {
      id: "DEPOSITS" as const,
      label: "Deposits",
      count: depositCount,
      icon: (
        <AccountBalanceWalletRoundedIcon
          sx={{ fontSize: 19 }}
        />
      ),
    },
  ];

  return (
    <div
      role="tablist"
      aria-label="Wallet sections"
      className="grid grid-cols-2 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm"
    >
      {tabs.map((tab) => {
        const active =
          activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`relative flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
              active
                ? "bg-[#006838] text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            {tab.icon}

            <span>{tab.label}</span>

            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                active
                  ? "bg-white/15 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default WalletTab;