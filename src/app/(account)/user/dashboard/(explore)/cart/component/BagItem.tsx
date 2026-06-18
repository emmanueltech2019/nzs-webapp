import React, { FC } from "react";
import { Icon } from "@iconify/react";
import { CartItemT } from "@/types/Product.types";
import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";
import Image from "next/image";
import Swal from "sweetalert2";

interface BagProps {
  item: CartItemT;
  quantity: number;
  setQuantity: (newQuantity: number) => void;
}

const BagItem: FC<BagProps> = ({ item }) => {
  const updateCart = (id: string, action: string) => {
    axios({
      method: "PUT",
      url: "cart/update/",
      data: { productId: id, action },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then(() => {
        showToast("success", "Item updated");
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthorized access") {
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
        console.error(error);
      });
  };
const selectedSize = item.size || item.productId?.size;
  const selectedColor = item.color || item.productId?.color;
  return (
   <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center">
        {/* Product Image */}
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-md mr-4 flex items-center justify-center relative overflow-hidden">
          <Image
            src={
              item.productId?.images?.[0] ||
              "https://res.cloudinary.com/wise-solution-inc/image/upload/v1729911544/fulllogo_full_green_1_gg1urs.png"
            }
            width={100}
            height={100}
            alt={item.productId?.name || "Product image"}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between py-1">
          <div>
            <h3 className="font-semibold text-gray-800 text-base line-clamp-1">
              {item.productId?.name || "Unnamed Product"}
            </h3>
            
            {/* Size & Color Tags */}
            <div className="flex items-center gap-2 mt-1 mb-2 text-xs text-gray-500">
              {selectedSize && (
                <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                  Size: <strong className="text-gray-700">{selectedSize}</strong>
                </span>
              )}
              {selectedColor && (
                <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
                  Color: <strong className="text-gray-700">{selectedColor}</strong>
                </span>
              )}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center rounded-full">
            <button
              onClick={() => updateCart(item.productId._id, "minus")}
              className="py-1 text-gray-600 focus:outline-none"
            >
              <span className="px-2 py-[1px] border bg-[#EAF2FF] text-[#006838] rounded-full text-sm font-bold">
                -
              </span>
            </button>
            <span className="px-3 text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateCart(item.productId._id, "plus")}
              className="py-1 text-gray-600 focus:outline-none"
            >
              <span className="px-2 py-[2px] border bg-[#EAF2FF] text-[#006838] rounded-full text-sm font-bold">
                +
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="flex items-center space-x-4">
        <span className="font-extrabold text-gray-900">₦ {item.price?.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default BagItem;
