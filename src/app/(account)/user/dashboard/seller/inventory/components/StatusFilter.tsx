'use client'
import React, { FC, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

interface StatusFilterProps {
  activeSelection: string;
  setActiveSelection: (value: string) => void;
}

const StatusFilter: FC<StatusFilterProps> = ({ activeSelection, setActiveSelection }) => {
  const [dropdown, setDropdown] = useState(false)
  const statusOptions = ['Pending', 'Processing', 'Completed', 'Cancelled']

  return (
    <div className="mt-6">
      <div
        onClick={() => setDropdown(!dropdown)}
        className="flex justify-between items-center bg-gray-200 px-4 py-2 rounded cursor-pointer"
      >
        <span className="text-sm">{activeSelection || 'Select Status'}</span>
        <FaChevronDown className={`transition-transform ${dropdown ? 'rotate-180' : ''}`} />
      </div>
      {dropdown && (
        <div className="mt-2 bg-white rounded shadow border">
          {statusOptions.map((status) => (
            <div
              key={status}
              onClick={() => {
                setActiveSelection(status);
                setDropdown(false);
              }}
              className={`px-4 py-2 hover:bg-green-100 cursor-pointer ${
                activeSelection === status ? 'bg-green-200' : ''
              }`}
            >
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StatusFilter
