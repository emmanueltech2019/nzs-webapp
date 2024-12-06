"use client"
import TagHeader from '@/components/header/TagHeader';
import SortFilter from '@/components/SortFilter/SortFilter';
import Link from 'next/link';
import { useState } from 'react';

interface ShippingOption {
  id: number;
  name: string;
  rating: number;
  price: number;
}

const ShippingOptions: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Shipping options data
  const shippingOptions: ShippingOption[] = [
    { id: 1, name: 'GIG Logistics', rating: 4.8, price: 5.0 },
    { id: 2, name: 'FedEx Corp', rating: 5.0, price: 12.0 },
    { id: 3, name: 'UPS', rating: 4.8, price: 12.0 },
    { id: 4, name: 'Konga', rating: 4.7, price: 12.0 },
    { id: 5, name: 'DHL', rating: 4.8, price: 12.0 },
    { id: 6, name: 'ARAMEX', rating: 4.9, price: 12.0 },
  ];

  // Function to handle selection
  const handleSelect = (optionId: number): void => {
    setSelectedOption(optionId);
  };

  // Calculate total price based on selected option
  const totalPrice = selectedOption
    ? shippingOptions.find((option) => option.id === selectedOption)?.price ?? 0
    : 0;

  return (
    <div className="p-4">
        <TagHeader title='Shipping Options'/>
      {/* Filter & Sort Options */}
      <SortFilter/>

      {/* Shipping Options */}
      <ul className="space-y-4 h-[57vh] overflow-y-scroll scrollbar-hide pt-10">
        {shippingOptions.map((option) => (
          <li
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`flex justify-between items-center p-4 rounded-lg cursor-pointer ${
              selectedOption === option.id ? 'bg-blue-100' : 'bg-white'
            } border ${selectedOption === option.id ? 'border-blue-500' : 'border-gray-200'}`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                {/* Placeholder for avatar/icon */}
                <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3-8a3 3 0 106 0 3 3 0 00-6 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold">{option.name}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <span className="text-[#006838]">&#9733;</span> {option.rating}
                </p>
              </div>
            </div>
            <p className="font-semibold">₦ {option.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>

      {/* Total Price */}
      <div className="flex justify-between items-center py-4 mt-4 border-t border-gray-300 font-semibold">
        <span>Total</span>
        <span>₦ {totalPrice.toFixed(2)}</span>
      </div>

      {/* Proceed to Payment Button */}
      <Link href={"./payment-methods"}>
        <button
          className="w-full bg-[#006838] text-white py-3 rounded-full text-center font-semibold mt-4"
        >
          Proceed to Payment
        </button>
      </Link>
    </div>
  );
};

export default ShippingOptions;
