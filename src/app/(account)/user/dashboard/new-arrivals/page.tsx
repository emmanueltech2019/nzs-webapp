'use client'
import React, {useState, useEffect} from 'react'
import ProductGrid, { ProductsPageGrid } from '@/components/Grid/ProductGrid';
import { ProductT } from '@/types/Product.types';
import axios from "@/utils/axios";

const compareDate = (newProducts: string) => {
    const DIFFERENCE_IN_DAYS = 7;
    const today = new Date();
    const productDate = new Date(newProducts);
    const diffTime = Math.round((today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffTime <= DIFFERENCE_IN_DAYS;
}

const page = () => {
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
  return (
    <div>
      {newArrivals.length > 0 ? (
            <ProductsPageGrid products={newArrivals} />
        ) : (
            <div className="p-4 flex flex-col gap-3">
                <h2 className="text-xl font-semibold">New Arrivals</h2>
                <p className="text-center">No new arrivals</p>
            </div>
        )}
    </div>
  )
}

export default page
