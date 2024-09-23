"use client"
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import BagItem from './BagItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const ShoppingBag = () => {
  const [quantities, setQuantities] = useState([1, 1, 1, 1]);
  const router = useRouter();

  const items = [
    { title: 'Amazing T-shirt', color: 'Black', size: 'M', price: 12.00 },
    { title: 'Fabulous Pants', color: 'Blue', size: '42', price: 15.00 },
    { title: 'Spectacular Dress', color: 'Gold', size: 'L', price: 20.00 },
    { title: 'Stunning Jacket', color: 'Blue', size: 'M', price: 18.00 },
  ];

  const handleSetQuantity = (index:number, value:number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const total = items.reduce((acc, item, index) => acc + item.price * quantities[index], 0);

  const handleGoBack = () => {
    router.back(); // Navigate back to the previous page
  };
  
  return (
    <div className="w-screen md:mx-1 bg-white md:p-4 pr-6 pl-2 fixed md:w-[60vw]">
      {/* Header */}
      <div className="flex items-center justify-between py-7">
        
        <button onClick={handleGoBack}>
          <Icon icon="mdi:arrow-left" className="text-2xl text-gray-600" />
        </button>
        <h2 className="font-semibold text-lg">Your bag</h2>
        <div></div> {/* Empty div to balance the header */}
      </div>

      {/* Bag Items */}
    <div className='overflow-y-scroll h-[70vh]'>
      {items.map((item, index) => (
        <BagItem
          key={index} 
          item={item} 
          quantity={quantities[index]} 
          setQuantity={(value:number) => handleSetQuantity(index, value)} 
        />
      ))}

    </div>

      {/* Total */}
      <div className="flex justify-between items-center py-4 font-extrabold">
        <span>Total</span>
        <span>₦ {total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-[#006838] text-white py-3 rounded-full text-center font-semibold">
        Checkout
      </button>
    </div>
  );
};

export default ShoppingBag;
