"use client";
import React, { useState, useEffect } from "react";
import axios from "@/utils/axios";
import { ProductT } from "@/types/Product.types";
import ProductGrid from "@/components/Grid/ProductGrid";
import { ProductsPageGrid } from "@/components/Grid/ProductGrid";
import Swal from "sweetalert2";
import Header from "@/components/header/ProductHeader";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CircleLoader from "@/components/loader/loader";
import { useRouter } from "next/navigation";
const page = () => {
  const [products, setProducts] = useState<ProductT[]>([]); // useState expects an array of Product
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
        console.log("res gtff", res);
        setProducts(res.data.products); // Set the products once
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthorized access") {
          Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "warning",
            confirmButtonText: "OK",
          }).then(() => {
            localStorage.clear();
            window.location.replace("/auth/login");
          });
          return;
        }
        console.log(error);
      });

    // Add an empty dependency array to ensure the effect only runs once
  }, []); // No products dependency here
  return (
    <div className="p-5">
      <Header />
      <div className="flex items-center justify-between relative py-5">
        {/* Back Arrow (left) */}
        <button onClick={() => router.back()} className="absolute left-0 p-2">
          <ArrowBackIosNewOutlinedIcon />
        </button>

        {/* Title (centered) */}
        <h2 className="text-xl font-semibold mx-auto">Available products</h2>
      </div>
      {loading ? (
        <CircleLoader isVisible={loading} />
      ) : (
        <>
          {" "}
          {products.length > 0 ? (
            <ProductsPageGrid products={products} />
          ) : (
            <div className="p-4 flex flex-col gap-3">
              <p className="text-center">No products available</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default page;
