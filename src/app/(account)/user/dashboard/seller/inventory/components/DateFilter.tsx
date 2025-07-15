'use client'
import React, { FC, useState } from 'react'

interface DateFilterProps {
  activeSelection?: string;
  setActiveSelection?: (value: string) => void;
}

const DateFilter: FC<DateFilterProps> = () => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <div className="mt-6 flex flex-col">
      <label className="mb-1 text-sm text-gray-500">Select Date</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="px-4 py-2 border rounded bg-white shadow-sm"
      />
    </div>
  )
}

export default DateFilter
