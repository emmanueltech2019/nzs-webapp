// "use client";
// import React, { useEffect, useState } from "react";
// import WalletTab from "./components/WalletTab";
// import AccountBalanceCard from "@/components/cards/AccountBalanceCard";
// import WalletInfo from "./components/WalletInfo";
// import axios from "@/utils/axios";
// import Swal from "sweetalert2";

// interface Transaction {
//   date: string;
//   description: string;
//   amount: number;
//   type: "credit" | "debit"; // Explicitly define the type
// }

// const page = () => {
//   const [activeTab, setActiveTab] = useState("PURCHASE");
//   const [balance, setBalance] = useState(0);
//   const [totalBalance, setTotalBalance] = useState(0);
//   const [creditTransactions, setCreditTransactions] = useState<Transaction[]>([]);
//   const [debitTransactions, setDebitTransactions] = useState<Transaction[]>([]);

//   useEffect(() => {
//     if (!localStorage.getItem("userToken")) {
//       console.error("User token is missing.");
//       return;
//     }

//     axios({
//       method: "GET",
//       url: "/users/profile",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     })
//       .then((res) => {
//         const { wallet } = res.data;
//         const allTransactions = wallet.transactions;

//         // Split transactions into credit and debit
//         const credits = allTransactions.filter((txn: Transaction) => txn.type === "credit");
//         const debits = allTransactions.filter((txn: Transaction) => txn.type === "debit");

//         setCreditTransactions(credits);
//         setDebitTransactions(debits);

//         // Calculate total balance
//         const totalTransactionSum = allTransactions.reduce(
//           (sum: number, txn: Transaction) => sum + txn.amount,
//           0
//         );
//         setTotalBalance(totalTransactionSum);

//         // Set wallet balance
//         setBalance(wallet.balance);
//       })
//       .catch((error) => {
//          if(error.response.data.message==="Unauthorized access"){
//                           Swal.fire({
//                             title: "Session Expired",
//                             text: "Your session has expired. Please log in again.",
//                             icon: "warning",
//                             confirmButtonText: "OK",
//                           }).then(() => {
//                             localStorage.clear();
//                             window.location.replace("/auth/login");
//                           });
//                           return;
//                         }
//         console.error("Error fetching profile:", error);
//       });
//   }, []);

//   return (
//     <div className="p-4 md:w-[85%] m-auto">
//       <WalletTab activeTab={activeTab} setActiveTab={setActiveTab} />

//       <div className="">
//         {activeTab === "PURCHASE" && (
//           <div>
//             <AccountBalanceCard
//               color="bg-[#006838]"
//               value={balance}
//               button={false}
//             />
//           </div>
//         )}

//         {activeTab === "DEPOSITS" && (
//           <div>
//             <AccountBalanceCard
//               color="bg-[#E09427]"
//               value={balance}
//               button={false}
//             />
//           </div>
//         )}
//       </div>

//       {activeTab === "PURCHASE" && (
//         <div>
//           <WalletInfo
//             totalBalance={totalBalance/100}
//             transactions={debitTransactions}
//             color="#006838"
//           />
//         </div>
//       )}
//       {activeTab === "DEPOSITS" && (
//         <div>
//           <WalletInfo
//             totalBalance={totalBalance/100}
//             transactions={creditTransactions}
//             color="#E09427"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default page;
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import WalletTab from "./components/WalletTab";
import AccountBalanceCard from "@/components/cards/AccountBalanceCard";
import WalletInfo from "./components/WalletInfo";
import FundWalletModal from "./components/FundWalletModal";

import axios from "@/utils/axios";
import Swal from "sweetalert2";

import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

type WalletTabType = "PURCHASE" | "DEPOSITS";

interface WalletTransaction {
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

interface WalletData {
  balance: number;
  transactions: WalletTransaction[];
}

interface ProfileResponse {
  wallet?: WalletData;
  user?: {
    email?: string;
    firstname?: string;
    lastname?: string;
  };
}

const formatNaira = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    // maximumFractionDigits: 2,
  }).format(value);
};

const page = () => {
  const [activeTab, setActiveTab] =
    useState<WalletTabType>("PURCHASE");

  const [wallet, setWallet] =
    useState<WalletData | null>(null);

  const [userEmail, setUserEmail] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [showFundingModal, setShowFundingModal] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  /* ---------------------------------------------------------------------- */
  /*                              FETCH                                      */
  /* ---------------------------------------------------------------------- */

  const fetchWallet = useCallback(
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

        const response =
          await axios.get<ProfileResponse>(
            "/users/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const walletData =
          response?.data?.wallet;

        const transactions = Array.isArray(
          walletData?.transactions
        )
          ? walletData.transactions
          : [];

        setWallet({
          balance: Number(
            walletData?.balance || 0
          ),
          transactions,
        });

        setUserEmail(
          response?.data?.user?.email || ""
        );
      } catch (error: any) {
        console.error(
          "Error fetching wallet:",
          error
        );

        const status =
          error?.response?.status;

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
          window.location.replace(
            "/auth/login"
          );

          return;
        }

        setError(
          "We couldn't load your wallet right now. Please try again."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  /* ---------------------------------------------------------------------- */
  /*                          TRANSACTION GROUPS                             */
  /* ---------------------------------------------------------------------- */

  const creditTransactions = useMemo(() => {
    return (
      wallet?.transactions
        ?.filter(
          (transaction) =>
            transaction.type === "credit"
        )
        .sort(
          (a, b) =>
            new Date(
              b.createdAt || b.date || 0
            ).getTime() -
            new Date(
              a.createdAt || a.date || 0
            ).getTime()
        ) || []
    );
  }, [wallet]);

  const debitTransactions = useMemo(() => {
    return (
      wallet?.transactions
        ?.filter(
          (transaction) =>
            transaction.type === "debit"
        )
        .sort(
          (a, b) =>
            new Date(
              b.createdAt || b.date || 0
            ).getTime() -
            new Date(
              a.createdAt || a.date || 0
            ).getTime()
        ) || []
    );
  }, [wallet]);

  /* ---------------------------------------------------------------------- */
  /*                             SEARCH                                      */
  /* ---------------------------------------------------------------------- */

  const activeTransactions = useMemo(() => {
    const transactions =
      activeTab === "PURCHASE"
        ? debitTransactions
        : creditTransactions;

    const query =
      searchQuery.trim().toLowerCase();

    if (!query) {
      return transactions;
    }

    return transactions.filter(
      (transaction) => {
        const description =
          transaction.description
            ?.toLowerCase() || "";

        const reference =
          transaction.reference
            ?.toLowerCase() || "";

        return (
          description.includes(query) ||
          reference.includes(query)
        );
      }
    );
  }, [
    activeTab,
    debitTransactions,
    creditTransactions,
    searchQuery,
  ]);

  /* ---------------------------------------------------------------------- */
  /*                           STATISTICS                                    */
  /* ---------------------------------------------------------------------- */

  const creditTotal = useMemo(() => {
    return creditTransactions.reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount || 0),
      0
    );
  }, [creditTransactions]);

  const debitTotal = useMemo(() => {
    return debitTransactions.reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount || 0),
      0
    );
  }, [debitTransactions]);

  /* ---------------------------------------------------------------------- */
  /*                             MODAL                                       */
  /* ---------------------------------------------------------------------- */

  const handleFundingSuccess = async () => {
    setShowFundingModal(false);

    await fetchWallet(true);

    setActiveTab("DEPOSITS");
  };

  /* ---------------------------------------------------------------------- */
  /*                                  UI                                     */
  /* ---------------------------------------------------------------------- */

  return (
    <main className="min-h-screen bg-[#f7f9f8] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}

        <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#063c25] via-[#006838] to-[#074c2d] p-6 shadow-[0_20px_60px_rgba(0,104,56,0.14)] md:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-white/60">
                <AccountBalanceWalletRoundedIcon
                  sx={{ fontSize: 18 }}
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                  Financial center
                </span>
              </div>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">
                My Wallet
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                Manage your balance, view wallet activity
                and securely add funds.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                fetchWallet(true)
              }
              disabled={refreshing}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-50"
              aria-label="Refresh wallet"
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
        </section>

        {/* Loading */}

        {loading ? (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="h-44 animate-pulse rounded-3xl bg-gray-100" />

            <div className="h-44 animate-pulse rounded-3xl bg-gray-100" />

            <div className="h-96 animate-pulse rounded-3xl bg-gray-100 md:col-span-2" />
          </div>
        ) : error ? (
          <section className="mt-6 rounded-3xl border border-red-100 bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <AccountBalanceWalletRoundedIcon
                sx={{ fontSize: 30 }}
              />
            </div>

            <h2 className="mt-5 text-xl font-black text-gray-900">
              Wallet unavailable
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                fetchWallet()
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white"
            >
              <RefreshRoundedIcon
                sx={{ fontSize: 18 }}
              />
              Try again
            </button>
          </section>
        ) : (
          <>
            {/* ========================================================== */}
            {/* SUMMARY CARDS                                              */}
            {/* ========================================================== */}

            <section className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="overflow-hidden rounded-3xl">
                <AccountBalanceCard
                  color="bg-[#006838]"
                  value={wallet?.balance || 0}
                  button={false}
                />
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Deposits
                    </p>

                    <p className="mt-2 text-2xl font-black text-gray-900">
                      {formatNaira(
                        creditTotal/100
                      )}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <TrendingUpRoundedIcon />
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-400">
                  Total credited through wallet activity
                </p>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Purchases
                    </p>

                    <p className="mt-2 text-2xl font-black text-gray-900">
                      {formatNaira(
                        debitTotal
                      )}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <TrendingDownRoundedIcon />
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-400">
                  Total debited through wallet activity
                </p>
              </div>
            </section>

            {/* ========================================================== */}
            {/* TABS                                                        */}
            {/* ========================================================== */}

            <div className="mt-6">
              <WalletTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                purchaseCount={
                  debitTransactions.length
                }
                depositCount={
                  creditTransactions.length
                }
              />
            </div>

            {/* Search */}

            <div className="relative mt-4">
              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
                placeholder={
                  activeTab === "PURCHASE"
                    ? "Search purchase history..."
                    : "Search deposit history..."
                }
                className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#006838] focus:ring-4 focus:ring-[#006838]/5"
              />
            </div>

            {/* Wallet information */}

            <div className="mt-4">
              <WalletInfo
                totalBalance={
                  activeTab === "PURCHASE"
                    ? debitTotal
                    : creditTotal
                }
                transactions={
                  activeTransactions
                }
                color={
                  activeTab === "PURCHASE"
                    ? "#006838"
                    : "#E09427"
                }
                title={
                  activeTab === "PURCHASE"
                    ? "Purchase Activity"
                    : "Deposit Activity"
                }
                emptyMessage={
                  activeTab === "PURCHASE"
                    ? "No wallet purchases yet."
                    : "No wallet deposits yet."
                }
                onAddFunds={() =>
                  setShowFundingModal(true)
                }
                showAddFunds={
                  activeTab === "DEPOSITS"
                }
              />
            </div>
          </>
        )}
      </div>

      {/* Funding modal */}

      {showFundingModal && (
        <FundWalletModal
          onClose={() =>
            setShowFundingModal(false)
          }
          email={userEmail}
          onSuccess={handleFundingSuccess}
        />
      )}
    </main>
  );
};

export default page;