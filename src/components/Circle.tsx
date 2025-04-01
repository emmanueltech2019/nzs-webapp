import { FC } from 'react'

type CircleProgressProps = {
  count: 1 | 2 | 3 | 4 // Current stage (1-4)
  size?: number
  strokeWidth?: number
  children?: React.ReactNode
}

const Circle: FC<CircleProgressProps> = ({
  count = 1,
  size = 55,
  strokeWidth = 3,
  children
}) => {
  // Calculate progress (25% per stage)
  const progress = count * 25 // 25, 50, 75, 100
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform rotate-90" // Rotates start point to bottom-left
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EAF2FF" // Light gray background
          strokeWidth={strokeWidth}
        />
        
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#006838" // Green progress
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute flex items-center justify-center text-center">
        {children || (
          <span className="font-bold text-[--foreground-green]">
            {progress}%
          </span>
        )}
      </div>
    </div>
  )
}

export default Circle