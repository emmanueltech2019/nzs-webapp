"use client"
import React, { useState } from 'react'
import Health from './components/Health';

const page = () => {


  const topRatedTransactions = [
    {
      title: "DHL Logistics",
      subtitle: "Lagos Island",
      rating: 4.8,
      imageUrl: "/dhl.jpg",
      isOpen: false,
    },
  ];

  return (
    <div className="min-h-screen md:w-[61vw] ">
      <Health  />
    </div>
  );
};

export default page;
