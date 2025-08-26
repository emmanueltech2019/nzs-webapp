"use client";
import React, { useEffect, useState } from "react";
import WalletTab from "./components/WalletTab";
import AccountBalanceCard from "@/components/cards/AccountBalanceCard";
import WalletInfo from "./components/WalletInfo";
import axios from "@/utils/axios";
import Swal from "sweetalert2";

interface Transaction {
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit"; // Explicitly define the type
}

const page = () => {
  const [activeTab, setActiveTab] = useState("PURCHASE");
  const [balance, setBalance] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [creditTransactions, setCreditTransactions] = useState<Transaction[]>([]);
  const [debitTransactions, setDebitTransactions] = useState<Transaction[]>([]);

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
        const { wallet } = res.data;
        const allTransactions = wallet.transactions;

        // Split transactions into credit and debit
        const credits = allTransactions.filter((txn: Transaction) => txn.type === "credit");
        const debits = allTransactions.filter((txn: Transaction) => txn.type === "debit");

        setCreditTransactions(credits);
        setDebitTransactions(debits);

        // Calculate total balance
        const totalTransactionSum = allTransactions.reduce(
          (sum: number, txn: Transaction) => sum + txn.amount,
          0
        );
        setTotalBalance(totalTransactionSum);

        // Set wallet balance
        setBalance(wallet.balance);
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

  return (
    <div className="p-4 md:w-[85%] m-auto">
      <WalletTab activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="">
        {activeTab === "PURCHASE" && (
          <div>
            <AccountBalanceCard
              color="bg-[#006838]"
              value={balance}
              button={false}
            />
          </div>
        )}

        {activeTab === "DEPOSITS" && (
          <div>
            <AccountBalanceCard
              color="bg-[#E09427]"
              value={balance}
              button={false}
            />
          </div>
        )}
      </div>

      {activeTab === "PURCHASE" && (
        <div>
          <WalletInfo
            totalBalance={totalBalance/100}
            transactions={debitTransactions}
            color="#006838"
          />
        </div>
      )}
      {activeTab === "DEPOSITS" && (
        <div>
          <WalletInfo
            totalBalance={totalBalance/100}
            transactions={creditTransactions}
            color="#E09427"
          />
        </div>
      )}
    </div>
  );
};

export default page;
