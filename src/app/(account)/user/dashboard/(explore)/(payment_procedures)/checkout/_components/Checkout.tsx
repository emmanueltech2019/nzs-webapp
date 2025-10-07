"use client";
import TagHeader from "@/components/header/TagHeader";
import { useEffect, useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import Link from "next/link";
import AddressModal from "./AddressModal";
import axios from "@/utils/axios";
import Image from "next/image";
import DHLLOGO from "@/assets/images/dhl-express-logo-black.png";
import FEDEXLOGO from "@/assets/images/fedex-logo.png";
import GIGLOGO from "@/assets/images/gig-logo.png";
import REDSTAR from "@/assets/images/redstar.png";

import Swal from "sweetalert2";
import { gigGetPrice, gigLogin } from "@/utils/gigApi";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  accountType: "buyer" | "seller";
  street: string;
  address: {
    town: string;
    city: string;
    state: string;
    zip: string;
  };
}

const CheckoutShipping: React.FC = () => {
  const [selectedShipping, setSelectedShipping] = useState("redstar");
  const [address, setAddress] = useState(""); // Saved Address
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [town, setTown] = useState("");
  const [shippingMethod, setShippingMethod] = useState("third-party");
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [pickupTypes, setPickupTypes] = useState<{ PickupTypeId: number; PickupType: string }[]>([]);
  const [selectedPickupType, setSelectedPickupType] = useState<number | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const handleSelectGig = async () => {
  setSelectedShipping("gig");

  try {
    const token = await gigLogin("naijazoneonline@gmail.com", "MDQwNT-5");

    // 2. Get price
    const pricePayload = {
      SenderStationId: 39,
      ReceiverStationId: 10,
      VehicleType: 1,
      ReceiverLocation: { Latitude: 10.3090, Longitude: 9.8400 },
      SenderLocation: { Latitude: 9.0570, Longitude: 7.4950 },
      IsFromAgility: false,
      CustomerCode: "IND298636", // from login response
      CustomerType: 2, // from login response
      DeliveryOptionIds: [2],
      Value: 2000,
      PickUpOptions: 1,
      ShipmentItems: [
        {
          ItemName: "ABCD",
          Description: "ABCD",
          SpecialPackageId: 0,
          Quantity: 1,
          Weight: 3.5,
          IsVolumetric: false,
          Length: 0,
          Width: 0,
          Height: 0,
          ShipmentType: 1, // Regular
          Value: 1200,
        },
      ],
    };

    const priceResponse = await gigGetPrice(token, pricePayload);

    console.log("GIG Price Response:", priceResponse);

    Swal.fire({
      title: "GIG Shipping Selected",
      text: `Estimated Price: ₦${priceResponse.data.GrandTotal}`,
      icon: "info",
      confirmButtonText: "OK",
    });
  } catch (error) {
    console.error("GIG API Error:", error);
    Swal.fire("Error", "Failed to fetch GIG shipping price", "error");
  }
};
const handleSelectRedStar = async () => {
  setSelectedShipping("redstar");

  try {
    // Fetch Pickup Types
    const res = await axios.get(
      "https://redspeedopenapi.redstarplc.com/api/Operations/PickupTypes",
      {
        headers: {
          "X-API-KEY": "nsZWdsi4hMDDfQmDTv3wCPCcSJloDA-SIyTzl1lcUP8xYJWgUdRN2hMYp-DU",
        },
      }
    );

    setPickupTypes(res.data); // save pickup types to state
  } catch (error) {
    console.error("Error fetching RedStar Pickup Types:", error);
    Swal.fire("Error", "Failed to fetch RedStar Pickup Types", "error");
  }
};
useEffect(() => {
  const getDeliveryFee = async () => {
    if (!selectedPickupType) return;

    try {
      const res = await axios.post(
        "https://redspeedopenapi.redstarplc.com/api/Operations/DeliveryFee",
        {
          senderCity: city, // your sender city
          recipientCity: city, // you may change to recipient city if different
          senderTownID: 0, // update with actual sender town id
          recipientTownID: 0, // update with actual recipient town id
          pickupType: selectedPickupType,
          weight: 1, // replace with actual weight
        },
        {
          headers: {
            "X-API-KEY": "nsZWdsi4hMDDfQmDTv3wCPCcSJloDA-SIyTzl1lcUP8xYJWgUdRN2hMYp-DU",
            "Content-Type": "application/json",
          },
        }
      );

      setDeliveryFee(res.data.TotalAmount); // save delivery fee
    } catch (err) {
      console.error("Error fetching RedStar delivery fee:", err);
    }
  };
  getDeliveryFee();
}, [selectedPickupType, city]);
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
        console.log(res.data.user);
        setUser(res.data.user);
        setAddress(res.data.user.addresses.street);
        setCity(res.data.user.addresses.city);
        setState(res.data.user.addresses.state);
        setZip(res.data.user.addresses.zip);
        setTown(res.data.user.addresses.town);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        if (error?.response?.data?.message === "Unauthorized access") {
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
      });
  }, [showModal]);
  return (
    <>
      {showModal && <AddressModal onClose={() => setShowModal(false)} />}
      <div className="p-6 md:w-[50vw] md:mx-10 lg:mx-0 xl:mx-10 mb-20">
        <TagHeader title="Checkout" />
        {/* Checkout Steps */}
        <div className="flex justify-around mb-8 mx-auto xl:ml-20 ml-12">
          <div className="flex flex-col items-center text-center justify-center mr-auto">
            <div className="w-8 h-8 rounded-full text-[#006838] bg-[#C4EDDA] flex items-center justify-center">
              <CheckOutlinedIcon />
            </div>
            <p className="text-sm font-bold py-2">Your bag</p>
          </div>
          <div className="flex flex-col items-center justify-center mr-auto">
            <div className="w-8 h-8 rounded-full bg-[#006838] flex items-center justify-center text-white">
              2
            </div>
            <p className="text-sm font-bold py-2">Shipping</p>
          </div>
          <div className="flex flex-col items-center text-gray-400 mr-auto">
            <div className="w-8 h-8 rounded-full bg-[#F8F9FE] flex items-center justify-center">
              3
            </div>
            <p className="text-sm font-bold py-2">Payment</p>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-4 border border-gray-300 rounded-lg p-4">
          <div className=" p-5 rounded-lg">
            <div className="flex justify-between">
              <div className="flex item-center space-x-3">
                <div className=" my-auto text-gray-400">
                  <MyLocationOutlinedIcon />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Saved Address</h3>
                  <p className="text-gray-500">Address: {address} </p>
                  <p className="text-gray-500">City: {city} </p>
                  <p className="text-gray-500">State: {state} </p>
                  <p className="text-gray-500">Town: {town} </p>
                </div>
              </div>
              <div className="text-[#006838] my-auto">
                <CheckOutlinedIcon />
              </div>
            </div>
          </div>
          <div className="flex justify-center item-center">
            <button
              className="text-[#006838] mt-2"
              onClick={() => setShowModal(true)}
            >
              + Add Address
            </button>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="mb-4 ">
          <h3 className="text-lg font-semibold mb-4">Pick Shipping Option</h3>
          <div
              className={`p-4 mb-2 rounded-lg border  h-20 text-black ${
                selectedShipping === "redstar"
                  ? "border bg-blue-50 text-black"
                  : "border-gray-300"
              }`}
              onClick={handleSelectRedStar}
            >
              <div className="flex justify-between items-center">
                <Image src={REDSTAR} alt="" width={120} height={20} />
                <p>Red Star Logistics</p>
              </div>
            </div>
            <div
              className={`p-4 mb-2 rounded-lg border ${
                selectedShipping === "gig"
                  ? "border bg-blue-50"
                  : "border-gray-300"
              }`}
              onClick={handleSelectGig}
            >
              <div className="flex justify-between items-center">
                <Image src={GIGLOGO} alt="" width={70} height={20} />
                <p>GIG</p>
              </div>
            </div>
          <div
            className={`p-4 mb-2 rounded-lg border ${
              selectedShipping === "dhl"
                ? "border bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedShipping("dhl")}
          >
            <div className="flex justify-between items-center">
              <Image src={DHLLOGO} alt="" width={100} height={20} />
              <p>DHL</p>
              {/* <p>N 5.00 Max.</p> */}
            </div>
            {/* <p className="text-gray-500 text-sm">5 - 8 days</p> */}
          </div>
          <div
            className={`p-4 rounded-lg border ${
              selectedShipping === "fedex"
                ? "border bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedShipping("fedex")}
          >
            <div className="flex justify-between items-center">
              <Image src={FEDEXLOGO} alt="" width={150} height={120} />
              <p>FEDEX</p>
            </div>
            {/* <p className="text-gray-500 text-sm">1 - 2 days</p> */}
          </div>
          <div className="flex justify-center item-center">

          </div>
        </div>
{selectedShipping === "redstar" && (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">Pickup Type</label>
    <select
      value={selectedPickupType ?? ""}
      onChange={(e) => setSelectedPickupType(Number(e.target.value))}
      className="w-full p-2 border border-gray-300 rounded"
    >
      <option value="">Select Pickup Type</option>
      {pickupTypes.map((pt) => (
        <option key={pt.PickupTypeId} value={pt.PickupTypeId}>
          {pt.PickupType}
        </option>
      ))}
    </select>

    <p className="mt-2 font-semibold">
      Delivery Fee: {deliveryFee !== null ? `₦${deliveryFee}` : "Select pickup type"}
              <div className="mb-4 border border-gray-300 rounded-lg p-4 text-center align-center">
              Shipping Fee:{" "}
              {selectedShipping === "redstar"
                ? `${deliveryFee !== null ? `₦${deliveryFee}` : "Select pickup type"}`
                : selectedShipping === "gig"
                ? "₦3,000"
                : selectedShipping === "dhl"
                ? "₦5,000"
                : selectedShipping === "fedex"
                ? "₦7,000"
                : "Select a shipping method"}
        </div>
    </p>
  </div>
)}

        {/* Private Shipping */}
        {/* <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Private Shipping</h3>
          <div
            className={`p-4 rounded-lg border ${
              shippingMethod === "private"
                ? "border-green-600 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setShippingMethod("private")}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === "private"}
                className="mr-2"
              />
              <p>Private Shipping</p>
            </div>
          </div>
        </div> */}

        {/* Continue Button */}
        <Link href={"./shipping-options"}>
          <button className="w-full bg-[#006838] text-white py-3 rounded-lg">
            Continue
          </button>
        </Link>
      </div>
    </>
  );
};

export default CheckoutShipping;
