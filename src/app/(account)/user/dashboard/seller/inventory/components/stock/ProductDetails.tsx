// ProductDetail.tsx

import React from "react";
import Button from "@mui/material/Button";

type ProductDetailProps = {
  productImage: string;
  productName: string;
  productType: string;
  description: string;
  addedDate: string;
  productId: string;
  thresholdQuantity: string;
  thresholdPrice: number;
  totalStock: string;
  price: number;
  stockSold: string;
};

const ProductDetail: React.FC<ProductDetailProps> = ({
  productImage,
  productName,
  productType,
  description,
  addedDate,
  productId,
  thresholdQuantity,
  thresholdPrice,
  totalStock,
  price,
  stockSold,
}) => {
  return (
    <div className="max-w-lg rounded-lg  space-y-4 ">
      <div className="relative">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-48 rounded-t-lg object-cover"
        />
        <div className="absolute top-4 right-4">
          <Button variant="contained" color="success" size="small">
            Edit Product
          </Button>
        </div>
      </div>
      <div className="px-2 py-2 space-y-2">
        <h2 className="text-2xl font-semibold">{productName}</h2>

        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600">
           
            <div className="flex flex-col">
                <span className="font-small text-[#71727A]">Product Type</span>
                <span className="font-medium">{productType}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-small text-[#71727A]">Added</span>
                <span className="font-medium">{addedDate}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-small text-[#71727A]">Description</span>
                <span className="font-medium">{description}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-small text-[#71727A]">Product ID</span>
                <span className="font-medium">{productId}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-small text-[#71727A]">Threshold Quantity</span>
                <span className="font-medium">{thresholdQuantity}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-small text-[#71727A]">Threshold Price (NGN)</span>
                <span className="font-medium">{thresholdPrice.toFixed(2)}</span>
            </div>
          {/* <span className="font-medium">Product ID</span>
          <span>{productId}</span>

          <span className="font-medium">Description</span>
          <span>{description}</span> */}

          {/* <span className="font-medium">Threshold Quantity</span>
          <span>{thresholdQuantity}</span>

          <span className="font-medium">Threshold Price (NGN)</span>
          <span>{thresholdPrice.toFixed(2)}</span> */}
        </div>

        <div className="grid  gap-4 items-center mt-4">
         
          <div className="flex justify-between text-sm">
            <span>Total Stock</span>
            <div className="col-span-1 px-4 text-center bg-green-600 text-white font-semibold py-2 rounded-full">
              {totalStock}
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span>Price (NGN)</span>
            <div className="col-span-1 text-center bg-gray-200 text-black font-semibold py-2 px-4 rounded-full">
            {price.toFixed(2)}
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total Stock</span>
            <div className="col-span-1 text-center bg-red-500 text-white font-semibold py-2 px-4 rounded-full">
            {stockSold}
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
