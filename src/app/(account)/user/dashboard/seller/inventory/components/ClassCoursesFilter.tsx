'use client'
import React, { FC, useState } from 'react'

interface ClassCoursesFilterProps {
  activeSelection: string;
  setActiveSelection: (value: string) => void;
}

const ClassCoursesFilter: FC<ClassCoursesFilterProps> = ({ activeSelection, setActiveSelection }) => {
  const classes = ['Mathematics', 'Biology', 'History', 'Economics', 'English']

  return (
    <div className="mt-6">
      <label className="block mb-2 text-sm text-gray-600">Select Course</label>
      <select
        value={activeSelection}
        onChange={(e) => setActiveSelection(e.target.value)}
        className="px-4 py-2 border rounded w-full"
      >
        <option value="">-- Select Course --</option>
        {classes.map((cls) => (
          <option key={cls} value={cls}>
            {cls}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ClassCoursesFilter
