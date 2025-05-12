"use client";
import React, { useCallback, useEffect, useState } from "react";
import GridWrapper from "../Grid/GridWrapper";
import ServicesCard from "../cards/ServiceCard";
import { profile } from "console";

const LogisticsObj = [
  {
    title: "Limbot Technoligies",
    subtitle: "Freight Delivery",
    distance: "3 KM",
    rating: 4.8,
    imageUrl:
      "https://res.cloudinary.com/dyrleuyj9/image/upload/v1747052789/image_gy2q3u.png",
    isOpen: true,
    profileLink: "dashboard/buyer/logistics/company-profile",
  },
  {
    title: "GIG Logistics",
    subtitle: "Parcel Delivery",
    distance: "3 KM",
    rating: 4.8,
    imageUrl:
      "https://res.cloudinary.com/dyrleuyj9/image/upload/v1747052788/image_copy_aiytba.png",
    isOpen: true,
    profileLink: "dashboard/buyer/logistics/company-profile",
  },
  {
    title: "GIG Logistics",
    subtitle: "Parcel Delivery",
    distance: "3 KM",
    rating: 4.8,
    imageUrl:
      "https://res.cloudinary.com/dyrleuyj9/image/upload/v1747052788/image_copy_aiytba.png",
    isOpen: true,
    profileLink: "dashboard/buyer/logistics/company-profile",
  },
];

const LogisticsCarousel: React.FC = () => {

  return (
    <div className="md:px-2">
      <section>
        <GridWrapper title="Near You">{
          LogisticsObj.map((item, index) => (
            <div className="md:w-[38%] flex-shrink-0">
                <ServicesCard key={index} {...item} />
            </div>
          ))
          }</GridWrapper>
      </section>
    </div>
  );
};

export default LogisticsCarousel;
