// "use client";
// import CarouselEmbla from "@/components/carousel/Carousel3";
// import React, { FC, useEffect, useState } from "react";
// import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
// import { useRouter } from "next/navigation";
// import axios from "@/utils/axios";
// import { ProductT } from "@/types/Product.types";
// import { showToast } from "@/utils/alert";
// import Image from "next/image";
// import CircleLoader from "@/components/loader/loader";
// import { useLocalCart } from "@/hooks/useLocalCart";
// import CartDrawer from "@/components/cartdrawer/CartDrawer";
// // import { useLocalCart } from "@/hooks/useCartData";
// import Swal from "sweetalert2";

// const ProductScreen: FC = () => {
//   let token : any
//   if (typeof window !== "undefined") {
//   token = localStorage.getItem("userToken");
// }
//   const { addLocalItem, updateItemQuantity, removeItem  } = useLocalCart();
//   const { localCart } = useLocalCart();
//   const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0); // <-- NEW STATE
//   const { detailedCart } = useLocalCart(cartUpdateTrigger);
//   const [product, setProduct] = useState<ProductT>();
//   const [selectedSize, setSelectedSize] = useState("none");
//   const [selectedColor, setSelectedColor] = useState("none");
//   const cartLength = token
//     ? detailedCart?.length || 0 // detailedCart is already the array of items
//     : localCart.length;

//   const [colors, setColors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const handleGoBack = () => {
//     router.back();
//   };
//   var id: any
//   if (typeof window !== "undefined") {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     id = urlParams.get("id");
//   }

//   const addToCart = async () => {
//     if (!token) {
//       addLocalItem({
//         productId: id,
//         quantity: 1,
//         // color: selectedColor,
//         size: selectedSize,
//       });

//       showToast("success", "Item added to basket.")
//       setTimeout(() => {
//         window.location.reload();
//       }, 4000);
//       return;
//     }
//     try {
//       await axios.post(
//         "cart/add/",
//         { productId: id, quantity: 1 },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       showToast("success", "Item added to basket");
//       setCartUpdateTrigger(prev => prev + 1);
//    } catch (error) {
//       console.log(error);

//       // Use type narrowing to check if the error is an Axios error with a response object
//       if (axios.isAxiosError(error) && error.response) {

//           // Now TypeScript recognizes error.response is safe to access
//           if (error.response.status === 401 || error.response.data?.message === "Unauthorized access") {

//             // 1. Alert "please try again"
//             showToast("error", "Error adding item to cart. Please try again.");

//             // 2. Clear the token and reload the page
//             localStorage.removeItem("userToken");
//             setTimeout(() => {
//               window.location.reload();
//             }, 500);

//           } else {
//             // Handle other server responses (e.g., 500, 400, etc.)
//             showToast("error", "Server Error: " + (error.response.data?.message || "Please try again later."));
//           }

//       } else {
//         // Handle non-Axios errors (e.g., network connection failure, code crash)
//         showToast("error", "An unknown error occurred. Please check your connection.");
//       }
//     }
//   };
// const formattedCategory = product?.category
//   ? JSON.parse(product.category[0]).join(", ")
//   : "";

//   const displayCategory = React.useMemo(() => {
//   if (!product?.category?.[0]) return "";

//   try {
//     // This handles the "[\"Edible\"]" string safely
//     const parsed = JSON.parse(product.category[0]);
//     return Array.isArray(parsed) ? parsed.join(", ") : parsed;
//   } catch (e) {
//     // Fallback if it's already a plain string or malformed
//     return product.category[0];
//   }
// }, [product?.category]);
//   useEffect(() => {
//     setLoading(true);
//     if (typeof window !== "undefined") {
//       axios({
//         method: "GET",
//         url: "cart",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//         },
//       })
//         .then((res) => {
//           // setCartLength(res.data.cart.items.length);
//         })
//         .catch((error) => {});
//       if (typeof window !== "undefined") {
//         const queryString = window.location.search;
//         const urlParams = new URLSearchParams(queryString);
//         let id = urlParams.get("id");
//         axios({
//           method: "GET",
//           url: "products/single2/" + id,
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         })
//           .then((res) => {
//             setLoading(false);
//             console.log("New res", res.data);
//             setColors(res.data.color || []);
//             setProduct(res.data);
//           })
//           .catch((error) => {});
//       }
// }
//   }, []);
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="md:w-[50%] mx-auto">
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
//             <CartDrawer
//               isOpen={open}
//               onClose={() => setOpen(false)}
//               cartItems={detailedCart}
//               updateItemQuantity={updateItemQuantity}
//               removeItem={removeItem}
//             />
//             <div onClick={() => setOpen(true)}>
//               <div className="relative">
//                 <Image
//                   src={
//                     "https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png"
//                   }
//                   alt="cart icon"
//                   height={300}
//                   width={40}
//                   className="text-2xl"
//                 />
//                 <span className="absolute top-2 right-3 bg-[#006838] text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
//                   {cartLength}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <CarouselEmbla images={product?.images ?? []} />

//           <div className="mt-4">
//             <span className="inline-block py-2 px-4 bg-[#EAF2FF] text-black rounded-lg mb-4 mt-2">
//               In stock
//             </span>
//             <h2 className="text-2xl font-bold">{product?.name}</h2>
//             <p className="text-xl text-gray-700">
//               ₦ {product?.price} for {product?.quantityInfo.quantity}{" "} {product?.quantityInfo.quantityUnit}
//               {/* {product?.quantityInfo.quantityUnit} - {product?.price} *{" "}
//               {product?.quantityInfo.quantity} */}
//             </p>
//             {/* <div> */}
//            <div className="mt-8 border-t border-gray-100 pt-8">

//               <div className="flex items-center gap-2 text-sm font-medium tracking-wide">
//                   <span className="text-blue-600 uppercase">{product?.businessId?.businessName}</span>
//                   <span className="text-gray-300">•</span>
//                   <span className="text-gray-500 font-medium">{displayCategory}</span>
//                   {/* <span className="text-gray-500">{product?.category?.length > 0 && JSON.parse(product?.category[0]).join(", ")}</span> */}
//                 </div>
//                 <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">
//                 Product Description
//               </h2>
//               <p className="mt-4 text-base leading-relaxed text-gray-600">
//                 {product?.description}
//               </p>
//             </div>
//           </div>
//           <div className="mt-4">
//             <h3 className="font-semibold mb-2">Color</h3>
//             <div className="flex space-x-2">
//               {colors.map(({hex, name}) => (
//                 <button
//                   key={name}
//                   className={`w-8 h-8 rounded-full border-3 border-green-600 ${
//                     selectedColor === name ? "border-green-600" : ""
//                   }`}
//                   style={{ backgroundColor: hex }}
//                   onClick={() => setSelectedColor(name)}
//                 ></button>
//               ))}
//             </div>
//           </div>

//           <button
//             className="mt-6 w-full py-3 bg-[#006838] text-white text-lg rounded-lg flex items-center justify-center"
//             onClick={addToCart}
//           >
//             + Add to Basket
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductScreen;
"use client";

import React, { FC, useEffect, useMemo, useState } from "react";
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

  /** CART — single source of truth */
  const { localCart, addLocalItem, updateItemQuantity, removeItem } =
    useLocalCart();

  const cartLength = localCart.length;

  const [product, setProduct] = useState<ProductT | null>(null);
  const [colors, setColors] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState("none");
  const [selectedSize, setSelectedSize] = useState("none");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleGoBack = () => router.back();

  /** CATEGORY DISPLAY SAFE PARSE */
  const displayCategory = useMemo(() => {
    if (!product?.category?.[0]) return "";
    try {
      const parsed = JSON.parse(product.category[0]);
      return Array.isArray(parsed) ? parsed.join(", ") : parsed;
    } catch {
      return product.category[0];
    }
  }, [product?.category]);

  /** FETCH PRODUCT */
  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    axios
      .get(`products/single2/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setColors(res.data.color || []);
      })
      .catch(() => {
        showToast("error", "Failed to load product");
      })
      .finally(() => setLoading(false));
  }, [productId]);

  /** ADD TO CART */
  const addToCart = async () => {
    if (!productId) return;

    if (!token) {
      addLocalItem({
        productId,
        quantity: 1,
        size: selectedSize,
      });

      showToast("success", "Item added to basket");
      window.location.reload();
      return;
    }

    try {
       addLocalItem({
        productId,
        quantity: 1,
        size: selectedSize,
      });
      await axios.post(
        "cart/add/",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
    console.log("Local Cart1:", localCart);
    return localCart
      // .filter((item) => String(item.productId) === String(product._id))
      .map((item) => ({
        _id: product?._id,
        productId: item.productId,
        name: product?.name,
        price: product?.price,
        image: product?.images?.[0],
        size: item.size,
        quantity: item.quantity,
      }));
  }, [localCart, product]);
  console.log("Local Cart2:", displayCartItems);

  return (
    <div className="md:w-[50%] mx-auto">
      {loading ? (
        <CircleLoader isVisible />
      ) : (
        <div className="p-4 bg-white rounded-lg mb-20">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <button onClick={handleGoBack}>
              <ArrowBackOutlinedIcon fontSize="large" />
            </button>

            <div
              onClick={() => setOpen(true)}
              className="relative cursor-pointer"
            >
              <Image
                src="https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png"
                alt="cart"
                width={40}
                height={40}
              />
              <span className="absolute top-0 right-0 bg-[#006838] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartLength}
              </span>
            </div>
          </div>

          {/* CART DRAWER */}
          <CartDrawer
            isOpen={open}
            onClose={() => setOpen(false)}
            cartItems={displayCartItems}
          />

          <CarouselEmbla images={product?.images ?? []} />

          <h2 className="text-2xl font-bold mt-4">{product?.name}</h2>
          <p className="text-xl text-gray-700">
            ₦{product?.price} for {product?.quantityInfo?.quantity}{" "}
            {product?.quantityInfo?.quantityUnit}
          </p>
          <div className="space-y-4">
            {/* Header Info */}
            <div className="flex flex-col gap-1">
              {/* <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
      {product?.businessId?.businessName}
    </span> */}

              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {product?.businessId?.businessName}{" "}
                  {/* Assuming you have a name field */}
                </h2>
                <span className="text-gray-500 font-medium">
                  {displayCategory}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm font-semibold text-gray-400 uppercase mb-2">
                Description
              </p>
              <p className="text-gray-600 leading-relaxed">
                {product?.description}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold">Color</h3>
            <div className="flex gap-2 mt-2">
            {colors
              ?.filter((c): c is { hex: string; name: string } => Boolean(c?.hex && c?.name))
              .map(({ hex, name }) => (
                <button
                  key={name}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor === name ? "border-green-600" : ""
                  }`}
                  style={{ backgroundColor: hex }}
                  onClick={() => setSelectedColor(name)}
                />
              ))}
            </div>
          </div>

          <button
            className="mt-6 w-full py-3 bg-[#006838] text-white rounded-lg"
            onClick={addToCart}
          >
            + Add to Basket
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
