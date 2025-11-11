'use client'
import React, {useState, useEffect} from 'react'
import ProductGrid, { ProductsPageGrid } from '@/components/Grid/ProductGrid';
import { ProductT } from '@/types/Product.types';
import axios from "@/utils/axios";
import Swal from 'sweetalert2';
import Header from '@/components/header/ProductHeader';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import CircleLoader from '@/components/loader/loader';
import { useRouter } from "next/navigation";

const compareDate = (newProducts: string) => {
    const DIFFERENCE_IN_DAYS = 7;
    const today = new Date();
    const productDate = new Date(newProducts);
    const diffTime = Math.round((today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffTime <= DIFFERENCE_IN_DAYS;
}

const page = () => {
    const [products, setProducts] = useState<ProductT[]>([]); // useState expects an array of Product
    const [loading, setLoading] = useState(true);
      const router = useRouter();

      useEffect(() => {
        // const userToken = localStorage.getItem("userToken") || "";
        // const tr = JSON.parse(userToken);
        setLoading(true)
        axios({
          method: "GET",
          url: "products",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        })
          .then((res) => {
            console.log("res gtff", res);
            setLoading(false)
            setProducts(res.data.products);  // Set the products once
          })
          .catch((error) => {
             if(error.response.data.message==="Unauthorized access"){
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
      }, []);  // No products dependency here
      
      const newArrivals = products.filter(productSingle => compareDate(productSingle.createdAt))
  return (
    <div className='px-5'>
      <Header/>
      <div className="flex items-center justify-between relative py-5">
  {/* Back Arrow (left) */}
  <button 
    onClick={() => router.back()} 
    className="absolute left-0 p-2"
  >
    <ArrowBackIosNewOutlinedIcon />
  </button>

  {/* Title (centered) */}
  <h2 className="text-xl font-semibold mx-auto">New Arrivals</h2>
</div>
      {loading ? <CircleLoader isVisible={loading} /> : <> {newArrivals.length > 0 ? (
            <ProductsPageGrid products={newArrivals} />
        ) : (
            <div className="p-4 flex flex-col gap-3">
                <p className="text-center">No new arrivals</p>
            </div>
        )}</> }
     
    </div>
  )
}

export default page
