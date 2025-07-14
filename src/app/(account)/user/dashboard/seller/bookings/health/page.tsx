"use client";
import React, { useEffect, useRef, useState } from "react";
import InStock from "./components/stock/InStock";
import SellerTransStatusTab from "@/components/tabs/SellerTransStatusTab";
import OutOfStock from "./components/stock/OutOfStock";
import SortFilter from "@/components/SortFilter/SortFilter";
import Header from "@/components/header/ProductHeader";
import axios from "@/utils/axios";
import { ProductT } from "@/types/Product.types";
import Atoz from "./components/Atoz";
import Providers from "./components/Providers";
import CareType from "./components/CareType";
import Services from "./components/Services";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { Box, CircularProgress } from "@mui/material";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller";
}
interface Business {
  role: string;
}

const page: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Orders");
  const [activeOrderTab, setActiveOrderTab] = useState("IN-STOCK");
  const [activePropTab, setActivePropTab] = useState('a-z');
  const [activeSelectionProp, setActiveSelectionProp] = useState('NNEKA IBE')
  const [activeArrayTabProp, setActiveArrayTabProp] = useState('IN-PATIENT')

  const orderTabs = ["IN-STOCK", "OUT OF STOCK"];
  const tabs = ["IN-PATIENT", "OUT-PATIENT"]

  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [businessType, setBusinessType] = useState<string | null>("product");
  const [products, setProducts] = useState<ProductT[] | null>(null); // Updated to array type
  const [activeButton, setActiveButton] = useState(false);
  const activeContainerRef = useRef<HTMLDivElement>(null)

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
        console.log("Full Data", res.data.businesses[0]._id);
        localStorage.setItem("activeBusiness", res.data.businesses[0]._id);
        setUser(res.data.user);
        setBusiness(res.data.business);
        setProducts(res.data.products); // Ensure this is an array of products
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  return (
    <div className="p-4 md:w-[85%] m-auto mb-80">
      <Header />
      <SellerTransStatusTab
        activeStatTab={activeOrderTab}
        setActiveStatTab={setActiveOrderTab}
        tabs={orderTabs}
      />
      <div className="md:ms-5 flex items-center">
        <SortFilter setActiveTab={setActivePropTab} activeTab={activePropTab} />
      </div>

      <div className="">
        {user?.accountType === "seller"}
        <div>
          {activeOrderTab === "IN-STOCK" && (
            <>
              {activePropTab === 'a-z' && (
                <Atoz setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
              )}
              {activePropTab === 'providers' && (
                <Providers setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
              )}
              {activePropTab === 'caretype' && (
                <CareType setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} tab={tabs} setActiveArrayTab={setActiveArrayTabProp} activeArrayTab={activeArrayTabProp} />
              )}
              {activePropTab === 'services' && (
                <Services setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
              )}
            </>
          )}
          {activeOrderTab === "OUT OF STOCK" && (
            <>
              {activePropTab === 'a-z' && (
                <Atoz setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
              )}
              {activePropTab === 'providers' && (
                <Providers setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
              )}
              {activePropTab === 'caretype' && (
                <CareType setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} tab={tabs} setActiveArrayTab={setActiveArrayTabProp} activeArrayTab={activeArrayTabProp} />
              )}
              {activePropTab === 'services' && (
                <Services setActiveSelection={setActiveSelectionProp} activeSelection={activeSelectionProp} />
              )}
            </>
          )}
        </div>
      </div>
      <div className={`flex flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white`}>
          <div onClick={() => setActiveButton(!activeButton)} className="flex flex-col md:p-5 p-2 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer">
              <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
                  <p className="font-semibold text-black text-sm">ROUTE DETAILS</p>
                  <div className="flex gap-3 items-center">
                      <div className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${activeButton ? 'bg-[#006838] text-white' : 'bg-gray-300'}`}>Ready</div>
                      <FaChevronDown className={`text-sm transition-transform duration-200 ease-in-out text-black ${activeButton ? 'rotate-180' : ''}`} />
                  </div>
              </div>
              <div ref={activeContainerRef} className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
                  style={{
                      height: activeButton ? `${activeContainerRef.current?.scrollHeight}px` : '0px'
                  }}>
                  {/* Booking details content (unchanged from your original code) */}
                  <div className="flex justify-between">
                      <div className="flex flex-col gap-3">
                          <p className="text-gray-300 text-sm">Booking Type</p>
                          <p className="text-black text-md font-light">Consultation Visit</p>
                      </div>
                      <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                          <div className='rounded-md py-1 px-3 border-[0.05px] border-[#006838] bg-white text-black text-sm'>
                              8:00 AM - 11:00 AM
                          </div>
                          <p className="text-md font-light text-black">September 30, 2024</p>
                      </div>
                  </div>
                  <div className="flex justify-between">
                      <div className="flex flex-col gap-3">
                          <p className="text-gray-300 text-sm">Specialty</p>
                          <p className="text-black text-lg font-light">Anesthesiology</p>
                      </div>
                      <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                          <p className="text-gray-300 text-sm">Location</p>
                          <p className="text-lg font-light text-black">Umahia, Abia</p>
                      </div>
                  </div>
                  <div className="flex justify-between">
                      <div className="flex flex-col gap-3">
                          <p className="text-gray-300 text-sm">Estimted Arrival</p>
                          <p className="text-black text-lg font-light">11 Hours</p>
                      </div>
                      <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                          <p className="text-gray-300 text-sm">Approximate Distance</p>
                          <p className="text-lg font-light text-black">500 km</p>
                      </div>
                  </div>
                  <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-3">
                          <p className="text-gray-300 text-sm">Service</p>
                      </div>
                      <div className="flex flex-col gap-3 items-start md:w-60 w-40">
                          <div className='rounded-xl py-1 px-3 bg-[#ff3333bf] text-white'>
                              Consultation Visit
                          </div>
                      </div>
                  </div>
                  <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-3">
                          <p className="text-gray-300 text-sm">Calculating Price (NGN)</p>
                      </div>
                      <div className="flex flex-col gap-3 md:w-60 w-40 items-start">
                          <div className='rounded-xl py-1 px-3 bg-[#d9dbd7] text-black font-bold text-xl'>
                              3,000.00
                          </div>
                      </div>
                  </div>
                  <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-3">
                          <p className="text-gray-300 text-sm">Provider</p>
                      </div>
                      <div className="flex flex-col gap-3 md:w-60 w-40">
                          <div className='py-1 px-3'>
                              GilChrist Health
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className={`w-full gap-2 flex items-center`}>
              <button className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95">
                  NEXT
              </button>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                  {/* Use the overallProgress state here */}
                  <CircularProgress size={60} sx={{ color: '#006838' }} variant='determinate' value={25} />
                  <FaArrowRight className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[#006838]' />
              </Box>
          </div>
      </div>
    </div>
  );
};

export default page;
