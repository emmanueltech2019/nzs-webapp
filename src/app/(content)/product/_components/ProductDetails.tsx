// "use client";

// import React, { FC, Suspense, useEffect, useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "@/utils/axios";
// import Image from "next/image";

// import CarouselEmbla from "@/components/carousel/Carousel3";
// import CartDrawer from "@/components/cartdrawer/CartDrawer";
// import CircleLoader from "@/components/loader/loader";

// import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
// import { showToast } from "@/utils/alert";
// import { DisplayCartItem, ProductT } from "@/types/Product.types";
// import { useLocalCart } from "@/hooks/useLocalCart";

// const ProductScreen: FC = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get("id");

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

//   const { localCart, addLocalItem, updateItemQuantity, removeItem } =
//     useLocalCart();

//   const cartLength = localCart.length;

//   const [product, setProduct] = useState<ProductT | null>(null);
//   const [colors, setColors] = useState<any[]>([]);
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedSize, setSelectedSize] = useState("none");
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);

//   const handleGoBack = () => router.back();

//   const displayCategory = useMemo(() => {
//     if (!product?.category?.[0]) return "";
//     try {
//       const parsed = JSON.parse(product.category[0]);
//       return Array.isArray(parsed) ? parsed.join(", ") : parsed;
//     } catch {
//       return product.category[0];
//     }
//   }, [product?.category]);

//   useEffect(() => {
//     if (!productId) return;

//     setLoading(true);
//     axios
//       .get(`products/single2/${productId}`)
//       .then((res) => {
//         setProduct(res.data);
//         setColors(res.data.color || []);
//       })
//       .catch(() => {
//         showToast("error", "Failed to load product");
//       })
//       .finally(() => setLoading(false));
//   }, [productId]);

//   /** ADD TO CART */
//   const addToCart = async () => {
//     if (!productId) return;

//     if (!token) {
//       console.log("Local cart item added", selectedColor);
//       addLocalItem({
//         productId,
//         quantity: 1,
//         size: selectedSize,
//         color: selectedColor
//       });

//       showToast("success", "Item added to basket");
//       window.location.reload();
//       return;
//     }

//     try {
//        addLocalItem({
//         productId,
//         quantity: 1,
//         size: selectedSize,
//       });
//       // await axios.post(
//       //   "cart/add/",
//       //   { productId, quantity: 1 },
//       //   { headers: { Authorization: `Bearer ${token}` } }
//       // );

//       showToast("success", "Item added to basket");
//     } catch (error: any) {
//       if (axios.isAxiosError(error) && error.response?.status === 401) {
//         showToast("error", "Session expired. Please log in again.");
//         localStorage.removeItem("userToken");
//       } else {
//         showToast("error", "Unable to add item to cart");
//       }
//     }
//   };

//   const displayCartItems: DisplayCartItem[] = React.useMemo(() => {
//     if (!product) return [];
//     console.log("Local Cart1:", localCart);
//     return localCart
//       // .filter((item) => String(item.productId) === String(product._id))
//       .map((item) => ({
//         _id: product?._id,
//         productId: item.productId,
//         name: product?.name,
//         price: product?.price,
//         image: product?.images?.[0],
//         size: item.size,
//         quantity: item.quantity,
//       }));
//   }, [localCart, product]);
//   console.log("Local Cart2:", displayCartItems);

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//     <div className="md:w-[50%] mx-auto">
//       {loading ? (
//         <CircleLoader isVisible />
//       ) : (
//         <div className="p-4 bg-white rounded-lg mb-20">
//           {/* HEADER */}
//           <div className="flex justify-between items-center">
//             <button onClick={handleGoBack}>
//               <ArrowBackOutlinedIcon fontSize="large" />
//             </button>

//             <div
//               onClick={() => setOpen(true)}
//               className="relative cursor-pointer"
//             >
//               <Image
//                 src="https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png"
//                 alt="cart"
//                 width={40}
//                 height={40}
//               />
//               <span className="absolute top-0 right-0 bg-[#006838] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                 {cartLength}
//               </span>
//             </div>
//           </div>

//           {/* CART DRAWER */}
//           <CartDrawer
//             isOpen={open}
//             onClose={() => setOpen(false)}
//             cartItems={displayCartItems}
//           />

//           <CarouselEmbla images={product?.images ?? []} />

//           <h2 className="text-2xl font-bold mt-4">{product?.name}</h2>
//           <p className="text-xl text-gray-700">
//             ₦{product?.price} for {product?.quantityInfo?.quantity}{" "}
//             {product?.quantityInfo?.quantityUnit}
//           </p>
//           <div className="space-y-4">
//             {/* Header Info */}
//             <div className="flex flex-col gap-1">
//               {/* <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
//       {product?.businessId?.businessName}
//     </span> */}

//               <div className="flex items-center gap-2">
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {product?.businessId?.businessName}{" "}
//                   {/* Assuming you have a name field */}
//                 </h2>
//                 <span className="text-gray-500 font-medium">
//                   {displayCategory}
//                 </span>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="border-t border-gray-100 pt-4">
//               <p className="text-sm font-semibold text-gray-400 uppercase mb-2">
//                 Description
//               </p>
//               <p className="text-gray-600 leading-relaxed">
//                 {product?.description}
//               </p>
//             </div>
//           </div>
//           <div className="mt-6">
//             <h3 className="font-semibold">Color</h3>
//             <div className="flex gap-2 mt-2">
//             {colors
//               ?.filter((c): c is { hex: string; name: string } => Boolean(c?.hex && c?.name))
//               .map(({ hex, name }) => (
//                 <button
//                   key={name}
//                   className={`w-8 h-8 rounded-full border ${
//                     selectedColor === name ? "border-green-600" : ""
//                   }`}
//                   style={{ backgroundColor: hex }}
//                   onClick={() => setSelectedColor(name)}
//                 />
//               ))}
//             </div>
//           </div>

//           <button
//             className="mt-6 w-full py-3 bg-[#006838] text-white rounded-lg"
//             onClick={addToCart}
//           >
//             + Add to Basket
//           </button>
//         </div>
//       )}
//     </div>
//     </Suspense>
//   );
// };

// export default ProductScreen;
"use client";

import React, { FC, Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/utils/axios";
import Image from "next/image";

import CarouselEmbla from "@/components/carousel/Carousel3";
import CartDrawer from "@/components/cartdrawer/CartDrawer";
import CircleLoader from "@/components/loader/loader";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { showToast } from "@/utils/alert";
import { DisplayCartItem, ProductT } from "@/types/Product.types";
import { useLocalCart } from "@/hooks/useLocalCart";

const ProductScreen: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

  const { localCart, addLocalItem } = useLocalCart();
  const cartLength = localCart.length;

  const [product, setProduct] = useState<ProductT | null>(null);
  const [colors, setColors] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleGoBack = () => router.back();

  const displayCategory = useMemo(() => {
    if (!product?.category?.[0]) return "";
    try {
      const parsed = JSON.parse(product.category[0]);
      return Array.isArray(parsed) ? parsed.join(", ") : parsed;
    } catch {
      return product.category[0];
    }
  }, [product?.category]);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    axios
      .get(`products/single2/${productId}`)
      .then((res) => {
        setProduct(res.data);
        const validColors = res.data.color || [];
        setColors(validColors);
        
        // Auto-initialize options with safe fallbacks
        if (validColors.length > 0 && validColors[0]) {
          setSelectedColor(validColors[0].name);
        }
        if (res.data.size && res.data.size.length > 0) {
          setSelectedSize(res.data.size[0]);
        }
      })
      .catch(() => {
        showToast("error", "Failed to load product");
      })
      .finally(() => setLoading(false));
  }, [productId]);

/** ADD TO CART */
  const addToCart = async () => {
    if (!productId) return;

    // Check variant constraints before allowing append action
    if (product?.color && product.color.filter(Boolean).length > 0 && !selectedColor) {
      showToast("error", "Please choose a product color choice.");
      return;
    }
    if (product?.size && product.size.length > 0 && !selectedSize) {
      showToast("error", "Please choose an available size option.");
      return;
    }

    // 1. Guest User Logic (No Token)
    if (!token) {
      console.log("Local cart item added", selectedColor);
      addLocalItem({
        productId,
        quantity: 1,
        size: selectedSize,
        color: selectedColor // <--- Safely passed here
      });

      showToast("success", "Item added to basket");
      return;
    }

    // 2. Logged In User Logic (Token exists)
    try {
      addLocalItem({
        productId,
        quantity: 1,
        size: selectedSize,
        color: selectedColor // <--- FIXED: Added missing color field here
      });

      showToast("success", "Item added to basket");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        showToast("error", "Session expired. Please log in again.");
        localStorage.removeItem("userToken");
      } else {
        showToast("error", "Unable to add item to cart");
      }
    }
  };
  const displayCartItems: DisplayCartItem[] = React.useMemo(() => {
    if (!product) return [];
    return localCart.map((item) => ({
      _id: product?._id,
      productId: item.productId,
      name: product?.name,
      price: product?.price,
      image: product?.images?.[0],
      size: item.size,
      color: item.color, // <--- Passes variant details cleanly down to <CartDrawer />
      quantity: item.quantity,
    }));
  }, [localCart, product]);

  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500 font-medium">Loading layout context...</div>}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <CircleLoader isVisible />
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-20 p-4 md:p-8">
            
            {/* NAVIGATION HEADER */}
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={handleGoBack} 
                className="p-2 -ml-2 rounded-full text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition"
              >
                <ArrowBackOutlinedIcon fontSize="large" />
              </button>

              <div
                onClick={() => setOpen(true)}
                className="relative cursor-pointer p-2 rounded-full hover:bg-gray-50 transition"
              >
                <Image
                  src="https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png"
                  alt="cart"
                  width={34}
                  height={34}
                  className="object-contain"
                />
                {cartLength > 0 && (
                  <span className="absolute top-0 right-0 bg-[#006838] text-white text-[10px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center shadow-sm animate-pulse">
                    {cartLength}
                  </span>
                )}
              </div>
            </div>

            {/* DRAWER LAYER CONTAINER */}
            <CartDrawer
              isOpen={open}
              onClose={() => setOpen(false)}
              cartItems={displayCartItems}
            />

            {/* TWO COLUMN CONTENT RESPONSIVE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              
              {/* LEFT BLOCK: MEDIA CAROUSEL */}
              <div className="w-full">
                <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                  <CarouselEmbla images={product?.images ?? []} />
                </div>
              </div>

              {/* RIGHT BLOCK: INTERACTIVE CONFIGURATIONS */}
              <div className="flex flex-col justify-between">
                <div>
                  
                  {/* BRAND & STATUS TRACKING BADGES */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-[#EAF2FF] text-[#006838] text-xs font-bold px-3 py-1 rounded-md tracking-wide uppercase">
                      {product?.businessId?.businessName || "Vendor Store"}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-md">
                      In Stock: {product?.totalStock ?? 0}
                    </span>
                  </div>

                  {/* TAXONOMY BREADCRUMBS (INDUSTRIES / CATEGORIES DISPLAY) */}
                  {(product?.industry || product?.categoryRef || product?.subCategory) && (
                    <nav className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-400 uppercase mb-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      {product?.industry && (
                        <span className="text-[#006838]">{product.industry.name}</span>
                      )}
                      {product?.categoryRef && (
                        <>
                          <span className="text-gray-300 font-normal">&gt;</span>
                          <span>{product.categoryRef.name}</span>
                        </>
                      )}
                      {product?.subCategory && (
                        <>
                          <span className="text-gray-300 font-normal">&gt;</span>
                          <span className="text-gray-600 underline decoration-2 decoration-[#006838]/30">{product.subCategory.name}</span>
                        </>
                      )}
                    </nav>
                  )}

                  {/* PRODUCT IDENTITY */}
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                    {product?.name}
                  </h2>
                  
                  {/* PRICING METRIC SCHEMAS */}
                  <p className="text-2xl font-black text-gray-900 mb-6">
                    ₦{(product?.price ?? 0).toLocaleString()}{" "}
                    {product?.quantityInfo?.quantity && (
                      <span className="text-sm font-medium text-gray-500">
                        per {product.quantityInfo.quantity} {product.quantityInfo.quantityUnit || "Units"}
                      </span>
                    )}
                  </p>

                  {/* DESCRIPTION DESCRIPTION */}
                  <div className="border-t border-b border-gray-100 py-4 mb-6">
                    <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">
                      Product Description
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {product?.description || "No item description layout registered for this record."}
                    </p>
                  </div>

                  {/* DYNAMIC VARIANT SIZE DISPLAY */}
                  {product?.size && product.size.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-800 mb-2.5">Available Sizes</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.size.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition ${
                              selectedSize === size
                                ? "bg-[#006838] text-white border-[#006838] shadow-sm"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* DYNAMIC VARIANT COLOR DISPLAY */}
                  {colors && colors.filter(Boolean).length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-800 mb-2.5">Select Color</h3>
                      <div className="flex flex-wrap gap-3">
                        {colors
                          .filter((c): c is { hex: string; name: string } => Boolean(c?.hex && c?.name))
                          .map(({ hex, name }) => (
                            <button
                              key={name}
                              type="button"
                              title={name}
                              className={`w-8 h-8 rounded-full border-2 transition transform hover:scale-110 ${
                                selectedColor === name 
                                  ? "border-[#006838] scale-105 shadow-sm" 
                                  : "border-gray-200"
                              }`}
                              style={{ backgroundColor: hex }}
                              onClick={() => setSelectedColor(name)}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* BASKET TRIGGER BLOCK ACTION */}
                <div className="mt-4">
                  <button
                    type="button"
                    className="w-full py-4 bg-[#006838] text-white font-semibold text-base rounded-xl flex items-center justify-center shadow-md hover:bg-[#00522c] active:scale-[0.99] transition-all"
                    onClick={addToCart}
                  >
                    + Add to Basket
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </Suspense>
  );
};

export default ProductScreen;