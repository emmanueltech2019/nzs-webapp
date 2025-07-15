'use client'
import React, { FC, useState } from 'react'

interface FacilitiesFilterProps {
  activeSelection: string;
  setActiveSelection: (value: string) => void;
}

const FacilitiesFilter: FC<FacilitiesFilterProps> = ({ activeSelection, setActiveSelection }) => {
  const facilities = ['Library', 'Lab', 'Wi-Fi', 'Clinic', 'Playground']

  return (
    <div className="mt-6">
      <label className="block mb-2 text-sm text-gray-600">Select Facility</label>
      <select
        value={activeSelection}
        onChange={(e) => setActiveSelection(e.target.value)}
        className="px-4 py-2 border rounded w-full"
      >
        <option value="">-- Select Facility --</option>
        {facilities.map((fac) => (
          <option key={fac} value={fac}>
            {fac}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FacilitiesFilter
