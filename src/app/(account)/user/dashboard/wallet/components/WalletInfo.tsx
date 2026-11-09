// // WalletInfo.tsx
// import React, { useEffect, useState } from "react";
// import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
// import FundWalletModal from "./FundWalletModal";
// import axios from "@/utils/axios";

// interface Transaction {
//   date: string;
//   description: string;
//   amount: number;
// }

// interface Wallet {
//   balance: string;
//   transactions: Transaction[];
// }

// interface WalletInfoProps {
//   totalBalance: number;
//   transactions: Transaction[];
//   color: string;
// }

// const WalletInfo: React.FC<WalletInfoProps> = ({ totalBalance, transactions, color }) => {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       {showModal && <FundWalletModal onClose={() => setShowModal(false)} />}
//       <div className="md:p-6 p-2 bg-white rounded-lg h-[50vh] overflow-auto">
//         {/* Wallet Info Header */}
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <p className="text-gray-600 text-lg p-2">Wallet Info</p>
//             <div className="flex items-center space-x-2">
//               <div className="w-6 h-6 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center">
//                 <span
//                   style={{
//                     backgroundColor: color,
//                     color: "white",
//                     borderRadius: 100,
//                     padding: 3,
//                   }}
//                 >
//                   <AutorenewOutlinedIcon />
//                 </span>
//               </div>
//               <span className="text-sm text-gray-400 px-2">TOTAL</span>
//             </div>
//           </div>
//           <span className="text-2xl font-bold text-gray-800">
//           ₦{totalBalance.toLocaleString()}
//           </span>
//         </div>

//         {/* Transaction History */}
//         {transactions.length > 0 ? (
//           transactions.map(({date, description, amount}, idx) => (
//             <div
//               key={idx}
//               className="flex items-center justify-between bg-gray-50 p-2 rounded-lg mb-2"
//             >
//               <div className="md:text-sm text-xs text-gray-500">
//                 {date.split("T")[0]}
//               </div>
//               <div className="md:text-sm text-xs text-gray-500">
//                 {description}
//               </div>
//               <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full md:text-sm text-xs font-semibold">
//                 {(amount/100).toLocaleString()}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-sm">No transactions available.</p>
//         )}
//       </div>
//       <button
//         className="w-full bg-green-800 text-white py-3 rounded-full font-semibold mt-4 mb-28"
//         onClick={() => setShowModal(!showModal)}
//       >
//         ADD TO WALLET
//       </button>
//     </>
//   );
// };


// export default WalletInfo;
"use client";

import React from "react";

import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

interface Transaction {
  _id?: string;
  id?: string | number;
  date?: string;
  createdAt?: string;
  description?: string;
  amount: number;
  type: "credit" | "debit";
  status?: string;
  reference?: string;
}

interface WalletInfoProps {
  totalBalance: number;
  transactions: Transaction[];
  color: string;
  title?: string;
  emptyMessage?: string;
  onAddFunds?: () => void;
  showAddFunds?: boolean;
}

const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (
  transaction: Transaction
) => {
  const date =
    transaction.createdAt ||
    transaction.date;

  if (!date) {
    return "Date unavailable";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(parsed);
};

const WalletInfo: React.FC<
  WalletInfoProps
> = ({
  totalBalance,
  transactions,
  color,
  title = "Wallet Activity",
  emptyMessage = "No transactions available.",
  onAddFunds,
  showAddFunds = true,
}) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-gray-100 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${color}12`,
                  color,
                }}
              >
                <AutorenewOutlinedIcon
                  sx={{ fontSize: 19 }}
                />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                  Activity
                </p>

                <h2 className="text-lg font-black text-gray-900">
                  {title}
                </h2>
              </div>
            </div>
          </div>

          {/* <div className="text-left sm:text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Activity total
            </p>

            <p
              className="mt-1 text-xl font-black"
              style={{ color }}
            >
              {formatNaira(
                Number(totalBalance || 0)
              )}
            </p>
          </div> */}
        </div>
      </div>

      {/* Transactions */}

      <div className="max-h-[560px] overflow-y-auto p-4 sm:p-5">
        {transactions.length > 0 ? (
          <div className="space-y-2">
            {transactions.map(
              (transaction, index) => {
                const isCredit =
                  transaction.type ===
                  "credit";

                const amount = Number(
                  transaction.amount || 0
                );

                const key =
                  transaction._id ||
                  transaction.id ||
                  `${transaction.createdAt}-${index}`;

                return (
                  <div
                    key={key}
                    className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3 transition hover:border-gray-200 hover:bg-white hover:shadow-sm sm:p-4"
                  >
                    {/* Icon */}

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        isCredit
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-500"
                      }`}
                    >
                      {isCredit ? (
                        <TrendingUpRoundedIcon
                          sx={{
                            fontSize: 20,
                          }}
                        />
                      ) : (
                        <TrendingDownRoundedIcon
                          sx={{
                            fontSize: 20,
                          }}
                        />
                      )}
                    </div>

                    {/* Description */}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-bold text-gray-900">
                          {transaction.description ||
                            (isCredit
                              ? "Wallet deposit"
                              : "Wallet purchase")}
                        </p>

                        {transaction.status && (
                          <span className="hidden rounded-full bg-white px-2 py-1 text-[9px] font-bold uppercase text-gray-400 ring-1 ring-gray-100 sm:inline-flex">
                            {transaction.status}
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex flex-wrap gap-x-2 text-xs text-gray-400">
                        <span>
                          {formatDate(
                            transaction
                          )}
                        </span>

                        {transaction.reference && (
                          <>
                            <span>•</span>
                            <span className="max-w-[160px] truncate">
                              {transaction.reference}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Amount */}

                    <div className="shrink-0 text-right">
                      <p
                        className={`text-sm font-black ${
                          isCredit
                            ? "text-emerald-600"
                            : "text-gray-900"
                        }`}
                      >
                        {isCredit ? (
                          `+ ${formatNaira(amount / 100)}`
                        ) : (
                          `- ${formatNaira(amount)}`
                        )}
                        
                      </p>

                      <p className="mt-1 hidden text-[10px] text-gray-400 sm:block">
                        {isCredit
                          ? "Credit"
                          : "Debit"}
                      </p>
                    </div>

                    <ArrowForwardRoundedIcon
                      sx={{ fontSize: 17 }}
                      className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-[#006838]"
                    />
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 px-5 py-16 text-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: `${color}10`,
                color,
              }}
            >
              <AutorenewOutlinedIcon
                sx={{ fontSize: 26 }}
              />
            </div>

            <h3 className="mt-4 text-base font-bold text-gray-900">
              Nothing here yet
            </h3>

            <p className="mt-1 max-w-sm text-sm leading-6 text-gray-500">
              {emptyMessage}
            </p>
          </div>
        )}
      </div>

      {/* Add funds */}

      {showAddFunds && onAddFunds && (
        <div className="border-t border-gray-100 p-4 sm:p-5">
          <button
            type="button"
            onClick={onAddFunds}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#006838] py-3.5 text-sm font-bold text-white shadow-lg shadow-green-100 transition hover:-translate-y-0.5 hover:bg-[#00542d] hover:shadow-xl"
          >
            Add money to wallet
          </button>
        </div>
      )}
    </section>
  );
};

export default WalletInfo;