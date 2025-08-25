"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import axios from "@/utils/axios";
import Image from "next/image";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller";
  profilePicture?: string;
}

interface Business {
  id: string;
  businessName: string;
  logoUrl: string;
}

const Header: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [cartLength, setCartLength] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("User token is missing.");
        return;
      }

      try {
        // Fetch user profile
        const profileRes = await axios.get<{ user: User }>("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedUser = profileRes.data.user;
        setUser(fetchedUser);

        if (fetchedUser.accountType === "seller") {
          const activeBusinessId = localStorage.getItem("activeBusiness");
          if (!activeBusinessId) {
            console.warn("No activeBusiness found in localStorage.");
            return;
          }

          const businessRes = await axios.get<{ business: Business }>(
            `/business/${activeBusinessId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          // console.log("Business Response:", businessRes.data.business[0]);
          if (businessRes.data.business) {
            setBusiness(businessRes.data.business);
          }
        } else {
          const cartRes = await axios.get<{ cart: { items: any[] } }>(
            "/cart",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setCartLength(cartRes.data.cart.items.length);
        }
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-between px-10 py-6 w-full">
      {/* Left Section: User or Business */}
      {user?.accountType === "seller" ? (
        <div className="flex space-x-4 items-center">
          <Image
            src={
              user?.profilePicture ||
              "https://res.cloudinary.com/wise-solution-inc/image/upload/v1729906736/Asset_390_y9mpv3.png"
            }
            width={30}
            height={30}
            alt={business?.businessName || "Business Logo"}
            className="rounded-full"
          />
          <h1 className="text-2xl font-[900]">
            {business?.businessName || "No Business Name"}
          </h1>
        </div>
      ) : (
        <h1 className="text-2xl font-[900]">Hi {user?.lastname ?? "Guest"}!</h1>
      )}

      {/* Right Section: Cart / Stats */}
      <div className="flex space-x-4">
        {user?.accountType === "seller" ? (
          <Link href="#">
            <div className="relative">
              <ShowChartOutlinedIcon className="text-2xl" />
              <span className="absolute top-0 right-0 bg-[#006838] text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                {cartLength}
              </span>
            </div>
          </Link>
        ) : (
          <Link href="/dashboard/cart">
            <div className="relative">
              <Image
                src="https://res.cloudinary.com/wise-solution-inc/image/upload/v1731586826/Group_1000005013_bhe9nv.png"
                alt="cart icon"
                height={30}
                width={30}
                className="text-2xl"
              />
              <span className="absolute top-0 right-0 bg-[#006838] text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                {cartLength}
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
