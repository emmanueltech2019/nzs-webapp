// "use client";
// import CarouselEmbla from "@/components/carousel/Carousel";
// import Link from "next/link";
// import { FC, useEffect, useState } from "react";
// import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "@/utils/axios";
// import { ProductT } from "@/types/Product.types";
// import { showToast } from "@/utils/alert";
// import Image from "next/image";
// import Swal from "sweetalert2";
// import CircleLoader from "@/components/loader/loader";
// // import { useRouter } from 'next/router';

// const ProductScreen: FC = () => {
//   const [product, setProduct] = useState<ProductT>();
//   const [selectedSize, setSelectedSize] = useState("S");
//   const [selectedColor, setSelectedColor] = useState("green");
//   const [cartLength, setCartLength] = useState(0);
//   const [colors, setColors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // const sizes = ["XS", "S", "M", "L", "XL"];
//   // const colors = ["black", "gray", "darkGray", "lightGray", "white"];

//   const router = useRouter();
//   const handleGoBack = () => {
//     router.back(); // Navigate back to the previous page
//   };

//   // const userToken = localStorage.getItem("userToken") || "";
//   // const tr = JSON.parse(userToken);
//   var id: string | null;
//   if (typeof window !== "undefined") {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     id = urlParams.get("id");
//   }

//   const addToCart = () => {
//     axios({
//       method: "POST",
//       url: "cart/add/",
//       data: { productId: id, quantity: 1 },
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     })
//       .then((res) => {
//         showToast("success", "Item added to basket");
//         // Fetch updated cart length after adding to cart
//         axios({
//           method: "GET",
//           url: "cart",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         })
//           .then((cartRes) => {
//             // setCartLength(cartRes.data.cart.items.length);
//           })
//           .catch((error) => {
//             if (error.response.data.message === "Unauthorized access") {
//               Swal.fire({
//                 title: "Session Expired",
//                 text: "Your session has expired. Please log in again.",
//                 icon: "warning",
//                 confirmButtonText: "OK",
//               }).then(() => {
//                 localStorage.clear();
//                 window.location.replace("/auth/login");
//               });
//               return;
//             }
//             console.log(error);
//           });
//       })
//       .catch((error) => {
//         if (error.response.data.message === "Unauthorized access") {
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
//   };
//   useEffect(() => {
//     setLoading(true);
//     //   const userToken = localStorage.getItem("userToken") || "";
//     // const tr = JSON.parse(userToken);
//     axios({
//       method: "GET",
//       url: "cart",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     })
//       .then((res) => {
//         setCartLength(res.data.cart.items.length);
//       })
//       .catch((error) => {
//         if (error.response.data.message === "Unauthorized access") {
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
//     if (typeof window !== "undefined") {
//       const queryString = window.location.search;
//       const urlParams = new URLSearchParams(queryString);
//       let id = urlParams.get("id");
//       axios({
//         method: "GET",
//         url: "products/single/" + id,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//         },
//       })
//         .then((res) => {
//           setLoading(false);
//           console.log("New res", res.data);
//           setColors(res.data.color || []);
//           setProduct(res.data);
//         })
//         .catch((error) => {
//           if (error.response.data.message === "Unauthorized access") {
//             Swal.fire({
//               title: "Session Expired",
//               text: "Your session has expired. Please log in again.",
//               icon: "warning",
//               confirmButtonText: "OK",
//             }).then(() => {
//               localStorage.clear();
//               window.location.replace("/auth/login");
//             });
//             return;
//           }
//           console.log(error);
//         });
//     }
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <CircleLoader isVisible={loading} />
//       ) : (
//         <div className=" p-4  mx-auto bg-white rounded-lg mb-20 md:mb-0">
//           <div className="flex justify-between">
//             <button
//               className=" text-3xl z-10  py-1 text-gray-500 my-1 "
//               onClick={handleGoBack}
//             >
//               <ArrowBackOutlinedIcon fontSize={"large"} />
//             </button>
//             <Link href={"./cart"}>
//               <div className="relative">
//                 <Image
//                   src={
//                     "https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png"
//                   }
//                   alt="cart icon"
//                   height={100}
//                   width={40}
//                   className="text-2xl"
//                 />
//                 <span className="absolute top-2 right-3 bg-[#006838] text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
//                   {cartLength}
//                 </span>
//               </div>
//             </Link>
//           </div>

//           <CarouselEmbla images={product?.images ?? []} />

//           {/* Product Info */}
//           <div className="mt-4">
//             <span className="inline-block py-2 px-4 bg-[#EAF2FF] text-black rounded-lg mb-4 mt-2">
//               Available
//             </span>
//             <h2 className="text-2xl font-bold">{product?.name}</h2>
//             <p className="text-xl text-gray-700">
//               ₦ {product?.price} / {product?.quantityInfo.quantity}{" "}
//               {product?.quantityInfo.quantityUnit} - {product?.price} *{" "}
//               {product?.quantityInfo.quantity}
//             </p>
//             <p className="mt-2 text-gray-500">{product?.description}</p>
//           </div>

//           {/* Size Selector */}
//           {/* <div className="mt-4">
//         <h3 className="font-semibold mb-2">Size</h3>
//         <div className="flex space-x-2">
//           {sizes.map((size) => (
//             <button
//               key={size}
//               className={`px-4 py-2 rounded-full border ${
//                 selectedSize === size
//                   ? "bg-green-600 text-white"
//                   : "bg-gray-100"
//               }`}
//               onClick={() => setSelectedSize(size)}
//             >
//               {size}
//             </button>
//           ))}
//         </div>
//       </div> */}

//           {/* Color Selector */}
//           <div className="mt-4">
//             <h3 className="font-semibold mb-2">Color</h3>
//             <div className="flex space-x-2">
//               {colors.map((color) => (
//                 <button
//                   key={color}
//                   className={`w-8 h-8 rounded-full border ${
//                     selectedColor === color ? "border-green-600" : ""
//                   }`}
//                   style={{ backgroundColor: color }}
//                   onClick={() => setSelectedColor(color)}
//                 ></button>
//               ))}
//             </div>
//           </div>

//           {/* Add to Bag Button */}

//           <button
//             className="mt-6 w-full py-3 bg-[#006838] text-white text-lg rounded-lg flex items-center justify-center"
//             onClick={addToCart}
//           >
//             + Add to Basket
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProductScreen;
"use client";

import CarouselEmbla from "@/components/carousel/Carousel";
import Link from "next/link";
import { FC, useEffect, useState, Suspense } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/utils/axios";
import { ProductT } from "@/types/Product.types";
import { showToast } from "@/utils/alert";
import Image from "next/image";
import Swal from "sweetalert2";
import CircleLoader from "@/components/loader/loader";

interface ColorObject {
  name: string;
  hex: string;
  textColor?: string;
}

const ProductDetailsContent: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [product, setProduct] = useState<ProductT | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<ColorObject | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [cartLength, setCartLength] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const handleGoBack = () => {
    router.back();
  };

  const handleSessionExpired = () => {
    Swal.fire({
      title: "Session Expired",
      text: "Your session has expired. Please log in again.",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(() => {
      localStorage.clear();
      window.location.replace("/auth/login");
    });
  };

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) return;
      const res = await axios.get("cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.cart?.items) {
        setCartLength(res.data.cart.items.length);
      }
    } catch (error: any) {
      if (error.response?.data?.message === "Unauthorized access") {
        handleSessionExpired();
      }
      console.error("Cart fetch error:", error);
    }
  };

  useEffect(() => {
    const fetchProductAndCart = async () => {
      if (!id) {
        showToast("error", "Invalid product ID");
        setLoading(false);
        return;
      }

      setLoading(true);
      const token = localStorage.getItem("userToken");
      const authHeader = { headers: { Authorization: `Bearer ${token}` } };

      try {
        // Run cart initialization and product fetch concurrently
        await fetchCartCount();

        const res = await axios.get(`products/single/${id}`, authHeader);
        const data = res.data;
        setProduct(data);

        // Safely parse colors if mixed types or stringified configurations occur
        const parsedColors: ColorObject[] = Array.isArray(data.color) 
          ? data.color.filter((c: any) => c !== null) 
          : [];

        // Dynamic Initialization to prevent invalid states
        if (parsedColors.length > 0) {
          setSelectedColor(parsedColors[0]);
        }
        if (data.size && data.size.length > 0) {
          setSelectedSize(data.size[0]);
        }

      } catch (error: any) {
        if (error.response?.data?.message === "Unauthorized access") {
          handleSessionExpired();
        }
        console.error("Initialization error:", error);
        showToast("error", "Failed to resolve production details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndCart();
  }, [id]);

  const addToCart = async () => {
    if (!id) return;
    const token = localStorage.getItem("userToken");

    if (product?.color && product.color.filter(Boolean).length > 0 && !selectedColor) {
      showToast("error", "Please select a color option");
      return;
    }
    if (product?.size && product.size.length > 0 && !selectedSize) {
      showToast("error", "Please select a size option");
      return;
    }

    try {
      await axios.post(
        "cart/add/",
        {
          productId: id,
          quantity: quantity,
          color: selectedColor ? selectedColor.name : undefined,
          size: selectedSize || undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showToast("success", "Item added to basket");
      await fetchCartCount(); // Live count refresh
    } catch (error: any) {
      if (error.response?.data?.message === "Unauthorized access") {
        handleSessionExpired();
      }
      console.error("Add to cart error:", error);
      showToast("error", "Could not complete update structure");
    }
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Clean data representation structures
  const validColors = Array.isArray(product?.color) 
    ? (product.color.filter(Boolean) as ColorObject[]) 
    : [];

  return (
    <div className="p-4 mx-auto bg-white rounded-lg mb-20 md:mb-0 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <button className="text-3xl z-10 py-1 text-gray-500 hover:text-gray-800 transition" onClick={handleGoBack}>
          <ArrowBackOutlinedIcon fontSize="large" />
        </button>
        <Link href="/cart">
          <div className="relative p-2 cursor-pointer">
            <Image
              src="https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png"
              alt="cart icon"
              height={32}
              width={32}
              className="object-contain"
            />
            {cartLength > 0 && (
              <span className="absolute top-1 right-1 bg-[#006838] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cartLength}
              </span>
            )}
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Media Block */}
        <div>
          <CarouselEmbla images={product?.images ?? []} />
        </div>

        {/* Configurations Interface */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block py-1 px-3 bg-[#EAF2FF] text-[#006838] text-xs font-semibold rounded-md">
                Available: {product?.totalStock ?? 0} units left
              </span>
              {product?.quantityInfo && (
                <span className="text-xs text-gray-500 font-medium">
                  ({product.quantityInfo.quantity} {product.quantityInfo.quantityUnit})
                </span>
              )}
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-1">{product?.name}</h2>
            
            {product?.subCategory && (
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                {product.categoryRef?.name} &gt; {product.subCategory?.name}
              </p>
            )}

            <p className="text-2xl font-extrabold text-gray-900 mb-4">
              ₦ {(product?.price ?? 0).toLocaleString()}
            </p>
            
            <hr className="border-gray-100 my-4" />
            
            <p className="text-sm text-gray-600 leading-relaxed mb-6">{product?.description}</p>

            {/* Sizes Selection Structure */}
            {product?.size && product.size.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`px-4 py-2 rounded-lg border text-xs font-medium transition ${
                        selectedSize === size
                          ? "bg-[#006838] text-white border-[#006838]"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors Selection Structure */}
            {validColors.length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Select Color</h3>
                <div className="flex flex-wrap gap-3">
                  {validColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      className={`w-8 h-8 rounded-full border-2 transition transform hover:scale-110 ${
                        selectedColor?.name === color.name ? "border-[#006838] scale-105" : "border-gray-200"
                      }`}
                      style={{ background: color.hex }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Control Selector */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Quantity</h3>
              <div className="flex items-center w-32 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                <button type="button" onClick={decrementQty} className="w-10 py-2 text-gray-600 hover:bg-gray-200 font-bold transition">-</button>
                <span className="flex-1 text-center font-semibold text-sm">{quantity}</span>
                <button type="button" onClick={incrementQty} className="w-10 py-2 text-gray-600 hover:bg-gray-200 font-bold transition">+</button>
              </div>
            </div>
          </div>

          {/* Action Trigger Block */}
          <div className="mt-8">
            <button
              type="button"
              className="w-full py-4 bg-[#006838] text-white font-semibold text-base rounded-xl flex items-center justify-center shadow-lg hover:bg-[#00522c] active:scale-[0.99] transition-all"
              onClick={addToCart}
            >
              + Add to Basket (₦ {((product?.price ?? 0) * quantity).toLocaleString()})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper ensuring Next.js route boundaries run safely
export default function ProductScreen() {
  return (
    <Suspense fallback={<CircleLoader isVisible={true} />}>
      <ProductDetailsContent />
    </Suspense>
  );
}