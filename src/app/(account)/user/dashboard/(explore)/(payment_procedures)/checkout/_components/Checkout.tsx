"use client";
import TagHeader from "@/components/header/TagHeader";
import { useEffect, useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
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
  phone: string;
  address: {
    town: string;
    city: string;
    state: string;
    zip: string;
    street: string;
  };
}

interface Product {
  _id: string;
  name: string;
  weight?: number;
  price?: number;
  businessId: string;
  description: string;
  quantityInfo: {
    weight: number;
  };
  quantity: number;
}

interface CartItem {
  productId: Product;
  quantity: number;
  //   productId: {
  //   _id: string;
  //   name: string;
  //   description: string;
  //   weight: number;
  //   price: number;
  //   businessId: string; // Vendor ID
  // };
}
interface VendorPayload {
  businessId: string;
  items: CartItem[];
}
const CheckoutShipping: React.FC = () => {
  const [selectedShipping, setSelectedShipping] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [town, setTown] = useState("");
  const [townId, setTownId] = useState("");
  const [shippingMethod, setShippingMethod] = useState("third-party");
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [pickupTypes, setPickupTypes] = useState<
    { PickupTypeId: number; PickupType: string }[]
  >([]);
  const [selectedPickupType, setSelectedPickupType] = useState<number | null>(
    null
  );
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [groupedItems, setGroupedItems] = useState<Record<string, CartItem[]>>(
    {}
  );
  const [mergedRequest, setMergedRequest] = useState<any>(null); // optional combined request
  const [loadingDeliveryFee, setLoadingDeliveryFee] = useState(false);
  const [vendors, setVendors] = useState<Record<string, any>>({});

  // 🟢 Fetch user and address
  useEffect(() => {
    if (!localStorage.getItem("userToken")) return;

    axios
      .get("/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        const u = res.data.user;
        setUser(u);
        setAddress(u.addresses.street);
        setCity(u.addresses.city);
        setState(u.addresses.state);
        setZip(u.addresses.zip);
        setTown(u.addresses.town);
        setTownId(u.addresses.townId);
        setCityName(u.addresses.cityName);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [showModal]);
  const fetchVendors = async (grouped: Record<string, CartItem[]>) => {
    const vendorData: Record<string, any> = {};

    for (const businessId of Object.keys(grouped)) {
      try {
        const res = await axios.get(`/business/${businessId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        vendorData[businessId] = res.data.business; // Store vendor info
      } catch (err) {
        console.error(`Error fetching vendor ${businessId}:`, err);
        vendorData[businessId] = null; // optional fallback
      }
    }

    setVendors(vendorData);
  };
  // 🟢 Fetch Cart and Group by businessId
  useEffect(() => {
    axios({
      method: "GET",
      url: "cart",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        const items = res.data?.cart?.items ?? []; // Ensure it's always an array
        setCartItems(items);

        // ✅ Group items by businessId
        const grouped: Record<string, CartItem[]> = {};
        for (const item of items) {
          const businessId = item?.productId?.businessId || "unknown";
          if (!grouped[businessId]) grouped[businessId] = [];
          grouped[businessId].push(item);
        }

        setGroupedItems(grouped);
        fetchVendors(grouped);

        // ✅ Optional: Merge all groups into one delivery request
        const merged = Object.keys(grouped).map((businessId) => {
          const shipmentItems = grouped[businessId].map((i) => ({
            id: 0,
            status: 0,
            createdOn: new Date().toISOString(),
            createdBy: user?.firstname || "unknown",
            shipmentId: 0,
            commodity: i.productId.name,
            description: i.productId.name,
            countryOfManufacturing: "Nigeria",
            quantity: i.quantity,
            weight: i.productId.weight || 1,
            unitOfMeasure: 1,
            unitOfPrice: i.productId.price || 0,
          }));

          return {
            senderCity: city,
            recipientCity: city,
            recipientTownID: 0,
            recipientName: `${user?.firstname} ${user?.lastname}`,
            recipientPhoneNo: user?.phone,
            recipientEmail: user?.email,
            recipientAddress: address,
            recipientState: state,
            senderTownID: 0,
            senderName: user?.firstname,
            senderAddress: address,
            senderPhone: "08012345678",
            orderNo: Math.random().toString(36).substring(2, 10).toUpperCase(),
            packaging: "Box",
            boxandCrating: "Standard",
            deliveryType: "Express",
            description: "Multiple shipment",
            onforwardingLocation: "",
            paymentType: "Prepaid",
            pickupType: selectedPickupType || 0,
            weight: shipmentItems.reduce((sum, i) => sum + i.weight, 0),
            pieces: shipmentItems.length,
            cashOnDelivery: 0,
            shipmentItems,
          };
        });

        // Merge into one master object (optional layer)
        setMergedRequest({
          shipments: merged,
          totalWeight: merged.reduce((sum, m) => sum + m.weight, 0),
        });
      })
      .catch((err) => console.error("Cart fetch error:", err));
  }, [user, selectedPickupType]);

  // 🟢 RedStar Pickup
  const handleSelectRedStar = async () => {
    setSelectedShipping("redstar");
    let REDSTAR_API_KEY = process.env.NEXT_PUBLIC_REDSTAR_API_KEY;
    try {
      const res = await axios.get(
        "http://redspeedopenapi.redstarplc.com/api/Operations/PickupTypes",
        {
          headers: { "X-API-KEY": REDSTAR_API_KEY },
        }
      );
      setPickupTypes(res.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch RedStar Pickup Types", "error");
    }
  };

  //   // Group items by businessId
  const groupItemsByBusiness = (items: CartItem[]): VendorPayload[] => {
    const groups: { [key: string]: CartItem[] } = {};
    for (const item of items) {
      console.log("item:", item);
      const businessId = item.productId.businessId;
      if (!groups[businessId]) groups[businessId] = [];
      groups[businessId].push(item);
    }
    return Object.entries(groups).map(([businessId, items]) => ({
      businessId,
      items,
    }));
  };
  //   // Fetch vendor details and calculate delivery fee
  useEffect(() => {
    const getDeliveryFee = async () => {
      if (
        !selectedPickupType ||
        selectedShipping !== "redstar" ||
        cartItems.length === 0
      )
        return;
      setLoadingDeliveryFee(true);

      const REDSTAR_API_KEY = process.env.NEXT_PUBLIC_REDSTAR_API_KEY;
      const groupedVendors = groupItemsByBusiness(cartItems);
      console.log("groupedVendors:", groupedVendors);
      let totalFee = 0;

      try {
        for (const vendor of groupedVendors) {
          // Fetch vendor details
          const vendorRes = await axios({
            method: "GET",
            url: `/business/${vendor.businessId}`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          });
          console.log("vendorRes:", vendorRes.data.business.addresses);
          const v = vendorRes.data.business;

          // Calculate total weight and pieces
          // const totalWeight = vendor.items.reduce((sum, i) => sum + (i.productId.weight || 1) * i.quantity, 0);
          const totalPieces = vendor.items.reduce(
            (sum, i) => sum + i.quantity,
            0
          );
          const totalWeight = vendor.items.reduce((sum, item) => {
            // The weight is found at: item.productId.quantityInfo.weight
            const unitWeight = item.productId.quantityInfo.weight;
            const itemQuantity = item.quantity;
            return sum + item.productId.quantityInfo.weight * itemQuantity; // Sum of (unit weight * quantity)
          }, 0);
          console.log("Total Weight for vendor", v.name, totalWeight);
          console.log("vendor.items", v.name, vendor.items);

          // Build payload
          const payload = {
            senderCity: v?.address?.city || "Unknown City",
            recipientCity: city,
            recipientTownID: 0,
            recipientName: `${user?.firstname} ${user?.lastname}`,
            recipientPhoneNo: user?.phone || "0000000000",
            recipientEmail: user?.email || "",
            recipientAddress: user?.address?.street || "",
            recipientState: user?.address?.state || "",
            senderTownID: 0,
            senderName: v?.name || "Unknown Vendor",
            senderAddress: v?.address?.street || "Unknown Street",
            senderPhone: v?.phone || "0000000000",
            orderNo: "ORDER-" + Date.now(),
            packaging: "",
            boxandCrating: "",
            deliveryType: "Door to Door",
            description: "Multiple items shipment",
            onforwardingLocation: "",
            paymentType: "Prepaid",
            pickupType: selectedPickupType,
            weight: totalWeight,
            pieces: totalPieces,
            cashOnDelivery: 1,
            shipmentItems: vendor.items.map((item) => ({
              id: 0,
              status: 0,
              createdOn: new Date().toISOString(),
              createdBy: user?.firstname || "User",
              shipmentId: 0,
              commodity: item.productId.name,
              description: item.productId.description,
              countryOfManufacturing: "Nigeria",
              quantity: item.quantity,
              weight: item.productId.weight || 1,
              unitOfMeasure: 0,
              unitOfPrice: item.productId.price,
            })),
          };
          console.log("RedStar Payload for vendor:", v.name, payload);
          console.log("vendor", vendorRes);

          // Call RedStar Delivery Fee API
          const feeRes = await axios.post(
            "http://redspeedopenapi.redstarplc.com/api/Operations/DeliveryFee",
            {
              senderCity: vendorRes.data.business.addresses.city,
              senderTownID: vendorRes.data.business.addresses.townId,
              recipientCity: cityName,
              recipientTownID: parseInt(townId),
              pickupType: 1,
              weight: totalWeight,
            },
            {
              headers: {
                "X-API-KEY": REDSTAR_API_KEY,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("RedStar Fee for vendor:", v.name, feeRes.data);
          totalFee += feeRes.data.TotalAmount || 0;
        }

        setDeliveryFee(totalFee);
      } catch (err) {
        console.error("Error calculating RedStar fee:", err);
        Swal.fire("Error", "Failed to calculate RedStar delivery fee", "error");
      } finally {
        setLoadingDeliveryFee(false);
      }
    };

    getDeliveryFee();
  }, [selectedPickupType, selectedShipping, cartItems]);
  // 🟢 Debug logs
  useEffect(() => {
    console.log("Grouped by Business:", groupedItems);
    console.log("Merged Request:", mergedRequest);
  }, [groupedItems, mergedRequest]);
// Inside the CheckoutShipping functional component...

// ... (all your existing state variables and useEffects)

// Inside the CheckoutShipping functional component...

// ... (all your existing state variables and useEffects)

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedShipping !== "redstar") {
        return Swal.fire("Error", "Please select RedStar as the shipping method to continue.", "error");
    }
    
    if (!selectedPickupType || deliveryFee === null) {
        return Swal.fire("Error", "Please select a Pickup Type and ensure the delivery fee is calculated.", "error");
    }

    const REDSTAR_API_KEY = process.env.NEXT_PUBLIC_REDSTAR_API_KEY;
    if (!REDSTAR_API_KEY) {
        return Swal.fire("Error", "RedStar API Key is missing.", "error");
    }

    // 1. Get the grouped vendor data
    const groupedVendors = groupItemsByBusiness(cartItems);

    if (groupedVendors.length === 0) {
        return Swal.fire("Error", "Your cart is empty.", "error");
    }

    // Show loading modal once for all submissions
    Swal.fire({
        title: "Submitting Pickup Requests...",
        text: `Processing ${groupedVendors.length} shipment(s). Please wait.`,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    let successfulShipments = 0;
    const errors: string[] = [];

    // --- 2. ITERATE AND SUBMIT PER VENDOR ---
    for (const vendor of groupedVendors) {
        const vendorData = vendors[vendor.businessId];
        
        if (!vendorData || !vendorData.addresses) {
            const errorMsg = `Vendor data or address not found for businessId: ${vendor.businessId}`;
            console.error(errorMsg);
            errors.push(errorMsg);
            continue;
        }

        // Calculate total weight and pieces for THIS vendor's items
        const vendorTotalWeight = vendor.items.reduce((sum, item) => {
            const unitWeight = item.productId.quantityInfo.weight || 1;
            const itemQuantity = item.quantity;
            return sum + unitWeight * itemQuantity; // Sum of (unit weight * quantity)
        }, 0);
        const vendorTotalPieces = vendor.items.reduce((sum, i) => sum + i.quantity, 0);

        // Create the ShipmentItem list for the current vendor
        const shipmentItems = vendor.items.map((item) => ({
            id: 0,
            status: 0,
            createdOn: new Date().toISOString(),
            createdBy: user?.firstname || "User",
            shipmentId: 0,
            commodity: item.productId.name,
            description: item.productId.description,
            countryOfManufacturing: "Nigeria",
            quantity: item.quantity,
            // For line items, weight should be the total weight of this specific commodity
            weight: (item.productId.quantityInfo.weight || 1) * item.quantity, 
            unitOfMeasure: 0,
            unitOfPrice: item.productId.price || 0,
        }));

        // --- 3. BUILD THE SINGLE SHIPMENT PAYLOAD (Matching your required structure) ---
        const singleRedStarPayload = {
            senderCity: vendorData.addresses.city || "Unknown City",
            recipientCity: cityName,
            recipientTownID: parseInt(townId) || 0,
            recipientName: `${user?.firstname} ${user?.lastname}`,
            recipientPhoneNo: user?.phone || "0000000000",
            recipientEmail: user?.email || "",
            recipientAddress: address,
            recipientState: state,
            senderTownID: vendorData.addresses.townId || 0,
            senderName: vendorData.name || "Unknown Vendor",
            senderAddress: vendorData.addresses.street || "Unknown Street",
            senderPhone: vendorData.phone || "0000000000",
            orderNo: `ORDER-${Date.now()}-${vendor.businessId.substring(0, 4)}`, // Unique order number per vendor
            packaging: "Box", 
            boxandCrating: "Standard", 
            deliveryType: "Door to Door",
            description: `Order from ${vendorData.name} to ${user?.firstname}`,
            onforwardingLocation: "",
            paymentType: "Prepaid",
            pickupType: selectedPickupType,
            weight: vendorTotalWeight, // Total weight of this vendor's items
            pieces: vendorTotalPieces, // Total pieces/units from this vendor
            cashOnDelivery: 0,
            shipmentItems: shipmentItems,
        };
        
        try {
            // API call for the current vendor
            const res = await axios.post(
                "http://redspeedopenapi.redstarplc.com/api/Operations/PickupRequest",
                singleRedStarPayload,
                {
                    headers: {
                        "X-API-KEY": REDSTAR_API_KEY,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data.IsSuccessful) {
                successfulShipments++;
                console.log(`Successfully submitted pickup for ${vendorData.name}. Ref: ${res.data.ReferenceNo}`);
            } else {
                const apiError = res.data.Message || `API reported error for ${vendorData.name}.`;
                errors.push(apiError);
                console.error(apiError);
            }

        } catch (error: any) {
            const systemError = `Failed to submit pickup request for ${vendorData.name}. Error: ${error.response?.data?.Message || error.message}`;
            errors.push(systemError);
            console.error(systemError);
        }
    }

    // --- 4. FINAL MODAL DISPLAY ---
    Swal.close();

    if (successfulShipments > 0 && errors.length === 0) {
        // All succeeded
        Swal.fire(
            "Success!",
            `Successfully submitted pickup requests for all ${successfulShipments} vendor(s).`,
            "success"
        ).then(() => {
            // TODO: Navigate to Payment step
        });
    } else if (successfulShipments > 0 && errors.length > 0) {
        // Partial success
        Swal.fire(
            "Partial Success!",
            `Successfully submitted ${successfulShipments} request(s). ${errors.length} failed.`,
            "warning"
        ).then(() => {
            // TODO: Offer option to view detailed errors or proceed with successful orders
        });
    } else {
        // All failed
        Swal.fire(
            "All Failed!",
            `Failed to submit pickup requests for all vendors. Please check the console for details.`,
            "error"
        );
    }
};

// ... (rest of the component)

  return (
    <>
      {showModal && <AddressModal onClose={() => setShowModal(false)} />}
      <form className="p-6 md:w-[50vw] md:mx-10 lg:mx-0 xl:mx-10 mb-20" onSubmit={handleSubmit}>
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
            // onClick={handleSelectGig}
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
          <div className="flex justify-center item-center"></div>
        </div>
        {selectedShipping === "redstar" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Pickup Type
            </label>
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
              Delivery Fee:{" "}
              {/* {deliveryFee !== null ? `₦${deliveryFee}` : "Select pickup type"} */}
              <div className="mb-4 border border-gray-300 rounded-lg p-4 text-center align-center">
                <div>
                Shipping Fee:{" "}
                {selectedShipping === "redstar"
                  ? `${
                      deliveryFee !== null
                        ? `₦${deliveryFee}`
                        : "Select pickup type"
                    }`
                  : selectedShipping === "gig"
                  ? ""
                  : selectedShipping === "dhl"
                  ? ""
                  : selectedShipping === "fedex"
                  ? ""
                  : "Select a shipping method"}
                </div>
                <div>
                  Product Price:{" "} 
                </div>
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
        {/* <Link href={"./shipping-options"}> */}
          <button type="submit" className="w-full bg-[#006838] text-white py-3 rounded-lg">
            Continue
          </button>
        {/* </Link> */}
      </form>
    </>
  );
};

export default CheckoutShipping;
