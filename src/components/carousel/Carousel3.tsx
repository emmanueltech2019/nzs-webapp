
// "use client";

// import React, { FC, useState } from 'react';
// import Image from 'next/image';
// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// interface CarouselProps {
//   images: string[]; // Array of image URLs as strings
// }

// const CarouselEmbla: FC<CarouselProps> = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState<number>(0);

//   // Handle the previous image in the carousel
//   const handlePrev = () => {
//     const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };

//   // Handle the next image in the carousel
//   const handleNext = () => {
//     const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };

//   return (
//     <div className="relative w-full md:h-[400px] h-[150px] overflow-hidden">
//       {/* Display images and transition between them */}
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-transform transform ${
//             index === currentIndex ? 'translate-x-0' : 'translate-x-full'
//           } ease-in-out duration-500`}
//         >
//           {index === currentIndex && (
//             <Image
//               src={image}
//               alt={`Image ${index + 1}`}
//               layout="fill"
//               objectFit="cover"
//             />
//           )}
//         </div>
//       ))}

//       {/* Navigation Buttons */}
//       <button
//         onClick={handlePrev}
//         className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#006838] text-white p-2 rounded-full z-10"
//       >
//         <FiChevronLeft size={20} />
//       </button>
//       <button
//         onClick={handleNext}
//         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#006838] text-white p-2 rounded-full z-10"
//       >
//         <FiChevronRight size={20} />
//       </button>

//       {/* Dots Navigation */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-2 h-2 rounded-full ${
//               index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CarouselEmbla;
"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CarouselProps {
  images: string[];
}

const CarouselEmbla: FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full h-[45vh] md:h-[70vh] overflow-hidden bg-[#006838] rounded-xl">

      {/* Slides */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentIndex
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10"
          }`}
        >
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            fill
            className="object-contain p-2"  // ensures FULL image always shows
            sizes="100vw"
          />
        </div>
      ))}

      {/* Left Button */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#006838] text-white p-2 rounded-full z-20"
      >
        <FiChevronLeft size={20} />
      </button>

      {/* Right Button */}
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#006838] text-white p-2 rounded-full z-20"
      >
        <FiChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselEmbla;
