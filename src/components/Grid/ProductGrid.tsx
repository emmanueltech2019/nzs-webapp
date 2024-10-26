import { FC } from 'react';
import Card from '../cards/ProductCard';
import productMockup from "../../assets/images/productMockup.png"
import { ProductT } from '@/types/Product.types';
import Link from 'next/link';

const ProductGrid: FC<{ title: string; products: ProductT[] }> = ({ title, products }) => {
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
                <Link href={`./dashboard/Product?id=${product._id}`}>
                <Card  title={product.name} price={product.price} image={product?.images[0]}/>
              </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
