import React from "react";

type ServicesCardProps = {
  title: string;
  subtitle: string;
  rating: number;
  distance?: string;
  imageUrl: string;
  isOpen: boolean;
};

const ServicesCard: React.FC<ServicesCardProps> = ({
  title,
  subtitle,
  rating,
  distance,
  imageUrl,
  isOpen,
}) => {
  return (
    <div className="bg-[#F8F9FE] shadow-lg rounded-lg overflow-hidden h-[40vh]">
      <div className="relative">
        <img src={imageUrl} alt={title} className="h-32 w-full object-cover" />
        {distance && (
          <div className="absolute top-2 right-2 bg-green-600 text-white text-sm px-2 py-1 rounded-full">
            {distance}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg h-[3vh]">{title}</h3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
          <span>⭐ {rating}</span>
        </div>
        <button
          className={`mt-4 w-full py-2 rounded-lg ${
            isOpen ? "text-green-600 border border-green-600" : "text-gray-400 border border-gray-300"
          }`}
        >
          {isOpen ? "Open" : "Closed"}
        </button>
      </div>
    </div>
  );
};

export default ServicesCard;
