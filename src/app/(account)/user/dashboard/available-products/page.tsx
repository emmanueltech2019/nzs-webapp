'use client'
import React, {useState, useEffect} from 'react'
import axios from "@/utils/axios";
import { ProductT } from '@/types/Product.types';
import ProductGrid from '@/components/Grid/ProductGrid';
import { ProductsPageGrid } from '@/components/Grid/ProductGrid';

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
  return (
    <div className='p-5'>
        {products.length > 0 ? (
            <ProductsPageGrid  products={products} />
        ) : (
            <div className="p-4 flex flex-col gap-3">
                <p className="text-center">No products available</p>
            </div>
        )}
    </div>
  )
}

export default page
