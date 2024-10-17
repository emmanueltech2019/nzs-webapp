"use client"
import React, { FC, useState } from "react";
import Image from "next/image";
import productImg from "./img/image.png";
import { Poppins } from "next/font/google";
import { Icon } from "@iconify/react/dist/iconify.js";

const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  // variable: '--font-poppins',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const accordionObj: any = [
  {
    image: productImg,
    productType: "Shoes",
    description: "The perfect T-shirt for when you want to feel at ease but still stylish...",
    arrival: "11 Hours",

  },
  {
    image: productImg,
    productType: "Shoes",
    description: "The perfect T-shirt for when you want to feel at ease but still stylish...",
    arrival: "11 Hours",

  },
  {
    image: productImg,
    productType: "Shoes",
    description: "The perfect T-shirt for when you want to feel at ease but still stylish...",
    arrival: "11 Hours",

  },
]

const SellerAccordion: React.FC<{}> = () => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number | null>(0);

  const handleAccordionToggle = (index: number) => {
    setActiveAccordionIndex(activeAccordionIndex === index ? null : index);
  };


  return (
    <div className="grid gap-2 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      {
        accordionObj.map((details: any, index: number) => {
          const isActive = activeAccordionIndex === index;
          return (
            <div
              key={index}
              className={`bg-[#F8F9FE] p-4 rounded-lg overflow-hidden md:w-[620px] m-auto md:h-[546px] transition-[max-height] duration-300 ease-in-out ${isActive ? "flex flex-col justify-center m-auto" : "pt-2"}`}
              style={{
                maxHeight: isActive ? "500px" : "68px",
                transition: "max-height 0.4s ease-in-out",
              }}
            >
              <header className={`transition-all duration-300 ease-in-out ${isActive ? "" : "flex items-center gap-4"}`}>
                {/* product image */}
                <div
                  className={`transition-[width,height] duration-100 ease-in-out ${isActive ? "w-full h-auto" : "w-[39px] h-[33px]"
                    }`}
                  style={{
                    width: isActive ? "100%" : "36px",
                    height: isActive ? "auto" : "33px",
                    transition: "width 0.1s, height 0.2s ease-in",
                  }}
                >
                  <Image src={details.image} alt="alt" className="w-full h-full rounded-lg" />
                </div>

                <div
                  className={`flex justify-between items-center my-2 py-2 border-b-[#0C1F1F0A] border-b-[1px] ${isActive ? "" : "w-full"} transition-all duration-500 ease-in-out`}
                >
                  <div>
                    <h1 className={`text-xs font-semibold text-[#0C1F1F] ${poppins.className} antialiased`}>
                      PRODUCT DETAILS
                    </h1>
                  </div>

                  {/* status and accordion toggle button */}
                  <div className="flex items-center gap-2">
                    {/* status */}
                    <div>
                      <button className="bg-[#20E58A] py-1 px-4 font-sans font-normal rounded-[15px] text-[9px] text-[#0C1F1F] leading-[12.26px]">
                        INCOMING
                      </button>
                    </div>

                    {/* toggle */}
                    <div>
                      <Icon
                        icon="tabler:chevron-down"
                        onClick={() => handleAccordionToggle(index)}
                        className={`text-[#0C1F1F80] cursor-pointer transition-transform duration-500 ease-in-out ${isActive ? "rotate-180" : ""
                          }`} // Rotate arrow for opening/closing effect
                      />
                    </div>
                  </div>
                </div>
              </header>

              {/* product details */}
              <div className={`${isActive ? "transition-all duration-700 ease-in-out" : "mt-8"} grid grid-cols-2`}>
                {/* col 1 */}
                <div>
                  {/* product type */}
                  <div>
                    <p className="text-[#0C1F1F40] text-[9px] leading-[12.26px] font-bold font-sans">
                      Product Type
                    </p>
                    <h2 className="text-[11px] text-[#0C1F1F] font-normal font-sans pt-1 pb-2">
                      {details.productType}
                    </h2>
                  </div>

                  {/* description */}
                  <div className="mt-[5px]">
                    <p className="text-[#0C1F1F40] text-[9px] leading-[12.26px] font-bold font-sans">
                          Description
                    </p>
                    <p className="text-[#71727A] text-[10px] leading-4 font-sans w-[113px] py-1">
                      {details.description}
                    </p>
                  </div>

                  {/* estimated arrival */}
                  <div>
                    <p className="text-[#0C1F1F40] text-[9px] leading-[12.26px] font-bold font-sans">
                      Estimated Arrival
                    </p>
                    <h2 className="text-[11px] text-[#0C1F1F] font-normal font-sans py-1">
                      {details.arrival}
                    </h2>
                  </div>
                </div>

                {/* col 2 */}
                <div>
                  {/* time */}
                  <div>
                    <div className="border-[1px] border-[#00683880] rounded-[4px] py-1 px-2 w-[97px]">
                      <p className="text-[9px] leading-[12.26px] font-sans font-normal text-[#0C1F1F]">
                        8:00 AM - 11:00 AM
                      </p>
                    </div>
                    <h2 className="text-[11px] text-[#0C1F1F] font-normal font-sans py-1">
                      September 30, 2024
                    </h2>
                  </div>

                  {/* approximate distance */}
                  <div>
                    <p className="text-[#0C1F1F40] text-[9px] leading-[12.26px] font-bold font-sans">
                      Order Location
                    </p>
                    <h2 className="text-[11px] text-[#0C1F1F] font-normal font-sans">
                      Umahia, Abia
                    </h2>
                  </div>

                  {/* order location */}
                  <div className="mt-[37px]">
                    <p className="text-[#0C1F1F40] text-[9px] leading-[12.26px] font-bold font-sans py-1">
                      Approximate Distance
                    </p>
                    <h2 className="text-[11px] text-[#0C1F1F] font-normal font-sans py-[3px]">
                      500 km
                    </h2>
                  </div>
                </div>
              </div>

              {/* size price and delivery */}
              <div>
                {/* size */}
                <div className="grid grid-cols-2 items-center">
                  <p className="text-[#0C1F1F40] text-[9px] leading-[12.26px] font-bold font-sans">
                    Size
                  </p>
                  <button className="py-[6px] px-2 bg-[#006838] text-[#fff] text-[10px] font-sans font-semibold rounded-xl w-[37px]">
                    XL
                  </button>
                </div>

                {/* price */}
                <div className="grid grid-cols-2 items-center mt-[9px]">
                  <p className="text-[#0C1F1F40] text-[9px] leading-[12.26px] font-bold font-sans">
                    Price (NGN)
                  </p>
                  <button className="py-1 px-4 bg-[#EBEDEB] text-[#1F2024] text-[10px] font-sans font-[900] rounded-[15px] w-[79px]">
                    3,000.00
                  </button>
                </div>

                {/* delivery */}
                <div className="grid grid-cols-2 items-center mt-[9px]">
                  <p className="text-[#0C1F1F40] text-[9px] leading-[12.26px] font-bold font-sans">
                    Delivery
                  </p>
                  <button className="py-1 px-4 bg-[#EBEDED] text-[#000000] text-[11px] font-sans font-normal rounded-[15px] w-[54px]">
                    DHL
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SellerAccordion;
