import React from "react";
import TagHeader from "@/components/header/TagHeader";
import { Icon } from "@iconify/react/dist/iconify.js";

const Sector = () => {
  type numcircleType = {
    num: number;
    bgColor: string;
    textColor: string;
  };
  const checkIcon = (
    <div className="circle w-6 h-6 rounded-full bg-[#C4EDDA] flex items-center justify-center">
      <Icon icon="ci:check" className="text-lg" />
    </div>
  );
  const NumberCircle = ({ num, bgColor, textColor }: numcircleType) => (
    <div
      className={`circle w-6 h-6 rounded-full ${bgColor} ${textColor} flex items-center justify-center text-xs transition-all duration-300`}
    >
      {num}
    </div>
  );
  return (
    <div className="flex justify-between text-xs">
      <div className="flex flex-col items-center">
        {checkIcon}
        <span>Your Bag</span>
      </div>
      <div className="flex flex-col items-center">
        <NumberCircle
          num={2}
          bgColor="bg-[--foreground-green]"
          textColor="text-white"
        />
        <span>Shipping</span>
      </div>
      <div className="flex flex-col items-center">
        <NumberCircle
          num={3}
          bgColor="bg-[#F8F9FE]"
          textColor="text-[#8F9098]"
        />
        <span>Payment</span>
      </div>
      <div className="flex flex-col items-center">
        <NumberCircle
          num={4}
          bgColor="bg-[#F8F9FE]"
          textColor="text-[#8F9098]"
        />
        <span>Review</span>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <div>
      <TagHeader title="Checkout" />
      <Sector />
    </div>
  );
};

export default Checkout;
