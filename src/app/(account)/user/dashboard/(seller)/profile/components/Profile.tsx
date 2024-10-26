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

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  // variable: '--font-poppins',
  weight: ["100", "300", "400", "500", "700", "900"],
});
const userToken = localStorage.getItem("userToken") || "";
const tr = JSON.parse(userToken);

const Profile = () => {
  const [user, setUser] = useState(null); // Step 2: Initialize state to hold user data

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
        }).then(()=>{
          window.location.replace('/')
        })
      }
    });
  };
  useEffect(() => {
    // Make sure `tr` is defined and valid
    const userToken = localStorage.getItem("userToken");
    const tr = userToken ? JSON.parse(userToken) : null;

    if (!tr) {
      console.error("User token is missing.");
      return;
    }

    axios({
      method: "GET",
      url: "/users/profile", // Make sure this URL is correct and your base URL is set up in axios
      headers: {
        Authorization: `Bearer ${tr}`,
      },
    })
      .then((res) => {
        console.log(res.data.user); // Log response data, not just the entire response object
        setUser(res.data.user); // Step 3: Set the user data to state
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []); // Dependency array ensures it runs only once on mount

  return (
    <div>
      <div className="">
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
              src={user?.accountType=="buyer"?'https://res.cloudinary.com/wise-solution-inc/image/upload/v1729906737/Asset_490_dzaqyl.png':'https://res.cloudinary.com/wise-solution-inc/image/upload/v1729906736/Asset_390_y9mpv3.png'}
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
                <div>
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
                <div className="flex items-center gap-5">
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
              <div className="border-t-[0.5px] border-[#D4D6DD] cursor-pointer p-4 flex justify-between w-full">
                <span className="flex items-center justify-between w-full font-sans">
                  <p className="text-[#1F2024] text-sm">Inventory</p>
                  <Icon
                    icon="formkit:right"
                    className="text-[20px] text-[#8F9098]"
                  ></Icon>
                </span>
              </div>
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
