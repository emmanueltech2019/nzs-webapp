"use client";
import React, { useState } from "react";
import ProductAndServiceTab from "@/components/tabs/ProductAndServiceTab";
import Header from "@/components/header/ProductHeader";

export default function layout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className=" block">
      <Header />

      <ProductAndServiceTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="md:px-0 px-2">{children}</div>
    </div>
  );
}
