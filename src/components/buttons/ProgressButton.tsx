import React from 'react';

interface ProgressBarProps {
  progress: number; // percentage value (0-100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const circumference = 100 * Math.PI; // For a circle with a radius of 50 (arbitrary)
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      {/* Background Circle */}
      <svg className="w-24 h-24">
        <circle
          cx="50%"
          cy="50%"
          r="48"
          stroke="#e5e7eb" /* light grey background */
          strokeWidth="4"
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx="50%"
          cy="50%"
          r="48"
          stroke="#047857" /* green color */
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>

      {/* Arrow Inside */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="#047857" /* same green */
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default ProgressBar;
