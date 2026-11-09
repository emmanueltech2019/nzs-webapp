// 'use client'
// import TagHeader from '@/components/header/TagHeader';
// import TransactionCard from './components/TransactionCard';
// import TransactionTab from '@/components/tabs/TransactionTab';
// import { useEffect, useState } from 'react';
// import openSansFont from '@/fonts/OpenSans';
// import axios from "@/utils/axios";


// interface Transaction {
//   id: number; // Assuming each notification has an id; adjust as needed
//   totalAmount: number; // Example field; adjust based on actual notification fields
//   status: string; // Example field
//   createdAt: string;
//   paymentReference: string;
//   _id: string;
// }

// const Transactions = () => {
//   const [pendingTransaction, setPendingTransaction] = useState<Transaction[]>([]);
//   const [completedTransaction, setCompletedTransaction] = useState<Transaction[]>([]);
//   const [failedTransaction, setFailedTransaction] = useState<Transaction[]>([]);

//   const initialState = [
//     { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 0 },
//     { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 1 },
//     { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 2 },
//     { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 3 },
//     { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', yesterday: true, id: 4 },
//     { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 5 },
//   ];

//   useEffect(() => {
//     // const userToken = localStorage.getItem("userToken");
//     // const tr = userToken ? JSON.parse(userToken) : null;

//     axios({
//       url: 'users/orders',
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     }).then((res) => {
//       const transactions: Transaction[] = res.data.orders;
//       // Separate notifications into read and unread based on isRead
//       setPendingTransaction(transactions.filter(transaction => transaction.status=="pending"));
//       setCompletedTransaction(transactions.filter(transaction => transaction.status=="completed"));
//       setFailedTransaction(transactions.filter(transaction => transaction.status=="failed"));
//       console.log("Transactions fetched:", pendingTransaction, completedTransaction, failedTransaction);
//     }).catch((error) => {
//       console.error("Error fetching notifications:", error);
//     });
//   }, []);
//   const [transactions, setTransactions] = useState(initialState)
//   const removeTrasaction = (i: number) => {
//     const item = transactions[i]
//     setTransactions(prev => prev.filter(tr => tr.id !== item.id))
//   }
//   const [activeTab, setActiveTab] = useState('completed');

//   return (
//     <div className={`max-w-2xl mx-auto px-4 py-6 ${openSansFont}`}>
//       <TagHeader title='My Transactions' />

//       <TransactionTab activeTab={activeTab} setActiveTab={setActiveTab} />
//       {activeTab == 'completed' ?
//         ( <div>
//           {completedTransaction.length > 0 ?<>{completedTransaction.map(({ totalAmount, status, createdAt, paymentReference, _id}, index) => (
//             <TransactionCard
//             key={index}
//             title={`${status} Transaction`}
//             location={paymentReference}
//             timeAgo={createdAt.split('T')[0]}
//             yesterday={true}
//             deleteFunc={() => removeTrasaction(index)}
//             _id={_id}
//           />
//           ))}</>:<><div className='failed'>
//           <h1>no completed transaction</h1>
//         </div></>}
          
//         </div>)
//         : activeTab == 'pending' ?
//           ( <div>
//             {pendingTransaction.length > 0 ?<>{pendingTransaction.map(({ totalAmount, status, createdAt, paymentReference, _id}, index) => (
//               <TransactionCard
//                 key={index}
//                 title={`${status} Transaction`}
//                 location={paymentReference}
//                 timeAgo={createdAt.split('T')[0]}
//                 yesterday={true}
//                 deleteFunc={() => removeTrasaction(index)}
//                 _id={_id}
//               />
//             ))}</>:<><div className='pending'>
//             <h1>no pending transaction</h1>
//           </div></>}
            
//           </div>)
//           : (
//             <div>
//               {failedTransaction.length > 0 ?<>{failedTransaction.map(({ totalAmount, status, createdAt, paymentReference, _id}, index) => (
//                 <TransactionCard
//                 key={index}
//                 title={`${status} Transaction`}
//                 location={paymentReference}
//                 timeAgo={createdAt.split('T')[0]}
//                 yesterday={true}
//                 deleteFunc={() => removeTrasaction(index)}
//                 _id={_id}
//               />
//               ))}</>:<><div className='failed'>
//               <h1>no failed transaction</h1>
//             </div></>}
              
//             </div>
//           )}


//     </div>
//   );
// };

// export default Transactions;

"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import TagHeader from "@/components/header/TagHeader";
import TransactionCard from "./components/TransactionCard";
import TransactionTab from "@/components/tabs/TransactionTab";
import CircleLoader from "@/components/loader/loader";

import axios from "@/utils/axios";
import Swal from "sweetalert2";

import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import openSansFont from "@/fonts/OpenSans";

interface Transaction {
  id?: number | string;
  _id: string;
  totalAmount?: number | string;
  grandTotal?: number | string;
  status: string;
  createdAt: string;
  paymentReference?: string;
  orderReference?: string;
}

type TransactionTabType =
  | "completed"
  | "pending"
  | "failed";

type TransactionResponse = {
  orders?: Transaction[];
};

const NORMALIZED_STATUS = {
  completed: [
    "completed",
    "successful",
    "success",
    "succeeded",
  ],
  pending: ["pending", "processing", "in_progress"],
  failed: [
    "failed",
    "failure",
    "cancelled",
    "canceled",
    "rejected",
  ],
} as const;

const normalizeStatus = (status?: string) =>
  String(status || "")
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, "_");

const getStatusGroup = (
  status?: string
): TransactionTabType | null => {
  const normalized = normalizeStatus(status);

  if (
    NORMALIZED_STATUS.completed.includes(
      normalized as never
    )
  ) {
    return "completed";
  }

  if (
    NORMALIZED_STATUS.pending.includes(
      normalized as never
    )
  ) {
    return "pending";
  }

  if (
    NORMALIZED_STATUS.failed.includes(
      normalized as never
    )
  ) {
    return "failed";
  }

  return null;
};

const formatCurrency = (amount: unknown) => {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return "₦0.00";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(value);
};

const formatDate = (date?: string) => {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
};

const getReference = (transaction: Transaction) => {
  return (
    transaction.paymentReference ||
    transaction.orderReference ||
    transaction._id
  );
};

const EmptyTransactions = ({
  status,
  onReset,
}: {
  status: TransactionTabType;
  onReset?: () => void;
}) => {
  const config = {
    completed: {
      icon: <CheckCircleRoundedIcon />,
      title: "No completed transactions",
      description:
        "Transactions you successfully complete will appear here.",
    },
    pending: {
      icon: <PendingRoundedIcon />,
      title: "No pending transactions",
      description:
        "You currently have no transactions waiting to be completed.",
    },
    failed: {
      icon: <CancelRoundedIcon />,
      title: "No failed transactions",
      description:
        "Transactions that fail or are cancelled will appear here.",
    },
  }[status];

  return (
    <div className="mt-5 rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
        {config.icon}
      </div>

      <h2 className="mt-5 text-xl font-bold text-gray-900">
        {config.title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        {config.description}
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
        >
          <ReceiptLongRoundedIcon sx={{ fontSize: 18 }} />
          View all transactions
        </button>
      )}
    </div>
  );
};

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(
    []
  );

  const [activeTab, setActiveTab] =
    useState<TransactionTabType>("completed");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  /* ---------------------------------------------------------------------- */
  /*                              FETCH                                      */
  /* ---------------------------------------------------------------------- */

  const fetchTransactions = useCallback(
    async (refresh = false) => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("userToken")
          : null;

      if (!token) {
        window.location.replace("/auth/login");
        return;
      }

      try {
        if (refresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await axios.get<TransactionResponse>(
          "users/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const orders = Array.isArray(
          response?.data?.orders
        )
          ? response.data.orders
          : [];

        setTransactions(orders);
      } catch (error: any) {
        console.error(
          "Error fetching transactions:",
          error
        );

        const status = error?.response?.status;
        const message =
          error?.response?.data?.message;

        if (
          status === 401 ||
          message === "Unauthorized access"
        ) {
          await Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "warning",
            confirmButtonText: "Log In",
            confirmButtonColor: "#006838",
            allowOutsideClick: false,
          });

          localStorage.removeItem("userToken");
          window.location.replace("/auth/login");
          return;
        }

        setError(
          "We couldn't load your transactions. Please try again."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  /* ---------------------------------------------------------------------- */
  /*                        TRANSACTION COUNTS                               */
  /* ---------------------------------------------------------------------- */

  const transactionCounts = useMemo(() => {
    return transactions.reduce(
      (counts, transaction) => {
        const group = getStatusGroup(
          transaction.status
        );

        if (group) {
          counts[group] += 1;
        }

        return counts;
      },
      {
        completed: 0,
        pending: 0,
        failed: 0,
      }
    );
  }, [transactions]);

  /* ---------------------------------------------------------------------- */
  /*                            ACTIVE DATA                                   */
  /* ---------------------------------------------------------------------- */

  const activeTransactions = useMemo(() => {
    const result = transactions.filter(
      (transaction) =>
        getStatusGroup(transaction.status) ===
        activeTab
    );

    const query = searchQuery
      .toLowerCase()
      .trim();

    if (!query) {
      return result;
    }

    return result.filter((transaction) => {
      const reference = getReference(
        transaction
      ).toLowerCase();

      const status = transaction.status
        .toLowerCase()
        .trim();

      return (
        reference.includes(query) ||
        status.includes(query) ||
        transaction._id
          .toLowerCase()
          .includes(query)
      );
    });
  }, [
    transactions,
    activeTab,
    searchQuery,
  ]);

  /* ---------------------------------------------------------------------- */
  /*                         REMOVE FROM VIEW                                */
  /* ---------------------------------------------------------------------- */

  const removeTransaction = (id: string) => {
    setTransactions((current) =>
      current.filter(
        (transaction) =>
          transaction._id !== id
      )
    );
  };

  /* ---------------------------------------------------------------------- */
  /*                              TAB LABEL                                  */
  /* ---------------------------------------------------------------------- */

  const tabLabel = {
    completed: "Completed",
    pending: "Pending",
    failed: "Failed",
  }[activeTab];

  return (
    <main
      className={`min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8 ${openSansFont.className}`}
    >
      <div className="mx-auto w-full max-w-3xl">
        <TagHeader title="My Transactions" />

        {/* ---------------------------------------------------------------- */}
        {/* HEADER                                                           */}
        {/* ---------------------------------------------------------------- */}

        <section className="mt-5 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-[#063c25] via-[#006838] to-[#074c2d] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-white/60">
                  <ReceiptLongRoundedIcon
                    sx={{ fontSize: 17 }}
                  />

                  <span className="text-[10px] font-bold uppercase tracking-[0.16em]">
                    Account activity
                  </span>
                </div>

                <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Transaction History
                </h1>

                <p className="mt-2 max-w-lg text-sm leading-6 text-white/65">
                  Keep track of your orders, payments and
                  transaction status in one place.
                </p>
              </div>

              <button
                type="button"
                onClick={() => fetchTransactions(true)}
                disabled={refreshing}
                aria-label="Refresh transactions"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-50"
              >
                <RefreshRoundedIcon
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />
              </button>
            </div>
          </div>

          {/* Summary */}

          <div className="grid grid-cols-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() =>
                setActiveTab("completed")
              }
              className={`p-4 text-left transition ${
                activeTab === "completed"
                  ? "bg-[#006838]/5"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircleRoundedIcon
                  sx={{
                    fontSize: 17,
                    color: "#16a34a",
                  }}
                />

                <span className="text-xs font-semibold text-gray-500">
                  Completed
                </span>
              </div>

              <p className="mt-1 text-xl font-black text-gray-900">
                {transactionCounts.completed}
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab("pending")
              }
              className={`border-x border-gray-100 p-4 text-left transition ${
                activeTab === "pending"
                  ? "bg-amber-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <PendingRoundedIcon
                  sx={{
                    fontSize: 17,
                    color: "#d97706",
                  }}
                />

                <span className="text-xs font-semibold text-gray-500">
                  Pending
                </span>
              </div>

              <p className="mt-1 text-xl font-black text-gray-900">
                {transactionCounts.pending}
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab("failed")
              }
              className={`p-4 text-left transition ${
                activeTab === "failed"
                  ? "bg-red-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <CancelRoundedIcon
                  sx={{
                    fontSize: 17,
                    color: "#dc2626",
                  }}
                />

                <span className="text-xs font-semibold text-gray-500">
                  Failed
                </span>
              </div>

              <p className="mt-1 text-xl font-black text-gray-900">
                {transactionCounts.failed}
              </p>
            </button>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* TABS                                                             */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-5">
          <TransactionTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* SEARCH                                                           */}
        {/* ---------------------------------------------------------------- */}

        {!loading && !error && transactions.length > 0 && (
          <div className="relative mt-4">
            <SearchRoundedIcon
              sx={{
                fontSize: 20,
                color: "#9ca3af",
              }}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(
                  event.target.value
                )
              }
              placeholder={`Search ${tabLabel.toLowerCase()} transactions...`}
              className="h-12 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#006838] focus:ring-4 focus:ring-[#006838]/5"
            />
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* CONTENT                                                          */}
        {/* ---------------------------------------------------------------- */}

        {loading ? (
          <div className="mt-8">
            <CircleLoader isVisible={loading} />

            <div className="mt-6 space-y-3">
              {Array.from({ length: 5 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-24 animate-pulse rounded-2xl bg-white"
                  />
                )
              )}
            </div>
          </div>
        ) : error ? (
          <div className="mt-5 rounded-3xl border border-red-100 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <ReceiptLongRoundedIcon />
            </div>

            <h2 className="mt-4 text-lg font-bold text-gray-900">
              Transactions unavailable
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                fetchTransactions()
              }
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
            >
              <RefreshRoundedIcon
                sx={{ fontSize: 18 }}
              />
              Try again
            </button>
          </div>
        ) : activeTransactions.length > 0 ? (
          <div className="mt-5 space-y-3 pb-10">
            <div className="flex items-center justify-between px-1">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                {tabLabel} transactions
              </p>

              <p className="text-xs font-medium text-gray-400">
                {activeTransactions.length}{" "}
                {activeTransactions.length === 1
                  ? "transaction"
                  : "transactions"}
              </p>
            </div>

            {activeTransactions.map(
              (transaction) => (
                <TransactionCard
                  key={transaction._id}
                  title={transaction.status}
                  location={getReference(
                    transaction
                  )}
                  timeAgo={formatDate(
                    transaction.createdAt
                  )}
                  totalAmount={
                    transaction.totalAmount ??
                    transaction.grandTotal
                  }
                  status={transaction.status}
                  _id={transaction._id}
                  onRemove={removeTransaction}
                />
              )
            )}
          </div>
        ) : searchQuery ? (
          <div className="mt-5 rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
              <SearchRoundedIcon />
            </div>

            <h2 className="mt-4 text-lg font-bold text-gray-900">
              No matching transactions
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try searching with another reference or
              payment status.
            </p>

            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-5 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white"
            >
              Clear search
            </button>
          </div>
        ) : (
          <EmptyTransactions
            status={activeTab}
            onReset={
              activeTab !== "completed"
                ? () =>
                    setActiveTab("completed")
                : undefined
            }
          />
        )}
      </div>
    </main>
  );
};

export default Transactions;