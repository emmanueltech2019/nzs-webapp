// // import React, { FC } from "react";
// // import { Icon } from "@iconify/react";
// // import { CartItemT } from "@/types/Product.types";
// // import axios from "@/utils/axios";
// // import { showToast } from "@/utils/alert";
// // import Image from "next/image";
// // import Swal from "sweetalert2";

// // interface BagProps {
// //   item: CartItemT;
// //   quantity: number;
// //   setQuantity: (newQuantity: number) => void;
// // }

// // const BagItem: FC<BagProps> = ({ item }) => {
// //   const updateCart = (id: string, action: string) => {
// //     axios({
// //       method: "PUT",
// //       url: "cart/update/",
// //       data: { productId: id, action },
// //       headers: {
// //         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
// //       },
// //     })
// //       .then(() => {
// //         showToast("success", "Item updated");
// //       })
// //       .catch((error) => {
// //         if (error.response.data.message === "Unauthorized access") {
// //           Swal.fire({
// //             title: "Session Expired",
// //             text: "Your session has expired. Please log in again.",
// //             icon: "warning",
// //             confirmButtonText: "OK",
// //           }).then(() => {
// //             localStorage.clear();
// //             window.location.replace("/auth/login");
// //           });
// //           return;
// //         }
// //         console.error(error);
// //       });
// //   };
// // const selectedSize = item.size || item.productId?.size;
// //   const selectedColor = item.color || item.productId?.color;
// //   return (
// //    <div className="flex items-center justify-between border-b py-4">
// //       <div className="flex items-center">
// //         {/* Product Image */}
// //         <div className="w-[100px] h-[100px] bg-gray-200 rounded-md mr-4 flex items-center justify-center relative overflow-hidden">
// //           <Image
// //             src={
// //               item.productId?.images?.[0] ||
// //               "https://res.cloudinary.com/wise-solution-inc/image/upload/v1729911544/fulllogo_full_green_1_gg1urs.png"
// //             }
// //             width={100}
// //             height={100}
// //             alt={item.productId?.name || "Product image"}
// //             className="object-cover w-full h-full"
// //           />
// //         </div>

// //         {/* Product Details */}
// //         <div className="flex flex-col justify-between py-1">
// //           <div>
// //             <h3 className="font-semibold text-gray-800 text-base line-clamp-1">
// //               {item.productId?.name || "Unnamed Product"}
// //             </h3>
            
// //             {/* Size & Color Tags */}
// //             <div className="flex items-center gap-2 mt-1 mb-2 text-xs text-gray-500">
// //               {selectedSize && (
// //                 <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
// //                   Size: <strong className="text-gray-700">{selectedSize}</strong>
// //                 </span>
// //               )}
// //               {selectedColor && (
// //                 <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
// //                   Color: <strong className="text-gray-700">{selectedColor}</strong>
// //                 </span>
// //               )}
// //             </div>
// //           </div>

// //           {/* Quantity Controls */}
// //           <div className="flex items-center rounded-full">
// //             <button
// //               onClick={() => updateCart(item.productId._id, "minus")}
// //               className="py-1 text-gray-600 focus:outline-none"
// //             >
// //               <span className="px-2 py-[1px] border bg-[#EAF2FF] text-[#006838] rounded-full text-sm font-bold">
// //                 -
// //               </span>
// //             </button>
// //             <span className="px-3 text-sm font-medium">{item.quantity}</span>
// //             <button
// //               onClick={() => updateCart(item.productId._id, "plus")}
// //               className="py-1 text-gray-600 focus:outline-none"
// //             >
// //               <span className="px-2 py-[2px] border bg-[#EAF2FF] text-[#006838] rounded-full text-sm font-bold">
// //                 +
// //               </span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Pricing */}
// //       <div className="flex items-center space-x-4">
// //         <span className="font-extrabold text-gray-900">₦ {item.price?.toLocaleString()}</span>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BagItem;
// import React, { FC } from "react";
// import { CartItemT } from "@/types/Product.types";
// import axios from "@/utils/axios";
// import { showToast } from "@/utils/alert";
// import Image from "next/image";
// import Swal from "sweetalert2";

// interface BagProps {
//   item: CartItemT;
//   quantity: number;
//   setQuantity: (newQuantity: number) => void;
// }

// const BagItem: FC<BagProps> = ({ item, quantity, setQuantity }) => {
//   const updateCart = (id: string, action: string) => {
//     const newQuantity = action === "plus" ? quantity + 1 : quantity - 1;
    
//     // Prevent reducing quantity below 1
//     if (newQuantity < 1) return;

//     // Guard for SSR environment before accessing localStorage
//     const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

//     axios({
//       method: "PUT",
//       url: "cart/update/",
//       data: { productId: id, action },
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then(() => {
//         showToast("success", "Item updated");
//         setQuantity(newQuantity); // FIX: Syncs UI state with backend success
//       })
//       .catch((error) => {
//         if (error.response?.data?.message === "Unauthorized access") {
//           Swal.fire({
//             title: "Session Expired",
//             text: "Your session has expired. Please log in again.",
//             icon: "warning",
//             confirmButtonText: "OK",
//           }).then(() => {
//             if (typeof window !== "undefined") {
//               localStorage.clear();
//               window.location.replace("/auth/login");
//             }
//           });
//           return;
//         }
//         console.error(error);
//       });
//   };

//   const selectedSize = item.size || item.productId?.size;
//   const selectedColor = item.color || item.productId?.color;

//   // FIX: Helper function to safely parse and render the color type union
//   const renderColor = () => {
//     if (!selectedColor) return null;
//     if (typeof selectedColor === "string") return selectedColor;
//     if (Array.isArray(selectedColor)) {
//       // Maps array of objects to strings. Adjust '.name' to match your ColorOptionT property
//       return selectedColor.map((c: any) => c.name || c.label || "").join(", ");
//     }
//     return null;
//   };

//   return (
//     <div className="flex items-center justify-between border-b py-4">
//       <div className="flex items-center">
//         {/* Product Image */}
//         <div className="w-[100px] h-[100px] bg-gray-200 rounded-md mr-4 flex items-center justify-center relative overflow-hidden">
//           <Image
//             src={
//               item.productId?.images?.[0] ||
//               "https://res.cloudinary.com/wise-solution-inc/image/upload/v1729911544/fulllogo_full_green_1_gg1urs.png"
//             }
//             width={100}
//             height={100}
//             alt={item.productId?.name || "Product image"}
//             className="object-cover w-full h-full"
//             unoptimized // Add if external domains aren't configured in next.config.js
//           />
//         </div>

//         {/* Product Details */}
//         <div className="flex flex-col justify-between py-1">
//           <div>
//             <h3 className="font-semibold text-gray-800 text-base line-clamp-1">
//               {item.productId?.name || "Unnamed Product"}
//             </h3>

//             {/* Size & Color Tags */}
//             <div className="flex items-center gap-2 mt-1 mb-2 text-xs text-gray-500">
//               {selectedSize && (
//                 <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
//                   Size: <strong className="text-gray-700">{selectedSize}</strong>
//                 </span>
//               )}
//               {selectedColor && (
//                 <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
//                   Color: <strong className="text-gray-700">{renderColor()}</strong>
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Quantity Controls */}
//           <div className="flex items-center rounded-full">
//             <button
//               onClick={() => updateCart(item.productId._id, "minus")}
//               className="py-1 text-gray-600 focus:outline-none"
//               disabled={quantity <= 1}
//             >
//               <span className="px-2 py-[1px] border bg-[#EAF2FF] text-[#006838] rounded-full text-sm font-bold opacity-50 disabled:cursor-not-allowed">
//                 -
//               </span>
//             </button>
//             <span className="px-3 text-sm font-medium">{quantity}</span>
//             <button
//               onClick={() => updateCart(item.productId._id, "plus")}
//               className="py-1 text-gray-600 focus:outline-none"
//             >
//               <span className="px-2 py-[2px] border bg-[#EAF2FF] text-[#006838] rounded-full text-sm font-bold">
//                 +
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Pricing */}
//       <div className="flex items-center space-x-4">
//         <span className="font-extrabold text-gray-900">
//           ₦ {(item.price * quantity).toLocaleString()}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default BagItem;
"use client";

import React, { FC, useState } from "react";
import { CartItemT } from "@/types/Product.types";
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";
import Image from "next/image";
import Swal from "sweetalert2";

interface BagProps {
  item: CartItemT;
}

const BagItem: FC<BagProps> = ({ item }) => {
  /*
   * Safely get the product.
   *
   * Depending on your backend, productId may be:
   *
   * 1. A populated product object
   * 2. A product ID string
   * 3. null / undefined
   *
   * We handle all cases safely.
   */

  const product =
    item?.productId && typeof item.productId === "object"
      ? item.productId
      : null;

  /*
   * Get product ID safely.
   *
   * If productId is populated:
   * item.productId._id
   *
   * If productId is just a string:
   * item.productId
   */
  const productId =
    typeof item?.productId === "string"
      ? item.productId
      : product?._id;

  /*
   * Quantity
   *
   * We first use the quantity from the cart item.
   * If quantity is missing, we use 1 as a fallback.
   */
  const initialQuantity = Number(item?.quantity ?? 1);

  const [quantity, setQuantity] = useState<number>(
    Number.isFinite(initialQuantity) && initialQuantity > 0
      ? initialQuantity
      : 1
  );

  const [updating, setUpdating] = useState<boolean>(false);

  /*
   * Safely get selected size.
   */
  const selectedSize =
    item?.size ||
    (product as any)?.size ||
    null;

  /*
   * Safely get selected color.
   */
  const selectedColor =
    item?.color ||
    (product as any)?.color ||
    null;

  /*
   * Safely render the selected color.
   */
  const renderColor = () => {
    if (!selectedColor) {
      return null;
    }

    // If color is a string
    if (typeof selectedColor === "string") {
      return selectedColor;
    }

    // If color is an array
    if (Array.isArray(selectedColor)) {
      return selectedColor
        .map((color: any) => {
          if (typeof color === "string") {
            return color;
          }

          return (
            color?.name ||
            color?.label ||
            color?.value ||
            ""
          );
        })
        .filter(Boolean)
        .join(", ");
    }

    // If color is an object
    if (typeof selectedColor === "object") {
      return (
        (selectedColor as any)?.name ||
        (selectedColor as any)?.label ||
        (selectedColor as any)?.value ||
        ""
      );
    }

    return null;
  };

  /*
   * Update cart quantity.
   */
  const updateCart = async (action: "plus" | "minus") => {
    /*
     * Make sure we have a valid product ID.
     */
    if (!productId) {
      console.error(
        "Cannot update cart: Product ID is missing.",
        item
      );

      Swal.fire({
        title: "Unable to update item",
        text: "This product could not be identified. Please refresh the page and try again.",
        icon: "error",
        confirmButtonText: "OK",
      });

      return;
    }

    /*
     * Prevent multiple clicks while request is processing.
     */
    if (updating) {
      return;
    }

    /*
     * Calculate new quantity.
     */
    const newQuantity =
      action === "plus"
        ? quantity + 1
        : quantity - 1;

    /*
     * Prevent quantity from going below 1.
     */
    if (newQuantity < 1) {
      return;
    }

    /*
     * Get authentication token safely.
     */
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("userToken")
        : null;

    /*
     * If no token, redirect to login.
     */
    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to update your basket.",
        icon: "warning",
        confirmButtonText: "Login",
      }).then(() => {
        window.location.replace("/auth/login");
      });

      return;
    }

    try {
      setUpdating(true);

      console.log("Updating cart:", {
        productId,
        action,
        currentQuantity: quantity,
        newQuantity,
      });

      await axios({
        method: "PUT",
        url: "cart/update/",
        data: {
          productId,
          action,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      /*
       * Only update UI after backend succeeds.
       */
      setQuantity(newQuantity);

      showToast(
        "success",
        "Item updated"
      );
    } catch (error: any) {
      console.error(
        "Cart update error:",
        error
      );

      const errorMessage =
        error?.response?.data?.message;

      const errorStatus =
        error?.response?.status;

      /*
       * Handle expired session.
       */
      if (
        errorMessage ===
          "Unauthorized access" ||
        errorMessage ===
          "Unauthorized" ||
        errorStatus === 401
      ) {
        Swal.fire({
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(() => {
          localStorage.clear();
          window.location.replace(
            "/auth/login"
          );
        });

        return;
      }

      /*
       * Handle other errors.
       */
      Swal.fire({
        title: "Unable to update basket",
        text:
          errorMessage ||
          "Something went wrong while updating your basket. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setUpdating(false);
    }
  };

  /*
   * Safely get product image.
   */
  const productImage =
    product?.images?.[0] ||
    "https://res.cloudinary.com/wise-solution-inc/image/upload/v1729911544/fulllogo_full_green_1_gg1urs.png";

  /*
   * Safely get product name.
   */
  const productName =
    product?.name ||
    "Unnamed Product";

  /*
   * Safely get product price.
   *
   * Convert it to Number because API values
   * may sometimes arrive as strings.
   */
  const price = Number(
    item?.price ?? product?.price ?? 0
  );

  /*
   * Calculate item total safely.
   */
  const itemTotal =
    (Number.isFinite(price) ? price : 0) *
    (Number.isFinite(quantity) ? quantity : 1);

  return (
    <div className="flex items-center justify-between border-b py-4">
      {/* Left Section */}
      <div className="flex items-center min-w-0">
        {/* Product Image */}
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-md mr-4 flex items-center justify-center relative overflow-hidden flex-shrink-0">
          <Image
            src={productImage}
            fill
            alt={productName}
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between py-1 min-w-0">
          <div>
            {/* Product Name */}
            <h3 className="font-semibold text-gray-800 text-base line-clamp-1">
              {productName}
            </h3>

            {/* Size & Color Tags */}
            <div className="flex items-center gap-2 mt-1 mb-2 text-xs text-gray-500 flex-wrap">
              {selectedSize && (
                <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                  Size:{" "}
                  <strong className="text-gray-700">
                    {typeof selectedSize === "string"
                      ? selectedSize
                      : String(selectedSize)}
                  </strong>
                </span>
              )}

              {selectedColor && (
                <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
                  Color:{" "}
                  <strong className="text-gray-700">
                    {renderColor()}
                  </strong>
                </span>
              )}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center rounded-full">
            {/* Minus Button */}
            <button
              type="button"
              onClick={() =>
                updateCart("minus")
              }
              className="py-1 text-gray-600 focus:outline-none"
              disabled={
                quantity <= 1 ||
                updating
              }
            >
              <span
                className={`px-2 py-[1px] border bg-[#EAF2FF] text-[#006838] rounded-full text-sm font-bold ${
                  quantity <= 1 ||
                  updating
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                -
              </span>
            </button>

            {/* Quantity */}
            <span className="px-3 text-sm font-medium">
              {quantity}
            </span>

            {/* Plus Button */}
            <button
              type="button"
              onClick={() =>
                updateCart("plus")
              }
              className="py-1 text-gray-600 focus:outline-none"
              disabled={updating}
            >
              <span
                className={`px-2 py-[2px] border bg-[#EAF2FF] text-[#006838] rounded-full text-sm font-bold ${
                  updating
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                +
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="flex items-center space-x-4 ml-3 flex-shrink-0">
        <span className="font-extrabold text-gray-900">
          ₦{" "}
          {itemTotal.toLocaleString(
            "en-NG"
          )}
        </span>
      </div>
    </div>
  );
};

export default BagItem;