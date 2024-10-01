// import React from 'react';
// import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
// interface ProgressBarProps {
//   progress: number; // percentage value (0-100)
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
//   const rotation = progress * 3.6; // convert percentage to degrees (360° for 100%)
  
//   return (
//     <div className="relative flex items-center justify-center">
//       {/* Background circle */}
//       <div className="w-20 h-20 rounded-full border-4 border-gray-200"></div>

//       {/* Progress semi-circle */}
//       <div
//         className="absolute w-20 h-20 rounded-full border-4 border-[#006838] clip-circle"
//         style={{ transform: `rotate(${rotation}deg)` }}
//       ></div>

//       {/* Arrow */}
//       <div className="absolute w-6 h-6 bg-transparent flex items-center justify-center">
//         <div className=""><EastOutlinedIcon style={{fontSize:"50px", color:"#006838"}}/></div>
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;

import React from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";

interface ProgressBarProps {
  progress: number; // percentage value (0-100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Background circle */}
      <div className="w-20 h-20 rounded-full border-4 border-gray-200"></div>

      {/* Right side of the progress */}
      <div
        className={`absolute w-20 h-20 rounded-full border-4 border-transparent ${
          progress > 50 ? "border-[#006838]" : "border-transparent"
        }`}
        style={{
          clipPath: "inset(0 0 0 50%)", // Right half of the circle
          transform: `rotate(${Math.min(progress, 50) * 3.6}deg)`, // Cap at 50%
        }}
      ></div>

      {/* Left side of the progress */}
      <div
        className={`absolute w-20 h-20 rounded-full border-4 border-[#006838] ${
          progress > 50 ? "border-[#006838]" : "border-transparent"
        }`}
        style={{
          clipPath: "inset(0 50% 0 0)", // Left half of the circle
          transform: `rotate(${Math.max(progress - 50, 0) * 3.6}deg)`, // Rotating the left half for progress > 50%
        }}
      ></div>

      {/* Arrow icon */}
      <div className="absolute flex items-center justify-center">
        <EastOutlinedIcon style={{ fontSize: "50px", color: "#006838" }} />
      </div>
    </div>
  );
};

export default ProgressBar;


