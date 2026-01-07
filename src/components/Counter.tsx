"use client";
import React, { useState, Suspense, useEffect } from "react";
import FloatingButton from "@/components/buttons/FloatingButton";
import Carousel from "@/components/carousel/Carousel2";
// import SortFilter from "@/components/SortFilter/SortFilter"; // Unused in provided code
import ProductGrid from "@/components/Grid/ProductGrid2";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/utils/axios";
import { DisplayCartItem, ProductT } from "@/types/Product.types";
import Banner1 from "../assets/images/banner-img/banner-img-1.jpg";
import Banner2 from "../assets/images/banner-img/banner-img-2.jpg";
import Banner3 from "../assets/images/banner-img/banner-img-3.jpg";
import Banner4 from "../assets/images/banner-img/banner-img-4.jpg";
// import Swal from "sweetalert2"; // Unused
import CircleLoader from "@/components/loader/loader";
import ProductFilterSidebar from "./SideFileter";
// import Link from "next/link"; // Unused
import Image from "next/image";
import Tape from "./tape/Tape";
import CartDrawer from "./cartdrawer/CartDrawer";

// Icons
import { FaSearch } from "react-icons/fa"; // Make sure you have react-icons installed
// import { useLocalCart } from "@/hooks/useLocalCart";
// import { useCartData } from "@/hooks/useCartData";
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
  const { localCart, addLocalItem, updateItemQuantity, removeItem  } = useLocalCart();
  const cartLength = localCart.length;

// const { detailedCart } = useLocalCart();
  // --- NEW STATES FOR SEARCH AND PAGINATION ---
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8); // Start with 9 items

  useEffect(() => {
    setLoading(true);
    if (typeof window !== "undefined") {
      axios({
        method: "GET",
        url: "products/2",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
        .then((res) => {
          setProducts(res.data.products);
          setProduct(res.data.products);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
}
  }, []);

  const searchParams = useSearchParams();
  const main = searchParams.get("main") || "";
  const [activeTab, setActiveTab] = useState(main || "products");
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<ProductT | null>(null);
  

  // --- FILTERING LOGIC ---
  // 1. Filter by search query
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 2. Logic for New Arrivals (Search usually doesn't affect this static section, but if you want it to, change 'products' to 'filteredProducts' below)
  const newArrivals = products
    .filter((p) => compareDate(p.createdAt))
    .slice(0, 3);

  // 3. Slice for "Available Products" based on Load More
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // --- HANDLERS ---
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8); // Load 20 more
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(9); // Reset to 9 when search changes so user sees top results
  };
  const [products2, setProducts2] = React.useState<ProductT[]>([]);
  // const displayCartItems: DisplayCartItem[] = React.useMemo(() => {
  //   if (!product) return [];
  //   console.log("Local Cart1:", localCart);
  //   return localCart
  //     // .filter((item) => String(item.productId) === String(product._id))
  //     .map((item) => ({
  //       _id: product._id,
  //       productId: item.productId,
  //       name: product.name,
  //       price: product.price,
  //       image: product.images?.[0],
  //       size: item.size,
  //       quantity: item.quantity,
  //     }));
  // }, [localCart, product]);
  const displayCartItems = React.useMemo(() => {
  return localCart.map((cartItem) => {
    // Find the product details that match this cart item
    const details = products.find((p) => String(p._id) === String(cartItem.productId));

    // If details haven't loaded yet, return a skeleton or basic info
    return {
      _id: cartItem.productId,
      productId: cartItem.productId,
      name: details?.name || "Loading...",
      price: details?.price || 0, // This avoids your .toFixed() error!
      image: details?.images?.[0] || "",
      size: cartItem.size,
      quantity: cartItem.quantity,
    };
  });
}, [localCart, products]);
  console.log("Local Cart2:", displayCartItems);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-white mt-5">

        <CartDrawer
          isOpen={open}
          onClose={() => setOpen(false)}
          cartItems={displayCartItems}
        />
        {loading ? (
          <CircleLoader isVisible={loading} />
        ) : (
          <div className="md:w-screen flex md:flex-row flex-col-reverse pt-4 md:px-2 md:px-6">
            <div className="bg-white h-auto md:w-[38vw] md:mr-10 md:px-5">
              <ProductFilterSidebar />
            </div>

            <>
              {activeTab == "products" ? (
                <div className="mb-24 md:mb-0 w-screen">
                  <Carousel
                    images={[
                      "https://res.cloudinary.com/wise-solution-inc/image/upload/v1755239366/NZS_WEB_Banner_gh7lnp.png",
                      "https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.18_AM_s7elct.jpg",
                      "https://res.cloudinary.com/wise-solution-inc/image/upload/v1757339938/WhatsApp_Image_2025-08-26_at_12.39.19_AM_skokdz.jpg",
                    ]}
                  />

                  {/* --- NEW SEARCH COMPONENT --- */}
                  <div className="md:w-[68vw] mt-6 mb-2 flex justify-center">
                    <div className="relative w-full md:w-2/3">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-600 focus:border-green-600 sm:text-sm"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4 md:w-[68vw] ">
                    <div className="w-[90%]">
                      <Tape />
                    </div>
                    <div className="pl-2 w-[10%] flex mx-auto justify-center items-center">
                      <div
                        className="relative w-10 h-10 cursor-pointer"
                        onClick={() => setOpen(true)}
                      >
                        <Image
                          src={
                            "https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png"
                          }
                          alt="cart icon"
                          height={400}
                          width={40}
                          className="text-2xl"
                        />
                        <span className="absolute top-2 right-3 bg-[#006838] text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                           {cartLength}
                        </span>
                      </div>
                    </div>
                  </div>

                  {newArrivals.length > 0 ? (
                    <ProductGrid
                      link="new-arrivals"
                      title="New Arrivals"
                      products={newArrivals}
                    />
                  ) : (
                    <div className="p-4 flex flex-col gap-3">
                      <h2 className="text-xl font-semibold">New Arrivals</h2>
                      <p className="text-center text-gray-500">No new arrivals</p>
                    </div>
                  )}

                  {/* --- AVAILABLE PRODUCTS WITH LOAD MORE --- */}
                  {visibleProducts.length > 0 ? (
                    <div className="flex flex-col md:pb-10">
                      <ProductGrid
                        link="available-products"
                        title="Available Products"
                        products={visibleProducts}
                      />
                      
                      {/* Load More Button */}
                      {visibleCount < filteredProducts.length && (
                        <div className="flex justify-center mt-8">
                          <button
                            onClick={handleLoadMore}
                            className="px-6 py-3 bg-[#006838] text-white font-semibold rounded-full shadow-md hover:bg-green-800 transition-colors duration-300"
                          >
                            Load More Products
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 flex flex-col gap-3">
                      <h2 className="text-xl font-semibold">
                        Available Products
                      </h2>
                      <p className="text-center text-gray-500">
                        {searchQuery
                          ? `No products found matching "${searchQuery}"`
                          : "No products available"}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <FloatingButton />
                </>
              )}
            </>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default ProductsView;