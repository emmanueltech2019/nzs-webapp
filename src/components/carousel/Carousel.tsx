// "use client"
// import React, { FC, useCallback, useEffect, useState } from 'react';
// import useEmblaCarousel from 'embla-carousel-react';
// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import Image from 'next/image';
// import banner from "../../assets/images/Banner.png"

// interface CarouselProps {
//   images: string[]; // Array of image URLs
// }

// const CarouselEmbla: FC<CarouselProps> = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handlePrev = () => {
//     const newIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };

//   const handleNext = () => {
//     const newIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };

//   return (
//     <div className="relative w-full h-[300px] overflow-hidden">
//       {/* Image Display */}
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-transform transform ${index === currentIndex ? 'translate-x-0' : 'translate-x-full'} ease-in-out duration-500`}
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
//         Prev
//       </button>
//       <button
//         onClick={handleNext}
//         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#006838] text-white p-2 rounded-full z-10"
//       >
//         Next
//       </button>

//       {/* Dots Navigation */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CarouselEmbla;



"use client";

import React, { FC, useState } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CarouselProps {
  images: string[]; // Array of image URLs as strings
}

const CarouselEmbla: FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Handle the previous image in the carousel
  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Handle the next image in the carousel
  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {/* Display images and transition between them */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform transform ${
            index === currentIndex ? 'translate-x-0' : 'translate-x-full'
          } ease-in-out duration-500`}
        >
          {index === currentIndex && (
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#006838] text-white p-2 rounded-full z-10"
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#006838] text-white p-2 rounded-full z-10"
      >
        <FiChevronRight size={20} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselEmbla;
