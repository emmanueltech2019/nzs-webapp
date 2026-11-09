// "use client";
// import axios from "@/utils/axios";
// import TransactionCard from "../../transaction/components/TransactionCard"; 
// import React, { useState, useEffect} from "react";
// import Incoming from "./components/orders/Incoming";
// import SellerTransactionTab from "../../../../../../components/tabs/SellerTransactionTab";
// import SellerTransStatusTab from "@/components/tabs/SellerTransStatusTab";
// import { div } from "framer-motion/client";
// import Pending from "./components/orders/Pending";
// import ServiceFilterButtons from "@/components/SortFilter/ServiceFilterButtons";
// import { sellerFilter } from "@/components/SortFilter/Filters";
// import SortFilter from "@/components/SortFilter/SortFilter";
// import Read from "./reviews/Read";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import useToggle from "@/hooks/useToggle";
// import DateFilterTab from "@/components/tabs/DateFilterTab";
// import Options from "./components/Options";
// import { Inter } from "next/font/google";
// import PriceFilterTab from "@/components/tabs/PriceFilterTab";

// const inter = Inter({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'], // You can add or remove as needed
//   display: 'swap',
// })

// // const states = [
// //   "UMUAHIA",
// //   "JO",
// //   "AKWA-IBOM",
// //   "ANAMBARA",
// //   "BAUCHI",
// //   "BAYESLSA",
// //   "DELTA",
// //   "EBONYI",
// //   "PLATEAU",
// //   "NIGER",
// //   "KOGI",
// // ];
// // const page = () => {
// //   const [activeTab, setActiveTab] = useState("Orders");
// //   const [activeOrderTab, setActiveOrderTab] = useState("Completed");
// //   const [activePendingTab, setActivePendingTab] = useState("Read");
// //   const [isVisible, toggleVisibility] = useToggle(false);
// //   const [activeFilter, setActiveFilter] = useState("Status");
// //   const [activeState, setActiveState] = useState("");

// //   const selectState = (state: string) => {
// //     setActiveState(state);
// //   };

// //   const orderTabs = ["Completed", "Pending"];
// //   const pendingTabs = ["Read", "Pending"];
// //   return (
// //     <div className="p-4 md:w-[85%] m-auto mb-[5rem]">
// //       <SellerTransactionTab activeTab={activeTab} setActiveTab={setActiveTab} />
// //       <div className="flex items-center gap-1 my-2 py-2 relative overflow-x-hidden">
// //         <div className="flex items-center gap-1 my-2 p-2 bg-[#FFF] z-40">
// //           <Icon
// //             icon="hugeicons:menu-08"
// //             className={`text-[#8F9098]`}
// //             width="15"
// //             height="15"
// //           />
// //           <p className="text-[14px] font-normal text-[#1F2024] leading-4">
// //             Filter
// //           </p>
// //           <Icon
// //             icon="mynaui:chevron-left"
// //             className={`cursor-pointer ms-2 text-[#8F9098] ${
// //               isVisible ? "rotate-180" : ""
// //             }`}
// //             width="19"
// //             height="19"
// //             onClick={() => toggleVisibility()}
// //           />
// //         </div>
// //         <div
// //           className={`absolute overflow-x-auto whitespace-nowrap ${
// //             isVisible ? "right-[70%]" : "right-0"
// //           } transition-all duration-500 ease-in-out`}
// //         >
// //           <ServiceFilterButtons
// //             filterArray={sellerFilter}
// //             active={activeFilter}
// //             setActive={setActiveFilter}
// //           />
// //         </div>
// //       </div>
// //       <div>{activeFilter === "Date" && <DateFilterTab />}</div>
// //       <div>{activeFilter === "Price" && <PriceFilterTab />}</div>
// //       <div>
// //         {activeFilter === "Location" && (
// //           <div>
// //             <div className="flex items-center justify-between my-4 px-4">
// //               <div>
// //                 <h3 className="font-sans font-normal text-[#1F2024] text-[16px]">State</h3>
// //                 <p className="font-sans font-normal text-[#71727A] text-[14px]">Available in Nigeria</p>
// //               </div>
// //               <div className="bg-[#006838] p-[6px] rounded-full h-[24px] w-[24px]"><p className={`text-[#FFFFFF] text-[10px] font-semibold ${inter.className} ms-[2px]`}>9</p></div>
// //             </div>

// //             <Options
// //               optionsArray={states}
// //               active={activeState}
// //               setActive={setActiveState}
// //             />
// //           </div>
          
// //         )}
// //       </div>

// //       <div className="">
// //         {activeTab === "Orders" && (
// //           <div>
// //             {activeFilter === "Status" && (
// //               <SellerTransStatusTab
// //                 activeStatTab={activeOrderTab}
// //                 setActiveStatTab={setActiveOrderTab}
// //                 tabs={orderTabs}
// //               />
// //             )}
// //             {activeOrderTab === "Completed" && <Pending />}
// //             {activeOrderTab === "Pending" && (
// //               <div>
// //                 <Pending />
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {activeTab === "Reviews" && (
// //           <div>
// //             <SellerTransStatusTab
// //               activeStatTab={activePendingTab}
// //               setActiveStatTab={setActivePendingTab}
// //               tabs={pendingTabs}
// //             />
// //             {activePendingTab === "Read" && <Read />}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default page;


// interface Transaction {
//   id: number;
//   totalAmount: number;
//   status: string;
//   createdAt: string;
//   paymentReference: string;
//   _id: string;
// }

// const SellerTransactionsPage = () => {
//   const [activeTab, setActiveTab] = useState("Orders");
//   const [activeOrderTab, setActiveOrderTab] = useState("Completed");
//   const [isVisible, toggleVisibility] = useToggle(false);
//   const [activeFilter, setActiveFilter] = useState("Status");
//   const [activePendingTab, setActivePendingTab] = useState("Read");
//     const orderTabs = ["Completed", "Pending"];
//   const pendingTabs = ["Read", "Pending"];
//   // Data State
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(true);
//   // const removeTrasaction = (i: number) => {
//   //   const item = transactions[i]
//   //   setTransactions(prev => prev.filter(tr => tr.id !== item.id))
//   // }
//   const removeTrasaction = (i: number) => {
//     const item = transactions[i];
//     setTransactions(prev => prev.filter(tr => tr._id !== item._id));
//   };
//   // 1. Fetch Data
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const res = await axios({
//           url: `users/orders/business/${localStorage.getItem("activeBusiness")}`,
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         });
//         setTransactions(res.data.orders);
//       } catch (error) {
//         console.error("Error fetching seller transactions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   // 2. Filter Logic (Based on the internal tabs)
//   const completedOrders = transactions.filter(t => t.status === "completed");
//   const pendingOrders = transactions.filter(t => t.status === "pending");

//   return (
//     <div className="p-4 md:w-[85%] m-auto mb-[5rem]">
//       <SellerTransactionTab activeTab={activeTab} setActiveTab={setActiveTab} />
      
//       {/* ... Filter UI Code remains the same ... */}
//        <div className="flex items-center gap-1 my-2 py-2 relative overflow-x-hidden">
//          <div className="flex items-center gap-1 my-2 p-2 bg-[#FFF] z-40">
//            <Icon
//             icon="hugeicons:menu-08"
//             className={`text-[#8F9098]`}
//             width="15"
//             height="15"
//           />
//           <p className="text-[14px] font-normal text-[#1F2024] leading-4">
//             Filter
//           </p>
//           <Icon
//             icon="mynaui:chevron-left"
//             className={`cursor-pointer ms-2 text-[#8F9098] ${
//               isVisible ? "rotate-180" : ""
//             }`}
//             width="19"
//             height="19"
//             onClick={() => toggleVisibility()}
//           />
//         </div>
//         <div
//           className={`absolute overflow-x-auto whitespace-nowrap ${
//             isVisible ? "right-[70%]" : "right-0"
//           } transition-all duration-500 ease-in-out`}
//         >
//           <ServiceFilterButtons
//             filterArray={sellerFilter}
//             active={activeFilter}
//             setActive={setActiveFilter}
//           />
//         </div>
//       </div>
//       <div>{activeFilter === "Date" && <DateFilterTab />}</div>
//       <div>{activeFilter === "Price" && <PriceFilterTab />}</div>
//       <div>
//         {activeFilter === "Location" && (
//           <div>
//             <div className="flex items-center justify-between my-4 px-4">
//               <div>
//                 <h3 className="font-sans font-normal text-[#1F2024] text-[16px]">State</h3>
//                 <p className="font-sans font-normal text-[#71727A] text-[14px]">Available in Nigeria</p>
//               </div>
//               <div className="bg-[#006838] p-[6px] rounded-full h-[24px] w-[24px]"><p className={`text-[#FFFFFF] text-[10px] font-semibold ${inter.className} ms-[2px]`}>9</p></div>
//             </div>

//             {/* <Options
//               optionsArray={states}
//               active={activeState}
//               setActive={setActiveState}
//             /> */}
//           </div>
          
//         )}
//       </div>
//       <div className="">
//         {activeTab === "Orders" && (
//           <div>
//             {activeFilter === "Status" && (
//               <SellerTransStatusTab
//                 activeStatTab={activeOrderTab}
//                 setActiveStatTab={setActiveOrderTab}
//                 tabs={["Completed", "Pending"]}
//               />
//             )}

//             {loading ? (
//               <p className="text-center py-10">Loading orders...</p>
//             ) : (
//               <div className="mt-4">
//                 {activeOrderTab === "Completed" ? (
//                   completedOrders.length > 0 ? (
//                     completedOrders.map((order, index) => (
//                       <TransactionCard 
//                         key={order._id}
//                         title={`Sold: ${order.paymentReference}`}
//                         location="Store Pickup" // Adjust based on your data
//                         timeAgo={order.createdAt.split('T')[0]}
//                         // deleteFunc={() => removeTrasaction(1)}
//                         onRemove={() => removeTrasaction(index)}
//                         _id={order._id}
//                       />
//                     ))
//                   ) : <p className="text-center">No completed orders</p>
//                 ) : (
//                   pendingOrders.length > 0 ? (
//                     pendingOrders.map((order, index) => (
//                       <TransactionCard 
//                         key={order._id}
//                         title={`Pending Sale`}
//                         location={order.paymentReference}
//                         timeAgo={order.createdAt.split('T')[0]}
//                         // deleteFunc={() => removeTrasaction(1)}
//                         onRemove={() => removeTrasaction(index)}
//                         _id={order._id}
//                       />
//                     ))
//                   ) : <p className="text-center">No pending orders</p>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ... Reviews Tab remains the same ... */}
//          <div className="">


//         {activeTab === "Reviews" && (
//           <div>
//             <SellerTransStatusTab
//               activeStatTab={activePendingTab}
//               setActiveStatTab={setActivePendingTab}
//               tabs={pendingTabs}
//             />
//             {activePendingTab === "Read" && <Read />}
//           </div>
//         )}
//       </div>
//       </div>
//     </div>
//   );
// };

// export default SellerTransactionsPage;

"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "@/utils/axios";
import TransactionCard from "../../transaction/components/TransactionCard";
import SellerTransactionTab from "../../../../../../components/tabs/SellerTransactionTab";
import SellerTransStatusTab from "@/components/tabs/SellerTransStatusTab";
import ServiceFilterButtons from "@/components/SortFilter/ServiceFilterButtons";
import { sellerFilter } from "@/components/SortFilter/Filters";
import Read from "./reviews/Read";
import { Icon } from "@iconify/react";
import useToggle from "@/hooks/useToggle";
import DateFilterTab from "@/components/tabs/DateFilterTab";
import PriceFilterTab from "@/components/tabs/PriceFilterTab";

interface Transaction {
  id?: number;
  totalAmount?: number | string;
  status: string;
  createdAt?: string;
  paymentReference?: string;
  _id: string;
}

const orderTabs = ["Completed", "Pending"];
const pendingTabs = ["Read", "Pending"];

const normalizeStatus = (status?: string) =>
  (status ?? "").trim().toLowerCase();

const formatOrderDate = (date?: string) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const SellerTransactionsPage = () => {
  const [activeTab, setActiveTab] = useState("Orders");
  const [activeOrderTab, setActiveOrderTab] = useState("Completed");
  const [activePendingTab, setActivePendingTab] = useState("Read");
  const [activeFilter, setActiveFilter] = useState("Status");

  const [isVisible, toggleVisibility] = useToggle(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch seller transactions.
  useEffect(() => {
    const controller = new AbortController();

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios({
          url: `users/orders/business/${localStorage.getItem(
            "activeBusiness"
          )}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          signal: controller.signal,
        });

        const orders = res?.data?.orders;

        setTransactions(Array.isArray(orders) ? orders : []);
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Error fetching seller transactions:", err);

        setError("Unable to load orders. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchTransactions();

    return () => {
      controller.abort();
    };
  }, []);

  // Remove a transaction from the current view using its actual ID.
  const removeTransaction = (id: string) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction._id !== id)
    );
  };

  // Completed orders.
  const completedOrders = useMemo(
    () =>
      transactions.filter((transaction) =>
        ["completed", "successful", "success", "succeeded"].includes(
          normalizeStatus(transaction.status)
        )
      ),
    [transactions]
  );

  // Pending orders.
  const pendingOrders = useMemo(
    () =>
      transactions.filter((transaction) =>
        ["pending", "processing", "in_progress"].includes(
          normalizeStatus(transaction.status)
        )
      ),
    [transactions]
  );

  const displayedOrders =
    activeOrderTab === "Completed" ? completedOrders : pendingOrders;

  return (
    <div className="m-auto mb-[5rem] p-4 md:w-[85%]">
      <SellerTransactionTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Filter controls */}
      <div className="relative my-2 flex items-center gap-1 overflow-x-hidden py-2">
        <div className="z-40 my-2 flex items-center gap-1 bg-white p-2">
          <Icon
            icon="hugeicons:menu-08"
            className="text-[#8F9098]"
            width="15"
            height="15"
          />

          <p className="text-[14px] font-normal leading-4 text-[#1F2024]">
            Filter
          </p>

          <button
            type="button"
            aria-label="Toggle filters"
            aria-expanded={isVisible}
            className="ms-2"
            onClick={() => toggleVisibility()}
          >
            <Icon
              icon="mynaui:chevron-left"
              className={`cursor-pointer text-[#8F9098] transition-transform ${
                isVisible ? "rotate-180" : ""
              }`}
              width="19"
              height="19"
            />
          </button>
        </div>

        <div
          className={`absolute whitespace-nowrap transition-all duration-500 ease-in-out ${
            isVisible ? "right-[70%]" : "right-0"
          }`}
        >
          <ServiceFilterButtons
            filterArray={sellerFilter}
            active={activeFilter}
            setActive={setActiveFilter}
          />
        </div>
      </div>

      {/* Additional filter panels */}
      {activeFilter === "Date" && <DateFilterTab />}

      {activeFilter === "Price" && <PriceFilterTab />}

      {activeFilter === "Location" && (
        <div>
          <div className="my-4 flex items-center justify-between px-4">
            <div>
              <h3 className="font-sans text-[16px] font-normal text-[#1F2024]">
                State
              </h3>

              <p className="font-sans text-[14px] font-normal text-[#71727A]">
                Available in Nigeria
              </p>
            </div>

            <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#006838]">
              <p className="text-[10px] font-semibold text-white">9</p>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div>
        {/* Orders */}
        {activeTab === "Orders" && (
          <div>
            {activeFilter === "Status" && (
              <SellerTransStatusTab
                activeStatTab={activeOrderTab}
                setActiveStatTab={setActiveOrderTab}
                tabs={orderTabs}
              />
            )}

            {loading ? (
              <div className="py-12 text-center">
                <p className="text-sm text-gray-500">Loading orders...</p>
              </div>
            ) : error ? (
              <div className="py-12 text-center" role="alert">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            ) : displayedOrders.length > 0 ? (
              <div className="mt-4 space-y-3">
                {displayedOrders.map((order) => (
                  <TransactionCard
                    key={order._id}
                    title={
                      activeOrderTab === "Completed"
                        ? `Sold: ${order.paymentReference || "Order"}`
                        : "Pending Sale"
                    }
                    location={order.paymentReference || "Store Pickup"}
                    timeAgo={formatOrderDate(order.createdAt)}
                    totalAmount={order.totalAmount}
                    status={order.status}
                    _id={order._id}
                    onRemove={removeTransaction}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-sm text-gray-500">
                  No {activeOrderTab.toLowerCase()} orders found.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Reviews */}
        {activeTab === "Reviews" && (
          <div>
            <SellerTransStatusTab
              activeStatTab={activePendingTab}
              setActiveStatTab={setActivePendingTab}
              tabs={pendingTabs}
            />

            {activePendingTab === "Read" && <Read />}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerTransactionsPage;
