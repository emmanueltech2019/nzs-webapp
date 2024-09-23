"use client"
import CarouselEmbla from '@/components/carousel/Carousel';
import Link from 'next/link';
import { FC, useState } from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
const ProductScreen: FC = () => {
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('green');

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['black', 'gray', 'darkGray', 'lightGray', 'white'];

  return (
    <div className="relative p-4  mx-auto bg-white rounded-lg ">
      {/* Close button */}
      {/* <button className="top-4 left-4 text-2xl z-10 text-[60px]">&times;</button> */}
      <button className=" text-3xl z-10  py-1 text-gray-500 my-1 ">
        <ArrowBackOutlinedIcon/>
      </button>


      {/* Product Image/Carousel */}
      <CarouselEmbla/>


      {/* Product Info */}
      <div className="mt-4">
        <span className="inline-block py-2 px-4 bg-[#EAF2FF] text-black rounded-lg mb-4 mt-2">Outgoing</span>
        <h2 className="text-2xl font-bold">Amazing T-Shirt</h2>
        <p className="text-xl text-gray-700">₦ 12.00</p>
        <p className="mt-2 text-gray-500">
          The perfect T-shirt for when you want to feel comfortable but still stylish. Amazing for all occasions. Made
          of 100% cotton fabric in four colors. Its modern style gives a lighter look to the outfit. Perfect for the
          warmest days.
        </p>
      </div>

      {/* Size Selector */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Size</h3>
        <div className="flex space-x-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-4 py-2 rounded-full border ${selectedSize === size ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selector */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Color</h3>
        <div className="flex space-x-2">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'border-green-600' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            ></button>
          ))}
        </div>
      </div>

      {/* Add to Bag Button */}
      <Link href={"./cart"}>

      <button className="mt-6 w-full py-3 bg-[#006838] text-white text-lg rounded-lg flex items-center justify-center">
        + Add to Bag
      </button>
      </Link>
    </div>
  );
};

export default ProductScreen;
