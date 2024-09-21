import React from "react";
import LeftSidenav from "@/components/dashboard/sidenav/LeftSidenav";
import RightSidenav from "@/components/dashboard/sidenav/RightSidenav";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <LeftSidenav />
      <div className="w-full max-w-9/12">{children}</div>
      <RightSidenav />
    </div>
  );
}
