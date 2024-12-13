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
  const imagesL = [Banner1, Banner2, Banner3, Banner4]
  const imageSrcArray = imagesL.map((image) => image.src);

  return (
    <div className="min-h-screen">
      {/*  md:w-[61vw]  */}
      <div className="">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab == "products" ? (
          <div className="mb-24 md:mb-0">
            <SortFilter />
            <FloatingButton
              color="bg-[#006838]"
              onClick={() => {
                router.push("./dashboard/add-item");
              }}
            />
            <Carousel images={['https://res.cloudinary.com/wise-solution-inc/image/upload/v1734092703/NZS_Web_banner_bsqgqg.jpg','https://res.cloudinary.com/wise-solution-inc/image/upload/v1734092703/NZS_Web_banner_bsqgqg.jpg']}/>
            <ProductGrid title="Perfect for you" products={products} />
            <ProductGrid title="For this summer" products={products} />
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
