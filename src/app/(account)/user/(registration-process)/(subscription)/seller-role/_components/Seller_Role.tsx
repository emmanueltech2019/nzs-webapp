"use client";
import React, { useEffect, useRef, useState } from "react";
import ourTeamBanner from "@/assets/images/our-team-banner.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useContextStore } from "@/context/SubscriptionContext";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/alert";
import Image from "next/image";
import seller_product_img from './sell-products.jpeg'
import offerservices from '@/app/(account)/user/(registration-process)/(subscription)/seller-role/_components/offerservices.jpg'

type eventType = React.ChangeEvent<HTMLInputElement>;

const Seller_Role = () => {
  const router = useRouter();
  const [role, setRole] = useState('')
  const handleRole = (e: eventType) => {
    setRole(e.target.title);
  }
  const handleAPI = async () => {
    // const userToken = localStorage.getItem("userToken") || ''
    // const tr = JSON.parse(userToken)
    if (role) {
      axios({
        method: "PUT",
        url: "/business/select-role",
        data: {
          role,state:'a', city:'a', street:'a', zip:'0', town:'a',address:'a', townId:1, cityId:1
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }).then(res => {
        // console.log(res)
        localStorage.setItem('addNewBusiness', res.data.profile._id)
        // console.log(res)
        showToast("success", "Sellers Role updated successfully");
        router.push(`./dashboard/seller/create-business?sector=${role}`)
      }).catch(err => {
        console.error(err);
        showToast("error", "Failed to update Sellers Role");
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
    handleProgressbar(80); 
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
              title="Sell Products"
              type="radio"
              name="accountType"
              id="sell_product"
              className="hidden"
              onInput={handleRole}
            />
            <label htmlFor="sell_product">
              <div className={`sell_product p-4 flex justify-between rounded-[12px] border-[#C5C6CC] border-[0.5px] cursor-pointer ${role == 'Sell Products' ? 'bg-[#EAF2FF]' : 'bg-white'}`}>
                <p className="text-[14px] text-[#1F2024] select-none">Sell Product</p>
                <div className={`checkbox h-6 w-6 border-[#C5C6CC] border-[1.5px] rounded-md flex items-center justify-center cursor-pointer`}>
                  <Icon
                    icon="iconamoon:check-duotone"
                    className={`text-lg text-[--icon-green-2] text-center font-bold ${role == 'Sell Products' ? "opacity-100" : "opacity-0"
                      } transistion-all duration-200`}
                  ></Icon>
                </div>
              </div>
            </label>
            <div className={`sell_product_image overflow-hidden transition-all duration-300 ${role == 'Sell Products'?'max-h-[1000px]':'max-h-[0px]'}`}>
              <Image src={seller_product_img} alt="sell_product_image" className="object-cover w-full rounded-lg" />
            </div>

            <input
              title="Offer Services"
              type="radio"
              name="accountType"
              id="offer_services"
              className="hidden"
              onChange={handleRole}
            />
            <label htmlFor="offer_services">
              <div className={`offer_services p-4 flex justify-between rounded-[12px] border-[#C5C6CC] border-[0.5px] cursor-pointer ${role == 'Offer Services' ? 'bg-[#EAF2FF]' : 'bg-white'}`}>
                <p className="text-[14px] text-[#1F2024] select-none">Offer Services</p>
                <div className="checkbox h-6 w-6 border-[#C5C6CC] border-[1.5px] rounded-md flex items-center justify-center cursor-pointer">
                  <Icon
                    icon="iconamoon:check-duotone"
                    className={`text-lg text-[--icon-green-2] text-center font-bold ${role == 'Offer Services' ? "opacity-100" : "opacity-0"
                      } transistion-all duration-200`}
                  ></Icon>
                </div>
              </div>
            </label>
            <div className={`offer_services overflow-hidden transition-all duration-300 ${role == 'Offer Services'?'max-h-[1000px]':'max-h-[0px]'}`}>
              <Image src={offerservices} alt="offer_services" className="object-cover w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Seller_Role;
