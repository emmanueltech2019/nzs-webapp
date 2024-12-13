// WalletInfo.tsx
import React, { useEffect, useState } from "react";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import FundWalletModal from "./FundWalletModal";
import axios from "@/utils/axios";

interface Transaction {
  date: string;
  description: string;
  amount: number;
}

interface Wallet {
  balance: string;
  transactions: Transaction[];
}

interface WalletInfoProps {
  totalBalance: number;
  transactions: Transaction[];
  color: string;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ totalBalance, transactions, color }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <FundWalletModal onClose={() => setShowModal(false)} />}
      <div className="md:p-6 p-2 bg-white rounded-lg h-[50vh] overflow-auto">
        {/* Wallet Info Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-600 text-lg p-2">Wallet Info</p>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center">
                <span
                  style={{
                    backgroundColor: color,
                    color: "white",
                    borderRadius: 100,
                    padding: 3,
                  }}
                >
                  <AutorenewOutlinedIcon />
                </span>
              </div>
              <span className="text-sm text-gray-400 px-2">TOTAL</span>
            </div>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            {totalBalance.toLocaleString()}
          </span>
        </div>

        {/* Transaction History */}
        {transactions.length > 0 ? (
          transactions.map((transaction, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-lg mb-2"
            >
              <div className="md:text-sm text-xs text-gray-500">
                {transaction.date.split("T")[0]}
              </div>
              <div className="md:text-sm text-xs text-gray-500">
                {transaction.description}
              </div>
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full md:text-sm text-xs font-semibold">
                {transaction.amount.toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No transactions available.</p>
        )}
      </div>
      <button
        className="w-full bg-green-800 text-white py-3 rounded-full font-semibold mt-4 mb-28"
        onClick={() => setShowModal(!showModal)}
      >
        ADD TO WALLET
      </button>
    </>
  );
};


export default WalletInfo;
