
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
      </div>


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