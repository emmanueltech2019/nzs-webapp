"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "@/utils/axios";
import { ProductT } from "@/types/Product.types";
<<<<<<< HEAD
import { Icon } from '@iconify/react'
=======
import { isAxiosError } from "axios"; // Import AxiosError
>>>>>>> da91199712ecd3746200414ab5aabcc78cafba4a

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
import LegalServices, { AddSpecialty } from "@/app/(account)/user/dashboard/seller/inventory/components/LegalServices";
import LogisticsLocation from "./components/LogisticsLocation";
<<<<<<< HEAD
import { describe } from "node:test";
=======
// import { error } from "console";
import Swal from "sweetalert2";
>>>>>>> da91199712ecd3746200414ab5aabcc78cafba4a

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
  const [addProductProp1, setAddProductProp1] = useState(false);
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
  // Legal service states
  const [isAvailable, setIsAvailable] = useState('available');
  const [specialtyTitle, setSpecialTitle] = useState('');
  const [specialtyDescription, setSpecialDescription] = useState('');
  const [similarSpecialty, setSimilarSpecialty] = useState('CRIMINAL LAW');
  const [servicesAvailable, setServicesAvailable] = useState('CONSULTATION');
  const [procedureType, setProcedureType] = useState('');
  const [providerName1, setProviderName1] = useState('');
  const [providerName2, setProviderName2] = useState('');
  const [providerName3, setProviderName3] = useState('');
  const [providerName4, setProviderName4] = useState('');
  const [providerCategory1, setProviderCategory1] = useState('');
  const [providerCategory2, setProviderCategory2] = useState('');
  const [providerCategory3, setProviderCategory3] = useState('');
  const [providerCategory4, setProviderCategory4] = useState('');
  const [profileUrl1, setProfileUrl1] = useState('');
  const [profileUrl2, setProfileUrl2] = useState('');
  const [profileUrl3, setProfileUrl3] = useState('');
  const [profileUrl4, setProfileUrl4] = useState('');
  const [bookingTitle1, setBookingTitle1] = useState('');
  const [bookingTitle2, setBookingTitle2] = useState('');
  const [bookingTitle3, setBookingTitle3] = useState('');
  const [bookingTitle4, setBookingTitle4] = useState('');
  const [bookingDay1, setBookingDay1] = useState('');
  const [bookingDay2, setBookingDay2] = useState('');
  const [bookingDay3, setBookingDay3] = useState('');
  const [bookingDay4, setBookingDay4] = useState('');
  const [bookingDate1, setBookingDate1] = useState<number>(0);
  const [bookingDate2, setBookingDate2] = useState<number>(0);
  const [bookingDate3, setBookingDate3] = useState<number>(0);
  const [bookingDate4, setBookingDate4] = useState<number>(0);
  const [bookingMonth1, setBookingMonth1] = useState('');
  const [bookingMonth2, setBookingMonth2] = useState('');
  const [bookingMonth3, setBookingMonth3] = useState('');
  const [bookingMonth4, setBookingMonth4] = useState('');
  const [bookingYear1, setBookingYear1] = useState<number>(0);
  const [bookingYear2, setBookingYear2] = useState<number>(0);
  const [bookingYear3, setBookingYear3] = useState<number>(0);
  const [bookingYear4, setBookingYear4] = useState<number>(0);
  const [bookingHours1, setBookingHours1] = useState('00');
  const [bookingHours2, setBookingHours2] = useState('00');
  const [bookingHours3, setBookingHours3] = useState('00');
  const [bookingHours4, setBookingHours4] = useState('00');
  const [bookingMinutes1, setBookingMinutes1] = useState('00');
  const [bookingMinutes2, setBookingMinutes2] = useState('00');
  const [bookingMinutes3, setBookingMinutes3] = useState('00');
  const [bookingMinutes4, setBookingMinutes4] = useState('00');
  const [bookingAmOrPm1, setBookingAmOrPm1] = useState('AM');
  const [bookingAmOrPm2, setBookingAmOrPm2] = useState('AM');
  const [bookingAmOrPm3, setBookingAmOrPm3] = useState('AM');
  const [bookingAmOrPm4, setBookingAmOrPm4] = useState('AM');
  const [specialtyActiveSelection1, setSpecialtyActiveSelection1] = useState('');
  const [specialtyActiveSelection2, setSpecialtyActiveSelection2] = useState('');
  const [providerActiveSelection1, setProviderActiveSelection1] = useState('');
  const [providerActiveSelection2, setProviderActiveSelection2] = useState('');
  const [providerActiveSelection3, setProviderActiveSelection3] = useState('');
  const [providerActiveSelection4, setProviderActiveSelection4] = useState('');
  const [servicesSelection1, setServicesSelection1] = useState('consultation');
  const [servicesSelection2, setServicesSelection2] = useState('consultation');
  const [legalAtozSelection1, setLegalAtozSelection1] = useState('consultation');
  const [legalAtozSelection2, setLegalAtozSelection2] = useState('consultation');
  const [collectValue1, setCollectValue1] = useState(1)
  const [collectValue2, setCollectValue2] = useState(1)
  const [allLegalServicesObject, setAllLegalServicesObject] = useState<any[]>(() => {
    try {
      const storedItem = window.localStorage.getItem('legalServices');
      return storedItem ? JSON.parse(storedItem) : [];
    } catch (error) {
      console.error("Failed to parse localStorage data.");
      return [];
    }
  });

  const legalServicesObject = {
      title: specialtyTitle,
      description: specialtyDescription,
      similarSpecialty: similarSpecialty,
      servicesAvailable: servicesAvailable,
      procedureType: procedureType,
      providerDetails: [
        {
          providerType: [
            {
              name: providerCategory1
            }, {
              name: providerCategory2
            }, {
              name: providerCategory3
            }, {
              name: providerCategory4
            }
          ],
          providerName: [
            {
              name: providerName1,
              profileUrl: profileUrl1,
              date: `${bookingDate1} / ${bookingMonth1} / ${bookingYear1}`,
              time: `${bookingHours1} : ${bookingMinutes1} ${bookingAmOrPm1}`,
              title: bookingTitle1
            }, {
              name: providerName2,
              profileUrl: profileUrl2,
              date: `${bookingDate2} / ${bookingMonth2} / ${bookingYear2}`,
              time: `${bookingHours2} : ${bookingMinutes2} ${bookingAmOrPm2}`,
              title: bookingTitle2
            }, {
              name: providerName3,
              profileUrl: profileUrl3,
              date: `${bookingDate3} / ${bookingMonth3} / ${bookingYear3}`,
              time: `${bookingHours3} : ${bookingMinutes3} ${bookingAmOrPm3}`,
              title: bookingTitle3
            }, {
              name: providerName4,
              profileUrl: profileUrl4,
              date: `${bookingDate4} / ${bookingMonth4} / ${bookingYear4}`,
              time: `${bookingHours4} : ${bookingMinutes4} ${bookingAmOrPm4}`,
              title: bookingTitle4
            }],
        }
      ],
    }

   useEffect(() => {
    try {
      window.localStorage.setItem('legalServices', JSON.stringify(allLegalServicesObject));
    } catch (error) {
      console.error("Failed to save data to localStorage.");
    }
  }, [allLegalServicesObject]);
  
    const handleRemoveService = (index: number) => {
      setAllLegalServicesObject((prevServices) => prevServices.filter((_, i) => i !== index))
    }

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
      .catch(console.error);
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
             <div className="flex justify-between items-center py-3 bg-[#f8f9fe]">
                  <div className="flex gap-4 items-center border-s-4 border-[#29cc39] ps-5 py-2">
                  <p className="font-bold text-[#4d5e80]">NEW SPECIALTY</p>
                  </div>
                  <div onClick={() => {setAddProductProp1(true); console.log(addProductProp1)}} className="flex items-center mx-5 p-2 rounded-full bg-white justify-center">
                  <Icon icon={'mdi:plus'} style={{fontSize: '30px', color:'#d6dae5', cursor: 'pointer'}} />
                  </div>
              </div>
              {addProductProp1 ? (
                <AddSpecialty
                  setSpecialtyActiveSelection1={setSpecialtyActiveSelection1}
                  specialtyActiveSelection1={specialtyActiveSelection1}
                  setSpecialtyActiveSelection2={setSpecialtyActiveSelection2}
                  specialtyActiveSelection2={specialtyActiveSelection2}
                  setProviderActiveSelection1={setProviderActiveSelection1}
                  providerActiveSelection1={providerActiveSelection1}
                  setProviderActiveSelection2={setProviderActiveSelection2}
                  providerActiveSelection2={providerActiveSelection2}
                  setProviderActiveSelection3={setProviderActiveSelection3}
                  providerActiveSelection3={providerActiveSelection3}
                  setProviderActiveSelection4={setProviderActiveSelection4}
                  providerActiveSelection4={providerActiveSelection4}
                  setServicesSelection1={setServicesSelection1}
                  servicesSelection1={servicesSelection1}
                  setServicesSelection2={setServicesSelection2}
                  servicesSelection2={servicesSelection2}
                  activeRoute={activeRouteProp5}
                  setActiveRoute={setActiveRouteProp5}
                  addProduct={addProductProp1}
                  setAddProduct={setAddProductProp1}
                  specialtyTitle={specialtyTitle}
                  setSpecialTitle={setSpecialTitle}
                  specialtyDescription={specialtyDescription}
                  setSpecialDescription={setSpecialDescription}
                  similarSpecialty={similarSpecialty}
                  setSimilarSpecialty={setSimilarSpecialty}
                  servicesAvailable={servicesAvailable}
                  setServicesAvailable={setServicesAvailable}
                  procedureType={procedureType}
                  setProcedureType={setProcedureType}
                  providerName1={providerName1}
                  setProviderName1={setProviderName1}
                  providerName2={providerName2}
                  setProviderName2={setProviderName2}
                  providerName3={providerName3}
                  setProviderName3={setProviderName3}
                  providerName4={providerName4}
                  setProviderName4={setProviderName4}
                  profileUrl1={profileUrl1}
                  setProfileUrl1={setProfileUrl1}
                  profileUrl2={profileUrl2}
                  setProfileUrl2={setProfileUrl2}
                  profileUrl3={profileUrl3}
                  setProfileUrl3={setProfileUrl3}
                  profileUrl4={profileUrl4}
                  setProfileUrl4={setProfileUrl4}
                  providerCategory1={providerCategory1}
                  setProviderCategory1={setProviderCategory1}
                  providerCategory2={providerCategory2}
                  setProviderCategory2={setProviderCategory2}
                  providerCategory3={providerCategory3}
                  setProviderCategory3={setProviderCategory3}
                  providerCategory4={providerCategory4}
                  setProviderCategory4={setProviderCategory4}
                  bookingTitle1={bookingTitle1}
                  setBookingTitle1={setBookingTitle1}
                  bookingTitle2={bookingTitle2}
                  setBookingTitle2={setBookingTitle2}
                  bookingTitle3={bookingTitle3}
                  setBookingTitle3={setBookingTitle3}
                  bookingTitle4={bookingTitle4}
                  setBookingTitle4={setBookingTitle4}
                  bookingDay1={bookingDay1}
                  setBookingDay1={setBookingDay1}
                  bookingDay2={bookingDay2}
                  setBookingDay2={setBookingDay2}
                  bookingDay3={bookingDay3}
                  setBookingDay3={setBookingDay3}
                  bookingDay4={bookingDay4}
                  setBookingDay4={setBookingDay4}
                  bookingDate1={bookingDate1}
                  setBookingDate1={setBookingDate1}
                  bookingDate2={bookingDate2}
                  setBookingDate2={setBookingDate2}
                  bookingDate3={bookingDate3}
                  setBookingDate3={setBookingDate3}
                  bookingDate4={bookingDate4}
                  setBookingDate4={setBookingDate4}
                  bookingMonth1={bookingMonth1}
                  setBookingMonth1={setBookingMonth1}
                  bookingMonth2={bookingMonth2}
                  setBookingMonth2={setBookingMonth2}
                  bookingMonth3={bookingMonth3}
                  setBookingMonth3={setBookingMonth3}
                  bookingMonth4={bookingMonth4}
                  setBookingMonth4={setBookingMonth4}
                  bookingYear1={bookingYear1}
                  setBookingYear1={setBookingYear1}
                  bookingYear2={bookingYear2}
                  setBookingYear2={setBookingYear2}
                  bookingYear3={bookingYear3}
                  setBookingYear3={setBookingYear3}
                  bookingYear4={bookingYear4}
                  setBookingYear4={setBookingYear4}
                  bookingHours1={bookingHours1}
                  setBookingHours1={setBookingHours1}
                  bookingHours2={bookingHours2}
                  setBookingHours2={setBookingHours2}
                  bookingHours3={bookingHours3}
                  setBookingHours3={setBookingHours3}
                  bookingHours4={bookingHours4}
                  setBookingHours4={setBookingHours4}
                  bookingMinutes1={bookingMinutes1}
                  setBookingMinutes1={setBookingMinutes1}
                  bookingMinutes2={bookingMinutes2}
                  setBookingMinutes2={setBookingMinutes2}
                  bookingMinutes3={bookingMinutes3}
                  setBookingMinutes3={setBookingMinutes3}
                  bookingMinutes4={bookingMinutes4}
                  setBookingMinutes4={setBookingMinutes4}
                  bookingAmOrPm1={bookingAmOrPm1}
                  setBookingAmOrPm1={setBookingAmOrPm1}
                  bookingAmOrPm2={bookingAmOrPm2}
                  setBookingAmOrPm2={setBookingAmOrPm2}
                  bookingAmOrPm3={bookingAmOrPm3}
                  setBookingAmOrPm3={setBookingAmOrPm3}
                  bookingAmOrPm4={bookingAmOrPm4}
                  setBookingAmOrPm4={setBookingAmOrPm4}
                  collectValue1={collectValue1}
                  setCollectValue1={setCollectValue1}
                  collectValue2={collectValue2}
                  setCollectValue2={setCollectValue2}
                />
              ) : (
                <>
                  {legalActiveFilterTab === "a-z" && (
                    <LegalAtoz
                      tab={data}
                      value={collectValue1}
                      setServicesSelection1={setLegalAtozSelection1}
                      servicesSelection1={legalAtozSelection1}
                      setServicesSelection2={setLegalAtozSelection2}
                      servicesSelection2={legalAtozSelection2}
                      allLegalServicesObject={allLegalServicesObject}
                      setAllLegalServicesObject={setAllLegalServicesObject}
                      handleRemoveServices={handleRemoveService}
                    />
                  )}
                  {legalActiveFilterTab === "services" && (
                    <LegalServices
                      tab={data}
                      value={collectValue1}
                      setServicesSelection1={setServicesSelection1}
                      servicesSelection1={servicesSelection1}
                      setServicesSelection2={setServicesSelection2}
                      servicesSelection2={servicesSelection2}
                      allLegalServicesObject={allLegalServicesObject}
                      setAllLegalServicesObject={setAllLegalServicesObject}
                      handleRemoveServices={handleRemoveService}
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
                  {legalActiveFilterTab === "date" && (
                    <LegalDate
                      tab={data}
                      activeSelection={activeSelection}
                      setActiveSelection={setActiveSelection}
                    />
                  )}
                </>
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
      {addProductProp1 ? (
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
                <div className="flex flex-col gap-3">
                  <div className="w-full p-2 border-b border-gray-500">
                    Specialty Info
                  </div>
                  <div className="flex justify-between items-center">
                    {/* Booking content placeholder */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {addProductProp1 && lastHospitalityFilter4 ? (
            <button
              onClick={() => {setAddProductProp1(false); setAllLegalServicesObject((prev) => [...prev, legalServicesObject]); setActiveRouteProp5('specialty'); setLegalActiveFilterTab('services')}}
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
