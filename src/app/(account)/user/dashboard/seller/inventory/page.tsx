"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import DateTab from "./components/DateTab";
import HospitalityServices from "./components/HospitalityServices";
import HealthFacility from "./components/HealthFacility";
import ClassCourse from "./components/ClassCourse";
import EducationFacilities from "./components/EducationFacilities";
import LegalDate from "./components/LegalDate";
import LegalProviders from "./components/LegalProviders";
import LegalAtoz from "@/app/(account)/user/dashboard/seller/inventory/components/LegalAtoz";
import LegalServices from "@/app/(account)/user/dashboard/seller/inventory/components/LegalServices";
import LogisticsLocation from "./components/LogisticsLocation";
import { error } from "console";
import Swal from "sweetalert2";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType:
    | "buyer"
    | "seller"
    | "health"
    | "logistics"
    | "education"
    | "legal"
    | "hospitality"
    | "E-Commerce";
}

interface Business {
  role: string;
}

const Page: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [products, setProducts] = useState<ProductT[] | null>(null);
  const [activeLocationFilterProp, setActiveLocationFilterProp] = useState("");
  const [activeRouteProp, setActiveRouteProp] = useState("specialty");
  const [activeRouteProp1, setActiveRouteProp1] = useState("facility");
  const [activeRouteProp2, setActiveRouteProp2] = useState("specialty");
  const [activeRouteProp3, setActiveRouteProp3] = useState("course");
  const [activeRouteProp4, setActiveRouteProp4] = useState("facility");
  const [activeRouteProp5, setActiveRouteProp5] = useState("specialty");
  const [addProductProp, setAddProductProp] = useState(false);
  const [activeOrderTab, setActiveOrderTab] = useState("IN-STOCK");
  const [activeSortFilter, setActiveSortFilter] = useState("date");
  const [activeFilterTab, setactiveFilterTab] = useState("a-z");
  const [hospitalityActiveFilterTab, setHospitalityActiveFilterTab] =
    useState("date");
  const [educationActiveFilterTab, setEducationActiveFilterTab] =
    useState("class/courses");
  const [legalActiveFilterTab, setLegalActiveFilterTab] = useState("a-z");
  const [logisticsActiveFilterTab, setLogisticsActiveFilterTab] =
    useState("unit");
  const [activeSelection, setActiveSelection] = useState("fine dining");
  const [activeSelection1, setActiveSelection1] = useState("SENIOR SECONDARY");
  const [activeSelection2, setActiveSelection2] = useState("UMUAHIA");
  const [activeRouteProp6, setActiveRouteProp6] = useState("route-info");
  const [activeArrayTab, setActiveArrayTab] = useState("IN-PATIENT");
  const [activeButton, setActiveButton] = useState(false);
  const activeContainerRef = useRef<HTMLDivElement>(null);
  const [isAvailable, setIsAvailable] = useState('available');
  const [legalServicesTabSpecialInfoProp, setLegalServicesTabSpecialInfoProp] = useState('CRIMINAL LAW')
  const [legalServicesTabSpecialInfoProp1, setLegalServicesTabSpecialInfoProp1] = useState('CONSULTATION')
  const [legalServicesTabSpecialInfoProp2, setLegalServicesTabSpecialInfoProp2] = useState('PARTNER')
  const [legalServicesTabSpecialInfoProp3, setLegalServicesTabSpecialInfoProp3] = useState('PARTNER')
  const [legalServicesTabSpecialInfoProp4, setLegalServicesTabSpecialInfoProp4] = useState('PARTNER')
  const [legalServicesTabSpecialInfoProp5, setLegalServicesTabSpecialInfoProp5] = useState('PARTNER')
  const [legalServicesTabInput1Prop1, setLegalServicesTabInput1Prop11] = useState('')
  const [legalServicesTabInput1Prop2, setLegalServicesTabInput1Prop2] = useState('')
  const [legalServicesTabInput1Prop3, setLegalServicesTabInput1Prop3] = useState('')
  const [countProp, setCountProp] = useState(1);

  // Filter tab groups by account type
  const filterTabMap: Record<User["accountType"], string[]> = {
    seller: ["date", "status", "location", "price"],
    logistics: ["unit", "location", "category", "price"],
    health: ["a-z", "providers", "caretype", "services"],
    legal: ["a-z", "date", "services"],
    education: ["class/courses", "facilities"],
    hospitality: ["date", "facilities", "services"],
    buyer: [],
    "E-Commerce": ["date", "status", "location", "price"],
  };

  const data = ["consultation", "presentation", "advice"];
  const legalData = [
    "asma'u musa",
    "esther pepple",
    "naomi ojo",
    "joseph bankole",
    "daniel orji",
    "simon anozie",
  ];

  const [sector, setSector] = useState("");
  const relevantFilterTypes = ["specialty", "provider", "booking", "preview"];
  const relevantFilterTypes1 = ["facility", "add-media", "booking", "preview"];
  const relevantFilterTypes2 = ["specialty", "facility", "preview"];
  const relevantFilterTypes3 = ["course", "provider", "booking", "preview"];
  const relevantFilterTypes4 = ["facility", "add-media", "preview"];
  const relevantFilterTypes5 = ["specialty", "provider", "booking", "preview"];
  const relevantFilterTypes6 = ["route-info", "pricing", "preview"];
  const [overallProgress, setOverallProgress] = useState(0);
  const [overallProgress1, setOverallProgress1] = useState(0);
  const [overallProgress2, setOverallProgress2] = useState(0);
  const [overallProgress3, setOverallProgress3] = useState(0);
  const [overallProgress4, setOverallProgress4] = useState(0);
  const [overallProgress5, setOverallProgress5] = useState(0);
  const [overallProgress6, setOverallProgress6] = useState(0);

  useEffect(() => {
    const currentIndex = relevantFilterTypes.indexOf(activeRouteProp);
    const totalRelevantFilterTypes = relevantFilterTypes.length;
    if (currentIndex !== -1 && totalRelevantFilterTypes > 0) {
      const calculatedProgress =
        ((currentIndex + 1) / totalRelevantFilterTypes) * 100;
      setOverallProgress(Math.min(100, Math.round(calculatedProgress)));
    } else {
      setOverallProgress(0);
    }
  }, [activeRouteProp, relevantFilterTypes]);

  const handleNextFilterCategory = useCallback(() => {
    const currentIndex = relevantFilterTypes.indexOf(activeRouteProp);
    if (currentIndex !== -1 && currentIndex < relevantFilterTypes.length - 1) {
      setActiveRouteProp(relevantFilterTypes[currentIndex + 1]);
    } else if (currentIndex === relevantFilterTypes.length - 1) {
      console.log("All filter categories have been visited!");
    }
  }, [activeRouteProp, relevantFilterTypes]);

  useEffect(() => {
    const currentIndex = relevantFilterTypes1.indexOf(activeRouteProp1);
    const totalRelevantFilterTypes = relevantFilterTypes1.length;
    if (currentIndex !== -1 && totalRelevantFilterTypes > 0) {
      const calculatedProgress =
        ((currentIndex + 1) / totalRelevantFilterTypes) * 100;
      setOverallProgress1(Math.min(100, Math.round(calculatedProgress)));
    } else {
      setOverallProgress1(0);
    }
  }, [activeRouteProp1, relevantFilterTypes1]);

  const handleNextFilterCategory1 = useCallback(() => {
    const currentIndex = relevantFilterTypes1.indexOf(activeRouteProp1);
    if (currentIndex !== -1 && currentIndex < relevantFilterTypes1.length - 1) {
      setActiveRouteProp1(relevantFilterTypes1[currentIndex + 1]);
    } else if (currentIndex === relevantFilterTypes1.length - 1) {
      console.log("All filter categories have been visited!");
    }
  }, [activeRouteProp1, relevantFilterTypes1]);

  const lastHospitalityFilter =
    activeRouteProp1 === relevantFilterTypes1[relevantFilterTypes1.length - 1];

  useEffect(() => {
    const currentIndex = relevantFilterTypes2.indexOf(activeRouteProp2);
    const totalRelevantFilterTypes = relevantFilterTypes2.length;
    if (currentIndex !== -1 && totalRelevantFilterTypes > 0) {
      const calculatedProgress =
        ((currentIndex + 1) / totalRelevantFilterTypes) * 100;
      setOverallProgress2(Math.min(100, Math.round(calculatedProgress)));
    } else {
      setOverallProgress2(0);
    }
  }, [activeRouteProp2, relevantFilterTypes2]);

  const handleNextFilterCategory2 = useCallback(() => {
    const currentIndex = relevantFilterTypes2.indexOf(activeRouteProp2);
    if (currentIndex !== -1 && currentIndex < relevantFilterTypes2.length - 1) {
      setActiveRouteProp2(relevantFilterTypes2[currentIndex + 1]);
    } else if (currentIndex === relevantFilterTypes2.length - 1) {
      console.log("All filter categories have been visited!");
    }
  }, [activeRouteProp2, relevantFilterTypes2]);

  const lastHospitalityFilter1 =
    activeRouteProp2 === relevantFilterTypes2[relevantFilterTypes2.length - 1];

  useEffect(() => {
    const currentIndex = relevantFilterTypes3.indexOf(activeRouteProp3);
    const totalRelevantFilterTypes = relevantFilterTypes3.length;
    if (currentIndex !== -1 && totalRelevantFilterTypes > 0) {
      const calculatedProgress =
        ((currentIndex + 1) / totalRelevantFilterTypes) * 100;
      setOverallProgress3(Math.min(100, Math.round(calculatedProgress)));
    } else {
      setOverallProgress3(0);
    }
  }, [activeRouteProp3, relevantFilterTypes3]);

  const handleNextFilterCategory3 = useCallback(() => {
    const currentIndex = relevantFilterTypes3.indexOf(activeRouteProp3);
    if (currentIndex !== -1 && currentIndex < relevantFilterTypes3.length - 1) {
      setActiveRouteProp3(relevantFilterTypes3[currentIndex + 1]);
    } else if (currentIndex === relevantFilterTypes3.length - 1) {
      console.log("All filter categories have been visited!");
    }
  }, [activeRouteProp3, relevantFilterTypes3]);

  const lastHospitalityFilter2 =
    activeRouteProp3 === relevantFilterTypes3[relevantFilterTypes3.length - 1];

  useEffect(() => {
    const currentIndex = relevantFilterTypes4.indexOf(activeRouteProp4);
    const totalRelevantFilterTypes = relevantFilterTypes4.length;
    if (currentIndex !== -1 && totalRelevantFilterTypes > 0) {
      const calculatedProgress =
        ((currentIndex + 1) / totalRelevantFilterTypes) * 100;
      setOverallProgress4(Math.min(100, Math.round(calculatedProgress)));
    } else {
      setOverallProgress4(0);
    }
  }, [activeRouteProp4, relevantFilterTypes4]);

  const handleNextFilterCategory4 = useCallback(() => {
    const currentIndex = relevantFilterTypes4.indexOf(activeRouteProp4);
    if (currentIndex !== -1 && currentIndex < relevantFilterTypes4.length - 1) {
      setActiveRouteProp4(relevantFilterTypes4[currentIndex + 1]);
    } else if (currentIndex === relevantFilterTypes4.length - 1) {
      console.log("All filter categories have been visited!");
    }
  }, [activeRouteProp4, relevantFilterTypes4]);

  const lastHospitalityFilter3 =
    activeRouteProp4 === relevantFilterTypes4[relevantFilterTypes4.length - 1];

  useEffect(() => {
    const currentIndex = relevantFilterTypes5.indexOf(activeRouteProp5);
    const totalRelevantFilterTypes = relevantFilterTypes5.length;
    if (currentIndex !== -1 && totalRelevantFilterTypes > 0) {
      const calculatedProgress =
        ((currentIndex + 1) / totalRelevantFilterTypes) * 100;
      setOverallProgress5(Math.min(100, Math.round(calculatedProgress)));
    } else {
      setOverallProgress5(0);
    }
  }, [activeRouteProp5, relevantFilterTypes5]);

  const handleNextFilterCategory5 = useCallback(() => {
    const currentIndex = relevantFilterTypes5.indexOf(activeRouteProp5);
    if (currentIndex !== -1 && currentIndex < relevantFilterTypes5.length - 1) {
      setActiveRouteProp5(relevantFilterTypes5[currentIndex + 1]);
    } else if (currentIndex === relevantFilterTypes5.length - 1) {
      console.log("All filter categories have been visited!");
    }
  }, [activeRouteProp5, relevantFilterTypes5]);

  const lastHospitalityFilter4 =
    activeRouteProp5 === relevantFilterTypes5[relevantFilterTypes5.length - 1];

  useEffect(() => {
    const currentIndex = relevantFilterTypes6.indexOf(activeRouteProp6);
    const totalRelevantFilterTypes = relevantFilterTypes6.length;
    if (currentIndex !== -1 && totalRelevantFilterTypes > 0) {
      const calculatedProgress =
        ((currentIndex + 1) / totalRelevantFilterTypes) * 100;
      setOverallProgress6(Math.min(100, Math.round(calculatedProgress)));
    } else {
      setOverallProgress6(0);
    }
  }, [activeRouteProp6, relevantFilterTypes6]);

  const handleNextFilterCategory6 = useCallback(() => {
    const currentIndex = relevantFilterTypes6.indexOf(activeRouteProp6);
    if (currentIndex !== -1 && currentIndex < relevantFilterTypes6.length - 1) {
      setActiveRouteProp6(relevantFilterTypes6[currentIndex + 1]);
    } else if (currentIndex === relevantFilterTypes6.length - 1) {
      console.log("All filter categories have been visited!");
    }
  }, [activeRouteProp6, relevantFilterTypes6]);

  const lastHospitalityFilter5 =
    activeRouteProp6 === relevantFilterTypes6[relevantFilterTypes6.length - 1];

  // Dynamic tab options based on user type
  const userFilterTabs = user ? filterTabMap[user.accountType] || [] : [];

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return;
    // alert(localStorage.getItem("activeBusiness"))
    axios
      .get(`/users/profile/${localStorage.getItem("activeBusiness")}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .get("/business/get/business", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((businessRes) => {
            setSector(businessRes.data.business.sectors);
            setBusiness(businessRes.data.business);
          });
        setUser(res.data.user);
        setBusiness(res.data.business);
        if (!localStorage.getItem("activeBusiness")) {
          localStorage.setItem("activeBusiness", res.data.businesses[0]._id);
        }
        // setProducts(res.data.products);
      })
      .catch((error)=> {
        if(error.response.data.message==="Unauthorized access"){
                  Swal.fire({
                    title: "Session Expired",
                    text: "Your session has expired. Please log in again.",
                    icon: "warning",
                    confirmButtonText: "OK",
                  }).then(() => {
                    localStorage.clear();
                    window.location.replace("/auth/login");
                  });
                  return;
                }
        console.log(error);
      });
  }, []);
  return (
    <div className="p-4 md:w-[85%] m-auto mb-80">
      <Header />
      <div className="flex items-center w-full">
        <div onClick={() => setIsAvailable('available')} className={`flex justify-center items-center py-3 flex-grow cursor-pointer ${isAvailable === 'available' ? 'border-b-4 border-[#006838]' : 'border-b'}`}>
          AVAILABLE
        </div>
        <div onClick={() => setIsAvailable('not available')} className={`flex justify-center items-center py-3 flex-grow cursor-pointer ${isAvailable === 'not available' ? 'border-b-4 border-[#006838]' : 'border-b'}`}>
          NOT AVAILABLE
        </div>
      </div>

      {isAvailable === 'available' ? (
        <>
          {(sector === "E-Commerce" || sector === "logistics") && (
        <>
          <SellerTransStatusTab
            activeStatTab={activeOrderTab}
            setActiveStatTab={setActiveOrderTab}
            tabs={["IN-STOCK", "OUT OF STOCK"]}
          />
        </>
      )}

      {sector === "health" && (
        <SortFilter
          addProduct={addProductProp}
          setAddProduct={setAddProductProp}
          activeTab={activeFilterTab}
          setActiveTab={setactiveFilterTab}
          sortFilterArray={filterTabMap.health}
        />
      )}
      {sector === "hospitality" && (
        <SortFilter
          addProduct={addProductProp}
          setAddProduct={setAddProductProp}
          activeTab={hospitalityActiveFilterTab}
          setActiveTab={setHospitalityActiveFilterTab}
          sortFilterArray={filterTabMap.hospitality}
        />
      )}
      {sector === "education" && (
        <SortFilter
          addProduct={addProductProp}
          setAddProduct={setAddProductProp}
          activeTab={educationActiveFilterTab}
          setActiveTab={setEducationActiveFilterTab}
          sortFilterArray={filterTabMap.education}
        />
      )}
      {sector === "legal" && (
        <SortFilter
          addProduct={addProductProp}
          setAddProduct={setAddProductProp}
          activeTab={legalActiveFilterTab}
          setActiveTab={setLegalActiveFilterTab}
          sortFilterArray={filterTabMap.legal}
        />
      )}
      {sector === "logistics" && (
        <SortFilter
          addProduct={addProductProp}
          setAddProduct={setAddProductProp}
          activeTab={logisticsActiveFilterTab}
          setActiveTab={setLogisticsActiveFilterTab}
          sortFilterArray={filterTabMap.logistics}
        />
      )}

      {/* Filter Tabs */}

      {/* Products or Filters View */}
      <div className="mt-6">
        {/* Seller product list */}
        {sector === "E-Commerce" && (
          <>
            {activeOrderTab === "IN-STOCK" && (
              <InStock products={products || []} />
              // <></>
            )}
            {activeOrderTab === "OUT OF STOCK" && (
              <OutOfStock products={products || []} />
            )}

            {activeFilterTab === "date" && <DateFilter />}
            {activeFilterTab === "status" && <StatusFilter />}
            {activeFilterTab === "location" && <LocationFilter />}
            {activeFilterTab === "price" && <PriceFilter />}
          </>
        )}

        {/* Healthcare / Legal */}
        {sector === "health" && (
          <>
            {activeFilterTab === "a-z" && (
              <Atoz
                setActiveSelection={setActiveSelection}
                activeSelection={activeSelection}
              />
            )}
            {activeFilterTab === "providers" && (
              <Providers
                setActiveSelection={setActiveSelection}
                activeSelection={activeSelection}
              />
            )}
            {activeFilterTab === "caretype" && (
              <CareType
                setActiveSelection={setActiveSelection}
                activeSelection={activeSelection}
                tab={["IN-PATIENT", "OUT-PATIENT"]}
                setActiveArrayTab={setActiveArrayTab}
                activeArrayTab={activeArrayTab}
                activeRoute={activeRouteProp}
                setActiveRoute={setActiveRouteProp}
                addProduct={addProductProp}
                setAddProduct={setAddProductProp}
              />
            )}
            {activeFilterTab === "services" && (
              <Services
                setActiveSelection={setActiveSelection}
                activeSelection={activeSelection}
              />
            )}
            {activeFilterTab === "date" && (
              <LegalDate
                tab={data}
                activeSelection={activeSelection}
                setActiveSelection={setActiveSelection}
              />
            )}
          </>
        )}

        {sector === "legal" && (
          <>
            {legalActiveFilterTab === "a-z" && (
              <LegalAtoz
                setActiveSelection={setActiveSelection}
                activeSelection={activeSelection}
              />
            )}
            {/* {legalActiveFilterTab === "providers" && (
              <LegalProviders
                setActiveArrayTab={setActiveArrayTab}
                activeArrayTab={activeArrayTab}
                activeRoute={activeRouteProp5}
                setActiveRoute={setActiveRouteProp5}
                tab={legalData}
                addProduct={addProductProp}
                setAddProduct={setAddProductProp}
                setActiveSelection={setActiveSelection}
                activeSelection={activeSelection}
              />
            )} */}
            {legalActiveFilterTab === "services" && (
              <LegalServices
                setActiveArrayTab={setActiveArrayTab}
                activeArrayTab={activeArrayTab}
                activeRoute={activeRouteProp5}
                setActiveRoute={setActiveRouteProp5}
                addProduct={addProductProp}
                setAddProduct={setAddProductProp}
                setLegalServicesTabSpecialInfo={setLegalServicesTabSpecialInfoProp}
                legalServicesTabSpecialInfo={legalServicesTabSpecialInfoProp}
                setLegalServicesTabSpecialInfo1={setLegalServicesTabSpecialInfoProp1}
                legalServicesTabSpecialInfo1={legalServicesTabSpecialInfoProp1}
                setLegalServicesTabSpecialInfo2={setLegalServicesTabSpecialInfoProp2}
                legalServicesTabSpecialInfo2={legalServicesTabSpecialInfoProp2}
                setLegalServicesTabSpecialInfo3={setLegalServicesTabSpecialInfoProp3}
                legalServicesTabSpecialInfo3={legalServicesTabSpecialInfoProp3}
                setLegalServicesTabSpecialInfo4={setLegalServicesTabSpecialInfoProp4}
                legalServicesTabSpecialInfo4={legalServicesTabSpecialInfoProp4}
                setLegalServicesTabSpecialInfo5={setLegalServicesTabSpecialInfoProp5}
                legalServicesTabSpecialInfo5={legalServicesTabSpecialInfoProp5}
                legalServicesTabInput1={legalServicesTabInput1Prop1}
                setLegalServicesTabInput1={setLegalServicesTabInput1Prop11}
                legalServicesTabInput2={legalServicesTabInput1Prop2}
                setLegalServicesTabInput2={setLegalServicesTabInput1Prop2}
                legalServicesTabInput3={legalServicesTabInput1Prop3}
                setLegalServicesTabInput3={setLegalServicesTabInput1Prop3}
                countValue={countProp}
                setCountValue={setCountProp}

              />
            )}
            {legalActiveFilterTab === "date" && (
              <LegalDate
                tab={data}
                activeSelection={activeSelection}
                setActiveSelection={setActiveSelection}
              />
            )}
          </>
        )}

        {sector === "logistics" && (
          <>
            {logisticsActiveFilterTab === "location" && (
              <LogisticsLocation
                setAddProduct={setAddProductProp}
                addProduct={addProductProp}
                activeRoute={activeRouteProp6}
                setActiveRoute={setActiveRouteProp6}
                activeSelection={activeSelection2}
                setActiveSelection={setActiveSelection2}
              />
            )}
          </>
        )}

        {/* Education */}
        {sector === "education" && (
          <>
            {educationActiveFilterTab === "class/courses" && (
              <ClassCourse
                activeRoute={activeRouteProp3}
                setActiveRoute={setActiveRouteProp3}
                addProduct={addProductProp}
                setAddProduct={setAddProductProp}
                setActiveSelection={setActiveSelection1}
                activeSelection={activeSelection1}
              />
            )}
            {educationActiveFilterTab === "facilities" && (
              <EducationFacilities
                activeRoute={activeRouteProp4}
                setActiveRoute={setActiveRouteProp4}
                addProduct={addProductProp}
                setAddProduct={setAddProductProp}
                setActiveSelection={setActiveSelection1}
                activeSelection={activeSelection1}
              />
            )}
          </>
        )}
        {sector === "hospitality" && (
          <>
            {hospitalityActiveFilterTab === "date" && <DateTab />}
            {hospitalityActiveFilterTab === "facilities" && (
              <HealthFacility
                setActiveSelection={setActiveSelection}
                activeSelection={activeSelection}
                activeRoute={activeRouteProp1}
                setActiveRoute={setActiveRouteProp1}
                addProduct={addProductProp}
                setAddProduct={setAddProductProp}
              />
            )}
            {hospitalityActiveFilterTab === "services" && (
              <HospitalityServices
                setActiveSelection={setActiveSelection}
                activeSelection={activeSelection}
                activeRoute={activeRouteProp2}
                setActiveRoute={setActiveRouteProp2}
                addProduct={addProductProp}
                setAddProduct={setAddProductProp}
              />
            )}
          </>
        )}
      </div>

      {activeFilterTab === "caretype" && addProductProp && (
        <div className="flex flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white">
          <div
            onClick={() => setActiveButton(!activeButton)}
            className="flex flex-col md:p-5 p-2 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer"
          >
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
              <p className="font-semibold text-black text-sm">ROUTE DETAILS</p>
              <div className="flex gap-3 items-center">
                <div
                  className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${
                    activeButton ? "bg-[#006838] text-white" : "bg-gray-300"
                  }`}
                >
                  Ready
                </div>
                <FaChevronDown
                  className={`text-sm transition-transform duration-200 ease-in-out text-black ${
                    activeButton ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div
              ref={activeContainerRef}
              className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
              style={{
                height: activeButton
                  ? `${activeContainerRef.current?.scrollHeight}px`
                  : "0px",
              }}
            >
              {/* Booking content placeholder */}
              <div className="text-gray-500 text-sm">
                Booking content goes here.
              </div>
            </div>
          </div>

          <div className={`w-full gap-2 flex items-center`}>
            <button
              onClick={handleNextFilterCategory}
              className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95"
            >
              NEXT
            </button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <CircularProgress
                size={60}
                sx={{ color: "#006838" }}
                variant="determinate"
                value={overallProgress}
              />
              <FaArrowRight className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[#006838]" />
            </Box>
          </div>
        </div>
      )}
      {hospitalityActiveFilterTab === "facilities" && addProductProp && (
        <div className="flex flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white">
          <div
            onClick={() => setActiveButton(!activeButton)}
            className="flex flex-col md:p-5 p-2 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer"
          >
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
              <p className="font-semibold text-black text-sm">ROUTE DETAILS</p>
              <div className="flex gap-3 items-center">
                <div
                  className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${
                    activeButton ? "bg-[#006838] text-white" : "bg-gray-300"
                  }`}
                >
                  Ready
                </div>
                <FaChevronDown
                  className={`text-sm transition-transform duration-200 ease-in-out text-black ${
                    activeButton ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div
              ref={activeContainerRef}
              className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
              style={{
                height: activeButton
                  ? `${activeContainerRef.current?.scrollHeight}px`
                  : "0px",
              }}
            >
              {/* Booking content placeholder */}
              <div className="text-gray-500 text-sm">
                Booking content goes here.
              </div>
            </div>
          </div>

          {lastHospitalityFilter ? (
            <button
              onClick={() => setAddProductProp(false)}
              className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95"
            >
              CONFIRM
            </button>
          ) : (
            <div className={`w-full gap-2 flex items-center`}>
              <button
                onClick={handleNextFilterCategory1}
                className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95"
              >
                NEXT
              </button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <CircularProgress
                  size={60}
                  sx={{ color: "#006838" }}
                  variant="determinate"
                  value={overallProgress1}
                />
                <FaArrowRight className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[#006838]" />
              </Box>
            </div>
          )}
        </div>
      )}
      {hospitalityActiveFilterTab === "services" && addProductProp && (
        <div className="flex flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white">
          <div
            onClick={() => setActiveButton(!activeButton)}
            className="flex flex-col md:p-5 p-2 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer"
          >
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
              <p className="font-semibold text-black text-sm">ROUTE DETAILS</p>
              <div className="flex gap-3 items-center">
                <div
                  className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${
                    activeButton ? "bg-[#006838] text-white" : "bg-gray-300"
                  }`}
                >
                  Ready
                </div>
                <FaChevronDown
                  className={`text-sm transition-transform duration-200 ease-in-out text-black ${
                    activeButton ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div
              ref={activeContainerRef}
              className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
              style={{
                height: activeButton
                  ? `${activeContainerRef.current?.scrollHeight}px`
                  : "0px",
              }}
            >
              <div className="text-gray-500 text-sm">
                Booking content goes here.
              </div>
            </div>
          </div>

          {lastHospitalityFilter1 ? (
            <button
              onClick={() => setAddProductProp(false)}
              className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95"
            >
              CONFIRM
            </button>
          ) : (
            <div className={`w-full gap-2 flex items-center`}>
              <button
                onClick={handleNextFilterCategory2}
                className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95"
              >
                NEXT
              </button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <CircularProgress
                  size={60}
                  sx={{ color: "#006838" }}
                  variant="determinate"
                  value={overallProgress2}
                />
                <FaArrowRight className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[#006838]" />
              </Box>
            </div>
          )}
        </div>
      )}
      {educationActiveFilterTab === "class/courses" && addProductProp && (
        <div className="flex flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white">
          <div
            onClick={() => setActiveButton(!activeButton)}
            className="flex flex-col md:p-5 p-2 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer"
          >
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
              <p className="font-semibold text-black text-sm">ROUTE DETAILS</p>
              <div className="flex gap-3 items-center">
                <div
                  className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${
                    activeButton ? "bg-[#006838] text-white" : "bg-gray-300"
                  }`}
                >
                  Ready
                </div>
                <FaChevronDown
                  className={`text-sm transition-transform duration-200 ease-in-out text-black ${
                    activeButton ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div
              ref={activeContainerRef}
              className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
              style={{
                height: activeButton
                  ? `${activeContainerRef.current?.scrollHeight}px`
                  : "0px",
              }}
            >
              {/* Booking content placeholder */}
              <div className="text-gray-500 text-sm">
                Booking content goes here.
              </div>
            </div>
          </div>

          {addProductProp && lastHospitalityFilter2 ? (
            <button
              onClick={() => setAddProductProp(false)}
              className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95"
            >
              CONFIRM
            </button>
          ) : (
            <div className={`w-full gap-2 flex items-center`}>
              <button
                onClick={handleNextFilterCategory3}
                className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95"
              >
                NEXT
              </button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <CircularProgress
                  size={60}
                  sx={{ color: "#006838" }}
                  variant="determinate"
                  value={overallProgress3}
                />
                <FaArrowRight className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[#006838]" />
              </Box>
            </div>
          )}
        </div>
      )}
      {educationActiveFilterTab === "facilities" && addProductProp && (
        <div className="flex flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white">
          <div
            onClick={() => setActiveButton(!activeButton)}
            className="flex flex-col md:p-5 p-2 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer"
          >
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
              <p className="font-semibold text-black text-sm">ROUTE DETAILS</p>
              <div className="flex gap-3 items-center">
                <div
                  className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${
                    activeButton ? "bg-[#006838] text-white" : "bg-gray-300"
                  }`}
                >
                  Ready
                </div>
                <FaChevronDown
                  className={`text-sm transition-transform duration-200 ease-in-out text-black ${
                    activeButton ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div
              ref={activeContainerRef}
              className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
              style={{
                height: activeButton
                  ? `${activeContainerRef.current?.scrollHeight}px`
                  : "0px",
              }}
            >
              {/* Booking content placeholder */}
              <div className="text-gray-500 text-sm">
                Booking content goes here.
              </div>
            </div>
          </div>

          {addProductProp && lastHospitalityFilter3 ? (
            <button
              onClick={() => setAddProductProp(false)}
              className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95"
            >
              CONFIRM
            </button>
          ) : (
            <div className={`w-full gap-2 flex items-center`}>
              <button
                onClick={handleNextFilterCategory4}
                className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95"
              >
                NEXT
              </button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <CircularProgress
                  size={60}
                  sx={{ color: "#006838" }}
                  variant="determinate"
                  value={overallProgress4}
                />
                <FaArrowRight className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[#006838]" />
              </Box>
            </div>
          )}
        </div>
      )}
      {legalActiveFilterTab === "services" && addProductProp ? (
        <div className="flex flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white">
          <div
            onClick={() => setActiveButton(!activeButton)}
            className="flex flex-col md:p-5 p-2 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer"
          >
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
              <p className="font-semibold text-black text-sm">ROUTE DETAILS</p>
              <div className="flex gap-3 items-center">
                <div
                  className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${
                    activeButton ? "bg-[#006838] text-white" : "bg-gray-300"
                  }`}
                >
                  Ready
                </div>
                <FaChevronDown
                  className={`text-sm transition-transform duration-200 ease-in-out text-black ${
                    activeButton ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div
              ref={activeContainerRef}
              className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
              style={{
                height: activeButton
                  ? `${activeContainerRef.current?.scrollHeight}px`
                  : "0px",
              }}
            >
              {/* Booking content placeholder */}
              <div className="text-gray-500 text-sm flex flex-col gap-5">
                <div className="border-b border-gray-500 py-3 font-bold">
                  Specialty Info
                </div>
                <div className="flex justify-between items-center">
                  <p>Specialty Title:</p>
                  {legalServicesTabInput1Prop1}
                </div>
                <div className="flex justify-between items-center">
                  <p>Description:</p>
                  {legalServicesTabInput1Prop2}
                </div>
                <div className="flex justify-between items-center">
                  <p>Similar Specialties:</p>
                  {legalServicesTabSpecialInfoProp}
                </div>
                <div className="flex justify-between items-center">
                  <p>Services Available:</p>
                  {legalServicesTabSpecialInfoProp1}
                </div>
                <div className="flex justify-between items-center">
                  <p>Procedure Type:</p>
                  {legalServicesTabInput1Prop3}
                </div>
                <div className="border-b border-gray-500 py-3 font-bold">
                  Provider Info
                </div>
                <div className="flex justify-between items-center">
                  <p>ProviderType:</p>
                  <div className="flex flex-col gap-2">
                    {countProp === 1 ? (
                      <>
                        {legalServicesTabSpecialInfoProp2}
                      </>
                    ) : countProp === 2 ? (
                      <>
                        {legalServicesTabSpecialInfoProp2}
                        {legalServicesTabSpecialInfoProp3}
                      </>
                    ) : countProp === 3 ? (
                      <>
                        {legalServicesTabSpecialInfoProp2}
                        {legalServicesTabSpecialInfoProp3}
                        {legalServicesTabSpecialInfoProp4}
                      </>
                    ) : countProp === 4 && (
                      <>
                        {legalServicesTabSpecialInfoProp2}
                        {legalServicesTabSpecialInfoProp3}
                        {legalServicesTabSpecialInfoProp4}
                        {legalServicesTabSpecialInfoProp5}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {addProductProp && lastHospitalityFilter4 ? (
            <button
              onClick={() => setAddProductProp(false)}
              className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95"
            >
              CONFIRM
            </button>
          ) : (
            <div className={`w-full gap-2 flex items-center`}>
              <button
                onClick={handleNextFilterCategory5}
                className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95"
              >
                NEXT
              </button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <CircularProgress
                  size={60}
                  sx={{ color: "#006838" }}
                  variant="determinate"
                  value={overallProgress5}
                />
                <FaArrowRight className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[#006838]" />
              </Box>
            </div>
          )}
        </div>
      ) : (
        null
      )}
      {logisticsActiveFilterTab === "location" && addProductProp && (
        <div className="flex flex-col fixed z-20 bottom-0 md:w-[45%] w-full left-1/2 -translate-x-1/2 mx-auto md:p-5 p-2 gap-2 bg-white">
          <div
            onClick={() => setActiveButton(!activeButton)}
            className="flex flex-col md:p-5 p-2 gap-3 rounded-xl bg-[#ebedeb] cursor-pointer"
          >
            <div className="flex justify-between items-center border-b-[1px] border-gray-300 pb-2">
              <p className="font-semibold text-black text-sm">ROUTE DETAILS</p>
              <div className="flex gap-3 items-center">
                <div
                  className={`rounded-3xl py-1 px-3 flex justify-center items-center text-[10px] ${
                    activeButton ? "bg-[#006838] text-white" : "bg-gray-300"
                  }`}
                >
                  Ready
                </div>
                <FaChevronDown
                  className={`text-sm transition-transform duration-200 ease-in-out text-black ${
                    activeButton ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div
              ref={activeContainerRef}
              className="flex overflow-hidden transition-height duration-200 flex-col gap-4"
              style={{
                height: activeButton
                  ? `${activeContainerRef.current?.scrollHeight}px`
                  : "0px",
              }}
            >
              {/* Booking content placeholder */}
              <div className="text-gray-500 text-sm">
                Booking content goes here.
              </div>
            </div>
          </div>

          {addProductProp && lastHospitalityFilter5 ? (
            <button
              onClick={() => setAddProductProp(false)}
              className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95"
            >
              CONFIRM
            </button>
          ) : (
            <div className={`w-full gap-2 flex items-center`}>
              <button
                onClick={handleNextFilterCategory6}
                className="text-white flex items-center justify-center w-full py-4 rounded-xl bg-[--foreground-green] transition-all duration-200 hover:scale-95"
              >
                NEXT
              </button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <CircularProgress
                  size={60}
                  sx={{ color: "#006838" }}
                  variant="determinate"
                  value={overallProgress6}
                />
                <FaArrowRight className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[#006838]" />
              </Box>
            </div>
          )}
        </div>
      )}
        </>
      ) : (
        <></>
      )}

    </div>
  );
};

export default Page;
