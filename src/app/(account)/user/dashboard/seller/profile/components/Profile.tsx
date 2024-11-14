"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfileImg from "./img/image.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Roboto } from "next/font/google";
import { profileOptions } from "@/components/dashboard/sidenav/NavlinkObj";
import axios from "@/utils/axios";
import Swal from "sweetalert2";
import Link from "next/link";
import Avatar from '@mui/material/Avatar';
import { showToast } from "@/utils/alert";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  // variable: '--font-poppins',
  weight: ["100", "300", "400", "500", "700", "900"],
});

interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller";
}
// const userToken = localStorage.getItem("userToken") || "";
// const tr = JSON.parse(userToken);

type Business = {
  _id: string;
  businessName: string;
  logoUrl: string;
};

// const businesses: Business[] = [
//   { id: '1', name: "Mira's Fashion", image: 'https://via.placeholder.com/150' },
//   { id: '2', name: 'Bags and Boots', image: 'https://via.placeholder.com/150' },
//   { id: '3', name: 'Bags and Boots', image: 'https://via.placeholder.com/150' },
// ];
const Profile = () => {
  
  const [user, setUser] = useState<User | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [businessList, setBusinessList] = useState(true)
  const handleSwitch = (id:string) =>{
    localStorage.setItem('activeBusiness', id)
    setTimeout(()=>{
      showToast('success', "Business switched successfully")
      window.location.replace("./inventory")
    }, 2000)
  }
  const LogOut = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      html: "<span style='font-size: 50px;'>😒</span>",
      showCancelButton: true,
      confirmButtonColor: "#006838",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()
        Swal.fire({
          title: "Logout!",
          text: "Logout successfully.",
          icon: "success",
        }).then(() => {
          window.location.replace('/')
        })
      }
    });
  };
  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      console.error("User token is missing.");
      return;
    }

    axios({
      method: "GET",
      url: "/users/profile", 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log("All Businesses",res.data.businesses);
        setBusinesses(res.data.businesses)
        // console.log(res.data.business); 
        setUser(res.data.user); 
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  return (
    <div>
      <div className="pb-20">
        <header>
          <h1 className="font-sans text-2xl font-extrabold text-center py-[19.5px]">
            Profile
          </h1>
        </header>

        <div>
          {/* profile picture */}
          <div className="relative mt-[59px] border-2 border-s-[#006838] border-b-[#006838] border-t-[#006838] p-2 rounded-full w-[130px] h-[130px] m-auto -rotate-[40deg]">
            <div className="absolute z-20 right-1 bottom-1 h-[30px] w-[30px] bg-[#006838] rotate-[40deg] rounded-full">
              <p
                className={`text-xs text-[#ffffff] ${roboto.className} antialiased font-[900] mt-2 mx-3`}
              >
                9
              </p>
            </div>
            <Image
              src={user?.accountType == "buyer" ? 'https://res.cloudinary.com/wise-solution-inc/image/upload/v1729906737/Asset_490_dzaqyl.png' : 'https://res.cloudinary.com/wise-solution-inc/image/upload/v1729906736/Asset_390_y9mpv3.png'}
              alt="alt"
              width={'100'}
              height={'100'}
              className="rounded-full rotate-[40deg]"
            />
          </div>

          {/* profile details */}
          <div
            className={`${roboto.className} antialiased font-bold text-center`}
          >
            {/* name */}
            <div className="mt-[31px] mb-1">
              <h2 className="text-[#6B7A99] text-base leading-[30px]">
                Hello {user?.lastname} {user?.firstname}
              </h2>
            </div>
            {/* email */}
            <div>
              <p className="text-[#ADB8CC] text-sm leading-[30px]">
                {" "}
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* account filter */}
        <div className="my-6">
          <div></div>

          {/* switch business */}
          {user?.accountType == "seller" ? (
            <>
              <div className="border-t-[0.5px] border-[#D4D6DD] cursor-pointer p-4 flex justify-between w-full">
                <div onClick={()=>setBusinessList(!businessList)}>
                  <h2
                    className={`text-[#ADB8CC] text-[10px] leading-5 font-bold ${roboto.className} antialiased`}
                  >
                    Switch Business
                  </h2>
                  <p className="text-[14px] font-normal font-sans leading-5">
                    Other Business
                  </p>
                </div>

                {/* imgaes */}
                <div className="flex items-center gap-5" onClick={()=>setBusinessList(!businessList)}>
                  <div className="relative flex">
                    <div className="h-[35px] w-[35px] bg-slate-500 rounded-full border border-white"></div>
                    <div className="h-[35px] w-[35px] bg-slate-500 rounded-full border border-white -ms-3"></div>
                    <div className="h-[35px] w-[35px] bg-slate-500 rounded-full border border-white -ms-3"></div>
                  </div>

                  <Icon
                    icon="formkit:right"
                    className="text-[18px] text-[#8F9098] rotate-90"
                  ></Icon>
                </div>
                
              </div>
                {businessList==false&&
                <>
<div className="max-w-sm mx-auto p-4 space-y-2">
      {businesses?.map((business, index) => (
        <div
          key={business._id}
          onClick={()=>handleSwitch(business._id)}
          className={`flex items-center p-3 rounded-lg hover:bg-blue-100`}
        >
          <Avatar src={business.logoUrl} alt={business.businessName} className="mr-3" />
          <span className="text-lg font-semibold">{business.businessName!=undefined||null||''?business.businessName:"No BUSINESS NAME"}</span>
        </div>
      ))}

      <Link
        href="./create-business"
        className="flex items-center justify-center mt-4 text-gray-500 text-lg font-semibold"
      >
        <span>Add Business</span>
        <span className="text-2xl ml-2">+</span>
      </Link>
    </div>
                </>}
              {/* <div className="border-t-[0.5px] border-[#D4D6DD] cursor-pointer p-4 flex justify-between w-full">
                <span className="flex items-center justify-between w-full font-sans">
                  <p className="text-[#1F2024] text-sm">Inventory</p>
                  <Icon
                    icon="formkit:right"
                    className="text-[20px] text-[#8F9098]"
                  ></Icon>
                </span>
              </div> */}
            </>
          ) : (
            ""
          )}

          <div className="grid gap-[10px] w-full">
            {profileOptions.map(({ text, path }, index) => (
              <Link href={`${path}`} key={index}>
                <div

                  className="border-t-[0.5px] border-[#D4D6DD] cursor-pointer p-4 flex justify-between w-full"
                >
                  <span className="flex items-center justify-between w-full font-sans">
                    <p className="text-[#1F2024] text-sm">{text}</p>
                    <Icon
                      icon="formkit:right"
                      className="text-[20px] text-[#8F9098]"
                    ></Icon>
                  </span>

                </div>
              </Link>
            ))}
          </div>
          <Link href={'/user/dashboard/seller/wallet'} className="md:hidden block">
          <div className="border-t-[0.5px] border-[#D4D6DD] cursor-pointer p-4 flex justify-between w-full">
            <span className="flex items-center justify-between w-full font-sans" >
              <p className="text-[#1F2024] text-sm">My Wallet</p>
              <Icon
                icon="formkit:right"
                className="text-[20px] text-[#8F9098]"
              ></Icon>
            </span>
          </div>
          </Link>
          <div className="border-t-[0.5px] border-[#D4D6DD] cursor-pointer p-4 flex justify-between w-full">
            <span className="flex items-center justify-between w-full font-sans" onClick={LogOut}>
              <p className="text-[#1F2024] text-sm">Log Out</p>
              <Icon
                icon="formkit:right"
                className="text-[20px] text-[#8F9098]"
              ></Icon>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
