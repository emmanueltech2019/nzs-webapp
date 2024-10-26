import Image from "next/image";
import React from "react";
import logo from '@/assets/images/logo2.svg'

const Box = () => {
  return (
    <div
      className={`box w-[34.42px] lg:w-[68px] h-[34.42px] lg:h-[68px] rounded-[13.66px] bg-[#fff] p-1 text-center flex justify-center items-center mr-auto`}
    >
      <Image src={'https://res.cloudinary.com/wise-solution-inc/image/upload/v1729911544/fulllogo_full_green_1_gg1urs.png'} width={150} height={150} alt="" className="object-cover w-full" />
    </div>
  );
};

export default Box;
