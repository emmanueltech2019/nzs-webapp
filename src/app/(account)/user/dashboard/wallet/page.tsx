"use client";
import React, { useState } from "react";
import Incoming from "./components/orders/Incoming";
import WalletTab from "../../../../../components/tabs/WalletTab";
import SellerTransStatusTab from "@/components/tabs/SellerTransStatusTab";
import { div } from "framer-motion/client";
import Pending from "./components/orders/Pending";
import ServiceFilterButtons from "@/components/SortFilter/ServiceFilterButtons";
import { sellerFilter, walletFilter } from "@/components/SortFilter/Filters";
import SortFilter from "@/components/SortFilter/SortFilter";
import Read from "./reviews/Read";
import AccountBalanceCard from "@/components/cards/AccountBalanceCard";
import WalletInfo from "./components/WalletInfo";

const page = () => {
  const [activeTab, setActiveTab] = useState("PAYIN");
  const totalBalance = 2542522.34;
  const transactions = [
    {
      year: "2024",
      month: "September",
      data: [
        { date: "30 Sep", description: "Product...", amount: 3000 },
        { date: "30 Sep", description: "Product...", amount: 3000 },
        { date: "30 Sep", description: "Product...", amount: 3000 },
      ],
    },
    {
      year: "Yesterday",
      month: "",
      data: [
        { date: "30 Sep", description: "Product...", amount: 3000 },
      ],
    },
  ];
  return (
    <div className="p-4 md:w-[85%] m-auto">
      <WalletTab activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="">
        {activeTab === "PAYIN" && (
          <div>
            <AccountBalanceCard color="bg-[#006838]" value={1563} />
          </div>
        )}

        {activeTab === "WITHDRAWAL" && (
          <div>
            <AccountBalanceCard color="bg-[#E09427]" value={1563} />
          </div>
        )}
      </div>
      <div className="md:ms-5 flex items-center">
        <SortFilter />
        <ServiceFilterButtons active="Status" filterArray={walletFilter} />
      </div>
      {activeTab === "PAYIN" && (
          <div>
            <WalletInfo totalBalance={totalBalance} transactions={transactions} color="#006838" />
          </div>
        )}
{activeTab === "WITHDRAWAL" && (
          <div>
            <WalletInfo totalBalance={totalBalance} transactions={transactions} color="#E09427" />
          </div>
        )}
      


    </div>
  );
};

export default page;
