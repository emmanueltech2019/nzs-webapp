"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import BagItem from "./BagItem";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TagHeader from "@/components/header/TagHeader";
import axios from "@/utils/axios";
import { CartItemT, CartT } from "@/types/Product.types";
import { showToast } from "@/utils/alert";
import Swal from "sweetalert2";

const ShoppingBag = () => {
  const [quantities, setQuantities] = useState([1, 1, 1, 1]);
  const router = useRouter();
  const [balance, setBalance] = useState("");

  const [cartItems, setCartItems] = useState<CartT | null>(null); // The state should match the CartT interface
  const [total, setTotal] = useState(0);
  const checkOut = () => {
    axios({
      method: "POST",
      url: "products/checkout",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        showToast("success", "Order placed successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {

    axios({
      method: "GET",
      url: "cart",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log(res.data.cart);
        setTotal(res.data.total);
        setCartItems(res.data.cart);
        const token = localStorage.getItem("userToken");
        if (!token) return;

        axios
          .get("/users/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setBalance(res.data.wallet.balance);
          })
          .catch(console.error);
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
        console.log(error);
      });
  }, [cartItems]);

  const handleSetQuantity = (index: number, value: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  return (
    <div className="w-screen md:mx-1 bg-white md:p-4 pr-6 pl-2   md:w-[53vw]">
      {/* Header */}
      <TagHeader title=" Basket" rightData={`₦ ${balance}`} />

      {/* Bag Items */}
      <div className="overflow-y-scroll h-[60vh]">
        {cartItems?.items && cartItems.items.length > 0
          ? cartItems.items.map((item: CartItemT, index) => (
              <BagItem
                key={item._id} // Unique key from item._id
                item={item}
                quantity={quantities[index]}
                setQuantity={(value: number) => handleSetQuantity(index, value)}
              />
            ))
          : <h1 className='text-center'>Your basket is empty.</h1>}
      </div>

      {/* Total */}
      

      {/* Checkout Button */}
      {cartItems?.items && cartItems.items.length > 0 ? (
        <>
        <div className="flex justify-between items-center py-4 font-extrabold">
        <span>Total</span>
        <div>₦ {total.toFixed(2)}</div>
      </div>
        <Link
          href="./checkout"
          className="block w-full bg-[#006838] text-white py-3 rounded-full text-center font-semibold"
        >
          Checkout
        </Link>
        </>
      ) : null}
    </div>
  );
};

export default ShoppingBag;
