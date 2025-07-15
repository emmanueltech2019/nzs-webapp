'use client'
import React, { FC, useState } from 'react'

interface LocationFilterProps {
  activeSelection: string;
  setActiveSelection: (value: string) => void;
}

const LocationFilter: FC<LocationFilterProps> = ({ activeSelection, setActiveSelection }) => {
  const locations = ['Lagos', 'Abuja', 'Port Harcourt', 'Enugu', 'Kano']

  return (
    <div className="mt-6">
      <label className="block mb-2 text-sm text-gray-600">Choose Location</label>
      <select
        value={activeSelection}
        onChange={(e) => setActiveSelection(e.target.value)}
        className="px-4 py-2 border rounded w-full"
      >
        <option value="">-- Select Location --</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LocationFilter
