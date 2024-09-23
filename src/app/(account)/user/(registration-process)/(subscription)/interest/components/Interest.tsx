"use client";
import React, { useEffect, useState } from "react";
import initalState, {InterestItem} from "./InterestObj"
import { Icon } from "@iconify/react";
import { useContextStore } from "@/context/SubscriptionContext";
import businessAnalysis_img from "@/assets/images/business-analysis.png";

const Interest = () => {

  const [interest, setInterest] = useState(initalState);

  useEffect(() =>{}, [interest])

  const handleClick = (a: any) => {
    console.log(a);

    let itemIndex = initalState.findIndex((obj) => obj.interest === a);
    if (itemIndex === -1) {
      setInterest([...interest, { interest: a, state: true }]);
    } else {
      setInterest((prev) =>
        prev.map((item, index) =>
          index === itemIndex ? { ...item, state: !item.state } : item
        )
      );
    }
  };

  const { handleProgressbar, handleImg } = useContextStore();
  useEffect(() => {
    handleImg(businessAnalysis_img);
    handleProgressbar(50);
  }, [handleImg, handleProgressbar]);

  const { handleActive, handleNext, handleMessage } = useContextStore();
  useEffect(() => {
    handleNext("./package");
    handleActive(interest.some((i) => i.state == true));
    handleMessage("Select your interests");
  }, [handleNext, handleActive, handleMessage, interest]);

  return (
    <div>
      <section>
        <div>
          <header>
            <h1 className=" text-2xl text-[#1F2024] md:text-[40px] md:leading-[48.41px] font-[900] mt-[50px]">
              Personalize your market experience
            </h1>
            <p className="text-[14px] md:text-[18px] text-[#71727A] leading-[20px] md:leading-[16px] font-[400] mt-[16px]">
              Choose your interests.
            </p>
          </header>

          <div className="choose-interest flex flex-col gap-2 mt-[41px] mb-[24px]">
            {interest.map(
              ({ interest, state }: InterestItem, index: number) => (
                <div
                  key={index}
                  className={`p-4 py-3 flex justify-between rounded-[12px] transition-all duration-300 ${
                    state ? "bg-[#EAF2FF]" : "bg-[#ffffff]"
                  } border-[#C5C6CC] border-[0.5px] cursor-pointer`}
                  onClick={() => {
                    handleClick(interest);
                  }}
                >
                  <p className="text-[14px] text-[#1F2024]">{interest}</p>
                  <div className="checkbox flex items-center">
                    <Icon
                      icon="ph:check-bold"
                      className={`text-[#006838] text-[14px] transition-all duration-300 ${
                        state ? "opacity-100" : "opacity-0"
                      }`}
                    ></Icon>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Interest;
