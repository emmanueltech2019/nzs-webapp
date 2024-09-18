"use client";
import React, { useState } from "react";

const cardBody = "rounded-[12.9px] py-[34.4px] px-[12.2px]";
const activebg = "bg-[#006838]";
const cardbg = "bg-[#ffffff]";

const cardheadText = "font-[900] text-[12.9px] leading-[15.61px]";
const headText = "text-[#000000]";
const activeheadText = "text-[#ffffff]";

const cardparText = "font-[400] text-[10.32px] leading-[12.49px]";
const parText = "text-[#71727a]";
const activeparText = "text-[#ffbb5b]";

const activeIcon = "rounded-[5px] bg-[#ffbb5b]";
const cardIcon = "border-[1px] border-[#eaf2ff] bg-[#ffffff]";

// Interface definition for the CardItem
interface CardItem {
  index: number;
  // icon: FunctionComponent<SVGProps<SVGSVGElement>>; // Should be a component function, not JSX
  headText: string;
  paragraph: string;
}

// Array of card content with SVG components as functions
const cardContent: CardItem[] = [
  {
    index: 1,
    // icon: StatsIcon, // Use the component function, not JSX
    headText: "Streaming Your Business Sales and Purchases",
    paragraph:
      "Enjoy these pre-made components and worry only about creating the best products ever.",
  },
  {
    index: 2,
    // icon: CartIcon,
    headText: "Quotes, Orders and Delivery. All Simplified for you!",
    paragraph:
      "Enjoy these pre-made components and worry only about creating the best products ever.",
  },
  {
    index: 3,
    // icon: ShieldIcon,
    headText: "Welcome to Efficiency... Create a Profile and get verified quickly",
    paragraph:
      "Enjoy these pre-made components and worry only about creating the best products ever.",
  },
];

// OnboardingCard component renders the cardContent
const OnboardingCard: React.FC = () => {
  const [active, setAxtive] = useState(true)
  return (
    <div className="bg-[#EAF2FF] p-[8.6px] rounded-[21.5px]">
      {cardContent.map((item) => {
        // const IconComponent = item.icon; // Destructure the icon component to use it as JSX
        return (
          <div key={item.index} className={`${cardBody} ${cardbg}`}>
            <div className={`${cardIcon}`}>
              {/* <IconComponent className="w-[24px] h-[24px]" /> Render the icon */}
            </div>
            <h2 className={`${cardheadText} ${headText}`}>{item.headText}</h2>
            <p className={`${cardparText} ${parText}`}>{item.paragraph}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OnboardingCard;
