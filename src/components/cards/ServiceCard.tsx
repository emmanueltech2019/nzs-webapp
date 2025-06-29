import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

type ServicesCardProps = {
  title: string;
  subtitle: string;
  rating: number;
  distance?: string;
  imageUrl: string;
  isOpen: boolean;
  logo?: string;
  profileLink?: string;
  onClick?: () => void;
};

const ServicesCard: React.FC<ServicesCardProps> = ({
  title,
  subtitle,
  rating,
  distance,
  imageUrl,
  isOpen,
  logo,
  profileLink,
  onClick,
}) => {
  return (
    <div className="bg-[#F8F9FE] rounded-2xl w-[250px] md:w-[320px] h-[267px] md:h-[300px]">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-t-2xl h-[120px] w-full object-cover"
        />
        {distance && (
          <div className="absolute top-2 right-2 bg-[#006838] text-white text-[10px] px-2 py-1 rounded-[12px]">
            {distance}
          </div>
        )}
      </div>
      <div className="p-3">
        {/* title and Logo */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-extrabold font-sans text-sm text-[#1F2024]">
              {title}
            </h3>
            <p className="font-normal text-xs text-[#71727A]">{subtitle}</p>
          </div>
          <div className="bg-[#006838] w-[42.17px] h-[42.17px] rounded-full p-2">
            {logo}
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
          <span className="font-normal text-xs text-[#71727A] flex items-center gap-1">
            <Icon icon="bxs:star" className="text-[#006838]"></Icon> {rating}
          </span>
        </div>
        <Link href={profileLink || "#"} onClick={onClick}>
          {/* Open/Closed Button */}
          <button
            className={`mt-3 text-center cursor-pointer w-full text-xs font-semibold py-3 px-4 rounded-xl ${
              isOpen
                ? "text-[#006838] border border-[#006838]"
                : "text-gray-400 border border-gray-300"
            }`}
          >
            {isOpen ? "Open" : "Closed"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServicesCard;
