import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CardItemtype } from "./onboarding.types";

const cardBody = "rounded-[12.9px] py-[34.4px] px-[12.2px]";
const activebg = "bg-[#006838]";
const cardbg = "bg-[#ffffff]";

const cardheadText = "font-[900] text-[12.9px] leading-[15.61px]";
const headText = "text-[#000000]";
const activeheadText = "text-[#ffffff]";

const cardparText = "font-[400] text-[10.32px] leading-[12.49px]";
const parText = "text-[#71727a]";
const activeparText = "text-[#ffbb5b]";

const activeIcon =
  "rounded-[5px] bg-[#ffbb5b] w-[39.26px] h-[39.26px] text-[#006838]";
const cardIcon = "border-[1px] border-[#eaf2ff] bg-[#ffffff]";

const OnboardingCard = ({ icon, headText, paragraph }: CardItemtype) => {
  return (
    <div>
      <div className="p-[8.6px] rounded-[21.5px]">
        <div className={`${cardBody} ${activebg}`}>
          <div className={`${activeIcon} flex items-center justify-center`}>
            <Icon icon={icon} className="text-[24px]" />
          </div>
          <h2 className={`${cardheadText} ${activeheadText}`}>{headText}</h2>
          <p className={`${cardparText} ${activeparText}`}>{paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCard;
