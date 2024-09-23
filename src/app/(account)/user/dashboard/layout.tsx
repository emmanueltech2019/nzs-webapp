import React from "react";
import LeftSidenav from "@/components/dashboard/sidenav/LeftSidenav";
import RightSidenav from "@/components/dashboard/sidenav/RightSidenav";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:flex block">
      <LeftSidenav />
      <div className="md:w-[60vw] md:px-0 px-2">{children}</div>
      <RightSidenav />
    </div>
  );
}
