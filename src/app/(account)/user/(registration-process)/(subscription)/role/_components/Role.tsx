"use client";
import React, { useEffect, useRef, useState } from "react";
import ourTeamBanner from "@/assets/images/our-team-banner.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useContextStore } from "@/context/SubscriptionContext";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/alert";

type eventType = React.ChangeEvent<HTMLInputElement>;

const Role = () => {
  const router = useRouter();
  const [role, setRole] = useState('')
  const handleRole = (e: eventType) => {
    setRole(e.target.title);
  }
  const handleAPI = async () => {
    const userToken = localStorage.getItem("userToken") || ''
    const tr = JSON.parse(userToken)
    if (role) {
      axios({
        method: "PUT",
        url: "/users/",
        data: {
          accountType: role
        },
        headers: {
          Authorization: `Bearer ${tr}`,
        },
      }).then(res => {
        console.log(res)
        showToast("success", "Role updated successfully");
        router.push("./interest")
      }).catch(err => {
        console.error(err);
        showToast("error", "Failed to update role");
      })
    }else{
      console.log("No role selected")
      showToast("error", "No role selected");
    }
  }

  const { handleFunc } = useContextStore()
  useEffect(() => {
    handleFunc(handleAPI)
  }, [role])

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
            <input
              title="buyer"
              type="radio"
              name="accountType"
              id="buyer"
              className="hidden"
              onInput={handleRole}
            />
            <label htmlFor="buyer">
              <div className={`buy p-4 flex justify-between rounded-[12px] border-[#C5C6CC] border-[0.5px] cursor-pointer ${role == 'buyer' ? 'bg-[#EAF2FF]' : 'bg-white'}`}>
                <p className="text-[14px] text-[#1F2024] select-none">Buy</p>
                <div className={`checkbox h-6 w-6 border-[#C5C6CC] border-[1.5px] rounded-md flex items-center justify-center cursor-pointer`}>
                  <Icon
                    icon="iconamoon:check-duotone"
                    className={`text-lg text-[--icon-green-2] text-center font-bold ${role == 'buyer' ? "opacity-100" : "opacity-0"
                      } transistion-all duration-200`}
                  ></Icon>
                </div>
              </div>
            </label>

            <input
              title="seller"
              type="radio"
              name="accountType"
              id="seller"
              className="hidden"
              onChange={handleRole}
            />
            <label htmlFor="seller">
              <div className={`sell p-4 flex justify-between rounded-[12px] border-[#C5C6CC] border-[0.5px] cursor-pointer ${role == 'seller' ? 'bg-[#EAF2FF]' : 'bg-white'}`}>
                <p className="text-[14px] text-[#1F2024] select-none">Sell</p>
                <div className="checkbox h-6 w-6 border-[#C5C6CC] border-[1.5px] rounded-md flex items-center justify-center cursor-pointer">
                  <Icon
                    icon="iconamoon:check-duotone"
                    className={`text-lg text-[--icon-green-2] text-center font-bold ${role == 'seller' ? "opacity-100" : "opacity-0"
                      } transistion-all duration-200`}
                  ></Icon>
                </div>
              </div>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Role;
