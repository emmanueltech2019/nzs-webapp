// "use client";
// import React, { useState, Suspense, useEffect } from "react";
// import FloatingButton from "@/components/buttons/FloatingButton";
// import Carousel from "@/components/carousel/Carousel2";
// import ProductGrid from "@/components/Grid/ProductGrid2";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "@/utils/axios";
// import { DisplayCartItem, ProductT } from "@/types/Product.types";
// import CircleLoader from "@/components/loader/loader";
// import ProductFilterSidebar from "./SideFileter";
// import Image from "next/image";
// import Tape from "./tape/Tape";
// import CartDrawer from "./cartdrawer/CartDrawer";
// import { FaSearch } from "react-icons/fa";
// import { useLocalCart } from "@/hooks/useLocalCart";

// const compareDate = (dateString?: string) => {
//   if (!dateString) return false;
//   const DIFFERENCE_IN_DAYS = 7;
//   const today = new Date();
//   const productDate = new Date(dateString);

//   if (isNaN(productDate.getTime())) return false;
//   const diffTime = Math.floor(
//     (today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24),
//   );
//   return diffTime <= DIFFERENCE_IN_DAYS;
// };

// const ProductsView = () => {
//   const [products, setProducts] = useState<ProductT[]>([]);
//   const [loading, setLoading] = useState(false);
//   const { localCart, addLocalItem, updateItemQuantity, removeItem } =
//     useLocalCart();
//   const cartLength = localCart.length;

//   const [searchQuery, setSearchQuery] = useState("");
//   const [visibleCount, setVisibleCount] = useState(8);
//   const searchParams = useSearchParams();
//   const industry = searchParams.get("industry");
//   const category = searchParams.get("category");
//   const sub = searchParams.get("sub");
//   useEffect(() => {
//     setLoading(true);

//     // Build dynamic query based on URL params
//     const params = new URLSearchParams();
//     if (industry) params.append("industry", industry);
//     if (category) params.append("category", category);
//     if (sub) params.append("sub", sub);

//     axios({
//       method: "GET",
//       url: `/products/2?${params.toString()}`, // Send filters to backend
//       headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
//     })
//       .then((res) => {
//         setProducts(res.data.products);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setLoading(false);
//       });
//   }, [industry, category, sub]); // Re-fetch whenever filters change
//   // const searchParams = useSearchParams();
//   const main = searchParams.get("main") || "";
//   const [activeTab, setActiveTab] = useState(main || "products");
//   const [open, setOpen] = useState(false);
//   const [product, setProduct] = useState<ProductT | null>(null);

//   const filteredProducts = products.filter((p) =>
//     p.name?.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   const newArrivals = products
//     .filter((p) => compareDate(p.createdAt))
//     .slice(0, 3);
//   console.log("New Arrivals:", newArrivals);

//   const visibleProducts = filteredProducts.slice(0, visibleCount);

//   // --- HANDLERS ---
//   const handleLoadMore = () => {
//     setVisibleCount((prev) => prev + 8);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     setVisibleCount(9);
//   };
//   const [products2, setProducts2] = React.useState<ProductT[]>([]);

//   const displayCartItems = React.useMemo(() => {
//     return localCart.map((cartItem) => {
//       const details = products.find(
//         (p) => String(p._id) === String(cartItem.productId),
//       );
//       return {
//         _id: cartItem.productId,
//         productId: cartItem.productId,
//         name: details?.name || "Loading...",
//         price: details?.price || 0,
//         image: details?.images?.[0] || "",
//         size: cartItem.size,
//         quantity: cartItem.quantity,
//       };
//     });
//   }, [localCart, products]);
//   console.log("Local Cart2:", displayCartItems);
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <div className="min-h-screen bg-white mt-5">
//         <CartDrawer
//           isOpen={open}
//           onClose={() => setOpen(false)}
//           cartItems={displayCartItems}
//         />
//         {loading ? (
//           <CircleLoader isVisible={loading} />
//         ) : (
//           <div className="md:w-screen flex md:flex-row flex-col-reverse pt-4 md:px-2 md:px-6">
//             <div className="bg-white h-auto md:w-[38vw] md:mr-10 md:px-5">
//               <ProductFilterSidebar />
//             </div>

//             <>
//               {activeTab == "products" ? (
//                 <div className="mb-24 md:mb-0 w-screen">
//                   <Carousel
//                     images={[
//                       "https://res.cloudinary.com/wise-solution-inc/image/upload/v1755239366/NZS_WEB_Banner_gh7lnp.png",
//                       "https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.18_AM_s7elct.jpg",
//                       "https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.19_AM_skokdz.jpg",
//                     ]}
//                   />

//                   {/* --- NEW SEARCH COMPONENT --- */}
//                   <div className="md:w-[68vw] mt-6 mb-2 flex justify-center">
//                     <div className="relative w-full md:w-2/3">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FaSearch className="text-gray-400" />
//                       </div>
//                       <input
//                         type="text"
//                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-600 focus:border-green-600 sm:text-sm"
//                         placeholder="Search for products..."
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                       />
//                     </div>
//                   </div>

//                   <div className="flex justify-between items-center mb-4 md:w-[68vw] ">
//                     <div className="w-[90%]">
//                       <Tape />
//                     </div>
//                     <div className="pl-2 w-[10%] flex mx-auto justify-center items-center">
//                       <div
//                         className="relative w-10 h-10 cursor-pointer"
//                         onClick={() => setOpen(true)}
//                       >
//                         <Image
//                           src={
//                             "https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png"
//                           }
//                           alt="cart icon"
//                           height={400}
//                           width={40}
//                           className="text-2xl"
//                         />
//                         <span className="absolute top-2 right-3 bg-[#006838] text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
//                           {cartLength}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {newArrivals.length > 0 ? (
//                     <ProductGrid
//                       link="new-arrivals"
//                       title="New Arrivals"
//                       products={newArrivals}
//                     />
//                   ) : (
//                     <div className="p-4 flex flex-col gap-3">
//                       <h2 className="text-xl font-semibold">New Arrivals</h2>
//                       <p className="text-center text-gray-500">
//                         No new arrivals
//                       </p>
//                     </div>
//                   )}

//                   {/* --- AVAILABLE PRODUCTS WITH LOAD MORE --- */}
//                   {visibleProducts.length > 0 ? (
//                     <div className="flex flex-col md:pb-10">
//                       <ProductGrid
//                         link="available-products"
//                         title="Available Products"
//                         products={visibleProducts}
//                       />

//                       {/* Load More Button */}
//                       {visibleCount < filteredProducts.length && (
//                         <div className="flex justify-center mt-8">
//                           <button
//                             onClick={handleLoadMore}
//                             className="px-6 py-3 bg-[#006838] text-white font-semibold rounded-full shadow-md hover:bg-green-800 transition-colors duration-300"
//                           >
//                             Load More Products
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="p-4 flex flex-col gap-3">
//                       <h2 className="text-xl font-semibold">
//                         Available Products
//                       </h2>
//                       <p className="text-center text-gray-500">
//                         {searchQuery
//                           ? `No products found matching "${searchQuery}"`
//                           : "No products available"}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <>
//                   <FloatingButton />
//                 </>
//               )}
//             </>
//           </div>
//         )}
//       </div>
//     </Suspense>
//   );
// };

// export default ProductsView;
"use client";
import React, { useState, Suspense, useEffect, useRef, useMemo } from "react";
import FloatingButton from "@/components/buttons/FloatingButton";
import Carousel from "@/components/carousel/Carousel2";
import ProductGrid from "@/components/Grid/ProductGrid2";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/utils/axios";
import { DisplayCartItem, ProductT } from "@/types/Product.types";
import CircleLoader from "@/components/loader/loader";
import ProductFilterSidebar from "./SideFileter";
import Image from "next/image";
import Tape from "./tape/Tape";
import CartDrawer from "./cartdrawer/CartDrawer";
import { FaSearch, FaFilter, FaTimes, FaSortAmountDown } from "react-icons/fa";
import { useLocalCart } from "@/hooks/useLocalCart";

const compareDate = (dateString?: string) => {
  if (!dateString) return false;
  const DIFFERENCE_IN_DAYS = 7;
  const today = new Date();
  const productDate = new Date(dateString);

  if (isNaN(productDate.getTime())) return false;
  const diffTime = Math.floor(
    (today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffTime <= DIFFERENCE_IN_DAYS;
};

const ProductsView = () => {
  const [products, setProducts] = useState<ProductT[]>([]);
  const [loading, setLoading] = useState(false);
  const { localCart, addLocalItem, updateItemQuantity, removeItem } = useLocalCart();
  const cartLength = localCart.length;

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination & URL Params
  const [visibleCount, setVisibleCount] = useState(8);
  const searchParams = useSearchParams();
  const industry = searchParams.get("industry");
  const category = searchParams.get("category");
  const sub = searchParams.get("sub");
  const main = searchParams.get("main") || "";

  const [activeTab, setActiveTab] = useState(main || "products");
  const [open, setOpen] = useState(false);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    if (industry) params.append("industry", industry);
    if (category) params.append("category", category);
    if (sub) params.append("sub", sub);

    axios({
      method: "GET",
      url: `/products/2?${params.toString()}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    })
      .then((res) => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [industry, category, sub]);

  // Combined Search, Price Filter, and Sorting logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search Filter
        const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Price Filter
        const price = p.price ?? 0;
        const matchesMin = minPrice === "" || price >= Number(minPrice);
        const matchesMax = maxPrice === "" || price <= Number(maxPrice);

        return matchesSearch && matchesMin && matchesMax;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
        if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
        if (sortBy === "newest") {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }
        return 0;
      });
  }, [products, searchQuery, minPrice, maxPrice, sortBy]);

  const newArrivals = useMemo(() => {
    return products.filter((p) => compareDate(p.createdAt)).slice(0, 3);
  }, [products]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  // Infinite Scroll Trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredProducts.length) {
          setTimeout(() => {
            setVisibleCount((prev) => prev + 8);
          }, 200);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [visibleCount, filteredProducts.length]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(8);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
  };

  const displayCartItems = useMemo(() => {
    return localCart.map((cartItem) => {
      const details = products.find(
        (p) => String(p._id) === String(cartItem.productId)
      );
      return {
        _id: cartItem.productId,
        productId: cartItem.productId,
        name: details?.name || "Loading...",
        price: details?.price || 0,
        image: details?.images?.[0] || "",
        size: cartItem.size,
        quantity: cartItem.quantity,
      };
    });
  }, [localCart, products]);

  return (
    <Suspense fallback={<CircleLoader isVisible={loading} />}>
      <CartDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        cartItems={displayCartItems}
      />

      <div className="w-full flex flex-col items-center">
        {loading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <CircleLoader isVisible={loading} />
          </div>
        ) : (
          <>
            {activeTab === "products" ? (
              <div className="w-full max-w-7xl px-4 md:px-6 mb-24">
                
                {/* Hero Banner Carousel */}
                <div className="w-full mb-6">
                  <Carousel
                    images={[
                      "https://res.cloudinary.com/wise-solution-inc/image/upload/v1755239366/NZS_WEB_Banner_gh7lnp.png",
                      "https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.18_AM_s7elct.jpg",
                      "https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.19_AM_skokdz.jpg",
                    ]}
                  />
                </div>

                {/* Top Toolbar: Search Bar + Tape + Cart Button */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between my-6">
                  {/* Search Bar */}
                  <div className="relative w-full md:w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FaSearch />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006838] transition"
                      placeholder="Search across all products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>

                  {/* Tape & Cart Action */}
                  <div className="flex items-center justify-between w-full md:w-1/2 gap-4">
                    <div className="flex-1">
                      <Tape />
                    </div>
                    <div
                      className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded-full cursor-pointer shadow-sm hover:shadow-md transition"
                      onClick={() => setOpen(true)}
                    >
                      <Image
                        src="https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png"
                        alt="Cart"
                        height={24}
                        width={24}
                        className="object-contain"
                      />
                      {cartLength > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#006838] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                          {cartLength}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Filter Toggle & Sort Bar */}
                <div className="flex items-center justify-between md:hidden bg-gray-50 p-3 rounded-xl mb-6 border border-gray-200">
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="flex items-center gap-2 text-sm font-semibold text-[#006838]"
                  >
                    <FaFilter /> Filters & Categories
                  </button>
                  <div className="flex items-center gap-2">
                    <FaSortAmountDown className="text-gray-500 text-xs" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent text-xs font-medium text-gray-700 focus:outline-none"
                    >
                      <option value="default">Sort: Default</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                </div>

                {/* Main Content Layout (Sidebar + Products Grid) */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  
                  {/* --- SIDEBAR CONTAINER (Desktop Side + Mobile Drawer) --- */}
                  <aside
                    className={`fixed inset-0 z-50 bg-white p-6 overflow-y-auto transition-transform duration-300 md:static md:z-0 md:p-0 md:bg-transparent md:translate-x-0 md:w-1/4 lg:w-1/5 md:block border-r md:border-r-0 border-gray-100 ${
                      mobileFilterOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
                  >
                    {/* Mobile Sidebar Close Button */}
                    <div className="flex justify-between items-center md:hidden mb-6 border-b pb-3">
                      <h3 className="font-bold text-lg text-gray-800">Filters</h3>
                      <button
                        onClick={() => setMobileFilterOpen(false)}
                        className="text-gray-500 p-2 hover:bg-gray-100 rounded-full"
                      >
                        <FaTimes className="text-lg" />
                      </button>
                    </div>

                    <div className="space-y-6 sticky top-4">
                      {/* Original Product Filter Sidebar (Categories, Subcategories, Industry) */}
                      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <ProductFilterSidebar />
                      </div>

                      {/* --- PRICE RANGE FILTER --- */}
                      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
                        <h4 className="font-semibold text-gray-800 text-sm">Price Range</h4>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : "")}
                            className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-[#006838]"
                          />
                          <span className="text-gray-400 text-xs">-</span>
                          <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
                            className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-[#006838]"
                          />
                        </div>

                        {/* Quick Price Buttons */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <button
                            onClick={() => { setMinPrice(0); setMaxPrice(10000); }}
                            className="text-[11px] px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-[#006838] hover:text-white transition"
                          >
                            Under ₦10,000
                          </button>
                          <button
                            onClick={() => { setMinPrice(20000); setMaxPrice(70000); }}
                            className="text-[11px] px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-[#006838] hover:text-white transition"
                          >
                            ₦20,000 - ₦70,000
                          </button>
                          <button
                            onClick={() => { setMinPrice(100000); setMaxPrice(""); }}
                            className="text-[11px] px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-[#006838] hover:text-white transition"
                          >
                            ₦100,000+
                          </button>
                        </div>
                      </div>

                      {/* Reset All Filters */}
                      {(minPrice !== "" || maxPrice !== "" || searchQuery !== "" || sortBy !== "default") && (
                        <button
                          onClick={handleResetFilters}
                          className="w-full py-2 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </aside>

                  {/* Backdrop for Mobile Sidebar */}
                  {mobileFilterOpen && (
                    <div
                      onClick={() => setMobileFilterOpen(false)}
                      className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    />
                  )}

                  {/* --- MAIN PRODUCT GRID CONTAINER --- */}
                  <main className="w-full md:w-3/4 lg:w-4/5 flex flex-col gap-6">
                    
                    {/* Desktop Sort Options Bar */}
                    <div className="hidden md:flex justify-between items-center bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 font-medium">
                        Showing <span className="font-semibold text-gray-800">{visibleProducts.length}</span> of{" "}
                        <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-500 font-medium">Sort By:</label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="text-xs border-none bg-transparent font-semibold text-gray-700 focus:outline-none cursor-pointer"
                        >
                          <option value="default">Featured / Default</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="newest">Newest Arrivals</option>
                        </select>
                      </div>
                    </div>

                    {/* New Arrivals Section */}
                    {newArrivals.length > 0 && !searchQuery && minPrice === "" && maxPrice === "" && (
                      <div className="w-full">
                        <ProductGrid
                          link="new-arrivals"
                          title="New Arrivals"
                          products={newArrivals}
                        />
                      </div>
                    )}

                    {/* Available / Filtered Products */}
                    <div className="w-full">
                      {visibleProducts.length > 0 ? (
                        <>
                          <ProductGrid
                            link="available-products"
                            title={searchQuery ? `Results for "${searchQuery}"` : "Available Products"}
                            products={visibleProducts}
                          />

                          {/* Infinite Scroll Bottom Target */}
                          <div ref={observerTarget} className="w-full h-20 flex justify-center items-center mt-6">
                            {visibleCount < filteredProducts.length && (
                              <div className="flex flex-col items-center gap-2">
                                <div className="w-6 h-6 border-2 border-gray-300 border-t-[#006838] rounded-full animate-spin"></div>
                                <span className="text-xs text-gray-500">Loading more products...</span>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="py-16 flex flex-col items-center justify-center text-center bg-gray-50 rounded-2xl border border-gray-100 p-6">
                          <FaSearch className="text-4xl text-gray-300 mb-3" />
                          <h3 className="text-lg font-bold text-gray-800">No products match your criteria</h3>
                          <p className="text-sm text-gray-500 mt-1 max-w-md">
                            Try broadening your price range, clearing search terms, or picking a different category.
                          </p>
                          <button
                            onClick={handleResetFilters}
                            className="mt-4 px-5 py-2 bg-[#006838] text-white text-xs font-semibold rounded-full shadow hover:bg-green-800 transition"
                          >
                            Reset Filters
                          </button>
                        </div>
                      )}
                    </div>
                  </main>
                </div>
              </div>
            ) : (
              <FloatingButton />
            )}
          </>
        )}
      </div>
    </Suspense>
  );
};

export default ProductsView;