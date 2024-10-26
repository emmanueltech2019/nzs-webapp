"use client";
import CarouselEmbla from "@/components/carousel/Carousel";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/utils/axios";
import { ProductT } from "@/types/Product.types";
import { showToast } from "@/utils/alert";
// import { useRouter } from 'next/router';

const ProductScreen: FC = () => {
  const [product, setProduct] = useState<ProductT>();
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("green");

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["black", "gray", "darkGray", "lightGray", "white"];

  const router = useRouter();
  const handleGoBack = () => {
    router.back(); // Navigate back to the previous page
  };

  // const userToken = localStorage.getItem("userToken") || "";
  // const tr = JSON.parse(userToken);
  var id:string|null
  if (typeof window !== "undefined") {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    id = urlParams.get("id");
  }

  const addToCart = () => {
    axios({
      method: "POST",
      url: "cart/add/",
      data: { productId: id, quantity: 1 },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        showToast("success", "Item added to cart");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    //   const userToken = localStorage.getItem("userToken") || "";
    // const tr = JSON.parse(userToken);
    if (typeof window !== "undefined") {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let id = urlParams.get("id");
      axios({
        method: "GET",
        url: "products/single/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
        .then((res) => {
          setProduct(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="relative p-4  mx-auto bg-white rounded-lg ">
      {/* Close button */}
      {/* <button className="top-4 left-4 text-2xl z-10 text-[60px]">&times;</button> */}
      <button
        className=" text-3xl z-10  py-1 text-gray-500 my-1 "
        onClick={handleGoBack}
      >
        <ArrowBackOutlinedIcon />
      </button>

      {/* Product Image/Carousel */}
      {/* <CarouselEmbla images={product?.images}/> */}
      <CarouselEmbla images={product?.images ?? []} />

      {/* Product Info */}
      <div className="mt-4">
        <span className="inline-block py-2 px-4 bg-[#EAF2FF] text-black rounded-lg mb-4 mt-2">
          Outgoing
        </span>
        <h2 className="text-2xl font-bold">{product?.name}</h2>
        <p className="text-xl text-gray-700">₦ {product?.price}</p>
        <p className="mt-2 text-gray-500">{product?.description}</p>
      </div>

      {/* Size Selector */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Size</h3>
        <div className="flex space-x-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-4 py-2 rounded-full border ${
                selectedSize === size
                  ? "bg-green-600 text-white"
                  : "bg-gray-100"
              }`}
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
              className={`w-8 h-8 rounded-full border ${
                selectedColor === color ? "border-green-600" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            ></button>
          ))}
        </div>
      </div>

      {/* Add to Bag Button */}

      <button
        className="mt-6 w-full py-3 bg-[#006838] text-white text-lg rounded-lg flex items-center justify-center"
        onClick={addToCart}
      >
        + Add to Bag
      </button>
    </div>
  );
};

export default ProductScreen;
