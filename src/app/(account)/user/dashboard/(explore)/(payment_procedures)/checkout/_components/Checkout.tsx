"use client";
import TagHeader from "@/components/header/TagHeader";
import { useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';
import Link from "next/link";
const CheckoutShipping: React.FC = () => {
  const [selectedShipping, setSelectedShipping] = useState("Standard");
  const [address, setAddress] = useState("+2349000011112"); // Saved Address
  const [shippingMethod, setShippingMethod] = useState("third-party");

  return (
    <div className="p-6 md:w-[56vw] md:mx-20 lg:mx-0 xl:mx-20">
      <TagHeader title="Checkout" />
      {/* Checkout Steps */}
      <div className="flex justify-around mb-8 mx-auto xl:ml-20 ">
        <div className="flex flex-col items-center text-center justify-center mr-auto">
          <div className="w-8 h-8 rounded-full text-[#006838] bg-[#C4EDDA] flex items-center justify-center">
            <CheckOutlinedIcon />
          </div>
          <p className="text-sm font-bold py-2">Your bag</p>
        </div>


        <div className="flex flex-col items-center justify-center mr-auto">
          <div className="w-8 h-8 rounded-full bg-[#006838] flex items-center justify-center text-white">
            2
          </div>
          <p className="text-sm font-bold py-2">Shipping</p>
        </div>
        <div className="flex flex-col items-center text-gray-400 mr-auto">
          <div className="w-8 h-8 rounded-full bg-[#F8F9FE] flex items-center justify-center">
            3
          </div>
          <p className="text-sm font-bold py-2">Payment</p>
        </div>
        <div className="flex flex-col items-center text-gray-400 mr-auto">
          <div className="w-8 h-8 rounded-full bg-[#F8F9FE] flex items-center justify-center">
            4
          </div>
          <p className="text-sm font-bold py-2">Review</p>
        </div>
      </div>

      {/* Address Section */}
      <div className="mb-4 border border-gray-300 rounded-lg p-4">
        <div className="bg-[#EAF2FF] p-5 rounded-lg">
            <div className="flex justify-between">
              <div className="flex item-center space-x-3">
                <div className=" my-auto text-gray-400">
                <MyLocationOutlinedIcon/>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Saved Address</h3>
                  <p className="text-gray-500">{address}</p>
                </div>
                </div>
            <div className="text-[#006838] my-auto">
            <CheckOutlinedIcon />
            </div>
           
          </div>
        </div>
        <div className="flex justify-center item-center">
          <button className="text-[#006838] mt-2">+ Add Address</button>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4">Third-Party Shipping</h3>
        <div
          className={`p-4 mb-2 rounded-lg border ${
            selectedShipping === "Standard"
              ? "border bg-blue-50"
              : "border-gray-300"
          }`}
          onClick={() => setSelectedShipping("Standard")}
        >
          <div className="flex justify-between items-center">
            <p>Standard Pickup</p>
            <p>N 5.00 Max.</p>
          </div>
          <p className="text-gray-500 text-sm">5 - 8 days</p>
        </div>
        <div
          className={`p-4 rounded-lg border ${
            selectedShipping === "Express"
              ? "border bg-blue-50"
              : "border-gray-300"
          }`}
          onClick={() => setSelectedShipping("Express")}
        >
          <div className="flex justify-between items-center">
            <p>Express</p>
            <p>N 20.00 Max.</p>
          </div>
          <p className="text-gray-500 text-sm">1 - 2 days</p>
        </div>
        <div className="flex justify-center item-center">
          <button className="text-[#006838] mt-4 ">
            + Get Priority Shipping
          </button>
        </div>
      </div>

      {/* Private Shipping */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Private Shipping</h3>
        <div
          className={`p-4 rounded-lg border ${
            shippingMethod === "private"
              ? "border-green-600 bg-blue-50"
              : "border-gray-300"
          }`}
          onClick={() => setShippingMethod("private")}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="shipping"
              checked={shippingMethod === "private"}
              className="mr-2"
            />
            <p>Private Shipping</p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <Link href={"./shipping-options"}>
        <button className="w-full bg-[#006838] text-white py-3 rounded-lg">
          Continue
        </button>
      </Link>
    </div>
  );
};

export default CheckoutShipping;