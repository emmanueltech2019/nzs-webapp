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
//         {/* <Link href={`./product/${link}`}>
//           <button className="text-[#006838]">See more</button>
//         </Link> */}
//       </div>

//       {/* Horizontal Scrollable Container */}
//       {/* <div className="flex space-x-4 mt-4 overflow-x-auto scrollbar-hide"> */}
//       <div className="flex space-x-4 mt-4 overflow-x-auto scrollbar-hide">
//         <div className="flex-shrink-0 flex">
//           {/* Container for Product Cards, showing 3 cards at a time */}
//           <div className="flex space-x-4" style={{ minWidth: 'calc(60vw - 72px)', width: '10px' }}>
//             {products.map((product, index) => (
//               <div className="md:w-[26%] flex-shrink-0" key={index}>
//                 <Link href={`./product?id=${product._id}`}>
//                 <Card  title={product.name}   price={(Number(product?.price) || 0) * (Number(product?.quantityInfo?.quantity) || 0)} image={product?.images[0]}/>
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
//             <Link href={`../product?id=${product._id}`}>
//             <Card  title={product.name} price={product.price * product.quantityInfo.quantity} image={product?.images[0]}/>
//           </Link>
//           </div>
//         ))}
//     </div>
//   )
// }
import { FC } from 'react';
import Card from '../cards/ProductCard';
// import productMockup from "../../assets/images/productMockup.png" // Unused in snippet
import { ProductT } from '@/types/Product.types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ProductGrid: FC<{ title: string; products: ProductT[]; link: string }> = ({ title, products, link }) => {
  const pathname = usePathname();
  
  return (
    <div className="md:px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold pl-2">{title}</h2>
        {/* Uncomment if you need the 'See more' button back
        <Link href={`./product/${link}`}>
          <button className="text-[#006838]">See more</button>
        </Link> */}
      </div>

      {/* CHANGED:
        1. Removed 'overflow-x-auto', 'flex', 'space-x-4'
        2. Added 'grid' layout
        3. 'lg:grid-cols-4' ensures 4 items per row on large screens
        4. 'grid-cols-2' ensures mobile users see 2 per row (instead of 1 squashed one)
      */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products.map((product, index) => (
          <div key={index} className="w-full">
            <Link href={`./product?id=${product._id}`}>
              <Card 
                title={product.name}   
                price={(Number(product?.price) || 0) * (Number(product?.quantityInfo?.quantity) || 0)} 
                image={product?.images[0]}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

// Updated this one as well to match the 4-column requirement on large screens
export const ProductsPageGrid: FC<{products: ProductT[]}> = ({ products }) => {
  console.log("products in grid", products);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div key={index}>
            <Link href={`../product?id=${product._id}`}>
              <Card 
                title={product.name} 
                price={product.price * product.quantityInfo.quantity} 
                image={product?.images[0]}
              />
            </Link>
          </div>
        ))}
    </div>
  )
}