"use client";
import React, { useEffect, useState } from "react";
import ourTeamBanner from "@/assets/images/our-team-banner.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useContextStore } from "@/context/SubscriptionContext";

type eventType = React.ChangeEvent<HTMLInputElement>;

const Role = () => {
  const [buy, setbuy] = useState(false);
  const [sell, setsell] = useState(false);
  const handleBuy = (e: eventType) => {
    setbuy(e.target.checked);
  };
  const handleSell = (e: eventType) => {
    setsell(e.target.checked);
  };

  const { handleNext, handleActive, handleMessage} = useContextStore()
  useEffect(() => {
    handleNext("./interest");
    handleActive(buy || sell)
    handleMessage("Select your role");
  }, [handleNext, handleActive, handleMessage, buy, sell]);

  const { handleProgressbar, handleImg } = useContextStore();
  useEffect(() => {
    handleImg(ourTeamBanner);
    handleProgressbar(30);
  }, [handleImg, handleProgressbar]);
  return (
    <div>
      <section>
        <div>
          <header>
            <h1 className=" text-2xl text-[#1F2024] md:text-[40px] md:leading-[48.41px] font-[900] mt-[50px]">
              Let&apos;s know what you&apos;re here to do!
            </h1>
            <p className="text-[14px] md:text-[18px] text-[#71727A] leading-[20px] md:leading-[16px] font-[400] mt-[16px]">
              Choose your role.
            </p>
          </header>

          <div className="choose-role mt-[41px] flex flex-col gap-2">
            <div className="buy p-4 flex justify-between rounded-[12px] bg-[#EAF2FF] cursor-pointer">
              <p className="text-[14px] text-[#1F2024] select-none">Buy</p>
              <input
                title="buy"
                type="checkbox"
                name="buy"
                id="buy"
                className="hidden"
                onChange={handleBuy}
              />
              <label htmlFor="buy">
                <div className="checkbox h-6 w-6 border-[#C5C6CC] border-[1.5px] rounded-md flex items-center justify-center cursor-pointer">
                  <Icon
                    icon="iconamoon:check-duotone"
                    className={`text-lg text-[--icon-green-2] text-center font-bold ${
                      buy ? "opacity-100" : "opacity-0"
                    } transistion-all duration-200`}
                  ></Icon>
                </div>
              </label>
            </div>
            <div className="sell p-4 flex justify-between rounded-[12px] bg-[#ffffff] border-[#C5C6CC] border-[0.5px] cursor-pointer">
              <p className="text-[14px] text-[#1F2024] select-none">Sell</p>
              <input
                title="sell"
                type="checkbox"
                name="sell"
                id="sell"
                className="hidden"
                onChange={handleSell}
              />
              <label htmlFor="sell">
                <div className="checkbox h-6 w-6 border-[#C5C6CC] border-[1.5px] rounded-md flex items-center justify-center cursor-pointer">
                  <Icon
                    icon="iconamoon:check-duotone"
                    className={`text-lg text-[--icon-green-2] text-center font-bold ${
                      sell ? "opacity-100" : "opacity-0"
                    } transistion-all duration-200`}
                  ></Icon>
                </div>
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Role;
