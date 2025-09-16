import { FC } from 'react';
import Card from '../cards/ProductCard';
import productMockup from "../../assets/images/productMockup.png"
import { ProductT } from '@/types/Product.types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ProductGrid: FC<{ title: string; products: ProductT[]; link: string }> = ({ title, products, link }) => {
  const pathname = usePathname();
  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link href={`./dashboard/${link}`}>
          <button className="text-[#006838]">See more</button>
        </Link>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="flex space-x-4 mt-4 overflow-x-auto scrollbar-hide">
        <div className="flex-shrink-0 flex">
          {/* Container for Product Cards, showing 3 cards at a time */}
          <div className="flex space-x-4" style={{ minWidth: 'calc(60vw - 72px)', width: '10px' }}>
            {products.map((product, index) => (
              <div className="md:w-[26%] flex-shrink-0" key={index}>
                <Link href={`./dashboard/Product?id=${product._id}`}>
                <Card  title={product.name}   price={(Number(product?.price) || 0) * (Number(product?.quantityInfo?.quantity) || 0)} image={product?.images[0]}/>
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

export const ProductsPageGrid: FC<{products: ProductT[]}> = ({ products }) => {
  console.log("products in grid", products);
  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
        {products.map((product, index) => (
          <div key={index}>
            <Link href={`../dashboard/Product?id=${product._id}`}>
            <Card  title={product.name} price={product.price * product.quantityInfo.quantity} image={product?.images[0]}/>
          </Link>
          </div>
        ))}
    </div>
  )
}
