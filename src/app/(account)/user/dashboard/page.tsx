"use client";
import React, { useState, Suspense, useEffect } from "react";
import Card from "@/components/cards/ProductCard";
import Header from "@/components/header/ProductHeader";
import Tabs from "@/components/tabs/ProductAndServiceTab";
import FloatingButton from "@/components/buttons/FloatingButton";
import Carousel from "@/components/carousel/Carousel";
import SortFilter from "@/components/SortFilter/SortFilter";
import ProductGrid from "@/components/Grid/ProductGrid";
import { useRouter, useSearchParams } from "next/navigation";
import Services from "./Services";
import axios from "@/utils/axios";
import { ProductT } from "@/types/Product.types";

const Dashboard = () => {
  const [products, setProducts] = useState<ProductT[]>([]); // useState expects an array of Product

  useEffect(() => {
    const userToken = localStorage.getItem("userToken") || "";
    const tr = JSON.parse(userToken);
    
    axios({
      method: "GET",
      url: "products",
      headers: {
        Authorization: `Bearer ${tr}`,
      },
    })
      .then((res) => {
        console.log(res);
        setProducts(res.data);  // Set the products once
      })
      .catch((error) => {
        console.log(error);
      });
    
    // Add an empty dependency array to ensure the effect only runs once
  }, []);  // No products dependency here
  

  const router = useRouter();
  const searchParams = useSearchParams();
  const main = searchParams.get("main") || "";
  const [activeTab, setActiveTab] = useState(main || "products");

  return (
    <div className="min-h-screen">
      {/*  md:w-[61vw]  */}
      <div className="">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab == "products" ? (
          <>
            <SortFilter />
            <FloatingButton
              color="bg-[#006838]"
              onClick={() => {
                router.push("./dashboard/add-item");
              }}
            />
            <Carousel />
            <ProductGrid title="Perfect for you" products={products} />
            <ProductGrid title="For this summer" products={products} />
          </>
        ) : (
          <>
            <FloatingButton />
            <Services />
          </>
        )}

        {/* search component */}
        {/* <div className="grid grid-cols-2 py-10 sm:grid-cols-2 lg:grid-cols-2 gap-6 overflow-y-scroll	">
        {products.map((product, index) => (
          <Card key={index} title={product.title} price={product.price} />
        ))}
      </div> */}
      </div>
    </div>
  );
};

const page = () => (
  <Suspense fallback={<div>loading...</div>}>
    <Dashboard />
  </Suspense>
);

export default page;
