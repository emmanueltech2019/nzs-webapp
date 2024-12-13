"use client";
import React, { useEffect, useState } from "react";
import InStock from "./components/stock/InStock";
import SellerTransactionTab from "../../../../../../components/tabs/SellerTransactionTab";
import SellerTransStatusTab from "@/components/tabs/SellerTransStatusTab";
import OutOfStock from "./components/stock/OutOfStock";
import SortFilter from "@/components/SortFilter/SortFilter";
import Header from "@/components/header/ProductHeader";
import axios from "@/utils/axios";
import { ProductT } from "@/types/Product.types";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller";
}
interface Business {
  role: string;
}

const page: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Orders");
  const [activeOrderTab, setActiveOrderTab] = useState("IN-STOCK");

  const orderTabs = ["IN-STOCK", "OUT OF STOCK"];

  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [businessType, setBusinessType] = useState<string | null>("product");
  const [products, setProducts] = useState<ProductT[] | null>(null); // Updated to array type

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
        console.log("Full Data", res.data.businesses[0]._id);
        localStorage.setItem("activeBusiness", res.data.businesses[0]._id);
        setUser(res.data.user);
        setBusiness(res.data.business);
        setProducts(res.data.products); // Ensure this is an array of products
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  return (
    <div className="p-4 md:w-[85%] m-auto">
      <Header />
      <SellerTransStatusTab
        activeStatTab={activeOrderTab}
        setActiveStatTab={setActiveOrderTab}
        tabs={orderTabs}
      />
      <div className="md:ms-5 flex items-center">
        <SortFilter />
      </div>

      <div className="">
        {user?.accountType === "seller"}
        <div>
          {activeOrderTab === "IN-STOCK" && products && <InStock products={products} />}
          {activeOrderTab === "OUT OF STOCK" && (
            <div>
              <OutOfStock />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
