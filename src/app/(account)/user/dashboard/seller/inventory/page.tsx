// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import InStock from "./components/stock/InStock";
// import SellerTransStatusTab from "@/components/tabs/SellerTransStatusTab";
// import OutOfStock from "./components/stock/OutOfStock";
// import SortFilter from "@/components/SortFilter/SortFilter";
// import Header from "@/components/header/ProductHeader";
// import axios from "@/utils/axios";
// import { ProductT } from "@/types/Product.types";
// import Atoz from "./components/Atoz";
// import Providers from "./components/Providers";
// import CareType from "./components/CareType";
// import Services from "./components/Services";
// import { FaArrowRight, FaChevronDown } from "react-icons/fa";
// import { Box, CircularProgress } from "@mui/material";

// interface User {
//   firstname: string;
//   lastname: string;
//   email: string;
//   accountType: "buyer" | "seller" | "healthcare" | "logistics";
// }
// interface Business {
//   role: string;
// }

// const Page: React.FC = () => {
//   const [activeTab, setActiveTab] = useState("Orders");
//   const [activePropTab, setActivePropTab] = useState('a-z');
//   const [activeProductTab, setActiveProductTab] = useState('date');
//   const [activeSelectionProp, setActiveSelectionProp] = useState('NNEKA IBE')
//   const [activeArrayTabProp, setActiveArrayTabProp] = useState('IN-PATIENT')
//   const [activeOrderTab, setActiveOrderTab] = useState("IN-STOCK"); // 🟢 For stock tabs
//   const [activeSortFilter, setActiveSortFilter] = useState("date"); // 🟢 For sort filters
//   const sellerFilterTabs = ['a-z', 'brand', 'price']; // Example for sellers
//   const healthcareFilterTabs = ['a-z', 'providers', 'caretype', 'services'];


//   const orderTabs = ["IN-STOCK", "OUT OF STOCK"];
//   const tabs = ["IN-PATIENT", "OUT-PATIENT"]

//   const [user, setUser] = useState<User | null>(null);
//   const [business, setBusiness] = useState<Business | null>(null);
//   const [businessType, setBusinessType] = useState<string | null>("product");
//   const [products, setProducts] = useState<ProductT[] | null>(null); // Updated to array type
//   const [activeButton, setActiveButton] = useState(false);
//   const activeContainerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
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
//         console.log("Full Data", res.data.businesses[0]._id);
//         localStorage.setItem("activeBusiness", res.data.businesses[0]._id);
//         setUser(res.data.user);
//         setBusiness(res.data.business);
//         setProducts(res.data.products); // Ensure this is an array of products
//       })
//       .catch((error) => {
//         console.error("Error fetching profile:", error);
//       });
//   }, []);

//   return (
//     <div className="p-4 md:w-[85%] m-auto mb-80">
//       <Header />
//       {user?.accountType === "seller"?<>
//       <SellerTransStatusTab
//   activeStatTab={activeOrderTab} // ✅ now for "IN-STOCK"/"OUT OF STOCK"
//   setActiveStatTab={setActiveOrderTab}
//   tabs={orderTabs}
// />

// <div className="md:ms-5 flex items-center">
//   <SortFilter
//     setActiveTab={setActiveSortFilter} // ✅ now for sorting
//     activeTab={activeSortFilter}
//   />
// </div></>
//       :''}
      

//       <div className="">
//         {user?.accountType === "seller"
//         ?<><div>
//           {activeOrderTab === "IN-STOCK" && (
//             <>
//               <InStock products={products || []} />
//               {/* {activePropTab === 'a-z' && (
//                 <Atoz setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
//               )}
//               {activePropTab === 'providers' && (
//                 <Providers setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
//               )}
//               {activePropTab === 'caretype' && (
//                 <CareType setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} tab={tabs} setActiveArrayTab={setActiveArrayTabProp} activeArrayTab={activeArrayTabProp} />
//               )}
//               {activePropTab === 'services' && (
//                 <Services setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
//               )} */}
//             </>
//           )}
//           {activeOrderTab === "OUT OF STOCK" && (
//             <>
//             <OutOfStock products={products || []} />
//               {/* {activePropTab === 'a-z' && (
//                 <Atoz setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
//               )}
//               {activePropTab === 'providers' && (
//                 <Providers setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
//               )}
//               {activePropTab === 'caretype' && (
//                 <CareType setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} tab={tabs} setActiveArrayTab={setActiveArrayTabProp} activeArrayTab={activeArrayTabProp} />
//               )}
//               {activePropTab === 'services' && (
//                 <Services setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
//               )} */}
//             </>
//           )}
//         </div></>
//         :user?.accountType === "healthcare" ?<><div>
//           {activeOrderTab === "IN-STOCK" && (
//             <>
//               {activePropTab === 'a-z' && (
//                 <Atoz setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
//               )}
//               {activePropTab === 'providers' && (
//                 <Providers setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
//               )}
//               {activePropTab === 'caretype' && (
//                 <CareType setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} tab={tabs} setActiveArrayTab={setActiveArrayTabProp} activeArrayTab={activeArrayTabProp} />
//               )}
//               {activePropTab === 'services' && (
//                 <Services setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
//               )}
//             </>
//           )}
//           {activeOrderTab === "OUT OF STOCK" && (
//             <>
//               {activePropTab === 'a-z' && (
//                 <Atoz setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
//               )}
//               {activePropTab === 'providers' && (
//                 <Providers setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
//               )}
//               {activePropTab === 'caretype' && (
//                 <CareType setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} tab={tabs} setActiveArrayTab={setActiveArrayTabProp} activeArrayTab={activeArrayTabProp} />
//               )}
//               {activePropTab === 'services' && (
//                 <Services setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
//               )}
//             </>
//           )}
//         </div></>:""}
        
//       </div>
//       <div className={`flex flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white`}>
//           <div onClick={() => setActiveButton(!activeButton)} className="flex flex-col md:p-5 p-2 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer">
//               <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
//                   <p className="font-semibold text-black text-sm">ROUTE DETAILS</p>
//                   <div className="flex gap-3 items-center">
//                       <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeButton ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Ready</div>
//                       <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeButton ? 'rotate-180' : ''}`} />
//                   </div>
//               </div>
//               <div ref={activeContainerRef} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
//                   style={{
//                       height: activeButton ? `${activeContainerRef.current?.scrollHeight}px` : '0px'
//                   }}>
//                   {/* Booking details content (unchanged from your original code) */}
//                   <div className="flex justify-between">
//                       <div className="flex flex-col gap-3">
//                           <p className="text-gray-300 text-sm">Booking Type</p>
//                           <p className="text-black text-md font-light">Consultation Visit</p>
//                       </div>
//                       <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
//                           <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
//                               8:00 AM - 11:00 AM
//                           </div>
//                           <p className="text-md font-light text-black">September 30, 2024</p>
//                       </div>
//                   </div>
//                   <div className="flex justify-between">
//                       <div className="flex flex-col gap-3">
//                           <p className="text-gray-300 text-sm">Specialty</p>
//                           <p className="text-black text-lg font-light">Anesthesiology</p>
//                       </div>
//                       <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
//                           <p className="text-gray-300 text-sm">Location</p>
//                           <p className="text-lg font-light text-black">Umahia, Abia</p>
//                       </div>
//                   </div>
//                   <div className="flex justify-between">
//                       <div className="flex flex-col gap-3">
//                           <p className="text-gray-300 text-sm">Estimted Arrival</p>
//                           <p className="text-black text-lg font-light">11 Hours</p>
//                       </div>
//                       <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
//                           <p className="text-gray-300 text-sm">Approximate Distance</p>
//                           <p className="text-lg font-light text-black">500 km</p>
//                       </div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                       <div className="flex flex-col gap-3">
//                           <p className="text-gray-300 text-sm">Service</p>
//                       </div>
//                       <div className="flex flex-col gap-3 items-start md:w-60 w-40">
//                           <div className='rounded-xl py-1 px-3 bg-[#ff3333bf] text-white'>
//                               Consultation Visit
//                           </div>
//                       </div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                       <div className="flex flex-col gap-3">
//                           <p className="text-gray-300 text-sm">Calculating Price (NGN)</p>
//                       </div>
//                       <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
//                           <div className='rounded-xl py-1 px-3 bg-[#d9dbd7] text-black font-bold text-xl'>
//                               3,000.00
//                           </div>
//                       </div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                       <div className="flex flex-col gap-3">
//                           <p className="text-gray-300 text-sm">Provider</p>
//                       </div>
//                       <div className="flex flex-col gap-3 md:w-60 w-40">
//                           <div className='py-1 px-3'>
//                               GilChrist Health
//                           </div>
//                       </div>
//                   </div>
//               </div>
//           </div>
//           <div className={`w-full gap-2 flex items-center`}>
//               <button className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95">
//                   NEXT
//               </button>
//               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
//                   {/* Use the overallProgress state here */}
//                   <CircularProgress size={60} sx={{ color: '#006838' }} variant='determinate' value={25} />
//                   <FaArrowRight className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[#006838]' />
//               </Box>
//           </div>
//       </div>
//     </div>
//   );
// };

// export default Page;



"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "@/utils/axios";
import { ProductT } from "@/types/Product.types";

import InStock from "./components/stock/InStock";
import OutOfStock from "./components/stock/OutOfStock";
import Header from "@/components/header/ProductHeader";
import SellerTransStatusTab from "@/components/tabs/SellerTransStatusTab";
import SortFilter from "@/components/SortFilter/SortFilter";

// Filter components
import Atoz from "./components/Atoz";
import Providers from "./components/Providers";
import CareType from "./components/CareType";
import Services from "./components/Services";
import StatusFilter from "./components/StatusFilter";
import DateFilter from "./components/DateFilter";
import LocationFilter from "./components/LocationFilter";
import PriceFilter from "./components/PriceFilter";
import ClassCoursesFilter from "./components/ClassCoursesFilter";
import FacilitiesFilter from "./components/FacilitiesFilter";

import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { Box, CircularProgress } from "@mui/material";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller" | "healthcare" | "logistics" | "education" | "legal";
}

interface Business {
  role: string;
}

const Page: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [products, setProducts] = useState<ProductT[] | null>(null);

  const [activeOrderTab, setActiveOrderTab] = useState("IN-STOCK");
  const [activeSortFilter, setActiveSortFilter] = useState("date");
  const [activeFilterTab, setActiveFilterTab] = useState("a-z");
  const [activeSelection, setActiveSelection] = useState("");
  const [activeArrayTab, setActiveArrayTab] = useState("IN-PATIENT");
  const [activeButton, setActiveButton] = useState(false);
  const activeContainerRef = useRef<HTMLDivElement>(null);

  // Filter tab groups by account type
  const filterTabMap: Record<User["accountType"], string[]> = {
    seller: ["date", "status", "location", "price"],
    logistics: ["date", "status", "location", "price"],
    healthcare: ["a-z", "providers", "caretype", "services"],
    legal: ["a-z", "providers", "caretype", "services"],
    education: ["a-z", "class/courses", "facilities"],
    buyer: []
  };

  // Dynamic tab options based on user type
  const userFilterTabs = user ? filterTabMap[user.accountType] || [] : [];

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    axios.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        axios.get("/businesses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Full Data", res.data.businesses[0]._id);
        setUser(res.data.user);
        setBusiness(res.data.business);
        localStorage.setItem("activeBusiness", res.data.businesses[0]._id);
        setProducts(res.data.products);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="p-4 md:w-[85%] m-auto mb-80">
      <Header />

      {/* Show Seller Order Tab and Sort Filter if applicable */}
      {(user?.accountType === "seller" || user?.accountType === "logistics") && (
        <>
          <SellerTransStatusTab
            activeStatTab={activeOrderTab}
            setActiveStatTab={setActiveOrderTab}
            tabs={["IN-STOCK", "OUT OF STOCK"]}
          />
          <div className="md:ms-5 flex items-center">
            <SortFilter activeTab={activeSortFilter} setActiveTab={setActiveSortFilter} />
          </div>
        </>
      )}

      {/* Filter Tabs */}
      {userFilterTabs.length > 0 && (
        <div className="flex gap-3 overflow-x-auto mt-4">
          {userFilterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilterTab(tab)}
              className={`px-4 py-2 rounded-full capitalize ${
                activeFilterTab === tab ? "bg-green-700 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {tab.replace("/", " & ").toUpperCase()}
            </button>
          ))}
        </div>
      )}


      {/* Products or Filters View */}
      <div className="mt-6">
        {/* Seller/Logistics product list */}
        {(user?.accountType === "seller" || user?.accountType === "logistics") && (
          <>
            {activeOrderTab === "IN-STOCK" && <InStock products={products || []} />}
            {activeOrderTab === "OUT OF STOCK" && <OutOfStock products={products || []} />}

            {activeFilterTab === "date" && <DateFilter />}
            {activeFilterTab === "status" && <StatusFilter />}
            {activeFilterTab === "location" && <LocationFilter />}
            {activeFilterTab === "price" && <PriceFilter />}
          </>
        )}

        {/* Healthcare / Legal */}
        {(user?.accountType === "healthcare" || user?.accountType === "legal") && (
          <>
            {activeFilterTab === "a-z" && <Atoz setActiveSelection={setActiveSelection} activeSelection={activeSelection} />}
            {activeFilterTab === "providers" && <Providers setActiveSelection={setActiveSelection} activeSelection={activeSelection} />}
            {activeFilterTab === "caretype" && (
              <CareType
                setActiveSelection={setActiveSelection}
                activeSelection={activeSelection}
                tab={["IN-PATIENT", "OUT-PATIENT"]}
                setActiveArrayTab={setActiveArrayTab}
                activeArrayTab={activeArrayTab}
              />
            )}
            {activeFilterTab === "services" && <Services setActiveSelection={setActiveSelection} activeSelection={activeSelection} />}
          </>
        )}

        {/* Education */}
        {user?.accountType === "education" && (
          <>
            {activeFilterTab === "a-z" && <Atoz setActiveSelection={setActiveSelection} activeSelection={activeSelection} />}
            {activeFilterTab === "class/courses" && <ClassCoursesFilter setActiveSelection={setActiveSelection} activeSelection={activeSelection} />}
            {activeFilterTab === "facilities" && <FacilitiesFilter setActiveSelection={setActiveSelection} activeSelection={activeSelection} />}
          </>
        )}
      </div>

      {/* Footer Booking Section (unchanged) */}
      <div className="flex flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white">
        <div
          onClick={() => setActiveButton(!activeButton)}
          className="flex flex-col md:p-5 p-2 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer"
        >
          <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
            <p className="font-semibold text-black text-sm">ROUTE DETAILS</p>
            <div className="flex gap-3 items-center">
              <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeButton ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Ready</div>
              <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeButton ? 'rotate-180' : ''}`} />
            </div>
          </div>
          <div
            ref={activeContainerRef}
            className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
            style={{ height: activeButton ? `${activeContainerRef.current?.scrollHeight}px` : '0px' }}
          >
            {/* Booking content placeholder */}
            <div className="text-gray-500 text-sm">Booking content goes here.</div>
          </div>
        </div>

        <div className={`w-full gap-2 flex items-center`}>
          <button className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95">
            NEXT
          </button>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <CircularProgress size={60} sx={{ color: '#006838' }} variant="determinate" value={25} />
            <FaArrowRight className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[#006838]" />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Page;
