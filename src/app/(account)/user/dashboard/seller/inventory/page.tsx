"use client";
import React, { useEffect, useState } from "react";
import InStock from "./components/stock/InStock";
import SellerTransactionTab from "../../../../../../components/tabs/SellerTransactionTab";
import SellerTransStatusTab from "@/components/tabs/SellerTransStatusTab";
import { div } from "framer-motion/client";
import OutOfStock from "./components/stock/OutOfStock";
import ServiceFilterButtons from "@/components/SortFilter/ServiceFilterButtons";
import { sellerFilter } from "@/components/SortFilter/Filters";
import SortFilter from "@/components/SortFilter/SortFilter";
import Read from "./reviews/Read";
import Header from "@/components/header/ProductHeader";
import axios from "@/utils/axios";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller";
}
interface Business {
  role: string;
}
const page = () => {
  const [activeTab, setActiveTab] = useState("Orders");
  const [activeOrderTab, setActiveOrderTab] = useState("IN-STOCK");
  const [activePendingTab, setActivePendingTab] = useState("OUT OF STOCK");

  const orderTabs = ["IN-STOCK", "OUT OF STOCK"];

  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [businessType, setBusinessType] = useState<string | null>('product')
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
        console.log("Full Data",res.data.businesses[0]._id);
        localStorage.setItem('activeBusiness', res.data.businesses[0]._id)
        setUser(res.data.user);
        setBusiness(res.data.business);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);
  return (
    <div className="p-4 md:w-[85%] m-auto">
      <Header />
      {/* <SellerTransactionTab activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      <SellerTransStatusTab
        activeStatTab={activeOrderTab}
        setActiveStatTab={setActiveOrderTab}
        tabs={orderTabs}
      />
      <div className="md:ms-5 flex items-center">
        <SortFilter />
        {/* <ServiceFilterButtons active="Status" filterArray={sellerFilter} /> */}
      </div>

      <div className="">
        {user?.accountType == "seller"}
        <div>
          {activeOrderTab === "IN-STOCK" && <InStock />}
          {activeOrderTab === "OUT OF STOCK" && (
            <div>
              <OutOfStock />
            </div>
          )}
        </div>

        {/* {activeTab === 'Reviews' && <div>
          <SellerTransStatusTab activeStatTab={activePendingTab} setActiveStatTab={setActivePendingTab} tabs={pendingTabs} />
          {activePendingTab === "Read" && <Read />}
        </div>} */}
      </div>
    </div>
  );
};

export default page;
