"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "@/utils/axios";
import { ProductT } from "@/types/Product.types";
import { Icon } from "@iconify/react";
import { isAxiosError } from "axios";
import TermsModal from './components/TermsModal';

import InStock from "./components/stock/InStock";
import OutOfStock from "./components/stock/OutOfStock";
import Header from "@/components/header/ProductHeader";
import SellerTransStatusTab from "@/components/tabs/SellerTransStatusTab";
import SortFilter from "@/components/SortFilter/SortFilter";

import Atoz from "./components/Atoz";
import Providers from "./components/Providers";
import CareType from "./components/CareType";
import Services from "./components/Services";
import StatusFilter from "./components/StatusFilter";
import DateFilter from "./components/DateFilter";
import LocationFilter from "./components/LocationFilter";
import PriceFilter from "./components/PriceFilter";
import DateTab from "./components/DateTab";
import HospitalityServices from "./components/HospitalityServices";
import HealthFacility from "./components/HealthFacility";
import ClassCourse from "./components/ClassCourse";
import EducationFacilities from "./components/EducationFacilities";
import LegalDate from "./components/LegalDate";
import LegalAtoz from "@/app/(account)/user/dashboard/seller/inventory/components/LegalAtoz";
import LogisticsLocation from "./components/LogisticsLocation";
import Swal from "sweetalert2";
import VerificationModal from "@/components/modals/verificationModal";
import AddButton from "./custom-components/AddButton";
import { useProvider } from "@/context/ServicesContext";
import AddHealth from "./components/AddHealth";
import AddHospitality from "./components/AddHospitality";
import AddEducation from "./components/AddEducation";
import AddLegalServices from "./components/AddLegalServices";
import LegalServices from "./components/LegalServices";
interface User {
  firstname: string;
  lastname: string;
  email: string;
  profilePicture?: string;
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
  contract: boolean
}

const Page: React.FC = () => {
  const {addHealthButton, setAddHealthButton, setAddHospitalityButton, addHospitalityButton, addClass, setAddClass, setAddLegalServices, addLegalServices} = useProvider()
  const [businessVerified, setBusinessVerified] = useState(false);
  const [adminVerified, setAdminVerified] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [PayForVerificationModal, setPayForVerificationModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [products, setProducts] = useState<ProductT[] | null>(null);
  const [activeRouteProp2, setActiveRouteProp2] = useState("specialty");
  const [addProductProp, setAddProductProp] = useState(false);
  const [activeOrderTab, setActiveOrderTab] = useState("IN-STOCK");
  const [activeFilterTab, setactiveFilterTab] = useState("a-z");
  const [hospitalityActiveFilterTab, setHospitalityActiveFilterTab] =
    useState("date");
  const [educationActiveFilterTab, setEducationActiveFilterTab] =
    useState("class/courses");
  const [legalActiveFilterTab, setLegalActiveFilterTab] = useState("a-z");
  const [logisticsActiveFilterTab, setLogisticsActiveFilterTab] =
    useState("unit");
  const [activeSelection, setActiveSelection] = useState("fine dining");
  const [activeSelection2, setActiveSelection2] = useState("UMUAHIA");
  const [activeRouteProp6, setActiveRouteProp6] = useState("route-info");
  // Legal service states
  const [isAvailable, setIsAvailable] = useState("available");
  const [allLegalServicesObject, setAllLegalServicesObject] = useState<any[]>(
    () => {
      try {
        const storedItem = window.localStorage.getItem("legalServices");
        return storedItem ? JSON.parse(storedItem) : [];
      } catch (error) {
        console.error("Failed to parse localStorage data.");
        return [];
      }
    }
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "legalServices",
        JSON.stringify(allLegalServicesObject)
      );
    } catch (error) {
      console.error("Failed to save data to localStorage.");
    }
  }, [allLegalServicesObject]);

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

  const [sector, setSector] = useState("");
  const fetchProducts = async () => {
      try {
        let businessId = localStorage.getItem("activeBusiness");
        const response = await axios({
          url: `/products/vendor/?for=instock&page=1&limit=100&businessId=${businessId}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });

        setProducts(response.data.products || []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error fetching products:",
            error.response?.data || error.message
          );
        } else {
          console.error("Error fetching products:", error);
        }
      }
    };
  const getActiveBusiness = () => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    // Check for active business in localStorage
    let activeBusinessId = localStorage.getItem("activeBusiness");

    if (!activeBusinessId) {
      // No active business → fetch all businesses
      axios
        .get(`/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("res111", res);
          setUser(res.data.user);

          if (res.data.businesses?.length > 0) {
            const firstBusinessId = res.data.businesses[0]._id;
            localStorage.setItem("activeBusiness", firstBusinessId);
            activeBusinessId = firstBusinessId;

            // Fetch that business details
            axios
              .get(`/business/${firstBusinessId}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((businessRes) => {
                setSector(businessRes.data.business.sectors);
                setBusiness(businessRes.data.business);
                // console.log("businessRes", businessRes);
              });
          } else {
            Swal.fire({
              icon: "error",
              title: "No Business Found",
              text: "Please create a business to continue.",
            }).then(() => {
              window.location.href =
                "/account/user/dashboard/seller/create-business";
            });
          }
        })
        .catch(console.error);
    } else {
      axios
        .get(`/users/profile/${activeBusinessId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setWalletBalance(res.data.wallet.balance);
          setUser(res.data.user);
          axios
            .get(`/business/${activeBusinessId}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((businessRes) => {
              setSector(businessRes.data.business.sectors);
              setBusiness(businessRes.data.business);
              setBusinessVerified(businessRes.data.business.paidVerification);
              setAdminVerified(businessRes.data.business.approved);
            });
        })
        .catch(console.error);
    }
  };

  const handlePayForVerification = () => {
    if (!user?.profilePicture || user.profilePicture.trim() === "") {
    alert("Please upload a profile picture before proceeding with verification.");
    return;
  }

  if (!products || products.length <= 0) {
    alert("Please add at least one product before verifying your profile.");
    alert(products?.length)
    return;
  }

    setPayForVerificationModal(true);
  };
  const onClose = () => {
    setPayForVerificationModal(false);
  }
  const onPayForVerification = () => {
    setPayForVerificationModal(true);
    axios({
      url: `/business/seller-verification/${localStorage.getItem("activeBusiness")}`,
      method: "POST", 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log("res", res);
        if (res.data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Your business is now verified.",
          }).then(() => {
            // setBusinessVerified(true);
            setPayForVerificationModal(false);
            getActiveBusiness();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Payment Failed",
            text: res.data.message || "Please try again.",
          });
        }
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          Swal.fire({
            icon: "error",
            title: "Payment Error",
            text:
              error.response?.data?.message ||
              "An error occurred during payment. Please try again.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Payment Error",
            text: "An unexpected error occurred. Please try again.",
          });
        } 
    })
  }
const handleAgree = () => {
    // maybe update backend or localStorage here
    axios({
      url: `/business/sign-contract/${localStorage.getItem("activeBusiness")}`,
      method: "POST",
       headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log("res", res);
        if (res.data.success === true) {
          Swal.fire({
            icon: "success",
            title: "Thank You",
            text: "You have agreed to the terms and conditions.",
            confirmButtonText: "Thank You",  // Custom button text
            confirmButtonColor: "#16a34a",
          }).then(() => {
            // setBusinessVerified(true);
            // setPayForVerificationModal(false);
            getActiveBusiness();
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Action Failed",
            text: res.data.message || "Please try again.",
            confirmButtonColor: "#16a34a",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        if (isAxiosError(error)) {
          Swal.fire({
            icon: "error",
            title: "Action Error",
            text:
              error.response?.data?.message ||
              "An error occurred. Please try again.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Action Error",
            text: "An unexpected error occurred. Please try again.",
          });
        }
      });
    console.log("User agreed to terms ✅");
  };
  useEffect(() => {
  // Run once on mount
  getActiveBusiness();
  fetchProducts();

  // Optional: refresh every 10 seconds
  const interval = setInterval(() => {
    getActiveBusiness();
    fetchProducts();
  }, 10000);

  // Cleanup: clear interval on unmount
  return () => clearInterval(interval);
}, []); // ✅ Empty dependency so it runs only once
  return (
    <div className="p-4 md:w-[85%] m-auto mb-80">
        <VerificationModal isVisible={PayForVerificationModal} walletBalance={walletBalance} onClose={onClose} onPayForVerification={onPayForVerification} />
     {!businessVerified ? (
  // ❌ Business not verified — Ask to pay
  <div
    className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 shadow-md flex items-center justify-between rounded-lg mx-auto max-w-4xl"
    role="alert"
  >
    <div className="flex items-center space-x-3">
      <svg
        className="w-6 h-6 text-yellow-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.332 16c-.77 1.333.192 3 1.732 3z"
        ></path>
      </svg>
      <p className="font-medium text-sm md:text-base">
        Your profile is not verified. Please complete payment to unlock full features.
      </p>
    </div>

    <button
      onClick={handlePayForVerification}
      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold rounded-md transition duration-150 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
    >
      Pay Now
    </button>
  </div>
) : adminVerified ? (
  // ✅ Fully verified
  <div
    className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 shadow-md flex items-center justify-between rounded-lg mx-auto max-w-4xl"
    role="alert"
  >
    <div className="flex items-center space-x-3">
      <svg
        className="w-6 h-6 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
      <p className="font-medium text-sm md:text-base">
        🎉 You are fully verified and ready to access all features!
      </p>
    </div>
  </div>
) : (
  // ⏳ Admin verification pending
  <div
    className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 shadow-md flex items-center justify-between rounded-lg mx-auto max-w-4xl"
    role="alert"
  >
    <div className="flex items-center space-x-3">
      <svg
        className="w-6 h-6 text-yellow-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.332 16c-.77 1.333.192 3 1.732 3z"
        ></path>
      </svg>
      <p className="font-medium text-sm md:text-base">
        Admins are working on verifying your business profile. You will be notified once the process is complete.
      </p>
    </div>
  </div>
)}

      <Header />
      {sector === "legal" ? (
        <div className="flex items-center w-full">
          <div
            onClick={() => setIsAvailable("available")}
            className={`flex justify-center items-center py-3 flex-grow cursor-pointer ${
              isAvailable === "available"
                ? "border-b-4 border-[#006838]"
                : "border-b"
            }`}
          >
            AVAILABLE
          </div>
          <div
            onClick={() => setIsAvailable("not available")}
            className={`flex justify-center items-center py-3 flex-grow cursor-pointer ${
              isAvailable === "not available"
                ? "border-b-4 border-[#006838]"
                : "border-b"
            }`}
          >
            NOT AVAILABLE
          </div>
        </div>
      ) : (
        ""
      )}
      <TermsModal contract={business?.contract ?? true} onAgree={handleAgree} />

      {isAvailable === "available" ? (
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
          {sector === "logistics" && (
            <SortFilter
              addProduct={addProductProp}
              setAddProduct={setAddProductProp}
              activeTab={logisticsActiveFilterTab}
              setActiveTab={setLogisticsActiveFilterTab}
              sortFilterArray={filterTabMap.logistics}
            />
          )}

          <div className="mt-6">
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

            {sector === "health" && (
              <>
                {addHealthButton ? (
                  <AddHealth />
                ) : (
                  <>
                    {sector === "health" && (
                      <SortFilter
                        addProduct={addProductProp}
                        setAddProduct={setAddProductProp}
                        activeTab={activeFilterTab}
                        setActiveTab={setactiveFilterTab}
                        sortFilterArray={filterTabMap.health}
                      />
                    )}
                    <AddButton handleClick={() => setAddHealthButton(true)} />
                    <>
                      {activeFilterTab === "a-z" && (
                        <Atoz />
                      )}
                      {activeFilterTab === "providers" && (
                        <Providers
                        />
                      )}
                      {activeFilterTab === "caretype" && (
                        <CareType />
                      )}
                      {activeFilterTab === "services" && (
                        <Services
                          setActiveSelection={setActiveSelection}
                          activeSelection={activeSelection}
                        />
                      )}
                      {activeFilterTab === "date" && (
                        <LegalDate
                        />
                      )}
                    </>
                  </>
                )}
              </>
            )}

            {sector === "legal" && (
              <>
                <SortFilter
                  addProduct={addProductProp}
                  setAddProduct={setAddProductProp}
                  activeTab={legalActiveFilterTab}
                  setActiveTab={setLegalActiveFilterTab}
                  sortFilterArray={filterTabMap.legal}
                />
                <AddButton handleClick={() => setAddLegalServices(true)} />
                {addLegalServices ? (
                  <AddLegalServices />
                ) : (
                  <>
                    {legalActiveFilterTab === "a-z" && (
                      <LegalAtoz
                      />
                    )}
                    {legalActiveFilterTab === "services" && (
                      <LegalServices
                      />
                    )}

                    {legalActiveFilterTab === "date" && (
                      <LegalDate
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

            {sector === "education" && (
              <>
                {addClass ? (
                  <AddEducation />
                ) : (
                  <>
                    <SortFilter
                      addProduct={addProductProp}
                      setAddProduct={setAddProductProp}
                      activeTab={educationActiveFilterTab}
                      setActiveTab={setEducationActiveFilterTab}
                      sortFilterArray={filterTabMap.education}
                    />
                    <AddButton handleClick={() => setAddClass(true)} />
                    {educationActiveFilterTab === "class/courses" && (
                      <ClassCourse
                      />
                    )}
                    {educationActiveFilterTab === "facilities" && (
                      <EducationFacilities
                      />
                    )}
                  </>
                )}
              </>
            )}
            {sector === "hospitality" && (
              <>
                {addHospitalityButton ? (
                  <AddHospitality />
                ) : (
                  <>
                    <AddButton handleClick={() => setAddHospitalityButton(true)} />
                    <SortFilter
                      addProduct={addProductProp}
                      setAddProduct={setAddProductProp}
                      activeTab={hospitalityActiveFilterTab}
                      setActiveTab={setHospitalityActiveFilterTab}
                      sortFilterArray={filterTabMap.hospitality}
                    />
                    {hospitalityActiveFilterTab === "date" && <DateTab />}
                    {hospitalityActiveFilterTab === "facilities" && (
                      <HealthFacility
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
              </>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
