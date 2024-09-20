import React from "react";
import Sidenav from "@/components/dashboard/sidenav/Sidenav";
export default function nameLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidenav />
      {children}
    </div>
  );
}