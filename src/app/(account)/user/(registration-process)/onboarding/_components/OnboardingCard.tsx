import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CardItemtype } from "./onboarding.types";

const OnboardingCard = ({
  icon,
  headText,
  paragraph,
  active,
}: CardItemtype) => {
  const cardBody = "rounded-[12.9px] py-[34.4px] px-[12.2px]";
  const activebg = "bg-[#006838]";
  const cardbg = "bg-[#ffffff]";

  const cardheadText =
    "font-[700] text-[22px] md:text-[12.9px] md:leading-[15.61px] transition-all duration-500";
  const activeheadText = `${active ? "text-white" : "text-black"}`;

  const cardparText =
    "font-[400] text-[14px] md:text-[10.32px] leading-[19.49px] md:leading-[12.49px]";
  const activeparText = `transition-all duration-500 ${active ? "text-[#ffbb5b]" : "text-[#71727a]"}`;

  const cardIcon = "border-[1px] border-[#eaf2ff]";
  const activeIcon = `rounded-[5px] w-[39.26px] h-[39.26px] transition-all duration-500 ${
    active ? "bg-[#ffbb5b] text-[#006838]" : `text-[#ffbb5b] ${cardIcon}`
  }`;

  return (
    <div className={`${cardBody}`}>
      <div
        className={`${activeIcon} flex items-center justify-center mb-[19.35px] md:mb-[26.23px]`}
      >
        <Icon icon={icon} className="text-[24px]" />
      </div>
      <h2
        className={`${cardheadText} ${activeheadText} mb-[14px] md:mb-[34px] lg:whitespace-nowrap`}
      >
        {headText}
      </h2>
      <p
        className={`${cardparText} ${activeparText} pb-[6.88px] md:mb-[43.1px]`}
      >
        {paragraph}
      </p>
    </div>
  );
};

export default OnboardingCard;
