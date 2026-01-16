"use client";
import React, { useEffect, useState } from "react";
import Incoming from "./components/orders/Incoming";
import WalletTab from "../../../../../../components/tabs/WalletTab";
import SellerTransStatusTab from "@/components/tabs/SellerTransStatusTab";
import { div } from "framer-motion/client";
import Pending from "./components/orders/Pending";
import ServiceFilterButtons from "@/components/SortFilter/ServiceFilterButtons";
import { sellerFilter, walletFilter } from "@/components/SortFilter/Filters";
import SortFilter from "@/components/SortFilter/SortFilter";
import Read from "./reviews/Read";
import AccountBalanceCard from "@/components/cards/AccountBalanceCard";
import WalletInfo from "./components/WalletInfo";
import axios from "@/utils/axios";
import Swal from "sweetalert2";

interface Transaction {
  date: string;
  description: string;
  amount: number;
}
interface TransactionGroup {
  year: string;
  month: string;
  data: Transaction[];
}
interface Wallet {
  balance: number;
  transactions: Transaction[];
}

const page = () => {
  const [activeTab, setActiveTab] = useState("PAYIN");
  const [balance, setBalance] = useState(0);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [activeFilterTabProp, setActiveFilterTabProp] = useState('popular');
  const data = ['popular', 'not popular', 'location'];
  const totalBalance = 0
  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      console.error("User token is missing.");
      return;
    }

    axios({
      method: "GET",
      url: "/users/profile",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log("Balance", res.data.wallet.balance);
        setWallet({
          balance: res.data.wallet.balance,
          transactions: res.data.wallet.transactions,
        });
        // setAddress(res.data.user.addresses.street)
      })
      .catch((error) => {
         if(error.response.data.message==="Unauthorized access"){
            Swal.fire({
              title: "Session Expired",
              text: "Your session has expired. Please log in again.",
              icon: "warning",
              confirmButtonText: "OK",
            }).then(() => {
              localStorage.clear();
              window.location.replace("/auth/login");
            });
            return;
          }
        console.error("Error fetching profile:", error);
      });
  }, []);

  const transactions: TransactionGroup[] = [

  ];
  return (
    <div className="p-4 md:w-[85%] m-auto">
      <WalletTab activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="">
        {activeTab === "PAYIN" && (
          <div>
            <AccountBalanceCard color="bg-[#006838]" value={wallet?.balance || 0} button={true} />
          </div>
        )}

        {activeTab === "WITHDRAWAL" && (
          <div>
            <AccountBalanceCard color="bg-[#E09427]" value={wallet?.balance || 0} button={true}/>
          </div>
        )}
      </div>
      <div className="md:ms-5 flex items-center">
        <SortFilter activeTab={activeFilterTabProp} setActiveTab={setActiveFilterTabProp} sortFilterArray={data} />
        <ServiceFilterButtons active="Status" setActive={setActiveTab} filterArray={walletFilter} />
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
