
import React from "react";
import LeftSidenav from "@/components/dashboard/sidenav/LeftSidenav";
import RightSidenav from "@/components/dashboard/sidenav/RightSidenav";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:flex block justify-between">
      <LeftSidenav />
      <div className="w-full xl:w-[55vw] mx-auto overflow-y-auto h-[100vh]">{children}</div>
      <RightSidenav />
    </div>
  );
}

// md:w-[60vw]