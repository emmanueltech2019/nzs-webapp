import React from "react";
import RouterBtn from "@/components/buttons/RouteBtn";
import Onboading from "./_components/Onboarding";

function page() {
  return (
    <div className="">
      <Onboading />
      <RouterBtn url="./" text="Next"/>
    </div>
  );
}

export default page;
