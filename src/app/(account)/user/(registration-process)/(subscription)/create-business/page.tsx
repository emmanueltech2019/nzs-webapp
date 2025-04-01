"use client"
// import Circle from "@/components/Circle";
import React from "react";
import Header from "./components/Header";
import Options from "./components/Options";

const page = () => {

  
  const sector = [
    "RETAIL", "FOOD & BEVERAGE", "HEALTHCARE", "CONSTRUCTION",
    "AUTOMOTIVE", "TECHNOLOGY & IT", "MANUFACTURING",
    "FASHION & TEXTILES", "ARTS & CRAFTS"
  ];

  const categories = [
    "Clothing & Footwear", "Tailoring & Custom Designs", "Textile Materials", "Fashion Accessories & Jewelry"
  ];

  const handleSectorSelect = (selectedCategories: string[]) => {
    console.log("Selected Categories:", selectedCategories);
  };

  return (
    <div>
      <section>
        <div className="mt-[3rem]">
          <Header
            title="Select the right profile for your business."
            text="We provide multiple options so feel free to get 
super-specific!"
          />
        </div>

        {/* sector */}
        <div className="mt-[3.2rem] border-b border-[#D4D6DD]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-normal leading-[20px] text-[#1F2024]">
                Sector
              </p>
              <p className="text-[12px] font-normal leading-[16px] text-[#71727A]">
                Select up to 2 options
              </p>
            </div>
            <div className="w-[24px] h-[24px] rounded-full bg-[#006838] text-[#fff] px-[8px] py-[5px] text-[10px] font-semibold">
              11
            </div>
          </div>

          <Options options={sector} onSelect={handleSectorSelect}/>
        </div>
        <div className="mt-[1rem] border-b border-[#D4D6DD]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-normal leading-[20px] text-[#1F2024]">
                Category
              </p>
              <p className="text-[12px] font-normal leading-[16px] text-[#71727A]">
                Select up to 2 options
              </p>
            </div>
            <div className="w-[24px] h-[24px] rounded-full bg-[#006838] text-[#fff] px-[8px] py-[5px] text-[10px] font-semibold">
              11
            </div>
          </div>

          <Options options={categories} onSelect={handleSectorSelect}/>
        </div>
      </section>
    </div>
  );
};

export default page;
