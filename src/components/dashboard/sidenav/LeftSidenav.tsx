// "use client";
// import React, { useEffect, useState } from "react";
// import Box from "../../Box";
// import { links, linksSeller } from "./NavlinkObj";
// import Link from "next/link";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { usePathname } from "next/navigation";
// import axios from "@/utils/axios";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import Image from "next/image";
// import cartIcon from "../../../assets/icons/cart.png"
// import Swal from "sweetalert2";
// interface User {
//   firstname: string;
//   lastname: string;
//   email: string;
//   accountType: "buyer" | "seller";
// }

// const LeftSidenav = () => {
//   const pathname = usePathname();
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     console.log(pathname.endsWith("/user/dashboard"));
//     if (!localStorage.getItem("userToken")) {
//       console.error("User token is missing.");
//       return;
//     }

//     axios({
//       method: "GET",
//       url: "/users/profile",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     })
//       .then((res) => {
//         console.log(res.data.user);
//         setUser(res.data.user);
//       })
//       .catch((error) => {
//          if(error.response.data.message==="Unauthorized access"){
//                           Swal.fire({
//                             title: "Session Expired",
//                             text: "Your session has expired. Please log in again.",
//                             icon: "warning",
//                             confirmButtonText: "OK",
//                           }).then(() => {
//                             localStorage.clear();
//                             window.location.replace("/auth/login");
//                           });
//                           return;
//                         }
//         console.error("Error fetching profile:", error);
//       });
//   }, []);
//   return (
//     <>
//       {/* <div className='bg-[#006838] fixed z-[10000] text-[#D4D6DD] bottom-24 rounded-e-full left-0  p-5'>
//       <SearchOutlinedIcon fontSize={'medium'}/>
//       </div> */}
//       <div className=" bg-[#006838] text-[#D4D6DD] flex justify-between items-center md:flex-col flex-row md:sticky fixed md:top-0 bottom-0 md:h-screen overflow-y-auto md:max-h-[1200px] md:min-w-[23vw] md:max-w-[241px] w-screen md:py-[70px] py-3 md:ps-[35px] z-50">
//         <div className="box flex-1 self-start hidden lg:flex">
//           <Box />
//         </div>

//         <nav className="md:mt-[57px] flex-[3] w-full">
//           {user?.accountType == "buyer" ? (
//             <ul className="flex flex-row lg:flex-col h-full md:w-fit w-screen px-5 justify-between lg:justify-around">
//               <li className="cursor-pointer text-[#D4D6DD]">
//                 <Link href="/user/dashboard">
//                   <div
//                     className={`flex md:flex-row flex-col items-center gap-[10px] pr-4 lg:border-transparent ${
//                       !pathname.endsWith("/user/dashboard")
//                         ? "lg:border-[#D4D6DD]"
//                         : "text-[#FFBB5B]"
//                     }`}
//                   >
//                     <Image src={cartIcon} width={35} alt="" className={`text-[25px] md:text-[30px] ${
//                         !pathname.endsWith("/user/dashboard")
//                           ? "text-[#D4D6DD]"
//                           : "text-[#FFBB5B]"
//                       }`}/>
//                     {/* <Icon
//                       icon="mdi:cart-variant"
//                       className={`text-[25px] md:text-[30px] ${
//                         !pathname.endsWith("/user/dashboard")
//                           ? "text-[#D4D6DD]"
//                           : "text-[#FFBB5B]"
//                       }`}
//                     ></Icon> */}
//                     <p
//                       className={`text-[12px] md:text-[14px] leading-[22.99px] lg:block font-[400] ${
//                         !pathname.endsWith("/user/dashboard")
//                           ? "text-[#D4D6DD]"
//                           : "text-[#FFBB5B]"
//                       }`}
//                     >
//                       Explore
//                     </p>
//                   </div>
//                 </Link>
//               </li>
//               <li className="cursor-pointer text-[#D4D6DD]">
//                 <Link href={`/user/dashboard/search-product`}>
//                   <div
//                     className={`flex md:flex-row flex-col items-center gap-[10px] pr-4 lg:border-transparent ${
//                       !pathname.endsWith("/user/dashboard/search-product")
//                         ? "text-[#D4D6DD]"
//                         : "text-[#FFBB5B]"
//                     }`}
//                   >
//                     <Icon
//                       icon="ep:search"
//                       className={`text-[25px] md:text-[30px] ${
//                         !pathname.endsWith("/user/dashboard/search-product")
//                           ? "text-[#D4D6DD]"
//                           : "text-[#FFBB5B]"
//                       }`}
//                     ></Icon>
//                     <p
//                       className={`text-[12px] md:text-[14px] leading-[22.99px] lg:block font-[400] ${
//                         !pathname.endsWith("/user/dashboard/search-product")
//                           ? "text-[#D4D6DD]"
//                           : "text-[#FFBB5B]"
//                       }`}
//                     >
//                       Search
//                     </p>
//                   </div>
//                 </Link>
//               </li>
//               <li className="cursor-pointer text-[#D4D6DD]">
//                 <Link href="/user/dashboard/transaction">
//                   <div
//                     className={`flex md:flex-row flex-col items-center gap-[10px] pr-4 lg:border-transparent ${
//                       !pathname.endsWith("/user/dashboard/transaction")
//                         ? "lg:border-[#D4D6DD]"
//                         : "text-[#FFBB5B]"
//                     }`}
//                   >
//                     <Icon
//                       icon="ep:menu"
//                       className={`text-[25px] md:text-[30px] ${
//                         !pathname.endsWith("/user/dashboard/transaction")
//                           ? "text-[#D4D6DD]"
//                           : "text-[#FFBB5B]"
//                       }`}
//                     ></Icon>
//                     <p
//                       className={`text-[12px] md:text-[14px] leading-[22.99px] lg:block font-[400] ${
//                         !pathname.endsWith("/user/dashboard/transaction")
//                           ? "text-[#D4D6DD]"
//                           : "text-[#FFBB5B]"
//                       }`}
//                     >
//                       Transaction
//                     </p>
//                   </div>
//                 </Link>
//               </li>
//               <li className="cursor-pointer text-[#D4D6DD] md:hidden block">
//                 <Link href="/user/dashboard/settings">
//                   <div
//                     className={`flex md:flex-row flex-col items-center gap-[10px] pr-4 lg:border-transparent ${
//                       !pathname.endsWith("/user/dashboard/settings")
//                         ? "lg:border-[#D4D6DD]"
//                         : "text-[#FFBB5B]"
//                     }`}
//                   >
//                     <Icon
//                       icon="ri:settings-5-fill"
//                       className={`text-[25px] md:text-[30px] ${
//                         !pathname.endsWith("/user/dashboard/settings")
//                           ? "text-[#D4D6DD]"
//                           : "text-[#FFBB5B]"
//                       }`}
//                     ></Icon>
//                     <p
//                       className={`text-[12px] md:text-[14px] leading-[22.99px] lg:block font-[400] ${
//                         !pathname.endsWith("/user/dashboard/settings")
//                           ? "text-[#D4D6DD]"
//                           : "text-[#FFBB5B]"
//                       }`}
//                     >
//                       Settings
//                     </p>
//                   </div>
//                 </Link>
//               </li>
//               <li className="cursor-pointer text-[#D4D6DD] hidden md:block">
//                 <Link href={"/user/dashboard/wallet"}>
//                   <div
//                     className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  `}
//                   >
//                     <AccountBalanceWalletOutlinedIcon
//                       className={`text-[25px] md:text-[30px] ${
//                         !pathname.endsWith("/user/dashboard/wallet")
//                           ? "text-[#D4D6DD]"
//                           : "text-[#FFBB5B]"
//                       }`}
//                     />
//                     <p
//                       className={`text-[12px] md:text-[14px] leading-[22.99px] lg:block font-[400] ${
//                         !pathname.endsWith("/user/dashboard/wallet")
//                           ? "text-[#D4D6DD]"
//                           : "text-[#FFBB5B]"
//                       }`}
//                     >
//                       Wallet
//                     </p>
//                   </div>
//                 </Link>
//               </li>
//             </ul>
//           ) : (
//             <ul className="flex flex-row lg:flex-col h-full  md:w-fit w-screen px-5 justify-between lg:justify-around">
//               {linksSeller.map(({ text, icon, link }, index) => {
//                 const activeLink = pathname.endsWith(link);
//                 return (
//                   <li key={index} className="cursor-pointer text-[#D4D6DD]">
//                     <Link href={link}>
//                       <div
//                         className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  ${
//                           !activeLink
//                             ? "text-[#D4D6DD]"
//                             : "text-[#FFBB5B]"
//                         }`}
//                       >
//                         <Icon
//                           icon={icon}
//                           className={`text-[25px] md:text-[30px] ${
//                             !activeLink ? "text-[#D4D6DD]" : "text-[#FFBB5B]"
//                           }`}
//                         ></Icon>
//                         <p
//                           className={`text-[12px] md:text-[14px] leading-[22.99px] lg:block font-[400] ${
//                             !activeLink ? "text-[#D4D6DD]" : "text-[#FFBB5B]"
//                           }`}
//                         >
//                           {text}
//                         </p>
//                       </div>
//                     </Link>
//                   </li>
//                 );
//               })}
//               <li className="cursor-pointer text-[#D4D6DD] md:hidden block">
//                 <Link href={"/user/dashboard/settings"}>
//                   <div
//                     className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  `}
//                   >
//                     <SettingsOutlinedIcon
//                       className={`text-[25px] md:text-[30px]`}
//                     />
//                     <p
//                       className={`text-[12px] md:text-[14px] leading-[22.99px] lg:block font-[400] `}
//                     >
//                       Settings
//                     </p>
//                   </div>
//                 </Link>
//               </li>
//               <li className="cursor-pointer text-[#D4D6DD] hidden md:block">
//                 <Link href={"/user/dashboard/seller/wallet"}>
//                   <div
//                     className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  `}
//                   >
//                     <AccountBalanceWalletOutlinedIcon
//                       className={`text-[25px] md:text-[30px] ${!pathname.endsWith("/user/dashboard/seller/wallet") ? "text-[#D4D6DD]" : "text-[#FFBB5B]"}`}
//                     />
//                     <p
//                       className={`text-[12px] md:text-[14px] leading-[22.99px] lg:block font-[400] ${
//                         !pathname.endsWith("/user/dashboard/seller/wallet") ? "text-[#D4D6DD]" : "text-[#FFBB5B]"
//                       }`}
//                     >
//                         Wallet
//                     </p>
//                   </div>
//                 </Link>
//               </li>
//             </ul>
//           )}
//           {/* 
//         {user?.accountType == "buyer" ? <ul className='flex flex-row lg:flex-col h-full  md:w-fit w-screen px-5 justify-between lg:justify-around'>
//           {
//             links.map(({text, icon, link}, index) => {
//               const activeLink = pathname.endsWith(link)
//               return (
//                 // <li key={index} className='cursor-pointer text-[#fff]'>
//                 //   <Link href={link}>
//                 //     <div className={`flex items-center gap-[10px] pr-4 border-e-4 ${activeLink ? 'border-[#fff]': 'border-transparent'}`}>
//                 //       <Icon icon={icon} className={`text-[34px] ${activeLink ? 'text-[#fff]': 'text-[#D4D6DD]'}`}></Icon>
//                 //       <p className={`text-[19px] leading-[22.99px] font-[400]  ${activeLink ? 'text-[#fff]': 'text-inherit'}`}>{text}</p>
//                 //     </div>
//                 //   </Link>
//                 // </li>
//                 <li key={index} className='cursor-pointer text-[#D4D6DD]'>
//                   <Link href={link}>
//                     <div className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  ${activeLink ? 'lg:border-[#D4D6DD]': 'lg:border-transparent'}`}>
//                       <Icon icon={icon} className={`text-[25px] md:text-[30px] ${activeLink ? 'text-[#D4D6DD]': 'text-[#D4D6DD]'}`}></Icon>
//                       <p className={`text-[12px] md:text-[14px] leading-[22.99px] lg:block font-[400] ${activeLink ? 'text-[#D4D6DD]': 'text-inherit'}`}>{text}</p>
//                     </div>
//                   </Link>
//                 </li>
//               )
//             })
//           }
//         </ul>: <ul className='flex flex-row lg:flex-col h-full  md:w-fit w-screen px-5 justify-between lg:justify-around'>
//           {
//             linksSeller.map(({text, icon, link}, index) => {
//               const activeLink = pathname.endsWith(link)
//               return (
//                 <li key={index} className='cursor-pointer text-[#D4D6DD]'>
//                   <Link href={link}>
//                     <div className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  ${activeLink ? 'lg:border-[#D4D6DD]': 'lg:border-transparent'}`}>
//                       <Icon icon={icon} className={`text-[25px] md:text-[30px] ${activeLink ? 'text-[#D4D6DD]': 'text-[#D4D6DD]'}`}></Icon>
//                       <p className={`text-[12px] md:text-[14px] leading-[22.99px] lg:block font-[400] ${activeLink ? 'text-[#D4D6DD]': 'text-inherit'}`}>{text}</p>
//                     </div>
//                   </Link>
//                 </li>
//               )
//             })
//           }
//            <li  className='cursor-pointer text-[#D4D6DD] md:hidden block'>
//                   <Link href={'/user/dashboard/settings'}>
//                     <div className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  `}>
//                       <SettingsOutlinedIcon className={`text-[25px] md:text-[30px]`}/>
//                       <p className={`text-[12px] md:text-[14px] leading-[22.99px] lg:block font-[400] `}>Settings</p>
//                     </div>
//                   </Link>
//                 </li>
//           <li  className='cursor-pointer text-[#D4D6DD] hidden md:block'>
//                   <Link href={'/wallet'}>
//                     <div className={`flex md:flex-row flex-col items-center gap-[10px] pr-4  `}>
//                       <AccountBalanceWalletOutlinedIcon className={`text-[25px] md:text-[30px]`}/>
//                       <p className={`text-[12px] md:text-[14px] leading-[22.99px] lg:block font-[400] `}>Wallet</p>
//                     </div>
//                   </Link>
//                 </li>
//         </ul>}
//         */}
//         </nav>

//         <div className="empty_element flex-1 flex flex-col justify-end self-start"></div>
//       </div>
//     </>
//   );
// };

// export default LeftSidenav;
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Box from "../../Box";
import { linksSeller } from "./NavlinkObj";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter } from "next/navigation";

import axios from "@/utils/axios";
import Swal from "sweetalert2";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import cartIcon from "../../../assets/icons/cart.png";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller";
}

type RoleStatus = "loading" | "loaded" | "error";

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  mobile?: boolean;
};

type DesktopNavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const NAV_GREEN = "#006838";
const ACTIVE_YELLOW = "#FFBB5B";
const MUTED_WHITE = "#D4D6DD";

/* -------------------------------------------------------------------------- */
/*                              HELPER FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

/**
 * Exact match for dashboard root.
 * Nested dashboard pages should not accidentally mark Explore as active.
 */
const isExactDashboardPath = (pathname: string) => {
  return pathname === "/user/dashboard";
};

/**
 * Active route helper.
 *
 * Uses exact match for dashboard root and prefix matching everywhere else.
 * This means:
 *
 * /user/dashboard/search-product
 * /user/dashboard/search-product/foo
 *
 * both correctly activate Search.
 */
const isRouteActive = (
  pathname: string,
  href: string
) => {
  if (href === "/user/dashboard") {
    return isExactDashboardPath(pathname);
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
};

/* -------------------------------------------------------------------------- */
/*                            LOADING NAVIGATION                              */
/* -------------------------------------------------------------------------- */

const NavigationSkeleton = () => {
  return (
    <div className="w-full px-4 md:px-5">
      <div className="mb-5 flex justify-center lg:justify-start">
        <div className="h-10 w-32 animate-pulse rounded-xl bg-white/10 lg:w-40" />
      </div>

      <div className="hidden space-y-4 lg:block">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-2xl px-4 py-3"
          >
            <div className="h-10 w-10 animate-pulse rounded-xl bg-white/10" />

            <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-around gap-2 lg:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2"
          >
            <div className="h-8 w-8 animate-pulse rounded-lg bg-white/10" />

            <div className="h-2.5 w-12 animate-pulse rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              ERROR STATE                                   */
/* -------------------------------------------------------------------------- */

interface NavigationErrorProps {
  onRetry: () => void;
  retrying: boolean;
}

const NavigationError = ({
  onRetry,
  retrying,
}: NavigationErrorProps) => {
  return (
    <div className="flex flex-col items-center px-5 py-8 text-center lg:items-start lg:text-left">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
        <Icon
          icon="mdi:account-alert-outline"
          className="text-xl text-white/80"
        />
      </div>

      <p className="mt-3 text-sm font-semibold text-white">
        Account navigation unavailable
      </p>

      <p className="mt-1 max-w-[220px] text-xs leading-5 text-white/50">
        We couldn't load your account role. Your
        navigation is hidden until it is confirmed.
      </p>

      <button
        type="button"
        onClick={onRetry}
        disabled={retrying}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RefreshRoundedIcon
          sx={{ fontSize: 15 }}
          className={
            retrying ? "animate-spin" : ""
          }
        />

        {retrying ? "Retrying..." : "Try again"}
      </button>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              DESKTOP NAV ITEM                              */
/* -------------------------------------------------------------------------- */

const DesktopNavItem = ({
  href,
  icon,
  label,
  active,
}: DesktopNavItemProps) => {
  return (
    <Link
      href={href}
      className="group block w-full"
      aria-current={active ? "page" : undefined}
    >
      <div
        className={[
          "relative flex items-center gap-3 rounded-2xl px-4 py-3.5",
          "transition-all duration-200",
          active
            ? "bg-white/12 text-white shadow-sm"
            : "text-white/65 hover:bg-white/7 hover:text-white",
        ].join(" ")}
      >
        {/* Active indicator */}
        <span
          className={[
            "absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full transition-all duration-200",
            active
              ? "bg-[#FFBB5B] opacity-100"
              : "bg-transparent opacity-0",
          ].join(" ")}
        />

        <span
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all",
            active
              ? "bg-[#FFBB5B]/12 text-[#FFBB5B]"
              : "bg-white/5 text-white/65 group-hover:bg-white/10 group-hover:text-white",
          ].join(" ")}
        >
          {icon}
        </span>

        <span
          className={[
            "text-sm font-medium transition-colors",
            active
              ? "text-white"
              : "text-white/65 group-hover:text-white",
          ].join(" ")}
        >
          {label}
        </span>

        <Icon
          icon="mdi:chevron-right"
          className={[
            "ml-auto text-lg transition-all duration-200",
            active
              ? "translate-x-0 text-[#FFBB5B]"
              : "-translate-x-1 text-white/15 group-hover:translate-x-0 group-hover:text-white/40",
          ].join(" ")}
        />
      </div>
    </Link>
  );
};

/* -------------------------------------------------------------------------- */
/*                               MOBILE NAV ITEM                              */
/* -------------------------------------------------------------------------- */

const MobileNavItem = ({
  href,
  icon,
  label,
  active,
}: NavItemProps) => {
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className="group min-w-0 flex-1"
    >
      <div className="relative flex flex-col items-center justify-center gap-1.5 px-2 py-1.5">
        {/* Active glow */}
        <span
          className={[
            "absolute -top-3 h-1 w-8 rounded-full transition-all duration-200",
            active
              ? "bg-[#FFBB5B] opacity-100 shadow-[0_0_12px_rgba(255,187,91,0.5)]"
              : "bg-transparent opacity-0",
          ].join(" ")}
        />

        <span
          className={[
            "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200",
            active
              ? "bg-[#FFBB5B]/10 text-[#FFBB5B]"
              : "text-white/60 group-hover:bg-white/5 group-hover:text-white",
          ].join(" ")}
        >
          {icon}
        </span>

        <span
          className={[
            "max-w-[70px] truncate text-[10px] font-medium leading-4 transition-colors",
            active
              ? "text-[#FFBB5B]"
              : "text-white/55 group-hover:text-white",
          ].join(" ")}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

/* -------------------------------------------------------------------------- */
/*                              LEFT SIDENAV                                  */
/* -------------------------------------------------------------------------- */

const LeftSidenav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  /**
   * IMPORTANT:
   *
   * Do NOT replace this with:
   *
   * user ? ... : seller
   *
   * because user === null can simply mean "role has
   * not loaded yet".
   *
   * This explicit state guarantees that no role-specific
   * navigation is shown until the server confirms the role.
   */
  const [roleStatus, setRoleStatus] =
    useState<RoleStatus>("loading");

  const [retrying, setRetrying] =
    useState(false);

  /* ------------------------------------------------------------------------ */
  /*                            FETCH USER ROLE                               */
  /* ------------------------------------------------------------------------ */

  const fetchUserRole = useCallback(
    async (isRetry = false) => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("userToken")
          : null;

      if (!token) {
        setUser(null);
        setRoleStatus("error");
        return;
      }

      try {
        if (isRetry) {
          setRetrying(true);
        } else {
          setRoleStatus("loading");
        }

        const response = await axios.get(
          "/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileUser =
          response?.data?.user;

        /**
         * Never assume the role.
         * Only mark the navigation as loaded after
         * the backend has returned a valid role.
         */
        if (
          !profileUser ||
          (profileUser.accountType !== "buyer" &&
            profileUser.accountType !== "seller")
        ) {
          console.error(
            "Invalid account type received:",
            profileUser
          );

          setUser(null);
          setRoleStatus("error");
          return;
        }

        setUser(profileUser);
        setRoleStatus("loaded");
      } catch (error: any) {
        console.error(
          "Error fetching user profile:",
          error
        );

        const status =
          error?.response?.status;

        const message =
          error?.response?.data?.message;

        if (
          status === 401 ||
          message === "Unauthorized access"
        ) {
          await Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "warning",
            confirmButtonText: "Log In",
            confirmButtonColor: NAV_GREEN,
            allowOutsideClick: false,
          });

          localStorage.removeItem("userToken");
          localStorage.removeItem("activeBusiness");

          window.location.replace(
            "/auth/login"
          );

          return;
        }

        setUser(null);
        setRoleStatus("error");
      } finally {
        setRetrying(false);
      }
    },
    []
  );

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!mounted) return;

      await fetchUserRole();
    };

    load();

    return () => {
      mounted = false;
    };
  }, [fetchUserRole]);

  /* ------------------------------------------------------------------------ */
  /*                            ROLE FLAGS                                    */
  /* ------------------------------------------------------------------------ */

  const isBuyer =
    roleStatus === "loaded" &&
    user?.accountType === "buyer";

  const isSeller =
    roleStatus === "loaded" &&
    user?.accountType === "seller";

  /* ------------------------------------------------------------------------ */
  /*                         BUYER NAVIGATION                                */
  /* ------------------------------------------------------------------------ */

  const buyerNav = useMemo(() => {
    if (!isBuyer) {
      return [];
    }

    return [
      {
        label: "Explore",
        href: "/user/dashboard",
        icon: (
          <Image
            src={cartIcon}
            width={25}
            height={25}
            alt=""
            className="h-6 w-6 object-contain"
          />
        ),
        mobileIcon: (
          <Image
            src={cartIcon}
            width={23}
            height={23}
            alt=""
            className="h-[23px] w-[23px] object-contain"
          />
        ),
      },
      {
        label: "Search",
        href: "/user/dashboard/search-product",
        icon: (
          <SearchOutlinedIcon
            sx={{ fontSize: 21 }}
          />
        ),
        mobileIcon: (
          <SearchOutlinedIcon
            sx={{ fontSize: 21 }}
          />
        ),
      },
      {
        label: "Transaction",
        href: "/user/dashboard/transaction",
        icon: (
          <Icon
            icon="ep:menu"
            className="text-[21px]"
          />
        ),
        mobileIcon: (
          <Icon
            icon="ep:menu"
            className="text-[21px]"
          />
        ),
      },
    ];
  }, [isBuyer]);

  /* ------------------------------------------------------------------------ */
  /*                         SELLER NAVIGATION                                */
  /* ------------------------------------------------------------------------ */

  const sellerNav = useMemo(() => {
    if (!isSeller) {
      return [];
    }

    return linksSeller.map(
      ({ text, icon, link }) => ({
        label: text,
        href: link,
        icon: (
          <Icon
            icon={icon}
            className="text-[21px]"
          />
        ),
        mobileIcon: (
          <Icon
            icon={icon}
            className="text-[21px]"
          />
        ),
      })
    );
  }, [isSeller]);

  /* ------------------------------------------------------------------------ */
  /*                          ROLE-SPECIFIC NAV                               */
  /* ------------------------------------------------------------------------ */

  const desktopNavItems = isBuyer
    ? buyerNav
    : isSeller
    ? sellerNav
    : [];

  /* ------------------------------------------------------------------------ */
  /*                              WALLET                                      */
  /* ------------------------------------------------------------------------ */

  const walletPath =
    isSeller
      ? "/user/dashboard/seller/wallet"
      : "/user/dashboard/wallet";

  const walletActive =
    roleStatus === "loaded" &&
    isRouteActive(
      pathname,
      walletPath
    );

  /* ------------------------------------------------------------------------ */
  /*                                UI                                        */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      {/* ================================================================== */}
      {/* DESKTOP SIDEBAR                                                   */}
      {/* ================================================================== */}

      <aside
        className={[
          "fixed left-0 top-0 z-50 hidden h-screen lg:flex lg:w-[260px]",
          "flex-col overflow-hidden",
          "bg-[#006838]",
          "text-[#D4D6DD]",
          "shadow-[10px_0_40px_rgba(0,0,0,0.08)]",
        ].join(" ")}
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#4ce88e]/10 blur-3xl" />

        {/* -------------------------------------------------------------- */}
        {/* BRAND / BOX                                                     */}
        {/* -------------------------------------------------------------- */}

        <div className="relative z-10 px-5 pt-6">
          <div className="flex min-h-[58px] items-center rounded-2xl border border-white/10 bg-white/5 px-3 backdrop-blur">
            <Box />
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* ROLE LOADING                                                     */}
        {/* -------------------------------------------------------------- */}

        <div className="relative z-10 mt-6 flex-1 overflow-y-auto px-3 pb-6">
          {roleStatus === "loading" && (
            <NavigationSkeleton />
          )}

          {roleStatus === "error" && (
            <NavigationError
              onRetry={() =>
                fetchUserRole(true)
              }
              retrying={retrying}
            />
          )}

          {roleStatus === "loaded" && (
            <>
              {/* Role label */}
              <div className="mb-3 px-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                  {isSeller
                    ? "Seller marketplace"
                    : "Buyer marketplace"}
                </p>
              </div>

              {/* Main navigation */}
              <nav
                className="space-y-1"
                aria-label="Main navigation"
              >
                {desktopNavItems.map(
                  (item) => (
                    <DesktopNavItem
                      key={item.href}
                      href={item.href}
                      icon={item.icon}
                      label={item.label}
                      active={isRouteActive(
                        pathname,
                        item.href
                      )}
                    />
                  )
                )}

                {/* Wallet */}
                <DesktopNavItem
                  href={walletPath}
                  icon={
                    <AccountBalanceWalletOutlinedIcon
                      sx={{
                        fontSize: 21,
                      }}
                    />
                  }
                  label="Wallet"
                  active={walletActive}
                />
              </nav>
            </>
          )}
        </div>

        {/* Desktop footer */}
        <div className="relative z-10 border-t border-white/10 p-4">
          <div className="rounded-2xl bg-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#7CFFB2]" />

              <span className="text-[11px] font-medium text-white/50">
                {roleStatus === "loaded"
                  ? `${user?.accountType} account`
                  : "Checking account"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ================================================================== */}
      {/* MOBILE BOTTOM NAV                                                 */}
      {/* ================================================================== */}

      <nav
        className={[
          "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
          "border-t border-white/10",
          "bg-[#006838]/95",
          "pb-[env(safe-area-inset-bottom)]",
          "shadow-[0_-10px_35px_rgba(0,0,0,0.15)]",
          "backdrop-blur-xl",
        ].join(" ")}
        aria-label="Mobile navigation"
      >
        <div className="mx-auto flex h-[72px] max-w-lg items-center justify-between px-3">
          {/* ------------------------------------------------------------ */}
          {/* LOADING                                                       */}
          {/* ------------------------------------------------------------ */}

          {roleStatus === "loading" && (
            <div className="flex w-full items-center justify-around">
              {Array.from({ length: 4 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="h-8 w-8 animate-pulse rounded-xl bg-white/10" />

                    <div className="h-2.5 w-12 animate-pulse rounded bg-white/10" />
                  </div>
                )
              )}
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* ERROR                                                         */}
          {/* ------------------------------------------------------------ */}

          {roleStatus === "error" && (
            <div className="flex w-full items-center justify-center">
              <button
                type="button"
                onClick={() =>
                  fetchUserRole(true)
                }
                disabled={retrying}
                className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-white"
              >
                <RefreshRoundedIcon
                  sx={{ fontSize: 16 }}
                  className={
                    retrying
                      ? "animate-spin"
                      : ""
                  }
                />

                {retrying
                  ? "Retrying..."
                  : "Load navigation"}
              </button>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* LOADED                                                         */}
          {/* ------------------------------------------------------------ */}

          {roleStatus === "loaded" && (
            <>
              {/* Role-specific links */}
              {desktopNavItems.map((item) => (
                <MobileNavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.mobileIcon}
                  active={isRouteActive(
                    pathname,
                    item.href
                  )}
                />
              ))}

              {/* Settings */}
              <MobileNavItem
                href="/user/dashboard/settings"
                label="Settings"
                icon={
                  <SettingsOutlinedIcon
                    sx={{ fontSize: 21 }}
                  />
                }
                active={isRouteActive(
                  pathname,
                  "/user/dashboard/settings"
                )}
              />
            </>
          )}
        </div>
      </nav>

      {/* ================================================================== */}
      {/* MOBILE BOTTOM SAFE AREA                                            */}
      {/* ================================================================== */}

      {/* <div className="h-[0px] lg:hidden" /> */}
    </>
  );
};

export default LeftSidenav;