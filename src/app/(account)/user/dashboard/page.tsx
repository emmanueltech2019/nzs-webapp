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
import Banner1 from '../../../../assets/images/banner-img/banner-img-1.jpg'
import Banner2 from '../../../../assets/images/banner-img/banner-img-2.jpg'
import Banner3 from '../../../../assets/images/banner-img/banner-img-3.jpg'
import Banner4 from '../../../../assets/images/banner-img/banner-img-4.jpg'

const compareDate = (newProducts: string) => {
  const DIFFERENCE_IN_DAYS = 7;
  const today = new Date();
  const productDate = new Date(newProducts);
  const diffTime = Math.round((today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));
  return diffTime <= DIFFERENCE_IN_DAYS;
}

const Dashboard = () => {
  const [products, setProducts] = useState<ProductT[]>([]); // useState expects an array of Product

  useEffect(() => {
    // const userToken = localStorage.getItem("userToken") || "";
    // const tr = JSON.parse(userToken);
    
    axios({
      method: "GET",
      url: "products",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log("res gtff", res);
        setProducts(res.data);  // Set the products once
      })
      .catch((error) => {
        console.log(error);
      });
    
    // Add an empty dependency array to ensure the effect only runs once
  }, []);  // No products dependency here
  
  const newArrivals = products.filter(products => compareDate(products.createdAt))

  const router = useRouter();
  const searchParams = useSearchParams();
  const main = searchParams.get("main") || "";
  const [activeTab, setActiveTab] = useState(main || "products");
  const imagesL = [Banner1, Banner2, Banner3, Banner4]
  const imageSrcArray = imagesL.map((image) => image.src);
  const [activeRouteProp, setActiveRouteProp] = useState('a-z');
  const data = ['popular', 'cost effective', 'location'];

  return (
    <div className="min-h-screen">
      {/*  md:w-[61vw]  */}
      <div className="md:max-w-[85%] mx-auto">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab == "products" ? (
          <div className="mb-24 md:mb-0">
            <SortFilter sortFilterArray={data} activeTab={activeRouteProp} setActiveTab={setActiveRouteProp} />
            <FloatingButton
              color="bg-[#006838]"
              onClick={() => {
                router.push("./dashboard/add-item");
              }}
            />
            <Carousel images={['https://res.cloudinary.com/wise-solution-inc/image/upload/v1734092703/NZS_Web_banner_bsqgqg.jpg','https://res.cloudinary.com/wise-solution-inc/image/upload/v1734092703/NZS_Web_banner_bsqgqg.jpg']}/>
            {newArrivals.length > 0 ? (
              <ProductGrid title="New Arrivals" products={newArrivals} />
            ) : (
              <div className="p-4 flex flex-col gap-3">
                <h2 className="text-xl font-semibold">New Arrivals</h2>
                <p className="text-center">No new arrivals</p>
              </div>
            )}
            {products.length > 0 ? (
              <ProductGrid title="Available Products" products={products} />
            ) : (
              <div className="p-4 flex flex-col gap-3">
                <h2 className="text-xl font-semibold">Available Products</h2>
                <p className="text-center">No products available</p>
              </div>
            )}
          </div>
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
