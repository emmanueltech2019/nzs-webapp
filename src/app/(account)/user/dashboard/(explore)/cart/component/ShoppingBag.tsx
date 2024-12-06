"use client"
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import BagItem from './BagItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TagHeader from '@/components/header/TagHeader';
import axios from "@/utils/axios";
import { CartItemT, CartT } from '@/types/Product.types';
import { showToast } from '@/utils/alert';



const ShoppingBag = () => {
  const [quantities, setQuantities] = useState([1, 1, 1, 1]);
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartT | null>(null);  // The state should match the CartT interface
  const [total, setTotal] = useState(0)
  const checkOut = () =>{
    axios({
      method: "POST",
      url: "products/checkout",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        showToast('success', "Order placed successfully")
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    // const userToken = localStorage.getItem("userToken") || "";
    // const tr = JSON.parse(userToken);
    
    axios({
      method: "GET",
      url: "cart",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log(res.data.cart);
        setTotal(res.data.total)
        setCartItems(res.data.cart); 
      })
      .catch((error) => {
        console.log(error);
      });
    
  }, [cartItems]); 
  



  const handleSetQuantity = (index:number, value:number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  // const total = items.reduce((acc, item, index) => acc + item.price * quantities[index], 0);

  const handleGoBack = () => {
    router.back(); // Navigate back to the previous page
  };
  
  return (
    <div className="w-screen md:mx-1 bg-white md:p-4 pr-6 pl-2 fixed md:w-[53vw]">
      {/* Header */}
      <TagHeader title='Your bag'/>


      {/* Bag Items */}
    <div className='overflow-y-scroll h-[70vh]'>
    {cartItems?.items.map((item:CartItemT, index) => (
          <BagItem
            key={item._id} // Unique key from item._id
            item={item}
            quantity={quantities[index]}
            setQuantity={(value: number) => handleSetQuantity(index, value)}
          />
        ))}

    </div>

      {/* Total */}
      <div className="flex justify-between items-center py-4 font-extrabold">
        <span>Total</span>
        <div>₦ {total.toFixed(2)}</div>
      </div>

      {/* Checkout Button */}
      <Link href='./checkout' className="block w-full bg-[#006838] text-white py-3 rounded-full text-center font-semibold">
        Checkout
      </Link>
    </div>
  );
};

export default ShoppingBag;
