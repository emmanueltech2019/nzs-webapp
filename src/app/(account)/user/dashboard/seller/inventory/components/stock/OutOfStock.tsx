import SellerAccordion from "../Accordion";
import React, { useState } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ProductDetail from './ProductDetails';
type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  productType: string;
  addedDate: string;
  productId: string;
  thresholdQuantity: string;
  thresholdPrice: number;
  totalStock: string;
  stockSold: string;
};

const productsList: Product[] = [
  {
    id: '1',
    name: 'Maggi',
    price: 1800,
    quantity: 43,
    image: 'https://res.cloudinary.com/wise-solution-inc/image/upload/v1731595043/Website_Banner_1500x700_lkb0li.jpg',
    description: 'The perfect T-shirt for when you want to feel at ease but still stylish...',
    productType: 'Maggi',
    addedDate: 'September 30, 2024',
    productId: '30045-HA',
    thresholdQuantity: '0 Cartons',
    thresholdPrice: 1600,
    totalStock: '0 CARTONS',
    stockSold: '3 Sold',
  },
  // Add more products as needed
];
const Incoming = () => {
  const productList = [
    { id: 1, name: "Maggi", price: 1800, quantity: 0 },
    { id: 2, name: "Red Bull", price: 1800, quantity: 0 },
    { id: 3, name: "Bourn Vita", price: 1800, quantity: 0 },
    { id: 4, name: "Horlicks", price: 1800, quantity: 0 },
    { id: 5, name: "Harpic", price: 1800, quantity: 0 },
    { id: 6, name: "Scotch Brite", price: 1800, quantity: 0 },
    { id: 7, name: "Coca Cola", price: 1800, quantity: 0 },
  ];
  const [products, setProducts] = useState(productsList);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  const handleExpandClick = (productId: string) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };
  return (
    <div className="w-full  rounded-xl  space-y-4 pb-40">
      <div className="flex items-center justify-between border-b pb-3 py-3 px-2 ">
        <h2 className="text-lg font-semibold text-gray-800">NEW PRODUCT</h2>
        <span className="bg-blue-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
          {products.length}
        </span>
      </div>

      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-2  bg-[#F8F9FE]">
          <div
            className="flex items-center justify-center m-auto items-center border-b last:border-none pb-1 pt-1 rounded-lg px-3 bg-[#F8F9FE]"
          >
            <button className="text-[#F8F9FE] bg-[#C3CAD9] w-7 h-7 rounded-full text-lg">
              ✕
            </button>
            <div className="flex flex-row space-x-5 ml-3 flex-1">
              <span className="text-gray-900 font-medium w-[25%] text-xs">
                {product.name}
              </span>
              <span className="text-gray-500 text-xs w-[25%]">
                ₦{product.price.toLocaleString()}
              </span>
              <span className="text-gray-500 text-xs w-[25%]">
                {product.quantity} Cartons
              </span>
            </div>
            <button className="bg-[#1FCB2B] hover:bg-[#1FCB2B] text-white px-2 py-2 rounded-lg font-medium text-xs">
              ADD PRODUCT
            </button>
            <ExpandMoreOutlinedIcon
              fontSize="medium"
              onClick={() => handleExpandClick(product.id)}
              className="cursor-pointer"
            />
          </div>
          {expandedProductId === product.id && (
            <div className="mt-4">
              <ProductDetail
                productImage={product.image}
                productName={product.name}
                productType={product.productType}
                description={product.description}
                addedDate={product.addedDate}
                productId={product.productId}
                thresholdQuantity={product.thresholdQuantity}
                thresholdPrice={product.thresholdPrice}
                totalStock={product.totalStock}
                price={product.price}
                stockSold={product.stockSold}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Incoming;
