import React, { FC, useState } from 'react';
import { Icon } from '@iconify/react';

type ItemType = {
    title: string;
    color: string;
    size: string;
    price: number;
  };
  

interface BagProps {
    item: ItemType;
    quantity: number;
    setQuantity: (newQuantity: number) => void;
}

const BagItem: FC<BagProps> = ({ item, quantity, setQuantity }) => {
  return (
    <div className="flex items-center justify-between border-b py-4">
      {/* Image Placeholder */}
      <div className="flex items-center">
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-md mr-4 flex items-center justify-center">
          <Icon icon="mdi:image-outline" className="text-gray-400 text-2xl" />
        </div>
        {/* Item Details */}
        <div>
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.color} / {item.size}</p>
          {/* Quantity Selector */}
        <div className="flex items-center  rounded-full">
          <button 
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className=" py-1 text-gray-600"
          >
            <span className='px-2 py-[1px] border bg-[#EAF2FF] text-[#006838] rounded-full'>-</span>
          </button>
          <span className="px-3">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className=" py-1 text-gray-600"
          >
          <span className='px-2 py-[2px] border bg-[#EAF2FF] text-[#006838] rounded-full'>+</span>
          </button>
        </div>
        </div>
      </div>

      {/* Quantity and Price */}
      <div className="flex items-center space-x-4">
        
        {/* Price */}
        <span className="font-extrabold">₦ {item.price}</span>
      </div>
    </div>
  );
};


export default BagItem;
