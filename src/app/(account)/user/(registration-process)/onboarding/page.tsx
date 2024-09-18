import React from "react";
import RouterBtn from "@/components/buttons/RouteBtn";
import Onboarding from "./_components/Onboarding";
import FuncRouteBtn from "@/components/buttons/FuncRouteBtn";

function page() {
  const checkVerification = () => {
    return console.log("Verified")
  }

  return (
    <div>
      <Onboarding />
      <RouterBtn url="./" text="Next"/>
      <FuncRouteBtn text="Continue" func={checkVerification}/>
    </div>
  );
}

export default page;
