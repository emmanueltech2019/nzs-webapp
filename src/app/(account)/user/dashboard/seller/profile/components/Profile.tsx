// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import ProfileImg from "./img/image.png";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { Roboto } from "next/font/google";
// import { profileOptions } from "@/components/dashboard/sidenav/NavlinkObj";
// import axios from "@/utils/axios";
// import Swal from "sweetalert2";
// import Link from "next/link";
// import Avatar from "@mui/material/Avatar";
// import { showToast } from "@/utils/alert";
// import ServiceFilterButtons from "@/components/SortFilter/ServiceFilterButtons";
// import { profileFilter } from "@/components/SortFilter/Filters";
// import useToggle from "@/hooks/useToggle";
// import FreeImg from "@/assets/images/free-plan.png";
// import { Button } from "@mui/material";
// import { useRouter } from "next/navigation";
// import CircleLoader from "@/components/loader/loader";

// const roboto = Roboto({
//   display: "swap",
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "500", "700", "900"],
// });

// interface User {
//   firstname: string;
//   lastname: string;
//   email: string;
//   accountType: "buyer" | "seller";
//   level: "free" | "gold" | "platinum"; // Added level property
// }


// type Business = {
//   _id: string;
//   businessName: string;
//   logoUrl: string;
// };

// const Profile = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [businesses, setBusinesses] = useState<Business[]>([]);
//   const [businessList, setBusinessList] = useState(true);
//   const [isVisible, toggleVisibility] = useToggle(false);
// const router = useRouter();

//   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault(); // stop the default link navigation first
//     localStorage.removeItem("addNewBusiness"); // clear storage
//     router.push("/user/dashboard/seller/create-business"); // then navigate
//   };
//     const [loading, setLoading] = useState(false);

//   const handleSwitch = (id: string) => {
//     setLoading(true);
//     localStorage.setItem("activeBusiness", id);
//     setTimeout(() => {
//       showToast("success", "Business switched successfully")
//       window.location.reload();
//     }, 2000);
//   };
//   const LogOut = () => {
//     Swal.fire({
//       title: "Are you sure you want to logout?",
//       html: "<span style='font-size: 50px;'>😒</span>",
//       showCancelButton: true,
//       confirmButtonColor: "#006838",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, logout!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.clear();
//         Swal.fire({
//           title: "Logout!",
//           text: "Logout successfully.",
//           icon: "success",
//         }).then(() => {
//           window.location.replace("/");
//         });
//       }
//     });
//   };
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = React.useRef<HTMLInputElement>(null);

//   const handleImageClick = () => {
//     fileInputRef.current?.click();
//   };

// const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     let file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       setUploading(true);

//       // 1. Identify if it's an iPhone HEIC/HEIF image
//       const isHeic = file.type === "image/heic" || 
//                      file.type === "image/heif" || 
//                      /\.(heic|heif)$/i.test(file.name);

//       if (isHeic) {
//         showToast("info", "Processing iPhone image...");
        
//         // Dynamically import the converter library
//         const heic2any = (await import("heic2any")).default;
        
//         // Convert HEIC blob to PNG blob
//         const convertedBlob = await heic2any({
//           blob: file,
//           toType: "image/png",
//         });

//         // Handle case where heic2any returns an array (for animated/multiple HEIC images)
//         const safeBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;

//         // Create a new standard File object from the PNG blob
//         const newFileName = file.name.replace(/\.(heic|heif)$/i, ".png");
//         file = new File([safeBlob], newFileName, { type: "image/png" });
//       }

//       // --- CRITICAL OPTIMIZATION: File Size Check ---
//       // We check size AFTER conversion because uncompressing a HEIC file 
//       // into a PNG usually increases the file size significantly.
//       const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB
//       if (file.size > MAX_FILE_SIZE) {
//         showToast("error", "Processed file size exceeds the 5MB limit.");
//         if (e.target.value) {
//           e.target.value = '';
//         }
//         setUploading(false);
//         return; 
//       }

//       // Show preview immediately using the final PNG file
//       const localPreview = URL.createObjectURL(file);
//       setPreviewImage(localPreview);

//       // Upload the now guaranteed PNG file
//       const formData = new FormData();
//       formData.append("picture", file);

//       const res = await axios.post("/users/upload-picture", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setPreviewImage(res.data.profilePicture);
//       showToast("success", "Profile picture updated!");
//     } catch (error) {
//       showToast("error", "Failed to process or upload image");
//       console.error("Upload error details:", error);
//     } finally {
//       setUploading(false);
//     }
//   };
//   useEffect(() => {
//     if (!localStorage.getItem("userToken")) {
//       console.error("User token is missing.");
//       return;
//     }

//     axios
//       .get("/users/profile", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//         },
//       })
//       .then((res) => {
//         console.log("All Businesses", res.data.businesses);
//         console.log("User Data", res.data.user);

//         setBusinesses(res.data.businesses);
//         setUser(res.data.user);

//         if (
//           res.data.user?.profilePicture &&
//           res.data.user.profilePicture.trim() !== ""
//         ) {
//           setPreviewImage(res.data.user.profilePicture);
//         }
//       })
//       .catch((error) => {
//         if (error.response.data.message === "Unauthorized access") {
//           Swal.fire({
//             title: "Session Expired",
//             text: "Your session has expired. Please log in again.",
//             icon: "warning",
//             confirmButtonText: "OK",
//           }).then(() => {
//             localStorage.clear();
//             window.location.replace("/auth/login");
//           });
//           return;
//         }
//         console.error("Error fetching profile:", error);
//       });
//   }, []);
//   return (
//     <div>
//                   <CircleLoader isVisible={loading} />

//       <div className="pb-10">
//         <header>
//           <h1 className="font-sans text-2xl font-extrabold text-center ">
//             Profile
//           </h1>
//         </header>

//         <div>
         
//           <div className="relative mt-[59px] border-2 border-s-[#006838] border-b-[#006838] border-t-[#006838] p-2 rounded-full w-[130px] h-[130px] m-auto -rotate-[40deg]">
//             <div className="absolute z-20 right-1 bottom-1 h-[30px] w-[30px] bg-[#006838] rotate-[40deg] rounded-full">
//               <p
//                 className={`text-xs text-[#ffffff] ${roboto.className} antialiased font-[900] mt-2 mx-2`}
//               >
//                 🤍
//               </p>
//             </div>

//             <Image
//               src={
//                 previewImage ||
//                 (user?.accountType == "buyer"
//                   ? "https://res.cloudinary.com/wise-solution-inc/image/upload/v1729906737/Asset_490_dzaqyl.png"
//                   : "https://res.cloudinary.com/wise-solution-inc/image/upload/v1729906736/Asset_390_y9mpv3.png")
//               }
//               alt="Profile"
//               fill
//               className="rounded-full rotate-[40deg] mx-auto mt-1 cursor-pointer object-cover rounded-full"
//               onClick={handleImageClick}
//             />

//             {uploading && (
//               <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full rotate-[40deg]">
//                 <span className="text-white text-xs">Uploading...</span>
//               </div>
//             )}

//             <input
//               type="file"
//               accept="image/*"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//               className="hidden h-full w-full"
//               style={{ width: "100", height: "100" }}
//             />
//           </div>
//           <div
//             className={`${roboto.className} antialiased font-bold text-center`}
//           >
//             <div className="mt-[31px] mb-1">
//               <h2 className="text-[#6B7A99] text-base leading-[30px]">
//                 Hello {user?.lastname} {user?.firstname}
//               </h2>
//             </div>
//             <div>
//               <p className="text-[#ADB8CC] text-sm leading-[30px]">
//                 {" "}
//                 {user?.email}
//               </p>
//             </div>
//             {user?.accountType == "seller" ? (
//               <div>
//                 <p className="text-[#ADB8CC] text-sm leading-[30px] flex items-center justify-center space-x-3 py-5">
//                   {" "}
//                   {user?.level === "free" && (
//                     <span className="text-[#FF0000] text-xs ml-2">
//                       <Image
//                         src={FreeImg}
//                         alt="Free Plan"
//                         width={50}
//                         height={50}
//                       />
//                     </span>
//                   )}
//                   <Button variant="outlined" color="inherit" onClick={() => showToast("warning", "Feature coming soon!")}>
//                     Upgrade
//                   </Button>
//                 </p>
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {/* account filter */}
//         <div className="my-6">
//           <div></div>

//           {/* switch business */}
//           {user?.accountType == "seller" ? (
//             <>
//               <div className="border-t-[0.5px] border-[#D4D6DD] cursor-pointer p-4 flex justify-between w-full">
//                 <div onClick={() => setBusinessList(!businessList)}>
//                   <h2
//                     className={`text-[#ADB8CC] text-[10px] leading-5 font-bold ${roboto.className} antialiased`}
//                   >
//                     Switch Business
//                   </h2>
//                   <p className="text-[14px] font-normal font-sans leading-5">
//                      Businesses
//                   </p>
//                 </div>

//                 {/* imgaes */}
//                 <div
//                   className="flex items-center gap-5"
//                   onClick={() => setBusinessList(!businessList)}
//                 >
//                   <div className="relative flex">
//                     <div className="h-[35px] w-[35px] bg-slate-500 rounded-full border border-white"></div>
//                     <div className="h-[35px] w-[35px] bg-slate-500 rounded-full border border-white -ms-3"></div>
//                     <div className="h-[35px] w-[35px] bg-slate-500 rounded-full border border-white -ms-3"></div>
//                   </div>

//                   <Icon
//                     icon="formkit:right"
//                     className="text-[18px] text-[#8F9098] rotate-90"
//                   ></Icon>
//                 </div>
//               </div>
//               {user.accountType == "seller" && (
//                 <>
//                   <div className="max-w-sm mx-auto p-4 space-y-2">

//                     {businesses?.map((business) => (
//                         <div
//                           key={business._id}
//                           className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-100"
//                         >
//                           <div
//                             className="flex items-center cursor-pointer"
//                             onClick={() => handleSwitch(business._id)}
//                           >
//                             <Avatar
//                               src={business.logoUrl}
//                               alt={business.businessName}
//                               className="mr-3"
//                             />
//                             <span className="text-[15px] font-semibold">
//                               {business.businessName ? business.businessName : "No BUSINESS NAME"}
//                             </span>
//                           </div>

//                           {/* ✏️ Edit Icon */}
//                           <Link
//                             href={`/user/dashboard/seller/edit-business?id=${business._id}`}
//                             className="text-gray-500 hover:text-[#006838] transition"
//                             title="Edit Business"
//                             onClick={(e) => e.stopPropagation()} // prevent triggering handleSwitch
//                           >
//                             <Icon icon="mdi:pencil" width="20" height="20" />
//                           </Link>
//                         </div>
//                       ))}
//                      <Link
//                         href="/user/dashboard/seller/create-business"
//                         onClick={handleClick}
//                         className="flex items-center justify-center mt-4 text-gray-500 text-lg font-semibold"
//                       >
//                         <span>Add Business</span>
//                         <span className="text-2xl ml-2">+</span>
//                       </Link>
//                   </div>
//                 </>
//               )}

//             </>
//           ) : (
//             ""
//           )}

//           <div className="flex items-center gap-1 my-2 py-2 relative overflow-x-hidden">
//             <div className="flex items-center gap-1 my-2 p-2 bg-[#FFF] z-40">
//               <Icon
//                 icon="hugeicons:menu-08"
//                 className={`text-[#8F9098]`}
//                 width="15"
//                 height="15"
//               />
//               <p className="text-[14px] font-normal text-[#1F2024] leading-4">
//                 Account
//               </p>
//               <Icon
//                 icon="mynaui:chevron-left"
//                 className={`cursor-pointer ms-2 text-[#8F9098] ${
//                   isVisible ? "rotate-180" : ""
//                 }`}
//                 width="19"
//                 height="19"
//                 onClick={() => toggleVisibility()}
//               />
//             </div>
//             <div
//               className={`absolute overflow-x-auto whitespace-nowrap ${
//                 isVisible ? "right-[50%]" : "right-0"
//               } transition-all duration-500 ease-in-out`}
//             >
//               <ServiceFilterButtons
//                 filterArray={profileFilter}
//                 active={user?.accountType === "buyer" ? "Buyer" : "Seller"}
//                 setActive={(tab: string) =>
//                   console.log(`Active tab set to: ${tab}`)
//                 }
//               />
//             </div>
//           </div>

//           <div className="grid gap-[10px] w-full">
//             {profileOptions.map(({ text, path }, index) => (
//               <Link href={`${path}`} key={index}>
//                 <div className="border-t-[0.5px] border-[#D4D6DD] cursor-pointer p-4 flex justify-between w-full">
//                   <span className="flex items-center justify-between w-full font-sans">
//                     <p className="text-[#1F2024] text-sm">{text}</p>
//                     <Icon
//                       icon="formkit:right"
//                       className="text-[20px] text-[#8F9098]"
//                     ></Icon>
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//           {user?.accountType == "seller" ? (
//             <Link
//               href={"/user/dashboard/seller/wallet"}
//               className="md:hidden block"
//             >
//               <div className="border-t-[0.5px] border-[#D4D6DD] cursor-pointer p-4 flex justify-between w-full">
//                 <span className="flex items-center justify-between w-full font-sans">
//                   <p className="text-[#1F2024] text-sm">My Wallet</p>
//                   <Icon
//                     icon="formkit:right"
//                     className="text-[20px] text-[#8F9098]"
//                   ></Icon>
//                 </span>
//               </div>
//             </Link>
//           ) : (
//             <Link href={"/user/dashboard/wallet"} className="md:hidden block">
//               <div className="border-t-[0.5px] border-[#D4D6DD] cursor-pointer p-4 flex justify-between w-full">
//                 <span className="flex items-center justify-between w-full font-sans">
//                   <p className="text-[#1F2024] text-sm">My Wallet</p>
//                   <Icon
//                     icon="formkit:right"
//                     className="text-[20px] text-[#8F9098]"
//                   ></Icon>
//                 </span>
//               </div>
//             </Link>
//           )}

//           <div className="border-t-[0.5px] border-[#D4D6DD] cursor-pointer p-4 flex justify-between w-full">
//             <span
//               className="flex items-center justify-between w-full font-sans"
//               onClick={LogOut}
//             >
//               <p className="text-[#1F2024] text-sm">Log Out</p>
//               <Icon
//                 icon="formkit:right"
//                 className="text-[20px] text-[#8F9098]"
//               ></Icon>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
"use client";

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { Icon } from "@iconify/react";
import { Roboto } from "next/font/google";

import { profileOptions } from "@/components/dashboard/sidenav/NavlinkObj";
import ServiceFilterButtons from "@/components/SortFilter/ServiceFilterButtons";
import { profileFilter } from "@/components/SortFilter/Filters";

import axios from "@/utils/axios";
import { showToast } from "@/utils/alert";

import useToggle from "@/hooks/useToggle";

import FreeImg from "@/assets/images/free-plan.png";
import CircleLoader from "@/components/loader/loader";
import ProfileImg from "./img/image.png";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller";
  level: "free" | "gold" | "platinum";
  profilePicture?: string;
}

interface Business {
  _id: string;
  businessName: string;
  logoUrl?: string;
}

type UploadState = "idle" | "processing" | "uploading" | "success" | "error";

/* -------------------------------------------------------------------------- */
/*                                CONSTANTS                                   */
/* -------------------------------------------------------------------------- */

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const IMAGE_MAX_WIDTH = 1200;
const IMAGE_MAX_HEIGHT = 1200;

const DEFAULT_BUYER_AVATAR =
  "https://res.cloudinary.com/wise-solution-inc/image/upload/v1729906737/Asset_490_dzaqyl.png";

const DEFAULT_SELLER_AVATAR =
  "https://res.cloudinary.com/wise-solution-inc/image/upload/v1729906736/Asset_390_y9mpv3.png";

/* -------------------------------------------------------------------------- */
/*                              HELPER FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

const getStoredToken = () => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("userToken");
};

const getImageErrorFallback = (accountType: User["accountType"]) => {
  return accountType === "buyer"
    ? DEFAULT_BUYER_AVATAR
    : DEFAULT_SELLER_AVATAR;
};

const getReadablePlanName = (level?: User["level"]) => {
  if (!level) return "Free";

  return level.charAt(0).toUpperCase() + level.slice(1);
};

const getPlanStyles = (level?: User["level"]) => {
  switch (level) {
    case "platinum":
      return {
        badge: "bg-slate-900 text-white",
        icon: "text-white",
        ring: "ring-slate-300",
      };

    case "gold":
      return {
        badge: "bg-amber-100 text-amber-700",
        icon: "text-amber-600",
        ring: "ring-amber-200",
      };

    default:
      return {
        badge: "bg-gray-100 text-gray-700",
        icon: "text-gray-500",
        ring: "ring-gray-200",
      };
  }
};

/* -------------------------------------------------------------------------- */
/*                              PROFILE COMPONENT                             */
/* -------------------------------------------------------------------------- */

const Profile = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [businessList, setBusinessList] = useState(false);
  const [activeBusinessId, setActiveBusinessId] = useState<string | null>(
    null
  );

  const [isVisible, toggleVisibility] = useToggle(false);
  const [activeProfileMode, setActiveProfileMode] = useState("Buyer");

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const localPreviewRef = useRef<string | null>(null);

  /* ------------------------------------------------------------------------ */
  /*                              FETCH PROFILE                               */
  /* ------------------------------------------------------------------------ */

  const fetchProfile = useCallback(
    async (showRefresh = false) => {
      const token = getStoredToken();

      if (!token) {
        setLoading(false);
        router.replace("/auth/login");
        return;
      }

      try {
        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response = await axios.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response?.data;

        const profileUser = data?.user as User | undefined;
        const profileBusinesses = Array.isArray(data?.businesses)
          ? data.businesses
          : [];

        if (!profileUser) {
          throw new Error("Invalid profile response");
        }

        setUser(profileUser);
        setBusinesses(profileBusinesses);

        const savedBusiness = localStorage.getItem("activeBusiness");

        if (
          savedBusiness &&
          profileBusinesses.some(
            (business: Business) => business._id === savedBusiness
          )
        ) {
          setActiveBusinessId(savedBusiness);
        } else if (profileBusinesses.length > 0) {
          setActiveBusinessId(profileBusinesses[0]._id);
        }

        if (
          profileUser.profilePicture &&
          profileUser.profilePicture.trim()
        ) {
          setPreviewImage(profileUser.profilePicture);
        }

        setActiveProfileMode(
          profileUser.accountType === "buyer" ? "Buyer" : "Seller"
        );
      } catch (error: any) {
        console.error("Error fetching profile:", error);

        const status = error?.response?.status;
        const message = error?.response?.data?.message;

        if (
          status === 401 ||
          message === "Unauthorized access"
        ) {
          await Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "warning",
            confirmButtonText: "Log In",
            confirmButtonColor: "#006838",
            allowOutsideClick: false,
          });

          localStorage.removeItem("userToken");
          localStorage.removeItem("activeBusiness");

          window.location.replace("/auth/login");
          return;
        }

        showToast(
          "error",
          "Unable to load your profile. Please try again."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [router]
  );

  useEffect(() => {
    fetchProfile();

    return () => {
      if (localPreviewRef.current) {
        URL.revokeObjectURL(localPreviewRef.current);
      }
    };
  }, [fetchProfile]);

  /* ------------------------------------------------------------------------ */
  /*                              IMAGE UPLOAD                                */
  /* ------------------------------------------------------------------------ */

  const handleImageClick = () => {
    if (uploadState === "uploading" || uploadState === "processing") {
      return;
    }

    fileInputRef.current?.click();
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    let file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploadState("processing");
      setUploadProgress(5);

      const isHeic =
        file.type === "image/heic" ||
        file.type === "image/heif" ||
        /\.(heic|heif)$/i.test(file.name);

      /* -------------------------------------------------------------- */
      /* HEIC conversion                                                */
      /* -------------------------------------------------------------- */

      if (isHeic) {
        showToast("info", "Processing iPhone image...");

        setUploadProgress(15);

        const heic2any = (await import("heic2any")).default;

        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.85,
        });

        const safeBlob = Array.isArray(convertedBlob)
          ? convertedBlob[0]
          : convertedBlob;

        const newFileName = file.name.replace(
          /\.(heic|heif)$/i,
          ".jpg"
        );

        file = new File([safeBlob], newFileName, {
          type: "image/jpeg",
        });
      }

      /* -------------------------------------------------------------- */
      /* File validation                                                */
      /* -------------------------------------------------------------- */

      if (!file.type.startsWith("image/")) {
        showToast("error", "Please select a valid image file.");
        resetFileInput();
        setUploadState("error");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        showToast(
          "error",
          "Image must be 5MB or smaller after processing."
        );
        resetFileInput();
        setUploadState("error");
        return;
      }

      setUploadProgress(25);

      /* -------------------------------------------------------------- */
      /* Local preview                                                  */
      /* -------------------------------------------------------------- */

      if (localPreviewRef.current) {
        URL.revokeObjectURL(localPreviewRef.current);
      }

      const localPreview = URL.createObjectURL(file);

      localPreviewRef.current = localPreview;
      setPreviewImage(localPreview);

      /* -------------------------------------------------------------- */
      /* Upload                                                         */
      /* -------------------------------------------------------------- */

      setUploadState("uploading");
      setUploadProgress(40);

      const formData = new FormData();
      formData.append("picture", file);

      const token = getStoredToken();

      if (!token) {
        throw new Error("Missing authentication token.");
      }

      const response = await axios.post(
        "/users/upload-picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) return;

            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );

            setUploadProgress(
              Math.max(40, Math.min(progress, 95))
            );
          },
        }
      );

      const uploadedImage =
        response?.data?.profilePicture ||
        response?.data?.user?.profilePicture ||
        null;

      if (!uploadedImage) {
        throw new Error(
          "The server did not return a profile picture."
        );
      }

      /* Replace local preview with server image */
      setPreviewImage(uploadedImage);

      setUser((current) =>
        current
          ? {
              ...current,
              profilePicture: uploadedImage,
            }
          : current
      );

      if (localPreviewRef.current) {
        URL.revokeObjectURL(localPreviewRef.current);
        localPreviewRef.current = null;
      }

      setUploadProgress(100);
      setUploadState("success");

      showToast("success", "Profile picture updated!");

      window.setTimeout(() => {
        setUploadState("idle");
        setUploadProgress(0);
      }, 1200);
    } catch (error) {
      console.error("Upload error:", error);

      showToast(
        "error",
        "We couldn't update your profile picture. Please try again."
      );

      setUploadState("error");
    } finally {
      resetFileInput();
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                            BUSINESS SWITCH                               */
  /* ------------------------------------------------------------------------ */

  const handleSwitchBusiness = async (businessId: string) => {
    if (
      loading ||
      refreshing ||
      businessId === activeBusinessId
    ) {
      return;
    }

    try {
      setRefreshing(true);

      localStorage.setItem("activeBusiness", businessId);
      setActiveBusinessId(businessId);

      showToast("success", "Business switched successfully.");

      /*
       * Allow the toast to display before refreshing the application.
       */
      window.setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (error) {
      console.error("Business switch error:", error);

      setRefreshing(false);

      showToast(
        "error",
        "Unable to switch business. Please try again."
      );
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                                LOGOUT                                    */
  /* ------------------------------------------------------------------------ */

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Log out of your account?",
      text: "You will need to sign in again to access your dashboard.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#006838",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      localStorage.removeItem("userToken");
      localStorage.removeItem("activeBusiness");
      localStorage.removeItem("addNewBusiness");

      await Swal.fire({
        title: "Logged out",
        text: "You have been successfully logged out.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });

      window.location.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
      window.location.replace("/");
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                                DERIVED DATA                              */
  /* ------------------------------------------------------------------------ */

  const displayName = useMemo(() => {
    if (!user) return "Welcome";

    const first = user.firstname?.trim() || "";
    const last = user.lastname?.trim() || "";

    return `${first} ${last}`.trim() || "Welcome";
  }, [user]);

  const planName = useMemo(
    () => getReadablePlanName(user?.level),
    [user?.level]
  );

  const planStyles = useMemo(
    () => getPlanStyles(user?.level),
    [user?.level]
  );

  const activeBusiness = useMemo(() => {
    return businesses.find(
      (business) => business._id === activeBusinessId
    );
  }, [businesses, activeBusinessId]);

  const avatarSource = useMemo(() => {
    if (previewImage) {
      return previewImage;
    }

    if (user?.accountType) {
      return getImageErrorFallback(user.accountType);
    }

    return ProfileImg;
  }, [previewImage, user?.accountType]);

  const sellerMode = user?.accountType === "seller";

  /* ------------------------------------------------------------------------ */
  /*                               MENU ITEMS                                 */
  /* ------------------------------------------------------------------------ */

  const accountItems = useMemo(() => {
    return profileOptions ?? [];
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                                  UI                                      */
  /* ------------------------------------------------------------------------ */

  return (
    <aside
      className={[
        "w-full md:h-[96vh]",
        "rounded-none md:rounded-[28px]",
        "bg-white",
        "border border-gray-200",
        "shadow-[0_10px_50px_rgba(0,0,0,0.06)]",
        roboto.className,
      ].join(" ")}
    >
      {/* ------------------------------------------------------------------ */}
      {/* DESKTOP SIDE PANEL HEADER                                         */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative overflow-hidden md:rounded-none rounded-t-none md:rounded-t-[28px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006838] via-[#007c43] to-[#004a2a]" />

        <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-[#72f1a7]/10 blur-3xl" />

        <div className="relative px-5 pb-6 pt-5 md:px-6 md:pb-7">
          {/* Top row */}

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                Account
              </p>

              <h1 className="mt-1 text-xl font-black tracking-tight text-white">
                Profile & Settings
              </h1>
            </div>

            <button
              type="button"
              onClick={() => fetchProfile(true)}
              disabled={refreshing}
              aria-label="Refresh profile"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-50"
            >
              <RefreshRoundedIcon
                fontSize="small"
                className={
                  refreshing ? "animate-spin" : ""
                }
              />
            </button>
          </div>

          {/* Profile */}

          <div className="mt-7 flex items-center gap-4">
            <button
              type="button"
              onClick={handleImageClick}
              disabled={
                uploadState === "processing" ||
                uploadState === "uploading"
              }
              className="group relative h-[92px] w-[92px] shrink-0 rounded-full"
              aria-label="Change profile picture"
            >
              <span className="absolute inset-0 rounded-full bg-white/20 p-[3px]">
                <span className="relative block h-full w-full overflow-hidden rounded-full bg-gray-100">
                  <img
                    src={avatarSource}
                    alt="Profile picture"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    onError={(event) => {
                      const target =
                        event.currentTarget;

                      const fallback =
                        getImageErrorFallback(
                          user?.accountType || "buyer"
                        );

                      if (
                        target.src !== fallback
                      ) {
                        target.src = fallback;
                      }
                    }}
                  />

                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/35 group-hover:opacity-100">
                    <PhotoCameraRoundedIcon fontSize="small" />
                  </span>

                  {uploadState === "processing" ||
                  uploadState === "uploading" ? (
                    <span className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 text-white">
                      <span className="mb-1 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      <span className="text-[9px] font-bold">
                        {uploadState ===
                        "processing"
                          ? "Processing"
                          : `${uploadProgress}%`}
                      </span>
                    </span>
                  ) : null}
                </span>
              </span>

              <span className="absolute bottom-1 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#006838] bg-white text-[#006838] shadow-sm">
                <PhotoCameraRoundedIcon
                  sx={{ fontSize: 13 }}
                />
              </span>
            </button>

            <div className="min-w-0">
              <p className="text-xs font-medium text-white/60">
                Hello
              </p>

              <h2 className="mt-0.5 truncate text-xl font-black text-white">
                {displayName}
              </h2>

              <p className="mt-1 truncate text-xs text-white/60">
                {user?.email || "Loading account..."}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7CFFB2]" />
                  {user?.accountType || "account"}
                </span>

                {sellerMode && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#006838]">
                    <WorkspacePremiumRoundedIcon
                      sx={{ fontSize: 12 }}
                    />
                    {planName}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Plan */}

          {sellerMode && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${planStyles.ring} ${planStyles.badge}`}
                  >
                    <WorkspacePremiumRoundedIcon
                      sx={{ fontSize: 18 }}
                      className={planStyles.icon}
                    />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/50">
                      Current plan
                    </p>

                    <p className="mt-0.5 text-sm font-bold text-white">
                      {planName} Plan
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      "warning",
                      "Upgrade plans are coming soon."
                    )
                  }
                  className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#006838] transition hover:bg-gray-50"
                >
                  Upgrade
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* LOADING                                                           */}
      {/* ------------------------------------------------------------------ */}

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <CircleLoader isVisible={loading} />
        </div>
      ) : (
        <div className="px-4 pb-6 md:px-5">
          {/* -------------------------------------------------------------- */}
          {/* ACCOUNT TYPE FILTER                                            */}
          {/* -------------------------------------------------------------- */}

          <div className="relative mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm">
                <ManageAccountsRoundedIcon
                  sx={{ fontSize: 18 }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Account
                </p>

                <p className="mt-0.5 text-sm font-semibold text-gray-900">
                  {activeProfileMode}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleVisibility()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm transition hover:text-[#006838]"
                aria-expanded={isVisible}
                aria-label="Open account type options"
              >
                <KeyboardArrowDownRoundedIcon
                  className={`transition-transform ${
                    isVisible ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isVisible
                  ? "mt-2 max-h-32 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ServiceFilterButtons
                filterArray={profileFilter}
                active={activeProfileMode}
                setActive={(tab: string) => {
                  setActiveProfileMode(tab);
                  toggleVisibility();
                }}
              />
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* SELLER BUSINESS SWITCHER                                      */}
          {/* -------------------------------------------------------------- */}

          {sellerMode && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <button
                type="button"
                onClick={() =>
                  setBusinessList(
                    (current) => !current
                  )
                }
                className="flex w-full items-center justify-between gap-4 border-b border-gray-100 p-4 text-left transition hover:bg-gray-50"
                aria-expanded={businessList}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#006838]/10 text-[#006838]">
                    <BusinessRoundedIcon
                      sx={{ fontSize: 19 }}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Active business
                    </p>

                    <p className="mt-0.5 truncate text-sm font-bold text-gray-900">
                      {activeBusiness?.businessName ||
                        "Select a business"}
                    </p>
                  </div>
                </div>

                <KeyboardArrowDownRoundedIcon
                  className={`shrink-0 text-gray-400 transition-transform ${
                    businessList ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ${
                  businessList
                    ? "max-h-[420px] opacity-100"
                    : "max-h-0 overflow-hidden opacity-0"
                }`}
              >
                <div className="p-3">
                  {businesses.length > 0 ? (
                    <div className="space-y-1">
                      {businesses.map((business) => {
                        const active =
                          business._id ===
                          activeBusinessId;

                        return (
                          <div
                            key={business._id}
                            className={`group flex items-center justify-between gap-3 rounded-xl p-2.5 transition ${
                              active
                                ? "bg-[#006838]/5 ring-1 ring-[#006838]/10"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                handleSwitchBusiness(
                                  business._id
                                )
                              }
                              disabled={refreshing}
                              className="flex min-w-0 flex-1 items-center gap-3 text-left disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <Avatar
                                src={
                                  business.logoUrl ||
                                  undefined
                                }
                                alt={
                                  business.businessName
                                }
                                sx={{
                                  width: 42,
                                  height: 42,
                                }}
                              />

                              <span className="min-w-0">
                                <span
                                  className={`block truncate text-sm font-semibold ${
                                    active
                                      ? "text-[#006838]"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {business.businessName ||
                                    "No Business Name"}
                                </span>

                                <span className="mt-0.5 block text-[10px] text-gray-400">
                                  {active
                                    ? "Currently active"
                                    : "Switch account"}
                                </span>
                              </span>
                            </button>

                            <Link
                              href={`/user/dashboard/seller/edit-business?id=${business._id}`}
                              onClick={(event) =>
                                event.stopPropagation()
                              }
                              aria-label={`Edit ${business.businessName}`}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-[#006838]/10 hover:text-[#006838]"
                            >
                              <EditRoundedIcon
                                sx={{ fontSize: 17 }}
                              />
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-xl bg-gray-50 px-4 py-6 text-center">
                      <BusinessRoundedIcon
                        sx={{
                          fontSize: 26,
                          color: "#9ca3af",
                        }}
                      />

                      <p className="mt-2 text-sm font-semibold text-gray-700">
                        No businesses yet
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Create a business to start selling.
                      </p>
                    </div>
                  )}

                  <Link
                    href="/user/dashboard/seller/create-business"
                    onClick={() =>
                      localStorage.removeItem(
                        "addNewBusiness"
                      )
                    }
                    className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#006838]/30 px-4 py-3 text-sm font-semibold text-[#006838] transition hover:bg-[#006838]/5"
                  >
                    <AddRoundedIcon
                      sx={{ fontSize: 18 }}
                    />

                    Add business
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------- */}
          {/* SETTINGS / ACCOUNT LINKS                                      */}
          {/* -------------------------------------------------------------- */}

          <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-4 py-3">
              <div className="flex items-center gap-2">
                <Icon
                  icon="hugeicons:menu-08"
                  className="text-gray-400"
                  width="16"
                  height="16"
                />

                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
                  Settings
                </p>
              </div>
            </div>

            <div>
              {accountItems.map(
                (
                  item: {
                    text: string;
                    path: string;
                  },
                  index: number
                ) => (
                  <Link
                    href={item.path}
                    key={`${item.path}-${index}`}
                    className="group flex items-center justify-between gap-4 border-b border-gray-100 px-4 py-4 transition last:border-b-0 hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium text-gray-800 transition group-hover:text-[#006838]">
                      {item.text}
                    </span>

                    <ArrowForwardIosRoundedIcon
                      sx={{ fontSize: 14 }}
                      className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-[#006838]"
                    />
                  </Link>
                )
              )}

              {/* ------------------------------------------------------------ */}
              {/* WALLET                                                        */}
              {/* ------------------------------------------------------------ */}

              <Link
                href={
                  sellerMode
                    ? "/user/dashboard/seller/wallet"
                    : "/user/dashboard/wallet"
                }
                className="group flex items-center justify-between gap-4 border-b border-gray-100 px-4 py-4 transition hover:bg-gray-50"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#006838]/5 text-[#006838]">
                    <WalletRoundedIcon
                      sx={{ fontSize: 17 }}
                    />
                  </span>

                  <span className="text-sm font-medium text-gray-800 transition group-hover:text-[#006838]">
                    My Wallet
                  </span>
                </span>

                <ArrowForwardIosRoundedIcon
                  sx={{ fontSize: 14 }}
                  className="text-gray-300"
                />
              </Link>

              {/* ------------------------------------------------------------ */}
              {/* LOGOUT                                                        */}
              {/* ------------------------------------------------------------ */}

              <button
                type="button"
                onClick={handleLogout}
                className="group flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-red-50"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 transition group-hover:bg-red-100">
                    <LogoutRoundedIcon
                      sx={{ fontSize: 17 }}
                    />
                  </span>

                  <span className="text-sm font-semibold text-red-500">
                    Log Out
                  </span>
                </span>

                <ArrowForwardIosRoundedIcon
                  sx={{ fontSize: 14 }}
                  className="text-red-300"
                />
              </button>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* MOBILE SETTINGS FOOTER                                         */}
          {/* -------------------------------------------------------------- */}

          <div className="mt-5 rounded-2xl bg-gray-50 p-4 md:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <ManageAccountsRoundedIcon
                  sx={{
                    fontSize: 19,
                    color: "#006838",
                  }}
                />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-800">
                  Account settings
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  Manage your profile, business and wallet.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* HIDDEN IMAGE INPUT                                                */}
      {/* ------------------------------------------------------------------ */}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.heic,.heif"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />
    </aside>
  );
};

export default Profile;