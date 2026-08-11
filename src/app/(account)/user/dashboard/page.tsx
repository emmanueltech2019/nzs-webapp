// "use client";
// import React, { useState, Suspense, useEffect } from "react";
// import Card from "@/components/cards/ProductCard";
// import Header from "@/components/header/ProductHeader";
// import Tabs from "@/components/tabs/ProductAndServiceTab";
// import FloatingButton from "@/components/buttons/FloatingButton";
// import Carousel from "@/components/carousel/Carousel";
// import SortFilter from "@/components/SortFilter/SortFilter";
// import ProductGrid from "@/components/Grid/ProductGrid";
// import { useRouter, useSearchParams } from "next/navigation";
// import Services from "./Services";
// import axios from "@/utils/axios";
// import { ProductT } from "@/types/Product.types";
// import Banner1 from '../../../../assets/images/banner-img/banner-img-1.jpg'
// import Banner2 from '../../../../assets/images/banner-img/banner-img-2.jpg'
// import Banner3 from '../../../../assets/images/banner-img/banner-img-3.jpg'
// import Banner4 from '../../../../assets/images/banner-img/banner-img-4.jpg'
// import Swal from "sweetalert2";
// import CircleLoader from "@/components/loader/loader";

// const compareDate = (dateString?: string) => {
//   if (!dateString) return false; // skip if no date
//   const DIFFERENCE_IN_DAYS = 7;
//   const today = new Date();
//   const productDate = new Date(dateString);

//   if (isNaN(productDate.getTime())) return false; // invalid date
//   const diffTime = Math.floor((today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));
//   return diffTime <= DIFFERENCE_IN_DAYS;
// };
// const Dashboard = () => {
//   const [products, setProducts] = useState<ProductT[]>([]); // useState expects an array of Product
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(true);

//   useEffect(() => {
//     setLoading(true)
//     axios({
//       method: "GET",
//       url: "products",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     })
//       .then((res) => {
//         console.log("res gtff", res.data);
//         setProducts(res.data.products);  // Set the products once
//         setLoading(false)
//       })
//       .catch((error) => {
//         console.log(error)
//         if(error.response.data.message==="Unauthorized access"){
//           Swal.fire({
//             title: "Session Expired",
//             text: "Your session has expired. Please log in again.",
//             icon: "warning",
//             confirmButtonText: "OK",
//           }).then(() => {
//             localStorage.clear();
//             window.location.replace("/auth/login");
//           });
//           return;
//         }
//         console.log(error);
//       });
    
//   }, []);  // No products dependency here
  
//   // const newArrivals = products.filter(products => compareDate(products.createdAt))
// const newArrivals = products.filter(p => compareDate(p.createdAt)).slice(0, 3);

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const main = searchParams.get("main") || "";
//   const [activeTab, setActiveTab] = useState(main || "products");
//   const imagesL = [Banner1, Banner2, Banner3, Banner4]
//   const imageSrcArray = imagesL.map((image) => image.src);
//   const [activeRouteProp, setActiveRouteProp] = useState('a-z');
//   const data = ['popular', 'cost effective', 'location'];

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//     <div className="min-h-screen">
//       {
//         loading ? <CircleLoader isVisible={loading} />:<div className="md:max-w-[85%] mx-auto">
//         <Header />
//         <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
//         {activeTab == "products" ? (
//           <div className="mb-24 md:mb-0">
//             <SortFilter sortFilterArray={data} activeTab={activeRouteProp} setActiveTab={setActiveRouteProp} />
//             <FloatingButton
//               color="bg-[#006838]"
//               onClick={() => {
//                 router.push("./dashboard/add-item");
//               }}
//             />
//             <Carousel images={['https://res.cloudinary.com/wise-solution-inc/image/upload/v1755239366/NZS_WEB_Banner_gh7lnp.png','https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.18_AM_s7elct.jpg', 'https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.19_AM_skokdz.jpg']}/>
//             {newArrivals.length > 0 ? (
//               <ProductGrid link="new-arrivals" title="New Arrivals" products={newArrivals} />
//             ) : (
//               <div className="p-4 flex flex-col gap-3">
//                 <h2 className="text-xl font-semibold">New Arrivals</h2>
//                 <p className="text-center">No new arrivals</p>
//               </div>
//             )}
//             {products.length > 0 ? (
//               <ProductGrid link="available-products" title="Available Products" products={products} />
//             ) : (
//               <div className="p-4 flex flex-col gap-3">
//                 <h2 className="text-xl font-semibold">Available Products</h2>
//                 <p className="text-center">No products available</p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             <FloatingButton />
//             <Services />
//           </>
//         )}

//       </div>
//       }
      
//     </div>
//     </Suspense>
//   );
// };

// const page = () => (
//   <Suspense fallback={<div>loading...</div>}>
//     <Dashboard />
//   </Suspense>
// );

// export default page;

"use client";

import React, { useState, Suspense, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

// Components
import Header from "@/components/header/ProductHeader";
import Tabs from "@/components/tabs/ProductAndServiceTab";
import FloatingButton from "@/components/buttons/FloatingButton";
import Carousel from "@/components/carousel/Carousel";
import SortFilter from "@/components/SortFilter/SortFilter";
import ProductGrid from "@/components/Grid/ProductGrid";
import CircleLoader from "@/components/loader/loader";
import Services from "./Services";

// Utils & Types
import axios from "@/utils/axios";
import { ProductT } from "@/types/Product.types";

// Constants
const CAROUSEL_IMAGES = [
  "https://res.cloudinary.com/wise-solution-inc/image/upload/v1755239366/NZS_WEB_Banner_gh7lnp.png",
  "https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.18_AM_s7elct.jpg",
  "https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.19_AM_skokdz.jpg",
];

const SORT_OPTIONS = ["popular", "cost effective", "location"];

/**
 * Checks if a product was created within the last 7 days.
 */
const compareDate = (dateString?: string) => {
  if (!dateString) return false;
  
  const DIFFERENCE_IN_DAYS = 7;
  const today = new Date();
  const productDate = new Date(dateString);

  if (isNaN(productDate.getTime())) return false;
  
  const diffTime = Math.floor((today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));
  return diffTime <= DIFFERENCE_IN_DAYS;
};

const Dashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // States
  const mainTab = searchParams.get("main") || "products";
  const [activeTab, setActiveTab] = useState(mainTab);
  const [activeRouteProp, setActiveRouteProp] = useState("a-z");
  const [products, setProducts] = useState<ProductT[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        setProducts(res.data?.products || []);
      } catch (error: any) {
        console.error("Failed to fetch products:", error);
        
        // Handle Unauthorized / Session Expiry safely
        if (error?.response?.data?.message === "Unauthorized access") {
          Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "warning",
            confirmButtonText: "OK",
            confirmButtonColor: "#006838",
          }).then(() => {
            localStorage.clear();
            window.location.replace("/auth/login");
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Memoized New Arrivals to prevent expensive recalculations on re-renders
  const newArrivals = useMemo(() => {
    return products.filter((p) => compareDate(p.createdAt)).slice(0, 4); // Capped at 4 for better grid balance
  }, [products]);

  return (
    <div className="min-h-screen bg-white">
      <div className="md:max-w-[85%] mx-auto px-4 md:px-0 py-4">
        {/* Shell remains visible while loading to prevent UI jumping */}
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <CircleLoader isVisible={loading} />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {activeTab === "products" ? (
              <div className="mb-24 md:mb-0 space-y-8 mt-6">
                <SortFilter 
                  sortFilterArray={SORT_OPTIONS} 
                  activeTab={activeRouteProp} 
                  setActiveTab={setActiveRouteProp} 
                />
                
                <FloatingButton
                  color="bg-[#006838]"
                  onClick={() => router.push("./dashboard/add-item")}
                />
                
                <Carousel images={CAROUSEL_IMAGES} />

                {/* New Arrivals Section */}
                <section>
                  {newArrivals.length > 0 ? (
                    <ProductGrid link="new-arrivals" title="New Arrivals" products={newArrivals} />
                  ) : (
                    <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 border border-gray-100">
                      <h2 className="text-xl font-semibold text-gray-800">New Arrivals</h2>
                      <p className="text-sm text-gray-500">No new arrivals in the last 7 days.</p>
                    </div>
                  )}
                </section>

                {/* All Products Section */}
                <section>
                  {products.length > 0 ? (
                    <ProductGrid link="available-products" title="Available Products" products={products} />
                  ) : (
                    <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 border border-gray-100">
                      <h2 className="text-xl font-semibold text-gray-800">Available Products</h2>
                      <p className="text-sm text-gray-500">No products are currently available.</p>
                    </div>
                  )}
                </section>
              </div>
            ) : (
              <div className="mt-6">
                <FloatingButton />
                <Services />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Next.js requires useSearchParams to be wrapped in a Suspense boundary at the page level
const Page = () => (
  <Suspense fallback={
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#006838] border-t-transparent rounded-full animate-spin"></div>
    </div>
  }>
    <Dashboard />
  </Suspense>
);

export default Page;