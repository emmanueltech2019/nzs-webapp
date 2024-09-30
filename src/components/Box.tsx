import Image from "next/image";
import React from "react";
import logo from '@/assets/images/logo2.svg'

const Box = () => {
  return (
    <div
      className={`box w-[34.42px] lg:w-[68px] h-[34.42px] lg:h-[68px] rounded-[13.66px] bg-[#006838] p-3`}
    >
      <Image src={logo} alt="" className="object-cover w-full" />
    </div>
  );
};

export default Box;
