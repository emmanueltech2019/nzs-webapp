import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Optional default styling

const MyCustomCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [view, setView] = useState<'month' | 'year'>('month');

  const handleViewChange = (newView: 'month' | 'year') => {
    setView(newView);
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Custom Toggle for Month and Year */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => handleViewChange('year')}
          className={`px-4 py-2 ${view === 'year' ? 'font-bold' : 'text-gray-400'}`}
        >
          Year
        </button>
        <button
          onClick={() => handleViewChange('month')}
          className={`px-4 py-2 ${view === 'month' ? 'font-bold' : 'text-gray-400'}`}
        >
          Month
        </button>
      </div>

      <Calendar
        onChange={setValue}
        value={value}
        view={view}
        onViewChange={({ activeStartDate, view }) => setView(view as 'month' | 'year')}
        tileClassName={({ date }) => {
          const today = new Date();
          const highlightStart = new Date(2024, 8, 14); // Start date for range
          const highlightEnd = new Date(2024, 8, 30); // End date for range

          if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          ) {
            return 'bg-green-700 text-white'; // Current day styling
          }

          if (date >= highlightStart && date <= highlightEnd) {
            return 'bg-green-100 text-green-700'; // Date range styling
          }

          if (date.getDay() === 0 || date.getDay() === 6) {
            return 'text-red-500'; // Weekends
          }

          return '';
        }}
      />
    </div>
  );
};

export default MyCustomCalendar;
