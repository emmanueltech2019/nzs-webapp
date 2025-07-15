'use client'
import React, { FC, useState } from 'react'

interface PriceFilterProps {
  activeSelection?: string;
  setActiveSelection?: (value: string) => void;
}

const PriceFilter: FC<PriceFilterProps> = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  return (
    <div className="mt-6 space-y-4">
      <div>
        <label className="block mb-1 text-sm text-gray-600">Min Price (₦)</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm text-gray-600">Max Price (₦)</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
      </div>
    </div>
  )
}

export default PriceFilter
