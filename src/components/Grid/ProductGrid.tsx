// import { FC } from 'react';
// import Card from '../cards/ProductCard';
// import productMockup from "../../assets/images/productMockup.png"
// import { ProductT } from '@/types/Product.types';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const ProductGrid: FC<{ title: string; products: ProductT[]; link: string }> = ({ title, products, link }) => {
//   const pathname = usePathname();
//   return (
//     <div className="px-4 py-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold">{title}</h2>
//         <Link href={`./dashboard/${link}`}>
//           <button className="text-[#006838]">See more</button>
//         </Link>
//       </div>

//       {/* Horizontal Scrollable Container */}
//       <div className="flex space-x-4 mt-4 overflow-x-auto scrollbar-hide">
//         <div className="flex-shrink-0 flex">
//           {/* Container for Product Cards, showing 3 cards at a time */}
//           <div className="flex space-x-4" style={{ minWidth: 'calc(60vw - 72px)', width: '10px' }}>
//             {products.map((product, index) => (
//               <div className="md:w-[26%] flex-shrink-0" key={index}>
//                 <Link href={`./dashboard/Product?id=${product._id}`}>
//                 <Card  title={product.name}   price={(Number(product?.price) || 0) * (Number(product?.quantityInfo?.quantity) || 0)} image={product?.images[0]} totalStock={product.totalStock}/>
//               </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductGrid;

// export const ProductsPageGrid: FC<{products: ProductT[]}> = ({ products }) => {
//   console.log("products in grid", products);
//   return (
//     <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
//         {products.map((product, index) => (
//           <div key={index}>
//             <Link href={`../dashboard/Product?id=${product._id}`}>
//             <Card  title={product.name} price={product.price * product?.quantityInfo?.quantity} image={product?.images[0]} totalStock={product.totalStock}/>
//           </Link>
//           </div>
//         ))}
//     </div>
//   )
// }

"use client";

import { FC, useRef } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Card from '../cards/ProductCard';
import productMockup from "@/assets/images/productMockup.png";
import { ProductT } from '@/types/Product.types';

interface ProductGridProps {
  title: string;
  products: ProductT[];
  link: string;
}

// Helper for safe price computation
const calculatePrice = (product: ProductT) => {
  const basePrice = Number(product?.price) || 0;
  const quantity = Number(product?.quantityInfo?.quantity);
  return quantity && quantity > 0 ? basePrice * quantity : basePrice;
};

export const ProductGrid: FC<ProductGridProps> = ({ title, products, link }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="py-6 px-1">
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        <Link 
          href={`/user/dashboard/${link}`}
          className="text-[#006838] hover:text-green-800 text-sm font-semibold flex items-center gap-1 group transition-colors"
        >
          <span>See more</span>
          <Icon icon="bi:arrow-right" className="text-xs group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid Container with Arrows & Snap Scroll */}
      <div className="relative group/carousel">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center text-gray-700 hover:bg-gray-50 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
        >
          <Icon icon="bi:chevron-left" className="text-base" />
        </button>

        {/* Horizontal Scroll Area */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => {
            const productImage = product?.images?.[0] || productMockup.src;
            const totalPrice = calculatePrice(product);

            return (
              <div
                key={product._id || index}
                className="w-[68vw] sm:w-[42%] md:w-[30%] lg:w-[22%] xl:w-[18%] flex-shrink-0 snap-start"
              >
                <Link 
                  href={`/user/dashboard/Product?id=${product._id}`}
                  className="block h-full transition-transform duration-200 hover:-translate-y-1"
                >
                  <Card
                    title={product.name}
                    price={totalPrice}
                    image={productImage}
                    totalStock={product.totalStock}
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center text-gray-700 hover:bg-gray-50 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
        >
          <Icon icon="bi:chevron-right" className="text-base" />
        </button>
      </div>
    </div>
  );
};

export const ProductsPageGrid: FC<{ products: ProductT[] }> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500 font-medium">
        No products available to display.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {products.map((product, index) => {
        const productImage = product?.images?.[0] || productMockup.src;
        const totalPrice = calculatePrice(product);

        return (
          <div key={product._id || index} className="h-full">
            <Link 
              href={`/user/dashboard/Product?id=${product._id}`}
              className="block h-full transition-transform duration-200 hover:-translate-y-1"
            >
              <Card
                title={product.name}
                price={totalPrice}
                image={productImage}
                totalStock={product.totalStock}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;