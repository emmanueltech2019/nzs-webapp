// import { FC } from 'react';
// import Card from '../cards/ProductCard';

// const products = [
//   { title: 'Amazing T-shirt', price: '₦ 12.00' },
//   { title: 'Fabulous Pants', price: '₦ 15.00' },
//   { title: 'Amazing T-shirt', price: '₦ 12.00' },
// ];

// const ProductGrid: FC<{ title: string }> = ({ title }) => {
//   return (
//     <div className="px-4 py-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold">{title}</h2>
//         <button className="text-[#006838]">See more</button>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//         {products.map((product, index) => (
//           <Card key={index} title={product.title} price={product.price} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductGrid;


import { FC } from 'react';
import Card from '../cards/ProductCard';

const products = [
  { title: 'Amazing T-shirt', price: '₦ 12.00' },
  { title: 'Fabulous Pants', price: '₦ 15.00' },
  { title: 'Amazing T-shirt', price: '₦ 12.00' },
  { title: 'Spectacular Shirt', price: '₦ 14.00' },
  { title: 'Fantastic Shoes', price: '₦ 13.00' },
  { title: 'Wonderful Shoes', price: '₦ 15.00' },
  { title: 'Amazing T-shirt', price: '₦ 12.00' },
  { title: 'Fabulous Pants', price: '₦ 15.00' },
  { title: 'Amazing T-shirt', price: '₦ 12.00' },
  { title: 'Spectacular Shirt', price: '₦ 14.00' },
  { title: 'Fantastic Shoes', price: '₦ 13.00' },
  { title: 'Wonderful Shoes', price: '₦ 15.00' },
];

const ProductGrid: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="text-[#006838]">See more</button>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="flex space-x-4 mt-4 overflow-x-auto scrollbar-hide">
        <div className="flex-shrink-0 flex">
          {/* Container for Product Cards, showing 3 cards at a time */}
          <div className="flex space-x-4" style={{ minWidth: 'calc(60vw - 72px)', width: '10px' }}>
            {products.map((product, index) => (
              <div className="md:w-[26%] flex-shrink-0" key={index}>
                <Card  title={product.title} price={product.price} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
