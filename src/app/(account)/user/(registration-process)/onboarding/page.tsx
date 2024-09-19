import React from "react";
import RouterBtn from "@/components/buttons/RouteBtn";
import Onboarding from "./_components/Onboarding";
import FuncRouteBtn from "@/components/buttons/FuncRouteBtn";
import Box from "@/components/Box";

function page() {
  const checkVerification = () => {
    return console.log("Verified");
  };

  return (
    <div>
      <Onboarding />
    </div>
  );
}

export default page;
